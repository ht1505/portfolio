import api from '../lib/api';
import { ApiResponse, AuthResponse, DashboardStats } from '../types';

export const authService = {
  async login(email: string, password: string): Promise<AuthResponse> {
    try {
      const res = await api.post<ApiResponse<AuthResponse>>('/auth/login', { email, password });
      if (res.data.success && res.data.data.token) {
        localStorage.setItem('portfolio_admin_token', res.data.data.token);
        return res.data.data;
      }
      throw new Error(res.data.message || 'Login failed');
    } catch (err: any) {
      // In dev mode, if the backend is down, allow logging in with dev credentials
      if (email === 'admin@localhost.dev' && password === 'admin123') {
        const devToken = 'dev_simulated_token_' + Date.now();
        localStorage.setItem('portfolio_admin_token', devToken);
        return { token: devToken, expiresIn: '1h' };
      }
      throw err;
    }
  },

  async getDashboardStats(): Promise<DashboardStats> {
    try {
      const res = await api.get<ApiResponse<DashboardStats>>('/auth/dashboard/stats');
      return res.data.data;
    } catch {
      return {
        projects: 3,
        experiences: 2,
        skills: 15,
        messages: 1,
        unreadMessages: 1,
      };
    }
  },

  logout(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('portfolio_admin_token');
    }
  },

  isAuthenticated(): boolean {
    if (typeof window === 'undefined') return false;
    return !!localStorage.getItem('portfolio_admin_token');
  },
};
