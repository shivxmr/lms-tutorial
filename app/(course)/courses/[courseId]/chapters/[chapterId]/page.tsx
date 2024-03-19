import { YoutubeTranscript } from "youtube-transcript";
import { redirect } from "next/navigation";
import { File } from "lucide-react";
import { getChapter } from "@/actions/get-chapter";
import { Banner } from "@/components/banner";
import { Separator } from "@/components/ui/separator";
import { Preview } from "@/components/preview";

import VideoPlayer from "./_components/video-player";
import { CourseEnrollButton } from "./_components/course-enroll-button";
import { CourseProgressButton } from "./_components/course-progress-button";
import { SubmissionForm } from "./_components/submission-form";
import { getAttachments } from "@/actions/get-attachments";
import PdfViewer from "@/components/pdfViewer";
import { getLocalSession } from "@/actions/get-session";

const ChapterIdPage = async ({
	params,
}: {
	params: { courseId: string; chapterId: string };
}) => {
	const session = await getLocalSession();
	const userId = session?.session?.user?.id;
	if (!userId) {
		return redirect("/");
	}

	const { chapter, course, nextChapter, userProgress, purchase } =
		await getChapter({
			userId,
			chapterId: params.chapterId,
			courseId: params.courseId,
		});

	if (!chapter || !course) {
		return redirect("/");
	}

	const getTime = (time: any) => {
		const durationSec = time / 1000;

		// Extract hours, minutes, seconds, and milliseconds
		const hours = Math.floor(durationSec / 3600);
		const minutes = Math.floor((durationSec % 3600) / 60);
		const seconds = Math.floor(durationSec % 60);
		const milliseconds = Math.floor(durationSec % 1000);

		// Format the time as HH:MM:SS.MMM
		// const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
		//   .toString()
		//   .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}.${milliseconds
		//   .toString()
		//   .padStart(3, "0")}`;
		const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
			.toString()
			.padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

		return formattedTime;
	};

	const { attachments } = await getAttachments({
		chapterId: params.chapterId,
		courseId: params.courseId,
	});
	console.log(attachments);

	const isLocked = !chapter.isFree && !purchase;
	const completeOnEnd = !!purchase && !userProgress?.isCompleted;

	return (
		<div className="pb-10">
			{userProgress?.isCompleted && (
				<Banner
					variant="success"
					label="You already completed this chapter."
				/>
			)}
			{/* {isLocked && (
				<Banner
					variant="warning"
					label="You need to purchase this course to watch this chapter."
				/>
			)} */}
			<div className="p-7 pb-0 flex flex-col md:flex-row items-center justify-between">
				<h2 className="text-3xl font-semibold mb-1">{chapter.title}</h2>
				{purchase ? (
					<CourseProgressButton
						chapterId={params.chapterId}
						courseId={params.courseId}
						nextChapterId={nextChapter?.id}
						isCompleted={!!userProgress?.isCompleted}
					/>
				) : (
					<CourseEnrollButton
						courseId={params.courseId}
						price={course.price!}
					/>
				)}
			</div>
			<div>
				<div
					className="flex flex-col mx-auto px-10 mt-10 pb-20"
					style={{
						// maxHeight: "38rem",
						border: "0.12rem solid #6d94e3",
						borderRadius: "1rem",
						height: "auto",
						backgroundColor: "#cfe5ff",
						padding: "2rem",
						margin: "1.75rem",
						boxShadow: "0px 0px 20px 5px rgb(0 0 0 / 5%)",
					}}>
					<div className="grid grid-cols-2 gap-x-5 mb-7">
						<VideoPlayer
							// chapterId={params.chapterId}
							// title={chapter.title}
							// courseId={params.courseId}
							// nextChapterId={nextChapter?.id}
							// playbackId={chapter.videoUrl as any}
							// isLocked={isLocked}
							// completeOnEnd={completeOnEnd}
							videoUrl={chapter.videoUrl || ""}
						/>
						{chapter.videoUrl && chapter.videoUrl.includes("youtube.com") && (
							<div
								className="border h-full overflow-y-auto w-full"
								style={{
									maxHeight: "37.55rem",
									padding: "1.2rem",
									backgroundColor: "#ffffff",
									borderRadius: "1rem",
								}}>
								<h1 className="text-2xl mb-3 mx-4 ml-1 mt-0">Transcript</h1>
								{YoutubeTranscript.fetchTranscript(chapter.videoUrl || "").then(
									(res) => (
										<>
											{res.map((response) => (
												<div
													className="flex"
													key={response.offset}>
													<div
														style={{
															width: "5rem",
															padding: "0.1rem 0rem 0.1rem 0.5rem",
														}}>
														<span className="text-gray font-medium">
															{getTime(response?.duration + response?.offset)}
														</span>
													</div>
													<div>
														<span className=" ml-3 font-medium">
															{response?.text}
														</span>
													</div>
												</div>
											))}
										</>
									)
								)}
							</div>
						)}
						{!chapter.videoUrl ||
							(!chapter.videoUrl.includes("youtube.com") && (
								<div>Invalid or missing Youtube video URL.</div>
							))}
					</div>
					{/* <Separator/> */}
					{chapter?.description && (
						<div>
							<Preview
								value={chapter.description!}
								showLanguage={true}
							/>
						</div>
					)}
				</div>

				<div
					className="flex flex-col mx-auto px-10 mt-10 pb-20"
					style={{
						// maxHeight: "38rem",
						border: "0.12rem solid #6d94e3",
						borderRadius: "1rem",
						height: "auto",
						backgroundColor: "#cfe5ff",
						padding: "2rem",
						margin: "2rem 1.75rem 1.75rem 1.75rem",
						boxShadow: "0px 0px 20px 5px rgb(0 0 0 / 5%)",
					}}>
					<div
						style={{
							backgroundColor: "white",
							borderRadius: "1rem",
							padding: "0.5rem",
							boxShadow: "0px 0px 20px 5px rgb(0 0 0 / 5%)",
						}}>
						<SubmissionForm
							courseId={params.courseId}
							chapterId={params.chapterId}
							initialData={{
								submissionLink: "",
							}}
							nextChapterId={nextChapter?.id}
							isCompleted={!!userProgress?.isCompleted}
						/>
					</div>
					<Separator />
					{!!attachments.length && (
						<>
							<Separator />
							<div className="font-medium">
								{attachments.map((attachment) => (
									<PdfViewer
										key={attachment}
										fileName={`/pdf/${attachment.url}`}
									/>
								))}
							</div>
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default ChapterIdPage;
