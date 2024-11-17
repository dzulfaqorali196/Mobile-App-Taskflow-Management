import React from 'react';
import { StyleSheet } from 'react-native';
import { Card, Text, IconButton } from 'react-native-paper';
import { Category } from '../types';

interface CategoryCardProps {
  category: Category;
  onPress: () => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category, onPress }) => {
  return (
    <Card style={[styles.card, { borderLeftColor: category.color }]} onPress={onPress}>
      <Card.Content style={styles.content}>
        <IconButton
          icon={category.icon}
          size={24}
          iconColor={category.color}
        />
        <Text variant="titleMedium" style={styles.name}>
          {category.name}
        </Text>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 12,
    elevation: 2,
    borderLeftWidth: 4,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    marginLeft: 8,
  },
});

export default CategoryCard;