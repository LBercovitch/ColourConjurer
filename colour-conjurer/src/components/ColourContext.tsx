import { createContext, useState, useContext, type ReactNode, type Dispatch, type SetStateAction } from 'react';

// 1. Define the ColourContextType type
interface ColourContextType {
  colourHex: string[],
  setColourHex: Dispatch<SetStateAction<string[]>>; 
}

// 2. Create the actual context with an undefined default value
const ColourContext = createContext<ColourContextType | undefined>(undefined);

// 3. Create the Provider component
export const ColourProvider = ({ children }: { children: ReactNode }) => {
  const [colourHex, setColourHex] = useState<string[]>([]);

  return (
    <ColourContext.Provider value={{ colourHex, setColourHex }}>
      {children}
    </ColourContext.Provider>
  );
};

// 4. Create a custom hook
export const useColour = () => {
  const context = useContext(ColourContext);
  if (!context) {
    throw new Error('useColour must be used within a ColourProvider');
  }
  return context;
};
