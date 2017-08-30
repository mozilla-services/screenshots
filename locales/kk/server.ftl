// Localization for Server-side strings of Firefox Screenshots
// 
// Please don't localize Firefox, Firefox Screenshots, or Screenshots



// Global phrases shared across pages, prefixed with 'g'
[[ global ]]

gMyShots = Менің скриншоттарым
gHomeLink = Үйге
gNoShots
    .alt = Скриншоттар табылмады
gScreenshotsDescription = Скриншоттар қарапайым түрде. Тура Firefox ішінен скриншоттарды түсіру, сақтау және олармен бөлісу.


[[ Footer ]]

// Note: link text for a link to mozilla.org
footerLinkMozilla = Mozilla
footerLinkTerms = Қолдану шарттары
footerLinkPrivacy = Жекелік ескертуі
footerLinkDMCA = Авторлық құқықтардың бұзылуы жөнінде хабарлау
footerLinkDiscourse = Кері байланыс
footerLinkRemoveAllData = Барлық деректерді өшіру


[[ Creating page ]]

// Note: { $title } is a placeholder for the title of the web page
// captured in the screenshot. The default, for pages without titles, is
// creatingPageTitleDefault.
creatingPageTitle = Жасалуда { $title }
creatingPageTitleDefault = бет
creatingPageWaitMessage = Снапшотты сақтау…


[[ Home page ]]

homePageButtonMyShots = Менің скриншоттарыма өту
homePageTeaser = Жақында…
homePageDownloadFirefoxTitle = Firefox
homePageDownloadFirefoxSubTitle = Тегін жүктеп алу
homePageGetStarted = Бастау
// Note: do not translate 'Firefox Screenshots' when translating this string
homePageHowScreenshotsWorks = Firefox скриншоттары қалай жұмыс жасайды
homePageGetStartedTitle = Бастау
// Note: Screenshots is an abbreviation for Firefox Screenshots, and should not be translated.
homePageGetStartedDescription = Саймандар панеліңізден жаңа скриншоттар таңбашасын табыңыз. Оны таңдаңыз, және скриншоттар мәзірі браузер терезеңіздің үстінен шығады.
homePageCaptureRegion = Аймақты түсіру
homePageCapturePage = Парақты түсіру
homePageSaveShare = Сақтау және бөлісу
homePageLegalLink = Құқықтық ақпарат
homePagePrivacyLink = Жекелік
homePageTermsLink = Қолдану шарттары
homePageCookiesLink = Cookies


[[ Leave Screenshots page ]]

leavePageRemoveAllData = Барлық деректерді өшіру
leavePageErrorGeneric = Қате орын алды
leavePageButtonProceed = Жалғастыру
leavePageButtonCancel = Бас тарту
leavePageDeleted = Сіздің барлық скриншоттарыңыз өшірілді!


[[ Not Found page ]]

notFoundPageTitle = Бет табылмады
notFoundPageIntro = Қате.
notFoundPageDescription = Бет табылмады.


[[ Shot page ]]

// This is the HTML title tag of the page
shotPageTitle = Скриншот: { $originalTitle }
shotPageAlertErrorUpdatingExpirationTime = Аяқталу мерзімін сақтау қатесі
shotPageAlertErrorDeletingShot = Скриншотты өшіру қатесі
shotPageAlertErrorUpdatingTitle = Атауын сақтау қатесі
shotPageConfirmDelete = Бұл скриншотты толығымен өшіруді шынымен қалайсыз ба?
shotPageShareButton
    .title = Бөлісу
shotPageCopy = Көшіріп алу
shotPageCopied = Көшірілген
shotPageShareFacebook
    .title = Facebook-те бөлісу
shotPageShareTwitter
    .title = Twitter-де төлісу
shotPageSharePinterest
    .title = Pinterest-те бөлісу
shotPageShareEmail
    .title = Сілтемемен эл. пошта арқылы бөлісу
shotPageShareLink = Бұл скриншоттың бөлісу сілтемесін алу:
shotPagePrivacyMessage = Сілтемесі бар әр адам бұл скриншотты қарай алады.
shotPageCopyImageText
    .label = Сурет мәтінін көшіріп алу
shotPageConfirmDeletion = Бұл скриншотты толығымен өшіруді шынымен қалайсыз ба?
// Note: { $timediff } is a placeholder for a future relative time clause like 'in 3 days' or 'tomorrow'
shotPageExpirationMessage = Ешнәрсе жасамасаңыз, бұл скриншот { $timediff } толығымен өшіріледі.
// Note: { $date } is a placeholder for a localized future date as returned by Date.toLocaleString.
// For example, in en-US, { $date } could be "7/12/2017, 1:52:50 PM".
shotPageRestoreButton = ұзартылған { $date } дейін
shotPageExpiredMessage = Бұл скриншоттың мерзімі аяқталған.
// Note: This phrase is followed by an empty line, then the URL of the source page
shotPageExpiredMessageDetails = Бұл скриншот жасалған парақ:
shotPageDeleteButton
    .title = Бұл скриншотты өшіру
shotPageDownloadShot
    .title = Жүктеп алу
shotPageDownload = Жүктеп алу
shotPageScreenshotsDescription = Скриншоттар қарапайым түрде. Тура Firefox ішінен скриншоттарды түсіру, сақтау және олармен бөлісу.
shotPageUpsellFirefox = Firefox-ты қазір алу
shotPageKeepFor = Бұл скриншот қанша уақыт бойы сақталуы тиіс?
// Note: shotPageSelectTime is a placeholder label for the time selection dropdown.
shotPageSelectTime = Уақытты таңдау
shotPageKeepIndefinitely = Шексіз
shotPageKeepTenMinutes = 10 минут
shotPageKeepOneHour = 1 сағат
shotPageKeepOneDay = 1 күн
shotPageKeepOneWeek = 1 апта
shotPageKeepTwoWeeks = 2 апта
shotPageKeepOneMonth = 1 ай
shotPageSaveExpiration = сақтау
shotPageCancelExpiration = бас тарту
shotPageDoesNotExpire = мерзімі аяқталмайды
// Note: { $timediff } is a placeholder for a future relative time clause, like "in 1 week" or "tomorrow"
shotPageExpiresIn = мерзімі { $timediff } аяқталады
// Note: { $timediff } is a placeholder for a past relative time clause, like "1 week ago" or "yesterday"
shotPageExpired = мерзімі { $timediff } аяқталды
timeDiffJustNow = жаңа ғана
timeDiffMinutesAgo = { $num ->
       *[other] 1 минут бұрын
    }
timeDiffHoursAgo = { $num ->
       *[other] 1 сағат бұрын
    }
timeDiffDaysAgo = { $num ->
       *[other] кеше
    }
timeDiffFutureSeconds = бірнеше секундтан кейін
timeDiffFutureMinutes = { $num ->
       *[other] { $number } минуттан кейін
    }
timeDiffFutureHours = { $num ->
       *[other] { $number } сағаттан кейін
    }
timeDiffFutureDays = { $num ->
       *[other] { $number } күннен кейін
    }


[[ Shotindex page ]]

// { $status } is a placeholder for an HTTP status code, like '500'.
// { $statusText } is a text description of the status code, like 'Internal server error'.
shotIndexPageErrorDeletingShot = Скриншотты сақтау қатесі: { $status } { $statusText }
// { $searchTerm } is a placeholder for text the user typed into the search box
shotIndexPageSearchResultsTitle = Менің скрншоттарым: { $searchTerm } іздеу
// { $error } is a placeholder for a non-translated error message that could be shared
// with developers when debugging an error.
shotIndexPageErrorRendering = Парақты рендерлеу қатесі: { $error }
shotIndexPageSearchPlaceholder
    .placeholder = Менің скриншоттарымнан іздеу
shotIndexPageSearchButton
    .title = Іздеу
shotIndexPageNoShotsMessage = Сақталған скриншоттар жоқ.
shotIndexPageNoShotsInvitation = Бірнешеуін сақтаңыз.
shotIndexPageLookingForShots = Скриншоттарыңызды іздеу…
shotIndexPageNoSearchResultsIntro = Хмм
shotIndexPageNoSearchResults = Іздеуіңізге сай скриншоттар табылмады.
shotIndexPageClearSearchButton
    .title = Іздеуді тазарту
shotIndexPageConfirmShotDelete = Бұл скриншотты өшіру керек пе?


// all metrics strings are optional for translation
[[ Metrics page ]]

// Note: 'Firefox Screenshots' should not be translated
metricsPageTitle = Firefox скриншоттар метрикалары
metricsPageTotalsQueryTitle = Барлығы
// Note: Screenshots is an abbreviation for Firefox Screenshots, and should not be translated.
metricsPageTotalsQueryDescription = Скриншоттарды шолу
metricsPageTotalsQueryDevices = Барлығы тіркелген құрылғылар
metricsPageTotalsQueryActiveShots = Белсенді скриншоттар
metricsPageTotalsQueryExpiredShots = Мерзімі аяқталған (бірақ, қалпына келтіруге болатын)
metricsPageTotalsQueryExpiredDeletedShots = Мерзімі аяқталған (және өшірілген)
metricsPageShotsQueryDay = Күн
metricsPageUsersQueryCount = Пайданушылар саны
metricsPageUsersQueryDay = Күн
metricsPageUserShotsQueryCount = Пайдаланушылар саны
metricsPageRetentionQueryUsers = Пайдаланушылар саны
metricsPageTotalRetentionQueryUsers = Пайданушылар саны
metricsPageVersionQueryTitle = Қосымша нұсқасы
metricsPageVersionQueryVersion = Қосымша нұсқасы
metricsPageVersionQueryLastSeen = Күн
metricsPageHeader = Метрикалар
// Note: { $created } is a placeholder for a localized date and time, like '4/21/2017, 3:40:04 AM'
metricsPageGeneratedDateTime = Жиналған: { $created }
// Note { $time } is a placeholder for a number of milliseconds, like '100'
metricsPageDatabaseQueryTime = (дерекқор уақыты: { $time } мс)
