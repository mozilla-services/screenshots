### Localization for Server-side strings of Firefox Screenshots
### Please don't localize Firefox, Firefox Screenshots, or Screenshots


## Global phrases shared across pages, prefixed with 'g'

gMyShots = Мої знімки
gHomeLink = Домівка
gNoShots =
    .alt = Знімків не знайдено
gScreenshotsDescription = Знімки стали простішими. Робіть, зберігайте й діліться знімками екрану, не покидаючи Firefox.

## Footer

# Note: link text for a link to mozilla.org
footerLinkMozilla = Mozilla
footerLinkTerms = Умови
footerLinkPrivacy = Повідомлення про приватність
footerLinkFaqs = ЧаП
footerLinkDMCA = Повідомити про порушення прав
footerLinkDiscourse = Залишити відгук
footerLinkRemoveAllData = Видалити всі дані

## Creating page

# Note: { $title } is a placeholder for the title of the web page
# captured in the screenshot. The default, for pages without titles, is
# creatingPageTitleDefault.
creatingPageTitle = Створення { $title }
creatingPageTitleDefault = сторінка
creatingPageWaitMessage = Зберігаємо ваш знімок…

## Home page

homePageDescription =
    .content = Прості знімки прямо в браузері. Робіть, зберігайте й діліться знімками екрану під час роботи в Інтернеті з Firefox.
homePageButtonMyShots = Перейти до моїх знімків
homePageTeaser = Скоро...
homePageDownloadFirefoxTitle = Firefox
homePageDownloadFirefoxSubTitle = Безплатне завантаження
homePageGetStarted = Початок роботи
# Note: do not translate 'Firefox Screenshots' when translating this string
homePageHowScreenshotsWorks = Як працює Firefox Screenshots
homePageGetStartedTitle = Початок роботи
# Note: Screenshots is an abbreviation for Firefox Screenshots, and should not be translated.
homePageGetStartedDescription = Знайдіть нову піктограму знімків екрану в панелі інструментів. Натисніть на неї і з'явиться меню.
# Note: Screenshots is an abbreviation for Firefox Screenshots, and should not be translated.
homePageGetStartedDescriptionPageAction = Оберіть піктограму Screenshots в меню дій для сторінки в панелі адреси і перед вами з'явиться меню Screenshots.
homePageCaptureRegion = Захопити область
# Note: Screenshots is an abbreviation for Firefox Screenshots, and should not be translated.
homePageCaptureRegionDescription = Натисніть і потягніть, щоб вибрати область для знімку. Або просто наведіть і клацніть мишею — буде обрано область. Якщо знімок вам подобається, натисніть Зберегти, щоб отримати доступ до своїх знімків в мережі, або стрілку вниз для завантаження на комп'ютер.
homePageCapturePage = Захопити сторінку
homePageCapturePageDescription = Використовуйте кнопки справа вгорі для захоплення цілих сторінок. Кнопка Зберегти видиму область захопить область, яку видно без прокручування, а кнопка Зберегти всю сторінку захопить сторінку повністю.
homePageSaveShare = Зберегти й поділитися
# Note: Screenshots is an abbreviation for Firefox Screenshots, and should not be translated.
homePageSaveShareDescription = Коли ви робите знімок, Firefox публікує їх у вашій мережевій бібліотеці й копіює посилання до буфера обміну. Ми автоматично зберігаємо ваші знімки екрану протягом двох тижнів, але ви можете видалити їх в будь-який час, або змінити час зберігання на довший.
homePageLegalLink = Юридична інформація
homePagePrivacyLink = Приватність
homePageTermsLink = Умови
homePageCookiesLink = Куки

## Leave Screenshots page

leavePageRemoveAllData = Видалити усі дані
# Note: do not translate 'Firefox Screenshots' when translating this string
leavePageErrorAddonRequired = Щоб видалити обліковий запис, у вас повинен бути встановлений Firefox Screenshots
leavePageErrorGeneric = Сталася помилка
# Note: do not translate 'Firefox Screenshots' when translating this string
leavePageWarning = Ця дія назавжди видалить усі ваші дані Firefox Screenshots.
leavePageButtonProceed = Продовжити
leavePageButtonCancel = Скасувати
leavePageDeleted = Усі ваші знімки були стерті!

## Not Found page

notFoundPageTitle = Сторінку не знайдено
notFoundPageIntro = Отакої.
notFoundPageDescription = Сторінку не знайдено.

## Shot page

# This is the HTML title tag of the page
shotPageTitle = Знімок екрану: { $originalTitle }
shotPageAlertErrorUpdatingExpirationTime = Помилка при збереженні терміну зберігання
shotPageAlertErrorDeletingShot = Помилка при видаленні знімку
shotPageAlertErrorUpdatingTitle = Помилка при збереженні назви
shotPageConfirmDelete = Ви впевнені, що хочете назавжди видалити цей знімок?
shotPageShareButton =
    .title = Поділитися
shotPageCopy = Копіювати
shotPageCopied = Скопійовано
shotPageShareFacebook =
    .title = Поділитися на Facebook
shotPageShareTwitter =
    .title = Поділитися у Twitter
shotPageSharePinterest =
    .title = Поділитися на Pinterest
shotPageShareEmail =
    .title = Поділитися через електронну пошту
shotPageShareLink = Отримати публічне посилання на цей знімок:
shotPagePrivacyMessage = Будь-хто, хто має це посилання, може переглядати цей знімок.
shotPageCopyImageText =
    .label = Копіювати текст зображення
shotPageConfirmDeletion = Ви впевнені, що хочете назавжди видалити цей знімок?
# Note: { $timediff } is a placeholder for a future relative time clause like 'in 3 days' or 'tomorrow'
shotPageExpirationMessage = Якщо ви нічого не будете робити, знімок буде видалений назавжди { $timediff }.
# Note: { $date } is a placeholder for a localized future date as returned by Date.toLocaleString.
# For example, in en-US, { $date } could be "7/12/2017, 1:52:50 PM".
shotPageRestoreButton = подовжено до { $date }
shotPageExpiredMessage = Термін зберігання знімку скінчився.
# Note: This phrase is followed by an empty line, then the URL of the source page
shotPageExpiredMessageDetails = Сторінка, з якої створений цей знімок:
shotPageDeleteButton =
    .title = Видалити цей знімок
shotPageAbuseButton =
    .title = Цей знімок образливий, є спамом. чи має інші проблеми
shotPageDownloadShot =
    .title = Завантажити
shotPageEditButton =
    .title = Редагувати це зображення
shotPageDownload = Завантажити
shotPageScreenshotsDescription = Знімки екрану стали простими. Робіть, зберігайте і поширюйте знімки екрану, не залишаючи Firefox.
shotPageUpsellFirefox = Отримати Firefox
shotPageDMCAMessage = Цей знімок більше недоступний через порушення авторських прав третьої сторони.
# Note: { $dmca } is a placeholder for a link to send email (a 'mailto' link)
shotPageDMCAContact = Будь ласка, напишіть на { $dmca }, щоб запитати додаткову інформацію.
# Note: do not translate 'Firefox Screenshots' when translating this string
shotPageDMCAWarning = Якщо на ваші знімки поскаржилися кілька разів, ми можемо заблокувати вам доступ до Firefox Screenshots.
# Note: { $url } is a placeholder for a shot page URL
shotPageDMCAIncludeLink = Будь ласка, додайте до вашого листа посилання на цей знімок: { $url }
shotPageKeepFor = Як довго буде зберігатися цей знімок?
# Note: shotPageSelectTime is a placeholder label for the time selection dropdown.
shotPageSelectTime = Виберіть час
# The ∞ is used to indicate that the shot won't expire. It is also used in
# shotIndexNoExpirationSymbol. Try to use the same symbol in both strings, or
# if no such symbol is available for a language/culture, simply leave it out.
shotPageKeepIndefinitelyWithSymbol = Необмежено ∞
shotPageKeepTenMinutes = 10 хвилин
shotPageKeepOneHour = 1 година
shotPageKeepOneDay = 1 день
shotPageKeepOneWeek = 1 тиждень
shotPageKeepTwoWeeks = 2 тижні
shotPageKeepOneMonth = 1 місяць
shotPageSaveExpiration = зберегти
shotPageCancelExpiration = скасувати
shotPageDoesNotExpire = необмежений строк
# Note: { $timediff } is a placeholder for a future relative time clause, like "in 1 week" or "tomorrow"
shotPageExpiresIn = спливає { $timediff }
# Note: { $timediff } is a placeholder for a past relative time clause, like "1 week ago" or "yesterday"
shotPageExpired = сплив { $timediff }
timeDiffJustNow = щойно
timeDiffMinutesAgo =
    { $number ->
        [one] хвилину тому
        [few] { $number } хвилини тому
       *[other] { $number } хвилин тому
    }
timeDiffHoursAgo =
    { $number ->
        [one] годину тому
        [few] { $number } години тому
       *[other] { $number } годин тому
    }
timeDiffDaysAgo =
    { $number ->
        [one] вчора
        [few] { $number } дні тому
       *[other] { $number } днів тому
    }
timeDiffFutureSeconds = за кілька секунд
timeDiffFutureMinutes =
    { $number ->
        [one] за хвилину
        [few] за { $number } хвилини
       *[other] за { $number } хвилин
    }
timeDiffFutureHours =
    { $number ->
        [one] за годину
        [few] за { $number } години
       *[other] за { $number } годин
    }
timeDiffFutureDays =
    { $number ->
        [one] завтра
        [few] за { $number } дні
       *[other] за { $number } днів
    }
errorThirdPartyCookiesEnabled = Якщо ви зробили цей знімок і не можете його видалити, можливо, вам слід тимчасово увімкнути сторонні куки в налаштуваннях браузера.

## Annotations

annotationPenButton =
    .title = Олівець
annotationHighlighterButton =
    .title = Маркер
# Note: This button reverts all the changes on the image since the start of the editing session.
annotationClearButton =
    .title = Очистити
annotationCropButton =
    .title = Обрізати
annotationSaveEditButton = Зберегти
    .title = Зберегти зміни
annotationCancelEditButton = Скасувати
    .title = Скасувати зміни
annotationCropConfirmButton = Підтвердити
    .title = Підтвердити вибір
annotationCropCancelButton = Скасувати
    .title = Скасувати вибір
annotationColorWhite =
    .title = Білий
annotationColorBlack =
    .title = Чорний
annotationColorRed =
    .title = Червоний
annotationColorGreen =
    .title = Зелений
annotationColorBlue =
    .title = Блакитний
annotationColorYellow =
    .title = Жовтий
annotationColorPurple =
    .title = Бузковий
annotationColorSeaGreen =
    .title = Зелений чай
annotationColorGrey =
    .title = Сірий

## Settings Page

settingsDisconnectButton = Від'єднатися
    .title = Від'єднатися
settingsGuestAccountMessage = Обліковий запис гостя
settingsSignInInvite = Увійдіть для синхронізації на всіх пристроях
settingsSignInButton = Увійти
    .title = Увійти
SettingsPageHeader = Налаштування Firefox Screenshots
settingsDescription = Ви можете увійти з обліковим записом Firefox для синхронізації усіх знімків між різними пристроями.
settingsPageSubHeader = Синхронізація й Облікові записи
settingsClosePreferences =
    .title = Закрити налаштування

## Shotindex page

# { $status } is a placeholder for an HTTP status code, like '500'.
# { $statusText } is a text description of the status code, like 'Internal server error'.
shotIndexPageErrorDeletingShot = Помилка видалення знімку: { $status } { $statusText }
# { $searchTerm } is a placeholder for text the user typed into the search box
shotIndexPageSearchResultsTitle = Мої знімки: пошук { $searchTerm }
# { $error } is a placeholder for a non-translated error message that could be shared
# with developers when debugging an error.
shotIndexPageErrorRendering = Помилка обробки сторінки: { $error }
shotIndexPageSearchPlaceholder =
    .placeholder = Пошук моїх знімків
shotIndexPageSearchButton =
    .title = Пошук
shotIndexPageNoShotsMessage = Немає збережених знімків.
shotIndexPageNoShotsInvitation = Ну ж бо, створіть кілька.
shotIndexPageLookingForShots = Шукаємо ваші знімки...
shotIndexPageNoSearchResultsIntro = Хмм
shotIndexPageNoSearchResults = Ми не можемо знайти знімки за вашим запитом.
shotIndexPageClearSearchButton =
    .title = Очистити пошук
shotIndexPageConfirmShotDelete = Видалити цей знімок?
shotIndexPagePreviousPage =
    .title = Попередня сторінка
shotIndexPageNextPage =
    .title = Наступна сторінка
# This symbol is used in the lower right corner of the card for a shot on the
# My Shots page to indicate that the shot does not expire. It should be a
# single character (or simply nothing if no such symbol is available for a
# language/culture).
shotIndexNoExpirationSymbol = ∞
    .title = Цей знімок зберігається необмежено

## Metrics page
## All metrics strings are optional for translation

# Note: 'Firefox Screenshots' should not be translated
metricsPageTitle = Метрики Firefox Screenshots
metricsPageTotalsQueryTitle = Разом
# Note: Screenshots is an abbreviation for Firefox Screenshots, and should not be translated.
metricsPageTotalsQueryDescription = Огляд Screenshots
metricsPageTotalsQueryDevices = Всього зареєстрованих пристроїв
metricsPageTotalsQueryActiveShots = Активні знімки
metricsPageTotalsQueryExpiredShots = Термін зберігання сплив (можна відновити)
metricsPageTotalsQueryExpiredDeletedShots = Термін зберігання сплив (знімок видалено)
metricsPageShotsQueryTitle = Знімків на день
metricsPageShotsQueryDescription = Кількість знімків, створених за кожен день (за останні 30 днів)
metricsPageShotsQueryCount = Кількість знімків
metricsPageShotsQueryDay = День
metricsPageUsersQueryTitle = Користувачів за день
metricsPageUsersQueryDescription = Кількість користувачів, які створили хоча б один знімок, за день (останні 30 днів)
metricsPageUsersQueryCount = Кількість користувачів
metricsPageUsersQueryDay = День
metricsPageUserShotsQueryTitle = Кількість знімків на користувача
metricsPageUserShotsQueryDescription = Кількість користувачів, які зробили загалом близько N знімків
metricsPageUserShotsQueryCount = Кількість користувачів
metricsPageUserShotsQueryShots = Приблизна кількість активних знімків (термін зберігання яких не сплив)
metricsPageRetentionQueryTitle = Збережень за тиждень
metricsPageRetentionQueryDescription = Кількість днів від першого знімка користувача до останнього, згруповано за початком тижня
metricsPageRetentionQueryUsers = Кількість користувачів
metricsPageRetentionQueryDays = Днів від першого до останнього знімка користувача
metricsPageRetentionQueryFirstWeek = Тиждень, на якому користувач створив перший знімок
metricsPageTotalRetentionQueryTitle = Загальна кількість
metricsPageTotalRetentionQueryDescription = Час, який користувачі витрачають на створення знімків, згрупований по тижнях
metricsPageTotalRetentionQueryUsers = Кількість користувачів
metricsPageTotalRetentionQueryDays = Дні, в які користувач створював знімки екрану
metricsPageVersionQueryTitle = Версія додатку
metricsPageVersionQueryDescription = Версія додатку, що використовується під час входу, за останні 14 днів
metricsPageVersionQueryUsers = Кількість користувачів, що входять
metricsPageVersionQueryVersion = Версія додатку
metricsPageVersionQueryLastSeen = День
metricsPageHeader = Метрики
# Note: { $created } is a placeholder for a localized date and time, like '4/21/2017, 3:40:04 AM'
metricsPageGeneratedDateTime = Згенеровано: { $created }
# Note { $time } is a placeholder for a number of milliseconds, like '100'
metricsPageDatabaseQueryTime = (час бази даних: { $time }мс)
