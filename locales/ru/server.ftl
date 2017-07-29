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
homePageSaveShare = Сохранить и поделиться
homePageLegalLink = Юридическая информация
homePagePrivacyLink = Приватность
homePageTermsLink = Условия использования
homePageCookiesLink = Куки


[[ Leave Screenshots page ]]

leavePageErrorGeneric = Произошла ошибка
leavePageButtonProceed = Продолжить
leavePageButtonCancel = Отмена
leavePageDeleted = Все ваши скриншоты были стёрты!


[[ Not Found page ]]

notFoundPageTitle = Страница не найдена
notFoundPageIntro = Ой.
notFoundPageDescription = Страница не найдена.


[[ Shot page ]]

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
shotPageCopyImageText
    .label = Скопировать текст изображения
shotPageDeleteButton
    .title = Удалить этот снимок
shotPageDownloadShot
    .title = Загрузить
shotPageDownload = Загрузить
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
shotIndexPageSearchPlaceholder
    .placeholder = Поиск моих снимков
shotIndexPageSearchButton
    .title = Поиск
shotIndexPageNoSearchResultsIntro = Хмм
shotIndexPageConfirmShotDelete = Удалить этот снимок?


// all metrics strings are optional for translation
[[ Metrics page ]]

metricsPageTotalsQueryTitle = Всего
// Note: Screenshots is an abbreviation for Firefox Screenshots, and should not be translated.
metricsPageTotalsQueryDescription = Обзор cкриншотов
metricsPageTotalsQueryDevices = Всего зарегистрированных устройств
metricsPageTotalsQueryActiveShots = Активные снимки
metricsPageShotsQueryCount = Число снимков
metricsPageShotsQueryDay = День
metricsPageUsersQueryTitle = Пользователей в день
metricsPageUsersQueryCount = Число пользователей
metricsPageUsersQueryDay = День
metricsPageUserShotsQueryCount = Число пользователей
metricsPageUserShotsQueryShots = Приблизительное число активных (неистёкших) снимков
metricsPageRetentionQueryTitle = Сохранение за неделю
metricsPageRetentionQueryUsers = Число пользователей
metricsPageTotalRetentionQueryUsers = Число пользователей
metricsPageVersionQueryTitle = Версия дополнения
metricsPageVersionQueryDescription = Версия дополнения, использованного во время входа, в течение последних 14 дней
metricsPageVersionQueryVersion = Версия дополнения
metricsPageVersionQueryLastSeen = День
metricsPageHeader = Метрики
// Note: { $created } is a placeholder for a localized date and time, like '4/21/2017, 3:40:04 AM'
metricsPageGeneratedDateTime = Сгенерировано: { $created }
// Note { $time } is a placeholder for a number of milliseconds, like '100'
metricsPageDatabaseQueryTime = (время базы данных: { $time }мс)
