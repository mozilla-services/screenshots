### Localization for Server-side strings of Firefox Screenshots
### Please don't localize Firefox, Firefox Screenshots, or Screenshots


## Global phrases shared across pages, prefixed with 'g'

gMyShots = Ekran Görüntülərim
gHomeLink = Ev
gNoShots =
    .alt = Ekran görüntüsü tapılmadı

## Footer

# Note: link text for a link to mozilla.org
footerLinkMozilla = Mozilla
footerLinkTerms = Şərtlər
footerLinkPrivacy = Məxfilik Bildirişi
footerLinkFaqs = ÇSS
footerLinkDMCA = Müəllif hüquqlarının pozuntusu haqqında xəbər ver
footerLinkDiscourse = Əks-əlaqə ver
footerLinkRemoveAllData = Bütün məlumatları sil

## Creating page

# Note: { $title } is a placeholder for the title of the web page
# captured in the screenshot. The default, for pages without titles, is
# creatingPageTitleDefault.
creatingPageTitle = { $title } yaradılır
creatingPageTitleDefault = səhifə

## Home page

homePageDescription =
    .content = İntuitiv ekran görüntüləri səyyaha bağlıdırlar. İnterneti Firefox ilə gəzərkən ekran görüntülərini çəkin, saxlayın və paylaşın.
homePageButtonMyShots = Ekran görüntülərimə get
homePageTeaser = Tezliklə…
homePageDownloadFirefoxTitle = Firefox
homePageDownloadFirefoxSubTitle = Pulsuz Endir
homePageGetStarted = Başla
# Note: do not translate 'Firefox Screenshots' when translating this string
homePageHowScreenshotsWorks = Firefox Ekran Görüntüləri necə işləyir
homePageGetStartedTitle = Başla
homePageCaptureRegion = Bölgəni çək
homePageCapturePage = Səhifəni çək
homePageSaveShare = Saxla və Paylaş
homePageLegalLink = Hüquqi
homePagePrivacyLink = Məxfilik
homePageTermsLink = Şərtlər
homePageCookiesLink = Çərəzlər

## Leave Screenshots page

leavePageRemoveAllData = Bütün məlumatlar silindi
leavePageErrorGeneric = Xəta baş verdi
leavePageButtonProceed = Davam et
leavePageButtonCancel = Ləğv et
leavePageDeleted = Bütün ekran görüntüləriniz silindi!

## Not Found page

notFoundPageTitle = Səhifə tapılmadı
notFoundPageIntro = Uups.
notFoundPageDescription = Səhifə tapılmadı.

## Shot page

# This is the HTML title tag of the page
shotPageTitle = Ekran görüntüsü: { $originalTitle }
shotPageShareButton =
    .title = Paylaş
shotPageCopy = Köçür
shotPageCopied = Köçürüldü
shotPageShareFacebook =
    .title = Facebook-da paylaş
shotPageShareTwitter =
    .title = Twitter-də paylaş
shotPageSharePinterest =
    .title = Pinterest-də paylaş
shotPageShareEmail =
    .title = Keçidi e-poçt ilə paylaş
shotPageDownloadShot =
    .title = Endir
shotPageDownload = Endir
# Note: shotPageSelectTime is a placeholder label for the time selection dropdown.
shotPageSelectTime = Vaxtı seçin
# The ∞ is used to indicate that the shot won't expire. It is also used in
# shotIndexNoExpirationSymbol. Try to use the same symbol in both strings, or
# if no such symbol is available for a language/culture, simply leave it out.
shotPageKeepIndefinitelyWithSymbol = Sonsuz ∞
shotPageKeepTenMinutes = 10 dəqiqə
shotPageKeepOneHour = 1 saat
shotPageKeepOneDay = 1 gün
shotPageKeepOneWeek = 1 həftə
shotPageKeepTwoWeeks = 2 həftə
shotPageKeepOneMonth = 1 ay
shotPageSaveExpiration = saxla
shotPageCancelExpiration = ləğv et
shotPageDoesNotExpire = vaxtı çıxmasın
# Note: { $timediff } is a placeholder for a future relative time clause, like "in 1 week" or "tomorrow"
shotPageExpiresIn = { $timediff } silinəcək
# Note: { $timediff } is a placeholder for a past relative time clause, like "1 week ago" or "yesterday"
shotPageExpired = { $timediff } silindi
timeDiffJustNow = indicə
timeDiffMinutesAgo = { $number ->
        [one] 1 dəqiqə əvvəl
       *[other] { $number } dəqiqə əvvəl
    }
timeDiffHoursAgo = { $number ->
        [one] 1 saat əvvəl
       *[other] { $number } saat əvvəl
    }
timeDiffDaysAgo = { $number ->
        [one] dünən
       *[other] { $number } gün əvvəl
    }
timeDiffFutureSeconds = bir neçə saniyə sonra
timeDiffFutureMinutes = { $number ->
        [one] 1 dəqiqə sonra
       *[other] { $number } dəqiqə sonra
    }
timeDiffFutureHours = { $number ->
        [one] 1 saat sonra
       *[other] { $number } saat sonra
    }
timeDiffFutureDays = { $number ->
        [one] sabah
       *[other] { $number } gün sonra
    }

## Annotations

# Note: This button reverts all the changes on the image since the start of the editing session.
annotationClearButton =
    .title = Təmizlə
annotationCropButton =
    .title = Kəs
annotationCropConfirmButton = Təsdiqlə
    .title = Seçilənləri təsdiqlə
annotationCropCancelButton = Ləğv et
    .title = Seçilənləri ləğv et

## Shotindex page

shotIndexPageSearchButton =
    .title = Axtar
shotIndexPageClearSearchButton =
    .title = Axtarışı təmizlə
shotIndexPageConfirmShotDelete = Bu görüntü silinsin?
shotIndexPagePreviousPage =
    .title = Əvvəlki səhifə
shotIndexPageNextPage =
    .title = Sonrakı səhifə
# This symbol is used in the lower right corner of the card for a shot on the
# My Shots page to indicate that the shot does not expire. It should be a
# single character (or simply nothing if no such symbol is available for a
# language/culture).
shotIndexNoExpirationSymbol = ∞
    .title = Bu görüntünün vaxtı çıxmır

## Metrics page
## All metrics strings are optional for translation

metricsPageShotsQueryDay = Gün
metricsPageUsersQueryDay = Gün
metricsPageVersionQueryVersion = Əlavə versiyası
metricsPageVersionQueryLastSeen = Gün
