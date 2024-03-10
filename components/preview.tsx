"use client";

import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";
import Select from "react-select";
import axios from "axios";
import "react-quill/dist/quill.bubble.css";

interface PreviewProps {
	value: string;
}

const languageOptions = [
	{ value: "en", label: "English" },
	{ value: "de", label: "German" },
	{ value: "hi", label: "Hindi" },
];

export const Preview = ({ value }: PreviewProps) => {
	const ReactQuill = useMemo(
		() => dynamic(() => import("react-quill"), { ssr: false }),
		[]
	);
	const [translateValue, setTranslateValue] = useState(value);
	const [selectedLanguage, setSelectedLanguage] = useState<any>();

	const handleLanguageChange = (selectedOption: any) => {
		setSelectedLanguage(selectedOption);
	};

	const handleTranslation = async () => {
		try {
			if (selectedLanguage) {
				axios
					.post("/api/translate", {
						textData: translateValue,
						language: selectedLanguage.value,
					})
					.then((res) => setTranslateValue(res?.data))
					.catch((err) => console.log(err));
			}
		} catch (error) {
			console.error("Translation error:", error);
		}
	};

	useEffect(() => {
		handleTranslation();
	}, [selectedLanguage]);

	return (
		<div className="flex flex-col justify-center  border p-2 mt-10">
			<Select
				options={languageOptions}
				value={selectedLanguage}
				onChange={handleLanguageChange}
				placeholder="Select language..."
				isClearable
				className="ml-auto"
			/>
			<ReactQuill
				theme="bubble"
				value={translateValue}
				readOnly
			/>
		</div>
	);
};
