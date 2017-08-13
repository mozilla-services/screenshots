// Localization for Server-side strings of Firefox Screenshots
// 
// Please don't localize Firefox, Firefox Screenshots, or Screenshots



// Global phrases shared across pages, prefixed with 'g'
[[ global ]]

gMyShots = Les mios captures
gHomeLink = Aniciu
gNoShots
    .alt = Nun s'alcontraron captures


[[ Footer ]]

// Note: link text for a link to mozilla.org
footerLinkMozilla = Mozilla
footerLinkTerms = Términos
footerLinkDiscourse = Dar feedback
footerLinkRemoveAllData = Desaniciar tolos datos


[[ Creating page ]]

// Note: { $title } is a placeholder for the title of the web page
// captured in the screenshot. The default, for pages without titles, is
// creatingPageTitleDefault.
creatingPageTitle = Creando { $title }
creatingPageTitleDefault = páxina
creatingPageWaitMessage = Guardando la to captura...


[[ Home page ]]

homePageButtonMyShots = Dir a Les mios captures
homePageTeaser = Próximamente...
homePageDownloadFirefoxTitle = Firefox
homePageDownloadFirefoxSubTitle = Descarga de baldre
homePageGetStarted = Entamar
// Note: do not translate 'Firefox Screenshots' when translating this string
homePageHowScreenshotsWorks = Cómo funciona Firefox Screenhoots
homePageGetStartedTitle = Entamar


[[ Leave Screenshots page ]]



[[ Not Found page ]]



[[ Shot page ]]

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
timeDiffFutureDays = { $num ->
        [one] mañana
       *[other] en { $number } díes
    }


[[ Shotindex page ]]

// { $status } is a placeholder for an HTTP status code, like '500'.
// { $statusText } is a text description of the status code, like 'Internal server error'.
shotIndexPageErrorDeletingShot = Fallu desaniciando la captura: { $status } { $statusText }


// all metrics strings are optional for translation
[[ Metrics page ]]

