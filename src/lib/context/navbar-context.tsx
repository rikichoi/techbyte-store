"use client";
import {
  createContext,
  SetStateAction,
  useState,
  Dispatch,
  useEffect,
  ReactNode,
} from "react";

export const navbarContext = createContext({
  showModal: false,
  setShowModal: Dispatch<SetStateAction<boolean>>
});


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
