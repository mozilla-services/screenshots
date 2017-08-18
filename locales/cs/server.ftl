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


[[ Footer ]]

// Note: link text for a link to mozilla.org
footerLinkMozilla = Mozilla
footerLinkTerms = Podmínky
footerLinkPrivacy = Zásady ochrany soukromí
footerLinkDMCA = Nahlásit zneužití IP adresy
footerLinkDiscourse = Váš názor
footerLinkRemoveAllData = Odstranit všechna data


[[ Creating page ]]

// Note: { $title } is a placeholder for the title of the web page
// captured in the screenshot. The default, for pages without titles, is
// creatingPageTitleDefault.
creatingPageTitle = Vytváření snímku { $title }
creatingPageTitleDefault = stránky
creatingPageWaitMessage = Ukládání vašeho snímku…


[[ Home page ]]

homePageDescription
    .content = Intuitivní snímky stránek přímo v prohlížeči. Zachyťte, ukládejte a sdílejte snímky s Firefoxem během prohlížení.
homePageButtonMyShots = Přejít na mé snímky
homePageTeaser = Již brzy…
homePageDownloadFirefoxTitle = Firefox
homePageDownloadFirefoxSubTitle = Stáhnout zdarma
homePageGetStarted = Začít
// Note: do not translate 'Firefox Screenshots' when translating this string
homePageHowScreenshotsWorks = Jak služba Firefox Screenshots funguje
homePageGetStartedTitle = Jak začít
// Note: Screenshots is an abbreviation for Firefox Screenshots, and should not be translated.
homePageGetStartedDescription = Novou ikonu služby Screenshots najdete na vaší liště. Po kliknutí se zobrazí nabídka v horní části okna vašeho prohlížeče.
homePageCaptureRegion = Vytvořte snímek oblasti
// Note: Screenshots is an abbreviation for Firefox Screenshots, and should not be translated.
homePageCaptureRegionDescription = Stiskem tlačítka myši a tahem vyberete oblast stránky. A nebo jen najeďte myší — doplněk Screenshots pro vás oblast vybere sám. Líbí se vám to? Klikněte na tlačítko Uložit pro nahrání snímku na internet, nebo na šipku pro jeho stažené do počítače.
homePageCapturePage = Vytvořte snímek celé stránky
homePageCapturePageDescription = Použijte tlačítka v pravém horním rohu pro zachycení celé stránky. Tlačítko Uložit viditelnou oblast vybere část stránky, která se vejde na obrazovku a právě ji vidíte, kdežto Uložit celou stránku zachytí i to, co se na obrazovku nevešlo.
homePageSaveShare = Uložte a sdílejte
// Note: Screenshots is an abbreviation for Firefox Screenshots, and should not be translated.
homePageSaveShareDescription = Po vytvoření snímku jej Firefox nahraje do naší online služby Screenshots a zkopíruje odkaz do vaší schránky. Vaše snímky automaticky ukládáme na dobu dvou týdnů, ale můžete je kdykoliv smazat nebo změnit jejich platnost pro dřívější nebo naopak pozdější smazání.
homePageLegalLink = Právní informace
homePagePrivacyLink = Soukromí
homePageTermsLink = Podmínky
homePageCookiesLink = Cookies


[[ Leave Screenshots page ]]

leavePageRemoveAllData = Odstranit všechna data
// Note: do not translate 'Firefox Screenshots' when translating this string
leavePageErrorAddonRequired = Pro smazání vašeho účtu musíte mít nainstalován doplněk Firefox Screenshots.
leavePageErrorGeneric = Nastala chyba
// Note: do not translate 'Firefox Screenshots' when translating this string
leavePageWarning = Toto navždy smaže ze služby Firefox Screenshots všechna vaše data.
leavePageButtonProceed = Pokračovat
leavePageButtonCancel = Zrušit
leavePageDeleted = Všechny vaše snímky byly smazány!


[[ Not Found page ]]

notFoundPageTitle = Stránka nebyla nalezena
notFoundPageIntro = Jejda.
notFoundPageDescription = Stránka nebyla nalezena.


[[ Shot page ]]

// This is the HTML title tag of the page
shotPageTitle = Snímek: { $originalTitle }
shotPageAlertErrorUpdatingExpirationTime = Při ukládání platnosti snímku nastala chyba
shotPageAlertErrorDeletingShot = Při mazání snímku nastala chyba
shotPageAlertErrorUpdatingTitle = Při ukládání názvu nastala chyba
shotPageConfirmDelete = Opravdu chcete tento snímek navždy smazat?
shotPageShareButton
    .title = Sdílet
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
// Note: { $timediff } is a placeholder for a future relative time clause like 'in 3 days' or 'tomorrow'
shotPageExpirationMessage = Pokud nic neuděláte, tento snímek bude navždy smazán { $timediff }.
// Note: { $date } is a placeholder for a localized future date as returned by Date.toLocaleString.
// For example, in en-US, { $date } could be "7/12/2017, 1:52:50 PM".
shotPageRestoreButton = obnovit do { $date }
shotPageExpiredMessage = Platnost tohoto snímku vypršela.
// Note: This phrase is followed by an empty line, then the URL of the source page
shotPageExpiredMessageDetails = Zde je stránka, kde byl snímek pořízen:
shotPageDeleteButton
    .title = Smazat tento snímek
shotPageAbuseButton
    .title = Nahlásit tento snímek jeko porušení práv, spam nebo pro jiný problém
shotPageDownloadShot
    .title = Stáhnout
shotPageDownload = Stáhnout
shotPageScreenshotsDescription = Jednoduchá tvorba snímků webových stránek. Vytvářejte, ukládejte i sdílejte přímo z Firefoxu.
shotPageUpsellFirefox = Získejte Firefox
shotPageDMCAMessage = Tento snímek již není dostupný z důvodu uplatnění nároku na duševní vlastnictví třetí strany.
// Note: { $dmca } is a placeholder for a link to send email (a 'mailto' link)
shotPageDMCAContact = Další informace si můžete vyžádat e-mailem na { $dmca }.
// Note: do not translate 'Firefox Screenshots' when translating this string
shotPageDMCAWarning = Pokud budou na více vašich snímku uplatňovány nároky na duševní vlastnictví, může dojít k zablokování vašeho přístupu ke službě Firefox Screenshots.
// Note: { $url } is a placeholder for a shot page URL
shotPageDMCAIncludeLink = Uveďte prosím v e-mailu URL adresu tohoto snímku: { $url }
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
shotPageDoesNotExpire = bez omezené platnosti
// Note: { $timediff } is a placeholder for a future relative time clause, like "in 1 week" or "tomorrow"
shotPageExpiresIn = vyprší { $timediff }
// Note: { $timediff } is a placeholder for a past relative time clause, like "1 week ago" or "yesterday"
shotPageExpired = vypršel { $timediff }
timeDiffJustNow = právě teď
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

// { $status } is a placeholder for an HTTP status code, like '500'.
// { $statusText } is a text description of the status code, like 'Internal server error'.
shotIndexPageErrorDeletingShot = Při mazání snímku nastala chyba: { $status } { $statusText }
// { $searchTerm } is a placeholder for text the user typed into the search box
shotIndexPageSearchResultsTitle = Mé snímky: hledání { $searchTerm }
// { $error } is a placeholder for a non-translated error message that could be shared
// with developers when debugging an error.
shotIndexPageErrorRendering = Při zobrazování stránky nastala chyba: { $error }
shotIndexPageSearchPlaceholder
    .placeholder = Prohledat mé snímky
shotIndexPageSearchButton
    .title = Hledat
shotIndexPageNoShotsMessage = Žádné uložené snímky.
shotIndexPageNoShotsInvitation = Pojďme nějaké vytvořit.
shotIndexPageLookingForShots = Hledáme vaše snímky…
shotIndexPageNoSearchResultsIntro = Hmm
shotIndexPageNoSearchResults = Nemůžeme najít žádné snímky, které by odpovídaly vašemu hledání.
shotIndexPageClearSearchButton
    .title = Zrušit hledání
shotIndexPageConfirmShotDelete = Smazat tento snímek?


// all metrics strings are optional for translation
[[ Metrics page ]]

// Note: 'Firefox Screenshots' should not be translated
metricsPageTitle = Metriky Firefox Screenshots
metricsPageTotalsQueryTitle = Celkem
// Note: Screenshots is an abbreviation for Firefox Screenshots, and should not be translated.
metricsPageTotalsQueryDescription = Přehled služby Screenshots
metricsPageTotalsQueryDevices = Celkový počet registrovaných zařízení
metricsPageTotalsQueryActiveShots = Aktivní snímky
metricsPageTotalsQueryExpiredShots = Vypršel (ale ještě lze obnovit)
metricsPageTotalsQueryExpiredDeletedShots = Vypršel (a byl smazán)
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
metricsPageUserShotsQueryShots = Přibližný počet aktivních (platných) snímků
metricsPageRetentionQueryTitle = Míra stálého používání podle týdnů
metricsPageRetentionQueryDescription = Počet dnů od uživatelova prvního snímku po poslední snímek, seskupeno podle počátečního týdne
metricsPageRetentionQueryUsers = Počet uživatelů
metricsPageRetentionQueryDays = Počet dnů od uživatelova prvního snímku po poslední
metricsPageRetentionQueryFirstWeek = Týden, kdy uživatel vytvořil první snímek
metricsPageTotalRetentionQueryTitle = Celková míra stálého používání
metricsPageTotalRetentionQueryDescription = Doba po kterou uživatelů vytvářeli snímky, seskupeno podle týdne
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
