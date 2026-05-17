import Button from "@/components/ui/Button";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { FiMail } from "react-icons/fi";

const Developer = () => {

    return (
    <section id="developer" className="px-6 py-20 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl mb-4">Meet the Developer</h2>
        <p className="text-xl text-muted max-w-2xl mx-auto">
          Built with passion to help you achieve more every day
        </p>
      </div>

      <div className="mx-auto">
        <div className="grid md:grid-cols-5 gap-20 items-center">
          <div className="md:col-span-2">
            <div className="h-88 w-88 border-[5px] border-gray-400 rounded-full flex items-center justify-center overflow-hidden shadow-md">
            </div>
          </div>

          <div className="md:col-span-3">
            <h3 className="text-3xl mb-4">Hi, I'm Abdullah Hussein</h3>
            <p className="text-lg text-muted mb-6">
              I'm a passionate developer dedicated to creating tools that make people's lives easier and more productive. TaskFlow was born from my own need to consolidate multiple productivity apps into one seamless experience.
            </p>
            <p className="text-lg text-muted mb-8">
              With years of experience in software development and a deep understanding of what makes productivity tools effective, I've crafted TaskFlow to be intuitive, powerful, and beautiful.
            </p>

            <div className="flex flex-wrap gap-3">
              <Button
                text="GitHub"
                variant="secondary"
                icon={<FaGithub />}
                link="https://github.com/AbdullahHR10"
              />

              <Button
                text="LinkedIn"
                variant="secondary"
                icon={<FaLinkedin />}
                link="https://www.linkedin.com/in/abdullah-h-dev"
              />

              <Button
                text="Twitter"
                variant="secondary"
                icon={<FaTwitter />}
                link=""
              />

              <Button
                text="Email"
                variant="secondary"
                icon={<FiMail />}
                link=""
              />
            </div>
          </div>
        </div>

        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <div className="text-center p-6 rounded-xl bg-muted/30">
            <div className="text-3xl mb-2">🎯</div>
            <h4 className="text-xl mb-2">Mission</h4>
            <p className="text-muted">
              Empower individuals to reach their full potential through effective productivity tools
            </p>
          </div>
          <div className="text-center p-6 rounded-xl bg-muted/30">
            <div className="text-3xl mb-2">💡</div>
            <h4 className="text-xl mb-2">Vision</h4>
            <p className="text-muted">
              Create a world where organization and productivity are accessible to everyone
            </p>
          </div>
          <div className="text-center p-6 rounded-xl bg-muted/30">
            <div className="text-3xl mb-2">❤️</div>
            <h4 className="text-xl mb-2">Values</h4>
            <p className="text-muted">
              Simplicity, user-first design, and continuous improvement
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Developer;
