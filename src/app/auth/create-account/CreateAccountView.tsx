"use client";

// Contexts
import { useUser } from "@/contexts/UserContext";

// Styles
import Style from "./CreateAccountView.module.css";

const CreateAccountView: React.FC = () => {
  const { signIn, signInWithGoogle, resetPassword, verifyEmail } = useUser();
  return (
    <div className={Style.header}>
      <h4>HELLO MF!!!!!!!!!!!</h4>
      <div
        style={{
          margin: "40px",
          color: "blue",
          border: "1px solid blue",
          padding: "4px 8px",
          borderRadius: "4px",
          width: "fit-content",
        }}
        onClick={() => signIn("takudzwamushai@gmail.com", "Taku30")}
      >
        EMAIL
      </div>

      <div
        style={{
          margin: "40px",
          color: "blue",
          border: "1px solid blue",
          padding: "4px 8px",
          borderRadius: "4px",
          width: "fit-content",
        }}
        onClick={signInWithGoogle}
      >
        GOOGLE
      </div>
      <div
        style={{
          margin: "40px",
          color: "blue",
          border: "1px solid blue",
          padding: "4px 8px",
          borderRadius: "4px",
          width: "fit-content",
        }}
        onClick={() => resetPassword("takudzwamushai@gmail.com")}
      >
        RESET
      </div>
      <div
        style={{
          margin: "40px",
          color: "blue",
          border: "1px solid blue",
          padding: "4px 8px",
          borderRadius: "4px",
          width: "fit-content",
        }}
        onClick={verifyEmail}
      >
        VERIFY
      </div>
    </div>
  );
};

export default CreateAccountView;
