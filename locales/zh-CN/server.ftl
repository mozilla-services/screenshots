### Localization for Server-side strings of Firefox Screenshots
### Please don't localize Firefox, Firefox Screenshots, or Screenshots


## Global phrases shared across pages, prefixed with 'g'

gMyShots = 我的截图
gHomeLink = 首页
gNoShots =
    .alt = 没有找到截图
gScreenshotsDescription = 使截图更简单。截取、保存以及分享截图，一切都在 Firefox。

## Header

buttonSettings =
    .title = 设置
buttonSignIn =
    .title = 登录
screenshotsLogo =
    .title = Screenshots 主页
bannerSignIn = 请<a>注册或登录</a>，即可跨设备访问您的截图，并永久保存收藏的截图。
bannerUpsell = { gScreenshotsDescription }<a>立即下载 Firefox</a>

## Footer

# Note: link text for a link to mozilla.org
footerLinkMozilla = Mozilla
footerLinkTerms = 使用条款
footerLinkPrivacy = 隐私声明
footerReportShot = 举报截图
    .title = 举报这张截图有滥用、垃圾信息或其他问题
footerLinkFaqs = 常见问题
footerLinkDMCA = 举报侵犯知识产权
footerLinkDiscourse = 提供反馈
footerLinkRemoveAllData = 清除所有数据

## Creating page

# Note: { $title } is a placeholder for the title of the web page
# captured in the screenshot. The default, for pages without titles, is
# creatingPageTitleDefault.
creatingPageTitle = 创建 { $title }
creatingPageTitleDefault = 页面
creatingPageWaitMessage = 正在保存您的截图…

## Home page

homePageDescription =
    .content = 直接在浏览器内截图。使用 Firefox 浏览网页时可以截取、保存和分享网页截图。
homePageButtonMyShots = 转至我的截图
homePageTeaser = 即将推出…
homePageDownloadFirefoxTitle = Firefox
homePageDownloadFirefoxSubTitle = 免费下载
# Note: do not translate 'Firefox Screenshots' when translating this string
homePageHowScreenshotsWorks = 如何使用 Firefox Screenshots
homePageGetStartedTitle = 开始使用
# Note: Screenshots is an abbreviation for Firefox Screenshots, and should not be translated.
homePageGetStartedDescription = 在工具栏上找到新增的“屏幕截图”图标，点击它，截图菜单将出现在浏览器窗口的顶部。
# Note: Screenshots is an abbreviation for Firefox Screenshots, and should not be translated.
homePageGetStartedDescriptionPageAction = 点击地址栏中的“页面动作”菜单，选择“截图”按钮，截图菜单会显示在您的浏览器窗口的顶部。
homePageCaptureRegion = 截取选定区域
# Note: Screenshots is an abbreviation for Firefox Screenshots, and should not be translated.
homePageCaptureRegionDescription = 单击并拖动以选择要截图的区域。或者悬停并单击，让屏幕截图为您选中区域。您可以选择“保存”进入您的在线截图库或点击“向下箭头”按钮下载截图到您的计算机。
homePageCapturePage = 截取整个网页
homePageCapturePageDescription = 使用右上角的按钮来截图整个页面。保存可视区域将截取当前可见区域的内容，保存完整页面将截取整个网页的内容。
homePageSaveShare = 保存并分享
# Note: Screenshots is an abbreviation for Firefox Screenshots, and should not be translated.
homePageShaveShareFavoriteDescription = 截取最棒的截图，保存到您的 Screenshots 在线图库，Firefox 就会将链接复制到剪切板以方便您分享。图库中的截图会在两周后自动过期，但您也可以随时删除它们，或延长保存时间。
homePageSignInTitle = 您的截图，随身带着走
homePageSignInDescription = 使用 Firefox 账号登录 Screenshots，在任何使用 Firefox 的地方访问您的截图。锦上添花：您收藏的截图可以永久保存。
homePageLegalLink = 法律
homePagePrivacyLink = 隐私
homePageTermsLink = 使用条款
homePageCookiesLink = Cookie

## Leave Screenshots page

leavePageRemoveAllData = 移除全部数据
# Note: do not translate 'Firefox Screenshots' when translating this string
leavePageErrorAuthRequired = 您必须已安装 Firefox Screenshots 或者已登录 Firefox 账号才能删除您的账号
leavePageErrorGeneric = 发生错误
# Note: do not translate 'Firefox Screenshots' when translating this string
leavePageWarning = 这将永久删除您的 Firefox Screenshots 数据。
leavePageButtonProceed = 确认
leavePageButtonCancel = 取消
leavePageDeleted = 您的截图已全部删除！

## Not Found page

notFoundPageTitle = 找不到网页
notFoundPageIntro = 出错了。
notFoundPageDescription = 找不到网页。

## Shot page

# This is the HTML title tag of the page
shotPageTitle = 截图：{ $originalTitle }
shotPageAlertErrorUpdatingExpirationTime = 保存到期时间时出错
shotPageAlertErrorDeletingShot = 删除截图时出错
shotPageAlertErrorUpdatingTitle = 保存标题时出错
shotPageConfirmDelete = 您确定要永久删除此截图？
shotPageShareButton =
    .title = 分享
shotPageCopyButton =
    .title = 复制截图到剪贴板
shotPageCopied = 已复制
shotPageShareFacebook =
    .title = 分享到 Facebook
shotPageShareTwitter =
    .title = 分享到 Twitter
shotPageSharePinterest =
    .title = 分享到 Pinterest
shotPageShareEmail =
    .title = 以电子邮件分享链接
shotPageShareLink = 获取此截图的可分享链接：
shotPagePrivacyMessage = 任何持有此链接的人可以查看此截图。
shotPageCopyImageText =
    .label = 复制图像文本
shotPageConfirmDeletion = 您确定要永久删除此截图？
# Note: <timediff></timediff> is a placeholder for a future relative time clause like 'in 3 days' or 'tomorrow'
shotPageTimeExpirationMessage = 如果您不做操作，此截图将在 <timediff></timediff> 后被永久删除。
# Note: { $date } is a placeholder for a localized future date as returned by Date.toLocaleString.
# For example, in en-US, { $date } could be "7/12/2017, 1:52:50 PM".
shotPageRestoreButton = 在 { $date } 前可恢复
shotPageExpiredMessage = 此截图已过期。
# Note: This phrase is followed by an empty line, then the URL of the source page
shotPageExpiredMessageDetails = 这是最初创建的页面：
shotPageDeleteButton =
    .title = 删除此截图
shotPageDownloadShot =
    .title = 下载
shotPageEditButton =
    .title = 编辑此图像
shotPagefavoriteButton =
    .title = 收藏此截图
shotPageBackToHomeButton =
    .title = 主页
shotPageAllShotsButton =
    .title = 所有截图
shotPageScreenshotsDescription = 截图更简单。不必离开 Firefox 就能截取、保存以及分享截图。
shotPageDMCAMessage = 由于第三方宣告知识产权，此截图不再可用。
# Note: { $dmca } is a placeholder for a link to send email (a 'mailto' link)
shotPageDMCAContact = 请发送电子邮件至 { $dmca } 来请求进一步信息。
# Note: do not translate 'Firefox Screenshots' when translating this string
shotPageDMCAWarning = 如果您的截图被第三方宣告涉及知识产权，我们可能限制您访问 Firefox Screenshots。
# Note: { $url } is a placeholder for a shot page URL
shotPageDMCAIncludeLink = 请在您的电子邮件中包含此截图的网址：{ $url }
shotPageKeepFor = 此截图保留多久？
# Note: shotPageSelectTime is a placeholder label for the time selection dropdown.
shotPageSelectTime = 选择时间
# The ∞ is used to indicate that the shot won't expire. It is also used in
# shotIndexNoExpirationSymbol. Try to use the same symbol in both strings, or
# if no such symbol is available for a language/culture, simply leave it out.
shotPageKeepIndefinitelyWithSymbol = 无限 ∞
shotPageKeepTenMinutes = 10 分钟
shotPageKeepOneHour = 1 小时
shotPageKeepOneDay = 1 天
shotPageKeepOneWeek = 1 周
shotPageKeepTwoWeeks = 2 周
shotPageKeepOneMonth = 1 个月
shotPageSaveExpiration = 保存
shotPageCancelExpiration = 取消
shotPageDoesNotExpire = 不会到期
# Note: <timediff></timediff> is a placeholder for a future relative time clause, like "in 1 week" or "tomorrow"
shotPageTimeExpiresIn = <timediff></timediff> 后过期
# Note: <timediff></timediff> is a placeholder for a past relative time clause, like "1 week ago" or "yesterday"
shotPageTimeExpired = <timediff></timediff> 前已过期
timeDiffJustNow = 刚刚
timeDiffMinutesAgo =
    { $number ->
       *[other] { $number } 分钟前
    }
timeDiffHoursAgo =
    { $number ->
       *[other] { $number } 小时前
    }
timeDiffDaysAgo = { $number } 天前
timeDiffFutureSeconds = 几秒内
timeDiffFutureMinutes = { $number } 分钟内
timeDiffFutureHours = { $number } 小时内
timeDiffFutureDays = { $number } 天内
errorThirdPartyCookiesEnabled = 如果您无法删除截图，可能需要暂时在浏览器的设置中启用第三方 Cookie。

## Shot Page New Feature Promotion Dialog.

# Note: If possible, choose a short translation to better fit into the card.
promoTitle = 请注意！
promoMessage = 最新的编辑工具支持裁剪、高亮，以及为您的截图添加文字。
promoLink = 试一试
promoCloseButton =
    .title = 关闭通知

## Annotations

annotationPenButton =
    .title = 钢笔
annotationHighlighterButton =
    .title = 荧光笔
annotationUndoButton =
    .title = 撤销
annotationRedoButton =
    .title = 重做
annotationTextButton =
    .title = 添加文字
# Note: This button reverts all the changes on the image since the start of the editing session.
annotationClearButton =
    .title = 清除
annotationCropButton =
    .title = 裁剪
annotationSaveEditButton = 保存
    .title = 保存编辑
annotationCancelEditButton = 取消
    .title = 取消编辑
annotationCropConfirmButton = 确认
    .title = 确认选择
annotationCropCancelButton = 取消
    .title = 取消选择
annotationColorWhite =
    .title = 白色
annotationColorBlack =
    .title = 黑色
annotationColorRed =
    .title = 红色
annotationColorGreen =
    .title = 绿色
annotationColorBlue =
    .title = 蓝色
annotationColorYellow =
    .title = 黄色
annotationColorPurple =
    .title = 紫色
annotationColorSeaGreen =
    .title = 海绿色
annotationColorGrey =
    .title = 灰色
# Note: annotationTextSize is a title for text size selection dropdown.
annotationTextSize =
    .title = 文字大小
# Values shown in text size selection dropdown
textSizeSmall = 小
textSizeMedium = 中
textSizeLarge = 大
# Confirm and Cancel button title shown when using text tool
textToolConfirmButton = 确认
    .title = 确认
textToolCancelButton = 取消
    .title = 取消
# Default placeholder used in input field when adding text annotations
textToolInputPlaceholder =
    .placeholder = 你好

## The following are the title and message for an error displayed as a Firefox
## notification. It is triggered by an action in the shot page and the strings
## are passed from the shot page to the addon.

copyImageErrorTitle = 出了点问题
copyImageErrorMessage = 无法将截图复制到剪贴板。

## Settings Page

settingsDisconnectButton = 断开连接
    .title = 断开连接
settingsGuestAccountMessage = 游客账户
settingsSignInInvite = 登录以在设备间同步
settingsSignInButton = 登录
    .title = 登录
SettingsPageHeader = Firefox Screenshots 设置
settingsDescription = 您可以使用 Firefox 账号登录以在设备间同步所有屏幕截图和私密地存取。
settingsPageSubHeader = 同步和账户
settingsClosePreferences =
    .title = 关闭首选项

## Shotindex page

# { $status } is a placeholder for an HTTP status code, like '500'.
# { $statusText } is a text description of the status code, like 'Internal server error'.
shotIndexPageErrorDeletingShot = 删除截图时出错：{ $status } { $statusText }
# { $searchTerm } is a placeholder for text the user typed into the search box
shotIndexPageSearchResultsTitle = 我的截图：搜索 { $searchTerm }
# { $error } is a placeholder for a non-translated error message that could be shared
# with developers when debugging an error.
shotIndexPageErrorRendering = 呈现页面时出错：{ $error }
shotIndexPageSearchPlaceholder =
    .placeholder = 搜索我的截图
shotIndexPageNoShotsMessage = 没有保存截图。
shotIndexPageNoShotsInvitation = 快来创建一些吧。
shotIndexPageLookingForShots = 正在查找您的截图…
shotIndexPageNoSearchResultsIntro = 呃
shotIndexPageNoSearchResults = 我们没找到匹配您的搜索条件的截图。
shotIndexPageMyShotsButton =
    .title = 我的截图
shotIndexPageClearSearchButton =
    .title = 清空搜索
shotIndexPageConfirmShotDelete = 删除此截图？
shotIndexPagePreviousPage =
    .title = 上一页
shotIndexPageNextPage =
    .title = 下一页
# This is tooltip for a "blank heart" symbol used in the upper top corner of the card for a shot on the
# My Shots page to indicate that the shot does expire.
shotIndexNonFavoriteIcon =
    .title = 这不是一张收藏的截图，它将会过期
# This is the tooltip for a "heart" symbol in the upper top corner of the
# card for a shot on the My Shots page. It indicate that the shot was marked as
# a favorite by the owner.
shotIndexFavoriteIcon =
    .title = 这是一张收藏的截图，不会过期
shotIndexSyncedShot =
    .title = 其他设备上的截图
shotIndexAlertErrorFavoriteShot = 更新收藏截图状态时出错

## Delete Confirmation Dialog

shotDeleteConfirmationMessage = 您确定要删除这张截图吗？
shotDeleteCancel = 取消
    .title = 取消
shotDeleteConfirm = 删除
    .title = 删除

## Metrics page
## All metrics strings are optional for translation

# Note: 'Firefox Screenshots' should not be translated
metricsPageTitle = Firefox Screenshots 统计
metricsPageTotalsQueryTitle = 总计
# Note: Screenshots is an abbreviation for Firefox Screenshots, and should not be translated.
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
metricsPageUserShotsQueryDescription = 有总共 N 个截图的用户数量
metricsPageUserShotsQueryCount = 用户数
metricsPageUserShotsQueryShots = 大致的活跃（未过期）截图数
metricsPageRetentionQueryTitle = 按周保留
metricsPageRetentionQueryDescription = 用户第一张截图到最近一张截图的天数，按周分组
metricsPageRetentionQueryUsers = 用户数
metricsPageRetentionQueryDays = 用户从第一张到最近一张截图的天数
metricsPageRetentionQueryFirstWeek = 用户第一次创建截图的周数
metricsPageTotalRetentionQueryTitle = 所有保留
metricsPageTotalRetentionQueryDescription = 用户已创建截图的时间长度，按周分组
metricsPageTotalRetentionQueryUsers = 用户数
metricsPageTotalRetentionQueryDays = 用户创建截图的天数
metricsPageVersionQueryTitle = 附加组件版本
metricsPageVersionQueryDescription = 过去 14 天内进行登录的附加组件版本
metricsPageVersionQueryUsers = 用户登录数
metricsPageVersionQueryVersion = 附加组件版本
metricsPageVersionQueryLastSeen = 日
metricsPageHeader = 统计
# Note: { $created } is a placeholder for a localized date and time, like '4/21/2017, 3:40:04 AM'
metricsPageGeneratedDateTime = 生成时间：{ $created }
# Note { $time } is a placeholder for a number of milliseconds, like '100'
metricsPageDatabaseQueryTime = （数据库用时：{ $time } 毫秒）
