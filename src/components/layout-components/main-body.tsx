import React from "react";
import { ToolBarActions } from "../../models/models";
import { Toolbar, ToolBarProps } from "../toolbar";

interface ComponentBodyProps {
  expanded: boolean;
  children?: React.ReactElement;
}
export const ComponentBody = (props: ComponentBodyProps) => {
  return (
    <div
      style={{
        width: props.expanded ? "75%" : "100%",
        height: "calc(100vh - 130px)",
        marginLeft: props.expanded ? "25%" : "0px",
        transition: "margin-left 1000ms ease, width 1000ms ease",
      }}
    >
      {props.children}
      <iframe
        name="iframeElement"
        id="iframeElement"
        src=""
        style={{ display: "none" }}
      />
    </div>
  );
};
