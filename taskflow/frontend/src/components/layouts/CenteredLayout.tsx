import GridPattern from "@/components/GridPattern";
import type { ReactNode } from "react";

type CenteredLayoutProps = {
  children: ReactNode;
}

const CenteredLayout = ({ children }: CenteredLayoutProps ) => (
  <div className="h-screen w-screen flex flex-col items-center justify-center text-center">
    <GridPattern />
    <main className="z-10 flex flex-col items-center">{children}</main>
  </div>
)

export default CenteredLayout;
