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
		if (selectedLanguage?.value !== "en") {
			handleTranslation();
		}
	}, [selectedLanguage]);

	return (
		<>
			{showLanguage && (
				<div className="flex flex-row font-medium p-0">
					<Select
						options={languageOptions}
						value={
							selectedLanguage ||
							languageOptions.find((option) => option.value === "en")
						}
						onChange={handleLanguageChange}
						placeholder="Select language..."
						className="ml-auto mx-0 mb-3"
					/>
				</div>
			)}
			<div
				style={{
					backgroundColor: "transparent",
					borderRadius: "0.11rem",
					padding: "0.3rem 0.5rem 0.5rem 0rem",
				}}>
				<ReactQuill
					value={translateValue}
					readOnly={true}
					theme="bubble"
				/>
			</div>
		</>
	);
};
