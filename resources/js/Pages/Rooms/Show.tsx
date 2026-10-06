import Navbar from "@/Components/Navbar";
import Panorama360 from "@/Components/PanoramaVista";
import { Head, Link, usePage } from "@inertiajs/react";
import { ArrowLeft } from "lucide-react";
import { PageProps } from "@/types/index";

export default function PanoramaRuangan() {
    const { room, image } =
        usePage<PageProps<{ room: Room; image: string }>>().props;

    return (
        <>
            <Head title={room.name} />
            <Navbar />
            {/* Sit below the fixed navbar (h-16) so it does not cover the tour */}
            <div className="fixed inset-x-0 bottom-0 top-16">
                <Panorama360 imagePath={image} title={`Virtual tour ${room.name}`} />
            </div>
            <Link
                href={route("room.index")}
                className="fixed left-4 top-20 z-40 inline-flex items-center gap-2 rounded-full bg-[#038A8D] px-4 py-2 text-sm font-semibold text-white shadow-lg transition-colors hover:bg-[#02696b] focus:outline-none focus:ring-2 focus:ring-white"
            >
                <ArrowLeft className="h-4 w-4" />
                Kembali
            </Link>
        </>
    );
}
