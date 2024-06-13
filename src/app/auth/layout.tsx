"use client";

// Components
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/contexts/UserContext";
import AuthLayoutWrapper from "@/components/advanced/authLayoutWrapper/AuthLayoutWrapper";
import { LoaderComponent } from "@/components/advanced/loader/Loader";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user, router]);
  // Render the layout and children only if the user is not logged in
  return !user ? (
    <AuthLayoutWrapper>{children}</AuthLayoutWrapper>
  ) : (
    <div
      style={{
        background: "#F5F6FA",
        width: "100dvw",
        height: "100dvh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <LoaderComponent />
    </div>
  );
}
