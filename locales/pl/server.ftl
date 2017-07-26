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


[[ Creating page ]]

// Note: { $title } is a placeholder for the title of the web page
// captured in the screenshot. The default, for pages without titles, is
// creatingPageTitleDefault.
creatingPageTitle = Tworzenie { $title }
creatingPageTitleDefault = strona


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
homePageTermsLink = Warunki
homePageCookiesLink = Ciasteczka


[[ Leave Screenshots page ]]

leavePageConfirmDelete = Potwierdź usunięcie konta
// Note: do not translate 'Firefox Screenshots' when translating this string
leavePageErrorAddonRequired = Aby usunąć konto, Firefox Screenshots musi być zainstalowane
leavePageErrorGeneric = Wystąpił błąd
// Note: do not translate 'Firefox Screenshots' when translating this string
leavePageWarning = Twoje dane w Firefox Screenshots zostaną trwale usunięte.
leavePageButtonProceed = Kontynuuj
leavePageButtonCancel = Anuluj
leavePageDeleted = Wszystkie zrzuty ekranu zostały usunięte!


[[ Not Found page ]]

notFoundPageTitle = Nie odnaleziono strony
notFoundPageIntro = Błąd
notFoundPageDescription = Nie odnaleziono strony.


[[ Shot page ]]

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


[[ Shotindex page ]]



// all metrics strings are optional for translation
[[ Metrics page ]]

