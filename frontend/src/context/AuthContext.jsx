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

  const signup = async ({ name, email, password, role }) => {
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

    try {
      // Send user data to backend
      const response = await fetch('http://localhost:3000/user-crud', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: trimmedName,
          email: normalizedEmail,
          password: sanitizedPassword,
          role: normalizedRole,
          user_id: Date.now(),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return { success: false, error: errorData.message || 'Failed to create user' };
      }

      const createdUser = await response.json();

      // Also add to local state for immediate use
      const newUser = {
        id: createdUser.id || Date.now(),
        name: trimmedName,
        email: normalizedEmail,
        password: sanitizedPassword,
        role: normalizedRole
      };

      setUsers(prev => [...prev, newUser]);

      const { password: _pw, ...userWithoutPassword } = newUser;
      return { success: true, user: userWithoutPassword };
    } catch (error) {
      console.error('Signup error:', error);
      return { success: false, error: 'Failed to create account. Please try again.' };
    }
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
