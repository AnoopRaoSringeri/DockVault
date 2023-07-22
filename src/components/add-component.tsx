import { faAdd, faFileUpload } from "@fortawesome/free-solid-svg-icons";
import {
  Card,
  Button,
  Image,
  Group,
  Input,
  Modal,
  Text,
  Flex,
  createStyles,
  HoverCard,
  Stack,
  Menu,
} from "@mantine/core";
import { Dropzone, FileWithPath, MIME_TYPES } from "@mantine/dropzone";
import { notifications } from "@mantine/notifications";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { ImageMappings } from "../helpers/file-helper";
import { Icon } from "../icons";
import folderImage from "../images/folder.jpg";
import galleryImage from "../images/gallery.png";
import { useStore } from "../store/store-context";

const useStyles = createStyles(() => ({
  cardContainer: {
    border: "3px dashed #80808080",
    display: "flex",
    alignItems: "center",
    ".add": {
      width: "100%",
    },
    ".buttonContainer": {
      display: "none",
      position: "absolute",
      flexDirection: "column",
      justifyContent: "space-between",
      height: 255,
      width: 140,
      button: {
        boxShadow: "2px 4px 10px 0px rgb(0 0 0 / 15%)",
      },
    },
    "&:hover": {
      ".buttonContainer": {
        display: "flex",
        margin: 0,
        justifyContent: "space-evenly",
      },
      ".add": {
        display: "none",
      },
    },
  },
  textContainer: {},
}));
export const AddNewItem = () => {
  const { classes } = useStyles();
  const { fileStore, folderStore } = useStore();
  const { folderId } = useParams<{
    folderId: string;
  }>();
  const [fileModalVisible, setFileModalVisible] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [file, setFile] = useState<FileWithPath | null>(null);
  const [error, setError] = useState<string>("");
  const [folderModalVisible, setFolderModalVisible] = useState<boolean>(false);
  const addFile = async () => {
    if (!(name || name.trim())) {
      setError("Name is required");
      return;
    } else if (fileStore.files.find((f) => f.fileName == name)) setError("");
    if (file) {
      await (async () => {
        if (!folderId) {
          await fileStore.AddFile(file, name);
        } else {
          const newFile = await fileStore.AddFileToFolder(
            file,
            name,
            Number(folderId)
          );
          folderStore.UpdateFolderItems(newFile, "add");
        }
      })();
      setFileModalVisible(false);
      setFile(null);
      setName("");
      notifications.show({
        message: `File ${name} added successfully`,
        color: "green",
      });
    } else {
      notifications.show({
        message: "Please select any file",
        color: "red",
      });
    }
  };
  const addFolder = async () => {
    if (!(name || name.trim())) {
      setError("Name is required");
      return;
    } else if (folderStore.folders.find((f) => f.folderName == name))
      setError("");
    await (async () => {
      if (!folderId) {
        await folderStore.AddFolder({
          id: 0,
          folderName: name,
          baseFolder: true,
          itemsList: [],
          foldersList: [],
        });
      } else {
        await folderStore.AddToFolder(
          {
            id: 0,
            folderName: name,
            baseFolder: false,
            itemsList: [],
            foldersList: [],
          },
          Number(folderId)
        );
      }
    })();
    setFolderModalVisible(false);
    setName("");
    notifications.show({
      message: `Folder ${name} added successfully`,
      color: "green",
    });
  };

  return (
    <>
      <Modal
        opened={folderModalVisible}
        onClose={() => setFolderModalVisible(false)}
      >
        <Input.Wrapper label="Folder Name" error={error != "" ? error : null}>
          <Input value={name} onChange={(e) => setName(e.target.value)} />
        </Input.Wrapper>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button onClick={() => addFolder()} mt={20}>
            {"Save"}
          </Button>
        </div>
      </Modal>
      <Modal
        opened={fileModalVisible}
        onClose={() => setFileModalVisible(false)}
      >
        <Dropzone
          accept={Object.keys(MIME_TYPES)}
          onDrop={(file) => {
            setFile(file[0]);
            if (!name) {
              const fileName = file[0].name.split(".");
              fileName.pop();
              setName(fileName.join("."));
            }
          }}
        >
          <Group position="center" spacing="xl">
            <Dropzone.Accept>
              <Icon icon={faFileUpload} />
            </Dropzone.Accept>
            <Dropzone.Idle>
              {file ? (
                <Image
                  styles={{
                    imageWrapper: {
                      boxShadow: "2px 4px 10px 0px rgb(0 0 0 / 15%)",
                    },
                  }}
                  src={
                    ImageMappings["." + file.name.split(".").pop()] ??
                    URL.createObjectURL(file)
                  }
                  imageProps={{
                    onLoad: () =>
                      URL.revokeObjectURL(URL.createObjectURL(file)),
                  }}
                  fit="contain"
                  height={150}
                  width={150}
                />
              ) : (
                <Icon icon={faFileUpload} size="2xl" />
              )}
            </Dropzone.Idle>
            {!file ? (
              <Text size="xl" inline>
                {"Select File"}
              </Text>
            ) : null}
          </Group>
        </Dropzone>
        <Input.Wrapper
          label="File Name"
          mt={20}
          error={error != "" ? error : null}
        >
          <Input value={name} onChange={(e) => setName(e.target.value)} />
        </Input.Wrapper>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button onClick={() => addFile()} mt={20}>
            {"Save"}
          </Button>
        </div>
      </Modal>
      <Group
        position="center"
        style={{
          position: "absolute",
          right: 0,
          bottom: 0,
          padding: "inherit",
        }}
      >
        <Menu
          trigger="hover"
          transitionProps={{
            transition: {
              in: { opacity: 1, transition: "ease 500ms" },
              out: {
                opacity: 0,
                transform: "scaleX(0)",
                transition: "ease 500ms",
              },
              common: { transformOrigin: "right" },
              transitionProperty: "transform, opacity",
            },
          }}
          position="left"
        >
          <Menu.Target>
            <Button w={60} h={60} radius={30} p={0}>
              <Icon icon={faAdd} size="2xl" className="add" />
            </Button>
          </Menu.Target>
          <Menu.Dropdown
            style={{
              borderRadius: 50,
            }}
            p={10}
          >
            <Group>
              <Button
                variant="light"
                color="blue"
                w={50}
                h={50}
                p={10}
                radius={25}
                onClick={() => {
                  setFolderModalVisible(true), setFileModalVisible(false);
                }}
              >
                <Image src={folderImage} style={{ mixBlendMode: "multiply" }} />
              </Button>
              <Button
                variant="light"
                color="blue"
                w={50}
                p={10}
                h={50}
                radius={25}
                onClick={() => {
                  setFileModalVisible(true), setFolderModalVisible(false);
                }}
              >
                <Image
                  src={galleryImage}
                  style={{ mixBlendMode: "multiply" }}
                />
              </Button>
            </Group>
          </Menu.Dropdown>
        </Menu>
      </Group>
    </>
  );
};
