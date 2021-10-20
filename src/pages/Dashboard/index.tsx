import React from "react";
import { FiClipboard, FiAlignLeft } from "react-icons/fi";
import Header from "../../components/Header";
import { useLanguage } from "../../contexts/LanguageContext";
import { useSidebar } from "../../contexts/SidebarContext";

import Chart from "./components/Chart";

import styles from "./Dashboard.module.css";

export default function Dashboard(): React.ReactElement {
  const { language } = useLanguage();

  const { isSidebarOpen, setIsSidebarOpen } = useSidebar();

  return (
    <>
      <Header
        title={language.dashboard.headerTitle}
        openSidebar={() => setIsSidebarOpen(true)}
        closeSidebar={() => setIsSidebarOpen(false)}
        isSidebarOpen={isSidebarOpen}
      />

      <main id={styles.main}>
        <div id={styles.cardsContainer}>
          {/* CARD 1 */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h1 className={styles.cardTitle}>
                {language.dashboard.card1.title}
              </h1>
              <div id={styles.chartOptions}>
                <button
                  className={`
                ${styles.chartOption}
                ${styles.chartActiveOption}
                `}
                  type="button"
                >
                  {language.dashboard.card1.option1}
                </button>
                <button className={styles.chartOption} type="button">
                  {language.dashboard.card1.option2}
                </button>
                <button className={styles.chartOption} type="button">
                  {language.dashboard.card1.option3}
                </button>
              </div>
            </div>
            <div className={styles.cardBody}>
              <div id={styles.chartWrapper}>
                <Chart />
              </div>
            </div>
          </div>

          {/* CARD 2 */}
          <div id={styles.allTicketsCard} className={styles.card}>
            <div className={styles.cardHeader}>
              <h1 className={styles.cardTitle}>
                {language.dashboard.card2.title}
              </h1>
              <h2 className={styles.cardSubtitle}>
                {language.dashboard.card2.subtitle}
              </h2>
            </div>
            <div className={styles.cardBody}>
              <div className={styles.alignSpaceBetween}>
                <p>
                  <span id={styles.percentSpan}>50%</span>{" "}
                  {language.dashboard.card2.getTotalTicketsFormattedMessage(20)}
                </p>
                <p>
                  {language.dashboard.card2.getTicketsLeftFormattedMessage(10)}
                </p>
              </div>
              <div className={styles.cardBar} />
            </div>
          </div>

          {/* CARD 3 */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <div className={styles.alignSpaceBetween}>
                <h1 className={styles.cardTitle}>
                  {language.dashboard.card3.title}
                </h1>
                <span className={styles.cardDateInfo}>Qui, Out 20</span>
              </div>
              <h2 className={styles.cardSubtitle}>
                {language.dashboard.card3.subtitle}
              </h2>
            </div>
            <div className={styles.cardBody}>
              <div className={styles.cardTicketsPercentageWrapper}>
                <div className={styles.cardTicket}>
                  <div className={styles.cardTicketInfo}>
                    <FiAlignLeft color="var(--dark)" size={14} />
                    <strong>Criar landing page</strong>
                  </div>
                  <div className={styles.cardTicketInfo}>
                    <FiClipboard color="#888888" size={14} />
                    <span>Projeto TCC</span>
                  </div>
                </div>
                <div className={styles.cardTicket}>
                  <div className={styles.cardTicketInfo}>
                    <FiAlignLeft color="var(--dark)" size={14} />
                    <strong>Criar landing page</strong>
                  </div>
                  <div className={styles.cardTicketInfo}>
                    <FiClipboard color="#888888" size={14} />
                    <span>Projeto TCC</span>
                  </div>
                </div>

                <div className={styles.cardPercentualEllipsisWrapper}>
                  <div className={styles.cardTotalPercentualEllipsis} />
                  <div className={styles.cardActualPercentualEllipsis} />
                  <div className={styles.cardPercentualEllipsisBackground} />
                  <strong className={styles.cardEllipsisPercentText}>
                    50%
                  </strong>
                </div>
              </div>

              <div className={styles.cardMoreInfoContainer}>
                <button type="button" className={styles.cardMoreInfo}>
                  {language.dashboard.card3.moreInfo}
                </button>
              </div>
            </div>
          </div>

          {/* CARD 4 */}
          <div id={styles.expiredTicketsCard} className={styles.card}>
            <div className={styles.cardHeader}>
              <div className={styles.alignSpaceBetween}>
                <h1 className={styles.cardTitle}>
                  {language.dashboard.card4.title}
                </h1>
                <span className={styles.cardDateInfo}>Qui, Out 20</span>
              </div>
              <h2 className={styles.cardSubtitle}>
                {language.dashboard.card4.subtitle}
              </h2>
            </div>
            <div className={styles.cardBody}>
              <div className={styles.cardTicketsPercentageWrapper}>
                <div className={styles.cardTicket}>
                  <div className={styles.cardTicketInfo}>
                    <FiAlignLeft color="var(--dark)" size={14} />
                    <strong>Criar landing page</strong>
                  </div>
                  <div className={styles.cardTicketInfo}>
                    <FiClipboard color="#888888" size={14} />
                    <span>Projeto TCC</span>
                  </div>
                </div>
                <div className={styles.cardTicket}>
                  <div className={styles.cardTicketInfo}>
                    <FiAlignLeft color="var(--dark)" size={14} />
                    <strong>Criar landing page</strong>
                  </div>
                  <div className={styles.cardTicketInfo}>
                    <FiClipboard color="#888888" size={14} />
                    <span>Projeto TCC</span>
                  </div>
                </div>

                <div className={styles.cardPercentualEllipsisWrapper}>
                  <div className={styles.cardTotalPercentualEllipsis} />
                  <div className={styles.cardPercentualEllipsisBackground} />
                  <strong className={styles.cardEllipsisPercentText}>
                    4 <span>{language.dashboard.card4.wordTickets}</span>
                  </strong>
                </div>
              </div>

              <div className={styles.cardMoreInfoContainer}>
                <button type="button" className={styles.cardMoreInfo}>
                  {language.dashboard.card3.moreInfo}
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
