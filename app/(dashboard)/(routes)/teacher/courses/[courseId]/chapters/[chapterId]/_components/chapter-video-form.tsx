"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Pencil } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface ChapterVideoFormProps {
  initialData: {
    videoUrl: string | any;
  };
  courseId: string;
  chapterId: string;
}

const formSchema = z.object({
  videoUrl: z.string().min(1),
});

export const ChaptervideoForm = ({
  initialData,
  courseId,
  chapterId,
}: ChapterVideoFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [video, setVideo] = useState(initialData.videoUrl); // Initialize with initialData.videoUrl

  const toggleEdit = () => setIsEditing((current) => !current);

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  const { isSubmitting, isValid } = form.formState;

  const generateTranscript = async (videoUrl: string) => {
    try {
      setIsLoading(true);
      console.log("video: ", video);
      console.log("transcript: ", transcript);
      console.log("videoUrl: ", videoUrl);
      if (video) {
        const videoId = extractVideoId(videoUrl);
        const transcriptResponse = await axios.post(`/api/transcript`, {
          id: videoId,
        });
        const transcript = transcriptResponse.data;
        setTranscript(transcript || "");
        setIsLoading(false);
      } else {
        setIsLoading(false);
        toast.error("Video URL is null");
      }
    } catch {
      setIsLoading(false);
      toast.error("Failed to generate transcript");
    }
  };

  // useEffect(() => {
  //   if (video && !transcript) {
  //     generateTranscript(video); // Use video instead of initialData.videoUrl
  //   }
  // }, [video, transcript]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      console.log("onSubmit values.videoUrl: ", values.videoUrl);
      console.log("onSubmit video: ", video);
      console.log("onSubmit transcript: ", transcript);
      await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}`, {
        videoUrl: values.videoUrl,
        transcript: transcript,
      });
      toast.success("Chapter updated");
      toggleEdit();
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
      console.log("error: ", error);
    }
  };

  const extractVideoId = (videoUrl: string) => {
    const startIndex = videoUrl.indexOf("v=") + 2;
    const endIndex = videoUrl.indexOf("&", startIndex);
    if (endIndex === -1) {
      return videoUrl.substring(startIndex);
    }
    return videoUrl.substring(startIndex, endIndex);
  };

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Chapter video
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit video
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <>
          <p className="text-sm mt-2">{initialData.videoUrl}</p>
          <h1>Video Transcript</h1>
          <p>{transcript}</p>
        </>
      )}
      {!isEditing && (
        <>{/* <p className="text-sm mt-2">{initialData.videoUrl}</p> */}</>
      )}
      {isEditing && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
          >
            <FormItem>
              <FormControl>
                <Input
                  disabled={isSubmitting}
                  placeholder="e.g. 'Introduction to the course'"
                  {...form.register("videoUrl")}
                  onChange={(e) => setVideo(e.target.value)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
            {transcript ? (
              <textarea
                className="mt-2 w-full h-40 p-3"
                value={transcript || ""}
                onChange={(e) => setTranscript(e.target.value)}
              />
            ) : (
              <>
                <Button
                  onClick={() => generateTranscript(video)} // Use video instead of initialData.videoUrl
                  disabled={isLoading}
                >
                  {isLoading
                    ? "Generating Transcript..."
                    : "Generate Transcript"}
                </Button>
              </>
            )}
            <div className="flex items-center gap-x-2">
              <Button type="submit">Save</Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};

// https://www.youtube.com/watch?v=u47GtXwePms
