"use client"
import {
    FiShield,
    FiEye,
    FiLock,
    FiDatabase,
    FiUsers,
    FiMail,
    FiPhone,
    FiGlobe,
    FiSettings,
    FiTrash2,
    FiArrowUp,
    FiCheck
} from 'react-icons/fi';
import { useState } from 'react';

export default function Page() {
    const [activeSection, setActiveSection] = useState('');

    const sections = [
        { id: 'informasi-yang-dikumpulkan', title: 'Informasi yang Dikumpulkan', icon: FiDatabase },
        { id: 'penggunaan-informasi', title: 'Penggunaan Informasi', icon: FiSettings },
        { id: 'berbagi-informasi', title: 'Berbagi Informasi', icon: FiUsers },
        { id: 'keamanan-data', title: 'Keamanan Data', icon: FiLock },
        { id: 'hak-pengguna', title: 'Hak Pengguna', icon: FiEye },
        { id: 'cookies', title: 'Cookies & Teknologi Serupa', icon: FiGlobe },
        { id: 'perubahan-kebijakan', title: 'Perubahan Kebijakan', icon: FiShield },
        { id: 'kontak', title: 'Hubungi Kami', icon: FiMail }
    ];

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="min-h-screen bg-black text-white">
            {/* Header */}
            <div className="sticky top-0 bg-black/90 backdrop-blur-sm border-b border-gray-800 z-50">
                <div className="max-w-6xl mx-auto px-6 py-4">
                    <div className="flex items-center space-x-3">
                        <FiShield className="text-2xl" />
                        <h1 className="text-2xl font-bold">Privacy Policy</h1>
                    </div>
                    <p className="text-gray-400 mt-2">Platform Pembelajaran dengan Gamifikasi</p>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-6 py-8">
                <div className="grid lg:grid-cols-4 gap-8">
                    {/* Table of Contents */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24">
                            <h2 className="text-lg font-semibold mb-4 flex items-center">
                                <FiEye className="mr-2" />
                                Daftar Isi
                            </h2>
                            <nav className="space-y-2">
                                {sections.map((section) => {
                                    const Icon = section.icon;
                                    return (
                                        <a
                                            key={section.id}
                                            href={`#${section.id}`}
                                            className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors py-2 px-3 rounded-lg hover:bg-gray-900"
                                        >
                                            <Icon className="text-sm" />
                                            <span className="text-sm">{section.title}</span>
                                        </a>
                                    );
                                })}
                            </nav>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-3">
                        {/* Introduction */}
                        <div className="mb-12 p-6 border border-gray-800 rounded-xl bg-gray-900/30">
                            <div className="flex items-start space-x-4">
                                <div className="p-3 bg-white/10 rounded-lg">
                                    <FiShield className="text-2xl" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold mb-3">Komitmen Privasi Kami</h2>
                                    <p className="text-gray-300 leading-relaxed">
                                        Platform pembelajaran dengan gamifikasi kami berkomitmen untuk melindungi privasi dan keamanan data pengguna.
                                        Kebijakan privasi ini menjelaskan bagaimana kami mengumpulkan, menggunakan, dan melindungi informasi Anda.
                                    </p>
                                    <div className="mt-4 text-sm text-gray-400">
                                        <p>Terakhir diperbarui: 1 Juni 2025</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Section 1: Informasi yang Dikumpulkan */}
                        <section id="informasi-yang-dikumpulkan" className="mb-10">
                            <div className="flex items-center space-x-3 mb-6">
                                <div className="p-2 bg-white/10 rounded-lg">
                                    <FiDatabase className="text-xl" />
                                </div>
                                <h2 className="text-2xl font-bold">Informasi yang Dikumpulkan</h2>
                            </div>

                            <div className="space-y-6">
                                <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-800">
                                    <h3 className="text-lg font-semibold mb-3 flex items-center">
                                        <FiUsers className="mr-2" />
                                        Informasi Pribadi
                                    </h3>
                                    <ul className="space-y-2 text-gray-300">
                                        <li className="flex items-start">
                                            <FiCheck className="mr-2 mt-1 text-green-400 flex-shrink-0" />
                                            Nama lengkap dan nama pengguna
                                        </li>
                                        <li className="flex items-start">
                                            <FiCheck className="mr-2 mt-1 text-green-400 flex-shrink-0" />
                                            Alamat email
                                        </li>
                                    </ul>
                                </div>

                                <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-800">
                                    <h3 className="text-lg font-semibold mb-3 flex items-center">
                                        <FiSettings className="mr-2" />
                                        Data Pembelajaran & Gamifikasi
                                    </h3>
                                    <ul className="space-y-2 text-gray-300">
                                        <li className="flex items-start">
                                            <FiCheck className="mr-2 mt-1 text-green-400 flex-shrink-0" />
                                            Progress pembelajaran dan skor quiz
                                        </li>
                                        <li className="flex items-start">
                                            <FiCheck className="mr-2 mt-1 text-green-400 flex-shrink-0" />
                                            Poin, badge, dan achievement yang diperoleh
                                        </li>
                                    </ul>
                                </div>

                                <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-800">
                                    <h3 className="text-lg font-semibold mb-3 flex items-center">
                                        <FiGlobe className="mr-2" />
                                        Data Teknis
                                    </h3>
                                    <ul className="space-y-2 text-gray-300">
                                        <li className="flex items-start">
                                            <FiCheck className="mr-2 mt-1 text-green-400 flex-shrink-0" />
                                            Log aktivitas dan analitik penggunaan
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </section>

                        {/* Section 2: Penggunaan Informasi */}
                        <section id="penggunaan-informasi" className="mb-10">
                            <div className="flex items-center space-x-3 mb-6">
                                <div className="p-2 bg-white/10 rounded-lg">
                                    <FiSettings className="text-xl" />
                                </div>
                                <h2 className="text-2xl font-bold">Penggunaan Informasi</h2>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-800">
                                    <h3 className="text-lg font-semibold mb-4">Layanan Platform</h3>
                                    <ul className="space-y-3 text-gray-300">
                                        <li>• Menyediakan konten pembelajaran</li>
                                        <li>• Melacak progress</li>
                                        <li>• Mengoperasikan sistem gamifikasi (poin, badge, leaderboard)</li>
                                    </ul>
                                </div>

                                <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-800">
                                    <h3 className="text-lg font-semibold mb-4">Peningkatan Layanan</h3>
                                    <ul className="space-y-3 text-gray-300">
                                        <li>• Meningkatkan keamanan dan stabilitas platform</li>
                                        <li>• Melakukan riset untuk inovasi pembelajaran</li>
                                    </ul>
                                </div>

                                <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-800">
                                    <h3 className="text-lg font-semibold mb-4">Kepatuhan Hukum</h3>
                                    <ul className="space-y-3 text-gray-300">
                                        <li>• Mematuhi peraturan perlindungan data</li>
                                        <li>• Mencegah aktivitas penipuan dan penyalahgunaan</li>
                                        <li>• Merespons permintaan legal yang sah</li>
                                        <li>• Melindungi hak dan keamanan pengguna</li>
                                    </ul>
                                </div>
                            </div>
                        </section>

                        {/* Section 3: Berbagi Informasi */}
                        <section id="berbagi-informasi" className="mb-10">
                            <div className="flex items-center space-x-3 mb-6">
                                <div className="p-2 bg-white/10 rounded-lg">
                                    <FiUsers className="text-xl" />
                                </div>
                                <h2 className="text-2xl font-bold">Berbagi Informasi</h2>
                            </div>

                            <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-800 mb-6">
                                <div className="flex items-start space-x-3">
                                    <FiLock className="text-xl text-green-400 mt-1" />
                                    <div>
                                        <h3 className="text-lg font-semibold mb-2">Prinsip Utama</h3>
                                        <p className="text-gray-300">
                                            Kami tidak menjual, menyewakan, atau menukar informasi pribadi Anda kepada pihak ketiga untuk tujuan komersial.
                                            Informasi hanya dibagikan dalam kondisi terbatas berikut:
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="bg-gray-900/30 p-5 rounded-lg border border-gray-800">
                                    <h4 className="font-semibold mb-2">🤝 Penyedia Layanan Terpercaya</h4>
                                    <p className="text-gray-300 text-sm">
                                        Cloud hosting, sistem pembayaran, dan analytics yang membantu operasional platform dengan perjanjian kerahasiaan ketat.
                                    </p>
                                </div>

                                <div className="bg-gray-900/30 p-5 rounded-lg border border-gray-800">
                                    <h4 className="font-semibold mb-2">🏛️ Kewajiban Hukum</h4>
                                    <p className="text-gray-300 text-sm">
                                        Permintaan resmi dari otoritas hukum, pengadilan, atau untuk mencegah aktivitas ilegal dan melindungi keamanan.
                                    </p>
                                </div>

                                <div className="bg-gray-900/30 p-5 rounded-lg border border-gray-800">
                                    <h4 className="font-semibold mb-2">🔄 Merger atau Akuisisi</h4>
                                    <p className="text-gray-300 text-sm">
                                        Dalam kasus perubahan kepemilikan platform, dengan komitmen perlindungan data yang sama atau lebih baik.
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* Section 4: Keamanan Data */}
                        <section id="keamanan-data" className="mb-10">
                            <div className="flex items-center space-x-3 mb-6">
                                <div className="p-2 bg-white/10 rounded-lg">
                                    <FiLock className="text-xl" />
                                </div>
                                <h2 className="text-2xl font-bold">Keamanan Data</h2>
                            </div>

                            <div className="grid md:grid-cols-3 gap-6">
                                <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-800">
                                    <div className="text-center mb-4">
                                        <div className="inline-flex p-3 bg-green-400/20 rounded-full">
                                            <FiLock className="text-2xl text-green-400" />
                                        </div>
                                    </div>
                                    <h3 className="text-lg font-semibold mb-3 text-center">Enkripsi</h3>
                                    <p className="text-gray-300 text-sm text-center">
                                        Data sensitif dienkripsi menggunakan standar industri SSL/TLS 256-bit.
                                    </p>
                                </div>

                                <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-800">
                                    <div className="text-center mb-4">
                                        <div className="inline-flex p-3 bg-purple-400/20 rounded-full">
                                            <FiDatabase className="text-2xl text-purple-400" />
                                        </div>
                                    </div>
                                    <h3 className="text-lg font-semibold mb-3 text-center">Backup</h3>
                                    <p className="text-gray-300 text-sm text-center">
                                        Backup otomatis dan redundansi data untuk memastikan ketersediaan dan integritas informasi Anda.
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* Section 5: Hak Pengguna */}
                        <section id="hak-pengguna" className="mb-10">
                            <div className="flex items-center space-x-3 mb-6">
                                <div className="p-2 bg-white/10 rounded-lg">
                                    <FiEye className="text-xl" />
                                </div>
                                <h2 className="text-2xl font-bold">Hak Pengguna</h2>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <div className="bg-gray-900/50 p-5 rounded-lg border border-gray-800">
                                        <h3 className="font-semibold mb-2 flex items-center">
                                            <FiSettings className="mr-2 text-green-400" />
                                            Hak Koreksi
                                        </h3>
                                        <p className="text-gray-300 text-sm">
                                            Anda dapat memperbarui atau memperbaiki informasi pribadi yang tidak akurat atau tidak lengkap kapan saja.
                                        </p>
                                    </div>

                                    <div className="bg-gray-900/50 p-5 rounded-lg border border-gray-800">
                                        <h3 className="font-semibold mb-2 flex items-center">
                                            <FiTrash2 className="mr-2 text-red-400" />
                                            Hak Penghapusan
                                        </h3>
                                        <p className="text-gray-300 text-sm">
                                            Anda dapat meminta penghapusan akun dan data pribadi Anda, dengan beberapa pengecualian untuk kewajiban hukum.
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="bg-gray-900/50 p-5 rounded-lg border border-gray-800">
                                        <h3 className="font-semibold mb-2 flex items-center">
                                            <FiLock className="mr-2 text-purple-400" />
                                            Hak Pembatasan
                                        </h3>
                                        <p className="text-gray-300 text-sm">
                                            Anda dapat membatasi pemrosesan data pribadi Anda dalam kondisi tertentu, seperti saat memperselisihkan keakuratan data.
                                        </p>
                                    </div>
                                    <div className="bg-gray-900/50 p-5 rounded-lg border border-gray-800">
                                        <h3 className="font-semibold mb-2 flex items-center">
                                            <FiMail className="mr-2 text-orange-400" />
                                            Hak Keberatan
                                        </h3>
                                        <p className="text-gray-300 text-sm">
                                            Anda dapat menolak pemrosesan data pribadi untuk tujuan tertentu, seperti marketing atau profiling.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 bg-blue-900/20 p-6 rounded-lg border border-blue-800">
                                <h3 className="text-lg font-semibold mb-3 flex items-center">
                                    <FiMail className="mr-2" />
                                    Cara Menggunakan Hak Anda
                                </h3>
                                <p className="text-gray-300 mb-4">
                                    Untuk menggunakan hak-hak di atas, silakan hubungi kami melalui:
                                </p>
                                <div className="grid md:grid-cols-2 gap-4 text-sm">
                                    <p className="text-gray-300">📧 Email: privacy@example.com</p>
                                    <p className="text-gray-300">📱 WhatsApp: +62 0000000000</p>
                                </div>
                                <p className="text-gray-400 text-sm mt-4">
                                    Kami akan merespons permintaan Anda dalam waktu maksimal 30 hari kerja.
                                </p>
                            </div>
                        </section>

                        {/* Section 7: Perubahan Kebijakan */}
                        <section id="perubahan-kebijakan" className="mb-10">
                            <div className="flex items-center space-x-3 mb-6">
                                <div className="p-2 bg-white/10 rounded-lg">
                                    <FiShield className="text-xl" />
                                </div>
                                <h2 className="text-2xl font-bold">Perubahan Kebijakan</h2>
                            </div>

                            <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-800">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <h3 className="text-lg font-semibold mb-3">Proses Pembaruan</h3>
                                        <ul className="space-y-3 text-gray-300">
                                            <li className="flex items-start">
                                                <FiCheck className="mr-2 mt-1 text-green-400 flex-shrink-0" />
                                                Konsultasi dengan ahli hukum dan keamanan data
                                            </li>
                                            <li className="flex items-start">
                                                <FiCheck className="mr-2 mt-1 text-green-400 flex-shrink-0" />
                                                Notifikasi advance kepada pengguna
                                            </li>
                                            <li className="flex items-start">
                                                <FiCheck className="mr-2 mt-1 text-green-400 flex-shrink-0" />
                                                Periode transisi untuk penyesuaian
                                            </li>
                                        </ul>
                                    </div>

                                    <div>
                                        <h3 className="text-lg font-semibold mb-3">Notifikasi Perubahan</h3>
                                        <ul className="space-y-3 text-gray-300">
                                            <li className="flex items-start">
                                                <FiMail className="mr-2 mt-1 text-blue-400 flex-shrink-0" />
                                                Email notification ke semua pengguna aktif
                                            </li>
                                            <li className="flex items-start">
                                                <FiGlobe className="mr-2 mt-1 text-blue-400 flex-shrink-0" />
                                                Banner pengumuman di platform
                                            </li>
                                            <li className="flex items-start">
                                                <FiPhone className="mr-2 mt-1 text-blue-400 flex-shrink-0" />
                                                Push notification untuk pengguna mobile
                                            </li>
                                            <li className="flex items-start">
                                                <FiUsers className="mr-2 mt-1 text-blue-400 flex-shrink-0" />
                                                Pengumuman di forum komunitas
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="mt-6 p-4 bg-yellow-900/20 rounded-lg border border-yellow-800">
                                    <p className="text-yellow-200 text-sm">
                                        <strong>Catatan Penting:</strong> Perubahan substansial akan diberitahukan minimal 30 hari sebelum berlaku efektif.
                                        Penggunaan berkelanjutan platform setelah perubahan berlaku menandakan persetujuan Anda terhadap kebijakan yang diperbarui.
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* Section 8: Kontak */}
                        <section id="kontak" className="mb-10">
                            <div className="flex items-center space-x-3 mb-6">
                                <div className="p-2 bg-white/10 rounded-lg">
                                    <FiMail className="text-xl" />
                                </div>
                                <h2 className="text-2xl font-bold">Hubungi Kami</h2>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-800">
                                    <h3 className="text-lg font-semibold mb-4 flex items-center">
                                        <FiMail className="mr-2 text-blue-400" />
                                        Tim Privacy & Data Protection
                                    </h3>
                                    <div className="space-y-4">
                                        <div className="flex items-center space-x-3">
                                            <FiMail className="text-gray-400" />
                                            <div>
                                                <p className="font-medium">Email</p>
                                                <p className="text-gray-300 text-sm">privacy@example.com</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center space-x-3">
                                            <FiPhone className="text-gray-400" />
                                            <div>
                                                <p className="font-medium">WhatsApp</p>
                                                <p className="text-gray-300 text-sm">+62 000-0000-0000</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center space-x-3">
                                            <FiGlobe className="text-gray-400" />
                                            <div>
                                                <p className="font-medium">Support Center</p>
                                                <p className="text-gray-300 text-sm">help.example.com</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-800">
                                    <h3 className="text-lg font-semibold mb-4 flex items-center">
                                        <FiUsers className="mr-2 text-green-400" />
                                        Kantor Pusat
                                    </h3>
                                    <div className="space-y-4">
                                        <div>
                                            <p className="font-medium mb-2">Alamat</p>
                                            <p className="text-gray-300 text-sm leading-relaxed">
                                                Gedung xxxx<br />
                                                Jl. xxxx No. xxxx<br />
                                                xxxx <br />
                                                Indonesia
                                            </p>
                                        </div>

                                        <div>
                                            <p className="font-medium mb-2">Jam Operasional</p>
                                            <p className="text-gray-300 text-sm">
                                                Senin - Jumat: -<br />
                                                Sabtu: -
                                            </p>
                                        </div>
                                    </div>
                                </div> 
                            </div>
                        </section>

                        {/* Footer Info */}
                        <div className="bg-gray-900/30 p-6 rounded-lg border border-gray-800">
                            <div className="text-center">
                                <div className="flex items-center justify-center space-x-2 mb-4">
                                    <FiShield className="text-2xl text-green-400" />
                                    <h3 className="text-xl font-bold">Platform Pembelajaran Terpercaya</h3>
                                </div>
                                <p className="text-gray-300 mb-4">
                                    Komitmen kami adalah menciptakan lingkungan pembelajaran yang aman, inovatif, dan menyenangkan
                                    melalui teknologi gamifikasi terdepan dengan tetap menjaga privasi dan keamanan data Anda.
                                </p>
                                <div className="flex items-center justify-center space-x-6 text-sm text-gray-400">
                                    <p>© 2025 Platform Learning</p>
                                    <span>•</span>
                                    <p>ISO 27001 Certified</p>
                                    <span>•</span>
                                    <p>GDPR Compliant</p>
                                    <span>•</span>
                                    <p>SOC 2 Type II</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll to Top Button */}
            <button
                onClick={scrollToTop}
                className="fixed bottom-8 right-8 p-3 bg-white text-black rounded-full shadow-2xl hover:bg-gray-200 transition-all duration-300 hover:scale-110"
                aria-label="Scroll to top"
            >
                <FiArrowUp className="text-xl" />
            </button>
        </div>
    );
}