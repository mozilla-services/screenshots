### Localization for Server-side strings of Firefox Screenshots
### Please don't localize Firefox, Firefox Screenshots, or Screenshots


## Global phrases shared across pages, prefixed with 'g'

gMyShots = Skrinshotlar
gHomeLink = Uy
gNoShots =
    .alt = Rasmlar topilmadi
gScreenshotsDescription = Skrinshot olish osonlashdi. Firefox brauzeridan chiqmasdan skrinshot olish, saqlash va bo‘lishish mumkin.
gSettings = Sozlamalar
gSignIn = Kirish

## Header

buttonSettings =
    .title = Sozlamalar
buttonSignIn =
    .title = Kirish
screenshotsLogo =
    .title = Skrinshot bosh sahifasi
bannerMessage = Turli qurilmalaringizdan skrinshotlarga kirish va saqlash uchun hisobingizga kiring yoki ro‘yxatdan o‘ting.
bannerUpsell = { gScreenshotsDescription } <a>Firefoxni yuklab olish</a>

## Footer

# Note: link text for a link to mozilla.org
footerLinkMozilla = Mozilla
footerLinkTerms = Shartlar
footerLinkPrivacy = Maxfiylik eslatmalari
footerReportShot = Skrinshot ustidan shikoyat qilish
    .title = Bu skrinshotni spam yoki haqorat sifatida xabar berish
footerLinkFaqs = Savol-javob
footerLinkDMCA = Mualliflik huquqi buzilgan deb xabar berish
footerLinkDiscourse = Mulohaza bildirish
footerLinkRemoveAllData = Barcha ma’lumotlarni tozalash

## Creating page

# Note: { $title } is a placeholder for the title of the web page
# captured in the screenshot. The default, for pages without titles, is
# creatingPageTitleDefault.
creatingPageTitle = { $title } yaratilmoqda
creatingPageTitleDefault = sahifa
creatingPageWaitMessage = Rasm saqlanmoqda…

## Home page

homePageDescription =
    .content = Endi brauzerda skrinshot olish osonlashdi. Internetga Firefox bilan kirganingizda skrinshot olish, saqlash va ulashish mumkin.
homePageButtonMyShots = Skrinshotlarga o‘tish
homePageTeaser = Tezda…
homePageDownloadFirefoxTitle = Firefox
homePageDownloadFirefoxSubTitle = Bepul yuklab olish
# Note: do not translate 'Firefox Screenshots' when translating this string
homePageHowScreenshotsWorks = Firefox Screenshots’dan foydalanish
homePageGetStartedTitle = Boshlash
# Note: Screenshots is an abbreviation for Firefox Screenshots, and should not be translated.
homePageGetStartedDescription = Asboblar panelidan yangi Skrinshotlar rasmchasini toping. Uni tanlang va brauzer oynasining tepasida Skrinshotlar menyusi paydo bo‘ladi.
homePageCaptureRegion = Hududni rasmga olish
homePageCapturePage = Sahifani rasmga olish
homePageSaveShare = Saqlash va bo‘lishish
# Note: Screenshots is an abbreviation for Firefox Screenshots, and should not be translated.
homePageSaveShareDescription = Skrinshot olsangiz, Firefox uni onlayn skrinshotlar kutubxonasiga joylaydi va havolasidan vaqtinchalik xotiraga nusxa oladi. Biz skrinshotlarni 2 hafta saqlab turamiz. Bu vaqt ichida xohlagan vaqtingizda ularni o‘chirishingiz yoki saqlanish muddatini uzaytirishingiz mumkin.
homePageLegalLink = Qonuniy
homePagePrivacyLink = Maxfiylik
homePageTermsLink = Shartlar
homePageCookiesLink = Kukilar

## Leave Screenshots page

leavePageRemoveAllData = Barcha ma’lumotlarni olib tashlash
# Note: do not translate 'Firefox Screenshots' when translating this string
leavePageErrorAddonRequired = Hisobingizni o‘chirish uchun Firefox Skrinshotlar o‘rnatilgan bo‘lishi lozim
leavePageErrorGeneric = Xato yuz berdi
# Note: do not translate 'Firefox Screenshots' when translating this string
leavePageWarning = Firefox Skrinshotlar ma’lumotlari tozalab tashlanadi.
leavePageButtonProceed = Davom etish
leavePageButtonCancel = Bekor qilish
leavePageDeleted = Barcha skrinshotlar o‘chirildi!

## Not Found page

notFoundPageTitle = Sahifa topilmadi
notFoundPageIntro = Obbo.
notFoundPageDescription = Sahifa topilmadi.

## Shot page

# This is the HTML title tag of the page
shotPageTitle = Skrinshot: { $originalTitle }
shotPageAlertErrorUpdatingExpirationTime = Muddat saqlanmadi
shotPageAlertErrorDeletingShot = Skrinshot o‘chmadi
shotPageAlertErrorUpdatingTitle = Nomi saqlanmadi
shotPageConfirmDelete = Bu skrinshotni o‘chirmoqchimisiz?
shotPageShareButton =
    .title = Bo‘lishish
shotPageCopy = Nusxa olish
shotPageCopyButton =
    .title = Rasmga vaqtinchalik xotiraga nusxa olish
shotPageCopied = Nusxa olindi
shotPageShareFacebook =
    .title = Facebookda bo‘lishish
shotPageShareTwitter =
    .title = Twitterda bo‘lishish
shotPageSharePinterest =
    .title = Pinterestda bo‘lishish
shotPageShareEmail =
    .title = Havolani pochta orqali bo‘lishish
shotPageShareLink = Bu skrinshot uchun bo‘lishiladigan havolani olish:
shotPagePrivacyMessage = Bu havolani olgan har qanday inson skrinshotni ko‘ra oladi.
shotPageCopyImageText =
    .label = Rasm matnidan nusxa olish
shotPageConfirmDeletion = Bu skrinshotni butunlay o‘chirib tashlamoqchimisiz?
# Note: <timediff></timediff> is a placeholder for a future relative time clause like 'in 3 days' or 'tomorrow'
shotPageTimeExpirationMessage = Hech nima qilmasangiz, bu skrinshot <timediff></timediff> o‘chib ketadi.
# Note: { $date } is a placeholder for a localized future date as returned by Date.toLocaleString.
# For example, in en-US, { $date } could be "7/12/2017, 1:52:50 PM".
shotPageRestoreButton = { $date }gacha tiklash
shotPageExpiredMessage = Bu skrinshot muddati tugadi.
# Note: This phrase is followed by an empty line, then the URL of the source page
shotPageExpiredMessageDetails = Bu sahifa aslida quyidagidan yaratilgan:
shotPageDeleteButton =
    .title = Bu skrinshotni o‘chirish
shotPageDownloadShot =
    .title = Yuklab olish
shotPageEditButton =
    .title = Bu rasmni tahrirlash
shotPagefavoriteButton =
    .title = Bu skrinshotni sevimli deb belgilash
shotPageBackToHomeButton =
    .title = Bosh sahifa
shotPageAllShotsButton =
    .title = Barcha skrinshotlar
shotPageAllShots = Barcha skrinshotlar
shotPageDownload = Yuklab olish
# Note: Draw text is used on shot page as a verb (action)
shotPageDraw = Chizish
# Note: Favorite text is used on shot page as a verb (action)
shotPageFavorite = Sevimli
shotPageDelete = O‘chirish
# Note: shotPageSelectTime is a placeholder label for the time selection dropdown.
shotPageSelectTime = Vaqtni tanlang
shotPageKeepTenMinutes = 10 daqiqa
shotPageKeepOneHour = 1 soat
shotPageKeepOneDay = 1 kun
shotPageKeepOneWeek = 1 hafta
shotPageKeepTwoWeeks = 2 hafta
shotPageKeepOneMonth = 1 oy
shotPageSaveExpiration = saqlash
shotPageCancelExpiration = bekor qilish
shotPageDoesNotExpire = muddati tugamaydi
# Note: <timediff></timediff> is a placeholder for a future relative time clause, like "in 1 week" or "tomorrow"
shotPageTimeExpiresIn = <timediff></timediff> muddati tugaydi
# Note: <timediff></timediff> is a placeholder for a past relative time clause, like "1 week ago" or "yesterday"
shotPageTimeExpired = <timediff></timediff> muddati tugagan
timeDiffJustNow = hozir
timeDiffMinutesAgo =
    { $number ->
        [one] 1 daqiqa oldin
       *[other] { $number } daqiqa oldin
    }
timeDiffHoursAgo =
    { $number ->
        [one] 1 soat oldin
       *[other] { $number } soat oldin
    }
timeDiffDaysAgo =
    { $number ->
        [one] kecha
       *[other] { $number } kun oldin
    }
timeDiffFutureSeconds = bir necha soniya oldin

## Shot Page New Feature Promotion Dialog.


## Annotations


## The following are the title and message for an error displayed as a Firefox
## notification. It is triggered by an action in the shot page and the strings
## are passed from the shot page to the addon.


## Settings Page


## Shotindex page

shotIndexSyncedShot =
    .title = Skrinshot boshqa qurilmada olingan

## Delete Confirmation Dialog

shotDeleteConfirmationMessage = Bu skrinshotni o‘chirmoqchimisiz?
shotDeleteCancel = Bekor qilish
    .title = Bekor qilish
shotDeleteConfirm = O‘chirsh
    .title = O‘chirsh

## Metrics page
## All metrics strings are optional for translation

# Note: 'Firefox Screenshots' should not be translated
metricsPageTitle = Firefrox Screenshots statistikasi
metricsPageTotalsQueryTitle = Jami
# Note: Screenshots is an abbreviation for Firefox Screenshots, and should not be translated.
metricsPageTotalsQueryDescription = Skrinshotlar ko‘rinishi
metricsPageTotalsQueryDevices = Ro‘yxatdan o‘tgan jami qurilmalar
metricsPageTotalsQueryActiveShots = Faol skrinshotlar
metricsPageTotalsQueryExpiredShots = Muddat tugadi (lekin tiklasa bo‘ladi)
metricsPageTotalsQueryExpiredDeletedShots = Muddati tugadi (va o‘chirildi)
metricsPageShotsQueryTitle = Kunlik skrinshotlar
metricsPageShotsQueryDescription = Har kuni yaratilgan skrinshotlar soni (30 kun ichida)
metricsPageShotsQueryCount = Skrinshotlar soni
metricsPageShotsQueryDay = Kun
metricsPageUsersQueryTitle = Kunlik foydalanuvchilar
metricsPageUsersQueryDescription = Kunlik kamida bitta skrinshot yaratgan foydalanuvchilar soni (30 kun ichida)
metricsPageUsersQueryCount = Foydalanuvchilar soni
metricsPageUsersQueryDay = Kun
