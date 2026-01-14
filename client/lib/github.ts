import {
  GitHubRepo,
  GitHubUser,
  RepoLanguages,
  ProjectData,
  SkillData,
} from "@shared/github";

const API_BASE = "/api/github";

// Language colors mapping
const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Python: "#3572A5",
  React: "#61dafb",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Java: "#b07219",
  "C++": "#f34b7d",
  C: "#555555",
  Go: "#00ADD8",
  Rust: "#dea584",
  PHP: "#4F5D95",
  Ruby: "#701516",
  Swift: "#fa7343",
  Kotlin: "#A97BFF",
  Dart: "#00B4AB",
  Shell: "#89e051",
  Vue: "#41b883",
  Angular: "#dd1b16",
  Svelte: "#ff3e00",
  "No-Code/Low-Code": "#ff6b6b",
  "AI Agent Workflows": "#4ecdc4",
  Automation: "#45b7d1",
  "Workflow Design": "#96ceb4",
  "API Integration": "#ffeaa7",
  "Process Optimization": "#dda0dd",
  "Node.js": "#339933",
  "Next.js": "#000000",
  "Vue.js": "#41b883",
};

class GitHubService {
  private username: string;
  private cache: Map<string, { data: any; timestamp: number }> = new Map();
  private readonly CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
  private lastRequestTime = 0;
  private readonly MIN_REQUEST_INTERVAL = 1000; // 1 second between requests

  constructor(username: string = "Revis047") {
    // Default to correct username
    this.username = username;
  }

  setUsername(username: string) {
    this.username = username;
    // Clear cache when username changes
    this.cache.clear();
  }

  private async rateLimitedFetch(
    url: string,
    options?: RequestInit,
  ): Promise<Response> {
    // Check cache first
    const cacheKey = url;
    const cached = this.cache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < this.CACHE_DURATION) {
      return new Response(JSON.stringify(cached.data), { status: 200 });
    }

    try {
      // Rate limiting
      const now = Date.now();
      const timeSinceLastRequest = now - this.lastRequestTime;
      if (timeSinceLastRequest < this.MIN_REQUEST_INTERVAL) {
        await new Promise((resolve) =>
          setTimeout(resolve, this.MIN_REQUEST_INTERVAL - timeSinceLastRequest),
        );
      }
      this.lastRequestTime = Date.now();

      const response = await fetch(url, {
        ...options,
        signal: AbortSignal.timeout(10000), // 10 second timeout
      });

      // If successful, cache the response
      if (response.ok) {
        const data = await response.clone().json();
        this.cache.set(cacheKey, { data, timestamp: Date.now() });
      }

      return response;
    } catch (error) {
      // Network error or timeout - return a failed response
      console.warn("Network error for:", url, error);
      throw new Error("Network request failed");
    }
  }

  async fetchUser(): Promise<GitHubUser> {
    // Use fallback data immediately to ensure fast loading
    const fallbackUser = {
      login: "Revis047",
      name: "John Revis Niyonkuru",
      bio: "🚀 Full-stack developer crafting exceptional digital experiences. Transforming ideas into powerful web applications with cutting-edge technologies.",
      avatar_url: "https://avatars.githubusercontent.com/u/131166340?v=4",
      html_url: "https://github.com/Revis047",
      location: "Kigali, Rwanda",
      email: "johnlevy047@gmail.com",
      twitter_username: null,
      blog: null,
      public_repos: 15,
      followers: 50,
      following: 30,
    };

    try {
      // Try to fetch real data directly from GitHub API
      const response = await fetch(`${API_BASE}/user/${this.username}`);

      if (response.ok) {
        const userData = await response.json();
        // Merge real data with fallback, keeping the correct name
        return {
          ...fallbackUser,
          ...userData,
          name: "John Revis Niyonkuru", // Keep display name
          public_repos: userData.public_repos || fallbackUser.public_repos,
          followers: userData.followers || fallbackUser.followers,
          following: userData.following || fallbackUser.following,
          avatar_url: userData.avatar_url || fallbackUser.avatar_url,
          bio: userData.bio || fallbackUser.bio,
        };
      }
    } catch (error) {
      console.warn("GitHub API unavailable, using fallback data:", error);
    }

    return fallbackUser;
  }

  async fetchRepositories(): Promise<GitHubRepo[]> {
    try {
      // Fetch repositories directly from GitHub API
      const response = await fetch(`${API_BASE}/repos/${this.username}`);

      if (!response.ok) {
        console.warn(
          `GitHub repos API returned ${response.status}: ${response.statusText}`,
        );
        throw new Error(`GitHub API error: ${response.status}`);
      }

      const data = await response.json();
      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.warn("GitHub repositories fetch failed, using fallback:", error);
      // Return empty array on error, components will handle fallback
      return [];
    }
  }

  async fetchRepositoryLanguages(repo: GitHubRepo): Promise<RepoLanguages> {
    try {
      const response = await fetch(
        `${API_BASE}/repos/${this.username}/${repo.name}/languages`,
      );

      if (!response.ok) {
        if (response.status === 429) {
          console.warn("Rate limit hit for repo languages:", repo.name);
        }
        return {};
      }
      return response.json();
    } catch (error) {
      console.error("Error fetching languages for repo:", repo.name, error);
      return {};
    }
  }

  async getProjectsData(): Promise<ProjectData[]> {
    try {
      const repos = await this.fetchRepositories();

      if (!Array.isArray(repos) || repos.length === 0) {
        throw new Error("No repositories found");
      }

      // Filter out forks and get all repos
      const filteredRepos = repos
        .filter((repo) => !repo.fork && repo.name)
        .sort(
          (a, b) =>
            new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime(),
        )
        .slice(0, 12); // Get up to 12 repos to avoid rate limits

      const projectsWithLanguages: ProjectData[] = [];

      for (const repo of filteredRepos) {
        try {
          // Try to fetch languages with timeout
          const languagesPromise = this.fetchRepositoryLanguages(repo);
          const timeoutPromise = new Promise<RepoLanguages>((_, reject) =>
            setTimeout(() => reject(new Error("Language fetch timeout")), 3000),
          );

          const languages = await Promise.race([
            languagesPromise,
            timeoutPromise,
          ]);
          const languageNames = Object.keys(languages).slice(0, 5); // Limit to 5 languages

          projectsWithLanguages.push({
            id: repo.id,
            name: repo.name,
            description:
              repo.description || `${repo.name.replace(/-/g, " ")} project`,
            url: repo.html_url,
            homepage: repo.homepage,
            languages: languageNames.map((name) => ({
              name,
              color: LANGUAGE_COLORS[name] || "#6b7280",
            })),
            stars: repo.stargazers_count || 0,
            forks: repo.forks_count || 0,
            topics: repo.topics || [],
            lastUpdated: repo.updated_at,
          });

          // Small delay to avoid rate limits
          await new Promise((resolve) => setTimeout(resolve, 50));
        } catch (error) {
          // If language fetch fails, still include the repo with basic info
          projectsWithLanguages.push({
            id: repo.id,
            name: repo.name,
            description:
              repo.description || `${repo.name.replace(/-/g, " ")} project`,
            url: repo.html_url,
            homepage: repo.homepage,
            languages: repo.language
              ? [
                  {
                    name: repo.language,
                    color: LANGUAGE_COLORS[repo.language] || "#6b7280",
                  },
                ]
              : [],
            stars: repo.stargazers_count || 0,
            forks: repo.forks_count || 0,
            topics: repo.topics || [],
            lastUpdated: repo.updated_at,
          });
        }
      }

      return projectsWithLanguages;
    } catch (error) {
      console.warn("GitHub projects fetch failed:", error);
      return [];
    }
  }

  private getFallbackProjects(): ProjectData[] {
    return [
      {
        id: 1,
        name: "Portfolio Website",
        description:
          "Modern portfolio website built with React, TypeScript, and Tailwind CSS",
        url: "https://github.com/Revis047/portfolio",
        homepage: "",
        languages: [
          { name: "TypeScript", color: LANGUAGE_COLORS.TypeScript },
          { name: "React", color: LANGUAGE_COLORS.React },
          { name: "CSS", color: LANGUAGE_COLORS.CSS },
        ],
        stars: 5,
        forks: 2,
        topics: ["portfolio", "react", "typescript"],
        lastUpdated: new Date().toISOString(),
      },
      {
        id: 2,
        name: "E-commerce Platform",
        description:
          "Full-stack e-commerce solution with React frontend and Node.js backend",
        url: "https://github.com/Revis047/ecommerce",
        homepage: "",
        languages: [
          { name: "JavaScript", color: LANGUAGE_COLORS.JavaScript },
          { name: "React", color: LANGUAGE_COLORS.React },
          { name: "Node.js", color: "#339933" },
        ],
        stars: 12,
        forks: 3,
        topics: ["ecommerce", "react", "nodejs"],
        lastUpdated: new Date().toISOString(),
      },
      {
        id: 3,
        name: "Task Management App",
        description:
          "Collaborative task management application with real-time updates",
        url: "https://github.com/Revis047/task-manager",
        homepage: "",
        languages: [
          { name: "TypeScript", color: LANGUAGE_COLORS.TypeScript },
          { name: "Vue", color: LANGUAGE_COLORS.Vue },
          { name: "Python", color: LANGUAGE_COLORS.Python },
        ],
        stars: 8,
        forks: 1,
        topics: ["productivity", "vue", "python"],
        lastUpdated: new Date().toISOString(),
      },
    ];
  }

  async getSkillsData(): Promise<SkillData[]> {
    try {
      const repos = await this.fetchRepositories();

      if (!Array.isArray(repos) || repos.length === 0) {
        throw new Error("No repositories available for skills analysis");
      }

      // Filter out forks and get active repos
      const filteredRepos = repos
        .filter((repo) => !repo.fork && repo.name)
        .sort(
          (a, b) =>
            new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime(),
        )
        .slice(0, 10); // Analyze top 10 repos to avoid rate limits

      const languageStats: Record<string, number> = {};

      // First pass: collect primary languages from repo data
      filteredRepos.forEach((repo) => {
        if (repo.language) {
          languageStats[repo.language] =
            (languageStats[repo.language] || 0) + 10000; // Base weight
        }
      });

      // Second pass: try to get detailed language data (with timeout)
      for (let i = 0; i < Math.min(filteredRepos.length, 5); i++) {
        const repo = filteredRepos[i];
        try {
          const languagesPromise = this.fetchRepositoryLanguages(repo);
          const timeoutPromise = new Promise<RepoLanguages>((_, reject) =>
            setTimeout(() => reject(new Error("Language fetch timeout")), 2000),
          );

          const languages = await Promise.race([
            languagesPromise,
            timeoutPromise,
          ]);
          Object.entries(languages).forEach(([lang, bytes]) => {
            languageStats[lang] = (languageStats[lang] || 0) + (bytes || 1000);
          });

          // Small delay to respect rate limits
          await new Promise((resolve) => setTimeout(resolve, 100));
        } catch (error) {
          // Skip language details for this repo, continue with others
          console.warn(`Skipped language details for ${repo.name}`);
        }
      }

      const totalBytes = Object.values(languageStats).reduce(
        (sum, bytes) => sum + bytes,
        0,
      );

      if (totalBytes === 0) {
        throw new Error("No language data could be collected");
      }

      const skills = Object.entries(languageStats)
        .map(([name, usage]) => ({
          name,
          usage,
          percentage: (usage / totalBytes) * 100,
          color: LANGUAGE_COLORS[name] || "#6b7280",
        }))
        .sort((a, b) => b.usage - a.usage)
        .slice(0, 15);

      return skills;
    } catch (error) {
      console.warn(
        "GitHub skills analysis failed, using fallback data:",
        error,
      );

      // Return curated skills data
      return this.getFallbackSkills();
    }
  }

  private getFallbackSkills(): SkillData[] {
    return [
      {
        name: "JavaScript",
        usage: 120000,
        percentage: 25.0,
        color: LANGUAGE_COLORS.JavaScript,
      },
      {
        name: "React",
        usage: 85000,
        percentage: 17.7,
        color: LANGUAGE_COLORS.React,
      },
      {
        name: "TypeScript",
        usage: 70000,
        percentage: 14.6,
        color: LANGUAGE_COLORS.TypeScript,
      },
      {
        name: "No-Code/Low-Code",
        usage: 65000,
        percentage: 13.5,
        color: "#ff6b6b",
      },
      {
        name: "AI Agent Workflows",
        usage: 55000,
        percentage: 11.4,
        color: "#4ecdc4",
      },
      { name: "Automation", usage: 45000, percentage: 9.4, color: "#45b7d1" },
      {
        name: "Vue.js",
        usage: 25000,
        percentage: 5.2,
        color: LANGUAGE_COLORS.Vue,
      },
      { name: "Node.js", usage: 20000, percentage: 4.2, color: "#339933" },
      { name: "Next.js", usage: 15000, percentage: 3.1, color: "#000000" },
      {
        name: "API Integration",
        usage: 12000,
        percentage: 2.5,
        color: "#ffeaa7",
      },
      {
        name: "Workflow Design",
        usage: 10000,
        percentage: 2.1,
        color: "#96ceb4",
      },
      {
        name: "Process Optimization",
        usage: 8000,
        percentage: 1.7,
        color: "#dda0dd",
      },
    ];
  }
}

export const githubService = new GitHubService();
export { LANGUAGE_COLORS };
