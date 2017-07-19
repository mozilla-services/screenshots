// Global phrases shared across pages, prefixed with 'g'
gMyShots = 我的截图
gHomeLink = 首页
gNoShots
    .alt = 没有找到截图
gScreenshotsDescription = 使截图更简单。拍摄、保存以及分享截图，一切都在 Firefox。
// Creating page// Note: {$title} is a placeholder for the title of the web page
// captured in the screenshot. The default, for pages without titles, is
// creatingPageTitleDefault.
creatingPageTitle = 创建 { $title }
creatingPageTitleDefault = 页面
// Home pagehomePageButtonMyShots = 转至我的截图
homePageTeaser = 即将推出…
homePageDownloadFirefoxTitle = Firefox
homePageDownloadFirefoxSubTitle = 免费下载
homePageGetStarted = 操作入门
homePageGetStartedTitle = 开始使用
homePageLegalLink = 法律
homePagePrivacyLink = 隐私
homePageTermsLink = 条款
homePageCookiesLink = Cookie
// Leave Screenshots pageleavePageConfirmDelete = 确认删除账户
// Note: do not translate 'Firefox Screenshots' when translating this string
leavePageErrorAddonRequired = 您必须已安装 Firefox Screenshots 才能删除账户
leavePageErrorGeneric = 发生错误
// Note: do not translate 'Firefox Screenshots' when translating this string
leavePageWarning = 这将永久删除您的 Firefox Screenshots 数据。
leavePageButtonProceed = 确认
leavePageButtonCancel = 取消
leavePageDeleted = 您的截图已全部删除！
// Not Found pagenotFoundPageTitle = 找不到网页
notFoundPageIntro = 出错了。
notFoundPageDescription = 找不到网页。
// Shot pageshotPageAlertErrorUpdatingExpirationTime = 保存到期时间时出错
shotPageAlertErrorDeletingShot = 删除截图时出错
shotPageAlertErrorUpdatingTitle = 保存标题时出错
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
shotPageCopyImageText
    .label = 复制图像文本
shotPageDownloadShot
    .title = 下载
shotPageDownload = 下载
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
// Note: {$timediff} is a placeholder for a future relative time clause, like "in 1 week" or "tomorrow"
shotPageExpiresIn = { $timediff } 后过期
// Note: {$timediff} is a placeholder for a past relative time clause, like "1 week ago" or "yesterday"
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
// Shotindex pageshotIndexPageSearchPlaceholder
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
// Metrics page
// Note: all metrics strings are optional for translation// Note: 'Firefox Screenshots' should not be translated
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
metricsPageVersionQueryTitle = 附加组件版本
