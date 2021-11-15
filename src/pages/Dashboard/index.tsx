import React, { useEffect, useState } from "react";
import { FiClipboard, FiAlignLeft } from "react-icons/fi";
import Header from "../../components/Header";
import { useLanguage } from "../../contexts/LanguageContext";
import { useSidebar } from "../../contexts/SidebarContext";

import Chart from "./components/Chart";
import Title from "../../components/Title";
import Subtitle from "../../components/Subtitle";
import Loader from "../../components/Loader";

import styles from "./Dashboard.module.css";
import { useAPIService } from "../../contexts/APIServiceContext";
import { GetIssuesOverviewServiceResponse } from "../../services/interfaces";

export default function Dashboard(): React.ReactElement {
  const {
    language: {
      pages: { dashboard: dashboardLanguage },
    },
  } = useLanguage();
  const { getIssuesOverviewService } = useAPIService();

  const { isSidebarOpen, setIsSidebarOpen } = useSidebar();

  const [error, setError] = useState<boolean>(false);
  const [overview, setOverview] = useState<GetIssuesOverviewServiceResponse>();

  useEffect(() => {
    (async () => {
      const response = await getIssuesOverviewService.getIssuesOverview();

      if (response.data) {
        setOverview(response.data);
      }

      setError(response.error);
    })();
  }, [getIssuesOverviewService]);

  return (
    <>
      <Header
        title={dashboardLanguage.headerTitle}
        openSidebar={() => setIsSidebarOpen(true)}
        closeSidebar={() => setIsSidebarOpen(false)}
        isSidebarOpen={isSidebarOpen}
      />

      <main id={styles.main}>
        {error ? (
          <div id={styles.errorContainer}>
            <h1>{dashboardLanguage.overviewError}</h1>
          </div>
        ) : !overview ? (
          <div id={styles.loaderContainer}>
            <Loader />
          </div>
        ) : (
          <div id={styles.cardsContainer}>
            {/* CARD 1 */}
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <Title>{dashboardLanguage.card1.title}</Title>
                <div id={styles.chartOptions}>
                  <button
                    className={`
                      ${styles.chartOption}
                      ${styles.chartActiveOption}
                      `}
                    type="button"
                  >
                    {dashboardLanguage.card1.option1}
                  </button>
                  <button className={styles.chartOption} type="button">
                    {dashboardLanguage.card1.option2}
                  </button>
                  <button className={styles.chartOption} type="button">
                    {dashboardLanguage.card1.option3}
                  </button>
                </div>
              </div>
              <div className={styles.cardBody}>
                <div id={styles.chartWrapper}>
                  <Chart data={overview.issuesWeeklyOverview} />
                </div>
              </div>
            </div>

            {/* CARD 2 */}
            <div id={styles.allTicketsCard} className={styles.card}>
              <div className={styles.cardHeader}>
                <Title>{dashboardLanguage.card2.title}</Title>
                <Subtitle>{dashboardLanguage.card2.subtitle}</Subtitle>
              </div>
              <div className={styles.cardBody}>
                <div className={styles.alignSpaceBetween}>
                  <p>
                    <span id={styles.percentSpan}>
                      {overview.allIssues.percentageCompleted}%
                    </span>{" "}
                    {dashboardLanguage.card2.getTotalTicketsFormattedMessage(
                      overview.allIssues.total
                    )}
                  </p>
                  <p>
                    {dashboardLanguage.card2.getTicketsLeftFormattedMessage(
                      overview.allIssues.leftUncompleted
                    )}
                  </p>
                </div>
                <div className={styles.cardBarWrapper}>
                  <div className={styles.cardBarTotal} />
                  <div
                    className={styles.cardBarProgress}
                    style={{
                      width: `${overview.allIssues.percentageCompleted}%`,
                    }}
                  />
                </div>
              </div>
            </div>

            {/* CARD 3 */}
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <div className={styles.alignSpaceBetween}>
                  <Title>{dashboardLanguage.card3.title}</Title>
                  <span className={styles.cardDateInfo}>Qui, Out 20</span>
                </div>
                <Subtitle>{dashboardLanguage.card3.subtitle}</Subtitle>
              </div>
              <div className={styles.cardBody}>
                <div className={styles.cardTicketsPercentageWrapper}>
                  {overview.issuesForToday.issues.map((issue, index) => {
                    if (index > 1) return null;
                    return (
                      <div className={styles.cardTicket}>
                        <div className={styles.cardTicketInfo}>
                          <FiAlignLeft color="var(--dark)" size={14} />
                          <strong>{issue.title}</strong>
                        </div>
                        <div className={styles.cardTicketInfo}>
                          <FiClipboard color="#888888" size={14} />
                          <span>{issue.projectName}</span>
                        </div>
                      </div>
                    );
                  })}

                  <div className={styles.cardPercentualEllipsisWrapper}>
                    <div className={styles.cardTotalPercentualEllipsis} />
                    <div
                      className={styles.cardActualPercentualEllipsis}
                      style={{
                        transform: `translateY(${
                          100 - overview.issuesForToday.percentageCompleted
                        }%)`,
                      }}
                    />
                    <div className={styles.cardPercentualEllipsisBackground} />
                    <strong className={styles.cardEllipsisPercentText}>
                      {overview.issuesForToday.percentageCompleted}%
                    </strong>
                  </div>
                </div>

                <div className={styles.cardMoreInfoContainer}>
                  <button type="button" className={styles.cardMoreInfo}>
                    {dashboardLanguage.card3.moreInfo}
                  </button>
                </div>
              </div>
            </div>

            {/* CARD 4 */}
            <div id={styles.expiredTicketsCard} className={styles.card}>
              <div className={styles.cardHeader}>
                <div className={styles.alignSpaceBetween}>
                  <Title>{dashboardLanguage.card4.title}</Title>
                  <span className={styles.cardDateInfo}>Qui, Out 20</span>
                </div>
                <Subtitle>{dashboardLanguage.card4.subtitle}</Subtitle>
              </div>
              <div className={styles.cardBody}>
                <div className={styles.cardTicketsPercentageWrapper}>
                  {overview.expiredIssues.issues.map((issue, index) => {
                    if (index > 1) return null;
                    return (
                      <div className={styles.cardTicket}>
                        <div className={styles.cardTicketInfo}>
                          <FiAlignLeft color="var(--dark)" size={14} />
                          <strong>{issue.title}</strong>
                        </div>
                        <div className={styles.cardTicketInfo}>
                          <FiClipboard color="#888888" size={14} />
                          <span>{issue.projectName}</span>
                        </div>
                      </div>
                    );
                  })}

                  <div className={styles.cardPercentualEllipsisWrapper}>
                    <div className={styles.cardTotalPercentualEllipsis} />
                    <div className={styles.cardPercentualEllipsisBackground} />
                    <strong className={styles.cardEllipsisPercentText}>
                      {overview.expiredIssues.amount}{" "}
                      <span>{dashboardLanguage.card4.wordTickets}</span>
                    </strong>
                  </div>
                </div>

                <div className={styles.cardMoreInfoContainer}>
                  <button type="button" className={styles.cardMoreInfo}>
                    {dashboardLanguage.card3.moreInfo}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
