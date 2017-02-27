This is all the code for the selector content worker.  This worker has these responsibilities:

- Setup an iframe where work happens
- Create the shot object and keep it updated
- Handle clicks in the interface (e.g., My Shots)
- Manage the selection and resizing process
- Manage click-to-select
- Ask the background worker to take screenshots
- Ask the background worker to upload the shot

The files are loaded by a list in `background/main.js`

- `callBackground.js` exports a function `callBackground(funcName, ...args)` to communicate with the background worker.
- `documentMetadata.js` gets information out of the document (URL, og: metadata, etc)
- `snapping.js` calculates snapping points in the document
- `ui.js` handles all the visual components, including iframe setup, and has callbacks when the user interacts with those components.
- `util.js` has random stuff.
- `shooter-interactive-worker.js` handles the actual selection and transition between states.  It also handles the actual dragging and selection.
- `shooter.js` coordinates all the other parts.
