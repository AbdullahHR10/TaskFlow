import Logo from "@/components/Logo";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="px-6 py-12 bg-card border-divider-t">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Logo textSize={2} />
            </div>
            <p className="text-sm text-muted">
              Your all-in-one productivity companion for tasks, habits, budgets, and notes.
            </p>
          </div>
          
          <div>
            <h3 className="mb-4">Product</h3>
            <ul className="space-y-2 text-sm text-muted">
              <li><a href="#features">Features</a></li>
              <li><a href="#">Developer</a></li>
              <li><a href="#">FAQ</a></li>
              <li><a href="#">Updates</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="mb-4">Developer</h3>
            <ul className="space-y-2 text-sm text-muted">
              <li><a href="#">About</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="mb-4">Legal</h3>
            <ul className="space-y-2 text-sm text-muted">
              <li><a href="/privacy-policy">Privacy Policy</a></li>
              <li><a href="/terms-of-service">Terms of Service</a></li>
              <li><a href="#">Cookie Policy</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted">
            © 2026 TaskFlow. All rights reserved.
          </p>
          <div className="flex gap-4">
            <a href="#">
              <FaFacebook className="size-5" />
            </a>
            <a href="#">
              <FaTwitter className="size-5" />
            </a>
            <a href="#">
              <FaInstagram className="size-5" />
            </a>
            <a href="#">
              <FaLinkedin className="size-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
