import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import GuestLayout from "@/Layouts/GuestLayout";
import uirLogo from "@/assets/logo-uir.png";
import Footer from "@/Components/Footer";
import { Head, useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";

export default function ForgotPassword({ status }: { status?: string }) {
    const { data, setData, post, processing, errors } = useForm({
        email: "",
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("password.email"));
    };

    return (
        <>
            <GuestLayout>
                <Head title="Forgot Password" />
                {/* The single card box container for the forgot password form */}
                <div className="w-full sm:max-w-md px-6 py-8 bg-white dark:bg-gray-800 shadow-xl overflow-hidden sm:rounded-lg border border-gray-200 dark:border-gray-700">
                    {/* Custom UIR Logo for the forgot password form */}
                    <div className="flex justify-center mb-6">
                        <img
                            src={uirLogo} // Pastikan jalur ini benar
                            alt="UIR Logo"
                            className="h-24 w-auto object-contain" // Sesuaikan ukuran logo jika perlu
                        />
                    </div>

                    <div className="mb-6 text-sm text-gray-600 dark:text-gray-400 text-center">
                        Forgot your password? No problem. Just let us know your
                        email address and we will email you a password reset
                        link that will allow you to choose a new one.
                    </div>

                    {status && (
                        <div className="mb-4 text-sm font-medium text-green-600 dark:text-green-400">
                            {status}
                        </div>
                    )}

                    <form onSubmit={submit}>
                        {/* InputLabel for consistency, though not in original ForgotPassword */}
                        <label
                            htmlFor="email"
                            className="block font-medium text-sm text-gray-700 dark:text-gray-300"
                        >
                            Email
                        </label>
                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="mt-1 block w-full rounded-md shadow-sm border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            isFocused={true}
                            onChange={(e) => setData("email", e.target.value)}
                            required // Added required for better UX
                        />

                        <InputError message={errors.email} className="mt-2" />

                        <div className="mt-6 flex items-center justify-end">
                            <PrimaryButton
                                className="ms-4 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-900 focus:ring-indigo-500 py-2 px-4 rounded-md text-base font-semibold transition-colors duration-200"
                                disabled={processing}
                            >
                                Email Password Reset Link
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </GuestLayout>
            <Footer />
        </>
    );
}
