// Localization for Server-side strings of Firefox Screenshots
// 
// Please don't localize Firefox, Firefox Screenshots, or Screenshots



// Global phrases shared across pages, prefixed with 'g'
[[ global ]]

gMyShots = 我的擷圖
gHomeLink = 首頁
gNoShots
    .alt = 沒有找到擷取圖
gScreenshotsDescription = 拍攝畫面擷圖變得簡單。不用離開 Firefox 就能拍照、存檔、分享擷圖。


[[ Creating page ]]

// Note: { $title } is a placeholder for the title of the web page
// captured in the screenshot. The default, for pages without titles, is
// creatingPageTitleDefault.
creatingPageTitle = 正在建立 { $title }
creatingPageTitleDefault = 頁面


[[ Home page ]]

homePageDescription
    .content = 使用 Firefox 上網時，直接在瀏覽器內拍攝網頁擷圖、儲存、並分享。
homePageButtonMyShots = 前往我的擷圖
homePageTeaser = 即將上線…
homePageDownloadFirefoxTitle = Firefox
homePageDownloadFirefoxSubTitle = 免費下載
homePageGetStarted = 開始使用
// Note: do not translate 'Firefox Screenshots' when translating this string
homePageHowScreenshotsWorks = Firefox Screenshots 的原理是什麼？
homePageGetStartedTitle = 開始使用
// Note: Screenshots is an abbreviation for Firefox Screenshots, and should not be translated.
homePageGetStartedDescription = 尋找並點擊工具列中新出現的 Screenshots 圖示，Screenshots 選單就會出現在瀏覽器視窗頂部。
homePageCaptureRegion = 拍攝一個區域
// Note: Screenshots is an abbreviation for Firefox Screenshots, and should not be translated.
homePageCaptureRegionDescription = 點擊並拖曳出您想要擷取的範圍，或也可將滑鼠指到想拍照的地方點擊，Screenshots 就會自動為您選擇要拍攝的範圍。覺得拍得不錯的話，即可點擊「儲存」將拍攝到的擷圖上傳到雲端平台，或是直接點擊「下載」按鈕，儲存到電腦上。
homePageCapturePage = 拍攝整張網頁
homePageCapturePageDescription = 可使用右上角的按鈕來拍攝整章網頁。點擊「儲存可見區域」按鈕即可不用捲動，直接拍攝您當下看到的範圍，或是點擊「儲存完整頁面」就會把整張網頁拍下來。
homePageSaveShare = 儲存並分享
homePageLegalLink = 法律資訊
homePagePrivacyLink = 隱私權
homePageTermsLink = 使用條款
homePageCookiesLink = Cookies


[[ Leave Screenshots page ]]

leavePageConfirmDelete = 確認刪除帳號
// Note: do not translate 'Firefox Screenshots' when translating this string
leavePageErrorAddonRequired = 您必須安裝 Firefox Screenshots 才能刪除帳號
leavePageErrorGeneric = 發生錯誤
// Note: do not translate 'Firefox Screenshots' when translating this string
leavePageWarning = 將會永久清除您所有的 Firefox Screenshots 資料。
leavePageButtonProceed = 確定繼續
leavePageButtonCancel = 取消
leavePageDeleted = 已清除您所有擷取過的圖片！


[[ Not Found page ]]

notFoundPageTitle = 找不到頁面
notFoundPageIntro = 糟糕。
notFoundPageDescription = 找不到頁面。


[[ Shot page ]]

shotPageAlertErrorUpdatingExpirationTime = 儲存到期時間時發生錯誤
shotPageAlertErrorDeletingShot = 刪除擷圖時發生錯誤
shotPageAlertErrorUpdatingTitle = 儲存標題時發生錯誤
shotPageConfirmDelete = 您確定要刪除這張圖片嗎？
shotPageShareButton
    .title = 分享
shotPageCopy = 複製
shotPageCopied = 已複製！
shotPageShareFacebook
    .title = 分享到 Facebook
shotPageShareTwitter
    .title = 分享到 Twitter
shotPageSharePinterest
    .title = 分享到 Pinterest
shotPageShareEmail
    .title = 透過電子郵件分享鏈結
shotPageShareLink = 取得擷圖的分享用鏈結:
shotPagePrivacyMessage = 任何有鏈結的人都能看到這張擷圖。
shotPageCopyImageText
    .label = 複製圖片文字
shotPageConfirmDeletion = 您確定要永久刪除這張擷圖嗎？
// Note: { $timediff } is a placeholder for a future relative time clause like 'in 3 days' or 'tomorrow'
shotPageExpirationMessage = 若不做任何事，將在{ $timediff }刪除此擷圖。
// Note: { $date } is a placeholder for a localized future date as returned by Date.toLocaleString.
// For example, in en-US, { $date } could be "7/12/2017, 1:52:50 PM".
shotPageRestoreButton = 還原直到 { $date }
shotPageExpiredMessage = 此擷圖已過期。
shotPageDeleteButton
    .title = 刪除此擷圖
shotPageDownloadShot
    .title = 下載
shotPageDownload = 下載
shotPageScreenshotsDescription = 拍攝擷圖變得簡單。不用離開 Firefox 就能拍攝、儲存、分享畫面擷圖。
shotPageUpsellFirefox = 立即下載 Firefox
// Note: { $dmca } is a placeholder for a link to send email (a 'mailto' link)
shotPageDMCAContact = 請寄信到 { $dmca } 要求更多資訊。
// Note: do not translate 'Firefox Screenshots' when translating this string
shotPageDMCAWarning = 若我們收到多次關於您的照片的版權要求，我們可能會封鎖您的 Firefox Screenshots 使用權。
shotPageKeepFor = 這張擷圖應該保存多久？
// Note: shotPageSelectTime is a placeholder label for the time selection dropdown.
shotPageSelectTime = 選擇時間
shotPageKeepIndefinitely = 無限久
shotPageKeepTenMinutes = 10 分鐘
shotPageKeepOneHour = 1 小時
shotPageKeepOneDay = 1 天
shotPageKeepOneWeek = 1 星期
shotPageKeepTwoWeeks = 2 星期
shotPageKeepOneMonth = 1 個月
shotPageSaveExpiration = 儲存
shotPageCancelExpiration = 取消
shotPageDoesNotExpire = 不過期
// Note: { $timediff } is a placeholder for a future relative time clause, like "in 1 week" or "tomorrow"
shotPageExpiresIn = { $timediff } 後過期
// Note: { $timediff } is a placeholder for a past relative time clause, like "1 week ago" or "yesterday"
shotPageExpired = 已過期 { $timediff }
timeDiffJustNow = 剛剛
timeDiffMinutesAgo = { $number } 分鐘前
timeDiffHoursAgo = { $number } 小時前
timeDiffDaysAgo = { $number } 天前
timeDiffFutureSeconds = 幾秒內
timeDiffFutureMinutes = { $number } 分鐘內
timeDiffFutureHours = { $number } 小時內
timeDiffFutureDays = { $number } 天內


[[ Shotindex page ]]

// { $status } is a placeholder for an HTTP status code, like '500'.
// { $statusText } is a text description of the status code, like 'Internal server error'.
shotIndexPageErrorDeletingShot = 刪除擷圖時發生錯誤: { $status } { $statusText }
// { $searchTerm } is a placeholder for text the user typed into the search box
shotIndexPageSearchResultsTitle = 我的擷圖: 搜尋 { $searchTerm }
// { $error } is a placeholder for a non-translated error message that could be shared
// with developers when debugging an error.
shotIndexPageErrorRendering = 產生頁面時發生錯誤: { $error }
shotIndexPageSearchPlaceholder
    .placeholder = 搜尋我的擷圖
shotIndexPageSearchButton
    .title = 搜尋
shotIndexPageNoShotsMessage = 沒有已存的擷圖。
shotIndexPageNoShotsInvitation = 去吧！拍幾張照。
shotIndexPageLookingForShots = 正在尋找您的擷圖…
shotIndexPageNoSearchResultsIntro = 呃…
shotIndexPageNoSearchResults = 我們找不到符合您的搜尋條件的擷圖。
shotIndexPageClearSearchButton
    .title = 清除搜尋
shotIndexPageConfirmShotDelete = 要刪除這張擷圖嗎？


// all metrics strings are optional for translation
[[ Metrics page ]]

// Note: 'Firefox Screenshots' should not be translated
metricsPageTitle = Firefox Screenshots 統計
metricsPageTotalsQueryTitle = 總數
metricsPageTotalsQueryDevices = 已註冊裝置數
metricsPageTotalsQueryExpiredShots = 已過期（但可恢復）
metricsPageTotalsQueryExpiredDeletedShots = 已過期（且已刪除）
metricsPageShotsQueryTitle = 逐日擷圖數
metricsPageShotsQueryDescription = 最近 30 天內，每天新建立的擷圖數量
metricsPageShotsQueryCount = 擷圖數量
metricsPageShotsQueryDay = 日期
metricsPageUsersQueryTitle = 逐日使用者數
metricsPageUsersQueryDescription = 最近 30 天內，每天至少有建立一張擷圖的使用者數量
metricsPageUsersQueryCount = 使用者數
metricsPageUsersQueryDay = 日期
metricsPageUserShotsQueryTitle = 單一使用者拍攝的擷圖數
metricsPageUserShotsQueryCount = 使用者數
metricsPageRetentionQueryTitle = 週停留量
metricsPageRetentionQueryUsers = 使用者數
metricsPageTotalRetentionQueryTitle = 總停留
metricsPageTotalRetentionQueryUsers = 使用者數
metricsPageVersionQueryTitle = 附加元件版本
metricsPageVersionQueryUsers = 登入的使用者數
metricsPageVersionQueryVersion = 附加元件版本
metricsPageVersionQueryLastSeen = 日期
metricsPageHeader = 統計
// Note: { $created } is a placeholder for a localized date and time, like '4/21/2017, 3:40:04 AM'
metricsPageGeneratedDateTime = 產生於: { $created }
// Note { $time } is a placeholder for a number of milliseconds, like '100'
metricsPageDatabaseQueryTime = （資料庫時間: { $time }ms）
