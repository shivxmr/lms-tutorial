import React from "react";
import Image from "next/image";
import ProjectImage from "/projects.png";

const projectsPage = () => {
  return (
    <div className="relative w-full">
      <img style={{ position: "relative" }} src={"/projects.png"} alt="" />
    </div>
  );
};

export default projectsPage;
