import { Metadata } from "next";

// Components
import CreateAccountView from "./CreateAccountView";
import Loader from "@/components/advanced/loader/Loader";

export const metadata: Metadata = {
  title: "Create an account",
};

const CreateAccount: React.FC = () => {
  return (
    <Loader>
      <CreateAccountView />
    </Loader>
  );
};

export default CreateAccount;
