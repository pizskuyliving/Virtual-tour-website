import Navbar from "@/Components/Navbar";
import { Head, Link, usePage } from "@inertiajs/react";
import backgroundUIR from "@/assets/MhsTI.jpeg";
import { Button } from "@/Components/ui/button";
import { PlayCircle } from "lucide-react";
import { PageProps } from "@/types/index";
import Footer from "@/Components/Footer";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

export default function Home() {
    const { rooms } = usePage<PageProps<{ rooms: Room[] }>>().props;

    useEffect(() => {
        window.scrollTo(0, 0); // Memastikan halaman berada di posisi atas saat dimuat
        AOS.init({
            duration: 1000, // Durasi animasi dalam milidetik
            once: true, // Animasi hanya terjadi sekali
            startEvent: "DOMContentLoaded", // Animasi dimulai setelah halaman selesai dimuat
        });
    }, []);

    return (
        <>
            <Head title="Home" />
            <Navbar />
            <div
                className="mt-12 bg-cover bg-center bg-opacity-70 relative flex items-center justify-center"
                style={{
                    height: "700px",
                    backgroundImage: `url(${backgroundUIR})`,
                }}
                aria-hidden="true"
                data-aos="zoom-out" // Animasi fade-up saat scroll
                data-aos-offset="200" // Animasi dimulai setelah elemen berada 200px dari viewport
            >
                <div className="h-full w-full bg-black/30 absolute"></div>
                <div className="h-full w-full absolute z-20 flex items-center container mx-auto text-white">
                    <div className="flex flex-col items-center mx-auto w-full px-4 text-center">
                        <p
                            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-2 leading-tight"
                            style={{
                                textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                            }}
                            data-aos="zoom-in"
                            data-aos-offset="200" // Animasi dimulai setelah elemen berada 200px dari viewport
                        >
                            Prodi Teknik Informatika <br /> Fakultas Teknik
                            Universitas Islam Riau
                        </p>
                        <p
                            className="text-lg sm:text-xl lg:text-2xl font-bold mb-8"
                            style={{
                                textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                            }}
                            data-aos="fade-up"
                            data-aos-offset="200" // Animasi dimulai setelah elemen berada 200px dari viewport
                        >
                            360 Virtual Tour
                        </p>
                        {rooms.length > 0 && (
                            <Link href="/Rooms">
                                <Button
                                    className="bg-white text-emerald-700 font-semibold py-3 px-6 text-lg rounded-full shadow-lg hover:shadow-xl transform transition-all duration-300 ease-in-out hover:scale-105 focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50 flex items-center justify-center"
                                    data-aos="flip-up"
                                    data-aos-offset="200" // Animasi dimulai setelah elemen berada 200px dari viewport
                                >
                                    <PlayCircle className="h-5 w-5 mr-2" />
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
