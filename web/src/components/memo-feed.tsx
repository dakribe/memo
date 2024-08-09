import { useAuth } from "../providers/auth";
import { createResource, For, Match, Show, Switch } from "solid-js";

const getUserMemos = async (userId: string) => {
  const res = await fetch(`http://localhost:8080/api/memos/${userId}`, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return await res.json();
};

export function MemoFeed() {
  const { session } = useAuth();
  const [memos] = createResource(session()?.userId, getUserMemos);

  return (
    <div>
      <Show when={memos.loading}>
        <p>Loading..</p>
      </Show>
      <Switch>
        <Match when={memos.error}>
          <span>Error: {memos.error()}</span>
        </Match>
        <Match when={memos()}>
          <For each={memos()}>{(memo) => <div>{memo.content}</div>}</For>
        </Match>
      </Switch>
    </div>
  );
}
