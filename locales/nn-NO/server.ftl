// Localization for Server-side strings of Firefox Screenshots
// 
// Please don't localize Firefox, Firefox Screenshots, or Screenshots



// Global phrases shared across pages, prefixed with 'g'
[[ global ]]

gMyShots = Mine skjermbilde
gHomeLink = Heim
gNoShots
    .alt = Fann ingen skjermbilde


[[ Creating page ]]

// Note: { $title } is a placeholder for the title of the web page
// captured in the screenshot. The default, for pages without titles, is
// creatingPageTitleDefault.
creatingPageTitle = Lagar { $title }
creatingPageTitleDefault = side


[[ Home page ]]

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
shotPageCopyImageText
    .label = Kopier bildetekst
shotPageDeleteButton
    .title = Slett dette skjermbildet
shotPageDownloadShot
    .title = Last ned
shotPageDownload = Last ned
shotPageUpsellFirefox = Last ned Firefox no
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
shotPageExpiresIn = går ut om { $timediff }
// Note: { $timediff } is a placeholder for a past relative time clause, like "1 week ago" or "yesterday"
shotPageExpired = gått ut for { $timediff }
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
timeDiffFutureHours = 
timeDiffFutureDays = { $num ->
        [one] i morgon
       *[other] om { $number } dagar
    }


[[ Shotindex page ]]

shotIndexPageSearchButton
    .title = Søk
shotIndexPageNoShotsMessage = Ingen lagra bilde.
shotIndexPageNoSearchResultsIntro = Hmm
shotIndexPageClearSearchButton
    .title = Tøm søk
shotIndexPageConfirmShotDelete = Slette dette bildet?


// all metrics strings are optional for translation
[[ Metrics page ]]

metricsPageShotsQueryCount = Tal på bilde
metricsPageShotsQueryDay = Dag
metricsPageUsersQueryTitle = Brukarar pr. dag
metricsPageUsersQueryDay = Dag
metricsPageVersionQueryLastSeen = Dag
metricsPageHeader = Statistikk
