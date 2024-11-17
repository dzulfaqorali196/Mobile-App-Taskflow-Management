import * as SQLite from 'expo-sqlite';

let database: SQLite.WebSQLDatabase;

export const getDatabase = () => {
  if (!database) {
    database = SQLite.openDatabase('taskflow.db');
  }
  return database;
};

export const initDatabase = () => {
  const db = getDatabase();
  
  return new Promise((resolve, reject) => {
    db.transaction(
      tx => {
        // Create tasks table
        tx.executeSql(`
          CREATE TABLE IF NOT EXISTS tasks (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            description TEXT,
            deadline TEXT,
            priority TEXT NOT NULL,
            category_id INTEGER,
            status TEXT NOT NULL,
            FOREIGN KEY (category_id) REFERENCES categories (id)
          );
        `);

        // Create categories table
        tx.executeSql(`
          CREATE TABLE IF NOT EXISTS categories (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            color TEXT NOT NULL,
            icon TEXT NOT NULL
          );
        `);
      },
      error => reject(error),
      () => resolve(true)
    );
  });
};