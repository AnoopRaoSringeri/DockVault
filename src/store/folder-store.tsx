import { FileWithPath } from "@mantine/dropzone";
import axios, { AxiosResponse } from "axios";
import { runInAction, makeAutoObservable } from "mobx";
import React, { useContext } from "react";
import { Folder, MyFile } from "../models/models";
import { baseUrl, config } from "./auth-store";
import { LoadState } from "./types";

export class FolderStore {
  constructor() {
    makeAutoObservable(this);
  }
  private folderLoadState: LoadState = LoadState.NotLoaded;
  folders: Folder[] = [];
  Initialize = async () => {
    await this.GetAllFolders();
  };

  GetAllFolders = async (): Promise<Folder[] | null> => {
    if (
      this.folderLoadState == LoadState.Loading ||
      this.folderLoadState == LoadState.Loaded
    ) {
      return null;
    }
    this.folderLoadState = LoadState.Loading;
    try {
      const { data }: AxiosResponse<Folder[]> = await axios.get(
        `${baseUrl}/api/Folders`,
        config()
      );
      runInAction(() => {
        this.folders = data;
        this.folderLoadState = LoadState.Loaded;
      });
      return data;
    } catch (e) {
      this.folderLoadState = LoadState.Error;
      return null;
    }
  };

  AddFolder = async (folder: Folder): Promise<Folder | null> => {
    try {
      const result: AxiosResponse<Folder> = await axios.post(
        `${baseUrl}/api/Folders`,
        folder,
        config()
      );
      runInAction(() => {
        this.folders.push(result.data);
      });
      return result.data;
    } catch (e) {
      return null;
    }
  };

  UpdateFolderItems = (file: MyFile, action: "add" | "delete") => {
    runInAction(() => {
      if (action === "add") {
        const ix = this.folders.findIndex((f) => f.id == file.folderId);
        this.folders[ix].itemsList?.push(file.id);
      } else {
        const ix = this.folders.findIndex((f) => f.id == file.folderId);
        this.folders[ix].itemsList = this.folders[ix].itemsList?.filter(
          (f) => f != file.id
        );
      }
    });
  };

  DeleteFolder = async (id: number): Promise<Folder | null> => {
    try {
      const result: AxiosResponse<Folder> = await axios.delete(
        `${baseUrl}/api/Docks/DeleteFile/${id}`,
        config()
      );
      runInAction(() => {
        this.folders = this.folders.filter((f) => f.id != id);
      });
      return result.data;
    } catch (e) {
      return null;
    }
  };

  AddToFolder = async (
    folder: Folder,
    parentFolderId: number
  ): Promise<Folder | null> => {
    try {
      const result: AxiosResponse<Folder> = await axios.post(
        `${baseUrl}/api/Folders/Folder/${parentFolderId}`,
        folder,
        config()
      );
      runInAction(() => {
        this.folders.push(result.data);
        const ix = this.folders.findIndex((f) => f.id == parentFolderId);
        this.folders[ix].foldersList?.push(result.data.id);
      });
      return result.data;
    } catch (e) {
      return null;
    }
  };
}
// const FolderStoreInstance = new FolderStore();
// const FolderStoreContext =
//   React.createContext<FolderStore>(FolderStoreInstance);

// export const FolderStoreContextProvider = ({
//   children,
// }: {
//   children: React.ReactNode;
// }) => {
//   const folderStore = useContext(FolderStoreContext);
//   return (
//     <FolderStoreContext.Provider value={folderStore}>
//       {children}
//     </FolderStoreContext.Provider>
//   );
// };

// export const useFolderStore = () => {
//   return useContext(FolderStoreContext);
// };
