import { createLazyFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createLazyFileRoute("/signup")({
  component: () => SignUp,
});

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  function handleSignUp() {}

  return (
    <div>
      <form>
        <input />
        <input />
        <input />
      </form>
    </div>
  );
}
