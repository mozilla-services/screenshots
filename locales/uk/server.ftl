### Localization for Server-side strings of Firefox Screenshots
### Please don't localize Firefox, Firefox Screenshots, or Screenshots


## Global phrases shared across pages, prefixed with 'g'

gMyShots = Мої знімки
gHomeLink = Домівка
gNoShots =
    .alt = Знімків не знайдено
gScreenshotsDescription = Знімки стали простішими. Робіть, зберігайте й діліться знімками екрану, не покидаючи Firefox.
gSettings = Налаштування
gSignIn = Вхід

## Header

buttonSettings =
    .title = Налаштування
buttonSignIn =
    .title = Увійти
screenshotsLogo =
    .title = Домівка Screenshots
bannerMessage = Зареєструйтеся або увійдіть, щоб мати доступ до знімків на всіх пристроях та зберігати обрані назавжди.
bannerUpsell = { gScreenshotsDescription } <a>Отримати Firefox</a>

## Footer

# Note: link text for a link to mozilla.org
footerLinkMozilla = Mozilla
footerLinkTerms = Умови
footerLinkPrivacy = Повідомлення про приватність
footerReportShot = Повідомити про знімок
    .title = Повідомити про порушення, спам чи інші проблеми з цим знімком.
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
shotPageCopyButton =
    .title = Копіювати зображення в буфер обміну
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
# Note: <timediff></timediff> is a placeholder for a future relative time clause like 'in 3 days' or 'tomorrow'
shotPageTimeExpirationMessage = Якщо ви нічого не будете робити, знімок буде видалений назавжди <timediff></timediff>.
# Note: { $date } is a placeholder for a localized future date as returned by Date.toLocaleString.
# For example, in en-US, { $date } could be "7/12/2017, 1:52:50 PM".
shotPageRestoreButton = подовжено до { $date }
shotPageExpiredMessage = Термін зберігання знімку скінчився.
# Note: This phrase is followed by an empty line, then the URL of the source page
shotPageExpiredMessageDetails = Сторінка, з якої створений цей знімок:
shotPageDeleteButton =
    .title = Видалити цей знімок
shotPageDownloadShot =
    .title = Завантажити
shotPageEditButton =
    .title = Редагувати це зображення
shotPagefavoriteButton =
    .title = Додати знімок до обраних
shotPageBackToHomeButton =
    .title = Домівка
shotPageAllShotsButton =
    .title = Всі знімки
shotPageAllShots = Всі знімки
shotPageDownload = Завантажити
# Note: Draw text is used on shot page as a verb (action)
shotPageDraw = Малювати
# Note: Favorite text is used on shot page as a verb (action)
shotPageFavorite = Обране
shotPageDelete = Видалити
shotPageScreenshotsDescription = Знімки екрану стали простими. Робіть, зберігайте і поширюйте знімки екрану, не залишаючи Firefox.
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
# Note: <timediff></timediff> is a placeholder for a future relative time clause, like "in 1 week" or "tomorrow"
shotPageTimeExpiresIn = спливає <timediff></timediff>
# Note: <timediff></timediff> is a placeholder for a past relative time clause, like "1 week ago" or "yesterday"
shotPageTimeExpired = сплив <timediff></timediff>
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

## Shot Page New Feature Promotion Dialog.

# Note: If possible, choose a short translation to better fit into the card.
promoTitle = Робіть примітки!
promoMessage = Оновлені засоби редагування дозволяють обрізати, підсвічувати та навіть додавати текст до знімків.
promoLink = Спробуйте
promoCloseButton =
    .title = Закрити сповіщення

## Annotations

annotationPenButton =
    .title = Олівець
annotationHighlighterButton =
    .title = Маркер
annotationUndoButton =
    .title = Скасувати
annotationRedoButton =
    .title = Повторити
annotationTextButton =
    .title = Додати текст
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
# Note: annotationTextSize is a title for text size selection dropdown.
annotationTextSize =
    .title = Розмір тексту
# Values shown in text size selection dropdown
textSizeSmall = Малий
textSizeMedium = Середній
textSizeLarge = Великий
# Confirm and Cancel button title shown when using text tool
textToolConfirmButton = Підтвердити
    .title = Підтвердити
textToolCancelButton = Скасувати
    .title = Скасувати
# Default placeholder used in input field when adding text annotations
textToolInputPlaceholder =
    .placeholder = Привіт

## The following are the title and message for an error displayed as a Firefox
## notification. It is triggered by an action in the shot page and the strings
## are passed from the shot page to the addon.

copyImageErrorTitle = Щось пішло не так
copyImageErrorMessage = Не вдалося скопіювати ваш знімок в буфер обміну.

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
shotIndexPageNoShotsMessage = Немає збережених знімків.
shotIndexPageNoShotsInvitation = Ну ж бо, створіть кілька.
shotIndexPageLookingForShots = Шукаємо ваші знімки...
shotIndexPageNoSearchResultsIntro = Хмм
shotIndexPageNoSearchResults = Ми не можемо знайти знімки за вашим запитом.
shotIndexPageMyShotsButton =
    .title = Мої знімки
shotIndexPageClearSearchButton =
    .title = Очистити пошук
shotIndexPageConfirmShotDelete = Видалити цей знімок?
shotIndexPagePreviousPage =
    .title = Попередня сторінка
shotIndexPageNextPage =
    .title = Наступна сторінка
# This is tooltip for a "blank heart" symbol used in the upper top corner of the card for a shot on the
# My Shots page to indicate that the shot does expire.
shotIndexNonFavoriteIcon =
    .title = Це не обраний знімок, тому він має обмежений термін зберігання
# This is the tooltip for a "heart" symbol in the upper top corner of the
# card for a shot on the My Shots page. It indicate that the shot was marked as
# a favorite by the owner.
shotIndexFavoriteIcon =
    .title = Це обраний знімок, тому він має необмежений термін дії
shotIndexSyncedShot =
    .title = Знімок зроблено на іншому пристрої

## Delete Confirmation Dialog

shotDeleteConfirmationMessage = Ви дійсно хочете видалити цей знімок?
shotDeleteCancel = Скасувати
    .title = Скасувати
shotDeleteConfirm = Видалити
    .title = Видалити

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
