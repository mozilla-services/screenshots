## Page Shot Metrics

A summary of the metrics Page Shot will record, and what we're looking for in those metrics.

### Key Metrics

Key metrics of Page Shot are fairly simple:

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

#### Do people who view a shot, install Page Shot?

We will be tracking some events under `goto-pageshot` that would lead people from shot pages to a place where they could load the page.  Then we track clicking the install link itself, which GA reporting should be able to connect to the original `goto-pageshot` event.  We can't detect how often that install click leads to an actual install.

#### Summary

Continuing to create shots indicates overall value to the user.  Sharing and revisiting confirm that the value is actually obtained (it's possible to fantasize that you *would* find value in a shot, while never actually realizing that value).  Lastly, evidence that people find Page Shot attractive when they see a shot, or that people would refer each other to Page Shot, indicates potential for organic growth.

We do not collect Net Promoter Score.

### Usage Metrics

This information is intended to help us make Page Shot better.

We record an event stream of interaction with the add-on and website.  The events:

(**Note**: per [#1183](https://github.com/mozilla-services/pageshot/issues/1183) we need to figure out if we are actually collecting these events properly)

### Metrics schema

Each item in these events requires:

Event category: maps to the "source": `addon` or `web`
Event action: what the event "does", such as `start-shot` (note that Save actually "takes" the shot, the focus should be on what happens as a result of interacting with the control)
Event label: exactly what control invoked the action, such as toolbar-pageshot-button.  These are the "locations":

* `toolbar`: the browser toolbar
* `topbar`: the top bar on the page during selection
* `overlay`: the question overlay after you click the toolbar button
* `navbar`: the top navigation bar on a shot page
* `content`: the non-navigation-bar parts of a shot page
* `myshots`: the shot index page
* `selection`: anything that happens during the selection phase, that doesn't happen in the topbar
* `keyboard`: any keyboard shortcut used

#### Add-on metrics

1. [x] Start the browser `addon/open-browser/launch`
2. [x] Daily ping (attempt roughly every 24 hours) `addon/daily-ping`
1. [x] Click shot button `addon/start-shot/toolbar-pageshot-button` ![image](https://d17oy1vhnax1f7.cloudfront.net/items/2P3o1F0O3Y0K23372e1P/Image%202016-09-07%20at%201.57.19%20PM.png?v=c1ae01f4)
2. [x] Use keyboard shortcut to start shot `addon/start-shot/keyboard-shortcut` (accel-alt-control-c)
3. ~~Click "select region" `addon/start-region-select/mode-click`~~
4. ~~Click "select archive" `addon/start-archive/mode-click`~~
5. ~~Click "cancel" from first interface `addon/cancel-shot/mode-click`~~
2. [x] Make a selection `addon/make-selection/selection-drag` with `cd2: {px width}, cd1: {px height}` ![image](https://d17oy1vhnax1f7.cloudfront.net/items/1t2I0A2H3U2q2S0x1w1z/Image%202016-09-07%20at%201.58.58%20PM.png?v=8a788938)
3. [x] Make a selection by clicking on an element `addon/make-selection/selection-click` with `cd2: {px width}, cd1: {px height}` ![image](https://d17oy1vhnax1f7.cloudfront.net/items/3a2C2S06463H1T2E313z/Image%202016-09-07%20at%201.59.52%20PM.png?v=86f2c12f)
4. [x] Click but fail to find an element that can be selected `addon/no-selection/no-element-found` (error case, not sure when it happens)
3. [x] Cancel a selection by clicking on the background `addon/cancel-selection/selection-background-mousedown` ![image](https://d17oy1vhnax1f7.cloudfront.net/items/2B3h0J3e1V1M0t0e370d/Image%202016-09-07%20at%202.00.36%20PM.png?v=d95cf082)
4. [x] Start resizing the selection `addon/start-resize-selection/handle` ![image](https://d17oy1vhnax1f7.cloudfront.net/items/0b3W0a2q1B3T2s3B3u1n/Image%202016-09-07%20at%202.01.31%20PM.png?v=a725566b)
5. [x] Finish resizing the selection `addon/resize-selection/mouseup`
6. [x] Finish resizing, without a change `addon/keep-resize-selection/mouseup` (mousedown, don't move, mouseup)
7. [x] Start moving the selection `addon/start-move-selection/selection`
8. [x] Finish moving the selection `addon/move-selection/mouseup`
9. [x] Finish moving, without a change `addon/keep-move-selection/mouseup`
3. [x] Click Save `addon/save-shot/overlay-save-button` ![image](https://d17oy1vhnax1f7.cloudfront.net/items/1F021R1U1z0y3A1i0C2F/Image%202016-09-07%20at%202.02.43%20PM.png?v=1c42ee47)
4. [x] Click Cancel `addon/cancel-shot/topbar-cancel` ![image](https://d17oy1vhnax1f7.cloudfront.net/items/3u2M2G1N431s1O193L1n/Image%202016-09-07%20at%202.03.24%20PM.png?v=bedc4e14)
5. [x] Cancel because URL changed `addon/cancel-shot/url-changed` (when something that uses window.history "navigates" spontaneously away)
6. [x] Cancel because the tab is closed `addon/cancel-shot/tab-close`
7. [x] Cancel because the tab is navigated (such as entering something in the URL bar) `addon/cancel-shot/tab-load`
8. [x] Cancel because the tab is reloaded `addon/cancel-shot/tab-reload`
5. [x] Click My Shots `addon/goto-myshots/selection-button` ![image](https://d17oy1vhnax1f7.cloudfront.net/items/3J1u3F1Z3R0Z0A2e161T/Image%202016-09-07%20at%202.06.19%20PM.png?v=7e2c945f)
6. [x] Click on "Save visible" `addon/capture-visible/selection-button`
7. [x] Click on "Save Full Page" `addon/capture-full-page/selection-button`
6. ~~Click My Shots from mode selection `addon/goto-myshots/mode-click`~~
6. [x] Click My Shots button from error panel `addon/goto-myshots/error-panel`
6. [x] Click shot button while Page Shot is active `addon/aborted-start-shot/toolbar-pageshot-button` ![image](https://d17oy1vhnax1f7.cloudfront.net/items/0m2n3h1a2o0e271O1j13/Image%202016-09-07%20at%202.07.08%20PM.png?v=9baa7316)
7. [x] Hit Escape (Cancel) `addon/cancel-shot/keyboard-escape`
8. [x] Hit Enter (Save) `addon/save-shot/keyboard-enter`
9. ~~Drag out a selection `addon/drag-selection/selection`~~
12. [ ] Encounter an error saving the shot `addon/error/save-shot`
13. [ ] Encounter any other kind of error `addon/error/misc`
14. [x] Install the add-on `addon/install` (fired internally, regardless of how it is installed)
15. [x] Uninstall the add-on `addon/uninstall` (fired internally, regardless of how it is uninstalled)
16. [x] Hit shot button on a page that can't be shot (XUL page) `addon/abort-start-shot/xul-page` ![image](https://d17oy1vhnax1f7.cloudfront.net/items/3F0n0b3w411F2w2n3H1n/Image%202016-09-07%20at%202.49.21%20PM.png?v=bca96af4)
17. [x] Hit shot button on a page that uses `<frameset>` and can't be shot, `addon/abort-start-shot/frame-page`
17. [x] Hit shot button on any about: page `addon/start-shot-about-page` (note: shooting still continues) ![image](https://d17oy1vhnax1f7.cloudfront.net/items/3e2d1j04233B3c3X2B3F/Image%202016-09-07%20at%202.50.55%20PM.png?v=316b9cb3)
18. [x] Hit shot button on any other non-http page `addon/start-shot-non-http/actual-scheme` (note: shooting still continues).  Full event is something like `addon/start-shot-non-http/file` (or `about`, `view-source`, `data`) ![image](https://d17oy1vhnax1f7.cloudfront.net/items/0T0m2p1Z2L1u093F1Y0Q/Image%202016-09-07%20at%202.51.39%20PM.png?v=82d1fc1b)
19. [ ] Save a "private page" shot `addon/start-shot-private-page`
20. [x] Test pilot was present at install time `addon/test-pilot-installed` ![image](https://d17oy1vhnax1f7.cloudfront.net/items/2q2Y1P2G3J3Z2G0K1t3D/Image%202016-09-07%20at%202.52.24%20PM.png?v=ebf9cbfd)
21. [x] Test pilot was not present at install time `addon/test-pilot-not-installed`

##### Internal add-on events

1. [x] Start an upload `addon/upload/started` with eventValue of Kb (1000 bytes)
2. [x] Fail to upload due to connection aborted `addon/upload/failed-connection`
3. [x] Fail to upload due to bad status from server `addon/upload/failed-status` eventValue: status code (e.g., 400, 404, 500, 503)
4. [x] Finish upload successfully `addon/upload/success`
5. [x] After failure, re-attempt the upload `addon/upload/upload-retry` eventValue: times (1-2)

#### Owner web visit

These are events that an add-on user can encounter on a shot they own

1. [x] Visit the page, `web/visit/owner` ![image](https://d17oy1vhnax1f7.cloudfront.net/items/1H0F34072h191V2l3r3t/Image%202016-09-07%20at%202.53.23%20PM.png?v=30c9230a)
2. [x] Visit the page immediately after it is created (as part of the normal flow), `web/visit/owner-first`
3. ~~Click Save Full Page `web/save-full-page/navbar-save-full-page`~~
4. [x] Click delete `web/start-delete/navbar` ![image](https://d17oy1vhnax1f7.cloudfront.net/items/2K2S1m1y2K1R2o0h0s46/Image%202016-09-07%20at%202.53.48%20PM.png?v=1a87e714)
  5. [x] Confirm delete `web/delete/popup-confirm` ![image](https://d17oy1vhnax1f7.cloudfront.net/items/0v0y053t3F01362Z0N0E/Image%202016-09-07%20at%202.54.33%20PM.png?v=de0b3b7a)
  6. [x] Cancel delete `web/cancel-delete/popup-confirm`
7. [x] Click My Shots `web/goto-myshots/navbar` ![image](https://d17oy1vhnax1f7.cloudfront.net/items/2y090u1g3G371p1E0g21/Image%202016-09-07%20at%202.55.26%20PM.png?v=e4f24d87)
8. ~~Switch to full page from clip view, by clicking anywhere on background `web/full-page-view/content`~~
9. ~~Switch to full page from clip view, by clicking `>-<` button `web/full-page-view/content-unzoom`~~
10. ~~Switch to clip view from full page `web/clip-view/content-zoom`~~
11. [x] Try to change expiration time `web/start-expiration-change/navbar` ![image](https://d17oy1vhnax1f7.cloudfront.net/items/2d2k0W0O131Z3Z003v26/Image%202016-09-07%20at%202.56.26%20PM.png?v=bcfe14ff)
  12. [x] Cancel changing expiration time `web/cancel-expiration-change/navbar` ![image](https://d17oy1vhnax1f7.cloudfront.net/items/2B260B3L3W1k1W2e0S2X/Image%202016-09-07%20at%202.57.06%20PM.png?v=e886aeb1)
  13. [x] Change expiration time `web/set-expiration/navbar` ![image](https://d17oy1vhnax1f7.cloudfront.net/items/203h1m0G293S3f0S3i3D/Image%202016-09-07%20at%202.57.48%20PM.png?v=62835651)
  14. [x] Change expiration time to specific time `web/set-expiration-to-time/navbar` ![image](https://d17oy1vhnax1f7.cloudfront.net/items/0h2j47240l3H3f3b2F16/Image%202016-09-07%20at%202.58.43%20PM.png?v=fe40eaf9)
  15. [x] Change expiration time to indefinite `web/set-expiration-to-indefinite/navbar` ![image](https://d17oy1vhnax1f7.cloudfront.net/items/1Z430j0S0b1Y0b1t3c0Z/Image%202016-09-07%20at%202.59.09%20PM.png?v=c5b57d4c)
16. [x] View expired shot `web/view-expired/owner` ![image](https://d17oy1vhnax1f7.cloudfront.net/items/261Z1B393n3P160L0L0v/Image%202016-09-07%20at%203.13.09%20PM.png?v=989a2564)
17. [x] View expired shot (not the owner) `web/view-expired/non-owner` ![image](https://d17oy1vhnax1f7.cloudfront.net/items/3s0D3U3G3j0X3g181y2w/Image%202016-09-07%20at%203.13.40%20PM.png?v=f71beecb)
17. [x] Recover expired shot `web/recover-expired` ![image](https://d17oy1vhnax1f7.cloudfront.net/items/1Q2z0e0X1d211Z0j2L3x/Image%202016-09-07%20at%203.14.05%20PM.png?v=5cb57722)
18. ~~View expired/deleted shot `web/view-deleted-expired`~~
19. [x] Visit original page `web/view-original/navbar` ![image](https://d17oy1vhnax1f7.cloudfront.net/items/0w0c1E382D1r3x1Q082u/Image%202016-09-07%20at%203.00.00%20PM.png?v=f4042b4e)
20. [x] Visit original page from expired view `web/view-original/expired`
21. [x] Click share `web/start-share-owner/navbar` ![image](https://d17oy1vhnax1f7.cloudfront.net/items/182s1U2y252j3h1y2e2s/Image%202016-09-07%20at%203.00.49%20PM.png?v=a876319c)
  22. [x] Click Facebook `web/share-owner/facebook` ![image](https://d17oy1vhnax1f7.cloudfront.net/items/3l1w3726101d110r0V00/Image%202016-09-07%20at%203.01.28%20PM.png?v=93fa9c96)
  23. [x] Click Twitter `web/share-owner/twitter` ![image](https://d17oy1vhnax1f7.cloudfront.net/items/1a3V0O173q3R0S2a080z/Image%202016-09-07%20at%203.02.06%20PM.png?v=462e5be2)
  24. [x] Click Pinterest `web/share-owner/pinterest` ![image](https://d17oy1vhnax1f7.cloudfront.net/items/1f1o1r3Z0y3D1k1o221W/Image%202016-09-07%20at%203.02.41%20PM.png?v=3ebeb167)
  25. [x] Click mailto `web/share-owner/mailto` ![image](https://d17oy1vhnax1f7.cloudfront.net/items/0K0V3u1c3h3F1q3M3D3V/Image%202016-09-07%20at%203.03.15%20PM.png?v=bac7c1c3)
  26. [x] Hit copy `web/share/copy` ![image](https://d17oy1vhnax1f7.cloudfront.net/items/1i1G300b0J0J2z190Q26/Image%202016-09-07%20at%203.03.49%20PM.png?v=7e4a82bb)
  27. [x] Focus link field `web/share/focus-url` ![image](https://d17oy1vhnax1f7.cloudfront.net/items/3i2s0T0h2t0W1J3p2j0c/Image%202016-09-07%20at%203.04.24%20PM.png?v=654e288b)
  28. [x] Cancel/close share `web/cancel-share` ![image](https://d17oy1vhnax1f7.cloudfront.net/items/0Q1n3I1J3J3G3y2B0z19/Image%202016-09-07%20at%203.04.57%20PM.png?v=8de54ca8)
29. [x] Visit Page Shot link from footer `web/goto-pageshot/footer` ![image](https://d17oy1vhnax1f7.cloudfront.net/items/3g3p2i19131n1o3p053s/Image%202016-09-07%20at%203.05.56%20PM.png?v=8c92662c)
30. ~~Visit GitHub link from footer `web/goto-github/footer`~~
31. ~~Visit GitHub revision from footer `web/goto-github-revision/footer`~~
32. [x] Click Feedback/mailto button `start-feedback/footer` ![image](https://d17oy1vhnax1f7.cloudfront.net/items/3Q1R170u1m0A3r0o3v1K/Image%202016-09-07%20at%203.07.01%20PM.png?v=0117ce5f)
31. [x] Click on clip `web/goto-clip/content` ![image](https://d17oy1vhnax1f7.cloudfront.net/items/1f2t1D2t2F2N2e1S2m3D/Image%202016-09-07%20at%203.07.37%20PM.png?v=f3605b9e)
32. [x] Click the download button `web/download/navbar`

#### Shot Index (My Shots)

1. [x] Click a tile `web/goto-shot/myshots-tile` ![image](https://d17oy1vhnax1f7.cloudfront.net/items/023y0c2v473F3u1G051Z/Image%202016-09-07%20at%203.08.36%20PM.png?v=a4926505)
2. [x] Click on the original link `web/goto-original-url/myshots-tile` ![image](https://d17oy1vhnax1f7.cloudfront.net/items/261O223l0W0w2n1j3o3c/Image%202016-09-07%20at%203.09.15%20PM.png?v=add8b838)
3. [x] Enter search term and submit `web/search/submit` ![image](https://d17oy1vhnax1f7.cloudfront.net/items/1f2o092t413O0i363L3v/Image%202016-09-07%20at%203.10.06%20PM.png?v=fbcb53e5)
4. [x] Enter search term (at least 4 characters) and wait 1 second `web/search/timed`
4. [x] Clear search term `web/clear-search/submit` and click the arrow ![image](https://d17oy1vhnax1f7.cloudfront.net/items/382R0U3J0Q3K362g3E0q/Image%202016-09-07%20at%203.11.59%20PM.png?v=c006c85a)
4. [x] Clear search term `web/clear-search/keyboard` by simply backspacing
5. [x] Receive no search results `web/search-no-results` ![image](https://d17oy1vhnax1f7.cloudfront.net/items/091Z1a253a062B3R1X2c/Image%202016-09-07%20at%203.12.37%20PM.png?v=b556941e)
6. [x] Right-click (or get the context menu) anywhere on the page `contextmenu/background`, `contextmenu/shot-tile`, `contextmenu/search`, or `contextmenu/header` depending on where the user clicks.

#### Non-owner web visit

1. [x] Visit the page, `web/visit/non-owner` ![image](https://d17oy1vhnax1f7.cloudfront.net/items/252d0b0F1A3i453h2r32/Image%202016-09-07%20at%203.38.11%20PM.png?v=357dd63c)
2. [x] Visit an image directly, when the image isn't embedded directly in a Page Shot shot page, `web/visit/direct-view`
2. [x] Click flag button `web/start-flag/navbar` ![image](https://d17oy1vhnax1f7.cloudfront.net/items/3T3a1y0K2l0H2d1p1e0L/Image%202016-09-07%20at%203.38.36%20PM.png?v=ba92ba16)
3. [x] Click Share (same as for owner, but with `share-non-owner` instead of `share-owner`, and `start-share-non-owner`)
4. [x] Visit original URL `web/goto-original-url/navbar`
5. [x] Click Page Shot link in header `web/goto-pageshot/navbar` ![image](https://d17oy1vhnax1f7.cloudfront.net/items/0V2A0q2v3k2t3k1X0f2n/Image%202016-09-07%20at%203.39.13%20PM.png?v=cd656a45)
6. ~~Click My Shots link in header (if non-owner, but add-on user) `web/goto-myshots/navbar-non-owner`~~
7. ~~Switch to full page from clip view (already covered)~~
8. ~~Switch to clip view from full page (already covered)~~
9. [x] Click on clip (already covered)

#### Homepage web visits

1. ~~Click install from Firefox, `web/start-install/homepage-firefox`~~
2. ~~Click install from Chrome, `web/start-install/homepage-chrome`~~
3. ~~Visit from a supported browser, `web/homepage-visit/supported`~~
4. ~~Visit from an unsupported browser, `web/homepage-visit/unsupported`~~

#### General Google Analytics information

This is stuff we get from including ga.js on Page Shot pages.

1. Browser type
2. Location
3. Language
4. Referrals
5. Social referral
6. Search terms
7. Demographic guesses about users
8. See if some pages are "visited" particularly often (we don't have access to the actual page, but can identify that some specific page has a large number of visits)

### Database Metrics

We have a pretty rich database in Page Shot, and we can do all kinds of queries on the database.  These might include:

1. Look at cohorts of individuals, reviewing their shot creation patterns
2. How many people make a couple shots?  How many make a lot of shots?
3. See if people are making shots of mostly private or mostly public pages
4. Identify the dimensions of shots
5. Compare shot URLs to a domain whitelist, to determine broad categories of sites that are popular to view
