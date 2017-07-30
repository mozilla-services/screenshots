// Localization for Server-side strings of Firefox Screenshots
// 
// Please don't localize Firefox, Firefox Screenshots, or Screenshots



// Global phrases shared across pages, prefixed with 'g'
[[ global ]]

gMyShots = Tuṭṭfiwin-iw
gHomeLink = Asebter agejdan
gNoShots
    .alt = Ulac tuṭṭfiwin
gScreenshotsDescription = Tuṭṭfiwin ɣef afus. Ṭṭef agdil, sekles sakin bḍu war ma teffɣeḍ si Firefox.


[[ Footer ]]

// Note: link text for a link to mozilla.org
footerLinkMozilla = Mozilla
footerLinkPrivacy = Tasertit n tbaḍnit
footerLinkDiscourse = Mudd-d tikti-ik
footerLinkRemoveAllData = Kkes akk isefka


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
// Note: do not translate 'Firefox Screenshots' when translating this string
leavePageErrorAddonRequired = Yessefk ad yili ɣur-k Firefox Screenshots iyebded akken ad tekkseḍ amiḍan-ik
leavePageErrorGeneric = Teḍra-d tuccḍa
// Note: do not translate 'Firefox Screenshots' when translating this string
leavePageWarning = Ayagi ad yekkes ilebda akk isefka n tuṭṭufiwin n ugdil n Firefox.
leavePageButtonProceed = Kemmel
leavePageButtonCancel = Sefsex
leavePageDeleted = Akk tuṭṭfiwin-ik n ugdil ad ttwakksent!


[[ Not Found page ]]

notFoundPageTitle = Ulac asebter
notFoundPageIntro = Ihuh.
notFoundPageDescription = Ulac asebter.


[[ Shot page ]]

shotPageAlertErrorUpdatingExpirationTime = Tuccḍa deg usekles tagara
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
shotPagePrivacyMessage = Yal yiwen ɣur-s a.seɣwen ad yizmir ad iwali tuṭṭfa-agi.
shotPageCopyImageText
    .label = Nγel aḍris n tewlaft
shotPageConfirmDeletion = Tebɣiḍ ad tekseḍ tuṭṭfa-agi i lebda?
// Note: { $date } is a placeholder for a localized future date as returned by Date.toLocaleString.
// For example, in en-US, { $date } could be "7/12/2017, 1:52:50 PM".
shotPageRestoreButton = Rred armi { $date }
shotPageExpiredMessage = Tuṭṭfa-agi tfat.
// Note: This phrase is followed by an empty line, then the URL of the source page
shotPageExpiredMessageDetails = Hatan usebter ansa i d-tettwarna:
shotPageDeleteButton
    .title = Kkes tuṭfa-agi
shotPageAbuseButton
    .title = Azen tuṭṭfa-agi d asexseṛ, d aspam, neɣ uguren-nniḍen
shotPageDownloadShot
    .title = Sider
shotPageDownload = Sider
shotPageScreenshotsDescription = 
shotPageUpsellFirefox = Awi-d Firefox tura
// Note: { $dmca } is a placeholder for a link to send email (a 'mailto' link)
shotPageDMCAContact = Azen-d { $dmca } akken ad tsutreḍ ugar n telɣut.
shotPageKeepFor = Ceḥal n wakud tuṭṭfa-agi ad tettwasekles?
// Note: shotPageSelectTime is a placeholder label for the time selection dropdown.
shotPageSelectTime = Fren akud
shotPageKeepIndefinitely = war tilas
shotPageKeepTenMinutes = 10 n tesdatin
shotPageKeepOneHour = 1 n usrag
shotPageKeepOneDay = 1 n wass
shotPageKeepOneWeek = 1 n dduṛt
shotPageKeepTwoWeeks = 2 n dduṛtat
shotPageKeepOneMonth = Aggur
shotPageSaveExpiration = Sekles
shotPageCancelExpiration = Sefsex
shotPageDoesNotExpire = ur yemmut ara
// Note: { $timediff } is a placeholder for a future relative time clause, like "in 1 week" or "tomorrow"
shotPageExpiresIn = ad yemmet { $timediff }
// Note: { $timediff } is a placeholder for a past relative time clause, like "1 week ago" or "yesterday"
shotPageExpired = immut  { $timediff }
timeDiffJustNow = tura yakan
timeDiffMinutesAgo = { $number } n tesdatin aya
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

// { $status } is a placeholder for an HTTP status code, like '500'.
// { $statusText } is a text description of the status code, like 'Internal server error'.
shotIndexPageErrorDeletingShot = Tuccḍa di tukksa n tuṭṭfat: { $status } { $statusText }
// { $searchTerm } is a placeholder for text the user typed into the search box
shotIndexPageSearchResultsTitle = Tuṭṭfiwin-iw: anadi n { $searchTerm }
// { $error } is a placeholder for a non-translated error message that could be shared
// with developers when debugging an error.
shotIndexPageErrorRendering = Tuccḍa di tririt n usebter: { $error }
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

// Note: 'Firefox Screenshots' should not be translated
metricsPageTitle = Tasnakta n tuṭṭfiwin n ugdil n Firefox
metricsPageTotalsQueryTitle = Asemday
// Note: Screenshots is an abbreviation for Firefox Screenshots, and should not be translated.
metricsPageTotalsQueryDescription = Tazwart ar Screenshots
metricsPageTotalsQueryDevices = Amḍan n isuga yettwakelsen
metricsPageTotalsQueryActiveShots = Tuṭṭfiwin iremden
metricsPageTotalsQueryExpiredShots = Immut (maca tzemreḍ ad t-id-rreḍ)
metricsPageTotalsQueryExpiredDeletedShots = Immut ( u ittwakkes)
metricsPageShotsQueryTitle = Tuṭṭfiwin s wass
metricsPageShotsQueryDescription = Amḍan n tuṭṭfiwin yettwarnan yal ass (30 n wussan ineggura)
metricsPageShotsQueryCount = Amḍan n tuṭṭfiwin
metricsPageShotsQueryDay = Ass
metricsPageUsersQueryTitle = Iseqdacen s wass
metricsPageUsersQueryDescription = Amḍan n iseqdacen yernan ɣersum yiwet n tuṭṭfa. s wass (30 n wussan ineggura)
metricsPageUsersQueryCount = Amḍan n iseqdacen
metricsPageUsersQueryDay = Ass
metricsPageUserShotsQueryTitle = Amḍan n tuṭṭfiwin s useqdac
metricsPageUserShotsQueryCount = Amḍan n iseqdacen
metricsPageRetentionQueryUsers = Amḍan n iseqdacen
metricsPageRetentionQueryFirstWeek = Amalas anida aseqdac yerna tuṭṭfa tamenzut
metricsPageTotalRetentionQueryUsers = Amḍan n iseqdacen
metricsPageTotalRetentionQueryDays = Ussan anida aseqdac irennu tuṭṭfiwin
metricsPageVersionQueryTitle = Lqem n uzegrir
metricsPageVersionQueryUsers = Amḍan n iseqdacen yeqqnen
metricsPageVersionQueryVersion = Lqem n uzegrir
metricsPageVersionQueryLastSeen = Ass
metricsPageHeader = Tasnakta
// Note: { $created } is a placeholder for a localized date and time, like '4/21/2017, 3:40:04 AM'
metricsPageGeneratedDateTime = Yettwasirew di: { $created }
// Note { $time } is a placeholder for a number of milliseconds, like '100'
metricsPageDatabaseQueryTime = (akud n taffa n isefka: { $time }ms)
