### Localization for Server-side strings of Firefox Screenshots
### Please don't localize Firefox, Firefox Screenshots, or Screenshots


## Global phrases shared across pages, prefixed with 'g'

gMyShots = Téwakan Kami
gHomeLink = Tepas
gNoShots =
    .alt = Taya téwakan kapanggih

## Header

buttonSettings =
    .title = Setélan
buttonSignIn =
    .title = Asup
screenshotsLogo =
    .title = Tepas Screenshots
bannerSignIn = <a>Asup atawa daptar</a> pikeun muka téwakan ti sakur gawai sarta teundeun anu petinganana salilana.
bannerUpsell = { gScreenshotsDescription } <a>Cokot Firefox ayeuna</a>
# Text used in Firefox Account onboarding promo shown below
# Sign in button in header
onboardingPromoTitle = Naon nu anyar ti Firefox Screenshots?
onboardingPromoMessage = Ayeuna, asup ka Screenshots maké Firefox Account laju hanca leuwih loba:
onboardingPromoMessageListItem1 = Buka pabukon anjeun ti sakur gawai anjeun
onboardingPromoMessageListItem2 = Teundeun téwakan layar kameumeut anjeun salilana
onboardingPromoDismissButton = Tutup
    .title = Tutup
onboardingPromoSigninButton = Asup
    .title = Asup

## Footer

# Note: link text for a link to mozilla.org
footerLinkMozilla = Mozilla
footerLinkTerms = Katangtuan
footerLinkPrivacy = Iber Privasi
footerReportShot = Laporkeun Téwakan
    .title = Laporkeun ieu téwakan ku alesan penyalahgunaan, spam, atawa masalah lianna
footerLinkFaqs = LD

## Creating page

# Note: { $title } is a placeholder for the title of the web page
# captured in the screenshot. The default, for pages without titles, is
# creatingPageTitleDefault.
creatingPageTitle = Nyieun { $title }
creatingPageTitleDefault = kaca
creatingPageWaitMessage = Neundeun téwakan anjeun...

## Home page

homePageTeaser = Bakal Datang...
homePageDownloadFirefoxTitle = Firefox
homePageDownloadFirefoxSubTitle = Undeur Haratis
# Note: do not translate 'Firefox Screenshots' when translating this string
homePageHowScreenshotsWorks = Cara Gawé Firefox Screenshots
homePageGetStartedTitle = Mitembeyan

## Leave Screenshots page


## Not Found page


## Shot page

shotPageShareButton =
    .title = Bagikeun
shotPageCopyButton =
    .title = Tiron gambar kana papan klip
shotPageCopyActionLabel = Tiron
shotPageCopied = Ditiron
shotPageShareFacebook =
    .title = Bagikeun di Facebook
shotPageShareTwitter =
    .title = Bagikeun di Twitter
shotPageSharePinterest =
    .title = Bagikeun di Pinterest
shotPageShareEmail =
    .title = Bagikeun tutumbu kana surél
shotPageShareLink = Jieun tutumbu bagikeuneun pikeun ieu téwakan:
shotPagePrivacyMessage = Sakur nu boga tutumbuna bisa nempo ieu téwakan.
shotPageCopyImageText =
    .label = Tiron téks gambar
shotPageExpiredMessage = Ieu téwakan geus kadaluwarsa.
shotPageDeleteButton =
    .title = Pupus ieu téwakan
shotPageDownloadShot =
    .title = Undeur
shotPageEditButton =
    .title = Ropéa ieu gambar
shotPageBackToHomeButton =
    .title = Tepas
shotPageAllShotsButton =
    .title = Sakabéh Téwakan
# Note: shotPageSelectTime is a placeholder label for the time selection dropdown.
shotPageSelectTime = Pilih mangsa
# The ∞ is used to indicate that the shot won't expire. It is also used in
# shotIndexNoExpirationSymbol. Try to use the same symbol in both strings, or
# if no such symbol is available for a language/culture, simply leave it out.
shotPageKeepIndefinitelyWithSymbol = Salilana ∞
shotPageKeepTenMinutes = 10 Menit
shotPageKeepOneHour = Sajam
shotPageKeepOneDay = Sapoé
shotPageKeepOneWeek = Saminggu
shotPageKeepTwoWeeks = 2 Minggu
shotPageKeepOneMonth = Sabulan
shotPageSaveExpiration = teundeun
shotPageCancelExpiration = bolay
shotPageDoesNotExpire = tanpa kadaluwarsa
# Note: <timediff></timediff> is a placeholder for a future relative time clause, like "in 1 week" or "tomorrow"
shotPageTimeExpiresIn = kadaluwarsa <timediff></timediff>
# Note: <timediff></timediff> is a placeholder for a past relative time clause, like "1 week ago" or "yesterday"
shotPageTimeExpired = kadaluwarsa <timediff></timediff>
timeDiffJustNow = cikénéh
timeDiffMinutesAgo =
    { $number ->
        [one] 1 menit kaliwat
       *[other] { $number } menit kaliwat
    }
timeDiffHoursAgo =
    { $number ->
       *[other] { $number } jam kaliwat
    }
timeDiffDaysAgo =
    { $number ->
       *[other] { $number } poé kaliwat
    }
timeDiffFutureSeconds = sababaraha detik kaliwat

## Shot Page New Feature Promotion Dialog.


## Annotations


## The following are the title and message for an error displayed as a Firefox
## notification. It is triggered by an action in the shot page and the strings
## are passed from the shot page to the addon.


## Settings Page


## Shotindex page


## Delete Confirmation Dialog


## Metrics page
## All metrics strings are optional for translation

metricsPageVersionQueryUsers = Jumlah pamaké nu asup log
metricsPageVersionQueryLastSeen = Poé
metricsPageHeader = Métrik
