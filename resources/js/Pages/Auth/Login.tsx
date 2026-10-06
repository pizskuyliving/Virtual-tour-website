import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import GuestLayout from "@/Layouts/GuestLayout";
import Footer from "@/Components/Footer";
import uirLogo from "@/assets/logo-uir.png";
import { Head, Link, useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";

export default function Login({
    status,
    canResetPassword,
}: {
    status?: string;
    canResetPassword: boolean;
}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("login"), {
            onFinish: () => reset("password"),
        });
    };

    return (
        <>
            <GuestLayout>
                <Head title="Log in" />
                {status && (
                    <div className="mb-4 text-sm font-medium text-green-600">
                        {status}
                    </div>
                )}

                {/* The single card box container */}
                <div className="w-full sm:max-w-md px-6 py-8 bg-white dark:bg-gray-800 shadow-xl overflow-hidden sm:rounded-lg border border-gray-200 dark:border-gray-700">
                    {/* Custom UIR Logo - Replaces the thunderbolt logo */}
                    <div className="flex justify-center mb-6">
                        <img
                            src={uirLogo} // Path to your UIR logo image
                            alt="UIR Logo"
                            className="h-24 w-auto object-contain" // Adjust size as needed
                        />
                    </div>

                    <form onSubmit={submit}>
                        <div>
                            <InputLabel htmlFor="email" value="Email" />

                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="mt-1 block w-full rounded-md shadow-sm border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                autoComplete="username"
                                isFocused={true}
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                            />

                            <InputError
                                message={errors.email}
                                className="mt-2"
                            />
                        </div>

                        <div className="mt-4">
                            <InputLabel htmlFor="password" value="Password" />

                            <TextInput
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className="mt-1 block w-full rounded-md shadow-sm border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                autoComplete="current-password"
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                            />

                            <InputError
                                message={errors.password}
                                className="mt-2"
                            />
                        </div>

                        <div className="mt-4 block">
                            <label className="flex items-center">
                                <Checkbox
                                    name="remember"
                                    checked={data.remember}
                                    onChange={(e) =>
                                        setData("remember", e.target.checked)
                                    }
                                />
                                <span className="ms-2 text-sm text-gray-600 dark:text-gray-400">
                                    Remember me
                                </span>
                            </label>
                        </div>

                        <div className="mt-6 flex items-center justify-end">
                            {canResetPassword && (
                                <Link
                                    href={route("password.request")}
                                    className="rounded-md text-sm text-indigo-600 underline hover:text-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:text-indigo-400 dark:hover:text-indigo-200"
                                >
                                    Forgot your password?
                                </Link>
                            )}

                            <PrimaryButton
                                className="ms-4 bg-green-600 hover:bg-green-700 active:bg-green-900 focus:ring-green-500 py-2 px-4 rounded-md text-base font-semibold transition-colors duration-200"
                                disabled={processing}
                            >
                                LOGIN NOW
                            </PrimaryButton>
                        </div>

                        <div className="mt-8 text-sm text-gray-600 text-center dark:text-gray-400">
                            Don't have an account?
                            <Link
                                href={route("register")} // Assuming you have a register route
                                className="ms-1 text-sm text-indigo-600 underline hover:text-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:text-indigo-400 dark:hover:text-indigo-200"
                            >
                                Register
                            </Link>
                        </div>
                    </form>
                </div>
            </GuestLayout>
            <Footer />
        </>
    );
    
}
