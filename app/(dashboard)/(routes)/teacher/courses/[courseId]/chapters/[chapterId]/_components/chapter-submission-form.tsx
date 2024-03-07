"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Pencil } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Chapter } from "@prisma/client";

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Editor } from "@/components/editor";
import { Preview } from "@/components/preview";

interface ChapterSubmissionFormProps {
	initialData: Chapter;
	courseId: string;
	chapterId: string;
}

const formSchema = z.object({
	isSubmitable: z.boolean().default(false),
	submitType: z.string().min(1),
});

export const ChapterSubmissionForm = ({
	initialData,
	courseId,
	chapterId,
}: ChapterSubmissionFormProps) => {
	const [isEditing, setIsEditing] = useState(false);

	const toggleEdit = () => setIsEditing((current) => !current);

	const router = useRouter();

	const {
		register,
		handleSubmit,
		watch,
		formState: { errors, isSubmitting, isValid },
	} = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			isSubmitable: initialData.isSubmitable,
		},
	});

	const isSubmition = watch("isSubmitable");

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		try {
			await axios.patch(
				`/api/courses/${courseId}/chapters/${chapterId}`,
				values
			);
			toast.success("Chapter updated");
			toggleEdit();
			router.refresh();
		} catch {
			toast.error("Something went wrong");
		}
	};

	console.log(errors);

	return (
		<div className="mt-6 border bg-slate-100 rounded-md p-4">
			<form onSubmit={handleSubmit(onSubmit)}>
				<input
					type="checkbox"
					placeholder="Is there some submission in this?"
					{...register("isSubmitable", { required: true })}
				/>

				{isSubmition ? "Can be seen" : "Cant be seen"}

				<input type="submit" />
			</form>
		</div>
	);
};
