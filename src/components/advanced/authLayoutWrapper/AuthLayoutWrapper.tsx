// Styles
import Style from "./AuthLayoutWrapper.module.css";

const AuthLayoutWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={Style.authLayout}>
      <div className={Style.auth}>{children}</div>
    </div>
  );
};

export default AuthLayoutWrapper;
