// Localization for Server-side strings of Firefox Screenshots
// 
// Please don't localize Firefox, Firefox Screenshots, or Screenshots



// Global phrases shared across pages, prefixed with 'g'
[[ global ]]

gMyShots = Minu pildid


[[ Footer ]]

// Note: link text for a link to mozilla.org
footerLinkMozilla = Mozilla


[[ Creating page ]]

creatingPageWaitMessage = Pildi salvestamine…


[[ Home page ]]

homePageDownloadFirefoxTitle = Firefox
homePageGetStarted = Alustamine
// Note: do not translate 'Firefox Screenshots' when translating this string
homePageHowScreenshotsWorks = Kuidas Firefox Screenshots töötab
homePageGetStartedTitle = Alustamine


[[ Leave Screenshots page ]]

leavePageErrorGeneric = Tekkis viga


[[ Not Found page ]]

notFoundPageTitle = Lehekülge ei leitud
notFoundPageIntro = Ups.
notFoundPageDescription = Lehekülge ei leitud.


[[ Shot page ]]

// This is the HTML title tag of the page
shotPageTitle = Ekraanipilt: { $originalTitle }
shotPageAlertErrorUpdatingExpirationTime = Aegumise salvestamisel tekkis viga
shotPageAlertErrorDeletingShot = Pildi kustutamisel tekkis viga
shotPageAlertErrorUpdatingTitle = Pildi pealkirja salvestamisel tekkis viga
shotPageConfirmDelete = Kas oled kindel, et soovid pildi jäädavalt kustutada?
shotPageCopy = Kopeeri
shotPageCopied = Kopeeritud
shotPageConfirmDeletion = Kas oled kindel, et soovid selle pildi jäädavalt kustutada?
// Note: { $timediff } is a placeholder for a future relative time clause like 'in 3 days' or 'tomorrow'
shotPageExpirationMessage = Kui sa midagi ei tee, siis kustutatakse see pilt jäädavalt { $timediff }.
shotPageExpiredMessage = See pilt on aegunud.
shotPageDeleteButton
    .title = Kustuta see pilti
shotPageDownloadShot
    .title = Laadi alla
shotPageDownload = Laadi alla
shotPageUpsellFirefox = Hangi Firefox
// Note: shotPageSelectTime is a placeholder label for the time selection dropdown.
shotPageSelectTime = Aja valimine
shotPageKeepIndefinitely = Igavesti
shotPageKeepTenMinutes = 10 minutit
shotPageKeepOneHour = 1 tund
shotPageKeepOneDay = 1 päev
shotPageKeepOneWeek = 1 nädal
shotPageKeepTwoWeeks = 2 nädalat
shotPageKeepOneMonth = 1 kuu
shotPageSaveExpiration = salvesta
shotPageCancelExpiration = tühista
shotPageDoesNotExpire = ei aegu
// Note: { $timediff } is a placeholder for a future relative time clause, like "in 1 week" or "tomorrow"
shotPageExpiresIn = aegub { $timediff }
// Note: { $timediff } is a placeholder for a past relative time clause, like "1 week ago" or "yesterday"
shotPageExpired = aegunud { $timediff }
timeDiffJustNow = just praegu
timeDiffMinutesAgo = { $num ->
        [one] 1 minut tagasi
       *[other] { $number } minutit tagasi
    }
timeDiffHoursAgo = { $num ->
        [one] 1 tund tagasi
       *[other] { $number } tundi tagasi
    }
timeDiffDaysAgo = { $num ->
        [one] eile
       *[other] { $number } päeva tagasi
    }
timeDiffFutureSeconds = paari sekundi jooksul
timeDiffFutureMinutes = { $num ->
        [one] minuti jooksul
       *[other] { $number } minuti jooksul
    }
timeDiffFutureHours = 
timeDiffFutureDays = { $num ->
        [one] homme
       *[other] { $number } päeva jooksul
    }


[[ Shotindex page ]]

// { $status } is a placeholder for an HTTP status code, like '500'.
// { $statusText } is a text description of the status code, like 'Internal server error'.
shotIndexPageErrorDeletingShot = Pildi kustutamisel tekkis viga: { $status } { $statusText }
shotIndexPageSearchPlaceholder
    .placeholder = Minu piltidest otsimine
shotIndexPageSearchButton
    .title = Otsi
shotIndexPageNoShotsMessage = Salvestatud pildid puuduvad.
shotIndexPageNoShotsInvitation = Ära pelga, tee mõned.
shotIndexPageNoSearchResultsIntro = Hmm


// all metrics strings are optional for translation
[[ Metrics page ]]

metricsPageTotalsQueryActiveShots = Aktiivsed pildid
metricsPageTotalsQueryExpiredShots = Aegunud (kuid taastatavad)
metricsPageTotalsQueryExpiredDeletedShots = Aegunud (ja kustutatud)
metricsPageShotsQueryTitle = Pildid päevade kaupa
metricsPageShotsQueryCount = Piltide arv
metricsPageShotsQueryDay = Päev
// Note { $time } is a placeholder for a number of milliseconds, like '100'
metricsPageDatabaseQueryTime = (andmebaasi aeg: { $time }ms)
