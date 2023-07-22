import { runInAction } from "mobx";
import { useLocalObservable } from "mobx-react";
import React, { ReactNode, useContext, useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useStore } from "../store/store-context";

export interface PathType {
  folderName: string;
  folderId: number;
}

interface ContextType {
  path: PathType[];
  onClick: (value: PathType) => unknown;
  onBackClick: () => unknown;
  currentFolder: PathType;
  previousFolder: PathType;
  set: (value: PersistValue) => unknown;
}
export type PersistValue = {
  path: PathType[];
  previousFolder: PathType;
  currentFolder: PathType;
};
const defaultValue: PersistValue = {
  path: [],
  currentFolder: { folderId: 0, folderName: "" },
  previousFolder: { folderId: 0, folderName: "" },
};
const FolderParamsContext = React.createContext<ContextType>({
  path: [],
  onClick: () => {
    return;
  },
  onBackClick: () => {
    return;
  },
  currentFolder: { folderId: 0, folderName: "" },
  previousFolder: { folderId: 0, folderName: "" },
  set: () => {
    return;
  },
});
export const FolderParamsProvider = ({ children }: { children: ReactNode }) => {
  const { folderStore } = useStore();
  const { folderId } = useParams<{
    folderId: string;
  }>();
  const value = useLocalObservable<ContextType>(() => ({
    path: [],
    onClick(folder: PathType) {
      this.path = [...this.path, folder];
      this.previousFolder = this.currentFolder;
      this.currentFolder = folder;
    },
    onBackClick() {
      this.currentFolder = this.previousFolder;
      this.path.pop();
      this.previousFolder = this.path[this.path.length - 2];
    },
    currentFolder: { folderId: 0, folderName: "" },
    previousFolder: { folderId: 0, folderName: "" },
    set(value: PersistValue) {
      this.path = value.path;
      this.currentFolder = value.currentFolder;
      this.previousFolder = value.previousFolder;
    },
  }));

  useEffect(() => {
    window.addEventListener("beforeunload", savePathToLocal);
    return () => {
      window.removeEventListener("beforeunload", savePathToLocal);
    };
  }, []);

  useEffect(() => {
    // if (localStorage.getItem("pathData")) {
    //   const restoredValue: PersistValue = JSON.parse(
    //     localStorage.getItem("pathData") ?? JSON.stringify(defaultValue)
    //   );
    //   value.set(restoredValue);
    // }
    if (sessionStorage.getItem("pathData")) {
      const restoredValue: PersistValue = JSON.parse(
        sessionStorage.getItem("pathData") ?? JSON.stringify(defaultValue)
      );
      value.set(restoredValue);
    }
  }, []);

  useEffect(() => {}, [folderId]);

  const savePathToLocal = () => {
    // localStorage.setItem("pathData", JSON.stringify(value));
    sessionStorage.setItem("pathData", JSON.stringify(value));
  };

  return (
    <FolderParamsContext.Provider value={value}>
      {children}
    </FolderParamsContext.Provider>
  );
};
export const useFolderParams = () => {
  return useContext(FolderParamsContext);
};
