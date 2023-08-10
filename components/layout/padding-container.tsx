import React, { ReactNode } from "react";

const PaddingContainer = ({ children }: { children: ReactNode }) => {
  return <div className="mx-auto w-full max-w-7xl px-8">{children}</div>;
};

export default PaddingContainer;
