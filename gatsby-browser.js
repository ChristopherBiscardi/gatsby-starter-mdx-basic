import React from "react";
import RootWrapper from "./root-wrapper";

export const wrapRootElement = ({ element }) => {
  return <RootWrapper>{element}</RootWrapper>;
};
