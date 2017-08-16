// Localization for Server-side strings of Firefox Screenshots
// 
// Please don't localize Firefox, Firefox Screenshots, or Screenshots



// Global phrases shared across pages, prefixed with 'g'
[[ global ]]

gMyShots = 我的截图
gHomeLink = 首页
gNoShots
    .alt = 没有找到截图
gScreenshotsDescription = 使截图更简单。截取、保存以及分享截图，一切都在 Firefox。


[[ Footer ]]

// Note: link text for a link to mozilla.org
footerLinkMozilla = Mozilla
footerLinkTerms = 条款
footerLinkPrivacy = 隐私声明
footerLinkDMCA = 举报侵犯知识产权
footerLinkDiscourse = 提供反馈
footerLinkRemoveAllData = 清除所有数据


[[ Creating page ]]

// Note: { $title } is a placeholder for the title of the web page
// captured in the screenshot. The default, for pages without titles, is
// creatingPageTitleDefault.
creatingPageTitle = 创建 { $title }
creatingPageTitleDefault = 页面
creatingPageWaitMessage = 正在保存您的截图…


[[ Home page ]]

homePageDescription
    .content = 直接在浏览器内截图。浏览网页时截图、保存与分享，只需 Firefox。
homePageButtonMyShots = 转至我的截图
homePageTeaser = 即将推出…
homePageDownloadFirefoxTitle = Firefox
homePageDownloadFirefoxSubTitle = 免费下载
homePageGetStarted = 操作入门
// Note: do not translate 'Firefox Screenshots' when translating this string
homePageHowScreenshotsWorks = 如何使用 Firefox Screenshots
homePageGetStartedTitle = 开始使用
// Note: Screenshots is an abbreviation for Firefox Screenshots, and should not be translated.
homePageGetStartedDescription = 在工具栏上找到新增的屏幕截图（Screenshots）图标，点击它，截图菜单将出现在浏览器窗口的顶部。
homePageCaptureRegion = 截取页面
// Note: Screenshots is an abbreviation for Firefox Screenshots, and should not be translated.
homePageCaptureRegionDescription = 单击并拖动以选择要截图的区域。或者悬停并单击，让屏幕截图为您选中区域。一切所见即所得，您可以将截图在线保存或点击“向下箭头”按钮下载到您的计算机。
homePageCapturePage = 截取区域
homePageCapturePageDescription = 使用右上角的按钮来截图整个页面。保存可见将截取当前显示的区域（不滚动），保存完整页面则截取整个页面的可见内容。
homePageSaveShare = 保存并分享
// Note: Screenshots is an abbreviation for Firefox Screenshots, and should not be translated.
homePageSaveShareDescription = 在您截图时，Firefox 会将截图保存到您的在线截图库，并将链接复制到剪贴板。我们会为您自动存储两周内的截图，您也可以随时删除截图或更改到期时间以长期保留截图。
homePageLegalLink = 法律
homePagePrivacyLink = 隐私
homePageTermsLink = 条款
homePageCookiesLink = Cookie


[[ Leave Screenshots page ]]

leavePageRemoveAllData = 移除全部数据
// Note: do not translate 'Firefox Screenshots' when translating this string
leavePageErrorAddonRequired = 您必须已安装 Firefox Screenshots 才能删除账户
leavePageErrorGeneric = 发生错误
// Note: do not translate 'Firefox Screenshots' when translating this string
leavePageWarning = 这将永久删除您的 Firefox Screenshots 数据。
leavePageButtonProceed = 确认
leavePageButtonCancel = 取消
leavePageDeleted = 您的截图已全部删除！


[[ Not Found page ]]

notFoundPageTitle = 找不到网页
notFoundPageIntro = 出错了。
notFoundPageDescription = 找不到网页。


[[ Shot page ]]

// This is the HTML title tag of the page
shotPageTitle = 截图: { $originalTitle }
shotPageAlertErrorUpdatingExpirationTime = 保存到期时间时出错
shotPageAlertErrorDeletingShot = 删除截图时出错
shotPageAlertErrorUpdatingTitle = 保存标题时出错
shotPageConfirmDelete = 您确定要永久删除此截图？
shotPageShareButton
    .title = 分享
shotPageCopy = 复制
shotPageCopied = 已复制
shotPageShareFacebook
    .title = 分享到 Facebook
shotPageShareTwitter
    .title = 分享到 Twitter
shotPageSharePinterest
    .title = 分享到 Pinterest
shotPageShareEmail
    .title = 以电子邮件分享链接
shotPageShareLink = 获取此截图的可分享链接：
shotPagePrivacyMessage = 任何持有此链接的人可以查看此截图。
shotPageCopyImageText
    .label = 复制图像文本
shotPageConfirmDeletion = 您确定要永久删除此截图？
// Note: { $timediff } is a placeholder for a future relative time clause like 'in 3 days' or 'tomorrow'
shotPageExpirationMessage = 如果您不做操作，此截图将在 { $timediff } 后被永久删除。
// Note: { $date } is a placeholder for a localized future date as returned by Date.toLocaleString.
// For example, in en-US, { $date } could be "7/12/2017, 1:52:50 PM".
shotPageRestoreButton = 在 { $date } 前可恢复
shotPageExpiredMessage = 此截图已过期。
shotPageDeleteButton
    .title = 删除此截图
shotPageAbuseButton
    .title = 举报此截图为滥用、垃圾信息或有其他问题
shotPageDownloadShot
    .title = 下载
shotPageDownload = 下载
shotPageScreenshotsDescription = 使截图更简单。截取、保存以及分享截图，一切都在 Firefox。
shotPageUpsellFirefox = 立即获取 Firefox
shotPageDMCAMessage = 由于第三方宣告知识产权，此截图不再可用。
// Note: { $dmca } is a placeholder for a link to send email (a 'mailto' link)
shotPageDMCAContact = 请发送电子邮件至 { $dmca } 来请求进一步信息。
// Note: do not translate 'Firefox Screenshots' when translating this string
shotPageDMCAWarning = 如果您的截图被第三方宣告涉及知识产权，我们可能限制您访问 Firefox Screenshots。
// Note: { $url } is a placeholder for a shot page URL
shotPageDMCAIncludeLink = 请在您的电子邮件中包含此截图的网址：{ $url }
shotPageKeepFor = 此截图保留多久？
// Note: shotPageSelectTime is a placeholder label for the time selection dropdown.
shotPageSelectTime = 选择时间
shotPageKeepIndefinitely = 无限期
shotPageKeepTenMinutes = 10 分钟
shotPageKeepOneHour = 1 小时
shotPageKeepOneDay = 1 天
shotPageKeepOneWeek = 1 周
shotPageKeepTwoWeeks = 2 周
shotPageKeepOneMonth = 1 个月
shotPageSaveExpiration = 保存
shotPageCancelExpiration = 取消
shotPageDoesNotExpire = 不会到期
// Note: { $timediff } is a placeholder for a future relative time clause, like "in 1 week" or "tomorrow"
shotPageExpiresIn = { $timediff } 后过期
// Note: { $timediff } is a placeholder for a past relative time clause, like "1 week ago" or "yesterday"
shotPageExpired = { $timediff } 前已过期
timeDiffJustNow = 刚刚
timeDiffMinutesAgo = { $num ->
       *[other] { $number } 分钟前
    }
timeDiffHoursAgo = { $num ->
       *[other] { $number } 小时前
    }
timeDiffDaysAgo = { $number } 天前
timeDiffFutureSeconds = 几秒
timeDiffFutureMinutes = { $number } 分钟
timeDiffFutureHours = { $number } 小时
timeDiffFutureDays = { $number } 天


[[ Shotindex page ]]

// { $status } is a placeholder for an HTTP status code, like '500'.
// { $statusText } is a text description of the status code, like 'Internal server error'.
shotIndexPageErrorDeletingShot = 删除截图时出错：{ $status } { $statusText }
// { $searchTerm } is a placeholder for text the user typed into the search box
shotIndexPageSearchResultsTitle = 我的截图：搜索 { $searchTerm }
// { $error } is a placeholder for a non-translated error message that could be shared
// with developers when debugging an error.
shotIndexPageErrorRendering = 呈现页面时出错：{ $error }
shotIndexPageSearchPlaceholder
    .placeholder = 搜索我的截图
shotIndexPageSearchButton
    .title = 搜索
shotIndexPageNoShotsMessage = 没有保存截图。
shotIndexPageNoShotsInvitation = 快来创建一些吧。
shotIndexPageLookingForShots = 正在查找您的截图…
shotIndexPageNoSearchResultsIntro = 呃
shotIndexPageNoSearchResults = 我们没找到匹配您的搜索条件的截图。
shotIndexPageClearSearchButton
    .title = 清空搜索
shotIndexPageConfirmShotDelete = 删除此截图？


// all metrics strings are optional for translation
[[ Metrics page ]]

// Note: 'Firefox Screenshots' should not be translated
metricsPageTitle = Firefox Screenshots 统计
metricsPageTotalsQueryTitle = 总计
// Note: Screenshots is an abbreviation for Firefox Screenshots, and should not be translated.
metricsPageTotalsQueryDescription = Screenshots 概览
metricsPageTotalsQueryDevices = 总计注册设备
metricsPageTotalsQueryActiveShots = 活跃截图
metricsPageTotalsQueryExpiredShots = 已过期（但可恢复）
metricsPageTotalsQueryExpiredDeletedShots = 已过期（并已删除）
metricsPageShotsQueryTitle = 各日截图数
metricsPageShotsQueryDescription = 每日创建截图数（最近 30 天）
metricsPageShotsQueryCount = 截图数
metricsPageShotsQueryDay = 日
metricsPageUsersQueryTitle = 各日用户数
metricsPageUsersQueryDescription = 至少创建一张截图的用户数，最近 30 天
metricsPageUsersQueryCount = 用户数
metricsPageUsersQueryDay = 日
metricsPageUserShotsQueryTitle = 每用户截图数
metricsPageUserShotsQueryCount = 用户数
metricsPageRetentionQueryUsers = 用户数
metricsPageTotalRetentionQueryUsers = 用户数
metricsPageVersionQueryTitle = 附加组件版本
metricsPageVersionQueryDescription = 过去 14 天内进行登录的附加组件版本
metricsPageVersionQueryUsers = 用户登录数
metricsPageVersionQueryVersion = 附加组件版本
metricsPageVersionQueryLastSeen = 日
metricsPageHeader = 统计
// Note: { $created } is a placeholder for a localized date and time, like '4/21/2017, 3:40:04 AM'
metricsPageGeneratedDateTime = 生成时间：{ $created }
// Note { $time } is a placeholder for a number of milliseconds, like '100'
metricsPageDatabaseQueryTime = （数据库用时：{ $time } 毫秒）
