import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { Category } from '../types';
import CategoryCard from './CategoryCard';

interface CategoryListProps {
  categories: Category[];
  onCategoryPress: (category: Category) => void;
}

const CategoryList: React.FC<CategoryListProps> = ({ categories, onCategoryPress }) => {
  return (
    <FlatList
      data={categories}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <CategoryCard
          category={item}
          onPress={() => onCategoryPress(item)}
        />
      )}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
});

export default CategoryList;