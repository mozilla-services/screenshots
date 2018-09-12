# Screenshots UX Acceptance Criteria

`Last Updated: 08.21.2018`

## Firefox Accounts Integration Acceptance

This document tracks requirements the implementation of new UX flows associated with [this design spec](https://mozilla.github.io/testpilot-assets/Firefox_Screenshots/NEW_FxA_Integration/).

### Shot Page

#### All Views

- [ ] It should match the linked spec [#4686](https://github.com/mozilla-services/screenshots/issues/4686)
- [ ] It should remove the ability to change the expiration date of shots [#4688](https://github.com/mozilla-services/screenshots/issues/4688)
- [ ] It should add a copy to clipboard button [#4776](https://github.com/mozilla-services/screenshots/issues/4776)
- [ ] It should use a common header component that displays various items depending on user type/state[#4685](https://github.com/mozilla-services/screenshots/issues/4685)
- [ ] It should use a common CTA with different strings depending on user type/state [#4684](https://github.com/mozilla-services/screenshots/issues/4684)

#### Owner/Non-Authenticated

- [ ] It should onboard users to the new UI [#4790](https://github.com/mozilla-services/screenshots/issues/4790)
- [ ] It should display a marketing CTA sign in with FxA [#4789](https://github.com/mozilla-services/screenshots/issues/4789)
- [x] It should display a button that directs user to sign in
- [x] It should display the ability to *Favorite* Shots, but this functionality should be disabled
- [ ] It should indicate that favoriting shots requires sign in [note: this is currently demonstrated in the the spec by wiggling the sign-in button if the disabled favorite button is clicked] [#4878](https://github.com/mozilla-services/screenshots/issues/4878)

#### Owner/Authenticated

- [x] It should allow users to favorite shots
- [ ] It should indicate visually if a shot is favorited [#4781](https://github.com/mozilla-services/screenshots/issues/4791)
- [x] It should provide a link to get to Settings

### Non-Owner

- [ ] It should display a Firefox CTA
- [ ] It should allow users to report shots from the footer [#4687](https://github.com/mozilla-services/screenshots/issues/4687)

### My Shots Page

#### Owner/Non-Authenticated

- [ ] It should display a marketing CTA sign in with FxA
- [x] It should display a button that directs user to sign in

#### Owner/Authenticated

- [ ] It should allow users to favorite shots [#4879](https://github.com/mozilla-services/screenshots/issues/4879)
- [ ] It should visually indicate which shots have been favorited [#4781](https://github.com/mozilla-services/screenshots/issues/4791)
- [x] It should provide a link to get to Settings

### Home Page

- [ ] Review and update hope page art and copy [#4792](https://github.com/mozilla-services/screenshots/issues/4792)

#### Owner/Non-Authenticated

- [ ] It should display a marketing CTA sign in with FxA
- [ ] It should display a button that directs user to sign in

#### Owner/Authenticated

- [x] It should provide a link to get to Settings [#4683](https://github.com/mozilla-services/screenshots/issues/4683)

### Add-on

- [ ] Review and update on-boarding [#4793](https://github.com/mozilla-services/screenshots/issues/4793)

### STRETCH/NEEDS-UX
- [ ] It should allow authenticated users to see full source URLS of their shots [#4774](https://github.com/mozilla-services/screenshots/issues/4774)
- [ ] It should allow authenticated users to optionally share full source URLS of their shots
- [ ] It should allow authenticated users to make more granular share settings (#3611)[https://github.com/mozilla-services/screenshots/issues/3611]
- [ ] It should allow authenticated users to extract strings and images from their shots (note, this is somewhat stubbed out in the new spec) [#4689](https://github.com/mozilla-services/screenshots/issues/4689)



