### Localization for Server-side strings of Firefox Screenshots
### Please don't localize Firefox, Firefox Screenshots, or Screenshots


## Global phrases shared across pages, prefixed with 'g'

gMyShots = Minu pildid
gHomeLink = Avaleht
gNoShots =
    .alt = Pilte ei leitud
gScreenshotsDescription = Ekraanipildid lihtsalt. Tee, salvesta ja jaga ekraanipilte Firefoxist lahkumata.
gSettings = Sätted
gSignIn = Logi sisse

## Header

buttonSettings =
    .title = Sätted
buttonSignIn =
    .title = Logi sisse
screenshotsLogo =
    .title = Avaleht
bannerMessage = Logi sisse või registreeru kasutajaks, et pääseda ligi ekraanipiltidele kõigist oma seadmetest ning salvestada lemmikud jäädavalt.
bannerUpsell = { gScreenshotsDescription } <a>Hangi Firefox</a>

## Footer

# Note: link text for a link to mozilla.org
footerLinkMozilla = Mozilla
footerLinkTerms = Kasutustingimused
footerLinkPrivacy = Privaatsuspoliitika
footerReportShot = Raporteeri ekraanipildist
    .title = Anna teada väärkasutatud, spämmivast või muid probleeme sisaldavat ekraanipildist
footerLinkFaqs = KKK
footerLinkDMCA = Intellektuaalomandi rikkumisest teatamine
footerLinkDiscourse = Tagasiside andmine
footerLinkRemoveAllData = Kõigi andmete eemaldamine

## Creating page

# Note: { $title } is a placeholder for the title of the web page
# captured in the screenshot. The default, for pages without titles, is
# creatingPageTitleDefault.
creatingPageTitle = Loomisel: { $title }
creatingPageTitleDefault = leht
creatingPageWaitMessage = Pildi salvestamine…

## Home page

homePageDescription =
    .content = Veebilehitsejasse sisse ehitatud intuitiivsed ekraanipildid. Tee, salvesta ja jaga ekraanipilte veebi sirvimisel Firefoxis.
homePageButtonMyShots = Minu piltide juurde
homePageTeaser = Varsti tulekul…
homePageDownloadFirefoxTitle = Firefox
homePageDownloadFirefoxSubTitle = Tasuta allalaadimine
# Note: do not translate 'Firefox Screenshots' when translating this string
homePageHowScreenshotsWorks = Kuidas Firefox Screenshots töötab
homePageGetStartedTitle = Alustamine
# Note: Screenshots is an abbreviation for Firefox Screenshots, and should not be translated.
homePageGetStartedDescription = Leia tööriistaribalt uus Screenshots ikoon. Vali see ning veebilehitseja aknas avaneb Screenshots menüü.
# Note: Screenshots is an abbreviation for Firefox Screenshots, and should not be translated.
homePageGetStartedDescriptionPageAction = Vali Screenshotsi ikoon lehe tegevuste menüüst ja su brauseriakna kohal avaneb ekraanipiltide tegemise menüü.
homePageCaptureRegion = Piirkonna valimine
# Note: Screenshots is an abbreviation for Firefox Screenshots, and should not be translated.
homePageCaptureRegionDescription = Klõpsa ja lohista alal, mida salvestada soovid. Või lihtsalt hoia kursorit selle kohal ja klõpsa — Screenshots valib ala sinu eest. Oled nähtavaga rahul? Vali Salvesta ekraanipildile võrgus ligipääsuks või vajuta nupule noolega alla, kui soovid selle enda arvutisse alla laadida.
homePageCapturePage = Lehe salvestamine
homePageCapturePageDescription = Tervete lehtede salvestamiseks kasuta nuppe ülal paremal. Salvesta nähtav nupp valib ala, mida näed kerimata, ja Salvesta terve leht valib kogu lehe.
homePageSaveShare = Salvestamine ja jagamine
# Note: Screenshots is an abbreviation for Firefox Screenshots, and should not be translated.
homePageSaveShareDescription = Kui teed pildi, siis postitab Firefox selle võrgus asuvasse ekraanipiltide kogusse ning kopeerib lõikepuhvrisse lingi. Salvestame ekraanipildi automaatselt kaheks nädalaks, kuid saad neid igal ajal kustutada või aegumistähtaega muuta ning neid kogus kauem hoida.
homePageLegalLink = Õiguslik teave
homePagePrivacyLink = Privaatsus
homePageTermsLink = Kasutustingimused
homePageCookiesLink = Küpsised

## Leave Screenshots page

leavePageRemoveAllData = Kõigi andmete eemaldamine
# Note: do not translate 'Firefox Screenshots' when translating this string
leavePageErrorAddonRequired = Konto kustutamiseks peab Firefox Screenshots olema paigaldatud
leavePageErrorGeneric = Tekkis viga
# Note: do not translate 'Firefox Screenshots' when translating this string
leavePageWarning = See kustutab jäädavalt kõik sinu Firefox Screenshots andmed.
leavePageButtonProceed = Edasi
leavePageButtonCancel = Tühista
leavePageDeleted = Kõik su ekraanipildid kustutati!

## Not Found page

notFoundPageTitle = Lehekülge ei leitud
notFoundPageIntro = Ups.
notFoundPageDescription = Lehekülge ei leitud.

## Shot page

# This is the HTML title tag of the page
shotPageTitle = Ekraanipilt: { $originalTitle }
shotPageAlertErrorUpdatingExpirationTime = Aegumise salvestamisel tekkis viga
shotPageAlertErrorDeletingShot = Pildi kustutamisel tekkis viga
shotPageAlertErrorUpdatingTitle = Pildi pealkirja salvestamisel tekkis viga
shotPageConfirmDelete = Kas oled kindel, et soovid pildi jäädavalt kustutada?
shotPageShareButton =
    .title = Jaga
shotPageCopy = Kopeeri
shotPageCopyButton =
    .title = Kopeeri pilt vahemällu
shotPageCopied = Kopeeritud
shotPageShareFacebook =
    .title = Jaga Facebookis
shotPageShareTwitter =
    .title = Jaga Twiteris
shotPageSharePinterest =
    .title = Jaga Pinterestis
shotPageShareEmail =
    .title = Jaga lingiga e-posti teel
shotPageShareLink = Hangi jagamiseks selle pildi link:
shotPagePrivacyMessage = Kes tahes saab linki teades seda pilti vaadata.
shotPageCopyImageText =
    .label = Kopeeri pildi tekst
shotPageConfirmDeletion = Kas oled kindel, et soovid selle pildi jäädavalt kustutada?
# Note: <timediff></timediff> is a placeholder for a future relative time clause like 'in 3 days' or 'tomorrow'
shotPageTimeExpirationMessage = Kui sa midagi ei tee, siis kustutatakse see pilt jäädavalt <timediff></timediff>.
# Note: { $date } is a placeholder for a localized future date as returned by Date.toLocaleString.
# For example, in en-US, { $date } could be "7/12/2017, 1:52:50 PM".
shotPageRestoreButton = taasta kuni { $date }
shotPageExpiredMessage = See pilt on aegunud.
# Note: This phrase is followed by an empty line, then the URL of the source page
shotPageExpiredMessageDetails = Siin on leht, millel see algselt loodi:
shotPageDeleteButton =
    .title = Kustuta see pilti
shotPageDownloadShot =
    .title = Laadi alla
shotPageEditButton =
    .title = Muuda seda pilti
shotPagefavoriteButton =
    .title = Lisa lemmikutesse
shotPageBackToHomeButton =
    .title = Avalehele
shotPageAllShotsButton =
    .title = Kõik pildid
shotPageAllShots = Kõik pildid
shotPageDownload = Laadi alla
# Note: Draw text is used on shot page as a verb (action)
shotPageDraw = Muuda pilti
# Note: Favorite text is used on shot page as a verb (action)
shotPageFavorite = Lisa lemmikutesse
shotPageDelete = Kustuta
shotPageScreenshotsDescription = Ekraanipildid lihtsalt. Tee, salvesta ja jaga ekraanipilte Firefoxist lahkumata.
shotPageDMCAMessage = See pilt pole enam saadaval intellektuaalomandi nõude tõttu kolmandalt osapoolelt.
# Note: { $dmca } is a placeholder for a link to send email (a 'mailto' link)
shotPageDMCAContact = Palun kirjuta { $dmca }, kui soovid rohkem teavet.
# Note: do not translate 'Firefox Screenshots' when translating this string
shotPageDMCAWarning = Kui su pildid saavad mitu sellist nõuet, siis võime tühistada sinu ligipääsu Firefox Screenshots teenusele.
# Note: { $url } is a placeholder for a shot page URL
shotPageDMCAIncludeLink = Palun kaasa kirjas selle pildi URL: { $url }
shotPageKeepFor = Kui kaua peaks seda pilti säilitama?
# Note: shotPageSelectTime is a placeholder label for the time selection dropdown.
shotPageSelectTime = Aja valimine
# The ∞ is used to indicate that the shot won't expire. It is also used in
# shotIndexNoExpirationSymbol. Try to use the same symbol in both strings, or
# if no such symbol is available for a language/culture, simply leave it out.
shotPageKeepIndefinitelyWithSymbol = Igavesti ∞
shotPageKeepTenMinutes = 10 minutit
shotPageKeepOneHour = 1 tund
shotPageKeepOneDay = 1 päev
shotPageKeepOneWeek = 1 nädal
shotPageKeepTwoWeeks = 2 nädalat
shotPageKeepOneMonth = 1 kuu
shotPageSaveExpiration = salvesta
shotPageCancelExpiration = tühista
shotPageDoesNotExpire = ei aegu
# Note: <timediff></timediff> is a placeholder for a future relative time clause, like "in 1 week" or "tomorrow"
shotPageTimeExpiresIn = aegub <timediff></timediff>
# Note: <timediff></timediff> is a placeholder for a past relative time clause, like "1 week ago" or "yesterday"
shotPageTimeExpired = aegunud <timediff></timediff>
timeDiffJustNow = just praegu
timeDiffMinutesAgo =
    { $number ->
        [one] minut tagasi
       *[other] { $number } minutit tagasi
    }
timeDiffHoursAgo =
    { $number ->
        [one] tund tagasi
       *[other] { $number } tundi tagasi
    }
timeDiffDaysAgo =
    { $number ->
        [one] eile
       *[other] { $number } päeva tagasi
    }
timeDiffFutureSeconds = paari sekundi jooksul
timeDiffFutureMinutes =
    { $number ->
        [one] minuti jooksul
       *[other] { $number } minuti jooksul
    }
timeDiffFutureHours =
    { $number ->
        [one] tunni jooksul
       *[other] { $number } tunni jooksul
    }
timeDiffFutureDays =
    { $number ->
        [one] homme
       *[other] { $number } päeva jooksul
    }
errorThirdPartyCookiesEnabled = Kui sina tegid selle pildi ja ei saa seda kustutada, siis pead ehk ajutiselt lubama kolmanda osapoole küpsised oma brauseri sätetes.

## Shot Page New Feature Promotion Dialog.

# Note: If possible, choose a short translation to better fit into the card.
promoTitle = Teadmiseks!
promoMessage = Uuendatud muutmise tööriistad võimaldavad kärpida, esile tuua ja isegi pildile teksti lisada.
promoLink = Tee proovi
promoCloseButton =
    .title = Sulge teavitus

## Annotations

annotationPenButton =
    .title = Pliiats
annotationHighlighterButton =
    .title = Marker
annotationUndoButton =
    .title = Võta tagasi
annotationRedoButton =
    .title = Tee uuesti
annotationTextButton =
    .title = Lisa tekst
# Note: This button reverts all the changes on the image since the start of the editing session.
annotationClearButton =
    .title = Puhasta
annotationCropButton =
    .title = Kärbi
annotationSaveEditButton = Salvesta
    .title = Salvesta muudatused
annotationCancelEditButton = Loobu
    .title = Loobu muudatustest
annotationCropConfirmButton = Kinnita
    .title = Kinnita valik
annotationCropCancelButton = Loobu
    .title = Loobu valikust
annotationColorWhite =
    .title = Valge
annotationColorBlack =
    .title = Must
annotationColorRed =
    .title = Punane
annotationColorGreen =
    .title = Roheline
annotationColorBlue =
    .title = Sinine
annotationColorYellow =
    .title = Kollane
annotationColorPurple =
    .title = Lilla
annotationColorSeaGreen =
    .title = Mereroheline
annotationColorGrey =
    .title = Hall
# Note: annotationTextSize is a title for text size selection dropdown.
annotationTextSize =
    .title = Teksti suurus
# Values shown in text size selection dropdown
textSizeSmall = Väike
textSizeMedium = Keskmine
textSizeLarge = Suur
# Confirm and Cancel button title shown when using text tool
textToolConfirmButton = Kinnita
    .title = Kinnita
textToolCancelButton = Loobu
    .title = Loobu
# Default placeholder used in input field when adding text annotations
textToolInputPlaceholder =
    .placeholder = Tere

## The following are the title and message for an error displayed as a Firefox
## notification. It is triggered by an action in the shot page and the strings
## are passed from the shot page to the addon.

copyImageErrorTitle = Midagi läks valesti
copyImageErrorMessage = Pilti pole võimalik vahemällu kopeerida.

## Settings Page

settingsDisconnectButton = Ühenda lahti
    .title = Ühenda lahti
settingsGuestAccountMessage = Külaliskonto
settingsSignInInvite = Seadmete vahel sünkimiseks logi sisse
settingsSignInButton = Logi sisse
    .title = Logi sisse
SettingsPageHeader = Firefox Screenshots'i seaded
settingsDescription = Saad Firefoxi kontoga sisse logida ning vaadata ja sünkida pilte privaatselt seadmete vahel.
settingsPageSubHeader = Sünkimine ja kontod
settingsClosePreferences =
    .title = Sulge seaded

## Shotindex page

# { $status } is a placeholder for an HTTP status code, like '500'.
# { $statusText } is a text description of the status code, like 'Internal server error'.
shotIndexPageErrorDeletingShot = Pildi kustutamisel tekkis viga: { $status } { $statusText }
# { $searchTerm } is a placeholder for text the user typed into the search box
shotIndexPageSearchResultsTitle = Minu pildid: otsi { $searchTerm }
# { $error } is a placeholder for a non-translated error message that could be shared
# with developers when debugging an error.
shotIndexPageErrorRendering = Lehe kuvamisel tekkis viga: { $error }
shotIndexPageSearchPlaceholder =
    .placeholder = Minu piltidest otsimine
shotIndexPageNoShotsMessage = Salvestatud pildid puuduvad.
shotIndexPageNoShotsInvitation = Ära pelga, tee mõned.
shotIndexPageLookingForShots = Otsime sinu pilte…
shotIndexPageNoSearchResultsIntro = Hmm
shotIndexPageNoSearchResults = Me ei leidnud su otsingule sobivaid pilte.
shotIndexPageMyShotsButton =
    .title = Minu pildid
shotIndexPageClearSearchButton =
    .title = Tühjenda otsing
shotIndexPageConfirmShotDelete = Kas tõesti kustutada see pilt?
shotIndexPagePreviousPage =
    .title = Eelmine leht
shotIndexPageNextPage =
    .title = Järgmine leht
# This is tooltip for a "blank heart" symbol used in the upper top corner of the card for a shot on the
# My Shots page to indicate that the shot does expire.
shotIndexNonFavoriteIcon =
    .title = See pilt ei ole lemmikuks märgitud ja see aegub
# This is the tooltip for a "heart" symbol in the upper top corner of the
# card for a shot on the My Shots page. It indicate that the shot was marked as
# a favorite by the owner.
shotIndexFavoriteIcon =
    .title = See pilt on märgitud lemmikuks ja see ei aegu
shotIndexSyncedShot =
    .title = See pilt tehti teises seadmes

## Delete Confirmation Dialog

shotDeleteConfirmationMessage = Kas oled kindel, et soovid selle pildi kustutada?
shotDeleteCancel = Loobu
    .title = Loobu
shotDeleteConfirm = Kustuta
    .title = Kustuta

## Metrics page
## All metrics strings are optional for translation

# Note: 'Firefox Screenshots' should not be translated
metricsPageTitle = Firefox Screenshots statistika
metricsPageTotalsQueryTitle = Kokku
# Note: Screenshots is an abbreviation for Firefox Screenshots, and should not be translated.
metricsPageTotalsQueryDescription = Screenshots ülevaade
metricsPageTotalsQueryDevices = Registreeritud seadmeid
metricsPageTotalsQueryActiveShots = Aktiivsed pildid
metricsPageTotalsQueryExpiredShots = Aegunud (kuid taastatavad)
metricsPageTotalsQueryExpiredDeletedShots = Aegunud (ja kustutatud)
metricsPageShotsQueryTitle = Pildid päevade kaupa
metricsPageShotsQueryDescription = Igapäevaselt loodud piltide arv (viimase 30 päeva jooksul)
metricsPageShotsQueryCount = Piltide arv
metricsPageShotsQueryDay = Päev
metricsPageUsersQueryTitle = Kasutajate arv päevade lõikes
metricsPageUsersQueryDescription = Kasutajate arv, kes salvestasid vähemalt ühe pildi, päevade lõikes (viimased 30 päeva)
metricsPageUsersQueryCount = Kasutajate arv
metricsPageUsersQueryDay = Päev
metricsPageUserShotsQueryTitle = Piltide arv kasutaja kohta
metricsPageUserShotsQueryDescription = Kasutajate arv, kellel on kokku umbes N pilti
metricsPageUserShotsQueryCount = Kasutajate arv
metricsPageUserShotsQueryShots = Umbkaudne arv aktiivseid (aegumata) pilte
metricsPageRetentionQueryUsers = Kasutajate arv
metricsPageTotalRetentionQueryUsers = Kasutajate arv
metricsPageVersionQueryTitle = Laienduse versioon
metricsPageVersionQueryUsers = Sisselogitud kasutajate arv
metricsPageVersionQueryVersion = Laienduse versioon
metricsPageVersionQueryLastSeen = Päev
metricsPageHeader = Statistika
# Note: { $created } is a placeholder for a localized date and time, like '4/21/2017, 3:40:04 AM'
metricsPageGeneratedDateTime = Genereeritud: { $created }
# Note { $time } is a placeholder for a number of milliseconds, like '100'
metricsPageDatabaseQueryTime = (andmebaasi aeg: { $time }ms)
