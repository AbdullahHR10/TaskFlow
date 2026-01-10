import type { ReactNode } from "react";
import Logo from "@/components/Logo";
import GridPattern from "@/components/GridPattern";

interface AuthLayoutProps {
  title: string;
  subtitle: string;
  children: ReactNode;
  switchAuth: ReactNode;
  legal?: ReactNode;
}

const AuthLayout = ({ title, subtitle, children, switchAuth, legal }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <GridPattern />
      <div className="h-auto w-md p-6 border-divider shadow-lg rounded-lg">
        <div className="w-full max-w-md">
          <div className="flex flex-col items-center">
            <Logo text={false} size={4} stacked={true} />
            <h1 className="text-2xl font-bold mt-2">{title}</h1>
            <p className="text-muted text-sm mb-6">{subtitle}</p>
          </div>

            {children}
            {switchAuth}
        </div>
      </div>

      {legal && (
        <div className="text-center text-xs text-muted">
          {legal}
        </div>
      )}
    </div>
  );
};

export default AuthLayout;
