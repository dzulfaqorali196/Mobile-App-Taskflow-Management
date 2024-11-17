import React, { useEffect, useState } from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { Card, Text, ProgressBar } from 'react-native-paper';
import { useTaskStore } from '../store/taskStore';
import { useCategoryStore } from '../store/categoryStore';
import { TaskStatus, TaskPriority } from '../types';

const StatisticsScreen = () => {
  const { tasks } = useTaskStore();
  const totalTasks = tasks.length || 1;

  const getStatusPercentage = (status: TaskStatus) => {
    const count = tasks.filter(task => task.status === status).length;
    return Number(((count / totalTasks) * 100).toFixed(1)) || 0;
  };

  const getPriorityPercentage = (priority: TaskPriority) => {
    const count = tasks.filter(task => task.priority === priority).length;
    return Number(((count / totalTasks) * 100).toFixed(1)) || 0;
  };

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Title title="Task Status" />
        <Card.Content>
          <View style={styles.statItem}>
            <Text>Completed ({getStatusPercentage(TaskStatus.COMPLETED)}%)</Text>
            <ProgressBar progress={getStatusPercentage(TaskStatus.COMPLETED) / 100} />
          </View>
          <View style={styles.statItem}>
            <Text>In Progress ({getStatusPercentage(TaskStatus.IN_PROGRESS)}%)</Text>
            <ProgressBar progress={getStatusPercentage(TaskStatus.IN_PROGRESS) / 100} />
          </View>
          <View style={styles.statItem}>
            <Text>To Do ({getStatusPercentage(TaskStatus.TODO)}%)</Text>
            <ProgressBar progress={getStatusPercentage(TaskStatus.TODO) / 100} />
          </View>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Title title="Task Priority" />
        <Card.Content>
          <View style={styles.statItem}>
            <Text>High ({getPriorityPercentage(TaskPriority.HIGH)}%)</Text>
            <ProgressBar progress={getPriorityPercentage(TaskPriority.HIGH) / 100} />
          </View>
          <View style={styles.statItem}>
            <Text>Medium ({getPriorityPercentage(TaskPriority.MEDIUM)}%)</Text>
            <ProgressBar progress={getPriorityPercentage(TaskPriority.MEDIUM) / 100} />
          </View>
          <View style={styles.statItem}>
            <Text>Low ({getPriorityPercentage(TaskPriority.LOW)}%)</Text>
            <ProgressBar progress={getPriorityPercentage(TaskPriority.LOW) / 100} />
          </View>
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  card: {
    marginBottom: 16,
  },
  statItem: {
    marginVertical: 8,
  },
});

export default StatisticsScreen;