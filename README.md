## Page Shot

[![Build Status](https://travis-ci.org/mozilla-services/pageshot.svg)](https://travis-ci.org/mozilla-services/pageshot)
[![Available on Test Pilot](https://img.shields.io/badge/available_on-Test_Pilot-0996F8.svg)](https://testpilot.firefox.com/experiments/page-shot)

This is a prototype for a product to create better ways of sharing and saving content, starting with screenshots, with a planned second phase of full-page archiving.

The project will be launched through [Test Pilot](https://testpilot.firefox.com/) at [pageshot.net](https://pageshot.net).

It is made up of both an add-on (using the [Add-on SDK](https://developer.mozilla.org/en-US/Add-ons/SDK)) and a website using Node.js.  The add-on is in `addon/`, and the website is in `server/`

Ian has been blogging about the [design, definition, and development process](http://www.ianbicking.org/tag/product-journal.html).

### Installation and Setup

Install [Postgres](http://www.postgresql.org/).

Install [Node.js](https://nodejs.org/). Version 6.x is required.

Clone the [repository](https://github.com/mozilla-services/pageshot/).

There are two scripts to run the server locally and develop the add-on:

- `./bin/run-server` will run the server on localhost:10080 and automatically restart if there are changes
- `./bin/run-addon` will build the add-on, start Firefox with the add-on installed (you must have Nightly or Developer Edition)

By default, Page Shot will connect to a Postgres database on localhost:5432. To change which database and user it connects to set/export the environmental variables: `RDS_USERNAME`, `RDS_PASSWORD`, and `RDS_HOSTNAME`

The server will automatically setup the tables in your database, and keep them up to date over time (using [pg-patcher](https://github.com/chilts/pg-patcher/)).

If you have growl and growlnotify installed on Mac OS X, you will get growl notifications when the build has started and completed for the server and the add-on.

We apologize but we have no story for development on Windows (though the add-on runs on Windows).

#### Add-on auto-reloading

To make the auto-reloading of the add-on work, after you first start Firefox using `run-addon` you must manually install the [autoinstaller](https://addons.mozilla.org/firefox/addon/autoinstaller/) add-on into your development profile.  This will allow the script to push updates into the browser without browser restarts.

### Participation

There is an IRC channel `#pageshot` on irc.mozilla.org (you can use [this link](https://kiwiirc.com/client/irc.mozilla.org/pageshot) for chat access via the web if you do not otherwise use IRC).

Planning and ideation is happening in the [issue tracker](https://github.com/mozilla-services/pageshot/issues).  We use a pattern roughly like:

* [Issues with no milestone](https://github.com/mozilla-services/pageshot/issues?q=is%3Aopen+is%3Aissue+no%3Amilestone) are awaiting triage
* [Issues set to the next milestone](https://github.com/mozilla-services/pageshot/milestone/16) can be worked on any time (this link will rot!)
* [Issues in Stretch](https://github.com/mozilla-services/pageshot/milestone/9) are immediately actionable but just nice-to-haves, not blockers.
* [Issues in Next Tasks](https://github.com/mozilla-services/pageshot/milestone/2) are deferred for now, but will be re-triaged when the current milestone is done
* [Issues in Blue Sky](https://github.com/mozilla-services/pageshot/milestone/3) are mostly shelved; we'd like to do them but have no plans to move forward.  (If you see something you care about there, comment on it -- otherwise we may not notice it)

Issue tags otherwise aren't very structured. [Research](https://github.com/mozilla-services/pageshot/issues?q=is%3Aopen+is%3Aissue+label%3Aresearch) is primarily analysis of other products that do something interesting, or some source material that could provide insight.  Input on these (things like "I like this product because...") is very helpful!
