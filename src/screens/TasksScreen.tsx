import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { useTaskStore } from '../store/taskStore';
import TaskList from '../components/TaskList';
import AddTaskFAB from '../components/AddTaskFAB';
import TaskFormModal from '../components/TaskFormModal';
import { Task, TaskStatus } from '../types';
import { useCategoryStore } from '../store/categoryStore';
import { useTheme } from 'react-native-paper';

const TasksScreen = () => {
  const { tasks, fetchTasks, setTaskStatus } = useTaskStore();
  const { categories, fetchCategories } = useCategoryStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const { isDarkMode } = useTheme();

  useEffect(() => {
    fetchTasks();
    fetchCategories();
  }, []);

  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleTaskPress = (task: Task) => {
    setSelectedTask(task);
    setIsModalVisible(true);
  };

  const handleAddTask = () => {
    setSelectedTask(null);
    setIsModalVisible(true);
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDarkMode ? '#121212' : '#f5f5f5',
    },
    searchbar: {
      margin: 16,
      elevation: 4,
    },
  });

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Search tasks"
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchbar}
      />
      <TaskList
        tasks={filteredTasks}
        onTaskPress={handleTaskPress}
        onStatusChange={(taskId, status) => setTaskStatus(taskId, status as TaskStatus)}
      />
      <AddTaskFAB onPress={handleAddTask} />
      <TaskFormModal
        visible={isModalVisible}
        task={selectedTask}
        onDismiss={() => setIsModalVisible(false)}
      />
    </View>
  );
};

export default TasksScreen;