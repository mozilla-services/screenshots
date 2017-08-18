// Localization for Server-side strings of Firefox Screenshots
// 
// Please don't localize Firefox, Firefox Screenshots, or Screenshots



// Global phrases shared across pages, prefixed with 'g'
[[ global ]]

gMyShots = Mis capturas
gHomeLink = Inicio
gNoShots
    .alt = No se encontraron capturas
gScreenshotsDescription = Capturas de pantalla simples. Tomar, guardar y compartir capturas de pantalla sin dejar Firefox.


[[ Footer ]]

// Note: link text for a link to mozilla.org
footerLinkMozilla = Mozilla
footerLinkTerms = Términos
footerLinkPrivacy = Nota de privacidad
footerLinkDMCA = Informar infracción de PI
footerLinkDiscourse = Enviar opinión
footerLinkRemoveAllData = Eliminar todos los datos


[[ Creating page ]]

// Note: { $title } is a placeholder for the title of the web page
// captured in the screenshot. The default, for pages without titles, is
// creatingPageTitleDefault.
creatingPageTitle = Creando { $title }
creatingPageTitleDefault = página
creatingPageWaitMessage = Guardando captura…


[[ Home page ]]

homePageDescription
    .content = Capturas de pantalla intuitivas metidas en el navegador. Capturá, guardá y compartí capturas mientras navegás la web usando Firefox.
homePageButtonMyShots = Ir a mis capturas
homePageTeaser = Próximamente…
homePageDownloadFirefoxTitle = Firefox
homePageDownloadFirefoxSubTitle = Descarga gratuita
homePageGetStarted = Primeros pasos
// Note: do not translate 'Firefox Screenshots' when translating this string
homePageHowScreenshotsWorks = Como funciona Firefox Screenshots
homePageGetStartedTitle = Primeros pasos
// Note: Screenshots is an abbreviation for Firefox Screenshots, and should not be translated.
homePageGetStartedDescription = Buscá el nuevo ícono de Screenshots en la barra de herramientas. Seleccionalo y el menú de Screenshots aparecerá encima de la ventana del navegador.
homePageCaptureRegion = Capturar una región
// Note: Screenshots is an abbreviation for Firefox Screenshots, and should not be translated.
homePageCaptureRegionDescription = Hacé clic y arrastrá para seleccionar el área que querés capturar. O simplemente pasá por encima y hace clic — Screenshots seleccionará el área para vos. ¿Te gusta lo que ves? Seleccioná Guardar para acceder a tu captura en línea o el botón con la flecha hacia abajo para guardarla en tu computadora.
homePageCapturePage = Capturar una página
homePageCapturePageDescription = Usá los botones en la parte superior derecha para capturar la página completa. El botón Guardar Visibe capturará el área que se puede ver sin desplazarse y Guardar Página Completa capturará todo en la página.
homePageSaveShare = Guardar y compartir
// Note: Screenshots is an abbreviation for Firefox Screenshots, and should not be translated.
homePageSaveShareDescription = Al hacer una captura, Firefox la publica en tu biblioteca en línea de Screenshots y copia el enlace en tu portapapeles. Guardamos automáticamente tus capturas por dos semanas, pero las podés borrar en cualquier momento o cambiar la fecha de expiración para mantenerles en la biblioteca por más tiempo.
homePageLegalLink = Legales
homePagePrivacyLink = Privacidad
homePageTermsLink = Términos
homePageCookiesLink = Cookies


[[ Leave Screenshots page ]]

leavePageRemoveAllData = Eliminar todos los datos
// Note: do not translate 'Firefox Screenshots' when translating this string
leavePageErrorAddonRequired = Hay que tener instalado Firefox Screenshots para borrar la cuenta
leavePageErrorGeneric = Ocurrió un error
// Note: do not translate 'Firefox Screenshots' when translating this string
leavePageWarning = Esto borrará de forma permanente todos tus datos de Firefox Screenshots.
leavePageButtonProceed = Continuar
leavePageButtonCancel = Cancelar
leavePageDeleted = ¡Todas tus capturas fueron borradas!


[[ Not Found page ]]

notFoundPageTitle = Página no encontrada
notFoundPageIntro = Epa.
notFoundPageDescription = Página no encontrada.


[[ Shot page ]]

// This is the HTML title tag of the page
shotPageTitle = Captura: { $originalTitle }
shotPageAlertErrorUpdatingExpirationTime = Error guardando expiración
shotPageAlertErrorDeletingShot = Error borrando captura
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
// Note: { $timediff } is a placeholder for a future relative time clause like 'in 3 days' or 'tomorrow'
shotPageExpirationMessage = Si no hacés nada, esta captura será permanentemente eliminada { $timediff }.
// Note: { $date } is a placeholder for a localized future date as returned by Date.toLocaleString.
// For example, in en-US, { $date } could be "7/12/2017, 1:52:50 PM".
shotPageRestoreButton = restaurar hasta { $date }
shotPageExpiredMessage = Esta captura ha expirado.
// Note: This phrase is followed by an empty line, then the URL of the source page
shotPageExpiredMessageDetails = Esta es la página de la que fue originalmente creada:
shotPageDeleteButton
    .title = Borrar esta captura
shotPageAbuseButton
    .title = Informar esta captura por abuso, spam o algún otro problema
shotPageDownloadShot
    .title = Descargar
shotPageDownload = Descargar
shotPageScreenshotsDescription = Capturas de pantalla simples. Tomar, guardar y compartir capturas de pantalla sin dejar Firefox.
shotPageUpsellFirefox = Obtener Firefox ahora
shotPageDMCAMessage = La captura no está más disponible por una queja de terceros por propiedad intelectual.
// Note: { $dmca } is a placeholder for a link to send email (a 'mailto' link)
shotPageDMCAContact = Enviá un correo electrónico a { $dmca } para pedir más información.
// Note: do not translate 'Firefox Screenshots' when translating this string
shotPageDMCAWarning = Si tus capturas reciben múltiples reclamos, podemos revocar tu acceso a Firefox Screenshots.
// Note: { $url } is a placeholder for a shot page URL
shotPageDMCAIncludeLink = Incluí la  URL de esta captura en tu correo electrónico: { $url }
shotPageKeepFor = ¿Cuánto tiempo debería mantenerse esta captura?
// Note: shotPageSelectTime is a placeholder label for the time selection dropdown.
shotPageSelectTime = Seleccionar tiempo
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
// Note: { $timediff } is a placeholder for a future relative time clause, like "in 1 week" or "tomorrow"
shotPageExpiresIn = expira { $timediff }
// Note: { $timediff } is a placeholder for a past relative time clause, like "1 week ago" or "yesterday"
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
timeDiffDaysAgo = { $num ->
        [one] ayer
       *[other] hace { $number } días
    }
timeDiffFutureSeconds = en unos pocos segundos
timeDiffFutureMinutes = { $num ->
        [one] en 1 minuto
       *[other] en { $number } minutos
    }
timeDiffFutureHours = { $num ->
        [one] en 1 hora
       *[other] en { $number } horas
    }
timeDiffFutureDays = { $num ->
        [one] mañana
       *[other] en { $number } días
    }


[[ Shotindex page ]]

// { $status } is a placeholder for an HTTP status code, like '500'.
// { $statusText } is a text description of the status code, like 'Internal server error'.
shotIndexPageErrorDeletingShot = Error borrando captura: { $status } { $statusText }
// { $searchTerm } is a placeholder for text the user typed into the search box
shotIndexPageSearchResultsTitle = Mis capturas: búsqueda de { $searchTerm }
// { $error } is a placeholder for a non-translated error message that could be shared
// with developers when debugging an error.
shotIndexPageErrorRendering = Error dibujando la página: { $error }
shotIndexPageSearchPlaceholder
    .placeholder = Buscar mis capturas
shotIndexPageSearchButton
    .title = Buscar
shotIndexPageNoShotsMessage = No hay capturas guardadas.
shotIndexPageNoShotsInvitation = Vamos, create alguna.
shotIndexPageLookingForShots = Buscando tus capturas…
shotIndexPageNoSearchResultsIntro = Hmm
shotIndexPageNoSearchResults = No podemos encontrar capturas que coincidan con la búsqueda.
shotIndexPageClearSearchButton
    .title = Borrar búsqueda
shotIndexPageConfirmShotDelete = ¿Borrar esta captura?


// all metrics strings are optional for translation
[[ Metrics page ]]

// Note: 'Firefox Screenshots' should not be translated
metricsPageTitle = Métricas de Firefox Screenshots
metricsPageTotalsQueryTitle = Totales
// Note: Screenshots is an abbreviation for Firefox Screenshots, and should not be translated.
metricsPageTotalsQueryDescription = Una visión general de Screenshots
metricsPageTotalsQueryDevices = Dispositivos registrados totales
metricsPageTotalsQueryActiveShots = Capturas activas
metricsPageTotalsQueryExpiredShots = Expirada (pero recuperable)
metricsPageTotalsQueryExpiredDeletedShots = Expirada (y borrada)
metricsPageShotsQueryTitle = Capturas por día
metricsPageShotsQueryDescription = Número de capturas creadas cada día (los últimos 30 días)
metricsPageShotsQueryCount = Número de capturas
metricsPageShotsQueryDay = Día
metricsPageUsersQueryTitle = Usuarios por día
metricsPageUsersQueryDescription = Número de usuarios que crearon al menos una captura, por día (últimos 30 días)
metricsPageUsersQueryCount = Número de usuarios
metricsPageUsersQueryDay = Día
metricsPageUserShotsQueryTitle = Número de capturas por usuario
metricsPageUserShotsQueryDescription = El número de usuarios que tienen cerca de N capturas totales
metricsPageUserShotsQueryCount = Número de usuarios
metricsPageUserShotsQueryShots = Número aproximado de capturas activas (no expiradas)
metricsPageRetentionQueryTitle = Retención por semana
metricsPageRetentionQueryDescription = Número de días desde la primera captura del usuario hasta la más reciente, agrupadas por semana de inicio.
metricsPageRetentionQueryUsers = Número de usuarios
metricsPageRetentionQueryDays = Días desde la primera captura del usuario hasta la más reciente
metricsPageRetentionQueryFirstWeek = Semana en la que el usuario creo la primera captura
metricsPageTotalRetentionQueryTitle = Retención total
metricsPageTotalRetentionQueryDescription = Cantidad de tiempo que los usuarios han estado creando capturas, agrupado por semana.
metricsPageTotalRetentionQueryUsers = Número de usuarios
metricsPageTotalRetentionQueryDays = Días que el usuario ha estado creando capturas
metricsPageVersionQueryTitle = Versión del complemento
metricsPageVersionQueryDescription = La versión del complemento usado durante el ingreso, en los últimos 14 días
metricsPageVersionQueryUsers = Número de usuarios ingresados
metricsPageVersionQueryVersion = Versión del complemento
metricsPageVersionQueryLastSeen = Día
metricsPageHeader = Métricas
// Note: { $created } is a placeholder for a localized date and time, like '4/21/2017, 3:40:04 AM'
metricsPageGeneratedDateTime = Generada el: { $created }
// Note { $time } is a placeholder for a number of milliseconds, like '100'
metricsPageDatabaseQueryTime = (tiempo de la base de datos: { $time }ms)
