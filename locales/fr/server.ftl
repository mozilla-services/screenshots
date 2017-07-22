// Localization for Server-side strings of Firefox Screenshots
// 
// Please don't localize Firefox, Firefox Screenshots, or Screenshots



// Global phrases shared across pages, prefixed with 'g'
[[ global ]]

gMyShots = Mes captures d’écran
gHomeLink = Accueil
gNoShots
    .alt = Aucune capture trouvée
gScreenshotsDescription = Des captures en un clin d’œil. Capturez l’écran, enregistrez et partagez sans quitter Firefox.


[[ Creating page ]]

// Note: { $title } is a placeholder for the title of the web page
// captured in the screenshot. The default, for pages without titles, is
// creatingPageTitleDefault.
creatingPageTitle = Capture de { $title }
creatingPageTitleDefault = page


[[ Home page ]]

homePageDescription
    .content = Des captures d’écran directement dans votre navigateur. Cadrez, enregistrez et partagez vos captures d’écran en naviguant sur le Web avec Firefox.
homePageButtonMyShots = Afficher mes captures
homePageTeaser = Bientôt disponible…
homePageDownloadFirefoxTitle = Firefox
homePageDownloadFirefoxSubTitle = Téléchargement gratuit
// Note: do not translate 'Firefox Screenshots' when translating this string
homePageHowScreenshotsWorks = Principes de fonctionnement de Firefox Screenshots
homePageLegalLink = Mentions légales
homePagePrivacyLink = Confidentialité
homePageTermsLink = Conditions d’utilisation
homePageCookiesLink = Cookies


[[ Leave Screenshots page ]]

leavePageConfirmDelete = Confirmer la suppression du compte
// Note: do not translate 'Firefox Screenshots' when translating this string
leavePageErrorAddonRequired = Firefox Screenshots doit être installé pour pouvoir procéder à la suppression du compte.
leavePageErrorGeneric = Une erreur s’est produite
// Note: do not translate 'Firefox Screenshots' when translating this string
leavePageWarning = Cette action supprimera définitivement l’ensemble de vos données Firefox Screenshots.
leavePageButtonProceed = Poursuivre
leavePageButtonCancel = Annuler
leavePageDeleted = Toutes vos captures ont été supprimées.


[[ Not Found page ]]

notFoundPageTitle = Page introuvable
notFoundPageIntro = Oups.
notFoundPageDescription = Page introuvable.


[[ Shot page ]]

shotPageAlertErrorUpdatingExpirationTime = Erreur lors de l’enregistrement de l’expiration
shotPageAlertErrorDeletingShot = Erreur lors de la suppression de la capture
shotPageAlertErrorUpdatingTitle = Erreur lors de l’enregistrement du titre
shotPageConfirmDelete = Voulez-vous vraiment supprimer cette capture de façon définitive ?
shotPageShareButton
    .title = Partager
shotPageCopy = Copier
shotPageCopied = Copié
shotPageShareFacebook
    .title = Partager sur Facebook
shotPageShareTwitter
    .title = Partager sur Twitter
shotPageSharePinterest
    .title = Partager sur Pinterest
shotPageShareEmail
    .title = Partager le lien par courriel
shotPageShareLink = Obtenir un lien pour partager cette capture :
shotPagePrivacyMessage = Toute personne disposant du lien peut voir cette capture.
shotPageCopyImageText
    .label = Copier le texte de l’image
shotPageConfirmDeletion = Voulez-vous vraiment supprimer définitivement cette capture ?
// Note: { $timediff } is a placeholder for a future relative time clause like 'in 3 days' or 'tomorrow'
shotPageExpirationMessage = Si vous ne faites rien, cette capture sera supprimée de façon définitive { $timediff }.
// Note: { $date } is a placeholder for a localized future date as returned by Date.toLocaleString.
// For example, in en-US, { $date } could be "7/12/2017, 1:52:50 PM".
shotPageRestoreButton = restaurer jusqu’au { $date }
shotPageExpiredMessage = Cette capture a expiré.
// Note: This phrase is followed by an empty line, then the URL of the source page
shotPageExpiredMessageDetails = Voici la page depuis laquelle elle a été créée :
shotPageDeleteButton
    .title = Supprimer cette capture
shotPageAbuseButton
    .title = Signaler cette capture pour cause d’abus, de spam ou d’autres problèmes
shotPageDownloadShot
    .title = Télécharger
shotPageDownload = Télécharger
shotPageScreenshotsDescription =
    Des captures en un clin d’œil. Capturez l’écran, enregistrez et partagez sans quitter Firefox.

shotPageUpsellFirefox = Installez Firefox
// Note: { $dmca } is a placeholder for a link to send email (a 'mailto' link)
shotPageDMCAContact = Veuillez contacter { $dmca } pour demander plus d’informations.
// Note: do not translate 'Firefox Screenshots' when translating this string
shotPageDMCAWarning = Si vos captures font l’objet de multiples réclamations, nous pouvons révoquer votre accès à Firefox Screenshots.
shotPageKeepFor = Combien de temps cette capture doit-elle être conservée ?
// Note: shotPageSelectTime is a placeholder label for the time selection dropdown.
shotPageSelectTime = Sélectionner une durée
shotPageKeepIndefinitely = Indéfiniment
shotPageKeepTenMinutes = 10 minutes
shotPageKeepOneHour = 1 heure
shotPageKeepOneDay = 1 jour
shotPageKeepOneWeek = 1 semaine
shotPageKeepTwoWeeks = 2 semaines
shotPageKeepOneMonth = 1 mois
shotPageSaveExpiration = enregistrer
shotPageCancelExpiration = annuler
shotPageDoesNotExpire = n’expire jamais
// Note: { $timediff } is a placeholder for a future relative time clause, like "in 1 week" or "tomorrow"
shotPageExpiresIn = expire { $timediff }
// Note: { $timediff } is a placeholder for a past relative time clause, like "1 week ago" or "yesterday"
shotPageExpired = a expiré { $timediff }
timeDiffJustNow = à l’instant
timeDiffMinutesAgo = { $num ->
        [one] il y a 1 minute
       *[other] il y a { $number } minutes
    }
timeDiffHoursAgo = { $num ->
        [one] il y a 1 heure
       *[other] il y a { $number } heures
    }
timeDiffDaysAgo = { $num ->
        [one] hier
       *[other] il y a { $number } jours
    }
timeDiffFutureSeconds = dans quelques secondes
timeDiffFutureMinutes = { $num ->
        [one] dans 1 minute
       *[other] dans { $number } minutes
    }
timeDiffFutureHours = { $num ->
        [one] dans 1 heure
       *[other] dans { $number } heures
    }
timeDiffFutureDays = { $num ->
        [one] demain
       *[other] dans { $number } jours
    }


[[ Shotindex page ]]

// { $status } is a placeholder for an HTTP status code, like '500'.
// { $statusText } is a text description of the status code, like 'Internal server error'.
shotIndexPageErrorDeletingShot = Erreur lors de la suppression de la capture : { $status } { $statusText }
// { $searchTerm } is a placeholder for text the user typed into the search box
shotIndexPageSearchResultsTitle = Mes captures : rechercher { $searchTerm }
// { $error } is a placeholder for a non-translated error message that could be shared
// with developers when debugging an error.
shotIndexPageErrorRendering = Erreur lors du rendu de la page : { $error }
shotIndexPageSearchPlaceholder
    .placeholder = Rechercher mes captures
shotIndexPageSearchButton
    .title = Rechercher
shotIndexPageNoShotsMessage = Aucune capture enregistrée.
shotIndexPageNoShotsInvitation = Comment ça fonctionne ? Allez-y, faites une capture.
shotIndexPageLookingForShots = Nous recherchons vos captures…
shotIndexPageNoSearchResultsIntro = Hum…
shotIndexPageNoSearchResults = Nous n’avons trouvé aucune capture correspondant à votre recherche.
shotIndexPageClearSearchButton
    .title = Effacer la recherche
shotIndexPageConfirmShotDelete = Supprimer cette capture ?


// all metrics strings are optional for translation
[[ Metrics page ]]

