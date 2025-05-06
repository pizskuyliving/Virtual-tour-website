import Navbar from "@/Components/Navbar";
import { Head, Link, usePage } from "@inertiajs/react";
import backgroundUIR from "@/assets/background-uir.png";
import { Button } from "@/Components/ui/button";
import { PlayCircle } from "lucide-react";
import { PageProps } from "@/types";
import Footer from "@/Components/Footer";

export default function Home() {
    const { rooms } = usePage<PageProps<{ rooms: Room[] }>>().props;

    return (
        <>
            <Head title="Home" />
            <Navbar />
            <div
                className="mt-12 bg-cover bg-center bg-opacity-70 relative  flex items-center justify-center"
                style={{
                    height: "600px",
                    backgroundImage: `url(${backgroundUIR})`,
                }}
                aria-hidden="true"
            >
                <div className="h-full w-full bg-black/30 absolute"></div>
                <div className="h-full w-full absolute  z-20 flex items-center container mx-auto text-white">
                    <div className="flex flex-col items-center mx-auto w-full">
                        <p
                            className="text-5xl font-bold mb-4"
                            style={{
                                textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                            }}
                        >
                            Teknik Informatika Universitas Islam Riau
                        </p>
                        <p
                            className="text-2xl font-bold mb-8 "
                            style={{
                                textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                            }}
                        >
                            360 Virtual Tour
                        </p>
                        {rooms.length > 0 && (
                            <Link href="/Rooms">
                                <Button variant="secondary">
                                    <PlayCircle className="h-4 w-4" />
                                    Mulai Virtual Tour
                                </Button>
                            </Link>
                        )}
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
}
