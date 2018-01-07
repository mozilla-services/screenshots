// Localization for Server-side strings of Firefox Screenshots
// 
// Please don't localize Firefox, Firefox Screenshots, or Screenshots



// Global phrases shared across pages, prefixed with 'g'
[[ global ]]

gMyShots = Capturile mele
gHomeLink = Start
gNoShots
    .alt = Nicio captură găsită
gScreenshotsDescription = Capturile de ecran simplificate. Realizează, salvează și partajează capturile de ecran fără să părăsești Firefox.


[[ Footer ]]

// Note: link text for a link to mozilla.org
footerLinkMozilla = Mozilla
footerLinkTerms = Termeni
footerLinkPrivacy = Politica de confidențialitate
footerLinkFaqs = Întrebări frecvente
footerLinkDMCA = Raportează o încălcare a PI
footerLinkDiscourse = Oferă feedback
footerLinkRemoveAllData = Elimină toate datele


[[ Creating page ]]

// Note: { $title } is a placeholder for the title of the web page
// captured in the screenshot. The default, for pages without titles, is
// creatingPageTitleDefault.
creatingPageTitle = Se creează { $title }
creatingPageTitleDefault = pagină
creatingPageWaitMessage = Se salvează captura…


[[ Home page ]]

homePageDescription
    .content = Capturi de ecran intuitive integrate direct în browser. Capturează, salvează și partajează capturi de ecran pe măsură ce navighezi pe web folosind Firefox.
homePageButtonMyShots = Mergi la Capturile mele
homePageTeaser = În curând…
homePageDownloadFirefoxTitle = Firefox
homePageDownloadFirefoxSubTitle = Descărcare gratuită
homePageGetStarted = Începe
// Note: do not translate 'Firefox Screenshots' when translating this string
homePageHowScreenshotsWorks = Cum funcționează Firefox Screenshots
homePageGetStartedTitle = Începe
// Note: Screenshots is an abbreviation for Firefox Screenshots, and should not be translated.
homePageGetStartedDescription = Găsește noua pictogramă Screenshots de pe bara de unelte. Selecteaz-o și meniul Screenshots va apărea în partea de sus a ferestrei browserului.
// Note: Screenshots is an abbreviation for Firefox Screenshots, and should not be translated.
homePageGetStartedDescriptionPageAction = Alege pictograma Screenshots din meniul de acțiuni pe pagină din bara de adrese și meniul Screenshots va apărea peste fereastra de navigare.
homePageCaptureRegion = Capturează o regiune
// Note: Screenshots is an abbreviation for Firefox Screenshots, and should not be translated.
homePageCaptureRegionDescription = Clic și trage pentru a selecta zona pe care dorești să o capturezi. Sau pur și simplu poziționează cursorul peste zonă și dă clic — Screenshots va selecta zona pentru tine. Îți place ceea ce vezi? Selectează Salvează pentru a-ți accesa online captura de ecran sau butonul săgeată în jos pentru a o descărca pe calculator.
homePageCapturePage = Capturează o pagină
homePageCapturePageDescription = Folosește butoanele din dreapta sus pentru a captura pagini întregi. Butonul Save Visible (Salvează ce se vede) va captura zona ce se vede fără a derula și butonul Save Full Page (Salvează toată pagina) va captura toată pagina.
homePageSaveShare = Salvează și partajează
// Note: Screenshots is an abbreviation for Firefox Screenshots, and should not be translated.
homePageSaveShareDescription = Când realizezi o captură, Firefox postează captura de ecran în colecția ta online Screenshots și copiază linkul în clipboard. Stocăm automat captura de ecran timp de două săptămâni, însă poți să ștergi capturile oricând sau să modifici data expirării ca să le păstrezi în colecție pentru o durată mai lungă.
homePageLegalLink = Mențiuni legale
homePagePrivacyLink = Confidențialitate
homePageTermsLink = Termeni
homePageCookiesLink = Cookie-uri


[[ Leave Screenshots page ]]

leavePageRemoveAllData = Elimină toate datele
// Note: do not translate 'Firefox Screenshots' when translating this string
leavePageErrorAddonRequired = Trebuie să ai Firefox Screenshots instalat pentru a-ți șterge contul
leavePageErrorGeneric = A intervenit o eroare.
// Note: do not translate 'Firefox Screenshots' when translating this string
leavePageWarning = Acest lucru va șterge definitiv toate datele tale Firefox Screenshots.
leavePageButtonProceed = Continuă
leavePageButtonCancel = Renunță
leavePageDeleted = Toate capturile tale de ecran au fost șterse!


[[ Not Found page ]]

notFoundPageTitle = Pagină negăsită
notFoundPageIntro = Ups.
notFoundPageDescription = Pagină negăsită.


[[ Shot page ]]

// This is the HTML title tag of the page
shotPageTitle = Captură de ecran: { $originalTitle }
shotPageAlertErrorUpdatingExpirationTime = Eroare la salvarea expirării
shotPageAlertErrorDeletingShot = Eroare la ștergerea capturii
shotPageAlertErrorUpdatingTitle = Eroare la salvarea titlului
shotPageConfirmDelete = Sigur dorești să ștergi această captură definitiv?
shotPageShareButton
    .title = Partajează
shotPageCopy = Copiază
shotPageCopied = Copiat
shotPageShareFacebook
    .title = Partajează pe Facebook
shotPageShareTwitter
    .title = Partajează pe Twitter
shotPageSharePinterest
    .title = Partajează pe Pinterest
shotPageShareEmail
    .title = Trimite linkul pe e-mail
shotPageShareLink = Obține un link partajabil către această captură:
shotPagePrivacyMessage = Oricine are linkul poate vedea această captură.
shotPageCopyImageText
    .label = Copiază textul imaginii
shotPageExpiredMessage = Această captură a expirat.
shotPageDeleteButton
    .title = Șterge această captură
shotPageAbuseButton
    .title = Raportează această captură pentru abuz, spam sau alte probleme
shotPageDownloadShot
    .title = Descarcă
shotPageDownload = Descarcă
shotPageScreenshotsDescription = Capturile de ecran simplificate. Realizează, salvează și partajează capturile de ecran fără să părăsești Firefox.
shotPageUpsellFirefox = Obține Firefox acum
shotPageKeepFor = Cât timp ar trebui să fie păstrată această captură?
// Note: shotPageSelectTime is a placeholder label for the time selection dropdown.
shotPageSelectTime = Selectează durata
shotPageKeepIndefinitely = Pe termen nedefinit
shotPageKeepTenMinutes = 10 minute
shotPageKeepOneHour = 1 oră
shotPageKeepOneDay = 1 zi
shotPageKeepOneWeek = 1 săptămână
shotPageKeepTwoWeeks = 2 săptămâni
shotPageKeepOneMonth = 1 lună
shotPageSaveExpiration = salvează
shotPageCancelExpiration = renunță
shotPageDoesNotExpire = nu expiră
// Note: { $timediff } is a placeholder for a future relative time clause, like "in 1 week" or "tomorrow"
shotPageExpiresIn = expiră { $timediff }
// Note: { $timediff } is a placeholder for a past relative time clause, like "1 week ago" or "yesterday"
shotPageExpired = a expirat { $timediff }
timeDiffJustNow = chiar acum
timeDiffMinutesAgo = { $number ->
        [one] în urmă cu 1 minut
        [few] în urmă cu { $number } minute
       *[other] în urmă cu { $number } de minute
    }
timeDiffHoursAgo = { $number ->
        [one] în urmă cu 1 oră
        [few] în urmă cu { $number } ore
       *[other] în urmă cu { $number } de ore
    }
timeDiffDaysAgo = { $number ->
        [one] ieri
        [few] în urmă cu { $number } zile
       *[other] în urmă cu { $number } de zile
    }
timeDiffFutureSeconds = în câteva secunde
timeDiffFutureMinutes = { $number ->
        [one] într-un minut
        [few] în { $number } minute
       *[other] în { $number } de minute
    }
timeDiffFutureHours = { $number ->
        [one] într-o oră
        [few] în { $number } ore
       *[other] în { $number } de ore
    }
timeDiffFutureDays = { $number ->
        [one] mâine
        [few] în { $number } zile
       *[other] în { $number } de zile
    }


[[ Annotations ]]



[[ Shotindex page ]]

shotIndexPageSearchPlaceholder
    .placeholder = Caută capturile mele
shotIndexPageSearchButton
    .title = Caută
shotIndexPageNoShotsMessage = Nicio captură salvată.
shotIndexPageNoShotsInvitation = Haide, realizează câteva.
shotIndexPageNoSearchResultsIntro = Hmm
shotIndexPageConfirmShotDelete = Ștergi această captură?


// all metrics strings are optional for translation
[[ Metrics page ]]

metricsPageTotalsQueryActiveShots = Capturi active
metricsPageShotsQueryTitle = Capturi în funcție de zi
metricsPageShotsQueryCount = Număr de capturi
metricsPageUsersQueryTitle = Utilizatori în funcție de zi
metricsPageUsersQueryCount = Număr de utilizatori
metricsPageUserShotsQueryCount = Număr de utilizatori
metricsPageRetentionQueryUsers = Număr de utilizatori
metricsPageTotalRetentionQueryUsers = Număr de utilizatori
metricsPageVersionQueryTitle = Versiunea suplimentului
metricsPageVersionQueryVersion = Versiunea suplimentului
metricsPageHeader = Indicatori metrici
