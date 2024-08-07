import { createForm, SubmitHandler, valiForm } from "@modular-forms/solid";
import * as v from "valibot";
import { useAuth } from "../providers/auth";

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
  const { login } = useAuth();
  const [_, { Form, Field }] = createForm<LoginForm>({
    validate: valiForm(LoginSchema),
  });

  const handleLogin: SubmitHandler<LoginForm> = (values) => {
    login(values.email, values.password);
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
