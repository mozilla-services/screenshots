### Localization for Server-side strings of Firefox Screenshots
### Please don't localize Firefox, Firefox Screenshots, or Screenshots


## Global phrases shared across pages, prefixed with 'g'

gMyShots = Mis capturas
gHomeLink = Inicio
gNoShots =
    .alt = No se econtraron capturas
gScreenshotsDescription = Capturas de pantallas sin complicaciones. Toma, guarda y comparte capturas sin salir de Firefox.
gSettings = Ajustes
gSignIn = Conectarse

## Header

buttonSettings =
    .title = Ajustes
buttonSignIn =
    .title = Conectarse
screenshotsLogo =
    .title = Inicio de Screenshots
bannerMessage = Conéctate o registrate para acceder a tus capturas en todos tus dispositivos y guardar tus favoritas para siempre.
bannerUpsell = { gScreenshotsDescription } <a>Obtener Firefox ahora</a>

## Footer

# Note: link text for a link to mozilla.org
footerLinkMozilla = Mozilla
footerLinkTerms = Términos
footerLinkPrivacy = Aviso de privacidad
footerReportShot = Reportar captura
    .title = Reportar esta captura por abuso, spam u otro problema
footerLinkFaqs = Preguntas frecuentes
footerLinkDMCA = Reportar infracción de PI
footerLinkDiscourse = Enviar comentario
footerLinkRemoveAllData = Eliminar todos los datos

## Creating page

# Note: { $title } is a placeholder for the title of the web page
# captured in the screenshot. The default, for pages without titles, is
# creatingPageTitleDefault.
creatingPageTitle = Creando { $title }
creatingPageTitleDefault = página
creatingPageWaitMessage = Guardando tu captura…

## Home page

homePageDescription =
    .content = Capturas de pantalla intuitivas integradas en el navegador. Captura, guarda y comparte las capturas mientras navegas por la Web usando Firefox.
homePageButtonMyShots = Ir a mis capturas
homePageTeaser = Próximamente…
homePageDownloadFirefoxTitle = Firefox
homePageDownloadFirefoxSubTitle = Descarga gratuita
# Note: do not translate 'Firefox Screenshots' when translating this string
homePageHowScreenshotsWorks = Cómo funciona Firefox Screenshots
homePageGetStartedTitle = Empezar
# Note: Screenshots is an abbreviation for Firefox Screenshots, and should not be translated.
homePageGetStartedDescription = Busca el nuevo ícono de Screenshots en tu barra de herramientas. Apriétalo y el menú de Screenshots aparecerá sobre la ventana del navegador.
# Note: Screenshots is an abbreviation for Firefox Screenshots, and should not be translated.
homePageGetStartedDescriptionPageAction = Selecciona el ícono de Screenshots en el menú de acciones de página en la barra de direcciones, y el menú de Screenshots aparecerá sobre tu ventana del navegador.
homePageCaptureRegion = Captura una región
# Note: Screenshots is an abbreviation for Firefox Screenshots, and should not be translated.
homePageCaptureRegionDescription = Haz clic y arrastra para seleccionar el área que quieres capturar. O solo colocate sobre una parte y haz clic — Screenshots seleccionará el área por ti. ¿Te gusta lo que ves? Selecciona Guardar para acceder a tu captura de pantalla en línea o el botón con forma de flecha apuntando hacia abajo para descargarla a tu computador.
homePageCapturePage = Captura una página
homePageCapturePageDescription = Usa los botones en la parte superior derecha para capturar páginas completas. El botón para guardar lo visible capturará el área que puedes ver sin desplazarte por la página, y el de guardar la página completa capturará incluso lo que se encuentre más arriba o abajo de la pantalla.
homePageSaveShare = Guardar y compartir
# Note: Screenshots is an abbreviation for Firefox Screenshots, and should not be translated.
homePageSaveShareDescription = Cuando tomas una captura, Firefox la publica a tu biblioteca de capturas de pantalla en línea y copia el enlace a tu portapapeles. Automáticamente almacenamos tu captura de pantalla por dos semanas, pero puedes eliminar las capturas en cualquier momento o cambiar la fecha de expiración para mantenerlas en tu biblioteca más tiempo.
homePageLegalLink = Legal
homePagePrivacyLink = Privacidad
homePageTermsLink = Términos
homePageCookiesLink = Cookies

## Leave Screenshots page

leavePageRemoveAllData = Eliminar todos los datos
# Note: do not translate 'Firefox Screenshots' when translating this string
leavePageErrorAddonRequired = Debes tener Firefox Screenshots instalado para eliminar tu cuenta
leavePageErrorGeneric = Ocurrió un error
# Note: do not translate 'Firefox Screenshots' when translating this string
leavePageWarning = Esto eliminará permanentemente todos tus datos de Firefox Screenshots
leavePageButtonProceed = Proceder
leavePageButtonCancel = Cancelar
leavePageDeleted = ¡Todas tus capturas fueron eliminadas!

## Not Found page

notFoundPageTitle = Página no encontrada
notFoundPageIntro = Chuta.
notFoundPageDescription = Página no encontrada.

## Shot page

# This is the HTML title tag of the page
shotPageTitle = Captura: { $originalTitle }
shotPageAlertErrorUpdatingExpirationTime = Error al guardar fecha de expiración
shotPageAlertErrorDeletingShot = Error al eliminar captura
shotPageAlertErrorUpdatingTitle = Error al guardar el título
shotPageConfirmDelete = ¿Estás seguro de que quieres eliminar esta captura permanentemente?
shotPageShareButton =
    .title = Compartir
shotPageCopy = Copiar
shotPageCopyButton =
    .title = Copiar imagen al portapapeles
shotPageCopied = Copiada
shotPageShareFacebook =
    .title = Compartir en Facebook
shotPageShareTwitter =
    .title = Compartir en Twitter
shotPageSharePinterest =
    .title = Compartir en Pinterest
shotPageShareEmail =
    .title = Compartir enlace por correo electrónico
shotPageShareLink = Obtener un enlace compartible para esta captura:
shotPagePrivacyMessage = Cualquiera que tenga el enlace puede ver esta captura.
shotPageCopyImageText =
    .label = Copiar texto de la imagen
shotPageConfirmDeletion = ¿Estás seguro de que quieres eliminar esta captura de forma permanente?
# Note: <timediff></timediff> is a placeholder for a future relative time clause like 'in 3 days' or 'tomorrow'
shotPageTimeExpirationMessage = Si no haces nada, esta captura se eliminará de forma permanente en <timediff></timediff>.
# Note: { $date } is a placeholder for a localized future date as returned by Date.toLocaleString.
# For example, in en-US, { $date } could be "7/12/2017, 1:52:50 PM".
shotPageRestoreButton = restaurar hasta { $date }
shotPageExpiredMessage = Esta captura ha expirado.
# Note: This phrase is followed by an empty line, then the URL of the source page
shotPageExpiredMessageDetails = Esta es la página de la que fue originalmente creada:
shotPageDeleteButton =
    .title = Borrar esta captura
shotPageDownloadShot =
    .title = Descargar
shotPageEditButton =
    .title = Editar esta imagen
shotPagefavoriteButton =
    .title = Marcar esta captura como favorita
shotPageBackToHomeButton =
    .title = Página de inicio
shotPageAllShotsButton =
    .title = Todas las capturas
shotPageAllShots = Todas las capturas
shotPageDownload = Descargar
# Note: Draw text is used on shot page as a verb (action)
shotPageDraw = Dibujar
# Note: Favorite text is used on shot page as a verb (action)
shotPageFavorite = Favorito
shotPageDelete = Eliminar
shotPageScreenshotsDescription = Capturas de pantallas sin complicaciones. Toma, guarda y comparte capturas sin salir de Firefox.
shotPageDMCAMessage = Esta captura ya no eá disponible debido a un reclamo de propiedad intelectual de un tercero.
# Note: { $dmca } is a placeholder for a link to send email (a 'mailto' link)
shotPageDMCAContact = Por favor, envía un correo a { $dmca } para solicitar más información.
# Note: do not translate 'Firefox Screenshots' when translating this string
shotPageDMCAWarning = Si tus capturas recibiesen muchos reclamos, podríamos revocar tu acceso a Firefox Screenshots.
# Note: { $url } is a placeholder for a shot page URL
shotPageDMCAIncludeLink = Por favor, incluye la URL de esta captura en tu correo: { $url }
shotPageKeepFor = ¿Cuánto tiempo debiera ser guardada esta captura?
# Note: shotPageSelectTime is a placeholder label for the time selection dropdown.
shotPageSelectTime = Seleccionar tiempo
# The ∞ is used to indicate that the shot won't expire. It is also used in
# shotIndexNoExpirationSymbol. Try to use the same symbol in both strings, or
# if no such symbol is available for a language/culture, simply leave it out.
shotPageKeepIndefinitelyWithSymbol = Indefinidamente ∞
shotPageKeepTenMinutes = 10 minutos
shotPageKeepOneHour = 1 hora
shotPageKeepOneDay = 1 día
shotPageKeepOneWeek = 1 semana
shotPageKeepTwoWeeks = 2 semanas
shotPageKeepOneMonth = 1 mes
shotPageSaveExpiration = guardar
shotPageCancelExpiration = cancelar
shotPageDoesNotExpire = no expira
# Note: <timediff></timediff> is a placeholder for a future relative time clause, like "in 1 week" or "tomorrow"
shotPageTimeExpiresIn = expira en <timediff></timediff>
# Note: <timediff></timediff> is a placeholder for a past relative time clause, like "1 week ago" or "yesterday"
shotPageTimeExpired = expiró hace <timediff></timediff>
timeDiffJustNow = justo ahora
timeDiffMinutesAgo =
    { $number ->
        [one] hace 1 minuto
       *[other] hace { $number } minutos
    }
timeDiffHoursAgo =
    { $number ->
        [one] hace 1 hora
       *[other] hace { $number } horas
    }
timeDiffDaysAgo =
    { $number ->
       *[one] ayer
    }
timeDiffFutureSeconds = en unos segundos
timeDiffFutureMinutes =
    { $number ->
        [one] en 1 minuto
       *[other] en { $number } minutos
    }
timeDiffFutureHours =
    { $number ->
        [one] en 1 hora
       *[other] en { $number } horas
    }
timeDiffFutureDays =
    { $number ->
        [one] mañana
       *[other] en { $number } días
    }
errorThirdPartyCookiesEnabled = Si tomaste esta captura y no puedes eliminarla, puede que debas activar temporalmente las cookies de terceros en las preferencias de tu navegador.

## Shot Page New Feature Promotion Dialog.

# Note: If possible, choose a short translation to better fit into the card.
promoTitle = ¡Toma nota!
promoMessage = Las herramientas de edición actualizadas te permiten cortar, destacar e incluso añadir texto a tu captura.
promoLink = Pruébalas
promoCloseButton =
    .title = Cerrar notificación

## Annotations

annotationPenButton =
    .title = Lápiz
annotationHighlighterButton =
    .title = Destacador
annotationUndoButton =
    .title = Deshacer
annotationRedoButton =
    .title = Rehacer
annotationTextButton =
    .title = Añadir texto
# Note: This button reverts all the changes on the image since the start of the editing session.
annotationClearButton =
    .title = Limpiar
annotationCropButton =
    .title = Recortar
annotationSaveEditButton = Guardar
    .title = Guardar edición
annotationCancelEditButton = Cancelar
    .title = Cancelar edición
annotationCropConfirmButton = Confirmar
    .title = Confirmar selección
annotationCropCancelButton = Cancelar
    .title = Cancelar selección
annotationColorWhite =
    .title = Blanco
annotationColorBlack =
    .title = Negro
annotationColorRed =
    .title = Rojo
annotationColorGreen =
    .title = Verde
annotationColorBlue =
    .title = Azul
annotationColorYellow =
    .title = Amarillo
annotationColorPurple =
    .title = Púrpura
annotationColorSeaGreen =
    .title = Verde mar
annotationColorGrey =
    .title = Gris
# Note: annotationTextSize is a title for text size selection dropdown.
annotationTextSize =
    .title = Tamaño del texto
# Values shown in text size selection dropdown
textSizeSmall = Pequeño
textSizeMedium = Mediano
textSizeLarge = Grande
# Confirm and Cancel button title shown when using text tool
textToolConfirmButton = Confirmar
    .title = Confirmar
textToolCancelButton = Cancelar
    .title = Cancelar
# Default placeholder used in input field when adding text annotations
textToolInputPlaceholder =
    .placeholder = Hola

## The following are the title and message for an error displayed as a Firefox
## notification. It is triggered by an action in the shot page and the strings
## are passed from the shot page to the addon.

copyImageErrorTitle = Algo se fue a las pailas
copyImageErrorMessage = No se pudo copiar tu captura al portapapeles.

## Settings Page

settingsDisconnectButton = Desconectarse
    .title = Desconectarse
settingsGuestAccountMessage = Cuenta de invitado
settingsSignInInvite = Conéctate para sincronizar entre dispositivos
settingsSignInButton = Conectarse
    .title = Conectarse
SettingsPageHeader = Ajustes de Firefox Screenshots
settingsDescription = Puedes conectarte con tu cuenta de Firefox para sincronizar todas tus capturas entre todos tus dispositivos y acceder a ellas de forma privada.
settingsPageSubHeader = Sincronización y cuentas
settingsClosePreferences =
    .title = Cerrar preferencias

## Shotindex page

# { $status } is a placeholder for an HTTP status code, like '500'.
# { $statusText } is a text description of the status code, like 'Internal server error'.
shotIndexPageErrorDeletingShot = Error borrando captura: { $status } { $statusText }
# { $searchTerm } is a placeholder for text the user typed into the search box
shotIndexPageSearchResultsTitle = Mis capturas: buscar por { $searchTerm }
# { $error } is a placeholder for a non-translated error message that could be shared
# with developers when debugging an error.
shotIndexPageErrorRendering = Error al renderizar la página: { $error }
shotIndexPageSearchPlaceholder =
    .placeholder = Buscar mis capturas
shotIndexPageNoShotsMessage = No hay capturas guardadas.
shotIndexPageNoShotsInvitation = Vamos, crea alguna.
shotIndexPageLookingForShots = Buscando por tus capturas...
shotIndexPageNoSearchResultsIntro = Hmm
shotIndexPageNoSearchResults = No pudimos encontrar capturas que coincidan con tu búsqueda.
shotIndexPageMyShotsButton =
    .title = Mis capturas
shotIndexPageClearSearchButton =
    .title = Limpiar búsqueda
shotIndexPageConfirmShotDelete = ¿Eliminar esta captura?
shotIndexPagePreviousPage =
    .title = Página anterior
shotIndexPageNextPage =
    .title = Página siguiente
# This is tooltip for a "blank heart" symbol used in the upper top corner of the card for a shot on the
# My Shots page to indicate that the shot does expire.
shotIndexNonFavoriteIcon =
    .title = Esta no es una captura favorita y expirará
# This is the tooltip for a "heart" symbol in the upper top corner of the
# card for a shot on the My Shots page. It indicate that the shot was marked as
# a favorite by the owner.
shotIndexFavoriteIcon =
    .title = Esta es una captura favorita y no expira
shotIndexSyncedShot =
    .title = Captura tomada en otro dispositivo

## Delete Confirmation Dialog

shotDeleteConfirmationMessage = ¿Estas seguro de eliminar esta captura?
shotDeleteCancel = Cancelar
    .title = Cancelar
shotDeleteConfirm = Eliminar
    .title = Eliminar

## Metrics page
## All metrics strings are optional for translation

# Note: 'Firefox Screenshots' should not be translated
metricsPageTitle = Métricas de Firefox Screenshots
metricsPageTotalsQueryTitle = Totales
# Note: Screenshots is an abbreviation for Firefox Screenshots, and should not be translated.
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
# Note: { $created } is a placeholder for a localized date and time, like '4/21/2017, 3:40:04 AM'
metricsPageGeneratedDateTime = Generada el: { $created }
# Note { $time } is a placeholder for a number of milliseconds, like '100'
metricsPageDatabaseQueryTime = (tiempo de la base de datos: { $time }ms)
