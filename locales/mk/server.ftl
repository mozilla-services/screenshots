### Localization for Server-side strings of Firefox Screenshots
### Please don't localize Firefox, Firefox Screenshots, or Screenshots


## Global phrases shared across pages, prefixed with 'g'

gMyShots = Мои слики
gHomeLink = Почетна
gNoShots =
    .alt = Нема слики од екран
gScreenshotsDescription = Слики од екран поедноставени. Фаќајте, снимајте и споделувајте слики од екран без да го напуштите Firefox.

## Footer

# Note: link text for a link to mozilla.org
footerLinkMozilla = Mozilla
footerLinkTerms = Услови
footerLinkPrivacy = Известување за приватност
footerLinkFaqs = ЧПП
footerLinkDMCA = Пријавете злоупотреба на интелектуална сопственост
footerLinkDiscourse = Оставете мислење
footerLinkRemoveAllData = Избришете ги сите податоци

## Creating page

# Note: { $title } is a placeholder for the title of the web page
# captured in the screenshot. The default, for pages without titles, is
# creatingPageTitleDefault.
creatingPageTitle = Создавам { $title }
creatingPageTitleDefault = страница
creatingPageWaitMessage = Вашата слика се снима...

## Home page

homePageDescription =
    .content = Интуитивни слики од екран вградени во прелистувачот. Фаќајте, снимајте и споделувајте слики од екран додека го прелистувате Интернет со Firefox.
homePageButtonMyShots = Појди до Мои слики
homePageTeaser = Наскоро...
homePageDownloadFirefoxTitle = Firefox
homePageDownloadFirefoxSubTitle = Слободно преземање
homePageGetStarted = Вовед
# Note: do not translate 'Firefox Screenshots' when translating this string
homePageHowScreenshotsWorks = Како работи Firefox Screenshots
homePageGetStartedTitle = Вовед
# Note: Screenshots is an abbreviation for Firefox Screenshots, and should not be translated.
homePageGetStartedDescription = Пронајдете ја новата иконка на Screenshots во вашиот алатник. Изберете ја и менито на Screenshots ќе се појави над прозорецот на вашиот прелистувач.
# Note: Screenshots is an abbreviation for Firefox Screenshots, and should not be translated.
homePageGetStartedDescriptionPageAction = Изберете ја иконката на Screenshots од менито со активности за страница во адресната лента и менито на Screenshots ќе се прикаже врз прозорецот на вашиот прелистувачот.
homePageCaptureRegion = Фати слика од регион
# Note: Screenshots is an abbreviation for Firefox Screenshots, and should not be translated.
homePageCaptureRegionDescription = Кликнете и влечете за да означите зона за снимање. Или пак, застанете со покажувачот и кликнете — Screenshots ќе ја избере зоната за Вас. Ви се допаѓа тоа што го гледате? Изберете Сними за да ја зачувате сликата на Интернет или пак, копчето со стрелка надолу за да ја преземете сликата на вашиот компјутер.
homePageCapturePage = Фати слика од страница
homePageCapturePageDescription = Користете ги копчињата горе-десно за да фатите слики од цели страници. Копчето Сними видлив дел ќе го фати делот што е видлив без лизгање, а Сними цела страница ќе ја фати целата страница.
homePageSaveShare = Сними и сподели
# Note: Screenshots is an abbreviation for Firefox Screenshots, and should not be translated.
homePageSaveShareDescription = Кога ќе фатите слика од екран, Firefox ја снима на Интернет, во вашата библиотека Screenshots и ја копира адресата до сликата во меморија. Автоматски ги чуваме вашите слики во времетраење од две недели, но вие можете да ги избришете во било кој момент или пак да го промените рокот на чување за да ги задржите подолго во вашата библиотека.
homePageLegalLink = Правна напомена
homePagePrivacyLink = Приватност
homePageTermsLink = Услови
homePageCookiesLink = Колачиња

## Leave Screenshots page

leavePageRemoveAllData = Отстрани ги сите податоци
# Note: do not translate 'Firefox Screenshots' when translating this string
leavePageErrorAddonRequired = Морате да го имате инсталирано Firefox Screenshots за да ја избришете вашата сметка
leavePageErrorGeneric = Се случи грешка
# Note: do not translate 'Firefox Screenshots' when translating this string
leavePageWarning = Со ова ќе ги избришете сите податоци на Firefox Screenshots трајно.
leavePageButtonProceed = Продолжи
leavePageButtonCancel = Откажи
leavePageDeleted = Сите ваши слики од екран беа избришани!

## Not Found page

notFoundPageTitle = Страницата не постои
notFoundPageIntro = Упс.
notFoundPageDescription = Страницата не постои.

## Shot page

# This is the HTML title tag of the page
shotPageTitle = Слика од екран: { $originalTitle }
shotPageAlertErrorUpdatingExpirationTime = Грешка при зачувуањето на рокот на траење
shotPageAlertErrorDeletingShot = Грешка при бришењето на сликата
shotPageAlertErrorUpdatingTitle = Грешка при снимањето на насловот
shotPageConfirmDelete = Сигурно сакате да ја избришете оваа слика од екран трајно?
shotPageShareButton =
    .title = Сподели
shotPageCopy = Копирај
shotPageCopied = Ископирано
shotPageShareFacebook =
    .title = Сподели на Facebook
shotPageShareTwitter =
    .title = Сподели на Twitter
shotPageSharePinterest =
    .title = Сподели на Pinterest
shotPageShareEmail =
    .title = Сподели врска преку е-пошта
shotPageShareLink = Земете врска за споделување на оваа слика:
shotPagePrivacyMessage = Сите што ја имаат адресата до сликата, можат да ја видат
shotPageCopyImageText =
    .label = Копирај го текстот на сликата
shotPageConfirmDeletion = Сигурно сакате да ја избришете оваа слика од екран трајно?
# Note: { $timediff } is a placeholder for a future relative time clause like 'in 3 days' or 'tomorrow'
shotPageExpirationMessage = Ако не направите ништо, оваа слика ќе биде трајно избришана { $timediff }.
# Note: { $date } is a placeholder for a localized future date as returned by Date.toLocaleString.
# For example, in en-US, { $date } could be "7/12/2017, 1:52:50 PM".
shotPageRestoreButton = можно враќање до { $date }
shotPageExpiredMessage = Рокот на траење на оваа слика е истечен.
# Note: This phrase is followed by an empty line, then the URL of the source page
shotPageExpiredMessageDetails = Еве ја страницата од којашто е оригинално избработена:
shotPageDeleteButton =
    .title = Избриши ја оваа слика
shotPageAbuseButton =
    .title = Пријави ја оваа слика како злоупотреба, спам или нешто друго 
shotPageDownloadShot =
    .title = Преземи
shotPageDownload = Преземи
shotPageScreenshotsDescription = Слики од екран поедноставени. Фаќајте, снимајте и споделувајте слики од екран без да го напуштите Firefox.
shotPageUpsellFirefox = Земете Firefox сега
shotPageDMCAMessage = Оваа слика од екран не е повеќе достапна заради жалба за нарушена интелектуална сопственост
# Note: { $dmca } is a placeholder for a link to send email (a 'mailto' link)
shotPageDMCAContact = За повеќе информации, Ве молиме испратете порака на { $dmca }.
# Note: do not translate 'Firefox Screenshots' when translating this string
shotPageDMCAWarning = Ако вашите слики се предмет на злоупотреба на повеќе страни, можно е да ви го оневозможиме пристапот до Firefox Screenshots.
# Note: { $url } is a placeholder for a shot page URL
shotPageDMCAIncludeLink = Ве молиме вклучете ја следната адреса на сликата во вашата е-порака: { $url }
shotPageKeepFor = Колку долго треба да се чува оваа слика?
# Note: shotPageSelectTime is a placeholder label for the time selection dropdown.
shotPageSelectTime = Изберете време
# The ∞ is used to indicate that the shot won't expire. It is also used in
# shotIndexNoExpirationSymbol. Try to use the same symbol in both strings, or
# if no such symbol is available for a language/culture, simply leave it out.
shotPageKeepIndefinitelyWithSymbol = Бесконечно ∞
shotPageKeepTenMinutes = 10 минути
shotPageKeepOneHour = 1 час
shotPageKeepOneDay = 1 ден
shotPageKeepOneWeek = 1 седмица 
shotPageKeepTwoWeeks = 2 седмици
shotPageKeepOneMonth = 1 месец
shotPageSaveExpiration = сними
shotPageCancelExpiration = откажи
shotPageDoesNotExpire = нема рок на траење
# Note: { $timediff } is a placeholder for a future relative time clause, like "in 1 week" or "tomorrow"
shotPageExpiresIn = важи { $timediff }
# Note: { $timediff } is a placeholder for a past relative time clause, like "1 week ago" or "yesterday"
shotPageExpired = рокот измина { $timediff }
timeDiffJustNow = сега
timeDiffMinutesAgo = { $number ->
        [one] пред 1 минута
       *[other] пред { $number } минути
    }
timeDiffHoursAgo = { $number ->
        [one] пред 1 час
       *[other] пред { $number } часа
    }
timeDiffDaysAgo = { $number ->
        [one] вчера
       *[other] пред { $number } дена
    }
timeDiffFutureSeconds = за неколку секунди
timeDiffFutureMinutes = { $number ->
        [one] за 1 минута
       *[other] за { $number } минути
    }
timeDiffFutureHours = { $number ->
        [one] за 1 час
       *[other] за { $number } часа
    }
timeDiffFutureDays = { $number ->
        [one] утре
       *[other] за { $number } дена
    }
errorThirdPartyCookiesEnabled = Ако вие ја фативте оваа слика и не можете да ја избришете, можеби треба привремено да овозможите користење на колачиња од трети страни во Опциите на прелистувачот.

## Annotations

annotationPenButton =
    .title = Пенкало
annotationHighlighterButton =
    .title = Маркер
# Note: This button reverts all the changes on the image since the start of the editing session.
annotationClearButton =
    .title = Исчисти
annotationCropButton =
    .title = Исечи
annotationSaveEditButton = Сними
    .title = Сними промени
annotationCancelEditButton = Откажи
    .title = Откажи уредување
annotationCropConfirmButton = Потврди
    .title = Потврди го изборот
annotationCropCancelButton = Откажи
    .title = Откажи го изборот

## Shotindex page

# { $status } is a placeholder for an HTTP status code, like '500'.
# { $statusText } is a text description of the status code, like 'Internal server error'.
shotIndexPageErrorDeletingShot = Грешка при бришењето на сликата: { $status } { $statusText }
# { $searchTerm } is a placeholder for text the user typed into the search box
shotIndexPageSearchResultsTitle = Мои слики: пребарување за { $searchTerm }
# { $error } is a placeholder for a non-translated error message that could be shared
# with developers when debugging an error.
shotIndexPageErrorRendering = Грешка во прикажувањето на страницата: { $error }
shotIndexPageSearchPlaceholder =
    .placeholder = Пребарај низ моите слики
shotIndexPageSearchButton =
    .title = Барај
shotIndexPageNoShotsMessage = Нема снимени слики од екран.
shotIndexPageNoShotsInvitation = Повелете, направете некоја.
shotIndexPageLookingForShots = Ги барам вашите слики од екран...
shotIndexPageNoSearchResultsIntro = Хм
shotIndexPageNoSearchResults = Не можеме да пронајдеме слики што одговараат на вашето пребарување.
shotIndexPageClearSearchButton =
    .title = Исчисти пребарување
shotIndexPageConfirmShotDelete = Да ја избришам оваа слика?
shotIndexPagePreviousPage =
    .title = Претходна страница
shotIndexPageNextPage =
    .title = Следна страница
# This symbol is used in the lower right corner of the card for a shot on the
# My Shots page to indicate that the shot does not expire. It should be a
# single character (or simply nothing if no such symbol is available for a
# language/culture).
shotIndexNoExpirationSymbol = ∞
    .title = Оваа слика нема рок на траење

## Metrics page
## All metrics strings are optional for translation

# Note: 'Firefox Screenshots' should not be translated
metricsPageTitle = Метрика на Firefox Screenshots
metricsPageTotalsQueryTitle = Вкупно
# Note: Screenshots is an abbreviation for Firefox Screenshots, and should not be translated.
metricsPageTotalsQueryDescription = Преглед на Screenshots
metricsPageTotalsQueryDevices = Вкупно регистрирани уреди
metricsPageTotalsQueryActiveShots = Активни слики од екран
metricsPageTotalsQueryExpiredShots = Со поминат рок (и можност за враќање)
metricsPageTotalsQueryExpiredDeletedShots = Со поминат рок (и трајно избришани)
metricsPageShotsQueryTitle = Слики по ден
metricsPageShotsQueryDescription = Број на слики од екран направени секој ден (во последните 30 дена)
metricsPageShotsQueryCount = Број на слики
metricsPageShotsQueryDay = Ден
metricsPageUsersQueryTitle = Корисници по ден
metricsPageUsersQueryDescription = Број на корисници што направиле барем една слика од екран дневно (во последните 30 дена)
metricsPageUsersQueryCount = Број на корисници
metricsPageUsersQueryDay = Ден
metricsPageUserShotsQueryTitle = Број на слики по корисник
metricsPageUserShotsQueryDescription = Бројот на корисници што имаат вкупно околу N слики од екран
metricsPageUserShotsQueryCount = Број на корисници
metricsPageUserShotsQueryShots = Просечен број на активни слики од екран (без поминат рок)
metricsPageRetentionQueryTitle = Задржување по седмица
metricsPageRetentionQueryDescription = Број на денови од првата до најновата слика од екран на корисникот, групирани според почетна седмица
metricsPageRetentionQueryUsers = Број на корисници
metricsPageRetentionQueryDays = Број на денови откога е направена првата, па сѐ до последната слика од екран
metricsPageRetentionQueryFirstWeek = Седмица во која корисникот за првпат направил слика од екран
metricsPageTotalRetentionQueryTitle = Вкупно задржување
metricsPageTotalRetentionQueryDescription = Времетраење во кое корисниците создавале слики од екран, групирани по седмица
metricsPageTotalRetentionQueryUsers = Број на корисници
metricsPageTotalRetentionQueryDays = Денови кога корисникот создавал слики од екран
metricsPageVersionQueryTitle = Верзија на додатокот
metricsPageVersionQueryDescription = Верзијата на додатокот што се користи за најавување во последните 14 дена
metricsPageVersionQueryUsers = Број на корисници што се најавуваат
metricsPageVersionQueryVersion = Верзија на додатокот
metricsPageVersionQueryLastSeen = Ден
metricsPageHeader = Метрика
# Note: { $created } is a placeholder for a localized date and time, like '4/21/2017, 3:40:04 AM'
metricsPageGeneratedDateTime = Создадена на: { $created }
# Note { $time } is a placeholder for a number of milliseconds, like '100'
metricsPageDatabaseQueryTime = (database time: { $time }ms)
