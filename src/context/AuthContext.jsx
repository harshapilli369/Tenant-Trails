import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

const MOCK_USERS = [
  { id: 1, name: 'Alex Morgan', email: 'alex@dal.ca', password: 'password123', initials: 'AM' },
];

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem('tt_user');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  function login(email, password) {
    const found = MOCK_USERS.find(
      (u) => u.email === email && u.password === password
    );
    if (!found) throw new Error('Invalid email or password.');
    const safeUser = { id: found.id, name: found.name, email: found.email, initials: found.initials };
    setUser(safeUser);
    localStorage.setItem('tt_user', JSON.stringify(safeUser));
    return safeUser;
  }

  function register({ name, email }) {
    if (MOCK_USERS.find((u) => u.email === email)) {
      throw new Error('An account with this email already exists.');
    }
    const initials = name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
    const newUser = { id: Date.now(), name, email, initials };
    setUser(newUser);
    localStorage.setItem('tt_user', JSON.stringify(newUser));
    return newUser;
  }

  function logout() {
    setUser(null);
    localStorage.removeItem('tt_user');
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
