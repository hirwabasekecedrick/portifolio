import { useState, useEffect } from "react";
import { Github, ExternalLink, Star, GitFork, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { githubService, LANGUAGE_COLORS } from "@/lib/github";
import { ProjectData } from "@shared/github";

export default function Projects() {
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        githubService.setUsername("hirwabasekecedrick");
        const projectsData = await githubService.getProjectsData();
        setProjects(projectsData);
      } catch (error) {
        console.warn("GitHub projects fetch failed:", error);
        const sampleProjects: ProjectData[] = [
          {
            id: 1,
            name: "Revo_platform",
            description:
              "A comprehensive platform for revolutionary digital solutions with modern architecture and scalable design.",
            url: "https://github.com/Revis047/Revo_platform",
            homepage: "https://portfolio-demo.com",
            languages: [
              { name: "TypeScript", color: "#3178c6" },
              { name: "React", color: "#61dafb" },
              { name: "CSS", color: "#563d7c" },
            ],
            stars: 12,
            forks: 3,
            topics: ["portfolio", "react", "typescript"],
            lastUpdated: new Date().toISOString(),
          },
          {
            id: 2,
            name: "DOB-e-commerce",
            description:
              "Full-featured e-commerce platform with modern UI, secure payments, and comprehensive admin dashboard.",
            url: "https://github.com/Revis047/DOB-e-commerce",
            homepage: null,
            languages: [
              { name: "JavaScript", color: "#f1e05a" },
              { name: "Node.js", color: "#339933" },
              { name: "MongoDB", color: "#47a248" },
            ],
            stars: 8,
            forks: 2,
            topics: ["fullstack", "nodejs", "mongodb"],
            lastUpdated: new Date(Date.now() - 86400000).toISOString(),
          },
          {
            id: 3,
            name: "weather-dashboard",
            description:
              "Interactive weather dashboard with location-based forecasts, charts, and beautiful UI components.",
            url: "https://github.com/john-dev/weather-dashboard",
            homepage: "https://weather-demo.com",
            languages: [
              { name: "React", color: "#61dafb" },
              { name: "CSS", color: "#563d7c" },
              { name: "JavaScript", color: "#f1e05a" },
            ],
            stars: 15,
            forks: 4,
            topics: ["weather", "react", "api"],
            lastUpdated: new Date(Date.now() - 172800000).toISOString(),
          },
          {
            id: 4,
            name: "e-commerce-store",
            description:
              "Modern e-commerce platform with shopping cart, payment integration, and admin dashboard.",
            url: "https://github.com/john-dev/e-commerce-store",
            homepage: null,
            languages: [
              { name: "Next.js", color: "#000000" },
              { name: "TypeScript", color: "#3178c6" },
              { name: "Stripe", color: "#635bff" },
            ],
            stars: 20,
            forks: 7,
            topics: ["ecommerce", "nextjs", "stripe"],
            lastUpdated: new Date(Date.now() - 259200000).toISOString(),
          },
          {
            id: 5,
            name: "blog-cms",
            description:
              "Content management system for blogs with markdown support, SEO optimization, and admin panel.",
            url: "https://github.com/john-dev/blog-cms",
            homepage: "https://blog-demo.com",
            languages: [
              { name: "Vue.js", color: "#41b883" },
              { name: "Node.js", color: "#339933" },
              { name: "PostgreSQL", color: "#336791" },
            ],
            stars: 11,
            forks: 3,
            topics: ["cms", "vue", "blog"],
            lastUpdated: new Date(Date.now() - 345600000).toISOString(),
          },
          {
            id: 6,
            name: "chat-application",
            description:
              "Real-time chat application with rooms, private messaging, and file sharing capabilities.",
            url: "https://github.com/john-dev/chat-application",
            homepage: "https://chat-demo.com",
            languages: [
              { name: "Socket.io", color: "#010101" },
              { name: "Express", color: "#000000" },
              { name: "React", color: "#61dafb" },
            ],
            stars: 18,
            forks: 5,
            topics: ["chat", "realtime", "socketio"],
            lastUpdated: new Date(Date.now() - 432000000).toISOString(),
          },
        ];
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <section id="projects" className="py-20 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-slate-100 mb-4">
              Featured Projects
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Loading latest projects from GitHub...
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader>
                  <div className="h-6 bg-slate-300 dark:bg-slate-600 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-slate-300 dark:bg-slate-600 rounded w-full"></div>
                  <div className="h-4 bg-slate-300 dark:bg-slate-600 rounded w-2/3"></div>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2 mb-4">
                    {[...Array(3)].map((_, j) => (
                      <div
                        key={j}
                        className="h-6 bg-slate-300 dark:bg-slate-600 rounded w-16"
                      ></div>
                    ))}
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex gap-4">
                      <div className="h-4 bg-slate-300 dark:bg-slate-600 rounded w-12"></div>
                      <div className="h-4 bg-slate-300 dark:bg-slate-600 rounded w-12"></div>
                    </div>
                    <div className="h-9 bg-slate-300 dark:bg-slate-600 rounded w-20"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="projects"
      className="py-20 bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-800 relative"
    >
      <div className="absolute inset-0 bg-grid-slate-900/[0.02] dark:bg-grid-slate-100/[0.02] bg-[size:60px_60px]"></div>
      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-800 dark:text-blue-200 border border-blue-200 dark:border-blue-700 mb-6">
             Portfolio Showcase
          </div>
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-slate-900 via-blue-800 to-slate-900 dark:from-slate-100 dark:via-blue-200 dark:to-slate-100 bg-clip-text text-transparent mb-4">
            Featured Projects
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
             A curated showcase of my latest work, featuring real-world
            applications and innovative solutions built with modern technologies
          </p>
        </div>

        {projects.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <Card
                key={project.id}
                className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 overflow-hidden"
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl font-bold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {project.name
                      .replace(/-/g, " ")
                      .replace(/\b\w/g, (l) => l.toUpperCase())}
                  </CardTitle>
                  <CardDescription className="text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed">
                    {project.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="pt-0">
                  {/* Language badges */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.languages.slice(0, 3).map((language) => (
                      <Badge
                        key={language.name}
                        variant="secondary"
                        className="text-xs font-medium"
                        style={{
                          backgroundColor: `${language.color}20`,
                          color: language.color,
                          border: `1px solid ${language.color}30`,
                        }}
                      >
                        {language.name}
                      </Badge>
                    ))}
                    {project.languages.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{project.languages.length - 3}
                      </Badge>
                    )}
                  </div>

                  {/* Topics */}
                  {project.topics.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-4">
                      {project.topics.slice(0, 2).map((topic) => (
                        <Badge
                          key={topic}
                          variant="outline"
                          className="text-xs text-slate-600 dark:text-slate-400"
                        >
                          {topic}
                        </Badge>
                      ))}
                    </div>
                  )}

                  {/* Stats and actions */}
                  <div className="flex justify-between items-center">
                    <div className="flex gap-4 text-sm text-slate-600 dark:text-slate-400">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4" />
                        {project.stars}
                      </div>
                      <div className="flex items-center gap-1">
                        <GitFork className="h-4 w-4" />
                        {project.forks}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        asChild
                        className="border-slate-300 dark:border-slate-600 hover:border-slate-400 dark:hover:border-slate-500"
                      >
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Github className="h-4 w-4" />
                        </a>
                      </Button>
                      {project.homepage && (
                        <Button
                          size="sm"
                          asChild
                          className="bg-blue-600 hover:bg-blue-700 text-white"
                        >
                          <a
                            href={project.homepage}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>

                  {/* Last updated */}
                  <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 mt-3 pt-3 border-t border-slate-200 dark:border-slate-700">
                    <Calendar className="h-3 w-3" />
                    Updated {formatDate(project.lastUpdated)}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <Github className="h-16 w-16 text-slate-400 dark:text-slate-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-700 dark:text-slate-300 mb-2">
                No projects found
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                Unable to fetch projects from GitHub. Please check your internet
                connection and try again.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
