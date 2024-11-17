import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Modal, Portal, TextInput, Button, IconButton } from 'react-native-paper';
import ColorPicker from './ColorPicker';
import IconPicker from './IconPicker';
import { Category } from '../types';
import { useCategoryStore } from '../store/categoryStore';
import { VALID_ICONS } from '../constants/icons';
import { useTheme } from '../context/ThemeContext';

interface CategoryFormModalProps {
  visible: boolean;
  category?: Category | null;
  onDismiss: () => void;
}

const CategoryFormModal: React.FC<CategoryFormModalProps> = ({ visible, category, onDismiss }) => {
  const { addCategory, updateCategory } = useCategoryStore();
  const [name, setName] = useState('');
  const [color, setColor] = useState('#000000');
  const [icon, setIcon] = useState('folder');
  const { isDarkMode } = useTheme();

  const defaultIcon = VALID_ICONS.HOME;

  useEffect(() => {
    if (category) {
      setName(category.name);
      setColor(category.color);
      setIcon(category.icon);
    } else {
      resetForm();
    }
  }, [category]);

  const resetForm = () => {
    setName('');
    setColor('#000000');
    setIcon('folder');
  };

  const handleSubmit = async () => {
    const categoryData = {
      name,
      color,
      icon,
    };

    if (category) {
      await updateCategory({ ...categoryData, id: category.id });
    } else {
      await addCategory(categoryData);
    }

    resetForm();
    onDismiss();
  };

  const styles = StyleSheet.create({
    container: {
      backgroundColor: isDarkMode ? '#1e1e1e' : 'white',
      padding: 20,
      margin: 20,
      borderRadius: 8,
    },
    input: {
      marginBottom: 16,
    },
    buttons: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      marginTop: 16,
    },
    button: {
      marginLeft: 8,
    },
  });

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={styles.container}
      >
        <TextInput
          label="Category Name"
          value={name}
          onChangeText={setName}
          style={styles.input}
        />
        <ColorPicker
          selectedColor={color}
          onColorChange={setColor}
        />
        <IconPicker
          selectedIcon={icon}
          onSelectIcon={setIcon}
        />
        <View style={styles.buttons}>
          <Button onPress={onDismiss} style={styles.button}>Cancel</Button>
          <Button mode="contained" onPress={handleSubmit} style={styles.button}>
            {category ? 'Update' : 'Create'}
          </Button>
        </View>
      </Modal>
    </Portal>
  );
};

export default CategoryFormModal;