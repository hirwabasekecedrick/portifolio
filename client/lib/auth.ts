// Simple authentication service for dashboard access
export interface AuthUser {
  email: string;
  authenticated: boolean;
}

class AuthService {
  private readonly VALID_EMAIL = 'johnlevy047@gmail.com';
  private readonly VALID_PASSWORD = 'monster';
  private readonly AUTH_KEY = 'portfolio_auth';

  login(email: string, password: string): boolean {
    if (email === this.VALID_EMAIL && password === this.VALID_PASSWORD) {
      const user: AuthUser = { email, authenticated: true };
      localStorage.setItem(this.AUTH_KEY, JSON.stringify(user));
      return true;
    }
    return false;
  }

  logout(): void {
    localStorage.removeItem(this.AUTH_KEY);
  }

  getCurrentUser(): AuthUser | null {
    const stored = localStorage.getItem(this.AUTH_KEY);
    if (stored) {
      try {
        const user = JSON.parse(stored);
        return user.authenticated ? user : null;
      } catch {
        return null;
      }
    }
    return null;
  }

  isAuthenticated(): boolean {
    const user = this.getCurrentUser();
    return user?.authenticated || false;
  }
}

export const authService = new AuthService();
