This document details the process we use to deploy Firefox Screenshots to our stage and production environments.

See also the [server release](./server-release.md) documentation.

## Softvision ##

Softvision is our embedded QA team. Their main functions are to write test plans and verify deployments.

## Test Stage ##

This will happen on Friday at the end of sprint after we've pushed to stage.

Create a deployment issue to track status and potential blockers. Give it a [needs:qa label](https://github.com/mozilla-services/screenshots/issues?utf8=✓&q=is%3Aissue%20is%3Aopen%20label%3A%22needs%3Aqa%22%20).

Send out an email notification to `testpilot-dev@mozilla.org` to please test the staging environment.

Include the issue link in the email notification.

Installation notes for stage are at: https://screenshots.stage.mozaws.net/homepage/install-test-local.html

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
