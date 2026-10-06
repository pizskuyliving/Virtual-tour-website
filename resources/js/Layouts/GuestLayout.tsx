import { PropsWithChildren } from "react";
// import { Link } from "@inertiajs/react"; // Not strictly needed for this file's current content

export default function Guest({ children }: PropsWithChildren) {
    return (
        // Example of a solid background color - change as desired
        <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100 dark:bg-gray-900">
            {/* If you previously had an ApplicationMark or another logo here,
                it's now managed within Login.tsx for the card. */}
            {children}
        </div>
    );
}
