"use client";

import { useEffect } from "react";

// Libraries
import { useRouter } from "next/navigation";

// Contexts
import { useUser } from "@/contexts/UserContext";

// Components
import LayoutWrapper from "@/components/advanced/layoutWrapper/LayoutWrapper";
import { LoaderComponent } from "@/components/advanced/loader/Loader";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const { user, loading } = useUser();

  useEffect(() => {
    // Redirect to login page if user is not logged in and not in loading state
    if (!loading && !user) {
      router.push("/auth/login");
    }
  }, [user, loading, router]);


  // Render the layout and children only if the user is logged in
  return user ? (
    <LayoutWrapper>{children}</LayoutWrapper>
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
