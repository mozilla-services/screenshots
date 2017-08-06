// Localization for Server-side strings of Firefox Screenshots
// 
// Please don't localize Firefox, Firefox Screenshots, or Screenshots



// Global phrases shared across pages, prefixed with 'g'
[[ global ]]

gMyShots = Мои слики
gHomeLink = Почетна
gNoShots
    .alt = Нема слики од екран
gScreenshotsDescription = Слики од екран поедноставени. Фаќајте, снимајте и споделувајте слики од екран без да го напуштите Firefox.


[[ Footer ]]

// Note: link text for a link to mozilla.org
footerLinkMozilla = Mozilla
footerLinkPrivacy = Известување за приватност
footerLinkDMCA = Пријавете злоупотреба на интелектуална сопственост
footerLinkDiscourse = Оставете мислење
footerLinkRemoveAllData = Избришете ги сите податоци


[[ Creating page ]]

// Note: { $title } is a placeholder for the title of the web page
// captured in the screenshot. The default, for pages without titles, is
// creatingPageTitleDefault.
creatingPageTitle = Создавам { $title }
creatingPageTitleDefault = страница


[[ Home page ]]

homePageButtonMyShots = Појди до Мои слики
homePageTeaser = Наскоро...
homePageDownloadFirefoxTitle = Firefox
homePageDownloadFirefoxSubTitle = Слободно преземање
homePageGetStarted = Вовед
// Note: do not translate 'Firefox Screenshots' when translating this string
homePageHowScreenshotsWorks = Како работи Firefox Screenshots
homePageGetStartedTitle = Вовед
homePageSaveShare = Сними и сподели
homePageLegalLink = Правна напомена
homePagePrivacyLink = Приватност
homePageTermsLink = Услови
homePageCookiesLink = Колачиња


[[ Leave Screenshots page ]]

leavePageConfirmDelete = Потврдете го бришењето на сметката
leavePageButtonProceed = Продолжи
leavePageButtonCancel = Откажи
leavePageDeleted = Сите Ваши слики од екран беа избришани!


[[ Not Found page ]]

notFoundPageTitle = Страницата не постои
notFoundPageIntro = Упс.
notFoundPageDescription = Страницата не постои.


[[ Shot page ]]

// This is the HTML title tag of the page
shotPageTitle = Слика од екран: { $originalTitle }
shotPageConfirmDelete = Сигурно сакате да ја избришете оваа слика од екран трајно?
shotPageShareButton
    .title = Сподели
shotPageCopy = Копирај
shotPageCopied = Ископирано
shotPageShareFacebook
    .title = Сподели на Facebook
shotPageShareTwitter
    .title = Сподели на Twitter
shotPageSharePinterest
    .title = Сподели на Pinterest
shotPageShareEmail
    .title = Сподели врска преку е-пошта
shotPagePrivacyMessage = Сите што ја имаат адресата до сликата, можат да ја видат
shotPageCopyImageText
    .label = Копирај го текстот на сликата
shotPageConfirmDeletion = Сигурно сакате да ја избришете оваа слика од екран трајно?
// Note: { $timediff } is a placeholder for a future relative time clause like 'in 3 days' or 'tomorrow'
shotPageExpirationMessage = Ако не направите ништо, оваа слика ќе биде трајно избришана { $timediff }.
shotPageExpiredMessage = Рокот на траење на оваа слика е истечен.
// Note: This phrase is followed by an empty line, then the URL of the source page
shotPageExpiredMessageDetails = Еве ја страницата од којашто е оригинално избработена:
shotPageDeleteButton
    .title = Избриши ја оваа слика
shotPageAbuseButton
    .title = Пријави ја оваа слика како злоупотреба, спам или нешто друго 
shotPageDownloadShot
    .title = Преземи
shotPageDownload = Преземи
shotPageScreenshotsDescription = Слики од екран поедноставени. Фаќајте, снимајте и споделувајте слики од екран без да го напуштите Firefox.
shotPageUpsellFirefox = Земете Firefox сега
shotPageKeepFor = Колку долго треба да се чува оваа слика?
// Note: shotPageSelectTime is a placeholder label for the time selection dropdown.
shotPageSelectTime = Изберете време
shotPageKeepIndefinitely = Бесконечно
shotPageKeepTenMinutes = 10 минути
shotPageKeepOneHour = 1 час
shotPageKeepOneDay = 1 ден
shotPageKeepOneWeek = 1 седмица 
shotPageKeepTwoWeeks = 2 седмици
shotPageKeepOneMonth = 1 месец
shotPageSaveExpiration = сними
shotPageCancelExpiration = откажи
shotPageDoesNotExpire = нема рок на траење
// Note: { $timediff } is a placeholder for a future relative time clause, like "in 1 week" or "tomorrow"
shotPageExpiresIn = важи { $timediff }
// Note: { $timediff } is a placeholder for a past relative time clause, like "1 week ago" or "yesterday"
shotPageExpired = рокот измина { $timediff }
timeDiffJustNow = сега
timeDiffMinutesAgo = { $num ->
        [one] пред 1 минута
       *[other] пред { $number } минути
    }
timeDiffHoursAgo = { $num ->
        [one] пред 1 час
       *[other] пред { $number } часа
    }
timeDiffDaysAgo = { $num ->
        [one] вчера
       *[other] пред { $number } дена
    }
timeDiffFutureSeconds = за неколку секунди
timeDiffFutureMinutes = { $num ->
        [one] за 1 минута
       *[other] за { $number } минути
    }
timeDiffFutureHours = { $num ->
        [one] за 1 час
       *[other] за { $number } часа
    }
timeDiffFutureDays = { $num ->
        [one] утре
       *[other] за { $number } дена
    }


[[ Shotindex page ]]

// { $status } is a placeholder for an HTTP status code, like '500'.
// { $statusText } is a text description of the status code, like 'Internal server error'.
shotIndexPageErrorDeletingShot = Грешка при бришењето на сликата: { $status } { $statusText }
// { $searchTerm } is a placeholder for text the user typed into the search box
shotIndexPageSearchResultsTitle = Мои слики: пребарување за { $searchTerm }
// { $error } is a placeholder for a non-translated error message that could be shared
// with developers when debugging an error.
shotIndexPageErrorRendering = Грешка во прикажувањето на страницата: { $error }
shotIndexPageSearchPlaceholder
    .placeholder = Пребарај низ моите слики
shotIndexPageSearchButton
    .title = Барај
shotIndexPageNoShotsMessage = Нема снимени слики од екран.
shotIndexPageNoShotsInvitation = Повелете, направете некоја.
shotIndexPageLookingForShots = Ги барам Вашите слики од екран...
shotIndexPageNoSearchResultsIntro = Хм
shotIndexPageNoSearchResults = Не можеме да пронајдеме слики што одговараат на Вашето пребарување.


// all metrics strings are optional for translation
[[ Metrics page ]]

