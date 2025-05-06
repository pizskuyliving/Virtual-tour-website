import LogoBanPT from "@/assets/logo-banpt.png";
import LogoText from "@/assets/logo-uir-text.png";
import { Facebook, Instagram, Youtube } from "lucide-react";

export default function Footer() {
    return (
        <>
            <footer
                style={{
                    backgroundColor: "#015152",
                    color: "white !important",
                }}
            >
                <div className="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8 flex text-white space-x-8">
                    <div className="w-2/5">
                        <img className="mb-4" src={LogoText} />
                        <div className="flex flex-col space-y-2">
                            <p>Fakultas Teknik</p>
                            <p>Universitas Islan Riau</p>
                            <p>
                                Jl. Kaharuddin Nasution 113, Pekanbaru 28284
                                Indonesia{" "}
                            </p>
                            <p>Email : fakultas_teknik@uir.ac.id</p>
                            <p>Telp. +62 761 674674</p>
                        </div>
                        <div className="flex flex-row space-x-4 mt-4">
                            <a
                                href="https://www.facebook.com/fakultasteknikuir"
                                target="_blank"
                                className="bg-white rounded-full text-orange-400 p-2"
                                rel="noopener noreferrer"
                            >
                                <Facebook />
                            </a>
                            <a
                                href="https://www.instagram.com/fakultasteknikuir/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-white rounded-full text-orange-400 p-2"
                            >
                                <Instagram />
                            </a>
                            <a
                                href="https://twitter.com/ftuir"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-white rounded-full text-orange-400 p-2"
                            >
                                <Youtube />
                            </a>
                            <a
                                href="https://www.youtube.com/channel/UCeXqcuEjR7RrjJ3XN4UkYgA"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <i className="fab fa-youtube text-2xl"></i>
                            </a>
                        </div>
                    </div>
                    <div className="w-3/5">
                        <div className="mb-8">
                            <p className="border-b-orange-300 border-b-2 font-bold text-2xl mb-4">
                                Informasi dan layanan lainnya
                            </p>
                            <div className="flex flex-col space-y-2">
                                <p>Direktorat Layanan Mahasiswa dan Alumni</p>
                                <p>Badan Sistem Informasi dan Komputasi</p>
                            </div>
                        </div>
                        <div className="mb-8">
                            <p className="border-b-orange-300 border-b-2 font-bold text-2xl mb-4">
                                Kehidupan Kampus
                            </p>
                            <div className="flex flex-row space-x-4 ">
                                <div className="w-1/2 flex flex-col space-y-2">
                                    <p>Peta Kampus</p>
                                    <p>Fasilitas Publik</p>
                                    <p>Kegiatan Mahasiswa</p>
                                </div>
                                <div className="w-full">
                                    <img className="w-full" src={LogoBanPT} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
            <div
                className="text-center p-4 flex space-x-2 items-center justify-center"
                style={{ backgroundColor: "#fcb900" }}
            >
                <b>Copyright © 2024 Universitas Islam Riau</b>
            </div>
        </>
    );
}
