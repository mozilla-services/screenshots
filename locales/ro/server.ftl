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
footerLinkDMCA = Raportează o încălcare a DPI
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
shotPageAbuseButton
    .title = Raportează această captură pentru abuz, spam sau alte probleme
shotPageDownloadShot
    .title = Descarcă
shotPageDownload = Descarcă
shotPageKeepFor = Cât timp ar trebui să fie păstrată această captură?
// Note: shotPageSelectTime is a placeholder label for the time selection dropdown.
shotPageSelectTime = Selectează durata
shotPageKeepIndefinitely = Pe termen nedefinit
shotPageKeepTenMinutes = 10 minute
shotPageKeepOneHour = 1 oră
shotPageKeepOneDay = 1 zi
shotPageKeepOneWeek = 1 săptămână
shotPageKeepTwoWeeks = 2 săptămâni
shotPageKeepOneMonth = 1 lună
shotPageSaveExpiration = salvează
shotPageDoesNotExpire = nu expiră
// Note: { $timediff } is a placeholder for a future relative time clause, like "in 1 week" or "tomorrow"
shotPageExpiresIn = expiră { $timediff }
timeDiffMinutesAgo = { $num ->
        [one] în urmă cu 1 minut
        [few] în urmă cu { $number } minute
       *[other] în urmă cu { $number } de minute
    }
timeDiffFutureSeconds = în câteva secunde
timeDiffFutureMinutes = { $num ->
        [one] într-un minut
        [few] în { $number } minute
       *[other] în { $number } de minute
    }
timeDiffFutureHours = { $num ->
        [one] într-o oră
        [few] în { $number } ore
       *[other] în { $number } de ore
    }
timeDiffFutureDays = { $num ->
        [one] mâine
        [few] în { $number } zile
       *[other] în { $number } de zile
    }


[[ Shotindex page ]]

shotIndexPageSearchPlaceholder
    .placeholder = Caută capturile mele
shotIndexPageSearchButton
    .title = Caută
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
