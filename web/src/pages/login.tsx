import { useNavigate } from "@solidjs/router";
import { LoginForm } from "../components/login-form";
import { useAuth } from "../providers/auth";
import { createEffect } from "solid-js";

export function Login() {
  const { isAuthenticated, getUser } = useAuth();
  const nav = useNavigate();

  createEffect(async () => {
    if (isAuthenticated()) {
      const user = await getUser();
      if (user) {
        nav("/home", { replace: true });
      }
    }
  });

  return (
    <div>
      <h1>Login</h1>
      <LoginForm />
    </div>
  );
}
