// Localization for Server-side strings of Firefox Screenshots
// 
// Please don't localize Firefox, Firefox Screenshots, or Screenshots



// Global phrases shared across pages, prefixed with 'g'
[[ global ]]

gMyShots = నా తెరపట్లు
gHomeLink = ముంగిలి
gNoShots
    .alt = తెరపట్లు కనుగొనబడలేదు


[[ Footer ]]

// Note: link text for a link to mozilla.org
footerLinkMozilla = Mozilla
footerLinkPrivacy = గోప్యతా విధానం
footerLinkDiscourse = అభిప్రాయం తెలియజేయండి


[[ Creating page ]]

// Note: { $title } is a placeholder for the title of the web page
// captured in the screenshot. The default, for pages without titles, is
// creatingPageTitleDefault.
creatingPageTitle = { $title } సృష్టిస్తోంది
creatingPageTitleDefault = పేజీ


[[ Home page ]]

homePageButtonMyShots = నా తెరపట్లకు వెళ్ళండి
homePageTeaser = త్వరలో వస్తుంది...
homePageDownloadFirefoxTitle = Firefox
homePageDownloadFirefoxSubTitle = ఉచిత దిగుమతులు
homePageGetStarted = మొదలుపెట్టండి
// Note: do not translate 'Firefox Screenshots' when translating this string
homePageHowScreenshotsWorks = Firefox Screenshots ఎలాపని చేస్తాయి
homePageGetStartedTitle = మొదలుపెట్టండి
homePageCaptureRegion = ఒక ప్రాంతాన్ని క్యాప్చర్ చేయండి
homePageCapturePage = ఒక పేజీని క్యాప్చర్ చేయండి
homePageSaveShare = భద్రపరుచు మరియు పంచుకో
homePageLegalLink = చట్టపరమైన
homePagePrivacyLink = గోప్యం
homePageTermsLink = నియమాలు
homePageCookiesLink = కుకీలు


[[ Leave Screenshots page ]]

leavePageConfirmDelete = ఖాతా తొలగింపును నిర్ధారించండి
leavePageErrorGeneric = ఒక దోషం ఏర్పడింది.
// Note: do not translate 'Firefox Screenshots' when translating this string
leavePageWarning = ఇది మీ Firefox స్క్రీన్షాట్ల డేటాను శాశ్వతంగా తుడిచి వేస్తుంది.
leavePageButtonProceed = కొనసాగండి
leavePageButtonCancel = రద్దుచేయి
leavePageDeleted = మీ అన్ని తెరపట్లు తొలగించబడ్డాయి!


[[ Not Found page ]]

notFoundPageTitle = పేజీ కనుగొనబడలేదు
notFoundPageIntro = అయ్యో.
notFoundPageDescription = పేజీ కనుగొనబడలేదు


[[ Shot page ]]

// This is the HTML title tag of the page
shotPageTitle = తెరపట్టు: { $originalTitle }
shotPageAlertErrorUpdatingExpirationTime = గడువు పొదుపు చేయడంలో లోపం
shotPageAlertErrorDeletingShot = తెరపట్లు తొలగించడంలో లోపం
shotPageAlertErrorUpdatingTitle = శీర్షిక బద్రపరచడంలో లోపం
shotPageConfirmDelete = మీరు ఖచ్చితంగా ఈ తెరపట్టును శాశ్వతంగా తొలగించాలనుకుంటున్నారా?
shotPageShareButton
    .title = పంచుకోండి
shotPageCopy = నకలుతీయి
shotPageCopied = నకలు చేయబడింది
shotPageShareFacebook
    .title = Facebookలో పంచుకోండి
shotPageShareTwitter
    .title = Twitterలో పంచుకోండి
shotPageSharePinterest
    .title = Pinterestలో పంచుకోండి
shotPageShareEmail
    .title = ఇమెయిల్ ద్వారా లింక్ను పంచుకోండి
shotPageShareLink = ఈ తెరపట్టు పంచుకునేందుకు లంకెను పొందండి:
shotPagePrivacyMessage = లంకె ఉన్న ఎవరైనా ఈ తెరపట్టును వీక్షించగలరు.
shotPageCopyImageText
    .label = చిత్రం వచనాన్ని నకలు చేయండి
shotPageConfirmDeletion = మీరు ఖచ్చితంగా ఈ తెరపట్టును శాశ్వతంగా తొలగించాలనుకుంటున్నారా?
// Note: { $timediff } is a placeholder for a future relative time clause like 'in 3 days' or 'tomorrow'
shotPageExpirationMessage = మీరు ఏమీ చేయకపోతే, ఈ తెరపట్టు శాశ్వతంగా తొలగించబడుతుంది { $timediff }.
// Note: { $date } is a placeholder for a localized future date as returned by Date.toLocaleString.
// For example, in en-US, { $date } could be "7/12/2017, 1:52:50 PM".
shotPageRestoreButton = { $date } వరకు పునరుద్ధరించండి
shotPageExpiredMessage = ఈ తెరపట్టు గడువు ముగిసింది.
// Note: This phrase is followed by an empty line, then the URL of the source page
shotPageExpiredMessageDetails = ఇది మొదట సృష్టించబడిన పేజీ:
shotPageDeleteButton
    .title = ఈ తెరపట్టును తొలగించండి
shotPageAbuseButton
    .title = దుర్వినియోగం, స్పామ్ లేదా ఇతర సమస్యలకు ఈ తెరపట్టును నివేదించండి
shotPageDownloadShot
    .title = దిగుమతి
shotPageDownload = దిగుమతి
shotPageScreenshotsDescription = తెరపట్లు సులభతరమైనాయి. Firefoxను వదలకుండా తెరపట్లను తీసుకోండి,  భద్రపరచండి మరియు పంచుకోండి.
shotPageUpsellFirefox = ఇప్పుడు Firefoxను పొందండి
shotPageKeepFor = ఎంతకాలం ఈ షాట్ నిలబెట్టుకోవాలి?
// Note: shotPageSelectTime is a placeholder label for the time selection dropdown.
shotPageSelectTime = సమయాన్ని ఎంచుకోండి
shotPageKeepIndefinitely = నిరంతరంగా
shotPageKeepTenMinutes = 10 నిమిషాలు
shotPageKeepOneHour = 1 గంట
shotPageKeepOneDay = 1 రోజు
shotPageKeepOneWeek = 1 వారం
shotPageKeepTwoWeeks = 2 వారాలు
shotPageKeepOneMonth = 1 నెల
shotPageSaveExpiration = బద్రపరుచు
shotPageCancelExpiration = రద్దుచేయు
shotPageDoesNotExpire = గడువు లేదు
// Note: { $timediff } is a placeholder for a future relative time clause, like "in 1 week" or "tomorrow"
shotPageExpiresIn = { $timediff } గడువు ముగుస్తుంది
// Note: { $timediff } is a placeholder for a past relative time clause, like "1 week ago" or "yesterday"
shotPageExpired = { $timediff } గడువు ముగిసింది 
timeDiffJustNow = ఇప్పుడే
timeDiffMinutesAgo = { $num ->
        [one] 1 నిమిషం క్రితం
       *[other] { $number } నిమిషాల ముందు
    }
timeDiffHoursAgo = { $num ->
        [one] 1 గంట క్రితం
       *[other] { $number } గంటల క్రితం
    }
timeDiffDaysAgo = { $num ->
        [one] నిన్న
       *[other] { $number } రోజుల క్రితం
    }
timeDiffFutureSeconds = కొన్ని క్షాణాలలో
timeDiffFutureMinutes = { $num ->
        [one] 1 నిమిషం
       *[other] { $number } నిమిషాల్లో
    }
timeDiffFutureHours = { $num ->
        [one] 1 గంటలో
       *[other] { $number } గంటలలో
    }
timeDiffFutureDays = { $num ->
        [one] రేపు
       *[other] { $number } రోజులలో
    }


[[ Shotindex page ]]

// { $status } is a placeholder for an HTTP status code, like '500'.
// { $statusText } is a text description of the status code, like 'Internal server error'.
shotIndexPageErrorDeletingShot = షాట్ను తొలగించడంలో లోపం: { $status } { $statusText }
shotIndexPageSearchPlaceholder
    .placeholder = నా షాట్లు శోధించండి
shotIndexPageSearchButton
    .title = వెతకండి
shotIndexPageNoShotsMessage = భద్రపరచిన షాట్లు లేవు.
shotIndexPageNoShotsInvitation = కొనసాగి, కొన్నింటిని సృష్టించండి.
shotIndexPageNoSearchResultsIntro = హ్మ్మ్
shotIndexPageClearSearchButton
    .title = స్పష్టమైన శోధన
shotIndexPageConfirmShotDelete = ఈ షాట్ను తొలగించాలా?


// all metrics strings are optional for translation
[[ Metrics page ]]

metricsPageTotalsQueryTitle = మొత్తాలు
// Note: Screenshots is an abbreviation for Firefox Screenshots, and should not be translated.
metricsPageTotalsQueryDescription = తెరపట్ల యొక్క అవలోకనం
metricsPageTotalsQueryDevices = నమోదు చేయబడిన మొత్తం పరికరాలు
metricsPageTotalsQueryActiveShots = సక్రియ షాట్లు
metricsPageTotalsQueryExpiredShots = గడువు ముగిసింది (కానీ పునరుద్ధరించవచ్చు)
metricsPageTotalsQueryExpiredDeletedShots = గడువు ముగిసింది (మరియు తొలగించబడింది)
metricsPageShotsQueryCount = షాట్ల సంఖ్య
metricsPageShotsQueryDay = రోజు
metricsPageUsersQueryTitle = రొజు వారి వినియోగదారులు
metricsPageUsersQueryCount = వాడుకరులు సంఖ్య
metricsPageUsersQueryDay = రోజు
metricsPageUserShotsQueryCount = వాడుకరులు సంఖ్య
metricsPageRetentionQueryTitle = వారానికి నిలుపుదల
metricsPageRetentionQueryUsers = వాడుకరులు సంఖ్య
metricsPageRetentionQueryFirstWeek = వినియోగదారుడు మొదట షాట్ను సృష్టించిన వారము
metricsPageTotalRetentionQueryTitle = పుర్తి నిలుపుదల
metricsPageTotalRetentionQueryUsers = వాడుకరులు సంఖ్య
metricsPageTotalRetentionQueryDays = వినియోగదారుడు షాట్లు సృష్టించే రోజులు
metricsPageVersionQueryTitle = పొడిగింత వెర్షన్
metricsPageVersionQueryUsers = లాగిన్ చేసిన వాడుకరుల సంఖ్య
metricsPageVersionQueryVersion = పొడిగింత వెర్షన్
metricsPageVersionQueryLastSeen = రోజు
metricsPageHeader = కొలమానములు
// Note: { $created } is a placeholder for a localized date and time, like '4/21/2017, 3:40:04 AM'
metricsPageGeneratedDateTime = రూపొందించబడినది: { $created }
// Note { $time } is a placeholder for a number of milliseconds, like '100'
metricsPageDatabaseQueryTime = (డేటాబేస్ సమయం:  { $time }ms)
