
import { Card, CardContent } from "@/components/ui/card";

const SkillsSection = () => {
  const technicalSkills = [
    { name: "JavaScript", icon: "devicon-javascript-plain colored" },
    { name: "Java", icon: "devicon-java-plain colored" },
    { name: "Python", icon: "devicon-python-plain colored" },
    { name: "React", icon: "devicon-react-original colored" },
    { name: "Node.js", icon: "devicon-nodejs-plain colored" },
    { name: "HTML5", icon: "devicon-html5-plain colored" },
    { name: "CSS3", icon: "devicon-css3-plain colored" },
    { name: "Git", icon: "devicon-git-plain colored" },
    { name: "MongoDB", icon: "devicon-mongodb-plain colored" },
    { name: "MySQL", icon: "devicon-mysql-plain colored" },
    { name: "Bootstrap", icon: "devicon-bootstrap-plain colored" },
    { name: "TypeScript", icon: "devicon-typescript-plain colored" }
  ];
  
  const softSkills = [
    "Problem Solving",
    "Critical Thinking",
    "Communication",
    "Team Collaboration",
    "Time Management",
    "Adaptability",
    "Attention to Detail",
    "Project Management"
  ];
  
  return (
    <section id="skills" className="py-20">
      <div className="section-container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            My <span className="gradient-text">Skills</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto mb-6"></div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A combination of technical expertise and soft skills that I've developed through education, projects, and continuous learning.
          </p>
        </div>
        
        <div className="space-y-12">
          <div>
            <h3 className="text-2xl font-semibold mb-8 text-center">Technical Skills</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {technicalSkills.map((skill) => (
                <div key={skill.name} className="flex flex-col items-center skill-icon">
                  <i className={`${skill.icon} text-4xl mb-2`}></i>
                  <span className="text-sm font-medium">{skill.name}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-2xl font-semibold mb-8 text-center">Soft Skills</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {softSkills.map((skill) => (
                <Card key={skill} className="bg-secondary/50 hover:bg-secondary/80 transition-colors duration-300">
                  <CardContent className="p-4 text-center">
                    <span className="font-medium">{skill}</span>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
