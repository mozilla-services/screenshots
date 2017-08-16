// Localization for Server-side strings of Firefox Screenshots
// 
// Please don't localize Firefox, Firefox Screenshots, or Screenshots



// Global phrases shared across pages, prefixed with 'g'
[[ global ]]

gMyShots = Minhas capturas
gHomeLink = Início
gNoShots
    .alt = Sem capturas encontradas
gScreenshotsDescription = Capturas de ecrã feitas simplesmente. Tire, guarde, e partilhe capturas de ecrã sem sair do Firefox.


[[ Footer ]]

// Note: link text for a link to mozilla.org
footerLinkMozilla = Mozilla
footerLinkTerms = Termos
footerLinkPrivacy = Aviso de privacidade
footerLinkDMCA = Reportar violação de PI
footerLinkDiscourse = Dar feedback
footerLinkRemoveAllData = Remover todos os dados


[[ Creating page ]]

// Note: { $title } is a placeholder for the title of the web page
// captured in the screenshot. The default, for pages without titles, is
// creatingPageTitleDefault.
creatingPageTitle = A criar { $title }
creatingPageTitleDefault = página
creatingPageWaitMessage = A guardar a sua captura...


[[ Home page ]]

homePageDescription
    .content = Capturas de ecrã intuitivas embutidas no navegador. Capture, guarde e partilhe capturas de ecrã enquanto navega a Web utilizando o Firefox.
homePageButtonMyShots = Ir para as minhas capturas
homePageTeaser = Brevemente...
homePageDownloadFirefoxTitle = Firefox
homePageDownloadFirefoxSubTitle = Descarga gratuita
homePageGetStarted = Começar
// Note: do not translate 'Firefox Screenshots' when translating this string
homePageHowScreenshotsWorks = Como é que o Firefox Screenshots funciona
homePageGetStartedTitle = Começar
// Note: Screenshots is an abbreviation for Firefox Screenshots, and should not be translated.
homePageGetStartedDescription = Encontre o novo ícone do Screenshots na sua barra de ferramentas. Selecione-o, e o menu do Screenshots irá aparecer no topo da janela do seu navegador.
homePageCaptureRegion = Capturar uma região
// Note: Screenshots is an abbreviation for Firefox Screenshots, and should not be translated.
homePageCaptureRegionDescription = Clique e arraste para selecionar a área que deseja capturar. Ou apenas paire e clique — O Screenshots irá selecionar a área por si. Gosta do que está a ver? Selecione Guardar para aceder à sua captura de ecrã online ou o botão de seta para baixo para descarregá-la para o seu computador.
homePageCapturePage = Capturar uma página
homePageCapturePageDescription = Utilize os botões no canto superior direito para capturar páginas inteiras. O botão Guardar visível irá capturar a área que pode ver sem deslocar, e Guardar página inteira irá capturar tudo na página.
homePageSaveShare = Guardar e partilhar
// Note: Screenshots is an abbreviation for Firefox Screenshots, and should not be translated.
homePageSaveShareDescription = Ao tirar uma captura, o Firefox posta a sua captura de ecrã na sua biblioteca online do Screenshots e copia a ligação para a sua área de transferência. Nós armazenamos automaticamente a sua captura de ecrã por duas semanas, mas pode apagar as suas capturas a qualquer altura ou alterar a data de expiração para as manter na sua biblioteca por mais tempo.
homePageLegalLink = Legal
homePagePrivacyLink = Privacidade
homePageTermsLink = Termos
homePageCookiesLink = Cookies


[[ Leave Screenshots page ]]

leavePageRemoveAllData = Remover todos os dados
// Note: do not translate 'Firefox Screenshots' when translating this string
leavePageErrorAddonRequired = Precisa de ter o Firefox Screenshots instalado para apagar a sua conta
leavePageErrorGeneric = Ocorreu um erro
// Note: do not translate 'Firefox Screenshots' when translating this string
leavePageWarning = Isto irá apagar permanentemente todos os seus dados do Firefox Screenshots.
leavePageButtonProceed = Proceder
leavePageButtonCancel = Cancelar
leavePageDeleted = Todas as suas capturas de ecrã foram apagadas!


[[ Not Found page ]]

notFoundPageTitle = Página não encontrada
notFoundPageIntro = Oops.
notFoundPageDescription = Página não encontrada.


[[ Shot page ]]

// This is the HTML title tag of the page
shotPageTitle = Captura de ecrã: { $originalTitle }
shotPageAlertErrorUpdatingExpirationTime = Erro ao guardar a expiração
shotPageAlertErrorDeletingShot = Erro ao apagar a captura
shotPageAlertErrorUpdatingTitle = Erro ao guardar o título
shotPageConfirmDelete = Tem a certeza de que deseja apagar esta captura permanentemente?
shotPageShareButton
    .title = Partilhar
shotPageCopy = Copiar
shotPageCopied = Copiado
shotPageShareFacebook
    .title = Partilhar no Facebook
shotPageShareTwitter
    .title = Partilhar no Twitter
shotPageSharePinterest
    .title = Partilhar no Pinterest
shotPageShareEmail
    .title = Partilhar ligação via email
shotPageShareLink = Obtenha uma ligação partilhável para esta captura:
shotPagePrivacyMessage = Qualquer pessoa com a ligação pode ver esta captura.
shotPageCopyImageText
    .label = Copiar texto da imagem
shotPageConfirmDeletion = Tem certeza de que deseja apagar esta captura permanentemente?
// Note: { $timediff } is a placeholder for a future relative time clause like 'in 3 days' or 'tomorrow'
shotPageExpirationMessage = Se não fizer nada, esta captura irá ser apagada permanentemente { $timediff }.
// Note: { $date } is a placeholder for a localized future date as returned by Date.toLocaleString.
// For example, in en-US, { $date } could be "7/12/2017, 1:52:50 PM".
shotPageRestoreButton = restaurar até { $date }
shotPageExpiredMessage = Esta captura expirou.
// Note: This phrase is followed by an empty line, then the URL of the source page
shotPageExpiredMessageDetails = Aqui está a página de onde foi criada originalmente:
shotPageDeleteButton
    .title = Apagar esta captura
shotPageAbuseButton
    .title = Reportar esta captura por abuso, spam, ou outros problemas
shotPageDownloadShot
    .title = Descarregar
shotPageDownload = Descarregar
shotPageScreenshotsDescription = Capturas de ecrã feitas simplesmente. Tire, guarde, e partilhe capturas de ecrã sem sair do Firefox.
shotPageUpsellFirefox = Obter o Firefox agora
shotPageDMCAMessage = Esta captura já não está disponível devido a uma reivindicação de propriedade intelectual de terceiros.
// Note: { $dmca } is a placeholder for a link to send email (a 'mailto' link)
shotPageDMCAContact = Por favor envie um email para { $dmca } para solicitar mais informação.
// Note: do not translate 'Firefox Screenshots' when translating this string
shotPageDMCAWarning = Se as suas capturas estão sujeitas a múltiplas reivindicações, poderemos revogar o seu acesso ao Firefox Screenshots.
// Note: { $url } is a placeholder for a shot page URL
shotPageDMCAIncludeLink = Por favor inclua o URL desta captura no seu email: { $url }
shotPageKeepFor = Por quanto tempo deve esta captura ser retida?
// Note: shotPageSelectTime is a placeholder label for the time selection dropdown.
shotPageSelectTime = Selecione o tempo
shotPageKeepIndefinitely = Indefinidamente
shotPageKeepTenMinutes = 10 minutos
shotPageKeepOneHour = 1 hora
shotPageKeepOneDay = 1 dia
shotPageKeepOneWeek = 1 semana
shotPageKeepTwoWeeks = 2 semanas
shotPageKeepOneMonth = 1 mês
shotPageSaveExpiration = guardar
shotPageCancelExpiration = cancelar
shotPageDoesNotExpire = não expira
// Note: { $timediff } is a placeholder for a future relative time clause, like "in 1 week" or "tomorrow"
shotPageExpiresIn = expira { $timediff }
// Note: { $timediff } is a placeholder for a past relative time clause, like "1 week ago" or "yesterday"
shotPageExpired = expirou { $timediff }
timeDiffJustNow = agora mesmo
timeDiffMinutesAgo = { $num ->
        [one] 1 minuto atrás
       *[other] { $number } minutos atrás
    }
timeDiffHoursAgo = { $num ->
        [one] 1 hora atrás
       *[other] { $number } horas atrás
    }
timeDiffDaysAgo = { $num ->
        [one] ontem
       *[other] { $number } dias atrás
    }
timeDiffFutureSeconds = em alguns segundos
timeDiffFutureMinutes = { $num ->
        [one] num minuto
       *[other] em { $number } minutos
    }
timeDiffFutureHours = { $num ->
        [one] numa hora
       *[other] em { $number } horas
    }
timeDiffFutureDays = { $num ->
        [one] amanhã
       *[other] em { $number } dias
    }


[[ Shotindex page ]]

// { $status } is a placeholder for an HTTP status code, like '500'.
// { $statusText } is a text description of the status code, like 'Internal server error'.
shotIndexPageErrorDeletingShot = Erro ao apagar captura: { $status } { $statusText }
// { $searchTerm } is a placeholder for text the user typed into the search box
shotIndexPageSearchResultsTitle = Minhas capturas: pesquisar por { $searchTerm }
// { $error } is a placeholder for a non-translated error message that could be shared
// with developers when debugging an error.
shotIndexPageErrorRendering = Erro ao renderizar a página: { $error }
shotIndexPageSearchPlaceholder
    .placeholder = Pesquisar nas minhas capturas
shotIndexPageSearchButton
    .title = Pesquisar
shotIndexPageNoShotsMessage = Sem capturas guardadas.
shotIndexPageNoShotsInvitation = Vá, crie algumas.
shotIndexPageLookingForShots = À procura das suas capturas...
shotIndexPageNoSearchResultsIntro = Hmm
shotIndexPageNoSearchResults = Não conseguimos encontrar quaisquer capturas que correspondam à sua pesquisa.
shotIndexPageClearSearchButton
    .title = Limpar pesquisa
shotIndexPageConfirmShotDelete = Apagar esta captura?


// all metrics strings are optional for translation
[[ Metrics page ]]

// Note: 'Firefox Screenshots' should not be translated
metricsPageTitle = Métricas do Firefox Screenshots
metricsPageTotalsQueryTitle = Totais
// Note: Screenshots is an abbreviation for Firefox Screenshots, and should not be translated.
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
metricsPageTotalRetentionQueryDays = Dias que o utilizador têm criado capturas
metricsPageVersionQueryTitle = Versão do extra
metricsPageVersionQueryDescription = A versão do extra utilizada durante o início de sessão, nos últimos 14 dias
metricsPageVersionQueryUsers = Número de utilizadores com sessão iniciada
metricsPageVersionQueryVersion = Versão do extra
metricsPageVersionQueryLastSeen = Dia
metricsPageHeader = Métricas
// Note: { $created } is a placeholder for a localized date and time, like '4/21/2017, 3:40:04 AM'
metricsPageGeneratedDateTime = Geradas a: { $created }
// Note { $time } is a placeholder for a number of milliseconds, like '100'
metricsPageDatabaseQueryTime = (tempo da base de dados: { $time }ms)
