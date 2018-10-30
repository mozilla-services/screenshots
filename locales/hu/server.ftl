### Localization for Server-side strings of Firefox Screenshots
### Please don't localize Firefox, Firefox Screenshots, or Screenshots


## Global phrases shared across pages, prefixed with 'g'

gMyShots = Az Ön képei
gHomeLink = Kezdőlap
gNoShots =
    .alt = Nem találhatóak képek
gScreenshotsDescription = Képernyőképek egyszerűen. Készítsen, mentsen és ossza meg a képernyőképeit a Firefox elhagyása nélkül.

## Header

buttonSettings =
    .title = Beállítások
buttonSignIn =
    .title = Bejelentkezés
screenshotsLogo =
    .title = Screenshots kezdőlap
bannerMessage = Jelentkezzen be vagy regisztráljon hogy elérje a képeit az összes eszközén, és végleg elmentse a kedvenceit.
bannerUpsell = { gScreenshotsDescription } <a>Szerezze be a Firefoxot most</a>

## Footer

# Note: link text for a link to mozilla.org
footerLinkMozilla = Mozilla
footerLinkTerms = Feltételek
footerLinkPrivacy = Adatvédelmi nyilatkozat
footerReportShot = Kép jelentése
    .title = A kép bejelentése visszaélés, spam vagy más problémák miatt
footerLinkFaqs = GYIK
footerLinkDMCA = Szellemi tulajdont érintő jogsértés jelentése
footerLinkDiscourse = Adjon visszajelzést
footerLinkRemoveAllData = Minden adat törlése

## Creating page

# Note: { $title } is a placeholder for the title of the web page
# captured in the screenshot. The default, for pages without titles, is
# creatingPageTitleDefault.
creatingPageTitle = Létrehozás: { $title }
creatingPageTitleDefault = oldal
creatingPageWaitMessage = Képernyőkép mentése…

## Home page

homePageDescription =
    .content = Intuitív képernyőképek közvetlenül a böngészőjében. Készítsen, mentsen és osszon meg képernyőképeket, miközben böngészi a Webet a Firefoxszal.
homePageButtonMyShots = Ugrás a képekhez
homePageTeaser = Hamarosan elérhető...
homePageDownloadFirefoxTitle = Firefox
homePageDownloadFirefoxSubTitle = Ingyenes letöltés
# Note: do not translate 'Firefox Screenshots' when translating this string
homePageHowScreenshotsWorks = Hogyan működik a Firefox képernyőképek
homePageGetStartedTitle = Kezdő lépések
# Note: Screenshots is an abbreviation for Firefox Screenshots, and should not be translated.
homePageGetStartedDescription = Keresse az új Screenshots ikont az eszköztáron. Válassza ki, és a Screenshots menü megjelenik a böngészőablak fölött.
# Note: Screenshots is an abbreviation for Firefox Screenshots, and should not be translated.
homePageGetStartedDescriptionPageAction = Válassza a Screenshots ikont a lapműveletek menüből a címsávban, és megjelenik a Screenshots menü a böngészőablak tetején.
homePageCaptureRegion = Terület befogása
# Note: Screenshots is an abbreviation for Firefox Screenshots, and should not be translated.
homePageCaptureRegionDescription = Kattintson és húzza a befogandó terület kiválasztásához. Vagy csak vigye fölé és kattintson – a Screenshots kijelöli a területet Ön helyett. Tetszik amit lát? Válassza a Mentést, hogy online is elérje a képernyőképeit, vagy a lefelé mutató nyilat a számítógépre letöltéshez.
homePageCapturePage = Lap befogása
homePageCapturePageDescription = Használja a jobb felső sarokban lévő gombokat a teljes lapok befogásához. A Láthatóak mentése gomb a görgetés nélkül látható területet fogja be, a Teljes lap mentése pedig mindent, ami a lapon található.
homePageSaveShare = Mentés és megosztás
# Note: Screenshots is an abbreviation for Firefox Screenshots, and should not be translated.
homePageShaveShareFavoriteDescription = Fogja a kedvenc képét. Aztán mentse az online Screenshots könyvtárba, és a Firefox a vágólapra másolja a hivatkozást az egyszerű megosztás érdekében. A könyvtárban található képernyőképek két hét után automatikusan törlődnek, de bármikor törölheti, vagy tovább is megtarthatja őket.
homePageSignInTitle = Az Ön képei mindenhol
homePageSignInDescription = Jelentkezzen be a Screenshotsba a Firefox fiókjával, hogy elérje az összes képernyőképét az összes eszközén, ahol használ Firefoxot. Egy további bónusz: örökre el is mentheti a kedvenc képeit.
homePageLegalLink = Jogi információk
homePagePrivacyLink = Adatvédelem
homePageTermsLink = Feltételek
homePageCookiesLink = Sütik

## Leave Screenshots page

leavePageRemoveAllData = Összes adat eltávolítása
# Note: do not translate 'Firefox Screenshots' when translating this string
leavePageErrorAuthRequired = A fiókja törléséhez telepítve kell legyen a Firefox Screenshots, vagy be kell jelentkeznie a Firefox fiókjába.
leavePageErrorGeneric = Hiba történt
# Note: do not translate 'Firefox Screenshots' when translating this string
leavePageWarning = Ez véglegesen törli a Firefox képernyőképek összes adatát.
leavePageButtonProceed = Folytatás
leavePageButtonCancel = Mégse
leavePageDeleted = Minden képernyőkép törlésre került!

## Not Found page

notFoundPageTitle = Az oldal nem található
notFoundPageIntro = Hoppá!
notFoundPageDescription = Az oldal nem található.

## Shot page

# This is the HTML title tag of the page
shotPageTitle = Képernyőkép: { $originalTitle }
shotPageAlertErrorUpdatingExpirationTime = Hiba a lejárat mentésekor
shotPageAlertErrorDeletingShot = Hiba a kép törlésekor
shotPageAlertErrorUpdatingTitle = Hiba a cím mentésekor
shotPageConfirmDelete = Biztos, hogy véglegesen törölni szeretné ezt a képet?
shotPageShareButton =
    .title = Megosztás
shotPageCopyButton =
    .title = Kép vágólapra másolása
shotPageCopied = Átmásolva
shotPageShareFacebook =
    .title = Megosztás Facebookon
shotPageShareTwitter =
    .title = Megosztás Twitteren
shotPageSharePinterest =
    .title = Megosztás Pinteresten
shotPageShareEmail =
    .title = Hivatkozás megosztása e-mailben
shotPageShareLink = Megosztható hivatkozás kérése ehhez a képhez:
shotPagePrivacyMessage = Bárki megnézheti a képet, aki ismeri a hivatkozást.
shotPageCopyImageText =
    .label = Kép szövegének másolása
shotPageConfirmDeletion = Biztos, hogy véglegesen törölni szeretné ezt a képet?
# Note: <timediff></timediff> is a placeholder for a future relative time clause like 'in 3 days' or 'tomorrow'
shotPageTimeExpirationMessage = Ha nem tesz semmit, a kép törlésre kerül <timediff></timediff>.
# Note: { $date } is a placeholder for a localized future date as returned by Date.toLocaleString.
# For example, in en-US, { $date } could be "7/12/2017, 1:52:50 PM".
shotPageRestoreButton = visszaállítás eddig: { $date }
shotPageExpiredMessage = Ez a képernyőkép lejárt.
# Note: This phrase is followed by an empty line, then the URL of the source page
shotPageExpiredMessageDetails = Itt van az oldal, amelyről eredetileg készült:
shotPageDeleteButton =
    .title = A képernyőkép törlése
shotPageDownloadShot =
    .title = Letöltés
shotPageEditButton =
    .title = Kép szerkesztése
shotPagefavoriteButton =
    .title = A kép beállítása kedvencként
shotPageBackToHomeButton =
    .title = Kezdőlap
shotPageAllShotsButton =
    .title = Összes kép
shotPageScreenshotsDescription = Képernyőképek egyszerűen. Készítsen, mentsen és ossza meg a képernyőképeit a Firefox elhagyása nélkül.
shotPageDMCAMessage = A kép egy harmadik fél szerzői jogi követelése miatt már nem érhető el.
# Note: { $dmca } is a placeholder for a link to send email (a 'mailto' link)
shotPageDMCAContact = További információ kéréséhez küldjön egy e-mailt ide: { $dmca }
# Note: do not translate 'Firefox Screenshots' when translating this string
shotPageDMCAWarning = Ha képeit több követelés is érinti, akkor megvonhatjuk a Firefox Screenshots hozzáférését.
# Note: { $url } is a placeholder for a shot page URL
shotPageDMCAIncludeLink = Adja meg a kép URL-t az e-mailjében: { $url }
shotPageKeepFor = Meddig legyen ez a képernyőkép megtartva?
# Note: shotPageSelectTime is a placeholder label for the time selection dropdown.
shotPageSelectTime = Időpont választása
# The ∞ is used to indicate that the shot won't expire. It is also used in
# shotIndexNoExpirationSymbol. Try to use the same symbol in both strings, or
# if no such symbol is available for a language/culture, simply leave it out.
shotPageKeepIndefinitelyWithSymbol = Végtelenségig ∞
shotPageKeepTenMinutes = 10 percig
shotPageKeepOneHour = 1 óráig
shotPageKeepOneDay = 1 napig
shotPageKeepOneWeek = 1 hétig
shotPageKeepTwoWeeks = 2 hétig
shotPageKeepOneMonth = 1 hónap
shotPageSaveExpiration = mentés
shotPageCancelExpiration = mégse
shotPageDoesNotExpire = nem jár le
# Note: <timediff></timediff> is a placeholder for a future relative time clause, like "in 1 week" or "tomorrow"
shotPageTimeExpiresIn = <timediff></timediff> jár le
# Note: <timediff></timediff> is a placeholder for a past relative time clause, like "1 week ago" or "yesterday"
shotPageTimeExpired = <timediff></timediff> lejárt
timeDiffJustNow = épp most
timeDiffMinutesAgo =
    { $number ->
        [one] 1 perce
       *[other] { $number } perce
    }
timeDiffHoursAgo =
    { $number ->
        [one] 1 órája
       *[other] { $number } órája
    }
timeDiffDaysAgo =
    { $number ->
        [one] tegnap
       *[other] { $number } napja
    }
timeDiffFutureSeconds = néhány másodperc múlva
timeDiffFutureMinutes =
    { $number ->
        [one] 1 percen belül
       *[other] { $number } percen belül
    }
timeDiffFutureHours =
    { $number ->
        [one] 1 órán belül
       *[other] { $number } órán belül
    }
timeDiffFutureDays =
    { $number ->
        [one] holnap
       *[other] { $number } nap múlva
    }
errorThirdPartyCookiesEnabled = Ha Ön készítette ezt a képet, és nem tudja törölni, akkor lehet hogy ideiglenesen engedélyeznie kell a harmadik féltől származó sütiket a böngésző beállításaiban.

## Shot Page New Feature Promotion Dialog.

# Note: If possible, choose a short translation to better fit into the card.
promoTitle = Figyelem!
promoMessage = Frissített szerkesztőeszközök, melyekkel vághat, kiemelhet, és szöveget adhat hozzá a képernyőképhez.
promoLink = Próbálja ki őket
promoCloseButton =
    .title = Értesítés bezárása

## Annotations

annotationPenButton =
    .title = Toll
annotationHighlighterButton =
    .title = Kiemelő
annotationUndoButton =
    .title = Visszavonás
annotationRedoButton =
    .title = Mégis
annotationTextButton =
    .title = Szöveg hozzáadása
# Note: This button reverts all the changes on the image since the start of the editing session.
annotationClearButton =
    .title = Törlés
annotationCropButton =
    .title = Körülvágás
annotationSaveEditButton = Mentés
    .title = Szerkesztés mentése
annotationCancelEditButton = Mégse
    .title = Szerkesztés elvetése
annotationCropConfirmButton = Megerősítés
    .title = Kiválasztás megerősítése
annotationCropCancelButton = Mégse
    .title = Kiválasztás megszakítása
annotationColorWhite =
    .title = Fehér
annotationColorBlack =
    .title = Fekete
annotationColorRed =
    .title = Vörös
annotationColorGreen =
    .title = Zöld
annotationColorBlue =
    .title = Kék
annotationColorYellow =
    .title = Sárga
annotationColorPurple =
    .title = Lila
annotationColorSeaGreen =
    .title = Tengerzöld
annotationColorGrey =
    .title = Szürke
# Note: annotationTextSize is a title for text size selection dropdown.
annotationTextSize =
    .title = Betűméret
# Values shown in text size selection dropdown
textSizeSmall = Kicsi
textSizeMedium = Közepes
textSizeLarge = Nagy
# Confirm and Cancel button title shown when using text tool
textToolConfirmButton = Megerősítés
    .title = Megerősítés
textToolCancelButton = Mégse
    .title = Mégse
# Default placeholder used in input field when adding text annotations
textToolInputPlaceholder =
    .placeholder = Helló

## The following are the title and message for an error displayed as a Firefox
## notification. It is triggered by an action in the shot page and the strings
## are passed from the shot page to the addon.

copyImageErrorTitle = Valami hiba történt
copyImageErrorMessage = Nem másolható a képernyőkép a vágólapra.

## Settings Page

settingsDisconnectButton = Kapcsolat bontása
    .title = Kapcsolat bontása
settingsGuestAccountMessage = Vendégfiók
settingsSignInInvite = Jelentkezzen be az eszközök közti szinkronizációhoz
settingsSignInButton = Bejelentkezés
    .title = Bejelentkezés
SettingsPageHeader = A Firefox Screenshots beállításai
settingsDescription = Bejelentkezhet a Firefox fiókjával, hogy szinkronizálja a képernyőképeit az összes eszköze között, és privát módon érje el őket.
settingsPageSubHeader = Szinkronizálás és fiókok
settingsClosePreferences =
    .title = Beállítások bezárása

## Shotindex page

# { $status } is a placeholder for an HTTP status code, like '500'.
# { $statusText } is a text description of the status code, like 'Internal server error'.
shotIndexPageErrorDeletingShot = Hiba a képernyőkép törlésekor: { $status } { $statusText }
# { $searchTerm } is a placeholder for text the user typed into the search box
shotIndexPageSearchResultsTitle = Saját képek: keresés erre: { $searchTerm }
# { $error } is a placeholder for a non-translated error message that could be shared
# with developers when debugging an error.
shotIndexPageErrorRendering = Hiba az oldal renderelésekor: { $error }
shotIndexPageSearchPlaceholder =
    .placeholder = Saját képek keresése
shotIndexPageNoShotsMessage = Nincsenek mentett képek.
shotIndexPageNoShotsInvitation = Hajrá, készítsen néhányat.
shotIndexPageLookingForShots = Képek keresése…
shotIndexPageNoSearchResultsIntro = Hmm
shotIndexPageNoSearchResults = Nem található a keresésnek megfelelő kép.
shotIndexPageMyShotsButton =
    .title = Az Ön képei
shotIndexPageClearSearchButton =
    .title = Keresés törlése
shotIndexPageConfirmShotDelete = Törli ezt a képet?
shotIndexPagePreviousPage =
    .title = Előző oldal
shotIndexPageNextPage =
    .title = Következő oldal
# This is tooltip for a "blank heart" symbol used in the upper top corner of the card for a shot on the
# My Shots page to indicate that the shot does expire.
shotIndexNonFavoriteIcon =
    .title = Ez nem egy kedvenc kép, és el fog évülni
# This is the tooltip for a "heart" symbol in the upper top corner of the
# card for a shot on the My Shots page. It indicate that the shot was marked as
# a favorite by the owner.
shotIndexFavoriteIcon =
    .title = Egy egy kedvenc képernyőkép, és nem jár le
shotIndexSyncedShot =
    .title = Másik eszközön készült képernyőkép
shotIndexAlertErrorFavoriteShot = Hiba a kedvenc képernyőkép állapotának frissítésekor

## Delete Confirmation Dialog

shotDeleteConfirmationMessage = Biztos, hogy törölni szeretné ezt a képet?
shotDeleteCancel = Mégse
    .title = Mégse
shotDeleteConfirm = Törlés
    .title = Törlés

## Metrics page
## All metrics strings are optional for translation

# Note: 'Firefox Screenshots' should not be translated
metricsPageTitle = Firefox Screenshots metrikák
metricsPageTotalsQueryTitle = Összesen
# Note: Screenshots is an abbreviation for Firefox Screenshots, and should not be translated.
metricsPageTotalsQueryDescription = A Screenshots áttekintése
metricsPageTotalsQueryDevices = Összes regisztrált eszköz
metricsPageTotalsQueryActiveShots = Aktív képek
metricsPageTotalsQueryExpiredShots = Lejárt (de helyreállítható)
metricsPageTotalsQueryExpiredDeletedShots = Lejárt (és törölt)
metricsPageShotsQueryTitle = Képek napok szerint
metricsPageShotsQueryDescription = Az egyes napokon készült képek száma (az elmúlt 30 napban)
metricsPageShotsQueryCount = Képek száma
metricsPageShotsQueryDay = Nap
metricsPageUsersQueryTitle = Felhasználók napi bontásban
metricsPageUsersQueryDescription = A felhasználók száma, akik legalább egy képet csináltak, napok szerint (elmúlt 30 nap)
metricsPageUsersQueryCount = Felhasználók száma
metricsPageUsersQueryDay = Nap
metricsPageUserShotsQueryTitle = Képek száma felhasználónként
metricsPageUserShotsQueryDescription = A felhasználók száma, akiknek összesen N képük van
metricsPageUserShotsQueryCount = Felhasználók száma
metricsPageUserShotsQueryShots = Az aktív (nem lejárt) képek közelítő száma
metricsPageRetentionQueryTitle = Megtartás hetenkénti bontásban
metricsPageRetentionQueryDescription = A napok száma a felhasználó első képétől a legfrissebb képig, kezdőhetek szerint
metricsPageRetentionQueryUsers = Felhasználók száma
metricsPageRetentionQueryDays = A napok száma a felhasználó első képétől a legfrissebbig
metricsPageRetentionQueryFirstWeek = A hét, amikor a felhasználó elkészítette az első képet
metricsPageTotalRetentionQueryTitle = Teljes megtartás
metricsPageTotalRetentionQueryDescription = A felhasználók mennyi ideje készítenek képeket, hetenkénti bontásban
metricsPageTotalRetentionQueryUsers = Felhasználók száma
metricsPageTotalRetentionQueryDays = A napok, amikor a felhasználók képeket készítettek
metricsPageVersionQueryTitle = Kiegészítő verziója
metricsPageVersionQueryDescription = A bejelentkezéskor használt kiegészítő verziója, az elmúlt 14 napban
metricsPageVersionQueryUsers = Bejelentkező felhasználók száma
metricsPageVersionQueryVersion = Kiegészítő verziója
metricsPageVersionQueryLastSeen = Nap
metricsPageHeader = Metrikák
# Note: { $created } is a placeholder for a localized date and time, like '4/21/2017, 3:40:04 AM'
metricsPageGeneratedDateTime = Létrehozva: { $created }
# Note { $time } is a placeholder for a number of milliseconds, like '100'
metricsPageDatabaseQueryTime = (adatbázis idő: { $time } ms)
