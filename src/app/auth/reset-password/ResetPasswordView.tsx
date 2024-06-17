"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

// Libraries
import { Formik, Field, Form, FormikHelpers } from "formik";
import * as Yup from "yup";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

// Images
import mailImage from "@/assets/images/mailImage.png";

// Config
import { app } from "../../../../firebaseConfig";

// Styles
import Style from "./ResetPasswordView.module.css";
import Image from "next/image";

// Types
interface Values {
  email: string;
}

const ResetPasswordView: React.FC = () => {
  const [success, setSuccess] = useState<boolean>(false);
  const router = useRouter();

  // Validation Schema
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
  });

  const resetPassword = async (email: string) => {
    try {
      await sendPasswordResetEmail(getAuth(app), email).then(() =>
        setSuccess(true)
      );
    } catch (error) {
      console.error("Password reset error:", error);
      throw error;
    }
  };
  return (
    <>
      {success ? (
        <div className={Style.mailSent}>
          <Image src={mailImage} alt="Mail" />
          <div className={Style.header}>
            <h4>Almost There!</h4>
            <div className={Style.signIn}>
              Check your email inbox and confirm your account
            </div>
          </div>
          <div
            className={Style.googleLogin}
            onClick={() => router.push("/auth/login")}
          >
            Sign In
          </div>
        </div>
      ) : (
        <>
          <div className={Style.header}>
            <h4>Password Reset</h4>
            <div className={Style.signIn}>
              We Will Help You Reset your Password
            </div>
          </div>

          <Formik
            initialValues={{
              email: "",
            }}
            validationSchema={validationSchema}
            onSubmit={async (
              values: Values,
              { setSubmitting }: FormikHelpers<Values>
            ) => {
              try {
                await resetPassword(values.email);
              } catch (error) {
                console.error("Sign up error:", error);
              } finally {
                setSubmitting(false);
              }
            }}
          >
            {({ errors, touched, values }) => (
              <Form className={Style.form}>
                <div
                  className={
                    errors.email && touched.email
                      ? Style.errorFieldWrapper
                      : Style.fieldWrapper
                  }
                >
                  <label htmlFor="email">Email*</label>
                  <Field
                    autoComplete="on"
                    id="email"
                    name="email"
                    placeholder="Enter Email Address"
                    type="email"
                  />
                  {errors.email && touched.email ? (
                    <div className={Style.error}>{errors.email}</div>
                  ) : null}
                </div>

                <button
                  className={Style.submitBtn}
                  disabled={!!errors.email || values.email === ""}
                  type="submit"
                >
                  Reset Password
                </button>
              </Form>
            )}
          </Formik>
          <div className={Style.forgotPassword}>
            <Link href="/auth/reset-password">Forgot your password?</Link>
          </div>

          <div className={Style.divider} />

          <p className={Style.useALt}>Remembered your Password?</p>
          <div
            className={Style.googleLogin}
            onClick={() => router.push("/auth/login")}
          >
            Back to Sign In
          </div>
        </>
      )}
    </>
  );
};

export default ResetPasswordView;
