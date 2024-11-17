import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { useCategoryStore } from '../store/categoryStore';
import CategoryList from '../components/CategoryList';
import AddCategoryFAB from '../components/AddCategoryFAB';
import CategoryFormModal from '../components/CategoryFormModal';
import { Category } from '../types';

const CategoriesScreen = () => {
  const { categories, fetchCategories } = useCategoryStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCategoryPress = (category: Category) => {
    setSelectedCategory(category);
    setIsModalVisible(true);
  };

  const handleAddCategory = () => {
    setSelectedCategory(null);
    setIsModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Search categories"
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchbar}
      />
      <CategoryList
        categories={filteredCategories}
        onCategoryPress={handleCategoryPress}
      />
      <AddCategoryFAB onPress={handleAddCategory} />
      <CategoryFormModal
        visible={isModalVisible}
        category={selectedCategory}
        onDismiss={() => setIsModalVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  searchbar: {
    margin: 16,
    elevation: 4,
  },
});

export default CategoriesScreen;