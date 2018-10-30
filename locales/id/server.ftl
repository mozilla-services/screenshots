### Localization for Server-side strings of Firefox Screenshots
### Please don't localize Firefox, Firefox Screenshots, or Screenshots


## Global phrases shared across pages, prefixed with 'g'

gMyShots = Cuplikan Saya
gHomeLink = Beranda
gNoShots =
    .alt = Tidak ada cuplikan ditemukan
gScreenshotsDescription = Screenshots membuatnya sederhana. Ambil, simpan, dan bagikan tangkapan layar tanpa meninggalkan Firefox.

## Header

buttonSettings =
    .title = Setelan
buttonSignIn =
    .title = Masuk
screenshotsLogo =
    .title = Beranda Screenshots
bannerMessage = Masuk atau daftar untuk mengakses cuplikan layar Anda di semua perangkat dan simpan favorit Anda selamanya.
bannerUpsell = { gScreenshotsDescription } <a>Dapatkan Firefox sekarang juga</a>

## Footer

# Note: link text for a link to mozilla.org
footerLinkMozilla = Mozilla
footerLinkTerms = Ketentuan
footerLinkPrivacy = Kebijakan Privasi
footerReportShot = Laporkan Cuplikan Layar
    .title = Laporkan cuplikan layar ini karena penyalahgunaan, spam, dan masalah-masalah lainnya
footerLinkFaqs = Pertanyaan Umum
footerLinkDMCA = Laporkan Pelanggaran Hak Cipta
footerLinkDiscourse = Kirim Saran
footerLinkRemoveAllData = Hapus Semua Data

## Creating page

# Note: { $title } is a placeholder for the title of the web page
# captured in the screenshot. The default, for pages without titles, is
# creatingPageTitleDefault.
creatingPageTitle = Membuat { $title }
creatingPageTitleDefault = laman
creatingPageWaitMessage = Menyimpan gambar Anda…

## Home page

homePageDescription =
    .content = Cuplikan layar intuitif dirancang langsung ke peramban. Tangkap, simpan, dan bagikan cuplikan layar saat Anda menjelajahi Web menggunakan Firefox.
homePageButtonMyShots = Buka Tangkapan Saya
homePageTeaser = Segera Hadir…
homePageDownloadFirefoxTitle = Firefox
homePageDownloadFirefoxSubTitle = Unduh Gratis
# Note: do not translate 'Firefox Screenshots' when translating this string
homePageHowScreenshotsWorks = Cara Kerja Firefox Screenshots
homePageGetStartedTitle = Memulai
# Note: Screenshots is an abbreviation for Firefox Screenshots, and should not be translated.
homePageGetStartedDescription = Temukan ikon Screenshots baru di bilah alat Anda. Pilih, kemudian menu Screenshots akan muncul di bagian atas jendela peramban Anda.
# Note: Screenshots is an abbreviation for Firefox Screenshots, and should not be translated.
homePageGetStartedDescriptionPageAction = Pilih ikon Screenshot dari menu tindakan laman di bilah alamat, dan menu Screenshots akan muncul di atas jendela peramban Anda.
homePageCaptureRegion = Tangkap Bagian
# Note: Screenshots is an abbreviation for Firefox Screenshots, and should not be translated.
homePageCaptureRegionDescription = Klik dan seret untuk memilih area yang ingin Anda tangkap. Atau arahkan dan klik  — Screenshots akan memilih area untuk Anda. Sudah pas? Pilih Simpan untuk mengakses tangkapan layar secara daring atau tombol panah ke bawah untuk mengunduhnya ke komputer Anda.
homePageCapturePage = Tangkap Laman
homePageCapturePageDescription = Gunakan tombol di kanan atas untuk merekam seluruh laman. Tombol Simpan yang Terlihat akan menangkap area yang Anda lihat tanpa menggulir, dan Simpan Laman Sepenuhnya akan menangkap semua yang ada di laman.
homePageSaveShare = Simpan dan Bagikan
# Note: Screenshots is an abbreviation for Firefox Screenshots, and should not be translated.
homePageShaveShareFavoriteDescription = Ambil cuplikan terbaik Anda. Lalu simpan ke pustaka daring Screenshots, dan Firefox menyalin tautan ke papan klip agar mudah dibagikan. Cuplikan di dalam pustaka secara otomatis kadaluarsa setelah dua pekan, tetapi Anda dapat menghapusnya kapanpun atau menyimpannya lebih lama.
homePageSignInTitle = Cuplikan Anda Di Mana Saja
homePageSignInDescription = Masuk ke Screenshots menggunakan Firefox Account Anda untuk mengakses cuplikan Anda di mana saja Anda menggunakan Firefox. Bonus tambahan: Anda juga dapat menyimpan cuplikan favorit selamanya.
homePageLegalLink = Legal
homePagePrivacyLink = Privasi
homePageTermsLink = Ketentuan
homePageCookiesLink = Kuki

## Leave Screenshots page

leavePageRemoveAllData = Hapus Semua Data
# Note: do not translate 'Firefox Screenshots' when translating this string
leavePageErrorAuthRequired = Anda harus memasang Firefox Screenshots atau masuk dengan Firefox Account untuk menghapus akun Anda
leavePageErrorGeneric = Terjadi galat
# Note: do not translate 'Firefox Screenshots' when translating this string
leavePageWarning = Ini akan menghapus semua data Firefox Screenshots Anda secara permanen.
leavePageButtonProceed = Lanjutkan
leavePageButtonCancel = Batal
leavePageDeleted = Semua tangkapan layar Anda telah dihapus!

## Not Found page

notFoundPageTitle = Laman Tidak Ditemukan
notFoundPageIntro = Ups.
notFoundPageDescription = Laman tidak ditemukan.

## Shot page

# This is the HTML title tag of the page
shotPageTitle = Tangkapan Layar: { $originalTitle }
shotPageAlertErrorUpdatingExpirationTime = Kesalahan saat menyimpan tanggal kedaluwarsa
shotPageAlertErrorDeletingShot = Kesalahan saat menghapus tangkapan
shotPageAlertErrorUpdatingTitle = Galat saat menyimpan judul
shotPageConfirmDelete = Yakin ingin menghapus tangkapan ini secara permanen?
shotPageShareButton =
    .title = Bagikan
shotPageCopyButton =
    .title = Salin gambar ke papan klip
shotPageCopied = Tersalin
shotPageShareFacebook =
    .title = Bagikan di Facebook
shotPageShareTwitter =
    .title = Bagikan di Twitter
shotPageSharePinterest =
    .title = Bagikan di Pinterest
shotPageShareEmail =
    .title = Bagikan tautan via surel
shotPageShareLink = Dapatkan tautan ke tangkapan ini:
shotPagePrivacyMessage = Siapa pun yang memiliki tautan dapat melihat tangkapan ini.
shotPageCopyImageText =
    .label = Salin teks gambar
shotPageConfirmDeletion = Yakin ingin menghapus tangkapan ini secara permanen?
# Note: <timediff></timediff> is a placeholder for a future relative time clause like 'in 3 days' or 'tomorrow'
shotPageTimeExpirationMessage = Jika Anda tidak melakukan apapun, tangkapan akan dihapus secara permanen <timediff></timediff>.
# Note: { $date } is a placeholder for a localized future date as returned by Date.toLocaleString.
# For example, in en-US, { $date } could be "7/12/2017, 1:52:50 PM".
shotPageRestoreButton = pulihkan sampai { $date }
shotPageExpiredMessage = Tangkapan ini telah kedaluwarsa.
# Note: This phrase is followed by an empty line, then the URL of the source page
shotPageExpiredMessageDetails = Berikut adalah laman sumbernya:
shotPageDeleteButton =
    .title = Hapus tangkapan ini
shotPageDownloadShot =
    .title = Unduh
shotPageEditButton =
    .title = Edit gambar ini
shotPagefavoriteButton =
    .title = Favoritkan tangkapan ini
shotPageBackToHomeButton =
    .title = Beranda
shotPageAllShotsButton =
    .title = Semua Tangkapan Layar
shotPageScreenshotsDescription = Screenshots sangat mudah. Tangkap, simpan, dan bagikan tangkapan layar tanpa meninggalkan Firefox.
shotPageDMCAMessage = Tangkapan ini tidak lagi tersedia karena klaim hak kekayaan intelektual pihak ketiga.
# Note: { $dmca } is a placeholder for a link to send email (a 'mailto' link)
shotPageDMCAContact = Kirimkan surel ke { $dmca } untuk meminta informasi lebih lanjut.
# Note: do not translate 'Firefox Screenshots' when translating this string
shotPageDMCAWarning = Jika Tangkapan Anda merupakan subyek dari beberapa klaim, kami bisa mencabut akses Anda ke Firefox Screenshots.
# Note: { $url } is a placeholder for a shot page URL
shotPageDMCAIncludeLink = Sertakan URL dari tangkapan ini dalam surel Anda: { $url }
shotPageKeepFor = Berapa lama tangkapan ini disimpan?
# Note: shotPageSelectTime is a placeholder label for the time selection dropdown.
shotPageSelectTime = Pilih waktu
# The ∞ is used to indicate that the shot won't expire. It is also used in
# shotIndexNoExpirationSymbol. Try to use the same symbol in both strings, or
# if no such symbol is available for a language/culture, simply leave it out.
shotPageKeepIndefinitelyWithSymbol = Selamanya ∞
shotPageKeepTenMinutes = 10 Menit
shotPageKeepOneHour = 1 Jam
shotPageKeepOneDay = 1 Hari
shotPageKeepOneWeek = 1 Minggu
shotPageKeepTwoWeeks = 2 Minggu
shotPageKeepOneMonth = 1 Bulan
shotPageSaveExpiration = simpan
shotPageCancelExpiration = batal
shotPageDoesNotExpire = tidak pernah kedaluwarsa
# Note: <timediff></timediff> is a placeholder for a future relative time clause, like "in 1 week" or "tomorrow"
shotPageTimeExpiresIn = kedaluwarsa <timediff></timediff>
# Note: <timediff></timediff> is a placeholder for a past relative time clause, like "1 week ago" or "yesterday"
shotPageTimeExpired = kedaluwarsa <timediff></timediff>
timeDiffJustNow = baru saja
timeDiffMinutesAgo = { $number } menit yang lalu
timeDiffHoursAgo = { $number } jam yang lalu
timeDiffDaysAgo = { $number } hari yang lalu
timeDiffFutureSeconds = dalam beberapa detik
timeDiffFutureMinutes = dalam 1 menit
timeDiffFutureHours = dalam 1 jam
timeDiffFutureDays = besok
errorThirdPartyCookiesEnabled = Jika Anda mengambil tangkapan ini dan tidak bisa menghapusnya, Anda mungkin perlu mengaktifkan kuki pihak ketiga untuk sementara dari pengaturan peramban Anda.

## Shot Page New Feature Promotion Dialog.

# Note: If possible, choose a short translation to better fit into the card.
promoTitle = Buat Catatan!
promoMessage = Alat penggubahan terbaru memungkinkan Anda memotong, menyorot, dan bahkan menambahkan teks ke tangkapan Anda.
promoLink = Coba sekarang
promoCloseButton =
    .title = Tutup

## Annotations

annotationPenButton =
    .title = Pena
annotationHighlighterButton =
    .title = Penyorot
annotationUndoButton =
    .title = Urungkan
annotationRedoButton =
    .title = Ulangi
annotationTextButton =
    .title = Tambahkan teks
# Note: This button reverts all the changes on the image since the start of the editing session.
annotationClearButton =
    .title = Bersihkan
annotationCropButton =
    .title = Pangkas
annotationSaveEditButton = Simpan
    .title = Simpan edit
annotationCancelEditButton = Batal
    .title = Batal mengedit
annotationCropConfirmButton = Konfirmasi
    .title = Konfirmasi pilihan
annotationCropCancelButton = Batal
    .title = Batalkan pilihan
annotationColorWhite =
    .title = Putih
annotationColorBlack =
    .title = Hitam
annotationColorRed =
    .title = Merah
annotationColorGreen =
    .title = Hijau
annotationColorBlue =
    .title = Biru
annotationColorYellow =
    .title = Kuning
annotationColorPurple =
    .title = Ungu
annotationColorSeaGreen =
    .title = Hijau Laut
annotationColorGrey =
    .title = Abu-abu
# Note: annotationTextSize is a title for text size selection dropdown.
annotationTextSize =
    .title = Ukuran teks
# Values shown in text size selection dropdown
textSizeSmall = Kecil
textSizeMedium = Sedang
textSizeLarge = Besar
# Confirm and Cancel button title shown when using text tool
textToolConfirmButton = Konfirmasi
    .title = Konfirmasi
textToolCancelButton = Batal
    .title = Batal
# Default placeholder used in input field when adding text annotations
textToolInputPlaceholder =
    .placeholder = Halo

## The following are the title and message for an error displayed as a Firefox
## notification. It is triggered by an action in the shot page and the strings
## are passed from the shot page to the addon.

copyImageErrorTitle = Ada yang salah
copyImageErrorMessage = Gagal menyalin tangkapan layar Anda ke papan klip

## Settings Page

settingsDisconnectButton = Putuskan
    .title = Putuskan
settingsGuestAccountMessage = Akun Tamu
settingsSignInInvite = Masuk untuk sinkronisasi antar perangkat
settingsSignInButton = Masuk
    .title = Masuk
SettingsPageHeader = Setelan Firefox Screenshots
settingsDescription = Anda dapat masuk dengan Firefox Accounts untuk sinkronisasi semua tangkapan layar Anda antar perangkat dan mengaksesnya secara privat.
settingsPageSubHeader = Sync & Akun
settingsClosePreferences =
    .title = Tutup pengaturan

## Shotindex page

# { $status } is a placeholder for an HTTP status code, like '500'.
# { $statusText } is a text description of the status code, like 'Internal server error'.
shotIndexPageErrorDeletingShot = Kesalahan saat menghapus tangkapan: { $status } { $statusText }
# { $searchTerm } is a placeholder for text the user typed into the search box
shotIndexPageSearchResultsTitle = Tangkapan Saya: cari { $searchTerm }
# { $error } is a placeholder for a non-translated error message that could be shared
# with developers when debugging an error.
shotIndexPageErrorRendering = Kesalahan dalam menampilkan laman: { $error }
shotIndexPageSearchPlaceholder =
    .placeholder = Cari tangkapan saya
shotIndexPageNoShotsMessage = Tidak ada tangkapan tersimpan.
shotIndexPageNoShotsInvitation = Lanjutkan, buat tangkapan.
shotIndexPageLookingForShots = Memuat tangkapan Anda…
shotIndexPageNoSearchResultsIntro = Hmm
shotIndexPageNoSearchResults = Kami tidak menemukan tangkapan yang cocok dengan pencarian Anda.
shotIndexPageMyShotsButton =
    .title = Tangkapan Layar Saya
shotIndexPageClearSearchButton =
    .title = Bersihkan pencarian
shotIndexPageConfirmShotDelete = Hapus tangkapan ini?
shotIndexPagePreviousPage =
    .title = Laman sebelumnya
shotIndexPageNextPage =
    .title = Laman selanjutnya
# This is tooltip for a "blank heart" symbol used in the upper top corner of the card for a shot on the
# My Shots page to indicate that the shot does expire.
shotIndexNonFavoriteIcon =
    .title = Ini bukan tangkapan layar favorit dan kedaluwarsa
# This is the tooltip for a "heart" symbol in the upper top corner of the
# card for a shot on the My Shots page. It indicate that the shot was marked as
# a favorite by the owner.
shotIndexFavoriteIcon =
    .title = Ini adalah tangkapan favorit dan tidak kedaluwarsa
shotIndexSyncedShot =
    .title = Tangkapan layar yang diambil dari peranti lainnya
shotIndexAlertErrorFavoriteShot = Bermasalah saat memutakhirkan status tangkapan favorit

## Delete Confirmation Dialog

shotDeleteConfirmationMessage = Apakah Anda yakin ingin menghapus tangkapan ini?
shotDeleteCancel = Batal
    .title = Batal
shotDeleteConfirm = Hapus
    .title = Hapus

## Metrics page
## All metrics strings are optional for translation

# Note: 'Firefox Screenshots' should not be translated
metricsPageTitle = Metrik Firefox Screenshots
metricsPageTotalsQueryTitle = Total
# Note: Screenshots is an abbreviation for Firefox Screenshots, and should not be translated.
metricsPageTotalsQueryDescription = Ikhtisar Screenshots
metricsPageTotalsQueryDevices = Jumlah peranti yang terdaftar
metricsPageTotalsQueryActiveShots = Tangkapan aktif
metricsPageTotalsQueryExpiredShots = Kedaluwarsa (tapi dapat dipulihkan)
metricsPageTotalsQueryExpiredDeletedShots = Kedaluwarsa (dan dihapus)
metricsPageShotsQueryTitle = Tangkapan per Hari
metricsPageShotsQueryDescription = Jumlah tangkapan yang dibuat setiap hari (dalam 30 hari terakhir)
metricsPageShotsQueryCount = Jumlah tangkapan
metricsPageShotsQueryDay = Hari
metricsPageUsersQueryTitle = Pengguna Harian
metricsPageUsersQueryDescription = Jumlah pengguna yang membuat setidaknya satu tangkapan, dalam sehari (30 hari terakhir)
metricsPageUsersQueryCount = Jumlah pengguna
metricsPageUsersQueryDay = Hari
metricsPageUserShotsQueryTitle = Jumlah Tangkapan per Pengguna
metricsPageUserShotsQueryDescription = Jumlah pengguna yang membuat sekitar N tangkapan total
metricsPageUserShotsQueryCount = Jumlah pengguna
metricsPageUserShotsQueryShots = Perkiraan jumlah tangkapan aktif (tidak kedaluwarsa)
metricsPageRetentionQueryTitle = Retensi Mingguan
metricsPageRetentionQueryDescription = Jumlah hari dari tangkapan pertama sampai tangkapan terbaru, dikelompokkan berdasar awal pekan
metricsPageRetentionQueryUsers = Jumlah pengguna
metricsPageRetentionQueryDays = Jumlah hari dari tangkapan pertama sampai yang terbaru
metricsPageRetentionQueryFirstWeek = Jumlah minggu pengguna membuat tangkapan pertama
metricsPageTotalRetentionQueryTitle = Total Retensi
metricsPageTotalRetentionQueryDescription = Lama pengguna membuat tangkapan, dikelompokkan berdasar minggu
metricsPageTotalRetentionQueryUsers = Jumlah pengguna
metricsPageTotalRetentionQueryDays = Jumlah hari pengguna membuat tangkapan
metricsPageVersionQueryTitle = Versi Pengaya
metricsPageVersionQueryDescription = Versi pengaya yang digunakan saat masuk, dalam 14 hari terakhir
metricsPageVersionQueryUsers = Jumlah pengguna yang masuk
metricsPageVersionQueryVersion = Versi pengaya
metricsPageVersionQueryLastSeen = Hari
metricsPageHeader = Metrik
# Note: { $created } is a placeholder for a localized date and time, like '4/21/2017, 3:40:04 AM'
metricsPageGeneratedDateTime = Dibuat pada: { $created }
# Note { $time } is a placeholder for a number of milliseconds, like '100'
metricsPageDatabaseQueryTime = (waktu basis data: { $time }ms)
