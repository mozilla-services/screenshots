### Localization for Server-side strings of Firefox Screenshots
### Please don't localize Firefox, Firefox Screenshots, or Screenshots


## Global phrases shared across pages, prefixed with 'g'

gMyShots = Le mie immagini
gHomeLink = Pagina iniziale
gNoShots =
    .alt = Nessuna immagine trovata
gScreenshotsDescription = Catturare schermate non è mai stato così facile. Cattura, salva e condividi le tue immagini senza uscire da Firefox.

## Header

buttonSettings =
    .title = Impostazioni
buttonSignIn =
    .title = Accedi
screenshotsLogo =
    .title = Pagina iniziale Screenshots
bannerSignIn = <a>Accedi o registrati</a> per accedere alle tue immagini da qualsiasi dispositivo e conservare per sempre le tue preferite.
bannerUpsell = { gScreenshotsDescription } <a>Scarica subito Firefox</a>

## Footer

# Note: link text for a link to mozilla.org
footerLinkMozilla = Mozilla
footerLinkTerms = Condizioni di utilizzo
footerLinkPrivacy = Informativa sulla privacy
footerReportShot = Segnala immagine
    .title = Segnala questa immagine come abuso, spam o per altri motivi
footerLinkFaqs = FAQ
footerLinkDMCA = Segnala violazioni IP
footerLinkDiscourse = Invia commenti
footerLinkRemoveAllData = Rimozione dei dati

## Creating page

# Note: { $title } is a placeholder for the title of the web page
# captured in the screenshot. The default, for pages without titles, is
# creatingPageTitleDefault.
creatingPageTitle = Creazione { $title }
creatingPageTitleDefault = pagina
creatingPageWaitMessage = Salvataggio dell’immagine…

## Home page

homePageDescription =
    .content = Un modo intuitivo di catturare schermate direttamente nel browser. Cattura, salva e condividi immagini durante la navigazione con Firefox.
homePageButtonMyShots = Vai alle mie immagini
homePageTeaser = Prossimamente…
homePageDownloadFirefoxTitle = Firefox
homePageDownloadFirefoxSubTitle = Download gratuito
# Note: do not translate 'Firefox Screenshots' when translating this string
homePageHowScreenshotsWorks = Come funziona Firefox Screenshots
homePageGetStartedTitle = Per iniziare
# Note: Screenshots is an abbreviation for Firefox Screenshots, and should not be translated.
homePageGetStartedDescription = Individua la nuova icona Screenshots nella barra degli strumenti. Selezionala e nella parte superiore della finestra del browser apparirà il menu di Firefox Screenshots.
# Note: Screenshots is an abbreviation for Firefox Screenshots, and should not be translated.
homePageGetStartedDescriptionPageAction = Seleziona l’icona di Screenshots tra le azioni disponibili per la pagina nella barra degli indirizzi. Il menu di Screenshots apparirà in alto nella finestra del browser.
homePageCaptureRegion = Cattura un’area dello schermo
# Note: Screenshots is an abbreviation for Firefox Screenshots, and should not be translated.
homePageCaptureRegionDescription = Fai clic e trascina per selezionare l’area che ti interessa. Oppure posizionati con il mouse e fai clic: Screenshots cercherà di selezionare l’area per te. È tutto pronto? Scegli Salva per memorizzare l’immagine online oppure il pulsante con la freccia verso il basso per scaricarla sul computer.
homePageCapturePage = Cattura una pagina
homePageCapturePageDescription = Utilizza i pulsanti in alto a destra per catturare la pagina. Il pulsante “Salva l’area visibile” cattura l’area visualizzata sullo schermo senza scorrere la pagina, mentre “Salva l’intera schermata” ne cattura il contenuto completo.
homePageSaveShare = Salva e condividi
# Note: Screenshots is an abbreviation for Firefox Screenshots, and should not be translated.
homePageShaveShareFavoriteDescription = Cattura uno screenshot, poi salvalo online nella libreria di Screenshot dedicata e Firefox copierà il link negli appunti per una condivisione più facile. Gli screenshot presenti nella libreria vengono automaticamente eliminati dopo due settimane, ma è sempre possibile cancellarli in qualsiasi momento o conservarli per più tempo.
homePageSignInTitle = I tuoi screenshot sempre con te
homePageSignInDescription = Accedi a Screenshot con il tuo account Firefox per avere a disposizione i tuoi screenshot su tutti i dispositivi in cui utilizzi Firefox. Una chicca in più: puoi salvare i tuoi screenshot preferiti per sempre.
homePageLegalLink = Note legali
homePagePrivacyLink = Privacy
homePageTermsLink = Condizioni di utilizzo
homePageCookiesLink = Cookie

## Leave Screenshots page

leavePageRemoveAllData = Elimina tutti i dati
# Note: do not translate 'Firefox Screenshots' when translating this string
leavePageErrorAuthRequired = È necessario avere installato Firefox Screenshots o essere connesso all’account Firefox per eliminare il proprio account
leavePageErrorGeneric = Si è verificato un errore
# Note: do not translate 'Firefox Screenshots' when translating this string
leavePageWarning = Questa operazione eliminerà tutti i dati associati a Firefox Screenshots.
leavePageButtonProceed = Continua
leavePageButtonCancel = Annulla
leavePageDeleted = Tutte le tue immagini sono state eliminate.

## Not Found page

notFoundPageTitle = Pagina non trovata
notFoundPageIntro = Oops.
notFoundPageDescription = Pagina non trovata.

## Shot page

# This is the HTML title tag of the page
shotPageTitle = Screenshot: { $originalTitle }
shotPageAlertErrorUpdatingExpirationTime = Errore durante la modifica della scadenza dell’immagine
shotPageAlertErrorDeletingShot = Errore durante l’eliminazione dell’immagine
shotPageAlertErrorUpdatingTitle = Errore durante il salvataggio del titolo
shotPageConfirmDelete = Eliminare questa immagine in modo definitivo?
shotPageShareButton =
    .title = Condividi
shotPageCopyButton =
    .title = Copia immagine negli appunti
shotPageCopied = Copiato
shotPageShareFacebook =
    .title = Condividi su Facebook
shotPageShareTwitter =
    .title = Condividi su Twitter
shotPageSharePinterest =
    .title = Condividi su Pinterest
shotPageShareEmail =
    .title = Condividi link via email
shotPageShareLink = Ottieni un link per condividere questa immagine:
shotPagePrivacyMessage = Chiunque in possesso di questo link potrà visualizzare l’immagine.
shotPageCopyImageText =
    .label = Copia testo nell’immagine
shotPageConfirmDeletion = Eliminare questa immagine in modo definitivo?
# Note: <timediff></timediff> is a placeholder for a future relative time clause like 'in 3 days' or 'tomorrow'
shotPageTimeExpirationMessage = Senza ulteriori azioni, questa immagine verrà eliminata <timediff></timediff>.
# Note: { $date } is a placeholder for a localized future date as returned by Date.toLocaleString.
# For example, in en-US, { $date } could be "7/12/2017, 1:52:50 PM".
shotPageRestoreButton = ripristina fino a { $date }
shotPageExpiredMessage = Questa immagine è scaduta.
# Note: This phrase is followed by an empty line, then the URL of the source page
shotPageExpiredMessageDetails = Pagina originale da cui l’immagine è stata creata:
shotPageDeleteButton =
    .title = Elimina questa immagine
shotPageDownloadShot =
    .title = Scarica
shotPageEditButton =
    .title = Modifica immagine
shotPagefavoriteButton =
    .title = Aggiungi immagine ai preferiti
shotPageBackToHomeButton =
    .title = Pagina iniziale
shotPageAllShotsButton =
    .title = Tutte le immagini
shotPageScreenshotsDescription = Catturare schermate non è mai stato così facile. Cattura, salva e condividi le tue immagini senza uscire da Firefox.
shotPageDMCAMessage = Questa immagine non è più disponibile a causa di una segnalazione di violazione della proprietà intellettuale da parte di soggetti terzi.
# Note: { $dmca } is a placeholder for a link to send email (a 'mailto' link)
shotPageDMCAContact = Invia un’email a { $dmca } per richiedere ulteriori informazioni.
# Note: do not translate 'Firefox Screenshots' when translating this string
shotPageDMCAWarning = In caso di ripetute segnalazioni di violazione, potremmo revocare il tuo accesso a Firefox Screenshots.
# Note: { $url } is a placeholder for a shot page URL
shotPageDMCAIncludeLink = Includi l'indirizzo di questa immagine nell’email: { $url }
shotPageKeepFor = Per quanto tempo vuoi conservare questa immagine?
# Note: shotPageSelectTime is a placeholder label for the time selection dropdown.
shotPageSelectTime = Seleziona durata
# The ∞ is used to indicate that the shot won't expire. It is also used in
# shotIndexNoExpirationSymbol. Try to use the same symbol in both strings, or
# if no such symbol is available for a language/culture, simply leave it out.
shotPageKeepIndefinitelyWithSymbol = nessuna scadenza ∞
shotPageKeepTenMinutes = 10 minuti
shotPageKeepOneHour = 1 ora
shotPageKeepOneDay = 1 giorno
shotPageKeepOneWeek = 1 settimana
shotPageKeepTwoWeeks = 2 settimane
shotPageKeepOneMonth = 1 mese
shotPageSaveExpiration = Salva
shotPageCancelExpiration = Annulla
shotPageDoesNotExpire = nessuna scadenza
# Note: <timediff></timediff> is a placeholder for a future relative time clause, like "in 1 week" or "tomorrow"
shotPageTimeExpiresIn = Scade <timediff></timediff>
# Note: <timediff></timediff> is a placeholder for a past relative time clause, like "1 week ago" or "yesterday"
shotPageTimeExpired = è scaduto <timediff></timediff>
timeDiffJustNow = adesso
timeDiffMinutesAgo =
    { $number ->
        [one] 1 minuto fa
       *[other] { $number } minuti fa
    }
timeDiffHoursAgo =
    { $number ->
        [one] 1 ora fa
       *[other] { $number } ore fa
    }
timeDiffDaysAgo =
    { $number ->
        [one] ieri
       *[other] { $number } giorni fa
    }
timeDiffFutureSeconds = tra pochi secondi
timeDiffFutureMinutes =
    { $number ->
        [one] in 1 minuto
       *[other] in { $number } minuti
    }
timeDiffFutureHours =
    { $number ->
        [one] in 1 ora
       *[other] in { $number } ore
    }
timeDiffFutureDays =
    { $number ->
        [one] domani
       *[other] in { $number } giorni
    }
errorThirdPartyCookiesEnabled = Se hai creato questa immagine e non riesci ad eliminarla, potrebbe essere necessario attivare i cookie di terze parti nelle impostazioni del browser.

## Shot Page New Feature Promotion Dialog.

# Note: If possible, choose a short translation to better fit into the card.
promoTitle = Prendi nota!
promoMessage = Gli strumenti di modifica aggiornati permettono di ritagliare, evidenziare e anche di aggiungere testo ai tuoi screenshot.
promoLink = Provali
promoCloseButton =
    .title = Chiudi notifica

## Annotations

annotationPenButton =
    .title = Penna
annotationHighlighterButton =
    .title = Evidenziatore
annotationUndoButton =
    .title = Annulla
annotationRedoButton =
    .title = Ripeti
annotationTextButton =
    .title = Aggiungi testo
# Note: This button reverts all the changes on the image since the start of the editing session.
annotationClearButton =
    .title = Cancella
annotationCropButton =
    .title = Ritaglia
annotationSaveEditButton = Salva
    .title = Salva modifiche
annotationCancelEditButton = Annulla
    .title = Annulla modifiche
annotationCropConfirmButton = Conferma
    .title = Conferma la selezione
annotationCropCancelButton = Annulla
    .title = Annulla la selezione
annotationColorWhite =
    .title = Bianco
annotationColorBlack =
    .title = Nero
annotationColorRed =
    .title = Rosso
annotationColorGreen =
    .title = Verde
annotationColorBlue =
    .title = Blu
annotationColorYellow =
    .title = Giallo
annotationColorPurple =
    .title = Viola
annotationColorSeaGreen =
    .title = Verde acqua
annotationColorGrey =
    .title = Grigio
# Note: annotationTextSize is a title for text size selection dropdown.
annotationTextSize =
    .title = Dimensione testo
# Values shown in text size selection dropdown
textSizeSmall = Piccolo
textSizeMedium = Medio
textSizeLarge = Grande
# Confirm and Cancel button title shown when using text tool
textToolConfirmButton = Conferma
    .title = Conferma
textToolCancelButton = Annulla
    .title = Annulla
# Default placeholder used in input field when adding text annotations
textToolInputPlaceholder =
    .placeholder = Ciao

## The following are the title and message for an error displayed as a Firefox
## notification. It is triggered by an action in the shot page and the strings
## are passed from the shot page to the addon.

copyImageErrorTitle = Si è verificato un errore
copyImageErrorMessage = Impossibile copiare l’immagine negli appunti.

## Settings Page

settingsDisconnectButton = Disconnetti
    .title = Disconnetti
settingsGuestAccountMessage = Account ospite
settingsSignInInvite = Accedi per sincronizzare attraverso più dispositivi
settingsSignInButton = Accedi
    .title = Accedi
SettingsPageHeader = Impostazioni di Firefox Screenshots
settingsDescription = Puoi accedere con il tuo account Firefox per sincronizzare le immagini attraverso più dispositivi, e accedervi in piena riservatezza.
settingsPageSubHeader = Sync e account Firefox
settingsClosePreferences =
    .title = Chiudi impostazioni

## Shotindex page

# { $status } is a placeholder for an HTTP status code, like '500'.
# { $statusText } is a text description of the status code, like 'Internal server error'.
shotIndexPageErrorDeletingShot = Errore durante l’eliminazione dell’immagine: { $status } { $statusText }
# { $searchTerm } is a placeholder for text the user typed into the search box
shotIndexPageSearchResultsTitle = Le mie immagini: cerca { $searchTerm }
# { $error } is a placeholder for a non-translated error message that could be shared
# with developers when debugging an error.
shotIndexPageErrorRendering = Errore durante la generazione della pagina: { $error }
shotIndexPageSearchPlaceholder =
    .placeholder = Cerca nelle mie immagini
shotIndexPageNoShotsMessage = Nessuna immagine salvata.
shotIndexPageNoShotsInvitation = Cosa aspetti? Creane qualcuna.
shotIndexPageLookingForShots = Ricerca immagini…
shotIndexPageNoSearchResultsIntro = Uhm
shotIndexPageNoSearchResults = Non abbiamo trovato alcuna immagine che corrisponda al testo inserito.
shotIndexPageMyShotsButton =
    .title = Le mie immagini
shotIndexPageClearSearchButton =
    .title = Pulisci ricerca
shotIndexPageConfirmShotDelete = Eliminare questa immagine?
shotIndexPagePreviousPage =
    .title = Pagina precedente
shotIndexPageNextPage =
    .title = Pagina successiva
# This is tooltip for a "blank heart" symbol used in the upper top corner of the card for a shot on the
# My Shots page to indicate that the shot does expire.
shotIndexNonFavoriteIcon =
    .title = Questa immagine non è nei preferiti e scadrà
# This is the tooltip for a "heart" symbol in the upper top corner of the
# card for a shot on the My Shots page. It indicate that the shot was marked as
# a favorite by the owner.
shotIndexFavoriteIcon =
    .title = Questa immagine è nei preferiti e non ha scadenza
shotIndexSyncedShot =
    .title = Immagine catturata da un altro dispositivo
shotIndexAlertErrorFavoriteShot = Si è verificato un errore durante l’aggiornamento dell’immagine preferita

## Delete Confirmation Dialog

shotDeleteConfirmationMessage = Eliminare questa immagine?
shotDeleteCancel = Annulla
    .title = Annulla
shotDeleteConfirm = Elimina
    .title = Elimina

## Metrics page
## All metrics strings are optional for translation

# Note: 'Firefox Screenshots' should not be translated
metricsPageTitle = Metriche di Firefox Screenshots
metricsPageTotalsQueryTitle = Totali
# Note: Screenshots is an abbreviation for Firefox Screenshots, and should not be translated.
metricsPageTotalsQueryDescription = Una panoramica di Screenshots
metricsPageTotalsQueryDevices = Totale dispositivi registrati
metricsPageTotalsQueryActiveShots = Immagini attive
metricsPageTotalsQueryExpiredShots = Scadute (ma recuperabili)
metricsPageTotalsQueryExpiredDeletedShots = Scadute (ed eliminate)
metricsPageShotsQueryTitle = Immagini per giorno
metricsPageShotsQueryDescription = Numero di immagini create ogni giorno (negli ultimi 30 giorni)
metricsPageShotsQueryCount = Numero di immagini
metricsPageShotsQueryDay = Giorno
metricsPageUsersQueryTitle = Utenti per giorno
metricsPageUsersQueryDescription = Numero di utenti che hanno creato almeno un’immagine, per giorno (ultimi 30 giorni)
metricsPageUsersQueryCount = Numero di utenti
metricsPageUsersQueryDay = Giorno
metricsPageUserShotsQueryTitle = Numero di immagini per utente
metricsPageUserShotsQueryDescription = Il numero di utenti con N immagini complessive
metricsPageUserShotsQueryCount = Numero di utenti
metricsPageUserShotsQueryShots = Numero approssimativo di immagini attive (non scadute)
metricsPageRetentionQueryTitle = Fidelizzazione per settimana
metricsPageRetentionQueryDescription = Numero di giorni dalla prima immagine alla più recente, raggruppati per settimana iniziale
metricsPageRetentionQueryUsers = Numero di utenti
metricsPageRetentionQueryDays = Giorni trascorsi dall’immagine più recente dell’utente
metricsPageRetentionQueryFirstWeek = Settimana in cui l’utente ha creato la prima immagine
metricsPageTotalRetentionQueryTitle = Fidelizzazione complessiva
metricsPageTotalRetentionQueryDescription = Per quanto tempo gli utenti hanno creato immagini, raggruppato per settimana
metricsPageTotalRetentionQueryUsers = Numero di utenti
metricsPageTotalRetentionQueryDays = Per quanti giorni l’utente ha creato immagini
metricsPageVersionQueryTitle = Versione componente aggiuntivo
metricsPageVersionQueryDescription = La versione del componente aggiuntivo utilizzata per accedere (ultimi 14 giorni)
metricsPageVersionQueryUsers = Numero di utenti che effettuano l’accesso
metricsPageVersionQueryVersion = Versione componente aggiuntivo
metricsPageVersionQueryLastSeen = Giorno
metricsPageHeader = Metriche
# Note: { $created } is a placeholder for a localized date and time, like '4/21/2017, 3:40:04 AM'
metricsPageGeneratedDateTime = Generato il: { $created }
# Note { $time } is a placeholder for a number of milliseconds, like '100'
metricsPageDatabaseQueryTime = (tempo di utilizzo del database: { $time }ms)
