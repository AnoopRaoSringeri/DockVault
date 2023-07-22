import React from "react";
import { Flex } from "@mantine/core";
import { FolderView } from "../views/folder-view";
import { useNavigate } from "react-router-dom";
import { Folder } from "../../models/models";
import { observer } from "mobx-react";
import { PathType } from "../../custom-hooks/use-folder-params";

export const FolderComponent = observer(
  ({
    folders,
    parentFolder,
    onFolderClick,
  }: {
    folders: Folder[];
    parentFolder: number;
    onFolderClick: (folder: PathType) => unknown;
  }) => {
    const navigate = useNavigate();
    return (
      <Flex wrap="wrap" gap="xs">
        {folders.map((folder, i) => {
          return (
            <FolderView
              folder={folder}
              onFolderClick={() => {
                navigate(`/Folder/${folder.id}`);
                onFolderClick({
                  folderId: folder.id,
                  folderName: folder.folderName,
                });
              }}
              key={i}
            />
          );
        })}
      </Flex>
    );
  }
);
