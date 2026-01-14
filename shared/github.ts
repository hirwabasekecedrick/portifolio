export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  languages_url: string;
  stargazers_count: number;
  forks_count: number;
  topics: string[];
  created_at: string;
  updated_at: string;
  pushed_at: string;
}

export interface GitHubUser {
  login: string;
  name: string | null;
  bio: string | null;
  avatar_url: string;
  html_url: string;
  location: string | null;
  email: string | null;
  twitter_username: string | null;
  blog: string | null;
  public_repos: number;
  followers: number;
  following: number;
}

export interface RepoLanguages {
  [key: string]: number;
}

export interface ProjectData {
  id: number;
  name: string;
  description: string;
  url: string;
  homepage: string | null;
  languages: { name: string; color: string; }[];
  stars: number;
  forks: number;
  topics: string[];
  lastUpdated: string;
}

export interface SkillData {
  name: string;
  usage: number;
  percentage: number;
  color: string;
}
