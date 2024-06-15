// LoginWithGoogle.tsx
import React from "react";

// Contexts
import { useUser } from "@/contexts/UserContext"; // Update with the correct path

// Icons
import { FcGoogle } from "react-icons/fc";

// Styles
import Style from "./LoginWithGoogle.module.css";

const LoginWithGoogle: React.FC = () => {
  // Contexts
  const { signInWithGoogle } = useUser();

  // Functions
  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error("Google sign in error:", error);
    }
  };

  return (
    <div className={Style.googleLogin} onClick={handleGoogleLogin}>
      <FcGoogle size={22} />
      Continue with Google
    </div>
  );
};

export default LoginWithGoogle;
