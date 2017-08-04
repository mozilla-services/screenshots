// Localization for Server-side strings of Firefox Screenshots
// 
// Please don't localize Firefox, Firefox Screenshots, or Screenshots



// Global phrases shared across pages, prefixed with 'g'
[[ global ]]

gMyShots = Мої знімки
gHomeLink = Домівка
gNoShots
    .alt = Знімків не знайдено
gScreenshotsDescription = Знімки стали простішими. Робіть, зберігайте й діліться знімками екрану, не покидаючи Firefox.


[[ Footer ]]

// Note: link text for a link to mozilla.org
footerLinkMozilla = Mozilla
footerLinkPrivacy = Повідомлення про приватність
footerLinkDMCA = Повідомити про порушення прав
footerLinkDiscourse = Залишити відгук
footerLinkRemoveAllData = Видалити всі дані


[[ Creating page ]]

// Note: { $title } is a placeholder for the title of the web page
// captured in the screenshot. The default, for pages without titles, is
// creatingPageTitleDefault.
creatingPageTitle = Створення { $title }
creatingPageTitleDefault = сторінка


[[ Home page ]]

homePageDescription
    .content = Прості знімки рпямо в браузері. Робіть, зберігайте й діліться знімками екрану під час роботи в Інтернеті з Firefox.
homePageButtonMyShots = Перейти до моїх знімків
homePageTeaser = Скоро...
homePageDownloadFirefoxTitle = Firefox
homePageDownloadFirefoxSubTitle = Безплатне завантаження
homePageGetStarted = Початок роботи
// Note: do not translate 'Firefox Screenshots' when translating this string
homePageHowScreenshotsWorks = Як працює Firefox Screenshots
homePageGetStartedTitle = Початок роботи
// Note: Screenshots is an abbreviation for Firefox Screenshots, and should not be translated.
homePageGetStartedDescription = Знайдіть нову піктограму знімків екрану в панелі інструментів. Натисніть на неї і з'явиться меню.
homePageCaptureRegion = Захопити область
// Note: Screenshots is an abbreviation for Firefox Screenshots, and should not be translated.
homePageCaptureRegionDescription = Натисніть і потягніть, щоб вибрати область для знімку. Або просто наведіть і клацніть мишею — буде обрано область. Якщо знімок вам подобається, натисніть Зберегти, щоб отримати доступ до своїх знімків в мережі, або стрілку вниз для завантаження на комп'ютер.
homePageCapturePage = Захопити сторінку
homePageCapturePageDescription = Використовуйте кнопки справа вгорі для захоплення цілих сторінок. Кнопка Зберегти видиму область захопить область, яку видно без прокручування, а кнопка Зберегти всю сторінку захопить сторінку повністю.
homePageSaveShare = Зберегти й поділитися
// Note: Screenshots is an abbreviation for Firefox Screenshots, and should not be translated.
homePageSaveShareDescription = Коли ви робите знімок, Firefox публікує їх у вашій мережевій бібліотеці й копіює посилання до буфера обміну. Ми автоматично зберігаємо ваші знімки екрану протягом двох тижнів, але ви можете видалити їх в будь-який час, або змінити час зберігання на довший.
homePageLegalLink = Юридична інформація
homePagePrivacyLink = Приватність
homePageTermsLink = Умови
homePageCookiesLink = Куки


[[ Leave Screenshots page ]]

leavePageConfirmDelete = Підтвердити видалення облікового запису
// Note: do not translate 'Firefox Screenshots' when translating this string
leavePageErrorAddonRequired = У вас має бути встановлений Firefox Screenshots, щоб видалити ваш обліковий запис
leavePageErrorGeneric = Сталася помилка
// Note: do not translate 'Firefox Screenshots' when translating this string
leavePageWarning = Ця дія назавжди видалить усі ваші дані Firefox Screenshots.
leavePageButtonProceed = Продовжити
leavePageButtonCancel = Скасувати
leavePageDeleted = Усі ваші знімки були стерті!


[[ Not Found page ]]

notFoundPageTitle = Сторінку не знайдено
notFoundPageIntro = Отакої.
notFoundPageDescription = Сторінку не знайдено.


[[ Shot page ]]

// This is the HTML title tag of the page
shotPageTitle = Знімок екрану: { $originalTitle }
shotPageAlertErrorDeletingShot = Помилка під час видалення знімку
shotPageAlertErrorUpdatingTitle = Помилка збереження назви
shotPageShareButton
    .title = Поділітися
shotPageCopy = Копіювати
shotPageCopied = Скопійовано
shotPageCopyImageText
    .label = Копіювати текст зображення
shotPageConfirmDeletion = Ви впевнені, що хочете назавжди видалити цей знімок?
// Note: { $timediff } is a placeholder for a future relative time clause like 'in 3 days' or 'tomorrow'
shotPageExpirationMessage = Якщо ви нічого не будете робити, знімок буде видалений назавжди { $timediff }.
// Note: { $date } is a placeholder for a localized future date as returned by Date.toLocaleString.
// For example, in en-US, { $date } could be "7/12/2017, 1:52:50 PM".
shotPageRestoreButton = подовжено до { $date }
shotPageExpiredMessage = Термін зберігання знімку скінчився.
shotPageDeleteButton
    .title = Видалити цей знімок
shotPageDownloadShot
    .title = Завантажити
shotPageDownload = Завантажити
shotPageUpsellFirefox = Отримати Firefox
// Note: shotPageSelectTime is a placeholder label for the time selection dropdown.
shotPageSelectTime = Виберіть час
shotPageKeepIndefinitely = Нескінченно
shotPageKeepTenMinutes = 10 хвилин
shotPageKeepOneHour = 1 година
shotPageKeepOneDay = 1 день
shotPageKeepOneWeek = 1 тиждень
shotPageKeepTwoWeeks = 2 тижні
shotPageKeepOneMonth = 1 місяць
shotPageSaveExpiration = зберегти
shotPageCancelExpiration = скасувати
shotPageDoesNotExpire = необмежений строк
// Note: { $timediff } is a placeholder for a future relative time clause, like "in 1 week" or "tomorrow"
shotPageExpiresIn = спливає { $timediff }
// Note: { $timediff } is a placeholder for a past relative time clause, like "1 week ago" or "yesterday"
shotPageExpired = сплив { $timediff }
timeDiffJustNow = щойно
timeDiffMinutesAgo = { $num ->
        [one] хвилину тому
        [few] { $number } хвилини тому
       *[other] { $number } хвилин тому
    }
timeDiffHoursAgo = { $num ->
        [one] годину тому
        [few] { $number } години тому
       *[other] { $number } годин тому
    }
timeDiffDaysAgo = { $num ->
        [one] вчора
        [few] { $number } дні тому
       *[other] { $number } днів тому
    }
timeDiffFutureSeconds = за кілька секунд
timeDiffFutureMinutes = { $num ->
        [one] за хвилину
        [few] за { $number } хвилини
       *[other] за { $number } хвилин
    }
timeDiffFutureHours = { $num ->
        [one] за годину
        [few] за { $number } години
       *[other] за { $number } годин
    }
timeDiffFutureDays = { $num ->
        [one] завтра
        [few] за { $number } дні
       *[other] за { $number } днів
    }


[[ Shotindex page ]]

// { $status } is a placeholder for an HTTP status code, like '500'.
// { $statusText } is a text description of the status code, like 'Internal server error'.
shotIndexPageErrorDeletingShot = Помилка видалення знімку: { $status } { $statusText }
// { $searchTerm } is a placeholder for text the user typed into the search box
shotIndexPageSearchResultsTitle = Мої знімки: пошук { $searchTerm }
// { $error } is a placeholder for a non-translated error message that could be shared
// with developers when debugging an error.
shotIndexPageErrorRendering = Помилка обробки сторінки: { $error }
shotIndexPageSearchPlaceholder
    .placeholder = Пошук моїх знімків
shotIndexPageSearchButton
    .title = Пошук
shotIndexPageNoShotsMessage = Немає збережених знімків.
shotIndexPageNoShotsInvitation = Нужбо, створіть кілька.
shotIndexPageLookingForShots = Шукаємо ваші знімки...
shotIndexPageNoSearchResultsIntro = Хмм
shotIndexPageNoSearchResults = Ми не можемо знайти знімки за вашим запитом.
shotIndexPageClearSearchButton
    .title = Очистити пошук
shotIndexPageConfirmShotDelete = Видалити цей знімок?


// all metrics strings are optional for translation
[[ Metrics page ]]

// Note: 'Firefox Screenshots' should not be translated
metricsPageTitle = Метрики Firefox Screenshots
metricsPageTotalsQueryTitle = Разом
// Note: Screenshots is an abbreviation for Firefox Screenshots, and should not be translated.
metricsPageTotalsQueryDescription = Огляд Screenshots
metricsPageTotalsQueryDevices = Всього зареєстрованих пристроїв
metricsPageTotalsQueryActiveShots = Активні знімки
metricsPageShotsQueryTitle = Знімків на день
metricsPageShotsQueryDescription = Кількість знімків, створених за кожен день (за останні 30 днів)
metricsPageShotsQueryCount = Кількість знімків
metricsPageShotsQueryDay = День
metricsPageUsersQueryTitle = Користувачів за день
metricsPageUsersQueryDescription = Кількість користувачів, які створили хоча б один знімок, за день (останні 30 днів)
metricsPageUsersQueryCount = Кількість користувачів
metricsPageUsersQueryDay = День
metricsPageUserShotsQueryTitle = Кількість знімків на користувача
metricsPageUserShotsQueryCount = Кількість користувачів
metricsPageRetentionQueryUsers = Кількість користувачів
metricsPageTotalRetentionQueryTitle = Загальна кількість
metricsPageTotalRetentionQueryUsers = Кількість користувачів
metricsPageVersionQueryTitle = Версія додатку
metricsPageVersionQueryLastSeen = День
metricsPageHeader = Метрика
// Note: { $created } is a placeholder for a localized date and time, like '4/21/2017, 3:40:04 AM'
metricsPageGeneratedDateTime = Згенеровано: { $created }
// Note { $time } is a placeholder for a number of milliseconds, like '100'
metricsPageDatabaseQueryTime = (час бази даних: { $time }мс)
