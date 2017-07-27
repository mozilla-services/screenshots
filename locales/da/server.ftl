// Localization for Server-side strings of Firefox Screenshots
// 
// Please don't localize Firefox, Firefox Screenshots, or Screenshots



// Global phrases shared across pages, prefixed with 'g'
[[ global ]]

gMyShots = Mine skærmbilleder
gHomeLink = Start
gNoShots
    .alt = Ingen skærmbilleder fundet
gScreenshotsDescription = Skærmbilleder helt enkelt. Tag, gem og del skærmbilleder uden at forlade Firefox.


[[ Footer ]]

// Note: link text for a link to mozilla.org
footerLinkMozilla = Mozilla
footerLinkPrivacy = Privatlivspolitik
footerLinkDiscourse = Giv feedback
footerLinkRemoveAllData = Fjern alle data


[[ Creating page ]]

// Note: { $title } is a placeholder for the title of the web page
// captured in the screenshot. The default, for pages without titles, is
// creatingPageTitleDefault.
creatingPageTitle = Laver { $title } 
creatingPageTitleDefault = side


[[ Home page ]]

homePageButtonMyShots = Gå til Mine skærmbilleder
homePageTeaser = Kommer snart…
homePageDownloadFirefoxTitle = Firefox
homePageDownloadFirefoxSubTitle = Gratis download
homePageGetStarted = Kom i gang
// Note: do not translate 'Firefox Screenshots' when translating this string
homePageHowScreenshotsWorks = Sådan virker Firefox Screenshots
homePageGetStartedTitle = Kom i gang
// Note: Screenshots is an abbreviation for Firefox Screenshots, and should not be translated.
homePageGetStartedDescription = Find det nye Screenshots-ikon på din værktøjslinje. Vælg det, og Screenshots-menuen vises øverst i browservinduet.
homePageCaptureRegion = Gem et område
homePageCapturePage = Gem en side
homePageSaveShare = Gem og del
homePagePrivacyLink = Privatliv
homePageTermsLink = Betingelser
homePageCookiesLink = Cookies


[[ Leave Screenshots page ]]

leavePageConfirmDelete = Bekræft sletning af konto
// Note: do not translate 'Firefox Screenshots' when translating this string
leavePageErrorAddonRequired = Du skal have Firefox Screenshots installeret for at slette din konto
leavePageErrorGeneric = Der opstod en fejl
// Note: do not translate 'Firefox Screenshots' when translating this string
leavePageWarning = Dette vil slette alle dine Firefox Screenshots-data permanent. 
leavePageButtonProceed = Fortsæt
leavePageButtonCancel = Annuller
leavePageDeleted = Alle dine skærmbilleder er blevet slettet!


[[ Not Found page ]]

notFoundPageTitle = Siden blev ikke fundet
notFoundPageIntro = Hovsa.
notFoundPageDescription = Siden blev ikke fundet.


[[ Shot page ]]

shotPageAlertErrorUpdatingExpirationTime = Der opstod en fejl, da udløbsdatoen skulle gemmes
shotPageAlertErrorDeletingShot = Der opstod en fejl, da skærmbilledet skulle slettes
shotPageAlertErrorUpdatingTitle = Der opstod en fejl, da titlen skulle gemmes
shotPageConfirmDelete = Er du sikker på, at du vil slette dette skærmbillede permanent?
shotPageShareButton
    .title = Del
shotPageCopy = Kopier
shotPageCopied = Kopieret
shotPageShareFacebook
    .title = Del på Facebook
shotPageShareTwitter
    .title = Del på Twitter
shotPageSharePinterest
    .title = Del på Pinterest
shotPageShareEmail
    .title = Del link via mail
shotPageShareLink = Få et link til deling af dette skærmbillede:
shotPagePrivacyMessage = Enhver med linket kan se dette skærmbillede.
shotPageCopyImageText
    .label = Kopier billedtekst
shotPageConfirmDeletion = Er du sikker på, at du vil slette dette skærmbillede permanent?
// Note: { $timediff } is a placeholder for a future relative time clause like 'in 3 days' or 'tomorrow'
shotPageExpirationMessage = Hvis du ikke gør noget, vil dette skærmbillede blive slettet permanent { $timediff }.
// Note: { $date } is a placeholder for a localized future date as returned by Date.toLocaleString.
// For example, in en-US, { $date } could be "7/12/2017, 1:52:50 PM".
shotPageRestoreButton = gendan indtil { $date }
shotPageExpiredMessage = Dette skærmbillede er udløbet.
// Note: This phrase is followed by an empty line, then the URL of the source page
shotPageExpiredMessageDetails = Her er siden, det oprindeligt blev oprettet fra:
shotPageDeleteButton
    .title = Slet dette skærmbillede
shotPageAbuseButton
    .title = Indberet dette skærmbillede for misbrug, spam eller andre problemer
shotPageDownloadShot
    .title = Hent
shotPageDownload = Hent
shotPageScreenshotsDescription = Skærmbilleder helt enkelt. Tag, gem og del skærmbilleder uden af forlade Firefox.
shotPageUpsellFirefox = Hent Firefox nu
// Note: { $dmca } is a placeholder for a link to send email (a 'mailto' link)
shotPageDMCAContact = Send en mail til { $dmca } for at få yderligere oplysninger.
// Note: { $url } is a placeholder for a shot page URL
shotPageDMCAIncludeLink = Inkluder dette billedes URL i din mail: { $url }
shotPageKeepFor = Hvor længe skal dette skærmbillede beholdes?
// Note: shotPageSelectTime is a placeholder label for the time selection dropdown.
shotPageSelectTime = Vælg tid
shotPageKeepIndefinitely = Uendeligt
shotPageKeepTenMinutes = 10 minutter
shotPageKeepOneHour = 1 time
shotPageKeepOneDay = 1 dag
shotPageKeepOneWeek = 1 uge
shotPageKeepTwoWeeks = 2 uger
shotPageKeepOneMonth = 1 måned
shotPageSaveExpiration = gem
shotPageCancelExpiration = annuller
shotPageDoesNotExpire = udløber ikke
// Note: { $timediff } is a placeholder for a future relative time clause, like "in 1 week" or "tomorrow"
shotPageExpiresIn = udløber om { $timediff }
timeDiffJustNow = netop nu
timeDiffMinutesAgo = { $num ->
        [one] 1 minut siden
       *[other] { $number } minutter siden
    }
timeDiffHoursAgo = { $num ->
        [one] 1 time siden
       *[other] { $number } timer siden
    }
timeDiffDaysAgo = { $num ->
        [one] i går
       *[other] { $number } dage siden
    }
timeDiffFutureSeconds = om et par sekunder
timeDiffFutureMinutes = { $num ->
        [one] om 1 minut
       *[other] om { $number } minutter
    }
timeDiffFutureHours = { $num ->
        [one] om 1 time
       *[other] om { $number } timer
    }
timeDiffFutureDays = { $num ->
        [one] i morgen
       *[other] om { $number } dage
    }


[[ Shotindex page ]]

// { $status } is a placeholder for an HTTP status code, like '500'.
// { $statusText } is a text description of the status code, like 'Internal server error'.
shotIndexPageErrorDeletingShot = Der opstod en fejl, da skærmbilledet skulle slettes: { $status } { $statusText }
// { $searchTerm } is a placeholder for text the user typed into the search box
shotIndexPageSearchResultsTitle = Mine skærmbilleder: søg efter { $searchTerm }
// { $error } is a placeholder for a non-translated error message that could be shared
// with developers when debugging an error.
shotIndexPageErrorRendering = Der opstod en fejl, da siden skulle skabes: { $error }
shotIndexPageSearchPlaceholder
    .placeholder = Søg i mine skærmbilleder
shotIndexPageSearchButton
    .title = Søg
shotIndexPageNoShotsMessage = Ingen gemte skærmbilleder.
shotIndexPageLookingForShots = Leder efter dine skærmbilleder...
shotIndexPageNoSearchResultsIntro = Hmm
shotIndexPageNoSearchResults = Vi kan ikke finde nogle skærmbilleder, der matcher din søgning.
shotIndexPageClearSearchButton
    .title = Ryd søgning
shotIndexPageConfirmShotDelete = Slet dette skærmbillede?


// all metrics strings are optional for translation
[[ Metrics page ]]

// Note: 'Firefox Screenshots' should not be translated
metricsPageTitle = Statistik for Firefox Screenshots
// Note: Screenshots is an abbreviation for Firefox Screenshots, and should not be translated.
metricsPageTotalsQueryDescription = Et overblik over Screenshots
metricsPageTotalsQueryDevices = Antal registrerede enheder
metricsPageTotalsQueryActiveShots = Aktive skærmbilleder
metricsPageTotalsQueryExpiredShots = Udløbet (men kan genoprettes)
metricsPageTotalsQueryExpiredDeletedShots = Udløbet (og slettet)
metricsPageShotsQueryTitle = Skærmbilleder per dag
metricsPageShotsQueryDescription = Antal skærmbilleder taget hver dag (de seneste 30 dage)
metricsPageShotsQueryCount = Antal skærmbilleder
metricsPageShotsQueryDay = Dag
metricsPageUsersQueryTitle = Brugere per dag
metricsPageUsersQueryDescription = Antal brugere, der har taget mindst ét skærmbillede om dagen (de seneste 30 dage)
metricsPageUsersQueryCount = Antal brugere
metricsPageUsersQueryDay = Dag
metricsPageUserShotsQueryTitle = Antal skærmbilleder per bruger
metricsPageUserShotsQueryDescription = Antal brugere, der har omkring N skærmbilleder i alt
metricsPageUserShotsQueryCount = Antal brugere
metricsPageUserShotsQueryShots = Anslået antal aktive (ikke udløbne) skærmbilleder
metricsPageRetentionQueryUsers = Antal brugere
metricsPageRetentionQueryDays = Dage fra brugerens første til brugerens seneste skærmbillede
metricsPageRetentionQueryFirstWeek = Uge, hvor brugeren først tog et skærmbillede
metricsPageTotalRetentionQueryUsers = Antal brugere
metricsPageTotalRetentionQueryDays = Dage, brugeren har taget skærmbilleder
metricsPageVersionQueryTitle = Tilføjelses-version
metricsPageVersionQueryDescription = Den tilføjelses-version, der blev brugt under login i de seneste 14 dage
metricsPageVersionQueryUsers = Antal brugere, der logger ind
metricsPageVersionQueryVersion = Tilføjelses-version
metricsPageVersionQueryLastSeen = Dag
metricsPageHeader = Statistik
// Note: { $created } is a placeholder for a localized date and time, like '4/21/2017, 3:40:04 AM'
metricsPageGeneratedDateTime = Genereret den: { $created }
// Note { $time } is a placeholder for a number of milliseconds, like '100'
metricsPageDatabaseQueryTime = (databasetid: { $time }ms)
