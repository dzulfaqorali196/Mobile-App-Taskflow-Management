import React from 'react';
import { View, StyleSheet } from 'react-native';
import { List, Avatar } from 'react-native-paper';
import { Category } from '../types';
import { useCategoryStore } from '../store/categoryStore';

interface CategoryPickerProps {
  selectedCategoryId: number | null;
  onSelectCategory: (categoryId: number) => void;
}

const CategoryPicker: React.FC<CategoryPickerProps> = ({ selectedCategoryId, onSelectCategory }) => {
  const { categories } = useCategoryStore();

  return (
    <View>
      {categories.map((category) => (
        <List.Item
          key={category.id}
          title={category.name}
          left={() => (
            <Avatar.Icon 
              size={40} 
              icon={category.icon}
              style={{ backgroundColor: category.color }}
            />
          )}
          onPress={() => onSelectCategory(category.id)}
          style={[
            styles.item,
            selectedCategoryId === category.id && styles.selectedItem
          ]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    borderRadius: 8,
    marginVertical: 4,
  },
  selectedItem: {
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
});

export default CategoryPicker; 