import {
  createForm,
  maxLength,
  minLength,
  SubmitHandler,
} from "@modular-forms/solid";
import { Match, Switch } from "solid-js";
import * as v from "valibot";

const CreateMemoSchema = v.object({
  content: v.pipe(v.string(), v.minLength(1), v.maxLength(255)),
});

const createMemo = async (content: string) => {
  const res = await fetch("http://localhost:8080/api/memos/", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ content }),
  });

  return await res.json();
};

type CreateMemoForm = v.InferInput<typeof CreateMemoSchema>;

export function CreateMemo() {
  const [createMemoForm, { Field, Form }] = createForm<CreateMemoForm>();

  const handleSumbmit: SubmitHandler<CreateMemoForm> = (values) => {
    createMemo(values.content);
  };
  return (
    <Form onSubmit={handleSumbmit}>
      <div class="flex flex-col">
        <Field
          name="content"
          validate={[
            minLength(1, "Your memo must have at least 1 character."),
            maxLength(255, "Your memo must be with 255 characters."),
          ]}
        >
          {(field, props) => (
            <>
              <input
                class="bg-slate-800 pb-12"
                {...props}
                type="text"
                required
                placeholder="What's on your mind?"
              />
              {field.error && <div>{field.error}</div>}
            </>
          )}
        </Field>
        <Switch
          fallback={
            <button class="rounded-xl py-2 px-4 bg-blue-500">Post</button>
          }
        >
          <Match when={createMemoForm.dirty}>
            <button class="rounded-xl py-2 px-4 bg-blue-800">Post</button>
          </Match>
        </Switch>
      </div>
    </Form>
  );
}
