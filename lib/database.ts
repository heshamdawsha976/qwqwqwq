// Simple JSON-based database for demo purposes
export interface User {
  id: string;
  name: string;
  email: string;
  plan: 'basic' | 'advanced' | 'pro';
  createdAt: Date;
  websites: Website[];
}

export interface Website {
  id: string;
  userId: string;
  name: string;
  domain: string;
  template: string;
  status: 'draft' | 'published' | 'suspended';
  createdAt: Date;
  customizations: {
    colors: string[];
    content: Record<string, string>;
    sections: string[];
  };
}

export interface Order {
  id: string;
  userId: string;
  plan: 'basic' | 'advanced' | 'pro';
  amount: number;
  currency: string;
  status: 'pending' | 'paid' | 'failed' | 'refunded';
  transactionHash?: string;
  createdAt: Date;
  completedAt?: Date;
}

// Mock data storage (in real app, this would be a proper database)
const mockData = {
  users: [] as User[],
  websites: [] as Website[],
  orders: [] as Order[],
};

// Convenience functions for API compatibility
export async function getOrders(): Promise<Order[]> {
  return OrderService.getAll();
}

export async function createOrder(orderData: Omit<Order, 'id' | 'createdAt' | 'status'>): Promise<Order> {
  return OrderService.create(orderData);
}

// User operations
export class UserService {
  static async create(userData: Omit<User, 'id' | 'createdAt' | 'websites'>): Promise<User> {
    const user: User = {
      ...userData,
      id: generateId(),
      createdAt: new Date(),
      websites: [],
    };
    
    mockData.users.push(user);
    return user;
  }

  static async findById(id: string): Promise<User | null> {
    return mockData.users.find(user => user.id === id) || null;
  }

  static async findByEmail(email: string): Promise<User | null> {
    return mockData.users.find(user => user.email === email) || null;
  }

  static async update(id: string, updates: Partial<User>): Promise<User | null> {
    const userIndex = mockData.users.findIndex(user => user.id === id);
    if (userIndex === -1) return null;

    mockData.users[userIndex] = { ...mockData.users[userIndex], ...updates };
    return mockData.users[userIndex];
  }

  static async getAll(): Promise<User[]> {
    return mockData.users;
  }
}

// Website operations
export class WebsiteService {
  static async create(websiteData: Omit<Website, 'id' | 'createdAt'>): Promise<Website> {
    const website: Website = {
      ...websiteData,
      id: generateId(),
      createdAt: new Date(),
    };
    
    mockData.websites.push(website);
    return website;
  }

  static async findById(id: string): Promise<Website | null> {
    return mockData.websites.find(website => website.id === id) || null;
  }

  static async findByUserId(userId: string): Promise<Website[]> {
    return mockData.websites.filter(website => website.userId === userId);
  }

  static async update(id: string, updates: Partial<Website>): Promise<Website | null> {
    const websiteIndex = mockData.websites.findIndex(website => website.id === id);
    if (websiteIndex === -1) return null;

    mockData.websites[websiteIndex] = { ...mockData.websites[websiteIndex], ...updates };
    return mockData.websites[websiteIndex];
  }

  static async delete(id: string): Promise<boolean> {
    const websiteIndex = mockData.websites.findIndex(website => website.id === id);
    if (websiteIndex === -1) return false;

    mockData.websites.splice(websiteIndex, 1);
    return true;
  }

  static async getAll(): Promise<Website[]> {
    return mockData.websites;
  }
}

// Order operations
export class OrderService {
  static async create(orderData: Omit<Order, 'id' | 'createdAt' | 'status'>): Promise<Order> {
    const order: Order = {
      ...orderData,
      id: generateId(),
      status: 'pending',
      createdAt: new Date(),
    };
    
    mockData.orders.push(order);
    return order;
  }

  static async findById(id: string): Promise<Order | null> {
    return mockData.orders.find(order => order.id === id) || null;
  }

  static async findByUserId(userId: string): Promise<Order[]> {
    return mockData.orders.filter(order => order.userId === userId);
  }

  static async update(id: string, updates: Partial<Order>): Promise<Order | null> {
    const orderIndex = mockData.orders.findIndex(order => order.id === id);
    if (orderIndex === -1) return null;

    mockData.orders[orderIndex] = { ...mockData.orders[orderIndex], ...updates };
    return mockData.orders[orderIndex];
  }

  static async getAll(): Promise<Order[]> {
    return mockData.orders;
  }

  static async getStats() {
    const orders = mockData.orders;
    const totalRevenue = orders
      .filter(order => order.status === 'paid')
      .reduce((sum, order) => sum + order.amount, 0);

    const monthlyRevenue = orders
      .filter(order => {
        const orderDate = new Date(order.createdAt);
        const currentDate = new Date();
        return orderDate.getMonth() === currentDate.getMonth() &&
               orderDate.getFullYear() === currentDate.getFullYear() &&
               order.status === 'paid';
      })
      .reduce((sum, order) => sum + order.amount, 0);

    return {
      totalOrders: orders.length,
      totalRevenue,
      monthlyRevenue,
      pendingOrders: orders.filter(order => order.status === 'pending').length,
      completedOrders: orders.filter(order => order.status === 'paid').length,
    };
  }
}

// Utility functions
function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
}

// Analytics service
export class AnalyticsService {
  static async getOverallStats() {
    const users = await UserService.getAll();
    const websites = await WebsiteService.getAll();
    const orders = await OrderService.getAll();
    const orderStats = await OrderService.getStats();

    return {
      totalUsers: users.length,
      totalWebsites: websites.length,
      publishedWebsites: websites.filter(w => w.status === 'published').length,
      ...orderStats,
      conversionRate: users.length > 0 ? (orderStats.completedOrders / users.length) * 100 : 0,
    };
  }

  static async getUserGrowth() {
    const users = await UserService.getAll();
    const last30Days = new Date();
    last30Days.setDate(last30Days.getDate() - 30);

    const newUsers = users.filter(user => new Date(user.createdAt) >= last30Days);
    
    return {
      total: users.length,
      newThisMonth: newUsers.length,
      growthRate: users.length > 0 ? (newUsers.length / users.length) * 100 : 0,
    };
  }
}