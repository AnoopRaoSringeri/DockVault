import React from "react";
import {
  Box,
  Button,
  Card,
  createStyles,
  Image,
  Space,
  Text,
} from "@mantine/core";
import { observer } from "mobx-react";
import { Folder, MyFile } from "../../models/models";
import { Icon } from "../../icons";
import { faDownload, faTrash } from "@fortawesome/free-solid-svg-icons";
import { ImageMappings } from "../../helpers/file-helper";
import { useStore } from "../../store/store-context";
import { notifications } from "@mantine/notifications";

export const useStyles = createStyles(() => ({
  cardContainer: {
    ".buttonContainer": {
      display: "none",
      boxShadow: "2px 4px 10px 0px rgb(0 0 0 / 15%)",
    },
    "&:hover": {
      ".buttonContainer": {
        display: "block",
        position: "absolute",
        top: 0,
        right: 0,
        margin: 0,
        padding: 0,
      },
    },
  },
  textContainer: {},
}));
export const CardView = observer(({ file }: { file: MyFile }) => {
  const { classes } = useStyles();
  const { folderStore, fileStore } = useStore();
  const deleteFile = async (id: number) => {
    const deletedFile = await fileStore.DeleteFile(id);
    folderStore.UpdateFolderItems(deletedFile, "delete");
    notifications.show({
      message: `File ${file.fileName} deleted successfully`,
      color: "green",
    });
  };
  const downloadFile = async (id: number) => {
    await fileStore.DownloadFile(id);
  };
  return (
    <Card
      shadow="sm"
      radius="sm"
      h={255}
      withBorder
      className={classes.cardContainer}
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
          src={
            ImageMappings[file.extension] ??
            fileStore.GetImage("image", `${file.fileName}${file.extension}`)
          }
          imageProps={{
            onLoad: () =>
              URL.revokeObjectURL(
                URL.createObjectURL(
                  new Blob([file.filePath], { type: file.extension })
                )
              ),
          }}
          radius="sm"
          fit="contain"
          height={200}
          width={150}
        />
        <Text truncate w={150} h={35} align="center">
          <Space h={8} />
          {file.fileName}
        </Text>
        <Box className="buttonContainer">
          <Button
            variant="light"
            color="blue"
            compact
            h={30}
            w={35}
            onClick={() => downloadFile(file.id)}
          >
            <Icon icon={faDownload} />
          </Button>
          <Button
            variant="light"
            color="red"
            compact
            h={30}
            w={35}
            onClick={() => deleteFile(file.id)}
          >
            <Icon icon={faTrash} />
          </Button>
        </Box>
      </Card.Section>
    </Card>
  );
});
