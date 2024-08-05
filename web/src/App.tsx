import { Route, Router } from "@solidjs/router";
import { Home } from "./pages/home";
import { Login } from "./pages/login";
import { Register } from "./pages/register";

function App() {
  return (
    <Router>
      <Route path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
    </Router>
  );
}

export default App;
