### Localization for Server-side strings of Firefox Screenshots
### Please don't localize Firefox, Firefox Screenshots, or Screenshots


## Global phrases shared across pages, prefixed with 'g'

gMyShots = ภาพหน้าจอของฉัน
gHomeLink = หน้าแรก
gNoShots =
    .alt = ไม่พบภาพหน้าจอ

## Footer

# Note: link text for a link to mozilla.org
footerLinkMozilla = Mozilla
footerLinkTerms = ข้อกำหนด
footerLinkPrivacy = ประกาศความเป็นส่วนตัว
footerLinkFaqs = คำถามที่พบบ่อย
footerLinkDMCA = รายงานการละเมิดทรัพย์สินทางปัญญา
footerLinkDiscourse = เสนอข้อคิดเห็น
footerLinkRemoveAllData = เอาข้อมูลทั้งหมดออก

## Creating page

# Note: { $title } is a placeholder for the title of the web page
# captured in the screenshot. The default, for pages without titles, is
# creatingPageTitleDefault.
creatingPageTitle = กำลังสร้าง { $title }
creatingPageTitleDefault = หน้า
creatingPageWaitMessage = กำลังบันทึกภาพหน้าจอของคุณ…

## Home page

homePageButtonMyShots = ไปยังภาพหน้าจอของฉัน
homePageTeaser = เร็ว ๆ นี้...
homePageDownloadFirefoxTitle = Firefox
homePageDownloadFirefoxSubTitle = ดาวน์โหลดฟรี
homePageGetStarted = เริ่มต้นใช้งาน
homePageGetStartedTitle = เริ่มต้น
homePageCaptureRegion = จับภาพเป็นบริเวณ
homePageCapturePage = จับภาพหน้า
homePageSaveShare = บันทึกและแบ่งปัน
homePageLegalLink = ข้อกฎหมาย
homePagePrivacyLink = ความเป็นส่วนตัว
homePageTermsLink = ข้อกำหนด
homePageCookiesLink = คุกกี้

## Leave Screenshots page

leavePageRemoveAllData = เอาข้อมูลทั้งหมดออก
leavePageErrorGeneric = เกิดข้อผิดพลาด
leavePageButtonProceed = ดำเนินการต่อ
leavePageButtonCancel = ยกเลิก
leavePageDeleted = ภาพถ่ายหน้าจอของคุณทั้งหมดถูกลบแล้ว!

## Not Found page

notFoundPageTitle = ไม่พบหน้า
notFoundPageIntro = อุปส์
notFoundPageDescription = ไม่พบหน้า

## Shot page

# This is the HTML title tag of the page
shotPageTitle = ภาพหน้าจอ: { $originalTitle }
shotPageAlertErrorUpdatingExpirationTime = เกิดข้อผิดพลาดในการบันทึกการหมดอายุ
shotPageAlertErrorDeletingShot = เกิดข้อผิดพลาดในการลบภาพหน้าจอ
shotPageAlertErrorUpdatingTitle = เกิดข้อผิดพลาดในการบันทึกชื่อเรื่อง
shotPageShareButton =
    .title = แบ่งปัน
shotPageCopy = คัดลอก
shotPageCopied = คัดลอกแล้ว
shotPageShareFacebook =
    .title = แบ่งปันบน Facebook
shotPageShareTwitter =
    .title = แบ่งปันบน Twitter
shotPageSharePinterest =
    .title = แบ่งปันบน Pinterest
shotPageShareEmail =
    .title = แบ่งปันลิงก์ทางอีเมล
shotPageShareLink = รับลิงก์ที่แบ่งปันได้ไปยังภาพหน้าจอนี้:
shotPageCopyImageText =
    .label = คัดลอกข้อความภาพ
shotPageExpiredMessage = ภาพหน้าจอนี้หมดอายุแล้ว
shotPageDeleteButton =
    .title = ลบภาพหน้าจอนี้
shotPageDownloadShot =
    .title = ดาวน์โหลด
shotPageEditButton =
    .title = แก้ไขภาพนี้
shotPageDownload = ดาวน์โหลด
shotPageUpsellFirefox = รับ Firefox ตอนนี้
# Note: { $dmca } is a placeholder for a link to send email (a 'mailto' link)
shotPageDMCAContact = โปรดอีเมลมายัง { $dmca } เพื่อขอข้อมูลเพิ่มเติม
# Note: shotPageSelectTime is a placeholder label for the time selection dropdown.
shotPageSelectTime = เลือกเวลา
# The ∞ is used to indicate that the shot won't expire. It is also used in
# shotIndexNoExpirationSymbol. Try to use the same symbol in both strings, or
# if no such symbol is available for a language/culture, simply leave it out.
shotPageKeepIndefinitelyWithSymbol = ไม่มีกำหนด ∞
shotPageKeepTenMinutes = 10 นาที
shotPageKeepOneHour = 1 ชั่วโมง
shotPageKeepOneDay = 1 วัน
shotPageKeepOneWeek = 1 สัปดาห์
shotPageKeepTwoWeeks = 2 สัปดาห์
shotPageKeepOneMonth = 1 เดือน
shotPageSaveExpiration = บันทึก
shotPageCancelExpiration = ยกเลิก
shotPageDoesNotExpire = ไม่หมดอายุ
timeDiffJustNow = เมื่อกี้นี้
timeDiffMinutesAgo =
    { $number ->
       *[other] { $number } นาทีที่แล้ว
    }
timeDiffHoursAgo =
    { $number ->
       *[other] { $number } ชั่วโมงที่แล้ว
    }
timeDiffDaysAgo =
    { $number ->
       *[other] { $number } วันที่แล้ว
    }
timeDiffFutureSeconds = ในไม่กี่วินาที
timeDiffFutureMinutes =
    { $number ->
       *[other] ใน { $number } นาที
    }
timeDiffFutureHours =
    { $number ->
       *[other] ใน { $number } ชั่วโมง
    }
timeDiffFutureDays =
    { $number ->
       *[other] ใน { $number } วัน
    }

## Annotations

annotationPenButton =
    .title = ปากกา
annotationHighlighterButton =
    .title = ปากกาเน้นข้อความ
annotationUndoButton =
    .title = เลิกทำ
annotationRedoButton =
    .title = ทําซ้ำ
# Note: This button reverts all the changes on the image since the start of the editing session.
annotationClearButton =
    .title = ล้าง
annotationCropButton =
    .title = ครอบตัด
annotationSaveEditButton = บันทึก
    .title = Save edit
annotationCancelEditButton = ยกเลิก
    .title = Cancel editing
annotationCropConfirmButton = ยืนยัน
    .title = Confirm selection
annotationCropCancelButton = ยกเลิก
    .title = ยกเลิกการเลือก
annotationColorWhite =
    .title = ขาว
annotationColorBlack =
    .title = ดำ
annotationColorRed =
    .title = แดง
annotationColorGreen =
    .title = เขียว
annotationColorBlue =
    .title = น้ำเงิน
annotationColorYellow =
    .title = เหลือง
annotationColorPurple =
    .title = ม่วง
annotationColorSeaGreen =
    .title = เขียวน้ำทะเล
annotationColorGrey =
    .title = เทา

## Settings Page

settingsDisconnectButton = ตัดการเชื่อมต่อ
    .title = ตัดการเชื่อมต่อ
settingsSignInButton = ลงชื่อเข้า
    .title = ลงชื่อเข้า
settingsClosePreferences =
    .title = ปิดค่ากำหนด

## Shotindex page

# { $searchTerm } is a placeholder for text the user typed into the search box
shotIndexPageSearchResultsTitle = ภาพหน้าจอของฉัน: ค้นหา { $searchTerm }
# { $error } is a placeholder for a non-translated error message that could be shared
# with developers when debugging an error.
shotIndexPageErrorRendering = เกิดข้อผิดพลาดในการเรนเดอร์หน้า: { $error }
shotIndexPageSearchPlaceholder =
    .placeholder = ค้นหาภาพหน้าจอของฉัน
shotIndexPageSearchButton =
    .title = ค้นหา
shotIndexPageNoShotsMessage = ไม่มีภาพหน้าจอที่บันทึกไว้
shotIndexPageLookingForShots = กำลังมองหาภาพของคุณ…
shotIndexPageNoSearchResultsIntro = หืมม
shotIndexPageClearSearchButton =
    .title = ล้างการค้นหา
shotIndexPageConfirmShotDelete = ลบภาพนี้?
shotIndexPagePreviousPage =
    .title = หน้าก่อนหน้า
shotIndexPageNextPage =
    .title = หน้าถัดไป

## Delete Confirmation Dialog

shotDeleteCancel = ยกเลิก
    .title = ยกเลิก
shotDeleteConfirm = ลบ
    .title = ลบ

## Metrics page
## All metrics strings are optional for translation

metricsPageTotalsQueryDevices = อุปกรณ์ลงทะเบียนทั้งหมด
metricsPageTotalsQueryExpiredShots = หมดอายุ (แต่สามารถกู้คืนได้)
metricsPageTotalsQueryExpiredDeletedShots = หมดอายุ (และถูกลบแล้ว)
metricsPageShotsQueryCount = จำนวนภาพ
metricsPageShotsQueryDay = วัน
metricsPageUsersQueryTitle = ผู้ใช้ตามวัน
metricsPageUsersQueryCount = จำนวนผู้ใช้
metricsPageUsersQueryDay = วัน
metricsPageUserShotsQueryCount = จำนวนผู้ใช้
metricsPageRetentionQueryUsers = จำนวนผู้ใช้
metricsPageTotalRetentionQueryUsers = จำนวนผู้ใช้
metricsPageVersionQueryTitle = รุ่นส่วนเสริม
metricsPageVersionQueryVersion = รุ่นส่วนเสริม
metricsPageVersionQueryLastSeen = วัน
# Note: { $created } is a placeholder for a localized date and time, like '4/21/2017, 3:40:04 AM'
metricsPageGeneratedDateTime = สร้างขึ้นเมื่อ: { $created }
# Note { $time } is a placeholder for a number of milliseconds, like '100'
metricsPageDatabaseQueryTime = (เวลาฐานข้อมูล: { $time }ms)
