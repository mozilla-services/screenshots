// Localization for Server-side strings of Firefox Screenshots
// 
// Please don't localize Firefox, Firefox Screenshots, or Screenshots



// Global phrases shared across pages, prefixed with 'g'
[[ global ]]

gMyShots = Capturile mele
gNoShots
    .alt = Nicio captură găsită


[[ Footer ]]

// Note: link text for a link to mozilla.org
footerLinkMozilla = Mozilla
footerLinkTerms = Termeni
footerLinkPrivacy = Politica de confidențialitate
footerLinkFaqs = Întrebări frecvente
footerLinkDiscourse = Oferă feedback


[[ Creating page ]]

creatingPageTitleDefault = pagină
creatingPageWaitMessage = Se salvează captura…


[[ Home page ]]

homePageTeaser = În curând…
homePageDownloadFirefoxTitle = Firefox
homePageDownloadFirefoxSubTitle = Descărcare gratuită
// Note: do not translate 'Firefox Screenshots' when translating this string
homePageHowScreenshotsWorks = Cum funcționează Firefox Screenshots
homePageCaptureRegion = Capturează o regiune
homePageCapturePage = Capturează o pagină
homePageSaveShare = Salvează și partajează
homePageLegalLink = Mențiuni legale
homePagePrivacyLink = Confidențialitate
homePageTermsLink = Termeni
homePageCookiesLink = Cookie-uri


[[ Leave Screenshots page ]]

leavePageRemoveAllData = Elimină toate datele
// Note: do not translate 'Firefox Screenshots' when translating this string
leavePageErrorAddonRequired = Trebuie să ai Firefox Screenshots instalat pentru a-ți șterge contul
leavePageErrorGeneric = A intervenit o eroare.
// Note: do not translate 'Firefox Screenshots' when translating this string
leavePageWarning = Acest lucru va șterge definitiv toate datele tale Firefox Screenshots.
leavePageButtonProceed = Continuă
leavePageButtonCancel = Renunță
leavePageDeleted = Toate capturile tale de ecran au fost șterse!


[[ Not Found page ]]

notFoundPageTitle = Pagină negăsită
notFoundPageIntro = Ups.
notFoundPageDescription = Pagină negăsită.


[[ Shot page ]]

// This is the HTML title tag of the page
shotPageTitle = Captură de ecran: { $originalTitle }
shotPageAlertErrorUpdatingExpirationTime = Eroare la salvarea expirării
shotPageAlertErrorDeletingShot = Eroare la ștergerea capturii
shotPageAlertErrorUpdatingTitle = Eroare la salvarea titlului
shotPageConfirmDelete = Sigur dorești să ștergi această captură definitiv?
shotPageShareButton
    .title = Partajează
shotPageCopy = Copiază
shotPageCopied = Copiat
shotPageDownloadShot
    .title = Descarcă
shotPageDownload = Descarcă
shotPageKeepTenMinutes = 10 minute
shotPageKeepOneHour = 1 oră
shotPageKeepOneDay = 1 zi
shotPageKeepOneWeek = 1 săptămână
shotPageKeepTwoWeeks = 2 săptămâni
shotPageKeepOneMonth = 1 lună
shotPageSaveExpiration = salvează
// Note: { $timediff } is a placeholder for a future relative time clause, like "in 1 week" or "tomorrow"
shotPageExpiresIn = expiră { $timediff }
timeDiffFutureSeconds = în câteva secunde
timeDiffFutureMinutes = { $num ->
        [one] într-un minut
        [few] în 2 minute
       *[other] în 20 de minute
    }
timeDiffFutureHours = { $num ->
        [one] într-o oră
        [few] în 2 ore
       *[other] în 20 de ore
    }
timeDiffFutureDays = { $num ->
        [one] mâine
        [few] în 2 zile
       *[other] în 20 de zile
    }


[[ Shotindex page ]]

shotIndexPageNoShotsMessage = Nicio captură salvată.
shotIndexPageNoShotsInvitation = Haide, realizează câteva.
shotIndexPageNoSearchResultsIntro = Hmm
shotIndexPageConfirmShotDelete = Ștergi această captură?


// all metrics strings are optional for translation
[[ Metrics page ]]

metricsPageTotalsQueryActiveShots = Capturi active
metricsPageShotsQueryTitle = Capturi în funcție de zi
metricsPageShotsQueryCount = Număr de capturi
metricsPageUsersQueryTitle = Utilizatori în funcție de zi
metricsPageUsersQueryCount = Număr de utilizatori
metricsPageUserShotsQueryCount = Număr de utilizatori
metricsPageRetentionQueryUsers = Număr de utilizatori
metricsPageTotalRetentionQueryUsers = Număr de utilizatori
metricsPageVersionQueryTitle = Versiunea suplimentului
metricsPageVersionQueryVersion = Versiunea suplimentului
metricsPageHeader = Indicatori metrici
