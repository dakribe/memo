import { useAuth } from "../providers/auth";

export function Home() {
  const { session } = useAuth();
  return (
    <div>
      <h1>Home</h1>
      <p>Hello {session()?.email}</p>
    </div>
  );
}
