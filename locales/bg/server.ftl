### Localization for Server-side strings of Firefox Screenshots
### Please don't localize Firefox, Firefox Screenshots, or Screenshots


## Global phrases shared across pages, prefixed with 'g'

gMyShots = Моите снимки
gHomeLink = Начална страница
gNoShots =
    .alt = Няма снимки на екрана
gScreenshotsDescription = Лесни снимки на екрана. Създавате, запазвате и споделяте снимки на екрана без да напускате Firefox.
gSettings = Настройки
gSignIn = Вписване

## Header

buttonSettings =
    .title = Настройки
buttonSignIn =
    .title = Вписване
screenshotsLogo =
    .title = Страница на Screenshots

## Footer

# Note: link text for a link to mozilla.org
footerLinkMozilla = Mozilla
footerLinkTerms = Условия
footerLinkPrivacy = Политика на поверителност
footerReportShot = Докладване на снимка
    .title = Докладвайте снимката за злоупотреба, спам или друг проблем
footerLinkFaqs = Въпроси и отговори
footerLinkDMCA = Доклад за нарушение на авторско право
footerLinkDiscourse = Обратна връзка
footerLinkRemoveAllData = Премахване на всички данни

## Creating page

# Note: { $title } is a placeholder for the title of the web page
# captured in the screenshot. The default, for pages without titles, is
# creatingPageTitleDefault.
creatingPageTitle = Създаване на { $title }
creatingPageTitleDefault = страница
creatingPageWaitMessage = Запазване на снимката…

## Home page

homePageDescription =
    .content = Вградена възможност за снимане на екрана. Правете, запазвайте и споделяйте снимки на екрана докато разглеждате Мрежата с Firefox.
homePageButtonMyShots = Моите снимки
homePageTeaser = Очаквайте скоро…
homePageDownloadFirefoxTitle = Firefox
homePageDownloadFirefoxSubTitle = Свободно изтегляне
# Note: do not translate 'Firefox Screenshots' when translating this string
homePageHowScreenshotsWorks = Как работи Firefox Screenshots
homePageGetStartedTitle = Първи стъпки
# Note: Screenshots is an abbreviation for Firefox Screenshots, and should not be translated.
homePageGetStartedDescription = Новата пиктограма на Screenshots се намира на лентата с инструменти. Като я изберете от нея се отваря менюто най-горе във вашия четец.
# Note: Screenshots is an abbreviation for Firefox Screenshots, and should not be translated.
homePageGetStartedDescriptionPageAction = Изберете „Снимка на екрана“ от менюто с действия със страницата в адресната лента и менюто на „Screenshots“ ще се появи върху текущата страница.
homePageCaptureRegion = Улавяне на част от екрана
# Note: Screenshots is an abbreviation for Firefox Screenshots, and should not be translated.
homePageCaptureRegionDescription = Натиснете и влачете, за да изберете областта която желаете да уловите. Или просто поставете курсора отгоре и натиснете – Screenshots сама ще избере площта вместо вас. Харесва ли ви? Изберете „Запазване“, за да имате снимката онлайн или бутона със стрелка надолу, за да я изтеглите на вашия компютър.
homePageCapturePage = Улавяне на страница
homePageCapturePageDescription = Използвайте бутоните в горния десен ъгъл, за да снимате цели страници. Бутонът „Запазване на видимата област“ ще улови областта, която виждате без прелистване, а „Запазване на цялата страница“ – всичко на страницата.
homePageSaveShare = Запазване и споделяне
# Note: Screenshots is an abbreviation for Firefox Screenshots, and should not be translated.
homePageSaveShareDescription = Когато направите снимка Firefox я публикува във вашата онлайн библиотека на Screenshots и копира препратката в буферната памет. Изображенията се пазят 2 седмици, но може да ги премахнете по всяко време или да промените кога да бъдат изтрити, за да ги задържите в библиотеката си за по дълго време.
homePageLegalLink = Правни въпроси
homePagePrivacyLink = Поверителност
homePageTermsLink = Условия
homePageCookiesLink = Бисквитки

## Leave Screenshots page

leavePageRemoveAllData = Премахване на всички данни
# Note: do not translate 'Firefox Screenshots' when translating this string
leavePageErrorAddonRequired = Трябва да имате инсталиран Firefox Screenshots, за да изтриете вашата сметка
leavePageErrorGeneric = Възникна грешка
# Note: do not translate 'Firefox Screenshots' when translating this string
leavePageWarning = Така вашата информация в Firefox Screenshots ще бъде необратимо премахната.
leavePageButtonProceed = Продължаване
leavePageButtonCancel = Отказ
leavePageDeleted = Всички ваши снимки бяха премахнати!

## Not Found page

notFoundPageTitle = Страницата не е намерена
notFoundPageIntro = Олеле.
notFoundPageDescription = Страницата не е намерена.

## Shot page

# This is the HTML title tag of the page
shotPageTitle = Снимка на екрана: { $originalTitle }
shotPageAlertErrorUpdatingExpirationTime = Грешка при запазване на срока на изтичане
shotPageAlertErrorDeletingShot = Грешка при изтриване на изображението
shotPageAlertErrorUpdatingTitle = Грешка при запазване на заглавието
shotPageConfirmDelete = Сигурни ли сте, че желаете изображението да бъде необратимо премахнато?
shotPageShareButton =
    .title = Споделяне
shotPageCopy = Копиране
shotPageCopied = Копирано
shotPageShareFacebook =
    .title = Споделяне във Facebook
shotPageShareTwitter =
    .title = Споделяне в Twitter
shotPageSharePinterest =
    .title = Споделяне в Pinterest
shotPageShareEmail =
    .title = Споделяне препратката по ел. поща
shotPageShareLink = Препратка за споделяне към снимката:
shotPagePrivacyMessage = Всеки, който има препратката може да вижда снимката.
shotPageCopyImageText =
    .label = Копиране на текста от снимката
shotPageConfirmDeletion = Сигурни ли сте, че желаете изображението да бъде необратимо премахнато?
# Note: <timediff></timediff> is a placeholder for a future relative time clause like 'in 3 days' or 'tomorrow'
shotPageTimeExpirationMessage = Ако не правите нищо тази снимка ще бъде необратимо премахната <timediff></timediff>
# Note: { $date } is a placeholder for a localized future date as returned by Date.toLocaleString.
# For example, in en-US, { $date } could be "7/12/2017, 1:52:50 PM".
shotPageRestoreButton = възстановяване до { $date }
shotPageExpiredMessage = Тази снимка е с изтекла давност.
# Note: This phrase is followed by an empty line, then the URL of the source page
shotPageExpiredMessageDetails = Това е страницата, от която е направена:
shotPageDeleteButton =
    .title = Премахване на снимката
shotPageDownloadShot =
    .title = Изтегляне
shotPageEditButton =
    .title = Промяна на изображението
shotPagefavoriteButton =
    .title = Отбележи тази снимка
shotPageBackToHomeButton =
    .title = Страница
shotPageAllShotsButton =
    .title = Всички снимки
shotPageAllShots = Всички снимки
shotPageDownload = Изтегляне
# Note: Draw text is used on shot page as a verb (action)
shotPageDraw = Рисуване
# Note: Favorite text is used on shot page as a verb (action)
shotPageFavorite = Любими
shotPageDelete = Изтриване
shotPageScreenshotsDescription = Лесни снимки на екрана. Създавате, запазвате и споделяте снимки на екрана без да напускате Firefox.
shotPageUpsellFirefox = Вземете Firefox сега
shotPageDMCAMessage = Това изображение вече не е налично, защото е докладвано като обект на авторско право.
# Note: { $dmca } is a placeholder for a link to send email (a 'mailto' link)
shotPageDMCAContact = Моля, за повече информация пишете до { $dmca }.
# Note: do not translate 'Firefox Screenshots' when translating this string
shotPageDMCAWarning = Ако много хора докладват вашите изображения, може да откажем достъп до Firefox Screenshots.
# Note: { $url } is a placeholder for a shot page URL
shotPageDMCAIncludeLink = Моля, включете препратка към тази снимка във вашето писмо: { $url }
shotPageKeepFor = Колко дълго снимката да бъде пазена?
# Note: shotPageSelectTime is a placeholder label for the time selection dropdown.
shotPageSelectTime = продължителност
# The ∞ is used to indicate that the shot won't expire. It is also used in
# shotIndexNoExpirationSymbol. Try to use the same symbol in both strings, or
# if no such symbol is available for a language/culture, simply leave it out.
shotPageKeepIndefinitelyWithSymbol = Безкрайно ∞
shotPageKeepTenMinutes = 10 минути
shotPageKeepOneHour = 1 час
shotPageKeepOneDay = 1 ден
shotPageKeepOneWeek = 1 седмица
shotPageKeepTwoWeeks = 2 седмици
shotPageKeepOneMonth = 1 месец
shotPageSaveExpiration = запазване
shotPageCancelExpiration = отказване
shotPageDoesNotExpire = не изтича
# Note: <timediff></timediff> is a placeholder for a future relative time clause, like "in 1 week" or "tomorrow"
shotPageTimeExpiresIn = изтича <timediff></timediff>
# Note: <timediff></timediff> is a placeholder for a past relative time clause, like "1 week ago" or "yesterday"
shotPageTimeExpired = изтекло <timediff></timediff>
timeDiffJustNow = току-що
timeDiffMinutesAgo =
    { $number ->
        [one] преди минута
       *[other] преди { $number } минути
    }
timeDiffHoursAgo =
    { $number ->
        [one] преди час
       *[other] преди { $number } часа
    }
timeDiffDaysAgo =
    { $number ->
        [one] вчера
       *[other] преди { $number } дена
    }
timeDiffFutureSeconds = след секунди
timeDiffFutureMinutes =
    { $number ->
        [one] след минута
       *[other] след { $number } минути
    }
timeDiffFutureHours =
    { $number ->
        [one] след час
       *[other] след { $number } часа
    }
timeDiffFutureDays =
    { $number ->
        [one] утре
       *[other] след { $number } дни
    }
errorThirdPartyCookiesEnabled = Ако сте направили тази снимка и не можете да я изтриете може да пробвате временно да включите бисквитките от трети страни в настройките на четеца.

## Shot Page New Feature Promotion Dialog.

# Note: If possible, choose a short translation to better fit into the card.
promoTitle = Забележете!
promoMessage = Обновените инструменти за редактиране на снимки ви позволяват да ги отрязвате, рисувате за подчертаване и дори да им добавяте текст.
promoLink = Изпробвайте ги
promoCloseButton =
    .title = Затваряне на известието

## Annotations

annotationPenButton =
    .title = Писалка
annotationHighlighterButton =
    .title = Маркер
annotationUndoButton =
    .title = Отменяне
annotationRedoButton =
    .title = Повтаряне
annotationTextButton =
    .title = Добавяне на текст
# Note: This button reverts all the changes on the image since the start of the editing session.
annotationClearButton =
    .title = Изчистване
annotationCropButton =
    .title = Изрязване
annotationSaveEditButton = Запазване
    .title = Запазване на промените
annotationCancelEditButton = Отказ
    .title = Отказ от промените
annotationCropConfirmButton = Потвърждение
    .title = Потвърждаване на избора
annotationCropCancelButton = Отказ
    .title = Отказване от избора
annotationColorWhite =
    .title = Бяло
annotationColorBlack =
    .title = Черно
annotationColorRed =
    .title = Червено
annotationColorGreen =
    .title = Зелено
annotationColorBlue =
    .title = Синьо
annotationColorYellow =
    .title = Жълто
annotationColorPurple =
    .title = Лилаво
annotationColorSeaGreen =
    .title = Синьо-зелено
annotationColorGrey =
    .title = Сиво
# Note: annotationTextSize is a title for text size selection dropdown.
annotationTextSize =
    .title = Размер на текста
# Values shown in text size selection dropdown
textSizeSmall = Малък
textSizeMedium = Среден
textSizeLarge = Голям
# Confirm and Cancel button title shown when using text tool
textToolConfirmButton = Потвърждение
    .title = Потвърждение
textToolCancelButton = Отказ
    .title = Отказ
# Default placeholder used in input field when adding text annotations
textToolInputPlaceholder =
    .placeholder = Здравейте

## Settings Page

settingsDisconnectButton = Изключване
    .title = Изключване
settingsGuestAccountMessage = Сметка за гости
settingsSignInInvite = Вписване в Sync за синхронизиране между устрайствата
settingsSignInButton = Вписване
    .title = Вписване
SettingsPageHeader = Настройки на Firefox Screenshots
settingsDescription = Ако се впишете с Firefox Accounts всички снимки на екрана ще бъдат синхронизирани между устройствата ви и ще ги имате поверителен достъп до тях.
settingsPageSubHeader = Синхронизиране и сметки
settingsClosePreferences =
    .title = Затваряне

## Shotindex page

# { $status } is a placeholder for an HTTP status code, like '500'.
# { $statusText } is a text description of the status code, like 'Internal server error'.
shotIndexPageErrorDeletingShot = Грешка при изтриване на изображението: { $status } { $statusText }
# { $searchTerm } is a placeholder for text the user typed into the search box
shotIndexPageSearchResultsTitle = Моите снимки: търсене на { $searchTerm }
# { $error } is a placeholder for a non-translated error message that could be shared
# with developers when debugging an error.
shotIndexPageErrorRendering = Грешка при изчертаване на страницата: { $error }
shotIndexPageSearchPlaceholder =
    .placeholder = Търсене в моите снимки
shotIndexPageSearchButton =
    .title = Търсене
shotIndexPageNoShotsMessage = Няма запазени снимки.
shotIndexPageNoShotsInvitation = Хайде, направете няколко.
shotIndexPageLookingForShots = Търсене на вашите снимки…
shotIndexPageNoSearchResultsIntro = Хмм
shotIndexPageNoSearchResults = Не намираме снимки, които отговарят на търсенето ви.
shotIndexPageMyShotsButton =
    .title = Моите снимки
shotIndexPageClearSearchButton =
    .title = Изчистване на търсенето
shotIndexPageConfirmShotDelete = Сигурни ли сте, че желаете снимката да бъде премахната?
shotIndexPagePreviousPage =
    .title = Предишна страница
shotIndexPageNextPage =
    .title = Следваща страница
# This is tooltip for a "blank heart" symbol used in the upper top corner of the card for a shot on the
# My Shots page to indicate that the shot does expire.
shotIndexNonFavoriteIcon =
    .title = Снимката не е любима и давността ѝ ще изтече
# This is the tooltip for a "heart" symbol in the upper top corner of the
# card for a shot on the My Shots page. It indicate that the shot was marked as
# a favorite by the owner.
shotIndexFavoriteIcon =
    .title = Това е отбелязана снимка и тя няма срок на съхранение

## Delete Confirmation Dialog

shotDeleteConfirmationMessage = Сигурни ли сте, че желаете да изтриете тази снимка?
shotDeleteCancel = Отказ
    .title = Отказ
shotDeleteConfirm = Изтриване
    .title = Изтриване

## Metrics page
## All metrics strings are optional for translation

# Note: 'Firefox Screenshots' should not be translated
metricsPageTitle = Метрики на Firefox Screenshots
metricsPageTotalsQueryTitle = Общо
# Note: Screenshots is an abbreviation for Firefox Screenshots, and should not be translated.
metricsPageTotalsQueryDescription = Преглед на снимките
metricsPageTotalsQueryDevices = Общ брой регистрирани устройства
metricsPageTotalsQueryActiveShots = Активни снимки
metricsPageTotalsQueryExpiredShots = С изтекъл срок (но възстановими)
metricsPageTotalsQueryExpiredDeletedShots = С изтекъл срок (и изтрити)
metricsPageShotsQueryTitle = Снимки на ден
metricsPageShotsQueryDescription = Брой снимки, създавани всеки ден (за последните 30 дена)
metricsPageShotsQueryCount = Брой снимки
metricsPageShotsQueryDay = Ден
metricsPageUsersQueryTitle = Потребители на ден
metricsPageUsersQueryDescription = Брой потребители на ден, които са създали най-малко една снимка (за последните 30 дена)
metricsPageUsersQueryCount = Брой потребители
metricsPageUsersQueryDay = Ден
metricsPageUserShotsQueryTitle = Брой снимки на потребител
metricsPageUserShotsQueryDescription = Брой потребители, които имат общо около N на брой снимки
metricsPageUserShotsQueryCount = Брой потребители
metricsPageUserShotsQueryShots = Приблизителен брой на активни (с неизтекъл срок) снимки
metricsPageRetentionQueryTitle = Запазване по седмици
metricsPageRetentionQueryDescription = Брой дни от първата снимка на потребителя до последната снимка, групирани по началната седмица
metricsPageRetentionQueryUsers = Брой потребители
metricsPageRetentionQueryDays = Дни от първата снимка на потребителя до последната
metricsPageRetentionQueryFirstWeek = Седмица на първата снимка на потребителя
metricsPageTotalRetentionQueryTitle = Общо запазване
metricsPageTotalRetentionQueryDescription = Продължителност на създаването на снимки от потребителите, групирани по седмица
metricsPageTotalRetentionQueryUsers = Брой потребители
metricsPageTotalRetentionQueryDays = Дни, през които потребителят е създавал снимки
metricsPageVersionQueryTitle = Версия на добавката
metricsPageVersionQueryDescription = Версия на добавката, използвана при влизане, през последните 14 дена
metricsPageVersionQueryUsers = Брой влезли потребители
metricsPageVersionQueryVersion = Версия на добавката
metricsPageVersionQueryLastSeen = Ден
metricsPageHeader = Метрики
# Note: { $created } is a placeholder for a localized date and time, like '4/21/2017, 3:40:04 AM'
metricsPageGeneratedDateTime = Генерирани в: { $created }
# Note { $time } is a placeholder for a number of milliseconds, like '100'
metricsPageDatabaseQueryTime = (време в базата от данни: { $time }ms)
