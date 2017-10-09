## Firefox Screenshots Metrics

*Last Update: 2017-08-17*

This document is a summary of the metrics Firefox Screenshots will record, how we're recording them, and what we're looking for in those metrics.  There are two main areas we'll look at:

0. Metrics to tell us if Firefox Screenshots is affecting Firefox.  For instance, do Firefox Screenshots users engage longer with Firefox?

0. Help us understand how people use Firefox Screenshots, so that we can improve the experience of the tool itself.  A/B tests fall under this umbrella.

Additionally, it's important to recognize that Firefox Screenshots is an add-on in a browser as well as a server-side service.

## deviceId / user ID

Each device that uses Screenshots (browser, profile, computer) generates a random UUID ID.  We call this the deviceId.  In addition a random secret is generated.  The two together are used to register and authenticate with the server.

The deviceId is only registered with the screenshots.firefox.com server when the user first saves a shot.  Starting Screenshots or downloading does not cause registration.

Each event is sent to the server with its deviceId.  The server hashes this ID (combining it with a random server string that is rotated occasionally) before sending it to Google Analytics.  This hashed ID is generally called `cid` (customer ID, a Google Analytics term).

For web page views (viewing and interacting with individual shots or My Shots) we serve up `/ga-activation.js` or `/ga-activation-hashed.js` (the latter for pages with private URLs).  This file is generated *per user* and includes the `cid`, if the user is authenticated with the service.

The deviceId does not change for the life of a browser profile.

### Key Metrics

Key metrics of Firefox Screenshots are fairly simple:

#### Do people continue to create shots?

This will be tracked in a cohort graph.

#### Do people share those shots with other people?

In this case there is not a "right" answer, but sharing indicates a different kind of use case from personal storage.

We can look at the share event in GA, and we can look at non-owner visits (`web/visit/non-owner` vs `web/visit/owner`).  We also have some referrer access via GA.  These reports should be accessible within GA given the metrics listed below.

#### Do people revisit their own shots?

This is primarily a count of `web/visit/owner`.  The tool always opens the page once, and will fire `web/visit/owner-first` on that first visit.

#### Do people who view a shot, install Firefox Screenshots?

We will be tracking some events under `goto-pageshot` that would lead people from shot pages to a place where they could load the page.  Then we track clicking the install link itself, which GA reporting should be able to connect to the original `goto-pageshot` event.  We can't detect how often that install click leads to an actual install.

### Data Collection

Firefox Screenshots assigns each user a random ID (associated with their profile) when the add-on is installed. This ID is associated with all shots the user makes.  For the purpose of Google Analytics (GA) the ID is hashed. The same hashed ID is used for website visits and events, and for add-on events.

No metrics data is sent to any servers until a user interacts with Firefox Screenshots.

The add-on does not communicate directly with GA, instead it POSTs an event to the Firefox Screenshots server which, in turn, sends the event to GA.  This model allows us to only send the data we need for analysis instead of the more comprehensive data collection that google-analytics.js does.  Besides the event information specified below we also send the User-Agent string, and the add-on provides:
* Any A/B tests the user is in, or if the user is in the control for a test
* The application (“firefox”)
* The add-on version (“6.0.0”)
* For selections we send the size of the selection, rounded to 10 pixels.  E.g., 500 x 150

### Metrics schema

Each item in these events requires:

Event category: maps to the "source": `addon` or `web`
Event action: what the event "does", such as `start-shot` (note that Save actually "takes" the shot, the focus should be on what happens as a result of interacting with the control)
Event label: exactly what control invoked the action, such as toolbar-button.  These are the "locations":

* `toolbar`: the browser toolbar
* `topbar`: the top bar on the page during selection
* `overlay`: the question overlay after you click the toolbar button
* `navbar`: the top navigation bar on a shot page
* `content`: the non-navigation-bar parts of a shot page
* `myshots`: the shot index page
* `selection`: anything that happens during the selection phase, that doesn't happen in the topbar
* `keyboard`: any keyboard shortcut used

#### A/B tests

##### (finished) Highlight shot button

As described in [#2081](https://github.com/mozilla-services/screenshots/issues/2081) we are putting a badge on the button of some users.  The test is named `highlightButtonOnInstall`.

The dimension `cd3` will be `control` (no badge) or `badge` (10% of population).

If the badge is shown we send the event `addon/ab-highlight-button-shown` – this is marked as a non-interactive event.

##### (finished) Adjust My Shots button display

As described in [#2082](https://github.com/mozilla-services/screenshots/issues/2082) we are changing how the My Shots button is displayed.  The test is named `styleMyShotsButton`.

The dimension `cd4` will be `control` (normal styling) or something else Yet To Be Determined.

##### (finished) Auto-open share panel

As described in [#2079](https://github.com/mozilla-services/screenshots/issues/2079) we auto-open the share panel for a set of users.  The test is named `autoOpenSharePanel`.

The dimension `cd5` *for the creator* will be `control` (no auto-opening) or `autoopen` (share panel will be auto-opened).  The dimension `cd6` will be `control` (no auto-opening *happened*) or `autoopen` (auto-open happened in the past at shot creation).

The primary change was in `server/src/pages/shot/share-buttons.js`

#### Add-on metrics

1. [x] Toggle shot button on `addon/start-shot/toolbar-button` (previous to 54 launch the label was `toolbar-pageshot-button`)
2. [ ] Use keyboard shortcut to start shot `addon/start-shot/keyboard-shortcut` (accel-alt-control-c) (FIXME: not yet implemented)
3. [x] Use the right-click context menu to start a shot `addon/start-shot/context-menu`
3. [x] Start shot with onboarding because the site requested it (typically a visit to `/#hello`) `addon/start-shot/site-request`
2. [x] Make a selection `addon/make-selection/selection-drag` with `cd2: {px width}, cd1: {px height}`
3. [x] Make a selection by clicking on an element `addon/make-selection/selection-click` with `cd2: {px width}, cd1: {px height}`
4. [x] Click but fail to find an element that can be selected `addon/no-selection/no-element-found` (error case, not sure when it happens)
3. [x] Cancel a selection by clicking on the background `addon/cancel-selection/selection-background-mousedown`
4. [x] Start resizing the selection `addon/start-resize-selection/handle`
5. [x] Finish resizing the selection `addon/resize-selection/mouseup`
6. [x] Finish resizing, without a change `addon/keep-resize-selection/mouseup` (mousedown, don't move, mouseup)
7. [x] Start moving the selection `addon/start-move-selection/selection`
8. [x] Finish moving the selection `addon/move-selection/mouseup`
9. [x] Finish moving, without a change `addon/keep-move-selection/mouseup`
3. [x] Click Save `addon/save-shot/overlay-save-button`
4. [x] Click Cancel `addon/cancel-shot/overlay-cancel-button`
5. [x] Click Download `addon/download-shot/overlay-download-button`
5. [x] Cancel because URL changed `addon/cancel-shot/url-changed` (when something that uses window.history "navigates" spontaneously away)
7. [ ] Cancel because the tab is navigated (such as entering something in the URL bar), **or** the tab was closed, **or** the tab was reloaded `addon/cancel-shot/tab-load` (previously closing would emit `addon/cancel-shot/tab-close` and `addon/cancel-shot/tab-reload` for those cases)
5. [x] Click My Shots `addon/goto-myshots/selection-button`
6. [x] Go to My Shots by hitting the Screenshots button on a about:newtab page `addon/goto-myshots/about-newtab`
6. [x] Go to `/#hello` to onboard (because the user pressed the Screenshots button on a page that could not be shot) `addon/goto-onboarding/selection-button`
6. [x] Click on "Save visible" `addon/capture-visible/selection-button`
7. [x] Click on "Save Full Page" `addon/capture-full-page/selection-button`
6. [x] Click Cancel after previewing full-page/visible `addon/cancel-shot/cancel-preview-button`
7. [x] Click Save after previewing full-page shot `addon/save-full-page/save-preview-button`
8. [x] Click Save after previewing visible shot `addon/save-visible/save-preview-button`
9. [x] Click Download after previewing full-page shot `addon/download-full-page/download-preview-button`
9. [x] Click Download after previewing visible shot `addon/download-visible/download-preview-button`
6. ~~Click My Shots button from error panel `addon/goto-myshots/error-panel`~~
7. [x] Hit Escape (Cancel) `addon/cancel-shot/keyboard-escape`
8. [x] Hit Enter (Save) `addon/save-shot/keyboard-enter`
12. ~~Encounter an error saving the shot `addon/error/save-shot`~~
13. ~~Encounter any other kind of error `addon/error/misc`~~
14. ~~Install the add-on `addon/install` (fired internally, regardless of how it is installed)~~
15. ~~Uninstall the add-on `addon/uninstall` (fired internally, regardless of how it is uninstalled)~~
16. ~~Hit shot button on a page that can't be shot (XUL page) `addon/abort-start-shot/xul-page`~~
17. [x] Hit shot button on a page that uses `<frameset>` and can't be shot, `addon/abort-start-shot/frame-page`
18. [x] Hit shot button on a page (like an SVG image) that doesn't have a `document.body` and can't be shot, `addon/abort-start-shot/document-is-TAGNAME` where TAGNAME is the tag of `document.documentElement` (e.g., `document-is-svg`)
99. Toggle shot button off `addon/cancel-shot/toolbar-button`
99. Bad response when trying to login `addon/login-failed/bad-response-CODE`
99. Connection error trying to login `addon/login-failed/connection-error`
99. Bad response when trying to register `addon/register-failed/bad-response-CODE`
99. Connection error trying to register `addon/register-failed/connection-error`

Deprecated:

1. Hit shot on any about: page, `addon/start-shot-about-page` (this has been disallowed)
1. Hit shot on any non-http page, `addon/start-shot-non-http/actual-scheme` (only file: would be possible, and we no longer track)
1. Test pilot was present at install time `addon/test-pilot-installed`~~
1. Test pilot was not present at install time `addon/test-pilot-not-installed`~~
1. Closing a tab would emit `addon/cancel-shot/tab-close`, now it emits `addon/cancel-shot/tab-load`
1. Reloading a tab would emit `addon/cancel-shot/tab-reload`, now it emits `addon/cancel-shot/tab-load`
1. Previously to the 54 launch there was `addon/start-shot/toolbar-pageshot-button` which was renamed to `addon/start-shot/toolbar-button`

##### Onboarding metrics

The onboarding slides have some events:

1. Click on the next-slide button: `addon/navigate-slide/next`
1. Click on the prev-slide button: `addon/navigate-slide/prev`
1. Navigate to the next slide by hitting ArrowRight: `addon/navigate-slide/keyboard-arrowright`
1. Navigate to the previous slide by hitting ArrowLeft: `addon/navigate-slide/keyboard-arrowleft`
1. Click on one of the dots to navigate to a specific slide: `addon/navigate-slide/goto`
1. Cancel the slides by clicking on the background: `addon/cancel-slides/background-click`
1. Cancel the slides by clicking on skip: `addon/cancel-slides/skip`
1. Cancel the slides by hitting Escape: `addon/cancel-slides/keyboard-escape`
1. Finish the slides by clicking on done: `addon/finish-slides/done`
1. Visit a slide through any kind of navigation: `addon/visited-slide/slide-INDEX` (1-4)

##### Internal add-on events

1. [x] Start an upload `addon/upload/started` with eventValue of Kb (1000 bytes)
2. [x] Fail to upload due to connection aborted `addon/upload-failed/connection` (up to version 1.0.1 was `addon/upload/failed-connection`)
3. [x] Fail to upload due to bad status from server `addon/upload-failed/status-{code}` (up to version 1.0.1 was `addon/upload/failed-status` with eventValue: status code)
4. [x] Finish upload successfully `addon/upload/success`
5. [ ] After failure, re-attempt the upload `addon/upload-retry/times-{N}` (up to version 1.0.1 was `addon/upload/upload-retry` with eventValue: times (1-2)) (FIXME: we have no retry)
sendEvent("click-install-firefox-home", {useBeacon: true});
#### Owner web visit

These are events that an add-on user can encounter on a shot they own

1. [x] Visit the page, `web/visit/owner`
2. [x] Visit the page immediately after it is created (as part of the normal flow), `web/visit/owner-first`
4. [x] Click delete `web/start-delete/navbar`
  5. [x] Confirm delete `web/delete/popup-confirm`
  6. [x] Cancel delete `web/cancel-delete/popup-confirm`
7. [x] Click delete from shot index, `web/start-delete/my-shots`
  8. [x] Confirm delete from shot index `web/delete/my-shots-popup-confirm`
  9. [x] Cancel delete from shot index, `web/cancel-delete/my-shots-popup-confirm`
7. [x] Click My Shots `web/goto-myshots/navbar`
11. [x] Try to change expiration time `web/start-expiration-change/navbar`
  12. [x] Cancel changing expiration time `web/cancel-expiration-change/navbar`
  13. [x] Change expiration time `web/set-expiration/navbar`
  14. [x] Change expiration time to specific time `web/set-expiration-to-time/navbar`
  15. [x] Change expiration time to indefinite `web/set-expiration-to-indefinite/navbar`
16. [x] View expired shot `web/view-expired/owner`
17. [x] Recover expired shot `web/recover-expired`
19. [x] Visit original page `web/view-original/navbar-owner`
20. [x] Visit original page from expired view `web/view-original/expired-owner`
21. [x] Click share `web/start-share-owner/navbar`
  22. [x] Click Facebook `web/share-owner/facebook`
  23. [x] Click Twitter `web/share-owner/twitter`
  24. [x] Click Pinterest `web/share-owner/pinterest`
  25. [x] Click mailto `web/share-owner/mailto`
  26. [x] Hit copy `web/share/copy`
  27. [x] Copy with "rich copy", `web/share/rich-copy`
  27. [x] Focus link field `web/share/focus-url`
  28. [x] Cancel/close share `web/cancel-share`
29. [x] Visit Screenshots link from footer `web/goto-homepage/footer` (was eventAction `goto-pageshot` before 54 launch)
30. [x] Click "Copy Image Text" on the context menu `web/copy-image-text/context-menu`
32. [x] Click Feedback/mailto button `start-feedback/footer`
31. [x] Click on clip `web/goto-clip/content`
32. [x] Click the download button `web/download/navbar`
33. [x] Visit an image directly, when the image isn't embedded directly in a Screenshots shot page, `web/visit/direct-view-owner`
34. [x] View an image directly, when the image is being shown as part of a Facebook/Twitter style preview (the og:image or twitter:image), `web/visit/direct-view-embedded-owner`

#### Shot Index (My Shots)

1. [x] Click a tile `web/goto-shot/myshots-tile`
2. [x] Click on the original link `web/goto-original-url/myshots-tile`
3. [x] Enter search term and submit `web/search/submit`
4. [x] Enter search term (at least 4 characters) and wait 1 second `web/search/timed`
4. [x] Clear search term `web/clear-search/submit` and click the arrow
4. [x] Clear search term `web/clear-search/keyboard` by simply backspacing
5. [x] Receive no search results `web/search-no-results`
6. [x] Right-click (or get the context menu) anywhere on the page `contextmenu/background`, `contextmenu/shot-tile`, `contextmenu/search`, or `contextmenu/header` depending on where the user clicks.
7. [x] Click download from tile: `web/download/myshots-tile`
8. [x] Clear search with button: `web/clear-search/button`

#### Settings (My Shots)

1. [x] Click connect button `web/start-connect/settings`
2. [x] Click disconnect button `web/start-disconnect/settings`
3. [x] Confirm disconnect on settings page `web/confirm-disconnect/settings-popup-confirm`
4. [x] Cancel disconnect on settings page `web/cancel-disconnect/settings-popup-confirm`


#### Non-owner web visit

1. [x] Visit the page, `web/visit/non-owner`
2. [x] Visit an image directly, when the image isn't embedded directly in a Screenshots shot page, `web/visit/direct-view-non-owner`
3. [x] View an image directly, when the image is being shown as part of a Facebook/Twitter style preview (the og:image or twitter:image), `web/visit/direct-view-embedded-non-owner`
2. [x] Click flag button `web/start-flag/navbar`
3. [x] Click Share (same as for owner, but with `share-non-owner` instead of `share-owner`, and `start-share-non-owner`)
4. [x] Visit original URL `web/view-original/navbar-non-owner`
5. [x] Click Screenshots link in header `web/goto-homepage/navbar` (was `goto-pageshot` eventAction before 54 launch)
17. [x] View expired shot `web/view-expired/non-owner`
9. [x] Click on clip (already covered)
10. [x] Click on the "Get it here" (install Screenshots) banner: `web/click-install-banner`
11. [x] Click on the "Get Firefox now" (install Firefox) banner: `web/click-install-firefox-shot`.  Also note the link uses `?utm_source=screenshots.firefox.com&utm_medium=referral&utm_campaign=screenshots-acquisition&utm-content=from-shot` on the link.

#### Home Page Events

1. [x] Click `My Shots` From Home `web/goto-myshots/homepage`
2. [x] Click `Get Started from` From Home `web/get-started/homepage`
3. [x] Click on the "Firefox Free Download" (install Firefox) button from home: `web/click-install-firefox-home`.  Also note the link uses `?utm_source=screenshots.firefox.com&utm_medium=referral&utm_campaign=screenshots-acquisition&utm-content=from-home` on the link.

#### Other web events

1. [x] Start the "Leave Screenshots" process: `server/start-leave-service`
2. [x] Complete leaving: `server/leave-service-completed`
3. [x] From Leave Screenshots, click Delete: `web/leave-service/leave-button`
4. [x] From Leave Screenshots, click Cancel: `web/cancel-leave/cancel-link`
4. [x] After leaving, click home button `web/home-after-leave/home-link`




#### Server events

1. [x] When an expired shot is deleted (about 2 weeks after expiration) it sends `server/clean-deleted-shot` with an eventValue of the number of shots cleaned at that moment.  (By default these are checked every minute.)
2. [x] When a successful request to `/api/login` happens, we send `server/api-login`
3. [x] When the user successfully logs in to their firefox account, we send `server/fxa-login`

#### Page views

1. [x] Views of shot pages show up as `/a-shot/{hash}`
2. [x] Views of images directly, `/images/{hash}`
3. [x] Views of images that came from og/twitter metadata, `/images/embedded/{hash}`

The hashed page ID (`{hash}`) is a simple SHA1(path), with no additional randomness or salt added.

#### Annotation metrics

1. [x] Open annotation tools: `web/start-annotations/navbar`
1. [x] Save Edited shot: `web/save/annotation-toolbar`
2. [x] Cancel Annotations: `web/cancel/annotation-toolbar`
3. [x] Select pen from annotation toolbar: `web/pen-select/annotation-toolbar`
4. [x] Deselect pen from annotation toolbar: `web/pen-deselect/annotation-toolbar`
5. [x] Select highlighter from annotation toolbar: `web/highlighter-select/annotation-toolbar`
6. [x] Deselect highlighter from annotation toolbar: `web/highlighter-deselect/annotation-toolbar`

#### General Google Analytics information

This is stuff we get from including ga.js on Screenshots pages.

1. Browser type
2. Location
3. Language
4. Referrals
5. Social referral
6. Search terms
7. Demographic guesses about users
8. See if some pages are "visited" particularly often (we don't have access to the actual page, but can identify that some specific page has a large number of visits)

### Database Metrics

We can do queries directly on the database of Firefox Screenshots.  These might include:

1. Look at cohorts of individuals, reviewing their shot creation patterns
2. How many people make a couple shots?  How many make a lot of shots?
3. See if people are making shots of mostly private or mostly public pages
4. Identify the dimensions of shots
5. Compare shot URLs to a domain allowlist, to determine broad categories of sites that are popular to view

### Error reporting

In order to detect errors in the field that we haven't encountered in development, we catch and report most unexpected exceptions.  These exceptions are sent to a Mozilla-hosted server that aggregates and reports on these errors.  The development team monitors these errors.

In most cases if an exception report has been sent you will also see a popup notification of an error in Screenshots.  Exceptions use [catcher.unhandled](https://github.com/mozilla-services/screenshots/search?q=catcher.unhandled) or [noPopup](https://github.com/mozilla-services/screenshots/search?q=noPopup), and these are typically unusual cases where a popup would intrude on an otherwise recoverable error.

In addition to the exception message and a stack trace, the error information includes information about your browser (User-Agent), platform, the add-on version, and IP address.  We use [Raven.js](https://docs.sentry.io/clients/javascript/) to collect the error reports.

If an exception occurs in the context of screenshotting a specific page, we specifically filter out any reference to the URL or domain of that page.

Error reporting in the add-on can be opted out of in the same way as other metrics (using the general Telemetry preference, see below).  Error reporting on the website cannot be opted out of.

#### Error reporting data

The data collected in error reports includes:

* Date of the submission
* Browser version and User-Agent header
* Operating system
* The Screenshots system add-on version
* The exception message
* The stack trace
* Length of time the add-on was activated
* Exception-specific properties (for example, if there is an error connecting to the server, we add the server response code to the exception)

While the URL of the page you are shooting is not part of this information, we additionally filter out the URL in case of some bug in how we collect this information.

### Opt-out

The add-on reads the opt-out preference (`datareporting.healthreport.uploadEnabled`), labelled "Enable Health Report" in preferences under Privacy and Security.  If this preference is false, or if there is any issue trying to fetch the preference, then no data is sent.

The website reads the [Do Not Track Header](https://www.mozilla.org/en-US/firefox/dnt/) (`navigator.doNotTrack`) and if it is present and set to *1* the website will not send metrics data.  We treat error reporting differently, and it is sent regardless of the Do Not Track setting.

There may be some exceptions to the above for debugging or analysis of malfunctions.
