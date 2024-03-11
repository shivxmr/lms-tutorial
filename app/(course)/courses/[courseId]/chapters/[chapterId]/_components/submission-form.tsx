"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Pencil } from "lucide-react";
import { useState } from "react";
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

interface SubmissionFormProps {
	initialData: {
		submissionLink?: string;
	};
	courseId: string;
	chapterId: string;
	isCompleted?: boolean;
	nextChapterId?: string;
}

const formSchema = z.object({
	submissionLink: z.string().min(1, {
		message: "Submission is required",
	}),
});

export const SubmissionForm = ({
	initialData,
	courseId,
	chapterId,
	isCompleted,
	nextChapterId,
}: SubmissionFormProps) => {
	const [isEditing, setIsEditing] = useState(false);
	const confetti = useConfettiStore();
	const toggleEdit = () => setIsEditing((current) => !current);

	const router = useRouter();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: initialData,
	});

	const { isSubmitting, isValid } = form.formState;

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		console.log(values);
		try {
			await axios.put(
				`/api/courses/${courseId}/chapters/${chapterId}/progress`,
				{ ...values, isCompleted: !isCompleted }
			);
			if (!isCompleted && !nextChapterId) {
				confetti.onOpen();
			}

			if (!isCompleted && nextChapterId) {
				router.push(`/courses/${courseId}/chapters/${nextChapterId}`);
			}

			toast.success("Progress updated");
			toggleEdit();
			router.refresh();

			toast.success("Progress updated");
		} catch {
			toast.error("Something went wrong");
		}
	};

	return (
		<div className="mt-6 border bg-blue-100 rounded-md p-4">
			<div className="font-medium flex items-center justify-between">
				Submit your work here
				<div>
					<Button
						onClick={toggleEdit}
						variant="ghost">
						{isEditing ? (
							<>Cancel</>
						) : (
							<>
								<Pencil className="h-4 w-4 mr-2" />
								Edit
							</>
						)}
					</Button>
				</div>
			</div>
			{!isEditing && (
				<p className="text-sm mt-2">{initialData.submissionLink}</p>
			)}
			{isEditing && (
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="space-y-4 mt-4">
						<FormField
							control={form.control}
							name="submissionLink"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input
											disabled={isSubmitting}
											placeholder="e.g. 'http://github.com/'"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<div className="flex items-center gap-x-2">
							<Button>Evaluate</Button>
							<Button
								disabled={!isValid || isSubmitting}
								type="submit">
								Save
							</Button>
						</div>
					</form>
				</Form>
			)}
		</div>
	);
};
