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
footerLinkTerms = Condicions d'ús
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
creatingPageWaitMessage = S'està desant la captura…


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
// Note: Screenshots is an abbreviation for Firefox Screenshots, and should not be translated.
homePageSaveShareDescription = Quan feu una captura de pantalla, el Firefox l'envia a la vostra biblioteca de captures i copia l'enllaç al porta-retalls. Per defecte, la captura de pantalla s'emmagatzema durant dues setmanes, però també podeu suprimir-la en qualsevol moment o canviar-ne la data de caducitat per tal de conservar-les més temps a la vostra biblioteca.
homePageLegalLink = Avís legal
homePagePrivacyLink = Privadesa
homePageTermsLink = Condicions d'ús
homePageCookiesLink = Galetes


[[ Leave Screenshots page ]]

leavePageRemoveAllData = Elimina totes les dades
// Note: do not translate 'Firefox Screenshots' when translating this string
leavePageErrorAddonRequired = Heu de tenir el Firefox Screenshots instal·lat per suprimir el vostre compte
leavePageErrorGeneric = S'ha produït un error
// Note: do not translate 'Firefox Screenshots' when translating this string
leavePageWarning = Aquesta operació esborrarà totes les vostres dades del Firefox Screenshots.
leavePageButtonProceed = Continua
leavePageButtonCancel = Cancel·la
leavePageDeleted = S'han esborrat totes les captures de pantalla vostres.


[[ Not Found page ]]

notFoundPageTitle = No s'ha trobat la pàgina
notFoundPageIntro = Ups.
notFoundPageDescription = No s'ha trobat la pàgina.


[[ Shot page ]]

// This is the HTML title tag of the page
shotPageTitle = Captura de pantalla: { $originalTitle }
shotPageAlertErrorUpdatingExpirationTime = S'ha produït un error en desar la caducitat
shotPageAlertErrorDeletingShot = S'ha produït un error en suprimir la captura
shotPageAlertErrorUpdatingTitle = S'ha produït un error en desar el títol
shotPageConfirmDelete = Segur que voleu suprimir aquesta captura permanentment?
shotPageShareButton
    .title = Comparteix
shotPageCopy = Copia
shotPageCopied = S'ha copiat
shotPageShareFacebook
    .title = Comparteix al Facebook
shotPageShareTwitter
    .title = Comparteix al Twitter
shotPageSharePinterest
    .title = Comparteix al Pinterest
shotPageShareEmail
    .title = Comparteix l'enllaç per correu electrònic
shotPageShareLink = Obteniu un enllaç a aquesta captura:
shotPagePrivacyMessage = Qualsevol persona amb l'enllaç pot veure aquesta captura.
shotPageCopyImageText
    .label = Copia el text de la imatge
shotPageConfirmDeletion = Segur que voleu suprimir aquesta captura permanentment?
// Note: { $timediff } is a placeholder for a future relative time clause like 'in 3 days' or 'tomorrow'
shotPageExpirationMessage = Si no feu res, aquesta captura se suprimirà permanentment { $timediff }.
// Note: { $date } is a placeholder for a localized future date as returned by Date.toLocaleString.
// For example, in en-US, { $date } could be "7/12/2017, 1:52:50 PM".
shotPageRestoreButton = restaura fins al { $date }
shotPageExpiredMessage = Aquesta captura ha caducat.
// Note: This phrase is followed by an empty line, then the URL of the source page
shotPageExpiredMessageDetails = Aquesta és la pàgina des d'on es va fer originalment la captura:
shotPageDeleteButton
    .title = Suprimeix aquesta captura
shotPageAbuseButton
    .title = Denuncieu aquesta captura per abús, brossa o altres problemes
shotPageDownloadShot
    .title = Baixa
shotPageDownload = Baixa
shotPageScreenshotsDescription = Captures de pantalla sense complicacions. Feu captures, deseu-les i compartiu-les sense sortir del Firefox.
shotPageUpsellFirefox = Baixeu el Firefox ara
shotPageDMCAMessage = Aquesta captura ja no està disponible a causa d'una reclamació de propietat intel·lectual d'un tercer.
// Note: { $dmca } is a placeholder for a link to send email (a 'mailto' link)
shotPageDMCAContact = Envieu un correu electrònic a { $dmca } per sol·licitar més informació.
// Note: do not translate 'Firefox Screenshots' when translating this string
shotPageDMCAWarning = Si rebem diverses reclamacions per les vostres captures, se us podria denegar l'accés al Firefox Screenshots.
// Note: { $url } is a placeholder for a shot page URL
shotPageDMCAIncludeLink = Incloeu l'URL d'aquesta captura en el missatge de correu electrònic: { $url }
shotPageKeepFor = Quant temps voleu conservar aquesta captura?
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

// { $status } is a placeholder for an HTTP status code, like '500'.
// { $statusText } is a text description of the status code, like 'Internal server error'.
shotIndexPageErrorDeletingShot = S'ha produït un error en suprimir la captura: { $status } { $statusText }
// { $searchTerm } is a placeholder for text the user typed into the search box
shotIndexPageSearchResultsTitle = Les meves captures: s'està cercant { $searchTerm }
// { $error } is a placeholder for a non-translated error message that could be shared
// with developers when debugging an error.
shotIndexPageErrorRendering = S'ha produït un error en generar la pàgina: { $error }
shotIndexPageSearchPlaceholder
    .placeholder = Cerca en les meves captures
shotIndexPageSearchButton
    .title = Cerca
shotIndexPageNoShotsMessage = No hi ha cap captura desada.
shotIndexPageNoShotsInvitation = Endavant, feu-ne algunes.
shotIndexPageLookingForShots = S'estan cercant les vostres captures…
shotIndexPageNoSearchResultsIntro = Mmm
shotIndexPageNoSearchResults = No s'ha trobat cap captura que coincideixi amb la cerca.
shotIndexPageClearSearchButton
    .title = Esborra la cerca
shotIndexPageConfirmShotDelete = Voleu suprimir aquesta captura?


// all metrics strings are optional for translation
[[ Metrics page ]]

// Note: 'Firefox Screenshots' should not be translated
metricsPageTitle = Mètriques del Firefox Screenshots
metricsPageTotalsQueryTitle = Totals
// Note: Screenshots is an abbreviation for Firefox Screenshots, and should not be translated.
metricsPageTotalsQueryDescription = Resum del Firefox Screenshots
metricsPageTotalsQueryDevices = Dispositius registrats totals
metricsPageTotalsQueryActiveShots = Captures actives
metricsPageTotalsQueryExpiredShots = Caducades (però recuperables)
metricsPageTotalsQueryExpiredDeletedShots = Caducades (i suprimides)
metricsPageShotsQueryTitle = Captures per dia
metricsPageShotsQueryDescription = Nombre de captures creades cada dia (en els darrers 30 dies)
metricsPageShotsQueryCount = Nombre de captures
metricsPageShotsQueryDay = Dia
metricsPageUsersQueryTitle = Usuaris per dia
metricsPageUsersQueryDescription = Nombre d'usuaris que han creat com a mínim una captura, per dia (darrers 30 dies)
metricsPageUsersQueryCount = Nombre d'usuaris
metricsPageUsersQueryDay = Dia
metricsPageUserShotsQueryTitle = Nombre de captures per usuari
metricsPageUserShotsQueryDescription = El nombre d'usuaris que tenen aproximadament N captures en total
metricsPageUserShotsQueryCount = Nombre d'usuaris
metricsPageUserShotsQueryShots = Nombre aproximat de captures actives (no caducades)
metricsPageRetentionQueryTitle = Retenció per setmana
metricsPageRetentionQueryDescription = Nombre de dies des de la primera captura d'un usuari fins a la captura més recent, agrupats per setmana d'inici
metricsPageRetentionQueryUsers = Nombre d'usuaris
metricsPageRetentionQueryDays = Dies transcorreguts entre la primera i la darrera captura de l'usuari
metricsPageRetentionQueryFirstWeek = Setmana en què l'usuari va crear la primera captura
metricsPageTotalRetentionQueryTitle = Retenció total
metricsPageTotalRetentionQueryDescription = Període de temps durant el qual els usuaris han estat fent captures, agrupat per setmana
metricsPageTotalRetentionQueryUsers = Nombre d'usuaris
metricsPageTotalRetentionQueryDays = Dies que l'usuari ha estat fent captures
metricsPageVersionQueryTitle = Versió del complement
metricsPageVersionQueryDescription = La versió del complement que s'ha utilitzat en iniciar la sessió, en els darrers 14 dies
metricsPageVersionQueryUsers = Nombre d'usuaris que inicien la sessió
metricsPageVersionQueryVersion = Versió del complement
metricsPageVersionQueryLastSeen = Dia
metricsPageHeader = Mètriques
// Note: { $created } is a placeholder for a localized date and time, like '4/21/2017, 3:40:04 AM'
metricsPageGeneratedDateTime = Data de generació: { $created }
// Note { $time } is a placeholder for a number of milliseconds, like '100'
metricsPageDatabaseQueryTime = (temps de base de dades: { $time } ms)
