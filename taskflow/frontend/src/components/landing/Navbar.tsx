import Logo from "@/components/Logo";
import Button from "@/components/ui/Button";
import ThemeToggle from "@/components/ui/ThemeToggle";

const Navbar = () => {
  return (
    <header className="h-16 w-full flex items-center justify-between px-68 text-sm border-divider-b">
      <Logo />
      <nav className="flex gap-6 font-semibold">
        <a href="#home">Home</a>
        <a href="#features">Features</a>
        <a href="#home">Developer</a>
        <a href="#home">Highlights</a>
      </nav>

      <div className="flex items-center gap-4">
        <a href="/login" className="font-semibold hover:underline">Log in</a>
        <Button text="Get Started" variant="primary" link="/signup" />
        <ThemeToggle/>
      </div>

    </header>
  );
};

export default Navbar;
