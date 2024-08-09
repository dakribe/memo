import { Route, Router } from "@solidjs/router";
import { Home } from "./pages/home";
import { Login } from "./pages/login";
import { Register } from "./pages/register";
import { AuthProvider } from "./providers/auth";
import { Layout } from "./components/layout";
import { MetaProvider } from "@solidjs/meta";

function App() {
  return (
    <MetaProvider>
      <AuthProvider>
        <Router>
          <Route path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route component={Layout}>
            <Route path="/home" component={Home} />
          </Route>
        </Router>
      </AuthProvider>
    </MetaProvider>
  );
}

export default App;
