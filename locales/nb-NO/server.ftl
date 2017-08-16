// Localization for Server-side strings of Firefox Screenshots
// 
// Please don't localize Firefox, Firefox Screenshots, or Screenshots



// Global phrases shared across pages, prefixed with 'g'
[[ global ]]

gMyShots = Mine skjermbilder
gHomeLink = Hjem
gNoShots
    .alt = Ingen skjermbilder funnet
gScreenshotsDescription = Skjermbilder gjort enkelt. Ta, lagre og del skjermbilder uten å forlate Firefox.


[[ Footer ]]

// Note: link text for a link to mozilla.org
footerLinkMozilla = Mozilla
footerLinkTerms = Vilkår
footerLinkPrivacy = Personvernbestemmelser
footerLinkDMCA = Rapporter åndsverkovertredelse 
footerLinkDiscourse = Gi tilbakemelding
footerLinkRemoveAllData = Slett alle data


[[ Creating page ]]

// Note: { $title } is a placeholder for the title of the web page
// captured in the screenshot. The default, for pages without titles, is
// creatingPageTitleDefault.
creatingPageTitle = Lager { $title }
creatingPageTitleDefault = side
creatingPageWaitMessage = Lagrer ditt skjermbilde...


[[ Home page ]]

homePageDescription
    .content = Intuitive skjermbilder bakt rett inn i nettleseren. Ta, lagre og del skjermbilder mens du surfer på nettet ved hjelp av Firefox.
homePageButtonMyShots = Gå til mine skjermbilder
homePageTeaser = Kommer snart…
homePageDownloadFirefoxTitle = Firefox
homePageDownloadFirefoxSubTitle = Gratis nedlasting
homePageGetStarted = Kom i gang
// Note: do not translate 'Firefox Screenshots' when translating this string
homePageHowScreenshotsWorks = Slik fungerer Firefox Screenshots
homePageGetStartedTitle = Kom i gang
// Note: Screenshots is an abbreviation for Firefox Screenshots, and should not be translated.
homePageGetStartedDescription = Finn det nye Screenshots-ikonet på verktøylinjen. Velg det, og Screenshots-menyen vises øverst i nettleservinduet.
homePageCaptureRegion = Ta skjermbilde av et område
// Note: Screenshots is an abbreviation for Firefox Screenshots, and should not be translated.
homePageCaptureRegionDescription = Klikk og dra for å velge området du vil ta skjermbilde av. Eller bare holde musen over og klikk — Screenshots vil velge området for deg. Liker du hva du ser? Velg Lagre for å få tilgang til skjermdumpet ditt på nettet eller pil ned-knappen for å laste den ned til datamaskinen.
homePageCapturePage = Ta skjermbilde av en side
homePageCapturePageDescription = Bruk knappene øverst til høyre for å ta skjermbilde av hele sider. Knappen «Lagre synlig område» tar skjermbilde av området du kan se uten å rulle, og «Lagre hele siden» vil ta skjermbilde av alt på siden.
homePageSaveShare = Lagre og del
// Note: Screenshots is an abbreviation for Firefox Screenshots, and should not be translated.
homePageSaveShareDescription = Når du tar et bilde, laster Firefox opp skjermbildet ditt i din nettbaserte Screenshots-bibliotek og kopierer lenken til utklippstavlen. Vi lagrer skjermbildet automatisk i to uker, men du kan når som helst slette bilder eller endre utløpsdatoen for å beholde dem i biblioteket ditt lenger.
homePageLegalLink = Juridisk
homePagePrivacyLink = Personvern
homePageTermsLink = Vilkår
homePageCookiesLink = Infokapsler


[[ Leave Screenshots page ]]

leavePageRemoveAllData = Fjern alle data
// Note: do not translate 'Firefox Screenshots' when translating this string
leavePageErrorAddonRequired = Du må ha Firefox Screenshots installert for å slette kontoen din
leavePageErrorGeneric = Det oppstod en feil
// Note: do not translate 'Firefox Screenshots' when translating this string
leavePageWarning = Dette vil permanent slette alle dine data for Firefox Screenshots.
leavePageButtonProceed = Fortsett
leavePageButtonCancel = Avbryt
leavePageDeleted = Alle skjermbildene dine er slettet!


[[ Not Found page ]]

notFoundPageTitle = Siden ikke funnet
notFoundPageIntro = Ups.
notFoundPageDescription = Fant ikke siden.


[[ Shot page ]]

// This is the HTML title tag of the page
shotPageTitle = Skjermbilde: { $originalTitle }
shotPageAlertErrorUpdatingExpirationTime = Feil ved lagring av utløpsdato
shotPageAlertErrorDeletingShot = Feil ved sletting av skjermbilde
shotPageAlertErrorUpdatingTitle = Feil ved lagring av tittel
shotPageConfirmDelete = Er du sikker på at du vil slette dette skjermbildet permanent?
shotPageShareButton
    .title = del
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
shotPageShareLink = Få en delbar lenke til dette skjermbildet:
shotPagePrivacyMessage = Alle som har denne lenken kan se dette skjermbildet.
shotPageCopyImageText
    .label = Kopier bildetekst
shotPageConfirmDeletion = Er du sikker på at du vil slette dette skjermbildet permanent?
// Note: { $timediff } is a placeholder for a future relative time clause like 'in 3 days' or 'tomorrow'
shotPageExpirationMessage = Hvis du ikke gjør noe, vil dette bildet bli slettet permanent { $timediff }.
// Note: { $date } is a placeholder for a localized future date as returned by Date.toLocaleString.
// For example, in en-US, { $date } could be "7/12/2017, 1:52:50 PM".
shotPageRestoreButton = gjenopprett til
shotPageExpiredMessage = Dette skjermbildet har utløpt.
// Note: This phrase is followed by an empty line, then the URL of the source page
shotPageExpiredMessageDetails = Her er siden den ble opprinnelig generert fra:
shotPageDeleteButton
    .title = Slett dette skjermbildet
shotPageAbuseButton
    .title = Rapporter dette bildet for brudd, spam eller andre problemer
shotPageDownloadShot
    .title = Last ned
shotPageDownload = Last ned
shotPageScreenshotsDescription = Skjermbilder gjort enkelt. Ta, lagre og del skjermbilder uten å forlate Firefox.
shotPageUpsellFirefox = Last ned Firefox nå
shotPageDMCAMessage = Dette bildet er ikke lenger tilgjengelig på grunn av en tredjeparts immaterielle krav.
// Note: { $dmca } is a placeholder for a link to send email (a 'mailto' link)
shotPageDMCAContact = Send en e-post til { $dmca } for å be om ytterligere informasjon.
// Note: do not translate 'Firefox Screenshots' when translating this string
shotPageDMCAWarning = Hvis bildene dine er gjenstand for flere krav, kan vi trekke tilbake din tilgang til Firefox Screenshots.
// Note: { $url } is a placeholder for a shot page URL
shotPageDMCAIncludeLink = Ta med nettadressen til dette bildet i e-posten din: { $url }
shotPageKeepFor = Hvor lenge skal dette skjermbildet beholdes?
// Note: shotPageSelectTime is a placeholder label for the time selection dropdown.
shotPageSelectTime = Velg tid
shotPageKeepIndefinitely = Uendelig
shotPageKeepTenMinutes = 10 minutter
shotPageKeepOneHour = 1 time
shotPageKeepOneDay = 1 dag
shotPageKeepOneWeek = 1 uke
shotPageKeepTwoWeeks = 2 uker
shotPageKeepOneMonth = 1 måned
shotPageSaveExpiration = lagre
shotPageCancelExpiration = avbryt
shotPageDoesNotExpire = utløper ikke
// Note: { $timediff } is a placeholder for a future relative time clause, like "in 1 week" or "tomorrow"
shotPageExpiresIn = utløper { $timediff }
// Note: { $timediff } is a placeholder for a past relative time clause, like "1 week ago" or "yesterday"
shotPageExpired = utløpt { $timediff }
timeDiffJustNow = akkurat nå
timeDiffMinutesAgo = { $num ->
        [one] 1 minutt siden
       *[other] { $number } minutter siden
    }
timeDiffHoursAgo = { $num ->
        [one] 1 time siden
       *[other] { $number } timer siden
    }
timeDiffDaysAgo = { $num ->
        [one] i går
       *[other] { $number } dager siden
    }
timeDiffFutureSeconds = om noen få sekunder
timeDiffFutureMinutes = { $num ->
        [one] om 1 minutt
       *[other] om { $number } minutter
    }
timeDiffFutureHours = { $num ->
        [one] om 1 time
       *[other] om { $number } timer
    }
timeDiffFutureDays = { $num ->
        [one] i morgen
       *[other] om { $number } dager
    }


[[ Shotindex page ]]

// { $status } is a placeholder for an HTTP status code, like '500'.
// { $statusText } is a text description of the status code, like 'Internal server error'.
shotIndexPageErrorDeletingShot = Feil ved sletting av bilde: { $status } { $statusText }
// { $searchTerm } is a placeholder for text the user typed into the search box
shotIndexPageSearchResultsTitle = Mine skjermbilder: søk etter { $searchTerm }
// { $error } is a placeholder for a non-translated error message that could be shared
// with developers when debugging an error.
shotIndexPageErrorRendering = Feil ved opptegning av siden: { $error }
shotIndexPageSearchPlaceholder
    .placeholder = Søk mine skjermbilder
shotIndexPageSearchButton
    .title = Søk
shotIndexPageNoShotsMessage = Ingen lagrede bilder.
shotIndexPageNoShotsInvitation = Kom igjen, lag noen.
shotIndexPageLookingForShots = Leter etter bildene dine…
shotIndexPageNoSearchResultsIntro = Hmm
shotIndexPageNoSearchResults = Vi kan ikke finne noen bilder som passer med søket ditt.
shotIndexPageClearSearchButton
    .title = Tøm søk
shotIndexPageConfirmShotDelete = Slett dette skjermbildet


// all metrics strings are optional for translation
[[ Metrics page ]]

// Note: 'Firefox Screenshots' should not be translated
metricsPageTitle = Firefox Screenshots Metrics
metricsPageTotalsQueryTitle = Totals
// Note: Screenshots is an abbreviation for Firefox Screenshots, and should not be translated.
metricsPageTotalsQueryDescription = An overview of Screenshots
metricsPageTotalsQueryDevices = Total devices registered
metricsPageTotalsQueryActiveShots = Active shots
metricsPageTotalsQueryExpiredShots = Expired (but recoverable)
metricsPageTotalsQueryExpiredDeletedShots = Expired (and deleted)
metricsPageShotsQueryTitle = Shots by Day
metricsPageShotsQueryDescription = Number of shots created each day (for the last 30 days)
metricsPageShotsQueryCount = Number of shots
metricsPageShotsQueryDay = Day
metricsPageUsersQueryTitle = Users by Day
metricsPageUsersQueryDescription = Number of users who created at least one shot, by day (last 30 days)
metricsPageUsersQueryCount = Number of users
metricsPageUsersQueryDay = Day
metricsPageUserShotsQueryTitle = Number of Shots per User
metricsPageUserShotsQueryDescription = The number of users who have about N total shots
metricsPageUserShotsQueryCount = Number of users
metricsPageUserShotsQueryShots = Approximate number of active (unexpired) shots
metricsPageRetentionQueryTitle = Retention by Week
metricsPageRetentionQueryDescription = Number of days from a userʼs first shot to most recent shot, grouped by starting week
metricsPageRetentionQueryUsers = Number of users
metricsPageRetentionQueryDays = Days from the userʼs first to most recent shot
metricsPageRetentionQueryFirstWeek = Week the user first created a shot
metricsPageTotalRetentionQueryTitle = Total Retention
metricsPageTotalRetentionQueryDescription = Length of time users have been creating shots, grouped by week
metricsPageTotalRetentionQueryUsers = Number of users
metricsPageTotalRetentionQueryDays = Days the user has been creating shots
metricsPageVersionQueryTitle = Add-on Version
metricsPageVersionQueryDescription = The version of the add-on used during login, in the last 14 days
metricsPageVersionQueryUsers = Number of users logging in
metricsPageVersionQueryVersion = Add-on version
metricsPageVersionQueryLastSeen = Day
metricsPageHeader = Metrics
// Note: { $created } is a placeholder for a localized date and time, like '4/21/2017, 3:40:04 AM'
metricsPageGeneratedDateTime = Generated at: { $created }
// Note { $time } is a placeholder for a number of milliseconds, like '100'
metricsPageDatabaseQueryTime = (database time: { $time }ms)
