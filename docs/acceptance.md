---

## Test Order
* V 1.0: Create and share *static* region-select screenshots only, view shots in a grid, delete shots, search shots.
* V 1.1: Can be shipped as part of Test 1, but should not block launch. Adds the ability to do *currently visible region static capture*
* V 1.2: can be shipped as part of Test 1, but should not block launch. Adds the ability to do *full page static capture*
* V 2.0: should be a completely separate experiment--allows users to archive pages.

---

# MVP Acceptance Criteria

---

### Shot Capture

- [ ] it should allow users to drag select a page region to capture
- [ ] it should allow users to click select a page region to capture

---

### Shot Share

- [ ] it should allow users to share their screenshots via URL
- [ ] it should allow users to share their screenshots to popular social media environments

---

### Shot Review

- [ ] it should allow users to see a grid of their screenshot
- [ ] it should offer coherent navigation back and forth from the grid view to individual screenshots
- [ ] it should allow users to delete their screenshots
- [ ] it should allow the user to see the page title for each screenshot
- [ ] it should allow allow users to see when they took their screenshots
- [ ] it should allow users to see the domain where their screenshot initiated (good)
- [ ] it should allow users to search their screenshots

---

### UI/UX Quality Assurance

- [ ] it should more or less match other Firefox styles (colors, fonts, buttons etc)
- [ ] it should provide useful, clear error messages
- [ ] it should visibly prevent users from screenshotting UI in the page shot app (no recursive shots)***
- [ ] it should allow users to cancel out of a shot
- [ ] it should allow users to return to a tab after shot is taken and continue their browsing without any artifacts from the shot ui

---

### Add-on Quality assurance

- [ ] it should install restartless-ly
- [ ] it should uninstall restartless-ly and leave no trace (automatically delete ppl of server after a certain amount of time)***
- [ ] it should disable access, but retain user data for some amount of time (TBD) after disable
- [ ] it should delete user data after uninstall + grace period



