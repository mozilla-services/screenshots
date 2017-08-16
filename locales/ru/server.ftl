// Localization for Server-side strings of Firefox Screenshots
// 
// Please don't localize Firefox, Firefox Screenshots, or Screenshots



// Global phrases shared across pages, prefixed with 'g'
[[ global ]]

gMyShots = Мои снимки
gHomeLink = Дом
gNoShots
    .alt = снимков не найдено
gScreenshotsDescription = Скриншоты стали простыми. Делайте, сохраняйте и делитесь скриншотами, не покидая Firefox.


[[ Footer ]]

// Note: link text for a link to mozilla.org
footerLinkMozilla = Mozilla
footerLinkTerms = Условия использования
footerLinkPrivacy = Уведомление о приватности
footerLinkDMCA = Сообщить о нарушении авторских прав
footerLinkDiscourse = Оставить отзыв
footerLinkRemoveAllData = Удалить все данные


[[ Creating page ]]

// Note: { $title } is a placeholder for the title of the web page
// captured in the screenshot. The default, for pages without titles, is
// creatingPageTitleDefault.
creatingPageTitle = Создание { $title }
creatingPageTitleDefault = страница
creatingPageWaitMessage = Сохранение вашего снимка…


[[ Home page ]]

homePageDescription
    .content = Простые скриншоты прямо в браузере. Захватывайте, сохраняйте и делитесь скриншотами, когда просматриваете Интернет с помощью Firefox.
homePageButtonMyShots = Перейти к моим снимкам
homePageTeaser = Скоро…
homePageDownloadFirefoxTitle = Firefox
homePageDownloadFirefoxSubTitle = Бесплатная загрузка
homePageGetStarted = Начать
// Note: do not translate 'Firefox Screenshots' when translating this string
homePageHowScreenshotsWorks = Как работает Firefox Screenshots
homePageGetStartedTitle = Начать
// Note: Screenshots is an abbreviation for Firefox Screenshots, and should not be translated.
homePageGetStartedDescription = Найдите новый значок скриншотов на вашей панели инструментов. Выберите его, и меню скриншотов появится вверху окна вашего браузера.
homePageCaptureRegion = Захватить область
// Note: Screenshots is an abbreviation for Firefox Screenshots, and should not be translated.
homePageCaptureRegionDescription = Щёлкните и перетащите, чтобы выбрать область, которую вы хотите захватить. Или просто наведите мышью и щёлкните — Скриншоты выберут область сами. Нравится, что вы видите? Выберите «Сохранить», чтобы получить возможность опубликовать ваш скриншот онлайн или щёлкните по кнопке со стрелкой вниз, чтобы загрузить снимок на ваш компьютер.
homePageCapturePage = Захватить страницу
homePageCapturePageDescription = С помощью кнопок в верхнем правом углу вы можете захватить страницу целиком. Кнопка «Сохранить видимое» захватит видимое содержимое страницы, которое доступно без прокручивания, а «Сохранить всю страницу» захватит всю страницу целиком.
homePageSaveShare = Сохранить и поделиться
// Note: Screenshots is an abbreviation for Firefox Screenshots, and should not be translated.
homePageSaveShareDescription = Когда вы делаете снимок, Firefox публикует ваш скриншот в вашу онлайн библиотеку скриншотов и копирует ссылку в ваш буфер обмена. Мы автоматически храним ваши скриншоты две недели, но вы можете удалить снимки в любое время или изменить дату окончания хранения, чтобы хранить их в вашей библиотеке дольше.
homePageLegalLink = Юридическая информация
homePagePrivacyLink = Приватность
homePageTermsLink = Условия использования
homePageCookiesLink = Куки


[[ Leave Screenshots page ]]

leavePageRemoveAllData = Удалить все данные
// Note: do not translate 'Firefox Screenshots' when translating this string
leavePageErrorAddonRequired = Чтобы удалить ваш аккаунт, у вас должны быть установлен Firefox Screenshots
leavePageErrorGeneric = Произошла ошибка
// Note: do not translate 'Firefox Screenshots' when translating this string
leavePageWarning = Это действие навсегда удалит все ваши данные Firefox Screenshots.
leavePageButtonProceed = Продолжить
leavePageButtonCancel = Отмена
leavePageDeleted = Все ваши скриншоты были стёрты!


[[ Not Found page ]]

notFoundPageTitle = Страница не найдена
notFoundPageIntro = Ой.
notFoundPageDescription = Страница не найдена.


[[ Shot page ]]

// This is the HTML title tag of the page
shotPageTitle = Скриншот: { $originalTitle }
shotPageAlertErrorUpdatingExpirationTime = Ошибка при сохранении времени истечения
shotPageAlertErrorDeletingShot = Ошибка при удалении снимка
shotPageAlertErrorUpdatingTitle = Ошибка при сохранении заголовка
shotPageConfirmDelete = Вы уверены, что хотите навсегда удалить этот снимок?
shotPageShareButton
    .title = Поделиться
shotPageCopy = Копировать
shotPageCopied = Скопировано
shotPageShareFacebook
    .title = Поделиться на Фейсбуке
shotPageShareTwitter
    .title = Поделиться на Твиттере
shotPageSharePinterest
    .title = Поделиться на Pinterest
shotPageShareEmail
    .title = Поделиться ссылкой по электронной почте
shotPageShareLink = Получить публичную ссылку на этот снимок:
shotPagePrivacyMessage = Любой, имеющий эту ссылку, может просматривать этот снимок.
shotPageCopyImageText
    .label = Скопировать текст изображения
shotPageConfirmDeletion = Вы уверены, что хотите удалить этот снимок навсегда?
// Note: { $timediff } is a placeholder for a future relative time clause like 'in 3 days' or 'tomorrow'
shotPageExpirationMessage = Если вы ничего не будете делать, снимок будет удалён навсегда { $timediff }.
// Note: { $date } is a placeholder for a localized future date as returned by Date.toLocaleString.
// For example, in en-US, { $date } could be "7/12/2017, 1:52:50 PM".
shotPageRestoreButton = продлён до { $date }
shotPageExpiredMessage = Снимок просрочен.
// Note: This phrase is followed by an empty line, then the URL of the source page
shotPageExpiredMessageDetails = Страница, из которой создан этот снимок:
shotPageDeleteButton
    .title = Удалить этот снимок
shotPageAbuseButton
    .title = Этот снимок является оскорбительным, спамом или имеет другие проблемы
shotPageDownloadShot
    .title = Загрузить
shotPageDownload = Загрузить
shotPageScreenshotsDescription = Скриншоты стали простыми. Делайте, сохраняйте и делитесь скриншотами, не покидая Firefox.
shotPageUpsellFirefox = Загрузить Firefox сейчас
shotPageDMCAMessage = Этот снимок больше недоступен из-за нарушения авторских прав третьей стороны.
// Note: { $dmca } is a placeholder for a link to send email (a 'mailto' link)
shotPageDMCAContact = Пожалуйста, напишите на { $dmca }, чтобы запросить дополнительную информацию.
// Note: do not translate 'Firefox Screenshots' when translating this string
shotPageDMCAWarning = Если на ваши снимки пожаловались несколько раз, мы можем заблокировать вам доступ к Firefox Screenshots.
// Note: { $url } is a placeholder for a shot page URL
shotPageDMCAIncludeLink = Пожалуйста, включите в ваше письмо ссылку на этот снимок: { $url }
shotPageKeepFor = Как долго этот снимок будет храниться?
// Note: shotPageSelectTime is a placeholder label for the time selection dropdown.
shotPageSelectTime = Выберите время
shotPageKeepIndefinitely = Бесконечно
shotPageKeepTenMinutes = 10 минут
shotPageKeepOneHour = 1 час
shotPageKeepOneDay = 1 день
shotPageKeepOneWeek = 1 неделя
shotPageKeepTwoWeeks = 2 недели
shotPageKeepOneMonth = 1 месяц
shotPageSaveExpiration = сохранить
shotPageCancelExpiration = отменить
shotPageDoesNotExpire = неограниченный срок
// Note: { $timediff } is a placeholder for a future relative time clause, like "in 1 week" or "tomorrow"
shotPageExpiresIn = срок хранения истечёт { $timediff }
// Note: { $timediff } is a placeholder for a past relative time clause, like "1 week ago" or "yesterday"
shotPageExpired = срок хранения истёк { $timediff }
timeDiffJustNow = прямо сейчас
timeDiffMinutesAgo = { $num ->
        [one] { $number } минуту назад
        [few] { $number } минуты назад
       *[other] { $number } минут назад
    }
timeDiffHoursAgo = { $num ->
        [one] { $number } час назад
        [few] { $number } часа назад
       *[other] { $number } часов назад
    }
timeDiffDaysAgo = { $num ->
        [one] { $number } день назад
        [few] { $number } дня назад
       *[other] { $number } дней назад
    }
timeDiffFutureSeconds = через несколько секунд
timeDiffFutureMinutes = { $num ->
        [one] через { $number } минуту
        [few] через { $number } минуты
       *[other] через { $number } минут
    }
timeDiffFutureHours = { $num ->
        [one] через { $number } час
        [few] через { $number } часа
       *[other] через { $number } часов
    }
timeDiffFutureDays = { $num ->
        [one] через { $number } день
        [few] через { $number } дня
       *[other] через { $number } дней
    }


[[ Shotindex page ]]

// { $status } is a placeholder for an HTTP status code, like '500'.
// { $statusText } is a text description of the status code, like 'Internal server error'.
shotIndexPageErrorDeletingShot = Ошибка при удалении снимка: { $status } { $statusText }
// { $searchTerm } is a placeholder for text the user typed into the search box
shotIndexPageSearchResultsTitle = Мои снимки: поиск { $searchTerm }
// { $error } is a placeholder for a non-translated error message that could be shared
// with developers when debugging an error.
shotIndexPageErrorRendering = Ошибка рендеринга страницы: { $error }
shotIndexPageSearchPlaceholder
    .placeholder = Поиск моих снимков
shotIndexPageSearchButton
    .title = Поиск
shotIndexPageNoShotsMessage = Нет сохранённых снимков.
shotIndexPageNoShotsInvitation = Давайте, сохраните несколько.
shotIndexPageLookingForShots = Ищем ваши снимки...
shotIndexPageNoSearchResultsIntro = Хмм
shotIndexPageNoSearchResults = Мы не можем найти каких-либо снимков по вашему поисковому запросу.
shotIndexPageClearSearchButton
    .title = Очистить поиск
shotIndexPageConfirmShotDelete = Удалить этот снимок?


// all metrics strings are optional for translation
[[ Metrics page ]]

// Note: 'Firefox Screenshots' should not be translated
metricsPageTitle = Метрики Firefox Screenshots
metricsPageTotalsQueryTitle = Всего
// Note: Screenshots is an abbreviation for Firefox Screenshots, and should not be translated.
metricsPageTotalsQueryDescription = Обзор cкриншотов
metricsPageTotalsQueryDevices = Всего зарегистрированных устройств
metricsPageTotalsQueryActiveShots = Активные снимки
metricsPageTotalsQueryExpiredShots = Просрочено (доступно восстановление)
metricsPageTotalsQueryExpiredDeletedShots = Просрочено (и удалено)
metricsPageShotsQueryTitle = Снимков в день
metricsPageShotsQueryDescription = Число снимков созданных за каждый день (за последние 30 дней)
metricsPageShotsQueryCount = Число снимков
metricsPageShotsQueryDay = День
metricsPageUsersQueryTitle = Пользователей в день
metricsPageUsersQueryDescription = Число пользователей, создавших хотя бы один снимок, за день (последние 30 дней)
metricsPageUsersQueryCount = Число пользователей
metricsPageUsersQueryDay = День
metricsPageUserShotsQueryTitle = Число снимков на пользователя
metricsPageUserShotsQueryDescription = Число пользователей, которые сделали около N снимков всего
metricsPageUserShotsQueryCount = Число пользователей
metricsPageUserShotsQueryShots = Приблизительное число активных (неистёкших) снимков
metricsPageRetentionQueryTitle = Сохранение за неделю
metricsPageRetentionQueryDescription = Число дней от первого снимка пользователя до самого последнего, сгруппировано по началу недели
metricsPageRetentionQueryUsers = Число пользователей
metricsPageRetentionQueryDays = Дней от первого до последнего снимка пользователя
metricsPageRetentionQueryFirstWeek = Неделя, на которой пользователь создал первый снимок
metricsPageTotalRetentionQueryTitle = Общее число
metricsPageTotalRetentionQueryDescription = Количество времени, которое пользователи тратят на создание снимков, сгруппированное по неделям
metricsPageTotalRetentionQueryUsers = Число пользователей
metricsPageTotalRetentionQueryDays = Дни, в которые пользователь создавал скриншоты
metricsPageVersionQueryTitle = Версия дополнения
metricsPageVersionQueryDescription = Версия дополнения, использованного во время входа, в течение последних 14 дней
metricsPageVersionQueryUsers = Число вошедших пользователей
metricsPageVersionQueryVersion = Версия дополнения
metricsPageVersionQueryLastSeen = День
metricsPageHeader = Метрики
// Note: { $created } is a placeholder for a localized date and time, like '4/21/2017, 3:40:04 AM'
metricsPageGeneratedDateTime = Сгенерировано: { $created }
// Note { $time } is a placeholder for a number of milliseconds, like '100'
metricsPageDatabaseQueryTime = (время базы данных: { $time }мс)
