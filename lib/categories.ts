import { supabase } from './supabase'
import { Database } from '@/types/database'

type Category = Database['public']['Tables']['categories']['Row']

export interface CategoryWithChildren extends Category {
  children?: CategoryWithChildren[]
  product_count?: number
}

export const categories = {
  // Get all categories with hierarchy
  async getCategories(): Promise<CategoryWithChildren[]> {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('is_active', true)
      .order('sort_order', { ascending: true })

    if (error) throw error

    // Build hierarchy
    const categoryMap = new Map<string, CategoryWithChildren>()
    const rootCategories: CategoryWithChildren[] = []

    // First pass: create all categories
    data.forEach(category => {
      categoryMap.set(category.id, { ...category, children: [] })
    })

    // Second pass: build hierarchy
    data.forEach(category => {
      const categoryWithChildren = categoryMap.get(category.id)!
      
      if (category.parent_id) {
        const parent = categoryMap.get(category.parent_id)
        if (parent) {
          parent.children!.push(categoryWithChildren)
        }
      } else {
        rootCategories.push(categoryWithChildren)
      }
    })

    return rootCategories
  },

  // Get category by slug
  async getCategoryBySlug(slug: string): Promise<Category | null> {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('slug', slug)
      .eq('is_active', true)
      .single()

    if (error) {
      if (error.code === 'PGRST116') return null // Not found
      throw error
    }

    return data
  },

  // Get category with children
  async getCategoryWithChildren(slug: string): Promise<CategoryWithChildren | null> {
    const category = await this.getCategoryBySlug(slug)
    if (!category) return null

    // Get children
    const { data: children, error } = await supabase
      .from('categories')
      .select('*')
      .eq('parent_id', category.id)
      .eq('is_active', true)
      .order('sort_order', { ascending: true })

    if (error) throw error

    return {
      ...category,
      children: children || []
    }
  },

  // Get main categories (no parent)
  async getMainCategories(): Promise<Category[]> {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .is('parent_id', null)
      .eq('is_active', true)
      .order('sort_order', { ascending: true })

    if (error) throw error
    return data
  },

  // Get subcategories by parent slug
  async getSubcategories(parentSlug: string): Promise<Category[]> {
    const parent = await this.getCategoryBySlug(parentSlug)
    if (!parent) return []

    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('parent_id', parent.id)
      .eq('is_active', true)
      .order('sort_order', { ascending: true })

    if (error) throw error
    return data
  },

  // Get category breadcrumb
  async getCategoryBreadcrumb(slug: string): Promise<Category[]> {
    const breadcrumb: Category[] = []
    let currentSlug = slug

    while (currentSlug) {
      const category = await this.getCategoryBySlug(currentSlug)
      if (!category) break

      breadcrumb.unshift(category)

      if (category.parent_id) {
        const { data: parent } = await supabase
          .from('categories')
          .select('slug')
          .eq('id', category.parent_id)
          .single()

        currentSlug = parent?.slug || ''
      } else {
        break
      }
    }

    return breadcrumb
  }
}