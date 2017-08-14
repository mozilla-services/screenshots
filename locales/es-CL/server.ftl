// Localization for Server-side strings of Firefox Screenshots
// 
// Please don't localize Firefox, Firefox Screenshots, or Screenshots



// Global phrases shared across pages, prefixed with 'g'
[[ global ]]

gMyShots = Mis capturas
gHomeLink = Inicio
gNoShots
    .alt = No se econtraron capturas
gScreenshotsDescription = Capturas de pantallas sin complicaciones. Toma, guarda y comparte capturas sin salir de Firefox.


[[ Footer ]]

// Note: link text for a link to mozilla.org
footerLinkMozilla = Mozilla
footerLinkTerms = Términos
footerLinkPrivacy = Aviso de privacidad
footerLinkDMCA = Reportar infracción de PI
footerLinkDiscourse = Enviar comentario
footerLinkRemoveAllData = Remover todos los datos


[[ Creating page ]]

// Note: { $title } is a placeholder for the title of the web page
// captured in the screenshot. The default, for pages without titles, is
// creatingPageTitleDefault.
creatingPageTitle = Creando { $title }
creatingPageTitleDefault = página
creatingPageWaitMessage = Guardando tu captura…


[[ Home page ]]

homePageDescription
    .content = Capturas de pantalla intuitivas integradas en el navegador. Captura, guarda y comparte las capturas mientras navegas por la Web usando Firefox.
homePageButtonMyShots = Ir a mis capturas
homePageTeaser = Próximamente…
homePageDownloadFirefoxTitle = Firefox
homePageDownloadFirefoxSubTitle = Descarga gratuita
homePageGetStarted = Empezar
// Note: do not translate 'Firefox Screenshots' when translating this string
homePageHowScreenshotsWorks = Cómo funciona Firefox Screenshots
homePageGetStartedTitle = Empezar
// Note: Screenshots is an abbreviation for Firefox Screenshots, and should not be translated.
homePageGetStartedDescription = Busca el nuevo ícono de Screenshots en tu barra de herramientas. Apriétalo y el menú de Screenshots aparecerá sobre la ventana del navegador.
homePageCaptureRegion = Captura una región
// Note: Screenshots is an abbreviation for Firefox Screenshots, and should not be translated.
homePageCaptureRegionDescription = Haz clic y arrastra para seleccionar el área que quieres capturar. O solo colocate sobre una parte y haz clic — Screenshots seleccionará el área por ti. ¿Te gusta lo que ves? Selecciona Guardar para acceder a tu captura de pantalla en línea o el botón con forma de flecha apuntando hacia abajo para descargarla a tu computador.
homePageCapturePage = Captura una página
homePageCapturePageDescription = Usa los botones en la parte superior derecha para capturar páginas completas. El botón para guardar lo visible capturará el área que puedes ver sin desplazarte por la página, y el de guardar la página completa capturará incluso lo que se encuentre más arriba o abajo de la pantalla.
homePageSaveShare = Guardar y compartir
// Note: Screenshots is an abbreviation for Firefox Screenshots, and should not be translated.
homePageSaveShareDescription = Cuando tomas una captura, Firefox la publica a tu biblioteca de capturas de pantalla en línea y copia el enlace a tu portapapeles. Automáticamente almacenamos tu captura de pantalla por dos semanas, pero puedes eliminar las capturas en cualquier momento o cambiar la fecha de expiración para mantenerlas en tu biblioteca más tiempo.
homePageLegalLink = Legal
homePagePrivacyLink = Privacidad
homePageTermsLink = Términos
homePageCookiesLink = Cookies


[[ Leave Screenshots page ]]

leavePageRemoveAllData = Eliminar todos los datos
// Note: do not translate 'Firefox Screenshots' when translating this string
leavePageErrorAddonRequired = Debes tener Firefox Screenshots instalado para eliminar tu cuenta
leavePageErrorGeneric = Ocurrió un error
// Note: do not translate 'Firefox Screenshots' when translating this string
leavePageWarning = Esto eliminará permanentemente todos tus datos de Firefox Screenshots
leavePageButtonProceed = Proceder
leavePageButtonCancel = Cancelar
leavePageDeleted = ¡Todas tus capturas fueron eliminadas!


[[ Not Found page ]]

notFoundPageTitle = Página no encontrada
notFoundPageIntro = Chuta.
notFoundPageDescription = Página no encontrada.


[[ Shot page ]]

// This is the HTML title tag of the page
shotPageTitle = Captura: { $originalTitle }
shotPageAlertErrorUpdatingExpirationTime = Error al guardar fecha de expiración
shotPageAlertErrorDeletingShot = Error al eliminar captura
shotPageAlertErrorUpdatingTitle = Error al guardar el título
shotPageConfirmDelete = ¿Estás seguro de que quieres eliminar esta captura permanentemente?
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
shotPagePrivacyMessage = Cualquiera que tenga el enlace puede ver esta captura.
shotPageCopyImageText
    .label = Copiar texto de la imagen
shotPageConfirmDeletion = ¿Estás seguro de que quieres eliminar esta captura de forma permanente?
// Note: { $timediff } is a placeholder for a future relative time clause like 'in 3 days' or 'tomorrow'
shotPageExpirationMessage = Si no haces nada, esta captura se eliminará de forma permanente en { $timediff }.
// Note: { $date } is a placeholder for a localized future date as returned by Date.toLocaleString.
// For example, in en-US, { $date } could be "7/12/2017, 1:52:50 PM".
shotPageRestoreButton = restaurar hasta { $date }
shotPageExpiredMessage = Esta captura ha expirado.
// Note: This phrase is followed by an empty line, then the URL of the source page
shotPageExpiredMessageDetails = Esta es la página de la que fue originalmente creada:
shotPageDeleteButton
    .title = Borrar esta captura
shotPageAbuseButton
    .title = Denunciar esta captura por abuso, spam u otro problema
shotPageDownloadShot
    .title = Descargar
shotPageDownload = Descargar
shotPageScreenshotsDescription = Capturas de pantallas sin complicaciones. Toma, guarda y comparte capturas sin salir de Firefox.
shotPageUpsellFirefox = Obtén Firefox ahora
shotPageDMCAMessage = Esta captura ya no eá disponible debido a un reclamo de propiedad intelectual de un tercero.
// Note: { $dmca } is a placeholder for a link to send email (a 'mailto' link)
shotPageDMCAContact = Por favor, envía un correo a { $dmca } para solicitar más información.
// Note: do not translate 'Firefox Screenshots' when translating this string
shotPageDMCAWarning = Si tus capturas recibiesen muchos reclamos, podríamos revocar tu acceso a Firefox Screenshots.
// Note: { $url } is a placeholder for a shot page URL
shotPageDMCAIncludeLink = Por favor, incluye la URL de esta captura en tu correo: { $url }
shotPageKeepFor = ¿Cuánto tiempo debiera ser guardada esta captura?
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
       *[one] ayer
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
shotIndexPageErrorDeletingShot = Error borrando captura: { $status } { $statusText }
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
shotIndexPageNoShotsInvitation = Vamos, crea alguna.
shotIndexPageLookingForShots = Buscando por tus capturas...
shotIndexPageNoSearchResultsIntro = Hmm
shotIndexPageNoSearchResults = No pudimos encontrar capturas que coincidan con tu búsqueda.
shotIndexPageClearSearchButton
    .title = Limpiar búsqueda
shotIndexPageConfirmShotDelete = ¿Eliminar esta captura?


// all metrics strings are optional for translation
[[ Metrics page ]]

// Note: 'Firefox Screenshots' should not be translated
metricsPageTitle = Métricas de Firefox Screenshots
metricsPageTotalsQueryTitle = Totales
// Note: Screenshots is an abbreviation for Firefox Screenshots, and should not be translated.
metricsPageTotalsQueryDescription = Una vista general de Screenshots
metricsPageTotalsQueryDevices = Total de dispositivos registrados
metricsPageTotalsQueryActiveShots = Capturas activas
metricsPageTotalsQueryExpiredShots = Expirada (pero recuperable)
metricsPageTotalsQueryExpiredDeletedShots = Expirada (y eliminada)
metricsPageShotsQueryTitle = Capturas por día
metricsPageShotsQueryDescription = Número de capturas creadas cada día (para los últimos 30 días)
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
metricsPageRetentionQueryFirstWeek = Semana en la que el usuario creó la primera captura
metricsPageTotalRetentionQueryTitle = Retención total
metricsPageTotalRetentionQueryDescription = Periodo de tiempo en que los usuarios han estado creando capturas, agrupado por semana
metricsPageTotalRetentionQueryUsers = Número de usuarios
metricsPageTotalRetentionQueryDays = Días en que el usuario ha estado creando capturas
metricsPageVersionQueryTitle = Versión del complemento
metricsPageVersionQueryDescription = La versión del complemento usada durante el ingreso, en los últimos 14 días
metricsPageVersionQueryUsers = Número de usuarios conectados
metricsPageVersionQueryVersion = Versión del complemento
metricsPageVersionQueryLastSeen = Día
metricsPageHeader = Métricas
// Note: { $created } is a placeholder for a localized date and time, like '4/21/2017, 3:40:04 AM'
metricsPageGeneratedDateTime = Generada el: { $created }
// Note { $time } is a placeholder for a number of milliseconds, like '100'
metricsPageDatabaseQueryTime = (tiempo de la base de datos: { $time }ms)
