import React from "react";
import Image from "next/image";
import ProjectImage from "/projects.png";

const componentsPage = () => {
  return (
    <div className="relative w-full">
      <img
        style={{
          position: "relative",
          width: "100%",
        }}
        src={"/components.png"}
        alt=""
      />
    </div>
  );
};

export default componentsPage;
