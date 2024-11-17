import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Text, Chip, IconButton, Avatar } from 'react-native-paper';
import { format } from 'date-fns';
import { Task, TaskPriority, TaskStatus } from '../types';
import { useCategoryStore } from '../store/categoryStore';

interface TaskCardProps {
  task: Task;
  onPress: () => void;
  onStatusChange: (status: TaskStatus) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onPress, onStatusChange }) => {
  const { categories } = useCategoryStore();
  const category = categories.find(c => c.id === task.category_id);

  const priorityColors = {
    [TaskPriority.LOW]: '#4CAF50',
    [TaskPriority.MEDIUM]: '#FFC107',
    [TaskPriority.HIGH]: '#F44336',
  };

  return (
    <Card style={styles.card} onPress={onPress}>
      <Card.Content>
        <Text variant="titleMedium">{task.title}</Text>
        <Text variant="bodyMedium" style={styles.description}>
          {task.description}
        </Text>
        <Text variant="bodySmall" style={styles.deadline}>
          Due: {format(new Date(task.deadline), 'MMM dd, yyyy')}
        </Text>
        {category && (
          <View style={styles.categoryContainer}>
            <Avatar.Icon 
              size={24} 
              icon={category.icon}
              style={[styles.categoryIcon, { backgroundColor: category.color }]}
            />
            <Text style={styles.categoryName}>{category.name}</Text>
          </View>
        )}
        <Chip
          style={[styles.priorityChip, { backgroundColor: priorityColors[task.priority] }]}
          textStyle={styles.priorityText}
        >
          {task.priority}
        </Chip>
      </Card.Content>
      <Card.Actions>
        <IconButton
          icon={task.status === TaskStatus.COMPLETED ? 'check-circle' : 'circle-outline'}
          onPress={() => onStatusChange(
            task.status === TaskStatus.COMPLETED ? TaskStatus.TODO : TaskStatus.COMPLETED
          )}
        />
      </Card.Actions>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 12,
    elevation: 2,
  },
  description: {
    marginTop: 8,
    marginBottom: 8,
  },
  deadline: {
    color: '#666',
    marginBottom: 8,
  },
  priorityChip: {
    alignSelf: 'flex-start',
  },
  priorityText: {
    color: 'white',
  },
  categoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryIcon: {
    marginRight: 8,
  },
  categoryName: {
    fontWeight: 'bold',
  },
});

export default TaskCard;