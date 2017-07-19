// Global phrases shared across pages, prefixed with 'g'
gMyShots = Mis capturas
gHomeLink = Inicio
gNoShots
    .alt = No se econtraron capturas
gScreenshotsDescription = Capturas de pantalla simples. Tomar, guardar y compartir capturas de pantalla sin dejar Firefox.
// Creating page// Note: {$title} is a placeholder for the title of the web page
// captured in the screenshot. The default, for pages without titles, is
// creatingPageTitleDefault.
creatingPageTitle = Creando { $title }
creatingPageTitleDefault = página
// Home pagehomePageTeaser = Próximamente…
homePageDownloadFirefoxTitle = Firefox
homePageDownloadFirefoxSubTitle = Descarga gratuita
homePageGetStarted = Primeros pasos
homePageGetStartedTitle = Primeros pasos
homePageCaptureRegion = Capturar una región
homePageCapturePage = Capturar una página
homePageSaveShare = Guardar y compartir
homePageLegalLink = Legales
homePagePrivacyLink = Privacidad
homePageTermsLink = Términos
homePageCookiesLink = Cookies
// Leave Screenshots pageleavePageErrorGeneric = Ocurrió un error
leavePageButtonProceed = Continuar
leavePageButtonCancel = Cancelar
// Not Found pagenotFoundPageIntro = Epa.
notFoundPageDescription = Página no encontrada.
// Shot pageshotPageAlertErrorDeletingShot = Error borrando captura
shotPageAlertErrorUpdatingTitle = Error guardando título
shotPageConfirmDelete = ¿Está seguro de querer borrar esta captura permanentemente?
shotPageShareButton
    .title = Compartir
shotPageCopy = Copiar
shotPageCopied = Copiada
shotPageShareFacebook
    .title = Compartir en Facebook
shotPageShareTwitter
    .title = Compartir en Twitter
shotPageSharePinterest
    .title = Compartir en Pinterest
shotPageShareEmail
    .title = Compartir enlace por correo electrónico
shotPageShareLink = Obtener un enlace compartible para esta captura:
shotPagePrivacyMessage = Cualquiera con el enlace puede ver esta captura.
shotPageCopyImageText
    .label = Copiar texto de imagen
shotPageConfirmDeletion = ¿Está seguro de querer borrar esta captura permanentemente?
shotPageExpiredMessage = Esta captura ha expirado.
shotPageDeleteButton
    .title = Borrar esta captura
shotPageDownloadShot
    .title = Descargar
shotPageDownload = Descargar
shotPageKeepIndefinitely = Indefinidamente
shotPageKeepTenMinutes = 10 minutos
shotPageKeepOneHour = 1 hora
shotPageKeepOneDay = 1 día
shotPageKeepOneWeek = 1 semana
shotPageKeepTwoWeeks = 2 semanas
shotPageKeepOneMonth = 1 mes
shotPageSaveExpiration = guardar
shotPageCancelExpiration = cancelar
shotPageDoesNotExpire = no expira
// Note: {$timediff} is a placeholder for a future relative time clause, like "in 1 week" or "tomorrow"
shotPageExpiresIn = expira { $timediff }
// Note: {$timediff} is a placeholder for a past relative time clause, like "1 week ago" or "yesterday"
shotPageExpired = expirada { $timediff }
timeDiffJustNow = ahora mismo
timeDiffMinutesAgo = { $num ->
        [one] hace un minuto
       *[other] hace { $number } minutos
    }
timeDiffHoursAgo = { $num ->
        [one] hace una hora
       *[other] hace { $number } horas
    }
// Shotindex page// Metrics page
// Note: all metrics strings are optional for translation