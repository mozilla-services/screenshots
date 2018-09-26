### Localization for Server-side strings of Firefox Screenshots
### Please don't localize Firefox, Firefox Screenshots, or Screenshots


## Global phrases shared across pages, prefixed with 'g'

gMyShots = 自分のショット
gHomeLink = ホーム
gNoShots =
    .alt = ショットが見つかりませんでした
gScreenshotsDescription = スクリーンショットをもっと手軽に。Firefox を離れることなくスクリーンショットを撮影、保存、共有。
gSettings = 設定
gSignIn = ログイン

## Header

signInButton =
    .aria-label = ログイン
settingsButton =
    .aria-label = 設定

## Footer

# Note: link text for a link to mozilla.org
footerLinkMozilla = Mozilla
footerLinkTerms = 利用規約
footerLinkPrivacy = プライバシー通知
footerLinkFaqs = よくある質問
footerLinkDMCA = IP 侵害を報告
footerLinkDiscourse = フィードバックを送る
footerLinkRemoveAllData = すべてのデータを削除

## Creating page

# Note: { $title } is a placeholder for the title of the web page
# captured in the screenshot. The default, for pages without titles, is
# creatingPageTitleDefault.
creatingPageTitle = { $title } を作成しています
creatingPageTitleDefault = ページ
creatingPageWaitMessage = ショットを保存しています...

## Home page

homePageDescription =
    .content = ブラウザーに組み込まれた直感的なスクリーンショットツール。Firefox を使ってウェブをブラウズしながら、スクリーンショットをキャプチャ、保存、共有できます。
homePageButtonMyShots = 自分のショットへ
homePageTeaser = 近日公開...
homePageDownloadFirefoxTitle = Firefox
homePageDownloadFirefoxSubTitle = 無料ダウンロード
# Note: do not translate 'Firefox Screenshots' when translating this string
homePageHowScreenshotsWorks = Firefox Screenshots の仕組み
homePageGetStartedTitle = はじめよう
# Note: Screenshots is an abbreviation for Firefox Screenshots, and should not be translated.
homePageGetStartedDescription = ツールバー上にある新しい Screenshots アイコンを見つけてください。それを選択すれば、ブラウザーウィンドウの上に Screenshots メニューが表示されます。
# Note: Screenshots is an abbreviation for Firefox Screenshots, and should not be translated.
homePageGetStartedDescriptionPageAction = アドレスバー内のページアクションメニューから Screenshots アイコンを選択すれば、ブラウザーウィンドウ上に Screenshots メニューが表示されます。
homePageCaptureRegion = 選択範囲をキャプチャ
# Note: Screenshots is an abbreviation for Firefox Screenshots, and should not be translated.
homePageCaptureRegionDescription = クリック＆ドラッグでキャプチャしたい範囲を選択します。あるいは単純にマウスを当ててクリックすれば、Screenshots が自動的に範囲を選択してくれます。範囲を確定したら、保存ボタンをクリックすればオンラインでスクリーンショットを参照できます。また下向きの矢印ボタンでコンピューターに保存することもできます。
homePageCapturePage = ページをキャプチャ
homePageCapturePageDescription = ページ全体をキャプチャするには右上のボタンを使ってください。[表示範囲を保存] ボタンはスクロールせずに見えている範囲のみをキャプチャ、[ページ全体を保存] ボタンはページ上のすべての要素をキャプチャできます。
homePageSaveShare = 保存して共有
# Note: Screenshots is an abbreviation for Firefox Screenshots, and should not be translated.
homePageSaveShareDescription = ショットを撮ると、Firefox はスクリーンショットをオンラインの Screenshots ライブラリへ投稿して、そのリンクをクリップボードへコピーします。スクリーンショットは自動的に 2 週間保存されますが、その間にいつでも削除したり、もっと長くライブラリに残せるよう期限を変更したりできます。
homePageLegalLink = 法的通知
homePagePrivacyLink = プライバシー
homePageTermsLink = 利用規約
homePageCookiesLink = Cookie

## Leave Screenshots page

leavePageRemoveAllData = すべてのデータを削除
# Note: do not translate 'Firefox Screenshots' when translating this string
leavePageErrorAddonRequired = アカウントを削除するには Firefox Screenshots がインストールされている必要があります
leavePageErrorGeneric = 問題が発生しました
# Note: do not translate 'Firefox Screenshots' when translating this string
leavePageWarning = これによりあなたの Firefox Screenshots データはすべて永久に消去されます。
leavePageButtonProceed = 続ける
leavePageButtonCancel = キャンセル
leavePageDeleted = あなたのスクリーンショットはすべて消去されました！

## Not Found page

notFoundPageTitle = ページが見つかりませんでした
notFoundPageIntro = おっと。
notFoundPageDescription = ページが見つかりませんでした。

## Shot page

# This is the HTML title tag of the page
shotPageTitle = スクリーンショット: { $originalTitle }
shotPageAlertErrorUpdatingExpirationTime = 期限の保存中に問題が発生しました
shotPageAlertErrorDeletingShot = ショットの削除中に問題が発生しました
shotPageAlertErrorUpdatingTitle = タイトルの保存中に問題が発生しました
shotPageConfirmDelete = 本当にこのショットを永久に削除しますか？
shotPageShareButton =
    .title = 共有
shotPageCopy = コピー
shotPageCopied = コピー完了
shotPageShareFacebook =
    .title = Facebook で共有
shotPageShareTwitter =
    .title = Twitter で共有
shotPageSharePinterest =
    .title = Pinterest で共有
shotPageShareEmail =
    .title = メールでリンクを共有
shotPageShareLink = このショットの共有リンクを取得:
shotPagePrivacyMessage = リンクを手に入れた人は誰でもこのショットを見られます。
shotPageCopyImageText =
    .label = 画像のテキストをコピー
shotPageConfirmDeletion = 本当にこのショットを永久に削除しますか？
# Note: <timediff></timediff> is a placeholder for a future relative time clause like 'in 3 days' or 'tomorrow'
shotPageTimeExpirationMessage = 何もしない場合、このショットは <timediff></timediff> に永久に削除されます。
# Note: { $date } is a placeholder for a localized future date as returned by Date.toLocaleString.
# For example, in en-US, { $date } could be "7/12/2017, 1:52:50 PM".
shotPageRestoreButton = { $date } まで復元
shotPageExpiredMessage = このショットは期限切れとなりました。
# Note: This phrase is followed by an empty line, then the URL of the source page
shotPageExpiredMessageDetails = この作成元となったページはこちらです:
shotPageDeleteButton =
    .title = このショットを削除
shotPageAbuseButton =
    .title = 悪用、スパム、その他の問題についてこのショットを報告
shotPageDownloadShot =
    .title = ダウンロード
shotPageEditButton =
    .title = この画像を編集
shotPagefavoriteButton =
    .title = お気に入りのショット
shotPageDownload = ダウンロード
shotPageScreenshotsDescription = スクリーンショットをもっと手軽に。Firefox を離れることなくスクリーンショットを撮影、保存、共有。
shotPageUpsellFirefox = 今すぐ Firefox をダウンロード
shotPageDMCAMessage = このショットは第三者からの知的所有権侵害の申し立てにより使用できなくなりました。
# Note: { $dmca } is a placeholder for a link to send email (a 'mailto' link)
shotPageDMCAContact = より詳しい情報は { $dmca } までお問い合わせください。
# Note: do not translate 'Firefox Screenshots' when translating this string
shotPageDMCAWarning = あなたのショットに対して問題報告が複数寄せられた場合、あなたの Firefox Screenshots へのアクセスは無効化される可能性があります。
# Note: { $url } is a placeholder for a shot page URL
shotPageDMCAIncludeLink = このショットの URL をメールに記載してください: { $url }
shotPageKeepFor = このショットの保存期間
# Note: shotPageSelectTime is a placeholder label for the time selection dropdown.
shotPageSelectTime = 時間を選択
# The ∞ is used to indicate that the shot won't expire. It is also used in
# shotIndexNoExpirationSymbol. Try to use the same symbol in both strings, or
# if no such symbol is available for a language/culture, simply leave it out.
shotPageKeepIndefinitelyWithSymbol = 無期限 ∞
shotPageKeepTenMinutes = 10 分
shotPageKeepOneHour = 1 時間
shotPageKeepOneDay = 1 日
shotPageKeepOneWeek = 1 週間
shotPageKeepTwoWeeks = 2 週間
shotPageKeepOneMonth = 1 か月
shotPageSaveExpiration = 保存
shotPageCancelExpiration = キャンセル
shotPageDoesNotExpire = 無期限
# Note: <timediff></timediff> is a placeholder for a future relative time clause, like "in 1 week" or "tomorrow"
shotPageTimeExpiresIn = <timediff></timediff> に期限切れ
# Note: <timediff></timediff> is a placeholder for a past relative time clause, like "1 week ago" or "yesterday"
shotPageTimeExpired = <timediff></timediff> に期限切れ
timeDiffJustNow = たった今
timeDiffMinutesAgo = { $number } 分前
timeDiffHoursAgo = { $number } 時間前
timeDiffDaysAgo = { $number } 日前
timeDiffFutureSeconds = 数秒以内
timeDiffFutureMinutes = { $number } 分以内
timeDiffFutureHours = { $number } 時間以内
timeDiffFutureDays = { $number } 日以内
errorThirdPartyCookiesEnabled = このショットを撮って削除できない場合、ブラウザーの設定画面でサードパーティ Cookie を一時的に有効化する必要があるかもしれません。

## Shot Page New Feature Promotion Dialog.

# Note: If possible, choose a short translation to better fit into the card.
promoTitle = お知らせ！
promoMessage = 拡張された編集ツールを使えば、ショットのトリミングやハイライト、さらに文字の追加もできます。
promoLink = 試してみる
promoCloseButton =
    .title = 通知を閉じる

## Annotations

annotationPenButton =
    .title = ペン
annotationHighlighterButton =
    .title = ハイライト
annotationUndoButton =
    .title = 元に戻す
annotationRedoButton =
    .title = やり直し
annotationTextButton =
    .title = テキストを追加
# Note: This button reverts all the changes on the image since the start of the editing session.
annotationClearButton =
    .title = クリア
annotationCropButton =
    .title = トリミング
annotationSaveEditButton = 保存
    .title = 編集内容を保存
annotationCancelEditButton = キャンセル
    .title = 編集をキャンセル
annotationCropConfirmButton = 確認
    .title = 確認選択
annotationCropCancelButton = キャンセル
    .title = キャンセル選択
annotationColorWhite =
    .title = 白
annotationColorBlack =
    .title = 黒
annotationColorRed =
    .title = 赤
annotationColorGreen =
    .title = 緑
annotationColorBlue =
    .title = 青
annotationColorYellow =
    .title = 黄
annotationColorPurple =
    .title = 紫
annotationColorSeaGreen =
    .title = 海緑
annotationColorGrey =
    .title = 灰
# Note: annotationTextSize is a title for text size selection dropdown.
annotationTextSize =
    .title = 文字サイズ
# Values shown in text size selection dropdown
textSizeSmall = 小
textSizeMedium = 中
textSizeLarge = 大
# Confirm and Cancel button title shown when using text tool
textToolConfirmButton = 確認
    .title = 確認
textToolCancelButton = キャンセル
    .title = キャンセル
# Default placeholder used in input field when adding text annotations
textToolInputPlaceholder =
    .placeholder = こんにちは

## Settings Page

settingsDisconnectButton = 接続を解除
    .title = 接続を解除
settingsGuestAccountMessage = ゲストアカウント
settingsSignInInvite = ログインして端末間で同期
settingsSignInButton = ログイン
    .title = ログイン
SettingsPageHeader = Firefox Screenshots の設定
settingsDescription = Firefox Accounts でログインすれば、端末間ですべてのスクリーンショットを同期し、非公開のままアクセスできます。
settingsPageSubHeader = 同期 & アカウント
settingsClosePreferences =
    .title = 設定を閉じる

## Shotindex page

# { $status } is a placeholder for an HTTP status code, like '500'.
# { $statusText } is a text description of the status code, like 'Internal server error'.
shotIndexPageErrorDeletingShot = ショットの削除中に問題が発生しました: { $status } { $statusText }
# { $searchTerm } is a placeholder for text the user typed into the search box
shotIndexPageSearchResultsTitle = 自分のショット: { $searchTerm } を検索
# { $error } is a placeholder for a non-translated error message that could be shared
# with developers when debugging an error.
shotIndexPageErrorRendering = ページのレンダリング中に問題が発生しました: { $error }
shotIndexPageSearchPlaceholder =
    .placeholder = 自分のショットを検索
shotIndexPageSearchButton =
    .title = 検索
shotIndexPageNoShotsMessage = 保存済みのショットはありません。
shotIndexPageNoShotsInvitation = さぁ、いくつかショットを撮ってみましょう。
shotIndexPageLookingForShots = あなたのショットを検索しています...
shotIndexPageNoSearchResultsIntro = うーん
shotIndexPageNoSearchResults = 検索語に一致するショットが見つかりませんでした。
shotIndexPageClearSearchButton =
    .title = 検索語を消去
shotIndexPageConfirmShotDelete = このショットを削除しますか？
shotIndexPagePreviousPage =
    .title = 前のページ
shotIndexPageNextPage =
    .title = 次のページ
# This symbol is used in the lower right corner of the card for a shot on the
# My Shots page to indicate that the shot does not expire. It should be a
# single character (or simply nothing if no such symbol is available for a
# language/culture).
shotIndexNoExpirationSymbol = ∞
    .title = このショットの期限はありません
# This is the tooltip for a "heart" symbol in the lower right corner of the
# card for a shot on the My Shots page. It indicate that the shot was marked as
# a favorite by the owner.
shotIndexFavoriteIcon =
    .title = このお気に入りのショットは期限切れになりません

## Delete Confirmation Dialog

shotDeleteConfirmationMessage = 本当にこのショットを削除しますか？
shotDeleteCancel = キャンセル
    .title = キャンセル
shotDeleteConfirm = 削除
    .title = 削除

## Metrics page
## All metrics strings are optional for translation

# Note: 'Firefox Screenshots' should not be translated
metricsPageTitle = Firefox Screenshots 統計データ
metricsPageTotalsQueryTitle = 合計
# Note: Screenshots is an abbreviation for Firefox Screenshots, and should not be translated.
metricsPageTotalsQueryDescription = Screenshots の概要
metricsPageTotalsQueryDevices = 登録済み合計端末数
metricsPageTotalsQueryActiveShots = アクティブなショット
metricsPageTotalsQueryExpiredShots = 期限切れ (ただし復元可能)
metricsPageTotalsQueryExpiredDeletedShots = 期限切れ (既に削除済み)
metricsPageShotsQueryTitle = 日別ショット数
metricsPageShotsQueryDescription = 作成されたショットの日別数 (過去 30 日間)
metricsPageShotsQueryCount = ショット数
metricsPageShotsQueryDay = 日
metricsPageUsersQueryTitle = 日別ユーザー数
metricsPageUsersQueryDescription = 少なくとも 1 つショットを作成したユーザーの日別数 (過去 30 日間)
metricsPageUsersQueryCount = ユーザー数
metricsPageUsersQueryDay = 日
metricsPageUserShotsQueryTitle = ユーザーごとのショット数
metricsPageUserShotsQueryDescription = 合計で約 N ショット所有しているユーザーの数
metricsPageUserShotsQueryCount = ユーザー数
metricsPageUserShotsQueryShots = アクティブな (期限切れ前の) ショットのおおよその数
metricsPageRetentionQueryTitle = 週別滞留率
metricsPageRetentionQueryDescription = ユーザーの最初のショットから最近のショットまでの日数 (最初の週での分類)
metricsPageRetentionQueryUsers = ユーザー数
metricsPageRetentionQueryDays = ユーザーの最初から最近のショットまでの日数
metricsPageRetentionQueryFirstWeek = ユーザーが最初にショットを作成した週
metricsPageTotalRetentionQueryTitle = 合計滞留率
metricsPageTotalRetentionQueryDescription = ユーザーがショットを作成している期間の長さ (週別の分類)
metricsPageTotalRetentionQueryUsers = ユーザー数
metricsPageTotalRetentionQueryDays = ユーザーがショットを作成している日数
metricsPageVersionQueryTitle = アドオンのバージョン
metricsPageVersionQueryDescription = ログイン中に使用されたアドオンのバージョン (過去 14 日間)
metricsPageVersionQueryUsers = ログイン済みユーザー数
metricsPageVersionQueryVersion = アドオンのバージョン
metricsPageVersionQueryLastSeen = 日
metricsPageHeader = 統計データ
# Note: { $created } is a placeholder for a localized date and time, like '4/21/2017, 3:40:04 AM'
metricsPageGeneratedDateTime = 作成日時: { $created }
# Note { $time } is a placeholder for a number of milliseconds, like '100'
metricsPageDatabaseQueryTime = (データベース時間: { $time } ミリ秒)
