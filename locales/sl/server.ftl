### Localization for Server-side strings of Firefox Screenshots
### Please don't localize Firefox, Firefox Screenshots, or Screenshots


## Global phrases shared across pages, prefixed with 'g'

gMyShots = Moji posnetki
gHomeLink = Domov
gNoShots =
    .alt = Ni najdenih posnetkov
gScreenshotsDescription = Poenostavljeni posnetki zaslona. Zajemite, shranite in delite zaslonske posnetke, ne da bi zapustili Firefox.
gSettings = Nastavitve
gSignIn = Prijava

## Header

buttonSettings =
    .title = Nastavitve
buttonSignIn =
    .title = Prijava
screenshotsLogo =
    .title = Domača stran Screenshots
bannerMessage = Prijavite ali registrirajte se, da boste lahko dostopali do svojih posnetkov z več naprav in priljubljene shranili za vedno.
bannerUpsell = { gScreenshotsDescription }<a>Prenesite Firefox zdaj</a>

## Footer

# Note: link text for a link to mozilla.org
footerLinkMozilla = Mozilla
footerLinkTerms = Pogoji
footerLinkPrivacy = Obvestilo o zasebnosti
footerReportShot = Prijavi posnetek
    .title = Prijavite ta posnetek kot zlorabo, neželeno vsebino ali drugo težavo
footerLinkFaqs = Pogosta vprašanja
footerLinkDMCA = Prijavi kršitev intelektualne lastnine
footerLinkDiscourse = Sporočite nam svoje mnenje
footerLinkRemoveAllData = Odstrani vse podatke

## Creating page

# Note: { $title } is a placeholder for the title of the web page
# captured in the screenshot. The default, for pages without titles, is
# creatingPageTitleDefault.
creatingPageTitle = Ustvarjam { $title }
creatingPageTitleDefault = stran
creatingPageWaitMessage = Shranjevanje posnetka …

## Home page

homePageDescription =
    .content = Intuitivni posnetki zaslona kar v brskalniku. Med brskanjem po spletu lahko s Firefoxom ustvarite, shranite in delite posnetke zaslona.
homePageButtonMyShots = Pojdi na moje posnetke
homePageTeaser = Kmalu na voljo ...
homePageDownloadFirefoxTitle = Firefox
homePageDownloadFirefoxSubTitle = Brezplačen prenos
# Note: do not translate 'Firefox Screenshots' when translating this string
homePageHowScreenshotsWorks = Kako Firefox Screenshots deluje
homePageGetStartedTitle = Začnite
# Note: Screenshots is an abbreviation for Firefox Screenshots, and should not be translated.
homePageGetStartedDescription = Poiščite ikono Screenshots v svoji orodni vrstici. Izberite jo in na vrhu okna vašega brskalnika se bo pojavil meni Screenshots.
# Note: Screenshots is an abbreviation for Firefox Screenshots, and should not be translated.
homePageGetStartedDescriptionPageAction = V naslovni vrstici v meniju dejanj strani izberite ikono Screenshots in meni orodja se bo prikazal na vrhu okna brskalnika.
homePageCaptureRegion = Zajemite območje
# Note: Screenshots is an abbreviation for Firefox Screenshots, and should not be translated.
homePageCaptureRegionDescription = Kliknite in povlecite, da izberete območje, ki ga želite zajeti, ali pa samo kliknite in Screenshots bo izbral območje za vas. Vam je všeč, kar vidite? Izberite Shrani za dostop do vašega posnetka na spletu ali puščico navzdol za prenos na računalnik.
homePageCapturePage = Zajemite stran
homePageCapturePageDescription = Za zajem celotnih strani uporabite gumbe zgoraj desno. Gumb Shrani vidno bo zajel območje, ki je vidno brez drsenja, gumb Shrani celotno stran pa celotno vsebino strani.
homePageSaveShare = Shranite in delite
# Note: Screenshots is an abbreviation for Firefox Screenshots, and should not be translated.
homePageSaveShareDescription = Ko zajamete posnetek, ga Firefox objavi v spletni knjižnici Screenshots in kopira povezavo v odložišče. Vaše posnetke samodejno hranimo dva tedna, lahko pa jih kadarkoli izbrišete sami ali spremenite datum poteka, če jih želite ohraniti v knjižnici dlje časa.
homePageLegalLink = Pravno obvestilo
homePagePrivacyLink = Zasebnost
homePageTermsLink = Pogoji
homePageCookiesLink = Piškotki

## Leave Screenshots page

leavePageRemoveAllData = Odstrani vse podatke
# Note: do not translate 'Firefox Screenshots' when translating this string
leavePageErrorAddonRequired = Za izbris računa morate imeti nameščen Firefox Screenshots
leavePageErrorGeneric = Prišlo je do napake
# Note: do not translate 'Firefox Screenshots' when translating this string
leavePageWarning = To bo trajno izbrisalo vse podatke Firefox Screenshots.
leavePageButtonProceed = Nadaljuj
leavePageButtonCancel = Prekliči
leavePageDeleted = Vsi vaši posnetki so bili izbrisani!

## Not Found page

notFoundPageTitle = Strani ni mogoče najti
notFoundPageIntro = Ups.
notFoundPageDescription = Strani ni mogoče najti.

## Shot page

# This is the HTML title tag of the page
shotPageTitle = Posnetek zaslona: { $originalTitle }
shotPageAlertErrorUpdatingExpirationTime = Napaka pri shranjevanju časa poteka
shotPageAlertErrorDeletingShot = Napaka pri brisanju posnetka
shotPageAlertErrorUpdatingTitle = Napaka pri shranjevanju naslova
shotPageConfirmDelete = Ali ste prepričani, da želite trajno izbrisati ta posnetek?
shotPageShareButton =
    .title = Deli
shotPageCopy = Kopiraj
shotPageCopyButton =
    .title = Kopiraj sliko v odložišče
shotPageCopied = Kopirano
shotPageShareFacebook =
    .title = Deli na Facebooku
shotPageShareTwitter =
    .title = Deli na Twitterju
shotPageSharePinterest =
    .title = Deli na Pinterestu
shotPageShareEmail =
    .title = Deli povezavo preko e-pošte
shotPageShareLink = Pridobite povezavo do posnetka za deljenje:
shotPagePrivacyMessage = Kdorkoli s povezavo si lahko ogleda ta posnetek.
shotPageCopyImageText =
    .label = Kopiraj besedilo slike
shotPageConfirmDeletion = Ali ste prepričani, da želite trajno izbrisati ta posnetek?
# Note: <timediff></timediff> is a placeholder for a future relative time clause like 'in 3 days' or 'tomorrow'
shotPageTimeExpirationMessage = Če ne storite ničesar, bo ta posnetek trajno izbrisan <timediff></timediff>.
# Note: { $date } is a placeholder for a localized future date as returned by Date.toLocaleString.
# For example, in en-US, { $date } could be "7/12/2017, 1:52:50 PM".
shotPageRestoreButton = obnovi do { $date }
shotPageExpiredMessage = Ta posnetek je pretekel
# Note: This phrase is followed by an empty line, then the URL of the source page
shotPageExpiredMessageDetails = To je stran, na kateri je bil narejen posnetek:
shotPageDeleteButton =
    .title = Izbriši ta posnetek
shotPageDownloadShot =
    .title = Prenesi
shotPageEditButton =
    .title = Uredi to sliko
shotPagefavoriteButton =
    .title = Dodaj posnetek med priljubljene
shotPageBackToHomeButton =
    .title = Domača stran
shotPageAllShotsButton =
    .title = Vsi posnetki
shotPageAllShots = Vsi posnetki
shotPageDownload = Prenesi
# Note: Draw text is used on shot page as a verb (action)
shotPageDraw = Riši
# Note: Favorite text is used on shot page as a verb (action)
shotPageFavorite = Dodaj med priljubljene
shotPageDelete = Izbriši
shotPageScreenshotsDescription = Poenostavljeni posnetki zaslona. Zajemite, shranite in delite zaslonske posnetke, ne da bi zapustili Firefox.
shotPageDMCAMessage = Ta posnetek ni več na voljo zaradi zahtev intelektualne lastnine tretje osebe.
# Note: { $dmca } is a placeholder for a link to send email (a 'mailto' link)
shotPageDMCAContact = Za več informacij pošljite e-pošto na { $dmca }
# Note: do not translate 'Firefox Screenshots' when translating this string
shotPageDMCAWarning = Če bodo vaši posnetki predmet več pritožb, vam bomo morda onemogočili dostop do storitve Firefox Screenshots.
# Note: { $url } is a placeholder for a shot page URL
shotPageDMCAIncludeLink = Vključite spletni naslov tega posnetka v e-poštno sporočilo: { $url }
shotPageKeepFor = Kako dolgo želite ohraniti ta posnetek?
# Note: shotPageSelectTime is a placeholder label for the time selection dropdown.
shotPageSelectTime = Izberite čas
# The ∞ is used to indicate that the shot won't expire. It is also used in
# shotIndexNoExpirationSymbol. Try to use the same symbol in both strings, or
# if no such symbol is available for a language/culture, simply leave it out.
shotPageKeepIndefinitelyWithSymbol = Neskončno ∞
shotPageKeepTenMinutes = 10 minut
shotPageKeepOneHour = 1 uro
shotPageKeepOneDay = 1 dan
shotPageKeepOneWeek = 1 teden
shotPageKeepTwoWeeks = 2 tedna
shotPageKeepOneMonth = 1 mesec
shotPageSaveExpiration = shrani
shotPageCancelExpiration = prekliči
shotPageDoesNotExpire = ne poteče
# Note: <timediff></timediff> is a placeholder for a future relative time clause, like "in 1 week" or "tomorrow"
shotPageTimeExpiresIn = poteče <timediff></timediff>
# Note: <timediff></timediff> is a placeholder for a past relative time clause, like "1 week ago" or "yesterday"
shotPageTimeExpired = poteklo <timediff></timediff>
timeDiffJustNow = zdaj
timeDiffMinutesAgo =
    { $number ->
        [one] pred { $number } minuto
        [two] pred { $number } minutama
        [few] pred { $number } minutami
       *[other] pred { $number } minutami
    }
timeDiffHoursAgo =
    { $number ->
        [one] pred { $number } uro
        [two] pred { $number } urama
        [few] pred { $number } urami
       *[other] pred { $number } urami
    }
timeDiffDaysAgo =
    { $number ->
        [one] pred { $number } dnevom
        [two] pred { $number } dnevoma
        [few] pred { $number } dnevi
       *[other] pred { $number } dnevi
    }
timeDiffFutureSeconds = čez nekaj sekund
timeDiffFutureMinutes =
    { $number ->
        [one] čez { $number } minuto
        [two] čez { $number } minuti
        [few] čez { $number } minute
       *[other] čez { $number } minut
    }
timeDiffFutureHours =
    { $number ->
        [one] čez { $number } uro
        [two] čez { $number } uri
        [few] čez { $number } ure
       *[other] čez { $number } ur
    }
timeDiffFutureDays =
    { $number ->
        [one] čez { $number } dan
        [two] čez { $number } dni
        [few] čez { $number } dni
       *[other] čez { $number } dni
    }
errorThirdPartyCookiesEnabled = Če ste ta posnetek zaslona zajeli vi in ga ne morete izbrisati, morate morda v nastavitvah brskalnika začasno omogočiti piškotke tretjih strani.

## Shot Page New Feature Promotion Dialog.

# Note: If possible, choose a short translation to better fit into the card.
promoTitle = Novo!
promoMessage = Posodobljena orodja za urejanje vam omogočajo posnetek obrezati, označiti in celo opremiti z besedilom.
promoLink = Preskusite jih
promoCloseButton =
    .title = Zapri obvestilo

## Annotations

annotationPenButton =
    .title = Pero
annotationHighlighterButton =
    .title = Označevalnik
annotationUndoButton =
    .title = Razveljavi
annotationRedoButton =
    .title = Uveljavi
annotationTextButton =
    .title = Dodaj besedilo
# Note: This button reverts all the changes on the image since the start of the editing session.
annotationClearButton =
    .title = Počisti
annotationCropButton =
    .title = Obreži
annotationSaveEditButton = Shrani
    .title = Shrani spremembe
annotationCancelEditButton = Prekliči
    .title = Prekliči urejanje
annotationCropConfirmButton = Potrdi
    .title = Potrdi izbor
annotationCropCancelButton = Prekliči
    .title = Prekliči izbor
annotationColorWhite =
    .title = Bela
annotationColorBlack =
    .title = Črna
annotationColorRed =
    .title = Rdeča
annotationColorGreen =
    .title = Zelena
annotationColorBlue =
    .title = Modra
annotationColorYellow =
    .title = Rumena
annotationColorPurple =
    .title = Vijolična
annotationColorSeaGreen =
    .title = Morsko zelena
annotationColorGrey =
    .title = Siva
# Note: annotationTextSize is a title for text size selection dropdown.
annotationTextSize =
    .title = Velikost besedila
# Values shown in text size selection dropdown
textSizeSmall = Majhna
textSizeMedium = Srednja
textSizeLarge = Velika
# Confirm and Cancel button title shown when using text tool
textToolConfirmButton = Potrdi
    .title = Potrdi
textToolCancelButton = Prekliči
    .title = Prekliči
# Default placeholder used in input field when adding text annotations
textToolInputPlaceholder =
    .placeholder = Zdravo

## The following are the title and message for an error displayed as a Firefox
## notification. It is triggered by an action in the shot page and the strings
## are passed from the shot page to the addon.

copyImageErrorTitle = Prišlo je do napake
copyImageErrorMessage = Posnetka ni bilo mogoče kopirati v odložišče.

## Settings Page

settingsDisconnectButton = Prekini povezavo
    .title = Prekini povezavo
settingsGuestAccountMessage = Račun za goste
settingsSignInInvite = Prijavite se za sinhronizacijo med napravami
settingsSignInButton = Prijava
    .title = Prijava
SettingsPageHeader = Nastavitve za Firefox Screenshots
settingsDescription = Lahko se prijavite s Firefox Accounts in sinhronizirate posnetke zaslona na različnih napravah ter jih uporabljate v zasebnosti.
settingsPageSubHeader = Sinhronizacija in računi
settingsClosePreferences =
    .title = Zapri nastavitve

## Shotindex page

# { $status } is a placeholder for an HTTP status code, like '500'.
# { $statusText } is a text description of the status code, like 'Internal server error'.
shotIndexPageErrorDeletingShot = Napaka pri brisanju posnetka: { $status } { $statusText }
# { $searchTerm } is a placeholder for text the user typed into the search box
shotIndexPageSearchResultsTitle = Moji posnetki: išči { $searchTerm }
# { $error } is a placeholder for a non-translated error message that could be shared
# with developers when debugging an error.
shotIndexPageErrorRendering = Napaka pri izrisovanju strani: { $error }
shotIndexPageSearchPlaceholder =
    .placeholder = Iskanje mojih posnetkov
shotIndexPageNoShotsMessage = Ni shranjenih posnetkov.
shotIndexPageNoShotsInvitation = Kar pogumno, zajemite jih nekaj.
shotIndexPageLookingForShots = Iskanje vaših posnetkov …
shotIndexPageNoSearchResultsIntro = Hmm
shotIndexPageNoSearchResults = Ne najdemo posnetkov, ki ustrezajo vašemu iskanju.
shotIndexPageMyShotsButton =
    .title = Moji posnetki
shotIndexPageClearSearchButton =
    .title = Počisti iskanje
shotIndexPageConfirmShotDelete = Izbrišem ta posnetek?
shotIndexPagePreviousPage =
    .title = Prejšnja stran
shotIndexPageNextPage =
    .title = Naslednja stran
# This is tooltip for a "blank heart" symbol used in the upper top corner of the card for a shot on the
# My Shots page to indicate that the shot does expire.
shotIndexNonFavoriteIcon =
    .title = Ta posnetek ni med priljubljenimi in bo pretekel
# This is the tooltip for a "heart" symbol in the upper top corner of the
# card for a shot on the My Shots page. It indicate that the shot was marked as
# a favorite by the owner.
shotIndexFavoriteIcon =
    .title = Ta posnetek je med priljubljenimi in ne preteče
shotIndexSyncedShot =
    .title = Posnetek zajet na drugi napravi

## Delete Confirmation Dialog

shotDeleteConfirmationMessage = Ste prepričani, da želite izbrisati ta posnetek?
shotDeleteCancel = Prekliči
    .title = Prekliči
shotDeleteConfirm = Izbriši
    .title = Izbriši

## Metrics page
## All metrics strings are optional for translation

# Note: 'Firefox Screenshots' should not be translated
metricsPageTitle = Metrika Firefox Screenshots
metricsPageTotalsQueryTitle = Skupaj
# Note: Screenshots is an abbreviation for Firefox Screenshots, and should not be translated.
metricsPageTotalsQueryDescription = Pregled posnetkov zaslona
metricsPageTotalsQueryDevices = Skupno število registriranih naprav
metricsPageTotalsQueryActiveShots = Aktivni posnetki
metricsPageTotalsQueryExpiredShots = Pretečen (a obnovljiv)
metricsPageTotalsQueryExpiredDeletedShots = Pretečen (in izbrisan)
metricsPageShotsQueryTitle = Posnetki po dnevih
metricsPageShotsQueryDescription = Število posnetkov, ustvarjenih vsak dan (za zadnjih 30 dni)
metricsPageShotsQueryCount = Število posnetkov
metricsPageShotsQueryDay = Dan
metricsPageUsersQueryTitle = Uporabnikov na dan
metricsPageUsersQueryDescription = Število uporabnikov, ki so ustvarili vsaj en posnetek, po dnevih (zadnjih 30 dni)
metricsPageUsersQueryCount = Število uporabnikov
metricsPageUsersQueryDay = Dan
metricsPageUserShotsQueryTitle = Število posnetkov na uporabnika
metricsPageUserShotsQueryDescription = Število uporabnikov, ki imajo približno N skupnih posnetkov
metricsPageUserShotsQueryCount = Število uporabnikov
metricsPageUserShotsQueryShots = Približno število aktivnih (nepretečenih) posnetkov
metricsPageRetentionQueryTitle = Ohranitve po tednih
metricsPageRetentionQueryDescription = Št. dni od uporabnikovega prvega posnetka do najnovejšega, združeno po začetnem tednu
metricsPageRetentionQueryUsers = Število uporabnikov
metricsPageRetentionQueryDays = Dni od uporabnikovega prvega posnetka do najnovejšega
metricsPageRetentionQueryFirstWeek = Teden, ko je uporabnik ustvaril prvi posnetek
metricsPageTotalRetentionQueryTitle = Skupaj ohranitev
metricsPageTotalRetentionQueryDescription = Čas, v katerem so uporabniki ustvarjali posnetke, združen po tednih
metricsPageTotalRetentionQueryUsers = Število uporabnikov
metricsPageTotalRetentionQueryDays = Dnevi, ko je uporabnik ustvarjal posnetke
metricsPageVersionQueryTitle = Različica dodatka
metricsPageVersionQueryDescription = Različica dodatka, uporabljena med prijavo v zadnjih 14 dneh
metricsPageVersionQueryUsers = Število prijavljenih uporabnikov
metricsPageVersionQueryVersion = Različica dodatka
metricsPageVersionQueryLastSeen = Dan
metricsPageHeader = Metrika
# Note: { $created } is a placeholder for a localized date and time, like '4/21/2017, 3:40:04 AM'
metricsPageGeneratedDateTime = Ustvarjeno: { $created }
# Note { $time } is a placeholder for a number of milliseconds, like '100'
metricsPageDatabaseQueryTime = (čas pod. zbirke: { $time } ms)
