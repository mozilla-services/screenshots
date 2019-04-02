class PromotionStrategy {
  /* Display Firefox Account onboarding dialog in header below signin button */
  shouldShowOnboardingDialog(isOwner, isShotPage) {
    // Because we are deprecating the server, we never want to show this.
    return false;
    /*
    let show = false;
    // Exit without showing dialog on non-owner shot page
    if (isShotPage && !isOwner) {
      return show;
    }

    const count = localStorage.hasSeenOnboardingDialog;
    if (!count) {
      localStorage.hasSeenOnboardingDialog = 1;
      show = true;
    } else if (count < 3) {
      localStorage.hasSeenOnboardingDialog = parseInt(count, 10) + 1;
      show = true;
    }
    return show;
    */
  }

  /* Display edit tool promotion on shot page below edit button */
  shouldShowEditToolPromotion(isOwner, enableAnnotations, hasFxaOnboardingDialog) {
    // Hide edit tool promotion when showing fxaOnboarding dialog
    if (!isOwner || !enableAnnotations || hasFxaOnboardingDialog) {
      return false;
    }
    let show = false;
    const count = localStorage.hasSeenPromoDialog;
    if (!count) {
      localStorage.hasSeenPromoDialog = 1;
      show = true;
    } else if (count < 3) {
      localStorage.hasSeenPromoDialog = parseInt(count, 10) + 1;
      show = true;
    }
    return show;
  }

  /* Highlight edit tool icon on the shot page when user lands on shot page
   for the first time and when the edit tool promo is displayed */
  shouldHighlightEditIcon(isOwner, enableAnnotations) {
    if (!isOwner) {
      return false;
    }
    const hasSeen = localStorage.hasSeenEditButton;
    if (!hasSeen && enableAnnotations) {
      localStorage.hasSeenEditButton = "1";
    }
    return !hasSeen;
  }

  /* Display upsell ad-banner inside header */
  shouldShowFirefoxBanner(shouldGetFirefox, isOwner) {
    return false;
    /*
    if (shouldGetFirefox && !isOwner) {
      return true;
    }
    return false;
    */
  }

  /* Display FxA signin ad-banner inside header */
  shouldShowFxaBanner(hasFxa) {
    // Because we are deprecating the server, we never want to show this.
    return false;
    /*
    if (!hasFxa) {
      return true;
    }
    return false;
    */
  }

  shouldShowDeprecation() {
    return true;
  }
}

if (typeof exports !== "undefined") {
  exports.PromotionStrategy = PromotionStrategy;
}
