import Language from "./types";

/* eslint-disable-next-line import/prefer-default-export */
export const ptBR: Language = {
  libs: {
    axios: {
      unexpectedErrorMessage: "Algo deu errado",
      sessionExpired: "Sessão expirada",
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
        description: "Visualize os dados como lista, kanban e muito mais.",
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
      views: {
        list: {
          option: "Lista",
          titleTableHeader: "Título",
          conclusionDateTableHeader: "Data de conclusão",
          newIssue: "Adicionar nova tarefa...",
          newSection: "Adicionar nova seção...",
          newIssuePlaceholder: "Título do ticket",
          newSectionPlaceholder: "Título da seção",
        },
        kanban: {
          option: "Kanban",
          newIssue: "Novo card",
          newSection: "Nova seção",
          newIssuePlaceholder: "Título do ticket",
          newSectionPlaceholder: "Título da seção",
        },
      },
    },
    acceptInvitation: {
      title: "Convite aceito!",
      subtitle: "Redirecionando em",
      goBackLink: "Voltar à página inicial agora",
    },
    revokeInvitation: {
      title: "Convite recusado!",
      subtitle: "Redirecionando em",
      goBackLink: "Voltar à página inicial agora",
    },
    profile: {
      nameInputPlaceholder: "Nome",
      oldPasswordPlaceholder: "Sua senha atual",
      newPasswordPlaceholder: "Sua nova senha",
      confirmNewPasswordPlaceholder: "Confirme sua nova senha",
      updateButtonText: "Atualizar perfil",
      logoutButtonText: "Encerrar sessão",
      successMessage: "Perfil atualizado com sucesso",
      failureMessage: "Não foi possível atualizar seu perfil",
    },
    notificationSettings: {
      title: "Configuração de notificações",
      subtitle:
        "Configure suas configurações e a forma como prefere receber suas notificações",
      preferences: {
        invitation: "Sou convidado para um projeto",
        kicked: "Sou removido de um projeto",
        roleUpdated: "Minha função em um projeto é atualizada",
        issueAssigned: "Sou atribuído a um ticket",
        projectDeleted: "Um projeto do qual faço parte é excluído",
        kickedAdmin: "Um usuário é expulso de um projeto do qual eu administro",
        roleUpdatedAdmin:
          "A função de um usuário é alterada em um projeto do qual eu administro",
      },
      updateButtonText: "Atualizar preferências",
      successMessage: "Configurações atualizadas com sucesso",
      failureMessage: "Não foi possível atualizar suas configurações",
    },
  },
  components: {
    notification: {
      invitation: {
        denyText: "Recusar",
        acceptText: "Aceitar",
        message: (projectName: string) =>
          `Você foi convidado a participar do projeto: ${projectName}`,
      },
      kicked: {
        message: (projectName: string) =>
          `Você foi removido do projeto ${projectName} e portanto não pode mais acessá-lo na plataforma.`,
      },
      kickedAdmin: {
        message: (projectName: string, emailKicked: string) =>
          `O usuário ${emailKicked} foi expulso do projeto ${projectName}.`,
      },
      roleUpdated: {
        message: (projectName: string, roleName: string) =>
          `Sua função no projeto ${projectName} foi atualizada para ${roleName}`,
      },
      roleUpdatedAdmin: {
        message: (
          projectName: string,
          roleName: string,
          emailWhoseRoleHasBeenUpdated: string
        ) =>
          `O usuário ${emailWhoseRoleHasBeenUpdated} teve sua função alterada para ${roleName} no projeto ${projectName}, do qual você gerencia.`,
      },
      projectDeleted: {
        message: (projectName: string) =>
          `O projeto ${projectName}, do qual você fazia parte, foi deletado.`,
      },
      issueAssigned: {
        message: (issueTitle: string) =>
          `O ticket ${issueTitle} foi atribuído a você`,
      },
    },
    header: {
      logoutText: "Encerrar sessão",
      myProfileText: "Meu perfil",
      noNotificationsText: "Opa. Não há notificações aqui.",
    },
    sidebar: {
      homeItemName: "Início",
      projectsItemName: "Projetos",
      settingsItemName: "Configurações",
    },
    updateProjectModal: {
      title: "Configuração do seu projeto",
      subtitle: "Atualize as informações do seu projeto",
      updateButtonText: "Atualizar",
    },
    deleteProjectModal: {
      title: "Exclusão do projeto",
      warningText: "Esta ação não pode ser desfeita",
      description: (projectName: string) =>
        `Isso excluirá permanentemente o projeto <strong>${projectName}</strong>, tickets criados dentro desse projeto, e removerá todas as associações de membros participantes.`,
      inputConfirmationText: "Digite <span>excluir</span> para confirmar:",
      inputPlaceholder: "excluir",
      cancelButtonText: "Cancelar",
      deleteButtonText: "Excluir",
    },
    manageParticipantsModal: {
      title: "Gerenciamento de membros",
      subtitle: "Gerencie as permissões dos membros do seu projeto",
      userTableHeader: "Participante",
      roleTableHeader: "Função",
      espectatorRole: "Espectador",
      memberRole: "Membro",
      adminRole: "Admin",
      ownerRole: "Dono",
      pendingText: "Pendente",
      inviteMembersButtonText: "Convidar outros usuários",
    },
    deleteParticipantConfirmationModal: {
      title: "Remover participante do projeto?",
      subtitle: (email: string) =>
        `O usuário <span>${email}</span> será removido do projeto`,
      cancelButtonText: "Cancelar",
      deleteParticipantButtonText: "Remover",
    },
    addParticipantsModal: {
      title: "Convide usuários",
      subtitle: "Convide usuários para seu projeto",
      inputPlaceholder: "E-mail do usuário",
      buttonText: "Enviar convites",
    },
  },
  validation: {
    emptyFields: "Preencha os campos vazios com suas informações",
    passwordDoesntMatchConfirmation:
      "Senha não condiz com senha de confirmação",
  },
};
