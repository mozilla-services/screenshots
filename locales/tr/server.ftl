// Localization for Server-side strings of Firefox Screenshots
// 
// Please don't localize Firefox, Firefox Screenshots, or Screenshots



// Global phrases shared across pages, prefixed with 'g'
[[ global ]]

gMyShots = Görüntülerim
gHomeLink = Ana Sayfa
gNoShots
    .alt = Görüntü bulunamadı
gScreenshotsDescription = Ekran görürüntüsü almayı basitleştirdik. Firefox’tan çıkmadan ekran görüntüleri alabilir, kaydedebilir ve paylaşabilirsiniz.


[[ Footer ]]

// Note: link text for a link to mozilla.org
footerLinkMozilla = Mozilla
footerLinkTerms = Koşullar
footerLinkPrivacy = Gizlilik Bildirimi
footerLinkDMCA = Telif hakkı ihlali bildir
footerLinkDiscourse = Görüş bildir
footerLinkRemoveAllData = Tüm verileri sil


[[ Creating page ]]

// Note: { $title } is a placeholder for the title of the web page
// captured in the screenshot. The default, for pages without titles, is
// creatingPageTitleDefault.
creatingPageTitle = { $title } oluşturuluyor
creatingPageTitleDefault = sayfa


[[ Home page ]]

homePageDescription
    .content = Tarayıcıyla bütünleşik ekran görüntüsü aracı. Firefox’la internette gezinirken ekran görüntüleri alabilir, kaydedebilir ve paylaşabilirsiniz.
homePageButtonMyShots = Görüntülerime git
homePageTeaser = Çok Yakında...
homePageDownloadFirefoxTitle = Firefox
homePageDownloadFirefoxSubTitle = Ücretsiz indir
homePageGetStarted = Başlayın
// Note: do not translate 'Firefox Screenshots' when translating this string
homePageHowScreenshotsWorks = Firefox Screenshots nasıl çalışıyor?
homePageGetStartedTitle = Başlayın
// Note: Screenshots is an abbreviation for Firefox Screenshots, and should not be translated.
homePageGetStartedDescription = Araç çubuğunuzdaki yeni Screenshots simgesini bulun. Ona tıkladığınızda tarayıcı pencerenizin üzerinde Screenshots menüsü açılacak.
homePageCaptureRegion = Bir bölgeyi yakalama
// Note: Screenshots is an abbreviation for Firefox Screenshots, and should not be translated.
homePageCaptureRegionDescription = Tıklayıp sürükleyerek yakalamak istediğiniz bölgeyi seçin. İstediğiniz bölgenin üstüne fareyle gidip bir kez tıklarsanız Screenshots bölgeyi sizin için seçer. Seçimden memnunsanız “Kaydet” düğmesine tıklayarak ekrna görüntüsünü internete yükleyebilir veya ok düğmesine tıklayarak bilgisayarınıza indirebilirsiniz.
homePageCapturePage = Tüm sayfayı yakalama
homePageCapturePageDescription = Sayfanın tamamını kaydetmek isterseniz sağ üst köşedeki düğmeleri kullanın. “Görünür alanı kaydet” düğmesi, sayfayı kaydırmadan pencerede gördüğünüz kısmı yakalar. “Tüm sayfayı kaydet” ise sayfadaki her şeyi yakalar.
homePageSaveShare = Kaydetme ve paylaşma
// Note: Screenshots is an abbreviation for Firefox Screenshots, and should not be translated.
homePageSaveShareDescription = Bir ekran görüntüsünü kaydettiğinizde Firefox o görüntüyü internetteki Screenshots arşivinize yükler ve linkini kopyalar. Ekran görüntüleriniz otomatik olarak iki hafta saklanır ama görüntüleri istediğiniz zaman silebilir veya arşivinizde daha uzun süre tutmak isterseniz silinme tarihlerini değiştirebilirsiniz.
homePageLegalLink = Yasal Notlar
homePagePrivacyLink = Gizlilik
homePageTermsLink = Koşullar
homePageCookiesLink = Çerezler


[[ Leave Screenshots page ]]

leavePageRemoveAllData = Tüm verileri sil
// Note: do not translate 'Firefox Screenshots' when translating this string
leavePageErrorAddonRequired = Hesabınızı silebilmek için Firefox Screenshots yüklü olmalıdır
leavePageErrorGeneric = Bir hata oluştu
// Note: do not translate 'Firefox Screenshots' when translating this string
leavePageWarning = Bu işlem, tüm Firefox Screenshots verilerinizi kalıcı olarak silecektir.
leavePageButtonProceed = Devam et
leavePageButtonCancel = iptal
leavePageDeleted = Tüm ekran görüntüleriniz silindi!


[[ Not Found page ]]

notFoundPageTitle = Sayfa bulunamadı
notFoundPageIntro = Hay aksi!
notFoundPageDescription = Sayfa bulunamadı.


[[ Shot page ]]

// This is the HTML title tag of the page
shotPageTitle = Ekran görüntüsü: { $originalTitle }
shotPageAlertErrorUpdatingExpirationTime = Silme tarihi kaydedilemedi
shotPageAlertErrorDeletingShot = Görüntü silinemedi
shotPageAlertErrorUpdatingTitle = Başlık kaydetme hatası
shotPageConfirmDelete = Bu görüntüyü kalıcı olarak silmek istediğinizden emin misiniz?
shotPageShareButton
    .title = Paylaş
shotPageCopy = Kopyala
shotPageCopied = Kopyalandı
shotPageShareFacebook
    .title = Facebook'ta paylaş
shotPageShareTwitter
    .title = Twitter'da paylaş
shotPageSharePinterest
    .title = Pinterest'te paylaş
shotPageShareEmail
    .title = Bağlantıyı e-posta ile paylaş
shotPageShareLink = Bu görüntünün paylaşabileceğiniz linki:
shotPagePrivacyMessage = Linke sahip olan herkes bu görüntüyü görebilir.
shotPageCopyImageText
    .label = Resim metnini kopyala
shotPageConfirmDeletion = Bu görüntüyü kalıcı olarak silmek istediğinizden emin misiniz?
// Note: { $timediff } is a placeholder for a future relative time clause like 'in 3 days' or 'tomorrow'
shotPageExpirationMessage = Hiçbir şey yapmazsanız bu görüntü { $timediff } kalıcı olarak silinecektir.
// Note: { $date } is a placeholder for a localized future date as returned by Date.toLocaleString.
// For example, in en-US, { $date } could be "7/12/2017, 1:52:50 PM".
shotPageRestoreButton = { $date } tarihine kadar geri yükle
shotPageExpiredMessage = Bu görüntünün süresi dolmuştur.
// Note: This phrase is followed by an empty line, then the URL of the source page
shotPageExpiredMessageDetails = Görüntünün alındığı sayfanın orijinali:
shotPageDeleteButton
    .title = Bu görüntüyü sil
shotPageAbuseButton
    .title = Bu görüntüyü suistimal, spam ve diğer sorunlar nedeniyle rapor et
shotPageDownloadShot
    .title = İndir
shotPageDownload = İndir
shotPageScreenshotsDescription = Ekran görürüntüsü almayı basitleştirdik. Firefox’tan çıkmadan ekran görüntüleri alabilir, kaydedebilir ve paylaşabilirsiniz.
shotPageUpsellFirefox = Firefox’u hemen indir
shotPageDMCAMessage = Üçüncü bir şahsın telif hakkı iddiası nedeniyle bu görüntü artık kullanılamaz.
// Note: { $dmca } is a placeholder for a link to send email (a 'mailto' link)
shotPageDMCAContact = Daha fazla bilgi almak isterseniz { $dmca } adresine e-posta gönderebilirsiniz.
// Note: do not translate 'Firefox Screenshots' when translating this string
shotPageDMCAWarning = Ekran görüntüleriniz çok sayıda şikayet alırsa Firefox Screenshots hesabınızı kapatabiliriz.
// Note: { $url } is a placeholder for a shot page URL
shotPageDMCAIncludeLink = Lütfen e-potanızda bu görüntünün adresini de belirtin: { $url }
shotPageKeepFor = Bu görüntü ne kadar süreyle saklansın?
// Note: shotPageSelectTime is a placeholder label for the time selection dropdown.
shotPageSelectTime = Süre seçin
shotPageKeepIndefinitely = Sonsuz
shotPageKeepTenMinutes = 10 dakika
shotPageKeepOneHour = 1 saat
shotPageKeepOneDay = 1 gün
shotPageKeepOneWeek = 1 hafta
shotPageKeepTwoWeeks = 2 hafta
shotPageKeepOneMonth = 1 ay
shotPageSaveExpiration = kaydet
shotPageCancelExpiration = iptal et
shotPageDoesNotExpire = silinmeyecek
// Note: { $timediff } is a placeholder for a future relative time clause, like "in 1 week" or "tomorrow"
shotPageExpiresIn = { $timediff } silinecek
// Note: { $timediff } is a placeholder for a past relative time clause, like "1 week ago" or "yesterday"
shotPageExpired = { $timediff } silindi
timeDiffJustNow = az önce
timeDiffMinutesAgo = 1 dakika önce
timeDiffHoursAgo = 1 saat önce
timeDiffDaysAgo = dün
timeDiffFutureSeconds = birkaç saniye sonra
timeDiffFutureMinutes = { $number } dakika sonra
timeDiffFutureHours = { $number } saat sonra
timeDiffFutureDays = yarın


[[ Shotindex page ]]

// { $status } is a placeholder for an HTTP status code, like '500'.
// { $statusText } is a text description of the status code, like 'Internal server error'.
shotIndexPageErrorDeletingShot = Görüntü silme hatası: { $status } { $statusText }
// { $searchTerm } is a placeholder for text the user typed into the search box
shotIndexPageSearchResultsTitle = Ekran görüntülerim: { $searchTerm } araması
// { $error } is a placeholder for a non-translated error message that could be shared
// with developers when debugging an error.
shotIndexPageErrorRendering = Sayfa oluşturma hatası: { $error }
shotIndexPageSearchPlaceholder
    .placeholder = Görüntülerimde ara
shotIndexPageSearchButton
    .title = Ara
shotIndexPageNoShotsMessage = Kayıtlı görüntünüz yok.
shotIndexPageNoShotsInvitation = Hadi, bir şeyler kaydedin.
shotIndexPageLookingForShots = Görüntüleriniz aranıyor…
shotIndexPageNoSearchResultsIntro = Hmm
shotIndexPageNoSearchResults = Aramanızla eşleşen bir görüntü bulamadık.
shotIndexPageClearSearchButton
    .title = Aramayı temizle
shotIndexPageConfirmShotDelete = Bu görüntü silinsin mi?


// all metrics strings are optional for translation
[[ Metrics page ]]

// Note: 'Firefox Screenshots' should not be translated
metricsPageTitle = Firefox Screenshots Ölçümleri
metricsPageTotalsQueryTitle = Toplam
metricsPageTotalsQueryDevices = Toplam kayıtlı cihaz sayısı
metricsPageTotalsQueryActiveShots = Aktif görüntü
metricsPageTotalsQueryExpiredShots = Süresi dolmuş (ama kurtarılabilir)
metricsPageTotalsQueryExpiredDeletedShots = Süresi dolmuş (ve silinmiş)
metricsPageShotsQueryCount = Görüntü sayısı
metricsPageShotsQueryDay = Gün
metricsPageUsersQueryCount = Kullanıcı sayısı
metricsPageUsersQueryDay = Gün
metricsPageUserShotsQueryCount = Kullanıcı sayısı
metricsPageRetentionQueryUsers = Kullanıcı sayısı
metricsPageTotalRetentionQueryUsers = Kullanıcı sayısı
metricsPageVersionQueryTitle = Eklenti sürümü
metricsPageVersionQueryVersion = Eklenti sürümü
metricsPageVersionQueryLastSeen = Gün
metricsPageHeader = Ölçümler
// Note: { $created } is a placeholder for a localized date and time, like '4/21/2017, 3:40:04 AM'
metricsPageGeneratedDateTime = Oluşturma: { $created }
// Note { $time } is a placeholder for a number of milliseconds, like '100'
metricsPageDatabaseQueryTime = (veritabanı süresi: { $time } ms)
