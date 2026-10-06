import LogoBanPT from "@/assets/logo-banpt.png";
import LogoText from "@/assets/logo-uir-text.png";
import { Facebook, Instagram, Youtube } from "lucide-react"; // Make sure lucide-react is installed

export default function Footer() {
    return (
        <>
            <footer
                style={{
                    backgroundColor: "#015152",
                    color: "white", // Direct color white for all text in footer
                }}
                className="py-12 px-4 sm:px-6 lg:px-8" // Added responsive padding
            >
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:space-x-8 space-y-8 md:space-y-0 text-white">
                    {/* Column 1: Address and Social Media (width adjusted to 1/3) */}
                    <div className="w-full md:w-1/3">
                        <img
                            className="mb-4 h-16 sm:h-20 object-contain"
                            src={LogoText}
                            alt="Universitas Islam Riau Text Logo"
                        />
                        <div className="flex flex-col space-y-2 text-sm sm:text-base">
                            <p>Fakultas Teknik</p>
                            <p>Universitas Islam Riau</p>
                            <p>
                                Jl. Kaharuddin Nasution 113, Pekanbaru 28284
                                Indonesia{" "}
                            </p>
                            <p>
                                Email:{" "}
                                <a
                                    href="mailto:fakultas_teknik@uir.ac.id"
                                    className="hover:underline"
                                >
                                    fakultas_teknik@uir.ac.id
                                </a>
                            </p>
                            <p>
                                Telp.{" "}
                                <a
                                    href="tel:+62761674674"
                                    className="hover:underline"
                                >
                                    +62 761 674674
                                </a>
                            </p>
                        </div>
                        <div className="flex flex-row space-x-3 sm:space-x-4 mt-6">
                            <a
                                href="https://www.facebook.com/fakultasteknikuir"
                                target="_blank"
                                className="bg-white rounded-full text-[#015152] p-2 hover:bg-gray-200 transition-colors"
                                rel="noopener noreferrer"
                                aria-label="Facebook"
                            >
                                <Facebook size={24} />
                            </a>
                            <a
                                href="https://www.instagram.com/fakultasteknikuir/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-white rounded-full text-[#015152] p-2 hover:bg-gray-200 transition-colors"
                                aria-label="Instagram"
                            >
                                <Instagram size={24} />
                            </a>
                            <a
                                href="https://www.youtube.com/channel/UC-your-youtube-channel-id"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-white rounded-full text-[#015152] p-2 hover:bg-gray-200 transition-colors"
                                aria-label="YouTube"
                            >
                                <Youtube size={24} />
                            </a>
                        </div>
                    </div>

                    {/* Column 2: Information and Campus Life (width adjusted to 1/3) */}
                    <div className="w-full md:w-1/3 mt-8 md:mt-0">
                        <div className="mb-8">
                            <p className="border-b-orange-300 border-b-2 font-bold text-xl sm:text-2xl pb-2 mb-4">
                                Informasi dan layanan lainnya
                            </p>
                            <div className="flex flex-col space-y-2 text-sm sm:text-base">
                                <a
                                    href="https://dlma.uir.ac.id/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:underline"
                                >
                                    Direktorat Layanan Mahasiswa dan Alumni
                                </a>
                                <a
                                    href="https://simfokom.uir.ac.id/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:underline"
                                >
                                    Badan Sistem Informasi dan Komputasi
                                </a>
                            </div>
                        </div>
                        <div>
                            <p className="border-b-orange-300 border-b-2 font-bold text-xl sm:text-2xl pb-2 mb-4">
                                Kehidupan Kampus
                            </p>
                            <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0 items-start">
                                <div className="w-full sm:w-1/2 flex flex-col space-y-2 text-sm sm:text-base">
                                    <a href="#" className="hover:underline">
                                        Peta Kampus
                                    </a>
                                    <a href="#" className="hover:underline">
                                        Fasilitas Publik
                                    </a>
                                    <a href="#" className="hover:underline">
                                        Kegiatan Mahasiswa
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* NEW Column 3: Small Map (width adjusted to 1/3) */}
                    <div className="w-full md:w-1/3 mt-8 md:mt-0">
                        <p className="border-b-orange-300 border-b-2 font-bold text-xl sm:text-2xl pb-2 mb-4">
                            Peta Lokasi
                        </p>
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.6964544072143!2d101.45085642496474!3d0.44781984954779464!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31d5af5c42f125e5%3A0xe6f83f2deb032e8f!2sUniversitas%20Islam%20Riau%20(UIR)!5e0!3m2!1sid!2sid!4v1752882228611!5m2!1sid!2sid" // Menggunakan URL embed terakhir yang Anda berikan
                            // Menyesuaikan ukuran untuk peta footer kecil dan responsif
                            className="w-full h-48 sm:h-64 rounded-lg shadow-md" // Full width within its column, fixed height (48rem/64rem), responsive
                            style={{ border: 0 }}
                            allowFullScreen={true}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Peta Lokasi Universitas Islam Riau (Footer)"
                        ></iframe>
                    </div>
                </div>
            </footer>
            {/* Copyright Section */}
            <div
                className="text-center p-4 flex flex-col sm:flex-row space-y-1 sm:space-y-0 sm:space-x-2 items-center justify-center text-sm sm:text-base"
                style={{ backgroundColor: "#fcb900", color: "#222" }}
            >
                <b>© 2025 Universitas Islam Riau</b>&nbsp;dikembangkan oleh
                Muhammad Al Hafiz, S.T
            </div>
        </>
    );
}
