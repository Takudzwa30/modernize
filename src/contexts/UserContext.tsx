"use client";

// UserContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import {
  getAuth,
  setPersistence,
  browserLocalPersistence,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
  sendEmailVerification,
  createUserWithEmailAndPassword,
  User as FirebaseUser,
} from "firebase/auth";
import { app } from "../../firebaseConfig";

type User = FirebaseUser | null;

interface AuthContextType {
  user: User;
  signIn: (email: string, password: string) => Promise<void>;
  signOutUser: () => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  verifyEmail: () => Promise<void>;
}

const UserContext = createContext<AuthContextType | undefined>(undefined);

export const useUser = (): AuthContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User>(null);

  useEffect(() => {
    const auth = getAuth(app);

    // Check if window is available (i.e., running in the browser)
    if (typeof window !== "undefined") {
      // Enable local persistence
      setPersistence(auth, browserLocalPersistence)
        .then(() => {
          // Persistence enabled

          // Check if user is already signed in
          const unsubscribe = auth.onAuthStateChanged((user) => {
            setUser(user);
          });

          return unsubscribe;
        })
        .catch((error) => {
          // An error occurred while enabling persistence
          console.error("Error enabling local persistence:", error);
        });
    }
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        getAuth(app),
        email,
        password
      );
      setUser(userCredential.user);
    } catch (error) {
      console.error("Sign in error:", error);
      throw error;
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      await createUserWithEmailAndPassword(getAuth(app), email, password);
    } catch (error) {
      console.error("Sign up error:", error);
      throw error;
    }
  };

  const signInWithGoogle = async () => {
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
    } catch (error) {
      console.error("Google sign in error:", error);
      throw error;
    }
  };

  const resetPassword = async (email: string) => {
    try {
      await sendPasswordResetEmail(getAuth(app), email);
    } catch (error) {
      console.error("Password reset error:", error);
      throw error;
    }
  };

  const verifyEmail = async () => {
    try {
      const auth = getAuth(app);
      const user = auth.currentUser;
      if (user) {
        await sendEmailVerification(user);
      } else {
        console.error("No user found to send verification email");
        throw new Error("No user found to send verification email");
      }
    } catch (error) {
      console.error("Send email verification error:", error);
      throw error;
    }
  };

  const signOutUser = async () => {
    try {
      await signOut(getAuth(app));
      setUser(null);
    } catch (error) {
      console.error("Sign out error:", error);
      throw error;
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        signIn,
        signInWithGoogle,
        signUp,
        signOutUser,
        resetPassword,
        verifyEmail,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
