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
import Style from "./CreateAccountView.module.css";

// Types
interface Values {
  password: string;
  email: string;
}

const CreateAccountView: React.FC = () => {
  const { signIn, resetPassword, verifyEmail, signUp } = useUser();

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
        <h4>Create an Account</h4>
        <div className={Style.signIn}>
          Have an Account?
          <span>
            <Link href="/auth/login">Sign In</Link>
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
            await signUp(values.email, values.password);
            alert("Account created successfully!");
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
                placeholder="Create Password"
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
              Create Account
            </button>
          </Form>
        )}
      </Formik>

      <div className={Style.divider} />

      <p className={Style.useALt}>Or create an account using:</p>

      <LoginWithGoogle />
{/* 
      <div>
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
      </div> */}
    </>
  );
};

export default CreateAccountView;
