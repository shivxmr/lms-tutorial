"use client";
import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
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
import { useConfettiStore } from "@/hooks/use-confetti-store";
import { getQuestions } from "@/actions/get-questions";

import { Plus } from "lucide-react";

interface SubmissionFormProps {
  initialData: {
    submissionLink?: string;
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
  // Define an array schema for questions, each containing an answer field
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
      router.reload();

      toast.success("Progress updated");
    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <div className="m-1 rounded-md p-4 pl-0">
        <div className="font-big flex items-center justify-between">
          <div>
            <Button onClick={toggleEdit} variant="ghost" className="font-large">
              {isEditing ? (
                <>Cancel</>
              ) : (
                <>
                  <Plus className="mr-2 w-6" />
                  <h1 className="text-lg color-gray pb-0 mb-0 pt-1">
                    Submit your work here
                  </h1>
                </>
              )}
            </Button>
          </div>
        </div>
        {!isEditing && <p className="text-sm">{initialData.submissionLink}</p>}
        {isEditing && (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 mt-4"
            >
              Placeholder
              {/* {questions.map((question, index) => (
              <div key={index}>
                {question.question_type === "text" && (
                  <FormField
                    control={form.control}
                    name={`questions[${index}].answer`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            disabled={isSubmitting}
                            placeholder={question.question}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
                {question.question_type === "code" && (
                  <FormField
                    control={form.control}
                    name={`questions[${index}].answer`}
                    render={({ field }) => (
                      <FormItem></FormItem>
                    )}
                  />
                )}
              </div>
            ))} */}
              <div className="flex items-center gap-x-2">
                <Button>Evaluate</Button>
                <Button disabled={!isValid || isSubmitting} type="submit">
                  Save
                </Button>
              </div>
            </form>
          </Form>
        )}
      </div>
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
