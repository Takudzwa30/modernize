import { Metadata } from "next";

// Components
import LoginView from "./LoginView";
import Loader from "@/components/advanced/loader/Loader";

export const metadata: Metadata = {
  title: "Login",
};

const Login: React.FC = () => {
  return (
    <Loader>
      <LoginView />
    </Loader>
  );
};

export default Login;
