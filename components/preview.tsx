"use client";

import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";
import Select from "react-select";
import axios from "axios";
import "react-quill/dist/quill.bubble.css";

interface PreviewProps {
	value: string;
	showLanguage: boolean;
}

const languageOptions = [
	{ value: "en", label: "English" },
	{ value: "de", label: "German" },
	{ value: "hi", label: "Hindi" },
];

export const Preview = ({ value, showLanguage }: PreviewProps) => {
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
				if (selectedLanguage.value !== "en") {
					axios
						.post("/api/translate", {
							textData: value,
							language: selectedLanguage.value,
						})
						.then((res) => setTranslateValue(res?.data))
						.catch((err) => console.log(err));
				} else {
					setTranslateValue(value);
				}
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
			{showLanguage && (
				<Select
					options={languageOptions}
					value={
						selectedLanguage ||
						languageOptions.find((option) => option.value === "en")
					}
					onChange={handleLanguageChange}
					placeholder="Select language..."
					className="ml-auto"
				/>
			)}
			<ReactQuill
				theme="bubble"
				value={translateValue}
				readOnly
			/>
		</div>
	);
};
