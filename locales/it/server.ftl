// Localization for Server-side strings of Firefox Screenshots
// 
// Please don't localize Firefox, Firefox Screenshots, or Screenshots



// Global phrases shared across pages, prefixed with 'g'
[[ global ]]

gMyShots = Le mie immagini
gHomeLink = Pagina iniziale
gNoShots
    .alt = Nessuna immagine trovata
gScreenshotsDescription = Realizzare screenshot non è mai stato così facile. Cattura, salva e condividi le tue immagini senza uscire da Firefox.


[[ Footer ]]

// Note: link text for a link to mozilla.org
footerLinkMozilla = Mozilla
footerLinkTerms = Condizioni di utilizzo
footerLinkPrivacy = Informativa sulla privacy
footerLinkDMCA = Segnala violazioni IP
footerLinkDiscourse = Invia commenti
footerLinkRemoveAllData = Rimozione dei dati


[[ Creating page ]]

// Note: { $title } is a placeholder for the title of the web page
// captured in the screenshot. The default, for pages without titles, is
// creatingPageTitleDefault.
creatingPageTitle = Creazione { $title }
creatingPageTitleDefault = pagina
creatingPageWaitMessage = Salvataggio dell’immagine…


[[ Home page ]]

homePageDescription
    .content = Un modo intuitivo di realizzare screenshot direttamente nel browser. Cattura, salva e condividi immagini durante la navigazione con Firefox.
homePageButtonMyShots = Vai alle mie immagini
homePageTeaser = Prossimamente…
homePageDownloadFirefoxTitle = Firefox
homePageDownloadFirefoxSubTitle = Download gratuito
homePageGetStarted = Per iniziare
// Note: do not translate 'Firefox Screenshots' when translating this string
homePageHowScreenshotsWorks = Come funziona Firefox Screenshots
homePageGetStartedTitle = Per iniziare
// Note: Screenshots is an abbreviation for Firefox Screenshots, and should not be translated.
homePageGetStartedDescription = Individua la nuova icona Screenshots nella barra degli strumenti. Selezionala e nella parte superiore della finestra del browser apparirà il menu di Firefox Screenshots.
homePageCaptureRegion = Cattura un’area dello schermo
// Note: Screenshots is an abbreviation for Firefox Screenshots, and should not be translated.
homePageCaptureRegionDescription = Fai clic e trascina per selezionare l’area che ti interessa. Oppure posizionati con il mouse e fai clic: Screenshots cercherà di selezionare l’area per te. È tutto pronto? Scegli Salva per memorizzare l’immagine online oppure il pulsante con la freccia verso il basso per scaricarla sul computer.
homePageCapturePage = Cattura una pagina
homePageCapturePageDescription = Utilizza i pulsanti in alto a destra per catturare la pagina. Il pulsante “Salva l’area visibile” cattura l’area visualizzata sullo schermo senza scorrere la pagina, mentre “Salva l’intera schermata” ne cattura il contenuto completo.
homePageSaveShare = Salva e condividi
// Note: Screenshots is an abbreviation for Firefox Screenshots, and should not be translated.
homePageSaveShareDescription = Quando salvi uno screenshot in Firefox, la tua immagine viene aggiunta alla libreria online e il link viene copiato negli appunti. L’immagine viene conservata automaticamente per due settimane, ma puoi eliminarla in qualunque momento, o modificarne la data di scadenza per mantenerla più a lungo nella libreria.
homePageLegalLink = Note legali
homePagePrivacyLink = Privacy
homePageTermsLink = Condizioni di utilizzo
homePageCookiesLink = Cookie


[[ Leave Screenshots page ]]

leavePageRemoveAllData = Elimina tutti i dati
// Note: do not translate 'Firefox Screenshots' when translating this string
leavePageErrorAddonRequired = È necessario avere installato Firefox Screenshots per eliminare l’account
leavePageErrorGeneric = Si è verificato un errore
// Note: do not translate 'Firefox Screenshots' when translating this string
leavePageWarning = Questa operazione eliminerà tutti i dati associati a Firefox Screenshots.
leavePageButtonProceed = Continua
leavePageButtonCancel = Annulla
leavePageDeleted = Tutte le tue immagini sono state eliminate.


[[ Not Found page ]]

notFoundPageTitle = Pagina non trovata
notFoundPageIntro = Oops.
notFoundPageDescription = Pagina non trovata.


[[ Shot page ]]

// This is the HTML title tag of the page
shotPageTitle = Screenshot: { $originalTitle }
shotPageAlertErrorUpdatingExpirationTime = Errore durante la modifica della scadenza dell’immagine
shotPageAlertErrorDeletingShot = Errore durante l’eliminazione dell’immagine
shotPageAlertErrorUpdatingTitle = Errore durante il salvataggio del titolo
shotPageConfirmDelete = Eliminare questa immagine in modo definitivo?
shotPageShareButton
    .title = Condividi
shotPageCopy = Copia
shotPageCopied = Copiato
shotPageShareFacebook
    .title = Condividi su Facebook
shotPageShareTwitter
    .title = Condividi su Twitter
shotPageSharePinterest
    .title = Condividi su Pinterest
shotPageShareEmail
    .title = Condividi link via email
shotPageShareLink = Ottieni un link per condividere questa immagine:
shotPagePrivacyMessage = Chiunque in possesso di questo link potrà visualizzare l’immagine.
shotPageCopyImageText
    .label = Copia testo nell’immagine
shotPageConfirmDeletion = Eliminare questa immagine in modo definitivo?
// Note: { $timediff } is a placeholder for a future relative time clause like 'in 3 days' or 'tomorrow'
shotPageExpirationMessage = Senza ulteriori azioni, questa immagine verrà eliminata { $timediff }.
// Note: { $date } is a placeholder for a localized future date as returned by Date.toLocaleString.
// For example, in en-US, { $date } could be "7/12/2017, 1:52:50 PM".
shotPageRestoreButton = ripristina fino a { $date }
shotPageExpiredMessage = Questa immagine è scaduta.
// Note: This phrase is followed by an empty line, then the URL of the source page
shotPageExpiredMessageDetails = Pagina originale da cui l’immagine è stata creata:
shotPageDeleteButton
    .title = Elimina questa immagine
shotPageAbuseButton
    .title = Segnala questa immagine per abuso, spam o altri problemi
shotPageDownloadShot
    .title = Scarica
shotPageDownload = Scarica
shotPageScreenshotsDescription = Realizzare screenshot non è mai stato così facile. Cattura, salva e condividi le tue immagini senza uscire da Firefox.
shotPageUpsellFirefox = Installa Firefox adesso
shotPageDMCAMessage = Questa immagine non è più disponibile a causa di una segnalazione di violazione della proprietà intellettuale da parte di soggetti terzi.
// Note: { $dmca } is a placeholder for a link to send email (a 'mailto' link)
shotPageDMCAContact = Invia un’email a { $dmca } per richiedere ulteriori informazioni.
// Note: do not translate 'Firefox Screenshots' when translating this string
shotPageDMCAWarning = In caso di ripetute segnalazioni di violazione, potremmo revocare il tuo accesso a Firefox Screenshots.
// Note: { $url } is a placeholder for a shot page URL
shotPageDMCAIncludeLink = Includi l'indirizzo di questa immagine nell’email: { $url }
shotPageKeepFor = Per quanto tempo vuoi conservare questa immagine?
// Note: shotPageSelectTime is a placeholder label for the time selection dropdown.
shotPageSelectTime = Seleziona durata
shotPageKeepIndefinitely = Per sempre
shotPageKeepTenMinutes = 10 minuti
shotPageKeepOneHour = 1 ora
shotPageKeepOneDay = 1 giorno
shotPageKeepOneWeek = 1 settimana
shotPageKeepTwoWeeks = 2 settimane
shotPageKeepOneMonth = 1 mese
shotPageSaveExpiration = Salva
shotPageCancelExpiration = Annulla
shotPageDoesNotExpire = nessuna scadenza
// Note: { $timediff } is a placeholder for a future relative time clause, like "in 1 week" or "tomorrow"
shotPageExpiresIn = Scade { $timediff }
// Note: { $timediff } is a placeholder for a past relative time clause, like "1 week ago" or "yesterday"
shotPageExpired = è scaduto { $timediff }
timeDiffJustNow = adesso
timeDiffMinutesAgo = { $num ->
        [one] 1 minuto fa
       *[other] { $number } minuti fa
    }
timeDiffHoursAgo = { $num ->
        [one] 1 ora fa
       *[other] { $number } ore fa
    }
timeDiffDaysAgo = { $num ->
        [one] ieri
       *[other] { $number } giorni fa
    }
timeDiffFutureSeconds = tra pochi secondi
timeDiffFutureMinutes = { $num ->
        [one] in 1 minuto
       *[other] in { $number } minuti
    }
timeDiffFutureHours = { $num ->
        [one] in 1 ora
       *[other] in { $number } ore
    }
timeDiffFutureDays = { $num ->
        [one] domani
       *[other] in { $number } giorni
    }


[[ Shotindex page ]]

// { $status } is a placeholder for an HTTP status code, like '500'.
// { $statusText } is a text description of the status code, like 'Internal server error'.
shotIndexPageErrorDeletingShot = Errore durante l’eliminazione dell’immagine: { $status } { $statusText }
// { $searchTerm } is a placeholder for text the user typed into the search box
shotIndexPageSearchResultsTitle = Le mie immagini: cerca { $searchTerm }
// { $error } is a placeholder for a non-translated error message that could be shared
// with developers when debugging an error.
shotIndexPageErrorRendering = Errore durante la generazione della pagina: { $error }
shotIndexPageSearchPlaceholder
    .placeholder = Cerca nelle mie immagini
shotIndexPageSearchButton
    .title = Cerca
shotIndexPageNoShotsMessage = Nessuna immagine salvata.
shotIndexPageNoShotsInvitation = Cosa aspetti? Creane qualcuna.
shotIndexPageLookingForShots = Ricerca immagini…
shotIndexPageNoSearchResultsIntro = Uhm
shotIndexPageNoSearchResults = Non abbiamo trovato alcuna immagine che corrisponda al testo inserito.
shotIndexPageClearSearchButton
    .title = Pulisci ricerca
shotIndexPageConfirmShotDelete = Eliminare questa immagine?


// all metrics strings are optional for translation
[[ Metrics page ]]

// Note: 'Firefox Screenshots' should not be translated
metricsPageTitle = Metriche di Firefox Screenshots
metricsPageTotalsQueryTitle = Totali
// Note: Screenshots is an abbreviation for Firefox Screenshots, and should not be translated.
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
// Note: { $created } is a placeholder for a localized date and time, like '4/21/2017, 3:40:04 AM'
metricsPageGeneratedDateTime = Generato il: { $created }
// Note { $time } is a placeholder for a number of milliseconds, like '100'
metricsPageDatabaseQueryTime = (tempo di utilizzo del database: { $time }ms)
