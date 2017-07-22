// Localization for Server-side strings of Firefox Screenshots
// 
// Please don't localize Firefox, Firefox Screenshots, or Screenshots



// Global phrases shared across pages, prefixed with 'g'
[[ global ]]

gMyShots = Мои снимки
gHomeLink = Дом
gNoShots
    .alt = снимков не найдено


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
shotPageExpiresIn = срок хранения - { $timediff }
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


[[ Shotindex page ]]



// all metrics strings are optional for translation
[[ Metrics page ]]

