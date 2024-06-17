import { Metadata } from "next";

// Components
import ResetPasswordView from "./ResetPasswordView";
import Loader from "@/components/advanced/loader/Loader";

export const metadata: Metadata = {
  title: "Reset Password",
};

const ResetPassword: React.FC = () => {
  return (
    <Loader>
      <ResetPasswordView />
    </Loader>
  );
};

export default ResetPassword;
