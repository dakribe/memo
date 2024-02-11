import { useMutation } from "@tanstack/react-query";
import { createLazyFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createLazyFileRoute("/signin")({
  component: SignIn,
});

type LoginReq = {
  email: string;
  password: string;
};

async function SignInMutation(req: LoginReq) {
  let email = req.email;
  let password = req.password;
  let reqbody = {
    email,
    password,
  };
  const res = await fetch("http://localhost:5267/login?usecookies=true", {
    method: "POST",
    credentials: "include",
    body: JSON.stringify(reqbody),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (res.ok) {
    return res.ok;
  }
  return !res.ok;
}

function SignIn() {
  const { mutateAsync } = useMutation({
    mutationFn: SignInMutation,
    onSuccess(data, variables, context) {
      console.log("Success");
    },
  });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    const data: LoginReq = {
      email,
      password,
    };
    mutateAsync(data);
  };

  return (
    <div>
      <h1>Sign In</h1>
      <form onSubmit={(e) => handleSignIn(e)}>
        <input value={email} onInput={(e) => setEmail(e.currentTarget.value)} />
        <input
          value={password}
          onInput={(e) => setPassword(e.currentTarget.value)}
        />
        <button>Sign In</button>
      </form>
    </div>
  );
}
