// Localization for Server-side strings of Firefox Screenshots
// 
// Please don't localize Firefox, Firefox Screenshots, or Screenshots



// Global phrases shared across pages, prefixed with 'g'
[[ global ]]

gMyShots = Az Ön képei
gHomeLink = Kezdőlap
gNoShots
    .alt = Nem találhatóak képek
gScreenshotsDescription = Képernyőképek egyszerűen. Készítsen, mentsen és ossza meg a képernyőképeit a Firefox elhagyása nélkül.


[[ Creating page ]]

// Note: { $title } is a placeholder for the title of the web page
// captured in the screenshot. The default, for pages without titles, is
// creatingPageTitleDefault.
creatingPageTitle = Létrehozás: { $title }
creatingPageTitleDefault = oldal


[[ Home page ]]

homePageDescription
    .content = Intuitív képernyőképek közvetlenül a böngészőjében. Készítsen, mentsen és osszon meg képernyőképeket, miközben böngészi a Webet a Firefoxszal.
homePageButtonMyShots = Ugrás a képekhez
homePageTeaser = Hamarosan elérhető...
homePageDownloadFirefoxTitle = Firefox
homePageDownloadFirefoxSubTitle = Ingyenes letöltés
homePageGetStarted = Kezdő lépések
// Note: do not translate 'Firefox Screenshots' when translating this string
homePageHowScreenshotsWorks = Hogyan működik a Firefox képernyőképek
homePageGetStartedTitle = Kezdő lépések
homePageSaveShare = Mentés és megosztás
homePageLegalLink = Jogi információk
homePagePrivacyLink = Adatvédelem
homePageTermsLink = Feltételek
homePageCookiesLink = Sütik


[[ Leave Screenshots page ]]

leavePageConfirmDelete = Fiók törlésének jóváhagyása
leavePageErrorGeneric = Hiba történt
// Note: do not translate 'Firefox Screenshots' when translating this string
leavePageWarning = Ez véglegesen törli a Firefox képernyőképek összes adatát.
leavePageButtonProceed = Folytatás
leavePageButtonCancel = Mégse
leavePageDeleted = Minden képernyőkép törlésre került!


[[ Not Found page ]]

notFoundPageTitle = Az oldal nem található
notFoundPageIntro = Hoppá!
notFoundPageDescription = Az oldal nem található.


[[ Shot page ]]

shotPageAlertErrorUpdatingExpirationTime = Hiba a lejárat mentésekor
shotPageAlertErrorDeletingShot = Hiba a kép törlésekor
shotPageAlertErrorUpdatingTitle = Hiba a cím mentésekor
shotPageConfirmDelete = Biztos, hogy véglegesen törölni szeretné ezt a képet?
shotPageShareButton
    .title = Megosztás
shotPageCopy = Másolás
shotPageCopied = Átmásolva
shotPageShareFacebook
    .title = Megosztás Facebookon
shotPageShareTwitter
    .title = Megosztás Twitteren
shotPageSharePinterest
    .title = Megosztás Pinteresten
shotPageShareEmail
    .title = Hivatkozás megosztása e-mailben
shotPageShareLink = Megosztható hivatkozás kérése ehhez a képhez:
shotPagePrivacyMessage = Bárki megnézheti a képet, aki ismeri a hivatkozást.
shotPageCopyImageText
    .label = Kép szövegének másolása
shotPageConfirmDeletion = Biztos, hogy véglegesen törölni szeretné ezt a képet?
// Note: { $timediff } is a placeholder for a future relative time clause like 'in 3 days' or 'tomorrow'
shotPageExpirationMessage = Ha nem tesz semmit, a kép törlésre kerül { $timediff }.
// Note: { $date } is a placeholder for a localized future date as returned by Date.toLocaleString.
// For example, in en-US, { $date } could be "7/12/2017, 1:52:50 PM".
shotPageRestoreButton = visszaállítás eddig: { $date }
shotPageExpiredMessage = Ez a képernyőkép lejárt.
shotPageDeleteButton
    .title = A képernyőkép törlése
shotPageDownloadShot
    .title = Letöltés
shotPageDownload = Letöltés
shotPageScreenshotsDescription = Képernyőképek egyszerűen. Készítsen, mentsen és ossza meg a képernyőképeit a Firefox elhagyása nélkül.
shotPageUpsellFirefox = Szerezze be most a Firefoxot
shotPageKeepFor = Meddig legyen ez a képernyőkép megtartva?
// Note: shotPageSelectTime is a placeholder label for the time selection dropdown.
shotPageSelectTime = Időpont választása
shotPageKeepIndefinitely = Határozatlan ideig
shotPageKeepTenMinutes = 10 percig
shotPageKeepOneHour = 1 óráig
shotPageKeepOneDay = 1 napig
shotPageKeepOneWeek = 1 hétig
shotPageKeepTwoWeeks = 2 hétig
shotPageKeepOneMonth = 1 hónap
shotPageSaveExpiration = mentés
shotPageCancelExpiration = mégse
shotPageDoesNotExpire = nem jár le
// Note: { $timediff } is a placeholder for a future relative time clause, like "in 1 week" or "tomorrow"
shotPageExpiresIn = { $timediff } jár le
// Note: { $timediff } is a placeholder for a past relative time clause, like "1 week ago" or "yesterday"
shotPageExpired = { $timediff } lejárt
timeDiffJustNow = épp most
timeDiffMinutesAgo = { $num ->
        [one] 1 perce
       *[other] { $number } perce
    }
timeDiffHoursAgo = { $num ->
        [one] 1 órája
       *[other] { $number } órája
    }
timeDiffDaysAgo = { $num ->
        [one] tegnap
       *[other] { $number } napja
    }
timeDiffFutureSeconds = néhány másodperc múlva
timeDiffFutureMinutes = { $num ->
        [one] 1 percen belül
       *[other] { $number } percen belül
    }
timeDiffFutureHours = { $num ->
        [one] 1 órán belül
       *[other] { $number } órán belül
    }
timeDiffFutureDays = { $num ->
        [one] holnap
       *[other] { $number } nap múlva
    }


[[ Shotindex page ]]

// { $status } is a placeholder for an HTTP status code, like '500'.
// { $statusText } is a text description of the status code, like 'Internal server error'.
shotIndexPageErrorDeletingShot = Hiba a képernyőkép törlésekor: { $status } { $statusText }
// { $searchTerm } is a placeholder for text the user typed into the search box
shotIndexPageSearchResultsTitle = Saját képek: keresés erre: { $searchTerm }
// { $error } is a placeholder for a non-translated error message that could be shared
// with developers when debugging an error.
shotIndexPageErrorRendering = Hiba az oldal renderelésekor: { $error }
shotIndexPageSearchPlaceholder
    .placeholder = Saját képek keresése
shotIndexPageSearchButton
    .title = Keresés
shotIndexPageNoShotsMessage = Nincsenek mentett képek.
shotIndexPageNoShotsInvitation = Hajrá, készítsen néhányat.
shotIndexPageLookingForShots = Képek keresése…
shotIndexPageNoSearchResultsIntro = Hmm
shotIndexPageClearSearchButton
    .title = Keresés törlése
shotIndexPageConfirmShotDelete = Törli ezt a képet?


// all metrics strings are optional for translation
[[ Metrics page ]]

// Note: 'Firefox Screenshots' should not be translated
metricsPageTitle = Firefox Screenshots metrikák
metricsPageTotalsQueryTitle = Összesen
// Note: Screenshots is an abbreviation for Firefox Screenshots, and should not be translated.
metricsPageTotalsQueryDescription = A Screenshots áttekintése
metricsPageTotalsQueryDevices = Összes regisztrált eszköz
metricsPageTotalsQueryActiveShots = Aktív képek
metricsPageTotalsQueryExpiredShots = Lejárt (de helyreállítható)
metricsPageTotalsQueryExpiredDeletedShots = Lejárt (és törölt)
metricsPageShotsQueryTitle = Képek napok szerint
metricsPageShotsQueryDescription = Az egyes napokon készült képek száma (az elmúlt 30 napban)
metricsPageShotsQueryCount = Képek száma
metricsPageShotsQueryDay = Nap
metricsPageUsersQueryTitle = Felhasználók napok szerint
metricsPageUsersQueryCount = Felhasználók száma
metricsPageUsersQueryDay = Nap
metricsPageUserShotsQueryTitle = Képek száma felhasználónként
metricsPageUserShotsQueryCount = Felhasználók száma
metricsPageRetentionQueryUsers = Felhasználók száma
metricsPageTotalRetentionQueryUsers = Felhasználók száma
metricsPageVersionQueryTitle = Kiegészítő verziója
metricsPageVersionQueryDescription = A bejelentkezéskor használt kiegészítő verziója, az elmúlt 14 napban
metricsPageVersionQueryUsers = Bejelentkező felhasználók száma
metricsPageVersionQueryVersion = Kiegészítő verziója
metricsPageVersionQueryLastSeen = Nap
metricsPageHeader = Metrikák
// Note: { $created } is a placeholder for a localized date and time, like '4/21/2017, 3:40:04 AM'
metricsPageGeneratedDateTime = Létrehozva: { $created }
// Note { $time } is a placeholder for a number of milliseconds, like '100'
metricsPageDatabaseQueryTime = (adatbázis idő: { $time } ms)
