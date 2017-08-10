## Version 14.0.0

Note: this is a server-only release

* Add ZAP Baseline scan to test section of circleci [cc88694](https://github.com/mozilla-services/screenshots/commit/cc88694)
* Clean up homepage [bd59043](https://github.com/mozilla-services/screenshots/commit/bd59043)
* Correctly position share panel on non-Firefox browsers. Fixes [#2873](https://github.com/mozilla-services/screenshots/issues/2873) [28e6e6c](https://github.com/mozilla-services/screenshots/commit/28e6e6c)
* "Remove Page Shot data" page is wrongly titled as "Confirm account deletion"  ([#3237](https://github.com/mozilla-services/screenshots/issues/3237)). Fixes [#2140](https://github.com/mozilla-services/screenshots/issues/2140) [4c311fd](https://github.com/mozilla-services/screenshots/commit/4c311fd)
* Minor color polish [5c228fd](https://github.com/mozilla-services/screenshots/commit/5c228fd)
* Make load_test_exercise script easier to use to fill the database. Plus some instructions/shortcuts
* Fix #[#3286](https://github.com/mozilla-services/screenshots/issues/3286), send My Shots without actual shot list.  The shot list is immediately loaded in a separate request [a642ddc](https://github.com/mozilla-services/screenshots/commit/a642ddc)
* Replace svg loader with pure css ([#3285](https://github.com/mozilla-services/screenshots/issues/3285)) [c8a0e39](https://github.com/mozilla-services/screenshots/commit/c8a0e39)
* Header/footer link color change [fd505b5](https://github.com/mozilla-services/screenshots/commit/fd505b5)
* Use standard Firefox product font-family throughout. Based on [Photon design style](http://design.firefox.com/photon/visual/typography.html#typefaces). Except we are not using Fira Sans anywhere, relying instead on system fonts. Fixes [#3266](https://github.com/mozilla-services/screenshots/issues/3266) [7720f65](https://github.com/mozilla-services/screenshots/commit/7720f65)
* Update buttons in onboarding SVGs to look closer to the real buttons [feef990](https://github.com/mozilla-services/screenshots/commit/feef990)
* Remove the full page and save visible buttons from onboarding [1887c38](https://github.com/mozilla-services/screenshots/commit/1887c38)

## Version 13.1.0

Note: server only, 13.0.0 didn't make it past stage.

* Change footer text from Mozilla to Terms. Fixes [#3284](https://github.com/mozilla-services/screenshots/issues/3284) [336563d](https://github.com/mozilla-services/screenshots/commit/336563d)
* Fix bad delete display Because of a lack of a key attribute, the deleted state was being assigned to cards on position and not shot id. Fixes [#3267](https://github.com/mozilla-services/screenshots/issues/3267) [6777a3a](https://github.com/mozilla-services/screenshots/commit/6777a3a)

## Version 13.0.0 release

This is a server-only release

### Server changes

* Make a schema change to prepare for [#3275](https://github.com/mozilla-services/screenshots/issues/3275) ([#3276](https://github.com/mozilla-services/screenshots/issues/3276)) [2e6a659](https://github.com/mozilla-services/screenshots/commit/2e6a659)
* Insert a space between sentences in Get Firefox CTA ([#3272](https://github.com/mozilla-services/screenshots/issues/3272)). Fixes [#3271](https://github.com/mozilla-services/screenshots/issues/3271) [2be64bb](https://github.com/mozilla-services/screenshots/commit/2be64bb)
* fix S3 image management Do not show a shot page when the shot has been deleted Delete images and image files before marking the shot as deleted Add a series of server tests for how S3 is managed. Fixes [#3009](https://github.com/mozilla-services/screenshots/issues/3009) [d2ecaba](https://github.com/mozilla-services/screenshots/commit/d2ecaba)
* Expand the server testing library. Parse more things from the shot page Add set_expiration and delete_shot methods [54f456f](https://github.com/mozilla-services/screenshots/commit/54f456f)
* Give a proper error response when CSRF is wrong [229e7c8](https://github.com/mozilla-services/screenshots/commit/229e7c8)
* Make the spinner the clip image's background. Allows the spinner to be shown before the image starts to load, with no JS required. [a6abc3e](https://github.com/mozilla-services/screenshots/commit/a6abc3e)
* Load the image directly; makes images viewable without JS.
  * Works around lack of CSP nonce support in IE and Edge < 40 (). Fixes [#2935](https://github.com/mozilla-services/screenshots/issues/2935) Fixes [#2866](https://github.com/mozilla-services/screenshots/issues/2866) [48f52ed](https://github.com/mozilla-services/screenshots/commit/48f52ed)
* Make homepage footer more consistent [faecb5a](https://github.com/mozilla-services/screenshots/commit/faecb5a)
* Remove extra space under firefox promo bar [bbe32a2](https://github.com/mozilla-services/screenshots/commit/bbe32a2)
* Give proper response code for request entity too large ([#3248](https://github.com/mozilla-services/screenshots/issues/3248))
* give 400 Bad Request when id is invalid. Fixes [#3204](https://github.com/mozilla-services/screenshots/issues/3204) Fixes [#3204](https://github.com/mozilla-services/screenshots/issues/3204) Fixes [#3204](https://github.com/mozilla-services/screenshots/issues/3204) [4d53220](https://github.com/mozilla-services/screenshots/commit/4d53220)
* Don't create S3 bucket on server startup ([#3250](https://github.com/mozilla-services/screenshots/issues/3250)). Fixes [#3111](https://github.com/mozilla-services/screenshots/issues/3111) [e9b1458](https://github.com/mozilla-services/screenshots/commit/e9b1458)
* use 'Screenshot: title' for the <title> of shot pages. Fixes [#2410](https://github.com/mozilla-services/screenshots/issues/2410) [ed2b2c2](https://github.com/mozilla-services/screenshots/commit/ed2b2c2)
* Animate deleting shots on my shots ([#3141](https://github.com/mozilla-services/screenshots/issues/3141)) [3fb655b](https://github.com/mozilla-services/screenshots/commit/3fb655b)
* Remove server /timing route [#2428](https://github.com/mozilla-services/screenshots/issues/2428) [37f43e6](https://github.com/mozilla-services/screenshots/commit/37f43e6)
* Add l10n.toml file for screenshots, with revised list of languages. [5213f22](https://github.com/mozilla-services/screenshots/commit/5213f22)
* Clean up empty localization files.Pontoon used to commit localization files with just comments, even if there wasn't a single translated string. That's now fixed on the pontoon side, but the files are still here. As soon as localizers work on screenshots, the files will be created from scratch. [3664122](https://github.com/mozilla-services/screenshots/commit/3664122)
* [#3223](https://github.com/mozilla-services/screenshots/issues/3223) Fixes homepage Mozilla footer logo is 404 [#3223](https://github.com/mozilla-services/screenshots/issues/3223) [64d2308](https://github.com/mozilla-services/screenshots/commit/64d2308)
* Start [#3207](https://github.com/mozilla-services/screenshots/issues/3207), add a size column to the images table ([#3236](https://github.com/mozilla-services/screenshots/issues/3236))This does not make use of the column, but puts it in place for future use. Also update schema.sql given a backlog of changes [07ba77c](https://github.com/mozilla-services/screenshots/commit/07ba77c)
* Update npm packages ([#3235](https://github.com/mozilla-services/screenshots/issues/3235)). Removed npm-shrinkwrap, as it causes all kinds of install nuisances
* Fix lots of lint issues, exposed by updated lint packages. Fixes [#3221](https://github.com/mozilla-services/screenshots/issues/3221) Fixes [#3221](https://github.com/mozilla-services/screenshots/issues/3221) [b2258d1](https://github.com/mozilla-services/screenshots/commit/b2258d1)
* Use docker build --pull, to always fetch latest image [cce97ba](https://github.com/mozilla-services/screenshots/commit/cce97ba)

### Add-on changes

* Replace the WebExtension browser action with a Photon page action. ([#3239](https://github.com/mozilla-services/screenshots/issues/3239))
  * Replace the WebExtension browser action with a Photon page action.
  This removes the browser action and adds a Photon page action,
  pursuant to https://bugzilla.mozilla.org/show_bug.cgi?id=1366041.
  Right now Photon page actions are unrelated to WebExtension page
  actions unfortunately, which means that this patch has to do most
  of its work in bootstrap.js.  The WebExtension part passes
  messages to bootstrap.js to handle clicks and update the action's
  title and icon as necessary.
  * Test fix: Replace the WebExtension browser action with a Photon page action.
  Fix the test for the previous commit.
  * Update SHOOTER_BUTTON_ID in test.js.
  * Use the Photon page action when supported, the WebExtension browser action when not.
  Extend the Photon-related port used between bootstrap.js and the
  WebExtension so that bootstrap.js can tell the WebExtension
  whether it's OK to use the Photon page action.  The WebExtension
  should not attempt to use the browser action when Photon is
  enabled because bootstrap.js will have removed the browser
  action's navbar button.
  Modify the test so that it checks the Photon page action when
  Photon is enabled and the browser action when it's not.
  * Fix the expected button label in test.js for the Photon page action.
  * Maybe fix PageActions eslint errors. [4396250](https://github.com/mozilla-services/screenshots/commit/4396250)
* remove high DPI shot capture for full page [fde181d](https://github.com/mozilla-services/screenshots/commit/fde181d)
* Sets background highlight width to 100% [aee88eb](https://github.com/mozilla-services/screenshots/commit/aee88eb)

## Version 12.0.0

This is a server-only release

### Server

* Fix detection of a bad UPDATE in response to PUT ([#3233](https://github.com/mozilla-services/screenshots/issues/3233)). Because of a bad test for the UPDATE's success, file updates were committed inappropriate. Fixes [Bug 1384817](https://bugzilla.mozilla.org/show_bug.cgi?id=1384817) [6343bec](https://github.com/mozilla-services/screenshots/commit/6343bec)
* Localize footer and copy button label. Fixes [#3214](https://github.com/mozilla-services/screenshots/issues/3214) [24bd0a1](https://github.com/mozilla-services/screenshots/commit/24bd0a1)
* When initing l10n, cache contents of FTL files, not user locale ([#3170](https://github.com/mozilla-services/screenshots/issues/3170)) ([#3199](https://github.com/mozilla-services/screenshots/issues/3199))
  * Also, bail if locales aren't found or can't be loaded.
  * address review feedback [26daf9f](https://github.com/mozilla-services/screenshots/commit/26daf9f)
* Add event for non-owner click on original url [30c113e](https://github.com/mozilla-services/screenshots/commit/30c113e)
* Handle redirects in calls to /proxy ([#3195](https://github.com/mozilla-services/screenshots/issues/3195))Probably. Fixes [#2648](https://github.com/mozilla-services/screenshots/issues/2648) [61d686f](https://github.com/mozilla-services/screenshots/commit/61d686f)

### Add-on

* Remove duplicate drawWindow call for shot preview [2a5dd27](https://github.com/mozilla-services/screenshots/commit/2a5dd27)
* Update shot preview save icon [735b3f9](https://github.com/mozilla-services/screenshots/commit/735b3f9)

## Version 11.0.0

This is a server-only release.  Add-on changes are still deferred to a later Firefox release.

* Host static assets in CDN [52e255a](https://github.com/mozilla-services/screenshots/commit/52e255a)
* Add `npm shrinkwrap`; ([#3051](https://github.com/mozilla-services/screenshots/issues/3051)). Fixes [#2430](https://github.com/mozilla-services/screenshots/issues/2430) [fe28769](https://github.com/mozilla-services/screenshots/commit/fe28769)
* Invoke and use Raven correctly ([#3044](https://github.com/mozilla-services/screenshots/issues/3044)). Fixes [#3040](https://github.com/mozilla-services/screenshots/issues/3040) [839995d](https://github.com/mozilla-services/screenshots/commit/839995d)
* Change cursor style [59a4cbf](https://github.com/mozilla-services/screenshots/commit/59a4cbf)
* Update deprecations ([#3031](https://github.com/mozilla-services/screenshots/issues/3031))
  * update Raven usage; Removes deprecated calls to .patchGlobal and Raven.middleware
  * update mozlog usage
  * Adds logging module and removes use of mozlog.config. Fixes [#2743](https://github.com/mozilla-services/screenshots/issues/2743) Fixes [#2741](https://github.com/mozilla-services/screenshots/issues/2741) [3e49677](https://github.com/mozilla-services/screenshots/commit/3e49677)
* Hides download Firefox button on homepage [7eccc34](https://github.com/mozilla-services/screenshots/commit/7eccc34)
* Update favicon [84e9e19](https://github.com/mozilla-services/screenshots/commit/84e9e19)
* L20n syntax subset ([#3154](https://github.com/mozilla-services/screenshots/issues/3154))* Make sections proper section, convert section comments to sections.
  * Normalize whitespace, 4-spaces indent, and single-space in placables
  * fixup! Make sections proper section, convert section comments to sections.
  * Normalize plural expressions to match fluent serializer [9b0bcbd](https://github.com/mozilla-services/screenshots/commit/9b0bcbd)
* Fix some ui nits ([#3140](https://github.com/mozilla-services/screenshots/issues/3140)) [c28887f](https://github.com/mozilla-services/screenshots/commit/c28887f)
* Removes redirect endpoint ([#3144](https://github.com/mozilla-services/screenshots/issues/3144)) [428013a](https://github.com/mozilla-services/screenshots/commit/428013a)
* localize server ([#3068](https://github.com/mozilla-services/screenshots/issues/3068)), refs [#2205](https://github.com/mozilla-services/screenshots/issues/2205). Fixes [#1486](https://github.com/mozilla-services/screenshots/issues/1486) [954a54d](https://github.com/mozilla-services/screenshots/commit/954a54d)
* Do not let a shot without clips break My Shots ([#3133](https://github.com/mozilla-services/screenshots/issues/3133)). Fixes [#3131](https://github.com/mozilla-services/screenshots/issues/3131) [75095a3](https://github.com/mozilla-services/screenshots/commit/75095a3)
* Validate URLs before redirect ([#3074](https://github.com/mozilla-services/screenshots/issues/3074)). Fixes [#3073](https://github.com/mozilla-services/screenshots/issues/3073) [ecfaa64](https://github.com/mozilla-services/screenshots/commit/ecfaa64)
* Changed the homepage from pageshot.net to https://screenshots.firefox.com. Fixes [#3041](https://github.com/mozilla-services/screenshots/issues/3041) [a98b6cf](https://github.com/mozilla-services/screenshots/commit/a98b6cf)
* update to photon loader [8b6157b](https://github.com/mozilla-services/screenshots/commit/8b6157b)
* Tweak flex syntax so shot pages work on IE 11. Fixes [#2516](https://github.com/mozilla-services/screenshots/issues/2516) [33d2ae5](https://github.com/mozilla-services/screenshots/commit/33d2ae5)

### Add-on changes

Note these are part of the version/tag, but have not been uploaded to the Firefox tree.

* Add reason to webExtension.startup and shutdown Will be useful when https://bugzilla.mozilla.org/show_bug.cgi?id=1372750 and
  https://bugzilla.mozilla.org/show_bug.cgi?id=1373749 are fixed [d97d4a7](https://github.com/mozilla-services/screenshots/commit/d97d4a7)
* Protect against an empty IPC response ([#3037](https://github.com/mozilla-services/screenshots/issues/3037))This happened in some weird corner case while debugging [14df39d](https://github.com/mozilla-services/screenshots/commit/14df39d)
* Guard access of this.save when un-disabling the save button ([#3030](https://github.com/mozilla-services/screenshots/issues/3030)). This can happen after the worker has been torn down, and this.save isn't defined [cf6e72a](https://github.com/mozilla-services/screenshots/commit/cf6e72a)
* Set dimensions for icon and add to startup ([#3136](https://github.com/mozilla-services/screenshots/issues/3136)) [9959ede](https://github.com/mozilla-services/screenshots/commit/9959ede)
* Disable Screenshots in private windows. Fixes [#3120](https://github.com/mozilla-services/screenshots/issues/3120) [aefc639](https://github.com/mozilla-services/screenshots/commit/aefc639)
* about:home is not treated like about:newtab ([#3088](https://github.com/mozilla-services/screenshots/issues/3088)). Fixes [#3029](https://github.com/mozilla-services/screenshots/issues/3029) [4633694](https://github.com/mozilla-services/screenshots/commit/4633694)
* preview shot before saving full page/visibleremove addToMyShots [c87db61](https://github.com/mozilla-services/screenshots/commit/c87db61)

## Version 10.10.0

* Synchronize startup code more carefully ([#3257](https://github.com/mozilla-services/screenshots/issues/3257))

## Version 10.9.0

Note: the 10.x.0 series is exported to Firefox 55.

* Remove Save Full Page and Save Visible [#3208](https://github.com/mozilla-services/screenshots/pull/3208). Avoids [#3182](https://github.com/mozilla-services/screenshots/issues/3182)
  * **Note:** this has been reverted in later versions

## Version 10.8.0

* Update privacy notice URL ([#3136](https://github.com/mozilla-services/screenshots/issues/3135))
* Suppress resize errors and correctly unload resize listener ([#3153](https://github.com/mozilla-services/screenshots/issues/3135))

## Version 10.7.0

* Fix icon path, so that starred icon is shown to new users ([#3136](https://github.com/mozilla-services/screenshots/issues/3136))
* Address 10.6 review comments ([bugzilla bug 1381132](https://bugzil.la/1381132#c3))

## Version 10.6.0

* Iframe tests: validate iframe URLs, remove unneeded iframe onload handlers ([#3134](https://github.com/mozilla-services/screenshots/issues/3134))
* Put temporary clipboard TEXTAREA in an iframe, with iframe URL validation [5b4609f](https://github.com/mozilla-services/screenshots/commit/5b4609f)

## Version 10.5.0

* Disable Screenshots in private windows. Fixes [#3120](https://github.com/mozilla-services/screenshots/issues/3120) [450dad1](https://github.com/mozilla-services/screenshots/commit/450dad1)
* Do not regress the already-landed fix to [Bug 1373614](https://bugzilla.mozilla.org/show_bug.cgi?id=1373614) (stop the embedded WebExtension unconditionally) [cf3788d](https://github.com/mozilla-services/screenshots/commit/cf3788d)

## Version 10.4.0

Note: this release didn't make it into Firefox. Details in [Bug 1380120](https://bugzilla.mozilla.org/show_bug.cgi?id=1380120)

* Add context fill icons [7cb237f](https://github.com/mozilla-services/screenshots/commit/7cb237f)
* Sanitize download filename more fully. This adds `:` (important on Windows),
  `\`, `<`, and `>` to the blacklist.
  Followup in [#3083](https://github.com/mozilla-services/screenshots/issues/3083). Fixes [#2981](https://github.com/mozilla-services/screenshots/issues/2981) [af32978](https://github.com/mozilla-services/screenshots/commit/af32978)
* Add cloud icon to Save [4ae42cc](https://github.com/mozilla-services/screenshots/commit/4ae42cc)

## Version 10.3.0

* Revert the startupCache changes from 10.2.0
* Add `reason` to startup/shutdown in anticipation of [Bug 1372750](https://bugzilla.mozilla.org/show_bug.cgi?id=1372750) landing
* Release will be accompanied with a bump to the ExtensionStartupCache SCHEMA_VERSION

## Version 10.2.0

* Manually clear the startupCache, to fix upgrade issues, fixes [#3027](https://github.com/mozilla-services/screenshots/issues/3027)
* Change English privacy and terms notice

## Version 10.1.0

Note 10.0.0 was a development-only version

### Add-on changes

* Start background page if migration is needed. Fixes [#3007](https://github.com/mozilla-services/screenshots/issues/3007) [77bd749](https://github.com/mozilla-services/screenshots/commit/77bd749)
* Minor en-US string tweaks [b038b31](https://github.com/mozilla-services/screenshots/commit/b038b31)
* Close onboarding modal on clicking outside the slides [614877a](https://github.com/mozilla-services/screenshots/commit/614877a)
* Wait 5 seconds after startup before showing any error notifications. This change eliminates the highly-visible class of bugs where an error notification is thrown at startup. [9db01b7](https://github.com/mozilla-services/screenshots/commit/9db01b7)
* Let background page load fully before loading content scripts. Fixes [#2955](https://github.com/mozilla-services/screenshots/issues/2955) [43977db](https://github.com/mozilla-services/screenshots/commit/43977db)
* Remove fromMakeError from Sentry reports
* Sentry IP collection is turned off
* Resolve small UI nits in add-on ([#2995](https://github.com/mozilla-services/screenshots/issues/2995))* flips last two onboarding slides. Fixes [#2988](https://github.com/mozilla-services/screenshots/issues/2988) Fixes [#2986](https://github.com/mozilla-services/screenshots/issues/2986) [36579e4](https://github.com/mozilla-services/screenshots/commit/36579e4)
* Sentry/investigative fixes ([#3003](https://github.com/mozilla-services/screenshots/issues/3003))* Avoid ui is undefined error in Browser Console when save succeeds and worker is torn down
  * avoid bad favicon URLs; avoid problem with resolveUrl and no base URL
  * Use `this.module` instead of `window.module` for `shot.js`.
  * Add watchFunction to top-level calls in modules, so stacks are saved
  * Suppress ui is not defined error. This isn't a real fix, but it keeps the popup from happening, while still reporting to Sentry (or reporting sometimes)
  * Avoid `filenameTitle is undefined`. Generally default to Screenshot for the title, for cases (like file urls) where even self.url is blank
  * Clarify in the logs when an error comes from Screenshots
  * Don't force selection when forcing onboarding, as site will trigger onboarding itself
  * avoid Invalid tab ID when an active tab is closed
  The code always tries to make the icon not-active, but one case when it tries is when the tab has been closed
  * suppress Missing host permission for the tab
  This is the expected error for about pages and other non-permitted pages. Fixes [#2968](https://github.com/mozilla-services/screenshots/issues/2968) Fixes [#2979](https://github.com/mozilla-services/screenshots/issues/2979) Fixes [#2983](https://github.com/mozilla-services/screenshots/issues/2983) Fixes [#2998](https://github.com/mozilla-services/screenshots/issues/2998) Fixes [#2990](https://github.com/mozilla-services/screenshots/issues/2990) Fixes [#2978](https://github.com/mozilla-services/screenshots/issues/2978) [2cec496](https://github.com/mozilla-services/screenshots/commit/2cec496)
* Lazily load code into the background page. This takes a minimal approach, loading scripts using the script tag on the first button click. Also creates and intercepts the contextMenu action, and any incoming communication. Reads onboarding flag and changes icon as necessary. Fixes [#2843](https://github.com/mozilla-services/screenshots/issues/2843) [8f98579](https://github.com/mozilla-services/screenshots/commit/8f98579)
* Update icon [aff4283](https://github.com/mozilla-services/screenshots/commit/aff4283)
* Moves button (Download/Save/etc) position if not in viewport [0d025fc](https://github.com/mozilla-services/screenshots/commit/0d025fc)
* don't give an error when document.body is missing. This notices and reports the specific element that is in the page, that isn't an HTML document

### Server changes

* Various fixes:
  * make sure contentOrigin isn't undefined in CSP header
  * avoid including README and .template files in zip
  * Fix 2767, make `update_manifest.py` resilient to a bad `manifest.json`. Also fix the logic that keeps the version always going up
  * validate backend argument for manifest
  * Fixes [#2963](https://github.com/mozilla-services/screenshots/issues/2963) [#2426](https://github.com/mozilla-services/screenshots/issues/2426) [#2679](https://github.com/mozilla-services/screenshots/issues/2679) [#2856](https://github.com/mozilla-services/screenshots/issues/2856) [#2941](https://github.com/mozilla-services/screenshots/issues/2941) [#2985](https://github.com/mozilla-services/screenshots/issues/2985) [#2967](https://github.com/mozilla-services/screenshots/issues/2967) [#2994](https://github.com/mozilla-services/screenshots/issues/2994) [#2647](https://github.com/mozilla-services/screenshots/issues/2647) [ede3337](https://github.com/mozilla-services/screenshots/commit/ede3337)
* Update npm packages. Fixes [#2991](https://github.com/mozilla-services/screenshots/issues/2991) [c17f30b](https://github.com/mozilla-services/screenshots/commit/c17f30b)
* Hide search [1441aa6](https://github.com/mozilla-services/screenshots/commit/1441aa6)
* Hides 'copy image text' option if text capture is disabled [4102029](https://github.com/mozilla-services/screenshots/commit/4102029)

### Development process changes

* Change the default npm run test behavior to run Nightly instead of Release ([#3008](https://github.com/mozilla-services/screenshots/issues/3008)) [13b4414](https://github.com/mozilla-services/screenshots/commit/13b4414)
* Normalize exception stack URLs to improve Sentry grouping. Each copy of Screenshots has a unique `moz-extension://` UUID URL. Replace that base URL with `resource://screenshots-addon` for better Sentry grouping. Use 'resource', not 'moz-extension', because raven-js can't parse stack traces with 'moz-extension' URLs (raven-js bug [#974](https://github.com/mozilla-services/screenshots/issues/974)). Fixes [#2975](https://github.com/mozilla-services/screenshots/issues/2975) [90c31d6](https://github.com/mozilla-services/screenshots/commit/90c31d6)
* Set limits in regexes [e34a871](https://github.com/mozilla-services/screenshots/commit/e34a871)
* Removes focus from buttons on action complete [0bd7945](https://github.com/mozilla-services/screenshots/commit/0bd7945)
* Share panels reposition and remain open [db25663](https://github.com/mozilla-services/screenshots/commit/db25663)
* Card component refactor creates a different component class for each shot; fixes circleci errors; card component code refactor [2bb3bc8](https://github.com/mozilla-services/screenshots/commit/2bb3bc8)
* Fix select list [3b839e7](https://github.com/mozilla-services/screenshots/commit/3b839e7)
* Add `web-ext --browser-console` so it always starts with the console open

## Version 9.0.0

* Handle a race condition when a shot page is loaded at startup ([#2962](https://github.com/mozilla-services/screenshots/issues/2962)). Fixes [#2958](https://github.com/mozilla-services/screenshots/issues/2958) [7637e1a](https://github.com/mozilla-services/screenshots/commit/7637e1a)
* Make empty selections report an error. Previously they were creating empty `data:` URLs and causing server rejection. Fixes [#2957](https://github.com/mozilla-services/screenshots/issues/2957) [dbeb56d](https://github.com/mozilla-services/screenshots/commit/dbeb56d)
* Make re-saving an image work. Change the Save button to not be disabled after the timeout. Remove any previous clip images if Save is invoked twice [3c2323d](https://github.com/mozilla-services/screenshots/commit/3c2323d)
* fix sending errors to Sentry ([#2952](https://github.com/mozilla-services/screenshots/issues/2952)). This changes the DSNs to the private DSNs in new Sentry projects. Discussion of using a private DSN in [Bug 1369162](https://bugzilla.mozilla.org/show_bug.cgi?id=1369162). WebExtension background pages do not have a referrer or origin on their requests, therefore we need authenticated endpoints. Fixes [#2920](https://github.com/mozilla-services/screenshots/issues/2920) [f94bdfd](https://github.com/mozilla-services/screenshots/commit/f94bdfd)
* Unload uicontrol event handlers properly ([#2942](https://github.com/mozilla-services/screenshots/issues/2942)). Fixes [#2838](https://github.com/mozilla-services/screenshots/issues/2838) [2d064b7](https://github.com/mozilla-services/screenshots/commit/2d064b7)
* Do not localize product name in the button label [48974c7](https://github.com/mozilla-services/screenshots/commit/48974c7)
* Disable DOM text capture. Fixes [#2931](https://github.com/mozilla-services/screenshots/issues/2931) [d30ef08](https://github.com/mozilla-services/screenshots/commit/d30ef08)
* Defer the migration until local registration info has been fetched ([#2934](https://github.com/mozilla-services/screenshots/issues/2934)). Fixes migration issues and haywire notification on startup. Fixes [#2919](https://github.com/mozilla-services/screenshots/issues/2919) Fixes [#2902](https://github.com/mozilla-services/screenshots/issues/2902) [1aa0b9e](https://github.com/mozilla-services/screenshots/commit/1aa0b9e)
* better align RTL buttons [ee5f588](https://github.com/mozilla-services/screenshots/commit/ee5f588)
* Set lang and dir to html tags [d908268](https://github.com/mozilla-services/screenshots/commit/d908268)

### Server changes

* Add more structured error messages to bad submitted image URLs [308913b](https://github.com/mozilla-services/screenshots/commit/308913b)
* allow for EXTRA_CONTENT_ORIGIN ([#2950](https://github.com/mozilla-services/screenshots/issues/2950))This adds a new configuration, EXTRA_CONTENT_ORIGIN, which is added to the CSP. This is intended just for migrating the pageshot.net content origin. Fixes [#2933](https://github.com/mozilla-services/screenshots/issues/2933) [1b746f9](https://github.com/mozilla-services/screenshots/commit/1b746f9)
* fix select list [d7a6159](https://github.com/mozilla-services/screenshots/commit/d7a6159)

### Other changes

* Implement some small improvements to export_mc ([#2948](https://github.com/mozilla-services/screenshots/issues/2948)). Add `--no-commit` option, so you can preview the changes without causing a commit. Validate `--branch` or `--no-switch-branch` options. Make it valid Python 3 (and Python 2), even though we aren't using Python 3 [8f97a3c](https://github.com/mozilla-services/screenshots/commit/8f97a3c)
* Update expected button label text in browser test [61b1d19](https://github.com/mozilla-services/screenshots/commit/61b1d19)
* Note text capture can be enabled by setting the SCREENSHOTS_CAPTURE_TEXT env var to `'true'`.

## Version 8.2.0

8.2.0 is a server-only release

* Update links on homepage remove /forum link fix Privacy and Terms links. Fixes [#2909](https://github.com/mozilla-services/screenshots/issues/2909) Fixes [#2871](https://github.com/mozilla-services/screenshots/issues/2871) [931e8f6](https://github.com/mozilla-services/screenshots/commit/931e8f6)
* Fix GitHub and Twitter links on homepage [70485a1](https://github.com/mozilla-services/screenshots/commit/70485a1)
* Removing bottom bit of landing page [f9d718c](https://github.com/mozilla-services/screenshots/commit/f9d718c)

## Version 8.1.0

* Update list of files not exported to Firefox ([#2921](https://github.com/mozilla-services/screenshots/pull/2921))

## Version 8.0.0

* Get rid of extra icons ([#2885](https://github.com/mozilla-services/screenshots/issues/2885)) [aec7dab](https://github.com/mozilla-services/screenshots/commit/aec7dab)
* Revert "Start WebExtension immediately" (i.e., defer startup of extension) [c849b50](https://github.com/mozilla-services/screenshots/commit/c849b50)
* Fix onboarding text for long strings ([#2870](https://github.com/mozilla-services/screenshots/issues/2870)) [3d10b62](https://github.com/mozilla-services/screenshots/commit/3d10b62)
* If the /creating tab is closed open a new tab instead of updating the nonexistent tab ([#2850](https://github.com/mozilla-services/screenshots/issues/2850)). Fixes [#2842](https://github.com/mozilla-services/screenshots/issues/2842) [ccb2397](https://github.com/mozilla-services/screenshots/commit/ccb2397)

### Server

* Change console.* server messages to use mozlog ([#2858](https://github.com/mozilla-services/screenshots/issues/2858)). Fixes [#2177](https://github.com/mozilla-services/screenshots/issues/2177) [98df4ec](https://github.com/mozilla-services/screenshots/commit/98df4ec)
* make protocol configurable with EXPECT_PROTOCOL=https ([#2864](https://github.com/mozilla-services/screenshots/issues/2864)). Fixes [#2734](https://github.com/mozilla-services/screenshots/issues/2734) [a9761b6](https://github.com/mozilla-services/screenshots/commit/a9761b6)
* Fix shot index trash flicker ([#2872](https://github.com/mozilla-services/screenshots/issues/2872)) [238cc23](https://github.com/mozilla-services/screenshots/commit/238cc23)
* Fix share panel offset in chrome ([#2875](https://github.com/mozilla-services/screenshots/issues/2875)) [7da2f78](https://github.com/mozilla-services/screenshots/commit/7da2f78)
* Host images on config.contentOrigin. Fixes [#2300](https://github.com/mozilla-services/screenshots/issues/2300) [53e3591](https://github.com/mozilla-services/screenshots/commit/53e3591)
* Show error message in shot.js assert() exception [d9f9fe6](https://github.com/mozilla-services/screenshots/commit/d9f9fe6)
* Full qualify the homepage og:image/etc images. Fixes [#2810](https://github.com/mozilla-services/screenshots/issues/2810) [7ebe055](https://github.com/mozilla-services/screenshots/commit/7ebe055)
* Update DMCA owner notice. Fixes [#2836](https://github.com/mozilla-services/screenshots/issues/2836) [be2f725](https://github.com/mozilla-services/screenshots/commit/be2f725)
* Enable continuous deployment with CircleCI. Fixes [#2521](https://github.com/mozilla-services/screenshots/issues/2521) [0d0f42c](https://github.com/mozilla-services/screenshots/commit/0d0f42c)

## Version 7.0.0

Destined for a server deploy, probably only a later version of the add-on will be imported into Firefox.

* Update documentation [ef69b80](https://github.com/mozilla-services/screenshots/commit/ef69b80) [56d919a](https://github.com/mozilla-services/screenshots/commit/56d919a) [709b3ee](https://github.com/mozilla-services/screenshots/commit/709b3ee) [75c4ca4](https://github.com/mozilla-services/screenshots/commit/75c4ca4)
* Stop updating the tab state on tab 'updated' eventRelocate the urlEnabled check to the button click handler, and show the unshootable page error if the url isn't enabled.
  * Removing the onUpdated handler and the many redundant setIcon calls will hopefully help fix performance issues currently preventing uplift into
  Firefox.
  * Fixes [#2824](https://github.com/mozilla-services/screenshots/issues/2824) [d830d9a](https://github.com/mozilla-services/screenshots/commit/d830d9a)
* Do not update toolbar button state inside tab 'activated' event handler.  According to kmag, webextension buttons have per-tab state, so setting the button enabled or disabled on update should be enough. Updating the icon on tab activated may be causing performance issues. See https://bugzilla.mozilla.org/show_bug.cgi?id=1361792 for details. Also remove tab.active check, so that non-active tabs can catch button updates (https://bugzilla.mozilla.org/show_bug.cgi?id=1362234#c2) [f63b90e](https://github.com/mozilla-services/screenshots/commit/f63b90e)
* Start WebExtension immediatelyStop waiting for the 'sessionstore-windows-restored' event before
  starting the WebExtension.
  See https://bugzilla.mozilla.org/show_bug.cgi?id=1361792 for details. [81a567a](https://github.com/mozilla-services/screenshots/commit/81a567a)
* Add dropshadow to icons for dark themes [cbfa406](https://github.com/mozilla-services/screenshots/commit/cbfa406)
* Add a quiet parameter to watchFunction to match watchPromise ([#2795](https://github.com/mozilla-services/screenshots/issues/2795))
  Quiet the watchFunction calls in tabs.onUpdated and tabs.onActivated, that should never pop up a message [1add819](https://github.com/mozilla-services/screenshots/commit/1add819)
* Set Sentry URL when exporting to m-c. Fixes [#2782](https://github.com/mozilla-services/screenshots/issues/2782) [576a9c8](https://github.com/mozilla-services/screenshots/commit/576a9c8)

### Server changes:

* Add landing page UI [166e079](https://github.com/mozilla-services/screenshots/commit/166e079)
* Remove duplicate meta description in head [f5c5509](https://github.com/mozilla-services/screenshots/commit/f5c5509)
* Remove robots.txt and replace with meta noindex making Twitter cards work again Invalidates [#2805](https://github.com/mozilla-services/screenshots/issues/2805). Fixes [#2806](https://github.com/mozilla-services/screenshots/issues/2806) Fixes [#2774](https://github.com/mozilla-services/screenshots/issues/2774) [1c6efd6](https://github.com/mozilla-services/screenshots/commit/1c6efd6)
* Disable all active A/B tests. Fixes [#2796](https://github.com/mozilla-services/screenshots/issues/2796) [ddcb7fc](https://github.com/mozilla-services/screenshots/commit/ddcb7fc) [0726fd0](https://github.com/mozilla-services/screenshots/commit/0726fd0)
* Make clip image.onload resilient. This duplicates some of the React logic that shows the clip image when it loads, but will run even if the bundle doesn't load or there's other Javascript errors. Fixes [#2792](https://github.com/mozilla-services/screenshots/issues/2792) Fixes [#2651](https://github.com/mozilla-services/screenshots/issues/2651) [60adfea](https://github.com/mozilla-services/screenshots/commit/60adfea)
* Allow JS to run even when ga-activation.js is suppressed. Fixes [#2790](https://github.com/mozilla-services/screenshots/issues/2790) [bf39dc4](https://github.com/mozilla-services/screenshots/commit/bf39dc4)
* Send only referrer origin to GA. Fixes [#2717](https://github.com/mozilla-services/screenshots/issues/2717) [4883e11](https://github.com/mozilla-services/screenshots/commit/4883e11)
* Fix email address. Fixes [#2791](https://github.com/mozilla-services/screenshots/issues/2791) [46915c5](https://github.com/mozilla-services/screenshots/commit/46915c5)
* Extended direct-view event with ownership. closes [#2143](https://github.com/mozilla-services/screenshots/issues/2143) [0cc662c](https://github.com/mozilla-services/screenshots/commit/0cc662c)
* Inline style/image on /#hello. Fixes [#2703](https://github.com/mozilla-services/screenshots/issues/2703) [97e75bb](https://github.com/mozilla-services/screenshots/commit/97e75bb)
* Complete screenshots style refactor [4723a92](https://github.com/mozilla-services/screenshots/commit/4723a92)
* Clarify how Do Not Track affects does not affect error reporting

## Version 6.6.2

Another version landing in the non-master latest-firefox-export branch.

* Stop updating the button icon when the tab is updated ([#2824](https://github.com/mozilla-services/screenshots/issues/2824))
* Also pull in updated icons that have already landed in master ([#2817](https://github.com/mozilla-services/screenshots/issues/2817))

## Version 6.6.1

* Correctly set Sentry URL when exporting to mozilla-central ([#2782](https://github.com/mozilla-services/screenshots/issues/2782))

This version includes two changes that addressed Talos performance regressions discussed in [https://bugzil.la/1361792](https://bugzil.la/1361792):

* Do not update toolbar button state inside tab 'activated' event handler ([#2800](https://github.com/mozilla-services/screenshots/issues/2800))
* Start the WebExtension immediately, instead of waiting for the 'sessionstore-windows-restored' event ([#2813](https://github.com/mozilla-services/screenshots/issues/2813))

Note also that these changes have been added to Firefox directly on top of the 6.6.0 release, not on top of current master; the divergence is tracked
by the `latest-firefox-export` branch.

## Version 6.6.0

* Change metrics preference to `datareporting.healthreport.uploadEnabled` ([#2785](https://github.com/mozilla-services/screenshots/issues/2785))
  This preference is enabled on all channels, while the previous preference (`toolkit.telemetry.enabled`) is not enabled on Release (but is enabled on Beta, etc). Fixes [#2783](https://github.com/mozilla-services/screenshots/issues/2783) [8820967](https://github.com/mozilla-services/screenshots/commit/8820967)
* Add left/right keyboard shortcuts to onboarding slides [709d5b1](https://github.com/mozilla-services/screenshots/commit/709d5b1)
* call `URL.revokeObjectURL()` after download completes ([#2777](https://github.com/mozilla-services/screenshots/issues/2777)). Fixes [#2776](https://github.com/mozilla-services/screenshots/issues/2776) [db8e708](https://github.com/mozilla-services/screenshots/commit/db8e708)
* Fix the detection of shot pages for Screenshots button disabling/activation ([#2780](https://github.com/mozilla-services/screenshots/issues/2780)) [32d45bc](https://github.com/mozilla-services/screenshots/commit/32d45bc)

## Version 6.5.0

(Note: this version was never released, all its changes are bundled in 6.6.0)

* Pixel-snap-icon [7c804b4](https://github.com/mozilla-services/screenshots/commit/7c804b4)
* Fix testIfLoaded (used in onboarding) so it can see when a load is in progress ([#2762](https://github.com/mozilla-services/screenshots/issues/2762)) [c521008](https://github.com/mozilla-services/screenshots/commit/c521008)
* Update dependencies [290b047](https://github.com/mozilla-services/screenshots/commit/290b047)
* Improve the mochitest to wait for the button to appear before starting. Also use the mochitest config from the mozilla plugin to save specifying globals. ([#2759](https://github.com/mozilla-services/screenshots/issues/2759))
  * Correctly enable the mozilla plugin for ESLint [5c6733e](https://github.com/mozilla-services/screenshots/commit/5c6733e)
* disable selection when mouseup is in the scroll area ([#2726](https://github.com/mozilla-services/screenshots/issues/2726)). Fixes [#2698](https://github.com/mozilla-services/screenshots/issues/2698) [9392fe3](https://github.com/mozilla-services/screenshots/commit/9392fe3)
* don't cancel the shot process when the upload fails. Catch the particular request and connection errors that should not result in closing the selection, and do not tear down the selector in that case. Fixes [#2690](https://github.com/mozilla-services/screenshots/issues/2690) [88aae2d](https://github.com/mozilla-services/screenshots/commit/88aae2d)
* Pass through .popupMessage and .errorCode through to selector when there's a callBackground error [481d149](https://github.com/mozilla-services/screenshots/commit/481d149)
* Pass addon version through to Sentry [ab35db8](https://github.com/mozilla-services/screenshots/commit/ab35db8)
* Add .popupMessage to connection failures in `takeshot`. Instantiate `fetch()` with two arguments to work around [Raven bug](https://github.com/getsentry/raven-js/issues/924). Fixes [#2751](https://github.com/mozilla-services/screenshots/issues/2751) [5ae1a43](https://github.com/mozilla-services/screenshots/commit/5ae1a43)
* Fix TEST_FAIL_SOMETIMES, which now needs an explicit failed status [6db59b2](https://github.com/mozilla-services/screenshots/commit/6db59b2)
* avoid error popups when selector is torn down during save. Also bind several modules so that catcher works even after `selectorLoader.unloadModules` has been called. Note that an error is still signaled when there is a premature teardown, but only to the console. Fixes [#2652](https://github.com/mozilla-services/screenshots/issues/2652) [002b3d5](https://github.com/mozilla-services/screenshots/commit/002b3d5)
* Fix: Scales onboarding slides to fit smaller windows [2b97d18](https://github.com/mozilla-services/screenshots/commit/2b97d18)
* Use proxy url for favicon on shot page [76d0205](https://github.com/mozilla-services/screenshots/commit/76d0205)
* Added csrf token to /shots route. Fixes [#2730](https://github.com/mozilla-services/screenshots/issues/2730) [2c8eb39](https://github.com/mozilla-services/screenshots/commit/2c8eb39)
* Major server style update [5f3a7fc](https://github.com/mozilla-services/screenshots/commit/5f3a7fc)
* Added DMCA notice to shot page [3b694c9](https://github.com/mozilla-services/screenshots/commit/3b694c9) [ae8525e](https://github.com/mozilla-services/screenshots/commit/ae8525e)
* Force onboarding when you visit `/#hello`. Fixes [#2643](https://github.com/mozilla-services/screenshots/issues/2643) [48b37fe](https://github.com/mozilla-services/screenshots/commit/48b37fe)

## Version 6.4.0

* Improve Selenium tests For CircleCI:
  - start server before starting Selenium tests
  - Make sure the pref for system-disabled is True before installing (to workaround [#2712](https://github.com/mozilla-services/screenshots/issues/2712)), and False before running tests
  - Make channel configurable via `$FIREFOX_CHANNEL` Allow the tester to keep the window open with `$NO_CLOSE`
  - Create a test that clicks the Screenshots button, skips onboarding, clicks Save Visible, and confirms a tab opens with a shot URL
  - Make driver instantiation, which includes installing the add-on, async and blocking on add-on installation.
  - Fixes [#2695](https://github.com/mozilla-services/screenshots/issues/2695) [54aa574](https://github.com/mozilla-services/screenshots/commit/54aa574)
* Small Makefile improvements: Add `make bootstrap_zip` to build a zip that includes bootstrap.js;  Silence the messages from pontoon-to-webext; Clarify that `install.rdf` depends on `package.json` [d44f34a](https://github.com/mozilla-services/screenshots/commit/d44f34a)
* 404 images from expired shots [cb27e40](https://github.com/mozilla-services/screenshots/commit/cb27e40)
* manually dim toolbar button when disabledOn Windows and Linux, WebExtension toolbar buttons are not automatically dimmed when a button is disabled (bug 1204609). Fixes [#2708](https://github.com/mozilla-services/screenshots/issues/2708) [b1415f6](https://github.com/mozilla-services/screenshots/commit/b1415f6)
* Shutdown the embedded webExtension when bootstrap is asked to shutdown ([#2712](https://github.com/mozilla-services/screenshots/issues/2712)) [9a23339](https://github.com/mozilla-services/screenshots/commit/9a23339)
* Use Content-Disposition for downloading images [defb4b2](https://github.com/mozilla-services/screenshots/commit/defb4b2)
* use JS to open terms and privacy links on clickThis workaround is required because of a bug with e10s handling of https URLs inside moz-extension pages. Fixes [#2699](https://github.com/mozilla-services/screenshots/issues/2699) [88a0ed6](https://github.com/mozilla-services/screenshots/commit/88a0ed6)
* Stop Errors being shown when browser.tabs.get() fails as a result of tabs going away too quick, e.g. browser mochitests. [11ec080](https://github.com/mozilla-services/screenshots/commit/11ec080)
* - Apply Mozilla ESLint style, and fix resulting issues. Fixes [#2365](https://github.com/mozilla-services/screenshots/issues/2365) [03ad681](https://github.com/mozilla-services/screenshots/commit/03ad681)  [ac25801](https://github.com/mozilla-services/screenshots/commit/ac25801)  [f493102](https://github.com/mozilla-services/screenshots/commit/f493102)
* Added robots.txt route / blocking [3e3b716](https://github.com/mozilla-services/screenshots/commit/3e3b716)
* added load_test_exercise.py to circleci [9d42d8b](https://github.com/mozilla-services/screenshots/commit/9d42d8b)
* Remove embedded web extension in install manifest. ([#2688](https://github.com/mozilla-services/screenshots/issues/2688)). This causes the embedded web extension to be parsed at startup, and triggers a race condition in existing Firefox code during startup on a clean profile between AddonManager and devtools code. Removing this is not an issue for Screenshots because it delays startup of the embedded web extension until "sessionstore-windows-restored" is observed anyway.  See https://bugzilla.mozilla.org/show_bug.cgi?id=1356394 for more info. [2fa25c6](https://github.com/mozilla-services/screenshots/commit/2fa25c6)
* Set favicon of shot [46a0028](https://github.com/mozilla-services/screenshots/commit/46a0028)
* Make temporary landing page [7bd8f12](https://github.com/mozilla-services/screenshots/commit/7bd8f12)
* Set upload size limit to 25mb [99bb597](https://github.com/mozilla-services/screenshots/commit/99bb597)
* Add smiley face to selection screen [a631c18](https://github.com/mozilla-services/screenshots/commit/a631c18)
* Added CSRF protection [f86c9ce](https://github.com/mozilla-services/screenshots/commit/f86c9ce)
* Restrict req.backend to a config origin [ef9c296](https://github.com/mozilla-services/screenshots/commit/ef9c296)

## Version 6.3.0 & 6.2.0

* Implement log levels. Set log level to debug in run-addon, otherwise default to warn. Fixes [#2604](https://github.com/mozilla-services/screenshots/issues/2604) [087a853](https://github.com/mozilla-services/screenshots/commit/087a853)
* Use a moz-extension src for the overlay iframes [da19766](https://github.com/mozilla-services/screenshots/commit/da19766)
* Implement a buildSettings.js file for generally injecting settings [3716753](https://github.com/mozilla-services/screenshots/commit/3716753)
* use json instead of x-wblahhh for xhr requests [af20b24](https://github.com/mozilla-services/screenshots/commit/af20b24)
* changed window assignments to `this` in the content-scripts [ecd301b](https://github.com/mozilla-services/screenshots/commit/ecd301b)
* delete image files on delete [8271b63](https://github.com/mozilla-services/screenshots/commit/8271b63)
* sets character limit on shot title [5c26c4f](https://github.com/mozilla-services/screenshots/commit/5c26c4f) [29ace1e](https://github.com/mozilla-services/screenshots/commit/29ace1e)
* (6.2.0) Improve exporting files to mozilla-central, avoid duplicate L10n files ([#2645](https://github.com/mozilla-services/screenshots/issues/2645))
  The m-c build system protects against duplicate files, so we need to avoid those. Additionally, this patch makes it
  so that we don't export empty l10n files as we just fallback to en-US. Fixes [#2642](https://github.com/mozilla-services/screenshots/issues/2642) [211dcf6](https://github.com/mozilla-services/screenshots/commit/211dcf6)

## Version 6.1.0

* Change the mochitest to work with the system-disabled pref rather than the user facing pref. ([#2637](https://github.com/mozilla-services/screenshots/issues/2637))
  This makes the test work better due to the fact the extension will be disabled in-tree via the system-disabled pref. [bf62e73](https://github.com/mozilla-services/screenshots/commit/bf62e73)
* Webextension review changes ([#2591](https://github.com/mozilla-services/screenshots/issues/2591))
  * Add strict mode statement to all files. Addresses review comment https://github.com/mozilla-services/screenshots/pull/2471#discussion_r107981601
  * Do not assign properties to `window`. Addresses review comment https://github.com/mozilla-services/screenshots/pull/2471#discussion_r107979170
  * Use docElement.outerHTML, not DOMParser, to insert html page into iframe. Addresses comments 2 and 3 inside selector/ui.js
  * Use for..of instead of for-loop. Addresses selector/documentMetadata.js comment 1
  https://github.com/mozilla-services/screenshots/pull/2471#discussion_r107981070
  * Replace IIFE with block scope, yay es6. Addresses selector/shooter.js [comment](https://github.com/mozilla-services/screenshots/pull/2471#discussion_r107981298)
  * Use spread/rest operators to simplify assert() fn logic. Addresses shared/shot.js [comment](https://github.com/mozilla-services/screenshots/pull/2471#discussion_r109268966)
  * Nit - replace let..in with let..of
  * Nit: replace foo+"" with String(foo)
  * add onActivated listener to ensure the button state is properly toggled when switching between tabs
  * Rename shot.js makeUuid to more accurate makeRandomId
  * abstract out sendToBootstrap error checking. Fixes [#2596](https://github.com/mozilla-services/screenshots/issues/2596) Fixes [#2603](https://github.com/mozilla-services/screenshots/issues/2603) [ebe57df](https://github.com/mozilla-services/screenshots/commit/ebe57df)
* Force content-type image/png for /images. Fixes [#2466](https://github.com/mozilla-services/screenshots/issues/2466) [cec4acc](https://github.com/mozilla-services/screenshots/commit/cec4acc)
* Add eslint-plugin-promise. Fixes [#2138](https://github.com/mozilla-services/screenshots/issues/2138) [1c8b4dc](https://github.com/mozilla-services/screenshots/commit/1c8b4dc)
* Disable Screenshots on addons.mozilla.org and testpilot.firefox.com. Fixes [#2435](https://github.com/mozilla-services/screenshots/issues/2435) [48a17bb](https://github.com/mozilla-services/screenshots/commit/48a17bb)
* Make `https://screenshots.firefox.com/` /privacy, etc. shootable. Fixes [#2623](https://github.com/mozilla-services/screenshots/issues/2623) [bdac9a3](https://github.com/mozilla-services/screenshots/commit/bdac9a3)
* Signal an error when shooting a FRAMESET page. Fixes [#2489](https://github.com/mozilla-services/screenshots/issues/2489) [ccab9b6](https://github.com/mozilla-services/screenshots/commit/ccab9b6)
* Check event.isTrusted around all interactive events. Fixes [#2542](https://github.com/mozilla-services/screenshots/issues/2542) [4502739](https://github.com/mozilla-services/screenshots/commit/4502739)
* catch mousedown aggressively so that pointer-events: none doesn't cause text selection. Fixes [#2049](https://github.com/mozilla-services/screenshots/issues/2049) [0bf09c8](https://github.com/mozilla-services/screenshots/commit/0bf09c8)
* put 3 second limit on error notifications. Fixes [#2353](https://github.com/mozilla-services/screenshots/issues/2353) [3bfd844](https://github.com/mozilla-services/screenshots/commit/3bfd844)
* Add npm run update_outdated to automate some of our version updating [9785de6](https://github.com/mozilla-services/screenshots/commit/9785de6)
* Update toolbar icons. Fixes [#2572](https://github.com/mozilla-services/screenshots/issues/2572) [5124fdb](https://github.com/mozilla-services/screenshots/commit/5124fdb)
* Put user into onboarding when they click the screenshot button on an unshootable page. Fixes [#2532](https://github.com/mozilla-services/screenshots/issues/2532) [2e5ce26](https://github.com/mozilla-services/screenshots/commit/2e5ce26)
* Add IGNORE_BRANCH to allow release-version to be run on the 'wrong' branch [ec4fd0b](https://github.com/mozilla-services/screenshots/commit/ec4fd0b)
* Put in a different icon when the user is not yet onboarded. Fixes [#2569](https://github.com/mozilla-services/screenshots/issues/2569) [f6fb476](https://github.com/mozilla-services/screenshots/commit/f6fb476)
* Lazy load modules and delay WebExtension start to reduce impact on app startup. Fixes [#2575](https://github.com/mozilla-services/screenshots/issues/2575) [18f2b4d](https://github.com/mozilla-services/screenshots/commit/18f2b4d)
* Added spinner while image loads [d5913e1](https://github.com/mozilla-services/screenshots/commit/d5913e1) [af248ad](https://github.com/mozilla-services/screenshots/commit/af248ad) [c53297f](https://github.com/mozilla-services/screenshots/commit/c53297f)
* Assert data: has a png header [3cefe43](https://github.com/mozilla-services/screenshots/commit/3cefe43)
* More CSP rules. Fixes [#2423](https://github.com/mozilla-services/screenshots/issues/2423) Fixes [#2425](https://github.com/mozilla-services/screenshots/issues/2425) [6ab61da](https://github.com/mozilla-services/screenshots/commit/6ab61da)
* Added X-Content-Type-Options: nosniff. Fixes [#2219](https://github.com/mozilla-services/screenshots/issues/2219) [8d76ab0](https://github.com/mozilla-services/screenshots/commit/8d76ab0)

## Version 6.0.0

This release is a port to WebExtensions, including a refactoring of most of the client!

6.0.0 was not released to the public

* Use webextension downloads api [9e46c14](https://github.com/mozilla-services/screenshots/commit/9e46c14)
* Run the selector js on document_end instead of document_idle.  Fixes [#2525](https://github.com/mozilla-services/screenshots/issues/2525) [0cec951](https://github.com/mozilla-services/screenshots/commit/0cec951)
* Implement onboarding slideshow [7535df8](https://github.com/mozilla-services/screenshots/commit/7535df8) [#2307](https://github.com/mozilla-services/screenshots/issues/2307)
* Fix Save button Add-on too narrow for localization [1e4a913](https://github.com/mozilla-services/screenshots/commit/1e4a913) [06d1c54](https://github.com/mozilla-services/screenshots/commit/06d1c54)
* Remove user urls from sentry data [1eb9177](https://github.com/mozilla-services/screenshots/commit/1eb9177)
* Add an initial skeleton mochitest to check for presence of the screenshot button. Fixes [#2320](https://github.com/mozilla-services/screenshots/issues/2320) [19682b3](https://github.com/mozilla-services/screenshots/commit/19682b3)
* Update addon with finalized strings [fcbf789](https://github.com/mozilla-services/screenshots/commit/fcbf789)
* remove /api/unload and /api/update from the server. Fixes [#2328](https://github.com/mozilla-services/screenshots/issues/2328) Fixes [#2329](https://github.com/mozilla-services/screenshots/issues/2329) [3065ed8](https://github.com/mozilla-services/screenshots/commit/3065ed8)
* Add SameSite to cookies [#2187](https://github.com/mozilla-services/screenshots/issues/2187) [6fd75c3](https://github.com/mozilla-services/screenshots/commit/6fd75c3)
* delete data instead of device on delete-all [005ed9e](https://github.com/mozilla-services/screenshots/commit/005ed9e)
* Add CONTRIBUTORS [fcc1591](https://github.com/mozilla-services/screenshots/commit/fcc1591)
* Focus pre-selection iframe when it is displayed. Add tabindex to the buttons on that page. Change pre-selection buttons to <button> so Enter/Space works. Remove flex from the buttons and put it into an interior element to make styling work [48556df](https://github.com/mozilla-services/screenshots/commit/48556df)
* Ensure auth when visiting /shots from addon [ddf6a12](https://github.com/mozilla-services/screenshots/commit/ddf6a12)
* Control Sentry with Telemetry pref. Fixes [#2460](https://github.com/mozilla-services/screenshots/issues/2460) [a265f16](https://github.com/mozilla-services/screenshots/commit/a265f16)
* Lazily check auth state on My Shots page. Fixes [#2414](https://github.com/mozilla-services/screenshots/issues/2414) [ddf21ee](https://github.com/mozilla-services/screenshots/commit/ddf21ee)
* Turn off Travis and remove references. Fixes [#2355](https://github.com/mozilla-services/screenshots/issues/2355) [cf33813](https://github.com/mozilla-services/screenshots/commit/cf33813)
* Split screenshot iframe into preselection and selection
  iframes. closes [#2162](https://github.com/mozilla-services/screenshots/issues/2162) [d4bc0c6](https://github.com/mozilla-services/screenshots/commit/d4bc0c6)
* disable the pageshot button on about,data,moz-extension pages [3159dd0](https://github.com/mozilla-services/screenshots/commit/3159dd0)
* closes /creating tab if upload fails [e812186](https://github.com/mozilla-services/screenshots/commit/e812186)
* Remove URL collection. Adds and calculates shot.origin Makes some logic that used shot.url conditional. Database migration to make data.url nullable. Fixes [#2376](https://github.com/mozilla-services/screenshots/issues/2376) [a9a076a](https://github.com/mozilla-services/screenshots/commit/a9a076a)
* Change addon id to screenshots@mozilla.org [0e5c2c2](https://github.com/mozilla-services/screenshots/commit/0e5c2c2)
* Renamed everything "pageshot" or "Page Shot" to "screenshots"
* Cleaned many unused images and CSS rules
* Rename `PAGESHOT_*` environmental variables to `SCREENSHOTS_*`
* toggle webextension on pref change. Other changes: (1) unset deviceId pref set by old addon. (2) Update Promise rejection / Error handling to match behavior
  documented in the addons-related Gecko code. Fixes [#2332](https://github.com/mozilla-services/screenshots/issues/2332) Fixes [#2333](https://github.com/mozilla-services/screenshots/issues/2333) Fixes [#2370](https://github.com/mozilla-services/screenshots/issues/2370) [b28d687](https://github.com/mozilla-services/screenshots/commit/b28d687)
* let sitehelper log you in if the website requests it. Change auth.login() to return the login success. Change auth.login() to have options for asking about ownership information, and suppressing register-on-failed-login. Change server to do an ownership check on a shot on successful login. Add wantsauth script that is used to eagerly talk to the addon and try to initiate login. Change shot/controller to use wantsauth. Fixes [#2220](https://github.com/mozilla-services/screenshots/issues/2220) [c53d27c](https://github.com/mozilla-services/screenshots/commit/c53d27c)
* use window.crypto.getRandomValues [3983030](https://github.com/mozilla-services/screenshots/commit/3983030)
* fix: changes some styles to make expired shot page text more
  visible [66c490e](https://github.com/mozilla-services/screenshots/commit/66c490e)
* let webextension run without bootstrap.js. Adds
  communication.sendToBootstrap() to handle communicating with the parent.
  Specifically catches the error when the parent/bootstrap does not exist.
  Simplify the loadSelector logic by relying on the promise to reject. Add
  null; to the bottom of loadSelector so it can be loaded without an error. Fixes [#2372](https://github.com/mozilla-services/screenshots/issues/2372) [d579854](https://github.com/mozilla-services/screenshots/commit/d579854)
* Remove unguarded access to optional attributes.  Avoids
  ReferenceError warnings in the console. More deeply remove shot.deviceId,
  which wasn't entirely cleaned up. [b396797](https://github.com/mozilla-services/screenshots/commit/b396797)
* Add pontoon strings & build step to transform into
  webextension strings
  - Add pontoon-to-webext.js script from bwinton/SnoozeTabs repo and
  related npm dependencies (to be removed when/if that script is
  published on npm as a standalone module).
  - Add extracted strings to a properties file at the location expected by
  Pontoon. Remove the webextension-formatted strings from git.
  - Add a pontoon-to-webextension build step to the Makefile.
  This commit, together with the fix for [#2344](https://github.com/mozilla-services/screenshots/issues/2344), closes [#2294](https://github.com/mozilla-services/screenshots/issues/2294). [f9e24d7](https://github.com/mozilla-services/screenshots/commit/f9e24d7)
* fix bug in Enter-to-save. Fixes [#2271](https://github.com/mozilla-services/screenshots/issues/2271) [a8024b6](https://github.com/mozilla-services/screenshots/commit/a8024b6)
* migrate data from old add-on. Fixes [#2260](https://github.com/mozilla-services/screenshots/issues/2260) [64213c0](https://github.com/mozilla-services/screenshots/commit/64213c0)
* removed rich copy [9083057](https://github.com/mozilla-services/screenshots/commit/9083057)
* Provides export_addon makefile rule to export
  pageshot into a mozilla-central based repository.
  The environment variable EXPORT_MC_LOCATION provides for changing where the add-on is exported to. Fixes [#2318](https://github.com/mozilla-services/screenshots/issues/2318) [bd50aeb](https://github.com/mozilla-services/screenshots/commit/bd50aeb)
* Extract strings using WebExtension i18n library
  Fixes part of [#2294](https://github.com/mozilla-services/screenshots/issues/2294). [b3df1c6](https://github.com/mozilla-services/screenshots/commit/b3df1c6)
* make sendEvent conditional on whether the user has
  opted-out of Telemetry generally. Fixes [#2250](https://github.com/mozilla-services/screenshots/issues/2250) [b07a29e](https://github.com/mozilla-services/screenshots/commit/b07a29e)
* include left/right and not just top/bottom in the
  rule for when to capture an element's text. Fixes [#2174](https://github.com/mozilla-services/screenshots/issues/2174) [20ecd85](https://github.com/mozilla-services/screenshots/commit/20ecd85)
* replace chrome.* APIs with browser.* equivalents. Fixes [#2184](https://github.com/mozilla-services/screenshots/issues/2184) [b146357](https://github.com/mozilla-services/screenshots/commit/b146357)
* fix: Redirects new tab to my shots [4bf93ea](https://github.com/mozilla-services/screenshots/commit/4bf93ea)
* Wrap the webextension in a bootstrap addon. Fixes [#2222](https://github.com/mozilla-services/screenshots/issues/2222) [8beeeb7](https://github.com/mozilla-services/screenshots/commit/8beeeb7)
* Remove Shot.deviceId remove deviceId from the shot
  itself, treat it as metadata. Fixes [#2214](https://github.com/mozilla-services/screenshots/issues/2214) [1519b7c](https://github.com/mozilla-services/screenshots/commit/1519b7c)
* Remove things from Shot:
  - text clip support (leaving only image clips) [c05d2f2](https://github.com/mozilla-services/screenshots/commit/c05d2f2)
  - Shot.resources [efe009c](https://github.com/mozilla-services/screenshots/commit/efe009c)
  - Shot.isPublic [7501f90](https://github.com/mozilla-services/screenshots/commit/7501f90)
  - Shot.showPage, and commented-out functions for adding page data to an existing shot [8a29323](https://github.com/mozilla-services/screenshots/commit/8a29323)
  - Remove Shot.comments and clip comments [3b6c6ac](https://github.com/mozilla-services/screenshots/commit/3b6c6ac)
  - Remove Shot.hashtags attribute [be8fd36](https://github.com/mozilla-services/screenshots/commit/be8fd36)
  - Remove head/body/`*attrs` from Shot Remove head and body from the database Remove readable attribute from Shot remove commented-out /api/add-saved-shot-data route. Fixes [#2326](https://github.com/mozilla-services/screenshots/issues/2326) [952fbd8](https://github.com/mozilla-services/screenshots/commit/952fbd8)
  - Remove shot.createdDevice [f648e46](https://github.com/mozilla-services/screenshots/commit/f648e46)
  - Remove use of shot.ogTitle, in preference for shot.openGraph.title [80512a2](https://github.com/mozilla-services/screenshots/commit/80512a2)
  - Remove dirty tracking from AbstractShot [9fae30d](https://github.com/mozilla-services/screenshots/commit/9fae30d)
* removed 'copied' notification if the copy failed [22a4519](https://github.com/mozilla-services/screenshots/commit/22a4519)
* add context menu. Fixes [#2191](https://github.com/mozilla-services/screenshots/issues/2191) [a65b7c3](https://github.com/mozilla-services/screenshots/commit/a65b7c3)
* remove the snapping module. Fixes [#2159](https://github.com/mozilla-services/screenshots/issues/2159) [f8c71e2](https://github.com/mozilla-services/screenshots/commit/f8c71e2)
* set a default sentryPublicDSN directly in the
  addon Put the actual DSNs into release-version so each version will get built
  appropriately Refactor set_backend and set_sentry in Makefile to both use
  set_file. Fixes [#2240](https://github.com/mozilla-services/screenshots/issues/2240) [3371bab](https://github.com/mozilla-services/screenshots/commit/3371bab)
* added circle.yml [2c06139](https://github.com/mozilla-services/screenshots/commit/2c06139)
* trim down view.js. Fixes [#2203](https://github.com/mozilla-services/screenshots/issues/2203) [dd6bc99](https://github.com/mozilla-services/screenshots/commit/dd6bc99)
* don't login until absolutely necessary, and allow
  submission POST /event with a non-signed non-cookie deviceId. Fixes [#2167](https://github.com/mozilla-services/screenshots/issues/2167) [6adbfea](https://github.com/mozilla-services/screenshots/commit/6adbfea)
* Put in a supportsDrawWindow so in the future we can suppress
  features we don't support [088b903](https://github.com/mozilla-services/screenshots/commit/088b903)
* Use canvas.drawWindow when it is available [b2c3b5a](https://github.com/mozilla-services/screenshots/commit/b2c3b5a)
* Setup alternate authentication method for the server. In
  addition to cookies, logins will now also send an authHeader value, which is
  put into x-pageshot-auth. This contains alternately encoded signed
  authentication values.  deviceId is easily extractable for future use in
  balancing (if we so choose) [c0e0ed3](https://github.com/mozilla-services/screenshots/commit/c0e0ed3)
* Build inline-selection.css into a JS file for the
  WebExtension [5ddd384](https://github.com/mozilla-services/screenshots/commit/5ddd384)
* Rename shooter-interactive-worker to uicontrol.  Fixes [#1889](https://github.com/mozilla-services/screenshots/issues/1889) [83832f3](https://github.com/mozilla-services/screenshots/commit/83832f3)
* Add --setup-profile to help create the ./Profile/ directory
  for testing [d6397ee](https://github.com/mozilla-services/screenshots/commit/d6397ee)
* Add CORS headers so the WebExtension can access the API
  calls.  Suppress HSTS on localhost [f4f51a5](https://github.com/mozilla-services/screenshots/commit/f4f51a5)
* Make run-addon use web-ext.  Remove autoloading since web-ext handles that on its own [e06b407](https://github.com/mozilla-services/screenshots/commit/e06b407)
* remove contentApp.  Move /proxy to the main app
  (still used for favicons). Fixes [#2153](https://github.com/mozilla-services/screenshots/issues/2153) [7e76323](https://github.com/mozilla-services/screenshots/commit/7e76323)
* put Save and Cancel inside the selection box when
  the selection is at the bottom of the page. Fixes [#2043](https://github.com/mozilla-services/screenshots/issues/2043) [38becf4](https://github.com/mozilla-services/screenshots/commit/38becf4)
* clean out server/src/views. Fixes [#1843](https://github.com/mozilla-services/screenshots/issues/1843) [2b2584d](https://github.com/mozilla-services/screenshots/commit/2b2584d)
* Add growl message when release-version finishes [e07cc8e](https://github.com/mozilla-services/screenshots/commit/e07cc8e)

## Version 5

### A/B tests

* Add bright My Shots button A/B test [#2082](https://github.com/mozilla-services/screenshots/issues/2082) [a168101](https://github.com/mozilla-services/screenshots/commit/a168101), [57f6695](https://github.com/mozilla-services/screenshots/commit/57f6695)
* Create A/B test for auto-opening the share panel. Fixes [#2079](https://github.com/mozilla-services/screenshots/issues/2079) [0187d31](https://github.com/mozilla-services/screenshots/commit/0187d31)
* create FORCE_AB_TESTS to force-turn-on an A/B test
  in development. Fixes [#2108](https://github.com/mozilla-services/screenshots/issues/2108) [32df868](https://github.com/mozilla-services/screenshots/commit/32df868)
* Start [#2081](https://github.com/mozilla-services/screenshots/issues/2081), implement an A/B test of badging the toolbar button until it is first clicked [c4c916b](https://github.com/mozilla-services/screenshots/commit/c4c916b), [319c312](https://github.com/mozilla-services/screenshots/commit/319c312)
* Design and implement an A/B testing system. People are put into tests by the server at login time Tests may stick to the shots created when the test is in place, then viewers will be associated with that test. Tests each map to a GA field (cdX for some value of X). Fixes [#2077](https://github.com/mozilla-services/screenshots/issues/2077) [86c8663](https://github.com/mozilla-services/screenshots/commit/86c8663)
* Add new database version (13) to save ab_tests in devices
  table [0a0a095](https://github.com/mozilla-services/screenshots/commit/0a0a095)

### Small fixes

* Remove/comment-out hotkey, which was causing problems for some people with non-US keyboards. Fixes [#2107](https://github.com/mozilla-services/screenshots/issues/2107) [5148017](https://github.com/mozilla-services/screenshots/commit/5148017)
* Add a right-click context menu on the clip image itself: Copy
  Image Text [40a6657](https://github.com/mozilla-services/screenshots/commit/40a6657)
* Move buttons away from edge [4d84295](https://github.com/mozilla-services/screenshots/commit/4d84295)
* Do not show the call-to-action banner on mobile. Fixes [#2087](https://github.com/mozilla-services/screenshots/issues/2087) [8e7275c](https://github.com/mozilla-services/screenshots/commit/8e7275c)
* Updates of npm packages. Fixes [#2078](https://github.com/mozilla-services/screenshots/issues/2078) [6d67449](https://github.com/mozilla-services/screenshots/commit/6d67449) and [90bafae](https://github.com/mozilla-services/screenshots/commit/90bafae)
* Make sure createdDate is updated with the save time, not just
  the time you hit the button [dacd671](https://github.com/mozilla-services/screenshots/commit/dacd671)
* remove image finding, using the same flag we use
  to remove image location annotation. Fixes [#2100](https://github.com/mozilla-services/screenshots/issues/2100) [7eb41ba](https://github.com/mozilla-services/screenshots/commit/7eb41ba)
* add dbSchemaVersion to /__version__. Fixes [#2088](https://github.com/mozilla-services/screenshots/issues/2088) [575a62a](https://github.com/mozilla-services/screenshots/commit/575a62a)
* reject blob (or any non-http(s)) images detected
  in the document. Fixes [#2094](https://github.com/mozilla-services/screenshots/issues/2094) [bab63a5](https://github.com/mozilla-services/screenshots/commit/bab63a5)
* mark non-interactive Google Analytics events as ni
  (non-interactive). Fixes [#2076](https://github.com/mozilla-services/screenshots/issues/2076) [439e79b](https://github.com/mozilla-services/screenshots/commit/439e79b)
* Show a different banner if a non-Firefox user
  views a shot; link those users to Get Firefox. Link the Firefox page using
  specific utm codes. Fixes [#2085](https://github.com/mozilla-services/screenshots/issues/2085) [f9501ef](https://github.com/mozilla-services/screenshots/commit/f9501ef)
* include a FORCE_DB_VERSION config variable to ask
  the server to downgrade.  Plus instructions on how to rollback. Fixes [#2051](https://github.com/mozilla-services/screenshots/issues/2051) [b85308c](https://github.com/mozilla-services/screenshots/commit/b85308c)
* Simplify how the stylesheet is included in the selection
  iframe [64ffddd](https://github.com/mozilla-services/screenshots/commit/64ffddd)
* put the text into the <img alt> so it'll get
  copied when you copy the image, and pasted if you paste in a text area. Fixes [#2056](https://github.com/mozilla-services/screenshots/issues/2056) [d017043](https://github.com/mozilla-services/screenshots/commit/d017043)

## Version 4

### UI/Visible Changes

* Add a download-only button when you make a
  selection. [#2024](https://github.com/mozilla-services/screenshots/issues/2024)
* close the share panel after clicking on an item. Fixes [#2034](https://github.com/mozilla-services/screenshots/issues/2034) [61e0664](https://github.com/mozilla-services/screenshots/commit/61e0664)
* fix regression from updating the selection. A
  previous 'fix' to double-clicking the Save button actually suppressed
  subsequent updates of the selection. Fixes [#2046](https://github.com/mozilla-services/screenshots/issues/2046) [d331fdd](https://github.com/mozilla-services/screenshots/commit/d331fdd)
* do not show error popup on startup if we can't
  login to the server. Fixes [#2006](https://github.com/mozilla-services/screenshots/issues/2006) [738eedf](https://github.com/mozilla-services/screenshots/commit/738eedf)

### Metrics and backend changes

* track og:image images differently than other
  direct link images. Fixes [#2041](https://github.com/mozilla-services/screenshots/issues/2041) [8dfd52e](https://github.com/mozilla-services/screenshots/commit/8dfd52e)
* add a $DISABLE_CONTROLLER_TASKS variable that controls
  if this server instance should handle database upgrades and periodic tasks. Fixes [#1978](https://github.com/mozilla-services/screenshots/issues/1978) [2d4df88](https://github.com/mozilla-services/screenshots/commit/2d4df88)
* even if user.initialize() is called many times, do
  not keep sending requests to the server. Fixes [#1956](https://github.com/mozilla-services/screenshots/issues/1956) [85db7e7](https://github.com/mozilla-services/screenshots/commit/85db7e7)

## Version 3

### In-browser UI changes

* Move Save and Cancel buttons below the selection. Fixes [#1629](https://github.com/mozilla-services/screenshots/issues/1629) [8ba9223](https://github.com/mozilla-services/screenshots/commit/8ba9223)
* Add pixel dimensions when starting and dragging
  the selection. Fixes [#1848](https://github.com/mozilla-services/screenshots/issues/1848) [4915115](https://github.com/mozilla-services/screenshots/commit/4915115)
* Change to `cursor: move` on the selection box. Fixes [#1768](https://github.com/mozilla-services/screenshots/issues/1768) [c5aa6ae](https://github.com/mozilla-services/screenshots/commit/c5aa6ae)
* Add *Create ...* item in the context menu. Fixes [#1922](https://github.com/mozilla-services/screenshots/issues/1922) [c220524](https://github.com/mozilla-services/screenshots/commit/c220524)
* Add paste instructions to notification popups. Fixes [#1776](https://github.com/mozilla-services/screenshots/issues/1776) [5659166](https://github.com/mozilla-services/screenshots/commit/5659166)
* Render the selection interface in an iframe, so that it doesn't conflict or get affected by any styles in the document itself.  Multiple commits:
  * Iframe sizing,  [23dc2b4](https://github.com/mozilla-services/screenshots/commit/23dc2b4)
  * Create `ui.iframe` and put elements into it [91ed846](https://github.com/mozilla-services/screenshots/commit/91ed846)
  * Event handlers [c424544](https://github.com/mozilla-services/screenshots/commit/c424544) and  [6a19400](https://github.com/mozilla-services/screenshots/commit/6a19400)
  * Initial commit with basics are working [3e0f0f9](https://github.com/mozilla-services/screenshots/commit/3e0f0f9) and [17c1406](https://github.com/mozilla-services/screenshots/commit/17c1406)

### Web UI changes

* Put in a delete option directly on My Shots, fixes [#1346](https://github.com/mozilla-services/screenshots/issues/1346) [9cb179e](https://github.com/mozilla-services/screenshots/commit/9cb179e)
* Direct feedback to Discourse. Fixes [#1604](https://github.com/mozilla-services/screenshots/issues/1604) [bab16dd](https://github.com/mozilla-services/screenshots/commit/bab16dd)
* Add a better title to search results. Fixes [#1909](https://github.com/mozilla-services/screenshots/issues/1909) [09d0e6e](https://github.com/mozilla-services/screenshots/commit/09d0e6e)
* Implement rich copy. Button is shown only when
  extension is present. Fixes [#1693](https://github.com/mozilla-services/screenshots/issues/1693) [abb0a1f](https://github.com/mozilla-services/screenshots/commit/abb0a1f)

### Server changes

* Use the Raven Express middleware. Fixes [#1583](https://github.com/mozilla-services/screenshots/issues/1583) [9f4a655](https://github.com/mozilla-services/screenshots/commit/9f4a655)
* Do not overwrite NODE_ENV if it is set [fdac82f](https://github.com/mozilla-services/screenshots/commit/fdac82f)
* Enable uglify compression, for about 50% size improvement.
  . Fixes [#1803](https://github.com/mozilla-services/screenshots/issues/1803) [80e84e8](https://github.com/mozilla-services/screenshots/commit/80e84e8)
* Make bundle scripts and raven activation async. Fixes [#1804](https://github.com/mozilla-services/screenshots/issues/1804) [e4ac283](https://github.com/mozilla-services/screenshots/commit/e4ac283)
* When erasing the search, change to URL to /shots instead of
  /shots?q= [9bde83d](https://github.com/mozilla-services/screenshots/commit/9bde83d)
* Update
  reactruntime so that changes to the model.title automatically get reflected
  in document.title. [09d0e6e](https://github.com/mozilla-services/screenshots/commit/09d0e6e)
* Give a better exception when keygrip keys aren't set, and we
  try to hash a user ID [cbecc70](https://github.com/mozilla-services/screenshots/commit/cbecc70)
* Add package.json version to `/__version__`. Fixes [#1928](https://github.com/mozilla-services/screenshots/issues/1928) [3fcf252](https://github.com/mozilla-services/screenshots/commit/3fcf252)
* Run all svgs through `svgo` during the build process. Fixes [#1389](https://github.com/mozilla-services/screenshots/issues/1389) [3dcfb35](https://github.com/mozilla-services/screenshots/commit/3dcfb35)
* Make it so that calls to `/api/login` can't loop in case of
  failures or missing cookies [02d175a](https://github.com/mozilla-services/screenshots/commit/02d175a)
* Remove the `device_activity` table. Fixes [#1954](https://github.com/mozilla-services/screenshots/issues/1954) [dc1100c](https://github.com/mozilla-services/screenshots/commit/dc1100c)
* Add keygrip check to `/__heartbeat__`. This is
  probably redundant, as the middleware will fail if keygrip isn't initialized. Fixes [#1931](https://github.com/mozilla-services/screenshots/issues/1931) [a678028](https://github.com/mozilla-services/screenshots/commit/a678028)
* Make server abort with exit code 1 if database
  initialization isn't successful. Fixes [#1933](https://github.com/mozilla-services/screenshots/issues/1933) [8238ddd](https://github.com/mozilla-services/screenshots/commit/8238ddd)
* Allow `$NO_UGLIFY` to avoid uglifying the source while
  bundling.  Only works on rebuild. [82e9cc3](https://github.com/mozilla-services/screenshots/commit/82e9cc3)
* Send Raven report when metrics updating fails
  Allow REFRESH_METRICS_TIME to be 0, disabling the refresh. Fixes [#1946](https://github.com/mozilla-services/screenshots/issues/1946) [e4da720](https://github.com/mozilla-services/screenshots/commit/e4da720)

### Metrics changes

* Send timing information to GA for more steps. This
  changes the signature of sendTiming() and is more explicit about that
  signature. Add functions to help time pieces of the process. Fixes [#936](https://github.com/mozilla-services/screenshots/issues/936) [352398c](https://github.com/mozilla-services/screenshots/commit/352398c)
* When making a login at `/api/login`, send a GA event. Also
  remove unused deviceInfo variables [3c8fe96](https://github.com/mozilla-services/screenshots/commit/3c8fe96)
* Pass isOwner through to share panel, so all events don't
  appear as non-owner [a6b4dce](https://github.com/mozilla-services/screenshots/commit/a6b4dce)
* Don't recreate `/metrics` if they are fresh enough Make the
  polling interval on refreshing metrics slightly randomized, so multiple
  workers don't pile on [8d61f00](https://github.com/mozilla-services/screenshots/commit/8d61f00)

### Bug fixes

* Do not load our stylesheet into the main page. Fixes [#1596](https://github.com/mozilla-services/screenshots/issues/1596) [7ac0e43](https://github.com/mozilla-services/screenshots/commit/7ac0e43)
* Suppress some errors that are happening during teardown, when
  the document is no longer valid [e99a2bc](https://github.com/mozilla-services/screenshots/commit/e99a2bc)
* Never force login/initialization on sendEvent. Fixes [#1963](https://github.com/mozilla-services/screenshots/issues/1963) [4dea856](https://github.com/mozilla-services/screenshots/commit/4dea856)
* Fix a client/server render mismatch, where urlIfDeleted and
  title weren't being put into the server-side shot [109bc3c](https://github.com/mozilla-services/screenshots/commit/109bc3c)
* Don't allow the shot to be taken more than once. Fixes [#1799](https://github.com/mozilla-services/screenshots/issues/1799) [fafef59](https://github.com/mozilla-services/screenshots/commit/fafef59)
* Remove messaging from helperworker and viewerworker that are
  no longer being used Comment out but leave in saved/stored full page
  messaging [4224448](https://github.com/mozilla-services/screenshots/commit/4224448)
* Catch all exceptions in interactive-worker with
  watchFunction/watchPromise. Fixes [#1888](https://github.com/mozilla-services/screenshots/issues/1888) [f693b9f](https://github.com/mozilla-services/screenshots/commit/f693b9f)

## Version 2

### Visible changes to the product

* **Make the shot title editable**.  To edit the title simply click on it from the shot page (See [#573](https://github.com/mozilla-services/screenshots/issues/573) [cc10632](https://github.com/mozilla-services/screenshots/commit/cc10632))
* **Site-specific improvements to autoselection**. New heuristics select one Facebook comment or post, and one tweet.  (See [#1797](https://github.com/mozilla-services/screenshots/issues/1797) [#1796](https://github.com/mozilla-services/screenshots/issues/1796) [8fe813f](https://github.com/mozilla-services/screenshots/commit/8fe813f))
* **Append .png to all image URLs** (See [#1782](https://github.com/mozilla-services/screenshots/issues/1782) [d7ebfbc](https://github.com/mozilla-services/screenshots/commit/d7ebfbc))
* **Make a public metrics page available**.  It will be in `/metrics` (will be published to https://pageshot.net/metrics).  (See  [#1825](https://github.com/mozilla-services/screenshots/issues/1825) [#1854](https://github.com/mozilla-services/screenshots/issues/1854) [89a8d9c](https://github.com/mozilla-services/screenshots/commit/89a8d9c))
* **Scroll selection when your mouse is close to the edge of the window**. Fixes [#193](https://github.com/mozilla-services/screenshots/issues/193) [28bcd17](https://github.com/mozilla-services/screenshots/commit/28bcd17)

### Bugs fixed

* Avoid exception on pages that have multiple `og:title` properties; both
  store only the first, and handle stored pages that may have multiple titles
  stored. Fixes [#1887](https://github.com/mozilla-services/screenshots/issues/1887) [9375962](https://github.com/mozilla-services/screenshots/commit/9375962)
* Ensure suggested filenames for downloaded files stay under 255 bytes. Fixes [#1820](https://github.com/mozilla-services/screenshots/issues/1820) [f1dba6b](https://github.com/mozilla-services/screenshots/commit/f1dba6b)
* Handle null cookies results when checking for an
  authentication cookie [dda178f](https://github.com/mozilla-services/screenshots/commit/dda178f)

### Minor changes

* change email share graphic. Fixes [#1650](https://github.com/mozilla-services/screenshots/issues/1650) [34f1ca8](https://github.com/mozilla-services/screenshots/commit/34f1ca8)
* redirect /favicon.ico to
  /static/img/icon-32.png. Fixes [#1840](https://github.com/mozilla-services/screenshots/issues/1840) [34056c0](https://github.com/mozilla-services/screenshots/commit/34056c0)
* (v2.4) restore the share notification message. Fixes [#1918](https://github.com/mozilla-services/screenshots/issues/1918) [fdda2ec](https://github.com/mozilla-services/screenshots/commit/fdda2ec)
* (v2.4) revert to 'page' when the title isn't found. Fixes [#1836](https://github.com/mozilla-services/screenshots/issues/1836) [295e5b6](https://github.com/mozilla-services/screenshots/commit/295e5b6)
* (v2.4) add specific images for no search results and no
  shots at all. Fixes [#1770](https://github.com/mozilla-services/screenshots/issues/1770) [4e04411](https://github.com/mozilla-services/screenshots/commit/4e04411)
* (v2.4) Update some metrics queries: - Do not filter out shots that
  seem expired from the shot total count - Simplify some aliases in queries
  (not using aliasing in FROM) - Add a total retention table [efab5e1](https://github.com/mozilla-services/screenshots/commit/efab5e1)

### Internal refactoring.

* Hardcode the sentry public DSN so we receive error reports before successful login.  It will still be
  overwritten on login (including erasing it), but until that happens it will
  fall back to the production DSN. Fixes [#1883](https://github.com/mozilla-services/screenshots/issues/1883) [1f76fcc](https://github.com/mozilla-services/screenshots/commit/1f76fcc)
* Direct abuse reports to a dedicated email address. Fixes [#1855](https://github.com/mozilla-services/screenshots/issues/1855) [a69d756](https://github.com/mozilla-services/screenshots/commit/a69d756)
* Don't overload the `upload` GA event action as both success and failure states (see [Metrics](https://github.com/mozilla-services/screenshots/blob/master/docs/METRICS.md) for more info). Fixes [#1759](https://github.com/mozilla-services/screenshots/issues/1759) [375cbff](https://github.com/mozilla-services/screenshots/commit/375cbff)
* Combine `configure-raven.js` with the `raven.js`
  client, into `/install-raven.js`. Load raven via require() instead of a direct
  link.  Remove the now-unneeded `static/vendor/` directory, and Makefile rules
  related to it. Fixes [#1801](https://github.com/mozilla-services/screenshots/issues/1801) [6841236](https://github.com/mozilla-services/screenshots/commit/6841236)
* Combine `parent-helper.js` and
  `set-content-hosting-origin.js`. Make the scripts inclusion dependent on there
  being a full page/iframe. Fixes [#1802](https://github.com/mozilla-services/screenshots/issues/1802) [6db660d](https://github.com/mozilla-services/screenshots/commit/6db660d)
* Move `errorResponse()`, `simpleResponse()`, and `jsResponse()`
  to a new module. Move raven into its own module as well. Fixes [#1839](https://github.com/mozilla-services/screenshots/issues/1839) [6a06eb2](https://github.com/mozilla-services/screenshots/commit/6a06eb2)
* First pass at some [deployment documentation](https://github.com/mozilla-services/screenshots/blob/master/docs/deployment.md). Fixes [#1871](https://github.com/mozilla-services/screenshots/issues/1871) [e4b00c0](https://github.com/mozilla-services/screenshots/commit/e4b00c0)
* Increase default period of time to check for
  deleted shots from 1 minute to 1 hour. Fixes [#1865](https://github.com/mozilla-services/screenshots/issues/1865) [7589d5e](https://github.com/mozilla-services/screenshots/commit/7589d5e)
* Add GA logging for any shots that are deleted
  after the expiration time. Fixes [#1692](https://github.com/mozilla-services/screenshots/issues/1692) [dcb380b](https://github.com/mozilla-services/screenshots/commit/dcb380b)
* Move the share panel and button entirely into its
  own component fix share panel alignment when extension
  notification banner is in place. Fixes [#1714](https://github.com/mozilla-services/screenshots/issues/1714) Fixes [#1565](https://github.com/mozilla-services/screenshots/issues/1565) [ab468fd](https://github.com/mozilla-services/screenshots/commit/ab468fd)
* (v2.4) check before trying to call window.sendToChild,
  which is safely missing on most pages. Fixes [#1910](https://github.com/mozilla-services/screenshots/issues/1910) [5333ae7](https://github.com/mozilla-services/screenshots/commit/5333ae7)

### Version 2.5

A version released to improve some operational issues.

* make server abort with exit code 1 if database
  initialization isn't successful. Fixes [#1933](https://github.com/mozilla-services/screenshots/issues/1933) [8238ddd](https://github.com/mozilla-services/screenshots/commit/8238ddd)
* Make the /metrics page disableable with $DISABLE_METRICS [a18437a](https://github.com/mozilla-services/screenshots/commit/a18437a)
* Don't recreate the metrics if they are fresh enough Make the
  polling interval on refreshing metrics slightly randomized, so multiple
  workers don't pile on [8d61f00](https://github.com/mozilla-services/screenshots/commit/8d61f00)
* send Raven report when metrics updating fails
  Allow REFRESH_METRICS_TIME to be 0, disabling the refresh. Fixes [#1946](https://github.com/mozilla-services/screenshots/issues/1946) [e4da720](https://github.com/mozilla-services/screenshots/commit/e4da720)

## Version 1

### Visible changes to the product

* For each release we'll be adding one to the next version (i.e., the version after this will be Version 2)
* There is a "Save Full Page" and "Save visible" option for saving either the full length of the page, or the entire visible portion of the page.
* The add-on now automatically copies the shot URL to the clipboard.
* The autoselection when you click will now be previewed with a white box as you hover.
  * Also improvements to the autoselection algorithm, avoiding very small selections.
* Some URLs were being rejected: those with ports, `view-source` URLs, and URLs in some situations where the content was cached.
* Search on My Shots is now done as you type.
* Improvements to the selection itself:
  * You can drag the selection
  * You can invert the selection when resizing
  * You can drag out a new selection over the old selection
* In some error conditions the tool would become unresponsive on a tab.
* Server authentication could be lost (for instance with a cookie destroying add-on).  We now attempt to re-login if we detect the cookies are gone.

### Detailed product/UI changes

* Stop auto-opening Share panel. Fixes [#1794](https://github.com/mozilla-services/screenshots/issues/1794) [d4964a7](https://github.com/mozilla-services/screenshots/commit/d4964a7)
* add mozilla logo [b68d28e](https://github.com/mozilla-services/screenshots/commit/b68d28e)
* error when hovering over elements like <html> that
  have no bounding rectangle Also avoid autoselections that are terribly small,
  even if there's no better fallback add metrics for the distance
  the selection moves or resizes. Fixes [#1784](https://github.com/mozilla-services/screenshots/issues/1784) Fixes [#1781](https://github.com/mozilla-services/screenshots/issues/1781) [8171dfb](https://github.com/mozilla-services/screenshots/commit/8171dfb)
* we can't actually support pages that use frames,
  but at least this detects it and gives an error. Fixes [#1748](https://github.com/mozilla-services/screenshots/issues/1748) [9aa7929](https://github.com/mozilla-services/screenshots/commit/9aa7929)
* when the autoselect is small try to add the next
  sibling (or uncle) element. Fixes [#1774](https://github.com/mozilla-services/screenshots/issues/1774) [a3b8604](https://github.com/mozilla-services/screenshots/commit/a3b8604)
* don't let a clip image go over 100% of the size of
  the page. Fixes [#1730](https://github.com/mozilla-services/screenshots/issues/1730) [aeb4d51](https://github.com/mozilla-services/screenshots/commit/aeb4d51)
* use URIFixup to clean URLs.  This cleans only the
  URL attached to the shot itself. Fixes [#1764](https://github.com/mozilla-services/screenshots/issues/1764) [b600a91](https://github.com/mozilla-services/screenshots/commit/b600a91)
* Add a share icon. Fixes [#1651](https://github.com/mozilla-services/screenshots/issues/1651) [2cd37a5](https://github.com/mozilla-services/screenshots/commit/2cd37a5)
* Show the instructional text on a dark background
  to prevent readability issues. Fixes [#1631](https://github.com/mozilla-services/screenshots/issues/1631) [8b5ded7](https://github.com/mozilla-services/screenshots/commit/8b5ded7)
* trigger a search when someone changes the search
  form. Fixes [#1458](https://github.com/mozilla-services/screenshots/issues/1458) [12a98ed](https://github.com/mozilla-services/screenshots/commit/12a98ed)
* use a minimum size on the click autodetect indicate the region that would be selected on hover Add a new class to
  suppress pointer events but not hide the interface. Fixes [#1745](https://github.com/mozilla-services/screenshots/issues/1745) Fixes [#1633](https://github.com/mozilla-services/screenshots/issues/1633) [d42b0a8](https://github.com/mozilla-services/screenshots/commit/d42b0a8)
* rename #share-button to #toggle-share.  Remove
  some styles that appeared to be for the share button, but didn't apply to
  anything. Fixes [#1659](https://github.com/mozilla-services/screenshots/issues/1659) [19863ea](https://github.com/mozilla-services/screenshots/commit/19863ea)
* when resizing selection across a corner or side,
  invert the selection. Fixes [#1630](https://github.com/mozilla-services/screenshots/issues/1630) [ae47ad9](https://github.com/mozilla-services/screenshots/commit/ae47ad9)
* don't allow resize to go past the edge of the
  screen. Fixes [#1732](https://github.com/mozilla-services/screenshots/issues/1732) [25ce7f4](https://github.com/mozilla-services/screenshots/commit/25ce7f4)
* put in a max height/width on full page (5000px)
  Fix the calculation of the page height and width by also using scrollHeight
  and scrollWidth. Fixes [#1740](https://github.com/mozilla-services/screenshots/issues/1740) [01e1e5f](https://github.com/mozilla-services/screenshots/commit/01e1e5f)
* dragging in the background when there's already a
  selection will now create a new selection. Fixes [#1138](https://github.com/mozilla-services/screenshots/issues/1138) [45de849](https://github.com/mozilla-services/screenshots/commit/45de849)
* allow moving the selection around. Fixes [#1628](https://github.com/mozilla-services/screenshots/issues/1628) [5faddf5](https://github.com/mozilla-services/screenshots/commit/5faddf5)
* Cleanup Shooter and the worker when the worker gets detached for some unknown reason; may avoid some problems where the tool hangs after an error [7793134](https://github.com/mozilla-services/screenshots/commit/7793134)
* copy link on save, and put up a popup to notify
  the user about the copy action. Fixes [#1734](https://github.com/mozilla-services/screenshots/issues/1734) [accfe28](https://github.com/mozilla-services/screenshots/commit/accfe28)
* allow view-source URLs. Fixes [#1720](https://github.com/mozilla-services/screenshots/issues/1720) [29efea9](https://github.com/mozilla-services/screenshots/commit/29efea9)
* Escape will close share panel. Fixes [#1691](https://github.com/mozilla-services/screenshots/issues/1691) [64b51cd](https://github.com/mozilla-services/screenshots/commit/64b51cd)
* fix bug that kept shooting from deactivating
  immediately (previously deactivated after 500ms delay). Fixes [#1597](https://github.com/mozilla-services/screenshots/issues/1597) [681134f](https://github.com/mozilla-services/screenshots/commit/681134f)
* Start on [#1613](https://github.com/mozilla-services/screenshots/issues/1613), add buttons to take a visible capture and
  full page (full length) screen capture Still requires UX review [40088fe](https://github.com/mozilla-services/screenshots/commit/40088fe)
* Allow ports in URLs [75644a1](https://github.com/mozilla-services/screenshots/commit/75644a1)
* check for the user auth cookie when checking if
  the browser is logged in. Fixes [#1704](https://github.com/mozilla-services/screenshots/issues/1704) [9b192cf](https://github.com/mozilla-services/screenshots/commit/9b192cf)
* Don't remove our authentication cookies on an upgrade or
  downgrade of the add-on, only on uninstall/disable [cf091c5](https://github.com/mozilla-services/screenshots/commit/cf091c5)

### Detailed server/backend changes

* Minimize all the bundle files using Uglify [1447cc2](https://github.com/mozilla-services/screenshots/commit/1447cc2)
* Set Cache-Control headers for both the static files and
  dynamically generated JS files [2a754b5](https://github.com/mozilla-services/screenshots/commit/2a754b5)
* Change inclusions of server-generated scripts to use
  staticLink [b068b1b](https://github.com/mozilla-services/screenshots/commit/b068b1b)
* Change staticLink to not add /static to the beginning of
  paths [452a110](https://github.com/mozilla-services/screenshots/commit/452a110)
* Automatically bundle core.js with all browserify bundles, and
  remove the specific core.js-related rules and script tags [7da4f72](https://github.com/mozilla-services/screenshots/commit/7da4f72)
* add styled 404 page. Does not change 404s for
  routes which are APIs, i.e., not seen by humans. Fixes [#1548](https://github.com/mozilla-services/screenshots/issues/1548) [3ba6f26](https://github.com/mozilla-services/screenshots/commit/3ba6f26)
* Get rid of unused controller on legal pages [0565da7](https://github.com/mozilla-services/screenshots/commit/0565da7)
* Use template literals [d82dc4d](https://github.com/mozilla-services/screenshots/commit/d82dc4d)
* put Raven activation into reactrender pages. Fixes [#1072](https://github.com/mozilla-services/screenshots/issues/1072) [895ca67](https://github.com/mozilla-services/screenshots/commit/895ca67)
* remove 'Leave ...' link from pages when the
  user is not authenticated. Fixes [#1578](https://github.com/mozilla-services/screenshots/issues/1578) [62e68ed](https://github.com/mozilla-services/screenshots/commit/62e68ed)
* Update all deps to latest. Fixes [#1703](https://github.com/mozilla-services/screenshots/issues/1703) [6a1b6cd](https://github.com/mozilla-services/screenshots/commit/6a1b6cd)
* Put something in the logs when someone tries to upload a shot
  with an odd clip URL, or an empty URL [be6f736](https://github.com/mozilla-services/screenshots/commit/be6f736)
* add /contribute.json. Fixes [#1625](https://github.com/mozilla-services/screenshots/issues/1625) [8e422a5](https://github.com/mozilla-services/screenshots/commit/8e422a5)
* Switch from input.type=text to input.type=search [45c8824](https://github.com/mozilla-services/screenshots/commit/45c8824)
* Set maxlength on shot search input field [58abc98](https://github.com/mozilla-services/screenshots/commit/58abc98)

### Detailed metrics changes

* Fix regex that was supposed to select https and http, but was
  only selecting https [bc38cae](https://github.com/mozilla-services/screenshots/commit/bc38cae)
* add cancel events for tab close, navigate, and
  reload. Fixes [#1761](https://github.com/mozilla-services/screenshots/issues/1761) [6af5637](https://github.com/mozilla-services/screenshots/commit/6af5637)
* change custom dimensions from cd0 to cd2. Fixes [#1778](https://github.com/mozilla-services/screenshots/issues/1778) [ff4f83a](https://github.com/mozilla-services/screenshots/commit/ff4f83a)
* add refer(r)er information to direct image views
  send a view/direct-view event on those image views. Fixes [#1747](https://github.com/mozilla-services/screenshots/issues/1747) Fixes [#1777](https://github.com/mozilla-services/screenshots/issues/1777) [1cd58a5](https://github.com/mozilla-services/screenshots/commit/1cd58a5)
* send a message through the add-on when sendEvent
  is missing. Fix an error in how the add-ons are being loaded, which could
  keep them from being sent with the Sentry message. Fixes [#1736](https://github.com/mozilla-services/screenshots/issues/1736) [6c6f142](https://github.com/mozilla-services/screenshots/commit/6c6f142)
* add scheme information (as label) to the
  start-shot-non-http event. Fixes [#1695](https://github.com/mozilla-services/screenshots/issues/1695) [974ce79](https://github.com/mozilla-services/screenshots/commit/974ce79)
* add GA sendEvent for right-clicks/context menu on
  My Shots. Fixes [#1727](https://github.com/mozilla-services/screenshots/issues/1727) [5e20487](https://github.com/mozilla-services/screenshots/commit/5e20487)
* include the add-on version with all GA events. Fixes [#1722](https://github.com/mozilla-services/screenshots/issues/1722) [7ac5b22](https://github.com/mozilla-services/screenshots/commit/7ac5b22)
* Switch GA to use clientId instead of userId [5fe3e47](https://github.com/mozilla-services/screenshots/commit/5fe3e47)
* Fix event action names that kept a / accidentally [8c4ea36](https://github.com/mozilla-services/screenshots/commit/8c4ea36)
* add ua (user-agent) to GA events. Fixes [#1724](https://github.com/mozilla-services/screenshots/issues/1724) [ee265f0](https://github.com/mozilla-services/screenshots/commit/ee265f0)
* add a browser-send-event module that ensures that
  sendEvent is defined even if ga-activation.js fails. Fixes [#1666](https://github.com/mozilla-services/screenshots/issues/1666) [561ea05](https://github.com/mozilla-services/screenshots/commit/561ea05)
* Add $DEBUG_GOOGLE_ANALYTICS setting/config [a34983b](https://github.com/mozilla-services/screenshots/commit/a34983b)
* Add noAnalytics property to suppress GA on a page. remove GA from the creating page. Fixes [#1708](https://github.com/mozilla-services/screenshots/issues/1708) [00a3661](https://github.com/mozilla-services/screenshots/commit/00a3661)
* Hash the remote userId/cid just like we hash it for GA events
  on the server. [dc10023](https://github.com/mozilla-services/screenshots/commit/dc10023)
* Fix typo in set-expiration/navbar event [105d442](https://github.com/mozilla-services/screenshots/commit/105d442)

## 0.1

* Initial releases
* Everything that was implemented!
