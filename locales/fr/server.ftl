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


[[ Footer ]]

// Note: link text for a link to mozilla.org
footerLinkMozilla = Mozilla
footerLinkTerms = Conditions
footerLinkPrivacy = Politique de confidentialité
footerLinkDMCA = Signaler une violation de la p.i.
footerLinkDiscourse = Donner son avis
footerLinkRemoveAllData = Supprimer toutes les données


[[ Creating page ]]

// Note: { $title } is a placeholder for the title of the web page
// captured in the screenshot. The default, for pages without titles, is
// creatingPageTitleDefault.
creatingPageTitle = Capture de { $title }
creatingPageTitleDefault = page
creatingPageWaitMessage = Enregistrement de votre capture…


[[ Home page ]]

homePageDescription
    .content = Des captures d’écran directement dans votre navigateur. Cadrez, enregistrez et partagez vos captures d’écran en naviguant sur le Web avec Firefox.
homePageButtonMyShots = Afficher mes captures
homePageTeaser = Bientôt disponible…
homePageDownloadFirefoxTitle = Firefox
homePageDownloadFirefoxSubTitle = Téléchargement gratuit
homePageGetStarted = Prise en main
// Note: do not translate 'Firefox Screenshots' when translating this string
homePageHowScreenshotsWorks = Principes de fonctionnement de Firefox Screenshots
homePageGetStartedTitle = Pour bien commencer
// Note: Screenshots is an abbreviation for Firefox Screenshots, and should not be translated.
homePageGetStartedDescription = Repérez la nouvelle icône Screenshots dans votre barre d’outils. Cliquez dessus et le menu Screenshots apparaîtra en haut de votre fenêtre de navigation.
homePageCaptureRegion = Capturez une zone de la page
// Note: Screenshots is an abbreviation for Firefox Screenshots, and should not be translated.
homePageCaptureRegionDescription = Sélectionnez une zone de la page par cliquer-glisser ou bien survolez un élément et Screenshots sélectionnera la zone pour vous. Lorsque cela vous convient, cliquez sur « Enregistrer » pour accéder à votre capture d’écran en ligne ou sur le bouton représentant une flèche vers le bas pour la télécharger sur votre ordinateur.
homePageCapturePage = Capturez une page
homePageCapturePageDescription = Utilisez les boutons en haut à droite pour capturer des pages complètes. Le bouton « Capturer la zone visible » permet de capturer la zone que vous pouvez afficher sans faire défiler la page, et le bouton « Capturer la page complète » capturera l’ensemble de la page.
homePageSaveShare = Enregistrez et partagez
// Note: Screenshots is an abbreviation for Firefox Screenshots, and should not be translated.
homePageSaveShareDescription = Lorsque vous effectuez une capture, Firefox la poste sur notre bibliothèque en ligne Screenshots et copie le lien dans le presse-papiers. Nous conservons automatiquement la capture pendant deux semaines, mais vous pouvez supprimer des captures à tout moment ou modifier leur date d’expiration pour les conserver plus longtemps dans la bibliothèque.
homePageLegalLink = Mentions légales
homePagePrivacyLink = Confidentialité
homePageTermsLink = Conditions d’utilisation
homePageCookiesLink = Cookies


[[ Leave Screenshots page ]]

leavePageRemoveAllData = Supprimer toutes les données
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

// This is the HTML title tag of the page
shotPageTitle = Capture d’écran : { $originalTitle }
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
shotPageScreenshotsDescription = Des captures en un clin d’œil. Capturez l’écran, enregistrez et partagez sans quitter Firefox.
shotPageUpsellFirefox = Installez Firefox
shotPageDMCAMessage = Cette capture n’est plus disponible, car un tiers a signalé une atteinte aux droits de la propriété intellectuelle.
// Note: { $dmca } is a placeholder for a link to send email (a 'mailto' link)
shotPageDMCAContact = Veuillez contacter { $dmca } pour demander plus d’informations.
// Note: do not translate 'Firefox Screenshots' when translating this string
shotPageDMCAWarning = Si vos captures font l’objet de multiples réclamations, nous pouvons révoquer votre accès à Firefox Screenshots.
// Note: { $url } is a placeholder for a shot page URL
shotPageDMCAIncludeLink = Veuillez inclure l’URL vers cette capture dans votre message : { $url }
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

// Note: 'Firefox Screenshots' should not be translated
metricsPageTitle = Statistiques de Firefox Screenshots
metricsPageTotalsQueryTitle = Totaux
// Note: Screenshots is an abbreviation for Firefox Screenshots, and should not be translated.
metricsPageTotalsQueryDescription = Vue d’ensemble de Screenshots
metricsPageTotalsQueryDevices = Total des appareils enregistrés
metricsPageTotalsQueryActiveShots = Captures actives
metricsPageTotalsQueryExpiredShots = Expiré (mais récupérable)
metricsPageTotalsQueryExpiredDeletedShots = Expiré (et supprimé)
metricsPageShotsQueryTitle = Captures par jour
metricsPageShotsQueryDescription = Nombre de captures prises chaque jour (au cours des 30 derniers jours)
metricsPageShotsQueryCount = Nombre de captures
metricsPageShotsQueryDay = Jour
metricsPageUsersQueryTitle = Utilisateurs par jour
metricsPageUsersQueryDescription = Nombre d’utilisateurs ayant pris au moins une capture (au cours des 30 derniers jours)
metricsPageUsersQueryCount = Nombre d’utilisateurs
metricsPageUsersQueryDay = Jour
metricsPageUserShotsQueryTitle = Nombre de captures par utilisateur
metricsPageUserShotsQueryDescription = Nombre d’utilisateurs possédant N captures au total
metricsPageUserShotsQueryCount = Nombre d’utilisateurs
metricsPageUserShotsQueryShots = Nombre approximatif de captures actives (n’ayant pas expiré)
metricsPageRetentionQueryTitle = Conservation par semaines
metricsPageRetentionQueryDescription = Nombre de jours entre la première et la dernière capture d’un utilisateur, groupés selon la semaine de départ
metricsPageRetentionQueryUsers = Nombre d’utilisateurs
metricsPageRetentionQueryDays = Nombre de jours entre la première et la dernière capture d’un utilisateur
metricsPageRetentionQueryFirstWeek = Semaine durant laquelle un utilisateur a effectué une capture pour la première fois
metricsPageTotalRetentionQueryTitle = Conservation totale
metricsPageTotalRetentionQueryDescription = Durées au cours desquelles des utilisateurs ont effectué des captures, groupées par semaine
metricsPageTotalRetentionQueryUsers = Nombre d’utilisateurs
metricsPageTotalRetentionQueryDays = Nombre de jours où l’utilisateur a effectué des captures
metricsPageVersionQueryTitle = Version du module
metricsPageVersionQueryDescription = La version du module au moment de la connexion, au cours des 14 derniers jours
metricsPageVersionQueryUsers = Nombre d’utilisateurs connectés
metricsPageVersionQueryVersion = Version du module
metricsPageVersionQueryLastSeen = Jour
metricsPageHeader = Statistiques
// Note: { $created } is a placeholder for a localized date and time, like '4/21/2017, 3:40:04 AM'
metricsPageGeneratedDateTime = Généré le : { $created }
// Note { $time } is a placeholder for a number of milliseconds, like '100'
metricsPageDatabaseQueryTime = (durée d’utilisation de la base de données : { $time } ms)
