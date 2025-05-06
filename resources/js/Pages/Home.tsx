import Image360 from "@/assets/istockphoto-1152699637-1024x1024.jpg";
import Navbar from "@/Components/Navbar";
import { Head } from "@inertiajs/react";
import Panorama360 from "./Panorama";

export default function Home() {
    return (
        <>
            <Head title="Home" />
            <Navbar />
            <Panorama360 imagePath={Image360} />
        </>
    );
}
