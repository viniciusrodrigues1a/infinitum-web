import React, { useCallback, useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";

import styles from "./AcceptInvitation.module.scss";

import Loader from "../../components/Loader";

import { useAPIService } from "../../contexts/APIServiceContext";
import { useLanguage } from "../../contexts/LanguageContext";

import logoImg from "../../assets/logo.png";
import RoutesEnum from "../../routes/type-defs/RoutesEnum";
import { useProjects } from "../../contexts/ProjectsContext";

export default function AcceptInvitation(): React.ReactElement {
  const params = useParams<{ invitationToken: string }>();
  const history = useHistory();

  const {
    language: {
      pages: { acceptInvitation: acceptInvitationLanguage },
    },
  } = useLanguage();
  const { acceptInvitationService, isReadyForAuthRequests } = useAPIService();
  const { fetchProjects } = useProjects();

  const [loading, setLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );
  const [countdown, setCountdown] = useState(3);

  const acceptInvitation = useCallback(async () => {
    if (!isReadyForAuthRequests) return;

    const response = await acceptInvitationService.acceptInvitation({
      invitationToken: params.invitationToken,
    });

    if (response.error && response.userFriendlyMessage) {
      setErrorMessage(response.userFriendlyMessage);
    } else if (response.error) {
      setErrorMessage("Error");
    }

    fetchProjects();

    setLoading(false);
  }, [acceptInvitationService, params, isReadyForAuthRequests, fetchProjects]);

  useEffect(() => {
    acceptInvitation();
  }, [acceptInvitation]);

  useEffect(() => {
    setTimeout(() => {
      setCountdown(countdown - 1);
    }, 1000);
  }, [countdown]);

  useEffect(() => {
    if (countdown <= 0) {
      history.push(RoutesEnum.DASHBOARD);
    }
  }, [countdown, history]);

  if (loading) {
    return (
      <div style={{ marginTop: "10rem" }}>
        <Loader />;
      </div>
    );
  }

  return (
    <main id={styles.container}>
      <img id={styles.logo} src={logoImg} alt="Infinitum rocket" />

      <h1 id={styles.title}>
        {errorMessage || acceptInvitationLanguage.title}
      </h1>
      <p id={styles.subtitle}>
        {acceptInvitationLanguage.subtitle}{" "}
        <span id={styles.countdown}>{countdown}</span>
      </p>

      <Link id={styles.link} to="/">
        {acceptInvitationLanguage.goBackLink}
      </Link>
    </main>
  );
}
