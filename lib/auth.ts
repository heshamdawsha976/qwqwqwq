// Simple authentication system for demo purposes
export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  plan: 'basic' | 'advanced' | 'pro';
  avatar?: string;
}

export interface AuthState {
  user: AuthUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

// Mock authentication service
class AuthService {
  private static instance: AuthService;
  private currentUser: AuthUser | null = null;

  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  async login(email: string, password: string): Promise<AuthUser> {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Mock user data
    const mockUser: AuthUser = {
      id: '1',
      name: 'أحمد محمد',
      email: email,
      role: email.includes('admin') ? 'admin' : 'user',
      plan: 'advanced',
      avatar: '/placeholder-user.jpg'
    };

    this.currentUser = mockUser;
    
    // Store in localStorage for persistence
    if (typeof window !== 'undefined') {
      localStorage.setItem('auth_user', JSON.stringify(mockUser));
    }

    return mockUser;
  }

  async register(name: string, email: string, password: string): Promise<AuthUser> {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    const newUser: AuthUser = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      email,
      role: 'user',
      plan: 'basic'
    };

    this.currentUser = newUser;
    
    if (typeof window !== 'undefined') {
      localStorage.setItem('auth_user', JSON.stringify(newUser));
    }

    return newUser;
  }

  async logout(): Promise<void> {
    this.currentUser = null;
    
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_user');
    }
  }

  getCurrentUser(): AuthUser | null {
    if (this.currentUser) {
      return this.currentUser;
    }

    // Try to get from localStorage
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('auth_user');
      if (stored) {
        try {
          this.currentUser = JSON.parse(stored);
          return this.currentUser;
        } catch {
          localStorage.removeItem('auth_user');
        }
      }
    }

    return null;
  }

  isAuthenticated(): boolean {
    return this.getCurrentUser() !== null;
  }

  isAdmin(): boolean {
    const user = this.getCurrentUser();
    return user?.role === 'admin';
  }

  async refreshToken(): Promise<AuthUser | null> {
    // In a real app, this would refresh the JWT token
    return this.getCurrentUser();
  }

  async updateProfile(updates: Partial<Pick<AuthUser, 'name' | 'avatar'>>): Promise<AuthUser> {
    const currentUser = this.getCurrentUser();
    if (!currentUser) {
      throw new Error('لم يتم تسجيل الدخول');
    }

    const updatedUser = { ...currentUser, ...updates };
    this.currentUser = updatedUser;

    if (typeof window !== 'undefined') {
      localStorage.setItem('auth_user', JSON.stringify(updatedUser));
    }

    return updatedUser;
  }

  async changePassword(currentPassword: string, newPassword: string): Promise<void> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // In a real app, this would validate current password and update
    console.log('Password changed successfully');
  }

  // Social login methods
  async loginWithGoogle(): Promise<AuthUser> {
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const googleUser: AuthUser = {
      id: 'google_' + Math.random().toString(36).substr(2, 9),
      name: 'مستخدم Google',
      email: 'user@gmail.com',
      role: 'user',
      plan: 'basic',
      avatar: '/placeholder-user.jpg'
    };

    this.currentUser = googleUser;
    
    if (typeof window !== 'undefined') {
      localStorage.setItem('auth_user', JSON.stringify(googleUser));
    }

    return googleUser;
  }

  async requestPasswordReset(email: string): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Password reset email sent to:', email);
  }
}

export const authService = AuthService.getInstance();

// React hook for authentication
import { useState, useEffect } from 'react';

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isLoading: true,
    isAuthenticated: false
  });

  useEffect(() => {
    const initAuth = async () => {
      try {
        const user = await authService.refreshToken();
        setAuthState({
          user,
          isLoading: false,
          isAuthenticated: !!user
        });
      } catch {
        setAuthState({
          user: null,
          isLoading: false,
          isAuthenticated: false
        });
      }
    };

    initAuth();
  }, []);

  const login = async (email: string, password: string) => {
    setAuthState(prev => ({ ...prev, isLoading: true }));
    try {
      const user = await authService.login(email, password);
      setAuthState({
        user,
        isLoading: false,
        isAuthenticated: true
      });
      return user;
    } catch (error) {
      setAuthState(prev => ({ ...prev, isLoading: false }));
      throw error;
    }
  };

  const register = async (name: string, email: string, password: string) => {
    setAuthState(prev => ({ ...prev, isLoading: true }));
    try {
      const user = await authService.register(name, email, password);
      setAuthState({
        user,
        isLoading: false,
        isAuthenticated: true
      });
      return user;
    } catch (error) {
      setAuthState(prev => ({ ...prev, isLoading: false }));
      throw error;
    }
  };

  const logout = async () => {
    await authService.logout();
    setAuthState({
      user: null,
      isLoading: false,
      isAuthenticated: false
    });
  };

  return {
    ...authState,
    login,
    register,
    logout,
    updateProfile: authService.updateProfile.bind(authService),
    changePassword: authService.changePassword.bind(authService),
    loginWithGoogle: authService.loginWithGoogle.bind(authService),
    requestPasswordReset: authService.requestPasswordReset.bind(authService)
  };
}