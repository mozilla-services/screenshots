## Version 4

### UI/Visible Changes

* Add a download-only button when you make a
  selection. [#2024](https://github.com/mozilla-services/pageshot/issues/2024)
* close the share panel after clicking on an item. Fixes [#2034](https://github.com/mozilla-services/pageshot/issues/2034) [61e0664](https://github.com/mozilla-services/pageshot/commit/61e0664)
* fix regression from updating the selection. A
  previous 'fix' to double-clicking the Save button actually suppressed
  subsequent updates of the selection. Fixes [#2046](https://github.com/mozilla-services/pageshot/issues/2046) [d331fdd](https://github.com/mozilla-services/pageshot/commit/d331fdd)
* do not show error popup on startup if we can't
  login to the server. Fixes [#2006](https://github.com/mozilla-services/pageshot/issues/2006) [738eedf](https://github.com/mozilla-services/pageshot/commit/738eedf)

### Metrics and backend changes

* track og:image images differently than other
  direct link images. Fixes [#2041](https://github.com/mozilla-services/pageshot/issues/2041) [8dfd52e](https://github.com/mozilla-services/pageshot/commit/8dfd52e)
* add a $DISABLE_CONTROLLER_TASKS variable that controls
  if this server instance should handle database upgrades and periodic tasks. Fixes [#1978](https://github.com/mozilla-services/pageshot/issues/1978) [2d4df88](https://github.com/mozilla-services/pageshot/commit/2d4df88)
* even if user.initialize() is called many times, do
  not keep sending requests to the server. Fixes [#1956](https://github.com/mozilla-services/pageshot/issues/1956) [85db7e7](https://github.com/mozilla-services/pageshot/commit/85db7e7)

## Version 3

### In-browser UI changes

* Move Save and Cancel buttons below the selection. Fixes [#1629](https://github.com/mozilla-services/pageshot/issues/1629) [8ba9223](https://github.com/mozilla-services/pageshot/commit/8ba9223)
* Add pixel dimensions when starting and dragging
  the selection. Fixes [#1848](https://github.com/mozilla-services/pageshot/issues/1848) [4915115](https://github.com/mozilla-services/pageshot/commit/4915115)
* Change to `cursor: move` on the selection box. Fixes [#1768](https://github.com/mozilla-services/pageshot/issues/1768) [c5aa6ae](https://github.com/mozilla-services/pageshot/commit/c5aa6ae)
* Add *Create Page Shot* item in the context menu. Fixes [#1922](https://github.com/mozilla-services/pageshot/issues/1922) [c220524](https://github.com/mozilla-services/pageshot/commit/c220524)
* Add paste instructions to notification popups. Fixes [#1776](https://github.com/mozilla-services/pageshot/issues/1776) [5659166](https://github.com/mozilla-services/pageshot/commit/5659166)
* Render the selection interface in an iframe, so that it doesn't conflict or get affected by any styles in the document itself.  Multiple commits:
  * Iframe sizing,  [23dc2b4](https://github.com/mozilla-services/pageshot/commit/23dc2b4)
  * Create `ui.iframe` and put elements into it [91ed846](https://github.com/mozilla-services/pageshot/commit/91ed846)
  * Event handlers [c424544](https://github.com/mozilla-services/pageshot/commit/c424544) and  [6a19400](https://github.com/mozilla-services/pageshot/commit/6a19400)
  * Initial commit with basics are working [3e0f0f9](https://github.com/mozilla-services/pageshot/commit/3e0f0f9) and [17c1406](https://github.com/mozilla-services/pageshot/commit/17c1406)

### Web UI changes

* Put in a delete option directly on My Shots, fixes [#1346](https://github.com/mozilla-services/pageshot/issues/1346) [9cb179e](https://github.com/mozilla-services/pageshot/commit/9cb179e)
* Direct feedback to Discourse. Fixes [#1604](https://github.com/mozilla-services/pageshot/issues/1604) [bab16dd](https://github.com/mozilla-services/pageshot/commit/bab16dd)
* Add a better title to search results. Fixes [#1909](https://github.com/mozilla-services/pageshot/issues/1909) [09d0e6e](https://github.com/mozilla-services/pageshot/commit/09d0e6e)
* Implement rich copy. Button is shown only when
  extension is present. Fixes [#1693](https://github.com/mozilla-services/pageshot/issues/1693) [abb0a1f](https://github.com/mozilla-services/pageshot/commit/abb0a1f)

### Server changes

* Use the Raven Express middleware. Fixes [#1583](https://github.com/mozilla-services/pageshot/issues/1583) [9f4a655](https://github.com/mozilla-services/pageshot/commit/9f4a655)
* Do not overwrite NODE_ENV if it is set [fdac82f](https://github.com/mozilla-services/pageshot/commit/fdac82f)
* Enable uglify compression, for about 50% size improvement.
  . Fixes [#1803](https://github.com/mozilla-services/pageshot/issues/1803) [80e84e8](https://github.com/mozilla-services/pageshot/commit/80e84e8)
* Make bundle scripts and raven activation async. Fixes [#1804](https://github.com/mozilla-services/pageshot/issues/1804) [e4ac283](https://github.com/mozilla-services/pageshot/commit/e4ac283)
* When erasing the search, change to URL to /shots instead of
  /shots?q= [9bde83d](https://github.com/mozilla-services/pageshot/commit/9bde83d)
* Update
  reactruntime so that changes to the model.title automatically get reflected
  in document.title. [09d0e6e](https://github.com/mozilla-services/pageshot/commit/09d0e6e)
* Give a better exception when keygrip keys aren't set, and we
  try to hash a user ID [cbecc70](https://github.com/mozilla-services/pageshot/commit/cbecc70)
* Add package.json version to `/__version__`. Fixes [#1928](https://github.com/mozilla-services/pageshot/issues/1928) [3fcf252](https://github.com/mozilla-services/pageshot/commit/3fcf252)
* Run all svgs through `svgo` during the build process. Fixes [#1389](https://github.com/mozilla-services/pageshot/issues/1389) [3dcfb35](https://github.com/mozilla-services/pageshot/commit/3dcfb35)
* Make it so that calls to `/api/login` can't loop in case of
  failures or missing cookies [02d175a](https://github.com/mozilla-services/pageshot/commit/02d175a)
* Remove the `device_activity` table. Fixes [#1954](https://github.com/mozilla-services/pageshot/issues/1954) [dc1100c](https://github.com/mozilla-services/pageshot/commit/dc1100c)
* Add keygrip check to `/__heartbeat__`. This is
  probably redundant, as the middleware will fail if keygrip isn't initialized. Fixes [#1931](https://github.com/mozilla-services/pageshot/issues/1931) [a678028](https://github.com/mozilla-services/pageshot/commit/a678028)
* Make server abort with exit code 1 if database
  initialization isn't successful. Fixes [#1933](https://github.com/mozilla-services/pageshot/issues/1933) [8238ddd](https://github.com/mozilla-services/pageshot/commit/8238ddd)
* Allow `$NO_UGLIFY` to avoid uglifying the source while
  bundling.  Only works on rebuild. [82e9cc3](https://github.com/mozilla-services/pageshot/commit/82e9cc3)
* Send Raven report when metrics updating fails
  Allow REFRESH_METRICS_TIME to be 0, disabling the refresh. Fixes [#1946](https://github.com/mozilla-services/pageshot/issues/1946) [e4da720](https://github.com/mozilla-services/pageshot/commit/e4da720)

### Metrics changes

* Send timing information to GA for more steps. This
  changes the signature of sendTiming() and is more explicit about that
  signature. Add functions to help time pieces of the process. Fixes [#936](https://github.com/mozilla-services/pageshot/issues/936) [352398c](https://github.com/mozilla-services/pageshot/commit/352398c)
* When making a login at `/api/login`, send a GA event. Also
  remove unused deviceInfo variables [3c8fe96](https://github.com/mozilla-services/pageshot/commit/3c8fe96)
* Pass isOwner through to share panel, so all events don't
  appear as non-owner [a6b4dce](https://github.com/mozilla-services/pageshot/commit/a6b4dce)
* Don't recreate `/metrics` if they are fresh enough Make the
  polling interval on refreshing metrics slightly randomized, so multiple
  workers don't pile on [8d61f00](https://github.com/mozilla-services/pageshot/commit/8d61f00)

### Bug fixes

* Do not load our stylesheet into the main page. Fixes [#1596](https://github.com/mozilla-services/pageshot/issues/1596) [7ac0e43](https://github.com/mozilla-services/pageshot/commit/7ac0e43)
* Suppress some errors that are happening during teardown, when
  the document is no longer valid [e99a2bc](https://github.com/mozilla-services/pageshot/commit/e99a2bc)
* Never force login/initialization on sendEvent. Fixes [#1963](https://github.com/mozilla-services/pageshot/issues/1963) [4dea856](https://github.com/mozilla-services/pageshot/commit/4dea856)
* Fix a client/server render mismatch, where urlIfDeleted and
  title weren't being put into the server-side shot [109bc3c](https://github.com/mozilla-services/pageshot/commit/109bc3c)
* Don't allow the shot to be taken more than once. Fixes [#1799](https://github.com/mozilla-services/pageshot/issues/1799) [fafef59](https://github.com/mozilla-services/pageshot/commit/fafef59)
* Remove messaging from helperworker and viewerworker that are
  no longer being used Comment out but leave in saved/stored full page
  messaging [4224448](https://github.com/mozilla-services/pageshot/commit/4224448)
* Catch all exceptions in interactive-worker with
  watchFunction/watchPromise. Fixes [#1888](https://github.com/mozilla-services/pageshot/issues/1888) [f693b9f](https://github.com/mozilla-services/pageshot/commit/f693b9f)

## Version 2

### Visible changes to the product

* **Make the shot title editable**.  To edit the title simply click on it from the shot page (See [#573](https://github.com/mozilla-services/pageshot/issues/573) [cc10632](https://github.com/mozilla-services/pageshot/commit/cc10632))
* **Site-specific improvements to autoselection**. New heuristics select one Facebook comment or post, and one tweet.  (See [#1797](https://github.com/mozilla-services/pageshot/issues/1797) [#1796](https://github.com/mozilla-services/pageshot/issues/1796) [8fe813f](https://github.com/mozilla-services/pageshot/commit/8fe813f))
* **Append .png to all image URLs** (See [#1782](https://github.com/mozilla-services/pageshot/issues/1782) [d7ebfbc](https://github.com/mozilla-services/pageshot/commit/d7ebfbc))
* **Make a public metrics page available**.  It will be in `/metrics` (will be published to https://pageshot.net/metrics).  (See  [#1825](https://github.com/mozilla-services/pageshot/issues/1825) [#1854](https://github.com/mozilla-services/pageshot/issues/1854) [89a8d9c](https://github.com/mozilla-services/pageshot/commit/89a8d9c))
* **Scroll selection when your mouse is close to the edge of the window**. Fixes [#193](https://github.com/mozilla-services/pageshot/issues/193) [28bcd17](https://github.com/mozilla-services/pageshot/commit/28bcd17)

### Bugs fixed

* Avoid exception on pages that have multiple `og:title` properties; both
  store only the first, and handle stored pages that may have multiple titles
  stored. Fixes [#1887](https://github.com/mozilla-services/pageshot/issues/1887) [9375962](https://github.com/mozilla-services/pageshot/commit/9375962)
* Ensure suggested filenames for downloaded files stay under 255 bytes. Fixes [#1820](https://github.com/mozilla-services/pageshot/issues/1820) [f1dba6b](https://github.com/mozilla-services/pageshot/commit/f1dba6b)
* Handle null cookies results when checking for an
  authentication cookie [dda178f](https://github.com/mozilla-services/pageshot/commit/dda178f)

### Minor changes

* change email share graphic. Fixes [#1650](https://github.com/mozilla-services/pageshot/issues/1650) [34f1ca8](https://github.com/mozilla-services/pageshot/commit/34f1ca8)
* redirect /favicon.ico to
  /static/img/pageshot-icon-32.png. Fixes [#1840](https://github.com/mozilla-services/pageshot/issues/1840) [34056c0](https://github.com/mozilla-services/pageshot/commit/34056c0)
* (v2.4) restore the share notification message. Fixes [#1918](https://github.com/mozilla-services/pageshot/issues/1918) [fdda2ec](https://github.com/mozilla-services/pageshot/commit/fdda2ec)
* (v2.4) revert to 'page' when the title isn't found. Fixes [#1836](https://github.com/mozilla-services/pageshot/issues/1836) [295e5b6](https://github.com/mozilla-services/pageshot/commit/295e5b6)
* (v2.4) add specific images for no search results and no
  shots at all. Fixes [#1770](https://github.com/mozilla-services/pageshot/issues/1770) [4e04411](https://github.com/mozilla-services/pageshot/commit/4e04411)
* (v2.4) Update some metrics queries: - Do not filter out shots that
  seem expired from the shot total count - Simplify some aliases in queries
  (not using aliasing in FROM) - Add a total retention table [efab5e1](https://github.com/mozilla-services/pageshot/commit/efab5e1)

### Internal refactoring.

* Hardcode the sentry public DSN so we receive error reports before successful login.  It will still be
  overwritten on login (including erasing it), but until that happens it will
  fall back to the production DSN. Fixes [#1883](https://github.com/mozilla-services/pageshot/issues/1883) [1f76fcc](https://github.com/mozilla-services/pageshot/commit/1f76fcc)
* Direct abuse reports to a dedicated email address. Fixes [#1855](https://github.com/mozilla-services/pageshot/issues/1855) [a69d756](https://github.com/mozilla-services/pageshot/commit/a69d756)
* Don't overload the `upload` GA event action as both success and failure states (see [Metrics](https://github.com/mozilla-services/pageshot/blob/master/docs/METRICS.md) for more info). Fixes [#1759](https://github.com/mozilla-services/pageshot/issues/1759) [375cbff](https://github.com/mozilla-services/pageshot/commit/375cbff)
* Combine `configure-raven.js` with the `raven.js`
  client, into `/install-raven.js`. Load raven via require() instead of a direct
  link.  Remove the now-unneeded `static/vendor/` directory, and Makefile rules
  related to it. Fixes [#1801](https://github.com/mozilla-services/pageshot/issues/1801) [6841236](https://github.com/mozilla-services/pageshot/commit/6841236)
* Combine `parent-helper.js` and
  `set-content-hosting-origin.js`. Make the scripts inclusion dependent on there
  being a full page/iframe. Fixes [#1802](https://github.com/mozilla-services/pageshot/issues/1802) [6db660d](https://github.com/mozilla-services/pageshot/commit/6db660d)
* Move `errorResponse()`, `simpleResponse()`, and `jsResponse()`
  to a new module. Move raven into its own module as well. Fixes [#1839](https://github.com/mozilla-services/pageshot/issues/1839) [6a06eb2](https://github.com/mozilla-services/pageshot/commit/6a06eb2)
* First pass at some [deployment documentation](https://github.com/mozilla-services/pageshot/blob/master/docs/deployment.md). Fixes [#1871](https://github.com/mozilla-services/pageshot/issues/1871) [e4b00c0](https://github.com/mozilla-services/pageshot/commit/e4b00c0)
* Increase default period of time to check for
  deleted shots from 1 minute to 1 hour. Fixes [#1865](https://github.com/mozilla-services/pageshot/issues/1865) [7589d5e](https://github.com/mozilla-services/pageshot/commit/7589d5e)
* Add GA logging for any shots that are deleted
  after the expiration time. Fixes [#1692](https://github.com/mozilla-services/pageshot/issues/1692) [dcb380b](https://github.com/mozilla-services/pageshot/commit/dcb380b)
* Move the share panel and button entirely into its
  own component fix share panel alignment when extension
  notification banner is in place. Fixes [#1714](https://github.com/mozilla-services/pageshot/issues/1714) Fixes [#1565](https://github.com/mozilla-services/pageshot/issues/1565) [ab468fd](https://github.com/mozilla-services/pageshot/commit/ab468fd)
* (v2.4) check before trying to call window.sendToChild,
  which is safely missing on most pages. Fixes [#1910](https://github.com/mozilla-services/pageshot/issues/1910) [5333ae7](https://github.com/mozilla-services/pageshot/commit/5333ae7)

### Version 2.5

A version released to improve some operational issues.

* make server abort with exit code 1 if database
  initialization isn't successful. Fixes [#1933](https://github.com/mozilla-services/pageshot/issues/1933) [8238ddd](https://github.com/mozilla-services/pageshot/commit/8238ddd)
* Make the /metrics page disableable with $DISABLE_METRICS [a18437a](https://github.com/mozilla-services/pageshot/commit/a18437a)
* Don't recreate the metrics if they are fresh enough Make the
  polling interval on refreshing metrics slightly randomized, so multiple
  workers don't pile on [8d61f00](https://github.com/mozilla-services/pageshot/commit/8d61f00)
* send Raven report when metrics updating fails
  Allow REFRESH_METRICS_TIME to be 0, disabling the refresh. Fixes [#1946](https://github.com/mozilla-services/pageshot/issues/1946) [e4da720](https://github.com/mozilla-services/pageshot/commit/e4da720)

## Version 1

### Visible changes to the product

* For each release we'll be adding one to the next version (i.e., the version after this will be Version 2)
* There is a "Save Full Page" and "Save visible" option for saving either the full length of the page, or the entire visible portion of the page.
* The add-on now automatically copies the shot URL to the clipboard.
* The autoselection when you click will now be previewed with a white box as you hover.
  * Also improvements to the autoselection algorithm, avoiding very small selections.
* Some URLs were being rejected: those with ports, `view-source` URLs, and URLs in some situations where the content was cached.
* Search on My Shots is now done as you type.
* Improvements to the selection itself:
  * You can drag the selection
  * You can invert the selection when resizing
  * You can drag out a new selection over the old selection
* In some error conditions Page Shot would become unresponsive on a tab.
* Page Shot authentication could be lost (for instance with a cookie destroying add-on).  We now attempt to re-login if we detect the cookies are gone.

### Detailed product/UI changes

* Stop auto-opening Share panel. Fixes [#1794](https://github.com/mozilla-services/pageshot/issues/1794) [d4964a7](https://github.com/mozilla-services/pageshot/commit/d4964a7)
* add mozilla logo [b68d28e](https://github.com/mozilla-services/pageshot/commit/b68d28e)
* error when hovering over elements like <html> that
  have no bounding rectangle Also avoid autoselections that are terribly small,
  even if there's no better fallback add metrics for the distance
  the selection moves or resizes. Fixes [#1784](https://github.com/mozilla-services/pageshot/issues/1784) Fixes [#1781](https://github.com/mozilla-services/pageshot/issues/1781) [8171dfb](https://github.com/mozilla-services/pageshot/commit/8171dfb)
* we can't actually support pages that use frames,
  but at least this detects it and gives an error. Fixes [#1748](https://github.com/mozilla-services/pageshot/issues/1748) [9aa7929](https://github.com/mozilla-services/pageshot/commit/9aa7929)
* when the autoselect is small try to add the next
  sibling (or uncle) element. Fixes [#1774](https://github.com/mozilla-services/pageshot/issues/1774) [a3b8604](https://github.com/mozilla-services/pageshot/commit/a3b8604)
* don't let a clip image go over 100% of the size of
  the page. Fixes [#1730](https://github.com/mozilla-services/pageshot/issues/1730) [aeb4d51](https://github.com/mozilla-services/pageshot/commit/aeb4d51)
* use URIFixup to clean URLs.  This cleans only the
  URL attached to the shot itself. Fixes [#1764](https://github.com/mozilla-services/pageshot/issues/1764) [b600a91](https://github.com/mozilla-services/pageshot/commit/b600a91)
* Add a share icon. Fixes [#1651](https://github.com/mozilla-services/pageshot/issues/1651) [2cd37a5](https://github.com/mozilla-services/pageshot/commit/2cd37a5)
* Show the instructional text on a dark background
  to prevent readability issues. Fixes [#1631](https://github.com/mozilla-services/pageshot/issues/1631) [8b5ded7](https://github.com/mozilla-services/pageshot/commit/8b5ded7)
* trigger a search when someone changes the search
  form. Fixes [#1458](https://github.com/mozilla-services/pageshot/issues/1458) [12a98ed](https://github.com/mozilla-services/pageshot/commit/12a98ed)
* use a minimum size on the click autodetect indicate the region that would be selected on hover Add a new class to
  suppress pointer events but not hide the interface. Fixes [#1745](https://github.com/mozilla-services/pageshot/issues/1745) Fixes [#1633](https://github.com/mozilla-services/pageshot/issues/1633) [d42b0a8](https://github.com/mozilla-services/pageshot/commit/d42b0a8)
* rename #share-button to #toggle-share.  Remove
  some styles that appeared to be for the share button, but didn't apply to
  anything. Fixes [#1659](https://github.com/mozilla-services/pageshot/issues/1659) [19863ea](https://github.com/mozilla-services/pageshot/commit/19863ea)
* when resizing selection across a corner or side,
  invert the selection. Fixes [#1630](https://github.com/mozilla-services/pageshot/issues/1630) [ae47ad9](https://github.com/mozilla-services/pageshot/commit/ae47ad9)
* don't allow resize to go past the edge of the
  screen. Fixes [#1732](https://github.com/mozilla-services/pageshot/issues/1732) [25ce7f4](https://github.com/mozilla-services/pageshot/commit/25ce7f4)
* put in a max height/width on full page (5000px)
  Fix the calculation of the page height and width by also using scrollHeight
  and scrollWidth. Fixes [#1740](https://github.com/mozilla-services/pageshot/issues/1740) [01e1e5f](https://github.com/mozilla-services/pageshot/commit/01e1e5f)
* dragging in the background when there's already a
  selection will now create a new selection. Fixes [#1138](https://github.com/mozilla-services/pageshot/issues/1138) [45de849](https://github.com/mozilla-services/pageshot/commit/45de849)
* allow moving the selection around. Fixes [#1628](https://github.com/mozilla-services/pageshot/issues/1628) [5faddf5](https://github.com/mozilla-services/pageshot/commit/5faddf5)
* Cleanup Shooter and the worker when the worker gets detached for some unknown reason; may avoid some problems where Page Shot hangs after an error [7793134](https://github.com/mozilla-services/pageshot/commit/7793134)
* copy link on save, and put up a popup to notify
  the user about the copy action. Fixes [#1734](https://github.com/mozilla-services/pageshot/issues/1734) [accfe28](https://github.com/mozilla-services/pageshot/commit/accfe28)
* allow view-source URLs. Fixes [#1720](https://github.com/mozilla-services/pageshot/issues/1720) [29efea9](https://github.com/mozilla-services/pageshot/commit/29efea9)
* Escape will close share panel. Fixes [#1691](https://github.com/mozilla-services/pageshot/issues/1691) [64b51cd](https://github.com/mozilla-services/pageshot/commit/64b51cd)
* fix bug that kept shooting from deactivating
  immediately (previously deactivated after 500ms delay). Fixes [#1597](https://github.com/mozilla-services/pageshot/issues/1597) [681134f](https://github.com/mozilla-services/pageshot/commit/681134f)
* Start on [#1613](https://github.com/mozilla-services/pageshot/issues/1613), add buttons to take a visible capture and
  full page (full length) screen capture Still requires UX review [40088fe](https://github.com/mozilla-services/pageshot/commit/40088fe)
* Allow ports in URLs [75644a1](https://github.com/mozilla-services/pageshot/commit/75644a1)
* check for the user auth cookie when checking if
  the browser is logged in. Fixes [#1704](https://github.com/mozilla-services/pageshot/issues/1704) [9b192cf](https://github.com/mozilla-services/pageshot/commit/9b192cf)
* Don't remove our authentication cookies on an upgrade or
  downgrade of the add-on, only on uninstall/disable [cf091c5](https://github.com/mozilla-services/pageshot/commit/cf091c5)

### Detailed server/backend changes

* Minimize all the bundle files using Uglify [1447cc2](https://github.com/mozilla-services/pageshot/commit/1447cc2)
* Set Cache-Control headers for both the static files and
  dynamically generated JS files [2a754b5](https://github.com/mozilla-services/pageshot/commit/2a754b5)
* Change inclusions of server-generated scripts to use
  staticLink [b068b1b](https://github.com/mozilla-services/pageshot/commit/b068b1b)
* Change staticLink to not add /static to the beginning of
  paths [452a110](https://github.com/mozilla-services/pageshot/commit/452a110)
* Automatically bundle core.js with all browserify bundles, and
  remove the specific core.js-related rules and script tags [7da4f72](https://github.com/mozilla-services/pageshot/commit/7da4f72)
* add styled 404 page. Does not change 404s for
  routes which are APIs, i.e., not seen by humans. Fixes [#1548](https://github.com/mozilla-services/pageshot/issues/1548) [3ba6f26](https://github.com/mozilla-services/pageshot/commit/3ba6f26)
* Get rid of unused controller on legal pages [0565da7](https://github.com/mozilla-services/pageshot/commit/0565da7)
* Use template literals [d82dc4d](https://github.com/mozilla-services/pageshot/commit/d82dc4d)
* put Raven activation into reactrender pages. Fixes [#1072](https://github.com/mozilla-services/pageshot/issues/1072) [895ca67](https://github.com/mozilla-services/pageshot/commit/895ca67)
* remove 'Leave page shot' link from pages when the
  user is not authenticated. Fixes [#1578](https://github.com/mozilla-services/pageshot/issues/1578) [62e68ed](https://github.com/mozilla-services/pageshot/commit/62e68ed)
* Update all deps to latest. Fixes [#1703](https://github.com/mozilla-services/pageshot/issues/1703) [6a1b6cd](https://github.com/mozilla-services/pageshot/commit/6a1b6cd)
* Put something in the logs when someone tries to upload a shot
  with an odd clip URL, or an empty URL [be6f736](https://github.com/mozilla-services/pageshot/commit/be6f736)
* add /contribute.json. Fixes [#1625](https://github.com/mozilla-services/pageshot/issues/1625) [8e422a5](https://github.com/mozilla-services/pageshot/commit/8e422a5)
* Switch from input.type=text to input.type=search [45c8824](https://github.com/mozilla-services/pageshot/commit/45c8824)
* Set maxlength on shot search input field [58abc98](https://github.com/mozilla-services/pageshot/commit/58abc98)

### Detailed metrics changes

* Fix regex that was supposed to select https and http, but was
  only selecting https [bc38cae](https://github.com/mozilla-services/pageshot/commit/bc38cae)
* add cancel events for tab close, navigate, and
  reload. Fixes [#1761](https://github.com/mozilla-services/pageshot/issues/1761) [6af5637](https://github.com/mozilla-services/pageshot/commit/6af5637)
* change custom dimensions from cd0 to cd2. Fixes [#1778](https://github.com/mozilla-services/pageshot/issues/1778) [ff4f83a](https://github.com/mozilla-services/pageshot/commit/ff4f83a)
* add refer(r)er information to direct image views
  send a view/direct-view event on those image views. Fixes [#1747](https://github.com/mozilla-services/pageshot/issues/1747) Fixes [#1777](https://github.com/mozilla-services/pageshot/issues/1777) [1cd58a5](https://github.com/mozilla-services/pageshot/commit/1cd58a5)
* send a message through the add-on when sendEvent
  is missing. Fix an error in how the add-ons are being loaded, which could
  keep them from being sent with the Sentry message. Fixes [#1736](https://github.com/mozilla-services/pageshot/issues/1736) [6c6f142](https://github.com/mozilla-services/pageshot/commit/6c6f142)
* add scheme information (as label) to the
  start-shot-non-http event. Fixes [#1695](https://github.com/mozilla-services/pageshot/issues/1695) [974ce79](https://github.com/mozilla-services/pageshot/commit/974ce79)
* add GA sendEvent for right-clicks/context menu on
  My Shots. Fixes [#1727](https://github.com/mozilla-services/pageshot/issues/1727) [5e20487](https://github.com/mozilla-services/pageshot/commit/5e20487)
* include the add-on version with all GA events. Fixes [#1722](https://github.com/mozilla-services/pageshot/issues/1722) [7ac5b22](https://github.com/mozilla-services/pageshot/commit/7ac5b22)
* Switch GA to use clientId instead of userId [5fe3e47](https://github.com/mozilla-services/pageshot/commit/5fe3e47)
* Fix event action names that kept a / accidentally [8c4ea36](https://github.com/mozilla-services/pageshot/commit/8c4ea36)
* add ua (user-agent) to GA events. Fixes [#1724](https://github.com/mozilla-services/pageshot/issues/1724) [ee265f0](https://github.com/mozilla-services/pageshot/commit/ee265f0)
* add a browser-send-event module that ensures that
  sendEvent is defined even if ga-activation.js fails. Fixes [#1666](https://github.com/mozilla-services/pageshot/issues/1666) [561ea05](https://github.com/mozilla-services/pageshot/commit/561ea05)
* Add $DEBUG_GOOGLE_ANALYTICS setting/config [a34983b](https://github.com/mozilla-services/pageshot/commit/a34983b)
* Add noAnalytics property to suppress GA on a page. remove GA from the creating page. Fixes [#1708](https://github.com/mozilla-services/pageshot/issues/1708) [00a3661](https://github.com/mozilla-services/pageshot/commit/00a3661)
* Hash the remote userId/cid just like we hash it for GA events
  on the server. [dc10023](https://github.com/mozilla-services/pageshot/commit/dc10023)
* Fix typo in set-expiration/navbar event [105d442](https://github.com/mozilla-services/pageshot/commit/105d442)

## 0.1

* Initial releases
* Everything that was implemented!
