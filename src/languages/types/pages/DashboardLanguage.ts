export type DashboardLanguage = {
  headerTitle: string;

  card1: {
    title: string;
    option1: string;
    option2: string;
    option3: string;
  };

  card2: {
    title: string;
    subtitle: string;
    getTotalTicketsFormattedMessage: (total: number) => string;
    getTicketsLeftFormattedMessage: (ticketsLeft: number) => string;
  };

  card3: {
    title: string;
    subtitle: string;
    moreInfo: string;
  };

  card4: {
    title: string;
    subtitle: string;
    wordTickets: string;
  };
};
