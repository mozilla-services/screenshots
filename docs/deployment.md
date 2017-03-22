This document details the process we use to deploy Firefox Screenshots to our stage and production environments.

## Overview of schedule ##

(you can read more below)

- Thursday at 2pm pacific time the train is cut, all code is in. Style tweaks can be made after this point.
- Friday at 9am pacific time we tag and start pushing to stage, then send email out to the test pilot mailing list and post to discourse.
- Monday at regular stand-up we review anything that Softvision found and fix it.
- Tuesday at ~8am pacific time we push and Softvision verifies.

## Softvision ##

Softvision is our embedded QA team. Their main functions are to write test plans and verify deployments.

## Team Notification ##

During the checkin before the end of the [current milestone](https://github.com/mozilla-services/screenshots/milestones), we will inform the team that we will be building a release against `master`.

Note: we deploy the master branch to our *development environment*: [http://pageshot.dev.mozaws.net](https://pageshot.dev.mozaws.net)

## Generate Release Notes ##

Release notes are automatically extracted from git commits using `./bin/generate-commit-log --write stable..master` and then manually touched up.

Use `bin/commit-new-version x.y.0` to set versions in package.json, tag the release, and merge to stable.

## Create GitHub Release ##

This will happen on Friday after any style tweaks land.

1. https://github.com/mozilla-services/screenshots/releases/new
3. Release Title: x.y.0
4. Click `Publish`

## Push to Dev ##

To update https://pageshot.dev.mozaws.net use:

```sh
$ ./bin/release-version dev
```

Note you must set `$DOCKER_USERNAME`.  After it completes, follow the instructions to upload to Amazon.

You can install the dev version of the add-on from https://pageshot.dev.mozaws.net/homepage/install-test-local.html

## Push to Stage ##

To update https://pageshot.stage.mozaws.net use:

```sh
$ ./bin/release-version stage
```

After it completes the stage deployment will automatically be triggered.  See the `#screenshots` IRC channel for status updates.

You can install the stage version of the add-on from https://pageshot.stage.mozaws.net/homepage/install-test-local.html

## Test Stage ##

This will happen on Friday at the end of sprint after we've pushed to stage.

Create a deployment issue to track status and potential blockers. Give it a [needs:qa label](https://github.com/mozilla-services/screenshots/issues?utf8=✓&q=is%3Aissue%20is%3Aopen%20label%3A%22needs%3Aqa%22%20).

Send out an email notification to `testpilot-dev@mozilla.org` to please test the staging environment.

Include the issue link in the email notification.

## Report Issues & Status ##

Any issues should be reported in the deployment bug.

If no issues are found, Softvision will note in the bug.

**The Screenshots team is still responsible for final approval for push to production.**

On the following Monday, during our checkin, Softvision will give us an update on status of stage.

## Deploy Production ##

Once we are comfortable that the site has been tested, file a bugzilla bug to deploy to prod. [Example](https://bugzilla.mozilla.org/show_bug.cgi?id=1312768)

Rebuild the XPI with:

```
SCREENSHOTS_BACKEND=https://pageshot.net make signed_xpi
```

Send the XPI to Wil for deployment on the static site.

Notifications of successful deployment will appear on IRC.

We'll target Wednesday 8AM pacific time for deployment.

## Verify Production ##

Softvision will verify production for us, and report any bugs on Wednesday.

Once we have verified production, update the Screenshots GA account with an annotation including sprint information. Example: "1.0.1 release" Oct. 25th.

Close deployment issue, and give it a `qa:verified` label.

## Database migrations

The database schema version is contained in a table in the database.  You can fetch it via:

```sql
SELECT value FROM property WHERE key = 'patch';
```

The desired version is in `server/src/dbschema.js` in the `MAX_DB_LEVEL` variable.

The application server can manage upgrades of the database.  It can also handle downgrades, but only if it knows about how to downgrade the version.  Only the newest version of the application is likely to know how to downgrade to the intended version.

### Rollback

Rollback requires deploying the *newest* version of the application and setting an environmental variable to request it to downgrade.

For instance, if you want to install version 1.0.1, you'd look in [dbschema](https://github.com/mozilla-services/screenshots/blob/1.0.1/server/src/dbschema.js#L7) and see `const MAX_DB_LEVEL = 10;` – but let's say the current database version is 12.  If you look in [server/db-patches](https://github.com/mozilla-services/screenshots/tree/1.0.1/server/db-patches) for version 1.0.1 there's no patch files to make that change.  There *are* [necessary patches in master](https://github.com/mozilla-services/screenshots/tree/master/server/db-patches).

Therefore to deploy an old version *first* you must deploy a recent version and ask it to downgrade the database.  Downgrading can be requested through an environmental variable:

`FORCE_DB_VERSION=10`

This will cause the application to start up, downgrade the database, and immediately exit with a zero exit code.  After that has succeeded then you can install the old version (e.g., 1.0.1 in our example).
