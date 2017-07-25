// Localization for Server-side strings of Firefox Screenshots
// 
// Please don't localize Firefox, Firefox Screenshots, or Screenshots



// Global phrases shared across pages, prefixed with 'g'
[[ global ]]

gMyShots = Mine skjermbilde
gHomeLink = Heim
gNoShots
    .alt = Fann ingen skjermbilde
gScreenshotsDescription = Skjermbilete gjort enkelt. Ta, lagre og del skjermbilde utan å forlate Firefox.


[[ Creating page ]]

// Note: { $title } is a placeholder for the title of the web page
// captured in the screenshot. The default, for pages without titles, is
// creatingPageTitleDefault.
creatingPageTitle = Lagar { $title }
creatingPageTitleDefault = side


[[ Home page ]]

homePageButtonMyShots = Gå til skjermbilda mine
homePageTeaser = Kjem snart…
homePageDownloadFirefoxTitle = Firefox
homePageDownloadFirefoxSubTitle = Gratis nedlasting
homePageGetStarted = Kom i gang
// Note: do not translate 'Firefox Screenshots' when translating this string
homePageHowScreenshotsWorks = Slik fungerer Firefox Screenshots
homePageGetStartedTitle = Kom i gang
homePageCaptureRegion = Knips eit områdde
homePageCapturePage = Knips ei side
homePageSaveShare = Lagre og del
homePageLegalLink = Juridisk
homePagePrivacyLink = Personvern
homePageTermsLink = Vilkår
homePageCookiesLink = Infokapslar


[[ Leave Screenshots page ]]

leavePageConfirmDelete = Stadfest sletting av konto
// Note: do not translate 'Firefox Screenshots' when translating this string
leavePageErrorAddonRequired = Du må ha Firefox Screenshots installert for å slette kontoen din
leavePageErrorGeneric = Det oppstod ein feil
leavePageButtonProceed = Fortset
leavePageButtonCancel = Avbryt
leavePageDeleted = Alle skjermbilda dine er sletta!


[[ Not Found page ]]

notFoundPageTitle = Fann ikkje sida
notFoundPageIntro = Ups.
notFoundPageDescription = Fann ikkje sida.


[[ Shot page ]]

shotPageAlertErrorUpdatingExpirationTime = Feil ved lagring av utløpsdato
shotPageAlertErrorDeletingShot = Feil ved sletting av skjermbilde
shotPageAlertErrorUpdatingTitle = Feil ved lagring av tittel
shotPageConfirmDelete = Er du sikker på at du vil slette dette skjermbildet permanent?
shotPageShareButton
    .title = Del
shotPageCopy = Kopier
shotPageCopied = Kopiert
shotPageShareFacebook
    .title = Del på Facebook
shotPageShareTwitter
    .title = Del på Twitter
shotPageSharePinterest
    .title = Del på Pinterest
shotPageShareEmail
    .title = Del lenke via e-post
shotPageShareLink = Få ei delbar lenkje til dette skjermbildet:
shotPagePrivacyMessage = Alle som har denne lenka kan sjå dette skjermbildet.
shotPageCopyImageText
    .label = Kopier bildetekst
// Note: { $date } is a placeholder for a localized future date as returned by Date.toLocaleString.
// For example, in en-US, { $date } could be "7/12/2017, 1:52:50 PM".
shotPageRestoreButton = bygg oppatt til og med { $date }
shotPageExpiredMessage = Dette bildet har gått ut.
shotPageDeleteButton
    .title = Slett dette skjermbildet
shotPageAbuseButton
    .title = Rapporter dette bildet for brot, spam eller andre problem
shotPageDownloadShot
    .title = Last ned
shotPageDownload = Last ned
shotPageScreenshotsDescription = Skjermbilde gjort enkelt. Ta, lagre og del skjermbilde utan å forlate Firefox.
shotPageUpsellFirefox = Last ned Firefox no
shotPageDMCAMessage = Dette bildet er ikkje lenger tilgjengeleg på grunn av ein tredjepart sitt immaterielle krav.
// Note: { $dmca } is a placeholder for a link to send email (a 'mailto' link)
shotPageDMCAContact = Send ein e-post til { $dmca } for å be om ytterlegare informasjon.
// Note: shotPageSelectTime is a placeholder label for the time selection dropdown.
shotPageSelectTime = Vel tid
shotPageKeepIndefinitely = Uendeleg
shotPageKeepTenMinutes = 10 minutt
shotPageKeepOneHour = 1 time
shotPageKeepOneDay = 1 dag
shotPageKeepOneWeek = 1 veke
shotPageKeepTwoWeeks = 2 veker
shotPageKeepOneMonth = 1 månad
shotPageSaveExpiration = lagre
shotPageCancelExpiration = avbryt
shotPageDoesNotExpire = går ikkje ut
// Note: { $timediff } is a placeholder for a future relative time clause, like "in 1 week" or "tomorrow"
shotPageExpiresIn = går ut { $timediff }
// Note: { $timediff } is a placeholder for a past relative time clause, like "1 week ago" or "yesterday"
shotPageExpired = gått ut { $timediff }
timeDiffJustNow = akkurat no
timeDiffMinutesAgo = { $num ->
        [one] 1 minutt sidan
       *[other] { $number } minutt sidan
    }
timeDiffHoursAgo = { $num ->
        [one] 1 time sidan
       *[other] { $number } timar sidan
    }
timeDiffDaysAgo = { $num ->
        [one] i går
       *[other] { $number } dagar sidan
    }
timeDiffFutureSeconds = om nokre få sekund
timeDiffFutureMinutes = { $num ->
        [one] om 1 minutt
       *[other] om { $number } minutt
    }
timeDiffFutureHours = { $num ->
        [one] om 1 time
       *[other] om { $number } timar
    }
timeDiffFutureDays = { $num ->
        [one] i morgon
       *[other] om { $number } dagar
    }


[[ Shotindex page ]]

// { $error } is a placeholder for a non-translated error message that could be shared
// with developers when debugging an error.
shotIndexPageErrorRendering = Feil med rendering av sida: { $error }
shotIndexPageSearchPlaceholder
    .placeholder = Søk i bilde
shotIndexPageSearchButton
    .title = Søk
shotIndexPageNoShotsMessage = Ingen lagra bilde.
shotIndexPageNoShotsInvitation = Kom igjen, lag nokre.
shotIndexPageLookingForShots = Leitar etter bilda dine…
shotIndexPageNoSearchResultsIntro = Hmm
shotIndexPageNoSearchResults = Vi kan ikkje finne bilde som passar med søket ditt.
shotIndexPageClearSearchButton
    .title = Tøm søk
shotIndexPageConfirmShotDelete = Slette dette bildet?


// all metrics strings are optional for translation
[[ Metrics page ]]

// Note: 'Firefox Screenshots' should not be translated
metricsPageTitle = Statistikk for Firefox-skjermbilde
metricsPageTotalsQueryTitle = Totalt
// Note: Screenshots is an abbreviation for Firefox Screenshots, and should not be translated.
metricsPageTotalsQueryDescription = Ei oversikt over skjermbilde
metricsPageTotalsQueryDevices = Totalt tal på registrerte einingar
metricsPageTotalsQueryActiveShots = Aktive bilde
metricsPageTotalsQueryExpiredShots = Gått ut (men kan tilbakestillast)
metricsPageTotalsQueryExpiredDeletedShots = Gått ut (og sletta)
metricsPageShotsQueryTitle = Bilde pr. dag
metricsPageShotsQueryDescription = Tal på bilde laga kvar dag (dei siste 30 dagane)
metricsPageShotsQueryCount = Tal på bilde
metricsPageShotsQueryDay = Dag
metricsPageUsersQueryTitle = Brukarar pr. dag
metricsPageUsersQueryCount = Tal på brukarar
metricsPageUsersQueryDay = Dag
metricsPageUserShotsQueryTitle = Tal på bilde pr. brukar
metricsPageUserShotsQueryCount = Tal på brukarar
metricsPageRetentionQueryUsers = Tal på brukarar
metricsPageTotalRetentionQueryUsers = Tal på brukarar
metricsPageVersionQueryTitle = Utvidingsversjon
metricsPageVersionQueryVersion = Utvidingsversjon
metricsPageVersionQueryLastSeen = Dag
metricsPageHeader = Statistikk
// Note: { $created } is a placeholder for a localized date and time, like '4/21/2017, 3:40:04 AM'
metricsPageGeneratedDateTime = Generert: { $created }
// Note { $time } is a placeholder for a number of milliseconds, like '100'
metricsPageDatabaseQueryTime = (databasetid: { $time } ms)
