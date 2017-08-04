// Localization for Server-side strings of Firefox Screenshots
// 
// Please don't localize Firefox, Firefox Screenshots, or Screenshots



// Global phrases shared across pages, prefixed with 'g'
[[ global ]]

gMyShots = મારા શોટ્સ
gHomeLink = મુખ પૃષ્ઠ
gNoShots
    .alt = કોઈ શૉટ્સ મળ્યાં નથી


[[ Footer ]]

// Note: link text for a link to mozilla.org
footerLinkMozilla = Mozilla
footerLinkPrivacy = ગોપનીયતા સૂચના
footerLinkDMCA = IP ઉલ્લંઘનની જાણ કરો
footerLinkDiscourse = અભીપ્રાય આપો
footerLinkRemoveAllData = તમામ ડેટાને દૂર કરો


[[ Creating page ]]

// Note: { $title } is a placeholder for the title of the web page
// captured in the screenshot. The default, for pages without titles, is
// creatingPageTitleDefault.
creatingPageTitle = બનાવી રહ્યા છે { $title }
creatingPageTitleDefault = પાનું


[[ Home page ]]

homePageButtonMyShots = મારા શોટ્સ પર જાઓ
homePageTeaser = ટૂક સમયમાં આવી રહ્યું છે…
homePageDownloadFirefoxTitle = Firefox
homePageDownloadFirefoxSubTitle = મફત ડાઉનલોડ
homePageGetStarted = શરૂ કરો
// Note: do not translate 'Firefox Screenshots' when translating this string
homePageHowScreenshotsWorks = Firefox Screenshots કેવી રીતે કામ કરે છે
homePageGetStartedTitle = શરૂ કરો
homePageCaptureRegion = પ્રદેશને પકડો
homePageSaveShare = સાચવો અને વહેચો
homePageLegalLink = કાયદાકીય
homePagePrivacyLink = ખાનગીપણું
homePageTermsLink = શરતો
homePageCookiesLink = કુકીઓ


[[ Leave Screenshots page ]]

leavePageConfirmDelete = એકાઉન્ટ કાઢી નાખવાની પુષ્ટિ કરો
leavePageErrorGeneric = એક ભૂલ આવી
leavePageButtonProceed = આગળ વધો
leavePageButtonCancel = રદ કરો


[[ Not Found page ]]

notFoundPageTitle = પૃષ્ઠ મળ્યું નથી
notFoundPageIntro = અરર.
notFoundPageDescription = પૃષ્ઠ મળ્યું નથી.


[[ Shot page ]]

// This is the HTML title tag of the page
shotPageTitle = સ્ક્રીનશૉટ: { $originalTitle }
shotPageAlertErrorUpdatingExpirationTime = સમાપ્તિ બચત કરવામાં ભૂલ
shotPageAlertErrorDeletingShot = શોટ કાઢવામાં ભૂલ
shotPageAlertErrorUpdatingTitle = શીર્ષક સાચવવામાં ભૂલ
shotPageConfirmDelete = શું તમે ખરેખર આ શોટને કાયમ માટે કાઢી નાખવા માંગો છો?
shotPageShareButton
    .title = વહેચો
shotPageCopy = નકલ કરો
shotPageCopied = નકલ કરેલું
shotPageShareFacebook
    .title = Facebook પર વહેચો
shotPageShareTwitter
    .title = Twitter પર વહેચો
shotPageSharePinterest
    .title = Pinterest પર વહેચો
shotPageShareEmail
    .title = ઇમેઇલ દ્વારા લિંક વહેંચો
shotPageShareLink = આ શૉટ પર વહેંચવા કરવા યોગ્ય લિંક મેળવો:
shotPagePrivacyMessage = લિંક ધરાવનાર કોઈપણ આ શોટને જોઈ શકે છે.
shotPageCopyImageText
    .label = છબી ટેક્સ્ટ નકલ કરો
shotPageConfirmDeletion = શું તમે ખરેખર આ શોટને કાયમ માટે કાઢી નાખવા માંગો છો?
// Note: { $date } is a placeholder for a localized future date as returned by Date.toLocaleString.
// For example, in en-US, { $date } could be "7/12/2017, 1:52:50 PM".
shotPageRestoreButton = જ્યાં સુધી પુનઃસ્થાપિત કરો { $date }
shotPageExpiredMessage = આ શોટની સમયસીમા સમાપ્ત થઈ ગઈ છે.
shotPageDeleteButton
    .title = આ શોટ કાઢી નાખો
shotPageAbuseButton
    .title = દુરુપયોગ, સ્પામ અથવા અન્ય સમસ્યાઓ માટે આ શોટની જાણ કરો
shotPageDownloadShot
    .title = ડાઉનલોડ કરો
shotPageDownload = ડાઉનલોડ કરો
shotPageUpsellFirefox = હમણાં Firefox મેળવો
// Note: shotPageSelectTime is a placeholder label for the time selection dropdown.
shotPageSelectTime = સમય પસંદ કરો
shotPageKeepIndefinitely = અનિશ્ચિતપણે
shotPageKeepTenMinutes = 10 મિનીટ
shotPageKeepOneHour = 1 કલાક
shotPageKeepOneDay = 1 દિવસ
shotPageKeepOneWeek = 1 અઠવાડિયું
shotPageKeepTwoWeeks = 2 અઠવાડિયા
shotPageKeepOneMonth = 1 મહિનો
shotPageSaveExpiration = સંગ્રહો
shotPageCancelExpiration = રદ કરો
shotPageDoesNotExpire = સમાપ્ત થતું નથી
// Note: { $timediff } is a placeholder for a future relative time clause, like "in 1 week" or "tomorrow"
shotPageExpiresIn = સમાપ્ત થાય છે { $timediff }
// Note: { $timediff } is a placeholder for a past relative time clause, like "1 week ago" or "yesterday"
shotPageExpired = સમાપ્ત થઈ { $timediff }
timeDiffJustNow = હમણાજ
timeDiffMinutesAgo = { $num ->
        [one] 1 મિનિટ પહેલા
       *[other] { $number } મિનિટ પહેલા
    }
timeDiffHoursAgo = { $num ->
        [one] 1 કલાક પહેલા
       *[other] { $number } કલાક પહેલા
    }
timeDiffDaysAgo = { $num ->
        [one] ગઇકાલે
       *[other] { $number } દિવસ પહેલા
    }
timeDiffFutureSeconds = થોડીવારમાં


[[ Shotindex page ]]



// all metrics strings are optional for translation
[[ Metrics page ]]

metricsPageVersionQueryLastSeen = દિવસ
metricsPageHeader = માપદંડ
