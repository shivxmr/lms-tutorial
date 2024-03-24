import { RegisterForm } from "@/components/register/form";

export default function RegisterPage() {
  return (
    <>
      <section className="bg-ct-blue-600 min-h-screen pt-0">
        <div className="container mx-auto px-0 py-0 h-full flex justify-center items-center">
          <div className="md:w-8/12 lg:w-5/12 bg-white px-8 py-0">
            <RegisterForm />
          </div>
        </div>
      </section>
    </>
  );
}
