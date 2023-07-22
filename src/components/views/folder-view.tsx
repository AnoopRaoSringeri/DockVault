import React from "react";
import { Box, Button, Card, Image, Space, Text } from "@mantine/core";
import { Folder } from "../../models/models";
import { Icon } from "../../icons";
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import folderImage from "../../images/folder.jpg";
import { useStyles } from "./card-view";

export const FolderView = ({
  folder,
  onFolderClick,
}: {
  folder: Folder;
  onFolderClick: () => unknown;
}) => {
  const { classes } = useStyles();
  return (
    <Card
      shadow="sm"
      radius="sm"
      withBorder
      h={255}
      className={classes.cardContainer}
      onClick={onFolderClick}
    >
      <Card.Section
        p="xs"
        h={255}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <Image
          styles={{
            imageWrapper: {
              boxShadow: "2px 4px 10px 0px rgb(0 0 0 / 15%)",
            },
          }}
          className={classes.cardContainer}
          src={folderImage}
          radius="sm"
          fit="contain"
          height={200}
          width={150}
        />
        <Text truncate w={150} h={35} align="center">
          <Space h={8} />
          {folder.folderName}
        </Text>
        <Box className="buttonContainer">
          <Button
            variant="light"
            color="blue"
            compact
            h={30}
            w={35}
            // onClick={() => downloadFile(file.id)}
          >
            <Icon icon={faPencil} />
          </Button>
          <Button
            variant="light"
            color="red"
            compact
            h={30}
            w={35}
            // onClick={() => deleteFile(file.id)}
          >
            <Icon icon={faTrash} />
          </Button>
        </Box>
      </Card.Section>
    </Card>
  );
};
