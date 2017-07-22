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

homePageButtonMyShots = Afficher mes captures
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
leavePageButtonCancel = Annuler


[[ Not Found page ]]

notFoundPageTitle = Page introuvable
notFoundPageIntro = Oups.
notFoundPageDescription = Page introuvable.


[[ Shot page ]]

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
shotPageCopyImageText
    .label = Copier le texte de l’image
shotPageDownloadShot
    .title = Télécharger
shotPageDownload = Télécharger
// Note: { $dmca } is a placeholder for a link to send email (a 'mailto' link)
shotPageDMCAContact = Veuillez contacter { $dmca } pour demander plus d’informations.
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

