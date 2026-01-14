import { useState, useEffect } from "react";
import { Code } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function HostedWebsites() {
  const [coreSkills, setCoreSkills] = useState([
    { name: "JavaScript", color: "#f1e05a" },
    { name: "React", color: "#61dafb" },
    { name: "Next.js", color: "#000000" },
    { name: "Vue.js", color: "#41b883" },
    { name: "Node.js", color: "#339933" },
    { name: "TypeScript", color: "#3178c6" },
    { name: "PHP", color: "#ff6b6b" },
    { name: "WordPress", color: "#4ecdc4" },
    { name: "Automation", color: "#45b7d1" },
    { name: "Workflow Design", color: "#96ceb4" },
    { name: "API Integration", color: "#ffeaa7" },
    { name: "Process Optimization", color: "#dda0dd" },
  ]);

  useEffect(() => {
    try {
      const savedSkills = localStorage.getItem("portfolio_skills");
      if (savedSkills) {
        setCoreSkills(JSON.parse(savedSkills));
      }
    } catch (error) {
      console.error("Error parsing saved skills:", error);
    }
  }, []);

  return (
    <section className="py-20 bg-gradient-to-br from-indigo-50 via-white to-cyan-50 dark:from-slate-800 dark:via-slate-900 dark:to-slate-800 relative">
      <div className="absolute inset-0 bg-grid-slate-900/[0.02] dark:bg-grid-slate-100/[0.02] bg-[size:60px_60px]"></div>
      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 text-purple-800 dark:text-purple-200 border border-purple-200 dark:border-purple-700 mb-6">
             Technical Arsenal
          </div>
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-slate-900 via-purple-800 to-slate-900 dark:from-slate-100 dark:via-purple-200 dark:to-slate-100 bg-clip-text text-transparent mb-4">
            Skills
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Technologies and domains I use to build real-world applications
          </p>
        </div>

        <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-slate-900 dark:text-slate-100">
              <Code className="h-5 w-5" />
              Core Technologies & Specializations
            </CardTitle>
            <CardDescription>
              My technical expertise spanning traditional development,
              automation, and modern AI workflows
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              {coreSkills.map((skill) => (
                <div
                  key={skill.name}
                  className="flex items-center gap-2 px-4 py-2 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 hover:shadow-md transition-all duration-200"
                >
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: (skill as any).color }}
                  />
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    {(skill as any).name}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
