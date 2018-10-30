### Localization for Server-side strings of Firefox Screenshots
### Please don't localize Firefox, Firefox Screenshots, or Screenshots

## Global phrases shared across pages, prefixed with 'g'
gMyShots = My Shots
gHomeLink = Home
gNoShots
    .alt = No shots found
gScreenshotsDescription = Screenshots made simple. Take, save, and share screenshots without leaving Firefox.

## Header
buttonSettings =
    .title = Settings
buttonSignIn =
    .title = Sign In
screenshotsLogo =
    .title = Screenshots Home
bannerSignIn = <a>Sign in or sign up</a> to access your shots across devices and save your favorites forever.
bannerUpsell = {gScreenshotsDescription} <a>Get Firefox now</a>

## Footer

# Note: link text for a link to mozilla.org
footerLinkMozilla = Mozilla
footerLinkTerms = Terms
footerLinkPrivacy = Privacy Notice
footerReportShot = Report Shot
    .title = Report this shot for abuse, spam, or other problems
footerLinkFaqs = FAQs
footerLinkDMCA = Report IP Infringement
footerLinkDiscourse = Give Feedback
footerLinkRemoveAllData = Remove All Data

## Creating page

# Note: { $title } is a placeholder for the title of the web page
# captured in the screenshot. The default, for pages without titles, is
# creatingPageTitleDefault.
creatingPageTitle = Creating { $title }
creatingPageTitleDefault = page
creatingPageWaitMessage = Saving your shot…

## Home page

homePageDescription =
    .content = Intuitive screenshots baked right into the browser. Capture, save and share screenshots as you browse the Web using Firefox.
homePageButtonMyShots = Go To My Shots
homePageTeaser = Coming Soon…
homePageDownloadFirefoxTitle = Firefox
homePageDownloadFirefoxSubTitle = Free Download
# Note: do not translate 'Firefox Screenshots' when translating this string
homePageHowScreenshotsWorks = How Firefox Screenshots Works
homePageGetStartedTitle = Get Started
# Note: Screenshots is an abbreviation for Firefox Screenshots, and should not be translated.
homePageGetStartedDescription = Find the new Screenshots icon on your toolbar. Select it, and the Screenshots menu will appear on top of your browser window.
# Note: Screenshots is an abbreviation for Firefox Screenshots, and should not be translated.
homePageGetStartedDescriptionPageAction = Select the Screenshots icon from the page actions menu in the address bar, and the Screenshots menu will appear on top of your browser window.
homePageCaptureRegion = Capture a Region
# Note: Screenshots is an abbreviation for Firefox Screenshots, and should not be translated.
homePageCaptureRegionDescription = Click and drag to select the area you want to capture. Or just hover and click — Screenshots will select the area for you. Like what you see? Select Save to access your screenshot online or the down arrow button to download it to your computer.
homePageCapturePage = Capture a Page
homePageCapturePageDescription = Use the buttons in the upper right to capture full pages. The Save Visible button will capture the area you can view without scrolling, and Save Full Page will capture everything on the page.
homePageSaveShare = Save and Share
# Note: Screenshots is an abbreviation for Firefox Screenshots, and should not be translated.
homePageShaveShareFavoriteDescription = Take your best shot. Then save it to the online Screenshots library, and Firefox copies the link to your clipboard for easy sharing. Shots in the library automatically expire after two weeks, but you can delete them at any time or choose to keep them longer.
homePageSignInTitle = Your Shots Everywhere
homePageSignInDescription = Sign in to Screenshots with your Firefox Account to access your shots everywhere you use Firefox. An added bonus: you can also save your favorite shots forever.
homePageLegalLink = Legal
homePagePrivacyLink = Privacy
homePageTermsLink = Terms
homePageCookiesLink = Cookies

## Leave Screenshots page

leavePageRemoveAllData = Remove All Data
# Note: do not translate 'Firefox Screenshots' when translating this string
leavePageErrorAuthRequired = You must have Firefox Screenshots installed or signed in to Firefox Account to delete your account
leavePageErrorGeneric = An error occurred
# Note: do not translate 'Firefox Screenshots' when translating this string
leavePageWarning = This will permanently erase all of your Firefox Screenshots data.
leavePageButtonProceed = Proceed
leavePageButtonCancel = Cancel
leavePageDeleted = All of your screenshots have been erased!

## Not Found page

notFoundPageTitle = Page Not Found
notFoundPageIntro = Oops.
notFoundPageDescription = Page not found.

## Shot page

# This is the HTML title tag of the page
shotPageTitle = Screenshot: { $originalTitle }
shotPageAlertErrorUpdatingExpirationTime = Error saving expiration
shotPageAlertErrorDeletingShot = Error deleting shot
shotPageAlertErrorUpdatingTitle = Error saving title
shotPageConfirmDelete = Are you sure you want to delete this shot permanently?
shotPageShareButton =
    .title = Share
shotPageCopyButton =
    .title = Copy image to clipboard
shotPageCopied = Copied
shotPageShareFacebook =
    .title = Share on Facebook
shotPageShareTwitter =
    .title = Share on Twitter
shotPageSharePinterest =
    .title = Share on Pinterest
shotPageShareEmail =
    .title = Share link via email
shotPageShareLink = Get a shareable link to this shot:
shotPagePrivacyMessage = Anyone with the link can view this shot.
shotPageCopyImageText =
    .label = Copy image text
shotPageConfirmDeletion = Are you sure you want to delete this shot permanently?
# Note: <timediff></timediff> is a placeholder for a future relative time clause like 'in 3 days' or 'tomorrow'
shotPageTimeExpirationMessage = If you do nothing, this shot will be permanently deleted <timediff></timediff>.
# Note: { $date } is a placeholder for a localized future date as returned by Date.toLocaleString.
# For example, in en-US, { $date } could be "7/12/2017, 1:52:50 PM".
shotPageRestoreButton = restore until { $date }
shotPageExpiredMessage = This shot has expired.
# Note: This phrase is followed by an empty line, then the URL of the source page
shotPageExpiredMessageDetails = Here is the page it was originally created from:
shotPageDeleteButton =
    .title = Delete this shot
shotPageDownloadShot =
    .title = Download
shotPageEditButton =
    .title = Edit this image
shotPagefavoriteButton =
    .title = Favorite this shot
shotPageBackToHomeButton =
    .title = Homepage
shotPageAllShotsButton =
    .title = All Shots
shotPageScreenshotsDescription = Screenshots made simple. Take, save, and share screenshots without leaving Firefox.
shotPageDMCAMessage = This shot is no longer available due to a third party intellectual property claim.
# Note: { $dmca } is a placeholder for a link to send email (a 'mailto' link)
shotPageDMCAContact = Please email { $dmca } to request further information.
# Note: do not translate 'Firefox Screenshots' when translating this string
shotPageDMCAWarning = If your Shots are subject to multiple claims, we may revoke your access to Firefox Screenshots.
# Note: { $url } is a placeholder for a shot page URL
shotPageDMCAIncludeLink = Please include the URL of this shot in your email: { $url }
shotPageKeepFor = How long should this shot be retained?
# Note: shotPageSelectTime is a placeholder label for the time selection dropdown.
shotPageSelectTime = Select time
# The ∞ is used to indicate that the shot won't expire. It is also used in
# shotIndexNoExpirationSymbol. Try to use the same symbol in both strings, or
# if no such symbol is available for a language/culture, simply leave it out.
shotPageKeepIndefinitelyWithSymbol = Indefinitely ∞
shotPageKeepTenMinutes = 10 Minutes
shotPageKeepOneHour = 1 Hour
shotPageKeepOneDay = 1 Day
shotPageKeepOneWeek = 1 Week
shotPageKeepTwoWeeks = 2 Weeks
shotPageKeepOneMonth = 1 Month
shotPageSaveExpiration = save
shotPageCancelExpiration = cancel
shotPageDoesNotExpire = does not expire
# Note: <timediff></timediff> is a placeholder for a future relative time clause, like "in 1 week" or "tomorrow"
shotPageTimeExpiresIn = expires <timediff></timediff>
# Note: <timediff></timediff> is a placeholder for a past relative time clause, like "1 week ago" or "yesterday"
shotPageTimeExpired = expired <timediff></timediff>
timeDiffJustNow = just now
timeDiffMinutesAgo = { $number ->
        [one] 1 minute ago
       *[other] { $number } minutes ago
    }
timeDiffHoursAgo = { $number ->
        [one] 1 hour ago
       *[other] { $number } hours ago
    }
timeDiffDaysAgo = { $number ->
        [one] yesterday
       *[other] { $number } days ago
    }
timeDiffFutureSeconds = in a few seconds
timeDiffFutureMinutes = { $number ->
        [one] in 1 minute
       *[other] in { $number } minutes
    }
timeDiffFutureHours = { $number ->
        [one] in 1 hour
       *[other] in { $number } hours
    }
timeDiffFutureDays = { $number ->
        [one] tomorrow
       *[other] in { $number } days
    }

errorThirdPartyCookiesEnabled = If you took this shot and cannot delete it, you may need to temporarily enable third party cookies from your browser’s preferences.

## Shot Page New Feature Promotion Dialog.
# Note: If possible, choose a short translation to better fit into the card.
promoTitle = Take Note!
promoMessage = Updated editing tools let you crop, highlight, and even add text to your shot.
promoLink = Give them a try
promoCloseButton =
    .title = Close notification

## Annotations

annotationPenButton =
    .title = Pen
annotationHighlighterButton =
    .title = Highlighter
annotationUndoButton =
    .title = Undo
annotationRedoButton =
    .title = Redo
annotationTextButton =
    .title = Add text
# Note: This button reverts all the changes on the image since the start of the editing session.
annotationClearButton =
    .title = Clear
annotationCropButton =
    .title = Crop
annotationSaveEditButton = Save
    .title = Save edit
annotationCancelEditButton = Cancel
    .title = Cancel editing
annotationCropConfirmButton = Confirm
    .title = Confirm selection
annotationCropCancelButton = Cancel
    .title = Cancel selection
annotationColorWhite =
    .title = White
annotationColorBlack =
    .title = Black
annotationColorRed =
    .title = Red
annotationColorGreen =
    .title = Green
annotationColorBlue =
    .title = Blue
annotationColorYellow =
    .title = Yellow
annotationColorPurple =
    .title = Purple
annotationColorSeaGreen =
    .title = Sea Green
annotationColorGrey =
    .title = Grey

# Note: annotationTextSize is a title for text size selection dropdown.
annotationTextSize =
    .title = Text size
# Values shown in text size selection dropdown
textSizeSmall = Small
textSizeMedium = Medium
textSizeLarge = Large
# Confirm and Cancel button title shown when using text tool
textToolConfirmButton = Confirm
    .title = Confirm
textToolCancelButton = Cancel
    .title = Cancel
# Default placeholder used in input field when adding text annotations
textToolInputPlaceholder =
    .placeholder = Hello

## The following are the title and message for an error displayed as a Firefox
## notification. It is triggered by an action in the shot page and the strings
## are passed from the shot page to the addon.

copyImageErrorTitle = Something went wrong
copyImageErrorMessage = Unable to copy your shot to the clipboard.

## Settings Page

settingsDisconnectButton = Disconnect
    .title = Disconnect
settingsGuestAccountMessage = Guest Account
settingsSignInInvite = Sign in to sync across devices
settingsSignInButton = Sign In
    .title = Sign in
SettingsPageHeader = Firefox Screenshots Settings
settingsDescription = You can sign in with Firefox Accounts to sync all your screenshots across devices and access them privately.
settingsPageSubHeader = Sync & Accounts
settingsClosePreferences =
    .title = Close preferences

## Shotindex page

# { $status } is a placeholder for an HTTP status code, like '500'.
# { $statusText } is a text description of the status code, like 'Internal server error'.
shotIndexPageErrorDeletingShot = Error deleting shot: { $status } { $statusText }
# { $searchTerm } is a placeholder for text the user typed into the search box
shotIndexPageSearchResultsTitle = My Shots: search for { $searchTerm }
# { $error } is a placeholder for a non-translated error message that could be shared
# with developers when debugging an error.
shotIndexPageErrorRendering = Error rendering page: { $error }
shotIndexPageSearchPlaceholder =
    .placeholder = Search my shots
shotIndexPageNoShotsMessage = No saved shots.
shotIndexPageNoShotsInvitation = Go on, create some.
shotIndexPageLookingForShots = Looking for your shots…
shotIndexPageNoSearchResultsIntro = Hmm
shotIndexPageNoSearchResults = We canʼt find any shots that match your search.
shotIndexPageMyShotsButton =
    .title = My Shots
shotIndexPageClearSearchButton =
    .title = Clear search
shotIndexPageConfirmShotDelete = Delete this shot?
shotIndexPagePreviousPage =
    .title = Previous page
shotIndexPageNextPage =
    .title = Next page
# This is tooltip for a "blank heart" symbol used in the upper top corner of the card for a shot on the
# My Shots page to indicate that the shot does expire.
shotIndexNonFavoriteIcon =
    .title = This is not a favorite shot and it will expire
# This is the tooltip for a "heart" symbol in the upper top corner of the
# card for a shot on the My Shots page. It indicate that the shot was marked as
# a favorite by the owner.
shotIndexFavoriteIcon =
    .title = This is a favorite shot and it does not expire
shotIndexSyncedShot =
    .title = Shot taken on another device
shotIndexAlertErrorFavoriteShot = Error updating favorite shot status

## Delete Confirmation Dialog

shotDeleteConfirmationMessage = Are you sure you want to delete this shot?
shotDeleteCancel = Cancel
    .title = Cancel
shotDeleteConfirm = Delete
    .title = Delete

## Metrics page
## All metrics strings are optional for translation

# Note: 'Firefox Screenshots' should not be translated
metricsPageTitle = Firefox Screenshots Metrics
metricsPageTotalsQueryTitle = Totals
# Note: Screenshots is an abbreviation for Firefox Screenshots, and should not be translated.
metricsPageTotalsQueryDescription = An overview of Screenshots
metricsPageTotalsQueryDevices = Total devices registered
metricsPageTotalsQueryActiveShots = Active shots
metricsPageTotalsQueryExpiredShots = Expired (but recoverable)
metricsPageTotalsQueryExpiredDeletedShots = Expired (and deleted)
metricsPageShotsQueryTitle = Shots by Day
metricsPageShotsQueryDescription = Number of shots created each day (for the last 30 days)
metricsPageShotsQueryCount = Number of shots
metricsPageShotsQueryDay = Day
metricsPageUsersQueryTitle = Users by Day
metricsPageUsersQueryDescription = Number of users who created at least one shot, by day (last 30 days)
metricsPageUsersQueryCount = Number of users
metricsPageUsersQueryDay = Day
metricsPageUserShotsQueryTitle = Number of Shots per User
metricsPageUserShotsQueryDescription = The number of users who have about N total shots
metricsPageUserShotsQueryCount = Number of users
metricsPageUserShotsQueryShots = Approximate number of active (unexpired) shots
metricsPageRetentionQueryTitle = Retention by Week
metricsPageRetentionQueryDescription = Number of days from a userʼs first shot to most recent shot, grouped by starting week
metricsPageRetentionQueryUsers = Number of users
metricsPageRetentionQueryDays = Days from the userʼs first to most recent shot
metricsPageRetentionQueryFirstWeek = Week the user first created a shot
metricsPageTotalRetentionQueryTitle = Total Retention
metricsPageTotalRetentionQueryDescription = Length of time users have been creating shots, grouped by week
metricsPageTotalRetentionQueryUsers = Number of users
metricsPageTotalRetentionQueryDays = Days the user has been creating shots
metricsPageVersionQueryTitle = Add-on Version
metricsPageVersionQueryDescription = The version of the add-on used during login, in the last 14 days
metricsPageVersionQueryUsers = Number of users logging in
metricsPageVersionQueryVersion = Add-on version
metricsPageVersionQueryLastSeen = Day
metricsPageHeader = Metrics
# Note: { $created } is a placeholder for a localized date and time, like '4/21/2017, 3:40:04 AM'
metricsPageGeneratedDateTime = Generated at: { $created }
# Note { $time } is a placeholder for a number of milliseconds, like '100'
metricsPageDatabaseQueryTime = (database time: { $time }ms)
