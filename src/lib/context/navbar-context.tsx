"use client";
import {
  createContext,
  SetStateAction,
  useState,
  Dispatch,
  useEffect,
  ReactNode,
} from "react";

type NavBarContextType = {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
};

export const navbarContext = createContext({} as NavBarContextType);

type NavBarContextProviderProps = {
  children: ReactNode
}

export default function NavBarContextProvider({ children }:NavBarContextProviderProps) {
  const [showModal, setShowModal] = useState(false);

  return (
    <navbarContext.Provider
      value={{
        showModal,
        setShowModal
      }}
    >
      {children}
    </navbarContext.Provider>
  );
}
