import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/signin")({
  component: SignIn,
});

function SignIn() {
  return (
    <div>
      <h1>Sign In</h1>
    </div>
  );
}
