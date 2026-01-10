import Button from "@/components/ui/Button";
import CenteredLayout from "@/components/layouts/CenteredLayout";
import { usePageTitle } from "@/hooks/usePageTitle";
import { ERRORS } from "@/pages/errors/errors.config";
import { FaArrowLeft } from "react-icons/fa";

type ErrorCode = keyof typeof ERRORS;

const ErrorPage = ({ code }: { code: ErrorCode }) => {
  const error = ERRORS[code];
  const Icon = error.icon

  usePageTitle(error.pageTitle);

  return (
    <CenteredLayout>
      <div className="bg-icon rounded-full p-6 mb-6">
        <Icon className="h-12 w-12 text-icon" />
      </div>

      <h1 className="text-4xl font-bold tracking-tight mb-2">
        {error.title}
      </h1>

      <p className="text-muted-foreground text-lg mb-8 max-w-md">
        {error.message}
      </p>

      <Button
        text="Back Home"
        variant="primary"
        icon={<FaArrowLeft className="h-3 w-3" />}
        link="/"
      />
    </CenteredLayout>
  );
};

export default ErrorPage;
