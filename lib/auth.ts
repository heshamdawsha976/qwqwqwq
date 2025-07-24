// Simple local authentication service
import { v4 as uuidv4 } from 'uuid';

export interface AuthUser {
  id: string;
  email: string;
  full_name?: string;
  subscription_plan: "free" | "basic" | "advanced" | "pro";
  subscription_status: "active" | "inactive" | "expired";
}

// Simple local storage based auth (for demo purposes)
export class AuthService {
  private static STORAGE_KEY = 'chat2site_user';

  static async signUp(email: string, password: string, fullName?: string) {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const user: AuthUser = {
      id: uuidv4(),
      email,
      full_name: fullName,
      subscription_plan: "free",
      subscription_status: "inactive",
    };

    // Store in localStorage (in real app, this would be in a database)
    if (typeof window !== 'undefined') {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(user));
    }

    return { user };
  }

  static async signIn(email: string, password: string) {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // For demo, accept any email/password
    const user: AuthUser = {
      id: uuidv4(),
      email,
      full_name: email.split('@')[0],
      subscription_plan: "basic",
      subscription_status: "active",
    };

    if (typeof window !== 'undefined') {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(user));
    }

    return { user };
  }

  static async signOut() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(this.STORAGE_KEY);
    }
  }

  static async getCurrentUser(): Promise<AuthUser | null> {
    if (typeof window === 'undefined') return null;
    
    const userData = localStorage.getItem(this.STORAGE_KEY);
    if (!userData) return null;

    try {
      return JSON.parse(userData);
    } catch {
      return null;
    }
  }

  static async updateProfile(updates: Partial<AuthUser>) {
    const currentUser = await this.getCurrentUser();
    if (!currentUser) throw new Error("Not authenticated");

    const updatedUser = { ...currentUser, ...updates };
    
    if (typeof window !== 'undefined') {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(updatedUser));
    }
  }
}
