### Localization for Server-side strings of Firefox Screenshots
### Please don't localize Firefox, Firefox Screenshots, or Screenshots


## Global phrases shared across pages, prefixed with 'g'

gHomeLink = Эхлэл хуудас

## Footer

# Note: link text for a link to mozilla.org
footerLinkMozilla = Mozilla
footerLinkTerms = Үйлчилгээний нөхцөл
footerLinkPrivacy = Нууцлал мэдэгдэл
footerLinkFaqs = ТТА хуудас
footerLinkDMCA = Оюуны өмчийг зөрчлийг мэдээлэх
footerLinkDiscourse = Санал хүсэлт илгээх
footerLinkRemoveAllData = Өгөгдлийг хамаг арилгах

## Creating page

# Note: { $title } is a placeholder for the title of the web page
# captured in the screenshot. The default, for pages without titles, is
# creatingPageTitleDefault.
creatingPageTitle = { $title } үүсгэж байна
creatingPageTitleDefault = хуудас

## Home page

homePageTeaser = Тун удахгүй…
homePageDownloadFirefoxTitle = Firefox
homePageDownloadFirefoxSubTitle = Үнэ төлбөргүй татж авах
homePageGetStarted = Эхлэх
homePageGetStartedTitle = Эхэлцгээе
homePageCapturePage = Хуудасын зурагыг авах
homePageSaveShare = Хадгалаад хуваалцах
homePageLegalLink = Эрхзүй
homePagePrivacyLink = Нууцлал
homePageTermsLink = Үйлчилгээний нөхцөл
homePageCookiesLink = Күүкий

## Leave Screenshots page

leavePageRemoveAllData = Өгөгдлийг хамаг арилгах
leavePageErrorGeneric = Алдаа гарлаа
leavePageButtonProceed = Үргэлжлүүлэх
leavePageButtonCancel = Цуцлах

## Not Found page

notFoundPageTitle = Хуудас олдоогүй
notFoundPageIntro = Өө!
notFoundPageDescription = Хуудас олдоогүй.

## Shot page

# This is the HTML title tag of the page
shotPageTitle = Дэлгэцийн зураг: { $originalTitle }
shotPageAlertErrorUpdatingExpirationTime = Дуусах хугацаагийг хадгалсанд алдаа гарлаа
shotPageAlertErrorUpdatingTitle = Гарчгийг хадгалсанд алдаа гарлаа
shotPageShareButton =
    .title = Хуваалцах
shotPageCopy = Хуулах
shotPageCopied = Хуулбарласан
shotPageShareFacebook =
    .title = Facebook–т хуваалцах
shotPageShareTwitter =
    .title = Twitter–д хуваалцах
shotPageSharePinterest =
    .title = Pinterest–эд хуваалцах
shotPageCopyImageText =
    .label = Дүрсийнн бичвэрийг хуулах
# Note: { $date } is a placeholder for a localized future date as returned by Date.toLocaleString.
# For example, in en-US, { $date } could be "7/12/2017, 1:52:50 PM".
shotPageRestoreButton = { $date } хүртэл сэргээх
shotPageDownloadShot =
    .title = Татаж авах
shotPageEditButton =
    .title = Энэ дүрсийг засварлах
shotPageDownload = Татаж авах
# Note: shotPageSelectTime is a placeholder label for the time selection dropdown.
shotPageSelectTime = Үргэлжлэх хугацаагыг сонгох
# The ∞ is used to indicate that the shot won't expire. It is also used in
# shotIndexNoExpirationSymbol. Try to use the same symbol in both strings, or
# if no such symbol is available for a language/culture, simply leave it out.
shotPageKeepIndefinitelyWithSymbol = Тодорхойгүй үргэлжлэх хугацаа ∞
shotPageKeepTenMinutes = 10 минут
shotPageKeepOneHour = 1 цаг
shotPageKeepOneDay = 1 өдөр
shotPageKeepOneWeek = 1 долоо хоног
shotPageKeepTwoWeeks = 2 долоо хоног
shotPageKeepOneMonth = 1 сар
shotPageSaveExpiration = хадгалах
shotPageCancelExpiration = цуцлах
shotPageDoesNotExpire = хугацаа дуусахгүй
# Note: <timediff></timediff> is a placeholder for a future relative time clause, like "in 1 week" or "tomorrow"
shotPageTimeExpiresIn = <timediff></timediff> хугацаа дуусана
# Note: <timediff></timediff> is a placeholder for a past relative time clause, like "1 week ago" or "yesterday"
shotPageTimeExpired = <timediff></timediff> хугацаа дууссан
timeDiffJustNow = мөнөөхөн
timeDiffMinutesAgo =
    { $number ->
        [one] 1 минутын өмнө
       *[other] { $number } минутын өмнө
    }
timeDiffHoursAgo =
    { $number ->
        [one] 1 цагын өмнө
       *[other] { $number } цагын өмнө
    }
timeDiffDaysAgo =
    { $number ->
        [one] өчигдөр
       *[other] { $number } өдрийн өмнө
    }
timeDiffFutureSeconds = хэдэн сэкундын дотор
timeDiffFutureMinutes =
    { $number ->
        [one] 1 минутын дотор
       *[other] { $number } минутын дотор
    }
timeDiffFutureHours =
    { $number ->
        [one] 1 цагын дотор
       *[other] { $number } цагыг дотор
    }
timeDiffFutureDays =
    { $number ->
        [one] маргааш
       *[other] { $number } өдрийн дотор
    }

## Annotations

annotationPenButton =
    .title = Үзэг
annotationHighlighterButton =
    .title = Тодруулагч
annotationUndoButton =
    .title = Үйлдэл буцаах
annotationRedoButton =
    .title = Үйлдэл давтах
# Note: This button reverts all the changes on the image since the start of the editing session.
annotationClearButton =
    .title = Арилгах
annotationCropButton =
    .title = Хайчлах
annotationSaveEditButton = Хадгалах
    .title = Засварыг хадгалах
annotationCancelEditButton = Цуцлах
    .title = Засварыг цуцлах
annotationCropConfirmButton = Бататгах
    .title = Сонгосон хэсгийг бататгах
annotationCropCancelButton = Цуцлах
    .title = Сонголтыг цуцлах
annotationColorWhite =
    .title = цагаан
annotationColorBlack =
    .title = хар
annotationColorRed =
    .title = улаан
annotationColorGreen =
    .title = ногоон
annotationColorBlue =
    .title = хөх
annotationColorYellow =
    .title = шар
annotationColorPurple =
    .title = ягаан
annotationColorSeaGreen =
    .title = тэнгисийн ус мэт ногоон
annotationColorGrey =
    .title = саарал

## Settings Page

settingsDisconnectButton = Холболт салгах
    .title = Холболт салгах
settingsGuestAccountMessage = Зочин хэрэглэгч
settingsSignInButton = Нэвтрэх
    .title = Нэвтрэх
settingsClosePreferences =
    .title = Сонголтуудыг хаах

## Shotindex page

# { $error } is a placeholder for a non-translated error message that could be shared
# with developers when debugging an error.
shotIndexPageErrorRendering = Хуудасыг дүрслэн харуулахт алдаа гарлаа: { $error }
shotIndexPageSearchButton =
    .title = Хайлт
shotIndexPageClearSearchButton =
    .title = Хайлтыг арилгах
shotIndexPagePreviousPage =
    .title = Өмнөх хуудас
shotIndexPageNextPage =
    .title = Дараагийн хуудас

## Delete Confirmation Dialog

shotDeleteCancel = Цуцлах
    .title = Цуцлах
shotDeleteConfirm = Устгах
    .title = Устгах

## Metrics page
## All metrics strings are optional for translation

metricsPageTotalsQueryTitle = Нийт дүн
metricsPageShotsQueryDay = Өдөр
metricsPageUsersQueryCount = Хэрэглэгчийн тоо
metricsPageUsersQueryDay = Өдөр
metricsPageUserShotsQueryCount = Хэрэглэгчийн тоо
metricsPageRetentionQueryUsers = Хэрэглэгчийн тоо
metricsPageTotalRetentionQueryUsers = Хэрэглэгчийн тоо
metricsPageVersionQueryTitle = Нэмэлт хэрэглүүрийн хувилбар
metricsPageVersionQueryUsers = Хэвтрэж баих хэрэглэгчийн тоо
metricsPageVersionQueryVersion = Нэмэлт хэрэглүүрийн хувилбар
metricsPageVersionQueryLastSeen = Өдөр
metricsPageHeader = Хэмжүүр
# Note: { $created } is a placeholder for a localized date and time, like '4/21/2017, 3:40:04 AM'
metricsPageGeneratedDateTime = Үүсгэгдсэн хугацааны тамга: { $created }
# Note { $time } is a placeholder for a number of milliseconds, like '100'
metricsPageDatabaseQueryTime = Өгөгдлийн сангийн хугацааны тамга: ({ $time } мс)
