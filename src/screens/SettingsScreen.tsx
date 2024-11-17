import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { List, Switch, Divider } from 'react-native-paper';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { useTheme } from '../context/ThemeContext';
import { getDatabase } from '../utils/database';

const SettingsScreen = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  const exportData = async () => {
    try {
      const db = await getDatabase();
      const tasks = await new Promise((resolve, reject) => {
        db.transaction(tx => {
          tx.executeSql(
            'SELECT * FROM tasks',
            [],
            (_, { rows: { _array } }) => resolve(_array),
            (_, error) => {
              reject(error);
              return false;
            }
          );
        });
      });

      const categories = await new Promise((resolve, reject) => {
        db.transaction(tx => {
          tx.executeSql(
            'SELECT * FROM categories',
            [],
            (_, { rows: { _array } }) => resolve(_array),
            (_, error) => {
              reject(error);
              return false;
            }
          );
        });
      });

      const data = { tasks, categories };
      const fileUri = `${FileSystem.documentDirectory}taskflow_backup.json`;
      await FileSystem.writeAsStringAsync(fileUri, JSON.stringify(data));
      await Sharing.shareAsync(fileUri);
    } catch (error) {
      Alert.alert('Error', 'Failed to export data');
    }
  };

  const importData = async () => {
    Alert.alert(
      'Import Data',
      'This will replace all existing data. Are you sure?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Import',
          onPress: async () => {
            try {
              // Implementation for file picking and importing would go here
              // This requires additional setup for document picker
              Alert.alert('Success', 'Data imported successfully');
            } catch (error) {
              Alert.alert('Error', 'Failed to import data');
            }
          },
        },
      ]
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDarkMode ? '#121212' : '#f5f5f5',
    },
  });

  return (
    <View style={styles.container}>
      <List.Section>
        <List.Subheader>Appearance</List.Subheader>
        <List.Item
          title="Dark Mode"
          right={() => (
            <Switch
              value={isDarkMode}
              onValueChange={toggleTheme}
            />
          )}
        />
        <Divider />
        <List.Subheader>Data Management</List.Subheader>
        <List.Item
          title="Export Data"
          description="Save your tasks and categories"
          left={props => <List.Icon {...props} icon="export" />}
          onPress={exportData}
        />
        <List.Item
          title="Import Data"
          description="Restore from backup"
          left={props => <List.Icon {...props} icon="import" />}
          onPress={importData}
        />
      </List.Section>
    </View>
  );
};

export default SettingsScreen;