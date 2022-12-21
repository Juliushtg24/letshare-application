import React from "react";
import { InfinitySpin } from "react-loader-spinner";

const Spinner = ({ message }) => {
  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      <InfinitySpin width="200" color="#4fa94d" />
      <p className="text-lg text-center px-2">{message}</p>
    </div>
  );
};

export default Spinner;
