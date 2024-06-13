"use client";

// Components
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import LayoutWrapper from "@/components/advanced/layoutWrapper/LayoutWrapper";
import { useUser } from "@/contexts/UserContext";
import { LoaderComponent } from "@/components/advanced/loader/Loader";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const { user } = useUser(); // Assuming useUser hook provides the user authentication status

  useEffect(() => {
    // Redirect to login page if user is not logged in
    if (!user) {
      router.push("/auth/create-account");
    }
  }, [user, router]);

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
