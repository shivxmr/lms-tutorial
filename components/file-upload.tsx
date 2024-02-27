"use client";

import toast from "react-hot-toast";

import { UploadButton, UploadDropzone } from "@/lib/uploadthing";
import { ourFileRouter } from "@/app/api/uploadthing/core";

interface FileUploadProps {
	onChange: (url?: string) => void;
	endpoint: keyof typeof ourFileRouter;
}

export const FileUpload = ({ onChange, endpoint }: FileUploadProps) => {
	return (
		// <UploadDropzone
		//   endpoint={endpoint}
		//   onClientUploadComplete={(res) => {
		//     onChange(res?.[0].url);
		//     alert("Upload Completed");
		//   }}
		//   onUploadError={(error: Error) => {
		//     toast.error(`${error?.message}`);
		//     alert(`ERROR! ${error.message}`);
		//   }}
		// />
		<></>
	);
};
