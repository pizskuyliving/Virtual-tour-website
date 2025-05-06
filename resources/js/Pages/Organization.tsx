import Navbar from "@/Components/Navbar";
import { Head } from "@inertiajs/react";
import backgroundUIR from "@/assets/background-uir.png";
import organizationImage from "@/assets/organization.jpg";
import Footer from "@/Components/Footer";

export default function Organization() {
    const DOSEN = [
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
    return (
        <>
            <Head title="About" />
            <Navbar />

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
            <section className="py-12">
                <div className="container mx-auto px-4 text-center">
                    <div className="bg-[#038A8D] text-white p-8 rounded-lg shadow-lg">
                        <h2 className="text-2xl font-bold mb-4">Sejarah</h2>
                        <p className="text-lg">
                            Program Studi Teknik Informatika didirikan
                            berdasarkan surat Keputusan Menteri Pendidikan dan
                            kebudayaan No. 4009/D/T/2007 dan di syahkan oleh
                            Kopertis Wilayah X. Program studi Teknik Informatika
                            hadir untuk meningkatkan keterampilan,
                            produktivitas, daya saing, profesionalisme angkatan
                            kerja muda, masyarakat umum, dan aparatur sipil
                            negara di bidang teknologi informasi dan komunikasi.
                        </p>
                        <p className="text-lg">
                            Mahasiswa perdana di Program Studi Teknik
                            Informatika di mulai pada Tahun Ajaran 2008/2009.
                            Pada tahun 2016 Program Studi Teknik Informatika
                            telah memperoleh akreditasi B berdasarkan keputusan
                            Badan Akreditasi Nasional Perguruan Tinggi (BAN-PT)
                            No. 2574/SK/BAN-PT/Akred/S/IX/2016. Pada saat ini,
                            Program Studi Teknik Informatika memiliki Akreditasi
                            B dari BANPT dengan No.
                            3873/SK/BAN-PT/Ak-PEJ/S/IX/2023.
                        </p>
                    </div>
                </div>
            </section>

            {/* Vision and Mission Section */}
            <section className="container mx-auto px-4 py-16">
                <div className="grid md:grid-cols-2 gap-8">
                    {/* Visi */}
                    <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg shadow-md hover:shadow-lg transition-all duration-300">
                        <h3 className="text-3xl font-bold mb-6 text-blue-900 border-b-2 border-blue-500 pb-3">
                            Visi
                        </h3>
                        <p className="text-lg text-blue-800 leading-relaxed">
                            “Sebagai Pusat Keilmuan Informatika yang
                            Menghasilkan Tenaga Ahli Berkompeten dibidang
                            Internet of Things (IoT) dan Big Data Analysis yang
                            Berkarakter Islami di Era Society 5.0”
                        </p>
                    </div>

                    {/* Misi */}
                    <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-lg shadow-md hover:shadow-lg transition-all duration-300">
                        <h3 className="text-3xl font-bold mb-6 text-green-900 border-b-2 border-green-500 pb-3">
                            Misi
                        </h3>
                        <ul className="text-lg text-green-800 space-y-4 list-disc pl-5">
                            <li>
                                Menyelenggarakan pendidikan bidang Informatika
                                berwawasan global dengan memanfaatkan Big Data
                                yang diperoleh menggunakan teknologi Internet of
                                Things, dianalisa menggunakan Kecerdasan Buatan,
                                menerapkan kandungan Al-Qur’an dan As-Sunnah
                                untuk diimplementasikan dalam bentuk
                                aplikasi/sistem yang mendukung kehidupan manusia
                            </li>
                            <li>
                                Menyelenggarakan penelitian, pengembangan ilmu
                                pengetahuan, dan teknologi bidang Analisa Big
                                Data, Internet of Things, Keamanan Komputer dan
                                Jaringan, dan Kecerdasan Buatan bereputasi
                                Internasional, serta menerapkan kandungan
                                Al-Qur’an dan As-Sunnah untuk membantu
                                menyelesaikan permasalahan masyarakat, bangsa
                                dan negara
                            </li>
                            <li>
                                Menyelenggarakan pengabdian pada masyarakat
                                bernilai well-being dengan teknologi yang
                                aplikatif dan inovatif untuk pembangunan
                                masyarakat yang cerdas informasi berbasis iman
                                dan takwa
                            </li>
                            <li>
                                Menyelenggarakan dakwah berlandaskan Bil Hikmah,
                                Bil Lisan, Bil Qalam, dan Bil Hal Islamiyah
                                dengan menerapkan teknologi informasi
                            </li>
                            <li>
                                Menyelenggarakan Islamic Good Governance pada
                                Program Studi Teknik Informatika
                            </li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* Organization Structure Image */}
            <section className="w-full px-4 py-12 flex justify-center items-center">
                <div className="max-w-4xl w-full">
                    <img
                        className="w-full rounded-lg shadow-lg"
                        src={organizationImage}
                        alt="Struktur Organisasi Teknik Informatika UIR"
                    />
                </div>
            </section>

            <section className="py-12 mx-auto gap-5 grid grid-cols-4 max-w-[1200px]">
                {DOSEN.map((data) => (
                    <div className=" pb-5 border rounded-xl overflow-hidden shadow-lg">
                        <img
                            className="w-"
                            src={`/dosen/${data.image}`}
                            alt=""
                        />
                        <p className="text-center mt-5 text-lg font-bold">
                            {data.nama}
                        </p>
                    </div>
                ))}
            </section>

            <Footer />
        </>
    );
}
