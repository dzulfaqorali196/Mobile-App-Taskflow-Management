import create from 'zustand';
import { Task, TaskPriority, TaskStatus } from '../types';
import { getDatabase } from '../utils/database';

interface TaskStore {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  fetchTasks: () => Promise<void>;
  addTask: (task: Omit<Task, 'id'>) => Promise<void>;
  updateTask: (task: Task) => Promise<void>;
  deleteTask: (id: number) => Promise<void>;
  setTaskStatus: (id: number, status: TaskStatus) => Promise<void>;
}

export const useTaskStore = create<TaskStore>((set, get) => ({
  tasks: [],
  loading: false,
  error: null,

  fetchTasks: async () => {
    set({ loading: true });
    try {
      const db = await getDatabase();
      const result = await new Promise<Task[]>((resolve, reject) => {
        db.transaction(tx => {
          tx.executeSql(
            'SELECT * FROM tasks ORDER BY deadline ASC',
            [],
            (_, { rows: { _array } }) => resolve(_array),
            (_, error) => {
              reject(error);
              return false;
            }
          );
        });
      });
      set({ tasks: result, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  addTask: async (task) => {
    try {
      const db = await getDatabase();
      await new Promise((resolve, reject) => {
        db.transaction(tx => {
          tx.executeSql(
            'INSERT INTO tasks (title, description, deadline, priority, category_id, status) VALUES (?, ?, ?, ?, ?, ?)',
            [task.title, task.description, task.deadline, task.priority, task.category_id, TaskStatus.TODO],
            (_, result) => resolve(result),
            (_, error) => {
              reject(error);
              return false;
            }
          );
        });
      });
      get().fetchTasks();
    } catch (error) {
      set({ error: error.message });
    }
  },

  updateTask: async (task) => {
    try {
      const db = await getDatabase();
      await new Promise((resolve, reject) => {
        db.transaction(tx => {
          tx.executeSql(
            'UPDATE tasks SET title = ?, description = ?, deadline = ?, priority = ?, category_id = ?, status = ? WHERE id = ?',
            [task.title, task.description, task.deadline, task.priority, task.category_id, task.status, task.id],
            (_, result) => resolve(result),
            (_, error) => {
              reject(error);
              return false;
            }
          );
        });
      });
      get().fetchTasks();
    } catch (error) {
      set({ error: error.message });
    }
  },

  deleteTask: async (id) => {
    try {
      const db = await getDatabase();
      await new Promise((resolve, reject) => {
        db.transaction(tx => {
          tx.executeSql(
            'DELETE FROM tasks WHERE id = ?',
            [id],
            (_, result) => resolve(result),
            (_, error) => {
              reject(error);
              return false;
            }
          );
        });
      });
      get().fetchTasks();
    } catch (error) {
      set({ error: error.message });
    }
  },

  setTaskStatus: async (id, status) => {
    try {
      const db = await getDatabase();
      await new Promise((resolve, reject) => {
        db.transaction(tx => {
          tx.executeSql(
            'UPDATE tasks SET status = ? WHERE id = ?',
            [status, id],
            (_, result) => resolve(result),
            (_, error) => {
              reject(error);
              return false;
            }
          );
        });
      });
      get().fetchTasks();
    } catch (error) {
      set({ error: error.message });
    }
  },
}));