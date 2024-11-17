import React from 'react';
import { StyleSheet } from 'react-native';
import { FAB } from 'react-native-paper';

interface AddCategoryFABProps {
  onPress: () => void;
}

const AddCategoryFAB: React.FC<AddCategoryFABProps> = ({ onPress }) => {
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

export default AddCategoryFAB;