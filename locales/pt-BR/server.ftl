// Localization for Server-side strings of Firefox Screenshots
// 
// Please don't localize Firefox, Firefox Screenshots, or Screenshots



// Global phrases shared across pages, prefixed with 'g'
[[ global ]]

gMyShots = Minhas capturas
gHomeLink = Início
gNoShots
    .alt = Capturas não encontradas
gScreenshotsDescription = Capturas de tela de forma simples. Capture, salve e compartilhe telas sem sair do Firefox.


[[ Footer ]]

// Note: link text for a link to mozilla.org
footerLinkMozilla = Mozilla
footerLinkTerms = Termos
footerLinkPrivacy = Política de Privacidade
footerLinkDMCA = Reportar infrações de IP
footerLinkDiscourse = Enviar opinião
footerLinkRemoveAllData = Remover todos os dados


[[ Creating page ]]

// Note: { $title } is a placeholder for the title of the web page
// captured in the screenshot. The default, for pages without titles, is
// creatingPageTitleDefault.
creatingPageTitle = Criando { $title }
creatingPageTitleDefault = página
creatingPageWaitMessage = Salvando captura…


[[ Home page ]]

homePageDescription
    .content = Capturas de tela intuitivas diretamente no navegador. Capture, salve e compartilhe telas enquanto navega na Web utilizando Firefox.
homePageButtonMyShots = Ir para minhas capturas
homePageTeaser = Em breve…
homePageDownloadFirefoxTitle = Firefox
homePageDownloadFirefoxSubTitle = Download grátis
homePageGetStarted = Iniciar
// Note: do not translate 'Firefox Screenshots' when translating this string
homePageHowScreenshotsWorks = Como o Firefox Screenshots funciona
homePageGetStartedTitle = Iniciar
// Note: Screenshots is an abbreviation for Firefox Screenshots, and should not be translated.
homePageGetStartedDescription = Encontre o novo ícone do Screenshots na barra de ferramenta. Selecione, e o menu do Screenshots irá aparecer no topo de janela do seu navegador.
homePageCaptureRegion = Capturar uma região
// Note: Screenshots is an abbreviation for Firefox Screenshots, and should not be translated.
homePageCaptureRegionDescription = Clique e arraste para selecionar a área que deseja capturar. Ou simplesmente clique — o Screenshots irá selecionar a área automaticamente pra você. Gostou do que viu? Clique em Salvar para acessar sua captura on-line ou no botão com a seta para baixo para baixar para seu computador.
homePageCapturePage = Capturar uma página
homePageCapturePageDescription = Utilize os botões no canto superior direito para capturar telas inteiras. O botão Salvar Área Visível irá capturar a área que você vê sem rolar a página, e Salvar Página Inteira irá capturar toda a página.
homePageSaveShare = Salvar e compartilhar
// Note: Screenshots is an abbreviation for Firefox Screenshots, and should not be translated.
homePageSaveShareDescription = Quando você captura uma tela, Firefox armazena suas capturas na sua biblioteca on-line do Screenshots e copia o link para sua área de transferência. Nós armazenamos suas capturas automaticamente por duas semanas, mas você pode excluir capturas a qualquer momento ou mudar a data de validade para mantê-las em sua biblioteca por mais tempo.
homePageLegalLink = Jurídico
homePagePrivacyLink = Privacidade
homePageTermsLink = Termos
homePageCookiesLink = Cookies


[[ Leave Screenshots page ]]

leavePageRemoveAllData = Remover todos os dados
// Note: do not translate 'Firefox Screenshots' when translating this string
leavePageErrorAddonRequired = Você deve ter o Firefox Screenshots instalado para remover sua conta
leavePageErrorGeneric = Ocorreu um erro
// Note: do not translate 'Firefox Screenshots' when translating this string
leavePageWarning = Isso irá apagar permanentemente todos os seus dados do Firefox Screenshots.
leavePageButtonProceed = Prosseguir
leavePageButtonCancel = Cancelar
leavePageDeleted = Todas as suas capturas serão apagadas!


[[ Not Found page ]]

notFoundPageTitle = Página não encontrada
notFoundPageIntro = Oops.
notFoundPageDescription = Página não encontrada.


[[ Shot page ]]

// This is the HTML title tag of the page
shotPageTitle = Captura de tela: { $originalTitle }
shotPageAlertErrorUpdatingExpirationTime = Erro ao salvar tempo limite
shotPageAlertErrorDeletingShot = Erro ao excluir captura
shotPageAlertErrorUpdatingTitle = Erro ao salvar título
shotPageConfirmDelete = Tem certeza que deseja excluir essa captura permanentemente?
shotPageShareButton
    .title = Compartilhar
shotPageCopy = Copiar
shotPageCopied = Copiado
shotPageShareFacebook
    .title = Compartilhar no Facebook
shotPageShareTwitter
    .title = Compartilhar no Twitter
shotPageSharePinterest
    .title = Compartilhar no Pinterest
shotPageShareEmail
    .title = Compartilhar link via e-mail
shotPageShareLink = Obter um link para compartilhar essa captura:
shotPagePrivacyMessage = Qualquer pessoa com o link pode ver essa captura.
shotPageCopyImageText
    .label = Copiar texto da imagem
shotPageConfirmDeletion = Tem certeza que deseja excluir essa captura permanentemente?
// Note: { $timediff } is a placeholder for a future relative time clause like 'in 3 days' or 'tomorrow'
shotPageExpirationMessage = Se você não fizer nada, esta captura será excluída em { $timediff }.
// Note: { $date } is a placeholder for a localized future date as returned by Date.toLocaleString.
// For example, in en-US, { $date } could be "7/12/2017, 1:52:50 PM".
shotPageRestoreButton = restaurar até { $date }
shotPageExpiredMessage = Essa captura expirou.
// Note: This phrase is followed by an empty line, then the URL of the source page
shotPageExpiredMessageDetails = Essa página foi criada originalmente de:
shotPageDeleteButton
    .title = Excluir esta captura
shotPageAbuseButton
    .title = Reportar essa captura por abuso, spam ou outros problemas
shotPageDownloadShot
    .title = Baixar
shotPageDownload = Baixar
shotPageScreenshotsDescription = Capturas de tela de forma simples. Capture, salve e compartilhe telas sem sair do Firefox.
shotPageUpsellFirefox = Baixe o Firefox agora
shotPageDMCAMessage = Essa captura não está mais disponível devido reclamação de Direito Autoral de terceiros.
// Note: { $dmca } is a placeholder for a link to send email (a 'mailto' link)
shotPageDMCAContact = Por favor, envie um e-mail para { $dmca } para obter mais informações.
// Note: do not translate 'Firefox Screenshots' when translating this string
shotPageDMCAWarning = Se suas capturas estiverem associadas a múltiplas reclamações, poderemos revogar seu acesso ao Firefox Screenshots.
// Note: { $url } is a placeholder for a shot page URL
shotPageDMCAIncludeLink = Por favor, inclua a URL dessa captura no seu e-mail: { $url }
shotPageKeepFor = Quanto tempo essa captura deve ficar armazenada?
// Note: shotPageSelectTime is a placeholder label for the time selection dropdown.
shotPageSelectTime = Selecionar tempo
shotPageKeepIndefinitely = Indefinidamente
shotPageKeepTenMinutes = 10 minutos
shotPageKeepOneHour = 1 hora
shotPageKeepOneDay = 1 dia
shotPageKeepOneWeek = 1 semana
shotPageKeepTwoWeeks = 2 semanas
shotPageKeepOneMonth = 1 mês
shotPageSaveExpiration = salvar
shotPageCancelExpiration = cancelar
shotPageDoesNotExpire = não expira
// Note: { $timediff } is a placeholder for a future relative time clause, like "in 1 week" or "tomorrow"
shotPageExpiresIn = expira em { $timediff }
// Note: { $timediff } is a placeholder for a past relative time clause, like "1 week ago" or "yesterday"
shotPageExpired = expirou há { $timediff }
timeDiffJustNow = agora
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
timeDiffFutureSeconds = em poucos minutos
timeDiffFutureMinutes = { $num ->
        [one] em 1 minuto
       *[other] em { $number } minutos
    }
timeDiffFutureHours = { $num ->
        [one] em 1 hora
       *[other] em { $number } horas
    }
timeDiffFutureDays = { $num ->
        [one] amanhã
       *[other] em { $number } dias
    }


[[ Shotindex page ]]

// { $status } is a placeholder for an HTTP status code, like '500'.
// { $statusText } is a text description of the status code, like 'Internal server error'.
shotIndexPageErrorDeletingShot = Erro ao excluir captura: { $status } { $statusText }
// { $searchTerm } is a placeholder for text the user typed into the search box
shotIndexPageSearchResultsTitle = Minhas capturas: procurar por { $searchTerm }
// { $error } is a placeholder for a non-translated error message that could be shared
// with developers when debugging an error.
shotIndexPageErrorRendering = Erro ao renderizar página: { $error }
shotIndexPageSearchPlaceholder
    .placeholder = Procurar minhas capturas
shotIndexPageSearchButton
    .title = Pesquisar
shotIndexPageNoShotsMessage = Não há capturas salvas.
shotIndexPageNoShotsInvitation = Vai lá, crie algum.
shotIndexPageLookingForShots = Procurando por suas capturas...
shotIndexPageNoSearchResultsIntro = Hmm
shotIndexPageNoSearchResults = Não encontramos capturas que correspondam com sua busca.
shotIndexPageClearSearchButton
    .title = Limpar pesquisa
shotIndexPageConfirmShotDelete = Excluir esta captura?


// all metrics strings are optional for translation
[[ Metrics page ]]

// Note: 'Firefox Screenshots' should not be translated
metricsPageTitle = Métricas do Firefox Screenshots
metricsPageTotalsQueryTitle = Totais
// Note: Screenshots is an abbreviation for Firefox Screenshots, and should not be translated.
metricsPageTotalsQueryDescription = Visão geral do Screenshots
metricsPageTotalsQueryDevices = Total de dispositivos registrados
metricsPageTotalsQueryActiveShots = Capturas ativas
metricsPageTotalsQueryExpiredShots = Expirou (mas é recuperável)
metricsPageTotalsQueryExpiredDeletedShots = Expirou (e deletou)
metricsPageShotsQueryTitle = Capturas por dia
metricsPageShotsQueryDescription = Número de capturas criados por dia (nos últimos 30 dias)
metricsPageShotsQueryCount = Número de capturas
metricsPageShotsQueryDay = Dia
metricsPageUsersQueryTitle = Usuários por dia
metricsPageUsersQueryDescription = Número de usuário que criaram pelo menos uma captura, por dia (últimos 30 dias)
metricsPageUsersQueryCount = Número de usuários
metricsPageUsersQueryDay = Dia
metricsPageUserShotsQueryTitle = Número de capturas por usuário
metricsPageUserShotsQueryDescription = Número de usuário que tem cerca de N capturas no total
metricsPageUserShotsQueryCount = Número de usuários
metricsPageUserShotsQueryShots = Número aproximado de capturas ativas (não expiradas)
metricsPageRetentionQueryTitle = Retenção por semana
metricsPageRetentionQueryDescription = Número de dias da primeiro captura de um usuário até a mais recente, agrupadas por semana
metricsPageRetentionQueryUsers = Número de usuários
metricsPageRetentionQueryDays = Dias da primeira captura do usuário até a mais recente
metricsPageRetentionQueryFirstWeek = Semana da criação da primeira captura do usuário
metricsPageTotalRetentionQueryTitle = Retenção total
metricsPageTotalRetentionQueryDescription = Período de tempo que usuários criaram capturas, agrupadas por semana
metricsPageTotalRetentionQueryUsers = Número de usuários
metricsPageTotalRetentionQueryDays = Dias que o usuário tem criado capturas
metricsPageVersionQueryTitle = Versão da extensão
metricsPageVersionQueryDescription = A versão da extensão usado durante o login, nos últimos 14 dias
metricsPageVersionQueryUsers = Número de usuários autenticados
metricsPageVersionQueryVersion = Versão da Extensão
metricsPageVersionQueryLastSeen = Dia
metricsPageHeader = Métricas
// Note: { $created } is a placeholder for a localized date and time, like '4/21/2017, 3:40:04 AM'
metricsPageGeneratedDateTime = Gerado em: { $created }
// Note { $time } is a placeholder for a number of milliseconds, like '100'
metricsPageDatabaseQueryTime = (hora do banco: { $time }ms)
