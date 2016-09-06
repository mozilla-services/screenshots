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

(Work listed in [#1197](https://github.com/mozilla-services/pageshot/issues/1197))

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

1. [x] Click shot button `addon/start-shot/toolbar-pageshot-button`
2. [x] Use keyboard shortcut to start shot `addon/start-shot/keyboard-shortcut`
3. [x] Click "select region" `addon/start-region-select/mode-click`
4. [x] Click "select archive" `addon/start-archive/mode-click`
5. [x] Click "cancel" from first interface `addon/cancel-shot/mode-click`
2. [x] Make a selection `addon/make-selection/selection-drag`
3. [x] Make a selection by clicking on an element `addon/make-selection/selection-click`
4. [x] Click but fail to find an element that can be selected `addon/no-selection/no-element-found`
3. [x] Cancel a selection by clicking on the background `addon/cancel-selection/selection-background-mousedown`
4. [x] Start resizing the selection `addon/start-resize-selection/handle`
5. [x] Finish resizing the selection `addon/resize-selection/mouseup`
6. [x] Finish resizing, without a change `addon/keep-resize-selection/mouseup`
3. [x] Click Save `addon/save-shot/topbar-save`
4. [x] Click Cancel `addon/cancel-shot/topbar-cancel`
5. [x] Cancel because URL changed `addon/cancel-shot/url-changed`
5. ~~Click My Shots `addon/goto-myshots/topbar-myshots`~~
6. [x] Click My Shots from mode selection `addon/goto-myshots/mode-click`
6. [x] Click shot button while Page Shot is active `addon/aborted-start-shot/toolbar-pageshot-button`
7. [x] Hit Escape (Cancel) `addon/cancel-shot/keyboard-escape`
8. [x] Hit Enter (Save) `addon/save-shot/keyboard-enter`
9. ~~Drag out a selection `addon/drag-selection/selection`~~
10. [x] Click to make a selection `addon/make-selection/selection-click`
11. [x] Click to cancel/clear a selection `addon/cancel-selection/selection-click`
12. [ ] Encounter an error saving the shot `addon/error/save-shot`
13. [ ] Encounter any other kind of error `addon/error/misc`
14. [x] Install the add-on `addon/install`
15. [x] Uninstall the add-on `addon/uninstall`
16. [x] Hit shot button on a page that can't be shot (XUL page) `addon/abort-start-shot/xul-page`
17. [x] Hit shot button on any about: page `addon/start-shot-about-page`
18. [x] Hit shot button on any other non-http page `addon/start-shot-non-http`
19. [ ] Save a "private page" shot `addon/start-shot-private-page`
20. [x] Test pilot was present at install time `addon/test-pilot-installed`
21. [x] Test pilot was not present at install time `addon/test-pilot-not-installed`

#### Owner web visit

These are events that an add-on user can encounter on a shot they own

1. [x] Visit the page, `web/visit/owner`
2. [x] Visit the page immediately after it is created (as part of the normal flow), `web/visit/owner-first`
3. ~~Click Save Full Page `web/save-full-page/navbar-save-full-page`~~
4. [x] Click delete `web/start-delete/navbar`
  5. [x] Confirm delete `web/delete/popup-confirm`
  6. [x] Cancel delete `web/cancel-delete/popup-confirm`
7. [x] Click My Shots `web/goto-myshots/navbar`
8. ~~Switch to full page from clip view, by clicking anywhere on background `web/full-page-view/content`~~
9. ~~Switch to full page from clip view, by clicking `>-<` button `web/full-page-view/content-unzoom`~~
10. ~~Switch to clip view from full page `web/clip-view/content-zoom`~~
11. [x] Try to change expiration time `web/start-expiration-change/navbar`
  12. [x] Cancel changing expiration time `web/cancel-expiration-change/navbar`
  13. [x] Change expiration time `web/set-expiration/navbar`
  14. [x] Change expiration time to specific time `web/set-expiration-to-time/navbar`
  15. [x] Change expiration time to indefinite `web/set-expiration-to-indefinite/navbar`
16. [x] View expired shot `web/view-expired/owner`
17. [x] View expired shot (not the owner) `web/view-expired/non-owner`
17. [x] Recover expired shot `web/recover-expired`
18. ~~View expired/deleted shot `web/view-deleted-expired`~~
19. [x] Visit original page `web/view-original/navbar`
20. [x] Visit original page from expired view `web/view-original/expired`
21. [x] Click share `web/start-share`
  22. [x] Click Facebook `web/share/facebook`
  23. [x] Click Twitter `web/share/twitter`
  24. [x] Click Pinterest `web/share/pinterest`
  25. [x] Click mailto `web/share/mailto`
  26. [x] Hit copy `web/share/copy`
  27. [x] Focus link field `web/share/focus-url`
  28. [x] Cancel/close share `web/cancel-share`
29. [x] Visit Page Shot link from footer `web/goto-pageshot/footer`
30. [x] Visit GitHub link from footer `web/goto-github/footer`
31. [x] Visit GitHub revision from footer `web/goto-github-revision/footer`
32. [x] Click Feedback/mailto button `start-feedback/footer`
31. [x] Click on clip `web/goto-clip/content`

#### Shot Index (My Shots)

1. [x] Click a tile `web/goto-shot/myshots-tile`
2. [x] Click on the original link `web/goto-original-url/myshots-tile`
3. [x] Enter search term `web/search`
4. [x] Clear search term `web/clear-search`
5. [x] Receive no search results `web/search-no-results`

#### Non-owner web visit

1. [x] Visit the page, `web/visit/non-owner`
2. [x] Click flag button `web/start-flag/navbar`
3. [x] Click Share (same as for owner)
4. [x] Visit original URL `web/goto-original-url/navbar`
5. [x] Click Page Shot link in header `web/goto-pageshot/navbar`
6. ~~Click My Shots link in header (if non-owner, but add-on user) `web/goto-myshots/navbar-non-owner`~~
7. ~~Switch to full page from clip view (already covered)~~
8. ~~Switch to clip view from full page (already covered)~~
9. [x] Click on clip (already covered)

#### Homepage web visits

1. Click install from Firefox, `web/start-install/homepage-firefox`
2. Click install from Chrome, `web/start-install/homepage-chrome`
3. Visit from a supported browser, `web/homepage-visit/supported`
4. Visit from an unsupported browser, `web/homepage-visit/unsupported`

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
