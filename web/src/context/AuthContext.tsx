'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithPopup,
  updateProfile,
  User as FirebaseUser,
  onAuthStateChanged
} from 'firebase/auth';
import { auth, googleProvider, facebookProvider } from '@/config/firebase';

// Development mode flag
const DEV_MODE = process.env.NEXT_PUBLIC_DEV_MODE === 'true';

interface User {
  email: string | null;
  id: string;
  displayName: string | null;
  emailVerified: boolean;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string, rememberMe?: boolean) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signInWithFacebook: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  login: async () => {},
  register: async () => {},
  logout: async () => {},
  resetPassword: async () => {},
  signInWithGoogle: async () => {},
  signInWithFacebook: async () => {},
  loading: true,
});

const formatUser = (user: FirebaseUser): User => ({
  email: user.email,
  id: user.uid,
  displayName: user.displayName,
  emailVerified: user.emailVerified,
});

// Mock user for development
const mockUser: User = {
  email: 'dev@example.com',
  id: 'dev-user-id',
  displayName: 'Developer',
  emailVerified: true,
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (DEV_MODE) {
      // Auto-authenticate in development mode
      setUser(mockUser);
      setIsAuthenticated(true);
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(formatUser(user));
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    if (DEV_MODE) {
      setUser(mockUser);
      setIsAuthenticated(true);
      return;
    }

    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      if (!result.user.emailVerified) {
        await sendEmailVerification(result.user);
        throw new Error('Please verify your email before logging in. A new verification email has been sent.');
      }
    } catch (error: any) {
      console.error('Login error:', error);
      throw new Error(error.message);
    }
  };

  const register = async (email: string, password: string) => {
    if (DEV_MODE) {
      setUser(mockUser);
      setIsAuthenticated(true);
      return;
    }

    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      await sendEmailVerification(result.user);
      await updateProfile(result.user, {
        displayName: email.split('@')[0],
      });
      throw new Error('Please check your email to verify your account before logging in.');
    } catch (error: any) {
      console.error('Registration error:', error);
      throw new Error(error.message);
    }
  };

  const logout = async () => {
    if (DEV_MODE) {
      setUser(null);
      setIsAuthenticated(false);
      return;
    }

    try {
      await signOut(auth);
    } catch (error: any) {
      console.error('Logout error:', error);
      throw new Error(error.message);
    }
  };

  const resetPassword = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error: any) {
      console.error('Password reset error:', error);
      throw new Error(error.message);
    }
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error: any) {
      console.error('Google sign-in error:', error);
      throw new Error(error.message);
    }
  };

  const signInWithFacebook = async () => {
    try {
      await signInWithPopup(auth, facebookProvider);
    } catch (error: any) {
      console.error('Facebook sign-in error:', error);
      throw new Error(error.message);
    }
  };

  return (
    <AuthContext.Provider 
      value={{ 
        isAuthenticated, 
        user, 
        login, 
        register, 
        logout, 
        resetPassword,
        signInWithGoogle,
        signInWithFacebook,
        loading 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext); 