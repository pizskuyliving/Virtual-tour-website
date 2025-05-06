import Navbar from "@/Components/Navbar";
import { Head, usePage } from "@inertiajs/react";
import Panorama360 from "../PanoramaVista";
import { PageProps } from "@/types";
import { HelpCircle } from "lucide-react";
import { Button } from "@/Components/ui/button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/Components/ui/popover";

export default function PanoramaRuangan() {
    const { room, image } =
        usePage<PageProps<{ room: Room; image: string }>>().props;

    return (
        <>
            <Head title={room.name} />
            <Navbar />
            <Panorama360 imagePath={image} />
        </>
    );
}