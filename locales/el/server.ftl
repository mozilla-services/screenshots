// Global phrases shared across pages, prefixed with 'g'
gMyShots = Τα στιγμιότυπά μου
gHomeLink = Αρχική
gNoShots
    .alt = Δεν βρέθηκαν στιγμιότυπα
gScreenshotsDescription = Η λήψη στιγμιοτύπων έγινε εύκολη. Λήψη, αποθήκευση και κοινή χρήση στιγμιοτύπων χωρίς να φύγετε από το Firefox.
// Creating page// Note: {$title} is a placeholder for the title of the web page
// captured in the screenshot. The default, for pages without titles, is
// creatingPageTitleDefault.
creatingPageTitle = Δημιουργία { $title }
creatingPageTitleDefault = σελίδα
// Home pagehomePageDescription
    .content = Εύκολη λήψη στιγμιοτύπων, ενσωματωμένη στο πρόγραμμα περιήγησης. Λήψη, αποθήκευση και κοινή χρήση στιγμιοτύπων κατά την περιήγηση στο διαδίκτυο με το Firefox.
homePageTeaser = Έρχεται σύντομα...
homePageDownloadFirefoxTitle = Firefox
homePageDownloadFirefoxSubTitle = Δωρεάν λήψη
homePageGetStarted = Ξεκινήστε
// Note: do not translate 'Firefox Screenshots' when translating this string
homePageHowScreenshotsWorks = Πώς λειτουργεί το Firefox Screenshots
homePageGetStartedTitle = Ξεκινήστε
// Note: Screenshots is an abbreviation for Firefox Screenshots, and should not be translated.
homePageGetStartedDescription = Βρείτε το νέο εικονίδιο του Screenshots στη γραμμή εργαλείων σας. Επιλέξτε το και το μενού του Screenshots θα εμφανιστεί στο πάνω μέρος του παραθύρου του προγράμματος περιήγησής σας.
homePageCaptureRegion = Καταγραφή περιοχής
// Note: Screenshots is an abbreviation for Firefox Screenshots, and should not be translated.
homePageCaptureRegionDescription = Κάντε κλικ και σύρετε για να επιλέξετε την περιοχή που θέλετε να καταγράψετε σε στιγμιότυπο. Ή απλά μετακινήστε τον κέρσορα και κάντε κλικ — το Screenshots θα επιλέξει για εσάς την περιοχή. Σάς αρέσει αυτό που βλέπετε; Επιλέξτε "Αποθήκευση" για να αποκτήσετε πρόσβαση στο στιγμιότυπό σας διαδικτυακά ή το κάτω βέλος για να κάνετε λήψη της εικόνας στον υπολογιστή σας.
homePageCapturePage = Καταγραφή σελίδας
homePageCapturePageDescription = Χρησιμοποιήστε τα κουμπιά επάνω δεξιά για να καταγράψετε πλήρεις σελίδες σε στιγμιότυπα. Το κουμπί "Αποθήκευση ορατού" θα καταγράψει την περιοχή που μπορείτε να δείτε χωρίς κύλιση, ενώ το "Αποθήκευση πλήρους σελίδας" θα καταγράψει τα πάντα στη σελίδα.
homePageSaveShare = Αποθήκευση και κοινή χρήση
homePageLegalLink = Νομικά
homePagePrivacyLink = Απόρρητο
homePageTermsLink = Όροι
homePageCookiesLink = Cookies
// Leave Screenshots pageleavePageErrorGeneric = Προέκυψε σφάλμα
leavePageButtonProceed = Συνέχεια
leavePageButtonCancel = Ακύρωση
leavePageDeleted = Όλα τα στιγμιότυπά σας έχουν διαγραφεί!
// Not Found pagenotFoundPageIntro = Ωχ.
notFoundPageDescription = Η σελίδα δεν βρέθηκε.
// Shot pageshotPageAlertErrorUpdatingTitle = Σφάλμα αποθήκευσης τίτλου
shotPageConfirmDelete = Θέλετε σίγουρα να διαγράψετε οριστικά το στιγμιότυπο;
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
shotIndexPageSearchPlaceholder
    .placeholder = Αναζήτηση στα στιγμιότυπά μου
shotIndexPageSearchButton
    .title = Αναζήτηση
shotIndexPageNoShotsMessage = Κανένα αποθηκευμένο στιγμιότυπο.
shotIndexPageNoShotsInvitation = Εμπρός, δημιουργήστε μερικά.
shotIndexPageLookingForShots = Αναζήτηση των στιγμιοτύπων σας…
shotIndexPageNoSearchResultsIntro = Χμμ
shotIndexPageNoSearchResults = Δεν μπορούμε να βρούμε κανένα στιγμιότυπο που να αντιστοιχεί στην αναζήτησή σας.
shotIndexPageClearSearchButton
    .title = Εκκαθάριση αναζήτησης
shotIndexPageConfirmShotDelete = Διαγραφή στιγμιότυπου;
// Metrics page
// Note: all metrics strings are optional for translation// Note: 'Firefox Screenshots' should not be translated
metricsPageTitle = Δείκτες Firefox Screenshots
metricsPageTotalsQueryTitle = Συνολικά
// Note: Screenshots is an abbreviation for Firefox Screenshots, and should not be translated.
metricsPageTotalsQueryDescription = Μια επισκόπηση του Screenshots
metricsPageTotalsQueryDevices = Σύνολο εγγεγραμμένων συσκευών
metricsPageTotalsQueryActiveShots = Ενεργά στιγμιότυπα
metricsPageTotalsQueryExpiredShots = Ληγμένα (αλλά ανακτήσιμα)
metricsPageTotalsQueryExpiredDeletedShots = Ληγμένα (και διαγραμμένα)
metricsPageShotsQueryTitle = Στιγμιότυπα ανά ημέρα
metricsPageShotsQueryDescription = Αριθμός στιγμιοτύπων που δημιουργούνται κάθε μέρα (για τις 30 τελευταίες ημέρες)
metricsPageShotsQueryCount = Αριθμός στιγμιοτύπων
metricsPageShotsQueryDay = Ημέρα
metricsPageUsersQueryTitle = Χρήστες ανά ημέρα
metricsPageUsersQueryCount = Αριθμός χρηστών
metricsPageUsersQueryDay = Ημέρα
metricsPageUserShotsQueryTitle = Αριθμός στιγμιοτύπων ανά χρήστη
metricsPageUserShotsQueryCount = Αριθμός χρηστών
metricsPageRetentionQueryTitle = Διατήρηση ανά εβδομάδα
metricsPageRetentionQueryUsers = Αριθμός χρηστών
metricsPageTotalRetentionQueryTitle = Συνολική διατήρηση
metricsPageTotalRetentionQueryUsers = Αριθμός χρηστών
metricsPageVersionQueryTitle = Έκδοση προσθέτου
metricsPageVersionQueryVersion = Έκδοση προσθέτου
metricsPageVersionQueryLastSeen = Ημέρα
metricsPageHeader = Δείκτες
// Note: {$created} is a placeholder for a localized date and time, like '4/21/2017, 3:40:04 AM'
metricsPageGeneratedDateTime = Δημιουργήθηκε στις: { $created }
// Note {$time} is a placeholder for a number of milliseconds, like '100'
metricsPageDatabaseQueryTime = (χρόνος βάσης δεδομένων: { $time }ms)
