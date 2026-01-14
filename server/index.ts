import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import {
  getGitHubUser,
  getGitHubRepos,
  getRepoLanguages,
} from "./routes/github";
import { login, getProfile } from "./routes/auth";
import { sendContactEmail, getContactConfig } from "./routes/email";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);

  // GitHub proxy routes
  app.get("/api/github/user/:username", getGitHubUser);
  app.get("/api/github/repos/:username", getGitHubRepos);
  app.get("/api/github/repos/:username/:repo/languages", getRepoLanguages);

  // Authentication routes
  app.post("/api/auth/login", login);
  app.get("/api/auth/profile/:userId", getProfile);

  // Email routes
  app.post("/api/contact/send", sendContactEmail);
  app.get("/api/contact/config", getContactConfig);

  return app;
}
