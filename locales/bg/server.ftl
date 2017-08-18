// Localization for Server-side strings of Firefox Screenshots
// 
// Please don't localize Firefox, Firefox Screenshots, or Screenshots



// Global phrases shared across pages, prefixed with 'g'
[[ global ]]

gMyShots = Моите снимки
gHomeLink = Начална страница
gNoShots
    .alt = Няма снимки на екрана
gScreenshotsDescription = Лесни снимки на екрана. Правите, запазвате и споделяте снимки на екрана без да напускате Firefox.


[[ Footer ]]

// Note: link text for a link to mozilla.org
footerLinkMozilla = Mozilla
footerLinkTerms = Условия
footerLinkPrivacy = Политика на поверителност
footerLinkDMCA = Доклад за нарушение на авторско право
footerLinkDiscourse = Обратна връзка
footerLinkRemoveAllData = Премахване на всички данни


[[ Creating page ]]

// Note: { $title } is a placeholder for the title of the web page
// captured in the screenshot. The default, for pages without titles, is
// creatingPageTitleDefault.
creatingPageTitle = Създаване на { $title }
creatingPageTitleDefault = страница
creatingPageWaitMessage = Запазване на снимката…


[[ Home page ]]

homePageDescription
    .content = Вградена възможност за снимане на екрана. Правете, запазвайте и споделяйте снимки на екрана докато разглеждате Мрежата с Firefox.
homePageButtonMyShots = Моите снимки
homePageTeaser = Очаквайте скоро…
homePageDownloadFirefoxTitle = Firefox
homePageDownloadFirefoxSubTitle = Свободно изтегляне
homePageGetStarted = Първи стъпки
// Note: do not translate 'Firefox Screenshots' when translating this string
homePageHowScreenshotsWorks = Как работи Firefox Screenshots
homePageGetStartedTitle = Първи стъпки
// Note: Screenshots is an abbreviation for Firefox Screenshots, and should not be translated.
homePageGetStartedDescription = Новата пиктограма на Screenshots се намира на лентата с инструменти. Като я изберете от нея се отваря менюто най-горе във вашия четец.
homePageCaptureRegion = Улавяне на част от екрана
// Note: Screenshots is an abbreviation for Firefox Screenshots, and should not be translated.
homePageCaptureRegionDescription = Натиснете и влачете, за да изберете областта която желаете да уловите. Или просто поставете курсора отгоре и натиснете – Screenshots сама ще избере площта вместо вас. Харесва ли ви? Изберете „Запазване“, за да имате снимката онлайн или бутона със стрелка надолу, за да я изтеглите на вашия компютър.
homePageCapturePage = Улавяне на страница
homePageCapturePageDescription = Използвайте бутоните в горния десен ъгъл, за да снимате цели страници. Бутонът „Запазване на видимата област“ ще улови областта, която виждате без прелистване, а „Запазване на цялата страница“ – всичко на страницата.
homePageSaveShare = Запазване и споделяне
// Note: Screenshots is an abbreviation for Firefox Screenshots, and should not be translated.
homePageSaveShareDescription = Когато направите снимка Firefox я публикува във вашата онлайн библиотека на Screenshots и копира препратката в буферната памет. Изображенията се пазят 2 седмици, но може да ги премахнете по всяко време или да промените кога да бъдат изтрити, за да ги задържите в библиотеката си за по дълго време.
homePageLegalLink = Правни въпроси
homePagePrivacyLink = Поверителност
homePageTermsLink = Условия
homePageCookiesLink = Бисквитки


[[ Leave Screenshots page ]]

leavePageRemoveAllData = Премахване на всички данни
// Note: do not translate 'Firefox Screenshots' when translating this string
leavePageErrorAddonRequired = Трябва да имате инсталиран Firefox Screenshots, за да изтриете вашата сметка
leavePageErrorGeneric = Възникна грешка
// Note: do not translate 'Firefox Screenshots' when translating this string
leavePageWarning = Така вашата информация в Firefox Screenshots ще бъде необратимо премахната.
leavePageButtonProceed = Продължаване
leavePageButtonCancel = Отказ
leavePageDeleted = Всички ваши снимки бяха премахнати!


[[ Not Found page ]]

notFoundPageTitle = Страницата не е намерена
notFoundPageIntro = Олеле.
notFoundPageDescription = Страницата не е намерена.


[[ Shot page ]]

// This is the HTML title tag of the page
shotPageTitle = Снимка на екрана: { $originalTitle }
shotPageAlertErrorUpdatingExpirationTime = Грешка при запазване на срока на изтичане
shotPageAlertErrorDeletingShot = Грешка при изтриване на изображението
shotPageAlertErrorUpdatingTitle = Грешка при запазване на заглавието
shotPageConfirmDelete = Сигурни ли сте, че желаете изображението да бъде необратимо премахнато?
shotPageShareButton
    .title = Споделяне
shotPageCopy = Копиране
shotPageCopied = Копирано
shotPageShareFacebook
    .title = Споделяне във Facebook
shotPageShareTwitter
    .title = Споделяне в Twitter
shotPageSharePinterest
    .title = Споделяне в Pinterest
shotPageShareEmail
    .title = Споделяне препратката по ел. поща
shotPageShareLink = Препратка за споделяне към снимката:
shotPagePrivacyMessage = Всеки, който има препратката може да вижда снимката.
shotPageCopyImageText
    .label = Копиране на текста от снимката
shotPageConfirmDeletion = Сигурни ли сте, че желаете изображението да бъде необратимо премахнато?
// Note: { $timediff } is a placeholder for a future relative time clause like 'in 3 days' or 'tomorrow'
shotPageExpirationMessage = Ако не правите нищо тази снимка ще бъде необратимо премахната { $timediff }
// Note: { $date } is a placeholder for a localized future date as returned by Date.toLocaleString.
// For example, in en-US, { $date } could be "7/12/2017, 1:52:50 PM".
shotPageRestoreButton = възстановяване до { $date }
shotPageExpiredMessage = Тази снимка е с изтекла давност.
// Note: This phrase is followed by an empty line, then the URL of the source page
shotPageExpiredMessageDetails = Това е страницата, от която е направена:
shotPageDeleteButton
    .title = Премахване на снимката
shotPageAbuseButton
    .title = Докладвайте снимката за злоупотреба или други проблеми
shotPageDownloadShot
    .title = Изтегляне
shotPageDownload = Изтегляне
shotPageScreenshotsDescription = Лесни снимки на екрана. Правите, запазвате и споделяте снимки на екрана без да напускате Firefox.
shotPageUpsellFirefox = Вземете Firefox сега
shotPageDMCAMessage = Това изображение вече не е налично, защото е докладвано като обект на авторско право.
// Note: { $dmca } is a placeholder for a link to send email (a 'mailto' link)
shotPageDMCAContact = Моля, за повече информация пишете до { $dmca }.
// Note: do not translate 'Firefox Screenshots' when translating this string
shotPageDMCAWarning = Ако много хора докладват вашите изображения, може да откажем достъп до Firefox Screenshots.
// Note: { $url } is a placeholder for a shot page URL
shotPageDMCAIncludeLink = Моля, включете препратка към тази снимка във вашето писмо: { $url }
shotPageKeepFor = Колко дълго снимката да бъде пазена?
// Note: shotPageSelectTime is a placeholder label for the time selection dropdown.
shotPageSelectTime = продължителност
shotPageKeepIndefinitely = неограничено
shotPageKeepTenMinutes = 10 минути
shotPageKeepOneHour = 1 час
shotPageKeepOneDay = 1 ден
shotPageKeepOneWeek = 1 седмица
shotPageKeepTwoWeeks = 2 седмици
shotPageKeepOneMonth = 1 месец
shotPageSaveExpiration = запазване
shotPageCancelExpiration = отказване
shotPageDoesNotExpire = не изтича
// Note: { $timediff } is a placeholder for a future relative time clause, like "in 1 week" or "tomorrow"
shotPageExpiresIn = изтича { $timediff }
// Note: { $timediff } is a placeholder for a past relative time clause, like "1 week ago" or "yesterday"
shotPageExpired = изтекло { $timediff }
timeDiffJustNow = току-що
timeDiffMinutesAgo = { $num ->
        [one] преди минута
       *[other] преди { $number } минути
    }
timeDiffHoursAgo = { $num ->
        [one] преди час
       *[other] преди { $number } часа
    }
timeDiffDaysAgo = { $num ->
        [one] вчера
       *[other] преди { $number } дена
    }
timeDiffFutureSeconds = след секунди
timeDiffFutureMinutes = { $num ->
        [one] след минута
       *[other] след { $number } минути
    }
timeDiffFutureHours = { $num ->
        [one] след час
       *[other] след { $number } часа
    }
timeDiffFutureDays = { $num ->
        [one] утре
       *[other] след { $number } дни
    }


[[ Shotindex page ]]

// { $status } is a placeholder for an HTTP status code, like '500'.
// { $statusText } is a text description of the status code, like 'Internal server error'.
shotIndexPageErrorDeletingShot = Грешка при изтриване на изображението: { $status } { $statusText }
// { $searchTerm } is a placeholder for text the user typed into the search box
shotIndexPageSearchResultsTitle = Моите снимки: търсене на { $searchTerm }
// { $error } is a placeholder for a non-translated error message that could be shared
// with developers when debugging an error.
shotIndexPageErrorRendering = Грешка при изчертаване на страницата: { $error }
shotIndexPageSearchPlaceholder
    .placeholder = Търсене в моите снимки
shotIndexPageSearchButton
    .title = Търсене
shotIndexPageNoShotsMessage = Няма запазени снимки.
shotIndexPageNoShotsInvitation = Хайде, направете няколко.
shotIndexPageLookingForShots = Търсене на вашите снимки…
shotIndexPageNoSearchResultsIntro = Хмм
shotIndexPageNoSearchResults = Не намираме снимки, които отговарят на търсенето ви.
shotIndexPageClearSearchButton
    .title = Изчистване на търсенето
shotIndexPageConfirmShotDelete = Сигурни ли сте, че желаете това изображение да бъде премахнато?


// all metrics strings are optional for translation
[[ Metrics page ]]

