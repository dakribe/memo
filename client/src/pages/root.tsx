import { Outlet } from "react-router-dom";
import { Navbar } from "../components/navbar";

export function Root() {
  return (
    <main>
      <Navbar />
      <Outlet />
    </main>
  );
}
