import React from 'react';
import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { Provider as PaperProvider, MD3DarkTheme, MD3LightTheme } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import Navigation from './src/navigation';
import { DatabaseProvider } from './src/context/DatabaseContext';
import { ThemeProvider, useTheme } from './src/context/ThemeContext';

const ThemedApp = () => {
  const { isDarkMode } = useTheme();
  
  const paperTheme = {
    ...isDarkMode ? MD3DarkTheme : MD3LightTheme,
    colors: {
      ...(isDarkMode ? MD3DarkTheme.colors : MD3LightTheme.colors),
      primary: '#6200ee',
      background: isDarkMode ? '#121212' : '#f5f5f5',
      surface: isDarkMode ? '#1e1e1e' : '#ffffff',
      text: isDarkMode ? '#ffffff' : '#000000',
    },
  };

  const navigationTheme = {
    ...(isDarkMode ? DarkTheme : DefaultTheme),
    colors: {
      ...(isDarkMode ? DarkTheme.colors : DefaultTheme.colors),
      background: isDarkMode ? '#121212' : '#f5f5f5',
    },
  };

  return (
    <PaperProvider theme={paperTheme}>
      <NavigationContainer theme={navigationTheme}>
        <Navigation />
        <StatusBar style={isDarkMode ? "light" : "dark"} />
      </NavigationContainer>
    </PaperProvider>
  );
};

export default function App() {
  return (
    <DatabaseProvider>
      <ThemeProvider>
        <ThemedApp />
      </ThemeProvider>
    </DatabaseProvider>
  );
}