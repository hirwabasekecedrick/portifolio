import path from "path";
import "dotenv/config";
import * as express from "express";
import express__default from "express";
import cors from "cors";
import { z } from "zod";
const handleDemo = (req, res) => {
  const response = {
    message: "Hello from Express server"
  };
  res.status(200).json(response);
};
const GITHUB_API_BASE = "https://api.github.com";
const getGitHubHeaders = () => {
  const headers = {
    "Accept": "application/vnd.github.v3+json",
    "User-Agent": "Portfolio-App-Revis047",
    "X-GitHub-Api-Version": "2022-11-28"
  };
  if (process.env.GITHUB_TOKEN) {
    headers["Authorization"] = `Bearer ${process.env.GITHUB_TOKEN}`;
  }
  return headers;
};
const getGitHubUser = async (req, res) => {
  try {
    const { username } = req.params;
    const response = await fetch(`${GITHUB_API_BASE}/users/${username}`, {
      headers: getGitHubHeaders()
    });
    if (!response.ok) {
      return res.status(response.status).json({
        error: `GitHub API error: ${response.statusText}`
      });
    }
    const userData = await response.json();
    res.json(userData);
  } catch (error) {
    console.error("GitHub user fetch error:", error);
    res.status(500).json({ error: "Failed to fetch user data" });
  }
};
const getGitHubRepos = async (req, res) => {
  try {
    const { username } = req.params;
    const response = await fetch(
      `${GITHUB_API_BASE}/users/${username}/repos?sort=updated&per_page=30&type=all`,
      {
        headers: getGitHubHeaders()
      }
    );
    if (!response.ok) {
      return res.status(response.status).json({
        error: `GitHub API error: ${response.statusText}`
      });
    }
    const reposData = await response.json();
    res.json(reposData);
  } catch (error) {
    console.error("GitHub repos fetch error:", error);
    res.status(500).json({ error: "Failed to fetch repositories" });
  }
};
const getRepoLanguages = async (req, res) => {
  try {
    const { username, repo } = req.params;
    const response = await fetch(
      `${GITHUB_API_BASE}/repos/${username}/${repo}/languages`,
      {
        headers: getGitHubHeaders()
      }
    );
    if (!response.ok) {
      return res.status(response.status).json({
        error: `GitHub API error: ${response.statusText}`
      });
    }
    const languagesData = await response.json();
    res.json(languagesData);
  } catch (error) {
    console.error("GitHub languages fetch error:", error);
    res.status(500).json({ error: "Failed to fetch repository languages" });
  }
};
const users = [];
const loginSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  password: z.string().min(1, "Password is required")
});
const verifyPassword = (password, hash) => {
  return Buffer.from(password).toString("base64") === hash;
};
const login = async (req, res) => {
  try {
    const { fullName, password } = loginSchema.parse(req.body);
    const user = users.find((u) => u.fullName === fullName);
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    if (!verifyPassword(password, user.password)) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const { password: _, ...userWithoutPassword } = user;
    res.json({
      user: userWithoutPassword,
      message: "Login successful"
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        error: error.errors[0].message
      });
    }
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
const getProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = users.find((u) => u.id === userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const { password: _, ...userWithoutPassword } = user;
    res.json({ user: userWithoutPassword });
  } catch (error) {
    console.error("Get profile error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
const emailSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email format"),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters")
});
const sendEmailToOwner = async (data) => {
  console.log("📧 New contact form submission:");
  console.log("From:", data.name, `<${data.email}>`);
  console.log("Subject:", data.subject);
  console.log("Message:", data.message);
  console.log("---");
  return true;
};
const sendContactEmail = async (req, res) => {
  try {
    const { name, email, subject, message } = emailSchema.parse(req.body);
    const success = await sendEmailToOwner({
      name,
      email,
      subject,
      message
    });
    if (success) {
      res.json({
        success: true,
        message: "Your message has been sent successfully! I'll get back to you soon."
      });
    } else {
      res.status(500).json({
        success: false,
        error: "Failed to send email. Please try again later."
      });
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        error: error.errors[0].message
      });
    }
    console.error("Email sending error:", error);
    res.status(500).json({
      success: false,
      error: "Internal server error"
    });
  }
};
const getContactConfig = async (req, res) => {
  res.json({
    ownerEmail: "hirwabasekecedrick@gmail.com",
    ownerName: "Hirwa Baseke Cedrick",
    responseTime: "24 hours",
    availableForWork: true
  });
};
function createServer() {
  const app2 = express__default();
  app2.use(cors());
  app2.use(express__default.json());
  app2.use(express__default.urlencoded({ extended: true }));
  app2.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });
  app2.get("/api/demo", handleDemo);
  app2.get("/api/github/user/:username", getGitHubUser);
  app2.get("/api/github/repos/:username", getGitHubRepos);
  app2.get("/api/github/repos/:username/:repo/languages", getRepoLanguages);
  app2.post("/api/auth/login", login);
  app2.get("/api/auth/profile/:userId", getProfile);
  app2.post("/api/contact/send", sendContactEmail);
  app2.get("/api/contact/config", getContactConfig);
  return app2;
}
const app = createServer();
const port = process.env.PORT || 3e3;
const __dirname$1 = import.meta.dirname;
const distPath = path.join(__dirname$1, "../spa");
app.use(express.static(distPath));
app.get("*", (req, res) => {
  if (req.path.startsWith("/api/") || req.path.startsWith("/health")) {
    return res.status(404).json({ error: "API endpoint not found" });
  }
  res.sendFile(path.join(distPath, "index.html"));
});
app.listen(port, () => {
  console.log(`🚀 Fusion Starter server running on port ${port}`);
  console.log(`📱 Frontend: http://localhost:${port}`);
  console.log(`🔧 API: http://localhost:${port}/api`);
});
process.on("SIGTERM", () => {
  console.log("🛑 Received SIGTERM, shutting down gracefully");
  process.exit(0);
});
process.on("SIGINT", () => {
  console.log("🛑 Received SIGINT, shutting down gracefully");
  process.exit(0);
});
//# sourceMappingURL=node-build.mjs.map
