PATH := ./node_modules/.bin:./bin/:$(PATH)
SHELL := /bin/bash
BABEL := babel --retain-lines
RSYNC := rsync --archive
VENV := .venv
.DEFAULT_GOAL := help
# Sets $(SCREENSHOTS_BACKEND) to http://localhost:10080 only if it isn't set
SCREENSHOTS_BACKEND ?= http://localhost:10080

# Here we have source/dest variables for many files and their destinations;
# we use these each to enumerate categories of source files, and translate
# them into the destination locations.  These destination locations are the
# requirements for the other rules

shared_source := $(wildcard shared/*.js)
shared_server_dest := $(shared_source:%.js=build/%.js)

# static/js only gets copied to the server
static_js_source := $(wildcard static/js/*.js)
static_js_dest := $(static_js_source:%.js=build/server/%.js)

server_source := $(shell find server/src -name '*.js')
server_dest := $(server_source:server/src/%.js=build/server/%.js)

# Also scss gets put into two locations:
sass_source := $(wildcard static/css/*.scss)
sass_server_dest := $(sass_source:%.scss=build/server/%.css)
partials_source := $(wildcard static/css/partials/*.scss)

# And static images get placed somewhat eclectically:
imgs_source := $(wildcard static/img/*)
imgs_server_dest := $(imgs_source:%=build/server/%)

raven_source := $(shell node -e 'console.log(require.resolve("raven-js/dist/raven.js"))')

l10n_source := $(wildcard locales/*)
l10n_dest := $(l10n_source:%/webextension.properties=webextension/_locales/%/messages.json)

## General transforms:
# These cover standard ways of building files given a source

# Need to put these two rules before the later general rule, so that we don't
# run babel on vendor libraries or the homepage libraries:
build/server/static/homepage/%.js: static/homepage/%.js
	@mkdir -p $(@D)
	cp $< $@

build/server/static/js/%.js: build/static/js/%.js
	@mkdir -p $(@D)
	cp $< $@

build/%.js: %.js
	@mkdir -p $(@D)
	$(BABEL) $< > $@

build/server/%.js: server/src/%.js
	@mkdir -p $(@D)
	$(BABEL) $< > $@

build/%.css: %.scss $(partials_source)
	@mkdir -p $(@D)
	node-sass $< $@

## Static files to be copied:

build/%.png: %.png
	@mkdir -p $(@D)
	cp $< $@

build/%.css: %.css
	@mkdir -p $(@D)
	cp $< $@

build/%.svg: %.svg
	@mkdir -p $(@D)
	./node_modules/.bin/svgo -q -i $< -o $@

build/%.sql: %.sql
	@mkdir -p $(@D)
	cp $< $@

build/%.ttf: %.ttf
	@mkdir -p $(@D)
	cp $< $@

build/%.html: %.html
	@mkdir -p $(@D)
	cp $< $@

.PHONY: addon
addon: npm set_backend set_sentry webextension/manifest.json addon_locales webextension/build/selection.js webextension/build/shot.js webextension/build/thumbnailGenerator.js webextension/build/inlineSelectionCss.js webextension/build/raven.js webextension/build/onboardingCss.js webextension/build/onboardingHtml.js webextension/build/buildSettings.js

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

webextension/manifest.json: webextension/manifest.json.template build/.backend.txt package.json
	./bin/build-scripts/update_manifest.py $< $@

webextension/build/selection.js: shared/selection.js
	@mkdir -p $(@D)
	./bin/build-scripts/modularize selection $< > $@

webextension/build/shot.js: shared/shot.js
	@mkdir -p $(@D)
	./bin/build-scripts/modularize shot $< > $@

webextension/build/thumbnailGenerator.js: shared/thumbnailGenerator.js
	@mkdir -p $(@D)
	./bin/build-scripts/modularize thumbnailGenerator $< > $@

webextension/build/inlineSelectionCss.js: build/server/static/css/inline-selection.css
	@mkdir -p $(@D)
	./bin/build-scripts/css_to_js.py inlineSelectionCss $< > $@

webextension/build/onboardingCss.js: build/server/static/css/onboarding.css
	@mkdir -p $(@D)
	./bin/build-scripts/css_to_js.py onboardingCss $< > $@

webextension/build/onboardingHtml.js: webextension/onboarding/slides.html
	@mkdir -p $(@D)
	./bin/build-scripts/css_to_js.py onboardingHtml $< > $@

webextension/build/raven.js: $(raven_source)
	@mkdir -p $(@D)
	cp $< $@

## Server related rules:

# Copy shared files in from static/:
build/server/static/css/%.css: build/static/css/%.css
	@mkdir -p $(@D)
	cp $< $@

build/server/static/img/%: build/static/img/%
	@mkdir -p $(@D)
	cp $< $@

build/server/package.json: package.json
	@mkdir -p $(@D)
	cp $< $@

shot_dependencies := $(shell ./bin/build-scripts/bundle_dependencies shot getdeps "$(server_dest)")
build/server/static/js/shot-bundle.js: $(shot_dependencies)
	./bin/build-scripts/bundle_dependencies shot build ./build/server/pages/shot/controller.js

homepage_dependencies := $(shell ./bin/build-scripts/bundle_dependencies homepage getdeps "$(server_dest)")
build/server/static/js/homepage-bundle.js: $(homepage_dependencies)
	./bin/build-scripts/bundle_dependencies homepage build ./build/server/pages/homepage/controller.js

shotindex_dependencies := $(shell ./bin/build-scripts/bundle_dependencies shotindex getdeps "$(server_dest)")
build/server/static/js/shotindex-bundle.js: $(shotindex_dependencies)
	./bin/build-scripts/bundle_dependencies shotindex build ./build/server/pages/shotindex/controller.js

leave_dependencies := $(shell ./bin/build-scripts/bundle_dependencies leave getdeps "$(server_dest)")
build/server/static/js/leave-bundle.js: $(leave_dependencies)
	./bin/build-scripts/bundle_dependencies leave build ./build/server/pages/leave-screenshots/controller.js

creating_dependencies := $(shell ./bin/build-scripts/bundle_dependencies creating getdeps "$(server_dest)")
build/server/static/js/creating-bundle.js: $(creating_dependencies)
	./bin/build-scripts/bundle_dependencies creating build ./build/server/pages/creating/controller.js

settings_dependencies := $(shell ./bin/build-scripts/bundle_dependencies settings getdeps "$(server_dest)")
build/server/static/js/settings-bundle.js: $(settings_dependencies)
	./bin/build-scripts/bundle_dependencies settings build ./build/server/pages/settings/controller.js


# The intention here is to only write build-time when something else needs
# to be regenerated, but for some reason this gets rewritten every time
# anyway:
build/server/build-time.js: homepage $(server_dest) $(shared_server_dest) $(sass_server_dest) $(imgs_server_dest) $(static_js_dest) $(patsubst server/db-patches/%,build/server/db-patches/%,$(wildcard server/db-patches/*))
	@mkdir -p $(@D)
	./bin/build-scripts/write_build_time.py > build/server/build-time.js

# Convert all the server.ftl files into build/server/static/locales/[locale].js
build/server/static/locales: $(wildcard locales/**/server.ftl)
	@mkdir -p $@
	./bin/build-scripts/ftl-to-js.js $@ $^

.PHONY: server
server: npm build/server/build-time.js build/server/package.json build/server/static/js/shot-bundle.js build/server/static/js/homepage-bundle.js build/server/static/js/shotindex-bundle.js build/server/static/js/leave-bundle.js build/server/static/js/creating-bundle.js build/server/static/js/settings-bundle.js build/server/static/locales

## Homepage related rules:

build/server/static/homepage/%: static/homepage/%
	@mkdir -p $(@D)
	cp $< $@

.PHONY: homepage
homepage: $(patsubst static/homepage/%,build/server/static/homepage/%,$(shell find static/homepage -type f ! -name index.html))

## npm rule

.PHONY: npm
npm: build/.npm-install.log

build/.backend.txt: set_backend

.PHONY: set_backend
set_backend:
	@echo "Setting backend to ${SCREENSHOTS_BACKEND}"
	./bin/build-scripts/set_file build/.backend.txt $(SCREENSHOTS_BACKEND)

webextension/build/buildSettings.js: set_build_settings

.PHONY: set_build_settings
set_sentry:
	@if [[ -z "$(SCREENSHOTS_SENTRY)" ]] ; then echo "No default Sentry" ; fi
	@if [[ -n "$(SCREENSHOTS_SENTRY)" ]] ; then echo "Setting default Sentry ${SCREENSHOTS_SENTRY}" ; fi
	./bin/build-scripts/substitute-env.js webextension/buildSettings.js.template | ./bin/build-scripts/set_file webextension/build/buildSettings.js -

build/.npm-install.log: package.json
	# Essentially .npm-install.log is just a timestamp showing the last time we ran
	# the command
	@mkdir -p $(@D)
	echo "Installing at $(shell date)" > build/.npm-install.log
	npm install >> build/.npm-install.log

# This causes intermediate files to be kept (e.g., files in static/ which are copied to the addon and server but aren't used/required directly):
.SECONDARY:

.PHONY: all
all: addon server

.PHONY: clean
clean:
	rm -rf build/ webextension/build/ webextension/manifest.json webextension/_locales/

.PHONY: distclean
distclean: clean
	rm -rf $(VENV)
	rm -rf ./node_modules

.PHONY: help
help:
	@echo "Makes the addon and server"
	@echo "Commands:"
	@echo "  make addon"
	@echo "    make/update the addon directly in webextension/ (built files in webextension/build/)"
	@echo "  make server"
	@echo "    make the server in build/server/"
	@echo "  make all"
	@echo "    equivalent to make server addon"
	@echo "  make clean"
	@echo "    rm -rf build/ webextension/build"
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
