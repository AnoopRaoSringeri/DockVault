import { makeAutoObservable } from "mobx";
import React, { createContext, ReactNode, useContext } from "react";
import { AuthStore } from "./auth-store";
import { FileStore } from "./files-store";
import { FolderStore } from "./folder-store";
import { UserStore } from "./users-store";

class Store {
  constructor() {
    makeAutoObservable(this);
  }
  authStore = new AuthStore();
  fileStore = new FileStore();
  folderStore = new FolderStore();
  userStore = new UserStore();
  store = this;

  async Initialize() {
    await this.fileStore?.Initialize();
    await this.folderStore?.Initialize();
    await this.userStore?.Initialize();
  }
}

const StoreInstance = new Store();
const StoreContext = createContext<Store>(StoreInstance);

export const StoreContextProvider = ({ children }: { children: ReactNode }) => {
  const storeContext = useContext(StoreContext);
  return (
    <StoreContext.Provider value={storeContext}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  return useContext(StoreContext);
};
