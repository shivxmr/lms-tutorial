import { auth } from "@clerk/nextjs";
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

const ChapterIdPage = async ({
	params,
}: {
	params: { courseId: string; chapterId: string };
}) => {
	const { userId } = auth();

	if (!userId) {
		return redirect("/");
	}

	const { chapter, course, attachments, nextChapter, userProgress, purchase } =
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
		const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
			.toString()
			.padStart(2, "0")}:${seconds.toString().padStart(2, "0")}.${milliseconds
			.toString()
			.padStart(3, "0")}`;

		return formattedTime;
	};

	const isLocked = !chapter.isFree && !purchase;
	const completeOnEnd = !!purchase && !userProgress?.isCompleted;

	return (
		<div>
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
			<div className="flex flex-col mx-auto px-10 mt-10 pb-20">
				<div
					className="grid grid-cols-2 gap-x-5"
					style={{ maxHeight: "700px" }}>
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
					<div
						className="border h-full overflow-y-auto w-full"
						style={{ maxHeight: "inherit" }}>
						{YoutubeTranscript.fetchTranscript(chapter.videoUrl || "").then(
							(res) => (
								<>
									{res.map((response) => (
										<div
											className="flex"
											key={response.offset}>
											<span className="text-gray-400">
												{getTime(response?.duration + response?.offset)}
											</span>
											<span className=" ml-3 font-medium">
												{response?.text}
											</span>
										</div>
									))}
								</>
							)
						)}
					</div>
				</div>
				<div>
					<div className="p-4 flex flex-col md:flex-row items-center justify-between">
						<h2 className="text-2xl font-semibold mb-2">{chapter.title}</h2>
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
						<Separator />
					<div>
						<Preview value={chapter.description!} />
					</div>
					<div className="">
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
							<div className="p-4">
								{attachments.map((attachment) => (
									<a
										href={attachment.url}
										target="_blank"
										key={attachment.id}
										className="flex items-center p-3 w-full bg-sky-200 border text-sky-700 rounded-md hover:underline">
										<File />
										<p className="line-clamp-1">{attachment.name}</p>
									</a>
								))}
							</div>
						</>
					)}
					<div className="mt-4 mb-4">
					<Separator />
					</div>
					<embed src="/pdf/Report.pdf" type="application/pdf" width="100%" height="600px" />
				</div>
			</div>
		</div>
	);
};

export default ChapterIdPage;