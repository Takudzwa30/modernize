"use client";

// Libraries
import Link from "next/link";
import { Formik, Field, Form, FormikHelpers } from "formik";
import * as Yup from "yup";

// Components
import LoginWithGoogle from "@/components/advanced/loginWithGoogle/LoginWithGoogle";

// Contexts
import { useUser } from "@/contexts/UserContext";

// Styles
import Style from "./LoginView.module.css";

// Types
interface Values {
  password: string;
  email: string;
}

const LoginView: React.FC = () => {
  const { signIn } = useUser();

  // Validation Schema
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  return (
    <>
      <div className={Style.header}>
        <h4>Sign In</h4>
        <div className={Style.signIn}>
          New to Our Product?
          <span>
            <Link href="/auth/create-account">Create an Account</Link>
          </span>
        </div>
      </div>

      <Formik
        initialValues={{
          password: "",
          email: "",
        }}
        validationSchema={validationSchema}
        onSubmit={async (
          values: Values,
          { setSubmitting }: FormikHelpers<Values>
        ) => {
          try {
            await signIn(values.email, values.password);
            alert("Login successfully!");
          } catch (error) {
            alert("Failed to create an account");
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
            <div
              className={
                errors.password && touched.password
                  ? Style.errorFieldWrapper
                  : Style.fieldWrapper
              }
            >
              <label htmlFor="password">Password*</label>
              <Field
                autoComplete="on"
                id="password"
                type="password"
                name="password"
                placeholder="Enter Password"
              />
              {errors.password && touched.password ? (
                <div className={Style.error}>{errors.password}</div>
              ) : null}
            </div>

            <button
              className={Style.submitBtn}
              disabled={
                !!errors.email ||
                !!errors.password ||
                values.email === "" ||
                values.password === ""
              }
              type="submit"
            >
              Sign In{" "}
            </button>
          </Form>
        )}
      </Formik>
      <div className={Style.forgotPassword}>
        <Link href="/auth/reset-password">Forgot your password?</Link>
      </div>

      <div className={Style.divider} />

      <p className={Style.useALt}>Or sign in using:</p>

      <LoginWithGoogle />
    </>
  );
};

export default LoginView;
