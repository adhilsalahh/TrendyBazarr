import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Product Types
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category_id: string;
  supplier_id: string;
  sku: string;
  quantity: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// Product API Functions
export const productApi = {
  async getAll() {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        categories(name),
        suppliers(company_name),
        product_images(url, is_primary)
      `)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        categories(name),
        suppliers(company_name),
        product_images(url, is_primary)
      `)
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  },

  async create(product: Partial<Product>) {
    const { data, error } = await supabase
      .from('products')
      .insert([product])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async update(id: string, updates: Partial<Product>) {
    const { data, error } = await supabase
      .from('products')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async delete(id: string) {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return true;
  }
};

// Supplier Types
export interface Supplier {
  id: string;
  user_id: string;
  company_name: string;
  business_email: string;
  business_phone: string;
  tax_id: string;
  business_address: string;
  verification_status: 'pending' | 'verified' | 'rejected';
  created_at: string;
  updated_at: string;
}

// Supplier API Functions
export const supplierApi = {
  async getAll() {
    const { data, error } = await supabase
      .from('suppliers')
      .select(`
        *,
        users(email, full_name)
      `)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from('suppliers')
      .select(`
        *,
        users(email, full_name)
      `)
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  },

  async create(supplier: Partial<Supplier>) {
    const { data, error } = await supabase
      .from('suppliers')
      .insert([supplier])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async update(id: string, updates: Partial<Supplier>) {
    const { data, error } = await supabase
      .from('suppliers')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async delete(id: string) {
    const { error } = await supabase
      .from('suppliers')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return true;
  }
};