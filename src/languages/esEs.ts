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
        title1: "Ten el control de todo",
        description1: "Visualice todo su progreso en un solo lugar.",
        title2: "Configuración rápida",
        description2:
          "Comience rápidamente con una interfaz simple y fácil de usar.",
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
      overviewError:
        "Hubo un error al obtener tu información. Intenta volver a cargar la página.",
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
      emptyProjectsText: "Aún no tienes ningún proyecto",
      createModal: {
        title: "Creación de proyectos",
        subtitle: "El primer paso para hacer realidad tu idea",

        titleInputLabel: "Título",
        titleInputDescription:
          "Este será el nombre utilizado para referirse a su proyecto.",
        titleInputPlaceholder: "Título",

        dateInputLabel: "Fecha de inicio y finalización",
        dateInputDescription: "La vida útil de su proyecto",

        descriptionInputLabel: "Descripción",
        descriptionInputDescription:
          "Proporcione una breve descripción de su proyecto",
        descriptionInputPlaceholder: "Descripción",

        submitButtonText: "Crear",
      },
    },
    project: {
      newCardButtonText: "Nuevo ticket",
      updateIssueGroupInputText:
        "Marcar todos entradas movido para cá como concluido?",
      membersButtonText: "Miembros",
      projectNotFoundText: "Este proyecto no fue encontrado",
      projectNotFoundButtonText: "Volver a mi lista de proyectos",
      createIssueModal: {
        title: "Creación de tickets",
        subtitle: "Complete la información necesaria para crear un ticket",

        titleInputLabel: "Título",
        titleInputDescription:
          "Este será el nombre utilizado para referirse a su proyecto.",
        titleInputPlaceholder: "Título",

        expiringDateInputLabel: "Fecha de conclusión",
        expiringDateInputDescription: "La fecha límite para este ticket",

        sectionInputLabel: "Sección",
        sectionInputDescription:
          "¿A qué sección de su proyecto formará parte este ticket?",
        sectionInputPlaceholder: "Selecione uma seção",

        descriptionInputLabel: "Descripción",
        descriptionInputDescription:
          "Proporcione una breve descripción de su proyecto",
        descriptionInputPlaceholder: "Descripción",

        submitButtonText: "Crear",
      },
      issueModal: {
        title: "Información de ticket", // TODO
        subtitle: "Verificar y actualizar la información sobre este ticket",
        cancelButtonText: "Borrar",
        updateButtonText: "Actualizar",
        assignedInputLabel: "Asignado al participante",
        assignedInputPlaceholder: "Asignado a",
      },
      views: {
        list: {
          option: "Lista",
          titleTableHeader: "Título",
          conclusionDateTableHeader: "Fecha final",
          newIssue: "Agregar nuevo ticket...",
          newSection: "Agregar nueva sección...",
          newIssuePlaceholder: "Titulo del ticket",
          newSectionPlaceholder: "Título de la sección",
        },
        kanban: {
          option: "Kanban",
          newIssue: "Nueva tarjeta",
          newSection: "Nueva sección",
          newIssuePlaceholder: "Titulo del ticket",
          newSectionPlaceholder: "Título de la sección",
        },
      },
    },
    acceptInvitation: {
      title: "Invitación aceptada!",
      subtitle: "Redirigiendo en",
      goBackLink: "Regrese al inicio ahora",
    },
  },
  components: {
    sidebar: {
      homeItemName: "Inicio",
      projectsItemName: "Proyectos",
      settingsItemName: "Configuración",
    },
    updateProjectModal: {
      title: "La configuración de tu proyecto",
      subtitle: "Actualiza la información de tu proyecto",
      updateButtonText: "Actualizar",
    },
    deleteProjectModal: {
      title: "Eliminación de proyecto",
      warningText: "Esta acción no se puede deshacer",
      description: (projectName: string) =>
        `Esto eliminará permanentemente el proyecto <strong>${projectName}</strong>, los tickets creados dentro de ese proyecto y eliminará todas las membresías de los miembros participantes.`,
      inputConfirmationText: "Escribe <span>eliminar</span> para confirmar:",
      inputPlaceholder: "eliminar",
      cancelButtonText: "Cancelar",
      deleteButtonText: "Eliminar",
    },
    manageParticipantsModal: {
      title: "Gestión de miembros",
      subtitle: "Administra los permisos de los miembros de tu proyecto",
      userTableHeader: "Participante",
      roleTableHeader: "Función",
      espectatorRole: "Espectador",
      memberRole: "Miembro",
      adminRole: "Admin",
      ownerRole: "Dueño",
      inviteMembersButtonText: "Invitar a otros usuarios",
    },
    deleteParticipantConfirmationModal: {
      title: "¿Quitar participante del proyecto?",
      subtitle: (email: string) =>
        `El usuario <span>${email}</span> será eliminado del proyecto`,
      cancelButtonText: "Cancelar",
      deleteParticipantButtonText: "Eliminar",
    },
    addParticipantsModal: {
      title: "Invitar usuarios",
      subtitle: "Invita a usuarios a tu proyecto",
      inputPlaceholder: "Email del usuario",
      buttonText: "Enviar invitaciones",
    },
  },
  validation: {
    emptyFields: "Complete los campos vacíos con su información",
    passwordDoesntMatchConfirmation:
      "La contraseña no coincide con la contraseña de confirmación",
  },
};
