### Localization for Server-side strings of Firefox Screenshots
### Please don't localize Firefox, Firefox Screenshots, or Screenshots


## Global phrases shared across pages, prefixed with 'g'

gMyShots = Mina skärmbilder
gHomeLink = Hem
gNoShots =
    .alt = Inga skärmbilder hittades
gScreenshotsDescription = Ta enkelt skärmbilder. Fånga, spara och dela skärmbilder utan att lämna Firefox.

## Header

buttonSettings =
    .title = Inställningar
buttonSignIn =
    .title = Logga in
screenshotsLogo =
    .title = Startsida för Screenshots
bannerSignIn = <a>Logga in eller registrera dig</a> för att komma åt dina bilder på enheter och spara dina favoriter för alltid.
bannerUpsell = { gScreenshotsDescription } <a>Hämta Firefox nu</a>

## Footer

# Note: link text for a link to mozilla.org
footerLinkMozilla = Mozilla
footerLinkTerms = Villkor
footerLinkPrivacy = Sekretesspolicy
footerReportShot = Rapportera skärmbild
    .title = Rapportera denna skärmbild för missbruk, spam eller andra problem
footerLinkFaqs = Vanliga frågor
footerLinkDMCA = Rapportera IP-överträdelse
footerLinkDiscourse = Ge återkoppling
footerLinkRemoveAllData = Ta bort alla data

## Creating page

# Note: { $title } is a placeholder for the title of the web page
# captured in the screenshot. The default, for pages without titles, is
# creatingPageTitleDefault.
creatingPageTitle = Skapar { $title }
creatingPageTitleDefault = sida
creatingPageWaitMessage = Sparar din skärmbild...

## Home page

homePageDescription =
    .content = Intuitiva skärmbilder direkt i webbläsaren. Fånga, spara och dela skärmbilder när du surfar på webben med Firefox.
homePageButtonMyShots = Gå till mina skärmbilder
homePageTeaser = Kommer snart…
homePageDownloadFirefoxTitle = Firefox
homePageDownloadFirefoxSubTitle = Gratis nedladdning
# Note: do not translate 'Firefox Screenshots' when translating this string
homePageHowScreenshotsWorks = Så här fungerar Firefox Screenshots
homePageGetStartedTitle = Kom igång
# Note: Screenshots is an abbreviation for Firefox Screenshots, and should not be translated.
homePageGetStartedDescription = Hitta ikonen för nya Screenshots i verktygsfältet. Markera den och menyn för Screenshots kommer att visas ovanpå ditt webbläsarfönster.
# Note: Screenshots is an abbreviation for Firefox Screenshots, and should not be translated.
homePageGetStartedDescriptionPageAction = Välj ikonen Screenshots från menyn Åtgärder för sidan i adressfältet och menyn Screenshots kommer att visas ovanpå ditt webbläsarfönster.
homePageCaptureRegion = Fånga ett område
# Note: Screenshots is an abbreviation for Firefox Screenshots, and should not be translated.
homePageCaptureRegionDescription = Klicka och dra för att välja det område du vill fånga. Eller bara hovra och klicka — Screenshots kommer att välja området åt dig. Gilla du vad du ser? Välj Spara för att få tillgång till skärmbilden på webben eller nedåt-tangenten för att ladda ner den till din dator.
homePageCapturePage = Fånga en sida
homePageCapturePageDescription = Använd knapparna längst upp till höger för att fånga hela sidor. Knappen "Spara synligt område" kommer att fånga upp det område du kan visa utan att scrolla och "Spara hela sidan" tar upp allt på sidan.
homePageSaveShare = Spara och dela
# Note: Screenshots is an abbreviation for Firefox Screenshots, and should not be translated.
homePageShaveShareFavoriteDescription = Ta dina bästa bilder. Spara sedan det på nätet i Screenshots-bibliotek och Firefox kopierar länken till ditt urklipp för enkel delning. Bilder i biblioteket upphör automatiskt efter två veckor, men du kan ta bort dem när som helst eller välja att behålla dem längre.
homePageSignInTitle = Dina bilder överallt
homePageSignInDescription = Logga in på Screenshots med ditt Firefox-konto för att komma åt dina bilder överallt där du använder Firefox. En extra bonus: du kan också spara dina favoritbilder för alltid.
homePageLegalLink = Juridisk information
homePagePrivacyLink = Sekretess
homePageTermsLink = Villkor
homePageCookiesLink = Kakor

## Leave Screenshots page

leavePageRemoveAllData = Ta bort all data
# Note: do not translate 'Firefox Screenshots' when translating this string
leavePageErrorAuthRequired = Du måste ha Firefox Screenshots installerat eller inloggad på ditt Firefox-konto för att radera ditt konto
leavePageErrorGeneric = Ett fel uppstod
# Note: do not translate 'Firefox Screenshots' when translating this string
leavePageWarning = Detta kommer permanent radera all din data för Firefox Screenshots.
leavePageButtonProceed = Fortsätt
leavePageButtonCancel = Avbryt
leavePageDeleted = Alla dina skärmbilder har raderats!

## Not Found page

notFoundPageTitle = Sidan hittades inte
notFoundPageIntro = Hoppsan.
notFoundPageDescription = Sidan hittades inte.

## Shot page

# This is the HTML title tag of the page
shotPageTitle = Skärmbild: { $originalTitle }
shotPageAlertErrorUpdatingExpirationTime = Fel vid sparande av förfallodatum
shotPageAlertErrorDeletingShot = Fel vid borttagning av bild
shotPageAlertErrorUpdatingTitle = Fel vid sparande av titel
shotPageConfirmDelete = Är du säker på att du vill radera denna bild permanent?
shotPageShareButton =
    .title = Dela
shotPageCopyButton =
    .title = Kopiera bild till urklipp
shotPageCopied = Kopierad
shotPageShareFacebook =
    .title = Dela på Facebook
shotPageShareTwitter =
    .title = Dela på Twitter
shotPageSharePinterest =
    .title = Dela på Pinterest
shotPageShareEmail =
    .title = Dela länk via e-post
shotPageShareLink = Få en delbar länk till denna bild:
shotPagePrivacyMessage = Alla som har länken kan se denna bild.
shotPageCopyImageText =
    .label = Kopiera bildtext
shotPageConfirmDeletion = Är du säker på att du vill radera denna bild permanent?
# Note: <timediff></timediff> is a placeholder for a future relative time clause like 'in 3 days' or 'tomorrow'
shotPageTimeExpirationMessage = Om du inte gör något kommer denna bild att raderas permanent <timediff></timediff>.
# Note: { $date } is a placeholder for a localized future date as returned by Date.toLocaleString.
# For example, in en-US, { $date } could be "7/12/2017, 1:52:50 PM".
shotPageRestoreButton = återställ till och med { $date }
shotPageExpiredMessage = Denna bild har upphört.
# Note: This phrase is followed by an empty line, then the URL of the source page
shotPageExpiredMessageDetails = Här är sidan som den ursprungligen skapades från:
shotPageDeleteButton =
    .title = Ta bort denna bild
shotPageDownloadShot =
    .title = Hämta
shotPageEditButton =
    .title = Redigera bilden
shotPagefavoriteButton =
    .title = Markera bilden som favorit
shotPageBackToHomeButton =
    .title = Startsida
shotPageAllShotsButton =
    .title = Alla skärmbilder
shotPageScreenshotsDescription = Ta enkelt skärmbilder. Fånga, spara och dela skärmbilder utan att lämna Firefox.
shotPageDMCAMessage = Denna skärmbild är inte längre tillgänglig på grund av upphovsrättsanspråk från tredje part.
# Note: { $dmca } is a placeholder for a link to send email (a 'mailto' link)
shotPageDMCAContact = Vänligen mejla { $dmca } för att begära ytterligare information.
# Note: do not translate 'Firefox Screenshots' when translating this string
shotPageDMCAWarning = Om dina bilder är föremål för flera anspråk kan vi återkalla din åtkomst till Firefox Screenshots.
# Note: { $url } is a placeholder for a shot page URL
shotPageDMCAIncludeLink = Vänligen ange URL-adressen till denna bild i ditt e-postmeddelande: { $url }
shotPageKeepFor = Hur länge ska denna skärmbild behållas?
# Note: shotPageSelectTime is a placeholder label for the time selection dropdown.
shotPageSelectTime = Välj tid
# The ∞ is used to indicate that the shot won't expire. It is also used in
# shotIndexNoExpirationSymbol. Try to use the same symbol in both strings, or
# if no such symbol is available for a language/culture, simply leave it out.
shotPageKeepIndefinitelyWithSymbol = Oändligt ∞
shotPageKeepTenMinutes = 10 minuter
shotPageKeepOneHour = 1 timme
shotPageKeepOneDay = 1 dag
shotPageKeepOneWeek = 1 vecka
shotPageKeepTwoWeeks = 2 veckor
shotPageKeepOneMonth = 1 månad
shotPageSaveExpiration = spara
shotPageCancelExpiration = avbryt
shotPageDoesNotExpire = upphör inte
# Note: <timediff></timediff> is a placeholder for a future relative time clause, like "in 1 week" or "tomorrow"
shotPageTimeExpiresIn = upphör <timediff></timediff>
# Note: <timediff></timediff> is a placeholder for a past relative time clause, like "1 week ago" or "yesterday"
shotPageTimeExpired = upphörde <timediff></timediff>
timeDiffJustNow = just nu
timeDiffMinutesAgo =
    { $number ->
        [one] en minut sedan
       *[other] { $number } minuter sedan
    }
timeDiffHoursAgo =
    { $number ->
        [one] en timme sedan
       *[other] { $number } timmar sedan
    }
timeDiffDaysAgo =
    { $number ->
        [one] igår
       *[other] { $number } dagar sedan
    }
timeDiffFutureSeconds = inom ett par sekunder
timeDiffFutureMinutes =
    { $number ->
        [one] inom en minut
       *[other] inom { $number } minuter
    }
timeDiffFutureHours =
    { $number ->
        [one] inom en timme
       *[other] inom { $number } timmar
    }
timeDiffFutureDays =
    { $number ->
        [one] imorgon
       *[other] inom { $number } dagar
    }
errorThirdPartyCookiesEnabled = Om du tog den här bilden och inte kan ta bort den, kan du behöva aktivera tredjepartskakor tillfälligt från din webbläsares inställningar.

## Shot Page New Feature Promotion Dialog.

# Note: If possible, choose a short translation to better fit into the card.
promoTitle = Notera!
promoMessage = Uppdaterade redigeringsverktyg låter dig beskära, markera och till och med lägga till text i din skärmbild.
promoLink = Ge dem ett försök
promoCloseButton =
    .title = Stäng meddelande

## Annotations

annotationPenButton =
    .title = Penna
annotationHighlighterButton =
    .title = Markeringspenna
annotationUndoButton =
    .title = Ångra
annotationRedoButton =
    .title = Gör om
annotationTextButton =
    .title = Lägg till text
# Note: This button reverts all the changes on the image since the start of the editing session.
annotationClearButton =
    .title = Rensa
annotationCropButton =
    .title = Beskär
annotationSaveEditButton = Spara
    .title = Spara redigering
annotationCancelEditButton = Avbryt
    .title = Avbryt redigering
annotationCropConfirmButton = Bekräfta
    .title = Bekräfta val
annotationCropCancelButton = Avbryt
    .title = Avbryt val
annotationColorWhite =
    .title = Vit
annotationColorBlack =
    .title = Svart
annotationColorRed =
    .title = Röd
annotationColorGreen =
    .title = Grön
annotationColorBlue =
    .title = Blå
annotationColorYellow =
    .title = Gul
annotationColorPurple =
    .title = Lila
annotationColorSeaGreen =
    .title = Havsgrön
annotationColorGrey =
    .title = Grå
# Note: annotationTextSize is a title for text size selection dropdown.
annotationTextSize =
    .title = Text storlek
# Values shown in text size selection dropdown
textSizeSmall = Liten
textSizeMedium = Mellan
textSizeLarge = Stor
# Confirm and Cancel button title shown when using text tool
textToolConfirmButton = Bekräfta
    .title = Bekräfta
textToolCancelButton = Avbryt
    .title = Avbryt
# Default placeholder used in input field when adding text annotations
textToolInputPlaceholder =
    .placeholder = Hallå

## The following are the title and message for an error displayed as a Firefox
## notification. It is triggered by an action in the shot page and the strings
## are passed from the shot page to the addon.

copyImageErrorTitle = Något gick fel
copyImageErrorMessage = Det gick inte att kopiera din bild till urklipp.

## Settings Page

settingsDisconnectButton = Koppla från
    .title = Koppla från
settingsGuestAccountMessage = Gästkonto
settingsSignInInvite = Logga in för att synkronisera alla enheter
settingsSignInButton = Logga in
    .title = Logga in
SettingsPageHeader = Inställningar Firefox Screenshots
settingsDescription = Du kan logga in med Firefox-konton för att synkronisera alla dina skärmbilder på olika enheter och få tillgång till dem privat.
settingsPageSubHeader = Synkronisera & Konton
settingsClosePreferences =
    .title = Stäng inställningar

## Shotindex page

# { $status } is a placeholder for an HTTP status code, like '500'.
# { $statusText } is a text description of the status code, like 'Internal server error'.
shotIndexPageErrorDeletingShot = Fel vid radering av bild: { $status } { $statusText }
# { $searchTerm } is a placeholder for text the user typed into the search box
shotIndexPageSearchResultsTitle = Mina skärmbilder: sök efter { $searchTerm }
# { $error } is a placeholder for a non-translated error message that could be shared
# with developers when debugging an error.
shotIndexPageErrorRendering = Fel vid rendering av sida: { $error }
shotIndexPageSearchPlaceholder =
    .placeholder = Sök bland bilder
shotIndexPageNoShotsMessage = Inga sparade bilder.
shotIndexPageNoShotsInvitation = Kom igen, skapa några.
shotIndexPageLookingForShots = Letar efter dina bilder…
shotIndexPageNoSearchResultsIntro = Hmm
shotIndexPageNoSearchResults = Vi kan inte hitta några bilder som matchar din sökning.
shotIndexPageMyShotsButton =
    .title = Mina skärmbilder
shotIndexPageClearSearchButton =
    .title = Rensa sökning
shotIndexPageConfirmShotDelete = Ta bort denna bild?
shotIndexPagePreviousPage =
    .title = Föregående sida
shotIndexPageNextPage =
    .title = Nästa sida
# This is tooltip for a "blank heart" symbol used in the upper top corner of the card for a shot on the
# My Shots page to indicate that the shot does expire.
shotIndexNonFavoriteIcon =
    .title = Detta är inte en favoritbild och den upphör
# This is the tooltip for a "heart" symbol in the upper top corner of the
# card for a shot on the My Shots page. It indicate that the shot was marked as
# a favorite by the owner.
shotIndexFavoriteIcon =
    .title = Detta är en favoritbild och den upphör inte
shotIndexSyncedShot =
    .title = Bild tagen på en annan enhet
shotIndexAlertErrorFavoriteShot = Ett fel uppstod vid uppdatering av favoritbildstatus

## Delete Confirmation Dialog

shotDeleteConfirmationMessage = Är du säker på att du vill ta bort denna bild?
shotDeleteCancel = Avbryt
    .title = Avbryt
shotDeleteConfirm = Ta bort
    .title = Ta bort

## Metrics page
## All metrics strings are optional for translation

# Note: 'Firefox Screenshots' should not be translated
metricsPageTitle = Statistik för Firefox Screenshots
metricsPageTotalsQueryTitle = Totalt
# Note: Screenshots is an abbreviation for Firefox Screenshots, and should not be translated.
metricsPageTotalsQueryDescription = En översikt av Screenshots
metricsPageTotalsQueryDevices = Totalt antal enheter registrerade
metricsPageTotalsQueryActiveShots = Aktiva bilder
metricsPageTotalsQueryExpiredShots = Upphörd (men kan återställas)
metricsPageTotalsQueryExpiredDeletedShots = Upphörd (och borttagen)
metricsPageShotsQueryTitle = Bilder per dag
metricsPageShotsQueryDescription = Antal bilder som skapas varje dag (under de senaste 30 dagarna)
metricsPageShotsQueryCount = Antalet bilder
metricsPageShotsQueryDay = Dag
metricsPageUsersQueryTitle = Användare per dag
metricsPageUsersQueryDescription = Antal användare som skapat minst en bild, dagligen (senaste 30 dagarna)
metricsPageUsersQueryCount = Antalet användare
metricsPageUsersQueryDay = Dag
metricsPageUserShotsQueryTitle = Antal bilder per användare
metricsPageUserShotsQueryDescription = Antalet användare som har cirka N antal bilder
metricsPageUserShotsQueryCount = Antal användare
metricsPageUserShotsQueryShots = Ungefärligt antal aktiva (ej upphörda) bilder
metricsPageRetentionQueryTitle = Återkallade per vecka
metricsPageRetentionQueryDescription = Antal dagar från en användares första bild till senaste bild, grupperat efter startvecka
metricsPageRetentionQueryUsers = Antal användare
metricsPageRetentionQueryDays = Dagar från användarens första till senaste bild
metricsPageRetentionQueryFirstWeek = Vecka då användaren skapade först bilden
metricsPageTotalRetentionQueryTitle = Totalt återkallade
metricsPageTotalRetentionQueryDescription = Hur länge användare har skapat bilder, grupperat efter vecka
metricsPageTotalRetentionQueryUsers = Antal användare
metricsPageTotalRetentionQueryDays = Dagar användaren har skapat bilder
metricsPageVersionQueryTitle = Tilläggsversion
metricsPageVersionQueryDescription = Den version av tillägget som användes under inloggningen, under de senaste 14 dagarna
metricsPageVersionQueryUsers = Antalet användare som loggat in
metricsPageVersionQueryVersion = Tilläggsversion
metricsPageVersionQueryLastSeen = Dag
metricsPageHeader = Statistik
# Note: { $created } is a placeholder for a localized date and time, like '4/21/2017, 3:40:04 AM'
metricsPageGeneratedDateTime = Skapad: { $created }
# Note { $time } is a placeholder for a number of milliseconds, like '100'
metricsPageDatabaseQueryTime = (databastid: { $time } ms)
