import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Task, TaskStatus } from '../types';
import TaskCard from './TaskCard';

interface TaskListProps {
  tasks: Task[];
  onTaskPress: (task: Task) => void;
  onStatusChange: (taskId: number, status: TaskStatus) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onTaskPress, onStatusChange }) => {
  return (
    <FlatList
      data={tasks}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <TaskCard
          task={item}
          onPress={() => onTaskPress(item)}
          onStatusChange={(status) => onStatusChange(item.id, status)}
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

export default TaskList;