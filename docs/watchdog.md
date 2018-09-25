# Screenshots-Watchdog Integration

## Watchdog

[Watchdog](https://github.com/mozilla/watchdog-proxy/) is a proxy service that send images to Microsoft's PhotoDNA service.  It is used by the Screenshots server.

The shot images are submitted to Watchdog on their initial uploads and on edit saves.

## Set It Up

In order to use Watchdog, Screenshots needs to obtain a user ID and a key from Watchdog.  The required configuration values are:

Config  | Environment Variable | Default Value | Notes
------- | -------------------- | ------------- | -----
Enabled | `ENABLE_WATCHDOG` | true | Even though the default is `true`, [`.env.dev`](https://github.com/mozilla-services/screenshots/blob/master/.env.dev) set it to `false`.
User ID | `WATCHDOG_ID` | | A user id from Watchdog.  It is used for authentication.
User Key | `WATCHDOG_KEY` | | The key for the above user id.
Hash Algorithm | `WATCHDOG_AUTH_HASH_ALGORITHM` | sha256 | Algorithm for HMACs in [Hawk](https://github.com/hueniverse/hawk) authentication
Submission URL | `WATCHDOG_SUBMISSION_URL` | | A full URL to the API endpoint where Watchdog is accepting requests from its consumers.  It should end with `/accept`.

**Important!** If Watchdog is enabled, but missing any required configuration values or receives an invalid URL for the submission URL, it will stop the Screenshots server from starting.

Other configuration values:

Config  | Environment Variable | Default Value | Notes
------- | -------------------- | ------------- | -----
Positive Email | WATCHDOG_POSITIVE_EMAIL | | An optional, semicolon delimited, list of email addresses to receive notifications of positive matches.
Submission Interval | WATCHDOG_SUBMISSION_INTERVAL | 1 | How often a shot image is sent to Watchdog.  E.g. 1 is every shot and 10 is every 10th shot.
Exclude Release Channel | WATCHDOG_EXCLUDE_RELEASE_CHANNEL | true | [Temporary.](https://github.com/mozilla-services/screenshots/issues/4920) When this is set to true, the Firefox major version number from the shot's useragent string is compared to scheduled release dates up to Firefox version 65.  If the major version of Firefox used is before its release date, then the shot is sent to Watchdog.
Logs Only | WATCHDOG_LOGS_ONLY | true | [Temporary.](https://github.com/mozilla-services/screenshots/issues/4936)  When this is true, Screenshots will only log the results; it will not mark a shot as positive or negative.
Dev Only Hostname | WATCHDOG_DEV_MATCH_HOSTNAME | | This is for test environments where Watchdog itself does not actually use PhotoDNA, but rather return a positive ~10% of the time.  If this is set, the shot is sent to Watchdog only when the shot source URL's hostname matches the configuration value.  E.g. if it's set to "www.w3schools.com", then only shots taken on www.w3schools.com will be submitted.

## Handling Callbacks

### Positive

Upon a positive match callback, a shot will
 - never expire
 - have the block type of `watchdog`

That means the shot will not be wiped by the deleted shot cleaning job and it will not be viewable.

### Negative

The negative result is recorded, which does not have any effects on the shot.

### PhotoDNA Error Response

The third possbility in a Watchdog callback is an upstream error at PhotoDNA.  This will be logged and the result is not marked positive or negative.  There are mutliple potential causes for such an error, originating from Screenshots or Watchdog.  ([See `Status` in the response table](https://developer.microsoftmoderator.com/docs/services/57c7426e2703740ec4c9f4c3/operations/57c7426f27037407c8cc69e6) the list of errors from PhotoDNA.)

## Technical Details and Notes

### Code

All of the logic resides in `server/src/watchdog.js`.  It's called from `server/src/server.js` in a couple places.  The route for the callback endpoint is also in `server/src/server.js`.

### Database

For every request sent to Watchdog, a record is inserted into `watchdog_submissions`.  The record(s) for a shot is deleted when the shot is removed during the deleted shot cleaning job.

### Validating Callbacks

When Screenshots sends a request to Watchdog, it includes a nonce in the callback urls.  This nonce is then used to validate the callback request from Watchdog.

### Multi-Concurrent-Submissions

Given the rate limited, queueing nature of Watchdog, it is possible to have multiple submissions in-flight for a given edited shot.  A request is sent to Watchdog on every image save in the shot editor.  However, since Watchdog does not offer a way to cancel a submission, Screenshots cannot stop the processing of submissions for the original shot or previous edits.

In the event of _different_ results are returned for the same shot, the positive result takes "precedence", as a negative result is essentially a no-op on the shot.  Note that Watchdog itself keeps copies of the images, so even if the latest result for a shot is negative, the image for a previous positive match can be found in Watchdog.

### Shot ID

In addition to the image and other required fields, the shot ID is included in the "notes" field of the request to Watchdog.  It is to help Watchdog administrators to trace back a shot in Screenshots.
