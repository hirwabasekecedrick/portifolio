import { RequestHandler } from "express";

const GITHUB_API_BASE = 'https://api.github.com';

// Get headers with optional token
const getGitHubHeaders = () => {
  const headers: Record<string, string> = {
    'Accept': 'application/vnd.github.v3+json',
    'User-Agent': 'Portfolio-App-Revis047',
    'X-GitHub-Api-Version': '2022-11-28'
  };

  // Add token if available (increases rate limit from 60 to 5000 per hour)
  if (process.env.GITHUB_TOKEN) {
    headers['Authorization'] = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  return headers;
};

// Proxy for GitHub user data
export const getGitHubUser: RequestHandler = async (req, res) => {
  try {
    const { username } = req.params;

    const response = await fetch(`${GITHUB_API_BASE}/users/${username}`, {
      headers: getGitHubHeaders(),
    });

    if (!response.ok) {
      return res.status(response.status).json({ 
        error: `GitHub API error: ${response.statusText}` 
      });
    }

    const userData = await response.json();
    res.json(userData);
  } catch (error) {
    console.error('GitHub user fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch user data' });
  }
};

// Proxy for GitHub repositories
export const getGitHubRepos: RequestHandler = async (req, res) => {
  try {
    const { username } = req.params;
    
    const response = await fetch(
      `${GITHUB_API_BASE}/users/${username}/repos?sort=updated&per_page=30&type=all`,
      {
        headers: getGitHubHeaders(),
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
    console.error('GitHub repos fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch repositories' });
  }
};

// Proxy for repository languages
export const getRepoLanguages: RequestHandler = async (req, res) => {
  try {
    const { username, repo } = req.params;
    
    const response = await fetch(
      `${GITHUB_API_BASE}/repos/${username}/${repo}/languages`,
      {
        headers: getGitHubHeaders(),
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
    console.error('GitHub languages fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch repository languages' });
  }
};
