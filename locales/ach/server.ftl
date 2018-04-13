### Localization for Server-side strings of Firefox Screenshots
### Please don't localize Firefox, Firefox Screenshots, or Screenshots


## Global phrases shared across pages, prefixed with 'g'

gHomeLink = Gang

## Footer

# Note: link text for a link to mozilla.org
footerLinkMozilla = Mozilla
footerLinkTerms = Cik
footerLinkPrivacy = Ngec me mung
footerLinkDiscourse = Mi Adwogi
footerLinkRemoveAllData = Kwany data weng

## Creating page

# Note: { $title } is a placeholder for the title of the web page
# captured in the screenshot. The default, for pages without titles, is
# creatingPageTitleDefault.
creatingPageTitle = Cweyo { $title }
creatingPageTitleDefault = potbuk

## Home page

homePageTeaser = Cok Bino
homePageDownloadFirefoxTitle = Firefox
homePageDownloadFirefoxSubTitle = Gam me nono
homePageGetStarted = Caki
# Note: do not translate 'Firefox Screenshots' when translating this string
homePageHowScreenshotsWorks = Kit ma Firefox Screenshots Tiyo Kede
homePageGetStartedTitle = Caki
# Note: Screenshots is an abbreviation for Firefox Screenshots, and should not be translated.
homePageGetStartedDescription = Nong cal Screenshots manyen i gitic mamegi. Yer, ka jami ayera me Screenshots bi nyute i wii dirica me layeny mamegi.
# Note: Screenshots is an abbreviation for Firefox Screenshots, and should not be translated.
homePageGetStartedDescriptionPageAction = Yer cal me Screenshots ki i jami ayera me potbuk ma i lanyut me kanonge, ka jami ayera me Screenshots bi nyute iwi dirica me layeny mamegi.
homePageCaptureRegion = Mak bute
homePageCapturePage = mak potbuk
homePageSaveShare = Gwokki ki Nywaki
homePageLegalLink = Cik
homePagePrivacyLink = Mung
homePageTermsLink = Cik
homePageCookiesLink = Angija

## Leave Screenshots page

leavePageRemoveAllData = Kwany Data weng
# Note: do not translate 'Firefox Screenshots' when translating this string
leavePageErrorAddonRequired = Myero ibed ki Firefox Screenshots ma kiketo me kwanyo akaunt mamegi
leavePageErrorGeneric = Bal otime
# Note: do not translate 'Firefox Screenshots' when translating this string
leavePageWarning = Man bi jwayo data ni weng me Firefox Screenshots matwal.
leavePageButtonProceed = Mede
leavePageButtonCancel = Kwer

## Not Found page

notFoundPageTitle = Potbuk pe ononge
notFoundPageIntro = Oops.
notFoundPageDescription = Potbuk pe ononge.

## Shot page

shotPageAlertErrorUpdatingTitle = Bal i gwoko wiye
shotPageShareButton =
    .title = Poki
shotPageCopy = Loki
shotPageCopied = Kiloko
shotPageShareFacebook =
    .title = Poki i Facebook
shotPageShareTwitter =
    .title = Poki i Twitter
shotPageSharePinterest =
    .title = poki i pinterest
shotPageShareEmail =
    .title = Nywak kakube i email
shotPageCopyImageText =
    .label = Lok coc me cal
# Note: { $date } is a placeholder for a localized future date as returned by Date.toLocaleString.
# For example, in en-US, { $date } could be "7/12/2017, 1:52:50 PM".
shotPageRestoreButton = dwoki naka wa { $date }
# Note: This phrase is followed by an empty line, then the URL of the source page
shotPageExpiredMessageDetails = Man aye potbuk ma ki cweyo ki iye wiya atii:
shotPageDownloadShot =
    .title = Gam
shotPageEditButton =
    .title = Yub cal man
shotPageDownload = Gam
shotPageUpsellFirefox = Nong Firefox Kombedi
# Note: { $dmca } is a placeholder for a link to send email (a 'mailto' link)
shotPageDMCAContact = Tim ber i cwal email bot { $dmca } me penyo pi ngec mapol.
# Note: shotPageSelectTime is a placeholder label for the time selection dropdown.
shotPageSelectTime = Yer cawa
# The ∞ is used to indicate that the shot won't expire. It is also used in
# shotIndexNoExpirationSymbol. Try to use the same symbol in both strings, or
# if no such symbol is available for a language/culture, simply leave it out.
shotPageKeepIndefinitelyWithSymbol = Matwal ∞
shotPageKeepTenMinutes = Tekika 10
shotPageKeepOneHour = Cawa 1
shotPageKeepOneDay = Nino 1
shotPageKeepOneWeek = Cabit 1
shotPageKeepTwoWeeks = Cabit 2
shotPageKeepOneMonth = Dwe 1
shotPageSaveExpiration = gwoki
shotPageCancelExpiration = kwer
shotPageDoesNotExpire = pe bale
# Note: { $timediff } is a placeholder for a future relative time clause, like "in 1 week" or "tomorrow"
shotPageExpiresIn = kare ne okato { $timediff }
# Note: { $timediff } is a placeholder for a past relative time clause, like "1 week ago" or "yesterday"
shotPageExpired = kare ne okato { $timediff }
timeDiffJustNow = Pud kombedi
timeDiffMinutesAgo =
    { $number ->
        [one] tekika 1 mukato angec
       *[other] tekika { $number } mukato angec
    }
timeDiffHoursAgo =
    { $number ->
        [one] Cawa 1 mukato angec
       *[other] cawa { $number } mukato angec
    }
timeDiffDaysAgo =
    { $number ->
        [one] Lawo
       *[other] nino { $number }  mukato angec
    }
timeDiffFutureSeconds = i secon manok
timeDiffFutureMinutes =
    { $number ->
        [one] i tekika 1
       *[other] i  tekika { $number }
    }
timeDiffFutureHours =
    { $number ->
        [one] i cawa 1
       *[other] i cawa { $number }
    }
timeDiffFutureDays =
    { $number ->
        [one] diki
       *[other] i nino { $number } 
    }

## Annotations

# Note: This button reverts all the changes on the image since the start of the editing session.
annotationClearButton =
    .title = Jwa
annotationCropButton =
    .title = Ngol
annotationSaveEditButton = Gwoki
    .title = Gwok ma iyubo
annotationCancelEditButton = Juki
    .title = Juk yubo
annotationCropConfirmButton = Moki
    .title = Mok yer
annotationCropCancelButton = Juki
    .title = Juk yer

## Shotindex page

shotIndexPageSearchButton =
    .title = Yeny
shotIndexPageNoShotsInvitation = Mede, cwe mogo.
shotIndexPageNoSearchResultsIntro = Hmm
shotIndexPageNoSearchResults = Pe watwero nongo cal ma rwate ki yeny mamegi.
shotIndexPageClearSearchButton =
    .title = Jwa yeny
shotIndexPagePreviousPage =
    .title = potbuk mukato
shotIndexPageNextPage =
    .title = potbuk malubu

## Metrics page
## All metrics strings are optional for translation

metricsPageTotalsQueryTitle = Wel
# Note: Screenshots is an abbreviation for Firefox Screenshots, and should not be translated.
metricsPageTotalsQueryDescription = Wiye-wiye me Screenshots
metricsPageTotalsQueryDevices = Wel nyonyo ma kicoyo
metricsPageTotalsQueryExpiredShots = Kare ne okato (ento pud romo nonge)
metricsPageTotalsQueryExpiredDeletedShots = Kare ne okato (ki bene kikwanyo woko)
metricsPageShotsQueryDay = Diceng
metricsPageUsersQueryTitle = Lutic kudiceng
metricsPageUsersQueryCount = Wel Lutic
metricsPageUsersQueryDay = Diceng
metricsPageUserShotsQueryCount = Wel lutic
metricsPageRetentionQueryUsers = Wel lutic
metricsPageTotalRetentionQueryUsers = Wel lutic
metricsPageVersionQueryLastSeen = Nino
