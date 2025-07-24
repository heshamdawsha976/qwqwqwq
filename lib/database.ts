// Database utilities for simple JSON file storage
import * as fs from 'fs/promises';
import * as path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');

// Ensure data directory exists
export async function ensureDataDir() {
  try {
    await fs.access(DATA_DIR);
  } catch {
    await fs.mkdir(DATA_DIR, { recursive: true });
  }
}

// Generic function to read JSON file
export async function readJsonFile<T>(filename: string, defaultData: T): Promise<T> {
  await ensureDataDir();
  const filePath = path.join(DATA_DIR, filename);
  
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data);
  } catch {
    // File doesn't exist, create it with default data
    await writeJsonFile(filename, defaultData);
    return defaultData;
  }
}

// Generic function to write JSON file
export async function writeJsonFile<T>(filename: string, data: T): Promise<void> {
  await ensureDataDir();
  const filePath = path.join(DATA_DIR, filename);
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
}

// Order management
export interface Order {
  id: string;
  customerName: string;
  email: string;
  phone?: string;
  websiteType: 'restaurant' | 'shop' | 'clinic' | 'portfolio' | 'business';
  plan: 'basic' | 'advanced' | 'pro';
  amount: number;
  currency: 'USD' | 'SAR';
  status: 'pending' | 'paid' | 'cancelled';
  paymentId?: string;
  websiteData: {
    title: string;
    description: string;
    sections: string[];
    colors: string[];
    customizations: Record<string, any>;
  };
  createdAt: string;
  updatedAt: string;
  deliveredAt?: string;
}

export interface OrdersData {
  orders: Order[];
  nextId: number;
}

export async function getOrders(): Promise<Order[]> {
  const data = await readJsonFile<OrdersData>('orders.json', { orders: [], nextId: 1 });
  return data.orders;
}

export async function createOrder(order: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>): Promise<Order> {
  const data = await readJsonFile<OrdersData>('orders.json', { orders: [], nextId: 1 });
  
  const newOrder: Order = {
    ...order,
    id: `ORDER${data.nextId.toString().padStart(3, '0')}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  
  data.orders.push(newOrder);
  data.nextId += 1;
  
  await writeJsonFile('orders.json', data);
  return newOrder;
}

export async function updateOrder(id: string, updates: Partial<Order>): Promise<Order | null> {
  const data = await readJsonFile<OrdersData>('orders.json', { orders: [], nextId: 1 });
  
  const orderIndex = data.orders.findIndex(order => order.id === id);
  if (orderIndex === -1) return null;
  
  data.orders[orderIndex] = {
    ...data.orders[orderIndex],
    ...updates,
    updatedAt: new Date().toISOString(),
  };
  
  await writeJsonFile('orders.json', data);
  return data.orders[orderIndex];
}
