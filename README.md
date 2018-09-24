## [Firefox Screenshots](https://screenshots.firefox.com/)

[![CircleCI Build Status](https://circleci.com/gh/mozilla-services/screenshots.svg?style=shield)](https://circleci.com/gh/mozilla-services/screenshots)

[Screenshots server status page](https://status.services.mozilla.com/)

----

This is a screenshot tool for Firefox. It is available in Firefox 56 and later versions, as part of the default Firefox distribution.

The project was initially launched through [Test Pilot](https://testpilot.firefox.com/) as [Page Shot](https://testpilot.firefox.com/experiments/page-shot).

It is made up of both an add-on (using [WebExtensions](https://developer.mozilla.org/Add-ons/WebExtensions)) and a website using Node.js.  The add-on is in `addon/webextension/`, and the website is in `server/`

Ian has been blogging about the [design, definition, and development process](http://www.ianbicking.org/tag/product-journal.html).

(This project used to include general page freezing; this functionality has been forked off into [pagearchive](https://github.com/ianb/pagearchive).)

You can find more information about Firefox Screenshots at the Mozilla Wiki page: https://wiki.mozilla.org/Firefox/Screenshots

### Installation and Setup

Install [Nightly or Developer Edition](https://www.mozilla.org/en-US/firefox/channel/desktop/).

(Skip this step if you do not want to run a local server.) Install [Postgres](http://www.postgresql.org/).  And do _one_ of the following:
- Ensure the locale for your Postgres messages is US English ([Here's why](https://github.com/chilts/pg-patcher/blob/master/pg-patcher.js#L101))
- Run the [first migration](https://github.com/mozilla-services/screenshots/blob/master/server/db-patches/patch-0-1.sql) manually

Install [Node.js](https://nodejs.org/). Version 8.x is required.

Clone the [repository](https://github.com/mozilla-services/screenshots/).  Navigate to the project directory and run `npm install`.

There are two scripts to run the server locally and develop the add-on:

- `./bin/run-server` will run the server on `http://localhost:10080` and automatically restart if there are changes.
    - If nodemon crashes you can try to start the server with `./bin/run-server --restart`
    - Take a look at and/or source [`.env.dev`](https://github.com/mozilla-services/screenshots/blob/master/.env.dev) for some of the options available through environment variables.
- `./bin/run-addon` will build a few parts of the addon (into `addon/webextension/build/`) and start Firefox with the add-on installed.  The add-on will be refreshed automatically as you change files.  We recommend you open `about:debugging` to help debug the extension.
- `./bin/run-addon --setup-profile` will setup a Firefox profile for your development; this way you can make persistent changes to the profile that you will use just for Screenshots development. (note: this will only look for the `firefox` commmand or Nightly, Developer Edition, Aurora editions on OSX)

**If you want to develop the add-on but not the server** you can run `./bin/run-addon -s https://screenshots.dev.mozaws.net`

By default, Screenshots will connect to a Postgres database on localhost:5432. To change which database and user it connects to set/export the environmental variables: `RDS_USERNAME`, `RDS_PASSWORD`, and `RDS_HOSTNAME`

The server will automatically setup the tables in your database, and keep them up to date over time (using [pg-patcher](https://github.com/chilts/pg-patcher/)).

If you have growl and growlnotify installed on Mac OS X, you will get growl notifications when the server build has started and completed.

We apologize but we have no story for development on Windows (though the add-on runs on Windows).  [We welcome feedback](https://github.com/mozilla-services/screenshots/issues/4289).

### Linting and Testing

`npm run test` will run tests as well as eslint.  You can control the tests with the following shell/environment variables:
- `MOZ_HEADLESS` - when this variable is set, the Selenium tests will run in [headless mode](https://developer.mozilla.org/en-US/Firefox/Headless_mode).
- `SCREENSHOTS_BACKEND` - the server where the addon will try to save shots if the default http://localhost:10080 is not available or desirable.

For example, `MOZ_HEADLESS=1 SCREENSHOTS_BACKEND=https://screenshots.dev.mozaws.net npm run test` will run the tests headlessly against https://screenshots.dev.mozaws.net.

`npm run test:server` will run the server tests.  This require Python and the local server running on http://localhost:10080.

### Getting to know the code

There is documentation in [`addon/`](https://github.com/mozilla-services/screenshots/blob/master/addon/), [`addon/webextension/`](https://github.com/mozilla-services/screenshots/blob/master/addon/webextension/), [`addon/webextension/background/`](https://github.com/mozilla-services/screenshots/blob/master/addon/webextension/background/), and [`addon/webextension/selector/`](https://github.com/mozilla-services/screenshots/blob/master/addon/webextension/selector) that talks about the code layout and architecture of the add-on.

[`server/view-docs.md`](https://github.com/mozilla-services/screenshots/blob/master/server/views-docs.md) talks about how the server React pages are setup, along with the server-side rendering of pages.

There is also documentation in [`docs/`](https://github.com/mozilla-services/screenshots/blob/master/docs/).

### Participation

There is an IRC channel `#screenshots` on irc.mozilla.org (you can use [this link](https://kiwiirc.com/nextclient/irc.mozilla.org/pageshot) for chat access via the web if you do not otherwise use IRC).  There are [IRC logs available](http://logs.glob.uno/?c=pageshot).

Planning and ideation is happening in the [issue tracker](https://github.com/mozilla-services/screenshots/issues).  We have several [milestones](https://github.com/mozilla-services/screenshots/milestones):

* [Issues with no milestone](https://github.com/mozilla-services/screenshots/issues?q=is%3Aopen+is%3Aissue+no%3Amilestone) are awaiting triage
* [Issues in Stretch](https://github.com/mozilla-services/screenshots/milestone/9) are immediately actionable but just nice-to-haves, not blockers.
* [Issues in Blue Sky](https://github.com/mozilla-services/screenshots/milestone/3) are things we would like to do, but have no immediate plans to work on them.  (If you see something you care about there, comment on it -- otherwise we may not notice it)
* [Look in Milestones](https://github.com/mozilla-services/screenshots/milestones) for other shorter-lived milestones.

Issue tags otherwise aren't very structured. [Research](https://github.com/mozilla-services/screenshots/issues?q=is%3Aopen+is%3Aissue+label%3Aresearch) is primarily analysis of other products that do something interesting, or some source material that could provide insight.  Input on these (things like "I like this product because...") is very helpful!

We do some research on other projects, [collecting the results in this Google Drive folder](https://drive.google.com/drive/folders/0B8i2m8Kt5pnBaHlMNWtYdV8xNTg?usp=sharing).

### Localization

Firefox Screenshots localization is managed via [Pontoon](https://pontoon.mozilla.org/projects/firefox-screenshots/), not direct pull requests to the repository. If you want to fix a typo, add a new language, or simply know more about localization, please get in touch with the [existing localization team](https://pontoon.mozilla.org/teams/) for your language, or Mozilla’s [l10n-drivers](https://wiki.mozilla.org/L10n:Mozilla_Team#Mozilla_Corporation) for guidance.
