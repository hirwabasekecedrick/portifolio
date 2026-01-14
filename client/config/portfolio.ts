// Portfolio Configuration
// Update these values to customize your portfolio

export const PORTFOLIO_CONFIG = {
  // Personal Information
  name: 'Hirwa Baseke Cedrick',
  bio: 'Full-stack developer passionate about creating beautiful, functional web experiences. Currently building modern web applications with React, TypeScript, and Node.js.',
  location: 'Global',
  email: 'hirwabasekecedrick@gmail.com',
  
  // GitHub Configuration
  // Set this to your actual GitHub username to fetch real data
  // Leave empty or set to null to use fallback data
  githubUsername: 'hirwabasekecedrick', // Change this to your real GitHub username

  // Social Links
  githubUrl: 'https://github.com/hirwabasekecedrick',
  linkedinUrl: 'https://linkedin.com/in/yourprofile',
  blogUrl: null,
  twitterUsername: null,
  
  // Contact Information
  contactEmail: 'hirwabasekecedrick@gmail.com',
  
  // If GitHub data fails, these will be used as fallback
  fallbackStats: {
    publicRepos: 15,
    followers: 50,
    following: 30,
  }
};

// Note: If your GitHub username doesn't exist or is private, 
// the portfolio will automatically use the fallback data above.
// To fetch real data, make sure:
// 1. Your GitHub username is correct
// 2. Your GitHub profile is public
// 3. You have at least one public repository
