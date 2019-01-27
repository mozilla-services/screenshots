### Localization for Server-side strings of Firefox Screenshots
### Please don't localize Firefox, Firefox Screenshots, or Screenshots


## Global phrases shared across pages, prefixed with 'g'

gMyShots = Moje snimke
gHomeLink = Početna
gNoShots =
    .alt = Snimke nisu pronađene
gScreenshotsDescriptionServerless = Snimke zaslona pojednostavljene. Uhvatite i preuzmite snimke zaslona bez da napustite Firefox.

## Header

buttonSettings =
    .title = Postavke
buttonSignIn =
    .title = Prijava
screenshotsLogo =
    .title = Snimke zaslona početna
bannerSignIn = <a>Prijavite se ili registrirajte</a> kako biste imali pristup svojim snimkama sa svih uređaja i spremili vaše omiljene zauvijek.
bannerUpsell = { gScreenshotsDescription }<a>Preuzmite Fiirefox sada</a>
shutdownWarning = <b>Spremljene snimke uskoro istječu.</b> Od lipnja, snimke zaslona neće više nuditi pohranu na mreži. Želite li zadržati svoju biblioteku? <a>Preuzmite snimke na svoje računalo.</a>
# Text used in Firefox Account onboarding promo shown below
# Sign in button in header
onboardingPromoTitle = Što je novo u Firefox snimkama zaslona?
onboardingPromoMessage = Prijavite se u snimke zaslona s Firefox računom i učinite više:
onboardingPromoMessageListItem1 = Pristupite svojoj biblioteci na svim svojim uređajima
onboardingPromoMessageListItem2 = Čuvajte svoje omiljene snimke zauvijek
onboardingPromoDismissButton = Odbaci
    .title = Odbaci
onboardingPromoSigninButton = Prijavi se
    .title = Prijavi se

## Footer

# Note: link text for a link to mozilla.org
footerLinkMozilla = Mozilla
footerLinkTerms = Uvjeti
footerLinkPrivacy = Politika privatnost
footerReportShot = Prijavi snimku
    .title = Prijavi ovu snimku zbog kršenja pravila, neželjene pošte ili drugih problema
footerLinkFaqs = ČPP
footerLinkDMCA = Prijavite kršenje vlasničkih prava
footerLinkDiscourse = Pošaljite nam povratnu informaciju
footerLinkRemoveAllData = Uklonite sve podatke

## Creating page

# Note: { $title } is a placeholder for the title of the web page
# captured in the screenshot. The default, for pages without titles, is
# creatingPageTitleDefault.
creatingPageTitle = Stvaranje { $title }
creatingPageTitleDefault = stranica
creatingPageWaitMessage = Spremanje vaše snimke…

## Home page

homePageDescription =
    .content = Intuitivne snimke zaslona ugrađene direktno u vaš pretraživač. Snimite, spremite i dijelite snimke zaslona dok pretražujete web koristeći Firefox.
homePageButtonMyShots = Idi na moje snimke
homePageTeaser = Dolazi uskoro…
homePageDownloadFirefoxTitle = Firefox
homePageDownloadFirefoxSubTitle = Besplatno preuzimanje
# Note: do not translate 'Firefox Screenshots' when translating this string
homePageHowScreenshotsWorks = Kako rade Firefox Screenshots
homePageGetStartedTitle = Započnite
# Note: Screenshots is an abbreviation for Firefox Screenshots, and should not be translated.
homePageGetStartedDescriptionPageAction = Odaberite ikonu snimke ekrana iz izbornika radnji stranice u adresnoj traci i izbornik snimke ekrana će se pojaviti povrh prozora vašeg pretraživača.
homePageCaptureRegion = Uhvatite dio stranice
# Note: Screenshots is an abbreviation for Firefox Screenshots, and should not be translated.
homePageCaptureRegionDescription = Kliknite i vucite kako biste odabrali područje koje želite snimiti. Ili samo pređite mišem i kliknite — snimke zaslona će odabrati područje za vas. Sviđa vam se što vidite? Odaberite Spremi kako biste pristupili svojoj snimci na internetu ili gumb sa strelicom prema dolje kako biste je preuzeli na svoje računalo.
homePageCapturePage = Snimi stranicu
homePageCapturePageDescription = Koristite gumb gore desno kako biste snimili cijelu stranicu. Gumb Spremi vidljivo će snimiti područje koje možete vidjeti bez pomicanja stranice, a Spremi cijelu stranicu će snimiti sve na stranici.
homePageDownloadCopy = Preuzmi ili kopiraj
homePageLegalLink = Pravne informacije
homePagePrivacyLink = Privatnost
homePageTermsLink = Uvjeti
homePageCookiesLink = Kolačići

## Leave Screenshots page

leavePageRemoveAllData = Ukloni sve podatke
leavePageErrorGeneric = Došlo je do greške
# Note: do not translate 'Firefox Screenshots' when translating this string
leavePageWarning = Trajno ćete obrisati sve Firefox Screenshot podatke.
leavePageButtonProceed = Nastavi
leavePageButtonCancel = Otkaži
leavePageDeleted = Sve vaše slike su izbrisane!

## Not Found page

notFoundPageTitle = Stranica nije pronađena
notFoundPageIntro = Ups.
notFoundPageDescription = Stranica nije pronađena.

## Shot page

# This is the HTML title tag of the page
shotPageTitle = Snimka: { $originalTitle }
shotPageAlertErrorUpdatingExpirationTime = Greška pri spremanju vremena isticanja
shotPageAlertErrorDeletingShot = Greška pri brisanju slike
shotPageAlertErrorUpdatingTitle = Greška pri spremanju naslova
shotPageConfirmDelete = Jeste li sigurni da želite trajno obrisati ovu sliku?
shotPageShareButton =
    .title = Dijeli
shotPageCopyButton =
    .title = Kopiraj sliku u međuspremnik
shotPageCopied = Kopirano
shotPageShareFacebook =
    .title = Dijeli na Facebooku
shotPageShareTwitter =
    .title = Dijeli na Twitteru
shotPageSharePinterest =
    .title = Dijeli na Pinterestu
shotPageShareEmail =
    .title = Dijeli poveznicu putem e-pošte
shotPageShareLink = Dohvati poveznicu za dijeljenje za ovu sliku:
shotPagePrivacyMessage = Svi koji posjete ovu poveznicu će moći vidjeti sliku.
shotPageCopyImageText =
    .label = Kopiraj tekst slike
shotPageConfirmDeletion = Jeste li sigurni da želite trajno obrisati ovu slike?
# Note: <timediff></timediff> is a placeholder for a future relative time clause like 'in 3 days' or 'tomorrow'
shotPageTimeExpirationMessage = Ukoliko ništa ne učinite ova slika će biti trajno obrisana <timediff></timediff>.
# Note: { $date } is a placeholder for a localized future date as returned by Date.toLocaleString.
# For example, in en-US, { $date } could be "7/12/2017, 1:52:50 PM".
shotPageRestoreButton = vrati do { $date }
shotPageExpiredMessage = Ova snimka je istekla.
# Note: This phrase is followed by an empty line, then the URL of the source page
shotPageExpiredMessageDetails = Ovdje je stranica na kojoj je originalno uslikana:
shotPageDeleteButton =
    .title = Obriši ovu snimku
shotPageDownloadShot =
    .title = Preuzimanje
shotPageEditButton =
    .title = Uredi ovu sliku
shotPageBackToHomeButton =
    .title = Početna stranica
shotPageDMCAMessage = Ova snimka više nije dostupna zbog zahtjeva za intelektualnim vlasništvom treće strane.
# Note: { $dmca } is a placeholder for a link to send email (a 'mailto' link)
shotPageDMCAContact = Pošaljite e-poštu na { $dmca } kako biste zatražili više informacija.
# Note: do not translate 'Firefox Screenshots' when translating this string
shotPageDMCAWarning = Ukoliko se pojavi više zahtjeva za kršenje intelektualnog vlasništva za vaše snimke, možemo vam ukinuti pristup usluzi Firefox Screenshots.
# Note: { $url } is a placeholder for a shot page URL
shotPageDMCAIncludeLink = Uključite URL na ovu snimku u vašoj poruci e-pošte: { $url }
shotPageKeepFor = Koliko dugo želite čuvati ovu snimku?
# Note: shotPageSelectTime is a placeholder label for the time selection dropdown.
shotPageSelectTime = Odaberite vrijeme
# The ∞ is used to indicate that the shot won't expire. It is also used in
# shotIndexNoExpirationSymbol. Try to use the same symbol in both strings, or
# if no such symbol is available for a language/culture, simply leave it out.
shotPageKeepIndefinitelyWithSymbol = Na neodređeno vrijeme ∞
shotPageKeepTenMinutes = 10 minuta
shotPageKeepOneHour = 1 sat
shotPageKeepOneDay = 1 dan
shotPageKeepOneWeek = 1 tjedan
shotPageKeepTwoWeeks = 2 tjedna
shotPageKeepOneMonth = 1 mjesec
shotPageSaveExpiration = spremi
shotPageCancelExpiration = otkaži
shotPageDoesNotExpire = ne ističe
# Note: <timediff></timediff> is a placeholder for a future relative time clause, like "in 1 week" or "tomorrow"
shotPageTimeExpiresIn = ističe <timediff></timediff>
# Note: <timediff></timediff> is a placeholder for a past relative time clause, like "1 week ago" or "yesterday"
shotPageTimeExpired = isteklo <timediff></timediff>
timeDiffJustNow = upravo sada
timeDiffMinutesAgo =
    { $number ->
        [one] prije { $number } minutu
        [few] prije { $number } minute
       *[other] prije { $number } minuta
    }
timeDiffHoursAgo =
    { $number ->
        [one] prije { $number } sat
        [few] prije { $number } sata
       *[other] prije { $number } sati
    }
timeDiffDaysAgo =
    { $number ->
        [one] prije { $number } dan
        [few] prije { $number } dana
       *[other] prije { $number } dana
    }
timeDiffFutureSeconds = za nekolio sekundi
timeDiffFutureMinutes =
    { $number ->
        [one] za { $number } minutu
        [few] za { $number } minute
       *[other] za { $number } minuta
    }
timeDiffFutureHours =
    { $number ->
        [one] za { $number } sat
        [few] za { $number } sata
       *[other] za { $number } sati
    }
timeDiffFutureDays =
    { $number ->
        [one] za { $number } dan
        [few] za { $number } dana
       *[other] za { $number } dana
    }
errorThirdPartyCookiesEnabled = Ako ste napravili snimak ekrana i ne možete ga izbrisati, možda trebate privremeno omogućiti kolačiće trećih strana u postavkama vašeg preglednika.

## Shot Page New Feature Promotion Dialog.


## Annotations

annotationPenButton =
    .title = Olovka
annotationHighlighterButton =
    .title = Isticanje
annotationUndoButton =
    .title = Poništi
annotationRedoButton =
    .title = Ponovi
# Note: This button reverts all the changes on the image since the start of the editing session.
annotationClearButton =
    .title = Očisti
annotationCropButton =
    .title = Izreži
annotationCropConfirmButton = Potvrdi
    .title = Potvrdi odabir
annotationCropCancelButton = Otkaži
    .title = Otkaži odabir
annotationColorWhite =
    .title = Bijela
annotationColorBlack =
    .title = Crna
annotationColorRed =
    .title = Crvena
annotationColorGreen =
    .title = Zelena
annotationColorBlue =
    .title = Plava
annotationColorYellow =
    .title = Žuta
annotationColorPurple =
    .title = Ljubičasta
annotationColorGrey =
    .title = Siva
# Values shown in text size selection dropdown
textSizeSmall = Mala
textSizeMedium = Srednja
textSizeLarge = Velika
# Confirm and Cancel button title shown when using text tool
textToolConfirmButton = Potvrdi
    .title = Potvrdi
textToolCancelButton = Otkaži
    .title = Otkaži

## The following are the title and message for an error displayed as a Firefox
## notification. It is triggered by an action in the shot page and the strings
## are passed from the shot page to the addon.


## Settings Page

settingsSignInButton = Prijava
    .title = Prijava

## Shotindex page

# { $status } is a placeholder for an HTTP status code, like '500'.
# { $statusText } is a text description of the status code, like 'Internal server error'.
shotIndexPageErrorDeletingShot = Greška pri brisanju snimke: { $status } { $statusText }
# { $searchTerm } is a placeholder for text the user typed into the search box
shotIndexPageSearchResultsTitle = Moje snimke: traži { $searchTerm }
# { $error } is a placeholder for a non-translated error message that could be shared
# with developers when debugging an error.
shotIndexPageErrorRendering = Greška pri crtanju stranice: { $error }
shotIndexPageSearchPlaceholder =
    .placeholder = Pretraži moje snimke
shotIndexPageNoShotsMessage = Nema spremljenih snimki.
shotIndexPageNoShotsInvitation = Samo naprijed, napravite nekoliko.
shotIndexPageLookingForShots = Traženje vaših snimki…
shotIndexPageNoSearchResultsIntro = Hmm
shotIndexPageNoSearchResults = Ne možemo pronaći niti jednu snimku koja odgovara vašem upitu.
shotIndexPageMyShotsButton =
    .title = Moje snimke
shotIndexPageClearSearchButton =
    .title = Očisti pretraživanje
shotIndexPageConfirmShotDelete = Obriši ovu snimku?
shotIndexPagePreviousPage =
    .title = Prethodna stranica
shotIndexPageNextPage =
    .title = Sljedeća stranica

## Delete Confirmation Dialog

shotDeleteCancel = Otkaži
    .title = Otkaži
shotDeleteConfirm = Obriši
    .title = Obriši

## Export page


## Metrics page
## All metrics strings are optional for translation

# Note: 'Firefox Screenshots' should not be translated
metricsPageTitle = Firefox Screenshot metrika
metricsPageTotalsQueryTitle = Ukupno
# Note: Screenshots is an abbreviation for Firefox Screenshots, and should not be translated.
metricsPageTotalsQueryDescription = Pregled snimki zaslona
metricsPageTotalsQueryDevices = Ukupno registrirano uređaja
metricsPageTotalsQueryActiveShots = Aktivnih snimki
metricsPageTotalsQueryExpiredShots = Isteklo (ali se može vratiti)
metricsPageTotalsQueryExpiredDeletedShots = Isteklo (i obrisano)
metricsPageShotsQueryTitle = Snimki po danu
metricsPageShotsQueryDescription = Broj snimki napravljen svaki dan (za zadnjih 30 dana)
metricsPageShotsQueryCount = Broj snimki
metricsPageShotsQueryDay = Dan
metricsPageUsersQueryTitle = Korisnika po danu
metricsPageUsersQueryDescription = Broj korisnika koji je napravio barem jednu snimku, po danu (zadnjih 30 dana)
metricsPageUsersQueryCount = Broj korisnika
metricsPageUsersQueryDay = Dan
metricsPageUserShotsQueryTitle = Broj snimki po korisniku
metricsPageUserShotsQueryDescription = Broj korisnika koji imaju oko N ukupno snimki
metricsPageUserShotsQueryCount = Broj korisnika
metricsPageUserShotsQueryShots = Približan broj aktivnih (koje nisu istekle) snimki
metricsPageRetentionQueryTitle = Zadržavanje po tjednu
metricsPageRetentionQueryDescription = Broj dana od korisnikove prve snimke do najnovije snimke, grupirano po početnom tjednu
metricsPageRetentionQueryUsers = Broj korisnika
metricsPageRetentionQueryDays = Dana od korisnikove prve do zadnje snimke
metricsPageRetentionQueryFirstWeek = Tjedan u kojem je korisnik napravio prvu snimku
metricsPageTotalRetentionQueryTitle = Ukupno zadržavanje
metricsPageTotalRetentionQueryDescription = Duljina vremena u kojem korisnici stvaraju snimke, grupirano po tjednu
metricsPageTotalRetentionQueryUsers = Broj korisnika
metricsPageTotalRetentionQueryDays = Dani u kojima korisnici rade snimke
metricsPageVersionQueryTitle = Inačica dodatka
metricsPageVersionQueryDescription = Inačica dodatka korištena prilikom prijave u zadnjih 14 dana
metricsPageVersionQueryUsers = Broj korisnika koji su se prijavili
metricsPageVersionQueryVersion = Inačica dodatka
metricsPageVersionQueryLastSeen = Dan
metricsPageHeader = Metrika
# Note: { $created } is a placeholder for a localized date and time, like '4/21/2017, 3:40:04 AM'
metricsPageGeneratedDateTime = Stvoreno: { $created }
# Note { $time } is a placeholder for a number of milliseconds, like '100'
metricsPageDatabaseQueryTime = (vrijeme baze podataka: { $time }ms)
