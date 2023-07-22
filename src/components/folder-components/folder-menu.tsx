import React, { useEffect, useState } from "react";
import { Flex } from "@mantine/core";
import { useNavigate, useParams } from "react-router-dom";
import { BodyContainer } from "../layout-components/body-container";
import { Folder, MyFile } from "../../models/models";
import { AddNewItem } from "../add-component";
import { FolderComponent } from "./folder-component";
import { FileComponent } from "../file-component";
import { observer } from "mobx-react";
import { useFolderParams } from "../../custom-hooks/use-folder-params";
import { useStore } from "../../store/store-context";

export const FolderMenu = observer(() => {
  const { folderStore, fileStore } = useStore();
  const { folderId } = useParams<{
    folderId: string;
  }>();
  const navigate = useNavigate();
  const [files, setFiles] = useState<MyFile[]>([]);
  const [folders, setFolders] = useState<Folder[]>([]);
  const { path, onClick, onBackClick, currentFolder, previousFolder } =
    useFolderParams();
  useEffect(() => {
    const currentFolder: Folder | null =
      folderStore.folders.find((f) => f.id == Number(folderId)) ?? null;
    if (currentFolder) {
      setFiles(
        fileStore.files.filter((f) =>
          (currentFolder.itemsList ?? []).includes(f.id)
        )
      );
      setFolders(
        folderStore.folders.filter((f) =>
          (currentFolder.foldersList ?? []).includes(f.id)
        )
      );
    }
  }, [
    JSON.stringify(folderStore.folders.find((f) => f.id == Number(folderId))),
  ]);
  return (
    <BodyContainer
      toolBarActions={
        path.length > 0
          ? [
              {
                title: "Back",
                onClick: () => {
                  onBackClick();
                  if (path.length > 0) {
                    navigate(`/Folder/${previousFolder.folderId}`);
                  } else {
                    navigate(`/Home`);
                  }
                },
              },
            ]
          : []
      }
    >
      <Flex wrap="wrap" gap="xs">
        {/* <AddNewItem /> */}
        <FolderComponent
          folders={folders}
          parentFolder={Number(folderId)}
          onFolderClick={(folder) => {
            onClick(folder);
          }}
        />
        <FileComponent files={files} />
      </Flex>
    </BodyContainer>
  );
});
