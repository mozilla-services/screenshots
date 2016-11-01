
This document details the process we use to deploy Page Shot to our stage and production environments.

## Overview of schedule ##

(you can read more below)

- Thursday at 12pm PST the train is cut, all code is in. Style tweaks can be made after this point.
- Friday at 9am PST we tag and start pushing to stage, then send email out.
- Monday at regular stand-up we review anything that Softvision found and fix it.
- Wednesday at ~8am PST we push and Softvision verifies.

## Softvision ##

Softvision is our embedded QA team. Their main functions are to write test plans and verify deployments.

## Team Notification ##

During the checkin before the end of the [current milestone](https://github.com/mozilla-services/pageshot/milestones), we will inform the team that we will be building a release against `master`.

Note: we auto deploy the master branch to our *development environment*: [http://testpilot.dev.mozaws.net](https://pageshot.dev.mozaws.net)

## Tag Release ##

This will happen on Friday after any style tweaks land.

1. https://github.com/mozilla-services/pageshot/releases/new
2. Tag Version: YYYY-MM-DD (append -N if more than one release is tagged on a given day: 2016-04-08-1)
3. Release Title: YYYY-MM-DD
4. Click `Publish`

Release notes are automatically extracted from git commits.

## Push to Stage ##

This will happen on Friday at the end of sprint.

1. (FIXME put instructions for checking out the tag here)
2. `git push mozilla-services HEAD:stable`
2. `bin/build-docker-image mozilla`

Notifications of successful deployment will appear on IRC.

## Test Stage ##

This will happen on Friday at the end of sprint after we've pushed to stage.

Create a deployment issue to track status and potential blockers. Give it a `needs:qa` label.

Send out an email notification to `testpilot-dev@mozilla.com` to please test the staging environment.

Include Softvision and the issue link in the email notification.

## Report Issues & Status ##

Any issues should be reported in the deployment bug.

If no issues are found, Softvision will note in the bug.

**Page Shot team is still responsible for final approval for push to production.**

On the following Monday, during our checkin, Softvision will give us an update on status of stage.

## Deploy Production ##

Once we are comfortable that the site has been tested, file a bugzilla bug to deploy to prod. [Example](https://bugzilla.mozilla.org/show_bug.cgi?id=1312768)

Notifications of successful deployment will appear on IRC.

We'll target Wednesday 8AM PST for deployment.

## Verify Production ##

Softvision will verify production for us, and report any bugs on Wednesday.

Once we have verified production, update the Page Shot GA account with an annotation including sprint information. Example: "1.0.1 release" Oct. 25th.

Close deployment issue, and give it a `qa:verified` label.

## Producing a Static Build ##

From a fresh check-out, producing a static build can be done like so:

```
git clone https://github.com/mozilla-services/pageshot.git
cd pageshot
npm install
make all
```

After all the above commands, you should have a build in the `build` directory.
