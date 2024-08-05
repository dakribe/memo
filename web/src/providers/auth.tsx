import {
  Accessor,
  createContext,
  createEffect,
  createSignal,
  JSX,
  useContext,
} from "solid-js";

type Session = {
  userId: string;
  email: string;
};

type AuthContextType = {
  isAuthenticated: Accessor<boolean>;
  login: (email: string, password: string) => Promise<boolean>;
  session: Accessor<Session | null>;
  getUser: () => Promise<Session | null>;
};

const AuthContext = createContext<AuthContextType>();

export function AuthProvider(props: { children: JSX.Element }) {
  const [isAuthenticated, setIsAuthenticated] = createSignal(false);
  const [session, setSession] = createSignal<Session | null>(null);

  async function login(email: string, password: string) {
    const res = await fetch("http://localhost:8080/api/auth/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
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
        const userData: Session = await res.json();
        setSession(userData);
        setIsAuthenticated(true);
        return userData;
      } else {
        setSession(null);
        setIsAuthenticated(false);
      }
    } catch (e) {
      setSession(null);
      setIsAuthenticated(false);
    }
    return null;
  }

  const checkAuth = async () => {
    await getUser();
  };

  createEffect(() => {
    checkAuth();
  });

  const value: AuthContextType = {
    isAuthenticated,
    login,
    session,
    getUser,
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
  return context;
}
