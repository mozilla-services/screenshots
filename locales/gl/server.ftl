### Localization for Server-side strings of Firefox Screenshots
### Please don't localize Firefox, Firefox Screenshots, or Screenshots


## Global phrases shared across pages, prefixed with 'g'

gMyShots = As miñas capturas
gHomeLink = Inicio
gNoShots =
    .alt = Non se atoparon capturas

## Footer

# Note: link text for a link to mozilla.org
footerLinkMozilla = Mozilla
footerLinkTerms = Termos
footerLinkPrivacy = Política de privacidade
footerLinkFaqs = FAQ
footerLinkDiscourse = Dar opinión
footerLinkRemoveAllData = Retirar todos os datos

## Creating page

# Note: { $title } is a placeholder for the title of the web page
# captured in the screenshot. The default, for pages without titles, is
# creatingPageTitleDefault.
creatingPageTitle = Creando { $title }
creatingPageTitleDefault = páxina
creatingPageWaitMessage = Gardando a súa captura…

## Home page

homePageButtonMyShots = Ir as miñas capturas
homePageTeaser = Proximamente…
homePageDownloadFirefoxTitle = Firefox
homePageDownloadFirefoxSubTitle = Descarga de balde
homePageGetStarted = Comezar
# Note: do not translate 'Firefox Screenshots' when translating this string
homePageHowScreenshotsWorks = Como funciona Firefox Screenshots
homePageGetStartedTitle = Comezar
homePageCaptureRegion = Capturar unha rexión
homePageCapturePage = Capturar unha páxina
homePageSaveShare = Gardar e compartir
homePageLegalLink = Legal
homePagePrivacyLink = Privacidade
homePageTermsLink = Termos
homePageCookiesLink = Cookies

## Leave Screenshots page

leavePageRemoveAllData = Retirar todos os datos
leavePageErrorGeneric = Produciuse un erro
leavePageButtonProceed = Continuar
leavePageButtonCancel = Cancelar
leavePageDeleted = Borráronse todas as súas capturas de pantalla!

## Not Found page

notFoundPageTitle = Non se atopou a páxina
notFoundPageIntro = Vaites.
notFoundPageDescription = Non se atopou a páxina.

## Shot page

# This is the HTML title tag of the page
shotPageTitle = Captura de pantalla: { $originalTitle }
shotPageAlertErrorDeletingShot = Produciuse un erro ao eliminar a captura
shotPageAlertErrorUpdatingTitle = Produciuse un erro ao gardar o título
shotPageConfirmDelete = Confirma que quere eliminar esta captura de forma permanente?
shotPageShareButton =
    .title = Compartir
shotPageCopy = Copiar
shotPageCopied = Copiouse
shotPageShareFacebook =
    .title = Compartir en Facebook
shotPageShareTwitter =
    .title = Compartir en Twitter
shotPageSharePinterest =
    .title = Compartir en Pinterest
shotPageShareEmail =
    .title = Compartir a ligazón por correo electrónico
shotPageShareLink = Obter unha ligazón para compartir esta captura:
shotPagePrivacyMessage = Calquera que teña a ligazón pode ver a captura.
shotPageCopyImageText =
    .label = Copiar o texto da imaxe
shotPageConfirmDeletion = Confirma que quere eliminar esta captura de forma permanente?
# Note: { $date } is a placeholder for a localized future date as returned by Date.toLocaleString.
# For example, in en-US, { $date } could be "7/12/2017, 1:52:50 PM".
shotPageRestoreButton = restaurar ata o { $date }
shotPageExpiredMessage = Esta captura caducou.
shotPageDeleteButton =
    .title = Eliminar esta captura
shotPageDownloadShot =
    .title = Descargar
shotPageDownload = Descargar
shotPageUpsellFirefox = Obteña Firefox agora
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
shotPageSaveExpiration = gardar
shotPageCancelExpiration = cancelar
shotPageDoesNotExpire = non caduca
# Note: { $timediff } is a placeholder for a future relative time clause, like "in 1 week" or "tomorrow"
shotPageExpiresIn = caduca en { $timediff }
# Note: { $timediff } is a placeholder for a past relative time clause, like "1 week ago" or "yesterday"
shotPageExpired = caducou fai { $timediff }
timeDiffJustNow = agora mesmo
timeDiffMinutesAgo =
    { $number ->
        [one] hai 1 minuto
       *[other] hai { $number } minutos
    }
timeDiffHoursAgo =
    { $number ->
        [one] hai 1 hora
       *[other] hai { $number } horas
    }
timeDiffDaysAgo =
    { $number ->
        [one] onte
       *[other] hai { $number } días
    }
timeDiffFutureSeconds = nuns segundos
timeDiffFutureMinutes =
    { $number ->
        [one] nun minuto
       *[other] en { $number } minutos
    }
timeDiffFutureHours =
    { $number ->
        [one] nunha hora
       *[other] en { $number } horas
    }
timeDiffFutureDays =
    { $number ->
        [one] mañá
       *[other] en { $number } días
    }

## Annotations

annotationHighlighterButton =
    .title = Marcador
# Note: This button reverts all the changes on the image since the start of the editing session.
annotationClearButton =
    .title = Borrar
annotationCropButton =
    .title = Recortar
annotationSaveEditButton = Gardar
    .title = Gardar as modificacións
annotationCancelEditButton = Cancelar
    .title = Cancelar as modificacións
annotationCropConfirmButton = Confirmar
    .title = Confirmar a selección
annotationCropCancelButton = Cancelar
    .title = Cancelar a selección

## Shotindex page

shotIndexPageConfirmShotDelete = Eliminar esta captura?
shotIndexPagePreviousPage =
    .title = Páxina anterior
shotIndexPageNextPage =
    .title = Seguinte páxina
# This symbol is used in the lower right corner of the card for a shot on the
# My Shots page to indicate that the shot does not expire. It should be a
# single character (or simply nothing if no such symbol is available for a
# language/culture).
shotIndexNoExpirationSymbol = ∞
    .title = Esta captura non caduca

## Metrics page
## All metrics strings are optional for translation

# Note: 'Firefox Screenshots' should not be translated
metricsPageTitle = Métricas de Firefox Screenshots
metricsPageTotalsQueryTitle = Totais
metricsPageVersionQueryTitle = Versión do complemento
metricsPageVersionQueryVersion = Versión do complemento
metricsPageVersionQueryLastSeen = Día
metricsPageHeader = Métricas
