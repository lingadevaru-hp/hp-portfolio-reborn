
import { Card, CardContent } from "@/components/ui/card";
import { User, Code, Book } from "lucide-react";

const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-secondary/30">
      <div className="section-container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            About <span className="gradient-text">Me</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-muted-foreground mb-6 text-lg">
              Hello! I'm Lingadevaru HP, a computer science student passionate about software development, algorithms, and creating impactful technology solutions.
            </p>
            <p className="text-muted-foreground mb-6 text-lg">
              I'm currently focused on expanding my knowledge in web development, machine learning, and software engineering. My goal is to build applications that solve real-world problems and provide intuitive user experiences.
            </p>
            <p className="text-muted-foreground text-lg">
              When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, or expanding my knowledge through online courses and technical literature.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Card className="bg-card/50 border-gradient overflow-hidden">
              <CardContent className="p-6">
                <div className="mb-4 text-primary">
                  <User size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-2">Personal</h3>
                <ul className="text-muted-foreground space-y-2">
                  <li>Computer Science Student</li>
                  <li>Problem Solver</li>
                  <li>Continuous Learner</li>
                  <li>Team Player</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-card/50 border-gradient overflow-hidden">
              <CardContent className="p-6">
                <div className="mb-4 text-primary">
                  <Code size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-2">Technical</h3>
                <ul className="text-muted-foreground space-y-2">
                  <li>Web Development</li>
                  <li>Data Structures</li>
                  <li>Algorithms</li>
                  <li>Software Design</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-card/50 border-gradient overflow-hidden sm:col-span-2">
              <CardContent className="p-6">
                <div className="mb-4 text-accent">
                  <Book size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-2">Education</h3>
                <div className="text-muted-foreground">
                  <p className="font-medium">Bachelor of Computer Science</p>
                  <p>Expected Graduation: 2024</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
