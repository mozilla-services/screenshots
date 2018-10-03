### Localization for Server-side strings of Firefox Screenshots
### Please don't localize Firefox, Firefox Screenshots, or Screenshots


## Global phrases shared across pages, prefixed with 'g'

gMyShots = Capturile mele
gHomeLink = Start
gNoShots =
    .alt = Nicio captură găsită
gScreenshotsDescription = Capturile de ecran simplificate. Realizează, salvează și partajează capturile de ecran fără să părăsești Firefox.

## Header

buttonSettings =
    .title = Setări
buttonSignIn =
    .title = Autentificare
screenshotsLogo =
    .title = Pagina de start Screenshots
bannerMessage = Autentifică-te sau înregistrează pentru a accesa capturile de ecran pe toate dispozitivele tale și salvează favoritele pentru totdeauna.
bannerUpsell = { gScreenshotsDescription }<a>Obţine Firefox acum</a>

## Footer

# Note: link text for a link to mozilla.org
footerLinkMozilla = Mozilla
footerLinkTerms = Termeni
footerLinkPrivacy = Politica de confidențialitate
footerReportShot = Raportează captura
    .title = Raportează această captură pentru abuz, spam sau alte probleme
footerLinkFaqs = Întrebări frecvente
footerLinkDMCA = Raportează o încălcare a PI
footerLinkDiscourse = Oferă feedback
footerLinkRemoveAllData = Elimină toate datele

## Creating page

# Note: { $title } is a placeholder for the title of the web page
# captured in the screenshot. The default, for pages without titles, is
# creatingPageTitleDefault.
creatingPageTitle = Se creează { $title }
creatingPageTitleDefault = pagină
creatingPageWaitMessage = Se salvează captura…

## Home page

homePageDescription =
    .content = Capturi de ecran intuitive integrate direct în browser. Capturează, salvează și partajează capturi de ecran pe măsură ce navighezi pe web folosind Firefox.
homePageButtonMyShots = Mergi la Capturile mele
homePageTeaser = În curând…
homePageDownloadFirefoxTitle = Firefox
homePageDownloadFirefoxSubTitle = Descărcare gratuită
# Note: do not translate 'Firefox Screenshots' when translating this string
homePageHowScreenshotsWorks = Cum funcționează Firefox Screenshots
homePageGetStartedTitle = Începe
# Note: Screenshots is an abbreviation for Firefox Screenshots, and should not be translated.
homePageGetStartedDescription = Găsește noua pictogramă Screenshots de pe bara de unelte. Selecteaz-o și meniul Screenshots va apărea în partea de sus a ferestrei browserului.
# Note: Screenshots is an abbreviation for Firefox Screenshots, and should not be translated.
homePageGetStartedDescriptionPageAction = Selectează pictograma Screenshots din meniul de acțiuni pe pagină din bara de adrese și meniul Screenshots va apărea în partea superioară a ferestrei browserului.
homePageCaptureRegion = Capturează o regiune
# Note: Screenshots is an abbreviation for Firefox Screenshots, and should not be translated.
homePageCaptureRegionDescription = Clic și trage pentru a selecta zona pe care vrei să o capturezi. Sau pur și simplu poziționează cursorul peste zonă și dă clic — Screenshots va selecta zona pentru tine. Îți place ceea ce vezi? Selectează Salvează pentru a-ți accesa online captura de ecran sau butonul săgeată în jos pentru a o descărca pe calculator.
homePageCapturePage = Capturează o pagină
homePageCapturePageDescription = Folosește butoanele din dreapta sus pentru a captura pagini întregi. Butonul Salvează porțiunea vizibilă va captura zona pe care o poți vedea fără să derulezi și butonul Salvează pagina completă va captura toată pagina.
homePageSaveShare = Salvează și partajează
# Note: Screenshots is an abbreviation for Firefox Screenshots, and should not be translated.
homePageSaveShareDescription = Când realizezi o captură, Firefox postează captura de ecran în colecția ta online Screenshots și copiază linkul în clipboard. Stocăm automat captura de ecran timp de două săptămâni, însă poți să ștergi capturile oricând sau să modifici data expirării ca să le păstrezi în colecție pentru o durată mai lungă.
homePageLegalLink = Mențiuni legale
homePagePrivacyLink = Confidențialitate
homePageTermsLink = Termeni
homePageCookiesLink = Cookie-uri

## Leave Screenshots page

leavePageRemoveAllData = Elimină toate datele
# Note: do not translate 'Firefox Screenshots' when translating this string
leavePageErrorAddonRequired = Trebuie să ai Firefox Screenshots instalat pentru a-ți șterge contul
leavePageErrorGeneric = A intervenit o eroare.
# Note: do not translate 'Firefox Screenshots' when translating this string
leavePageWarning = Acest lucru va șterge definitiv toate datele tale Firefox Screenshots.
leavePageButtonProceed = Continuă
leavePageButtonCancel = Renunță
leavePageDeleted = Toate capturile tale de ecran au fost șterse!

## Not Found page

notFoundPageTitle = Pagină negăsită
notFoundPageIntro = Ups.
notFoundPageDescription = Pagină negăsită.

## Shot page

# This is the HTML title tag of the page
shotPageTitle = Captură de ecran: { $originalTitle }
shotPageAlertErrorUpdatingExpirationTime = Eroare la salvarea expirării
shotPageAlertErrorDeletingShot = Eroare la ștergerea capturii
shotPageAlertErrorUpdatingTitle = Eroare la salvarea titlului
shotPageConfirmDelete = Sigur vrei să ștergi definitiv această captură?
shotPageShareButton =
    .title = Partajează
shotPageCopyButton =
    .title = Copiază imaginea în clipboard
shotPageCopied = Copiat
shotPageShareFacebook =
    .title = Partajează pe Facebook
shotPageShareTwitter =
    .title = Partajează pe Twitter
shotPageSharePinterest =
    .title = Partajează pe Pinterest
shotPageShareEmail =
    .title = Trimite linkul pe e-mail
shotPageShareLink = Obține un link partajabil către această captură:
shotPagePrivacyMessage = Oricine are linkul poate vedea această captură.
shotPageCopyImageText =
    .label = Copiază textul imaginii
shotPageConfirmDeletion = Sigur vrei să ștergi definitiv această captură?
# Note: <timediff></timediff> is a placeholder for a future relative time clause like 'in 3 days' or 'tomorrow'
shotPageTimeExpirationMessage = Dacă nu faci nimic, această captură va fi ștersă permanent <timediff></timediff>.
# Note: { $date } is a placeholder for a localized future date as returned by Date.toLocaleString.
# For example, in en-US, { $date } could be "7/12/2017, 1:52:50 PM".
shotPageRestoreButton = restaurează până la { $date }
shotPageExpiredMessage = Această captură a expirat.
# Note: This phrase is followed by an empty line, then the URL of the source page
shotPageExpiredMessageDetails = Iată pagina de pe care a fost creată inițial:
shotPageDeleteButton =
    .title = Șterge această captură
shotPageDownloadShot =
    .title = Descarcă
shotPageEditButton =
    .title = Editează această imagine
shotPagefavoriteButton =
    .title = Adaugă la favorite
shotPageBackToHomeButton =
    .title = Pagina de start
shotPageAllShotsButton =
    .title = Toate capturile
shotPageScreenshotsDescription = Capturile de ecran simplificate. Realizează, salvează și partajează capturile de ecran fără să părăsești Firefox.
shotPageDMCAMessage = Această captură nu mai este disponibilă din cauza unei reclamații de proprietate intelectuală.
# Note: { $dmca } is a placeholder for a link to send email (a 'mailto' link)
shotPageDMCAContact = Te rugăm să trimiți un e-mail la { $dmca } pentru a solicita informații suplimentare.
# Note: do not translate 'Firefox Screenshots' when translating this string
shotPageDMCAWarning = Dacă imaginile tale sunt supuse unor reclamații multiple, îți putem restricționa accesul la Firefox Screenshots.
# Note: { $url } is a placeholder for a shot page URL
shotPageDMCAIncludeLink = Te rugăm să incluzi adresa acestei imagini în e-mailul tău: { $url }
shotPageKeepFor = Cât timp ar trebui să fie păstrată această captură?
# Note: shotPageSelectTime is a placeholder label for the time selection dropdown.
shotPageSelectTime = Selectează durata
# The ∞ is used to indicate that the shot won't expire. It is also used in
# shotIndexNoExpirationSymbol. Try to use the same symbol in both strings, or
# if no such symbol is available for a language/culture, simply leave it out.
shotPageKeepIndefinitelyWithSymbol = Fără expirare ∞
shotPageKeepTenMinutes = 10 minute
shotPageKeepOneHour = 1 oră
shotPageKeepOneDay = 1 zi
shotPageKeepOneWeek = 1 săptămână
shotPageKeepTwoWeeks = 2 săptămâni
shotPageKeepOneMonth = 1 lună
shotPageSaveExpiration = salvează
shotPageCancelExpiration = renunță
shotPageDoesNotExpire = nu expiră
# Note: <timediff></timediff> is a placeholder for a future relative time clause, like "in 1 week" or "tomorrow"
shotPageTimeExpiresIn = expiră <timediff></timediff>
# Note: <timediff></timediff> is a placeholder for a past relative time clause, like "1 week ago" or "yesterday"
shotPageTimeExpired = a expirat <timediff></timediff>
timeDiffJustNow = chiar acum
timeDiffMinutesAgo =
    { $number ->
        [one] în urmă cu 1 minut
        [few] în urmă cu { $number } minute
       *[other] în urmă cu { $number } de minute
    }
timeDiffHoursAgo =
    { $number ->
        [one] în urmă cu 1 oră
        [few] în urmă cu { $number } ore
       *[other] în urmă cu { $number } de ore
    }
timeDiffDaysAgo =
    { $number ->
        [one] ieri
        [few] în urmă cu { $number } zile
       *[other] în urmă cu { $number } de zile
    }
timeDiffFutureSeconds = în câteva secunde
timeDiffFutureMinutes =
    { $number ->
        [one] într-un minut
        [few] în { $number } minute
       *[other] în { $number } de minute
    }
timeDiffFutureHours =
    { $number ->
        [one] într-o oră
        [few] în { $number } ore
       *[other] în { $number } de ore
    }
timeDiffFutureDays =
    { $number ->
        [one] mâine
        [few] în { $number } zile
       *[other] în { $number } de zile
    }
errorThirdPartyCookiesEnabled = Dacă nu ai făcut această captură și nu o poți șterge, activarea temporară a cookie-urilor terțe (din preferințele browserului) ți-ar putea permite din nou accesul.

## Shot Page New Feature Promotion Dialog.

# Note: If possible, choose a short translation to better fit into the card.
promoTitle = Apropo!
promoMessage = Unelte de editare actualizate îți permit să decupezi, evidențiezi sau chiar să adaugi text la captura ta.
promoLink = Încearcă
promoCloseButton =
    .title = Închide notificarea

## Annotations

annotationPenButton =
    .title = Stilou
annotationHighlighterButton =
    .title = Marker
annotationUndoButton =
    .title = Anulează
annotationRedoButton =
    .title = Refă
annotationTextButton =
    .title = Adaugă text
# Note: This button reverts all the changes on the image since the start of the editing session.
annotationClearButton =
    .title = Curăță
annotationCropButton =
    .title = Decupează
annotationSaveEditButton = Salvează
    .title = Salvează editarea
annotationCancelEditButton = Renunță
    .title = Renunță la editare
annotationCropConfirmButton = Confirmă
    .title = Confirmă selecția
annotationCropCancelButton = Anulează
    .title = Anulează selecția
annotationColorWhite =
    .title = Alb
annotationColorBlack =
    .title = Negru
annotationColorRed =
    .title = Roșu
annotationColorGreen =
    .title = Verde
annotationColorBlue =
    .title = Albastru
annotationColorYellow =
    .title = Galben
annotationColorPurple =
    .title = Purpuriu
annotationColorSeaGreen =
    .title = Verde marin
annotationColorGrey =
    .title = Gri
# Note: annotationTextSize is a title for text size selection dropdown.
annotationTextSize =
    .title = Mărime text
# Values shown in text size selection dropdown
textSizeSmall = Mic
textSizeMedium = Mediu
textSizeLarge = Mare
# Confirm and Cancel button title shown when using text tool
textToolConfirmButton = Confirmă
    .title = Confirmă
textToolCancelButton = Renunță
    .title = Renunță
# Default placeholder used in input field when adding text annotations
textToolInputPlaceholder =
    .placeholder = Salut

## The following are the title and message for an error displayed as a Firefox
## notification. It is triggered by an action in the shot page and the strings
## are passed from the shot page to the addon.

copyImageErrorTitle = Ceva nu a funcționat
copyImageErrorMessage = Nu se poate copia captura pe clipboard.

## Settings Page

settingsDisconnectButton = Deconectează-te
    .title = Deconectează-te
settingsGuestAccountMessage = Cont ca vizitator
settingsSignInInvite = Autentifică-te pentru a sincroniza toate dispozitivele
settingsSignInButton = Autentifică-te
    .title = Autentifică-te
SettingsPageHeader = Setări Firefox Screenshots
settingsDescription = Te poți autentifica cu conturi Firefox pentru a sincroniza toate capturile de ecran de pe toate dispozitivele și pentru a le accesa în mod privat.
settingsPageSubHeader = Sincronizare și conturi
settingsClosePreferences =
    .title = Închide preferințele

## Shotindex page

# { $status } is a placeholder for an HTTP status code, like '500'.
# { $statusText } is a text description of the status code, like 'Internal server error'.
shotIndexPageErrorDeletingShot = S-a produs o eroare la ștergerea capturii: { $status } { $statusText }
# { $searchTerm } is a placeholder for text the user typed into the search box
shotIndexPageSearchResultsTitle = Capturile mele: caută { $searchTerm }
# { $error } is a placeholder for a non-translated error message that could be shared
# with developers when debugging an error.
shotIndexPageErrorRendering = Eroare la afișarea paginii: { $error }
shotIndexPageSearchPlaceholder =
    .placeholder = Caută capturile mele
shotIndexPageNoShotsMessage = Nicio captură salvată.
shotIndexPageNoShotsInvitation = Haide, realizează câteva.
shotIndexPageLookingForShots = Se caută capturile tale...
shotIndexPageNoSearchResultsIntro = Hmm
shotIndexPageNoSearchResults = Nu am găsit capturi după căutarea specificată.
shotIndexPageMyShotsButton =
    .title = Capturile mele
shotIndexPageClearSearchButton =
    .title = Curăță căutarea
shotIndexPageConfirmShotDelete = Ștergi această captură?
shotIndexPagePreviousPage =
    .title = Pagina anterioară
shotIndexPageNextPage =
    .title = Pagina următoare
# This is tooltip for a "blank heart" symbol used in the upper top corner of the card for a shot on the
# My Shots page to indicate that the shot does expire.
shotIndexNonFavoriteIcon =
    .title = Acesta nu este o imagine favorită, și va expira
# This is the tooltip for a "heart" symbol in the upper top corner of the
# card for a shot on the My Shots page. It indicate that the shot was marked as
# a favorite by the owner.
shotIndexFavoriteIcon =
    .title = Aceasta este o captură favorită și nu expiră
shotIndexSyncedShot =
    .title = Captură realizată pe alt dispozitiv

## Delete Confirmation Dialog

shotDeleteConfirmationMessage = Sigur vrei să ștergi această captură?
shotDeleteCancel = Renunță
    .title = Renunță
shotDeleteConfirm = Șterge
    .title = Șterge

## Metrics page
## All metrics strings are optional for translation

# Note: 'Firefox Screenshots' should not be translated
metricsPageTitle = Metrici Firefox Screenshots
metricsPageTotalsQueryTitle = Totaluri
# Note: Screenshots is an abbreviation for Firefox Screenshots, and should not be translated.
metricsPageTotalsQueryDescription = Rezumat Screenshots
metricsPageTotalsQueryDevices = Dispozitive înregistrate
metricsPageTotalsQueryActiveShots = Capturi active
metricsPageTotalsQueryExpiredShots = Expirate (dar recuperabile)
metricsPageTotalsQueryExpiredDeletedShots = Expirate (și șterse)
metricsPageShotsQueryTitle = Capturi în funcție de zi
metricsPageShotsQueryDescription = Numărul de capturi creeate în fiecare zi (în ultimele 30 de zile)
metricsPageShotsQueryCount = Număr de capturi
metricsPageShotsQueryDay = Zi
metricsPageUsersQueryTitle = Utilizatori în funcție de zi
metricsPageUsersQueryDescription = Numărul de utilizatori care au creeat cel puțin o captură, după zile (ultimele 30 de zile)
metricsPageUsersQueryCount = Număr de utilizatori
metricsPageUsersQueryDay = Zi
metricsPageUserShotsQueryTitle = Numărul de capturi pe utilizator
metricsPageUserShotsQueryDescription = Numărul de utilizatori care au în jur de N capturi totale
metricsPageUserShotsQueryCount = Număr de utilizatori
metricsPageUserShotsQueryShots = Numărul aproximativ de capturi (ne-expirate)
metricsPageRetentionQueryTitle = Retenția pe săptămână
metricsPageRetentionQueryDescription = Numărul de zile de la prima captură a unui utilizator până la cea mai recentă, grupate pe săptămâni
metricsPageRetentionQueryUsers = Număr de utilizatori
metricsPageRetentionQueryDays = Zile de la prima până la cea mai recentă captură
metricsPageRetentionQueryFirstWeek = Săptămâna în care utilizatorul a creat prima captură
metricsPageTotalRetentionQueryTitle = Retenție totală
metricsPageTotalRetentionQueryDescription = Durata în care utilizatorii au creat capturi, grupat pe săptămâni.
metricsPageTotalRetentionQueryUsers = Număr de utilizatori
metricsPageTotalRetentionQueryDays = Zile în care utilizatorul a creat capturi
metricsPageVersionQueryTitle = Versiunea suplimentului
metricsPageVersionQueryDescription = Versiunea suplimentului folosit în timpul autentificării în ultimele 14 zile
metricsPageVersionQueryUsers = Numărul de utilizatori autentificați
metricsPageVersionQueryVersion = Versiunea suplimentului
metricsPageVersionQueryLastSeen = Zi
metricsPageHeader = Indicatori metrici
# Note: { $created } is a placeholder for a localized date and time, like '4/21/2017, 3:40:04 AM'
metricsPageGeneratedDateTime = Generat la: { $created }
# Note { $time } is a placeholder for a number of milliseconds, like '100'
metricsPageDatabaseQueryTime = (durata bazei de date: { $time }ms)
