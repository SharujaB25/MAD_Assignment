import { createContext, useContext, useState } from 'react';

interface ClickCountContextType {
  count: number;
  increment: () => void;
}

export const ClickCountContext = createContext<ClickCountContextType | undefined>(undefined);

export function useClickCount() {
  const context = useContext(ClickCountContext);
  if (!context) {
    throw new Error('useClickCount must be used within a ClickCountProvider');
  }
  return context;
}

export function ClickCountProvider({ children }: { children: React.ReactNode }) {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(prev => prev + 1);
  };

  return (
    <ClickCountContext.Provider value={{ count, increment }}>
      {children}
    </ClickCountContext.Provider>
  );
}
