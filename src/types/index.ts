export enum TaskPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high'
}

export enum TaskStatus {
  TODO = 'todo',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed'
}

export interface Task {
  id: number;
  title: string;
  description: string;
  deadline: string;
  priority: TaskPriority;
  category_id: number;
  status: TaskStatus;
}

export interface Category {
  id: number;
  name: string;
  color: string;
  icon: string;
}