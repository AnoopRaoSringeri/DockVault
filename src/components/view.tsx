import { Flex, ScrollArea } from "@mantine/core";
import { observer } from "mobx-react";
import React from "react";
import { BodyContainer } from "./layout-components/body-container";
import { FolderComponent } from "./folder-components/folder-component";
import { FileComponent } from "./file-component";
import { AddNewItem } from "./add-component";
import { useFolderParams } from "../custom-hooks/use-folder-params";
import { useStore } from "../store/store-context";

export const View = observer(function View() {
  const { fileStore, folderStore } = useStore();
  const { path, onClick, onBackClick } = useFolderParams();

  return (
    <BodyContainer toolBarActions={[]}>
      <ScrollArea offsetScrollbars style={{ height: "100%" }}>
        <Flex wrap="wrap" gap="xs">
          {/* <AddNewItem /> */}
          <FolderComponent
            folders={folderStore.folders.filter((f) => f.baseFolder)}
            parentFolder={0}
            onFolderClick={onClick}
          />
          <FileComponent
            files={fileStore.files.filter((f) => f.folderId == 0)}
          />
        </Flex>
      </ScrollArea>
    </BodyContainer>
  );
});
