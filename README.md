## Page Shot

[![Build Status](https://travis-ci.org/mozilla-services/pageshot.svg)](https://travis-ci.org/mozilla-services/pageshot)
[![Available on Test Pilot](https://img.shields.io/badge/available_on-Test_Pilot-0996F8.svg)](https://testpilot.firefox.com/experiments/page-shot)

This is a prototype for a product to create better ways of sharing and saving content, starting with screenshots.  (This project used to include general page freezing; this functionality has been forked off into [pagearchive](https://github.com/ianb/pagearchive).)

The project has been launched through [Test Pilot](https://testpilot.firefox.com/) at [pageshot.net](https://pageshot.net).  We are looking to a general audience release in the future.

It is made up of both an add-on (using [WebExtensions](https://developer.mozilla.org/Add-ons/WebExtensions)) and a website using Node.js.  The add-on is in `addon/webextension/`, and the website is in `server/`

Ian has been blogging about the [design, definition, and development process](http://www.ianbicking.org/tag/product-journal.html).

You can find more information about Page Shot at the Mozilla Wiki page: https://wiki.mozilla.org/Firefox/Page_Shot

### Installation and Setup

Install [Postgres](http://www.postgresql.org/).

Install [Node.js](https://nodejs.org/). Version 6.x is required.

Clone the [repository](https://github.com/mozilla-services/pageshot/).

There are two scripts to run the server locally and develop the add-on:

- `./bin/run-server` will run the server on `http://localhost:10080` and automatically restart if there are changes.
- `./bin/run-addon` will build a few parts of the addon (into `addon/webextension/build/`) and start Firefox with the add-on installed.  The add-on will be refreshed automatically as you change files.  We recommend you open `about:debugging` to help debug the extension.
- `./bin/run-addon --setup-profile` will setup a Firefox profile for your development; this way you can make persistent changes to the profile that you will use just for Page Shot development.

**If you want to develop the add-on but not the server** you can run `./bin/run-addon -s https://pageshot.dev.mozaws.net`

By default, Page Shot will connect to a Postgres database on localhost:5432. To change which database and user it connects to set/export the environmental variables: `RDS_USERNAME`, `RDS_PASSWORD`, and `RDS_HOSTNAME`

The server will automatically setup the tables in your database, and keep them up to date over time (using [pg-patcher](https://github.com/chilts/pg-patcher/)).

If you have growl and growlnotify installed on Mac OS X, you will get growl notifications when the server build has started and completed.

We apologize but we have no story for development on Windows (though the add-on runs on Windows).  We welcome feedback.

### Participation

There is an IRC channel `#pageshot` on irc.mozilla.org (you can use [this link](https://kiwiirc.com/client/irc.mozilla.org/pageshot) for chat access via the web if you do not otherwise use IRC).  There are [IRC logs available](http://logs.glob.uno/?c=pageshot).

Planning and ideation is happening in the [issue tracker](https://github.com/mozilla-services/pageshot/issues).  We have several [milestones](https://github.com/mozilla-services/pageshot/milestones):

* [Issues with no milestone](https://github.com/mozilla-services/pageshot/issues?q=is%3Aopen+is%3Aissue+no%3Amilestone) are awaiting triage
* [Issues in Stretch](https://github.com/mozilla-services/pageshot/milestone/9) are immediately actionable but just nice-to-haves, not blockers.
* [Issues in Next Tasks](https://github.com/mozilla-services/pageshot/milestone/2) are deferred for now, but will be re-triaged when the current milestone is done
* [Issues in Blue Sky](https://github.com/mozilla-services/pageshot/milestone/3) are mostly shelved; we'd like to do them but have no plans to move forward.  (If you see something you care about there, comment on it -- otherwise we may not notice it)
* [Issues in 54](https://github.com/mozilla-services/pageshot/milestone/20) are things we want to do to ship to a general Firefox audience.
* Look for "Sprint 54.x" to see planned work for a sprint (2-week phase)

Issue tags otherwise aren't very structured. [Research](https://github.com/mozilla-services/pageshot/issues?q=is%3Aopen+is%3Aissue+label%3Aresearch) is primarily analysis of other products that do something interesting, or some source material that could provide insight.  Input on these (things like "I like this product because...") is very helpful!
