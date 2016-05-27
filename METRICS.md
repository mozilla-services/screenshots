## PageShot Metrics

A summary of the metrics PageShot will record, and what we're looking for in those metrics.

### Key Metrics

Key metrics of PageShot are fairly simple:

1. Do people continue to create shots?
2. Do people share those shots with other people?  In this case there is not a "right" answer, but sharing indicates a different kind of use case from personal storage.
3. Do people revisit their own shots?  (Note: I'm unsure if we can currently detect exactly this.  Probably we need [#1185](https://github.com/mozilla-services/pageshot/issues/1185), maybe more)
4. Do people who view a shot, install PageShot?  (Note: I'm unsure if we can record this, but Google Analytics would indicate the click path that would most likely lead to an installation.  We can also look at homepage referrals to identify some other paths by which people might encounter PageShot, **if** we have a linkable installation path.  But we don't have any general way to identify when someone invites another person.

Continuing to create shots indicates overall value to the user.  Sharing and revisiting confirm that the value is actually obtained (it's possible to fantasize that you *would* find value in a shot, while never actually realizing that value).  Lastly, evidence that people find PageShot attractive when they see a shot, or that people would refer each other to PageShot, indicates potential for organic growth.

We do not collect Net Promoter Score.

### Usage Metrics

This information is intended to help us make PageShot better.

We record an event stream of interaction with the add-on and website.  The events:

(**Note**: per [#1183](https://github.com/mozilla-services/pageshot/issues/1183) we need to figure out if we are actually collecting these events properly)

#### Add-on metrics

1. Click shot button
2. Make a selection
3. Click Save
4. Click Cancel
5. Click My Shots
6. Click shot button while PageShot is active
7. Hit Escape (Cancel)
8. Hit Enter (Save)
9. Drag out a selection
10. Click to make a selection
11. Click to cancel/clear a selection
12. Encounter an error saving the shot
13. Encounter any other kind of error
14. Install the add-on
15. Uninstall the add-on
16. Hit shot button on a page that can't be shot (XUL page)
17. Hit shot button on any about: page
18. Hit shot button on any other non-http page
19. Save a "private page" shot

#### Owner web visit

These are events that an add-on user can encounter on a shot they own

1. Click Save Full Page
2. Click delete
  3. Confirm delete
  4. Cancel delete
5. Click My Shots
6. Switch to full page from clip view
7. Switch to clip view from full page
8. Try to change expiration time
  9. Cancel changing expiration time
  10. Change expiration time
  11. Change expiration time to specific time
  12. Change expiration time to indefinite
13. View expired shot
14. Recover expired shot
15. View expired/deleted shot
16. Visit original page
17. Click share
  18. Click Facebook
  19. Click Twitter
  20. Click Pinterest
  21. Click mailto
  22. Hit copy
  23. Focus link field
24. Visit PageShot link from footer
25. Visit GitHub link from footer
26. Click on clip

#### Shot Index (My Shots)

1. Visit My Shots
2. Click a tile
3. Click on the original link
4. Enter search term
5. Clear search term
6. Receive no search results

#### Non-owner web visit

1. Click flag button
2. Click Share (same as for owner)
3. Visit original URL
4. Click PageShot link in header
5. Click My Shots link in header (if non-owner, but add-on user)
6. Switch to full page from clip view
7. Switch to clip view from full page
8. Click on clip
9. View the web page at all

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
