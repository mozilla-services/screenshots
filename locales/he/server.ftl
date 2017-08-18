// Localization for Server-side strings of Firefox Screenshots
// 
// Please don't localize Firefox, Firefox Screenshots, or Screenshots



// Global phrases shared across pages, prefixed with 'g'
[[ global ]]

gMyShots = צילומי המסך שלי
gHomeLink = בית
gNoShots
    .alt = לא נמצאו צילומי מסך
gScreenshotsDescription = כעת קל יותר ללכוד צילומי מסך. ניתן לצלם, לשמור ולשתף צילומי מסך מבלי לעזוב את Firefox.


[[ Footer ]]

// Note: link text for a link to mozilla.org
footerLinkMozilla = Mozilla
footerLinkTerms = תנאים
footerLinkPrivacy = הצהרת פרטיות
footerLinkDMCA = דיווח על הפרת קניית רוחני
footerLinkDiscourse = מתן משוב
footerLinkRemoveAllData = הסרת כל הנתונים


[[ Creating page ]]

// Note: { $title } is a placeholder for the title of the web page
// captured in the screenshot. The default, for pages without titles, is
// creatingPageTitleDefault.
creatingPageTitle = { $title } נוצר
creatingPageTitleDefault = עמוד
creatingPageWaitMessage = שמירת צילום המסך שלך...


[[ Home page ]]

homePageDescription
    .content = היכולת לצלם את המסך באופן שמותאם לדפדפן. ניתן לצלם, לשמור ולשתף צילומי מסך תוך גלישה באינטרנט בעזרת Firefox.
homePageButtonMyShots = מעבר לצילומי המסך שלי
homePageTeaser = בקרוב...
homePageDownloadFirefoxTitle = Firefox
homePageDownloadFirefoxSubTitle = הורדה חינמית
homePageGetStarted = תחילת עבודה
// Note: do not translate 'Firefox Screenshots' when translating this string
homePageHowScreenshotsWorks = איך Firefox Screenshots עובד
homePageGetStartedTitle = תחילת עבודה
// Note: Screenshots is an abbreviation for Firefox Screenshots, and should not be translated.
homePageGetStartedDescription = לפניך סמל חדש ל־Screenshots בסרגל הכלים שלך. עם בחירתו יופיע תפריט על גבי חלון הדפדפן שלך.
homePageCaptureRegion = לכידת אזור
// Note: Screenshots is an abbreviation for Firefox Screenshots, and should not be translated.
homePageCaptureRegionDescription = יש ללחוץ ולגרור כדי לבחור את האזור לצילום. או לעבור מעל ואז ללחוץ - Screenshots יבחר את האזור בשבילך. אהבת את התוצאה? יש לבחור בשמירה כדי לגשת לצילומי המסך המקוונים שלך או בחץ כלפי מטה כדי להוריד אותו למחשב שלך.
homePageCapturePage = לכידת דף
homePageCapturePageDescription = ניתן להשתמש בכפתורים שבפינה השמאלית העליונה כדי לצלם עמודים שלמים. הכפתור לשמירת הגלוי יצלם את האיזור הגלוי מבלי לגלול לעומת שמירת העמוד במלואו שיצלם את כל העמוד.
homePageSaveShare = שמירה ושיתוף
// Note: Screenshots is an abbreviation for Firefox Screenshots, and should not be translated.
homePageSaveShareDescription = בעת צילום, Firefox מפרסם את הצילומים שלך לספרייה המקוונת שלך ב־Screenshots ומעתיקה את הקישור ללוח הגזירים שלך. אנו מאחסנים את הצילומים שלך אוטומטית למשך שבועיים, אך ניתן למחוק אותם בכל עת או לשנות את מועד התפוגה כדי להשאיר אותם בספרייה שלך למשך זמן ארוך יותר.
homePageLegalLink = מידע משפטי
homePagePrivacyLink = פרטיות
homePageTermsLink = תנאים
homePageCookiesLink = עוגיות


[[ Leave Screenshots page ]]

leavePageRemoveAllData = הסרת כל הנתונים שלך
// Note: do not translate 'Firefox Screenshots' when translating this string
leavePageErrorAddonRequired = על Firefox Screenshots להיות מותקן כדי למחוק את החשבון שלך
leavePageErrorGeneric = אירעה שגיאה
// Note: do not translate 'Firefox Screenshots' when translating this string
leavePageWarning = פעולה זו תמחק לצמיתות את כל נתוני ה־Firefox Screenshots שלך.
leavePageButtonProceed = המשך
leavePageButtonCancel = ביטול
leavePageDeleted = כל צילומי המסך שלך נמחקו!


[[ Not Found page ]]

notFoundPageTitle = העמוד לא נמצא
notFoundPageIntro = אוי.
notFoundPageDescription = העמוד לא נמצא.


[[ Shot page ]]

// This is the HTML title tag of the page
shotPageTitle = צילום מסך: { $originalTitle }
shotPageAlertErrorUpdatingExpirationTime = שגיאה בשמירת תפוגה
shotPageAlertErrorDeletingShot = שגיאה במחיקת צילום המסך
shotPageAlertErrorUpdatingTitle = שגיאה בשמירת הכותרת
shotPageConfirmDelete = האם ברצונך למחוק צילום מסך זה לצמיתות?
shotPageShareButton
    .title = שיתוף
shotPageCopy = העתקה
shotPageCopied = הועתק
shotPageShareFacebook
    .title = שיתוף ב־Facebook
shotPageShareTwitter
    .title = שיתוף ב־Twitter
shotPageSharePinterest
    .title = שיתוף ב־Pinterest
shotPageShareEmail
    .title = שיתוף קישור באמצעות דוא״ל
shotPageShareLink = קבלת קישור לצילום מסך זה הניתן לשיתוף:
shotPagePrivacyMessage = לכל מי שיש את הקישור יש גישה לצילום הזה.
shotPageCopyImageText
    .label = העתקת הטקסט שבתמונה
shotPageConfirmDeletion = האם ברצונך למחוק צילום מסך זה לצמיתות?
// Note: { $timediff } is a placeholder for a future relative time clause like 'in 3 days' or 'tomorrow'
shotPageExpirationMessage = אם לא ייעשה דבר, צילום מסך זה יימחק לצמיתות { $timediff }.
// Note: { $date } is a placeholder for a localized future date as returned by Date.toLocaleString.
// For example, in en-US, { $date } could be "7/12/2017, 1:52:50 PM".
shotPageRestoreButton = שחזור עד { $date }
shotPageExpiredMessage = פג תוקפו של צילום מסך זה.
// Note: This phrase is followed by an empty line, then the URL of the source page
shotPageExpiredMessageDetails = כאן העמוד ממנו זה נוצר במקור:
shotPageDeleteButton
    .title = מחיקת צילום מסך זה
shotPageAbuseButton
    .title = דיווח על צילום זה כפוגעני, מטריד או כל בעיה אחרת
shotPageDownloadShot
    .title = הורדה
shotPageDownload = הורדה
shotPageScreenshotsDescription = כעת קל יותר ללכוד צילומי מסך. ניתן לצלם, לשמור ולשתף צילומי מסך מבלי לעזוב את Firefox.
shotPageUpsellFirefox = קבלת Firefox כעת
shotPageDMCAMessage = צילום זה אינו זמין עוד עקב דרישת קניין רוחני על ידי גורם צד שלישי.
// Note: { $dmca } is a placeholder for a link to send email (a 'mailto' link)
shotPageDMCAContact = נא לשלוח דוא״ל אל { $dmca } על מנת לבקש מידע נוסף.
// Note: do not translate 'Firefox Screenshots' when translating this string
shotPageDMCAWarning = אם ה־Shots שלך כפופים למגוון דרישות אנו עשויים לשלול ממך את הגישה ל־Firefox Screenshots.
// Note: { $url } is a placeholder for a shot page URL
shotPageDMCAIncludeLink = נא לכלול את הכתובת של הצילום הזה בהודעת הדוא״ל שלך: { $url }
shotPageKeepFor = לכמה זמן יש לשמור צילום מסך זה?
// Note: shotPageSelectTime is a placeholder label for the time selection dropdown.
shotPageSelectTime = בחירת זמן
shotPageKeepIndefinitely = ללא הגבלת זמן
shotPageKeepTenMinutes = 10 דקות
shotPageKeepOneHour = שעה
shotPageKeepOneDay = יום
shotPageKeepOneWeek = שבוע
shotPageKeepTwoWeeks = שבועיים
shotPageKeepOneMonth = חודש
shotPageSaveExpiration = שמירה
shotPageCancelExpiration = ביטול
shotPageDoesNotExpire = אין תפוגה
// Note: { $timediff } is a placeholder for a future relative time clause, like "in 1 week" or "tomorrow"
shotPageExpiresIn = תפוגה { $timediff }
// Note: { $timediff } is a placeholder for a past relative time clause, like "1 week ago" or "yesterday"
shotPageExpired = פג תוקפו { $timediff }
timeDiffJustNow = ממש עכשיו
timeDiffMinutesAgo = { $num ->
        [one] לפני דקה
       *[other] לפני { $number } דקות
    }
timeDiffHoursAgo = { $num ->
        [one] לפני שעה
       *[other] לפני { $number } שעות
    }
timeDiffDaysAgo = { $num ->
        [one] אתמול
       *[other] לפני { $number } ימים
    }
timeDiffFutureSeconds = תוך מספר שניות
timeDiffFutureMinutes = { $num ->
        [one] בעוד דקה
       *[other] בעוד { $number } דקות
    }
timeDiffFutureHours = { $num ->
        [one] בעוד שעה
       *[other] בעוד { $number } שעות
    }
timeDiffFutureDays = { $num ->
        [one] מחר
       *[other] בעוד { $number } ימים
    }


[[ Shotindex page ]]

// { $status } is a placeholder for an HTTP status code, like '500'.
// { $statusText } is a text description of the status code, like 'Internal server error'.
shotIndexPageErrorDeletingShot = שגיאה במחיקת צילום מסך: { $status } { $statusText }
// { $searchTerm } is a placeholder for text the user typed into the search box
shotIndexPageSearchResultsTitle = צילומי המסך שלי: חיפוש עבור { $searchTerm }
// { $error } is a placeholder for a non-translated error message that could be shared
// with developers when debugging an error.
shotIndexPageErrorRendering = שגיאה בעת עיבוד העמוד להצגה: { $error }
shotIndexPageSearchPlaceholder
    .placeholder = חיפוש בצילומי המסך שלי
shotIndexPageSearchButton
    .title = חיפוש
shotIndexPageNoShotsMessage = אין צילומי מסך שמורים.
shotIndexPageNoShotsInvitation = קדימה, הבה ניצור כמה.
shotIndexPageLookingForShots = מתבצע חיפוש אחר הצילומים שלך…
shotIndexPageNoSearchResultsIntro = הממ
shotIndexPageNoSearchResults = לא מצאנו שום צילומי מסך התואמים לחיפוש שלך.
shotIndexPageClearSearchButton
    .title = ניקוי חיפוש
shotIndexPageConfirmShotDelete = האם למחוק צילום מסך זה?


// all metrics strings are optional for translation
[[ Metrics page ]]

// Note: 'Firefox Screenshots' should not be translated
metricsPageTitle = מדדים של Firefox Screenshots
metricsPageTotalsQueryTitle = סיכומים
// Note: Screenshots is an abbreviation for Firefox Screenshots, and should not be translated.
metricsPageTotalsQueryDescription = סקירה של Screenshots
metricsPageTotalsQueryDevices = סך כל ההתקנים הרשומים
metricsPageTotalsQueryActiveShots = צילומי מסך פעילים
metricsPageTotalsQueryExpiredShots = פג (אך ניתן לשחזור)
metricsPageTotalsQueryExpiredDeletedShots = פג (ונמחק)
metricsPageShotsQueryTitle = צילומי מסך לפי יום
metricsPageShotsQueryDescription = מספר צילומי המסך שנוצרו בכל יום (עבור 30 הימים האחרונים)
metricsPageShotsQueryCount = מספר צילומי המסך
metricsPageShotsQueryDay = יום
metricsPageUsersQueryTitle = משתמשים לפי יום
metricsPageUsersQueryDescription = מספר המשתמשים שיצרו לפחות צילום מסך אחד, לפי יום (ב־30 הימים האחרונים)
metricsPageUsersQueryCount = מספר המשתמשים
metricsPageUsersQueryDay = יום
metricsPageUserShotsQueryTitle = מספר התמונות לכל משתמש
metricsPageUserShotsQueryDescription = מספר המשתמשים שיש להם בערך N תמונות בסך הכול
metricsPageUserShotsQueryCount = מספר המשתמשים
metricsPageUserShotsQueryShots = מספר משוער של צילומי מסך פעילים (שלא פג תוקפם)
metricsPageRetentionQueryTitle = תפוגה לפי שבוע
metricsPageRetentionQueryDescription = מספר הימים מאז הצילום הראשון של המשתמש ועד לצילום העדכני ביותר, מקובץ לפי שבוע ההתחלה
metricsPageRetentionQueryUsers = מספר המשתמשים
metricsPageRetentionQueryDays = ימים מהצילום הראשון עד לצילום העדכני ביותר
metricsPageRetentionQueryFirstWeek = השבוע שבו המשתמש צילם לראשונה
metricsPageTotalRetentionQueryTitle = סך כל התפוגה
metricsPageTotalRetentionQueryDescription = משך הזמן שבו משתמשים צילמו, מקובץ לפי שבוע
metricsPageTotalRetentionQueryUsers = מספר המשתמשים
metricsPageTotalRetentionQueryDays = הימים בהם המשתמש יצר צילומי מסך
metricsPageVersionQueryTitle = גרסת תוספת
metricsPageVersionQueryDescription = גרסת התוספת בה נעשה שימוש במהלך הכניסה, ב־14 הימים האחרונים
metricsPageVersionQueryUsers = מספר המשתמשים המחוברים
metricsPageVersionQueryVersion = גרסת תוספת
metricsPageVersionQueryLastSeen = יום
metricsPageHeader = מדדים
// Note: { $created } is a placeholder for a localized date and time, like '4/21/2017, 3:40:04 AM'
metricsPageGeneratedDateTime = מועד היצירה: { $created }
// Note { $time } is a placeholder for a number of milliseconds, like '100'
metricsPageDatabaseQueryTime = (זמן מסד נתונים: { $time }ms)
