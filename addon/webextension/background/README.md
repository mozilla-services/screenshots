These are all the files/modules for the background worker.  This is the higher-privileged WebExtension worker that has no interface.

- `startBackground.js` handles message port from bootstrap.js that sends the click event, handles the context menu, and loads everything else on the first button of context menu click.
- `analytics.js` handles sending events to the server for use with GA.
- `auth.js` handles the initial authentication call, and handles subsequent requests using that authentication.  It also informs `analytics.js` of any A/B tests so those can be submitted.
- `clipboard.js` handles copying to the clipboard.
- `communication.js` handles communication with the content workers.
- `deviceinfo.js` gets information about this device that is used in some logging and analytics.
- `selectorLoader.js` handles loading the selector worker, and contains the list of files that the selector loads.
- `main.js` launches everything
- `takeshot.js` takes the shot the content worker has constructed, sends it to the server, and handles copying and opening the tab.
