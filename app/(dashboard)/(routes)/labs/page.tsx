import Image from "next/image";
import React from "react";

const labsPage = () => {
	return (
		<div className="w-full">
			<Image
				src={"/labs.png"}
				alt=""
				width={1200}
				height={1200}
			/>
		</div>
	);
};

export default labsPage;
