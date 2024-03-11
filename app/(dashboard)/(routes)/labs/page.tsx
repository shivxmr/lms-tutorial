import Image from "next/image";
import React from "react";

const labsPage = () => {
	return (
		<div className="relative w-full">
			<img
				style={{ position: "relative" }}
				src={"/labs.png"}
				alt=""
				layout="fill"
				objectFit="cover"
			/>
		</div>
	);
};

export default labsPage;
