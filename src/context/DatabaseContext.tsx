import React, { createContext, useContext, useEffect, useState } from 'react';
import { initDatabase } from '../utils/database';

interface DatabaseContextType {
  initialized: boolean;
}

const DatabaseContext = createContext<DatabaseContextType>({ initialized: false });

export const DatabaseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const init = async () => {
      try {
        await initDatabase();
        setInitialized(true);
      } catch (error) {
        console.error('Failed to initialize database:', error);
      }
    };

    init();
  }, []);

  if (!initialized) {
    return null; // Or a loading screen
  }

  return (
    <DatabaseContext.Provider value={{ initialized }}>
      {children}
    </DatabaseContext.Provider>
  );
};

export const useDatabase = () => useContext(DatabaseContext);