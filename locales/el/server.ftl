// Global phrases shared across pages, prefixed with 'g'
gMyShots = Τα στιγμιότυπά μου
gHomeLink = Αρχική
gNoShots
    .alt = Δεν βρέθηκαν στιγμιότυπα
// Creating page// Note: {$title} is a placeholder for the title of the web page
// captured in the screenshot. The default, for pages without titles, is
// creatingPageTitleDefault.
creatingPageTitle = Δημιουργία { $title }
creatingPageTitleDefault = σελίδα
// Home pagehomePageButtonMyShots = Μετάβαση στα στιγμιότυπά μου
homePageTeaser = Έρχεται σύντομα...
homePageDownloadFirefoxTitle = Firefox
homePageDownloadFirefoxSubTitle = Δωρεάν λήψη
homePageGetStarted = Ξεκινήστε
// Note: do not translate 'Firefox Screenshots' when translating this string
homePageHowScreenshotsWorks = Πώς λειτουργεί το Firefox Screenshots
homePageGetStartedTitle = Ξεκινήστε
homePageLegalLink = Νομικά
homePagePrivacyLink = Απόρρητο
homePageTermsLink = Όροι
homePageCookiesLink = Cookies
// Leave Screenshots pageleavePageConfirmDelete = Επιβεβαίωση διαγραφής λογαριασμού
leavePageErrorGeneric = Προέκυψε σφάλμα
leavePageButtonProceed = Συνέχεια
leavePageButtonCancel = Ακύρωση
leavePageDeleted = Όλα τα στιγμιότυπά σας έχουν διαγραφεί!
// Not Found pagenotFoundPageTitle = Η σελίδα δεν βρέθηκε
notFoundPageIntro = Ωχ.
notFoundPageDescription = Η σελίδα δεν βρέθηκε.
// Shot pageshotPageAlertErrorDeletingShot = Σφάλμα διαγραφής στιγμιότυπου
shotPageAlertErrorUpdatingTitle = Σφάλμα αποθήκευσης τίτλου
shotPageShareButton
    .title = Κοινή χρήση
shotPageCopy = Αντιγραφή
shotPageCopied = Αντιγράφηκε
shotPageShareFacebook
    .title = Κοινοποίηση στο Facebook
shotPageShareTwitter
    .title = Κοινοποίηση στο Twitter
shotPageSharePinterest
    .title = Κοινοποίηση στο Pinterest
shotPageShareEmail
    .title = Κοινοποίηση συνδέσμου μέσω email
shotPageCopyImageText
    .label = Αντιγραφή κειμένου εικόνας
// Note: {$date} is a placeholder for a localized future date as returned by Date.toLocaleString.
// For example, in en-US, {$date} could be "7/12/2017, 1:52:50 PM".
shotPageRestoreButton = ανάκτηση μέχρι { $date }
shotPageExpiredMessage = Αυτό το στιγμιότυπο έχει λήξει.
shotPageDeleteButton
    .title = Διαγραφή στιγμιότυπου
shotPageDownloadShot
    .title = Λήψη
// Note: shotPageSelectTime is a placeholder label for the time selection dropdown.
shotPageSelectTime = Επιλέξτε χρόνο
shotPageKeepIndefinitely = Επ' αόριστον
shotPageKeepTenMinutes = 10 λεπτά
shotPageKeepOneHour = 1 ώρα
shotPageKeepOneDay = 1 ημέρα
shotPageKeepOneWeek = 1 εβδομάδα
shotPageKeepTwoWeeks = 2 εβδομάδες
shotPageKeepOneMonth = 1 μήνας
shotPageSaveExpiration = αποθήκευση
shotPageCancelExpiration = ακύρωση
shotPageDoesNotExpire = δεν λήγει
// Note: {$timediff} is a placeholder for a future relative time clause, like "in 1 week" or "tomorrow"
shotPageExpiresIn = λήγει { $timediff }
// Note: {$timediff} is a placeholder for a past relative time clause, like "1 week ago" or "yesterday"
shotPageExpired = έληξε { $timediff }
timeDiffJustNow = μόλις τώρα
timeDiffMinutesAgo = { $num ->
        [one] 1 λεπτό πριν
       *[other] { $number } λεπτά πριν
    }
timeDiffHoursAgo = { $num ->
        [one] 1 ώρα πριν
       *[other] { $number } ώρες πριν
    }
timeDiffDaysAgo = { $num ->
        [one] χθες
       *[other] { $number } ημέρες πριν
    }
timeDiffFutureSeconds = σε λίγα δευτερόλεπτα
timeDiffFutureMinutes = { $num ->
        [one] σε 1 λεπτό
       *[other] σε { $number } λεπτά
    }
timeDiffFutureHours = { $num ->
        [one] σε 1 ώρα
       *[other] σε { $number } ώρες
    }
timeDiffFutureDays = { $num ->
        [one] αύριο
       *[other] σε { $number } ημέρες
    }
// Shotindex page// {$status} is a placeholder for an HTTP status code, like '500'.
// {$statusText} is a text description of the status code, like 'Internal server error'.
shotIndexPageErrorDeletingShot = Σφάλμα διαγραφής στιγμιότυπου: { $status } { $statusText }
// {$searchTerm} is a placeholder for text the user typed into the search box
shotIndexPageSearchResultsTitle = Τα στιγμιότυπά μου: αναζήτηση για { $searchTerm }
// {$error} is a placeholder for a non-translated error message that could be shared
// with developers when debugging an error.
shotIndexPageErrorRendering = Σφάλμα εμφάνισης σελίδας: { $error }
// Metrics page
// Note: all metrics strings are optional for translationmetricsPageUsersQueryDay = Ημέρα
metricsPageUserShotsQueryCount = Αριθμός χρηστών
metricsPageTotalRetentionQueryUsers = Αριθμός χρηστών
metricsPageVersionQueryTitle = Έκδοση προσθέτου
metricsPageVersionQueryLastSeen = Ημέρα
