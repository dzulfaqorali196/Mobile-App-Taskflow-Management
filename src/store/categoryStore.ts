import create from 'zustand';
import { Category } from '../types';
import { getDatabase } from '../utils/database';

interface CategoryStore {
  categories: Category[];
  loading: boolean;
  error: string | null;
  fetchCategories: () => Promise<void>;
  addCategory: (category: Omit<Category, 'id'>) => Promise<void>;
  updateCategory: (category: Category) => Promise<void>;
  deleteCategory: (id: number) => Promise<void>;
}

export const useCategoryStore = create<CategoryStore>((set, get) => ({
  categories: [],
  loading: false,
  error: null,

  fetchCategories: async () => {
    set({ loading: true });
    try {
      const db = await getDatabase();
      const result = await new Promise<Category[]>((resolve, reject) => {
        db.transaction(tx => {
          tx.executeSql(
            'SELECT * FROM categories ORDER BY name ASC',
            [],
            (_, { rows: { _array } }) => resolve(_array),
            (_, error) => {
              reject(error);
              return false;
            }
          );
        });
      });
      set({ categories: result, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  addCategory: async (category) => {
    try {
      const db = await getDatabase();
      await new Promise((resolve, reject) => {
        db.transaction(tx => {
          tx.executeSql(
            'INSERT INTO categories (name, color, icon) VALUES (?, ?, ?)',
            [category.name, category.color, category.icon],
            (_, result) => resolve(result),
            (_, error) => {
              reject(error);
              return false;
            }
          );
        });
      });
      get().fetchCategories();
    } catch (error) {
      set({ error: error.message });
    }
  },

  updateCategory: async (category) => {
    try {
      const db = await getDatabase();
      await new Promise((resolve, reject) => {
        db.transaction(tx => {
          tx.executeSql(
            'UPDATE categories SET name = ?, color = ?, icon = ? WHERE id = ?',
            [category.name, category.color, category.icon, category.id],
            (_, result) => resolve(result),
            (_, error) => {
              reject(error);
              return false;
            }
          );
        });
      });
      get().fetchCategories();
    } catch (error) {
      set({ error: error.message });
    }
  },

  deleteCategory: async (id) => {
    try {
      const db = await getDatabase();
      await new Promise((resolve, reject) => {
        db.transaction(tx => {
          tx.executeSql(
            'DELETE FROM categories WHERE id = ?',
            [id],
            (_, result) => resolve(result),
            (_, error) => {
              reject(error);
              return false;
            }
          );
        });
      });
      get().fetchCategories();
    } catch (error) {
      set({ error: error.message });
    }
  },
}));