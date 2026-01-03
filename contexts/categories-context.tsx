"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { get } from "@/app/utils/apiMethods";
export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  createdAt: string;
}

interface CategoriesContextType {
  categories: Category[];
  addCategory: (category: Omit<Category, "id" | "createdAt">) => Promise<boolean>;
  updateCategory: (id: string, category: Partial<Category>) => Promise<boolean>;
  deleteCategory: (id: string) => Promise<boolean>;
  isLoading: boolean;
  refreshCategories: () => Promise<void>;
}

const CategoriesContext = createContext<CategoriesContextType | undefined>(
  undefined
);

import { API_ENDPOINTS } from "@/lib/api-config";

const API_BASE_URL = API_ENDPOINTS.CATEGORIES.BASE;

// Transform API response to frontend format
const transformCategory = (apiCategory: any): Category => ({
  id: String(apiCategory.id),
  name: apiCategory.name,
  slug: apiCategory.slug,
  description: apiCategory.description || "",
  createdAt: apiCategory.created_at
    ? new Date(apiCategory.created_at).toLocaleDateString()
    : new Date().toISOString().split("T")[0],
});

export function CategoriesProvider({ children }: { children: ReactNode }) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch categories from API
  const fetchCategories = async () => {
    try {
      setIsLoading(true);
      // const response = await fetch(API_BASE_URL);
      const response = await get(`${API_BASE_URL}`)

      if (!response.success) {
        throw new Error('Failed to fetch categories');
      }

      // const result = await response.json();

      if (response.success) {
        const transformedCategories = response.data.map(transformCategory);
        setCategories(transformedCategories);
      } else {
        console.error("Failed to fetch categories:", response.message);
        setCategories([]);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      setCategories([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const addCategory = async (categoryData: Omit<Category, "id" | "createdAt">): Promise<boolean> => {
    try {
      const slug = categoryData.slug || categoryData.name.toLowerCase().replace(/\s+/g, "-");

      const response = await fetch(API_BASE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: categoryData.name,
          slug: slug,
          description: categoryData.description || null,
        }),
      });

      const result = await response.json();

      if (result.success) {
        await fetchCategories(); // Refresh the list
        return true;
      } else {
        console.error("Failed to create category:", result.message);
        return false;
      }
    } catch (error) {
      console.error("Error creating category:", error);
      return false;
    }
  };

  const updateCategory = async (id: string, categoryData: Partial<Category>): Promise<boolean> => {
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: categoryData.name,
          slug: categoryData.slug,
          description: categoryData.description || null,
        }),
      });

      const result = await response.json();

      if (result.success) {
        await fetchCategories(); // Refresh the list
        return true;
      } else {
        console.error("Failed to update category:", result.message);
        return false;
      }
    } catch (error) {
      console.error("Error updating category:", error);
      return false;
    }
  };

  const deleteCategory = async (id: string): Promise<boolean> => {
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: "DELETE",
      });

      const result = await response.json();

      if (result.success) {
        await fetchCategories(); // Refresh the list
        return true;
      } else {
        console.error("Failed to delete category:", result.message);
        return false;
      }
    } catch (error) {
      console.error("Error deleting category:", error);
      return false;
    }
  };

  return (
    <CategoriesContext.Provider
      value={{
        categories,
        addCategory,
        updateCategory,
        deleteCategory,
        isLoading,
        refreshCategories: fetchCategories,
      }}
    >
      {children}
    </CategoriesContext.Provider>
  );
}

export function useCategories() {
  const context = useContext(CategoriesContext);
  if (context === undefined) {
    throw new Error("useCategories must be used within a CategoriesProvider");
  }
  return context;
}

