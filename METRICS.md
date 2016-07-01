## PageShot Metrics

A summary of the metrics PageShot will record, and what we're looking for in those metrics.

### Key Metrics

Key metrics of PageShot are fairly simple:

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

#### Do people who view a shot, install PageShot?

We will be tracking some events under `goto-pageshot` that would lead people from shot pages to a place where they could load the page.  Then we track clicking the install link itself, which GA reporting should be able to connect to the original `goto-pageshot` event.  We can't detect how often that install click leads to an actual install.

#### Summary

Continuing to create shots indicates overall value to the user.  Sharing and revisiting confirm that the value is actually obtained (it's possible to fantasize that you *would* find value in a shot, while never actually realizing that value).  Lastly, evidence that people find PageShot attractive when they see a shot, or that people would refer each other to PageShot, indicates potential for organic growth.

We do not collect Net Promoter Score.

### Usage Metrics

This information is intended to help us make PageShot better.

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

1. Click shot button `addon/start-shot/toolbar-pageshot-button`
2. Make a selection `addon/make-selection/selection`
3. Click Save `addon/save-shot/topbar-save`
4. Click Cancel `addon/cancel-shot/topbar-cancel`
5. Click My Shots `addon/goto-myshots/topbar-myshots`
6. Click shot button while PageShot is active `addon/cancel-shot/toolbar-pageshot-button`
7. Hit Escape (Cancel) `addon/cancel-shot/keyboard-escape`
8. Hit Enter (Save) `addon/save-shot/keyboard-enter`
9. Drag out a selection `addon/drag-selection/selection`
10. Click to make a selection `addon/make-selection/selection-click`
11. Click to cancel/clear a selection `addon/cancel-selection/selection-click`
12. Encounter an error saving the shot `addon/error/save-shot`
13. Encounter any other kind of error `addon/error/misc`
14. Install the add-on `addon/install`
15. Uninstall the add-on `addon/uninstall`
16. Hit shot button on a page that can't be shot (XUL page) `addon/error/xul-page`
17. Hit shot button on any about: page `addon/start-shot-about-page`
18. Hit shot button on any other non-http page `addon/start-shot-non-http`
19. Save a "private page" shot `addon/start-shot-private-page`

#### Owner web visit

These are events that an add-on user can encounter on a shot they own

1. Visit the page, `web/visit/owner`
2. Visit the page immediately after it is created (as part of the normal flow), `web/visit/owner-first`
3. Click Save Full Page `web/save-full-page/navbar-save-full-page`
4. Click delete `web/start-delete/navbar`
  5. Confirm delete `web/delete/popup-confirm`
  6. Cancel delete `web/cancel-delete/popup-confirm`
7. Click My Shots `web/goto-myshots/navbar`
8. Switch to full page from clip view, by clicking anywhere on background `web/full-page-view/content`
9. Switch to full page from clip view, by clicking `>-<` button `web/full-page-view/content-unzoom`
10. Switch to clip view from full page `web/clip-view/content-zoom`
11. Try to change expiration time `web/start-expiration-change/navbar`
  12. Cancel changing expiration time `web/cancel-expiration-change/navbar`
  13. Change expiration time `web/set-expiration/navbar`
  14. Change expiration time to specific time `web/set-expiration-to-time/navbar`
  15. Change expiration time to indefinite `web/set-expiration-to-indefinite/navbar`
16. View expired shot `web/view-expired`
17. Recover expired shot `web/recover-expired`
18. View expired/deleted shot `web/view-deleted-expired`
19. Visit original page `web/view-original/navbar`
20. Visit original page from expired view `web/view-original/expired`
21. Click share `web/start-share`
  22. Click Facebook `web/share/facebook`
  23. Click Twitter `web/share/twitter`
  24. Click Pinterest `web/share/pinterest`
  25. Click mailto `web/share/mailto`
  26. Hit copy `web/share/copy`
  27. Focus link field `web/share/focus-url`
  28. Cancel/close share `web/cancel-share/content`
29. Visit PageShot link from footer `web/goto-pageshot/footer`
30. Visit GitHub link from footer `web/goto-github/footer`
31. Click on clip `web/goto-clip/content`

#### Shot Index (My Shots)

1. Click a tile `web/goto-shot/myshots-tile`
2. Click on the original link `web/goto-original-url/myshots-tile`
3. Enter search term `web/search`
4. Clear search term `web/clear-search`
5. Receive no search results `web/search-no-results`

#### Non-owner web visit

1. Visit the page, `web/visit/non-owner`
2. Click flag button `web/start-flag/navbar`
3. Click Share (same as for owner)
4. Visit original URL `web/goto-original-url/navbar`
5. Click PageShot link in header `web/goto-pageshot/navbar`
6. Click My Shots link in header (if non-owner, but add-on user) `web/goto-myshots/navbar-non-owner`
7. Switch to full page from clip view (already covered)
8. Switch to clip view from full page (already covered)
9. Click on clip (already covered)

#### Homepage web visits

1. Click install from Firefox, `web/start-install/homepage-firefox`
2. Click install from Chrome, `web/start-install/homepage-chrome`
3. Visit from a supported browser, `web/homepage-visit/supported`
4. Visit from an unsupported browser, `web/homepage-visit/unsupported`

#### General Google Analytics information

This is stuff we get from including ga.js on PageShot pages.

1. Browser type
2. Location
3. Language
4. Referrals
5. Social referral
6. Search terms
7. Demographic guesses about users
8. See if some pages are "visited" particularly often (we don't have access to the actual page, but can identify that some specific page has a large number of visits)

### Database Metrics

We have a pretty rich database in PageShot, and we can do all kinds of queries on the database.  These might include:

1. Look at cohorts of individuals, reviewing their shot creation patterns
2. How many people make a couple shots?  How many make a lot of shots?
3. See if people are making shots of mostly private or mostly public pages
4. Identify the dimensions of shots
5. Compare shot URLs to a domain whitelist, to determine broad categories of sites that are popular to view
