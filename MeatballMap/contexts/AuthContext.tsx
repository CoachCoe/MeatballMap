import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, DEV_MODE } from '../config/firebase';
import {
  User,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  signInWithPopup,
  GithubAuthProvider,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
  Auth,
  NextOrObserver,
} from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string, rememberMe: boolean) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signInWithGithub: () => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (DEV_MODE) {
      // In dev mode, set a mock user
      setUser({ uid: 'dev-user', email: 'dev@example.com' } as User);
      setLoading(false);
      return;
    }

    // Check for remembered user
    const checkRememberedUser = async () => {
      try {
        const rememberedUser = await AsyncStorage.getItem('rememberedUser');
        if (rememberedUser) {
          await setPersistence(auth as Auth, browserLocalPersistence);
        }
      } catch (error) {
        console.error('Error checking remembered user:', error);
      }
    };

    checkRememberedUser();

    // Listen for auth state changes
    const unsubscribe = auth.onAuthStateChanged((user: User | null) => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signIn = async (email: string, password: string, rememberMe: boolean) => {
    if (DEV_MODE) {
      setUser({ uid: 'dev-user', email: 'dev@example.com' } as User);
      return;
    }

    // Set persistence based on remember me option
    await setPersistence(auth as Auth, rememberMe ? browserLocalPersistence : browserSessionPersistence);
    const result = await signInWithEmailAndPassword(auth, email, password);
    
    // Store remember me preference
    if (rememberMe) {
      await AsyncStorage.setItem('rememberedUser', 'true');
    } else {
      await AsyncStorage.removeItem('rememberedUser');
    }
    
    setUser(result.user);
  };

  const signUp = async (email: string, password: string) => {
    if (DEV_MODE) return;
    const result = await createUserWithEmailAndPassword(auth, email, password);
    setUser(result.user);
  };

  const resetPassword = async (email: string) => {
    if (DEV_MODE) return;
    await sendPasswordResetEmail(auth, email);
  };

  const signInWithGoogle = async () => {
    if (DEV_MODE) return;
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth as Auth, provider);
    setUser(result.user);
  };

  const signInWithGithub = async () => {
    if (DEV_MODE) return;
    const provider = new GithubAuthProvider();
    const result = await signInWithPopup(auth as Auth, provider);
    setUser(result.user);
  };

  const logout = async () => {
    try {
      if (DEV_MODE) {
        setUser(null);
        setLoading(false);
        return;
      }
      await AsyncStorage.removeItem('rememberedUser');
      await signOut(auth);
      setUser(null);
      setLoading(false);
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  };

  const value = {
    user,
    loading,
    signIn,
    signUp,
    logout,
    resetPassword,
    signInWithGoogle,
    signInWithGithub,
    isAuthenticated: DEV_MODE || !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 