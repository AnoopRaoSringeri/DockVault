import {
  AppShell,
  Header,
  Footer,
  useMantineTheme,
  Navbar,
  createStyles,
  Loader,
  LoadingOverlay,
} from "@mantine/core";
import React, { useEffect, useState } from "react";
import { Sidebar } from "./layout-components/navbar";
import { Footer as CustomFooter } from "./layout-components/footer";
import { AppHeader } from "./layout-components/header";
import { ComponentBody } from "./layout-components/main-body";
import { Outlet, Navigate, useNavigate } from "react-router-dom";
import { useStore } from "../store/store-context";
import { isExpired } from "react-jwt";
const useStyles = createStyles(() => ({
  container: {
    ".mantine-AppShell-main": {
      paddingRight: 0,
      paddingLeft: 0,
      paddingTop: 70,
      paddingBottom: 60,
    },
  },
}));
export const Layout = () => {
  const { store } = useStore();
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const [overlayVisible, setOverlayVisible] = useState(false);
  const { classes } = useStyles();
  const navigate = useNavigate();
  const token = sessionStorage.getItem("userToken");

  const onMenuClick = () => {
    setOpened(!opened);
  };

  useEffect(() => {
    (async () => {
      if (token) {
        const isValid = !isExpired(token);
        if (isValid) {
          setOverlayVisible(true);
          await store.Initialize();
          setOverlayVisible(false);
        } else {
          navigate("/Login");
        }
      }
    })();
  }, []);

  return (
    <>
      <LoadingOverlay visible={overlayVisible} overlayBlur={2} />
      <AppShell
        fixed
        className={classes.container}
        styles={{
          main: {
            background:
              theme.colorScheme === "dark"
                ? theme.colors.dark[8]
                : theme.colors.gray[0],
          },
        }}
        navbarOffsetBreakpoint="sm"
        asideOffsetBreakpoint="sm"
        navbar={
          <Navbar
            sx={{
              overflow: "hidden",
              transition: "width 1000ms ease",
            }}
            hiddenBreakpoint="sm"
            style={{ boxShadow: "0px 4px 10px 0px rgb(0 0 0 / 15%)" }}
            width={{ base: opened ? "25%" : "0px" }}
            children={<Sidebar />}
          />
        }
        footer={
          <Footer height={60} p="md">
            <CustomFooter />
          </Footer>
        }
        header={
          <Header height={70} p="md">
            <AppHeader showMenu={opened} onMenuClick={onMenuClick} />
          </Header>
        }
      >
        <ComponentBody expanded={opened}>
          {token ? <Outlet /> : <Navigate to="/Login" />}
        </ComponentBody>
      </AppShell>
    </>
  );
};
