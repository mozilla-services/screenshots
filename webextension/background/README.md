These are all the files/modules for the background worker.  This is the higher-privileged WebExtension worker that has no interface.

- `analytics.js` handles sending events to the server for use with GA.
- `auth.js` handles the initial authentication call, and handles subsequent requests using that authentication.  It also informs `analytics.js` of any A/B tests so those can be submitted.
- `clipboard.js` handles copying to the clipboard.
- `communication.js` handles communication with the content workers.
- `deviceinfo.js` gets information about this device that is used in some logging and analytics.
- `loadSelector.js` handles loading the selector worker, and contains the list of files that the selector loads.
- `main.js` loads and launches everything.
- `takeshot.js` takes the shot the content worker has constructed, sends it to the server, and handles copying and opening the tab.
