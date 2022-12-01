import { ReactNode, useCallback, useEffect, useState } from "react";
import { createContext, useContext } from "use-context-selector";

interface ToasContextProviderProps {
  children: ReactNode
}

type UseToastContextType ={
  isActive: boolean
  setIsActive: any
 
}

export const ToastContext = createContext({} as UseToastContextType)

export function ToastContextProvider({children}:ToasContextProviderProps) {
  const [isActive, setIsActive] = useState(false);

  return (
    <ToastContext.Provider value={{isActive, setIsActive}}>
      {children}
    </ToastContext.Provider>
  )

}