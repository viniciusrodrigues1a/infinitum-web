import React from "react";
import { useSession } from "../../contexts/SessionContext";

export default function Dashboard(): React.ReactElement {
  const session = useSession();

  return (
    <>
      <h1>hello, world</h1>;
      <button type="button" onClick={session.clearSession}>
        Limpar sessao
      </button>
    </>
  );
}
