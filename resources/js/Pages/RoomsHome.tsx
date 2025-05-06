import Navbar from "@/Components/Navbar";
import { Head, usePage } from "@inertiajs/react";
import backgroundUIR from "@/assets/background-uir.png";
import organizationImage from "@/assets/organization.jpg";
import Footer from "@/Components/Footer";
import { PageProps } from "@/types";

export default function Organization() {
    const { rooms } = usePage<PageProps<{ rooms: Room[] }>>().props;
    return (
        <>
            <Head title="About" />
            <Navbar />

            {/* Hero Section */}
            <div
                className="mt-12 bg-cover bg-center relative flex items-center justify-center"
                style={{
                    height: "600px",
                    backgroundImage: `url(${backgroundUIR})`,
                }}
            >
                <div className="absolute inset-0 bg-black/30"></div>
                <div className="relative z-20 container mx-auto text-white text-center">
                    <h1
                        className="text-4xl md:text-5xl font-bold mb-4"
                        style={{ textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}
                    >
                        Teknik Informatika Universitas Islam Riau
                    </h1>

                </div>
            </div>

            <h1 className=" text-center my-12 font-bold text-6xl">
                Virtual Rooms
            </h1>

            <section className=" pb-12 mx-auto gap-5 grid grid-cols-4 max-w-[1500px]">
                {rooms.length === 0 && (
                            <p className="text-center">Tidak ada ruangan</p>
                )}
                {rooms.map((room) => 
                    <a className=" pb-5 border rounded-xl overflow-hidden shadow-lg" href={`/rooms/${room.id}`}>
                        <img className="w-" src={`${room.cover}`} alt="" />
                        <p className="text-center mt-5 text-lg font-bold">{room.name}</p>
                    </a>
                )}
            </section>

            <Footer />
        </>
    );
}