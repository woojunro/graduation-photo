import { ReactNode, Suspense } from "react";

export default function RegisterLayout({ children }: { children: ReactNode }) {
  return <Suspense>{children}</Suspense>;
}
