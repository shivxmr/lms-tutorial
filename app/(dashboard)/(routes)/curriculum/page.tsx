import Image from "next/image";
import React from "react";

const cirriculumPage = () => {
	return (
		<div className="w-full">
			<Image
				src={"/curriculum.png"}
				alt=""
				width={1200}
                height={1200}
			/>
		</div>
	);
};

export default cirriculumPage;
