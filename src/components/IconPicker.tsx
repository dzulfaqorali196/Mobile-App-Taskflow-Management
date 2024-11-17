import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { TouchableRipple } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { VALID_ICONS } from '../constants/icons';

interface IconPickerProps {
  selectedIcon: string;
  onSelectIcon: (icon: string) => void;
}

const IconPicker: React.FC<IconPickerProps> = ({ selectedIcon, onSelectIcon }) => {
  return (
    <ScrollView horizontal>
      {Object.values(VALID_ICONS).map((icon) => (
        <TouchableRipple
          key={icon}
          onPress={() => onSelectIcon(icon)}
          style={[
            styles.iconContainer,
            selectedIcon === icon && styles.selectedIcon,
          ]}
        >
          <Icon name={icon} size={24} />
        </TouchableRipple>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    padding: 12,
    margin: 4,
    borderRadius: 8,
  },
  selectedIcon: {
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
});

export default IconPicker;