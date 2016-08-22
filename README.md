## Pageshot

[![Build Status](https://travis-ci.org/mozilla-services/pageshot.svg)](https://travis-ci.org/mozilla-services/pageshot)

This is a prototype for a product to create better sharable assets. It uses techniques like copying/freezing the DOM, optionally showing history, allowing inline comments, taking clips and screenshots.

You can view the site (with a link to install the Add-on) at [pageshot.dev.mozaws.net](https://pageshot.dev.mozaws.net/)

It is implemented as a Firefox Add-on, using the [Add-on SDK](https://developer.mozilla.org/en-US/Add-ons/SDK) and a website using Node.js.  The add-on is in `addon/`, and the website is in `server/`

Ian has been blogging about the [design, definition, and development process](http://www.ianbicking.org/tag/product-journal.html).

### Installation and Setup

Install [Postgres](http://www.postgresql.org/).

Install [Node.js](https://nodejs.org/). Version 0.12 is required.

Clone the [repository](https://github.com/mozilla-services/pageshot/).

There are two scripts to run the server locally and develop the add-on:

- `./bin/run-server` will run the server on localhost:10080 and automatically restart if there are changes
- `./bin/run-addon` will build the add-on, start Firefox with the add-on installed (you must have Nightly or Developer Edition)
- `./bin/run-chrome-builder` will build the Chrome version of the add-on in `build/chrome-extension/`, and watch for changes and rebuild as necessary

By default, PageShot will connect to a postgres database on localhost:5432. To change which database and user it connects to set/export the environmental variables: `RDS_USERNAME`, `RDS_PASSWORD`, and `RDS_HOSTNAME`

The server will automatically setup the tables in your database, and keep them up to date over time (using [pg-patcher](https://github.com/chilts/pg-patcher/)).

If you have growl and growlnotify installed on Mac OS X, you will get growl notifications when the build has started and completed for the server and the add-on.

We apologize but we have no story for development on Windows.

#### Add-on auto-reloading

To make the auto-reloading of the add-on work, after you first start Firefox using `run-addon` you must manually install the [autoinstaller](https://addons.mozilla.org/firefox/addon/autoinstaller/) add-on into your development profile.  This will allow the script to push updates into the browser without browser restarts.

### Participation

There is an IRC channel `#pageshot` on irc.mozilla.org.

We hold daily standups each Monday and Wednesday at 1:30pm Eastern, 12:30pm Central, 10:30 Pacific.  Meetings typically last 20 minutes, and we just discuss whatever we're working on.  Feel free to stop by and say hi.  Follow [this link](https://v.mozilla.com/flex.html?roomdirect.html&key=HKjEDYoY2zMqhoZ8by7z3UTLKA) to join the meeting (you'll have to install the Vidyo  video conferencing software, sorry).  Please don't join with your video turned off, it's a conversational meeting and we like to know who is part of the conversation.  If someone is out for some reason we may cancel this meeting, check in on IRC if you are unsure.

Planning and ideation is happening in the [issue tracker](https://github.com/ianb/pageshot/issues).  We use a pattern roughly like:

* [Issues with no milestone](https://github.com/ianb/pageshot/issues?q=is%3Aopen+is%3Aissue+no%3Amilestone) are awaiting triage
* [Issues set to the next milestone](https://github.com/mozilla-services/pageshot/milestones/First%20Launch) can be worked on any time (this link will rot!)
* [Issues in Next Tasks](https://github.com/ianb/pageshot/issues?q=is%3Aopen+is%3Aissue+milestone%3A%22Next+Tasks%22) will be re-triaged when the current milestone is done
* [Issues in Blue Sky](https://github.com/ianb/pageshot/issues?q=is%3Aopen+is%3Aissue+milestone%3A%22Blue+Sky%22) are mostly shelved; we'd like to do them but have no plans to move forward.  (If you see something you care about there, comment on it -- otherwise we may not notice it)
* [Issues with the needs-discussion label](https://github.com/ianb/pageshot/issues?q=is%3Aopen+is%3Aissue+label%3A%22needs+discussion%22) are for discussion at the next meeting.  We don't have a plan for open meetings (not that we don't want them, we just don't have a plan), so this is largely for internal use.

Issue tags otherwise aren't very structured. [Research](https://github.com/ianb/pageshot/issues?q=is%3Aopen+is%3Aissue+label%3Aresearch) is primarily analysis of other products that do something interesting, or some source material that could provide insight.  Input on these (things like "I like this product because...") is very helpful!

Also Ian [blogs regularly about PageShot](http://www.ianbicking.org/tag/product-journal.html).
