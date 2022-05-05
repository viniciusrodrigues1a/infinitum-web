import React, { useCallback, useEffect, useState } from "react";
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
import { useDateFormatter } from "../../contexts/DateFormatterContext";
import IssueListModal from "../../components/IssueListModal";

type ChartDataConfig = {
  type: "WEEK" | "MONTH";
  data: any;
};

export default function Dashboard(): React.ReactElement {
  const {
    language: {
      pages: { dashboard: dashboardLanguage },
    },
  } = useLanguage();
  const { formatToFullDate } = useDateFormatter();
  const { getIssuesOverviewService, isReadyForAuthRequests } = useAPIService();

  const { isSidebarOpen, setIsSidebarOpen } = useSidebar();

  const [error, setError] = useState<boolean>(false);
  const [overview, setOverview] = useState<GetIssuesOverviewServiceResponse>({
    expiredIssues: { amount: 0, issues: [] },
    issuesForToday: { percentageCompleted: 0, issues: [] },
    allIssues: {
      percentageCompleted: 0,
      leftUncompleted: 0,
      total: 0,
      issues: [],
    },
    issuesWeeklyOverview: [],
    issuesMonthlyOverview: [],
  });
  const [chartDataConfig, setChartDataConfig] = useState<ChartDataConfig>({
    type: "WEEK",
    data: [],
  });
  const [expiredTicketsModalShown, setExpiredTicketsModalShown] =
    useState(false);
  const [ticketsForTodayModalShown, setTicketsForTodayModalShown] =
    useState(false);

  const fetchIssuesOverview = useCallback(async () => {
    if (!isReadyForAuthRequests) return;

    const response = await getIssuesOverviewService.getIssuesOverview();

    if (response.data) {
      setOverview(response.data);
      setChartDataConfig({
        type: "WEEK",
        data: response.data.issuesWeeklyOverview,
      });
    }

    setError(response.error);
  }, [getIssuesOverviewService, isReadyForAuthRequests]);

  useEffect(() => {
    fetchIssuesOverview();
  }, [fetchIssuesOverview]);

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
        ) : (
          <div id={styles.cardsContainer}>
            {/* CARD 1 */}
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <Title>{dashboardLanguage.card1.title}</Title>
                <div id={styles.chartOptions}>
                  <button
                    className={[
                      styles.chartOption,
                      chartDataConfig.type === "WEEK"
                        ? styles.chartActiveOption
                        : "",
                    ].join(" ")}
                    type="button"
                    onClick={() =>
                      setChartDataConfig({
                        type: "WEEK",
                        data: overview.issuesWeeklyOverview,
                      })
                    }
                  >
                    {dashboardLanguage.card1.option1}
                  </button>
                  <button
                    className={[
                      styles.chartOption,
                      chartDataConfig.type === "MONTH"
                        ? styles.chartActiveOption
                        : "",
                    ].join(" ")}
                    type="button"
                    onClick={() =>
                      setChartDataConfig({
                        type: "MONTH",
                        data: overview.issuesMonthlyOverview,
                      })
                    }
                  >
                    {dashboardLanguage.card1.option2}
                  </button>
                </div>
              </div>
              <div className={styles.cardBody}>
                <div id={styles.chartWrapper}>
                  <Chart data={chartDataConfig.data} />
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
                  <span className={styles.cardDateInfo}>
                    {formatToFullDate(new Date())}
                  </span>
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
                  <button
                    type="button"
                    className={styles.cardMoreInfo}
                    onClick={() => setTicketsForTodayModalShown(true)}
                  >
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
                  <span className={styles.cardDateInfo}>
                    {formatToFullDate(new Date())}
                  </span>
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
                  <button
                    type="button"
                    className={styles.cardMoreInfo}
                    onClick={() => setExpiredTicketsModalShown(true)}
                  >
                    {dashboardLanguage.card3.moreInfo}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <IssueListModal
        shown={ticketsForTodayModalShown}
        closeModal={() => setTicketsForTodayModalShown(false)}
        issues={overview.issuesForToday.issues}
        title={dashboardLanguage.card3.title}
        subtitle={dashboardLanguage.card3.subtitle}
      />

      <IssueListModal
        shown={expiredTicketsModalShown}
        closeModal={() => setExpiredTicketsModalShown(false)}
        issues={overview.expiredIssues.issues}
        title={dashboardLanguage.card4.title}
        subtitle={dashboardLanguage.card4.subtitle}
      />
    </>
  );
}
