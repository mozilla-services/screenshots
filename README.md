## Firefox Screenshots

[![CircleCI Build Status](https://circleci.com/gh/mozilla-services/screenshots.svg?style=shield)](https://circleci.com/gh/mozilla-services/screenshots)
[![Available on Test Pilot](https://img.shields.io/badge/available_on-Test_Pilot-0996F8.svg)](https://testpilot.firefox.com/experiments/page-shot)

This is a prototype for a product to create better ways of sharing and saving content, starting with screenshots.  (This project used to include general page freezing; this functionality has been forked off into [pagearchive](https://github.com/ianb/pagearchive).)

The project has been launched through [Test Pilot](https://testpilot.firefox.com/) at [pageshot.net](https://pageshot.net).  We are looking to a general audience release in the future.

It is made up of both an add-on (using [WebExtensions](https://developer.mozilla.org/Add-ons/WebExtensions)) and a website using Node.js.  The add-on is in `addon/webextension/`, and the website is in `server/`

Ian has been blogging about the [design, definition, and development process](http://www.ianbicking.org/tag/product-journal.html).

You can find more information about Firefox Screenshots at the Mozilla Wiki page: https://wiki.mozilla.org/Firefox/Screenshots

### Installation and Setup

Install [Postgres](http://www.postgresql.org/).

Install [Node.js](https://nodejs.org/). Version 6.x is required.

Clone the [repository](https://github.com/mozilla-services/screenshots/).

There are two scripts to run the server locally and develop the add-on:

- `./bin/run-server` will run the server on `http://localhost:10080` and automatically restart if there are changes.
- `./bin/run-addon` will build a few parts of the addon (into `addon/webextension/build/`) and start Firefox with the add-on installed.  The add-on will be refreshed automatically as you change files.  We recommend you open `about:debugging` to help debug the extension.
- - `./bin/run-addon --bootstrap` will run the add-on using the [bootstrap](https://github.com/mozilla-services/screenshots/blob/master/addon/bootstrap.js) wrapper.  This is how the add-on is run in Firefox, and provides some additional services, like Telemetry and migration.  This does not support reloading, so if you aren't developing things involving the wrapper then you can run without `--bootstrap`.
- `./bin/run-addon --setup-profile` will setup a Firefox profile for your development; this way you can make persistent changes to the profile that you will use just for Screenshots development. (note: this will only look for the `firefox` commmand or Nightly, Developer Edition, Aurora editions on OSX)

**If you want to develop the add-on but not the server** you can run `./bin/run-addon -s https://screenshots.dev.mozaws.net`

By default, Screenshots will connect to a Postgres database on localhost:5432. To change which database and user it connects to set/export the environmental variables: `RDS_USERNAME`, `RDS_PASSWORD`, and `RDS_HOSTNAME`

The server will automatically setup the tables in your database, and keep them up to date over time (using [pg-patcher](https://github.com/chilts/pg-patcher/)).

If you have growl and growlnotify installed on Mac OS X, you will get growl notifications when the server build has started and completed.

We apologize but we have no story for development on Windows (though the add-on runs on Windows).  We welcome feedback.

### Getting to know the code

There is documentation in [addon/](https://github.com/mozilla-services/screenshots/blob/master/addon/), [addon/webextension/](https://github.com/mozilla-services/screenshots/blob/master/addon/webextension/), [addon/webextension/background/](https://github.com/mozilla-services/screenshots/blob/master/addon/webextension/background/), and [addon/webextension/selector/](https://github.com/mozilla-services/screenshots/blob/master/addon/webextension/selector) that talks about the code layout and architecture of the add-on.

[server/view-docs.md](https://github.com/mozilla-services/screenshots/blob/master/server/views-docs.md) talks about how the server React pages are setup, along with the server-side rendering of pages.

There is also documentation in [docs/](https://github.com/mozilla-services/screenshots/blob/master/docs/).

### Participation

There is an IRC channel `#screenshots` on irc.mozilla.org (you can use [this link](https://kiwiirc.com/client/irc.mozilla.org/pageshot) for chat access via the web if you do not otherwise use IRC).  There are [IRC logs available](http://logs.glob.uno/?c=pageshot).

Planning and ideation is happening in the [issue tracker](https://github.com/mozilla-services/screenshots/issues).  We have several [milestones](https://github.com/mozilla-services/screenshots/milestones):

* [Issues with no milestone](https://github.com/mozilla-services/screenshots/issues?q=is%3Aopen+is%3Aissue+no%3Amilestone) are awaiting triage
* [Issues in Stretch](https://github.com/mozilla-services/screenshots/milestone/9) are immediately actionable but just nice-to-haves, not blockers.
* [Issues in Blue Sky](https://github.com/mozilla-services/screenshots/milestone/3) are things we would like to do, but have no immediate plans to work on them.  (If you see something you care about there, comment on it -- otherwise we may not notice it)
* [Look in Milestones](https://github.com/mozilla-services/screenshots/milestones) for other shorter-lived milestones.

Issue tags otherwise aren't very structured. [Research](https://github.com/mozilla-services/screenshots/issues?q=is%3Aopen+is%3Aissue+label%3Aresearch) is primarily analysis of other products that do something interesting, or some source material that could provide insight.  Input on these (things like "I like this product because...") is very helpful!

We do some research on other projects, [collecting the results in this Google Drive folder](https://drive.google.com/drive/folders/0B8i2m8Kt5pnBaHlMNWtYdV8xNTg?usp=sharing).
