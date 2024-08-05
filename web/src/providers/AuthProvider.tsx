import {
  Accessor,
  createContext,
  createSignal,
  JSX,
  useContext,
} from "solid-js";

type AuthContextType = {
  isAuthenticated: Accessor<boolean>;
  login: (username: string, password: string) => Promise<boolean>;
};

const AuthContext = createContext<AuthContextType>();

export function AuthProvider(props: { children: JSX.Element }) {
  const [isAuthenticated, setIsAuthenticated] = createSignal(false);

  async function login(username: string, password: string) {
    const res = await fetch("http://localhost:8080/api/auth/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (res.ok) {
      return true;
    }
    return false;
  }

  async function getUser() {
    try {
      const res = await fetch("http://localhost:8080/api/auth/me", {
        credentials: "include",
      });

      if (res.ok) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } catch (e) {
      setIsAuthenticated(false);
    }
    return null;
  }

  const value: AuthContextType = {
    isAuthenticated,
    login,
  };
  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used with a AuthProvider");
  }
}
