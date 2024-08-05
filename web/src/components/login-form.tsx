import { createForm, SubmitHandler, valiForm } from "@modular-forms/solid";
import * as v from "valibot";

const login = async (values: LoginForm) => {
  const res = await fetch("http://localhost:8080/api/auth/login", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  });

  if (res.ok) {
    console.log("success");
  }
};

const LoginSchema = v.object({
  email: v.pipe(
    v.string(),
    v.nonEmpty("Please enter your email"),
    v.email("Enter a vaild email address"),
  ),
  password: v.pipe(
    v.string(),
    v.nonEmpty("Please enter your password"),
    v.minLength(8, "Your password must be 8 characters or more"),
  ),
});

type LoginForm = v.InferInput<typeof LoginSchema>;

export function LoginForm() {
  const [loginForm, { Form, Field }] = createForm<LoginForm>({
    validate: valiForm(LoginSchema),
  });

  const handleLogin: SubmitHandler<LoginForm> = (values) => {
    login(values);
  };

  return (
    <Form onSubmit={handleLogin}>
      <Field name="email">
        {(field, props) => (
          <>
            <input class="text-black" {...props} type="email" required />
            {field.error && <div>{field.error}</div>}
          </>
        )}
      </Field>
      <Field name="password">
        {(field, props) => (
          <>
            <input class="text-black" {...props} type="password" required />
            {field.error && <div>{field.error}</div>}
          </>
        )}
      </Field>
      <button type="submit" class="bg-blue-500 px-4 py-2">
        Login
      </button>
    </Form>
  );
}
