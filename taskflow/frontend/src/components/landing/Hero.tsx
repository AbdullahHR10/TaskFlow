import Button from "@/components/ui/Button";
import { FaArrowRight } from "react-icons/fa6";

const Hero = () => {
  return (
    <section className="px-6 py-20 md:py-32 max-w-7xl mx-auto">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl md:text-7xl mb-6 tracking-tight">
          Your Life, Organized in One Place
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-2xl mx-auto">
          Manage tasks, build habits, track budgets, and capture notes — all in one powerful productivity app.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            text="Get Started"
            variant="secondary"
            icon={<FaArrowRight />}
            link="/signup"
          />
          <Button
            text="Learn More"
            variant="primary"
            link="#features"
          />
        </div>
      </div>
    </section>
  );
}

export default Hero;
