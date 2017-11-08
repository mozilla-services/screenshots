// Localization for Server-side strings of Firefox Screenshots
// 
// Please don't localize Firefox, Firefox Screenshots, or Screenshots



// Global phrases shared across pages, prefixed with 'g'
[[ global ]]

gMyShots = Mi instantaneos
gHomeLink = Initio
gNoShots
    .alt = Nulle instantaneos trovate
gScreenshotsDescription = Le instantaneos a un maniera simple. Captura, salva e comparti le instantaneos de tu schermo sin exir de Firefox.


[[ Footer ]]

// Note: link text for a link to mozilla.org
footerLinkMozilla = Mozilla
footerLinkTerms = Terminos
footerLinkPrivacy = Advertentia de confidentialitate
footerLinkFaqs = Questiones frequente
footerLinkDMCA = Denunciar un violation de proprietate intellectual
footerLinkDiscourse = Da tu opinion
footerLinkRemoveAllData = Remover tote le datos


[[ Creating page ]]

// Note: { $title } is a placeholder for the title of the web page
// captured in the screenshot. The default, for pages without titles, is
// creatingPageTitleDefault.
creatingPageTitle = Creante { $title }
creatingPageTitleDefault = pagina
creatingPageWaitMessage = Salvante le instantaneo…


[[ Home page ]]

homePageDescription
    .content = Instantaneos intuitive es prendite intra tu navigator. Captura, salva e comparti le instantaneos de tu schermo durante que tu naviga le web usante Firefox.
homePageButtonMyShots = Ir a mi instantaneos
homePageTeaser = Veniente tosto…
homePageDownloadFirefoxTitle = Firefox
homePageDownloadFirefoxSubTitle = Discargamento gratuito
homePageGetStarted = Comenciar
// Note: do not translate 'Firefox Screenshots' when translating this string
homePageHowScreenshotsWorks = Como Firefox Screenshots functiona
homePageGetStartedTitle = Comenciar
// Note: Screenshots is an abbreviation for Firefox Screenshots, and should not be translated.
homePageGetStartedDescription = Trova le nove instantaneos sur tu barra de instrumentos. Elige lo, e le menu del instantaneos apparera al culmine de tu fenestra del navigator. 
// Note: Screenshots is an abbreviation for Firefox Screenshots, and should not be translated.
homePageGetStartedDescriptionPageAction = Elige le icone de instantaneos ex le menu de actiones de pagina in le barra de adresses e le menu del instantaneos apparera al culmine de tu fenestra del navigator. 
homePageCaptureRegion = Capturar un area de schermo
homePageCapturePage = Capturar un pagina
homePageSaveShare = Salvar e compartir
homePageLegalLink = Notas legal
homePagePrivacyLink = Confidentialitate
homePageTermsLink = Terminos
homePageCookiesLink = Cookies


[[ Leave Screenshots page ]]

leavePageRemoveAllData = Remover tote le datos
leavePageErrorGeneric = Un error occurreva
leavePageButtonProceed = Proceder
leavePageButtonCancel = 
leavePageDeleted = Tote tu instantaneos de schermo cancellate!


[[ Not Found page ]]

notFoundPageTitle = Pagina non trovate
notFoundPageIntro = Oops.
notFoundPageDescription = Pagina non trovate.


[[ Shot page ]]

// This is the HTML title tag of the page
shotPageTitle = Instantaneo de schermo: { $originalTitle }
shotPageAlertErrorDeletingShot = Error a deler le instantaneo
shotPageAlertErrorUpdatingTitle = Error a salvar le titulo
shotPageConfirmDelete = Desira tu vermente deler permanentemente iste instantaneo?
shotPageShareButton
    .title = Compartir
shotPageCopy = Copiar
shotPageCopied = Copiate
shotPageShareFacebook
    .title = Compartir in Facebook
shotPageShareTwitter
    .title = Compartir in Twitter
shotPageSharePinterest
    .title = Compartir sur Pinterest
shotPageShareEmail
    .title = Comparti un ligamine via e-posta
shotPageShareLink = Obtene un ligamine compartibile a iste instantaneo:
shotPagePrivacyMessage = Totes pote vider iste instantaneo per iste ligamine.
shotPageCopyImageText
    .label = Copiar le texto del imagine
shotPageConfirmDeletion = Desira tu vermente deler iste captura permanentemente?
// Note: { $date } is a placeholder for a localized future date as returned by Date.toLocaleString.
// For example, in en-US, { $date } could be "7/12/2017, 1:52:50 PM".
shotPageRestoreButton = restabilir usque { $date }
shotPageExpiredMessage = Iste instantaneo expirava
// Note: This phrase is followed by an empty line, then the URL of the source page
shotPageExpiredMessageDetails = Ecce le pagina ex le qual illo esseva originalmente create:
shotPageDeleteButton
    .title = Dele iste instantaneo
shotPageAbuseButton
    .title = Reporta iste instantaneo pro abuso, spam, o altere problemas
shotPageDownloadShot
    .title = Discargar
shotPageDownload = Discargar
shotPageScreenshotsDescription = Le instantaneos de schermo a un maniera simple. Captura, salva e comparti le instantaneos de tu schermo sin exir de Firefox.
shotPageUpsellFirefox = Discarga subito Firefox
shotPageDMCAMessage = Iste instantaneo non es plus disponibile per un reclamation de proprietate intellectual de tertie parte.
// Note: shotPageSelectTime is a placeholder label for the time selection dropdown.
shotPageSelectTime = Eliger le tempore
shotPageKeepIndefinitely = Per sempre
shotPageKeepTenMinutes = 10 minutas
shotPageKeepOneHour = 1 hora
shotPageKeepOneDay = 1 die
shotPageKeepOneWeek = 1 septimana
shotPageKeepTwoWeeks = 2 septimanas
shotPageKeepOneMonth = 1 mense
shotPageSaveExpiration = Salvar
shotPageCancelExpiration = Cancellar
shotPageDoesNotExpire = non expira
// Note: { $timediff } is a placeholder for a future relative time clause, like "in 1 week" or "tomorrow"
shotPageExpiresIn = expira a { $timediff }
// Note: { $timediff } is a placeholder for a past relative time clause, like "1 week ago" or "yesterday"
shotPageExpired = expirate de { $timediff }
timeDiffJustNow = justo ora
timeDiffMinutesAgo = { $num ->
        [one] 1 minuta retro
       *[other] { $number } minutas retro
    }
timeDiffHoursAgo = { $num ->
        [one] 1 hora retro
       *[other] { $number } horas retro
    }
timeDiffDaysAgo = { $num ->
        [one] heri
       *[other] { $number } dies retro
    }
timeDiffFutureSeconds = in poc secundas
timeDiffFutureMinutes = { $num ->
        [one] in 1 minuta
       *[other] in { $number } minutas
    }
timeDiffFutureHours = { $num ->
        [one] in 1 hora
       *[other] in { $number } horas
    }
timeDiffFutureDays = { $num ->
        [one] deman
       *[other] in { $number } dies
    }


[[ Shotindex page ]]

// { $status } is a placeholder for an HTTP status code, like '500'.
// { $statusText } is a text description of the status code, like 'Internal server error'.
shotIndexPageErrorDeletingShot = Error delente le instantaneo: { $status } { $statusText }
// { $error } is a placeholder for a non-translated error message that could be shared
// with developers when debugging an error.
shotIndexPageErrorRendering = Error a generar un pagina: { $error }
shotIndexPageSearchPlaceholder
    .placeholder = Recercar mi instantaneos
shotIndexPageSearchButton
    .title = Recercar
shotIndexPageNoShotsMessage = Instantaneos non salvate
shotIndexPageNoShotsInvitation = Va, crea los.
shotIndexPageLookingForShots = Recerca de tu instantaneos...
shotIndexPageNoSearchResultsIntro = Hum…
shotIndexPageClearSearchButton
    .title = Clarar le recerca
shotIndexPageConfirmShotDelete = Deler iste instantaneo?
shotIndexPagePreviousPage
    .title = Pagina previe
shotIndexPageNextPage
    .title = Pagina sequente


// all metrics strings are optional for translation
[[ Metrics page ]]

// Note: 'Firefox Screenshots' should not be translated
metricsPageTitle = Metrica del instantaneos de schermo de Firefox
metricsPageTotalsQueryTitle = Totales
// Note: Screenshots is an abbreviation for Firefox Screenshots, and should not be translated.
metricsPageTotalsQueryDescription = Un panoramica de Screenshots
metricsPageTotalsQueryDevices = Total de apparatos registrate
metricsPageTotalsQueryActiveShots = Instantaneos active
metricsPageTotalsQueryExpiredShots = Expirate (ma recovrabile)
metricsPageTotalsQueryExpiredDeletedShots = Expirate (e delite)
metricsPageShotsQueryTitle = Instantaneos per die
metricsPageShotsQueryCount = Numero de instantaneos
metricsPageShotsQueryDay = Die
metricsPageUsersQueryTitle = Usatores pro die
metricsPageUsersQueryCount = Numero de usatores
metricsPageUsersQueryDay = Die
metricsPageUserShotsQueryTitle = Numero de instantaneos per usator
metricsPageUserShotsQueryCount = Numero de usatores
metricsPageRetentionQueryUsers = Numero de usatores
metricsPageTotalRetentionQueryTitle = Retention total
metricsPageTotalRetentionQueryUsers = Numero de usatores
metricsPageVersionQueryTitle = Version del additivo
metricsPageVersionQueryUsers = Numero de usatores connexe
metricsPageVersionQueryVersion = Version del additivo
metricsPageVersionQueryLastSeen = Die
metricsPageHeader = Metrica
// Note: { $created } is a placeholder for a localized date and time, like '4/21/2017, 3:40:04 AM'
metricsPageGeneratedDateTime = Create le: { $created }
// Note { $time } is a placeholder for a number of milliseconds, like '100'
metricsPageDatabaseQueryTime = (tempore del base de datos: { $time }ms)
