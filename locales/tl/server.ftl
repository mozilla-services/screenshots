// Localization for Server-side strings of Firefox Screenshots
// 
// Please don't localize Firefox, Firefox Screenshots, or Screenshots



// Global phrases shared across pages, prefixed with 'g'
[[ global ]]

gMyShots = Aking mga Shot
gHomeLink = Home
gNoShots
    .alt = Walang nakitang shot
gScreenshotsDescription = Ginawang simple ang mga screenshot. Dalhin, i-save, at ibahagi ang mga screenshot nang hindi umaalis sa Firefox.


[[ Footer ]]

// Note: link text for a link to mozilla.org
footerLinkMozilla = Mozilla
footerLinkTerms = Mga tuntunin
footerLinkPrivacy = Paunawa sa Privacy
footerLinkFaqs = FAQs
footerLinkDMCA = Iulat ang IP Infringement
footerLinkDiscourse = Magbigay ng Feedback
footerLinkRemoveAllData = Alisin ang Lahat ng Data


[[ Creating page ]]

// Note: { $title } is a placeholder for the title of the web page
// captured in the screenshot. The default, for pages without titles, is
// creatingPageTitleDefault.
creatingPageTitle = Paglikha ng { $title }
creatingPageTitleDefault = pahina
creatingPageWaitMessage = Sine-save ang iyong shot...


[[ Home page ]]

homePageDescription
    .content = Ang mga matalinong screenshot na inihurnong pakanan papunta sa browser. Kunin, i-save at ibahagi ang mga screenshot habang nagba-browse ka sa Web gamit ang Firefox.
homePageButtonMyShots = Pumunta sa Aking mga Shots
homePageTeaser = Malapit Na…
homePageDownloadFirefoxTitle = Firefox
homePageDownloadFirefoxSubTitle = Libreng pag-download
homePageGetStarted = Magsimula
// Note: do not translate 'Firefox Screenshots' when translating this string
homePageHowScreenshotsWorks = Paano Gumagana ang Mga screenshot ng Firefox
homePageGetStartedTitle = Magsimula
// Note: Screenshots is an abbreviation for Firefox Screenshots, and should not be translated.
homePageGetStartedDescription = Hanapin ang bagong mga screenshot na icon sa iyong toolbar. Piliin ito, at ang menu ng Mga screenshot ay lilitaw sa tuktok ng window ng iyong browser.
// Note: Screenshots is an abbreviation for Firefox Screenshots, and should not be translated.
homePageGetStartedDescriptionPageAction = Piliin ang icon ng Screenshot mula sa menu ng mga pagkilos ng pahina sa address bar, at ang menu ng Mga screenshot ay lilitaw sa tuktok ng window ng iyong browser.
homePageCaptureRegion = Kumuha ng Rehiyon
// Note: Screenshots is an abbreviation for Firefox Screenshots, and should not be translated.
homePageCaptureRegionDescription = I-click at i-drag upang piliin ang lugar na nais mong makuha. O mag-hover at mag-click - Ang mga screenshot ay pipiliin ang lugar para sa iyo. Tulad ng nakikita mo? Piliin ang I-save upang i-access ang iyong screenshot sa online o sa down arrow na pindutan upang i-download ito sa iyong computer.
homePageCapturePage = Kumuha ng Pahina
homePageCapturePageDescription = Gamitin ang mga pindutan sa kanang itaas upang makuha ang buong mga pahina. Makukuha ng pindutang I-save ang Nakikita ang lugar na maaari mong tingnan nang walang pag-scroll, at Makukuha ng Save Full Page ang lahat ng bagay sa pahina.
homePageSaveShare = I-save at Ibahagi 
// Note: Screenshots is an abbreviation for Firefox Screenshots, and should not be translated.
homePageSaveShareDescription = Kapag kumuha ka ng isang shot, ang Firefox post  screenshot sa iyong online Screenshot ng library at mga kopya ng link sa iyong clipboard. Awtomatiko naming iniimbak ang iyong screenshot sa loob ng dalawang linggo, ngunit maaari mong tanggalin ang mga pag-shot sa anumang oras o baguhin ang petsa ng pag-expire upang mapanatili ang mga ito sa iyong library nang mas matagal.
homePageLegalLink = Legal
homePagePrivacyLink = Privacy
homePageTermsLink = Mga Tuntunin
homePageCookiesLink = Mga cookie


[[ Leave Screenshots page ]]

leavePageRemoveAllData = Alisin ang Lahat na Data
// Note: do not translate 'Firefox Screenshots' when translating this string
leavePageErrorAddonRequired = Kailangang naka-install ang mga screenshot ng Firefox upang tanggalin ang iyong account
leavePageErrorGeneric = May pagkakamaling naganap
// Note: do not translate 'Firefox Screenshots' when translating this string
leavePageWarning = Ito ay permanenteng burahin ang lahat ng iyong data sa Mga screenshot ng Firefox.
leavePageButtonProceed = Magpatuloy
leavePageButtonCancel = Kanselahin
leavePageDeleted = Ang lahat ng iyong mga screenshot ay nabura!


[[ Not Found page ]]

notFoundPageTitle = Hindi Makita ang Pahina
notFoundPageIntro = Oops.
notFoundPageDescription = Hindi Makita ang Pahina


[[ Shot page ]]

// This is the HTML title tag of the page
shotPageTitle = Screenshot: { $originalTitle }
shotPageAlertErrorUpdatingExpirationTime = Error sa pag-save ng pag-expire
shotPageAlertErrorDeletingShot = Error sa pagtanggal ng pagbaril
shotPageAlertErrorUpdatingTitle = Error sa pag-save ng pamagat
shotPageConfirmDelete = Sigurado ka bang gusto mong permanenteng tanggalin ang shot na ito?
shotPageShareButton
    .title = Ibahagi
shotPageCopy = Kopyahin
shotPageCopied = Kinopya
shotPageShareFacebook
    .title = Ibahagi sa Facebook
shotPageShareTwitter
    .title = Ibahagi sa Twitter
shotPageSharePinterest
    .title = Ibahagi sa Pinterest
shotPageShareEmail
    .title = Ibahagi ang link sa email
shotPageShareLink = Kumuha ng isang naibahaging link sa pagbaril na ito:
shotPagePrivacyMessage = Maaaring tingnan ng sinumang may link ang pagbaril na ito.
shotPageCopyImageText
    .label = Kopyahin ang teksto ng larawan
shotPageConfirmDeletion = Sigurado ka bang gusto mong permanenteng tanggalin ang shot na ito?
shotPageDownloadShot
    .title = I-download
shotPageDownload = I-download
shotPageUpsellFirefox = Kumuha ng Firefox ngayun
shotPageKeepTenMinutes = 10 Minuto
shotPageKeepOneHour = 1 Oras
shotPageKeepOneDay = 1 Araw
shotPageKeepOneWeek = 1 Linggo
shotPageKeepTwoWeeks = 2 Linggo
shotPageKeepOneMonth = 1 Buwan
timeDiffFutureDays = { $num ->
        [one] Bukas
       *[other] sa { $number } na mga araw
    }


[[ Annotations ]]



[[ Shotindex page ]]

shotIndexPageNoSearchResultsIntro = Hmm


// all metrics strings are optional for translation
[[ Metrics page ]]

metricsPageShotsQueryDay = Araw
metricsPageUsersQueryDay = Araw
metricsPageVersionQueryLastSeen = Araw
// Note { $time } is a placeholder for a number of milliseconds, like '100'
metricsPageDatabaseQueryTime = (database time: { $time }ms)
