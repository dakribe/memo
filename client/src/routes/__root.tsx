import { Link, Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRoute({
  component: () => (
    <>
      <div>
        <h1>Memo</h1>
        <Link to="/">Home</Link>
        <Link to="/signin">Sign In</Link>
      </div>
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
});
