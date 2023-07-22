import { Burger, Image, MediaQuery, useMantineTheme } from "@mantine/core";
import React from "react";
import logo from "../../images/app-logo.png";
export interface HeaderProps {
  onMenuClick: () => void;
  showMenu: boolean;
}
export const AppHeader = (props: HeaderProps) => {
  const theme = useMantineTheme();

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "30px auto 50px",
        alignItems: "center",
        height: "100%",
      }}
    >
      <div
        style={{
          gridRow: "1/2",
          gridColumn: "1/2",
          margin: "1px 1px",
          height: 33,
          // boxShadow: "0px 0px 4px 0px #00000050",
        }}
      >
        <MediaQuery largerThan="sm" styles={{}}>
          <Burger
            opened={props.showMenu}
            onClick={props.onMenuClick}
            size="sm"
            color={theme.colors.gray[6]}
            mr="xl"
          />
        </MediaQuery>
      </div>
      <div style={{ gridRow: "0/1", gridColumn: "2/3" }}></div>
      <div
        style={{
          gridRow: "1/2",
          gridColumn: "3/4",
          width: 35,
          height: 35,
          boxShadow: "0px 0px 4px 0px #00000050",
        }}
      >
        <Image
          width={30}
          height={30}
          style={{ margin: "2px auto" }}
          radius={5}
          src={logo}
        />
      </div>
    </div>
  );
};
