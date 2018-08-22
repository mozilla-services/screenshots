/* globals AppConstants, ExtensionAPI */

"use strict";

ChromeUtils.defineModuleGetter(this, "AppConstants",
                               "resource://gre/modules/AppConstants.jsm");

this.screenshots = class extends ExtensionAPI {
  getAPI() {
    return {
      experiments: {
        screenshots: {
          // If you are checking for 'nightly', also check for 'nightly-try'.
          //
          // Otherwise, just use the standard builds, but be aware of the many
          // non-standard options that also exist (as of August 2018).
          //
          // Standard builds:
          //   'esr' - ESR channel
          //   'release' - release channel
          //   'beta' - beta channel
          //   'nightly' - nightly channel
          // Non-standard / deprecated builds:
          //   'aurora' - deprecated aurora channel (still observed in dxr)
          //   'default' - local builds from source
          //   'nightly-try' - nightly Try builds (QA may occasionally need to test with these)
          async getUpdateChannel() {
            return AppConstants.MOZ_UPDATE_CHANNEL;
          },
        },
      },
    };
  }
};
