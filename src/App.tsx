import { Loader, MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import React, { Suspense, useEffect, useState } from "react";
import { Routes, Route, Navigate, HashRouter } from "react-router-dom";
import { FolderMenu } from "./components/folder-components/folder-menu";
import { Layout } from "./components/layout";
import { Login } from "./components/layout-components/login";
import { View } from "./components/view";
import { FolderParamsProvider } from "./custom-hooks/use-folder-params";
import { StoreContextProvider, useStore } from "./store/store-context";

export const App = () => {
  return (
    <MantineProvider
      withNormalizeCSS
      withGlobalStyles
      theme={{ loader: "bars" }}
    >
      <Notifications />
      <StoreContextProvider>
        <FolderParamsProvider>
          <ApplicationContainer />
        </FolderParamsProvider>
      </StoreContextProvider>
    </MantineProvider>
  );
};
export const ApplicationContainer = function ApplicationContainer() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/Login" element={<Login />} />
        <Route path="/" element={<Layout />}>
          <Route
            path="Home"
            element={
              <Suspense fallback={<Loader />}>
                <View />
              </Suspense>
            }
          />
          <Route
            path="Folder/:folderId"
            element={
              <Suspense fallback={<Loader />}>
                <FolderMenu />
              </Suspense>
            }
          />
        </Route>
        <Route path="*" element={<Navigate to="/Login" />} />
      </Routes>
    </HashRouter>
  );
};
