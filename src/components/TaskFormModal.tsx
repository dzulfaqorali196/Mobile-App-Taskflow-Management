import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { Modal, Portal, TextInput, Button, SegmentedButtons } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Task, TaskPriority, TaskStatus } from '../types';
import { useTaskStore } from '../store/taskStore';
import CategoryPicker from './CategoryPicker';
import { useTheme } from '../context/ThemeContext';

interface TaskFormModalProps {
  visible: boolean;
  task?: Task | null;
  onDismiss: () => void;
}

const TaskFormModal: React.FC<TaskFormModalProps> = ({ visible, task, onDismiss }) => {
  const { addTask, updateTask } = useTaskStore();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState(new Date());
  const [priority, setPriority] = useState(TaskPriority.MEDIUM);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const { isDarkMode } = useTheme();

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description || '');
      setDeadline(new Date(task.deadline));
      setPriority(task.priority);
      setCategoryId(task.category_id);
    } else {
      resetForm();
    }
  }, [task]);

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setDeadline(new Date());
    setPriority(TaskPriority.MEDIUM);
    setCategoryId(null);
  };

  const handleSubmit = () => {
    if (title.trim()) {
      const taskData = {
        title: title.trim(),
        description: description.trim(),
        deadline: deadline.toISOString(),
        priority,
        category_id: categoryId || 1,
        status: TaskStatus.TODO,
      };

      if (task) {
        updateTask({ ...taskData, id: task.id });
      } else {
        addTask(taskData);
      }
      
      resetForm();
      onDismiss();
    }
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
      setDeadline(selectedDate);
    }
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
    priority: {
      marginVertical: 16,
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
      <Modal visible={visible} onDismiss={onDismiss} contentContainerStyle={styles.container}>
        <TextInput
          label="Title"
          value={title}
          onChangeText={setTitle}
          style={styles.input}
        />
        <TextInput
          label="Description"
          value={description}
          onChangeText={setDescription}
          multiline
          style={styles.input}
        />
        <Button 
          mode="outlined" 
          onPress={() => setShowDatePicker(true)}
          style={styles.input}
        >
          Deadline: {deadline.toLocaleDateString()}
        </Button>
        
        {showDatePicker && (
          <DateTimePicker
            value={deadline}
            mode="date"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={handleDateChange}
          />
        )}

        <CategoryPicker
          selectedCategoryId={categoryId}
          onSelectCategory={setCategoryId}
        />

        <SegmentedButtons
          value={priority}
          onValueChange={(value) => setPriority(value as TaskPriority)}
          buttons={[
            { value: TaskPriority.LOW, label: 'Low' },
            { value: TaskPriority.MEDIUM, label: 'Medium' },
            { value: TaskPriority.HIGH, label: 'High' },
          ]}
          style={styles.priority}
        />

        <View style={styles.buttons}>
          <Button onPress={onDismiss} style={styles.button}>Cancel</Button>
          <Button mode="contained" onPress={handleSubmit} style={styles.button}>
            {task ? 'Update' : 'Add'}
          </Button>
        </View>
      </Modal>
    </Portal>
  );
};

export default TaskFormModal;