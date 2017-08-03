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
footerLinkDMCA = Denuncieu una infracció de propietat intel·lectual
footerLinkDiscourse = Doneu la vostra opinió
footerLinkRemoveAllData = Elimina totes les dades


[[ Creating page ]]

// Note: { $title } is a placeholder for the title of the web page
// captured in the screenshot. The default, for pages without titles, is
// creatingPageTitleDefault.
creatingPageTitle = S'està creant { $title }
creatingPageTitleDefault = pàgina


[[ Home page ]]

homePageDescription
    .content = Captures de pantalla intuïtives des del navegador mateix. Captureu, deseu i compartiu imatges mentre navegueu amb el Firefox. 
homePageButtonMyShots = Vés a les meves captures
homePageTeaser = Properament…
homePageDownloadFirefoxTitle = Firefox
homePageDownloadFirefoxSubTitle = Baixada gratuïta
homePageGetStarted = Primers passos
// Note: do not translate 'Firefox Screenshots' when translating this string
homePageHowScreenshotsWorks = Com funciona el Firefox Screenshots
homePageGetStartedTitle = Primers passos
// Note: Screenshots is an abbreviation for Firefox Screenshots, and should not be translated.
homePageGetStartedDescription = Cerqueu la icona «Screenshots» a la barra d'eines. Seleccioneu-la i el menú del Firefox Screenshots apareixerà a la part superior de la finestra del navegador.
homePageCaptureRegion = Captureu una àrea
// Note: Screenshots is an abbreviation for Firefox Screenshots, and should not be translated.
homePageCaptureRegionDescription = Feu clic i arrossegueu per seleccionar l'àrea que voleu capturar. O bé, passeu-hi el ratolí per sobre i feu clic: el Firefox Screenshots seleccionarà l'àrea automàticament. Us agrada? Trieu «Desa» per accedir a la captura de pantalla en línia o premeu el botó de fletxa cap avall per baixar-la a l'ordinador.
homePageCapturePage = Captureu una pàgina
homePageCapturePageDescription = Utilitzeu els botons de la part superior dreta per capturar pàgines senceres. El botó «Captura la part visible» capturarà l'àrea que es visualitza sense desplaçar-se, i el botó «Captura tota la pàgina» capturarà tot el contingut de la pàgina.
homePageSaveShare = Deseu i compartiu
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
