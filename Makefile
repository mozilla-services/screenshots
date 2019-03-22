PATH := ./node_modules/.bin:./bin/:$(PATH)
SHELL := /bin/bash
RSYNC := rsync --archive
VENV := .venv
.DEFAULT_GOAL := help

# Here we have source/dest variables for many files and their destinations;
# we use these each to enumerate categories of source files, and translate
# them into the destination locations.  These destination locations are the
# requirements for the other rules

shared_source := $(wildcard shared/*.js)

# Also scss gets put into two locations:
sass_source := $(wildcard static/css/*.scss)
partials_source := $(wildcard static/css/partials/*.scss)

raven_source := $(shell node -e 'console.log(require.resolve("raven-js/dist/raven.js"))')

l10n_source := $(wildcard locales/*)
l10n_dest := $(l10n_source:%/webextension.properties=webextension/_locales/%/messages.json)

## General transforms:
# These cover standard ways of building files given a source

%.ltr.css: %.css
	postcss $< -o $@ --config .postcss/ltr

%.rtl.css: %.css
	postcss $< -o $@ --config .postcss/rtl

.PHONY: addon
addon: npm set_sentry webextension/manifest.json addon_locales webextension/build/inlineSelectionCss.js webextension/build/raven.js webextension/build/onboardingCss.js webextension/build/onboardingHtml.js webextension/build/buildSettings.js

$(VENV): requirements.txt
	virtualenv -p python2.7 $(VENV)
	. $(VENV)/bin/activate && pip install -r requirements.txt

.PHONY: flake8
flake8: $(VENV)
	$(VENV)/bin/flake8 .

.PHONY: zip
zip: addon
	# FIXME: should remove web-ext-artifacts/*.zip first
	./node_modules/.bin/web-ext build --source-dir webextension/ --ignore-files "**/README.md" --ignore-files "**/*.template"
	mv web-ext-artifacts/firefox_screenshots*.zip build/screenshots.zip
	# We'll try to remove this directory, but it's no big deal if we can't:
	rmdir web-ext-artifacts || true

unsigned_xpi: zip
	cp build/screenshots.zip build/screenshots.xpi

dev_signed_xpi: zip
	echo "signing the addon via the autograph edge server..."
	@curl -F "input=@build/screenshots.zip" -o build/screenshots.xpi -H "Authorization: ${AUTOGRAPH_EDGE_TOKEN}" https://autograph-edge.stage.mozaws.net/sign
	echo "done."

.PHONY: signed_xpi
signed_xpi: addon
	rm -f web-ext-artifacts/*.xpi
	./node_modules/.bin/web-ext sign --api-key=${AMO_USER} --api-secret=${AMO_SECRET} --source-dir webextension/
	mv web-ext-artifacts/*.xpi build/screenshots.xpi

.PHONY: addon_locales
addon_locales:
	./node_modules/.bin/pontoon-to-webext --dest webextension/_locales > /dev/null

build/static/%.css: static/%.scss $(partials_source)
	@mkdir -p $(@D)
	node-sass $< $@

webextension/manifest.json: webextension/manifest.json.template package.json
	./bin/build-scripts/update_manifest.py $< $@

webextension/build/inlineSelectionCss.js: build/static/css/inline-selection.css
	@mkdir -p $(@D)
	./bin/build-scripts/css_to_js.py inlineSelectionCss $< > $@

webextension/build/onboardingCss.js: build/static/css/onboarding.css
	@mkdir -p $(@D)
	./bin/build-scripts/css_to_js.py onboardingCss $< > $@

webextension/build/onboardingHtml.js: webextension/onboarding/slides.html
	@mkdir -p $(@D)
	./bin/build-scripts/css_to_js.py onboardingHtml $< > $@

webextension/build/raven.js: $(raven_source)
	@mkdir -p $(@D)
	cp $< $@

## npm rule

.PHONY: npm
npm: .npm-install.log

webextension/build/buildSettings.js: set_build_settings

.PHONY: set_sentry
set_sentry:
	@if [[ -z "$(SCREENSHOTS_SENTRY)" ]] ; then echo "No default Sentry" ; fi
	@if [[ -n "$(SCREENSHOTS_SENTRY)" ]] ; then echo "Setting default Sentry ${SCREENSHOTS_SENTRY}" ; fi
	./bin/build-scripts/substitute-env.js webextension/buildSettings.js.template | ./bin/build-scripts/set_file webextension/build/buildSettings.js -

.npm-install.log: package.json package-lock.json
	# Essentially .npm-install.log is just a timestamp showing the last time we ran
	# the command
	@mkdir -p $(@D)
	echo "Installing at $(shell date)" > .npm-install.log
	npm install >> .npm-install.log

# This causes intermediate files to be kept (e.g., files in static/ which are copied to the addon and server but aren't used/required directly):
.SECONDARY:

.PHONY: all
all: addon

.PHONY: clean
clean:
	rm -rf webextension/build/ webextension/manifest.json webextension/_locales/

.PHONY: distclean
distclean: clean
	rm -rf $(VENV)
	rm -rf ./node_modules

.PHONY: help
help:
	@echo "Makes the addon"
	@echo "Commands:"
	@echo "  make addon"
	@echo "    make/update the addon directly in webextension/ (built files in webextension/build/)"
	@echo "  make all"
	@echo "    equivalent to make addon"
	@echo "  make clean"
	@echo "    rm -rf webextension/build build"
	@echo "  make zip"
	@echo "    make an unsigned zip of the webextension in build/screenshots.zip"
	@echo "  make unsigned_xpi"
	@echo "    make an unsigned xpi of the webextension in build/screenshots.xpi"
	@echo "  make dev_signed_xpi"
	@echo "    make a dev-root signed xpi of the webextension in build/screenshots.xpi"
	@echo "  make signed_xpi"
	@echo "    make a signed xpi in build/screenshots.xpi"
	@echo "See also:"
	@echo "  bin/run-addon"
	@echo "  bin/run-server"
