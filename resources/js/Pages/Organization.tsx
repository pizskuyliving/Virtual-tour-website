import Navbar from "@/Components/Navbar";
import { Head } from "@inertiajs/react";
import backgroundUIR from "@/assets/background-uir.png";
import organizationImage from "@/assets/organization.jpg";
import Footer from "@/Components/Footer";
import ErrorBoundary from "@/Components/ErrorBoundary";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useState, useCallback } from "react";
import grootImage from "@/assets/groot.png";
import himatifImage from "@/assets/Himatif.png";
import primaImage from "@/assets/Prima.png";

type Organization = {
    name: string;
    image: string;
    description: string;
};

type DosenData = {
    nama: string;
    image: string;
};

export default function Organization() {
    const [selectedOrganization, setSelectedOrganization] =
        useState<Organization | null>(null);
    const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());
    const [loadingImages, setLoadingImages] = useState<Set<string>>(new Set());

    const closeModal = useCallback(() => {
        setSelectedOrganization(null);
    }, []);

    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true,
            startEvent: "DOMContentLoaded",
        });

        // Cleanup function
        return () => {
            AOS.refresh();
        };
    }, []);

    // Handle keyboard events for modal
    useEffect(() => {
        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === "Escape" && selectedOrganization) {
                closeModal();
            }
        };

        if (selectedOrganization) {
            document.addEventListener("keydown", handleEscape);
            document.body.style.overflow = "hidden"; // Prevent background scroll
        }

        return () => {
            document.removeEventListener("keydown", handleEscape);
            document.body.style.overflow = "unset";
        };
    }, [selectedOrganization, closeModal]);

    const DOSEN: DosenData[] = [
        {
            nama: "Dr. Evizal, S.T., M.Eng.",
            image: "evizal.jpg",
        },
        {
            nama: "Dr. Arbi Haza Nasution, M.IT.",
            image: "arbi.jpg",
        },
        {
            nama: "Ir. Des Suryani, M.Sc.",
            image: "des.jpg",
        },
        {
            nama: "Dr. Apri Siswanto, S.Kom., M.Kom.",
            image: "apri.jpg",
        },
        {
            nama: "Akmar Efendi, S.Kom, M.Kom.",
            image: "akmar.jpg",
        },
        {
            nama: "Ana Yulianti, S.T., M.Kom.",
            image: "ana.jpg",
        },
        {
            nama: "Ause Labellapansa, S.T., M.Kom., M.Cs.",
            image: "ause.jpg",
        },
        {
            nama: "Yudhi Arta., S.T., M.Kom.",
            image: "yudhi.jpg",
        },
        {
            nama: "Nesi Syafitri, S.Kom., M.Cs.",
            image: "nesi.jpg",
        },
        {
            nama: "Abdul Syukur, S.Kom., M.Kom.",
            image: "abdul.jpg",
        },
        {
            nama: "Hendra Gunawan, S.T., M.Eng.",
            image: "hendra.jpg",
        },
        {
            nama: "Rizdqi Akbar Ramadhan, S.Kom., M.Kom, CHFI.",
            image: "rama.jpg",
        },
        {
            nama: "Panji Rachmat Setiawan, S.Kom., MMSI.",
            image: "panji.jpg",
        },
        {
            nama: "Sri Listia Rosa, S.T., M.Sc.",
            image: "sri.jpg",
        },
        {
            nama: "Octadino Haryadi, S.Kom., M.Kom.",
            image: "octa.jpg",
        },
        {
            nama: "Mutia Fadilla, S.ST., M.Sc.",
            image: "mutia.jpg",
        },
        {
            nama: "M Rizki FAdhillah, S.T., M.Eng.",
            image: "rizki.jpg",
        },
        {
            nama: "Anggi Hanafiah, S.Kom, M.Kom.",
            image: "anggi.jpg",
        },
        {
            nama: "Rizky Wandri, S.Kom., M.Kom.",
            image: "rizky.jpg",
        },
    ];

    const organizations: Organization[] = [
        {
            name: "Groot",
            image: grootImage,
            description:
                "Groot sebuah Unit Kegiatan Mahasiswa yang berdiri pada tanggal 24 November 2018. Tujuan didirikannya groot ini sebagai wadah untuk mahasiswa/i untuk bisa mengembangkan lagi bakatnya  dibidang IOT.",
        },
        {
            name: "IQ Primatech",
            image: primaImage,
            description:
                "IQ PRIMATECH merupakan komunitas study club Programing yang didirikan pada tanggal 6 November 2023. Komunitas ini bertujuan untuk membantu antar anggota dalam menghasilkan karya dan meningkatkan kompetensi dalam bidang programming.",
        },
        {
            name: "Himatif",
            image: himatifImage,
            description:
                "Himatif adalah Himpunan Mahasiswa Teknik Informatika yang bertujuan untuk meningkatkan solidaritas dan pengembangan akademik mahasiswa Teknik Informatika.",
        },
    ];

    const handleCardClick = useCallback((organization: Organization) => {
        setSelectedOrganization(organization);
    }, []);

    const handleImageError = useCallback((imageName: string) => {
        setImageErrors((prev) => new Set(prev).add(imageName));
    }, []);

    const handleImageLoad = useCallback((imageName: string) => {
        setLoadingImages((prev) => {
            const newSet = new Set(prev);
            newSet.delete(imageName);
            return newSet;
        });
    }, []);

    const handleImageLoadStart = useCallback((imageName: string) => {
        setLoadingImages((prev) => new Set(prev).add(imageName));
    }, []);

    const handleModalBackdropClick = useCallback(
        (e: React.MouseEvent) => {
            if (e.target === e.currentTarget) {
                closeModal();
            }
        },
        [closeModal]
    );

    return (
        <>
            <Head title="Organization" />
            <Navbar />
            <ErrorBoundary>
                {/* Hero Section */}
                <div
                    className="mt-12 bg-cover bg-center relative flex items-center justify-center"
                    style={{
                        height: "400px",
                        backgroundImage: `url(${backgroundUIR})`,
                    }}
                >
                    <div className="absolute inset-0 bg-black/30"></div>
                    <div className="relative z-20 container mx-auto text-white text-center">
                        <h1
                            className="text-4xl md:text-5xl font-bold mb-4"
                            style={{
                                textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                            }}
                        >
                            Teknik Informatika Universitas Islam Riau
                        </h1>
                    </div>
                </div>

                {/* History Section */}
                <section className="py-12">
                    <div
                        className="container mx-auto px-4 text-center"
                        data-aos="fade-up"
                    >
                        <div className="bg-[#038A8D] text-white p-8 rounded-lg shadow-lg">
                            <h2 className="text-2xl font-bold mb-4">Sejarah</h2>
                            <div className="space-y-4 text-lg">
                                <p>
                                    Program Studi Teknik Informatika didirikan
                                    berdasarkan surat Keputusan Menteri
                                    Pendidikan dan kebudayaan No. 4009/D/T/2007
                                    dan di syahkan oleh Kopertis Wilayah X.
                                    Program studi Teknik Informatika hadir untuk
                                    meningkatkan keterampilan, produktivitas,
                                    daya saing, profesionalisme angkatan kerja
                                    muda, masyarakat umum, dan aparatur sipil
                                    negara di bidang teknologi informasi dan
                                    komunikasi.
                                </p>
                                <p>
                                    Mahasiswa perdana di Program Studi Teknik
                                    Informatika di mulai pada Tahun Ajaran
                                    2008/2009. Pada tahun 2016 Program Studi
                                    Teknik Informatika telah memperoleh
                                    akreditasi B berdasarkan keputusan Badan
                                    Akreditasi Nasional Perguruan Tinggi
                                    (BAN-PT) No. 2574/SK/BAN-PT/Akred/S/IX/2016.
                                    Pada saat ini, Program Studi Teknik
                                    Informatika memiliki Akreditasi B dari BANPT
                                    dengan No. 3873/SK/BAN-PT/Ak-PEJ/S/IX/2023.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Vision and Mission Section */}
                <section className="container mx-auto px-4 py-16">
                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Visi */}
                        <div
                            className="bg-white border rounded-lg shadow-lg p-6 hover:shadow-xl transition-all duration-300"
                            data-aos="fade-right"
                        >
                            <h3 className="text-3xl font-bold mb-6 text-blue-900 border-b-2 border-blue-500 pb-3">
                                Visi
                            </h3>
                            <p className="text-lg text-gray-800 leading-relaxed">
                                "Sebagai Pusat Keilmuan Informatika yang
                                Menghasilkan Tenaga Ahli Berkompeten dibidang
                                Internet of Things (IoT) dan Big Data Analysis
                                yang Berkarakter Islami di Era Society 5.0"
                            </p>
                        </div>

                        {/* Misi */}
                        <div
                            className="bg-white border rounded-lg shadow-lg p-6 hover:shadow-xl transition-all duration-300"
                            data-aos="fade-left"
                        >
                            <h3 className="text-3xl font-bold mb-6 text-green-900 border-b-2 border-green-500 pb-3">
                                Misi
                            </h3>
                            <ul className="text-lg text-gray-800 space-y-4 list-disc pl-5">
                                <li>
                                    Menyelenggarakan pendidikan bidang
                                    Informatika berwawasan global dengan
                                    memanfaatkan Big Data yang diperoleh
                                    menggunakan teknologi Internet of Things,
                                    dianalisa menggunakan Kecerdasan Buatan,
                                    menerapkan kandungan Al-Qur'an dan As-Sunnah
                                    untuk diimplementasikan dalam bentuk
                                    aplikasi/sistem yang mendukung kehidupan
                                    manusia
                                </li>
                                <li>
                                    Menyelenggarakan penelitian, pengembangan
                                    ilmu pengetahuan, dan teknologi bidang
                                    Analisa Big Data, Internet of Things,
                                    Keamanan Komputer dan Jaringan, dan
                                    Kecerdasan Buatan bereputasi Internasional,
                                    serta menerapkan kandungan Al-Qur'an dan
                                    As-Sunnah untuk membantu menyelesaikan
                                    permasalahan masyarakat, bangsa dan negara
                                </li>
                                <li>
                                    Menyelenggarakan pengabdian pada masyarakat
                                    bernilai well-being dengan teknologi yang
                                    aplikatif dan inovatif untuk pembangunan
                                    masyarakat yang cerdas informasi berbasis
                                    iman dan takwa
                                </li>
                                <li>
                                    Menyelenggarakan dakwah berlandaskan Bil
                                    Hikmah, Bil Lisan, Bil Qalam, dan Bil Hal
                                    Islamiyah dengan menerapkan teknologi
                                    informasi
                                </li>
                                <li>
                                    Menyelenggarakan Islamic Good Governance
                                    pada Program Studi Teknik Informatika
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* Organization Structure Image */}
                <section className="w-full px-4 py-12 flex justify-center items-center">
                    <div className="max-w-4xl w-full" data-aos="zoom-in">
                        <img
                            className="w-full rounded-lg shadow-lg"
                            src={organizationImage}
                            alt="Struktur Organisasi Teknik Informatika UIR"
                            onError={(e) => {
                                console.error(
                                    "Failed to load organization image"
                                );
                                e.currentTarget.style.display = "none";
                            }}
                        />
                    </div>
                </section>

                {/* Dosen Section */}
                <ErrorBoundary
                    fallback={
                        <div className="py-12 mx-auto max-w-[1200px] px-4">
                            <h2 className="text-3xl font-bold text-center mb-8">
                                Daftar Dosen
                            </h2>
                            <div className="text-center py-8 bg-red-50 rounded-lg">
                                <p className="text-red-600">
                                    Error loading lecturer data. Please try
                                    refreshing the page.
                                </p>
                            </div>
                        </div>
                    }
                >
                    <section className="py-12 mx-auto max-w-[1200px] px-4">
                        <h2
                            className="text-3xl font-bold text-center mb-8"
                            data-aos="fade-up"
                        >
                            Daftar Dosen
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {DOSEN.map((data, index) => (
                                <div
                                    key={`dosen-${index}`}
                                    className="border rounded-xl overflow-hidden shadow-lg flex flex-col items-center"
                                    data-aos="fade-up"
                                    data-aos-delay={Math.min(index * 50, 500)} // Limit delay to prevent too long delays
                                >
                                    {!imageErrors.has(data.image) ? (
                                        <div className="relative">
                                            {loadingImages.has(data.image) && (
                                                <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                                                </div>
                                            )}
                                            <img
                                                className="w-full h-auto object-cover"
                                                src={`/dosen/${data.image}`}
                                                alt={data.nama}
                                                onLoadStart={() =>
                                                    handleImageLoadStart(
                                                        data.image
                                                    )
                                                }
                                                onLoad={() =>
                                                    handleImageLoad(data.image)
                                                }
                                                onError={() =>
                                                    handleImageError(data.image)
                                                }
                                                loading="lazy"
                                            />
                                        </div>
                                    ) : (
                                        <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                                            <span className="text-gray-500 text-sm">
                                                Image not available
                                            </span>
                                        </div>
                                    )}
                                    <div className="p-4">
                                        <p className="text-center text-lg font-bold">
                                            {data.nama}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </ErrorBoundary>

                {/* Organization Section */}
                <ErrorBoundary
                    fallback={
                        <div className="py-12 mx-auto max-w-[1200px] px-4">
                            <h2 className="text-3xl font-bold text-center mb-8">
                                Organisasi Mahasiswa
                            </h2>
                            <div className="text-center py-8 bg-red-50 rounded-lg">
                                <p className="text-red-600">
                                    Error loading organization data. Please try
                                    refreshing the page.
                                </p>
                            </div>
                        </div>
                    }
                >
                    <section className="py-12 mx-auto max-w-[1200px] px-4">
                        <h2
                            className="text-3xl font-bold text-center mb-8"
                            data-aos="fade-up"
                        >
                            Organisasi Mahasiswa Teknik Informatika
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                            {organizations.map((org, index) => (
                                <div
                                    key={`org-${index}`}
                                    className="border rounded-xl overflow-hidden shadow-lg flex flex-col items-center cursor-pointer transition-transform duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    data-aos="fade-up"
                                    data-aos-delay={index * 100}
                                    onClick={() => handleCardClick(org)}
                                    onKeyDown={(e) => {
                                        if (
                                            e.key === "Enter" ||
                                            e.key === " "
                                        ) {
                                            e.preventDefault();
                                            handleCardClick(org);
                                        }
                                    }}
                                    tabIndex={0}
                                    role="button"
                                    aria-label={`View details for ${org.name}`}
                                >
                                    <div className="w-full h-48 flex items-center justify-center bg-gray-50 p-4">
                                        <img
                                            className="max-w-full max-h-full object-contain transition-opacity duration-300"
                                            src={org.image}
                                            alt={org.name}
                                            loading="lazy"
                                            onError={(e) => {
                                                console.error(
                                                    `Failed to load image for ${org.name}`
                                                );
                                                e.currentTarget.style.display =
                                                    "none";
                                            }}
                                        />
                                    </div>
                                    <div className="w-full p-4 bg-white">
                                        <p className="text-center text-lg font-bold text-gray-800">
                                            {org.name}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </ErrorBoundary>

                {/* Enhanced Modal for Organization Description */}
                {selectedOrganization && (
                    <div
                        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
                        onClick={handleModalBackdropClick}
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="modal-title"
                    >
                        <div
                            className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6 transform transition-transform duration-300 ease-in-out"
                            role="document"
                        >
                            <h3
                                id="modal-title"
                                className="text-xl sm:text-2xl font-bold mb-4 text-center"
                            >
                                {selectedOrganization.name}
                            </h3>
                            <p className="text-sm sm:text-base text-gray-700 text-center mb-6">
                                {selectedOrganization.description}
                            </p>
                            <div className="flex justify-center">
                                <button
                                    className="bg-red-500 text-white py-2 px-6 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors duration-200"
                                    onClick={closeModal}
                                    autoFocus
                                >
                                    Tutup
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </ErrorBoundary>
            <Footer />
        </>
    );
}
