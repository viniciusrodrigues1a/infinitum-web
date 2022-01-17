/* eslint-disable import/prefer-default-export */
import Language from "./types";

export const ptBR: Language = {
  libs: {
    axios: {
      unexpectedErrorMessage: "Algo deu errado",
    },
  },
  pages: {
    home: {
      introduction: {
        title: "Não tenha limites, seja Infinitum",
        description:
          "Expanda seu horizonte em meio ao cosmos. Gerencie projetos com a maior produtividade aonde você estiver.",
      },
      pitch: {
        title: ["Confira mais sobre nosso", "trabalho"],
      },
      showcase: {
        title1: "Tenha controle de tudo",
        description1: "Visualize todo seu progresso em um só lugar.",
        title2: "Configuração rápida",
        description2:
          "Comece rapidamente com uma interface fácil e simples de usar.",
      },
      views: {
        title: ["Acompanhe seu esforço com diferentes", "visualizações"],
        description:
          "Visualize os dados como mapa, calendário, linha do tempo, kanban e muito mais.",
      },
      footer: {
        modal: {
          title: "Escolha um idioma",
        },
      },
      signInText: "Entrar",
      signUpText: "Cadastre-se",
      signUpGoogleText: "Entre com Google",
      signUpEmailText: "Entre com Email",
      languageButtonText: "Idioma",
      signUpModal: {
        title: "Crie sua conta",
        buttonTitle: "Cadastre-se",
        alternativeTitle: ["Já tem uma conta?", "Faça login"],
        nameInputPlaceholder: "Nome",
        emailInputPlaceholder: "Email",
        passwordInputPlaceholder: "Senha",
        passwordConfirmationInputPlaceholder: "Confirmação de senha",
      },
      signInModal: {
        title: "Entre com sua conta",
        buttonTitle: "Entrar",
        alternativeTitle: ["Não possui uma conta?", "Faça seu cadastro"],
        emailInputPlaceholder: "Email",
        passwordInputPlaceholder: "Senha",
      },
      accountCreatedSuccessfully: "Conta criada com sucesso",
    },
    dashboard: {
      headerTitle: "Página inicial",
      overviewError:
        "Houve um erro ao buscar suas informações. Tente recarregar a página.",
      card1: {
        title: "Tickets concluídos",
        option1: "Semana",
        option2: "Mês",
        option3: "Ano",
      },
      card2: {
        title: "Meus tickets",
        subtitle: "Todos os tickets atribuídos a você",
        getTotalTicketsFormattedMessage: (total: number) =>
          `de ${total} tickets`,
        getTicketsLeftFormattedMessage: (ticketsLeft: number) =>
          `${ticketsLeft} restantes`,
      },
      card3: {
        title: "Meus tickets para hoje",
        subtitle: "Todos os tickets atribuídos a você que vencem hoje",
        moreInfo: "Veja todos os tickets",
      },
      card4: {
        title: "Meus tickets vencidos",
        subtitle: "Todos os tickets atribuídos a você que já venceram",
        wordTickets: "tickets",
      },
    },
    projects: {
      headerTitle: "Projetos",
      filter: {
        allProjects: "Todos projetos",
      },
      buttonText: "Novo projeto",
      table: {
        projectNameTitle: "Nome do projeto",
        progressTitle: "Progresso",
        statusTitle: "Status",
        ownershipTitle: "Dono",
        startDateTitle: "Data de início",
        endDateTitle: "Data de término",
      },
      emptyProjectsText: "Você não possui nenhum projeto ainda",
      createModal: {
        title: "Criação de projeto",
        subtitle: "O primeiro passo para a realização da sua ideia",

        titleInputLabel: "Título",
        titleInputDescription:
          "Este será o nome usado para se referir ao seu projeto",
        titleInputPlaceholder: "Título",

        dateInputLabel: "Data de início e término",
        dateInputDescription: "O tempo de vida do seu projeto",

        descriptionInputLabel: "Descrição",
        descriptionInputDescription: "Dê uma breve descrição de seu projeto",
        descriptionInputPlaceholder: "Descrição",

        submitButtonText: "Criar",
      },
    },
    project: {
      newCardButtonText: "Novo card",
      viewOptionList: "Lista",
      viewOptionKanban: "Kanban",
      updateIssueGroupInputText:
        "Marcar todos tickets movido para cá como concluido?",
      membersButtonText: "Membros",
      projectNotFoundText: "Este projeto não foi encontrado",
      projectNotFoundButtonText: "Voltar à minha list de projetos",
      createIssueModal: {
        title: "Criação de ticket",
        subtitle: "Adicione as informações do seu ticket",

        titleInputLabel: "Título",
        titleInputDescription:
          "Este será o nome usado para se referir ao seu projeto",
        titleInputPlaceholder: "Título",

        expiringDateInputLabel: "Data de conclusão",
        expiringDateInputDescription: "A data de conclusão deste ticket",

        sectionInputLabel: "Seção",
        sectionInputDescription:
          "A qual seção do seu projeto seu ticket fará parte",
        sectionInputPlaceholder: "Selecione uma seção",

        descriptionInputLabel: "Descrição",
        descriptionInputDescription: "Dê uma breve descrição de seu projeto",
        descriptionInputPlaceholder: "Descrição",

        submitButtonText: "Criar",
      },
      issueModal: {
        title: "Informações do ticket",
        subtitle: "Verifique e altere informações do ticket",
        cancelButtonText: "Excluir",
        updateButtonText: "Atualizar",
        assignedInputLabel: "Participante responsável",
        assignedInputPlaceholder: "Responsável",
      },
    },
    acceptInvitation: {
      title: "Convite aceito!",
      subtitle: "Redirecionando em",
      goBackLink: "Voltar à página inicial agora",
    },
  },
  components: {
    sidebar: {
      homeItemName: "Início",
      projectsItemName: "Projetos",
      settingsItemName: "Configurações",
    },
  },
  validation: {
    emptyFields: "Preencha os campos vazios com suas informações",
    passwordDoesntMatchConfirmation:
      "Senha não condiz com senha de confirmação",
  },
};
