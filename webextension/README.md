This contains all the files for the WebExtension.  Most files are not "built", but a few files in `build/` are built and kept fresh automatically by `./bin/run-addon`

## The Organization:

- Every file exports one object, named after the file (directory names ignored).  The one object may be a function.  File case should match the object case.  Typically a mixed-case filename exports a function, while modules are exported in all-lowercase.
- There are three workers/processes:
  1. The background page, in `background/`
  2. The selector content worker, in `selector/`
  3. The site helper that communicates with the Firefox Screenshots website, in `site-helper.js`
- The background process is loaded according to a list in `background/startBackground.js` – if there are load order dependencies, they must be manually managed with that list
- The selector content worker is loaded with a list in `background/selectorLoader.js`.  Again this must be manually maintained.
- The site helper worker is loaded via a separate list in `manifest.json.template`

Note that shared files are located directly in this directory.  These files should have minimal (ideally no) requirements.  Note that `shot.js` is *also* shared with the server, and is wrapped in a simple module pattern into `webextension/build/shot.js`

- `catcher.js` has some functions for catching and reporting exceptions.
- `randomString.js` generates a random string, typically for in shot IDs.
- `domainFromUrl.js` gets the domain from a URL (e.g., `"google.com"` from `"https://google.com/"`)
- `makeUuid.js` generates a UUID

## Communication:

The basic flow:

1. A minimal file is loaded initially, `background/startBackground.js` which listens for clicks.
1. In response to a click, other files are loaded (these are listed in `startBackground.js`) and `main.onClicked()` called.
2. The background page loads the content worker with `background/selectorLoader.js`
3. `selector/shooter.js` handles most communication logic from the selector side
4. `shooter.js` collects the information and creates a Shot object.  
5. `selector/uicontrol.js` handles the UI logic, button handlers, selection process, etc.
6. When you hit **Download** and [canvas.drawWindow](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawWindow) is supported, then the `data:` URL is created immediately, an `<a download="filename" href="data:...">` link is created and synthetically clicked.
7. When you hit **Download** and `canvas.drawWindow` isn't supported, then we send a message to ask the background page to capture the selection, turn it into a data URL, return the data URL, and then we continue with creating the anchor.
8. If you hit **Cancel** then the content-worker self-destructs
9. If you hit **Save**, **Full Page** or **Visible Page** then the logic is the same – we define a rectangle based on the button, and continue.
10. The UI is hidden.
11. If `canvas.drawWindow` is supported then the content worker adds an image to the shot.
12. The shot is sent to the background page, along with the selection rectangle.
13. If the background page sees there's no image (presumably `canvas.drawWindow` isn't supported), it uses `captureVisibleTab` to add an image.
14. The authentication information is fetched (`background/auth.js`).  If the client authenticated earlier in the session then we return that information.
15. If the client isn't authenticated then we get the registration/authentication information from `browser.storage`.
16. If there's no authentication information then we create it (it's a random ID and secret).
17. The background page calls `/api/login` or `/api/register` if the login 404s.  It gets back an authentication header.
18. Now we have the authentication header, and can continue saving the shot.
19. The shot is submitted to the server with the authentication header.
20. We open a new tab with `/creating?...` immediately, before the save is completed.
21. Once the shot has been uploaded successfully we take that created tab and navigate to the shot page.
22. The link is copied to the clipboard and a notification is popped up telling the user their shot was created.
