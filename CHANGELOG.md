## Version 32.0.0

Note: by coincidence, this is both a server and add-on release.

### Add-on changes

* Fix URL clipboard copy for certain sites. ([#4269](https://github.com/mozilla-services/screenshots/issues/4269)) [69683f6](https://github.com/mozilla-services/screenshots/commit/69683f6)
* Enable context menu icon. ([#3858](https://github.com/mozilla-services/screenshots/issues/3858)) ([#4264](https://github.com/mozilla-services/screenshots/issues/4264)) [55e2475](https://github.com/mozilla-services/screenshots/commit/55e2475)
* Wait for onboarding status. ([#3954](https://github.com/mozilla-services/screenshots/issues/3954)) ([#4263](https://github.com/mozilla-services/screenshots/issues/4263)) [abc8109](https://github.com/mozilla-services/screenshots/commit/abc8109)
* Fix a width so users cannot x scroll on selection frame. ([#3955](https://github.com/mozilla-services/screenshots/issues/3955)) ([#4258](https://github.com/mozilla-services/screenshots/issues/4258)) [77fa083](https://github.com/mozilla-services/screenshots/commit/77fa083)
* Set display CSS property on iframes. ([#4148](https://github.com/mozilla-services/screenshots/issues/4148)) ([#4256](https://github.com/mozilla-services/screenshots/issues/4256)) [ba4073f](https://github.com/mozilla-services/screenshots/commit/ba4073f)
* Calculate left and top margin with left and top. ([#4217](https://github.com/mozilla-services/screenshots/issues/4217)) [cd36b7c](https://github.com/mozilla-services/screenshots/commit/cd36b7c)
* Standard ISO 8601 date for filename, ([#4199](https://github.com/mozilla-services/screenshots/issues/4199))
  * Use date variable instead of newly created today variable
  * const instead of let, forgot space. Fixes [#4197](https://github.com/mozilla-services/screenshots/issues/4197) Fixes [#4197](https://github.com/mozilla-services/screenshots/issues/4197) [eee880f](https://github.com/mozilla-services/screenshots/commit/eee880f)

#### Testing changes
* Open page action panel before clicking screenshots in tests. ([#4296](https://github.com/mozilla-services/screenshots/issues/4296)) [15d5e92](https://github.com/mozilla-services/screenshots/commit/15d5e92)
* Add test for upload-disabled pref. ([#4277](https://github.com/mozilla-services/screenshots/issues/4277)) ([#4283](https://github.com/mozilla-services/screenshots/issues/4283)) [27731ed](https://github.com/mozilla-services/screenshots/commit/27731ed)
* Add download shot Selenium test. ([#4026](https://github.com/mozilla-services/screenshots/issues/4026)) [06ab4ee](https://github.com/mozilla-services/screenshots/commit/06ab4ee)
* Add more post-test reset code for addon button test. [c83cccc](https://github.com/mozilla-services/screenshots/commit/c83cccc)
* Use `SCREENSHOTS_BACKEND` in Selenium tests. ([#4247](https://github.com/mozilla-services/screenshots/issues/4247)) ([#4248](https://github.com/mozilla-services/screenshots/issues/4248)) [606b4e3](https://github.com/mozilla-services/screenshots/commit/606b4e3)
* Use the test setup functions from pytest [eedcb0c](https://github.com/mozilla-services/screenshots/commit/eedcb0c)

#### Clean-up

* zopflipng PNGs. ([#4059](https://github.com/mozilla-services/screenshots/issues/4059)) ([#4257](https://github.com/mozilla-services/screenshots/issues/4257)) [9a5699b](https://github.com/mozilla-services/screenshots/commit/9a5699b)
* Rename asJson to toJSON. ([#2593](https://github.com/mozilla-services/screenshots/issues/2593)) [a2ecd83](https://github.com/mozilla-services/screenshots/commit/a2ecd83)
* Remove some code around favicon url. ([#2659](https://github.com/mozilla-services/screenshots/issues/2659)) [1300069](https://github.com/mozilla-services/screenshots/commit/1300069)
* Use URL() to validate URLs. ([#2660](https://github.com/mozilla-services/screenshots/issues/2660)) [c2b02ac](https://github.com/mozilla-services/screenshots/commit/c2b02ac)

### Server change

* Issue [#4180](https://github.com/mozilla-services/screenshots/issues/4180) - Display pagination if more than one page [d5c6fa1](https://github.com/mozilla-services/screenshots/commit/d5c6fa1)
* Localize Settings Page [f1d2a42](https://github.com/mozilla-services/screenshots/commit/f1d2a42)
* Mask the shot url in the Raven payload. ([#3769](https://github.com/mozilla-services/screenshots/issues/3769)) [78ce81c](https://github.com/mozilla-services/screenshots/commit/78ce81c)
* Render shot capture time only when in browser. ([#4288](https://github.com/mozilla-services/screenshots/issues/4288)) [e0eb1d7](https://github.com/mozilla-services/screenshots/commit/e0eb1d7)
* Fix FxA UI [be767c0](https://github.com/mozilla-services/screenshots/commit/be767c0)
* Update og:title when shot title changes. ([#4188](https://github.com/mozilla-services/screenshots/issues/4188)) [1919853](https://github.com/mozilla-services/screenshots/commit/1919853)
* Display created time and title after expire save. ([#3255](https://github.com/mozilla-services/screenshots/issues/3255)) ([#4285](https://github.com/mozilla-services/screenshots/issues/4285)) [cf11f34](https://github.com/mozilla-services/screenshots/commit/cf11f34)
* Handle empty shot title on edit save. ([#4266](https://github.com/mozilla-services/screenshots/issues/4266))* Handle empty shot title. ([#4204](https://github.com/mozilla-services/screenshots/issues/4204))
  * trimming whitespaces [8305858](https://github.com/mozilla-services/screenshots/commit/8305858)
* - Highlight entire word when editing title. Fixes [#4182](https://github.com/mozilla-services/screenshots/issues/4182) [86b0fd6](https://github.com/mozilla-services/screenshots/commit/86b0fd6)
* fix extra shadow [d246a29](https://github.com/mozilla-services/screenshots/commit/d246a29)
* Pass in locale for date.toLocaleString. ([#2216](https://github.com/mozilla-services/screenshots/issues/2216)) [eeb794c](https://github.com/mozilla-services/screenshots/commit/eeb794c)
* Use crypto.timingSafeEqual. ([#2470](https://github.com/mozilla-services/screenshots/issues/2470)) [f781ef5](https://github.com/mozilla-services/screenshots/commit/f781ef5)
* Added new Firefox logo in download button [49b5be5](https://github.com/mozilla-services/screenshots/commit/49b5be5)
* Stop sending CSP and frame options headers on non-documents. ([#3980](https://github.com/mozilla-services/screenshots/issues/3980)) [2ef9247](https://github.com/mozilla-services/screenshots/commit/2ef9247)
* change flag to survey [cb0fe45](https://github.com/mozilla-services/screenshots/commit/cb0fe45)
* track image deletes that fail. Fixes [#3275](https://github.com/mozilla-services/screenshots/issues/3275) [b53cd0a](https://github.com/mozilla-services/screenshots/commit/b53cd0a)
* Make a schema change to prepare for [#3275](https://github.com/mozilla-services/screenshots/issues/3275) [8ede101](https://github.com/mozilla-services/screenshots/commit/8ede101)

#### Annotation changes

* Center color picker [7ed12bf](https://github.com/mozilla-services/screenshots/commit/7ed12bf)
* Include color in color picker event [709c0d3](https://github.com/mozilla-services/screenshots/commit/709c0d3)
* Add l10n title messages for edit btn and colors. ([#4206](https://github.com/mozilla-services/screenshots/issues/4206)) ([#4265](https://github.com/mozilla-services/screenshots/issues/4265)) [81ab9ce](https://github.com/mozilla-services/screenshots/commit/81ab9ce)
* annotations icon adjustment [09e4049](https://github.com/mozilla-services/screenshots/commit/09e4049)
* dismiss color picker on click [17aa111](https://github.com/mozilla-services/screenshots/commit/17aa111)
* - Highlight color picker button on hover. Fixes [#4165](https://github.com/mozilla-services/screenshots/issues/4165) [29607e0](https://github.com/mozilla-services/screenshots/commit/29607e0)
* Oversample annotation canvas on HiDPI screens [2184414](https://github.com/mozilla-services/screenshots/commit/2184414)
* Add per-drawing events [00a92b1](https://github.com/mozilla-services/screenshots/commit/00a92b1)
* scroll shot in crop mode [c9d86f1](https://github.com/mozilla-services/screenshots/commit/c9d86f1)
* Move middle button click check. ([#4100](https://github.com/mozilla-services/screenshots/issues/4100)) [10b9075](https://github.com/mozilla-services/screenshots/commit/10b9075)
* dismiss color picker on click [2e5e842](https://github.com/mozilla-services/screenshots/commit/2e5e842)
* Center the image in the editor. ([#3994](https://github.com/mozilla-services/screenshots/issues/3994)) [77e9cf4](https://github.com/mozilla-services/screenshots/commit/77e9cf4)

#### Development and dependency changes

* Upgrade to latest query-string 5.x.x. ([#4335](https://github.com/mozilla-services/screenshots/issues/4335)) [2633d35](https://github.com/mozilla-services/screenshots/commit/2633d35)
* Remove NODE_ENV from CircleCI build job. ([#4332](https://github.com/mozilla-services/screenshots/issues/4332)) [1b0c5f7](https://github.com/mozilla-services/screenshots/commit/1b0c5f7)
* Upgrade npm modules w/o code or config changes. ([#4280](https://github.com/mozilla-services/screenshots/issues/4280)) [8207f1f](https://github.com/mozilla-services/screenshots/commit/8207f1f)
* correct env var names in config.js. Fixes [#4255](https://github.com/mozilla-services/screenshots/issues/4255) [cbd9a0e](https://github.com/mozilla-services/screenshots/commit/cbd9a0e)
* Allow CSP to be disabled in dev env. ([#4281](https://github.com/mozilla-services/screenshots/issues/4281)) [1c2341e](https://github.com/mozilla-services/screenshots/commit/1c2341e)
* Use CircleCI 2. [a7934ed](https://github.com/mozilla-services/screenshots/commit/a7934ed)
* Update package.json [931da37](https://github.com/mozilla-services/screenshots/commit/931da37)
* Optimise svgs [4b8b5a6](https://github.com/mozilla-services/screenshots/commit/4b8b5a6)
* Replace wreck requests with fetch [87b80d9](https://github.com/mozilla-services/screenshots/commit/87b80d9)
* Do not uglify when NO_UGLIFY is set. ([#4271](https://github.com/mozilla-services/screenshots/issues/4271)) ([#4272](https://github.com/mozilla-services/screenshots/issues/4272)) [bb339f4](https://github.com/mozilla-services/screenshots/commit/bb339f4)
* Remove comments. ([#4240](https://github.com/mozilla-services/screenshots/issues/4240)) [0c21bb5](https://github.com/mozilla-services/screenshots/commit/0c21bb5)
* Use wreck read and request methods directlyPartial fix for [#3681](https://github.com/mozilla-services/screenshots/issues/3681) [4b25b75](https://github.com/mozilla-services/screenshots/commit/4b25b75)
* Match CircleCI node version to Docker image's. ([#2216](https://github.com/mozilla-services/screenshots/issues/2216)) ([#4250](https://github.com/mozilla-services/screenshots/issues/4250)) [1d25aaf](https://github.com/mozilla-services/screenshots/commit/1d25aaf)
* Undo run-docker change for `NODE_ICU_DATA`. [a60220b](https://github.com/mozilla-services/screenshots/commit/a60220b)
* Move `NODE_ICU_DATA` env into run-docker. [79536bc](https://github.com/mozilla-services/screenshots/commit/79536bc)
* Set SET_CACHE to false in .env.dev. ([#4208](https://github.com/mozilla-services/screenshots/issues/4208)) [3db55a6](https://github.com/mozilla-services/screenshots/commit/3db55a6)
* Add status info to readme. Refs [#4198](https://github.com/mozilla-services/screenshots/issues/4198) [c99bdaa](https://github.com/mozilla-services/screenshots/commit/c99bdaa)

## Version 31.3.0

Note: this is a server release (31.{0,1,2}.0 did not go into
production)

* Restore a CSS class b/c crop tool needs it. [894a0f8](https://github.com/mozilla-services/screenshots/commit/894a0f8)
* Delete some CSS. ([#4191](https://github.com/mozilla-services/screenshots/issues/4191)) [2146ffc](https://github.com/mozilla-services/screenshots/commit/2146ffc)

### Add-on change in 31.3.0

(Note: this one change has been uplifted to Firefox 60)

* don't overwrite correctly-scaled canvas dimensions; pass the shot type to downloadShot and copyShot. Fixes [#4174](https://github.com/mozilla-services/screenshots/issues/4174) [9a8b11b](https://github.com/mozilla-services/screenshots/commit/9a8b11b)

### Version 31.2.0


* prevent cropping on right click [10dbff2](https://github.com/mozilla-services/screenshots/commit/10dbff2)
* preserve highlighter state [ca5cec7](https://github.com/mozilla-services/screenshots/commit/ca5cec7)
* disable cancel button on save [4783508](https://github.com/mozilla-services/screenshots/commit/4783508)
* fix utm error preventing campaign segmentation [c7184aa](https://github.com/mozilla-services/screenshots/commit/c7184aa)

### Version 31.1.0

Note: this is a server release (31.0.0 did not go to production).

* Disallow drawing on header. ([#4170](https://github.com/mozilla-services/screenshots/issues/4170)) [eda69b6](https://github.com/mozilla-services/screenshots/commit/eda69b6)
* Do not cache static files if revs mismatch. ([#3962](https://github.com/mozilla-services/screenshots/issues/3962)) [dc1bc84](https://github.com/mozilla-services/screenshots/commit/dc1bc84)
* detect click on color picker [5834a9e](https://github.com/mozilla-services/screenshots/commit/5834a9e)
* annotations - add tooltips [63445d6](https://github.com/mozilla-services/screenshots/commit/63445d6)
* fix annotation header [61d2412](https://github.com/mozilla-services/screenshots/commit/61d2412)

## Version 31.0.0

Note: this is a server release. The previous server release was 28.1.0

* Annotation: remove event listeners after cancelling edit mode [3cc5043](https://github.com/mozilla-services/screenshots/commit/3cc5043)
* Add save to unavailable server test. ([#4027](https://github.com/mozilla-services/screenshots/issues/4027)) [e44cbc5](https://github.com/mozilla-services/screenshots/commit/e44cbc5)

### Server changes from 30.0.0

Because 30.0.0 was an add-on release, this is the release of these changes:

* smoothen highlighter edges [fda984b](https://github.com/mozilla-services/screenshots/commit/fda984b)
* preserve custom color on edit cancel [517580c](https://github.com/mozilla-services/screenshots/commit/517580c)
* open edit mode on highlight click [aa0898c](https://github.com/mozilla-services/screenshots/commit/aa0898c)
* Set LOCALHOST_SSL to false in .evn.dev. ([#4125](https://github.com/mozilla-services/screenshots/issues/4125)) [37b4544](https://github.com/mozilla-services/screenshots/commit/37b4544)
* add loader for annotation saves [b39ac1e](https://github.com/mozilla-services/screenshots/commit/b39ac1e)
* Wait until save btn is visible. ([#4108](https://github.com/mozilla-services/screenshots/issues/4108)) ([#4114](https://github.com/mozilla-services/screenshots/issues/4114)) [b7c64b0](https://github.com/mozilla-services/screenshots/commit/b7c64b0)
* Switch en-US FTL file to new syntax ([#4115](https://github.com/mozilla-services/screenshots/issues/4115)) [983a0fb](https://github.com/mozilla-services/screenshots/commit/983a0fb)
* Use done cb in Selenium tests. ([#4109](https://github.com/mozilla-services/screenshots/issues/4109)) ([#4123](https://github.com/mozilla-services/screenshots/issues/4123)) [ec53f04](https://github.com/mozilla-services/screenshots/commit/ec53f04)
* Upgrade convict. ([#3841](https://github.com/mozilla-services/screenshots/issues/3841)) ([#4122](https://github.com/mozilla-services/screenshots/issues/4122)) [da60008](https://github.com/mozilla-services/screenshots/commit/da60008)
* Ignore nsp[#566](https://github.com/mozilla-services/screenshots/issues/566) with .nsprc. ([#4118](https://github.com/mozilla-services/screenshots/issues/4118)) [0e719bf](https://github.com/mozilla-services/screenshots/commit/0e719bf)
* color picker UI update [b07ff25](https://github.com/mozilla-services/screenshots/commit/b07ff25)
* remove extra space between edit and share [2404360](https://github.com/mozilla-services/screenshots/commit/2404360)
* prevent drawing on right click [9b095e8](https://github.com/mozilla-services/screenshots/commit/9b095e8)
* Make color picker visible [cf3aa76](https://github.com/mozilla-services/screenshots/commit/cf3aa76)
* Require node 8 for docker and in package.json. Fixes [#3642](https://github.com/mozilla-services/screenshots/issues/3642) [2423408](https://github.com/mozilla-services/screenshots/commit/2423408)
* - Ensure DB returned rows before trying to access them. Fixes [#3776](https://github.com/mozilla-services/screenshots/issues/3776) [4604edb](https://github.com/mozilla-services/screenshots/commit/4604edb)
* Add nav to My Shots test. ([#4030](https://github.com/mozilla-services/screenshots/issues/4030)) ([#4096](https://github.com/mozilla-services/screenshots/issues/4096)) [0bebc27](https://github.com/mozilla-services/screenshots/commit/0bebc27)
* Wait a whole second in visible shot test. [a5cdac3](https://github.com/mozilla-services/screenshots/commit/a5cdac3)
* vertically align image [88b58f8](https://github.com/mozilla-services/screenshots/commit/88b58f8)
* use whole numbers to draw image on canvas [f3eed28](https://github.com/mozilla-services/screenshots/commit/f3eed28)
* preserve active color [e574585](https://github.com/mozilla-services/screenshots/commit/e574585)
* Add auto selection shot Selenium test. ([#4024](https://github.com/mozilla-services/screenshots/issues/4024)) [7cabb73](https://github.com/mozilla-services/screenshots/commit/7cabb73)
* Upgrade selenium-webdriver + geckodriver and fix test. [3c9db71](https://github.com/mozilla-services/screenshots/commit/3c9db71)
* Update Postgres info in README. [ff66687](https://github.com/mozilla-services/screenshots/commit/ff66687)
* Run Nightly in headless mode. [9d56a4d](https://github.com/mozilla-services/screenshots/commit/9d56a4d)
* Give nohup a try. [1e735ec](https://github.com/mozilla-services/screenshots/commit/1e735ec)
* Update to fluent 0.4.3 [e9d65be](https://github.com/mozilla-services/screenshots/commit/e9d65be)
* Clarify l10n export process [6391525](https://github.com/mozilla-services/screenshots/commit/6391525)
* Update an arg for xvfb cmd in CircleCI. [3199912](https://github.com/mozilla-services/screenshots/commit/3199912)
* Fix lint issues. ([#4076](https://github.com/mozilla-services/screenshots/issues/4076)) [51dff4c](https://github.com/mozilla-services/screenshots/commit/51dff4c)
* Change Xvfb display number. [e9856e7](https://github.com/mozilla-services/screenshots/commit/e9856e7)
* add drawing on single click [e5b81ff](https://github.com/mozilla-services/screenshots/commit/e5b81ff)
* update annotation metrics [6afe10c](https://github.com/mozilla-services/screenshots/commit/6afe10c)
* highlight annotations button [283860b](https://github.com/mozilla-services/screenshots/commit/283860b)
* smoothen highlight drawings [79eaf88](https://github.com/mozilla-services/screenshots/commit/79eaf88)
* Upstream change to disable Screenshots browser test on windows debug for frequent failures
  See bug 1394967 for more details. [679f026](https://github.com/mozilla-services/screenshots/commit/679f026)
* Enable save after image load [3a23438](https://github.com/mozilla-services/screenshots/commit/3a23438)
* close color picker on tool change [074bab9](https://github.com/mozilla-services/screenshots/commit/074bab9)
* Make white highlight translucent [35f85c1](https://github.com/mozilla-services/screenshots/commit/35f85c1)
* Use double quotes. ([#3977](https://github.com/mozilla-services/screenshots/issues/3977)) [2764e9d](https://github.com/mozilla-services/screenshots/commit/2764e9d)
* Use eqeqeq. ([#3977](https://github.com/mozilla-services/screenshots/issues/3977)) [35f01a4](https://github.com/mozilla-services/screenshots/commit/35f01a4)
* Use prefer-const. ([#3977](https://github.com/mozilla-services/screenshots/issues/3977)) [eefee3d](https://github.com/mozilla-services/screenshots/commit/eefee3d)
* Replace var with let or const. ([#3977](https://github.com/mozilla-services/screenshots/issues/3977)) [6824d8b](https://github.com/mozilla-services/screenshots/commit/6824d8b)
* Enable consistent-return. ([#3977](https://github.com/mozilla-services/screenshots/issues/3977)) [ed632d6](https://github.com/mozilla-services/screenshots/commit/ed632d6)
* Enable react/prop-types. ([#3977](https://github.com/mozilla-services/screenshots/issues/3977)) [2c96506](https://github.com/mozilla-services/screenshots/commit/2c96506)
* Remove eslint rules with no effects. ([#3977](https://github.com/mozilla-services/screenshots/issues/3977)) [40b380b](https://github.com/mozilla-services/screenshots/commit/40b380b)
* Use the svgo --folder option to speed up npm run svgo [a91b08e](https://github.com/mozilla-services/screenshots/commit/a91b08e)
* apply svgo to all svgs. Fixes [#3853](https://github.com/mozilla-services/screenshots/issues/3853) [28ef28c](https://github.com/mozilla-services/screenshots/commit/28ef28c)
* Add an npm run svgo command [b8fe1a6](https://github.com/mozilla-services/screenshots/commit/b8fe1a6)

### Server changes from 29.0.0

Because 29.0.0 was an add-on release, this is the release of these changes:

* Update l10n ids of annotataion crop buttons. ([#4041](https://github.com/mozilla-services/screenshots/issues/4041)) [a4d3ed0](https://github.com/mozilla-services/screenshots/commit/a4d3ed0)
* prevent crop-box resizing against borders [f2b12d6](https://github.com/mozilla-services/screenshots/commit/f2b12d6)
* Save as jpeg on edit if > limit. ([#3943](https://github.com/mozilla-services/screenshots/issues/3943)) ([#3999](https://github.com/mozilla-services/screenshots/issues/3999)) [4fae01f](https://github.com/mozilla-services/screenshots/commit/4fae01f)
* Add tooltips to crop buttons ([#4016](https://github.com/mozilla-services/screenshots/issues/4016)) [31bbfb4](https://github.com/mozilla-services/screenshots/commit/31bbfb4)
* Disable save button on click [d80f9db](https://github.com/mozilla-services/screenshots/commit/d80f9db)
* cancel default action on click events [354f155](https://github.com/mozilla-services/screenshots/commit/354f155)
* change cursor style [1291430](https://github.com/mozilla-services/screenshots/commit/1291430)
* Change l10n string id. ([#3500](https://github.com/mozilla-services/screenshots/issues/3500)) [de195ff](https://github.com/mozilla-services/screenshots/commit/de195ff)
* Fix pen position tracking [b0ea374](https://github.com/mozilla-services/screenshots/commit/b0ea374)
* add cropping to annotation tools [4d22580](https://github.com/mozilla-services/screenshots/commit/4d22580)
* Update style for indefinitely saved symbol. ([#3500](https://github.com/mozilla-services/screenshots/issues/3500)) [240e3a2](https://github.com/mozilla-services/screenshots/commit/240e3a2)
* Add never expire indicator to My Shots. ([#3500](https://github.com/mozilla-services/screenshots/issues/3500)) [ddb8640](https://github.com/mozilla-services/screenshots/commit/ddb8640)
* Remove l10n messages from JSON response. ([#3843](https://github.com/mozilla-services/screenshots/issues/3843)) [ee837f0](https://github.com/mozilla-services/screenshots/commit/ee837f0)
* Remove right margin on img only download icon. ([#3947](https://github.com/mozilla-services/screenshots/issues/3947)) [b576350](https://github.com/mozilla-services/screenshots/commit/b576350)
* close share panel properly when clicking twice on the share button. Fixes [#3785](https://github.com/mozilla-services/screenshots/issues/3785) [72ae4b7](https://github.com/mozilla-services/screenshots/commit/72ae4b7)
* use a prefixed titleWe were setting the title properly on the server, but it would be overwritten later as we were sending a different title to be rendered in the browser. This meant that titles lost their 'Screenshots:' prefix. Fixes [#3898](https://github.com/mozilla-services/screenshots/issues/3898) [318c32e](https://github.com/mozilla-services/screenshots/commit/318c32e)


## Version 30.0.0

Note this is an add-on only release. The add-on will be exported into Firefox 60.

### Addon changes

* Remove two extra handlers and add more conditions around ctrl+c. ([#4113](https://github.com/mozilla-services/screenshots/issues/4113)) ([#4149](https://github.com/mozilla-services/screenshots/issues/4149)) [e82ef8e](https://github.com/mozilla-services/screenshots/commit/e82ef8e)
* Remove one of the addon icon svgs. ([#4132](https://github.com/mozilla-services/screenshots/issues/4132)) [b456233](https://github.com/mozilla-services/screenshots/commit/b456233)
* Include onboarding slides in user timing measurements. Fixes [#4097](https://github.com/mozilla-services/screenshots/issues/4097) [69b58f7](https://github.com/mozilla-services/screenshots/commit/69b58f7)
* Use Performance.now for interaction timings. Fixes [#4054](https://github.com/mozilla-services/screenshots/issues/4054) [3119bb4](https://github.com/mozilla-services/screenshots/commit/3119bb4)
* Show loader animation on truncated full page download/copy. ([#3861](https://github.com/mozilla-services/screenshots/issues/3861)) [6fa7f3a](https://github.com/mozilla-services/screenshots/commit/6fa7f3a)
* Fix lint issues. ([#4076](https://github.com/mozilla-services/screenshots/issues/4076)) [51dff4c](https://github.com/mozilla-services/screenshots/commit/51dff4c)
* Use double quotes. ([#3977](https://github.com/mozilla-services/screenshots/issues/3977)) [2764e9d](https://github.com/mozilla-services/screenshots/commit/2764e9d)
* Use eqeqeq. ([#3977](https://github.com/mozilla-services/screenshots/issues/3977)) [35f01a4](https://github.com/mozilla-services/screenshots/commit/35f01a4)
* Use prefer-const. ([#3977](https://github.com/mozilla-services/screenshots/issues/3977)) [eefee3d](https://github.com/mozilla-services/screenshots/commit/eefee3d)
* Replace var with let or const. ([#3977](https://github.com/mozilla-services/screenshots/issues/3977)) [6824d8b](https://github.com/mozilla-services/screenshots/commit/6824d8b)
* Enable consistent-return. ([#3977](https://github.com/mozilla-services/screenshots/issues/3977)) [ed632d6](https://github.com/mozilla-services/screenshots/commit/ed632d6)
* apply svgo to all svgs. Fixes [#3853](https://github.com/mozilla-services/screenshots/issues/3853) [28ef28c](https://github.com/mozilla-services/screenshots/commit/28ef28c)
* Suppress errors encountered when sending timing or events pings
  Analytics network errors should never be user-visible. [73c1340](https://github.com/mozilla-services/screenshots/commit/73c1340)
* Cancel some user timing measurements when page visibility changes to 'hidden'
  JS background budgeting in Firefox 58 might cause Screenshots execution
  to slow down if the user switches tabs while waiting for the UI to
  update.
  Exclude cases where the user timing event ends with an upload, since the
  result of a successful upload is to switch tabs (to the shot page of the
  uploaded shot).
. Fixes [#4055](https://github.com/mozilla-services/screenshots/issues/4055) [588d2e7](https://github.com/mozilla-services/screenshots/commit/588d2e7)
* Fire an internal-only event if Screenshots is in a document that is backgrounded
  Use the Page Visibility API to detect when a given window loses focus. [2aed29b](https://github.com/mozilla-services/screenshots/commit/2aed29b)
* Upstream changes to loader calls in bootstrap.js context
  Cu.import has been replaced with ChromeUtils.import, and
  XPCOM.defineLazyModuleGetter has been replaced with
  ChromeUtils.defineModuleGetter. Adjust our code accordingly.
  See bugzilla bug 1431533 for details. [07b3b39](https://github.com/mozilla-services/screenshots/commit/07b3b39)

### Documentation changes

* Update export-to-firefox.md [c2b5019](https://github.com/mozilla-services/screenshots/commit/c2b5019)
* Update export-to-firefox.md [3aef341](https://github.com/mozilla-services/screenshots/commit/3aef341)
* Add reviewer selection guidelines to fx export doc [2535aea](https://github.com/mozilla-services/screenshots/commit/2535aea)

## Version 29.0.0

Note this is an add-on only release. The add-on will be exported into Firefox 60.

### Addon changes

* Suppress errors encountered when sending timing or events pings
  Analytics network errors should never be user-visible. [73c1340](https://github.com/mozilla-services/screenshots/commit/73c1340)
* Remove special click handlers for onboarding legal and terms links
  Bug 1357589 has been fixed, so the links should now behave normally.
  Refs [#2699](https://github.com/mozilla-services/screenshots/issues/2699). [80a58e4](https://github.com/mozilla-services/screenshots/commit/80a58e4)
* remove pageshot migration code. Fixes [#3844](https://github.com/mozilla-services/screenshots/issues/3844) [102724c](https://github.com/mozilla-services/screenshots/commit/102724c)
* use data-l10n-title to localize title attributes. Fixes [#3840](https://github.com/mozilla-services/screenshots/issues/3840) [c962142](https://github.com/mozilla-services/screenshots/commit/c962142)
* Do not throw error on unexpected attr in prod. ([#3959](https://github.com/mozilla-services/screenshots/issues/3959)) [2575e38](https://github.com/mozilla-services/screenshots/commit/2575e38)
* Remove a button position fix that's no longer needed. ([#4008](https://github.com/mozilla-services/screenshots/issues/4008)) [b956bf7](https://github.com/mozilla-services/screenshots/commit/b956bf7)
* Check capture type before it's potentially changed. ([#3968](https://github.com/mozilla-services/screenshots/issues/3968)) [b9ce266](https://github.com/mozilla-services/screenshots/commit/b9ce266)
* Replace shot creating url w/ view url from addon. ([#3995](https://github.com/mozilla-services/screenshots/issues/3995)) ([#4009](https://github.com/mozilla-services/screenshots/issues/4009)) [43ad2df](https://github.com/mozilla-services/screenshots/commit/43ad2df)
* Download or copy preview img when possible. ([#3968](https://github.com/mozilla-services/screenshots/issues/3968)) ([#4004](https://github.com/mozilla-services/screenshots/issues/4004)) [6aa2deb](https://github.com/mozilla-services/screenshots/commit/6aa2deb)
* Prevent Enter from performing two actions. ([#3981](https://github.com/mozilla-services/screenshots/issues/3981)) [be59362](https://github.com/mozilla-services/screenshots/commit/be59362)
* Refactor 'History enabled' checking code to clarify the expected boolean result [bc7b20a](https://github.com/mozilla-services/screenshots/commit/bc7b20a)
* Refactor 'Telemetry enabled' checking code to clarify the expected boolean result [c8b1747](https://github.com/mozilla-services/screenshots/commit/c8b1747)
* Update the download-only notice to mention ESR and upload-disabled prefs [90fbe9a](https://github.com/mozilla-services/screenshots/commit/90fbe9a)
* disable uploads for ESR. Fixes [#3996](https://github.com/mozilla-services/screenshots/issues/3996) [f99e449](https://github.com/mozilla-services/screenshots/commit/f99e449)
* Add 'Upload disabled' check to the selector code [a0c6626](https://github.com/mozilla-services/screenshots/commit/a0c6626)
* Add upload-disabled pref and bootstrap message to send its value to webextension [022096d](https://github.com/mozilla-services/screenshots/commit/022096d)
* Remove unused signal [5867cfd](https://github.com/mozilla-services/screenshots/commit/5867cfd)
* Remove dimension limits when copying full page shots. ([#3855](https://github.com/mozilla-services/screenshots/issues/3855)) ([#3990](https://github.com/mozilla-services/screenshots/issues/3990)) [798d6dd](https://github.com/mozilla-services/screenshots/commit/798d6dd)
* Clear cached highlighted el when hiding hover box. ([#3970](https://github.com/mozilla-services/screenshots/issues/3970)). [342e204](https://github.com/mozilla-services/screenshots/commit/342e204)
* Negate body shift in scroll-proof fashion. ([#3907](https://github.com/mozilla-services/screenshots/issues/3907)) [8fd35ef](https://github.com/mozilla-services/screenshots/commit/8fd35ef)
* Stop sending events when in incognito. ([#3900](https://github.com/mozilla-services/screenshots/issues/3900)) [de5e6a0](https://github.com/mozilla-services/screenshots/commit/de5e6a0)
* Fix math on distance calc. ([#3922](https://github.com/mozilla-services/screenshots/issues/3922)) [6b7fafe](https://github.com/mozilla-services/screenshots/commit/6b7fafe)
* Use an object url for the preview image. ([#3940](https://github.com/mozilla-services/screenshots/issues/3940)) [9e56cf2](https://github.com/mozilla-services/screenshots/commit/9e56cf2)
* Fix selection frame when body's (left, top) is not (0, 0). ([#3907](https://github.com/mozilla-services/screenshots/issues/3907)) [f41db05](https://github.com/mozilla-services/screenshots/commit/f41db05)
* Hide UI frame unless server error. ([#3901](https://github.com/mozilla-services/screenshots/issues/3901)) [7d9e51f](https://github.com/mozilla-services/screenshots/commit/7d9e51f)

### Documentation changes

* Document copy to clipboard metrics. ([#4037](https://github.com/mozilla-services/screenshots/issues/4037)) [dfe627d](https://github.com/mozilla-services/screenshots/commit/dfe627d)
* add instructions for taking down a shot given an image URL. Fixes [#3923](https://github.com/mozilla-services/screenshots/issues/3923) [924eda8](https://github.com/mozilla-services/screenshots/commit/924eda8)

## Version 28.0.0

Note this is a server-only release

### Server changes

* Change survey expiration from December 25, 2017, to January 15, 2018
* Add thumbnail to unedited list to stop removal. ([#3913](https://github.com/mozilla-services/screenshots/issues/3913)) [3439272](https://github.com/mozilla-services/screenshots/commit/3439272)
* Use fixed height for thumbnail container. ([#3905](https://github.com/mozilla-services/screenshots/issues/3905)) [e13ba92](https://github.com/mozilla-services/screenshots/commit/e13ba92)
* Use old thumbnail when applicable. ([#3913](https://github.com/mozilla-services/screenshots/issues/3913)) [d6e9106](https://github.com/mozilla-services/screenshots/commit/d6e9106)
* Annotation improvements (pref'd off):
  * add color picker [81a8c7f](https://github.com/mozilla-services/screenshots/commit/81a8c7f)
  * annotation updates [63a251f](https://github.com/mozilla-services/screenshots/commit/63a251f)
  * Revert canvas img crossOrigin attr to Anonymous. ([#3848](https://github.com/mozilla-services/screenshots/issues/3848)) [3ca96cc](https://github.com/mozilla-services/screenshots/commit/3ca96cc)
* Build prod React bundles. ([#3777](https://github.com/mozilla-services/screenshots/issues/3777)) [2a60336](https://github.com/mozilla-services/screenshots/commit/2a60336)
* implement A/B test for text-free Download button on shot page. Fixes [#3894](https://github.com/mozilla-services/screenshots/issues/3894) [f5759b4](https://github.com/mozilla-services/screenshots/commit/f5759b4)

### Development changes

* Skip test_file_managemnt tests by default [c6fca41](https://github.com/mozilla-services/screenshots/commit/c6fca41)
* Remove empty server.ftl files [18b734d](https://github.com/mozilla-services/screenshots/commit/18b734d)
* Update svgo to latest. ([#3897](https://github.com/mozilla-services/screenshots/issues/3897)) [1e70fe5](https://github.com/mozilla-services/screenshots/commit/1e70fe5)
* Fix a few sass-lint warnings while we're at it [0399926](https://github.com/mozilla-services/screenshots/commit/0399926)
* Replace nbsp with css; simplify jsx [5929efc](https://github.com/mozilla-services/screenshots/commit/5929efc)

### Add-on changes

Note: this add-on version is not being released

* Use keydown for copy to clipboard b/c MacOS. ([#3879](https://github.com/mozilla-services/screenshots/issues/3879)) [9f1da5a](https://github.com/mozilla-services/screenshots/commit/9f1da5a)
* Do not copy while copying. ([#3878](https://github.com/mozilla-services/screenshots/issues/3878)) [b64c417](https://github.com/mozilla-services/screenshots/commit/b64c417)

## Version 27.0.0

Note: this is a server-only release. This release did not make it to
production.

### Server changes

* Add a temporary show-once survey link to shot pagesOnly shows to the owner. Uses localStorage so it only shows once. Will not
  display to anyone who doesn't have English in their language list. Will not
  show after midnight, December 21, 2017.
  This should be reverted in the future. [78266dd](https://github.com/mozilla-services/screenshots/commit/78266dd)
* Share icon A/B test ([#3868](https://github.com/mozilla-services/screenshots/issues/3868))* Actually make excludes an optional key in ab tests
  * add A/B test for share icon. Fixes [#3620](https://github.com/mozilla-services/screenshots/issues/3620) [dd54b7e](https://github.com/mozilla-services/screenshots/commit/dd54b7e)
* Apply A/B tests to unauthenticated users ([#3895](https://github.com/mozilla-services/screenshots/issues/3895))A/B tests that are for unauthenticated users must be set on any request, since for authenticated users the A/B tests are sent and recorded on register/login.
  A/B tests that are for unauthenticated users must be marked as appliesToPublic. Fixes [#3893](https://github.com/mozilla-services/screenshots/issues/3893) [b218d68](https://github.com/mozilla-services/screenshots/commit/b218d68)
* Replace CDN with SITE_CDN and CONTENT_CDN. ([#3590](https://github.com/mozilla-services/screenshots/issues/3590)) ([#3866](https://github.com/mozilla-services/screenshots/issues/3866)) [f06c289](https://github.com/mozilla-services/screenshots/commit/f06c289)
* Warn about failed login due to third party cookies ([#3632](https://github.com/mozilla-services/screenshots/issues/3632)). This adds backupCookieRequest to the sitehelper login process, to tell the site if third party cookies SHOULD work. If the site sees that third party cookies might not be enabled, then it does a second check to GET /api/set-login-cookie?check=1. If that request shows the cookie isn't set, then it changes the model to warn the user. Fixes [#3600](https://github.com/mozilla-services/screenshots/issues/3600) [cccc48a](https://github.com/mozilla-services/screenshots/commit/cccc48a)
* Drop xlink:href. use href instead. Fixes [#3063](https://github.com/mozilla-services/screenshots/issues/3063) [a22fc09](https://github.com/mozilla-services/screenshots/commit/a22fc09)
* Fix pagination content when there's no shot count. ([#3857](https://github.com/mozilla-services/screenshots/issues/3857)) [5a9fca8](https://github.com/mozilla-services/screenshots/commit/5a9fca8)
* Handle last shot of page being deleted. ([#3779](https://github.com/mozilla-services/screenshots/issues/3779)) [f25e035](https://github.com/mozilla-services/screenshots/commit/f25e035)
* Annotation changes:
  * Localize annotation page. ([#3418](https://github.com/mozilla-services/screenshots/issues/3418)) [26a1e98](https://github.com/mozilla-services/screenshots/commit/26a1e98)
  * Add clear button to Annotations [b7cdd41](https://github.com/mozilla-services/screenshots/commit/b7cdd41)
  * Set img CORS access for site origin. ([#3848](https://github.com/mozilla-services/screenshots/issues/3848)) [7eb9c9a](https://github.com/mozilla-services/screenshots/commit/7eb9c9a)
    * change img crossOrigin [44b1396](https://github.com/mozilla-services/screenshots/commit/44b1396)
  * Scale image on x if img x <= 210. ([#3728](https://github.com/mozilla-services/screenshots/issues/3728)) [72d0637](https://github.com/mozilla-services/screenshots/commit/72d0637)
  * Fix apsect ratio calculation. ([#3728](https://github.com/mozilla-services/screenshots/issues/3728)) [2a3c0a5](https://github.com/mozilla-services/screenshots/commit/2a3c0a5)
  * Take aspect ratio into consideration. ([#3728](https://github.com/mozilla-services/screenshots/issues/3728)) [d7d2bbe](https://github.com/mozilla-services/screenshots/commit/d7d2bbe)
  * Fix save button [7f637eb](https://github.com/mozilla-services/screenshots/commit/7f637eb)
  * Use <img> instead of bg img for My Shots and overlay buttons. ([#3728](https://github.com/mozilla-services/screenshots/issues/3728)) [ea021a9](https://github.com/mozilla-services/screenshots/commit/ea021a9)
  * annotation ui update [7103da5](https://github.com/mozilla-services/screenshots/commit/7103da5)

### Add-on changes

Note: these have not been released to Nightly.

* Remove browser vertical scrollbar in edit view. ([#3863](https://github.com/mozilla-services/screenshots/issues/3863)) [5b4cc6e](https://github.com/mozilla-services/screenshots/commit/5b4cc6e)
* Batch event and timing analytics data. ([#3757](https://github.com/mozilla-services/screenshots/issues/3757)) [d322ae9](https://github.com/mozilla-services/screenshots/commit/d322ae9)
* Fix rtl preview buttons. ([#3710](https://github.com/mozilla-services/screenshots/issues/3710)) [130b8d5](https://github.com/mozilla-services/screenshots/commit/130b8d5)
* Firefox peer feedback for 25.0.0 release. Changes:
  * use 1 message to send telemetry scalars
  * escape all reserved chars, not just quotes
  * remove needless thenable
  * simplify anyMatches
  * prefer Map to obj literal
  See also https://bugzilla.mozilla.org/show_bug.cgi?id=1419148#c13 [fc7c3ef](https://github.com/mozilla-services/screenshots/commit/fc7c3ef)
* Add thumbnail generation. ([#3282](https://github.com/mozilla-services/screenshots/issues/3282)) [c0496ab](https://github.com/mozilla-services/screenshots/commit/c0496ab)
* sort all file lists in moz.build ([#3827](https://github.com/mozilla-services/screenshots/issues/3827))This seems to be a new ./mach build requirement. Fixes [#3826](https://github.com/mozilla-services/screenshots/issues/3826) [e4442eb](https://github.com/mozilla-services/screenshots/commit/e4442eb)
* Suppress analytics server errors in addon. ([#3820](https://github.com/mozilla-services/screenshots/issues/3820)) [3ccd937](https://github.com/mozilla-services/screenshots/commit/3ccd937)
* Add cancel button to deactivate Screenshots. ([#3467](https://github.com/mozilla-services/screenshots/issues/3467)) [3031de5](https://github.com/mozilla-services/screenshots/commit/3031de5)

## Version 25.0.0

Note: this is both a server and add-on release.

* Track the number of copied shots in Telemetry ([#3812](https://github.com/mozilla-services/screenshots/issues/3812)) [336f147](https://github.com/mozilla-services/screenshots/commit/336f147)
* Add titles to preview overlay buttons. ([#3793](https://github.com/mozilla-services/screenshots/issues/3793)) [d46985c](https://github.com/mozilla-services/screenshots/commit/d46985c)
* Add paste symbol for image copy notification. ([#3790](https://github.com/mozilla-services/screenshots/issues/3790)) [5441349](https://github.com/mozilla-services/screenshots/commit/5441349)
* Add copy.svg path to manifest template ([#3786](https://github.com/mozilla-services/screenshots/issues/3786)) [a6fa8c6](https://github.com/mozilla-services/screenshots/commit/a6fa8c6)
* Copy shot to clipboard. ([#2582](https://github.com/mozilla-services/screenshots/issues/2582)) [58237e2](https://github.com/mozilla-services/screenshots/commit/58237e2)
* Fix remaining domain regexes ([#3783](https://github.com/mozilla-services/screenshots/issues/3783))This is a followup to 2bd42beed9f18f626e328fa73f2dd6fd8be57e6f that applies the same fix to other regular expressions [5089187](https://github.com/mozilla-services/screenshots/commit/5089187)
* Update CSS to fix notice tooltip. ([#3780](https://github.com/mozilla-services/screenshots/issues/3780)) [78e5853](https://github.com/mozilla-services/screenshots/commit/78e5853)
* instrument response times in shot creation flow ([#3727](https://github.com/mozilla-services/screenshots/issues/3727)). Fixes [#3673](https://github.com/mozilla-services/screenshots/issues/3673) [82cb4b7](https://github.com/mozilla-services/screenshots/commit/82cb4b7)

## Version 24.0.0

Note: this is a server-only release.

### Server changes

* Stop retrying the Mozilla library once it has loaded [4e9701c](https://github.com/mozilla-services/screenshots/commit/4e9701c)
* Use var instead of let in reactrender. This code is run literally without any babel translation, and shouldn't use fancy JavaScript [58d1617](https://github.com/mozilla-services/screenshots/commit/58d1617)
* Fix bug in shot id regular expression. The regex was meant to match '-', but the dash was treated as a range [2bd42be](https://github.com/mozilla-services/screenshots/commit/2bd42be)
* Fix a bug where `this.props.setPanelState` is not defined. This gets fired from the Shot page (the property is defined on the Shot Index page) [2c20056](https://github.com/mozilla-services/screenshots/commit/2c20056)
* and remove oversampling of canvas. Fixes [#3709](https://github.com/mozilla-services/screenshots/issues/3709) Fixes [#3669](https://github.com/mozilla-services/screenshots/issues/3669) [5dc6f22](https://github.com/mozilla-services/screenshots/commit/5dc6f22)
* Fix (and simplify) pagination related css. ([#3715](https://github.com/mozilla-services/screenshots/issues/3715)) ([#3731](https://github.com/mozilla-services/screenshots/issues/3731)) [64f5f9b](https://github.com/mozilla-services/screenshots/commit/64f5f9b)
* support domains up to 253 characters long. Fixes [#3530](https://github.com/mozilla-services/screenshots/issues/3530) [b12582b](https://github.com/mozilla-services/screenshots/commit/b12582b)
* put 50% of people into control ([#3723](https://github.com/mozilla-services/screenshots/issues/3723))This separates out people who are excluded from a test, from those who are in the control for the test. 50% of people always go to control, and 50% go into some experiment branch. People who aren't in either go into the 'exclude' category. Fixes [#3674](https://github.com/mozilla-services/screenshots/issues/3674) [a583d99](https://github.com/mozilla-services/screenshots/commit/a583d99)
* Fix page num style (and add guard against NaN). ([#3715](https://github.com/mozilla-services/screenshots/issues/3715)) [0e39d3e](https://github.com/mozilla-services/screenshots/commit/0e39d3e) [e06257d](https://github.com/mozilla-services/screenshots/commit/e06257d)
* Paginate My Shots ([#3657](https://github.com/mozilla-services/screenshots/issues/3657))* Handle multiple query params and add page number.
  * Add limit and offset to my shots query.
  * Get a page of shots instead of all.
  * Display page numbers and links.
  * Load initial shots w/ page number in query string.
  * Don't show pagination if 0 pages. No null for search.
  * Use arrow imgs and add styles.
  * Localize title attributes.
  * Reset page number on search. [5bd4583](https://github.com/mozilla-services/screenshots/commit/5bd4583)
* Generate l10n Messages from ftl ([#3415](https://github.com/mozilla-services/screenshots/issues/3415))* Add a make target to generate l10n message js files.
  * Add js script tags based on req locales.
  * Add exports support on generated locale js.
  * Use generated locale js instead of ftl.
  * Stop newing up MessageContexts on every l10n.getText().
  * Render only after getting l10n messages.
  * Handle get l10n messages failures.
  * Remove l10n messages from page body.
  * Stop using ES6 in generated locale js.
  * Add window.notifyL10nLoaded to reduce/elminate polling.
  * Do not init l10n to test default locale; no need.
  * Glob on generated locale js files.
  * Stop copying the locales dir to Docker img.
  * Add tests for l10n. [2709ca9](https://github.com/mozilla-services/screenshots/commit/2709ca9)
* Added New Twitter Icon [951dada](https://github.com/mozilla-services/screenshots/commit/951dada)
  * Delete btn-twitter.svg [026cc02](https://github.com/mozilla-services/screenshots/commit/026cc02)

### Add-on changes

* Remove unnecessary icon path for page action. ([#3760](https://github.com/mozilla-services/screenshots/issues/3760)) [bc29b56](https://github.com/mozilla-services/screenshots/commit/bc29b56)
* use content.XMLHttpRequest instead of wrappedJSObject.XMLHttpRequest ([#3755](https://github.com/mozilla-services/screenshots/issues/3755)). Fixes [#3626](https://github.com/mozilla-services/screenshots/issues/3626) [6cb98f6](https://github.com/mozilla-services/screenshots/commit/6cb98f6)
* Use generic notice css class. ([#3701](https://github.com/mozilla-services/screenshots/issues/3701)) [927f39a](https://github.com/mozilla-services/screenshots/commit/927f39a)
* Stop using window.inner[Width|Height] b/c scroll bars. ([#3641](https://github.com/mozilla-services/screenshots/issues/3641)) [647819e](https://github.com/mozilla-services/screenshots/commit/647819e)
* Remove onboarding icon. ([#3542](https://github.com/mozilla-services/screenshots/issues/3542)) [00f0409](https://github.com/mozilla-services/screenshots/commit/00f0409)
* Use dl-only notice style for cropped img warning. ([#3701](https://github.com/mozilla-services/screenshots/issues/3701)) [60a5b2f](https://github.com/mozilla-services/screenshots/commit/60a5b2f)
* Move start time for error timer into startBackground. ([#3707](https://github.com/mozilla-services/screenshots/issues/3707)) [5a3e01c](https://github.com/mozilla-services/screenshots/commit/5a3e01c)
* Properly set the Photon page action's title and icon. Bug 1395387 changed the Photon page action API so that `title` and `iconURL` are no longer properties but methods, setTitle() and setIconURL().  We need to update our consumer.  Right now, setting these properties isn't doing anything at all. [2e15e64](https://github.com/mozilla-services/screenshots/commit/2e15e64)
* Add left margin to selection frame to handle doc width < viewport width ([#3735](https://github.com/mozilla-services/screenshots/issues/3735))
  * Add left margin to selection frame to handle viewport x vs. parent doc x. ([#3256](https://github.com/mozilla-services/screenshots/issues/3256))
  * Don't set left margin of -0px. [49bafca](https://github.com/mozilla-services/screenshots/commit/49bafca)
* Download shot when Enter is pressed in download only mode. ([#3714](https://github.com/mozilla-services/screenshots/issues/3714)) [df973cd](https://github.com/mozilla-services/screenshots/commit/df973cd)
* Opt out of webdriver click in Selenium tests. ([#3734](https://github.com/mozilla-services/screenshots/issues/3734)) [c2ea6b3](https://github.com/mozilla-services/screenshots/commit/c2ea6b3)
* Bump pixel limit to 10000. ([#3538](https://github.com/mozilla-services/screenshots/issues/3538)) ([#3668](https://github.com/mozilla-services/screenshots/issues/3668)) [328696f](https://github.com/mozilla-services/screenshots/commit/328696f)
* Remove extra preselection frame unhide() (that's before frame's loaded). ([#3692](https://github.com/mozilla-services/screenshots/issues/3692)) ([#3729](https://github.com/mozilla-services/screenshots/issues/3729)) [263c990](https://github.com/mozilla-services/screenshots/commit/263c990)
* send a response after incrementing counts ([#3726](https://github.com/mozilla-services/screenshots/issues/3726)). Fixes [#3718](https://github.com/mozilla-services/screenshots/issues/3718) [b40f1dd](https://github.com/mozilla-services/screenshots/commit/b40f1dd)
* style tweaks for download only UI ([#3705](https://github.com/mozilla-services/screenshots/issues/3705)) [b40841d](https://github.com/mozilla-services/screenshots/commit/b40841d)
* Bug 366192 [bugzilla.mozilla.org] - Fixed http/https regex checks. [96f5fc4](https://github.com/mozilla-services/screenshots/commit/96f5fc4)
* add Telemetry scalars to track shot creation per session.  For related, Gecko-only changes to the telemetry Scalars.yaml file, see https://bugzilla.mozilla.org/show_bug.cgi?id=1412411. Fixes [#2218](https://github.com/mozilla-services/screenshots/issues/2218) [80ecdd0](https://github.com/mozilla-services/screenshots/commit/80ecdd0)
* disable full-page truncation warning if download-only warning will be shown. Fixes [#3700](https://github.com/mozilla-services/screenshots/issues/3700) [e3ee5af](https://github.com/mozilla-services/screenshots/commit/e3ee5af)
* fix rtl save icon alignment [d37a4ff](https://github.com/mozilla-services/screenshots/commit/d37a4ff)
* Use download only mode if 'never remember history' is checked. Fixes [#3574](https://github.com/mozilla-services/screenshots/issues/3574) [d0d4db3](https://github.com/mozilla-services/screenshots/commit/d0d4db3) [1c28bbf](https://github.com/mozilla-services/screenshots/commit/1c28bbf)
* Download only mode ([#3655](https://github.com/mozilla-services/screenshots/issues/3655))* use the private browsing download manager in private browsing mode
  Thanks to https://bugzil.la/1362448, webextensions will use the correct
  download manager, depending on the `incognito` state of the window.
  * Enable Screenshots in private browsing mode
  Leave the l10n string in place, in case this decision is reversed
  * Partial fix for [#3574](https://github.com/mozilla-services/screenshots/issues/3574), create download only mode for private browsing. Fixes [#2818](https://github.com/mozilla-services/screenshots/issues/2818) Fixes [#3274](https://github.com/mozilla-services/screenshots/issues/3274) [1223743](https://github.com/mozilla-services/screenshots/commit/1223743)


## Version 23.0.0

This is both a server and add-on release. The add-on will be exported to Firefox 58.

### Add-on changes

* Get doc width and height from function in case of resize. ([#3506](https://github.com/mozilla-services/screenshots/issues/3506)) [cd4e777](https://github.com/mozilla-services/screenshots/commit/cd4e777)
* Allow full size downloaded shots. ([#3506](https://github.com/mozilla-services/screenshots/issues/3506)) [4c6f9d5](https://github.com/mozilla-services/screenshots/commit/4c6f9d5)
* Fix direction of rtl-language arrows in onboarding [ef0508c](https://github.com/mozilla-services/screenshots/commit/ef0508c)
* Fix Selenium test ([#3647](https://github.com/mozilla-services/screenshots/issues/3647))
  * This adds a timeout after the UI is first displayed. The UI is displayed, and handlers are added, but for EVERYTHING to get setup and working takes slightly longer. Fixes [#3616](https://github.com/mozilla-services/screenshots/issues/3616) Fixes [#3616](https://github.com/mozilla-services/screenshots/issues/3616) [be2284a](https://github.com/mozilla-services/screenshots/commit/be2284a)
* Load scripts at document_start. ([#3633](https://github.com/mozilla-services/screenshots/issues/3633)) [6e4f27d](https://github.com/mozilla-services/screenshots/commit/6e4f27d)
* Avoid infinite selection loop by checking minimum sizd. Source code files on dxr.mozilla.org are rendered as floats inside a non-clearfixed parent element, which has a calculated height of 0. This condition isn't handled in the current loop logic, leading to an infinite while loop that locks up the UI. Fixes [#3314](https://github.com/mozilla-services/screenshots/issues/3314) [7c0be97](https://github.com/mozilla-services/screenshots/commit/7c0be97)
* Use JS to detect and apply high contrast mode styles. Fixes [#3174](https://github.com/mozilla-services/screenshots/issues/3174) Fixes [#3565](https://github.com/mozilla-services/screenshots/issues/3565) [8bcf729](https://github.com/mozilla-services/screenshots/commit/8bcf729)
* Remove system-disabled pref from addon testLanded in m-c as https://hg.mozilla.org/mozilla-central/rev/d15f945998db but didn't backport this change to github master. [57c0eac](https://github.com/mozilla-services/screenshots/commit/57c0eac)

#### Items from 22.0.0/21.0.0

22.0.0 and 21.0.0 were server-only release, so these changes first appear in the 23.0.0 export (20.0.0 had no add-on changes):

* Notify user when full page is cut off. Adds a new captureType, fullPageTruncated. Fixes [#2129](https://github.com/mozilla-services/screenshots/issues/2129) [aa97577](https://github.com/mozilla-services/screenshots/commit/aa97577)
* Put limits on uses of string.split. This only covers cases in the JPEG commits, to keep the resulting diff minimal [e9763fc](https://github.com/mozilla-services/screenshots/commit/e9763fc)
* Fix an undefined variable (bad rename) in the Mochitest [25aeaa1](https://github.com/mozilla-services/screenshots/commit/25aeaa1)

### Server changes

* Update domain name regex to allow `-` and `_`. ([#3667](https://github.com/mozilla-services/screenshots/issues/3667)) [617b0c8](https://github.com/mozilla-services/screenshots/commit/617b0c8)
* Added instruction to fix nodemon crash [1524e3f](https://github.com/mozilla-services/screenshots/commit/1524e3f)
* Remove Add-on Version from /metrics (thanks [Apply55gx](https://github.com/Apply55gx)!). [#3609](https://github.com/mozilla-services/screenshots/issues/3609) ([#3656](https://github.com/mozilla-services/screenshots/issues/3656))
  * remove version metrics query
  * remove version table
  * bug fix (Unexpected token)
  * Update model.js [e702b22](https://github.com/mozilla-services/screenshots/commit/e702b22)
* Use pg connection pooling. ([#3371](https://github.com/mozilla-services/screenshots/issues/3371)) [98f9496](https://github.com/mozilla-services/screenshots/commit/98f9496)
* Add an index and revise a select related to deleting all shots ([#3629](https://github.com/mozilla-services/screenshots/issues/3629))
  * Remove two seq scans and a sort from a select query. ([#3568](https://github.com/mozilla-services/screenshots/issues/3568))
  * Add index to column that's used in a WHERE.
  * Update db schema.
  * Up the DB level.
  * Use account id to get device ids; delete image data for all device ids.
  * Use device id when there's no account id to delete shots. [f183b3c](https://github.com/mozilla-services/screenshots/commit/f183b3c)
* Set HSTS max-age to 24 hours. Fixes [#3622](https://github.com/mozilla-services/screenshots/issues/3622) [ffaf9cd](https://github.com/mozilla-services/screenshots/commit/ffaf9cd)
* Create empty robots.txt (thanks again Apply55gx!). Closes [#3635](https://github.com/mozilla-services/screenshots/issues/3635) ([#3639](https://github.com/mozilla-services/screenshots/issues/3639))
  * Update Server.js add /robots.txt case [c51912b](https://github.com/mozilla-services/screenshots/commit/c51912b)
* Update `circle.yml` change baseline conf to zap master [69529dc](https://github.com/mozilla-services/screenshots/commit/69529dc)
* Update ZAP command in circleci ([#3321](https://github.com/mozilla-services/screenshots/issues/3321))
  * Only fail baseline tests when FAILs are found [8032330](https://github.com/mozilla-services/screenshots/commit/8032330)
* Export NODE_ENV and NO_UGLIFY for make. ([#3643](https://github.com/mozilla-services/screenshots/issues/3643)) [4835366](https://github.com/mozilla-services/screenshots/commit/4835366)
* Set s-maxage for shared cache on shot images. ([#3591](https://github.com/mozilla-services/screenshots/issues/3591)) [76fe5b0](https://github.com/mozilla-services/screenshots/commit/76fe5b0)
* Floor a potentially fractional image width. ([#3541](https://github.com/mozilla-services/screenshots/issues/3541)) [b58ccb7](https://github.com/mozilla-services/screenshots/commit/b58ccb7)
* make Screenshots work with third party cookies disabled. This adds a second attempt to login to wantsauth logins, one that runs in sitehelper.js, and tries to get the cookie set on a request that appears to come from the content page itself. Note this does not firmly protect from the content page overwriting window.XMLHttpRequest and having the add-on use that object. Fixes [#3581](https://github.com/mozilla-services/screenshots/issues/3581) [ac75a0b](https://github.com/mozilla-services/screenshots/commit/ac75a0b)
* Update many but not all npm packages to latest. ([#3588](https://github.com/mozilla-services/screenshots/issues/3588)) [18fc984](https://github.com/mozilla-services/screenshots/commit/18fc984)
* Set cache expiration for shot images. ([#3591](https://github.com/mozilla-services/screenshots/issues/3591)) [380bcd1](https://github.com/mozilla-services/screenshots/commit/380bcd1)
* Hide share button on mobile with media query. ([#3589](https://github.com/mozilla-services/screenshots/issues/3589)) [32d85be](https://github.com/mozilla-services/screenshots/commit/32d85be)
* Handle share url opens in onClick. ([#3357](https://github.com/mozilla-services/screenshots/issues/3357)) [5d23902](https://github.com/mozilla-services/screenshots/commit/5d23902)
* Fix pluralization by passing integer time diffs as numbers, not strings. The Localized fluent-react component doesn't coerce strings to numbers, so strings like "1" are mistakenly rendered using the default pluralization. Bug [#3495](https://github.com/mozilla-services/screenshots/issues/3495) is due to our use of the plural as the default (for example, see the 'timeDiffMinutesAgo' l10n key). Fixes [#3495](https://github.com/mozilla-services/screenshots/issues/3495) [3b0a99e](https://github.com/mozilla-services/screenshots/commit/3b0a99e)
* Try to work around [bug 1406571](https://bugzilla.mozilla.org/show_bug.cgi?id=1406571) [27084fe](https://github.com/mozilla-services/screenshots/commit/27084fe)
* remove `.nsprc` file now that tough-cookie has been updated. As seen in [#3561](https://circleci.com/gh/mozilla-services/screenshots/3561), we had to temporarily disable nsp checks due to a potential vulnerability in tough-cookie. The request library has been updated to use the updated tough-cookie, and, thanks to loose version tracking, looks like the fix percolates up to all our deps. Fixes [#3532](https://github.com/mozilla-services/screenshots/issues/3532) [0b09f21](https://github.com/mozilla-services/screenshots/commit/0b09f21)
* Run server unit tests with npm run test ([#3582](https://github.com/mozilla-services/screenshots/issues/3582)) (Note tests have broken when they weren't being run)
  * Fix l10n fallback tests. Fixes [#3372](https://github.com/mozilla-services/screenshots/issues/3372) Fixes [#3372](https://github.com/mozilla-services/screenshots/issues/3372) [3079086](https://github.com/mozilla-services/screenshots/commit/3079086)
* Extend default resource expiration time to 30 days ([#3592](https://github.com/mozilla-services/screenshots/issues/3592)). This is relatively safe since we use commit-hash-based cache busters on URLs.. This fixes one of the last issues from [#3202](https://github.com/mozilla-services/screenshots/issues/3202) [fdff27d](https://github.com/mozilla-services/screenshots/commit/fdff27d)
* Raven cleanups ([#3594](https://github.com/mozilla-services/screenshots/issues/3594))
  * When sending pageview events for direct image views, only send the referrer origin. This matches similar logic in ga-activation.js that also scrubs the referrer down to only the origin.
  * remove shot URLs from Sentry reports. This scrubs both shot URLs in referrers, as well as shot URLs from errors on the shot pages themselves. The paths are translated to /a-shot/redacted in this case. This also adds a req argument to captureRavenException, which adds request-specific information to error reports (something that sendRavenMessage already did). Fixes [#3483](https://github.com/mozilla-services/screenshots/issues/3483) [5d70330](https://github.com/mozilla-services/screenshots/commit/5d70330)
* Fix: remove control characters from filenames (thanks [Rimas Misevičius](https://github.com/rmisev)!). This patch removes all control characters (0x00...0x1F) from filenames, not only `"\n\r\t"`. They are not allowed in Microsoft Windows file names, see: [this](https://msdn.microsoft.com/en-us/library/aa365247(VS.85).aspx#naming_conventions). And possibly in other systems: https://en.wikipedia.org/wiki/Filename#Reserved_characters_and_words [489ae41](https://github.com/mozilla-services/screenshots/commit/489ae41)

## Version 22.0.0

This is primarily a server release. Some changes in the add-on have been ported to the 19.x.0 line.

### Server changes

* Update packages for nsp/regex checks [e761c7a](https://github.com/mozilla-services/screenshots/commit/e761c7a)
* Update express dependency ([#3553](https://github.com/mozilla-services/screenshots/issues/3553)) [719bf05](https://github.com/mozilla-services/screenshots/commit/719bf05)
* Add new clip type: fullPageTruncated. For [#2129](https://github.com/mozilla-services/screenshots/issues/2129) [aa97577](https://github.com/mozilla-services/screenshots/commit/aa97577)
* Bug fix for [#3513](https://github.com/mozilla-services/screenshots/issues/3513), create proper extension for downloads ([#3543](https://github.com/mozilla-services/screenshots/issues/3543)). The clip object is used to inform the download filename, so we need to add a clip before generating the filename [966bc6c](https://github.com/mozilla-services/screenshots/commit/966bc6c)

## Version 21.0.0

This is a server-only release.

### Server changes

* Fix twitter card image [2988649](https://github.com/mozilla-services/screenshots/commit/2988649)
* Update Opengraph / Twitter cards [dc10d75](https://github.com/mozilla-services/screenshots/commit/dc10d75)
* Use correct latest commit in `__version__` endpoint [2b7a703](https://github.com/mozilla-services/screenshots/commit/2b7a703)
* Ignore the tough-cookie (https://nodesecurity.io/advisories/525) warning for now ([#3533](https://github.com/mozilla-services/screenshots/issues/3533)). Followup to undo this in [#3532](https://github.com/mozilla-services/screenshots/issues/3532) [c21f3d3](https://github.com/mozilla-services/screenshots/commit/c21f3d3)
* separate banner image [b5a939e](https://github.com/mozilla-services/screenshots/commit/b5a939e)
* Csrf refactor ([#3516](https://github.com/mozilla-services/screenshots/issues/3516))* server: default to using csrf protection middleware
  * server: combine csrf and csrfProtection middleware [6aafff2](https://github.com/mozilla-services/screenshots/commit/6aafff2)
* Re-enable eslint-plugin-mozilla now that it is fixed. Fixes [#3450](https://github.com/mozilla-services/screenshots/issues/3450) [73d4077](https://github.com/mozilla-services/screenshots/commit/73d4077)

## Version 20.0.0

Note: this is a server release

* Update favicon. Fixes [#3492](https://github.com/mozilla-services/screenshots/issues/3492) [7544e9f](https://github.com/mozilla-services/screenshots/commit/7544e9f)
* Send unauth'd /shots to /#tourThis lets a user who accesses Screenshots from the Library, but has never authenticated or used Screenshots, get redirected to an onboarding tour. Fixes [#3493](https://github.com/mozilla-services/screenshots/issues/3493) [af473c3](https://github.com/mozilla-services/screenshots/commit/af473c3)

## Version 19.2.0

Note: this is a Firefox export (not a server release). This is what is shipping in Firefox 57.

* Update translations (see [Bug 1406526](https://bugzilla.mozilla.org/show_bug.cgi?id=1406526)).
* Remove code that checks for system-disabled pref ([#3554](https://github.com/mozilla-services/screenshots/issues/3554))
  Leave the branch/leaf checking code in place, both to minimize the size
  of the patch, and to make it easy to observe a self-hosting pref I'd
  like to add soon. Fixes [#3549](https://github.com/mozilla-services/screenshots/issues/3549) [1a6a619](https://github.com/mozilla-services/screenshots/commit/1a6a619)
* Stop Screenshots in Private Browsing ([#3544](https://github.com/mozilla-services/screenshots/issues/3544)). bootstrap.js sends the tab ID with the Photon page action, but it doesn't have the complete set of information that the WebExtension tab object has. Fixes [#3491](https://github.com/mozilla-services/screenshots/issues/3491) [5b13917](https://github.com/mozilla-services/screenshots/commit/5b13917)
* Remove `"` and `?` from filenames ([#3524](https://github.com/mozilla-services/screenshots/issues/3524))* remove " and ? from filenames


## Version 19.1.0

Note: this is a Firefox export (not a server release)

* Upload jpeg ([#3513](https://github.com/mozilla-services/screenshots/issues/3513))* Start [#220](https://github.com/mozilla-services/screenshots/issues/220), allow JPEG uploads, and respect content-type for JPEG or PNG
  - use JPEG for large shots
  - Allows JPEGs on the server, both to pass content checks, and to make use of stored content-types (instead of assuming image/png).
  - Puts an clip.image.type into shot objects
  - Uses .jpg for filenames when appropriate
  - Adds a new buildSetting for controlling the cutoff when we use JPEG
  - If a PNG image is too large, tries to make a JPEG and substitutes if the JPEG is actually smaller
  - Refactor some data:-URL and blob conversion functions into their own module. Fixes [#220](https://github.com/mozilla-services/screenshots/issues/220) [82139ed](https://github.com/mozilla-services/screenshots/commit/82139ed)
* Bug fix for [#3513](https://github.com/mozilla-services/screenshots/issues/3513), create proper extension for downloads ([#3543](https://github.com/mozilla-services/screenshots/issues/3543)). The clip object is used to inform the download filename, so we need to add a clip before generating the filename [966bc6c](https://github.com/mozilla-services/screenshots/commit/966bc6c)


## Version 19.0.0

Note: this is a Firefox export (not a server release)

### Add-on changes

* Remove Photon-related conditionals in tests [0b31d58](https://github.com/mozilla-services/screenshots/commit/0b31d58)
* remove browserAction. This changes the add-on to require the Photon page action, with no fallback to a browserAction
  - Removes test for Photon (assumes it is present)
  - Removes bootstrap.js code that deletes the browserAction button
  - Removes webextension code references to browserAction
  - Removes Photon conditionals (i.e., assume it's always Photon)
  - Make 57a1 the minimum version for the webextension/install.rdf. Fixes [#3468](https://github.com/mozilla-services/screenshots/issues/3468) [d4c56ae](https://github.com/mozilla-services/screenshots/commit/d4c56ae)
* Add setting to control binary or base64 upload. This adds `$SCREENSHOTS_UPLOAD_BINARY=true` to turn the feature on. Fixes [#3481](https://github.com/mozilla-services/screenshots/issues/3481) [92b0d53](https://github.com/mozilla-services/screenshots/commit/92b0d53)
* Convert to semantic locale strings for the slides. The numeric locale ids have made reordering complicated [3d590fb](https://github.com/mozilla-services/screenshots/commit/3d590fb)
* Avoid form uploads from being truncated. `FormData` was not creating correct request bodies for large images. This changes the code to manually construct the form upload. Fixes [#3472](https://github.com/mozilla-services/screenshots/issues/3472) [671b003](https://github.com/mozilla-services/screenshots/commit/671b003)
* Put a guard around the exception stack rewriting [dbc4750](https://github.com/mozilla-services/screenshots/commit/dbc4750)
* Revert "Remove the full page and save visible buttons from onboarding". This reverts commit 1887c38903ce91199f389a345095d6a0546004ac. [33bb5ff](https://github.com/mozilla-services/screenshots/commit/33bb5ff)
* Add a new slide to the tour. This slide includes the pageAction interface instead of the old toolbar button. Fixes [#3442](https://github.com/mozilla-services/screenshots/issues/3442) [9f072c0](https://github.com/mozilla-services/screenshots/commit/9f072c0) [2550449](https://github.com/mozilla-services/screenshots/commit/2550449)
* Change slide image to match Photon-style in browser image. Fixes [#3443](https://github.com/mozilla-services/screenshots/issues/3443) [dbad266](https://github.com/mozilla-services/screenshots/commit/dbad266)

### Server changes

Note: 19.0.0 isn't a server release

* Toggle different onboarding tour for FF 57+- For 57+, include the full screen / save visible step in the tour, for
  four steps overall. Also change the Get Started text and image to
  refer to a page action, not a toolbar button.
  - For 56- and non-FF browsers, show the three step tour and refer to the
  toolbar button.
  - Add some trivial model unit tests, to get that ball rolling. Fixes [#3444](https://github.com/mozilla-services/screenshots/issues/3444) [d07db41](https://github.com/mozilla-services/screenshots/commit/d07db41)
* Add Mozilla.UITour call to homepage, for [#3411](https://github.com/mozilla-services/screenshots/issues/3411) ([#3449](https://github.com/mozilla-services/screenshots/issues/3449))* Add Mozilla.UITour call to homepage, for [#3411](https://github.com/mozilla-services/screenshots/issues/3411)
  * Add the UITour-lib JS file to the homepage [8262303](https://github.com/mozilla-services/screenshots/commit/8262303)
* Clear csrf cookie on successful leave [0e7bc51](https://github.com/mozilla-services/screenshots/commit/0e7bc51)
* Validate deviceId in /api/register [24eef08](https://github.com/mozilla-services/screenshots/commit/24eef08)
* Fix wrong path reference in proxy-url.js [a4f07c3](https://github.com/mozilla-services/screenshots/commit/a4f07c3)
* Fix wrong path reference in server.js [07c9855](https://github.com/mozilla-services/screenshots/commit/07c9855)
* Fail server build for imports out of build/ and node_modules/https://github.com/mozilla-services/screenshots/pull/3440#issuecomment-326625163 [3586749](https://github.com/mozilla-services/screenshots/commit/3586749)

## Version 18.0.0

* Validate csrf headers [8671702](https://github.com/mozilla-services/screenshots/commit/8671702)
* Move homepage CSS above JS to avoid flash of unstyled content. Fixes [#3407](https://github.com/mozilla-services/screenshots/issues/3407) [c25b919](https://github.com/mozilla-services/screenshots/commit/c25b919)
* Avoid infinite refresh loop on shots page. Fixes [#2939](https://github.com/mozilla-services/screenshots/issues/2939) [546cf23](https://github.com/mozilla-services/screenshots/commit/546cf23)
* Add FAQ link [0fcc3c4](https://github.com/mozilla-services/screenshots/commit/0fcc3c4)
* Validate clip image urls [0882793](https://github.com/mozilla-services/screenshots/commit/0882793)
* Don't render invalid clip image urls [1f2ebd6](https://github.com/mozilla-services/screenshots/commit/1f2ebd6)
* Update Node packages [5a5a2b2](https://github.com/mozilla-services/screenshots/commit/5a5a2b2)
* Build production versions of bundles ([#3432](https://github.com/mozilla-services/screenshots/issues/3432)). This always builds bundles as a production build. envify and uglifyify should also help improve overall bundle sizes. Fixes [#2254](https://github.com/mozilla-services/screenshots/issues/2254) [2450dc7](https://github.com/mozilla-services/screenshots/commit/2450dc7)
* Remove full domain from analytics ([#3431](https://github.com/mozilla-services/screenshots/issues/3431)). Fixes [#3393](https://github.com/mozilla-services/screenshots/issues/3393) [900f438](https://github.com/mozilla-services/screenshots/commit/900f438)
* Make /settings page responsive ([#3435](https://github.com/mozilla-services/screenshots/issues/3435)) [5cc3d0e](https://github.com/mozilla-services/screenshots/commit/5cc3d0e)
* Display Firefox Accounts avatar [6942dba](https://github.com/mozilla-services/screenshots/commit/6942dba)
* Fix error setting headers after headers sent exception [8281a5c](https://github.com/mozilla-services/screenshots/commit/8281a5c)
* Test duplicate csrf secret cookies [60163ee](https://github.com/mozilla-services/screenshots/commit/60163ee)
* Add csrf tests [7c49e63](https://github.com/mozilla-services/screenshots/commit/7c49e63) [12a8e56](https://github.com/mozilla-services/screenshots/commit/12a8e56)
* Fix test failures due to error middleware ordering [9cd2464](https://github.com/mozilla-services/screenshots/commit/9cd2464)
* Update csrf cookie config; remove samesite and host prefix, set secure attr when expecting https protocol [61d944d](https://github.com/mozilla-services/screenshots/commit/61d944d)
* Centralize CSRF middleware and config in a module [ca1b61e](https://github.com/mozilla-services/screenshots/commit/ca1b61e)
* Update `csurf` incantation everywhere [5531c0b](https://github.com/mozilla-services/screenshots/commit/5531c0b)
* Tweak header management middleware. Fixes [#3299](https://github.com/mozilla-services/screenshots/issues/3299) [07b06d0](https://github.com/mozilla-services/screenshots/commit/07b06d0)
* Ensure that `shots` is an array before calling `shots.map()` ([#3401](https://github.com/mozilla-services/screenshots/issues/3401)) [75df157](https://github.com/mozilla-services/screenshots/commit/75df157)
* Apply the hover fix from [#3403](https://github.com/mozilla-services/screenshots/issues/3403) to the edit/annotation button [be7278a](https://github.com/mozilla-services/screenshots/commit/be7278a)
* Update test_responses main [e9ce61c](https://github.com/mozilla-services/screenshots/commit/e9ce61c)
* Fix 500 for unauthed get of shots page without shots, e.g. from a private window [08af2d2](https://github.com/mozilla-services/screenshots/commit/08af2d2)
* Test response codes from more pages [53ac521](https://github.com/mozilla-services/screenshots/commit/53ac521)
* Remove the `/proxy` endpoint [8ba3834](https://github.com/mozilla-services/screenshots/commit/8ba3834)
* Hash secret once when registering [a33fcd1](https://github.com/mozilla-services/screenshots/commit/a33fcd1)
* Fix 500 error for same user registering twice [3f1e762](https://github.com/mozilla-services/screenshots/commit/3f1e762)
* Fix 500 error logging in without secret [0163070](https://github.com/mozilla-services/screenshots/commit/0163070)
* Fix 500 error when registering without secret [e3aefec](https://github.com/mozilla-services/screenshots/commit/e3aefec)
* Add login and register auth tests [3f96f34](https://github.com/mozilla-services/screenshots/commit/3f96f34)
* Send image to server in binary [9c558ce](https://github.com/mozilla-services/screenshots/commit/9c558ce)
* Send exceptions to raven when `alert()` is called on the website [0189252](https://github.com/mozilla-services/screenshots/commit/0189252)
* Update annotation UI & Photon buttons [be1225c](https://github.com/mozilla-services/screenshots/commit/be1225c)
* Fix FxA disconnect button [4332ac0](https://github.com/mozilla-services/screenshots/commit/4332ac0)
* fix disappearing buttons [50e8b97](https://github.com/mozilla-services/screenshots/commit/50e8b97)
* Change istanbul requirement to exact version [098e82d](https://github.com/mozilla-services/screenshots/commit/098e82d)
* Correct a tiny typo. [d9b427d](https://github.com/mozilla-services/screenshots/commit/d9b427d)
* Update FxA UI [0745970](https://github.com/mozilla-services/screenshots/commit/0745970)
* Add option for tracking server side code coverage [5a2fcb4](https://github.com/mozilla-services/screenshots/commit/5a2fcb4). Fixes [#3243](https://github.com/mozilla-services/screenshots/issues/3243) [7c8d18f](https://github.com/mozilla-services/screenshots/commit/7c8d18f)
* Fix FxA email display [e2fea61](https://github.com/mozilla-services/screenshots/commit/e2fea61)

### Add-on changes

Note: in a coincidence of timing, 18.0.0 will be a server release, and an add-on/Firefox export release. See [Bug 1396060](https://bugzilla.mozilla.org/show_bug.cgi?id=1396060)

* Run all add-on svg files through svgo [40b9fe0](https://github.com/mozilla-services/screenshots/commit/40b9fe0)
* Fix icon appearance for Photon page action.  See [Bug 1395284](https://bugzilla.mozilla.org/show_bug.cgi?id=1395284). Right now, the icon is too dark, so it doesn't match the appearance of the other Photon page actions. The problem is that the URI passed as the action's iconURL is a `file://` URI.  The Photon theme uses context-fill and context-fill-opacity in SVG in order to style SVG icons correctly, and SVG context painting is not supported for file `bootstrap.js` should pass a `moz-extension://` URI instead, which context painting does support, and which is what the WebExtension browser action toolbar button uses. Additionally, the icon SVG used by the Photon page action needs to be updated with fill-opacity="context-fill-opacity". [b246cb9](https://github.com/mozilla-services/screenshots/commit/b246cb9)
* Add logging of unexpected clipboard state ([#3430](https://github.com/mozilla-services/screenshots/issues/3430))This logs cases when the passed-in text is empty, or the textarea select doesn't appear to work. Logs are sent to Sentry. Fixes [#3406](https://github.com/mozilla-services/screenshots/issues/3406) [10b7c0f](https://github.com/mozilla-services/screenshots/commit/10b7c0f)
* Fixed next and prev buttons for rtl [5a08464](https://github.com/mozilla-services/screenshots/commit/5a08464)
* Moved Save/Cancel buttons from right to left for rtl languages ([#3412](https://github.com/mozilla-services/screenshots/issues/3412)) [#3241](https://github.com/mozilla-services/screenshots/issues/3241) [115d6ed](https://github.com/mozilla-services/screenshots/commit/115d6ed)
* Send image to server in binary [9c558ce](https://github.com/mozilla-services/screenshots/commit/9c558ce)

## Version 17.0.0

Note: this is a server-only release.

* Simplify retrieval of My Shots data, hopefully speeding things up ([#3374](https://github.com/mozilla-services/screenshots/issues/3374)) [f11b478](https://github.com/mozilla-services/screenshots/commit/f11b478)
* Separate page script from data [e7a014e](https://github.com/mozilla-services/screenshots/commit/e7a014e)
* Update fluent-langneg to 0.1.0 ([#3370](https://github.com/mozilla-services/screenshots/issues/3370)) [0678b6a](https://github.com/mozilla-services/screenshots/commit/0678b6a)
* Use English as default if Accept-Language header is missing or `*` ([#3367](https://github.com/mozilla-services/screenshots/issues/3367)). Fixes [#3231](https://github.com/mozilla-services/screenshots/issues/3231) [d8425c6](https://github.com/mozilla-services/screenshots/commit/d8425c6)
* More server tests: ([#3363](https://github.com/mozilla-services/screenshots/issues/3363))
* Make bootstrap.js/jpm the default in run-addon ([#3362](https://github.com/mozilla-services/screenshots/issues/3362)). Fixes [#3345](https://github.com/mozilla-services/screenshots/issues/3345) [e9ffc05](https://github.com/mozilla-services/screenshots/commit/e9ffc05)
* Add timing to all database queries. Timing is logged when it goes over a configurable limit. Locations are logged based on caller filename/position. Fixes [#3318](https://github.com/mozilla-services/screenshots/issues/3318) [c5b8f24](https://github.com/mozilla-services/screenshots/commit/c5b8f24)
* Put image sizes in images table. Fixes [#3207](https://github.com/mozilla-services/screenshots/issues/3207) [f762797](https://github.com/mozilla-services/screenshots/commit/f762797)
* Add authorization check on set-title [d411e4e](https://github.com/mozilla-services/screenshots/commit/d411e4e)
* Make shebangs consistent. Fixes [#2394](https://github.com/mozilla-services/screenshots/issues/2394) [6c8c1d3](https://github.com/mozilla-services/screenshots/commit/6c8c1d3)
* Validate origin url [7cdb4d5](https://github.com/mozilla-services/screenshots/commit/7cdb4d5)
* Add utm and events to homepage [734ee1e](https://github.com/mozilla-services/screenshots/commit/734ee1e)
* Add experimental / dev-only annotation tools: pen and highlighter [83d207a](https://github.com/mozilla-services/screenshots/commit/83d207a)

## Version 16.0.0

This is a Firefox export release. Note all changes included since the last (version 10) release:

* Fix tests failing when run against photon-y Firefox without MOZ_PHOTON_THEME defined [beec56b](https://github.com/mozilla-services/screenshots/commit/beec56b)
* Fix review feedback for screenshots 16.0.0 [38c5cc7](https://github.com/mozilla-services/screenshots/commit/38c5cc7)

### Server changes in 16.0.0

* empty docTitle value in JSON data [f9871b7](https://github.com/mozilla-services/screenshots/commit/f9871b7)
* remove fade in from masonry [0d953ee](https://github.com/mozilla-services/screenshots/commit/0d953ee)

### From 15.0.0

* Deal with lack of MOZ_PHOTON_THEME on 57+ [3e9eba3](https://github.com/mozilla-services/screenshots/commit/3e9eba3)
* Make run-addon work with new legacy pref. Fixes [#3333](https://github.com/mozilla-services/screenshots/issues/3333) [b9a776b](https://github.com/mozilla-services/screenshots/commit/b9a776b)
* Immediately exit when Firefox is exiting. Fixes [#3323](https://github.com/mozilla-services/screenshots/issues/3323) [916c353](https://github.com/mozilla-services/screenshots/commit/916c353)
* Fix tests, enable legacy extensions via pref during tests ([#3324](https://github.com/mozilla-services/screenshots/issues/3324)) [c60fd37](https://github.com/mozilla-services/screenshots/commit/c60fd37)
* Make tests resilient to a browserAction or pageAction ([#3317](https://github.com/mozilla-services/screenshots/issues/3317)) Fixes [#3306](https://github.com/mozilla-services/screenshots/issues/3306) [3c15014](https://github.com/mozilla-services/screenshots/commit/3c15014)

### From 13.0.0

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

### From 12.0.0

* Remove duplicate drawWindow call for shot preview [2a5dd27](https://github.com/mozilla-services/screenshots/commit/2a5dd27)
* Update shot preview save icon [735b3f9](https://github.com/mozilla-services/screenshots/commit/735b3f9)

### From 11.0.0

Note these are part of the version/tag, but have not been uploaded to the Firefox tree.

* Add reason to webExtension.startup and shutdown Will be useful when https://bugzilla.mozilla.org/show_bug.cgi?id=1372750 and
  https://bugzilla.mozilla.org/show_bug.cgi?id=1373749 are fixed [d97d4a7](https://github.com/mozilla-services/screenshots/commit/d97d4a7)
* Protect against an empty IPC response ([#3037](https://github.com/mozilla-services/screenshots/issues/3037))This happened in some weird corner case while debugging [14df39d](https://github.com/mozilla-services/screenshots/commit/14df39d)
* Guard access of this.save when un-disabling the save button ([#3030](https://github.com/mozilla-services/screenshots/issues/3030)). This can happen after the worker has been torn down, and this.save isn't defined [cf6e72a](https://github.com/mozilla-services/screenshots/commit/cf6e72a)
* Set dimensions for icon and add to startup ([#3136](https://github.com/mozilla-services/screenshots/issues/3136)) [9959ede](https://github.com/mozilla-services/screenshots/commit/9959ede)
* Disable Screenshots in private windows. Fixes [#3120](https://github.com/mozilla-services/screenshots/issues/3120) [aefc639](https://github.com/mozilla-services/screenshots/commit/aefc639)
* about:home is not treated like about:newtab ([#3088](https://github.com/mozilla-services/screenshots/issues/3088)). Fixes [#3029](https://github.com/mozilla-services/screenshots/issues/3029) [4633694](https://github.com/mozilla-services/screenshots/commit/4633694)
* preview shot before saving full page/visibleremove addToMyShots [c87db61](https://github.com/mozilla-services/screenshots/commit/c87db61)

## Version 15.0.0

Note: this is a server-only release

* Upgrade minor pg version [57b4bd0](https://github.com/mozilla-services/screenshots/commit/57b4bd0)
* Properly escape JSON separators [1c53af5](https://github.com/mozilla-services/screenshots/commit/1c53af5)
* Add an index on data.deviceid to speed up My Shots ([#3328](https://github.com/mozilla-services/screenshots/issues/3328))Also updates schema.sql with version 19 (because I forgot ./bin/dumpschema --record for that version) [219392c](https://github.com/mozilla-services/screenshots/commit/219392c)
* Correct and spritify icon buttons [4f08f2f](https://github.com/mozilla-services/screenshots/commit/4f08f2f)

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

## Version 10.12.0

* Immediately exit when Firefox is exiting ([#3323](https://github.com/mozilla-services/screenshots/pull/3323))

## Version 10.11.0

* Import locales from master ([#3293](https://github.com/mozilla-services/screenshots/pull/3293))

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
