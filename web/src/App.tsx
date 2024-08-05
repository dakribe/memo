import { Route, Router } from "@solidjs/router";
import { Home } from "./pages/home";
import { Login } from "./pages/login";
import { Register } from "./pages/register";
import { Protected } from "./pages/protected";
import { AuthProvider } from "./providers/auth";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Route path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route component={Protected}>
          <Route path="/home" component={Home} />
        </Route>
      </Router>
    </AuthProvider>
  );
}

export default App;
