/* eslint-disable import/prefer-default-export */
import Language from "./types";

export const ptBR: Language = {
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
      title1: "Gerencie tudo em um espaço de trabalho",
      description1:
        "Planejar, acompanhar e entregar o melhor trabalho de sua equipe nunca foi tão fácil.",
      title2: "Configuração em minutos",
      description2:
        "Comece rapidamente com centenas de modelos visuais e personalizáveis - ou crie o seu próprio.",
    },
    views: {
      title: ["Acompanhe seu esforço com diferentes", "visualizações"],
      description:
        "Visualize os dados como mapa, calendário, linha do tempo, kanban e muito mais.",
    },
    footer: {
      contactUs: "Contate-nos",
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
  },
  dashboard: {
    headerTitle: "Página inicial",
    card1: {
      title: "Tickets concluídos",
      option1: "Semana",
      option2: "Mês",
      option3: "Ano",
    },
    card2: {
      title: "Meus tickets",
      subtitle: "Todos os tickets atribuídos a você",
      getTotalTicketsFormattedMessage: (total: number) => `de ${total} tickets`,
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
  sidebar: {
    homeItemName: "Início",
    projectsItemName: "Projetos",
  },
};
