// Localization for Server-side strings of Firefox Screenshots
// 
// Please don't localize Firefox, Firefox Screenshots, or Screenshots



// Global phrases shared across pages, prefixed with 'g'
[[ global ]]

gMyShots = Moje zrzuty
gHomeLink = Strona główna
gNoShots
    .alt = Brak zrzutów
gScreenshotsDescription = Zrzuty ekranów dla wszystkich. Twórz, zapisuj i udostępniaj zrzuty ekranu prosto z Firefoksa.


[[ Footer ]]

// Note: link text for a link to mozilla.org
footerLinkMozilla = Mozilla
footerLinkTerms = Warunki korzystania z usługi
footerLinkPrivacy = Prywatność
footerLinkDMCA = Zgłoś naruszenie własności intelektualnej
footerLinkDiscourse = Wyślij opinię
footerLinkRemoveAllData = Usuń wszystkie dane


[[ Creating page ]]

// Note: { $title } is a placeholder for the title of the web page
// captured in the screenshot. The default, for pages without titles, is
// creatingPageTitleDefault.
creatingPageTitle = Tworzenie „{ $title }”
creatingPageTitleDefault = strona
creatingPageWaitMessage = Zapisywanie zrzutu…


[[ Home page ]]

homePageDescription
    .content = Intuicyjne tworzenie zrzutów ekranu z poziomu przeglądarki. Twórz, zapisuj i udostępniaj zrzuty podczas przeglądania Internetu za pomocą Firefoksa.
homePageButtonMyShots = Przejdź do moich zrzutów
homePageTeaser = Wkrótce…
homePageDownloadFirefoxTitle = Firefox
homePageDownloadFirefoxSubTitle = Darmowe pobieranie
homePageGetStarted = Wprowadzenie
// Note: do not translate 'Firefox Screenshots' when translating this string
homePageHowScreenshotsWorks = Jak działa Firefox Screenshots
homePageGetStartedTitle = Wprowadzenie
// Note: Screenshots is an abbreviation for Firefox Screenshots, and should not be translated.
homePageGetStartedDescription = Znajdź ikonę Screenshots na pasku narzędzi. Kliknij ją, aby wyświetlić menu Screenshots.
homePageCaptureRegion = Zrzut obszaru
// Note: Screenshots is an abbreviation for Firefox Screenshots, and should not be translated.
homePageCaptureRegionDescription = Kliknij i przeciągnij nad obszarem, który chcesz przechwycić. Możesz również kliknąć dowolny element strony — Screenshots wybierze obszar automatycznie. Może być? Kliknij Zapisz, aby zapisać zrzut w Internecie lub ikonę strzałki, aby pobrać go na komputer.
homePageCapturePage = Zrzut strony
homePageCapturePageDescription = Użyj przycisków u góry po prawej, aby tworzyć zrzuty całych stron. Przycisk „Zapisz widoczne” umożliwia tworzenie jedynie wyświetlanego obszaru, a „Zapisz całą stronę” utworzy zrzut całej zawartości strony.
homePageSaveShare = Zapisz i udostępnij
// Note: Screenshots is an abbreviation for Firefox Screenshots, and should not be translated.
homePageSaveShareDescription = Kiedy utworzysz zrzut, Firefox zapisze go w Twojej internetowej kolekcji Screenshots i skopiuje odnośnik do schowka. Automatycznie przechowujemy zrzuty przez dwa tygodnie, ale możesz je usunąć w dowolnej chwili lub zmienić ich datę przeterminowania, aby zachować je na dłużej.
homePageLegalLink = Podstawa prawna
homePagePrivacyLink = Prywatność
homePageTermsLink = Warunki korzystania z usługi
homePageCookiesLink = Ciasteczka


[[ Leave Screenshots page ]]

leavePageRemoveAllData = Usuń wszystkie dane
// Note: do not translate 'Firefox Screenshots' when translating this string
leavePageErrorAddonRequired = Aby usunąć konto, Firefox Screenshots musi być zainstalowane
leavePageErrorGeneric = Wystąpił błąd
// Note: do not translate 'Firefox Screenshots' when translating this string
leavePageWarning = Twoje dane w Firefox Screenshots zostaną trwale usunięte.
leavePageButtonProceed = Kontynuuj
leavePageButtonCancel = Anuluj
leavePageDeleted = Wszystkie zrzuty ekranu zostały usunięte.


[[ Not Found page ]]

notFoundPageTitle = Nie odnaleziono strony
notFoundPageIntro = Błąd
notFoundPageDescription = Nie odnaleziono strony.


[[ Shot page ]]

// This is the HTML title tag of the page
shotPageTitle = Zrzut ekranu: { $originalTitle }
shotPageAlertErrorUpdatingExpirationTime = Błąd podczas zapisywania daty przeterminowania
shotPageAlertErrorDeletingShot = Błąd podczas usuwania zrzutu
shotPageAlertErrorUpdatingTitle = Błąd podczas zapisywania tytułu
shotPageConfirmDelete = Czy na pewno trwale usunąć ten zrzut?
shotPageShareButton
    .title = Udostępnij
shotPageCopy = Kopiuj
shotPageCopied = Skopiowano
shotPageShareFacebook
    .title = Udostępnij na Facebooku
shotPageShareTwitter
    .title = Udostępnij na Twitterze
shotPageSharePinterest
    .title = Udostępnij na Pintereście
shotPageShareEmail
    .title = Wyślij odnośnik pocztą
shotPageShareLink = Odnośnik do udostępniania tego zrzutu:
shotPagePrivacyMessage = Wszyscy z tym odnośnikiem mogą wyświetlić ten zrzut.
shotPageCopyImageText
    .label = Kopiuj tekst obrazu
shotPageConfirmDeletion = Czy na pewno trwale usunąć ten zrzut?
// Note: { $timediff } is a placeholder for a future relative time clause like 'in 3 days' or 'tomorrow'
shotPageExpirationMessage = Ten zrzut zostanie automatycznie usunięty { $timediff }.
// Note: { $date } is a placeholder for a localized future date as returned by Date.toLocaleString.
// For example, in en-US, { $date } could be "7/12/2017, 1:52:50 PM".
shotPageRestoreButton = przywróć do { $date }
shotPageExpiredMessage = Ten zrzut uległ przeterminowaniu.
// Note: This phrase is followed by an empty line, then the URL of the source page
shotPageExpiredMessageDetails = Strona, z której został utworzony:
shotPageDeleteButton
    .title = Usuń ten zrzut
shotPageAbuseButton
    .title = Zgłoś naruszenie zasad lub inne problemy z tym zrzutem
shotPageDownloadShot
    .title = Pobierz
shotPageDownload = Pobierz
shotPageScreenshotsDescription = Zrzuty ekranu dla każdego. Twórz, zapisuj i udostępniaj zrzuty ekranu bez opuszczania Firefoksa.
shotPageUpsellFirefox = Pobierz Firefoksa
shotPageDMCAMessage = Ten zrzut został usunięty z powodu roszczeń prawnych strony trzeciej.
// Note: { $dmca } is a placeholder for a link to send email (a 'mailto' link)
shotPageDMCAContact = Wyślij wiadomość do { $dmca } w celu uzyskania dalszych informacji.
// Note: do not translate 'Firefox Screenshots' when translating this string
shotPageDMCAWarning = Jeśli Twoje zrzuty wywołają wiele roszczeń prawnych innych podmiotów, możemy zablokować Twój dostęp do Firefox Screenshots.
// Note: { $url } is a placeholder for a shot page URL
shotPageDMCAIncludeLink = Załącz odnośnik do tego zrzutu w wiadomości: { $url }
shotPageKeepFor = Jak długo mamy zachować ten zrzut?
// Note: shotPageSelectTime is a placeholder label for the time selection dropdown.
shotPageSelectTime = Wybierz czas
shotPageKeepIndefinitely = Bezterminowo
shotPageKeepTenMinutes = 10 minut
shotPageKeepOneHour = 1 godzina
shotPageKeepOneDay = 1 dzień
shotPageKeepOneWeek = 1 tydzień
shotPageKeepTwoWeeks = 2 tygodnie
shotPageKeepOneMonth = 1 miesiąc
shotPageSaveExpiration = zapisz
shotPageCancelExpiration = anuluj
shotPageDoesNotExpire = nie ulega przeterminowaniu
// Note: { $timediff } is a placeholder for a future relative time clause, like "in 1 week" or "tomorrow"
shotPageExpiresIn = ulega przeterminowaniu { $timediff }
// Note: { $timediff } is a placeholder for a past relative time clause, like "1 week ago" or "yesterday"
shotPageExpired = uległ przeterminowaniu { $timediff }
timeDiffJustNow = przed chwilą
timeDiffMinutesAgo = { $num ->
        [one] minutę temu
        [few] { $number } minuty temu
       *[other] { $number } minut temu
    }
timeDiffHoursAgo = { $num ->
        [one] godzinę temu
        [few] { $number } godziny temu
       *[other] { $number } godzin temu
    }
timeDiffDaysAgo = { $num ->
        [one] wczoraj
        [few] { $number } dni temu
       *[other] { $number } dni temu
    }
timeDiffFutureSeconds = za kilka sekund
timeDiffFutureMinutes = { $num ->
        [one] za minutę
        [few] za { $number } minuty
       *[other] za { $number } minut
    }
timeDiffFutureHours = { $num ->
        [one] za godzinę
        [few] za { $number } godziny
       *[other] za { $number } godzin
    }
timeDiffFutureDays = { $num ->
        [one] jutro
        [few] za { $number } dni
       *[other] za { $number } dni
    }


[[ Shotindex page ]]

// { $status } is a placeholder for an HTTP status code, like '500'.
// { $statusText } is a text description of the status code, like 'Internal server error'.
shotIndexPageErrorDeletingShot = Błąd podczas usuwania zrzutu: { $status } { $statusText }
// { $searchTerm } is a placeholder for text the user typed into the search box
shotIndexPageSearchResultsTitle = Moje zrzuty: wyszukaj „{ $searchTerm }”
// { $error } is a placeholder for a non-translated error message that could be shared
// with developers when debugging an error.
shotIndexPageErrorRendering = Błąd podczas wyświetlania strony: { $error }
shotIndexPageSearchPlaceholder
    .placeholder = Przeszukaj moje zrzuty
shotIndexPageSearchButton
    .title = Szukaj
shotIndexPageNoShotsMessage = Brak zrzutów.
shotIndexPageNoShotsInvitation = Może jakiś utworzymy?
shotIndexPageLookingForShots = Wyszukiwanie zrzutów…
shotIndexPageNoSearchResultsIntro = Hmm
shotIndexPageNoSearchResults = Nie możemy znaleźć zrzutów pasujących do wyszukiwania.
shotIndexPageClearSearchButton
    .title = Wyczyść wyszukiwanie
shotIndexPageConfirmShotDelete = Usunąć ten zrzut?


// all metrics strings are optional for translation
[[ Metrics page ]]

// Note: 'Firefox Screenshots' should not be translated
metricsPageTitle = Statystyki Firefox Screenshots
metricsPageTotalsQueryTitle = Razem
// Note: Screenshots is an abbreviation for Firefox Screenshots, and should not be translated.
metricsPageTotalsQueryDescription = Przegląd Screenshots
metricsPageTotalsQueryDevices = Liczba zarejestrowanych urządzeń
metricsPageTotalsQueryActiveShots = Aktywne zrzuty
metricsPageTotalsQueryExpiredShots = Przeterminowane (do odzysku)
metricsPageTotalsQueryExpiredDeletedShots = Przeterminowane (usunięte)
metricsPageShotsQueryTitle = Zrzuty dziennie
metricsPageShotsQueryDescription = Liczba zrzutów tworzonych codziennie (przez ostatnich 30 dni)
metricsPageShotsQueryCount = Liczba zrzutów
metricsPageShotsQueryDay = Dzień
metricsPageUsersQueryTitle = Liczba użytkowników dziennie
metricsPageUsersQueryDescription = Liczba użytkowników tworzących przynajmniej jeden zrzut, dziennie (ostatnich 30 dni)
metricsPageUsersQueryCount = Liczba użytkowników
metricsPageUsersQueryDay = Dzień
metricsPageUserShotsQueryTitle = Liczba zrzutów na użytkownika
metricsPageUserShotsQueryDescription = Liczba użytkowników, którzy utworzyli około N zrzutów
metricsPageUserShotsQueryCount = Liczba użytkowników
metricsPageUserShotsQueryShots = Przybliżona liczba aktywnych (nieprzeterminowanych) zrzutów
metricsPageRetentionQueryTitle = Tygodniowa retencja
metricsPageRetentionQueryDescription = Liczba dni od pierwszego do najnowszego zrzutu użytkownika, według pierwszego tygodnia
metricsPageRetentionQueryUsers = Liczba użytkowników
metricsPageRetentionQueryDays = Dni od pierwszego do najnowszego zrzutu użytkownika
metricsPageRetentionQueryFirstWeek = Tydzień, w którym użytkownik utworzył pierwszy zrzut
metricsPageTotalRetentionQueryTitle = Całkowita retencja
metricsPageTotalRetentionQueryDescription = Czas tworzenia zrzutów przez użytkowników, według tygodnia
metricsPageTotalRetentionQueryUsers = Liczba użytkowników
metricsPageTotalRetentionQueryDays = Liczba dni, podczas których użytkownik tworzył zrzuty
metricsPageVersionQueryTitle = Wersja dodatku
metricsPageVersionQueryDescription = Wersja dodatku użyta podczas zalogowania, podczas ostatnich 14 dni
metricsPageVersionQueryUsers = Liczba zalogowanych użytkowników
metricsPageVersionQueryVersion = Wersja dodatku
metricsPageVersionQueryLastSeen = Dzień
metricsPageHeader = Statystyki
// Note: { $created } is a placeholder for a localized date and time, like '4/21/2017, 3:40:04 AM'
metricsPageGeneratedDateTime = Utworzono: { $created }
// Note { $time } is a placeholder for a number of milliseconds, like '100'
metricsPageDatabaseQueryTime = (czas bazy danych: { $time } ms)
