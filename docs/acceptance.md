# Page Shot UX and Measurements Acceptance Criteria
This document is intended to be used as comprehensive list of all changes to UI
and metrics required for launch. Issues will be filed from this list and
triaged into sprints on a an as-needed basis. Items in this list may not
correlate with issues on a 1:1 basis.

# General
- [ ] Build DMCA capabilities [#2288](https://github.com/mozilla-services/pageshot/issues/2288)
- [ ] Support Localization [#2205](https://github.com/mozilla-services/pageshot/issues/2205)

## Add-on Activation
- [ ] It should be able to be progressively revealed/enabled by the shield recipe server
- [ ] It should be able to be enabled and disabled by a toggle in about:preferences

# UI/UX

## General UI Revisions (ADDON + SERVER)
- [ ] It should have a new logo and word mark that match Photon
- [ ] It should have an overall color system that matches Photon
- [ ] It should have buttons, inputs, controls etc. that match Photon
- [ ] It should use the new Mozilla logo [#2211](https://github.com/mozilla-services/pageshot/issues/2211)
- [ ] All images should be SVG or have retina versions
- [ ] It should undergo an accessibility review prior to launch [#2251](https://github.com/mozilla-services/pageshot/issues/2251)
- [ ] It should have a new name
- [ ] It should be at {newname}.firefox.com

## Shot iframe (ADDON)
- [ ] It should match the final spec provided by the UX team (#2306)[https://github.com/mozilla-services/pageshot/issues/2306]

## Shots Index Page UI (SERVER)[#2308](https://github.com/mozilla-services/pageshot/issues/2308)
- [ ] It should match the final spec provided by UX team
  - [ ] It should include the ability to download, copy link, delete and access to shot page for each shot
  - [ ] It should make use of the CSS grid spec [NB. This is an odd requirement, but we are only supporting Firefox 54+ and unspecified future releases of Chrome. Shipping CSS grid at a large scale will give us a good Hacks post, and won’t be particularly costly given what I’ve seen of the spec]
  - [ ] It should deemphasize search UI
  - [ ] It should ask users to rate it occasionally
  - [ ] It should link to a feedback form/survey
    - [ ] *TBD: CAN WE STICK WITH SURVEY GIZMO* confirm with *ellee mirwin*
  - [ ] *STRETCH* It should include pagination *NEW FEATURE*
  - [ ] *STRETCH* It should be fully responsive down to 320px

## Shot Owner Detail Page UI (SERVER)
- [ ] It should match the final spec provided by the UX team
  - [ ] It should be fully responsive
  - [ ] It should include a loading animation until images trigger onload callbacks *NEW FEATURE*
  - [ ] it should include all current controls with the share panel minimized by default

## Non-Owner Shot Detail Page UI (SERVER)
  - [ ] It should have three layout options that promote Page Shot for non-owner views *NEW FEATURE*
    - [ ] Top banner
    - [ ] Side banner
    - [ ] Bottom banner
    - [ ] It should provide context specific messaging for desktop browsers
    - [ ] It should provide context specific messaging for non-ff mobile browsers
    - [ ] It should provide context specific messaging for mobile-ff browsers
  - [ ] It should include Firefox + Page Shot branding
  - [ ] It should not have flagging UI in the nav bar
  - [ ] It should have flagging UI in the footer

## Owner Expired Shot page UI
- [ ] It should match the final spec provided by the UX team

## Non-Owner Specific Expired Page UI
- [ ] It should include promotional materials describing the utility of Page Shot and link to the landing page

## Landing Page UI [#2310](https://github.com/mozilla-services/pageshot/issues/2310)
- [ ] It should match the final spec provided by the UX team
- [ ] It should describe the value proposition of Page Shot
- [ ] It should specify that Page Shot is currently only available for Firefox on Desktop for non-FF users
- [ ] It should specify that Page Shot is ‘Coming Soon’ for Chrome users
- [ ] It should specify for users of older versions of Firefox that they simply need to update Firefox to use it
  - [ ] It should accomodate different messaging based on state of phased roll out
- [ ] *STRETCH:* it should let users of Firefox 54 + trigger the add-on onboarding flow from the site

## Onboarding UI [#2307](https://github.com/mozilla-services/pageshot/issues/2307)
- [ ] It should match the final spec provided by the UX team
- [ ] It should proceed stepwise to explain the basics of the page shot feature
- [ ] It should initially suggest itself by adding a page shot icon to the tool bar and badging it
- [ ] *STRETCH* If a user has not engaged with the badged toolbar icon in three weeks, we should pop a tab or trigger a doorhanger asking the user if they would like to learn about the new feature

# Measurements & Dashboards

## Measures
- [ ] Reporting of all measures should be derived from the state of the Telemetry flag in the browser. [#2250](https://github.com/mozilla-services/pageshot/issues/2250)
- [ ] It should have a documented plan for testing and verifying all new measures.
- [ ] All measures currently in the product should be audited to ensure they’re working as intended.
- [ ] Onboarding UI should be instrumented to measure interaction rate w/buttons/controls etc.
- [ ] Toolbar icon should record a special event if clicked while badged & clicked to onboard
- [ ] Pageshot.net replacement page should be instrumented to measure interaction rate w/buttons/controls etc.
- [ ] *STRETCH* In order to Validate Event Telemetry, we should — given time — add  Event Telemetry Pings to the following tuples:
  - [ ] badged onboarding (see above) click
  - [ ] Click Save `addon/save-shot/overlay-save-button`
  - [ ] Click Cancel `addon/cancel-shot/overlay-cancel-button`
  - [ ] Click Download `addon/download-shot/overlay-download-button`
  - [ ] Click My Shots `addon/goto-myshots/selection-button`
  - [ ] Click on "Save visible” `addon/capture-visible/selection-button`
  - [ ] Click on "Save Full Page" `addon/capture-full-page/selection-button`

## Dashboards
- [ ] It should have a set of dashboards that demonstrably help us to reason about the health and direction of the product
- [ ] It should have dashboards reflecting Page Shot in FF KPIs (Telemetry Derived)
  - [ ] It should have a dashboard displaying time spent in browser (c/f topline FF goal)
  - [ ] It should have a dashboard displaying page views in browser (c/f topline FF goal)
  - [ ] It should have a dashboard displaying browser cohort retention (based on standard engagement metric common to all Telemetry)
    - [ ] *STRETCH* Confirm exact measures/definitions with *gfritzsche*
  - [ ] It should have a dashboard displaying browser cohort retention (based on standard engagement metric common to all Telemetry)
- [ ] It should have dashboards reflecting Page Shot Product KPIS (GA + Server Metrics)
  - [ ] It should have a cohort retention table based on the act of taking a shot (download or upload)
  - [ ] It should have a dashboard displaying non-owner views and embedded views
  - [ ] It should have a dashboard displaying download and uploads
