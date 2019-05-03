### Localization for Server-side strings of Firefox Screenshots
### Please don't localize Firefox, Firefox Screenshots, or Screenshots


## Global phrases shared across pages, prefixed with 'g'

gMyShots = Cal Mamega
gHomeLink = Gang
gNoShots =
    .alt = Pe ki nongo cal

## Header

buttonSettings =
    .title = Ter
buttonSignIn =
    .title = Dony iyie
bannerSignIn = <a>Dony iyie onyo Coone</a> me nongo cal mamegi weng i nyonyo ki gwoko ma imaro weng matwal.
bannerUpsell = { gScreenshotsDescription } <a>Nong Firefox kombedi</a>
onboardingPromoMessageListItem2 = Gwok cal mamegi ma imaro matwal
onboardingPromoSigninButton = Dony Iyie
    .title = Dony Iyie

## Footer

# Note: link text for a link to mozilla.org
footerLinkMozilla = Mozilla
footerLinkTerms = Cik
footerLinkPrivacy = Ngec me mung
footerLinkFaqs = Lapeny ma pol kare
footerLinkDiscourse = Mi Adwogi
footerLinkRemoveAllData = Kwany data weng

## Creating page

# Note: { $title } is a placeholder for the title of the web page
# captured in the screenshot. The default, for pages without titles, is
# creatingPageTitleDefault.
creatingPageTitle = Cweyo { $title }
creatingPageTitleDefault = potbuk
creatingPageWaitMessage = Gwoko cal mamegi…

## Home page

homePageButtonMyShots = Wot i Cal Mamega
homePageTeaser = Cok Bino
homePageDownloadFirefoxTitle = Firefox
homePageDownloadFirefoxSubTitle = Gam me nono
# Note: do not translate 'Firefox Screenshots' when translating this string
homePageHowScreenshotsWorks = Kit ma Firefox Screenshots Tiyo Kede
homePageGetStartedTitle = Caki
# Note: Screenshots is an abbreviation for Firefox Screenshots, and should not be translated.
homePageGetStartedDescriptionPageAction = Yer cal me Screenshots ki i jami ayera me potbuk ma i lanyut me kanonge, ka jami ayera me Screenshots bi nyute iwi dirica me layeny mamegi.
homePageCaptureRegion = Mak bute
homePageCapturePage = mak potbuk
homePageDownloadCopy = Gam onyo Loki
homePageLegalLink = Cik
homePagePrivacyLink = Mung
homePageTermsLink = Cik
homePageCookiesLink = Angija

## Leave Screenshots page

leavePageRemoveAllData = Kwany Data weng
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

shotPageAlertErrorDeletingShot = Bal i kwanyo cal
shotPageAlertErrorUpdatingTitle = Bal i gwoko wiye
shotPageConfirmDelete = Imoko ada ni imito kwanyo cal man matwal?
shotPageShareButton =
    .title = Poki
shotPageCopyButton =
    .title = Lok cal i bao coc
shotPageCopyActionLabel = Loki
shotPageCopied = Kiloko
shotPageShareFacebook =
    .title = Poki i Facebook
shotPageShareTwitter =
    .title = Poki i Twitter
shotPageSharePinterest =
    .title = poki i pinterest
shotPageShareEmail =
    .title = Nywak kakube i email
shotPageShareLink = Nong kakube ma nywake pi cal man:
shotPagePrivacyMessage = Ngat mo keken ki kakube ne twero neno cal man.
shotPageCopyImageText =
    .label = Lok coc me cal
shotPageConfirmDeletion = I moko ada ni imito kwanyo cal man matwal?
# Note: <timediff></timediff> is a placeholder for a future relative time clause like 'in 3 days' or 'tomorrow'
shotPageTimeExpirationMessage = Ka pe itimo gin mo, ki bikwanyo cal man matwal <timediff></timediff>.
# Note: { $date } is a placeholder for a localized future date as returned by Date.toLocaleString.
# For example, in en-US, { $date } could be "7/12/2017, 1:52:50 PM".
shotPageRestoreButton = dwoki naka wa { $date }
shotPageExpiredMessage = Kare pa cal man otum woko.
# Note: This phrase is followed by an empty line, then the URL of the source page
shotPageExpiredMessageDetails = Man aye potbuk ma ki cweyo ki iye wiya atii:
shotPageDeleteButton =
    .title = Kwany cal man
shotPageDownloadShot =
    .title = Gam
shotPageEditButton =
    .title = Yub cal man
shotPageBackToHomeButton =
    .title = Potbuk me acakki
shotPageAllShotsButton =
    .title = Cal weng
# Note: { $dmca } is a placeholder for a link to send email (a 'mailto' link)
shotPageDMCAContact = Tim ber i cwal email bot { $dmca } me penyo pi ngec mapol.
# Note: { $url } is a placeholder for a shot page URL
shotPageDMCAIncludeLink = Tim ber iket URL pa cal man i email mamegi: { $url }
shotPageKeepFor = Kigwok cal man pi kare ma rom mene?
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
# Note: <timediff></timediff> is a placeholder for a future relative time clause, like "in 1 week" or "tomorrow"
shotPageTimeExpiresIn = kare ne okato <timediff></timediff>
# Note: <timediff></timediff> is a placeholder for a past relative time clause, like "1 week ago" or "yesterday"
shotPageTimeExpired = kare ne okato <timediff></timediff>
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

## Shot Page New Feature Promotion Dialog.

# Note: If possible, choose a short translation to better fit into the card.
promoTitle = Niang maber!
promoLink = Tem gi
promoCloseButton =
    .title = Lor ngec

## Annotations

annotationPenButton =
    .title = Kalam
annotationHighlighterButton =
    .title = Lawer
annotationUndoButton =
    .title = Gony
annotationRedoButton =
    .title = Nwo timo
annotationTextButton =
    .title = Med coc
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
annotationColorWhite =
    .title = Tar
annotationColorBlack =
    .title = Col
annotationColorRed =
    .title = Kwar
annotationColorGreen =
    .title = Girin
annotationColorBlue =
    .title = Buluu
annotationColorYellow =
    .title = Yelo
annotationColorPurple =
    .title = Papul
annotationColorSeaGreen =
    .title = Pe girin tutwal
annotationColorGrey =
    .title = Buru buru
# Note: annotationTextSize is a title for text size selection dropdown.
annotationTextSize =
    .title = Dit me coc
# Values shown in text size selection dropdown
textSizeSmall = Matidi
textSizeMedium = Ladyere
textSizeLarge = Madit
# Confirm and Cancel button title shown when using text tool
textToolConfirmButton = Moki
    .title = Moki
textToolCancelButton = Juki
    .title = Juki
# Default placeholder used in input field when adding text annotations
textToolInputPlaceholder =
    .placeholder = Itye

## The following are the title and message for an error displayed as a Firefox
## notification. It is triggered by an action in the shot page and the strings
## are passed from the shot page to the addon.

copyImageErrorTitle = Gin mo otime marac
copyImageErrorMessage = Pe twero loko cal mamegi i baococ.

## Settings Page

settingsDisconnectButton = Wek kube
    .title = Wek kube
settingsGuestAccountMessage = Akaunt pa welo
settingsSignInButton = Dony iyie
    .title = Dony iyie
settingsFirefoxAccountSubHeader = Akaunt me Firefox
settingsClosePreferences =
    .title = Lor ter
settingsFxaDisconnectAlertMessage = Imoko ada ni imito kwanyo woko nyonyo man ki i Akaunt me Firefox mamegi?

## Shotindex page

# { $status } is a placeholder for an HTTP status code, like '500'.
# { $statusText } is a text description of the status code, like 'Internal server error'.
shotIndexPageErrorDeletingShot = Bal i kwanyo cal: { $status } { $statusText }
# { $searchTerm } is a placeholder for text the user typed into the search box
shotIndexPageSearchResultsTitle = Cal mamega: yeny pi { $searchTerm }
shotIndexPageSearchPlaceholder =
    .placeholder = Yeny cal mamega
shotIndexPageNoShotsMessage = Cal ma kigwoko pe.
shotIndexPageNoShotsInvitation = Mede, cwe mogo.
shotIndexPageLookingForShots = Tye ka yenyo pi cali…
shotIndexPageNoSearchResultsIntro = Hmm
shotIndexPageNoSearchResults = Pe watwero nongo cal ma rwate ki yeny mamegi.
shotIndexPageMyShotsButton =
    .title = Cal Mamega
shotIndexPageClearSearchButton =
    .title = Jwa yeny
shotIndexPageConfirmShotDelete = Kwany cal man?
shotIndexPagePreviousPage =
    .title = potbuk mukato
shotIndexPageNextPage =
    .title = potbuk malubu
# This is tooltip for a "blank heart" symbol used in the upper top corner of the card for a shot on the
# My Shots page to indicate that the shot does expire.
shotIndexNonFavoriteIcon =
    .title = Man pe cal ma kiaro loyo ki kare ne bitum woko
# This is the tooltip for a "heart" symbol in the upper top corner of the
# card for a shot on the My Shots page. It indicate that the shot was marked as
# a favorite by the owner.
shotIndexFavoriteIcon =
    .title = Man cal ma kimaro ki kare ne pe bitum
shotIndexSyncedShot =
    .title = Cal ma kimako i nyonyo mukene

## Delete Confirmation Dialog

shotDeleteConfirmationMessage = I moko ada ni i mito kwanyo cal man?
shotDeleteCancel = Juki
    .title = Juki
shotDeleteConfirm = Kwany
    .title = Kwany

## Export page


## Metrics page
## All metrics strings are optional for translation

metricsPageTotalsQueryTitle = Wel
# Note: Screenshots is an abbreviation for Firefox Screenshots, and should not be translated.
metricsPageTotalsQueryDescription = Wiye-wiye me Screenshots
metricsPageTotalsQueryDevices = Wel nyonyo ma kicoyo
metricsPageTotalsQueryExpiredShots = Kare ne okato (ento pud romo nonge)
metricsPageTotalsQueryExpiredDeletedShots = Kare ne okato (ki bene kikwanyo woko)
metricsPageShotsQueryDescription = Wel cal ma ki yubo nino weng (pi nino 30 ma okato)
metricsPageShotsQueryCount = Wel cal
metricsPageShotsQueryDay = Diceng
metricsPageUsersQueryTitle = Lutic kudiceng
metricsPageUsersQueryCount = Wel Lutic
metricsPageUsersQueryDay = Diceng
metricsPageUserShotsQueryCount = Wel lutic
metricsPageRetentionQueryUsers = Wel lutic
metricsPageTotalRetentionQueryUsers = Wel lutic
metricsPageVersionQueryLastSeen = Nino
