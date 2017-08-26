// Localization for Server-side strings of Firefox Screenshots
// 
// Please don't localize Firefox, Firefox Screenshots, or Screenshots



// Global phrases shared across pages, prefixed with 'g'
[[ global ]]

gMyShots = Minu pildid
gHomeLink = Avaleht
gNoShots
    .alt = Pilte ei leitud
gScreenshotsDescription = Ekraanipildid lihtsalt. Tee, salvesta ja jaga ekraanipilte Firefoxist lahkumata.


[[ Footer ]]

// Note: link text for a link to mozilla.org
footerLinkMozilla = Mozilla
footerLinkTerms = Kasutustingimused
footerLinkPrivacy = Privaatsuspoliitika
footerLinkDMCA = Intellektuaalomandi rikkumisest teatamine
footerLinkDiscourse = Tagasiside andmine
footerLinkRemoveAllData = Kõigi andmete eemaldamine


[[ Creating page ]]

// Note: { $title } is a placeholder for the title of the web page
// captured in the screenshot. The default, for pages without titles, is
// creatingPageTitleDefault.
creatingPageTitle = Loomisel: { $title }
creatingPageTitleDefault = leht
creatingPageWaitMessage = Pildi salvestamine…


[[ Home page ]]

homePageDescription
    .content = Veebilehitsejasse sisse ehitatud intuitiivsed ekraanipildid. Tee, salvesta ja jaga ekraanipilte veebi sirvimisel Firefoxis.
homePageButtonMyShots = Minu piltide juurde
homePageTeaser = Varsti tulekul…
homePageDownloadFirefoxTitle = Firefox
homePageDownloadFirefoxSubTitle = Tasuta allalaadimine
homePageGetStarted = Alustamine
// Note: do not translate 'Firefox Screenshots' when translating this string
homePageHowScreenshotsWorks = Kuidas Firefox Screenshots töötab
homePageGetStartedTitle = Alustamine
// Note: Screenshots is an abbreviation for Firefox Screenshots, and should not be translated.
homePageGetStartedDescription = Leia tööriistaribalt uus Screenshots ikoon. Vali see ning veebilehitseja aknas avaneb Screenshots menüü.
homePageCaptureRegion = Piirkonna valimine
// Note: Screenshots is an abbreviation for Firefox Screenshots, and should not be translated.
homePageCaptureRegionDescription = Klõpsa ja lohista alal, mida salvestada soovid. Või lihtsalt hoia kursorit selle kohal ja klõpsa — Screenshots valib ala sinu eest. Oled nähtavaga rahul? Vali Salvesta ekraanipildile võrgus ligipääsuks või vajuta nupule noolega alla, kui soovid selle enda arvutisse alla laadida.
homePageCapturePage = Lehe salvestamine
homePageCapturePageDescription = Tervete lehtede salvestamiseks kasuta nuppe ülal paremal. Salvesta nähtav nupp valib ala, mida näed kerimata, ja Salvesta terve leht valib kogu lehe.
homePageSaveShare = Salvestamine ja jagamine
// Note: Screenshots is an abbreviation for Firefox Screenshots, and should not be translated.
homePageSaveShareDescription = Kui teed pildi, siis postitab Firefox selle võrgus asuvasse ekraanipiltide kogusse ning kopeerib lõikepuhvrisse lingi. Salvestame ekraanipildi automaatselt kaheks nädalaks, kuid saad neid igal ajal kustutada või aegumistähtaega muuta ning neid kogus kauem hoida.
homePageLegalLink = Õiguslik teave
homePagePrivacyLink = Privaatsus
homePageTermsLink = Kasutustingimused
homePageCookiesLink = Küpsised


[[ Leave Screenshots page ]]

leavePageRemoveAllData = Kõigi andmete eemaldamine
// Note: do not translate 'Firefox Screenshots' when translating this string
leavePageErrorAddonRequired = Konto kustutamiseks peab Firefox Screenshots olema paigaldatud
leavePageErrorGeneric = Tekkis viga
// Note: do not translate 'Firefox Screenshots' when translating this string
leavePageWarning = See kustutab jäädavalt kõik sinu Firefox Screenshots andmed.
leavePageButtonProceed = Edasi
leavePageButtonCancel = Tühista
leavePageDeleted = Kõik su ekraanipildid kustutati!


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
shotPageShareButton
    .title = Jaga
shotPageCopy = Kopeeri
shotPageCopied = Kopeeritud
shotPageShareFacebook
    .title = Jaga Facebookis
shotPageShareTwitter
    .title = Jaga Twiteris
shotPageSharePinterest
    .title = Jaga Pinterestis
shotPageShareEmail
    .title = Jaga lingiga e-posti teel
shotPageShareLink = Hangi jagamiseks selle pildi link:
shotPagePrivacyMessage = Kes tahes saab linki teades seda pilti vaadata.
shotPageCopyImageText
    .label = Kopeeri pildi tekst
shotPageConfirmDeletion = Kas oled kindel, et soovid selle pildi jäädavalt kustutada?
// Note: { $timediff } is a placeholder for a future relative time clause like 'in 3 days' or 'tomorrow'
shotPageExpirationMessage = Kui sa midagi ei tee, siis kustutatakse see pilt jäädavalt { $timediff }.
// Note: { $date } is a placeholder for a localized future date as returned by Date.toLocaleString.
// For example, in en-US, { $date } could be "7/12/2017, 1:52:50 PM".
shotPageRestoreButton = taasta kuni { $date }
shotPageExpiredMessage = See pilt on aegunud.
// Note: This phrase is followed by an empty line, then the URL of the source page
shotPageExpiredMessageDetails = Siin on leht, millel see algselt loodi:
shotPageDeleteButton
    .title = Kustuta see pilti
shotPageAbuseButton
    .title = Raporteeri see pilt kuritarvituse, rämpspostituse või teiste probleemide tõttu
shotPageDownloadShot
    .title = Laadi alla
shotPageDownload = Laadi alla
shotPageScreenshotsDescription = Ekraanipildid lihtsalt. Tee, salvesta ja jaga ekraanipilte Firefoxist lahkumata.
shotPageUpsellFirefox = Hangi Firefox
shotPageDMCAMessage = See pilt pole enam saadaval intellektuaalomandi nõude tõttu kolmandalt osapoolelt.
// Note: { $dmca } is a placeholder for a link to send email (a 'mailto' link)
shotPageDMCAContact = Palun kirjuta { $dmca }, kui soovid rohkem teavet.
// Note: do not translate 'Firefox Screenshots' when translating this string
shotPageDMCAWarning = Kui su pildid saavad mitu sellist nõuet, siis võime tühistada sinu ligipääsu Firefox Screenshots teenusele.
// Note: { $url } is a placeholder for a shot page URL
shotPageDMCAIncludeLink = Palun kaasa kirjas selle pildi URL: { $url }
shotPageKeepFor = Kui kaua peaks seda pilti säilitama?
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
        [one] minut tagasi
       *[other] { $number } minutit tagasi
    }
timeDiffHoursAgo = { $num ->
        [one] tund tagasi
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
timeDiffFutureHours = { $num ->
        [one] tunni jooksul
       *[other] { $number } tunni jooksul
    }
timeDiffFutureDays = { $num ->
        [one] homme
       *[other] { $number } päeva jooksul
    }


[[ Shotindex page ]]

// { $status } is a placeholder for an HTTP status code, like '500'.
// { $statusText } is a text description of the status code, like 'Internal server error'.
shotIndexPageErrorDeletingShot = Pildi kustutamisel tekkis viga: { $status } { $statusText }
// { $searchTerm } is a placeholder for text the user typed into the search box
shotIndexPageSearchResultsTitle = Minu pildid: otsi { $searchTerm }
// { $error } is a placeholder for a non-translated error message that could be shared
// with developers when debugging an error.
shotIndexPageErrorRendering = Lehe kuvamisel tekkis viga: { $error }
shotIndexPageSearchPlaceholder
    .placeholder = Minu piltidest otsimine
shotIndexPageSearchButton
    .title = Otsi
shotIndexPageNoShotsMessage = Salvestatud pildid puuduvad.
shotIndexPageNoShotsInvitation = Ära pelga, tee mõned.
shotIndexPageLookingForShots = Otsime sinu pilte…
shotIndexPageNoSearchResultsIntro = Hmm
shotIndexPageNoSearchResults = Me ei leidnud su otsingule sobivaid pilte.
shotIndexPageClearSearchButton
    .title = Tühjenda otsing
shotIndexPageConfirmShotDelete = Kas tõesti kustutada see pilt?


// all metrics strings are optional for translation
[[ Metrics page ]]

// Note: 'Firefox Screenshots' should not be translated
metricsPageTitle = Firefox Screenshots statistika
metricsPageTotalsQueryTitle = Kokku
// Note: Screenshots is an abbreviation for Firefox Screenshots, and should not be translated.
metricsPageTotalsQueryDescription = Screenshots ülevaade
metricsPageTotalsQueryDevices = Registreeritud seadmeid
metricsPageTotalsQueryActiveShots = Aktiivsed pildid
metricsPageTotalsQueryExpiredShots = Aegunud (kuid taastatavad)
metricsPageTotalsQueryExpiredDeletedShots = Aegunud (ja kustutatud)
metricsPageShotsQueryTitle = Pildid päevade kaupa
metricsPageShotsQueryDescription = Igapäevaselt loodud piltide arv (viimase 30 päeva jooksul)
metricsPageShotsQueryCount = Piltide arv
metricsPageShotsQueryDay = Päev
metricsPageUsersQueryTitle = Kasutajate arv päevade lõikes
metricsPageUsersQueryDescription = Kasutajate arv, kes salvestasid vähemalt ühe pildi, päevade lõikes (viimased 30 päeva)
metricsPageUsersQueryCount = Kasutajate arv
metricsPageUsersQueryDay = Päev
metricsPageUserShotsQueryTitle = Piltide arv kasutaja kohta
metricsPageUserShotsQueryCount = Kasutajate arv
metricsPageRetentionQueryUsers = Kasutajate arv
metricsPageTotalRetentionQueryUsers = Kasutajate arv
metricsPageVersionQueryTitle = Laienduse versioon
metricsPageVersionQueryUsers = Sisselogitud kasutajate arv
metricsPageVersionQueryVersion = Laienduse versioon
metricsPageVersionQueryLastSeen = Päev
metricsPageHeader = Statistika
// Note: { $created } is a placeholder for a localized date and time, like '4/21/2017, 3:40:04 AM'
metricsPageGeneratedDateTime = Genereeritud: { $created }
// Note { $time } is a placeholder for a number of milliseconds, like '100'
metricsPageDatabaseQueryTime = (andmebaasi aeg: { $time }ms)
