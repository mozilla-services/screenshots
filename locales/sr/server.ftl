### Localization for Server-side strings of Firefox Screenshots
### Please don't localize Firefox, Firefox Screenshots, or Screenshots


## Global phrases shared across pages, prefixed with 'g'

gMyShots = Моји снимци
gHomeLink = Почетна
gNoShots =
    .alt = Нема пронађених снимака
gScreenshotsDescription = Веома једноставни снимци екрана. Начините, сачувајте и делите ваше снимке екрана без напуштања Firefox-а.

## Footer

# Note: link text for a link to mozilla.org
footerLinkMozilla = Mozilla
footerLinkTerms = Услови
footerLinkPrivacy = Обавештење о приватности
footerLinkFaqs = ЧПП
footerLinkDMCA = Пријави кршење интелектуалне својине
footerLinkDiscourse = Пошаљите повратне податке
footerLinkRemoveAllData = Уклони све податке

## Creating page

# Note: { $title } is a placeholder for the title of the web page
# captured in the screenshot. The default, for pages without titles, is
# creatingPageTitleDefault.
creatingPageTitle = Правим снимак странице { $title }
creatingPageTitleDefault = страница
creatingPageWaitMessage = Чувам ваш снимак…

## Home page

homePageDescription =
    .content = Интиутивни снимци екрана уграђени у прегледач. Начините, сачувајте и делите снимке екрана док прегледате веб преко Firefox-а.
homePageButtonMyShots = Иди на моје снимке
homePageTeaser = Доступно ускоро…
homePageDownloadFirefoxTitle = Firefox
homePageDownloadFirefoxSubTitle = Бесплатно преузимање
homePageGetStarted = Почните са коришћењем
# Note: do not translate 'Firefox Screenshots' when translating this string
homePageHowScreenshotsWorks = Како Firefox Screenshots ради
homePageGetStartedTitle = Почните са коришћењем
# Note: Screenshots is an abbreviation for Firefox Screenshots, and should not be translated.
homePageGetStartedDescription = Нађите нову иконицу Screenshots-а међу вашим алатима. Изаберите је и мени снимака екрана ће се појавити у врху прозора вашег прегледача.
# Note: Screenshots is an abbreviation for Firefox Screenshots, and should not be translated.
homePageGetStartedDescriptionPageAction = Изаберите иконицу снимака екрана из менија странице у адресној траци и мени снимака екрана ће се појавити на врху прозора вашег прегледача.
homePageCaptureRegion = Ухватите део странице
# Note: Screenshots is an abbreviation for Firefox Screenshots, and should not be translated.
homePageCaptureRegionDescription = Кликните и повуците да бисте изабрали део странице који желите да сачувате. Или само померите миш на жељени део и кликните, Screenshots ће изабрати део за вас. Свиђа вам се то што видите? Изаберите „Сачувај“ да бисте приступили свом снимку екрана на мрежи или притисните стрелицу надоле да бисте га сачували на свој рачунар.
homePageCapturePage = Ухватите целу страницу
homePageCapturePageDescription = Користите дугмад у горњем десном да бисте сачували целе странице. Дугме „Сачувај видљиво“ ће ухватити део који можете видети без клизања а дугме „Сачувај целу страницу“ ће ухватити све на страници.
homePageSaveShare = Сачувај и подели
# Note: Screenshots is an abbreviation for Firefox Screenshots, and should not be translated.
homePageSaveShareDescription = Када ухватите снимак, Firefox складишти ваш снимак екрана у вашу мрежну библиотеку снимака екрана и копира везу у вашу оставу. Аутоматски чувамо снимак екрана две недеље али можете обрисати снимке у било ком тренутку или променити време истека да бисте их задржали дуже у библиотеци.
homePageLegalLink = Правни подаци
homePagePrivacyLink = Приватност
homePageTermsLink = Услови
homePageCookiesLink = Колачићи

## Leave Screenshots page

leavePageRemoveAllData = Уклони све податке
# Note: do not translate 'Firefox Screenshots' when translating this string
leavePageErrorAddonRequired = Морате имати инсталиран Firefox Screenshots да бисте обрисали ваш налог
leavePageErrorGeneric = Догодила се грешка
# Note: do not translate 'Firefox Screenshots' when translating this string
leavePageWarning = Ово ће трајно обрисати све ваше Firefox Screenshots податке.
leavePageButtonProceed = Настави
leavePageButtonCancel = Откажи
leavePageDeleted = Сви ваши снимци екрана су обрисани!

## Not Found page

notFoundPageTitle = Страница није нађена
notFoundPageIntro = Упс.
notFoundPageDescription = Страница није нађена.

## Shot page

# This is the HTML title tag of the page
shotPageTitle = Снимак екрана: { $originalTitle }
shotPageAlertErrorUpdatingExpirationTime = Грешка при чувању времена истека
shotPageAlertErrorDeletingShot = Грешка при брисању снимка
shotPageAlertErrorUpdatingTitle = Грешка при чувању наслова
shotPageConfirmDelete = Да ли сте сигурни да желите обрисати овај снимак трајно?
shotPageShareButton =
    .title = Подели
shotPageCopy = Копирај
shotPageCopied = Копирано
shotPageShareFacebook =
    .title = Подели на Facebook-у
shotPageShareTwitter =
    .title = Подели на Twitter-у
shotPageSharePinterest =
    .title = Подели на Pinterest-у
shotPageShareEmail =
    .title = Подели везу преко имејла
shotPageShareLink = Добави везу за дељење овог снимка:
shotPagePrivacyMessage = Било ко са везом може видети овај снимак.
shotPageCopyImageText =
    .label = Копирај текст слике
shotPageConfirmDeletion = Да ли сте сигурни да желите обрисати овај снимак трајно?
# Note: { $timediff } is a placeholder for a future relative time clause like 'in 3 days' or 'tomorrow'
shotPageExpirationMessage = Ако не предузмете било шта, снимак ће бити обрисан { $timediff }.
# Note: { $date } is a placeholder for a localized future date as returned by Date.toLocaleString.
# For example, in en-US, { $date } could be "7/12/2017, 1:52:50 PM".
shotPageRestoreButton = обнови до { $date }
shotPageExpiredMessage = Овај снимак је истекао.
# Note: This phrase is followed by an empty line, then the URL of the source page
shotPageExpiredMessageDetails = Ово је страница из које је изворно настао:
shotPageDeleteButton =
    .title = Обриши овај снимак
shotPageAbuseButton =
    .title = Пријави злоупотребу, непожељно или друге проблеме на овом снимку
shotPageDownloadShot =
    .title = Преузми
shotPageEditButton =
    .title = Уреди ову слику
shotPageDownload = Преузми
shotPageScreenshotsDescription = Снимци екрана, поједностављени. Ухватите, сачувајте и делите снимке екрана без напуштања Firefox-а.
shotPageUpsellFirefox = Преузмите Firefox сада
shotPageDMCAMessage = Овај снимак није више доступан зато што је примљен извештај о повреди ауторских права.
# Note: { $dmca } is a placeholder for a link to send email (a 'mailto' link)
shotPageDMCAContact = За више података, пошаљите мејл на { $dmca }.
# Note: do not translate 'Firefox Screenshots' when translating this string
shotPageDMCAWarning = Ако се поднесе више извештаја о повреди ауторских права за ваше снимке, задржавамо право да вам опозовемо приступ Firefox-овим снимцима екрана.
# Note: { $url } is a placeholder for a shot page URL
shotPageDMCAIncludeLink = Укључите адресу до овог снимка у вашем мејлу: { $url }
shotPageKeepFor = Колико дуго треба задржати овај снимак?
# Note: shotPageSelectTime is a placeholder label for the time selection dropdown.
shotPageSelectTime = Изаберите време
# The ∞ is used to indicate that the shot won't expire. It is also used in
# shotIndexNoExpirationSymbol. Try to use the same symbol in both strings, or
# if no such symbol is available for a language/culture, simply leave it out.
shotPageKeepIndefinitelyWithSymbol = Бесконачно ∞
shotPageKeepTenMinutes = 10 минута
shotPageKeepOneHour = 1 сат
shotPageKeepOneDay = 1 дан
shotPageKeepOneWeek = 1 недеља
shotPageKeepTwoWeeks = 2 недеље
shotPageKeepOneMonth = 1 месец
shotPageSaveExpiration = сачувај
shotPageCancelExpiration = откажи
shotPageDoesNotExpire = не истиче
# Note: { $timediff } is a placeholder for a future relative time clause, like "in 1 week" or "tomorrow"
shotPageExpiresIn = истиче { $timediff }
# Note: { $timediff } is a placeholder for a past relative time clause, like "1 week ago" or "yesterday"
shotPageExpired = истекло { $timediff }
timeDiffJustNow = управо
timeDiffMinutesAgo =
    { $number ->
        [one] пре једног минута
        [few] пре { $number } минута
       *[other] пре { $number } минута
    }
timeDiffHoursAgo =
    { $number ->
        [one] пре једног сата
        [few] пре { $number } сата
       *[other] пре { $number } сати
    }
timeDiffDaysAgo =
    { $number ->
        [one] јуче
        [few] пре { $number } дана
       *[other] пре { $number } дана
    }
timeDiffFutureSeconds = за пар секунди
timeDiffFutureMinutes =
    { $number ->
        [one] за један минут
        [few] за { $number } минута
       *[other] за { $number } минута
    }
timeDiffFutureHours =
    { $number ->
        [one] за један сат
        [few] за { $number } сата
       *[other] за { $number } сати
    }
timeDiffFutureDays =
    { $number ->
        [one] сутра
        [few] за { $number } дана
       *[other] за { $number } дана
    }
errorThirdPartyCookiesEnabled = Ако сте усликали овај снимак и не можете да га обришете, можда морате привремено да омогућите колачиће трећих лица у вашим поставкама.

## Annotations

annotationPenButton =
    .title = Оловка
annotationHighlighterButton =
    .title = Маркер
# Note: This button reverts all the changes on the image since the start of the editing session.
annotationClearButton =
    .title = Очисти
annotationCropButton =
    .title = Одрежи
annotationSaveEditButton = Сачувај
    .title = Сачувај измене
annotationCancelEditButton = Откажи
    .title = Откажи измене
annotationCropConfirmButton = Потврди
    .title = Потврди избор
annotationCropCancelButton = Откажи
    .title = Откажи избор
annotationColorWhite =
    .title = Бела
annotationColorBlack =
    .title = Црна
annotationColorRed =
    .title = Црвена
annotationColorGreen =
    .title = Зелена
annotationColorBlue =
    .title = Плава
annotationColorYellow =
    .title = Жута
annotationColorPurple =
    .title = Љубичаста
annotationColorSeaGreen =
    .title = Морска зелена
annotationColorGrey =
    .title = Сива

## Settings Page

settingsDisconnectButton = Прекини везу
    .title = Прекини везу
settingsGuestAccountMessage = Налог госта
settingsSignInInvite = Пријавите се да синхронизујете уређаје
settingsSignInButton = Пријави се
    .title = Пријави се
SettingsPageHeader = Firefox Screenshots поставке
settingsDescription = Можете се пријавити са Firefox налогом да синхронизујете све ваше снимке екрана са другим уређајима и да приступате са њих.
settingsPageSubHeader = Sync и налози
settingsClosePreferences =
    .title = Затвори поставке

## Shotindex page

# { $status } is a placeholder for an HTTP status code, like '500'.
# { $statusText } is a text description of the status code, like 'Internal server error'.
shotIndexPageErrorDeletingShot = Грешка при брисању снимка: { $status } { $statusText }
# { $searchTerm } is a placeholder for text the user typed into the search box
shotIndexPageSearchResultsTitle = Моји снимци: претрага за { $searchTerm }
# { $error } is a placeholder for a non-translated error message that could be shared
# with developers when debugging an error.
shotIndexPageErrorRendering = Грешка при исцртавању странице: { $error }
shotIndexPageSearchPlaceholder =
    .placeholder = Претражи моје снимке
shotIndexPageSearchButton =
    .title = Претрага
shotIndexPageNoShotsMessage = Нема сачуваних снимака.
shotIndexPageNoShotsInvitation = Слободно, направите неки.
shotIndexPageLookingForShots = Тражим ваше снимке…
shotIndexPageNoSearchResultsIntro = Хм
shotIndexPageNoSearchResults = Не можемо наћи ниједан снимак који се подудара са вашом претрагом.
shotIndexPageClearSearchButton =
    .title = Очисти претрагу
shotIndexPageConfirmShotDelete = Обрисати овај снимак?
shotIndexPagePreviousPage =
    .title = Претходна страница
shotIndexPageNextPage =
    .title = Следећа страница
# This symbol is used in the lower right corner of the card for a shot on the
# My Shots page to indicate that the shot does not expire. It should be a
# single character (or simply nothing if no such symbol is available for a
# language/culture).
shotIndexNoExpirationSymbol = ∞
    .title = Овај снимак нема рок трајања

## Metrics page
## All metrics strings are optional for translation

# Note: 'Firefox Screenshots' should not be translated
metricsPageTitle = Firefox Screenshots мерења
metricsPageTotalsQueryTitle = Укупно
# Note: Screenshots is an abbreviation for Firefox Screenshots, and should not be translated.
metricsPageTotalsQueryDescription = Преглед за Screenshots
metricsPageTotalsQueryDevices = Укупно регистрованих уређаја
metricsPageTotalsQueryActiveShots = Активних снимака
metricsPageTotalsQueryExpiredShots = Истеклих (могуће опоравити)
metricsPageTotalsQueryExpiredDeletedShots = Истеклих (и обрисаних)
metricsPageShotsQueryTitle = Снимака по дану
metricsPageShotsQueryDescription = Број направљених снимака сваког дана (за последњих 30 дана)
metricsPageShotsQueryCount = Број снимака
metricsPageShotsQueryDay = Дан
metricsPageUsersQueryTitle = Корисника по дану
metricsPageUsersQueryDescription = Број корисника који су направили барем један снимак, по дану (последњих 30 дана)
metricsPageUsersQueryCount = Број корисника
metricsPageUsersQueryDay = Дан
metricsPageUserShotsQueryTitle = Број снимака по кориснику
metricsPageUserShotsQueryDescription = Број корисника који имају одређени број снимака
metricsPageUserShotsQueryCount = Број корисника
metricsPageUserShotsQueryShots = Приближан број активних (неистеклих) снимака
metricsPageRetentionQueryTitle = Задржавање по недељи
metricsPageRetentionQueryDescription = Број дана од првог снимка корисника па до последњег снимка, поређано по почетној недељи
metricsPageRetentionQueryUsers = Број корисника
metricsPageRetentionQueryDays = Дани од првог корисничког снимка па до последњег
metricsPageRetentionQueryFirstWeek = Недеља у којој је корисник први пут начинио снимак
metricsPageTotalRetentionQueryTitle = Укупно задржавања
metricsPageTotalRetentionQueryDescription = Трајање времена у којем су корисници стварали снимке, поређано по недељи
metricsPageTotalRetentionQueryUsers = Број корисника
metricsPageTotalRetentionQueryDays = Дани у којима је корисник стварао снимке
metricsPageVersionQueryTitle = Издање у облику додатка
metricsPageVersionQueryDescription = Издање у облику додатка коришћено приликом пријављивања, у последњих 14 дана
metricsPageVersionQueryUsers = Број корисничких пријава
metricsPageVersionQueryVersion = Издање у облику додатка
metricsPageVersionQueryLastSeen = Дан
metricsPageHeader = Мерења
# Note: { $created } is a placeholder for a localized date and time, like '4/21/2017, 3:40:04 AM'
metricsPageGeneratedDateTime = Направљено у: { $created }
# Note { $time } is a placeholder for a number of milliseconds, like '100'
metricsPageDatabaseQueryTime = (време базе података: { $time }ms)
