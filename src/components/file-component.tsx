import React from "react";
import { Flex } from "@mantine/core";
import { CardView } from "./views/card-view";
import { MyFile } from "../models/models";

export const FileComponent = ({ files }: { files: MyFile[] }) => {
  return (
    <Flex wrap="wrap" gap="xs">
      {files.map((file, i) => {
        return <CardView file={file} key={i} />;
      })}
    </Flex>
  );
};
