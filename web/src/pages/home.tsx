import { CreateMemo } from "../components/create-memo";
import { MemoFeed } from "../components/memo-feed";

export function Home() {
  return (
    <div>
      <CreateMemo />
      <MemoFeed />
    </div>
  );
}
