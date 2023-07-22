import { Box, Flex } from "@mantine/core";
import React from "react";
import { ToolBarActions } from "../../models/models";
import { AddNewItem } from "../add-component";
import { Toolbar } from "../toolbar";

export const BodyContainer = ({
  children,
  toolBarActions,
}: {
  children: React.ReactElement | React.ReactElement[];
  toolBarActions: ToolBarActions[];
}) => {
  return (
    <Flex
      direction="column"
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      <Toolbar actions={toolBarActions} />
      <div
        style={{
          height: "calc(100% - 50px)",
          padding: "16px",
          position: "relative",
        }}
      >
        {children}
        <AddNewItem />
      </div>
    </Flex>
  );
};
