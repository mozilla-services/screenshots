## Firefox Screenshots Metrics

A summary of the metrics Screenshots will record, and what we're looking for in those metrics.

### Opt-out

The add-on tracks the Telemetry opt-out preference (`toolkit.telemetry.enabled`) each time the user presses the Screenshots button.  If this preference is false, or if there is any issue trying to fetch the preference, then no data is sent to the Screenshots server.

### Key Metrics

Key metrics of Screenshots are fairly simple:

#### Do people continue to create shots?

A cohort is all the people who took their first shot on a certain day.  Let's say May 1, 2016.

We analyze the cohort by asking for the subsequent days: has this person made a shot after this date?

Therefore 1 day users are all those people who took shots May 2+, 2 day users took a shot May 3+, etc.  The percentage is the number of users who *could* used the product N+ days, divided by those who could have used the product N days.

To do this we will use this query:

```sql
SELECT
  date_trunc('day', MIN(created)) AS first_created,
  date_trunc('day', MAX(created)) AS last_created
FROM data
GROUP BY deviceid
```

This results in something like:

```
first_created | last_created
--------------+-------------
2015-09-14    | 2015-09-14
2015-10-19    | 2015-10-19
2015-10-20    | 2015-10-20
2016-03-16    | 2016-03-16
```

We're not sure how to aggregate this in SQL, but we can always do it in the server.  We might want look at all cohorts or just some cohorts, and account for the current day.

(Work listed and finished in [#1197](https://github.com/mozilla-services/pageshot/issues/1197))

#### Do people share those shots with other people?  

In this case there is not a "right" answer, but sharing indicates a different kind of use case from personal storage.

We can look at the share event in GA, and we can look at non-owner visits (`web/visit/non-owner` vs `web/visit/owner`).  We also have some referrer access via GA.  These reports should be accessible within GA given the metrics listed below.

#### Do people revisit their own shots?

This is primarily a count of `web/visit/owner`.  The tool always opens the page once, and will fire `web/visit/owner-first` on that first visit.

#### Do people who view a shot, install Firefox Screenshots?

We will be tracking some events under `goto-pageshot` that would lead people from shot pages to a place where they could load the page.  Then we track clicking the install link itself, which GA reporting should be able to connect to the original `goto-pageshot` event.  We can't detect how often that install click leads to an actual install.

#### Summary

Continuing to create shots indicates overall value to the user.  Sharing and revisiting confirm that the value is actually obtained (it's possible to fantasize that you *would* find value in a shot, while never actually realizing that value).  Lastly, evidence that people find Screenshots attractive when they see a shot, or that people would refer each other to Screenshots, indicates potential for organic growth.

We do not collect Net Promoter Score.

### Usage Metrics

This information is intended to help us make Screenshots better.

We record an event stream of interaction with the add-on and website.  The events:

(**Note**: per [#1183](https://github.com/mozilla-services/pageshot/issues/1183) we need to figure out if we are actually collecting these events properly)

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

##### Highlight shot button

As described in [#2081](https://github.com/mozilla-services/pageshot/issues/2081) we are putting a badge on the button of some users.  The test is named `highlightButtonOnInstall`.

The dimension `cd3` will be `control` (no badge) or `badge` (10% of population).

If the badge is shown we send the event `addon/ab-highlight-button-shown` – this is marked as a non-interactive event.

##### Adjust My Shots button display

As described in [#2082](https://github.com/mozilla-services/pageshot/issues/2082) we are changing how the My Shots button is displayed.  The test is named `styleMyShotsButton`.

The dimension `cd4` will be `control` (normal styling) or something else Yet To Be Determined.

##### Auto-open share panel

As described in [#2079](https://github.com/mozilla-services/pageshot/issues/2079) we auto-open the share panel for a set of users.  The test is named `autoOpenSharePanel`.

The dimension `cd5` *for the creator* will be `control` (no auto-opening) or `autoopen` (share panel will be auto-opened).  The dimension `cd6` will be `control` (no auto-opening *happened*) or `autoopen` (auto-open happened in the past at shot creation).

The primary change was in `server/src/pages/shot/share-buttons.js`

#### Add-on metrics

1. ~~Start the browser `addon/open-browser/launch`~~ (removed for launch)
2. ~~Daily ping (attempt roughly every 24 hours) `addon/daily-ping`~~ (removed for launch)
1. [x] Toggle shot button on `addon/start-shot/toolbar-button` (previous to 54 launch the label was `toolbar-pageshot-button`)
2. [ ] Use keyboard shortcut to start shot `addon/start-shot/keyboard-shortcut` (accel-alt-control-c) (FIXME: not yet implemented)
3. [x] Use the right-click context menu to start a shot `addon/start-shot/context-menu`
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
6. [ ] Cancel because the tab is closed `addon/cancel-shot/tab-close` (FIXME: need to track)
7. [ ] Cancel because the tab is navigated (such as entering something in the URL bar) `addon/cancel-shot/tab-load` (FIXME: need to track)
8. [ ] Cancel because the tab is reloaded `addon/cancel-shot/tab-reload` (FIXME: need to track)
5. [x] Click My Shots `addon/goto-myshots/selection-button`
6. [x] Go to My Shots by hitting the Screenshots button on a about:newtab page `addon/goto-myshots/about-newtab`
6. [x] Click on "Save visible" `addon/capture-visible/selection-button`
7. [x] Click on "Save Full Page" `addon/capture-full-page/selection-button`
6. ~~Click My Shots button from error panel `addon/goto-myshots/error-panel`~~
7. [x] Hit Escape (Cancel) `addon/cancel-shot/keyboard-escape`
8. [x] Hit Enter (Save) `addon/save-shot/keyboard-enter`
12. ~~Encounter an error saving the shot `addon/error/save-shot`~~
13. ~~Encounter any other kind of error `addon/error/misc`~~
14. ~~Install the add-on `addon/install` (fired internally, regardless of how it is installed)~~
15. ~~Uninstall the add-on `addon/uninstall` (fired internally, regardless of how it is uninstalled)~~
16. ~~Hit shot button on a page that can't be shot (XUL page) `addon/abort-start-shot/xul-page`~~
17. [ ] Hit shot button on a page that uses `<frameset>` and can't be shot, `addon/abort-start-shot/frame-page` (FIXME: todo)
17. [ ] Hit shot button on any about: page `addon/start-shot-about-page` (FIXME: todo)
18. [ ] Hit shot button on any other non-http page `addon/start-shot-non-http/actual-scheme` (note: shooting still continues).  Full event is something like `addon/start-shot-non-http/file` (or `about`, `view-source`, `data`) (FIXME: todo)
20. ~~Test pilot was present at install time `addon/test-pilot-installed`~~
21. ~~Test pilot was not present at install time `addon/test-pilot-not-installed`~~
99. Toggle shot button off `addon/cancel-shot/toolbar-button`

##### Internal add-on events

1. [x] Start an upload `addon/upload/started` with eventValue of Kb (1000 bytes)
2. [x] Fail to upload due to connection aborted `addon/upload-failed/connection` (up to version 1.0.1 was `addon/upload/failed-connection`)
3. [x] Fail to upload due to bad status from server `addon/upload-failed/status-{code}` (up to version 1.0.1 was `addon/upload/failed-status` with eventValue: status code)
4. [x] Finish upload successfully `addon/upload/success`
5. [ ] After failure, re-attempt the upload `addon/upload-retry/times-{N}` (up to version 1.0.1 was `addon/upload/upload-retry` with eventValue: times (1-2)) (FIXME: we have no retry)

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
17. [x] View expired shot (not the owner) `web/view-expired/non-owner`
17. [x] Recover expired shot `web/recover-expired`
19. [x] Visit original page `web/view-original/navbar`
20. [x] Visit original page from expired view `web/view-original/expired`
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

#### Shot Index (My Shots)

1. [x] Click a tile `web/goto-shot/myshots-tile`
2. [x] Click on the original link `web/goto-original-url/myshots-tile`
3. [x] Enter search term and submit `web/search/submit`
4. [x] Enter search term (at least 4 characters) and wait 1 second `web/search/timed`
4. [x] Clear search term `web/clear-search/submit` and click the arrow
4. [x] Clear search term `web/clear-search/keyboard` by simply backspacing
5. [x] Receive no search results `web/search-no-results`
6. [x] Right-click (or get the context menu) anywhere on the page `contextmenu/background`, `contextmenu/shot-tile`, `contextmenu/search`, or `contextmenu/header` depending on where the user clicks.

#### Non-owner web visit

1. [x] Visit the page, `web/visit/non-owner`
2. [x] Visit an image directly, when the image isn't embedded directly in a Screenshots shot page, `web/visit/direct-view`
3. [x] View an image directly, when the image is being shown as part of a Facebook/Twitter style preview (the og:image or twitter:image), `web/visit/direct-view-embedded`
2. [x] Click flag button `web/start-flag/navbar`
3. [x] Click Share (same as for owner, but with `share-non-owner` instead of `share-owner`, and `start-share-non-owner`)
4. [x] Visit original URL `web/goto-original-url/navbar`
5. [x] Click Screenshots link in header `web/goto-homepage/navbar` (was `goto-pageshot` eventAction before 54 launch)
9. [x] Click on clip (already covered)
10. [x] Click on the "Get it here" (install Screenshots) banner: `web/click-install-banner`
11. [x] Click on the "Get Firefox now" (install Firefox) banner: `web/click-install-firefox`.  Also note the link uses `?utm_source=pageshot.net&utm_medium=referral&utm_campaign=pageshot-acquisition` on the link.

#### Server events

1. [x] When an expired shot is deleted (about 2 weeks after expiration) it sends `server/clean-deleted-shot` with an eventValue of the number of shots cleaned at that moment.  (By default these are checked every minute.)
2. [x] When a successful request to `/api/login` happens, we send `server/api-login`

#### Page views

1. [x] Views of shot pages show up as `/a-shot/{hash}`
2. [x] Views of images directly, `/images/{hash}`
3. [x] Views of images that came from og/twitter metadata, `/images/embedded/{hash}`

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

We have a pretty rich database in Screenshots, and we can do all kinds of queries on the database.  These might include:

1. Look at cohorts of individuals, reviewing their shot creation patterns
2. How many people make a couple shots?  How many make a lot of shots?
3. See if people are making shots of mostly private or mostly public pages
4. Identify the dimensions of shots
5. Compare shot URLs to a domain whitelist, to determine broad categories of sites that are popular to view
