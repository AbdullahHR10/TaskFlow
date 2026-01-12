import { useNavigate } from "react-router-dom";
import Button from "@/components/ui/Button";

const PrivacyPolicy = () => {
  const navigate = useNavigate();

  return (
    <main className="mx-auto max-w-3xl px-4 py-12 text-sm leading-6 text-muted">
      <h1 className="text-2xl font-bold text-foreground mb-6">
        Privacy Policy
      </h1>

      <p className="mb-6">Last updated: January 2026</p>

      <section className="space-y-4">
        <p>
          Welcome to <strong>TaskFlow</strong>. Your privacy matters. This Privacy
          Policy explains what data we collect, why we collect it, and how we
          handle it.
        </p>

        <h2 className="text-lg font-semibold text-foreground">
          Information We Collect
        </h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>Account data (email, username, authentication info)</li>
          <li>Task data you create, edit, or delete</li>
          <li>Basic usage data for performance and debugging</li>
        </ul>

        <p>We do <strong>not</strong> sell your data. Ever.</p>

        <h2 className="text-lg font-semibold text-foreground">
          How We Use Your Data
        </h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>Provide and maintain the service</li>
          <li>Sync and store your tasks</li>
          <li>Improve performance and security</li>
        </ul>

        <h2 className="text-lg font-semibold text-foreground">
          Cookies & Local Storage
        </h2>
        <p>
          TaskFlow may use cookies or local storage for authentication, theme
          preferences, and core functionality.
        </p>

        <h2 className="text-lg font-semibold text-foreground">
          Your Rights
        </h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>Access your data</li>
          <li>Request deletion of your account</li>
          <li>Stop using the app at any time</li>
        </ul>
      </section>

      <div className="mt-6 flex gap-3">
        <Button
          text="Back"
          variant="secondary"
          onClick={() => navigate(-1)}
        />

        <Button
          text="Login"
          link="/login"
        />
      </div>
    </main>
  );
};

export default PrivacyPolicy;
