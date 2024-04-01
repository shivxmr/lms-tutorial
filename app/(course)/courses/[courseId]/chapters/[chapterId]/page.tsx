import { YoutubeTranscript } from "youtube-transcript";
import { redirect } from "next/navigation";
import { File } from "lucide-react";
import { getChapter } from "@/actions/get-chapter";
import { Banner } from "@/components/banner";
import { Separator } from "@/components/ui/separator";
import { Preview } from "@/components/preview";
import Image from "next/image";

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
  const userId = session?.userId;
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
        <Banner variant="success" label="You already completed this chapter." />
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
            border: "0.12rem solid #e3e3e3",
            borderRadius: "0.1rem",
            height: "auto",
            // backgroundColor: "#cfe5ff",
            backgroundColor: "white",
            padding: "2rem",
            margin: "1.75rem",
            boxShadow: "0px 0px 20px 5px rgb(0 0 0 / 5%)",
          }}
        >
          <div className="grid grid-cols-2 gap-x-5 mb-3">
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
                  borderRadius: "0.1rem",
                }}
              >
                <form className="max-w-100 mx-1 mb-3">
                  <label
                    // for="default-search"
                    className="text-sm font-medium text-gray-900 sr-only dark:text-white"
                  >
                    Search
                  </label>
                  <div className="relative">
                    <input
                      type="search"
                      id="default-search"
                      className="w-full px-4 py-3 ps-3 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 hover:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500 transition-all"
                      placeholder="Search"
                      required
                    />
                    <button
                      type="submit"
                      className="text-white absolute end-2.5 bottom-2.5 bg-black hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-3 py-2 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800 transition-all"
                    >
                      {/* <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none"> */}
                      <svg
                        className="w-3 h-3 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 20"
                      >
                        <path
                          stroke="white"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                        />
                      </svg>
                    </button>
                  </div>
                </form>
                {YoutubeTranscript.fetchTranscript(chapter.videoUrl || "").then(
                  (res) => (
                    <>
                      {res.map((response) => (
                        <div
                          className="flex border-solid border-y border-blue-50 hover:border-blue-500 transition-all ease-out"
                          key={response.offset}
                        >
                          <div
                            style={{
                              width: "70px",
                              padding: "0.1rem 0.1rem 0.1rem 0.5rem",
                            }}
                          >
                            <div className="text-gray font-medium font-bold">
                              {getTime(response?.duration + response?.offset)}
                            </div>
                          </div>
                          <div>
                            <div className="pl-3 font-medium text-wrap">
                              {response?.text}
                            </div>
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
              <Preview value={chapter.description!} showLanguage={true} />
            </div>
          )}
        </div>
        {!!attachments.length && (
          <>
            <div
              className="flex flex-col mx-auto px-10 mt-10 pb-20"
              style={{
                // maxHeight: "38rem",
                border: "0.12rem solid #e3e3e3",
                borderRadius: "0.1rem",
                height: "auto",
                backgroundColor: "white",
                padding: "2rem",
                margin: "2rem 1.75rem 1.75rem 1.75rem",
                boxShadow: "0px 0px 20px 5px rgb(0 0 0 / 5%)",
              }}
            >
              <div
                style={{
                  backgroundColor: "white",
                  borderRadius: "0.1rem",
                  padding: "0.5rem",
                  boxShadow: "0px 0px 20px 5px rgb(0 0 0 / 5%)",
                }}
              >
                <div className="font-medium flex">
                  {attachments.map((attachment) => (
                    <div
                      key={attachment.id}
                      className="m-2 flex flex-col items-center justify-center"
                    >
                      <a
                        href={`/pdf/${attachment.url}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-black-500 hover:underline text-pretty items-center justify-center"
                      >
                        <div className="m-2 flex flex-col items-center justify-center text-wrap">
                          <Image
                            src="/pdfIcon.png"
                            width={75}
                            height={75}
                            alt="Picture of the author"
                          ></Image>
                          <span>
                            {attachment.name.length > 15
                              ? attachment.name.substring(0, 15) + "...."
                              : attachment.name}
                          </span>
                        </div>
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
        <SubmissionForm
          courseId={params.courseId}
          chapterId={params.chapterId}
          initialData={{
            submissionLink: "",
            questions: [{ answer: "" }],
          }}
          nextChapterId={nextChapter?.id}
          isCompleted={!!userProgress?.isCompleted}
        />
      </div>
    </div>
  );
};

export default ChapterIdPage;
