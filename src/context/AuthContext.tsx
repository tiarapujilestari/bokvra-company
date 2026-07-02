import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { AuthUser } from "@/types";

const STORAGE_USERS_KEY = "bokvra_users";
const STORAGE_SESSION_KEY = "bokvra_session";

interface StoredUser extends AuthUser {
  password: string;
}

interface AuthContextValue {
  user: AuthUser | null;
  isLoading: boolean;
  login: (
    email: string,
    password: string,
  ) => Promise<{ ok: boolean; error?: string }>;
  register: (
    name: string,
    email: string,
    password: string,
  ) => Promise<{ ok: boolean; error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

function readUsers(): StoredUser[] {
  const raw = localStorage.getItem(STORAGE_USERS_KEY);
  if (!raw) {
    const seedAdmin: StoredUser = {
      id: "admin-seed",
      name: "Admin Bokvra",
      email: "admin@bokvra.coffee",
      role: "admin",
      password: "bokvra123",
    };
    localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify([seedAdmin]));
    return [seedAdmin];
  }
  return JSON.parse(raw) as StoredUser[];
}

function writeUsers(users: StoredUser[]) {
  localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(users));
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_SESSION_KEY);
    if (raw) {
      setUser(JSON.parse(raw) as AuthUser);
    }
    setIsLoading(false);
  }, []);

  async function login(email: string, password: string) {
    const users = readUsers();
    const found = users.find(
      (u) =>
        u.email.toLowerCase() === email.toLowerCase() &&
        u.password === password,
    );
    if (!found) {
      return { ok: false, error: "Email atau kata sandi salah." };
    }
    const { password: _password, ...publicUser } = found;
    setUser(publicUser);
    localStorage.setItem(STORAGE_SESSION_KEY, JSON.stringify(publicUser));
    return { ok: true };
  }

  async function register(name: string, email: string, password: string) {
    const users = readUsers();
    if (users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
      return { ok: false, error: "Email ini sudah terdaftar." };
    }
    const newUser: StoredUser = {
      id: `user-${Date.now()}`,
      name,
      email,
      role: "member",
      password,
    };
    writeUsers([...users, newUser]);
    const { password: _password, ...publicUser } = newUser;
    setUser(publicUser);
    localStorage.setItem(STORAGE_SESSION_KEY, JSON.stringify(publicUser));
    return { ok: true };
  }

  function logout() {
    setUser(null);
    localStorage.removeItem(STORAGE_SESSION_KEY);
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
