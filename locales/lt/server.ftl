// Localization for Server-side strings of Firefox Screenshots
// 
// Please don't localize Firefox, Firefox Screenshots, or Screenshots



// Global phrases shared across pages, prefixed with 'g'
[[ global ]]

gMyShots = Mano kadrai
gHomeLink = Pradžia
gNoShots
    .alt = Kadrų nerasta
gScreenshotsDescription = Ekrano nuotraukos paprastai. Darykite, saugokite ir dalinkitės ekrano nuotraukomis nepalikdami „Firefox“.


[[ Footer ]]

// Note: link text for a link to mozilla.org
footerLinkMozilla = Mozilla
footerLinkTerms = Sąlygos
footerLinkPrivacy = Privatumo nuostatai
footerLinkDMCA = Pranešti apie intelektinės nuosavybės pažeidimą
footerLinkDiscourse = Pateikti atsiliepimą
footerLinkRemoveAllData = Pašalinti visus duomenis


[[ Creating page ]]

// Note: { $title } is a placeholder for the title of the web page
// captured in the screenshot. The default, for pages without titles, is
// creatingPageTitleDefault.
creatingPageTitle = Kuriamas { $title }
creatingPageTitleDefault = tinklalapis
creatingPageWaitMessage = Jūsų kadras įrašomas…


[[ Home page ]]

homePageDescription
    .content = Intuityvios ekrano nuotraukos tiesiai naršyklėje. Darykite, saugokite ir dalinkitės ekrano nuotraukomis naršydami saityne su „Firefox“.
homePageButtonMyShots = Eiti į mano kadrus
homePageTeaser = Bus jau netrukus…
homePageDownloadFirefoxTitle = Firefox
homePageDownloadFirefoxSubTitle = Nemokamas atsisiuntimas
homePageGetStarted = Pradėkite
// Note: do not translate 'Firefox Screenshots' when translating this string
homePageHowScreenshotsWorks = Kaip veikia „Firefox“ ekrano nuotraukos
homePageGetStartedTitle = Pradėkite
// Note: Screenshots is an abbreviation for Firefox Screenshots, and should not be translated.
homePageGetStartedDescription = Raskite naująją „Firefox“ ekrano nuotraukų piktogramą savo įrankinėje. Pasirinkite ją ir ekrano nuotraukų meniu pasirodys virš jūsų naršyklės lango.
homePageCaptureRegion = Fotografuokite sritį
// Note: Screenshots is an abbreviation for Firefox Screenshots, and should not be translated.
homePageCaptureRegionDescription = Spustelėkite ir tempkite norėdami pažymėti norimą nufotografuoti sritį. Arba tiesiog užveskite pelę ir spustelėkite – bus pažymėta toji sritis. Patinka, ką matote? Pasirinkite „Įrašyti“, norėdami pasiekti savo nuotrauką internete, arba rodyklę žemyn, norėdami atsisiųsti ją į savo kompiuterį.
homePageCapturePage = Fotografuokite tinklalapį
homePageCapturePageDescription = Naudokitės mygtukais viršuje dešinėje, norėdami nufotografuoti visą tinklalapį. Mygtukas „Įrašyti matomą“ nufotografuos sritį, kurią matote neslinkdami pelės, o „Įrašyti visą tinklalapį“ nufotografuos viską, kas jame yra.
homePageSaveShare = Įrašykite ir dalinkitės
// Note: Screenshots is an abbreviation for Firefox Screenshots, and should not be translated.
homePageSaveShareDescription = Kai padarote nuotrauką, „Firefox“ patalpina ją jūsų internetinėje kadrų bibliotekoje ir nukopijuoja saitą į jūsų iškarpinę. Mes automatiškai saugome jūsų kadrus dvi savaites, tačiau jūs galite juos ištrinti bet kada, arba pakeisti galiojimo laiką, kad jie liktų ilgiau.
homePageLegalLink = Teisinė informacija
homePagePrivacyLink = Privatumas
homePageTermsLink = Nuostatai
homePageCookiesLink = Slapukai


[[ Leave Screenshots page ]]

leavePageRemoveAllData = Pašalinti visus duomenis
// Note: do not translate 'Firefox Screenshots' when translating this string
leavePageErrorAddonRequired = Privalote turėti įdiegtas „Firefox“ ekrano nuotraukas norėdami pašalinti savo paskyrą
leavePageErrorGeneric = Įvyko klaida
// Note: do not translate 'Firefox Screenshots' when translating this string
leavePageWarning = Tai visam laikai ištrins visus jūsų „Firefox“ nuotraukų duomenis.
leavePageButtonProceed = Vykdyti
leavePageButtonCancel = Atsisakyti
leavePageDeleted = Visi jūsų kadrai buvo ištrinti!


[[ Not Found page ]]

notFoundPageTitle = Tinklalapis nerastas
notFoundPageIntro = Ups.
notFoundPageDescription = Tinklalapis nerastas.


[[ Shot page ]]

// This is the HTML title tag of the page
shotPageTitle = Ekrano nuotrauka: { $originalTitle }
shotPageAlertErrorUpdatingExpirationTime = Klaida įrašant galiojimą
shotPageAlertErrorDeletingShot = Klaida trinant kadrą
shotPageAlertErrorUpdatingTitle = Klaida įrašant pavadinimą
shotPageConfirmDelete = Ar tikrai norite visam laikui ištrinti šį kadrą?
shotPageShareButton
    .title = Dalintis
shotPageCopy = Kopijuoti
shotPageCopied = Nukopijuota
shotPageShareFacebook
    .title = Dalintis per „Facebook“
shotPageShareTwitter
    .title = Dalintis per „Twitter“
shotPageSharePinterest
    .title = Dalintis per „Pinterest“
shotPageShareEmail
    .title = Dalintis saitu per el. paštą
shotPageShareLink = Gaukite saitą šiam kadrui:
shotPagePrivacyMessage = Bet kas su saitu galės peržiūrėti šį kadrą.
shotPageCopyImageText
    .label = Kopijuoti paveikslo tekstą
shotPageConfirmDeletion = Ar tikrai norite visam laikui ištrinti šį kadrą?
// Note: { $timediff } is a placeholder for a future relative time clause like 'in 3 days' or 'tomorrow'
shotPageExpirationMessage = Jei nieko nedarysite, šis kadras bus ištrintas visam laikui { $timediff }.
// Note: { $date } is a placeholder for a localized future date as returned by Date.toLocaleString.
// For example, in en-US, { $date } could be "7/12/2017, 1:52:50 PM".
shotPageRestoreButton = atkurti iki { $date }
shotPageExpiredMessage = Šis kadras baigė galioti.
// Note: This phrase is followed by an empty line, then the URL of the source page
shotPageExpiredMessageDetails = Štai tinklalapis, iš kurio jis buvo sukurtas:
shotPageDeleteButton
    .title = Ištrinti šį kadrą
shotPageAbuseButton
    .title = Pranešti apie išnaudojimą, nepageidajumą informaciją arba kitas šio kadro problemas
shotPageDownloadShot
    .title = Atsisiųsti
shotPageDownload = Atsisiųsti
shotPageScreenshotsDescription = Ekrano nuotraukos paprastai. Darykite, saugokite ir dalinkitės ekrano nuotraukomis nepalikdami „Firefox“.
shotPageUpsellFirefox = Gauti „Firefox“ dabar
shotPageDMCAMessage = Šis kadras nepasiekiamas dėl trečiųjų šalių intelektinės nuosavybės teisių.
// Note: { $dmca } is a placeholder for a link to send email (a 'mailto' link)
shotPageDMCAContact = Prašome susisiekti su { $dmca } dėl daugiau informacijos.
// Note: do not translate 'Firefox Screenshots' when translating this string
shotPageDMCAWarning = Jeigu jūsų kadrai sulauks daug pretenzijų, mes galime apriboti jūsų naudojimąsi „Firefox“ ekrano nuotraukomis.
// Note: { $url } is a placeholder for a shot page URL
shotPageDMCAIncludeLink = Prašome įtraukti šio karo URL savo el. laiške: { $url }
shotPageKeepFor = Kiek ilgai šis kadras turėtų būti laikomas?
// Note: shotPageSelectTime is a placeholder label for the time selection dropdown.
shotPageSelectTime = Pasirinkite laiką
shotPageKeepIndefinitely = Neribotai
shotPageKeepTenMinutes = 10 minučių
shotPageKeepOneHour = 1 valandą
shotPageKeepOneDay = 1 dieną
shotPageKeepOneWeek = 1 savaitę
shotPageKeepTwoWeeks = 2 savaites
shotPageKeepOneMonth = 1 mėnesį
shotPageSaveExpiration = įrašyti
shotPageCancelExpiration = atsisakyti
shotPageDoesNotExpire = nesibaigia
// Note: { $timediff } is a placeholder for a future relative time clause, like "in 1 week" or "tomorrow"
shotPageExpiresIn = baigs galioti { $timediff }
// Note: { $timediff } is a placeholder for a past relative time clause, like "1 week ago" or "yesterday"
shotPageExpired = baigė galioti { $timediff }
timeDiffJustNow = ką tik
timeDiffMinutesAgo = { $num ->
        [one] prieš 1 minutę
        [few] prieš { $number } minutes
       *[other] prieš { $number } minučių
    }
timeDiffHoursAgo = { $num ->
        [one] prieš 1 valandą
        [few] prieš { $number } valandas
       *[other] prieš { $number } valandų
    }
timeDiffDaysAgo = { $num ->
        [one] vakar
        [few] prieš { $number } dienas
       *[other] prieš { $number } dienų
    }
timeDiffFutureSeconds = po keleto sekundžių
timeDiffFutureMinutes = { $num ->
        [one] po 1 minutės
        [few] po { $number } minučių
       *[other] po { $number } minučių
    }
timeDiffFutureHours = { $num ->
        [one] po 1 valandos
        [few] po { $number } valandų
       *[other] po { $number } valandų
    }
timeDiffFutureDays = { $num ->
        [one] rytoj
        [few] po { $number } dienų
       *[other] po { $number } dienų
    }


[[ Shotindex page ]]

// { $status } is a placeholder for an HTTP status code, like '500'.
// { $statusText } is a text description of the status code, like 'Internal server error'.
shotIndexPageErrorDeletingShot = Klaida trinant kadrą: { $status } { $statusText }
// { $searchTerm } is a placeholder for text the user typed into the search box
shotIndexPageSearchResultsTitle = Mano kardai: ieškoti { $searchTerm }
// { $error } is a placeholder for a non-translated error message that could be shared
// with developers when debugging an error.
shotIndexPageErrorRendering = Klaida atvaizduojant tinklalapį: { $error }
shotIndexPageSearchPlaceholder
    .placeholder = Ieškoti mano kadrų
shotIndexPageSearchButton
    .title = Ieškoti
shotIndexPageNoShotsMessage = Nėra įrašytų kadrų.
shotIndexPageNoShotsInvitation = Nagi, sukurkite keletą.
shotIndexPageLookingForShots = Ieškome jūsų kadrų…
shotIndexPageNoSearchResultsIntro = Hmm
shotIndexPageNoSearchResults = Negalime rasti jokių kadrų, atitinkančių jūsų paiešką.
shotIndexPageClearSearchButton
    .title = Išvalyti paiešką
shotIndexPageConfirmShotDelete = Ištrinti šį kadrą?


// all metrics strings are optional for translation
[[ Metrics page ]]

// Note: 'Firefox Screenshots' should not be translated
metricsPageTitle = „FIrefox“ ekrano nuotraukų statistika
metricsPageTotalsQueryTitle = Viso
// Note: Screenshots is an abbreviation for Firefox Screenshots, and should not be translated.
metricsPageTotalsQueryDescription = Ekrano nuotraukų apžvalga
metricsPageTotalsQueryDevices = Viso registruotų įrenginių
metricsPageTotalsQueryActiveShots = Aktyvių kadrų
metricsPageTotalsQueryExpiredShots = Baigusių galioti (bet atkuriamų)
metricsPageTotalsQueryExpiredDeletedShots = Baigusių galioti (iš ištrintų)
metricsPageShotsQueryTitle = Kadrai dienomis
metricsPageShotsQueryDescription = Kadrai, padaryti per dieną (per paskutines 30 dienų)
metricsPageShotsQueryCount = Kadrų skaičius
metricsPageShotsQueryDay = Diena
metricsPageUsersQueryTitle = Naudotojai dienomis
metricsPageUsersQueryDescription = Naudotojai, padarę bent vieną kadrą, dienomis (per paskutines 30 dienų)
metricsPageUsersQueryCount = Naudotojų skaičius
metricsPageUsersQueryDay = Diena
metricsPageUserShotsQueryTitle = Kadrai vienam naudotojui
metricsPageUserShotsQueryDescription = Naudotojų skaičius, kurie viso turi apie N kadrų
metricsPageUserShotsQueryCount = Naudotojų skaičius
metricsPageUserShotsQueryShots = Apytikslis skaičius aktyvių (nebaigusių galioti) kadrų
metricsPageRetentionQueryTitle = Išlaikymas savaitėmis
metricsPageRetentionQueryDescription = Dienų skaičius tarp naudotojo pirmo ir paskiausio kadro, sugrupuota pagal pradinę savaitę
metricsPageRetentionQueryUsers = Naudotojų skaičius
metricsPageRetentionQueryDays = Dienos nuo naudotojo pirmo iki paskiausio kadro
metricsPageRetentionQueryFirstWeek = Savaitė, kurią naudotojas padarė pirmą kadrą
metricsPageTotalRetentionQueryTitle = Viso išlaikymas
metricsPageTotalRetentionQueryDescription = Laiko trukmė, kai naudotojai darė kadrus, sugrupuota pagal savaitę
metricsPageTotalRetentionQueryUsers = Naudotojų skaičius
metricsPageTotalRetentionQueryDays = Dienos, kai naudotojas darė kadrus
metricsPageVersionQueryTitle = Priedo versija
metricsPageVersionQueryDescription = Priedo versija prisijungimo metu, per paskutines 14 dienų
metricsPageVersionQueryUsers = Prisijungusių naudotojų skaičius
metricsPageVersionQueryVersion = Priedo versija
metricsPageVersionQueryLastSeen = Diena
metricsPageHeader = Statistika
// Note: { $created } is a placeholder for a localized date and time, like '4/21/2017, 3:40:04 AM'
metricsPageGeneratedDateTime = Sugeneruota: { $created }
// Note { $time } is a placeholder for a number of milliseconds, like '100'
metricsPageDatabaseQueryTime = (duomenų bazės užtrukimas: { $time } ms)
