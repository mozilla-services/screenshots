### Localization for Server-side strings of Firefox Screenshots
### Please don't localize Firefox, Firefox Screenshots, or Screenshots


## Global phrases shared across pages, prefixed with 'g'

gMyShots = Minhas capturas
gHomeLink = Início
gNoShots =
    .alt = Sem capturas encontradas
gScreenshotsDescriptionServerless = Capturas de ecrã simples. Capture e transfira capturas de ecrã sem sair do Firefox.

## Header

buttonSettings =
    .title = Definições
buttonSignIn =
    .title = Iniciar sessão
screenshotsLogo =
    .title = Início do Screenshots
bannerSignIn = <a>Inicie sessão ou registe-se</a> para aceder às suas capturas entre dispositivos e guardar as suas favoritas para sempre.
bannerUpsell = { gScreenshotsDescription } <a>Obter o Firefox agora</a>
shutdownWarning =
    <b>As capturas de ecrã guardadas vão expirar brevemente.</b> A começar em junho, o Screenshots não irá mais oferecer armazenamento online. Pretende manter capturas da sua biblioteca?
    <a>Transfira-as para o seu computador.</a>
# Text used in Firefox Account onboarding promo shown below
# Sign in button in header
onboardingPromoTitle = O que há de novo no Firefox Screenshots?
onboardingPromoMessage = Agora, inicie sessão no Screenshots com uma Conta Firefox e faça mais:
onboardingPromoMessageListItem1 = Aceda à sua biblioteca em todos os seus dispositivos
onboardingPromoMessageListItem2 = Armazene as suas capturas favoritas para sempre
onboardingPromoDismissButton = Dispensar
    .title = Dispensar
onboardingPromoSigninButton = Iniciar sessão
    .title = Iniciar sessão

## Footer

# Note: link text for a link to mozilla.org
footerLinkMozilla = Mozilla
footerLinkTerms = Termos
footerLinkPrivacy = Aviso de privacidade
footerReportShot = Reportar captura
    .title = Reportar esta captura por abuso, spam, ou outros problemas
footerLinkFaqs = Perguntas frequentes
footerLinkDMCA = Reportar violação de PI
footerLinkDiscourse = Dar feedback
footerLinkRemoveAllData = Remover todos os dados

## Creating page

# Note: { $title } is a placeholder for the title of the web page
# captured in the screenshot. The default, for pages without titles, is
# creatingPageTitleDefault.
creatingPageTitle = A criar { $title }
creatingPageTitleDefault = página
creatingPageWaitMessage = A guardar a sua captura...

## Home page

homePageDescription =
    .content = Capturas de ecrã intuitivas embutidas no navegador. Capture, guarde e partilhe capturas de ecrã enquanto navega na Web utilizando o Firefox.
homePageButtonMyShots = Ir para as minhas capturas
homePageTeaser = Brevemente...
homePageDownloadFirefoxTitle = Firefox
homePageDownloadFirefoxSubTitle = Transferência gratuita
# Note: do not translate 'Firefox Screenshots' when translating this string
homePageHowScreenshotsWorks = Como é que o Firefox Screenshots funciona
homePageGetStartedTitle = Começar
# Note: Screenshots is an abbreviation for Firefox Screenshots, and should not be translated.
homePageGetStartedDescriptionPageAction = Selecione o ícone do Screenshots a partir do menu de ações da página na barra de endereço e o menu do Screenshots irá aparecer por cima da janela do seu navegador.
homePageCaptureRegion = Capturar uma região
# Note: Screenshots is an abbreviation for Firefox Screenshots, and should not be translated.
homePageCaptureRegionDescription = Clique e arraste para selecionar a área que deseja capturar ou paire e clique — O Screenshots irá selecionar a área por si. Gosta do que está a ver? Selecione Guardar para aceder à sua captura de ecrã na Internet ou no botão de seta para baixo para a transferir para o seu computador.
homePageCapturePage = Capturar uma página
homePageCapturePageDescription = Utilize os botões no canto superior direito para capturar páginas inteiras. O botão Guardar visível irá capturar a área que pode ver sem deslocar e Guardar página inteira irá capturar tudo na página.
homePageDownloadCopy = Transferir ou copiar
# Note: Screenshots is an abbreviation for Firefox Screenshots, and should not be translated.
homePageDownloadCopyDescription = Dê o seu melhor tiro. As capturas de ecrã permitem-lhe transferir a sua seleção ou copiá-la diretamente para a área de transferência.
homePageLegalLink = Informação legal
homePagePrivacyLink = Privacidade
homePageTermsLink = Termos
homePageCookiesLink = Cookies

## Leave Screenshots page

leavePageRemoveAllData = Remover todos os dados
# Note: do not translate 'Firefox Screenshots' when translating this string
leavePageErrorAuthRequired = Precisa de ter o Firefox Screenshots instalado ou sessão iniciada no Contas Firefox para apagar a sua conta
leavePageErrorGeneric = Ocorreu um erro
# Note: do not translate 'Firefox Screenshots' when translating this string
leavePageWarning = Isto irá apagar permanentemente todos os seus dados do Firefox Screenshots.
leavePageButtonProceed = Proceder
leavePageButtonCancel = Cancelar
leavePageDeleted = Todas as suas capturas de ecrã foram apagadas!

## Not Found page

notFoundPageTitle = Página não encontrada
notFoundPageIntro = Oops.
notFoundPageDescription = Página não encontrada.

## Shot page

# This is the HTML title tag of the page
shotPageTitle = Captura de ecrã: { $originalTitle }
shotPageAlertErrorUpdatingExpirationTime = Erro ao guardar a expiração
shotPageAlertErrorDeletingShot = Erro ao apagar a captura
shotPageAlertErrorUpdatingTitle = Erro ao guardar o título
shotPageConfirmDelete = Tem a certeza de que deseja apagar esta captura permanentemente?
shotPageShareButton =
    .title = Partilhar
shotPageCopyButton =
    .title = Copiar imagem para a área de transferência
shotPageCopyActionLabel = Copiar
shotPageCopied = Copiada
shotPageShareFacebook =
    .title = Partilhar no Facebook
shotPageShareTwitter =
    .title = Partilhar no Twitter
shotPageSharePinterest =
    .title = Partilhar no Pinterest
shotPageShareEmail =
    .title = Partilhar ligação via email
shotPageShareLink = Obtenha uma ligação partilhável para esta captura:
shotPagePrivacyMessage = Qualquer pessoa com a ligação pode ver esta captura.
shotPageCopyImageText =
    .label = Copiar texto da imagem
shotPageConfirmDeletion = Tem certeza de que deseja apagar esta captura permanentemente?
# Note: <timediff></timediff> is a placeholder for a future relative time clause like 'in 3 days' or 'tomorrow'
shotPageTimeExpirationMessage = Se não fizer nada, esta captura irá ser apagada permanentemente <timediff></timediff>.
# Note: { $date } is a placeholder for a localized future date as returned by Date.toLocaleString.
# For example, in en-US, { $date } could be "7/12/2017, 1:52:50 PM".
shotPageRestoreButton = restaurar até { $date }
shotPageExpiredMessage = Esta captura expirou.
# Note: This phrase is followed by an empty line, then the URL of the source page
shotPageExpiredMessageDetails = Aqui está a página de onde foi criada originalmente:
shotPageDeleteButton =
    .title = Apagar esta captura
shotPageDownloadShot =
    .title = Transferir
shotPageEditButton =
    .title = Editar esta imagem
shotPagefavoriteButton =
    .title = Adicionar esta captura aos favoritos
shotPageBackToHomeButton =
    .title = Página inicial
shotPageAllShotsButton =
    .title = Todas as capturas
shotPageScreenshotsDescriptionServerless = Capturas de ecrã simples. Capture e transfira capturas de ecrã sem sair do Firefox.
shotPageDMCAMessage = Esta captura já não está disponível devido a uma reivindicação de propriedade intelectual de terceiros.
# Note: { $dmca } is a placeholder for a link to send email (a 'mailto' link)
shotPageDMCAContact = Por favor envie um email para { $dmca } para solicitar mais informação.
# Note: do not translate 'Firefox Screenshots' when translating this string
shotPageDMCAWarning = Se as suas capturas estão sujeitas a múltiplas reivindicações, poderemos revogar o seu acesso ao Firefox Screenshots.
# Note: { $url } is a placeholder for a shot page URL
shotPageDMCAIncludeLink = Por favor inclua o URL desta captura no seu email: { $url }
shotPageKeepFor = Por quanto tempo deve esta captura ser retida?
# Note: shotPageSelectTime is a placeholder label for the time selection dropdown.
shotPageSelectTime = Selecionar tempo
# The ∞ is used to indicate that the shot won't expire. It is also used in
# shotIndexNoExpirationSymbol. Try to use the same symbol in both strings, or
# if no such symbol is available for a language/culture, simply leave it out.
shotPageKeepIndefinitelyWithSymbol = Indefinidamente ∞
shotPageKeepTenMinutes = 10 minutos
shotPageKeepOneHour = 1 hora
shotPageKeepOneDay = 1 dia
shotPageKeepOneWeek = 1 semana
shotPageKeepTwoWeeks = 2 semanas
shotPageKeepOneMonth = 1 mês
shotPageSaveExpiration = guardar
shotPageCancelExpiration = cancelar
shotPageDoesNotExpire = não expira
# Note: <timediff></timediff> is a placeholder for a future relative time clause, like "in 1 week" or "tomorrow"
shotPageTimeExpiresIn = expira <timediff></timediff>
# Note: <timediff></timediff> is a placeholder for a past relative time clause, like "1 week ago" or "yesterday"
shotPageTimeExpired = expirou <timediff></timediff>
timeDiffJustNow = agora mesmo
timeDiffMinutesAgo =
    { $number ->
        [one] 1 minuto atrás
       *[other] { $number } minutos atrás
    }
timeDiffHoursAgo =
    { $number ->
        [one] 1 hora atrás
       *[other] { $number } horas atrás
    }
timeDiffDaysAgo =
    { $number ->
        [one] ontem
       *[other] { $number } dias atrás
    }
timeDiffFutureSeconds = em alguns segundos
timeDiffFutureMinutes =
    { $number ->
        [one] num minuto
       *[other] em { $number } minutos
    }
timeDiffFutureHours =
    { $number ->
        [one] numa hora
       *[other] em { $number } horas
    }
timeDiffFutureDays =
    { $number ->
        [one] amanhã
       *[other] em { $number } dias
    }
errorThirdPartyCookiesEnabled = Se tirou esta captura e não consegue apagá-la, poderá ter de ativar temporariamente os cookies de terceiros a partir das preferências do seu navegador.

## Shot Page New Feature Promotion Dialog.

# Note: If possible, choose a short translation to better fit into the card.
promoTitle = Tome nota!
promoMessage = As ferramentas de edição atualizadas permitem-lhe recortar, destacar, e até adicionar texto à sua captura.
promoLink = Experimente-as
promoCloseButton =
    .title = Fechar notificação

## Annotations

annotationPenButton =
    .title = Caneta
annotationHighlighterButton =
    .title = Marcador
annotationUndoButton =
    .title = Desfazer
annotationRedoButton =
    .title = Refazer
annotationTextButton =
    .title = Adicionar texto
# Note: This button reverts all the changes on the image since the start of the editing session.
annotationClearButton =
    .title = Limpar
annotationCropButton =
    .title = Recortar
annotationSaveEditButton = Guardar
    .title = Guardar edição
annotationCancelEditButton = Cancelar
    .title = Cancelar edição
annotationCropConfirmButton = Confirmar
    .title = Confirmar seleção
annotationCropCancelButton = Cancelar
    .title = Cancelar seleção
annotationColorWhite =
    .title = Branco
annotationColorBlack =
    .title = Preto
annotationColorRed =
    .title = Vermelho
annotationColorGreen =
    .title = Verde
annotationColorBlue =
    .title = Azul
annotationColorYellow =
    .title = Amarelo
annotationColorPurple =
    .title = Roxo
annotationColorSeaGreen =
    .title = Verde Mar
annotationColorGrey =
    .title = Cinzento
# Note: annotationTextSize is a title for text size selection dropdown.
annotationTextSize =
    .title = Tamanho do texto
# Values shown in text size selection dropdown
textSizeSmall = Pequeno
textSizeMedium = Médio
textSizeLarge = Grande
# Confirm and Cancel button title shown when using text tool
textToolConfirmButton = Confirmar
    .title = Confirmar
textToolCancelButton = Cancelar
    .title = Cancelar
# Default placeholder used in input field when adding text annotations
textToolInputPlaceholder =
    .placeholder = Olá

## The following are the title and message for an error displayed as a Firefox
## notification. It is triggered by an action in the shot page and the strings
## are passed from the shot page to the addon.

copyImageErrorTitle = Algo correu mal
copyImageErrorMessage = Não foi possível copiar a sua captura para a área de transferência.

## Settings Page

settingsDisconnectButton = Desligar
    .title = Desligar
settingsGuestAccountMessage = Conta de convidado
settingsSignInButton = Iniciar sessão
    .title = Iniciar sessão
SettingsPageHeader = Definições do Firefox Screenshots
settingsFirefoxAccountSubHeader = Conta Firefox
settingsClosePreferences =
    .title = Fechar preferências
settingsFxaDisconnectAlertMessage = Tem a certeza de que pretende desligar este dispositivo da sua Conta Firefox?
settingsFxaDisconnectDescription = Se terminar sessão, irá precisar de iniciar sessão novamente para recuperar o acesso às suas capturas de ecrã.
settingsFxaConnectDescription = Pode iniciar sessão para aceder às suas capturas de ecrã entre dispositivos.

## Shotindex page

# { $status } is a placeholder for an HTTP status code, like '500'.
# { $statusText } is a text description of the status code, like 'Internal server error'.
shotIndexPageErrorDeletingShot = Erro ao apagar captura: { $status } { $statusText }
# { $searchTerm } is a placeholder for text the user typed into the search box
shotIndexPageSearchResultsTitle = Minhas capturas: pesquisar por { $searchTerm }
# { $error } is a placeholder for a non-translated error message that could be shared
# with developers when debugging an error.
shotIndexPageErrorRendering = Erro ao renderizar a página: { $error }
shotIndexPageSearchPlaceholder =
    .placeholder = Pesquisar nas minhas capturas
shotIndexPageNoShotsMessage = Sem capturas guardadas.
shotIndexPageNoShotsInvitation = Vá, crie algumas.
shotIndexPageLookingForShots = À procura das suas capturas...
shotIndexPageNoSearchResultsIntro = Hmm
shotIndexPageNoSearchResults = Não conseguimos encontrar quaisquer capturas que correspondam à sua pesquisa.
shotIndexPageMyShotsButton =
    .title = Minhas capturas
shotIndexPageClearSearchButton =
    .title = Limpar pesquisa
shotIndexPageConfirmShotDelete = Apagar esta captura?
shotIndexPagePreviousPage =
    .title = Página anterior
shotIndexPageNextPage =
    .title = Página seguinte
# This is tooltip for a "blank heart" symbol used in the upper top corner of the card for a shot on the
# My Shots page to indicate that the shot does expire.
shotIndexNonFavoriteIcon =
    .title = Esta não é uma captura favorita e irá expirar
# This is the tooltip for a "heart" symbol in the upper top corner of the
# card for a shot on the My Shots page. It indicate that the shot was marked as
# a favorite by the owner.
shotIndexFavoriteIcon =
    .title = Esta é uma captura favorita e não expira.
shotIndexSyncedShot =
    .title = Captura tirada noutro dispositivo
shotIndexAlertErrorFavoriteShot = Erro ao atualizar o estado de captura favorita

## Delete Confirmation Dialog

shotDeleteConfirmationMessage = Tem a certeza de que pretende apagar esta captura?
shotDeleteCancel = Cancelar
    .title = Cancelar
shotDeleteConfirm = Apagar
    .title = Apagar

## Export page

# Note: "File" should match the name of the File Menu, and "Save Page As" should match that menu item. $folder is replaced with the name of the folder that will be created
exportInstructions = Para exportar: utilize Ficheiro > Guardar página como… e você irá encontrar as suas capturas de ecrã na pasta { $folder }

## Metrics page
## All metrics strings are optional for translation

# Note: 'Firefox Screenshots' should not be translated
metricsPageTitle = Métricas do Firefox Screenshots
metricsPageTotalsQueryTitle = Totais
# Note: Screenshots is an abbreviation for Firefox Screenshots, and should not be translated.
metricsPageTotalsQueryDescription = Uma visão geral do Screenshots
metricsPageTotalsQueryDevices = Dispositivos totais registados
metricsPageTotalsQueryActiveShots = Capturas ativas
metricsPageTotalsQueryExpiredShots = Expiradas (mas recuperáveis)
metricsPageTotalsQueryExpiredDeletedShots = Expiradas (e apagadas)
metricsPageShotsQueryTitle = Capturas por dia
metricsPageShotsQueryDescription = Número de capturas criadas a cada dia (para os últimos 30 dias)
metricsPageShotsQueryCount = Número de capturas
metricsPageShotsQueryDay = Dia
metricsPageUsersQueryTitle = Utilizadores por dia
metricsPageUsersQueryDescription = Número de utilizadores que criaram pelo menos uma captura, por dia (últimos 30 dias)
metricsPageUsersQueryCount = Número de utilizadores
metricsPageUsersQueryDay = Dia
metricsPageUserShotsQueryTitle = Número de capturas por utilizador
metricsPageUserShotsQueryDescription = O número de utilizadores que têm cerca de N capturas totais
metricsPageUserShotsQueryCount = Número de utilizadores
metricsPageUserShotsQueryShots = Número aproximado de capturas ativas (não expiradas)
metricsPageRetentionQueryTitle = Retenção por semana
metricsPageRetentionQueryDescription = Número de dias desde a primeira captura de um utilizador até à mais recente captura, agrupado pela semana inicial
metricsPageRetentionQueryUsers = Número de utilizadores
metricsPageRetentionQueryDays = Dias desde a primeira captura à mais recente do utilizador
metricsPageRetentionQueryFirstWeek = Semana em que o utilizador primeiro criou uma captura
metricsPageTotalRetentionQueryTitle = Retenção total
metricsPageTotalRetentionQueryDescription = Período de tempo em que os utilizadores têm criado capturas, agrupado por semana
metricsPageTotalRetentionQueryUsers = Número de utilizadores
metricsPageTotalRetentionQueryDays = Dias que o utilizador tem criado capturas
metricsPageVersionQueryTitle = Versão do extra
metricsPageVersionQueryDescription = A versão do extra utilizada durante o início de sessão, nos últimos 14 dias
metricsPageVersionQueryUsers = Número de utilizadores com sessão iniciada
metricsPageVersionQueryVersion = Versão do extra
metricsPageVersionQueryLastSeen = Dia
metricsPageHeader = Métricas
# Note: { $created } is a placeholder for a localized date and time, like '4/21/2017, 3:40:04 AM'
metricsPageGeneratedDateTime = Geradas em: { $created }
# Note { $time } is a placeholder for a number of milliseconds, like '100'
metricsPageDatabaseQueryTime = (tempo da base de dados: { $time }ms)
