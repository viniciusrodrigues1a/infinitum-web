import React from "react";
import { FiClipboard, FiAlignLeft } from "react-icons/fi";
import Header from "../../components/Header";
import { useSidebar } from "../../contexts/SidebarContext";

import Chart from "./components/Chart";

import styles from "./Dashboard.module.css";

export default function Dashboard(): React.ReactElement {
  const { isSidebarOpen, setIsSidebarOpen } = useSidebar();

  return (
    <>
      <Header
        openSidebar={() => setIsSidebarOpen(true)}
        closeSidebar={() => setIsSidebarOpen(false)}
        isSidebarOpen={isSidebarOpen}
      />

      <main id={styles.main}>
        <div id={styles.cardsContainer}>
          {/* CARD 1 */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h1 className={styles.cardTitle}>Tickets concluídos</h1>
              <div id={styles.chartOptions}>
                <button
                  className={`
                ${styles.chartOption}
                ${styles.chartActiveOption}
                `}
                  type="button"
                >
                  Semana
                </button>
                <button className={styles.chartOption} type="button">
                  Mês
                </button>
                <button className={styles.chartOption} type="button">
                  Ano
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
              <h1 className={styles.cardTitle}>Meus tickets</h1>
              <h2 className={styles.cardSubtitle}>
                Todos os tickets atribuídos a você
              </h2>
            </div>
            <div className={styles.cardBody}>
              <div className={styles.alignSpaceBetween}>
                <p>
                  <span id={styles.percentSpan}>50%</span> de 20 tickets
                </p>
                <p> 10 restantes</p>
              </div>
              <div className={styles.cardBar} />
            </div>
          </div>

          {/* CARD 3 */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <div className={styles.alignSpaceBetween}>
                <h1 className={styles.cardTitle}>Meus tickets para hoje</h1>
                <span className={styles.cardDateInfo}>Qui, Out 20</span>
              </div>
              <h2 className={styles.cardSubtitle}>
                Todos os tickets atribuídos a você que vencem hoje
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
                  Veja todos os tickets
                </button>
              </div>
            </div>
          </div>

          {/* CARD 4 */}
          <div id={styles.expiredTicketsCard} className={styles.card}>
            <div className={styles.cardHeader}>
              <div className={styles.alignSpaceBetween}>
                <h1 className={styles.cardTitle}>Meus tickets vencidos</h1>
                <span className={styles.cardDateInfo}>Qui, Out 20</span>
              </div>
              <h2 className={styles.cardSubtitle}>
                Todos os tickets atribuídos a você que já venceram
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
                    4 <span>tickets</span>
                  </strong>
                </div>
              </div>

              <div className={styles.cardMoreInfoContainer}>
                <button type="button" className={styles.cardMoreInfo}>
                  Veja todos os tickets
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
