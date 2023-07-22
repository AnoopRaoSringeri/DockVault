import { FileWithPath } from "@mantine/dropzone";
import axios, { AxiosResponse } from "axios";
import { runInAction, makeAutoObservable } from "mobx";
import React, { useContext } from "react";
import { MyFile } from "../models/models";
import { baseUrl, config } from "./auth-store";

export class FileStore {
  constructor() {
    makeAutoObservable(this);
  }

  files: MyFile[] = [];
  Initialize = async () => {
    await this.GetAllFiles();
  };

  GetAllFiles = async (): Promise<MyFile[] | null> => {
    try {
      const { data }: AxiosResponse<MyFile[]> = await axios.get(
        `${baseUrl}/api/Docks`,
        config()
      );
      runInAction(() => {
        this.files = data;
      });
      return data;
    } catch (e) {
      return null;
    }
  };

  AddFile = async (file: FileWithPath, fileName: string) => {
    try {
      const formData = new FormData();
      formData.append("myFile", file, fileName);
      formData.append("extension", `.${file.name.split(".").pop()}` ?? "");
      const result = await axios.post(`${baseUrl}/api/Docks`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `bearer ${sessionStorage.getItem("userToken")}`,
        },
      });
      runInAction(() => {
        this.files.push(result.data);
      });
      return result.data;
    } catch (e) {
      return null;
    }
  };

  AddFileToFolder = async (
    file: FileWithPath,
    fileName: string,
    folderId: number
  ) => {
    try {
      const formData = new FormData();
      formData.append("myFile", file, fileName);
      formData.append("extension", `.${file.name.split(".").pop()}` ?? "");
      const result = await axios.post(
        `${baseUrl}/api/Docks/ToFOlder/${folderId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `bearer ${sessionStorage.getItem("userToken")}`,
          },
        }
      );
      runInAction(() => {
        this.files.push(result.data);
      });
      return result.data;
    } catch (e) {
      return null;
    }
  };

  DeleteFile = async (id: number) => {
    try {
      const result = await axios.delete(
        `${baseUrl}/api/Docks/DeleteFile/${id}`,
        config()
      );
      runInAction(() => {
        this.files = this.files.filter((f) => f.id != id);
      });
      return result.data;
    } catch (e) {
      return null;
    }
  };

  DownloadFile = async (id: number) => {
    try {
      let iframe = document.getElementById(
        "iframeElement"
      ) as HTMLIFrameElement;
      if (iframe == null) {
        iframe = document.createElement("iframe");
        iframe.id = "iframeElement";
        document.body.appendChild(iframe);
      }
      iframe.src = `${baseUrl}/api/Docks/${id}/DownloadFile`;
    } catch (e) {
      return null;
    }
  };

  GetImage = (type: string, name: string) => {
    return `${baseUrl}/api/Docks/${type}/${name}/Image`;
  };
}

// const FileStoreInstance = new FileStore();
// const FileStoreContext = React.createContext<FileStore>(FileStoreInstance);

// export const FileStoreContextProvider = ({
//   children,
// }: {
//   children: React.ReactNode;
// }) => {
//   const fileStore = useContext(FileStoreContext);
//   return (
//     <FileStoreContext.Provider value={fileStore}>
//       {children}
//     </FileStoreContext.Provider>
//   );
// };

// export const useFileStore = () => {
//   return useContext(FileStoreContext);
// };
