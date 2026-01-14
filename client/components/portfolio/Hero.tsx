import { useState, useEffect } from "react";
import { ChevronDown, Github, Mail, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { githubService } from "@/lib/github";
import { GitHubUser } from "@shared/github";
import { PORTFOLIO_CONFIG } from "@/config/portfolio";
import AnimatedName from "./AnimatedName";

export default function Hero() {
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Fetch real GitHub data with fallback
        githubService.setUsername("hirwabasekecedrick");
        const userData = await githubService.fetchUser();
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  if (loading) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
        <div className="animate-pulse">
          <div className="w-32 h-32 bg-slate-300 dark:bg-slate-600 rounded-full mx-auto mb-4"></div>
          <div className="h-8 bg-slate-300 dark:bg-slate-600 rounded w-64 mx-auto mb-2"></div>
          <div className="h-6 bg-slate-300 dark:bg-slate-600 rounded w-48 mx-auto"></div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-cyan-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 relative overflow-hidden">
      {/* Enhanced Background decoration */}
      <div className="absolute inset-0 bg-grid-slate-900/[0.04] dark:bg-grid-slate-100/[0.04] bg-[size:75px_75px]"></div>
      <div className="absolute top-10 left-10 w-72 h-72 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div
        className="absolute bottom-10 right-10 w-96 h-96 bg-gradient-to-r from-purple-500/15 to-pink-500/15 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "1s" }}
      ></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-cyan-500/5 to-blue-500/5 rounded-full blur-3xl"></div>

      <div className="max-w-4xl mx-auto px-6 text-center relative z-20">
        {/* Animated Name */}
        <AnimatedName name={"Hirwa Baseke Cedrick"} />

        {/* Space for name positioned above subtitle */}
        <div className="h-40 md:h-48 mb-4"></div>

        {/* Content below the name */}
        <div className="mb-8 animate-fade-in-delay-1">
          <div className="mb-6">
            <h2 className="text-2xl md:text-4xl font-semibold text-slate-800 dark:text-slate-200 mb-4">
              Full-Stack Developer & Digital Innovator
            </h2>
            <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
              {
                " Crafting exceptional digital experiences with modern technologies. Passionate about turning complex problems into elegant solutions."}
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-slate-600 dark:text-slate-400 mb-6">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              React & TypeScript Expert
            </span>
            <span className="flex items-center gap-2">
              <span
                className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"
                style={{ animationDelay: "0.5s" }}
              ></span>
              Node.js & Express
            </span>
            <span className="flex items-center gap-2">
              <span
                className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse"
                style={{ animationDelay: "0.75s" }}
              ></span>
              AI Agents & Automation
            </span>
            <span className="flex items-center gap-2">
              <span
                className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"
                style={{ animationDelay: "1s" }}
              ></span>
              📍 Based in Kigali, Rwanda
            </span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-fade-in-delay-3">
          <Button
            size="lg"
            onClick={scrollToProjects}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 hover:scale-105 font-semibold text-lg"
          >
            Explore My Projects
            <ChevronDown className="ml-2 h-5 w-5 animate-bounce" />
          </Button>
          {user?.html_url && (
            <Button
              variant="outline"
              size="lg"
              asChild
              className="border-2 border-slate-300 dark:border-slate-600 hover:border-blue-500 dark:hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 px-8 py-4 rounded-xl transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1 font-semibold text-lg"
            >
              <a href={user.html_url} target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-5 w-5" />
                GitHub Profile
                <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Button>
          )}
          <Button
            variant="outline"
            size="lg"
            asChild
            className="border-2 border-green-300 dark:border-green-600 hover:border-green-500 dark:hover:border-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 px-8 py-4 rounded-xl transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1 font-semibold text-lg"
          >
            <a href="mailto:johnlevy047@gmail.com">
              <Mail className="mr-2 h-5 w-5" />
              Let's Connect
            </a>
          </Button>
        </div>

        {/* Social Links */}
        <div className="flex justify-center gap-6 animate-fade-in-delay-4">
          {user?.html_url && (
            <a
              href={user.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-4 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-110 border border-slate-200 dark:border-slate-700"
            >
              <Github className="h-6 w-6 text-slate-700 dark:text-slate-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
            </a>
          )}
          {user?.blog && (
            <a
              href={user.blog}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-4 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-110 border border-slate-200 dark:border-slate-700"
            >
              <ExternalLink className="h-6 w-6 text-slate-700 dark:text-slate-300 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors" />
            </a>
          )}
          <a
            href="mailto:hirwabasekecedrick@gmail.com"
            className="group p-4 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-110 border border-slate-200 dark:border-slate-700"
          >
            <Mail className="h-6 w-6 text-slate-700 dark:text-slate-300 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors" />
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <button
          onClick={scrollToProjects}
          className="p-2 rounded-full bg-white/20 dark:bg-slate-800/50 backdrop-blur-sm border border-white/30 dark:border-slate-700/50"
        >
          <ChevronDown className="h-5 w-5 text-slate-700 dark:text-slate-300" />
        </button>
      </div>
    </section>
  );
}
