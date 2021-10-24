/* eslint-disable import/prefer-default-export */
import Language from "./types";

export const esEs: Language = {
  libs: {
    axios: {
      unexpectedErrorMessage: "Algo salió mal",
    },
  },
  pages: {
    home: {
      introduction: {
        title: "No tenga límites, sé Infinitum",
        description:
          "Expande tu horizonte en medio al cosmos. Gestiona proyectos con la mayor productividad esté donde esté.",
      },
      pitch: {
        title: ["Conozca más sobre nuestro", "trabajo"],
      },
      showcase: {
        title1: "Administre todo en un solo espacio de trabajo",
        description1:
          "Planificar, rastrear y entregar el mejor trabajo de su equipo nunca ha sido tan fácil.",
        title2: "Configurar en minutos",
        description2:
          "Comience rápidamente con cientos de plantillas visuales y personalizables, o cree las suyas propias.",
      },
      views: {
        title: [
          "Realice un seguimiento de su esfuerzo con diferentes",
          "vistas",
        ],
        description:
          "Ver datos como mapa, calendario, línea de tiempo, kanban y más.",
      },
      footer: {
        contactUs: "Contacta con nosotros",
        modal: {
          title: "Elige un idioma",
        },
      },
      signInText: "Iniciar sesión",
      signUpText: "Regístrate",
      signUpGoogleText: "Iniciar sesión con Google",
      signUpEmailText: "Iniciar sesión con Email",
      languageButtonText: "Idioma",
      signUpModal: {
        title: "Crea tu cuenta",
        buttonTitle: "Regístrate",
        alternativeTitle: ["¿Ya tienes una cuenta?", "Inicia sesión"],
        nameInputPlaceholder: "Nombre",
        emailInputPlaceholder: "Email",
        passwordInputPlaceholder: "Contraseña",
        passwordConfirmationInputPlaceholder: "Confirmación de contraseña",
      },
      signInModal: {
        title: "Inicia sesión con tu cuenta",
        buttonTitle: "Iniciar sesión",
        alternativeTitle: ["¿No tienes una cuenta?", "Iniciar sesión"],
        emailInputPlaceholder: "Email",
        passwordInputPlaceholder: "Contraseña",
      },
      accountCreatedSuccessfully: "Cuenta creada con éxito",
    },
    dashboard: {
      headerTitle: "Página de inicio",
      card1: {
        title: "Tickets completados",
        option1: "Semana",
        option2: "Mes",
        option3: "Año",
      },
      card2: {
        title: "Mis tickets",
        subtitle: "Todos los tickets asignados a usted",
        getTotalTicketsFormattedMessage: (total: number) =>
          `de ${total} tickets`,
        getTicketsLeftFormattedMessage: (ticketsLeft: number) =>
          `Quedan ${ticketsLeft}`,
      },
      card3: {
        title: "Mis tickets para hoy",
        subtitle: "Todos los tickets asignados a usted que expiran hoy",
        moreInfo: "Ver todos los tickets",
      },
      card4: {
        title: "Mis tickets caducados",
        subtitle: "Todos los tickets asignados a usted que ya han caducado",
        wordTickets: "tickets",
      },
    },
    projects: {
      headerTitle: "Proyectos",
      filter: {
        allProjects: "Todos los proyectos",
      },
      buttonText: "Nuevo proyecto",
      table: {
        projectNameTitle: "Nombre del proyecto",
        progressTitle: "Progreso",
        statusTitle: "Status",
        ownershipTitle: "Dueño",
        startDateTitle: "Fecha de inicio",
        endDateTitle: "Fecha de finalización",
      },
    },
  },
  components: {
    sidebar: {
      homeItemName: "Inicio",
      projectsItemName: "Proyectos",
      settingsItemName: "Configuración",
    },
  },
  validation: {
    emptyFields: "Complete los campos vacíos con su información",
    passwordDoesntMatchConfirmation:
      "La contraseña no coincide con la contraseña de confirmación",
  },
};
