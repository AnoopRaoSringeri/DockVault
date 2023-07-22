export interface MyFile {
  id: number;
  fileName: string;
  filePath: string;
  extension: string;
  folderId: number;
}
export interface Folder {
  id: number;
  folderName: string;
  itemsList?: number[];
  foldersList?: number[];
  baseFolder?: boolean;
}
export type ToolBarActions = {
  onClick: () => unknown;
  title: string;
};

export interface User {
  id: number;
  userName: string;
  password: string;
  email: string;
}
