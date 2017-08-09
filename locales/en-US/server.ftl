// Localization for Server-side strings of Firefox Screenshots
//
// Please don't localize Firefox, Firefox Screenshots, or Screenshots



// Global phrases shared across pages, prefixed with 'g'
[[ global ]]

gMyShots = My Shots
gHomeLink = Home
gNoShots
    .alt = No shots found
gScreenshotsDescription = Screenshots made simple. Take, save, and share screenshots without leaving Firefox.

[[ Footer ]]

// Note: link text for a link to mozilla.org
footerLinkMozilla = Mozilla
footerLinkTerms = Terms
footerLinkPrivacy = Privacy Notice
footerLinkDMCA = Report IP Infringement
footerLinkDiscourse = Give Feedback
footerLinkRemoveAllData = Remove All Data

[[ Creating page ]]

// Note: { $title } is a placeholder for the title of the web page
// captured in the screenshot. The default, for pages without titles, is
// creatingPageTitleDefault.
creatingPageTitle = Creating { $title }
creatingPageTitleDefault = page
creatingPageWaitMessage = Saving your shot…


[[ Home page ]]

homePageDescription
    .content = Intuitive screenshots baked right into the browser. Capture, save and share screenshots as you browse the Web using Firefox.
homePageButtonMyShots = Go To My Shots
homePageTeaser = Coming Soon…
homePageDownloadFirefoxTitle = Firefox
homePageDownloadFirefoxSubTitle = Free Download
homePageGetStarted = Get Started
// Note: do not translate 'Firefox Screenshots' when translating this string
homePageHowScreenshotsWorks = How Firefox Screenshots Works
homePageGetStartedTitle = Get Started
// Note: Screenshots is an abbreviation for Firefox Screenshots, and should not be translated.
homePageGetStartedDescription = Find the new Screenshots icon on your toolbar. Select it, and the Screenshots menu will appear on top of your browser window.
homePageCaptureRegion = Capture a Region
// Note: Screenshots is an abbreviation for Firefox Screenshots, and should not be translated.
homePageCaptureRegionDescription = Click and drag to select the area you want to capture. Or just hover and click — Screenshots will select the area for you. Like what you see? Select Save to access your screenshot online or the down arrow button to download it to your computer.
homePageCapturePage = Capture a Page
homePageCapturePageDescription = Use the buttons in the upper right to capture full pages. The Save Visible button will capture the area you can view without scrolling, and Save Full Page will capture everything on the page.
homePageSaveShare = Save and Share
// Note: Screenshots is an abbreviation for Firefox Screenshots, and should not be translated.
homePageSaveShareDescription = When you take a shot, Firefox posts your screenshot to your online Screenshots library and copies the link to your clipboard. We automatically store your screenshot for two weeks, but you can delete shots at any time or change the expiration date to keep them in your library for longer.
homePageLegalLink = Legal
homePagePrivacyLink = Privacy
homePageTermsLink = Terms
homePageCookiesLink = Cookies


[[ Leave Screenshots page ]]

leavePageRemoveAllData = Remove All Data
// Note: do not translate 'Firefox Screenshots' when translating this string
leavePageErrorAddonRequired = You must have Firefox Screenshots installed to delete your account
leavePageErrorGeneric = An error occurred
// Note: do not translate 'Firefox Screenshots' when translating this string
leavePageWarning = This will permanently erase all of your Firefox Screenshots data.
leavePageButtonProceed = Proceed
leavePageButtonCancel = Cancel
leavePageDeleted = All of your screenshots have been erased!


[[ Not Found page ]]

notFoundPageTitle = Page Not Found
notFoundPageIntro = Oops.
notFoundPageDescription = Page not found.


[[ Shot page ]]

// This is the HTML title tag of the page
shotPageTitle = Screenshot: { $originalTitle }
shotPageAlertErrorUpdatingExpirationTime = Error saving expiration
shotPageAlertErrorDeletingShot = Error deleting shot
shotPageAlertErrorUpdatingTitle = Error saving title
shotPageConfirmDelete = Are you sure you want to delete this shot permanently?
shotPageShareButton
    .title = Share
shotPageCopy = Copy
shotPageCopied = Copied
shotPageShareFacebook
    .title = Share on Facebook
shotPageShareTwitter
    .title = Share on Twitter
shotPageSharePinterest
    .title = Share on Pinterest
shotPageShareEmail
    .title = Share link via email
shotPageShareLink = Get a shareable link to this shot:
shotPagePrivacyMessage = Anyone with the link can view this shot.
shotPageCopyImageText
    .label = Copy image text
shotPageConfirmDeletion = Are you sure you want to delete this shot permanently?
// Note: { $timediff } is a placeholder for a future relative time clause like 'in 3 days' or 'tomorrow'
shotPageExpirationMessage = If you do nothing, this shot will be permanently deleted { $timediff }.
// Note: { $date } is a placeholder for a localized future date as returned by Date.toLocaleString.
// For example, in en-US, { $date } could be "7/12/2017, 1:52:50 PM".
shotPageRestoreButton = restore until { $date }
shotPageExpiredMessage = This shot has expired.
// Note: This phrase is followed by an empty line, then the URL of the source page
shotPageExpiredMessageDetails = Here is the page it was originally created from:
shotPageDeleteButton
    .title = Delete this shot
shotPageAbuseButton
    .title = Report this shot for abuse, spam, or other problems
shotPageDownloadShot
    .title = Download
shotPageDownload = Download
shotPageScreenshotsDescription = Screenshots made simple. Take, save, and share screenshots without leaving Firefox.
shotPageUpsellFirefox = Get Firefox now
shotPageDMCAMessage = This shot is no longer available due to a third party intellectual property claim.
// Note: { $dmca } is a placeholder for a link to send email (a 'mailto' link)
shotPageDMCAContact = Please email { $dmca } to request further information.
// Note: do not translate 'Firefox Screenshots' when translating this string
shotPageDMCAWarning = If your Shots are subject to multiple claims, we may revoke your access to Firefox Screenshots.
// Note: { $url } is a placeholder for a shot page URL
shotPageDMCAIncludeLink = Please include the URL of this shot in your email: { $url }
shotPageKeepFor = How long should this shot be retained?
// Note: shotPageSelectTime is a placeholder label for the time selection dropdown.
shotPageSelectTime = Select time
shotPageKeepIndefinitely = Indefinitely
shotPageKeepTenMinutes = 10 Minutes
shotPageKeepOneHour = 1 Hour
shotPageKeepOneDay = 1 Day
shotPageKeepOneWeek = 1 Week
shotPageKeepTwoWeeks = 2 Weeks
shotPageKeepOneMonth = 1 Month
shotPageSaveExpiration = save
shotPageCancelExpiration = cancel
shotPageDoesNotExpire = does not expire
// Note: { $timediff } is a placeholder for a future relative time clause, like "in 1 week" or "tomorrow"
shotPageExpiresIn = expires { $timediff }
// Note: { $timediff } is a placeholder for a past relative time clause, like "1 week ago" or "yesterday"
shotPageExpired = expired { $timediff }
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


[[ Shotindex page ]]

// { $status } is a placeholder for an HTTP status code, like '500'.
// { $statusText } is a text description of the status code, like 'Internal server error'.
shotIndexPageErrorDeletingShot = Error deleting shot: { $status } { $statusText }
// { $searchTerm } is a placeholder for text the user typed into the search box
shotIndexPageSearchResultsTitle = My Shots: search for { $searchTerm }
// { $error } is a placeholder for a non-translated error message that could be shared
// with developers when debugging an error.
shotIndexPageErrorRendering = Error rendering page: { $error }
shotIndexPageSearchPlaceholder
    .placeholder = Search my shots
shotIndexPageSearchButton
    .title = Search
shotIndexPageNoShotsMessage = No saved shots.
shotIndexPageNoShotsInvitation = Go on, create some.
shotIndexPageLookingForShots = Looking for your shots…
shotIndexPageNoSearchResultsIntro = Hmm
shotIndexPageNoSearchResults = We canʼt find any shots that match your search.
shotIndexPageClearSearchButton
    .title = Clear search
shotIndexPageConfirmShotDelete = Delete this shot?


// all metrics strings are optional for translation
[[ Metrics page ]]

// Note: 'Firefox Screenshots' should not be translated
metricsPageTitle = Firefox Screenshots Metrics
metricsPageTotalsQueryTitle = Totals
// Note: Screenshots is an abbreviation for Firefox Screenshots, and should not be translated.
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
// Note: { $created } is a placeholder for a localized date and time, like '4/21/2017, 3:40:04 AM'
metricsPageGeneratedDateTime = Generated at: { $created }
// Note { $time } is a placeholder for a number of milliseconds, like '100'
metricsPageDatabaseQueryTime = (database time: { $time }ms)
