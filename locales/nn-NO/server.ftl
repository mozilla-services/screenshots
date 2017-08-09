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


[[ Footer ]]

// Note: link text for a link to mozilla.org
footerLinkMozilla = 
footerLinkTerms = Vilkår
footerLinkPrivacy = Personvernmerknad
footerLinkDMCA = Rapporter brot på åndsverklova
footerLinkDiscourse = Gje tilbakemelding
footerLinkRemoveAllData = Slett alle data


[[ Creating page ]]

// Note: { $title } is a placeholder for the title of the web page
// captured in the screenshot. The default, for pages without titles, is
// creatingPageTitleDefault.
creatingPageTitle = Lagar { $title }
creatingPageTitleDefault = side
creatingPageWaitMessage = Lagrar bildet ditt…


[[ Home page ]]

homePageDescription
    .content = Intuitive skjermbilde direkte i nettlesaren. Knips, lagre og del skjermbilde når du surfar på nettet med Firefox.
homePageButtonMyShots = Gå til skjermbilda mine
homePageTeaser = Kjem snart…
homePageDownloadFirefoxTitle = Firefox
homePageDownloadFirefoxSubTitle = Gratis nedlasting
homePageGetStarted = Kom i gang
// Note: do not translate 'Firefox Screenshots' when translating this string
homePageHowScreenshotsWorks = Slik fungerer Firefox Screenshots
homePageGetStartedTitle = Kom i gang
// Note: Screenshots is an abbreviation for Firefox Screenshots, and should not be translated.
homePageGetStartedDescription = Finn det nye Screenshots-ikonet på verktøylinja. Vel det, og Screenshots-menyen blir vist øvst i nettlesarvindauget.
homePageCaptureRegion = Knips eit områdde
// Note: Screenshots is an abbreviation for Firefox Screenshots, and should not be translated.
homePageCaptureRegionDescription = Klikk og dra for å velje området du vil ta skjermbilde av. Eller berre hald musa over og klikk — Screenshots vil velje området for deg. Likar du det du ser? Vel Lagre for å få tilgang til dei knipsa bilda dine på nettet eller pil ned-knappen for å laste dei ned til datamaskina di.
homePageCapturePage = Knips ei side
homePageCapturePageDescription = Bruk knappene øvst til høgre for å ta skjermbilde av heile sider. Knappen «Lagre synleg område» tar skjermbilde av området du kan sjå utan å rulle, og «Lagre heile sida» vil ta skjermbilde av alt på sida.
homePageSaveShare = Lagre og del
// Note: Screenshots is an abbreviation for Firefox Screenshots, and should not be translated.
homePageSaveShareDescription = Når du tar eit bilde, lastar Firefox opp skjermbildet ditt i det nettbaserte Screenshots-bibliotek ditt og kopierer lenka til utklippstavla. Vi lagrar skjermbildet automatisk i to veker, men du kan når som helst slette bilde eller endre utgåttdatoen for å behalde dei i biblioteket ditt lenger.
homePageLegalLink = Juridisk
homePagePrivacyLink = Personvern
homePageTermsLink = Vilkår
homePageCookiesLink = Infokapslar


[[ Leave Screenshots page ]]

leavePageRemoveAllData = Fjern alle data
// Note: do not translate 'Firefox Screenshots' when translating this string
leavePageErrorAddonRequired = Du må ha Firefox Screenshots installert for å slette kontoen din
leavePageErrorGeneric = Det oppstod ein feil
// Note: do not translate 'Firefox Screenshots' when translating this string
leavePageWarning = Dette vil permanent slette alle dataa dine i Firefox Screenshots.
leavePageButtonProceed = Fortset
leavePageButtonCancel = Avbryt
leavePageDeleted = Alle skjermbilda dine er sletta!


[[ Not Found page ]]

notFoundPageTitle = Fann ikkje sida
notFoundPageIntro = Ups.
notFoundPageDescription = Fann ikkje sida.


[[ Shot page ]]

// This is the HTML title tag of the page
shotPageTitle = Skjermbilde: { $originalTitle }
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
shotPageConfirmDeletion = Er du sikker på at du vil slette dette skjermbildet permanent?
// Note: { $timediff } is a placeholder for a future relative time clause like 'in 3 days' or 'tomorrow'
shotPageExpirationMessage = Viss du ikkje gjer noko, vil dette bildet slettast permanent { $timediff }.
// Note: { $date } is a placeholder for a localized future date as returned by Date.toLocaleString.
// For example, in en-US, { $date } could be "7/12/2017, 1:52:50 PM".
shotPageRestoreButton = bygg oppatt til og med { $date }
shotPageExpiredMessage = Dette bildet har gått ut.
// Note: This phrase is followed by an empty line, then the URL of the source page
shotPageExpiredMessageDetails = Her er sida det vart generert frå:
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
// Note: do not translate 'Firefox Screenshots' when translating this string
shotPageDMCAWarning = Viss bilda dine er emne for fleire krav, kan vi trekkje tilbake tilgangen din til Firefox Screenshots.
// Note: { $url } is a placeholder for a shot page URL
shotPageDMCAIncludeLink = Ta med nettadressa til dette bildet i e-posten din: { $url }
shotPageKeepFor = Kor lenge skal dette skjermbildet behaldast?
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

// { $status } is a placeholder for an HTTP status code, like '500'.
// { $statusText } is a text description of the status code, like 'Internal server error'.
shotIndexPageErrorDeletingShot = Feil ved sletting av bilde: { $status } { $statusText }
// { $searchTerm } is a placeholder for text the user typed into the search box
shotIndexPageSearchResultsTitle = Skjermbilda mine: søk etter { $searchTerm }
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
metricsPageUsersQueryDescription = Tal på brukarar som har laga minst eitt bilde, dagleg (dei siste 30 dagane)
metricsPageUsersQueryCount = Tal på brukarar
metricsPageUsersQueryDay = Dag
metricsPageUserShotsQueryTitle = Tal på bilde pr. brukar
metricsPageUserShotsQueryDescription = Tal på brukarar som har cirka N tal av bilde
metricsPageUserShotsQueryCount = Tal på brukarar
metricsPageUserShotsQueryShots = Cirka-tal på aktive (ikkje utgåtte) bilde
metricsPageRetentionQueryTitle = Tilbakekalla etter veke
metricsPageRetentionQueryDescription = Tal på dagar frå ein brukar sitt første bilde til siste bilde, gruppert etter startveke
metricsPageRetentionQueryUsers = Tal på brukarar
metricsPageRetentionQueryDays = Dagar frå brukaren sitt første bilde til siste bilde
metricsPageRetentionQueryFirstWeek = Veka då brukaren laga det første bildet
metricsPageTotalRetentionQueryTitle = Totalt tilbakekalla
metricsPageTotalRetentionQueryDescription = Kor lenge brukaren har laga bilde, gruppert etter veke
metricsPageTotalRetentionQueryUsers = Tal på brukarar
metricsPageTotalRetentionQueryDays = Dagar brukaren har laga bilde
metricsPageVersionQueryTitle = Utvidingsversjon
metricsPageVersionQueryDescription = Versjonen av utvidinga som vart brukt under innlogginga, dei siste 14 dagane
metricsPageVersionQueryUsers = Tal på brukarar som loggar inn
metricsPageVersionQueryVersion = Utvidingsversjon
metricsPageVersionQueryLastSeen = Dag
metricsPageHeader = Statistikk
// Note: { $created } is a placeholder for a localized date and time, like '4/21/2017, 3:40:04 AM'
metricsPageGeneratedDateTime = Generert: { $created }
// Note { $time } is a placeholder for a number of milliseconds, like '100'
metricsPageDatabaseQueryTime = (databasetid: { $time } ms)
