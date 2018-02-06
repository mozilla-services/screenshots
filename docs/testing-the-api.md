# Testing the API

Some notes on testing the REST API of the server.

Notable endpoints...

## deviceInfo

In several cases we use `deviceInfo`, which is an object that looks like:

```json
{
  "addonVersion": "0.1.201510222202",
  "platform": "darwin",
  "architecture": "x86_64",
  "version": "45.0a1",
  "build": "20151105030433",
  "appName": "Firefox",
  "platformVersion": "45.0a1",
  "appVendor": "Mozilla"
}
```

In most cases only `addonVersion` is actually required.

## Authentication

`POST /api/register`

Body parameters (form encoded), `deviceId`, `secret`, `nickname` (optional), `avatarurl` (optional)

Returns 401 if user already exists.  Returns 200 on success, and sets session authentication cookie.

`POST /api/login`

Body parameters (form encoded): `deviceId`, `secret`, `deviceInfo` (JSON string)

Returns 404 if no user by that id, 401 if the login failed, and returns 200 on success.

Like /api/register, it sets the session authentication cookie.

`POST /leave-screenshots/leave`

Authenticated.  Deletes entire account.  Uses session token to determine who to delete.

## Utilities

`GET /redirect?to={url}`

Not authenticated.  Causes a redirect to the given URL, with an interstitial page.  Takes optional `&from=` parameter that identifies the kind of page it came from (for metrics only).

`POST /events`

Authenticated, adds a Google Analytics event.  Takes URL encoded parameters: `event`, `action`, and `label`.

## Handling shots

`PUT /data/{random_id}/{domain}`

Authenticated.  Creates or updates a shot.  Takes a JSON body.  Looks like:

```json
{
  "deviceId": "anonf54641fa-ea19-3648-ba07-10c98d13726e",
  "url": "https://github.com/mozilla-services/screenshots/issues/1237",
  "docTitle": "Screenshots erases everything in my clipboard · Issue #1237 · mozilla-services/pageshot",
  "createdDate": 1468983767525,
  "favicon": "https://assets-cdn.github.com/favicon.ico",
  "images": [
    {
      "url": "https://cloud.githubusercontent.com/assets/557895/16748439/efdbf0a0-4778-11e6-9a33-d1043238addf.png",
      "dimensions": {
        "x": 582,
        "y": 383
      },
      "title": null,
      "alt": "my_shots"
    }
  ],
  "siteName": "GitHub",
  "documentSize": {
    "width": 1127,
    "height": 2086
  },
  "thumbnail": "data:...",
  "clips": {
    "cplocgk9m1nc": {
      "createdDate": 1468983771992,
      "sortOrder": 100,
      "image": {
        "url": "data:...",
        "captureType": "selection",
        "text": "Steps to reproduce:\nInstall Screenshots add-on.\nCopy some text into your clipboard.\n\"Shot\" a page and then try and paste your step 2 clipboard contents somewhere.\nActual results:\nYour clipboard contents from step 2 are erased by step 3.\nExpected results:",
        "location": {
          "top": 329,
          "left": 308,
          "bottom": 616,
          "right": 718,
          "topLeftElement": "#psid-456",
          "topLeftOffset": {
            "x": 169.5,
            "y": 2.8000030517578125,
            "height": 324.6500244140625,
            "width": 694
          },
          "bottomRightElement": "#psid-468",
          "bottomRightOffset": {
            "x": 564.5,
            "y": 22.149993896484375,
            "height": 42,
            "width": 664
          }
        },
        "dimensions": {
          "x": 410,
          "y": 287
        }
      }
    }
  }
}
```

Then you get a response back that converts the `data:...` URLs to other URLs, like:

```json
[
  {"updatedThumbnailUrl": "new url"},
  {"updateClipUrl":
    {
      "clipId": "cplocgk9m1nc",
      "url": "new url"
    }
  }
]
```

`GET /data/{random_id}/{domain}`

Not authenticated.  Gets the JSON back.

`POST /api/delete-shot`

Authenticated.  Takes only one parameter, `id` (the `"{random_id}/{domain}"`)

`POST /api/set-expiration`

Authenticated.  Takes URL encoded parameters, `id` and `expiration` (milliseconds)

`GET /images/{id}`

Not authenticated.  Gets a saved S3 image.  Typically the `PUT` request will return images that point here.

`GET /{random_id}/{domain}`

Not authenticated.  Gets the HTML page for a shot.

`GET /shots`

Authenticated.  Gets HTML for shot index.

`GET /shots?q={query}`

Authenticated.  Gets HTML for shot index, but with search results.

`GET /shots?q={query}&data=json`

Gets the JSON for the shot index.
