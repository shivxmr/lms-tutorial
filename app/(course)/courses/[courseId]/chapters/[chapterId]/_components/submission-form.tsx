"use client";
import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
// import { useRouter } from "next/router";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useConfettiStore } from "@/hooks/use-confetti-store";
import { getQuestions } from "@/actions/get-questions";

import { Plus } from "lucide-react";
import { Separator } from "@radix-ui/react-separator";

interface SubmissionFormProps {
  initialData: {
    submissionLink: string; // Provide a default value for the submissionLink property
    questions: [
      {
        answer: string; // Provide a default value for the answer property
      }
    ];
  };
  courseId: string;
  chapterId: string;
  isCompleted?: boolean;
  nextChapterId?: string;
}

// const formSchema = z.object({
//   submissionLink: z.string().min(1, {
//     message: "Submission is required",
//   }),
// });

const formSchema = z.object({
  submissionLink: z.string().min(1, {
    message: "Submission is required",
  }),
  questions: z.array(
    z.object({
      answer: z.string().min(1, {
        message: "Submission is required",
      }),
    })
  ),
});

export const SubmissionForm = ({
  initialData,
  courseId,
  chapterId,
  isCompleted,
  nextChapterId,
}: SubmissionFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [questions, setQuestions] = useState<any[]>([]);
  const confetti = useConfettiStore();
  const toggleEdit = () => setIsEditing((current) => !current);

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  const { isSubmitting, isValid } = form.formState;

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const fetchedQuestions = await getQuestions({ chapterId });
        setQuestions(fetchedQuestions);
        console.log("fetch questions: ", questions);
        console.log("chapterId: ", chapterId);
      } catch (error) {
        console.log("[GET_QUESTIONS]", error);
      }
    };

    if (isEditing) {
      fetchQuestions();
    }
  }, [chapterId, isEditing]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
    try {
      await axios.put(
        `/api/courses/${courseId}/chapters/${chapterId}/progress`,
        {
          ...values,
          isCompleted: !isCompleted,
        }
      );
      if (!isCompleted && !nextChapterId) {
        confetti.onOpen();
      }

      if (!isCompleted && nextChapterId) {
        router.push(`/courses/${courseId}/chapters/${nextChapterId}`);
      }

      toast.success("Progress updated");
      toggleEdit();
      // router.reload();
      window.location.reload();

      toast.success("Progress updated");
    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <div className="font-big flex items-center justify-center">
        {!isEditing ? (
          <Button
            onClick={toggleEdit}
            variant="ghost"
            className="font-large  w-full"
          >
            <>
              <Plus className="mr-2 w-6" />
              <h1 className="text-lg color-gray p-2 mb-0">
                Submit your work here
              </h1>
            </>
          </Button>
        ) : null}
      </div>
      {!isEditing && <p className="text-sm">{initialData.submissionLink}</p>}
      {isEditing && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 m-4"
          >
            {questions.map((question, index) => (
              <div key={index}>
                {question.question_type === "text" && (
                  <>
                    <div className="bg-neutral-100 p-3 rounded-md">
                      <h1 className="mb-2 mt-0 font-bold text-2xl">
                        Writing Exercise
                      </h1>
                      <h1 className="my-2 font-light text-lg">
                        {question.question}
                      </h1>
                      <FormField
                        control={form.control}
                        name={`questions[${index}].answer`}
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                disabled={isSubmitting}
                                placeholder="Type your answer here..."
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      {/* <textarea className="block p-2.5 w-full h-48 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></textarea> */}
                      <div className="flex mt-4 items-center gap-x-2 place-content-between">
                        <div className="flex items-center gap-x-2">
                          <Button>Evaluate</Button>
                          <Button
                            disabled={!isValid || isSubmitting}
                            type="submit"
                          >
                            Save
                          </Button>
                        </div>
                        <Button onClick={toggleEdit} variant="ghost">
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </>
                )}
                {question.question_type === "code" && (
                  <>
                    <div className="bg-neutral-100 p-3 rounded-md">
                      <h1 className="mb-2 mt-0 font-bold text-2xl">
                        Coding Exercise
                      </h1>
                      <h1 className="my-2 font-light text-lg">
                        {question.question}
                      </h1>
                      <FormField
                        control={form.control}
                        name={`questions[${index}].answer`}
                        render={({ field }) => (
                          <FormItem>
                            <code>
                              <textarea
                                className="block p-2.5 w-full h-48 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-gray-500 focus:border-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500"
                                placeholder="Code here"
                              ></textarea>
                            </code>
                          </FormItem>
                        )}
                      />
                      <div className="flex mt-4 items-center gap-x-2 place-content-between">
                        <div className="flex items-center gap-x-2">
                          <Button>Evaluate</Button>
                          <Button
                            disabled={!isValid || isSubmitting}
                            type="submit"
                          >
                            Save
                          </Button>
                        </div>
                        <Button onClick={toggleEdit} variant="ghost">
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))}
          </form>
        </Form>
      )}
    </>
  );
};

// questions = [
//   {
//     id: "5a3d9cc4-01d1-44c9-a334-f24f0d3a17e1",
//     chapterId: "0eecd864-200d-439b-a194-440796be10b6",
//     question: "Write a summary on RAG",
//     question_type: "text",
//   },
// ];
