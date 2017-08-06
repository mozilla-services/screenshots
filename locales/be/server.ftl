// Localization for Server-side strings of Firefox Screenshots
// 
// Please don't localize Firefox, Firefox Screenshots, or Screenshots



// Global phrases shared across pages, prefixed with 'g'
[[ global ]]

gMyShots = Мае здымкі
gHomeLink = Хатняя
gNoShots
    .alt = здымкі не знойдзены
gScreenshotsDescription = Рабіць скрыншоты стала прасцей. Рабіце, захоўвайце і дзяліцеся скрыншотамі, не пакідаючы Firefox.


[[ Footer ]]

// Note: link text for a link to mozilla.org
footerLinkMozilla = Mozilla
footerLinkPrivacy = Паведамленне аб прыватнасці
footerLinkDMCA = Паведаміць аб парушэнні аўтарскіх правоў
footerLinkDiscourse = Даць водгук
footerLinkRemoveAllData = Выдаліць усе дадзеныя


[[ Creating page ]]

// Note: { $title } is a placeholder for the title of the web page
// captured in the screenshot. The default, for pages without titles, is
// creatingPageTitleDefault.
creatingPageTitle = Стварэнне { $title }
creatingPageTitleDefault = старонка


[[ Home page ]]

homePageDescription
    .content = Інтуітыўныя скрыншоты наўпрост у браўзеры. Захоплівайце, захоўвайце і дзяліцеся скрыншотамі пры праглядзе вэб-старонак з дапамогай Firefox.
homePageButtonMyShots = Перайсці да маіх здымкаў
homePageTeaser = Хутка...
homePageDownloadFirefoxTitle = Firefox
homePageDownloadFirefoxSubTitle = Сцягнуць бясплатна
homePageGetStarted = Пачаць
// Note: do not translate 'Firefox Screenshots' when translating this string
homePageHowScreenshotsWorks = Як працуе Firefox Screenshots
homePageGetStartedTitle = Пачаць
// Note: Screenshots is an abbreviation for Firefox Screenshots, and should not be translated.
homePageGetStartedDescription = Знайдзіце новы значок Screenshots на паліцы прылад. Націсніце на яго і з'явіцца меню.
homePageCaptureRegion = Захоп вобласці
homePageCapturePage = Захоп старонкі
homePageSaveShare = Захаваць і падзяліцца
homePageLegalLink = Юрыдычная інфармацыя
homePagePrivacyLink = Прыватнасць
homePageTermsLink = Умовамі выкарыстання
homePageCookiesLink = Кукі


[[ Leave Screenshots page ]]

leavePageConfirmDelete = Пацвердзіце выдаленне ўліковага запісу
// Note: do not translate 'Firefox Screenshots' when translating this string
leavePageErrorAddonRequired = Каб выдаліць уліковы запіс, у вас павінен быць усталяваны Firefox Screenshots
leavePageErrorGeneric = Здарылася памылка
leavePageButtonProceed = Працягнуць
leavePageButtonCancel = Адмяніць
leavePageDeleted = Усе вашыя здымкі былі сцёртыя!


[[ Not Found page ]]

notFoundPageTitle = Старонка не знойдзена
notFoundPageIntro = Вой!
notFoundPageDescription = Старонка не знойдзена.


[[ Shot page ]]

// This is the HTML title tag of the page
shotPageTitle = Скрыншот: { $originalTitle }
shotPageAlertErrorUpdatingExpirationTime = Памылка пры захаванні часу заканчэння
shotPageAlertErrorDeletingShot = Памылка пры выдаленні здымка
shotPageAlertErrorUpdatingTitle = Памылка захавання назвы
shotPageConfirmDelete = Вы сапраўды хочаце назаўсёды выдаліць гэты здымак?
shotPageShareButton
    .title = Падзяліцца
shotPageCopy = Капіяваць
shotPageCopied = Скапіявана
shotPageShareFacebook
    .title = Падзяліцца на Фэйсбуку
shotPageShareTwitter
    .title = Падзяліцца ў Твітары
shotPageSharePinterest
    .title = Падзяліцца ў Pinterest
shotPageShareEmail
    .title = Падзяліцца спасылкай па э-пошце
shotPageShareLink = Атрымаць публічную спасылку на гэты здымак:
shotPagePrivacyMessage = Любы, хто мае гэту спасылку, можа праглядаць гэты здымак.
shotPageCopyImageText
    .label = Капіяваць тэкст выявы
shotPageConfirmDeletion = Вы сапраўды хочаце назаўсёды выдаліць гэты здымак?
shotPageExpiredMessage = Гэты здымак пратэрмінаваны.
shotPageDeleteButton
    .title = Выдаліць гэты здымак
shotPageDownloadShot
    .title = Сцягнуць
shotPageDownload = Сцягнуць
shotPageUpsellFirefox = Атрымаць Firefox зараз
shotPageKeepFor = Як доўга будзе захоўвацца гэты здымак?
// Note: shotPageSelectTime is a placeholder label for the time selection dropdown.
shotPageSelectTime = Выберыце час
shotPageKeepIndefinitely = Бясконца
shotPageKeepTenMinutes = 10 хвілін
shotPageKeepOneHour = 1гадзіну
shotPageKeepOneDay = 1 дзень
shotPageKeepOneWeek = 1 тыдзень
shotPageKeepTwoWeeks = 2 тыдні
shotPageKeepOneMonth = 1 месяц
shotPageSaveExpiration = захаваць
shotPageCancelExpiration = адмяніць
shotPageDoesNotExpire = неабмежаваны тэрмін
// Note: { $timediff } is a placeholder for a future relative time clause, like "in 1 week" or "tomorrow"
shotPageExpiresIn = тэрмін захоўвання мінае { $timediff }
// Note: { $timediff } is a placeholder for a past relative time clause, like "1 week ago" or "yesterday"
shotPageExpired = тэрмін захоўвання скончыўся { $timediff }
timeDiffJustNow = толькі што
timeDiffFutureSeconds = праз некалькі секунд


[[ Shotindex page ]]

// { $status } is a placeholder for an HTTP status code, like '500'.
// { $statusText } is a text description of the status code, like 'Internal server error'.
shotIndexPageErrorDeletingShot = Памылка выдалення здымку: { $status } { $statusText }
// { $searchTerm } is a placeholder for text the user typed into the search box
shotIndexPageSearchResultsTitle = Мае здымкі: пошук { $searchTerm }
// { $error } is a placeholder for a non-translated error message that could be shared
// with developers when debugging an error.
shotIndexPageErrorRendering = Памылка рэндэрынгу старонкі: { $error }
shotIndexPageSearchPlaceholder
    .placeholder = Пошук маіх здымкаў
shotIndexPageSearchButton
    .title = Пошук
shotIndexPageNoShotsMessage = Няма захаваных здымкаў.
shotIndexPageNoShotsInvitation = Давайце, стварыце некалькі.
shotIndexPageLookingForShots = Пошук вашых здымкаў…
shotIndexPageNoSearchResultsIntro = Хмм
shotIndexPageNoSearchResults = Мы не можам знайсці здымкі па вашаму запыту.
shotIndexPageClearSearchButton
    .title = Ачысціць пошук
shotIndexPageConfirmShotDelete = Выдаліць гэты здымак?


// all metrics strings are optional for translation
[[ Metrics page ]]

// Note: 'Firefox Screenshots' should not be translated
metricsPageTitle = Метрыкі Firefox Screenshots
metricsPageTotalsQueryTitle = Вынікі
// Note: Screenshots is an abbreviation for Firefox Screenshots, and should not be translated.
metricsPageTotalsQueryDescription = Агляд Screenshots
metricsPageTotalsQueryDevices = Усяго зарэгістраваных прылад
metricsPageTotalsQueryActiveShots = Актыўныя здымкі
metricsPageTotalsQueryExpiredDeletedShots = Тэрмін захоўвання мінуў (здымак выдалены)
metricsPageShotsQueryTitle = Здымкаў у дзень
metricsPageShotsQueryDescription = Колькасць здымкаў, створаных за кожны дзень (за апошнія 30 дзён)
metricsPageShotsQueryCount = Колькасць здымкаў
metricsPageShotsQueryDay = Дзень
metricsPageUsersQueryTitle = Карыстальнікаў у дзень
metricsPageUsersQueryDescription = Колькасць карыстальнікаў, якія стварылі хаця б адзін здымак за дзень (30 дзён)
metricsPageUsersQueryCount = Колькасць карыстальнікаў
metricsPageUsersQueryDay = Дзень
metricsPageUserShotsQueryTitle = Колькасць здымкаў на карыстальніка
metricsPageUserShotsQueryDescription = Колькасць карыстальнікаў, якія зрабілі ўсяго каля N здымкаў
metricsPageUserShotsQueryCount = Колькасць карыстальнікаў
metricsPageUserShotsQueryShots = Прыкладная колькасць актыўных здымкаў (тэрмін захоўвання якіх не мінуў)
metricsPageRetentionQueryTitle = Захаванняў за тыдзень
metricsPageRetentionQueryDescription = Колькасць дзён ад першага здымка карыстальніка да апошняга, згрупаваныя па пачаткам тыдня
metricsPageRetentionQueryUsers = Колькасць карыстальнікаў
metricsPageRetentionQueryDays = Дзён ад першага да апошняга здымка карыстальніка
metricsPageRetentionQueryFirstWeek = Тыдзень, на якім карыстальнік стварыў першы здымак
metricsPageTotalRetentionQueryTitle = Агульная колькасць
metricsPageTotalRetentionQueryDescription = Час, які карыстальнікі марнуюць на стварэнне здымкаў, згрупаваны па тыднях
metricsPageTotalRetentionQueryUsers = Колькасць карыстальнікаў
metricsPageTotalRetentionQueryDays = Дні, у якія карыстальнік ствараў здымкі
metricsPageVersionQueryTitle = Версія дадатка
metricsPageVersionQueryDescription = Версія дадатку, якая выкарыстоўваецца пры ўваходзе, за апошнія 14 дзён
metricsPageVersionQueryUsers = Колькасць карыстальнікаў, якія ўваходзяць
metricsPageVersionQueryVersion = Версія дадатка
metricsPageVersionQueryLastSeen = Дзень
metricsPageHeader = Метрыкі
