// Localization for Server-side strings of Firefox Screenshots
// 
// Please don't localize Firefox, Firefox Screenshots, or Screenshots



// Global phrases shared across pages, prefixed with 'g'
[[ global ]]

gHomeLink = Gang


[[ Footer ]]

// Note: link text for a link to mozilla.org
footerLinkMozilla = Mozilla
footerLinkTerms = Cik
footerLinkPrivacy = Ngec me mung
footerLinkDiscourse = Mi Adwogi


[[ Creating page ]]

creatingPageTitleDefault = potbuk


[[ Home page ]]

homePageTeaser = Cok Bino
homePageDownloadFirefoxTitle = Firefox
homePageDownloadFirefoxSubTitle = Gam me nono
homePageGetStarted = Caki
// Note: do not translate 'Firefox Screenshots' when translating this string
homePageHowScreenshotsWorks = Kit ma Firefox Screenshots Tiyo Kede
homePageGetStartedTitle = Caki
homePageSaveShare = Gwokki ki Nywaki
homePageLegalLink = Cik
homePagePrivacyLink = Mung
homePageTermsLink = Cik
homePageCookiesLink = Angija


[[ Leave Screenshots page ]]

// Note: do not translate 'Firefox Screenshots' when translating this string
leavePageErrorAddonRequired = Myero ibed ki Firefox Screenshots ma kiketo me kwanyo akaunt mamegi
leavePageErrorGeneric = Bal otime
leavePageButtonProceed = Mede
leavePageButtonCancel = Kwer


[[ Not Found page ]]

notFoundPageTitle = Potbuk pe ononge
notFoundPageIntro = Oops.
notFoundPageDescription = Potbuk pe ononge.


[[ Shot page ]]

shotPageShareButton
    .title = Poki
shotPageCopy = Loki
shotPageCopied = Kiloko
shotPageShareFacebook
    .title = Poki i Facebook
shotPageShareTwitter
    .title = Poki i Twitter
shotPageSharePinterest
    .title = poki i pinterest
shotPageShareEmail
    .title = Nywak kakube i email
shotPageCopyImageText
    .label = Lok coc me cal
// Note: { $date } is a placeholder for a localized future date as returned by Date.toLocaleString.
// For example, in en-US, { $date } could be "7/12/2017, 1:52:50 PM".
shotPageRestoreButton = dwoki naka wa { $date }
shotPageDownloadShot
    .title = Gam
shotPageDownload = Gam
shotPageUpsellFirefox = Nong Firefox Kombedi
// Note: { $dmca } is a placeholder for a link to send email (a 'mailto' link)
shotPageDMCAContact = Tim ber i cwal email bot { $dmca } me penyo pi ngec mapol.
// Note: shotPageSelectTime is a placeholder label for the time selection dropdown.
shotPageSelectTime = Yer cawa
shotPageKeepIndefinitely = Matwal
shotPageKeepTenMinutes = Tekika 10
shotPageKeepOneHour = Cawa 1
shotPageKeepOneDay = Nino 1
shotPageKeepOneWeek = Cabit 1
shotPageKeepTwoWeeks = Cabit 2
shotPageKeepOneMonth = Dwe 1
shotPageSaveExpiration = gwoki
shotPageCancelExpiration = kwer
shotPageDoesNotExpire = pe bale
// Note: { $timediff } is a placeholder for a future relative time clause, like "in 1 week" or "tomorrow"
shotPageExpiresIn = kare ne okato { $timediff }
// Note: { $timediff } is a placeholder for a past relative time clause, like "1 week ago" or "yesterday"
shotPageExpired = kare ne okato { $timediff }
timeDiffJustNow = Pud kombedi
timeDiffMinutesAgo = { $num ->
        [one] tekika 1 mukato angec
       *[other] tekika { $number } mukato angec
    }
timeDiffHoursAgo = { $num ->
        [one] Cawa 1 mukato angec
       *[other] cawa { $number } mukato angec
    }
timeDiffDaysAgo = { $num ->
        [one] Lawo
       *[other] nino { $number }  mukato angec
    }
timeDiffFutureSeconds = i secon manok
timeDiffFutureMinutes = { $num ->
        [one] i tekika 1
       *[other] i  tekika { $number }
    }
timeDiffFutureHours = { $num ->
        [one] i cawa 1
       *[other] i cawa { $number }
    }
timeDiffFutureDays = { $num ->
        [one] diki
       *[other] i nino { $number } 
    }


[[ Shotindex page ]]

shotIndexPageSearchButton
    .title = Yeny
shotIndexPageNoShotsInvitation = Mede, cwe mogo.
shotIndexPageNoSearchResultsIntro = Hmm
shotIndexPageClearSearchButton
    .title = Jwa yeny


// all metrics strings are optional for translation
[[ Metrics page ]]

metricsPageTotalsQueryTitle = Wel
metricsPageTotalsQueryDevices = Wel nyonyo ma kicoyo
metricsPageTotalsQueryExpiredShots = Kare ne okato (ento pud romo nonge)
metricsPageTotalsQueryExpiredDeletedShots = Kare ne okato (ki bene kikwanyo woko)
metricsPageShotsQueryDay = Diceng
metricsPageUsersQueryTitle = Lutic kudiceng
metricsPageUsersQueryCount = Wel Lutic
metricsPageUsersQueryDay = Diceng
metricsPageUserShotsQueryCount = Wel lutic
metricsPageVersionQueryLastSeen = Nino
