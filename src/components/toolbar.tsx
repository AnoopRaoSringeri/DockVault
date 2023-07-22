import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { Button, Flex } from "@mantine/core";
import { observer } from "mobx-react";
import React, { ReactNode } from "react";
import { useFolderParams } from "../custom-hooks/use-folder-params";
import { Icon } from "../icons";
import { ToolBarActions } from "../models/models";

export type ToolBarProps = {
  actions?: ToolBarActions[];
};

export const Toolbar = observer((props: ToolBarProps) => {
  const { path, onClick, onBackClick } = useFolderParams();
  const currentPath: ReactNode[] = path.map((p) => (
    <div key={p.folderId}>
      {p.folderName}
      <Icon icon={faAngleRight} />
    </div>
  ));
  return (
    <Flex
      h={50}
      p={10}
      align="center"
      direction="row-reverse"
      style={{
        backgroundColor: "rgba(231, 245, 255, 1)",
        boxShadow: "0px -2px 10px 0px rgb(0 0 0 / 15%)",
      }}
    >
      {props.actions
        ? [...props.actions].reverse().map((a) => (
            <Button
              onClick={a.onClick}
              key={a.title}
              style={{
                boxShadow: "2px 4px 10px 0px rgb(0 0 0 / 15%)",
              }}
            >
              {a.title}
            </Button>
          ))
        : null}
      {currentPath}
    </Flex>
  );
});
