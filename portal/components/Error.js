import React from "react";

export const Error = ({ error }) => {
  return <div className="text-center mt-5">{error?.message}</div>;
};
