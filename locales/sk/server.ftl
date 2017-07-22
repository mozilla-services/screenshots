// Localization for Server-side strings of Firefox Screenshots
// 
// Please don't localize Firefox, Firefox Screenshots, or Screenshots



// Global phrases shared across pages, prefixed with 'g'
[[ global ]]

gMyShots = Moje snímky
gHomeLink = Domov
gNoShots
    .alt = Neboli nájdené žiadne snímky
gScreenshotsDescription = Jednoduchá tvorba snímok obrazovky. Vytvorte, uložte a zdieľajte snímky obrazovky bez toho, aby ste museli opustiť Firefox.


[[ Creating page ]]

// Note: { $title } is a placeholder for the title of the web page
// captured in the screenshot. The default, for pages without titles, is
// creatingPageTitleDefault.
creatingPageTitle = Vytváram snímku { $title }
creatingPageTitleDefault = stránky


[[ Home page ]]

homePageDescription
    .content = Intuitívne snímky obrazovky priamo v prehliadači. Zachyťte, uložte a zdieľajte snímky obrazovky priamo pri prehliadaní pomocou Firefoxu.
homePageButtonMyShots = Prejsť na moje snímky
homePageTeaser = Už čoskoro...
homePageDownloadFirefoxTitle = Firefox
homePageDownloadFirefoxSubTitle = Prevziať zadarmo
homePageGetStarted = Začíname
// Note: do not translate 'Firefox Screenshots' when translating this string
homePageHowScreenshotsWorks = Ako služba Firefox Screenshots funguje
homePageGetStartedTitle = Začíname
// Note: Screenshots is an abbreviation for Firefox Screenshots, and should not be translated.
homePageGetStartedDescription = Novú ikonu služby Screenshots nájdete na vašom paneli nástrojov. Po kliknutí na ňu sa v hornej časti okna vášho prehliadača zobrazí ponuka.
homePageCaptureRegion = Vytvorte snímku oblasti
homePageCapturePage = Vytvorte snímku celej stránky
homePageSaveShare = Uložte a zdieľajte
homePageLegalLink = Právne informácie
homePagePrivacyLink = Súkromie
homePageTermsLink = Podmienky používania
homePageCookiesLink = Cookies


[[ Leave Screenshots page ]]

leavePageConfirmDelete = Potvrdenie odstránenia účtu
// Note: do not translate 'Firefox Screenshots' when translating this string
leavePageErrorAddonRequired = Na vymazanie svojho účtu musíte mať nainštalovanú službu Firefox Screenshots
leavePageErrorGeneric = Vyskytla sa chyba
// Note: do not translate 'Firefox Screenshots' when translating this string
leavePageWarning = Toto natrvalo vymaže zo služby Firefox Screenshots všetky vaše údaje.
leavePageButtonProceed = Pokračovať
leavePageButtonCancel = Zrušiť
leavePageDeleted = Všetky vaše snímky boli odstránené!


[[ Not Found page ]]

notFoundPageTitle = Stránka nebola nájdená
notFoundPageIntro = Hups.
notFoundPageDescription = Stránka nebola nájdená.


[[ Shot page ]]

shotPageAlertErrorDeletingShot = Pri odstraňovaní snímky sa vyskytla chyba
shotPageAlertErrorUpdatingTitle = Pri ukladaní názvu sa vyskytla chyba
shotPageConfirmDelete = Naozaj chcete natrvalo odstrániť túto snímku?
shotPageShareButton
    .title = Zdieľať
shotPageCopy = Kopírovať
shotPageCopied = Skopírované
shotPageShareFacebook
    .title = Zdieľať na Facebooku
shotPageShareTwitter
    .title = Zdieľať na Twitteri
shotPageSharePinterest
    .title = Zdieľať na Pintereste
shotPageShareEmail
    .title = Zdieľať odkaze e-mailom
shotPagePrivacyMessage = Na túto snímku sa bude môcť pozrieť každý, kto bude mať tento odkaz.
shotPageCopyImageText
    .label = Kopírovať text z obrázka
shotPageConfirmDeletion = Naozaj chcete natrvalo odstrániť túto snímku?
// Note: This phrase is followed by an empty line, then the URL of the source page
shotPageExpiredMessageDetails = Stránka, z ktorej bola snímka vytvorená:
shotPageDeleteButton
    .title = Odstrániť túto snímku
shotPageDownloadShot
    .title = Prevziať
shotPageDownload = Prevziať
shotPageScreenshotsDescription = Jednoduchá tvorba snímok obrazovky. Vytvorte, uložte a zdieľajte snímky obrazovky bez toho, aby ste museli opustiť Firefox.
shotPageUpsellFirefox = Získajte Firefox teraz
shotPageKeepFor = Na ako dlho má byť táto snímka uložená?
// Note: shotPageSelectTime is a placeholder label for the time selection dropdown.
shotPageSelectTime = Vyberte čas
shotPageKeepIndefinitely = na neurčito
shotPageKeepTenMinutes = 10 minút
shotPageKeepOneHour = 1 hodinu
shotPageKeepOneDay = 1 deň
shotPageKeepOneWeek = 1 týždeň
shotPageKeepTwoWeeks = 2 týždne
shotPageKeepOneMonth = 1 mesiac
shotPageSaveExpiration = uložiť
shotPageCancelExpiration = zrušiť
timeDiffJustNow = práve teraz
timeDiffMinutesAgo = { $num ->
        [one] pred 1 minútou
        [few] pred { $number } minútami
       *[other] pred { $number } minútami
    }
timeDiffHoursAgo = { $num ->
        [one] pred hodinou
        [few] pred { $number } hodinami
       *[other] pred { $number } hodinami
    }
timeDiffDaysAgo = { $num ->
        [one] včera
        [few] pred { $number } dňami
       *[other] pred { $number } dňami
    }
timeDiffFutureSeconds = za pár sekúnd
timeDiffFutureMinutes = { $num ->
        [one] za minútu
        [few] za { $number } minúty
       *[other] za { $number } minút
    }
timeDiffFutureHours = { $num ->
        [one] za hodinu
        [few] za { $number } hodiny
       *[other] za { $number } hodín
    }
timeDiffFutureDays = { $num ->
        [one] zajtra
        [few] za { $number } dni
       *[other] za { $number } dní
    }


[[ Shotindex page ]]

shotIndexPageSearchButton
    .title = Hľadať
shotIndexPageNoShotsMessage = Žiadne uložené snímky
shotIndexPageNoSearchResultsIntro = Hmm
shotIndexPageConfirmShotDelete = Odstrániť túto snímku?


// all metrics strings are optional for translation
[[ Metrics page ]]

// Note: 'Firefox Screenshots' should not be translated
metricsPageTitle = Metriky Firefox Screenshots
metricsPageTotalsQueryTitle = Celkom
metricsPageShotsQueryDay = Deň
metricsPageUsersQueryCount = Počet používateľov
metricsPageUsersQueryDay = Deň
metricsPageUserShotsQueryCount = Počet používateľov
metricsPageRetentionQueryUsers = Počet používateľov
metricsPageTotalRetentionQueryUsers = Počet používateľov
metricsPageVersionQueryTitle = Verzia doplnku
metricsPageVersionQueryVersion = Verzia doplnku
metricsPageVersionQueryLastSeen = Deň
metricsPageHeader = Metriky
// Note: { $created } is a placeholder for a localized date and time, like '4/21/2017, 3:40:04 AM'
metricsPageGeneratedDateTime = Vygenerované: { $created }
// Note { $time } is a placeholder for a number of milliseconds, like '100'
metricsPageDatabaseQueryTime = (čas databázy: { $time } ms)
