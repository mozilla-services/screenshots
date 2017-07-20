// Localization for Server-side strings of Firefox Screenshots
// 
// Please don't localize Firefox, Firefox Screenshots, or Screenshots



// Global phrases shared across pages, prefixed with 'g'
[[ global ]]

gMyShots = Mé snímky
gHomeLink = Domů
gNoShots
    .alt = Žádné snímky nenalezeny
gScreenshotsDescription = Jednoduchá tvorba snímků webových stránek. Vytvářejte, ukládejte i sdílejte přímo z Firefoxu.


[[ Creating page ]]

// Note: { $title } is a placeholder for the title of the web page
// captured in the screenshot. The default, for pages without titles, is
// creatingPageTitleDefault.
creatingPageTitle = Vytváření snímku { $title }
creatingPageTitleDefault = stránky


[[ Home page ]]

homePageDownloadFirefoxTitle = Firefox
homePageGetStarted = Začít
// Note: do not translate 'Firefox Screenshots' when translating this string
homePageHowScreenshotsWorks = Jak služba Firefox Screenshots funguje
homePageGetStartedTitle = Začít
homePageCaptureRegion = Vytvořte snímek oblasti
homePageCapturePage = Vytvořte snímek celé stránky
homePageSaveShare = Uložte a sdílejte
homePageLegalLink = Právní informace
homePagePrivacyLink = Soukromí
homePageTermsLink = Podmínky
homePageCookiesLink = Cookies


[[ Leave Screenshots page ]]

// Note: do not translate 'Firefox Screenshots' when translating this string
leavePageErrorAddonRequired = Pro smazání vašeho účtu musíte mít nainstalován doplněk Firefox Screenshots.
// Note: do not translate 'Firefox Screenshots' when translating this string
leavePageWarning = Toto navždy smaže ze služby Firefox Screenshots všechna vaše data.
leavePageButtonProceed = Pokračovat
leavePageButtonCancel = Zrušit
leavePageDeleted = Všechny vaše snímky byly smazány!


[[ Not Found page ]]

notFoundPageDescription = Stránka nebyla nalezena.


[[ Shot page ]]

shotPageCopy = Kopírovat
shotPageCopied = Zkopírováno
shotPageShareFacebook
    .title = Sdílet na Facebooku
shotPageShareTwitter
    .title = Sdílet na Twitteru
shotPageSharePinterest
    .title = Sdílet na Pinterest
shotPageShareEmail
    .title = Sdílet odkaz e-mailem
shotPageShareLink = Získat odkaz pro sdílení tohoto snímku:
shotPagePrivacyMessage = Na tento snímek se může podívat každý, kdo bude mít odkaz.
shotPageCopyImageText
    .label = Kopírovat text z obrázku
shotPageConfirmDeletion = Opravdu chcete tento snímek navždy smazat?
shotPageDeleteButton
    .title = Smazat tento snímek
shotPageAbuseButton
    .title = Nahlásit tento snímek jeko porušení práv, spam nebo pro jiný problém
shotPageDownloadShot
    .title = Stáhnout
shotPageDownload = Stáhnout
shotPageScreenshotsDescription = Jednoduchá tvorba snímků webových stránek. Vytvářejte, ukládejte i sdílejte přímo z Firefoxu.
shotPageDMCAMessage = Tento snímek již není dostupný z důvodu uplatnění nároku na duševní vlastnictví třetí strany.
shotPageKeepFor = Jak dlouho má být tento snímek uložen?
// Note: shotPageSelectTime is a placeholder label for the time selection dropdown.
shotPageSelectTime = Volba času
shotPageKeepIndefinitely = navždy
shotPageKeepTenMinutes = 10 minut
shotPageKeepOneHour = 1 hodinu
shotPageKeepOneDay = 1 den
shotPageKeepOneWeek = 1 týden
shotPageKeepTwoWeeks = 2 týdny
shotPageKeepOneMonth = 1 měsíc
shotPageSaveExpiration = uložit
shotPageCancelExpiration = zrušit
timeDiffMinutesAgo = { $num ->
        [one] před minutou
        [few] před { $number } minutami
       *[other] před { $number } minutami
    }
timeDiffHoursAgo = { $num ->
        [one] před hodinou
        [few] před { $number } hodinami
       *[other] před { $number } hodinami
    }
timeDiffDaysAgo = { $num ->
        [one] včera
        [few] před { $number } dny
       *[other] před { $number } dny
    }
timeDiffFutureSeconds = za několik vteřin
timeDiffFutureMinutes = { $num ->
        [one] za minutu
        [few] za { $number } minuty
       *[other] za { $number } minut
    }
timeDiffFutureHours = { $num ->
        [one] za hodinu
        [few] za { $number } hodiny
       *[other] za { $number } hodin
    }
timeDiffFutureDays = { $num ->
        [one] zítra
        [few] za { $number } dny
       *[other] za { $number } dní
    }


[[ Shotindex page ]]

shotIndexPageNoShotsMessage = Žádné uložené snímky.
shotIndexPageLookingForShots = Hledáme vaše snímky…
shotIndexPageConfirmShotDelete = Smazat tento snímek?


// all metrics strings are optional for translation
[[ Metrics page ]]

// Note: 'Firefox Screenshots' should not be translated
metricsPageTitle = Metriky Firefox Screenshots
metricsPageTotalsQueryTitle = Celkem
// Note: Screenshots is an abbreviation for Firefox Screenshots, and should not be translated.
metricsPageTotalsQueryDescription = Přehled služby Screenshots
metricsPageTotalsQueryDevices = Celkový počet registrovaných zařízení
metricsPageShotsQueryTitle = Snímky podle dnů
metricsPageShotsQueryDescription = Počet snímků vytvořených každý den (za období 30 dnů)
metricsPageShotsQueryCount = Počet snímků
metricsPageShotsQueryDay = Den
metricsPageUsersQueryTitle = Uživatelé podle dnů
metricsPageUsersQueryDescription = Počet uživatelů, kteří vytvořili alespoň jeden snímek, podle dnů (za období 30 dnů)
metricsPageUsersQueryCount = Počet uživatelů
metricsPageUsersQueryDay = Den
metricsPageUserShotsQueryTitle = Počet snímků jednotlivých uživatelů
metricsPageUserShotsQueryDescription = Počet uživatelů, kteří mají celkem okolo N snímků
metricsPageUserShotsQueryCount = Počet uživatelů
metricsPageRetentionQueryUsers = Počet uživatelů
metricsPageTotalRetentionQueryUsers = Počet uživatelů
metricsPageTotalRetentionQueryDays = Počet dnů, kdy uživatel vytvářel snímky
metricsPageVersionQueryTitle = Verze doplňku
metricsPageVersionQueryDescription = Verze doplňku používaná při přihlášení v posledních 14 dnech
metricsPageVersionQueryUsers = Počet přihlášení uživatelů
metricsPageVersionQueryVersion = Verze doplňku
metricsPageVersionQueryLastSeen = Den
metricsPageHeader = Metriky
// Note: { $created } is a placeholder for a localized date and time, like '4/21/2017, 3:40:04 AM'
metricsPageGeneratedDateTime = Vygenerováno: { $created }
// Note { $time } is a placeholder for a number of milliseconds, like '100'
metricsPageDatabaseQueryTime = (čas databáze: { $time } ms)
