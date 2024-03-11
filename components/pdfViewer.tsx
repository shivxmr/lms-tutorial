"use client";

export default function PdfViewer({ fileName }: any) {
	console.log(fileName);
	return (
		<>
			<embed
				src={fileName}
				type="application/pdf"
				width="100%"
				height="600px"
			/>
		</>
	);
}
