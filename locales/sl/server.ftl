// Localization for Server-side strings of Firefox Screenshots
// 
// Please don't localize Firefox, Firefox Screenshots, or Screenshots



// Global phrases shared across pages, prefixed with 'g'
[[ global ]]

gMyShots = Moji posnetki
gHomeLink = Domov
gNoShots
    .alt = Ni najdenih posnetkov
gScreenshotsDescription = Poenostavljeni posnetki zaslona. Zajemite, shranite in delite zaslonske posnetke, ne da bi zapustili Firefox.


[[ Creating page ]]

// Note: { $title } is a placeholder for the title of the web page
// captured in the screenshot. The default, for pages without titles, is
// creatingPageTitleDefault.
creatingPageTitle = Ustvarjam { $title }
creatingPageTitleDefault = stran


[[ Home page ]]

homePageDescription
    .content = Intuitivni posnetki zaslona kar v brskalniku. Med brskanjem po spletu lahko s Firefoxom ustvarite, shranite in delite posnetke zaslona.
homePageButtonMyShots = Pojdi na moje posnetke
homePageTeaser = Kmalu na voljo ...
homePageDownloadFirefoxTitle = Firefox
homePageDownloadFirefoxSubTitle = Brezplačen prenos
// Note: do not translate 'Firefox Screenshots' when translating this string
homePageHowScreenshotsWorks = Kako deluje Firefox Screenshots
homePageCaptureRegion = Zajemi območje
homePageCapturePage = Zajemi stran
homePageSaveShare = Shrani in deli
homePageLegalLink = Pravno obvestilo
homePagePrivacyLink = Zasebnost
homePageTermsLink = Pogoji
homePageCookiesLink = Piškotki


[[ Leave Screenshots page ]]

leavePageConfirmDelete = Potrdite brisanje računa
// Note: do not translate 'Firefox Screenshots' when translating this string
leavePageErrorAddonRequired = Za izbris računa morate imeti nameščen Firefox Screenshots
leavePageErrorGeneric = Prišlo je do napake
leavePageButtonProceed = Nadaljuj
leavePageButtonCancel = Prekliči
leavePageDeleted = Vsi vaši posnetki so bili izbrisani!


[[ Not Found page ]]

notFoundPageTitle = Strani ni mogoče najti
notFoundPageIntro = Ups.
notFoundPageDescription = Strani ni mogoče najti.


[[ Shot page ]]

shotPageAlertErrorDeletingShot = Napaka pri brisanju posnetka
shotPageAlertErrorUpdatingTitle = Napaka pri shranjevanju naslova
shotPageConfirmDelete = Ali ste prepričani, da želite trajno izbrisati ta posnetek?
shotPageShareButton
    .title = Deli
shotPageCopy = Kopiraj
shotPageCopied = Kopirano
shotPageShareFacebook
    .title = Deli na Facebooku
shotPageShareTwitter
    .title = Deli na Twitterju
shotPageSharePinterest
    .title = Deli na Pinterestu
shotPageShareEmail
    .title = Deli povezavo preko e-pošte
shotPageCopyImageText
    .label = Kopiraj besedilo slike
shotPageConfirmDeletion = Ali ste prepričani, da želite trajno izbrisati ta posnetek?
// Note: { $date } is a placeholder for a localized future date as returned by Date.toLocaleString.
// For example, in en-US, { $date } could be "7/12/2017, 1:52:50 PM".
shotPageRestoreButton = obnovi do { $date }
shotPageExpiredMessage = Ta posnetek je potekel
shotPageDeleteButton
    .title = Izbriši ta posnetek
shotPageScreenshotsDescription = Poenostavljeni posnetki zaslona. Zajemite, shranite in delite zaslonske posnetke, ne da bi zapustili Firefox.
shotPageUpsellFirefox = Prenesite Firefox zdaj
// Note: shotPageSelectTime is a placeholder label for the time selection dropdown.
shotPageSelectTime = Izberite čas
shotPageKeepIndefinitely = Za nedoločen čas
shotPageKeepTenMinutes = 10 minut
shotPageKeepOneHour = 1 uro
shotPageKeepOneDay = 1 dan
shotPageKeepOneWeek = 1 teden
shotPageKeepTwoWeeks = 2 tedna
shotPageKeepOneMonth = 1 mesec
shotPageSaveExpiration = shrani
shotPageCancelExpiration = prekliči
shotPageDoesNotExpire = ne poteče
// Note: { $timediff } is a placeholder for a future relative time clause, like "in 1 week" or "tomorrow"
shotPageExpiresIn = poteče { $timediff }
// Note: { $timediff } is a placeholder for a past relative time clause, like "1 week ago" or "yesterday"
shotPageExpired = poteklo { $timediff }
timeDiffJustNow = zdaj
timeDiffMinutesAgo = { $num ->
        [one] pred 1 minuto
        [two] pred { $number } minutama
        [few] pred { $number } minutami
       *[other] pred { $number } minutami
    }
timeDiffHoursAgo = { $num ->
        [one] pred 1 uro
        [two] pred { $number } urama
        [few] pred { $number } urami
       *[other] pred { $number } urami
    }
timeDiffDaysAgo = { $num ->
        [one] včeraj
        [two] pred { $number } dnevoma
        [few] pred { $number } dnevi
       *[other] pred { $number } dnevi
    }
timeDiffFutureMinutes = { $num ->
        [one] čez 1 minuto
        [two] čez { $number } minuti
        [few] čez { $number } minute
       *[other] čez { $number } minute
    }
timeDiffFutureHours = { $num ->
        [one] čez 1 uro
        [two] čez { $number } uri
        [few] čez { $number } ure
       *[other] čez { $number } ure
    }
timeDiffFutureDays = { $num ->
        [one] jutri
        [two] čez { $number } dni
        [few] čez { $number } dni
       *[other] čez { $number } dni
    }


[[ Shotindex page ]]

// { $status } is a placeholder for an HTTP status code, like '500'.
// { $statusText } is a text description of the status code, like 'Internal server error'.
shotIndexPageErrorDeletingShot = Napaka pri brisanju posnetka: { $status } { $statusText }
// { $searchTerm } is a placeholder for text the user typed into the search box
shotIndexPageSearchResultsTitle = Moji posnetki: išči { $searchTerm }
shotIndexPageSearchButton
    .title = Išči
shotIndexPageNoShotsMessage = Ni shranjenih posnetkov.
shotIndexPageNoSearchResultsIntro = Hmm
shotIndexPageClearSearchButton
    .title = Počisti iskanje
shotIndexPageConfirmShotDelete = Izbrišem ta posnetek?


// all metrics strings are optional for translation
[[ Metrics page ]]

// Note: 'Firefox Screenshots' should not be translated
metricsPageTitle = Metrika Firefox Screenshots
metricsPageTotalsQueryActiveShots = Aktivni posnetki
metricsPageShotsQueryCount = Število posnetkov
metricsPageShotsQueryDay = Dan
metricsPageUsersQueryCount = Število uporabnikov
metricsPageUsersQueryDay = Dan
metricsPageUserShotsQueryCount = Število uporabnikov
metricsPageRetentionQueryUsers = Število uporabnikov
metricsPageTotalRetentionQueryUsers = Število uporabnikov
metricsPageVersionQueryTitle = Različica dodatka
metricsPageVersionQueryVersion = Različica dodatka
metricsPageVersionQueryLastSeen = Dan
metricsPageHeader = Metrika
// Note: { $created } is a placeholder for a localized date and time, like '4/21/2017, 3:40:04 AM'
metricsPageGeneratedDateTime = Ustvarjeno: { $created }
