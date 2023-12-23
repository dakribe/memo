import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Root } from "./pages/root";
import { SignIn } from "./pages/signIn";
import { SignUp } from "./pages/signUp";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/signin",
        element: <SignIn />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
