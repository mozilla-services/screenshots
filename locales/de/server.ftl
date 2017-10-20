// Localization for Server-side strings of Firefox Screenshots
// 
// Please don't localize Firefox, Firefox Screenshots, or Screenshots



// Global phrases shared across pages, prefixed with 'g'
[[ global ]]

gMyShots = Meine Bildschirmfotos
gHomeLink = Startseite
gNoShots
    .alt = Keine Bildschirmfotos gefunden
gScreenshotsDescription = Bildschirmfotos einfach machen, speichern und teilen – ohne Firefox zu verlassen.


[[ Footer ]]

// Note: link text for a link to mozilla.org
footerLinkMozilla = Mozilla
footerLinkTerms = Nutzungsbedingungen
footerLinkPrivacy = Datenschutzhinweis
footerLinkFaqs = Häufig gestellte Fragen
footerLinkDMCA = Verletzung geistigen Eigentums melden
footerLinkDiscourse = Feedback geben
footerLinkRemoveAllData = Alle Daten entfernen


[[ Creating page ]]

// Note: { $title } is a placeholder for the title of the web page
// captured in the screenshot. The default, for pages without titles, is
// creatingPageTitleDefault.
creatingPageTitle = { $title } wird erstellt
creatingPageTitleDefault = Seite
creatingPageWaitMessage = Dein Bildschirmfoto wird gespeichert …


[[ Home page ]]

homePageDescription
    .content = Intuitive Bildschirmfotos direkt aus dem Browser. Während des Surfens mit Firefox können Sie Screenshots machen, speichern und teilen.
homePageButtonMyShots = Meine Bildschirmfotos anzeigen
homePageTeaser = Bald verfügbar…
homePageDownloadFirefoxTitle = Firefox
homePageDownloadFirefoxSubTitle = Kostenloser Download
homePageGetStarted = Erste Schritte
// Note: do not translate 'Firefox Screenshots' when translating this string
homePageHowScreenshotsWorks = Wie Firefox Screenshots funktioniert
homePageGetStartedTitle = Menü aufrufen
// Note: Screenshots is an abbreviation for Firefox Screenshots, and should not be translated.
homePageGetStartedDescription = Das neue Screenshots-Symbol findest Du in der Symbolleiste. Wenn Du diese öffnest, erscheint das Screenshots-Menü oben in Deinem Browser-Fenster.
// Note: Screenshots is an abbreviation for Firefox Screenshots, and should not be translated.
homePageGetStartedDescriptionPageAction = Wähle das Screenshots-Symbol aus dem Menü „Aktionen für Seite“ in der Adressleiste aus. Dann erscheint oben in Deinem Browser-Fenster das Screenshots-Menü.
homePageCaptureRegion = Einen Bereich aufnehmen
// Note: Screenshots is an abbreviation for Firefox Screenshots, and should not be translated.
homePageCaptureRegionDescription = Lege Deine Auswahl fest, indem Du die Maus über den aufzunehmenden Bereich ziehst. Oder nur mit der Maus drübergehen und Screenshots wählt den Bereich für Dich aus. Damit zufrieden? Dann bitte klicken und auf „Speichern“ gehen, um Dein Bildschirmfoto online zu speichern. Oder direkt auf den Downloadpfeil, um den Screenshot auf Deinem Rechner herunterzuladen.
homePageCapturePage = Eine ganze Seite aufnehmen
homePageCapturePageDescription = Für die Aufnahme ganzer Seiten bitte oben auf die Schaltfläche "Gesamte Seite speichern" klicken. Während die Schaltfläche „Sichtbaren Bereich aufnehmen“ den Bereich erfasst, der ohne Scrollen sichtbar ist.
homePageSaveShare = Speichern und Weitergeben
// Note: Screenshots is an abbreviation for Firefox Screenshots, and should not be translated.
homePageSaveShareDescription = Wenn Du ein Bildschirmfoto machst, speichert Firefox den Screenshot in Deiner Online-Bibliothek für Bildschirmfotos und kopiert Dir den Link in die Zwischenablage. Deine Bildschirmfotos werden automatisch zwei Wochen in der Bibliothek gespeichert.  Dort kannst Du sie jederzeit löschen oder das Ablaufdatum ändern, um sie länger in der Bibliothek zu behalten.
homePageLegalLink = Rechtliches
homePagePrivacyLink = Datenschutz
homePageTermsLink = Nutzungsbedingungen
homePageCookiesLink = Cookies


[[ Leave Screenshots page ]]

leavePageRemoveAllData = Alle Daten entfernen
// Note: do not translate 'Firefox Screenshots' when translating this string
leavePageErrorAddonRequired = Firefox Screenshots muss installiert sein, um Dein Konto zu löschen
leavePageErrorGeneric = Ein Fehler ist aufgetreten
// Note: do not translate 'Firefox Screenshots' when translating this string
leavePageWarning = Dies löscht dauerhaft all Deine Daten von Firefox Screenshots.
leavePageButtonProceed = Fortfahren
leavePageButtonCancel = Abbrechen
leavePageDeleted = Alle Bildschirmfotos wurden gelöscht!


[[ Not Found page ]]

notFoundPageTitle = Seite nicht gefunden
notFoundPageIntro = Hoppla.
notFoundPageDescription = Seite nicht gefunden.


[[ Shot page ]]

// This is the HTML title tag of the page
shotPageTitle = Bildschirmfoto: { $originalTitle }
shotPageAlertErrorUpdatingExpirationTime = Fehler beim Speichern des Ablaufdatums
shotPageAlertErrorDeletingShot = Fehler beim Löschen des Bildschirmfotos
shotPageAlertErrorUpdatingTitle = Fehler beim Speichern des Titels
shotPageConfirmDelete = Soll dieses Bildschirmfoto wirklich dauerhaft gelöscht werden?
shotPageShareButton
    .title = Teilen
shotPageCopy = Kopieren
shotPageCopied = Kopiert
shotPageShareFacebook
    .title = Auf Facebook teilen
shotPageShareTwitter
    .title = Auf Twitter teilen
shotPageSharePinterest
    .title = Auf Pinterest teilen
shotPageShareEmail
    .title = Link per E-Mail teilen
shotPageShareLink = Einen Link zum Teilen dieses Bildschirmfotos erzeugen:
shotPagePrivacyMessage = Jeder mit dem Link kann das Bildschirmfoto ansehen.
shotPageCopyImageText
    .label = Grafiktext kopieren
shotPageConfirmDeletion = Soll dieses Bildschirmfoto wirklich dauerhaft gelöscht werden?
// Note: { $timediff } is a placeholder for a future relative time clause like 'in 3 days' or 'tomorrow'
shotPageExpirationMessage = Wenn Du nichts tust, wird dieses Bildschirmfoto automatisch { $timediff } gelöscht.
// Note: { $date } is a placeholder for a localized future date as returned by Date.toLocaleString.
// For example, in en-US, { $date } could be "7/12/2017, 1:52:50 PM".
shotPageRestoreButton = Wiederherstellen bis { $date }
shotPageExpiredMessage = Dieses Bildschirmfoto ist abgelaufen.
// Note: This phrase is followed by an empty line, then the URL of the source page
shotPageExpiredMessageDetails = Es wurde ursprünglich von dieser Seite erstellt:
shotPageDeleteButton
    .title = Dieses Bildschirmfoto löschen
shotPageAbuseButton
    .title = Dieses Bildschirmfoto wegen Missbrauchs, Spam oder anderer Probleme melden
shotPageDownloadShot
    .title = Herunterladen
shotPageDownload = Herunterladen
shotPageScreenshotsDescription = Bildschirmfotos einfach machen, speichern und teilen – ohne Firefox zu verlassen.
shotPageUpsellFirefox = Hole Dir jetzt Firefox
shotPageDMCAMessage = Dieses Bildschirmfoto ist aufgrund von Urheberrechtsansprüchen von Dritten nicht mehr verfügbar.
// Note: { $dmca } is a placeholder for a link to send email (a 'mailto' link)
shotPageDMCAContact = Weitere Informationen erhälst Du per E-Mail an { $dmca }.
// Note: do not translate 'Firefox Screenshots' when translating this string
shotPageDMCAWarning = Werden bei Deinen Bildschirmfotos Ansprüche geltend gemacht, wird Dir der Zugang zu Firefox Screenshots möglicherweise entzogen.
// Note: { $url } is a placeholder for a shot page URL
shotPageDMCAIncludeLink = Bitte gib in Deiner E-Mail die URL dieses Bildschirmfotos an: { $url }
shotPageKeepFor = Wie lange soll dieses Bildschirmfoto aufbewahrt werden?
// Note: shotPageSelectTime is a placeholder label for the time selection dropdown.
shotPageSelectTime = Zeit auswählen
shotPageKeepIndefinitely = Unbegrenzt
shotPageKeepTenMinutes = 10 Minuten
shotPageKeepOneHour = Eine Stunde
shotPageKeepOneDay = Ein Tag
shotPageKeepOneWeek = Eine Woche
shotPageKeepTwoWeeks = Zwei Wochen
shotPageKeepOneMonth = Ein Monat
shotPageSaveExpiration = speichern
shotPageCancelExpiration = Abbrechen
shotPageDoesNotExpire = Läuft nicht ab
// Note: { $timediff } is a placeholder for a future relative time clause, like "in 1 week" or "tomorrow"
shotPageExpiresIn = Läuft ab { $timediff }
// Note: { $timediff } is a placeholder for a past relative time clause, like "1 week ago" or "yesterday"
shotPageExpired = Lief ab { $timediff }
timeDiffJustNow = gerade eben
timeDiffMinutesAgo = { $num ->
        [one] vor einer Minute
       *[other] vor { $number } Minuten
    }
timeDiffHoursAgo = { $num ->
        [one] vor einer Stunde
       *[other] vor { $number } Stunden
    }
timeDiffDaysAgo = { $num ->
        [one] gestern
       *[other] vor { $number } Tagen
    }
timeDiffFutureSeconds = in wenigen Sekunden
timeDiffFutureMinutes = { $num ->
        [one] in einer Minute
       *[other] in { $number } Minuten
    }
timeDiffFutureHours = { $num ->
        [one] in einer Stunde
       *[other] in { $number } Stunden
    }
timeDiffFutureDays = { $num ->
        [one] morgen
       *[other] in { $number } Tagen
    }


[[ Shotindex page ]]

// { $status } is a placeholder for an HTTP status code, like '500'.
// { $statusText } is a text description of the status code, like 'Internal server error'.
shotIndexPageErrorDeletingShot = Fehler beim Löschen des Bildschirmfotos: { $status } { $statusText }
// { $searchTerm } is a placeholder for text the user typed into the search box
shotIndexPageSearchResultsTitle = Meine Bildschirmfotos: Suchen nach { $searchTerm }
// { $error } is a placeholder for a non-translated error message that could be shared
// with developers when debugging an error.
shotIndexPageErrorRendering = Fehler beim Darstellen der Seite: { $error }
shotIndexPageSearchPlaceholder
    .placeholder = Meine Bildschirmfotos durchsuchen
shotIndexPageSearchButton
    .title = Suchen
shotIndexPageNoShotsMessage = Keine gespeicherten Bildschirmfotos.
shotIndexPageNoShotsInvitation = Los, erstellen Sie welche.
shotIndexPageLookingForShots = Suchen nach Ihren Bildschirmfotos…
shotIndexPageNoSearchResultsIntro = Hmm
shotIndexPageNoSearchResults = Wir finden keine zu Deiner Suche passenden Bildschirmfotos.
shotIndexPageClearSearchButton
    .title = Suche löschen
shotIndexPageConfirmShotDelete = Dieses Bildschirmfoto löschen?


// all metrics strings are optional for translation
[[ Metrics page ]]

// Note: 'Firefox Screenshots' should not be translated
metricsPageTitle = Metriken zu Firefox Screenshots
metricsPageTotalsQueryTitle = Gesamt
// Note: Screenshots is an abbreviation for Firefox Screenshots, and should not be translated.
metricsPageTotalsQueryDescription = Eine Übersicht zu Screenshots
metricsPageTotalsQueryDevices = Insgesamt registrierte Geräte
metricsPageTotalsQueryActiveShots = Aktive Bildschirmfotos
metricsPageTotalsQueryExpiredShots = Abgelaufen (aber wiederherstellbar)
metricsPageTotalsQueryExpiredDeletedShots = Abgelaufen (und gelöscht)
metricsPageShotsQueryTitle = Bildschirmfotos nach Tag
metricsPageShotsQueryDescription = Zahl der pro Tag erstellten Bildschirmfotos (für die letzten 30 Tage)
metricsPageShotsQueryCount = Anzahl der Bildschirmfotos
metricsPageShotsQueryDay = Tag
metricsPageUsersQueryTitle = Nutzer nach Tag
metricsPageUsersQueryDescription = Zahl der Nutzer, die mindestens ein Bildschirmfoto erstellt hat, nach Tag (letzte 30 Tage)
metricsPageUsersQueryCount = Anzahl der Benutzer
metricsPageUsersQueryDay = Tag
metricsPageUserShotsQueryTitle = Zahl von Bildschirmfotos pro Nutzer
metricsPageUserShotsQueryDescription = Die Anzahl der Benutzer, die insgesamt etwa N Bildschirmfotos hat
metricsPageUserShotsQueryCount = Anzahl der Benutzer
metricsPageUserShotsQueryShots = Ungefähre Anzahl aktiver (nicht abgelaufener) Bildschirmfotos
metricsPageRetentionQueryTitle = Weiternutzung nach Woche
metricsPageRetentionQueryDescription = Anzahl der Tage vom ersten bis zum neuesten Bildschirmfoto einer Benutzers, nach Anfangswoche gruppiert
metricsPageRetentionQueryUsers = Anzahl der Benutzer
metricsPageRetentionQueryDays = Tage vom ersten bis zum neuesten Bildschirmfoto eines Benutzers
metricsPageRetentionQueryFirstWeek = Woche, in der der Benutzer erstmals ein Bildschirmfoto erstellt hat
metricsPageTotalRetentionQueryTitle = Weiternutzung insgesamt
metricsPageTotalRetentionQueryDescription = Länge der Zeit, in der Nutzer Bildschirmfotos erstellen, nach Woche gruppiert
metricsPageTotalRetentionQueryUsers = Anzahl der Benutzer
metricsPageTotalRetentionQueryDays = Tage, die der Benutzer Bildschirmfotos erstellt
metricsPageVersionQueryTitle = Add-on-Version
metricsPageVersionQueryDescription = Die Version des Add-ons während der Anmeldung in den letzten 14 Tagen
metricsPageVersionQueryUsers = Anzahl der angemeldeten Benutzer
metricsPageVersionQueryVersion = Add-on-Version
metricsPageVersionQueryLastSeen = Tag
metricsPageHeader = Metriken
// Note: { $created } is a placeholder for a localized date and time, like '4/21/2017, 3:40:04 AM'
metricsPageGeneratedDateTime = Erstellt am: { $created }
// Note { $time } is a placeholder for a number of milliseconds, like '100'
metricsPageDatabaseQueryTime = (Zeitstempel der Datenbank: { $time }ms)
