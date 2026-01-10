import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('currentUser');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [users, setUsers] = useState(() => {
    const savedUsers = localStorage.getItem('users');
    if (savedUsers) {
      return JSON.parse(savedUsers);
    }
    return [
      { id: 1, email: 'admin@example.com', password: 'admin123', role: 'admin', name: 'Admin' },
      { id: 2, email: 'user@example.com', password: 'user123', role: 'user', name: 'User' }
    ];
  });

  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  const login = (email, password) => {
    const normalizedEmail = email.trim().toLowerCase();
    const sanitizedPassword = password.trim();
    const foundUser = users.find(
      u => u.email.toLowerCase() === normalizedEmail && u.password === sanitizedPassword
    );
    if (foundUser) {
      const { password, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
      return { success: true, user: userWithoutPassword };
    }
    return { success: false, error: 'Invalid email or password' };
  };

  const signup = ({ name, email, password, role }) => {
    const trimmedName = name.trim();
    const normalizedEmail = email.trim().toLowerCase();
    const sanitizedPassword = password.trim();
    const normalizedRole = role === 'admin' ? 'admin' : 'user';

    if (!trimmedName || !normalizedEmail || !sanitizedPassword) {
      return { success: false, error: 'All fields are required' };
    }

    const emailExists = users.some(
      existing => existing.email.toLowerCase() === normalizedEmail
    );

    if (emailExists) {
      return { success: false, error: 'Email already exists' };
    }

    const newUser = {
      id: Date.now(),
      name: trimmedName,
      email: normalizedEmail,
      password: sanitizedPassword,
      role: normalizedRole
    };

    setUsers(prev => [...prev, newUser]);

    const { password: _pw, ...userWithoutPassword } = newUser;
    return { success: true, user: userWithoutPassword };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  const switchUser = (role) => {
    const targetUser = users.find(u => u.role === role);
    if (targetUser) {
      const { password, ...userWithoutPassword } = targetUser;
      setUser(userWithoutPassword);
      localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
      return { success: true, user: userWithoutPassword };
    }
    return { success: false };
  };

  const isAdmin = () => user?.role === 'admin';
  const isLoggedIn = () => user !== null;

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, switchUser, isAdmin, isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
