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
footerLinkPrivacy = Aviso de privacidad
footerLinkDMCA = Reportar infracción de IP
footerLinkDiscourse = Enviar comentario
footerLinkRemoveAllData = Eliminar todos los datos


[[ Creating page ]]

// Note: { $title } is a placeholder for the title of the web page
// captured in the screenshot. The default, for pages without titles, is
// creatingPageTitleDefault.
creatingPageTitle = Creando { $title }
creatingPageTitleDefault = página
creatingPageWaitMessage = Guardando tu captura...


[[ Home page ]]

homePageDescription
    .content = Capturas de pantalla intuitivas hechas en el navegador. Capturas, guarda y comparte capturas de pantalla mientras navegas la Web, usando Firefox.
homePageButtonMyShots = Ir a mis capturas
homePageTeaser = Próximamente...
homePageDownloadFirefoxTitle = Firefox
homePageDownloadFirefoxSubTitle = Descargar gratis
homePageGetStarted = Comenzar
// Note: do not translate 'Firefox Screenshots' when translating this string
homePageHowScreenshotsWorks = Cómo trabaja Firefox Screenshots
homePageGetStartedTitle = Comenzar
// Note: Screenshots is an abbreviation for Firefox Screenshots, and should not be translated.
homePageGetStartedDescription = Encuentra el nuevo ícono de Screenshots en tu barra de herramientas. Selecciónalo y el menú de Screenshots aparecerá en la parte superior de tu ventana de navegación.
homePageCaptureRegion = Captura una región
// Note: Screenshots is an abbreviation for Firefox Screenshots, and should not be translated.
homePageCaptureRegionDescription = Haz clic y arrastra para seleccionar el área que quieras capturar. O pasa el mouse por encima y haz clic - Screenshots lo hará por ti. ¿Te gusta? Selecciona Guardar para acceder a tus capturas en línea o pulsa la tecla de la flecha hacia abajo para descargarlo en tu equipo.
homePageCapturePage = Captura una página
homePageCapturePageDescription = Utiliza los botones de la parte superior derecha para capturar páginas completas. El botón Guardar área visible capturará lo que puedes ver sin deslizarte; Guardar página completa guardará todo lo que aparece en la página.
homePageSaveShare = Guardar y compartir
// Note: Screenshots is an abbreviation for Firefox Screenshots, and should not be translated.
homePageSaveShareDescription = Cuando hagas una captura, Firefox la publica en tu historial en línea y copia el enlace en el portapapeles. Se guardarán automáticamente durante dos semanas, pero puedes eliminarlas cuando quieras o cambiar la fecha de expiración para guardarlas durante más tiempo.
homePageLegalLink = Legal
homePagePrivacyLink = Privacidad
homePageTermsLink = Términos
homePageCookiesLink = Cookies


[[ Leave Screenshots page ]]

leavePageRemoveAllData = Eliminar todos los datos
// Note: do not translate 'Firefox Screenshots' when translating this string
leavePageErrorAddonRequired = Debes tener Firefox Screenshots instalado para eliminar tu cuenta
leavePageErrorGeneric = Ha ocurrido un error
// Note: do not translate 'Firefox Screenshots' when translating this string
leavePageWarning = Esto eliminará permanentemente toda tu información de Firefox Screenshots
leavePageButtonProceed = Continuar
leavePageButtonCancel = Cancelar
leavePageDeleted = ¡Todas tus capturas de pantalla han sido eliminadas!


[[ Not Found page ]]

notFoundPageTitle = No se encontró la página
notFoundPageIntro = Ups.
notFoundPageDescription = No se encontró la página.


[[ Shot page ]]

// This is the HTML title tag of the page
shotPageTitle = Captura de pantalla: { $originalTitle }
shotPageAlertErrorUpdatingExpirationTime = Error al guardar fecha de expiración
shotPageAlertErrorDeletingShot = Error al eliminar captura
shotPageAlertErrorUpdatingTitle = Error al guardar el título
shotPageConfirmDelete = ¿Estás seguro que quieres eliminarla de forma permanente?
shotPageShareButton
    .title = Compartir
shotPageCopy = Copiar
shotPageCopied = Copiado
shotPageShareFacebook
    .title = Compartir en Facebook
shotPageShareTwitter
    .title = Compartir en Twitter
shotPageSharePinterest
    .title = Compartir en Pinterest
shotPageShareEmail
    .title = Compartir enlace vía correo electrónico
shotPageShareLink = Obtener enlace para compartir esta captura:
shotPagePrivacyMessage = Cualquier con el enlace puede ver esta captura
shotPageCopyImageText
    .label = Copiar texto de la imagen
shotPageConfirmDeletion = ¿Estás seguro que deseas eliminar esta captura de forma permanente?
// Note: { $timediff } is a placeholder for a future relative time clause like 'in 3 days' or 'tomorrow'
shotPageExpirationMessage = Si no haces nada, la captura se eliminará de forma permanente en { $timediff }.
// Note: { $date } is a placeholder for a localized future date as returned by Date.toLocaleString.
// For example, in en-US, { $date } could be "7/12/2017, 1:52:50 PM".
shotPageRestoreButton = restaurar hasta { $date }
shotPageExpiredMessage = Esta captura ha expirado.
// Note: This phrase is followed by an empty line, then the URL of the source page
shotPageExpiredMessageDetails = Esta es la página dónde fue originalmente creada:
shotPageDeleteButton
    .title = Eliminar esta captura
shotPageAbuseButton
    .title = Reportar esta captura por abuso, spam o cualquier otro problema
shotPageDownloadShot
    .title = Descargar
shotPageDownload = Descargar
shotPageScreenshotsDescription = Capturas de pantalla hechas simples. Toma, guarda y comparte capturas de pantalla sin dejar Firefox.
shotPageUpsellFirefox = Obtener Firefox ahora
shotPageDMCAMessage = Esta captura ya no está disponible debido a un reclamo de derechos de autor.
// Note: { $dmca } is a placeholder for a link to send email (a 'mailto' link)
shotPageDMCAContact = Envía un correo a { $dmca } para solicitar más información.
// Note: do not translate 'Firefox Screenshots' when translating this string
shotPageDMCAWarning = Si tus capturas fueran objeto de múltiples reclamos, podemos revocarte el acceso a Firefox Screenshots.
// Note: { $url } is a placeholder for a shot page URL
shotPageDMCAIncludeLink = Por favor, incluye la URL de esta captura en tu correo electrónico: { $url }
shotPageKeepFor = ¿Qué tanto esta captura debe ser mantenida?
// Note: shotPageSelectTime is a placeholder label for the time selection dropdown.
shotPageSelectTime = Selecciona tiempo
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
shotPageExpiresIn = expira en { $timediff }
// Note: { $timediff } is a placeholder for a past relative time clause, like "1 week ago" or "yesterday"
shotPageExpired = expiró hace { $timediff }
timeDiffJustNow = justo ahora
timeDiffMinutesAgo = { $num ->
        [one] hace 1 minuto
       *[other] hace { $number } minutos
    }
timeDiffHoursAgo = { $num ->
        [one] hace 1 hora
       *[other] hace { $number } horas
    }
timeDiffDaysAgo = { $num ->
        [one] ayer
       *[other] hace { $number } días
    }
timeDiffFutureSeconds = en unos segundos
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
shotIndexPageErrorDeletingShot = Error eliminando captura: { $status } { $statusText }
// { $searchTerm } is a placeholder for text the user typed into the search box
shotIndexPageSearchResultsTitle = Mis capturas: buscar por { $searchTerm }
// { $error } is a placeholder for a non-translated error message that could be shared
// with developers when debugging an error.
shotIndexPageErrorRendering = Error al renderizar la página: { $error }
shotIndexPageSearchPlaceholder
    .placeholder = Buscar mis capturas
shotIndexPageSearchButton
    .title = Buscar
shotIndexPageNoShotsMessage = No hay capturas guardadas.
shotIndexPageNoShotsInvitation = Adelante, crea una.
shotIndexPageLookingForShots = Buscando tus capturas...
shotIndexPageNoSearchResultsIntro = Hmm
shotIndexPageNoSearchResults = No pudimos encontrar ninguna captura que coincida con tu búsqueda.
shotIndexPageClearSearchButton
    .title = Limpiar búsqueda
shotIndexPageConfirmShotDelete = ¿Eliminar esta captura?


// all metrics strings are optional for translation
[[ Metrics page ]]

// Note: 'Firefox Screenshots' should not be translated
metricsPageTitle = Métricas de Firefox Screenshots
metricsPageTotalsQueryTitle = Totales
// Note: Screenshots is an abbreviation for Firefox Screenshots, and should not be translated.
metricsPageTotalsQueryDescription = Vista global de Screenshots
metricsPageTotalsQueryDevices = Total de dispositivos registrados
metricsPageTotalsQueryActiveShots = Capturas activas
metricsPageTotalsQueryExpiredShots = Expirada (pero recuperable)
metricsPageTotalsQueryExpiredDeletedShots = Expirada (y eliminada)
metricsPageShotsQueryTitle = Capturas por día
metricsPageShotsQueryDescription = Número de capturas creadas cada día (por los últimos 30 días)
metricsPageShotsQueryCount = Número de capturas
metricsPageShotsQueryDay = Día
metricsPageUsersQueryTitle = Usuarios por día
metricsPageUsersQueryDescription = Número de usuarios quienes crearon al menos una captura por día (en los últimos 30 días)
metricsPageUsersQueryCount = Número de usuarios
metricsPageUsersQueryDay = Día
metricsPageUserShotsQueryTitle = Número de capturas por usuario
metricsPageUserShotsQueryDescription = El número de usuarios quienes tienen cerca de N cantidad de capturas
metricsPageUserShotsQueryCount = Número de usuarios
metricsPageUserShotsQueryShots = Número aproximado de capturas activas (no expiradas)
metricsPageRetentionQueryTitle = Retención por semana
metricsPageRetentionQueryDescription = Número de días entre la primera y última captura de un usuario
metricsPageRetentionQueryUsers = Número de usuarios
metricsPageRetentionQueryDays = Días transcurridos entre la primera y la última captura del usuario
metricsPageRetentionQueryFirstWeek = Semana en la que el usuario creó la primera captura
metricsPageTotalRetentionQueryTitle = Retención total
metricsPageTotalRetentionQueryDescription = Periodo de tiempo en que los usuarios han estado creando capturas, agrupado por semana
metricsPageTotalRetentionQueryUsers = Número de usuarios
metricsPageTotalRetentionQueryDays = Días desde que el usuario ha estado creando capturas
metricsPageVersionQueryTitle = Versión del complemento
metricsPageVersionQueryDescription = La versión del complemento usado durante el inicio de sesión, en los últimos 14 días
metricsPageVersionQueryUsers = Número de usuarios iniciando sesión
metricsPageVersionQueryVersion = Versión del complemento
metricsPageVersionQueryLastSeen = Día
metricsPageHeader = Métricas
// Note: { $created } is a placeholder for a localized date and time, like '4/21/2017, 3:40:04 AM'
metricsPageGeneratedDateTime = Generada el: { $created }
// Note { $time } is a placeholder for a number of milliseconds, like '100'
metricsPageDatabaseQueryTime = (tiempo en la base de datos: { $time }ms)
