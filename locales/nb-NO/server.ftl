// Localization for Server-side strings of Firefox Screenshots
// 
// Please don't localize Firefox, Firefox Screenshots, or Screenshots



// Global phrases shared across pages, prefixed with 'g'
[[ global ]]

gMyShots = Mine skjermbilder
gHomeLink = Hjem
gNoShots
    .alt = Ingen skjermbilder funnet


[[ Creating page ]]

// Note: { $title } is a placeholder for the title of the web page
// captured in the screenshot. The default, for pages without titles, is
// creatingPageTitleDefault.
creatingPageTitle = Lager { $title }
creatingPageTitleDefault = side


[[ Home page ]]

homePageButtonMyShots = Gå til mine skjermbilder
homePageTeaser = Kommer snart…
homePageDownloadFirefoxTitle = Firefox
homePageDownloadFirefoxSubTitle = Gratis nedlasting
homePageGetStarted = Kom i gang
// Note: do not translate 'Firefox Screenshots' when translating this string
homePageHowScreenshotsWorks = Slik fungerer Firefox Screenshots
homePageGetStartedTitle = Kom i gang
homePageCaptureRegion = Ta skjermbilde av et område
// Note: Screenshots is an abbreviation for Firefox Screenshots, and should not be translated.
homePageCaptureRegionDescription = Klikk og dra for å velge området du vil ta skjermbilde av. Eller bare holde musen over og klikk — Screenshots vil velge området for deg. Liker du hva du ser? Velg Lagre for å få tilgang til skjermdumpet ditt på nettet eller pil ned-knappen for å laste den ned til datamaskinen.
homePageCapturePage = Ta skjermbilde av en side
homePageSaveShare = Lagre og del
homePageLegalLink = Juridisk
homePagePrivacyLink = Personvern
homePageTermsLink = Vilkår
homePageCookiesLink = Infokapsler


[[ Leave Screenshots page ]]

leavePageConfirmDelete = Bekreft sletting av konto
// Note: do not translate 'Firefox Screenshots' when translating this string
leavePageErrorAddonRequired = Du må ha Firefox Screenshots installert for å slette kontoen din
leavePageErrorGeneric = Det oppstod en feil
leavePageButtonProceed = Fortsett
leavePageButtonCancel = Avbryt
leavePageDeleted = Alle skjermbildene dine er slettet!


[[ Not Found page ]]

notFoundPageTitle = Siden ikke funnet
notFoundPageIntro = Ups.
notFoundPageDescription = Fant ikke siden.


[[ Shot page ]]

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
shotPageDeleteButton
    .title = Slett dette skjermbildet
shotPageDownloadShot
    .title = Last ned
shotPageDownload = Last ned
shotPageUpsellFirefox = Last ned Firefox nå
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

shotIndexPageSearchPlaceholder
    .placeholder = Søk mine skjermbilder
shotIndexPageSearchButton
    .title = Søk
shotIndexPageNoSearchResultsIntro = Hmm
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
