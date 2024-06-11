import AuthLayoutWrapper from "@/components/advanced/authLayoutWrapper/AuthLayoutWrapper";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthLayoutWrapper>{children}</AuthLayoutWrapper>;
}
