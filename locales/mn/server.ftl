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
homePageSaveShare = Хадгалаад хуваалцах
homePageLegalLink = Эрхзүй
homePagePrivacyLink = Нууцлал
homePageTermsLink = Үйлчилгээний нөхцөл
homePageCookiesLink = Күүкий

## Leave Screenshots page

leavePageErrorGeneric = Алдаа гарлаа
leavePageButtonProceed = Үргэлжлүүлэх
leavePageButtonCancel = Болих

## Not Found page

notFoundPageTitle = Хуудас олдоогүй
notFoundPageIntro = Өө!
notFoundPageDescription = Хуудас олдоогүй.

## Shot page

# This is the HTML title tag of the page
shotPageTitle = Дэлгэцийн зураг: { $originalTitle }
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
    .label = Зургын бичвэрийг хуулах
shotPageDownloadShot =
    .title = Татаж авах
shotPageDownload = Татаж авах
shotPageKeepTenMinutes = 10 минут
shotPageKeepOneHour = 1 цаг
shotPageKeepOneDay = 1 өдөр
shotPageKeepOneWeek = 1 долоо хоног
shotPageKeepTwoWeeks = 2 долоо хоног
shotPageKeepOneMonth = 1 сар
shotPageSaveExpiration = хадгалах
shotPageCancelExpiration = болих
# Note: { $timediff } is a placeholder for a past relative time clause, like "1 week ago" or "yesterday"
shotPageExpired = { $timediff } хугацаа дууссан
timeDiffDaysAgo =
    { $number ->
        [one] өчигдөр
       *[other] { $number } өдрийн өмнө
    }
timeDiffFutureDays =
    { $number ->
        [one] маргааш
       *[other] { $number } өдрийн дотор
    }

## Annotations

annotationSaveEditButton = Хадгалах
    .title = Засварыг хадгалах
annotationCancelEditButton = Болих
    .title = Засварыг болих
annotationCropCancelButton = Болих
    .title = Сонголтыг болих
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


## Shotindex page

# { $error } is a placeholder for a non-translated error message that could be shared
# with developers when debugging an error.
shotIndexPageErrorRendering = Хуудасыг дүрслэн харуулахт алдаа гарлаа: { $error }

## Delete Confirmation Dialog

shotDeleteCancel = Болих
    .title = Болих
shotDeleteConfirm = Устгах
    .title = Устгах

## Metrics page
## All metrics strings are optional for translation

metricsPageShotsQueryDay = Өдөр
metricsPageUsersQueryDay = Өдөр
metricsPageVersionQueryLastSeen = Өдөр
