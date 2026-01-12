import { useNavigate } from "react-router-dom";
import Button from "@/components/ui/Button";

const TermsOfService = () => {
  const navigate = useNavigate();

  return (
    <main className="mx-auto max-w-3xl px-4 py-12 text-sm leading-6 text-muted">
      <h1 className="text-2xl font-bold text-foreground mb-6">
        Terms of Service
      </h1>

      <p className="mb-6">Last updated: January 2026</p>

      <section className="space-y-4">
        <p>
          By using <strong>TaskFlow</strong>, you agree to the following terms. If
          you don’t agree, don’t use the app.
        </p>

        <h2 className="text-lg font-semibold text-foreground">
          Using TaskFlow
        </h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>Use the app for lawful purposes only</li>
          <li>Do not abuse or attack the service</li>
          <li>No illegal or harmful content</li>
        </ul>

        <h2 className="text-lg font-semibold text-foreground">Accounts</h2>
        <p>
          You are responsible for your account and keeping your credentials
          secure.
        </p>

        <h2 className="text-lg font-semibold text-foreground">Your Content</h2>
        <p>
          You own the data you create. We only process it to provide the service.
        </p>

        <h2 className="text-lg font-semibold text-foreground">
          Availability
        </h2>
        <p>
          TaskFlow is provided <em>“as is”</em>. Downtime and bugs may happen.
        </p>

        <h2 className="text-lg font-semibold text-foreground">
          Limitation of Liability
        </h2>
        <p>
          We’re not responsible for lost data, missed deadlines, or productivity
          disasters.
        </p>
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

export default TermsOfService;
