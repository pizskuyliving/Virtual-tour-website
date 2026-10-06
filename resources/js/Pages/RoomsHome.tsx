import Navbar from "@/Components/Navbar";
import { Head, usePage, Link } from "@inertiajs/react";
import backgroundUIR from "@/assets/background-uir.png";
import Footer from "@/Components/Footer";
import { PageProps } from "@/types/index";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useCallback } from "react";


export default function RoomsHome() {
    const { rooms } = usePage<PageProps<{ rooms: Room[] }>>().props;

    useEffect(() => {
        let isAOSInitialized = false;

        const initializeAOS = () => {
            try {
                if (!isAOSInitialized) {
                    AOS.init({
                        duration: 1000,
                        once: true,
                        offset: 120,
                        easing: "ease-in-out",
                        disable: false,
                        mirror: false,
                        anchorPlacement: "top-bottom",
                    });
                    isAOSInitialized = true;
                }
            } catch (error) {
                console.warn("AOS initialization failed:", error);
            }
        };

        initializeAOS();

        const handleVisibilityChange = () => {
            if (document.visibilityState === "hidden") {
                try {
                    AOS.refresh();
                } catch (error) {
                    console.warn("AOS refresh failed:", error);
                }
            }
        };

        document.addEventListener("visibilitychange", handleVisibilityChange);

        return () => {
            document.removeEventListener(
                "visibilitychange",
                handleVisibilityChange
            );

            try {
                if (isAOSInitialized) {
                    AOS.refresh();
                }
            } catch (error) {
                console.warn("AOS cleanup failed:", error);
            }
        };
    }, []);

    const getImageSrc = useCallback((room: Room): string => {
        if (room.cover) {
            return room.cover;
        }
        if (room.image) {
            return room.image;
        }
        return "data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22400%22%20height%3D%22300%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22%23f3f4f6%22/%3E%3Ctext%20x%3D%2250%25%22%20y%3D%2245%25%22%20font-family%3D%22Arial%22%20font-size%3D%2216%22%20fill%3D%22%236b7280%22%20text-anchor%3D%22middle%22%20dy%3D%22.3em%22%3E%3Ctspan%20font-weight%3D%22bold%22%3EVirtual%20Tour%3C/tspan%3E%3C/text%3E%3Ctext%20x%3D%2250%25%22%20y%3D%2260%25%22%20font-family%3D%22Arial%22%20font-size%3D%2212%22%20fill%3D%22%239ca3af%22%20text-anchor%3D%22middle%22%20dy%3D%22.3em%22%3EGambar%20tidak%20tersedia%3C/text%3E%3C/svg%3E";
    }, []);

    const handleImageError = useCallback(
        (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
            const target = e.target as HTMLImageElement;
            if (!target.src.includes("data:image/svg+xml")) {
                target.src =
                    "data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22400%22%20height%3D%22300%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22%23fee2e2%22/%3E%3Ctext%20x%3D%2250%25%22%20y%3D%2245%25%22%20font-family%3D%22Arial%22%20font-size%3D%2214%22%20fill%3D%22%23dc2626%22%20text-anchor%3D%22middle%22%20dy%3D%22.3em%22%3E%E2%9A%A0%EF%B8%8F%20Error%3C/text%3E%3Ctext%20x%3D%2250%25%22%20y%3D%2260%25%22%20font-family%3D%22Arial%22%20font-size%3D%2212%22%20fill%3D%22%23b91c1c%22%20text-anchor%3D%22middle%22%20dy%3D%22.3em%22%3EGagal%20memuat%20gambar%3C/text%3E%3C/svg%3E";
            }
        },
        []
    );

    const handleImageLoad = useCallback((roomName: string) => {
        if (import.meta.env.DEV) {
            console.log(`Image loaded for room: ${roomName}`);
        }
    }, []);

    return (
        <>
            <Head title="Virtual Tour - Teknik Informatika UIR" />
            <Navbar />

            {/* Hero Section */}
            <div
                className="relative mt-12 flex items-center justify-center bg-cover bg-center bg-no-repeat"
                style={{
                    height: "min(60vh, 400px)",
                    backgroundImage: `url(${backgroundUIR})`,
                }}
                role="banner"
                aria-label="Hero section with university background"
            >
                <div
                    className="absolute inset-0 bg-black/40"
                    aria-hidden="true"
                ></div>

                <div className="relative z-20 mx-auto max-w-7xl px-4 text-center text-white sm:px-6 lg:px-8">
                    <h1
                        className="text-3xl font-bold leading-tight md:text-5xl lg:text-6xl"
                        style={{ textShadow: "0px 4px 6px rgba(0, 0, 0, 0.3)" }}
                    >
                        Teknik Informatika Universitas Islam Riau
                    </h1>
                    <p
                        className="mt-4 text-lg opacity-90 md:text-xl"
                        style={{ textShadow: "0px 2px 4px rgba(0, 0, 0, 0.3)" }}
                    >
                        Jelajahi fasilitas prodi dengan teknologi Virtual Tour
                        360°
                    </p>
                </div>
            </div>

            {/* Virtual Tour Section Title */}
            <section className="py-12" aria-labelledby="virtual-tour-title">
                <h2
                    id="virtual-tour-title"
                    className="text-center text-4xl font-bold md:text-5xl lg:text-6xl"
                >
                    Virtual Tour
                </h2>
                <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-gray-600">
                    Kunjungi lokasi-lokasi di Prodi Teknik Informatika secara
                    virtual
                </p>
            </section>

            {/* Rooms Grid Section */}
            <section
                className="mx-auto max-w-[1500px] px-4 pb-16 sm:px-6 lg:px-8"
                aria-labelledby="rooms-section-title"
            >
                <h3 id="rooms-section-title" className="sr-only">
                    Daftar Lokasi Virtual Tour
                </h3>

                {rooms.length === 0 ? (
                    <div
                        className="py-20 text-center"
                        role="status"
                        aria-live="polite"
                    >
                        <div className="mx-auto max-w-md">
                            <div className="text-6xl mb-4">🏢</div>
                            <p className="text-xl text-gray-600 mb-2">
                                Tidak ada ruangan yang tersedia
                            </p>
                            <p className="text-sm text-gray-500">
                                Virtual tour sedang dalam proses pengembangan
                            </p>
                        </div>
                    </div>
                ) : (
                    <div
                        className="flex snap-x snap-mandatory overflow-x-auto pb-4 md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-6 lg:gap-6"
                        role="list"
                        aria-label="Daftar ruangan virtual tour"
                    >
                        {rooms.map((room, index) => (
                            <Link
                                key={room.id}
                                href={`/rooms/${room.id}`}
                                className="flex-none snap-center mr-4 w-10/12 md:mr-0 md:w-auto transform overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                data-aos="fade-up"
                                data-aos-delay={index * 100}
                                data-aos-duration="800"
                                role="listitem"
                                aria-label={`Virtual tour ${room.name}`}
                            >
                                <div className="aspect-w-16 aspect-h-9 overflow-hidden">
                                    {/* ✅ FIXED: Simple img tag without fetchPriority */}
                                    <img
                                        className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                                        src={getImageSrc(room)}
                                        alt={`Foto ruangan ${room.name}`}
                                        loading={index < 4 ? "eager" : "lazy"}
                                        onError={handleImageError}
                                        onLoad={() =>
                                            handleImageLoad(room.name)
                                        }
                                        decoding="async"
                                    />
                                </div>
                                <div className="p-4">
                                    <h3 className="text-center text-lg font-semibold text-gray-800 line-clamp-2">
                                        {room.name}
                                    </h3>

                                    <div className="mt-3 text-center">
                                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                            🎮 Virtual Tour
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </section>

            <Footer />
        </>
    );
}
