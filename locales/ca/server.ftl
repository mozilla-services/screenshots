// Localization for Server-side strings of Firefox Screenshots
// 
// Please don't localize Firefox, Firefox Screenshots, or Screenshots



// Global phrases shared across pages, prefixed with 'g'
[[ global ]]

gMyShots = Les meves captures
gHomeLink = Inici
gNoShots
    .alt = No s'ha trobat cap captura
gScreenshotsDescription = Captures de pantalla sense complicacions. Feu captures, deseu-les i compartiu-les sense sortir del Firefox.


[[ Footer ]]

// Note: link text for a link to mozilla.org
footerLinkMozilla = Mozilla
footerLinkPrivacy = Avís de privadesa


[[ Creating page ]]

// Note: { $title } is a placeholder for the title of the web page
// captured in the screenshot. The default, for pages without titles, is
// creatingPageTitleDefault.
creatingPageTitle = S'està creant { $title }
creatingPageTitleDefault = pàgina


[[ Home page ]]

homePageButtonMyShots = Vés a les meves captures
homePageTeaser = Properament…
homePageDownloadFirefoxTitle = Firefox
homePageDownloadFirefoxSubTitle = Baixada gratuïta
homePageGetStarted = Primers passos
// Note: do not translate 'Firefox Screenshots' when translating this string
homePageHowScreenshotsWorks = Com funciona el Firefox Screenshots
homePageGetStartedTitle = Primers passos
homePagePrivacyLink = Privadesa
homePageTermsLink = Condicions d'ús
homePageCookiesLink = Galetes


[[ Leave Screenshots page ]]

leavePageErrorGeneric = S'ha produït un error
leavePageButtonProceed = Continua
leavePageButtonCancel = Cancel·la
leavePageDeleted = S'han esborrat totes les captures de pantalla vostres.


[[ Not Found page ]]

notFoundPageTitle = No s'ha trobat la pàgina
notFoundPageIntro = Ups.
notFoundPageDescription = No s'ha trobat la pàgina.


[[ Shot page ]]

shotPageCopy = Copia
shotPageCopied = S'ha copiat
shotPageUpsellFirefox = Baixeu el Firefox ara
// Note: shotPageSelectTime is a placeholder label for the time selection dropdown.
shotPageSelectTime = Seleccioneu el temps
shotPageKeepIndefinitely = Indefinidament
shotPageKeepTenMinutes = 10 minuts
shotPageKeepOneHour = 1 hora
shotPageKeepOneDay = 1 dia
shotPageKeepOneWeek = 1 setmana
shotPageKeepTwoWeeks = 2 setmanes
shotPageKeepOneMonth = 1 mes
shotPageSaveExpiration = desa
shotPageCancelExpiration = cancel·la
shotPageDoesNotExpire = no caduca
// Note: { $timediff } is a placeholder for a future relative time clause, like "in 1 week" or "tomorrow"
shotPageExpiresIn = caduca { $timediff }
// Note: { $timediff } is a placeholder for a past relative time clause, like "1 week ago" or "yesterday"
shotPageExpired = ha caducat { $timediff }
timeDiffJustNow = ara mateix
timeDiffMinutesAgo = { $num ->
        [one] fa 1 minut
       *[other] fa { $number } minuts
    }
timeDiffHoursAgo = { $num ->
        [one] fa 1 hora
       *[other] fa { $number } hores
    }
timeDiffDaysAgo = { $num ->
        [one] ahir
       *[other] fa { $number } dies
    }
timeDiffFutureSeconds = d'aquí pocs segons
timeDiffFutureMinutes = { $num ->
        [one] d'aquí 1 minut
       *[other] d'aquí { $number } minuts
    }
timeDiffFutureHours = { $num ->
        [one] d'aquí 1 hora
       *[other] d'aquí { $number } hores
    }
timeDiffFutureDays = { $num ->
        [one] demà
       *[other] d'aquí { $number } dies
    }


[[ Shotindex page ]]

shotIndexPageSearchButton
    .title = Cerca
shotIndexPageLookingForShots = S'estan cercant les vostres captures…


// all metrics strings are optional for translation
[[ Metrics page ]]

metricsPageShotsQueryTitle = Captures per dia
metricsPageShotsQueryCount = Nombre de captures
metricsPageShotsQueryDay = Dia
metricsPageTotalRetentionQueryUsers = Nombre d'usuaris
metricsPageVersionQueryTitle = Versió del complement
metricsPageVersionQueryLastSeen = Dia
