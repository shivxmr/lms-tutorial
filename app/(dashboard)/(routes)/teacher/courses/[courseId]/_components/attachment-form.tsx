"use client";
import axios from "axios";
import { Pencil, PlusCircle, ImageIcon, File, Loader2, X } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Attachment, Chapter, Course } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { Blob, atob } from "buffer";

interface AttachmentFormProps {
	initialData: any & { attachments: Attachment[] };
	courseId: string;
	chapterId: string;
}

export const AttachmentForm = ({
	initialData,
	courseId,
	chapterId,
}: AttachmentFormProps) => {
	const {
		register,
		handleSubmit,
		reset,
		formState,
		formState: { errors },
	} = useForm();
	const [isEditing, setIsEditing] = useState(false);
	const [deletingId, setDeletingId] = useState<string | null>(null);
	const [document, setDocument] = useState<any>(null);

	const toggleEdit = () => setIsEditing((current) => !current);

	// const onChangePicture = (e: any) => {
	//   var blobObj = new Blob([atob(e.target.files[0])], {
	//     type: "application/pdf",
	//   });
	//   setDocument(URL.createObjectURL(blobObj));
	// };

	const router = useRouter();

	const onSubmit = async (data: any) => {
		const formData = new FormData();
		formData.append("file", data.file[0]);
		const res: any = await fetch(
			`/api/courses/${courseId}/chapters/${chapterId}/attachments`,
			{
				method: "POST",
				body: formData,
			}
		)
			.then((response) => toast.success(res?.message))
			.catch((err) => console.log(err));

		setDocument(null);
	};

	const onDelete = async (id: string) => {
		try {
			setDeletingId(id);
			await axios.delete(
				`/api/courses/${courseId}/chapters/${chapterId}/attachments/${id}`
			);
			toast.success("Attachment deleted");
			router.refresh();
		} catch {
			toast.error("Something went wrong");
		} finally {
			setDeletingId(null);
		}
	};

	return (
		<div className="mt-6 border bg-slate-100 rounded-md p-4">
			<div className="font-medium flex items-center justify-between">
				Course attachments
				<Button
					onClick={toggleEdit}
					variant="ghost">
					{isEditing && <>Cancel</>}
					{!isEditing && (
						<>
							<PlusCircle className="h-4 w-4 mr-2" />
							Add a file
						</>
					)}
				</Button>
			</div>
			{!isEditing && (
				<>
					{initialData?.attachments?.length === 0 && (
						<p className="text-sm mt-2 text-slate-500 italic">
							No attachments yet
						</p>
					)}
					{initialData?.attachments?.length > 0 && (
						<div className="space-y-2">
							{initialData.attachments.map((attachment: any) => (
								<div
									key={attachment.id}
									className="flex items-center p-3 w-full bg-sky-100 border-sky-200 border text-sky-700 rounded-md">
									<File className="h-4 w-4 mr-2 flex-shrink-0" />
									<p className="text-xs line-clamp-1">{attachment.name}</p>
									{deletingId === attachment.id && (
										<div>
											<Loader2 className="h-4 w-4 animate-spin" />
										</div>
									)}
									{deletingId !== attachment.id && (
										<button
											onClick={() => onDelete(attachment.id)}
											className="ml-auto hover:opacity-75 transition">
											<X className="h-4 w-4" />
										</button>
									)}
								</div>
							))}
						</div>
					)}
				</>
			)}
			{isEditing && (
				<div>
					<form onSubmit={handleSubmit(onSubmit)}>
						<input
							type="file"
							accept=".pdf"
							{...register("file", { required: true })}
						/>
						<input type="submit" />
					</form>

					<div className="text-xs text-muted-foreground mt-4">
						Add anything your students might need to complete the course.
					</div>
				</div>
			)}
		</div>
	);
};
