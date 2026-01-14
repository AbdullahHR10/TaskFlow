import type { ReactNode } from "react";

type PageHeaderProps = {
  title: string;
  actions?: ReactNode;
};

const PageHeader = ({ title, actions}: PageHeaderProps) => {
  return (
    <div className="py-4 mt-2 mb-6 flex items-start justify-between gap-4 border-divider-b">
      <h1 className="text-2xl font-semibold text-foreground">
        {title}
      </h1>

      {actions && (
        <div className="flex shrink-0 items-center gap-2">
          {actions}
        </div>
      )}
    </div>
  );
}

export default PageHeader;
