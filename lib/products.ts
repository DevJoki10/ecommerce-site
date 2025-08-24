import { supabase } from './supabase'
import { Database } from '@/types/database'

type Product = Database['public']['Tables']['products']['Row']
type Category = Database['public']['Tables']['categories']['Row']

export interface ProductWithCategory extends Product {
  category: Category | null
}

export const products = {
  // Get all products with pagination and filters
  async getProducts(options: {
    page?: number
    limit?: number
    category?: string
    search?: string
    minPrice?: number
    maxPrice?: number
    featured?: boolean
    sortBy?: 'name' | 'price' | 'created_at' | 'rating'
    sortOrder?: 'asc' | 'desc'
  } = {}) {
    const {
      page = 1,
      limit = 20,
      category,
      search,
      minPrice,
      maxPrice,
      featured,
      sortBy = 'created_at',
      sortOrder = 'desc'
    } = options

    let query = supabase
      .from('products')
      .select(`
        *,
        category:categories(*)
      `)
      .eq('status', 'active')

    // Apply filters
    if (category) {
      query = query.eq('category.slug', category)
    }

    if (search) {
      query = query.or(`name.ilike.%${search}%,description.ilike.%${search}%,tags.cs.{${search}}`)
    }

    if (minPrice !== undefined) {
      query = query.gte('price', minPrice)
    }

    if (maxPrice !== undefined) {
      query = query.lte('price', maxPrice)
    }

    if (featured !== undefined) {
      query = query.eq('is_featured', featured)
    }

    // Apply sorting
    query = query.order(sortBy, { ascending: sortOrder === 'asc' })

    // Apply pagination
    const from = (page - 1) * limit
    const to = from + limit - 1
    query = query.range(from, to)

    const { data, error, count } = await query

    if (error) throw error

    return {
      products: data as ProductWithCategory[],
      totalCount: count || 0,
      totalPages: Math.ceil((count || 0) / limit),
      currentPage: page
    }
  },

  // Get single product by slug
  async getProductBySlug(slug: string): Promise<ProductWithCategory | null> {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        category:categories(*)
      `)
      .eq('slug', slug)
      .eq('status', 'active')
      .single()

    if (error) {
      if (error.code === 'PGRST116') return null // Not found
      throw error
    }

    // Increment view count
    await supabase
      .from('products')
      .update({ view_count: (data.view_count || 0) + 1 })
      .eq('id', data.id)

    return data as ProductWithCategory
  },

  // Get featured products
  async getFeaturedProducts(limit = 8): Promise<ProductWithCategory[]> {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        category:categories(*)
      `)
      .eq('status', 'active')
      .eq('is_featured', true)
      .order('created_at', { ascending: false })
      .limit(limit)

    if (error) throw error
    return data as ProductWithCategory[]
  },

  // Get products by category
  async getProductsByCategory(categorySlug: string, limit = 20): Promise<ProductWithCategory[]> {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        category:categories!inner(*)
      `)
      .eq('status', 'active')
      .eq('category.slug', categorySlug)
      .order('created_at', { ascending: false })
      .limit(limit)

    if (error) throw error
    return data as ProductWithCategory[]
  },

  // Get new arrivals
  async getNewArrivals(limit = 6): Promise<ProductWithCategory[]> {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        category:categories(*)
      `)
      .eq('status', 'active')
      .order('created_at', { ascending: false })
      .limit(limit)

    if (error) throw error
    return data as ProductWithCategory[]
  },

  // Get today's deals (products with discounts)
  async getTodaysDeals(limit = 6): Promise<ProductWithCategory[]> {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        category:categories(*)
      `)
      .eq('status', 'active')
      .not('compare_price', 'is', null)
      .gt('compare_price', 0)
      .order('created_at', { ascending: false })
      .limit(limit)

    if (error) throw error
    return data as ProductWithCategory[]
  },

  // Search products
  async searchProducts(query: string, limit = 20): Promise<ProductWithCategory[]> {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        category:categories(*)
      `)
      .eq('status', 'active')
      .or(`name.ilike.%${query}%,description.ilike.%${query}%,tags.cs.{${query}}`)
      .order('created_at', { ascending: false })
      .limit(limit)

    if (error) throw error
    return data as ProductWithCategory[]
  },

  // Get related products
  async getRelatedProducts(productId: string, categoryId: string, limit = 4): Promise<ProductWithCategory[]> {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        category:categories(*)
      `)
      .eq('status', 'active')
      .eq('category_id', categoryId)
      .neq('id', productId)
      .order('created_at', { ascending: false })
      .limit(limit)

    if (error) throw error
    return data as ProductWithCategory[]
  }
}