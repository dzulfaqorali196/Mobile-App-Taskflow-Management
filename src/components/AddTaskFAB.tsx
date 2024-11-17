import React from 'react';
import { StyleSheet } from 'react-native';
import { FAB } from 'react-native-paper';

interface AddTaskFABProps {
  onPress: () => void;
}

const AddTaskFAB: React.FC<AddTaskFABProps> = ({ onPress }) => {
  return (
    <FAB
      icon="plus"
      style={styles.fab}
      onPress={onPress}
    />
  );
};

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default AddTaskFAB;