import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ThemeState {
  isDarkMode: boolean;
  toggleTheme: () => Promise<void>;
  initializeTheme: () => Promise<void>;
}

export const useThemeStore = create<ThemeState>((set) => ({
  isDarkMode: false,
  toggleTheme: async () => {
    set((state) => {
      const newMode = !state.isDarkMode;
      AsyncStorage.setItem('isDarkMode', JSON.stringify(newMode));
      return { isDarkMode: newMode };
    });
  },
  initializeTheme: async () => {
    try {
      const savedTheme = await AsyncStorage.getItem('isDarkMode');
      if (savedTheme !== null) {
        set({ isDarkMode: JSON.parse(savedTheme) });
      }
    } catch (error) {
      console.error('Error loading theme:', error);
    }
  },
})); 