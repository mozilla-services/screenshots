// Localization for Server-side strings of Firefox Screenshots
// 
// Please don't localize Firefox, Firefox Screenshots, or Screenshots



// Global phrases shared across pages, prefixed with 'g'
[[ global ]]

gMyShots = تصاویر من
gHomeLink = خانه
gNoShots
    .alt = هیچ تصویری پیدا نشد


[[ Footer ]]

// Note: link text for a link to mozilla.org
footerLinkMozilla = موزیلا
footerLinkPrivacy = نکات حفظ حریم‌شخصی
footerLinkDMCA = گزارش تخلف IP
footerLinkDiscourse = ارسال بازخورد
footerLinkRemoveAllData = حذف همه‌ی داده‌ها


[[ Creating page ]]

// Note: { $title } is a placeholder for the title of the web page
// captured in the screenshot. The default, for pages without titles, is
// creatingPageTitleDefault.
creatingPageTitle = ایجاد { $title }
creatingPageTitleDefault = صفحه


[[ Home page ]]

homePageButtonMyShots = برو به عکس‌های من
homePageTeaser = به زودی…
homePageDownloadFirefoxTitle = فایرفاکس
homePageDownloadFirefoxSubTitle = دریافت رایگان
homePageGetStarted = شروع کنید
homePageGetStartedTitle = شروع کنید
homePageSaveShare = ذخیره و اشتراک‌گذاری
homePageLegalLink = حقوقی
homePagePrivacyLink = حریم‌خصوصی
homePageTermsLink = شرایط
homePageCookiesLink = کوکی‌ها


[[ Leave Screenshots page ]]

leavePageConfirmDelete = تایید حذف حساب کاربری
leavePageErrorGeneric = خطایی رخ داده است.
leavePageButtonProceed = ادامه
leavePageButtonCancel = لغو


[[ Not Found page ]]

notFoundPageTitle = صفحه پیدا نشد
notFoundPageDescription = صفحه پیدا نشد.


[[ Shot page ]]

shotPageShareButton
    .title = هم‌رسانی
shotPageCopy = رونوشت
shotPageCopied = رونوشت شد
shotPageShareFacebook
    .title = هم‌رسانی در فیسبوک
shotPageShareTwitter
    .title = هم‌رسانی در توییتر
shotPageSharePinterest
    .title = هم‌رسانی در پینترست
shotPageShareEmail
    .title = هم‌رسانی پیوند از طریق ایمیل
shotPagePrivacyMessage = هر کسی با این پیوند می‌تواند این عکس را ببیند.
shotPageDownloadShot
    .title = دریافت
shotPageDownload = دریافت
shotPageUpsellFirefox = هم اکنون فایرفاکس را دریافت کنید
shotPageKeepFor = چه مدت این عکس باید حفظ شود؟
// Note: shotPageSelectTime is a placeholder label for the time selection dropdown.
shotPageSelectTime = انتخاب زمان
shotPageKeepIndefinitely = نامحدود
shotPageKeepTenMinutes = ‏‏۱۰ دقیقه
shotPageKeepOneHour = ۱ ساعت
shotPageKeepOneDay = ‏‏۱ روز
shotPageKeepOneWeek = ‏‏۱ هفته
shotPageKeepTwoWeeks = ‏‏۲ هفته
shotPageKeepOneMonth = ‏‏۱ ماه
shotPageSaveExpiration = ذخیره
shotPageCancelExpiration = لغو
shotPageDoesNotExpire = منقضی نمی‌شود
// Note: { $timediff } is a placeholder for a future relative time clause, like "in 1 week" or "tomorrow"
shotPageExpiresIn = { $timediff } منقضی می‌شود
// Note: { $timediff } is a placeholder for a past relative time clause, like "1 week ago" or "yesterday"
shotPageExpired = منقضی شده { $timediff }
timeDiffJustNow = هم‌اکنون
timeDiffMinutesAgo = { $num ->
       *[other] ۱ دقیقه پیش
    }
timeDiffHoursAgo = { $num ->
       *[other] ۱ ساعت پیش
    }
timeDiffDaysAgo = { $num ->
       *[other] دیروز
    }
timeDiffFutureSeconds = چند ثانیه پیش
timeDiffFutureMinutes = { $num ->
       *[other] در یک دقیقه
    }
timeDiffFutureHours = { $num ->
       *[other] در یک ساعت
    }
timeDiffFutureDays = { $num ->
       *[other] فردا
    }


[[ Shotindex page ]]

// { $status } is a placeholder for an HTTP status code, like '500'.
// { $statusText } is a text description of the status code, like 'Internal server error'.
shotIndexPageErrorDeletingShot = خطا هنگام پاک کردن عکس: { $status } { $statusText }
// { $searchTerm } is a placeholder for text the user typed into the search box
shotIndexPageSearchResultsTitle = عکس‌های من : جستجو کن برای { $searchTerm }
shotIndexPageSearchPlaceholder
    .placeholder = جستجو در عکس‌های من
shotIndexPageSearchButton
    .title = جستجو
shotIndexPageNoShotsMessage = عکس ذخیره شده‌ای وجود ندارد.
shotIndexPageNoShotsInvitation = ادامه بده، چندتا بساز.
shotIndexPageLookingForShots = در حال گشتن برای عکس‌های شما…
shotIndexPageNoSearchResultsIntro = همم
shotIndexPageNoSearchResults = نمی‌توانیم هیچ عکسی مطابق با آنچه جستحو کردید بیابیم.
shotIndexPageClearSearchButton
    .title = پاک کردن جستجو
shotIndexPageConfirmShotDelete = حذف این عکس؟


// all metrics strings are optional for translation
[[ Metrics page ]]

// Note: 'Firefox Screenshots' should not be translated
metricsPageTitle = معیار‌های Firefox Screenshots
metricsPageTotalsQueryTitle = مجموع
// Note: Screenshots is an abbreviation for Firefox Screenshots, and should not be translated.
metricsPageTotalsQueryDescription = یک نگاه کلی به Screenshots
metricsPageTotalsQueryDevices = مجموع دستگاه‌های ثبت شده
metricsPageTotalsQueryActiveShots = عکس‌های فعال
metricsPageTotalsQueryExpiredShots = منقضی شده (اما قابل بازیابی)
metricsPageTotalsQueryExpiredDeletedShots = منقضی شده (و حذف شده)
metricsPageShotsQueryTitle = عکس‌های روز
metricsPageShotsQueryDescription = تعداد عکس‌هایی که در هر روز ایجاد شده (در ۳۰ روز گذشته)
metricsPageShotsQueryCount = تعداد عکس‌ها
metricsPageShotsQueryDay = روز
metricsPageUsersQueryTitle = کاربران هر روز
metricsPageUsersQueryDescription = تعداد کاربرانی که حداقل یک عکس ایجاد کرده‌اند، روزانه (در ۳۰ روز گذشته)
metricsPageUsersQueryCount = تعداد کاربران
metricsPageUsersQueryDay = روز
metricsPageUserShotsQueryTitle = تعداد عکس‌ها برای هر کاربر
metricsPageUserShotsQueryDescription = تعداد کاربرانی که در مجموع حدود N عکس دارند
metricsPageUserShotsQueryCount = تعداد کاربران
metricsPageUserShotsQueryShots = تعداد تقریبی عکس‌های فعال (منقضی نشده)
metricsPageRetentionQueryDescription = تعداد روز‌ها از نخستین عکس کاربر تا آخرین عکس، گروه بندی‌شده بر اساس هفته آغازین
metricsPageRetentionQueryUsers = تعداد کاربران
metricsPageRetentionQueryDays = فاصله روزهای بین نخستین تا آخرین عکس کاربر
metricsPageRetentionQueryFirstWeek = هفته‌ای که کاربر اول عکس خود را ایجاد کرده است
metricsPageTotalRetentionQueryDescription = مدت زمانی که کاربر در حال ایجاد عکس بوده است، گروه‌بندی شده بر اساس هفته
metricsPageTotalRetentionQueryUsers = تعداد کاربران
metricsPageTotalRetentionQueryDays = روز‌هایی که کاربر عکس ایجاد کرده است
metricsPageVersionQueryTitle = نسخه افزونه
metricsPageVersionQueryDescription = نسخه افزونه مورد استفاده در هنگام ورود، در 1۴ روز گذشته
metricsPageVersionQueryUsers = تعداد کاربران در حال ورود
metricsPageVersionQueryVersion = نسخه افزونه
metricsPageVersionQueryLastSeen = روز
metricsPageHeader = معیارها
// Note: { $created } is a placeholder for a localized date and time, like '4/21/2017, 3:40:04 AM'
metricsPageGeneratedDateTime = تولید شده در: { $created }
// Note { $time } is a placeholder for a number of milliseconds, like '100'
metricsPageDatabaseQueryTime = (زمان پایگاه‌داده: { $time }ms)
