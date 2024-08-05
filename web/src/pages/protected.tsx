import { JSX, Show } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { useAuth } from "../providers/auth";

interface ProtectedRouteProps {
  children?: JSX.Element;
}

export function Protected(props: ProtectedRouteProps) {
  const auth = useAuth();
  const nav = useNavigate();

  const checkAuth = async () => {
    if (!auth.isAuthenticated()) {
      const user = await auth.getUser();
      if (!user) {
        nav("/login", { replace: true });
      }
    }
  };

  checkAuth();

  return (
    <Show
      when={auth.isAuthenticated}
      fallback={<div>Checking authentication</div>}
    >
      {props.children}
    </Show>
  );
}
