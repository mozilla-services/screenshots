This contains all the files for the WebExtension.  Most files are not "built", but a few files in `build/` are built and kept fresh automatically by `./bin/run-addon`

The organization:

- Every file exports one object, named after the file (directory names ignored).  The one object may be a function.  File case should match the object case.  Typically a mixed-case filename exports a function, while modules are exported in all-lowercase.
- There are three workers/processes:
  1. The background page, in `background/`
  2. The selector content worker, in `selector/`
  3. The site helper that communicates with the Page Shot website, in `site-helper.js`
- The background process is loaded according to a list in `manifest.json.template` – if there are load order dependencies, they must be manually managed with that list
- The selector content worker is loaded with a list in `background/loadSelector.js`.  Again this must be manually maintained.
- The site helper worker is loaded via a separate list in `manifest.json.template`

Note that shared files are located directly in this directory.  These files should have minimal (ideally no) requirements.  Note that `shot.js` is *also* shared with the server, and is wrapped in a simple module pattern into `webextension/build/shot.js`

- `catcher.js` has some functions for catching and reporting exceptions.
- `randomString.js` generates a random string, typically for in shot IDs.
- `domainFromUrl.js` gets the domain from a URL (e.g., `"google.com"` from `"https://google.com/"`)
- `makeUuid.js` generates a UUID
