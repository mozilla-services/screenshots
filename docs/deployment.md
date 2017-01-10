
This document details the process we use to deploy Page Shot to our stage and production environments.

## Overview of schedule ##

(you can read more below)

- Thursday at 2pm pacific time the train is cut, all code is in. Style tweaks can be made after this point.
- Friday at 9am pacific time we tag and start pushing to stage, then send email out to the test pilot mailing list and post to discourse.
- Monday at regular stand-up we review anything that Softvision found and fix it.
- Tuesday at ~8am pacific time we push and Softvision verifies.

## Softvision ##

Softvision is our embedded QA team. Their main functions are to write test plans and verify deployments.

## Team Notification ##

During the checkin before the end of the [current milestone](https://github.com/mozilla-services/pageshot/milestones), we will inform the team that we will be building a release against `master`.

Note: we deploy the master branch to our *development environment*: [http://pageshot.dev.mozaws.net](https://pageshot.dev.mozaws.net)

## Generate Release Notes ##

Release notes are automatically extracted from git commits using `./bin/generate-commit-log --write stable..master` and then manually touched up.

Update the version number in both package.json and addon/package.json files.

## Tag Release ##

This will happen on Friday after any style tweaks land.

1. https://github.com/mozilla-services/pageshot/releases/new
2. Tag Version: x.0.0 where x = last_version + 1, and x.y.0 point releases for any changes that happen before the final deploy.
3. Release Title: x.y.0
4. Click `Publish`

## Push to Stage ##

Once the release is tagged, it will get pushed to stage.

1. `git push mozilla-services HEAD:stable`
2. `rm build/mozilla-pageshot.xpi`
3. `PAGESHOT_BACKEND=https://pageshot.stage.mozaws.net make xpi`
4. `bin/build-docker-image mozilla`

Notifications of successful deployment will appear on IRC.

## Deploy Dev ##

To make a dev deploy, run:

```sh
$ bin/build-docker-image USERNAME
```

with your Docker username.  At the end it will say `Complete.  Upload build/eb-app-latest.zip to http://amzn.to/1NuC3N9` – go to that URL, login if necessary, and upload the zip file through the Elastic Beanstalk interface.  This will upload the server to https://pageshot.dev.mozaws.net

## Test Stage ##

This will happen on Friday at the end of sprint after we've pushed to stage.

Create a deployment issue to track status and potential blockers. Give it a [needs:qa label](https://github.com/mozilla-services/pageshot/issues?utf8=✓&q=is%3Aissue%20is%3Aopen%20label%3A%22needs%3Aqa%22%20).

Send out an email notification to `testpilot-dev@mozilla.org` to please test the staging environment.

Include the issue link in the email notification.

## Report Issues & Status ##

Any issues should be reported in the deployment bug.

If no issues are found, Softvision will note in the bug.

**Page Shot team is still responsible for final approval for push to production.**

On the following Monday, during our checkin, Softvision will give us an update on status of stage.

## Deploy Production ##

Once we are comfortable that the site has been tested, file a bugzilla bug to deploy to prod. [Example](https://bugzilla.mozilla.org/show_bug.cgi?id=1312768)

Rebuild the XPI with:

1. `rm build/mozilla-pageshot.xpi`
2. `PAGESHOT_BACKEND=https://pageshot.net make xpi`

Send the XPI to Wil for deployment on the static site.

Notifications of successful deployment will appear on IRC.

We'll target Wednesday 8AM pacific time for deployment.

## Verify Production ##

Softvision will verify production for us, and report any bugs on Wednesday.

Once we have verified production, update the Page Shot GA account with an annotation including sprint information. Example: "1.0.1 release" Oct. 25th.

Close deployment issue, and give it a `qa:verified` label.
