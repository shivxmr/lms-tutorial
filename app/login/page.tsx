import { LoginForm } from "@/components/login/form";

export default function LoginPage() {
	return (
		<section className="bg-ct-blue-600 min-h-screen pt-00">
			<div className="container mx-auto px-6 py-0 h-full flex justify-center items-center">
				<div className="md:w-8/12 lg:w-5/12 bg-white px-8 py--">
					<LoginForm />
				</div>
			</div>
		</section>
	);
}
