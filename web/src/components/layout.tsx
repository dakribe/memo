import { useNavigate } from "@solidjs/router";
import { useAuth } from "../providers/auth";
import { ParentProps, Show } from "solid-js";
import { Sidebar } from "./sidebar";

export function Layout(props: ParentProps) {
  const { isAuthenticated, getUser } = useAuth();
  const nav = useNavigate();

  const checkAuth = async () => {
    if (!isAuthenticated()) {
      const user = await getUser();
      if (!user) {
        nav("/login", { replace: true });
      }
    }
  };

  checkAuth();

  return (
    <Show
      when={isAuthenticated}
      fallback={<div>Checking authentication...</div>}
    >
      <div class="min-h-dvh flex justify-center mx-auto max-w-5xl">
        <Sidebar />
        <div class="w-96">{props.children}</div>
        <div class="border-l">3</div>
      </div>
    </Show>
  );
}
