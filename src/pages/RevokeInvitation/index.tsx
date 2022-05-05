import React, { useCallback, useEffect, useRef, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";

import styles from "./RevokeInvitation.module.scss";

import Loader from "../../components/Loader";

import { useAPIService } from "../../contexts/APIServiceContext";
import { useLanguage } from "../../contexts/LanguageContext";
import { useProjects } from "../../contexts/ProjectsContext";
import { useSession } from "../../contexts/SessionContext";

import logoImg from "../../assets/logo.png";
import RoutesEnum from "../../routes/type-defs/RoutesEnum";

export default function RevokeInvitation(): React.ReactElement {
  const params = useParams<{ projectId: string }>();
  const history = useHistory();

  const {
    language: {
      pages: { revokeInvitation: revokeInvitationLanguage },
    },
  } = useLanguage();
  const { session } = useSession();
  const { revokeInvitationService, isReadyForAuthRequests } = useAPIService();
  const { fetchProjects } = useProjects();

  const [loading, setLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );
  const [countdown, setCountdown] = useState(3);

  const hasRunRef = useRef(false);

  const acceptInvitation = useCallback(async () => {
    if (!isReadyForAuthRequests) return;

    if (!hasRunRef.current) {
      // TODO REFACTOR
      hasRunRef.current = true;
    } else {
      return;
    }

    const response = await revokeInvitationService.revokeInvitation({
      projectId: params.projectId,
      accountEmail: session!.email,
    });

    if (response.error && response.userFriendlyMessage) {
      setErrorMessage(response.userFriendlyMessage);
    } else if (response.error) {
      setErrorMessage("Error");
    }

    fetchProjects();

    setLoading(false);
  }, [
    revokeInvitationService,
    params,
    isReadyForAuthRequests,
    fetchProjects,
    session,
  ]);

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
        {errorMessage || revokeInvitationLanguage.title}
      </h1>
      <p id={styles.subtitle}>
        {revokeInvitationLanguage.subtitle}{" "}
        <span id={styles.countdown}>{countdown}</span>
      </p>

      <Link id={styles.link} to="/">
        {revokeInvitationLanguage.goBackLink}
      </Link>
    </main>
  );
}
