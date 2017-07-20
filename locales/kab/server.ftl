// Localization for Server-side strings of Firefox Screenshots
// 
// Please don't localize Firefox, Firefox Screenshots, or Screenshots



// Global phrases shared across pages, prefixed with 'g'
[[ global ]]

gMyShots = Tuṭṭfiwin-iw
gHomeLink = Asebter agejdan
gNoShots
    .alt = Ulac tuṭṭfiwin


[[ Creating page ]]

// Note: { $title } is a placeholder for the title of the web page
// captured in the screenshot. The default, for pages without titles, is
// creatingPageTitleDefault.
creatingPageTitle = Ti rna { $title }
creatingPageTitleDefault = Asebter


[[ Home page ]]

homePageButtonMyShots = Ddu γer tuṭṭfiwin inu
homePageTeaser = Ad yilli ticki...
homePageDownloadFirefoxTitle = Firefox
homePageDownloadFirefoxSubTitle = Sider baṭel
homePageGetStarted = Bdu
// Note: do not translate 'Firefox Screenshots' when translating this string
homePageHowScreenshotsWorks = Amek iteddu Firefox Screenshots
homePageGetStartedTitle = Bdu
homePageCaptureRegion = Ṭṭef tamnaḍt
homePageCapturePage = Ṭṭef asebter
homePageSaveShare = Sekles u bḍu
homePageLegalLink = Usḍif
homePagePrivacyLink = Tabaḍnit
homePageTermsLink = Tiwtilin
homePageCookiesLink = Inagan n tuqqna


[[ Leave Screenshots page ]]

leavePageConfirmDelete = Sentem tukksa n umiḍan
leavePageErrorGeneric = Teḍra-d tuccḍa
leavePageButtonProceed = Kemmel
leavePageButtonCancel = Sefsex


[[ Not Found page ]]

notFoundPageTitle = Ulac asebter
notFoundPageIntro = Ihuh.
notFoundPageDescription = Ulac asebter.


[[ Shot page ]]

shotPageAlertErrorDeletingShot = Tuccḍa di tukksa n ṭṭufa
shotPageAlertErrorUpdatingTitle = Tuccḍa deg usekles n uzwel
shotPageConfirmDelete = Tebɣiḍ ad tekseḍ ṭṭufa-agi i lebda?
shotPageShareButton
    .title = Bḍu
shotPageCopy = Nγel
shotPageCopied = Inγel
shotPageShareFacebook
    .title = Bḍu di Facebook
shotPageShareTwitter
    .title = Bḍu di Twitter
shotPageSharePinterest
    .title = Bḍu di Pinterest
shotPageShareEmail
    .title = Bḍu aseγwen s imayl
shotPageShareLink = Awi aseγwen ittwabḍan γer tuṭṭfa-agi:
shotPageCopyImageText
    .label = Nγel aḍris n tewlaft
shotPageConfirmDeletion = Tebɣiḍ ad tekseḍ tuṭṭfa-agi i lebda?
// Note: { $date } is a placeholder for a localized future date as returned by Date.toLocaleString.
// For example, in en-US, { $date } could be "7/12/2017, 1:52:50 PM".
shotPageRestoreButton = Rred armi { $date }
shotPageDeleteButton
    .title = Kkes tuṭfa-agi
shotPageDownloadShot
    .title = Sider
shotPageDownload = Sider
shotPageUpsellFirefox = Awi-d Firefox tura
// Note: shotPageSelectTime is a placeholder label for the time selection dropdown.
shotPageSelectTime = Fren akud
shotPageKeepTenMinutes = 10 n tesdatin
shotPageKeepOneHour = 1 n usrag
shotPageKeepOneDay = 1 n wass
shotPageKeepOneWeek = 1 n dduṛt
shotPageKeepTwoWeeks = 2 n dduṛtat
shotPageKeepOneMonth = Aggur
shotPageSaveExpiration = Sekles
shotPageCancelExpiration = Sefsex
shotPageDoesNotExpire = ur yemmut ara
// Note: { $timediff } is a placeholder for a past relative time clause, like "1 week ago" or "yesterday"
shotPageExpired = immut  { $timediff }
timeDiffJustNow = tura yakan
timeDiffHoursAgo = { $num ->
        [one] 1 usrag aya
       *[other] { $number } isragen aya
    }
timeDiffDaysAgo = { $num ->
        [one] iḍelli
       *[other] { $number }  n wussan aya
    }
timeDiffFutureSeconds = deg kra n tesnatin
timeDiffFutureMinutes = { $num ->
        [one] di 1 n tsedat
       *[other] di { $number } tsedatin
    }
timeDiffFutureHours = { $num ->
        [one] di 1 usrag
       *[other] di { $number } isragen
    }
timeDiffFutureDays = { $num ->
        [one] azekka
       *[other] di { $number } n wussan
    }


[[ Shotindex page ]]

shotIndexPageSearchPlaceholder
    .placeholder = Nadi tuṭfiwin inu
shotIndexPageSearchButton
    .title = Nadi
shotIndexPageNoShotsMessage = Ulac tuṭfiwin ittwaskelsen.
shotIndexPageNoShotsInvitation = Bdu, Rnu kra.
shotIndexPageLookingForShots = Anadi n tuṭfiwin inek…
shotIndexPageNoSearchResultsIntro = Hmm
shotIndexPageNoSearchResults = Ulac tuṭfiwin i γef tettnadiḍ.
shotIndexPageClearSearchButton
    .title = Sfeḍ anadi
shotIndexPageConfirmShotDelete = Kkes tuṭfa-agi?


// all metrics strings are optional for translation
[[ Metrics page ]]

