### Localization for Server-side strings of Firefox Screenshots
### Please don't localize Firefox, Firefox Screenshots, or Screenshots


## Global phrases shared across pages, prefixed with 'g'

gMyShots = हमर शॉट
gHomeLink = होम
gNoShots =
    .alt = कोनो शॉट नहि भेटल
gScreenshotsDescription = स्क्रीन शॉट आसान बनाएल गेल. बिनु फ़ायरफॉक्स छोड़ेने शॉट लिअ, सहेजू, आओर सहेजू.

## Footer

# Note: link text for a link to mozilla.org
footerLinkMozilla = Mozilla
footerLinkTerms = शर्त
footerLinkPrivacy = गोपनीयता सूचना
footerLinkFaqs = अक्सर पूछल जाए बला प्रश्न
footerLinkDMCA = रिपोर्ट IP उल्लंघन
footerLinkDiscourse = प्रतिक्रिया दिअ
footerLinkRemoveAllData = सभ डेटा मेटाबू

## Creating page

# Note: { $title } is a placeholder for the title of the web page
# captured in the screenshot. The default, for pages without titles, is
# creatingPageTitleDefault.
creatingPageTitle = { $title } बनओनाइ
creatingPageTitleDefault = पेज
creatingPageWaitMessage = अहाँक शॉट सहेजि रहल अछि...

## Home page

homePageDescription =
    .content = सहज ज्ञान युक्त सही ब्राउज़र मे बेक्ड स्क्रीनशॉट. कैप्चर करू, सहेजू आओर शेयर स्क्रीनशॉट क रूप मे अहाँ Firefox क उपयोग कएक वेब ब्राउज़ करू.
homePageButtonMyShots = हमर शॉट्स पर जाउ
homePageTeaser = जल्दी आए रहल अछि...
homePageDownloadFirefoxTitle = Firefox
homePageDownloadFirefoxSubTitle = मुफ्त डाउनलोड
homePageGetStarted = प्रारंभ करू
# Note: do not translate 'Firefox Screenshots' when translating this string
homePageHowScreenshotsWorks = Firefox स्क्रीनशॉट कओन तरहें काज करैत अछि
homePageGetStartedTitle = प्रारंभ करू
homePageCaptureRegion = एकटा क्षेत्र कैप्चर करू
homePageCapturePage = एकटा पेज कैप्चर करू
homePageSaveShare = सहेजू आओर साझा करू
homePageLegalLink = वैध
homePagePrivacyLink = गोपनीयता
homePageTermsLink = शर्त
homePageCookiesLink = कुकीज़

## Leave Screenshots page

leavePageRemoveAllData = सभ डेटा मेटाबू
leavePageErrorGeneric = एकटा त्रुटि उत्पन्न भेल
leavePageButtonProceed = आगाँ जाउ
leavePageButtonCancel = रद्द करू

## Not Found page

notFoundPageTitle = पेज नहि भेटल
notFoundPageIntro = ओह
notFoundPageDescription = पेज नहि भेटल

## Shot page

# This is the HTML title tag of the page
shotPageTitle = स्क्रीनशॉट: { $originalTitle }
shotPageAlertErrorUpdatingExpirationTime = समाप्ति क बचत करए मे त्रुटि
shotPageAlertErrorDeletingShot = शॉट मेटाबै मे त्रुटि
shotPageAlertErrorUpdatingTitle = शीर्षक सहेजए मे त्रुटि
shotPageConfirmDelete = की अहाँ वाकई ई शॉट केँ मेटाबै लेल चाहैत छी?
shotPageShareButton =
    .title = साझा
shotPageCopy = कॉपी करू
shotPageCopied = कॉपी कएल गेल
shotPageShareFacebook =
    .title = Facebook पर साझा करू
shotPageShareTwitter =
    .title = Twitter पर साझा करू
shotPageSharePinterest =
    .title = Pinterest पर साझा करू
shotPageShareEmail =
    .title = ईमेल द्वारा लिंक साझा करू
shotPageShareLink = ई शॉट लेल एकटा साझा करए लायक लिंक पाबू.
shotPagePrivacyMessage = लिंक द्वारा केओ भी ई शॉट केँ देखि सकैत अछि.
shotPageCopyImageText =
    .label = फोटो टेक्स्ट कॉपी करू
shotPageConfirmDeletion = की अहाँ वाकई ई शॉट केँ हमेशा लेल मेटाबै चाहैत छी?
# Note: shotPageSelectTime is a placeholder label for the time selection dropdown.
shotPageSelectTime = समय चुनू
# The ∞ is used to indicate that the shot won't expire. It is also used in
# shotIndexNoExpirationSymbol. Try to use the same symbol in both strings, or
# if no such symbol is available for a language/culture, simply leave it out.
shotPageKeepIndefinitelyWithSymbol = अनिश्चितकाल ∞
shotPageKeepTenMinutes = 10 मिनट
shotPageKeepOneHour = 1 घंटा
shotPageKeepOneDay = 1 दिन
shotPageKeepOneWeek = 1 सप्ताह
shotPageKeepTwoWeeks = 2 सप्ताह
shotPageKeepOneMonth = 1 महिना
shotPageSaveExpiration = सहेजू
shotPageCancelExpiration = कैंसिल करू
shotPageDoesNotExpire = समाप्त नहि हए अछि
# Note: { $timediff } is a placeholder for a future relative time clause, like "in 1 week" or "tomorrow"
shotPageExpiresIn = { $timediff } समय सीमा समाप्त
# Note: { $timediff } is a placeholder for a past relative time clause, like "1 week ago" or "yesterday"
shotPageExpired = { $timediff } समाप्त
timeDiffJustNow = एखन एखन
timeDiffMinutesAgo =
    { $number ->
        [one] 1 मिनट पहले 
       *[other] { $number } मिनट पहले
    }
timeDiffHoursAgo =
    { $number ->
        [one] 1 घंटा पहले 
       *[other] { $number } घंटा पहले
    }
timeDiffDaysAgo =
    { $number ->
        [one] काल्हि
       *[other] { $number }  दिन पहले
    }
timeDiffFutureSeconds = कनिके काल मे
timeDiffFutureMinutes =
    { $number ->
        [one] 1 मिनट मे
       *[other] { $number } मिनट मे
    }
timeDiffFutureHours =
    { $number ->
        [one] 1 घंटा मे
       *[other] { $number } घंटा मे
    }
timeDiffFutureDays =
    { $number ->
        [one] काल्हि
       *[other] { $number } दिन मे
    }
errorThirdPartyCookiesEnabled = जँ अहा ई शॉट लेने छथि आओर एकरा मेटाए नहि पाबि रहल छी, तँ अहाँ केँ अपन ब्रॉउज़र प्रेफरेंश मे जाए क अस्थायी रूप सँ तेसर पार्टी कुकीज़ सक्रिय करै हाएत.

## Annotations

annotationPenButton =
    .title = पेन
annotationHighlighterButton =
    .title = हाइलाइटर
# Note: This button reverts all the changes on the image since the start of the editing session.
annotationClearButton =
    .title = साफ करू
annotationCropButton =
    .title = क्रॉप करू
annotationSaveEditButton = सहेजू
    .title = संपादन सहेजू
annotationCancelEditButton = कैंसिल करू
    .title = संपादन कैंसिल करू
annotationCropConfirmButton = पुष्टि करू
    .title = चयन क पुष्टि करू
annotationCropCancelButton = कैंसिल करू
    .title = चयन कैंसिल करू
annotationColorWhite =
    .title = उज्जर
annotationColorBlack =
    .title = करिया
annotationColorRed =
    .title = लाल
annotationColorGreen =
    .title = हरिअर
annotationColorBlue =
    .title = नीला
annotationColorYellow =
    .title = पिअर
annotationColorPurple =
    .title = बैंगनी
annotationColorSeaGreen =
    .title = समुद्री हरिअर
annotationColorGrey =
    .title = भूरा

## Settings Page

settingsDisconnectButton = कनेक्शन हटाबू
    .title = कनेक्शन हटाबू
settingsGuestAccountMessage = अतिथि क खाता
settingsSignInButton = साइन इन करू
    .title = साइन इन करू
SettingsPageHeader = Firefox Screenshots सेटिंग्स
settingsPageSubHeader = सिंक & खाता 
settingsClosePreferences =
    .title = वरीयता बन्न करू

## Shotindex page

# { $status } is a placeholder for an HTTP status code, like '500'.
# { $statusText } is a text description of the status code, like 'Internal server error'.
shotIndexPageErrorDeletingShot = शॉट हटाबै मे त्रुटि: { $status } { $statusText }
# { $searchTerm } is a placeholder for text the user typed into the search box
shotIndexPageSearchResultsTitle = हमर शॉट: कलेल खोज करू { $searchTerm }
# { $error } is a placeholder for a non-translated error message that could be shared
# with developers when debugging an error.
shotIndexPageErrorRendering = रेंडरिंग पेज त्रुटि: { $error }

## Delete Confirmation Dialog


## Metrics page
## All metrics strings are optional for translation

