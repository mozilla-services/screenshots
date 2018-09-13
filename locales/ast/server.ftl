### Localization for Server-side strings of Firefox Screenshots
### Please don't localize Firefox, Firefox Screenshots, or Screenshots


## Global phrases shared across pages, prefixed with 'g'

gMyShots = Les mios captures
gHomeLink = Aniciu
gNoShots =
    .alt = Nun s'alcontraron captures
gSettings = Axustes
gSignIn = Aniciar sesión

## Header

signInButton =
    .aria-label = Aniciar sesión
settingsButton =
    .aria-label = Axustes

## Footer

# Note: link text for a link to mozilla.org
footerLinkMozilla = Mozilla
footerLinkTerms = Términos
footerLinkFaqs = Entrugues frequentes
footerLinkDiscourse = Dar feedback
footerLinkRemoveAllData = Desaniciar tolos datos

## Creating page

# Note: { $title } is a placeholder for the title of the web page
# captured in the screenshot. The default, for pages without titles, is
# creatingPageTitleDefault.
creatingPageTitle = Creando { $title }
creatingPageTitleDefault = páxina
creatingPageWaitMessage = Guardando la to captura...

## Home page

homePageButtonMyShots = Dir a Les mios captures
homePageTeaser = Próximamente...
homePageDownloadFirefoxTitle = Firefox
homePageDownloadFirefoxSubTitle = Descarga de baldre
# Note: do not translate 'Firefox Screenshots' when translating this string
homePageHowScreenshotsWorks = Cómo funciona Firefox Screenhoots
homePageGetStartedTitle = Entamar
homePageLegalLink = Llegal
homePagePrivacyLink = Privacidá
homePageTermsLink = Términos
homePageCookiesLink = Cookies

## Leave Screenshots page

leavePageErrorGeneric = Asocedió un fallu
leavePageButtonProceed = Siguir
leavePageButtonCancel = Encaboxar

## Not Found page

notFoundPageTitle = Nun s'alcontró la páxina
notFoundPageIntro = Ups.
notFoundPageDescription = Nun s'alcontró la páxina.

## Shot page

shotPageShareButton =
    .title = Compartir
shotPageCopy = Copiar
shotPageCopied = Copióse
shotPageDownloadShot =
    .title = Baxar
shotPageDownload = Baxar
shotPageKeepTenMinutes = 10 minutos
shotPageKeepOneHour = 1 hora
shotPageKeepOneDay = 1 día
shotPageKeepOneWeek = 1 selmana
shotPageKeepTwoWeeks = 2 selmanes
shotPageKeepOneMonth = 1 mes
shotPageSaveExpiration = guardar
shotPageCancelExpiration = encaboxar
shotPageDoesNotExpire = nun caduca
timeDiffJustNow = xusto agora
timeDiffDaysAgo =
    { $number ->
        [one] ayeri
       *[other] hai { $number } díes
    }
timeDiffFutureMinutes =
    { $number ->
        [one] en 1 minutu
       *[other] en { $number } minutos
    }
timeDiffFutureDays =
    { $number ->
        [one] mañana
       *[other] en { $number } díes
    }

## Shot Page New Feature Promotion Dialog.


## Annotations

annotationUndoButton =
    .title = Desfacer
annotationRedoButton =
    .title = Refacer
annotationTextButton =
    .title = Amestar testu
# Note: This button reverts all the changes on the image since the start of the editing session.
annotationClearButton =
    .title = Llimpiar
annotationSaveEditButton = Guardar
    .title = Guarda la edición
annotationCancelEditButton = Encaboxar
    .title = Encaboxar la edición
annotationCropConfirmButton = Confirmar
    .title = Confirma la esbilla
annotationCropCancelButton = Encaboxar
    .title = Encaboxa la esbilla
annotationColorWhite =
    .title = Blancu
annotationColorBlack =
    .title = Prietu
annotationColorRed =
    .title = Bermeyu
annotationColorGreen =
    .title = Verde
annotationColorBlue =
    .title = Azul
annotationColorYellow =
    .title = Mariellu
annotationColorPurple =
    .title = Moráu
annotationColorSeaGreen =
    .title = Verde mar
annotationColorGrey =
    .title = Buxu
# Note: annotationTextSize is a title for text size selection dropdown.
annotationTextSize =
    .title = Tamañu del testu
# Values shown in text size selection dropdown
textSizeSmall = Pequeñu
textSizeMedium = Mediu
textSizeLarge = Grande

## Settings Page


## Shotindex page

# { $status } is a placeholder for an HTTP status code, like '500'.
# { $statusText } is a text description of the status code, like 'Internal server error'.
shotIndexPageErrorDeletingShot = Fallu desaniciando la captura: { $status } { $statusText }
shotIndexPageNoSearchResultsIntro = Umm

## Delete Confirmation Dialog


## Metrics page
## All metrics strings are optional for translation

metricsPageShotsQueryDay = Día
metricsPageUsersQueryDay = Día
metricsPageUserShotsQueryCount = Númberu d'usuarios
metricsPageRetentionQueryUsers = Númberu d'usuarios
metricsPageTotalRetentionQueryUsers = Númberu d'usuarios
metricsPageVersionQueryLastSeen = Día
metricsPageHeader = Métriques
