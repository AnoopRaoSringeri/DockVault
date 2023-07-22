import {
  ActionIcon,
  Box,
  Button,
  Collapse,
  Menu,
  Navbar,
  Text,
} from "@mantine/core";
import {
  faChevronRight,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import { Icon } from "../../icons";
import { useNavigate } from "react-router-dom";

export const Sidebar = () => {
  const [menuOpened, setMenuOpened] = useState<boolean>(false);
  const navigate = useNavigate();
  const logout = () => {
    sessionStorage.removeItem("userToken");
    navigate("/");
  };
  return (
    <>
      <Navbar.Section style={{ flex: 1 }}>
        <Button
          onClick={() => setMenuOpened(!menuOpened)}
          variant="subtle"
          color="dark"
          radius={0}
          styles={(theme) => ({
            root: {
              width: "100%",
              "&:hover": {
                backgroundColor: theme.fn.darken("#fff", 0.05),
              },
            },
            inner: {
              justifyContent: "flex-start",
            },
          })}
        >
          <Icon
            icon={!menuOpened ? faChevronRight : faChevronDown}
            style={{ marginRight: 10, width: 15, height: 15 }}
          />
          <Text>{"All Files"}</Text>
        </Button>
        <Collapse in={menuOpened}>
          <Icon
            icon={menuOpened ? faChevronRight : faChevronDown}
            style={{ marginRight: 10, width: 15, height: 15 }}
          />
        </Collapse>
      </Navbar.Section>
      <Navbar.Section>
        <Button w={"100%"} onClick={logout}>
          {"Logout"}
        </Button>
      </Navbar.Section>
    </>
  );
};
