"use client"
import {
    FiFileText,
    FiUser,
    FiShield,
    FiBook,
    FiAward,
    FiDollarSign,
    FiAlertTriangle,
    FiCheck,
    FiX,
    FiUsers,
    FiSettings,
    FiLock,
    FiMail,
    FiPhone,
    FiArrowUp,
} from 'react-icons/fi';
import { FaGavel } from "react-icons/fa";
import { useState } from 'react';

export default function Page() {
    const [activeSection, setActiveSection] = useState('');

    const sections = [
        { id: 'penerimaan-syarat', title: 'Penerimaan Syarat', icon: FiCheck },
        { id: 'akun-pengguna', title: 'Akun Pengguna', icon: FiUser },
        { id: 'layanan-platform', title: 'Layanan Platform', icon: FiBook },
        { id: 'sistem-gamifikasi', title: 'Sistem Gamifikasi', icon: FiAward },
        { id: 'pembayaran', title: 'Pembayaran & Langganan', icon: FiDollarSign },
        { id: 'konten-pengguna', title: 'Konten Pengguna', icon: FiUsers },
        { id: 'aturan-penggunaan', title: 'Aturan Penggunaan', icon: FiShield },
        { id: 'pembatasan-tanggung-jawab', title: 'Pembatasan Tanggung Jawab', icon: FiAlertTriangle },
        { id: 'penyelesaian-sengketa', title: 'Penyelesaian Sengketa', icon: FaGavel },
        { id: 'perubahan-layanan', title: 'Perubahan Layanan', icon: FiSettings },
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
                        <FiFileText className="text-2xl" />
                        <h1 className="text-2xl font-bold">Terms of Service</h1>
                    </div>
                    <p className="text-gray-400 mt-2">Syarat dan Ketentuan Platform Pembelajaran dengan Gamifikasi</p>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-6 py-8">
                <div className="grid lg:grid-cols-4 gap-8">
                    {/* Table of Contents */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24">
                            <h2 className="text-lg font-semibold mb-4 flex items-center">
                                <FiFileText className="mr-2" />
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
                                    <FiFileText className="text-2xl" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold mb-3">Selamat Datang di Platform Pembelajaran Kami</h2>
                                    <p className="text-gray-300 leading-relaxed">
                                        Syarat dan ketentuan berikut mengatur penggunaan platform pembelajaran dengan sistem gamifikasi kami.
                                        Dengan menggunakan layanan kami, Anda menyetujui untuk terikat dengan syarat dan ketentuan yang tercantum di bawah ini.
                                    </p>
                                    <div className="mt-4 text-sm text-gray-400">
                                        <p>Berlaku efektif: 1 Juni 2025</p>
                                        <p>Versi: 2.1</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Section 1: Penerimaan Syarat */}
                        <section id="penerimaan-syarat" className="mb-10">
                            <div className="flex items-center space-x-3 mb-6">
                                <div className="p-2 bg-white/10 rounded-lg">
                                    <FiCheck className="text-xl" />
                                </div>
                                <h2 className="text-2xl font-bold">Penerimaan Syarat</h2>
                            </div>

                            <div className="space-y-6">
                                <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-800">
                                    <h3 className="text-lg font-semibold mb-4">Persetujuan Penggunaan</h3>
                                    <p className="text-gray-300 mb-4">
                                        Dengan mengakses dan menggunakan platform pembelajaran kami, Anda secara otomatis menyetujui:
                                    </p>
                                    <ul className="space-y-3 text-gray-300">
                                        <li className="flex items-start">
                                            <FiCheck className="mr-3 mt-1 text-green-400 flex-shrink-0" />
                                            Semua syarat dan ketentuan yang tercantum dalam dokumen ini
                                        </li>
                                        <li className="flex items-start">
                                            <FiCheck className="mr-3 mt-1 text-green-400 flex-shrink-0" />
                                            Kebijakan Privasi yang merupakan bagian integral dari ToS ini
                                        </li>
                                        <li className="flex items-start">
                                            <FiCheck className="mr-3 mt-1 text-green-400 flex-shrink-0" />
                                            Aturan komunitas dan pedoman penggunaan platform
                                        </li>
                                        <li className="flex items-start">
                                            <FiCheck className="mr-3 mt-1 text-green-400 flex-shrink-0" />
                                            Kebijakan pembayaran dan pengembalian dana
                                        </li>
                                    </ul>
                                </div>

                                <div className="bg-red-900/20 p-6 rounded-lg border border-red-800">
                                    <h3 className="text-lg font-semibold mb-3 flex items-center">
                                        <FiAlertTriangle className="mr-2 text-red-400" />
                                        Persyaratan Usia
                                    </h3>
                                    <p className="text-gray-300 mb-3">
                                        Platform ini ditujukan untuk pengguna berusia minimal 13 tahun. Pengguna di bawah 18 tahun harus mendapat persetujuan orang tua/wali.
                                    </p>
                                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                                        <div className="bg-red-900/30 p-4 rounded">
                                            <p className="font-medium text-red-300">Usia 13-17 tahun</p>
                                            <p className="text-gray-300">Memerlukan persetujuan orang tua</p>
                                        </div>
                                        <div className="bg-green-900/30 p-4 rounded">
                                            <p className="font-medium text-green-300">Usia 18+ tahun</p>
                                            <p className="text-gray-300">Dapat mendaftar secara mandiri</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Section 2: Akun Pengguna */}
                        <section id="akun-pengguna" className="mb-10">
                            <div className="flex items-center space-x-3 mb-6">
                                <div className="p-2 bg-white/10 rounded-lg">
                                    <FiUser className="text-xl" />
                                </div>
                                <h2 className="text-2xl font-bold">Akun Pengguna</h2>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <div className="bg-gray-900/50 p-5 rounded-lg border border-gray-800">
                                        <h3 className="font-semibold mb-3 flex items-center">
                                            <FiUser className="mr-2 text-blue-400" />
                                            Pendaftaran Akun
                                        </h3>
                                        <ul className="space-y-2 text-gray-300 text-sm">
                                            <li>• Informasi yang akurat dan terkini</li>
                                            <li>• Email yang valid dan dapat diakses</li>
                                            <li>• Username yang unik dan pantas</li>
                                            <li>• Verifikasi identitas jika diperlukan</li>
                                        </ul>
                                    </div>

                                    <div className="bg-gray-900/50 p-5 rounded-lg border border-gray-800">
                                        <h3 className="font-semibold mb-3 flex items-center">
                                            <FiLock className="mr-2 text-green-400" />
                                            Keamanan Akun
                                        </h3>
                                        <ul className="space-y-2 text-gray-300 text-sm">
                                            <li>• Password yang kuat dan unik</li>
                                            <li>• Jaga kerahasiaan kredensial login</li>
                                            <li>• Logout dari perangkat bersama</li>
                                            <li>• Laporkan aktivitas mencurigakan</li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="bg-gray-900/50 p-5 rounded-lg border border-gray-800">
                                        <h3 className="font-semibold mb-3 flex items-center">
                                            <FiSettings className="mr-2 text-purple-400" />
                                            Tanggung Jawab Pengguna
                                        </h3>
                                        <ul className="space-y-2 text-gray-300 text-sm">
                                            <li>• Bertanggung jawab atas semua aktivitas akun</li>
                                            <li>• Memperbarui informasi profil secara berkala</li>
                                            <li>• Menggunakan akun secara pribadi (tidak berbagi)</li>
                                            <li>• Mematuhi aturan komunitas platform</li>
                                        </ul>
                                    </div>

                                    <div className="bg-gray-900/50 p-5 rounded-lg border border-gray-800">
                                        <h3 className="font-semibold mb-3 flex items-center">
                                            <FiX className="mr-2 text-red-400" />
                                            Penghentian Akun
                                        </h3>
                                        <ul className="space-y-2 text-gray-300 text-sm">
                                            <li>• Pelanggaran syarat dan ketentuan</li>
                                            <li>• Aktivitas yang merugikan platform</li>
                                            <li>• Permintaan penghapusan dari pengguna</li>
                                            <li>• Tidak aktif lebih dari 2 tahun</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Section 3: Layanan Platform */}
                        <section id="layanan-platform" className="mb-10">
                            <div className="flex items-center space-x-3 mb-6">
                                <div className="p-2 bg-white/10 rounded-lg">
                                    <FiBook className="text-xl" />
                                </div>
                                <h2 className="text-2xl font-bold">Layanan Platform</h2>
                            </div>

                            <div className="space-y-6">
                                <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-800">
                                    <h3 className="text-lg font-semibold mb-4">Fitur Pembelajaran</h3>
                                    <div className="grid md:grid-cols-3 gap-4">
                                        <div className="bg-blue-900/20 p-4 rounded border border-blue-800">
                                            <h4 className="font-medium text-blue-300 mb-2">📚 Konten Edukasi</h4>
                                            <p className="text-gray-300 text-sm">
                                                Video pembelajaran, artikel, quiz interaktif, dan materi multimedia berkualitas tinggi.
                                            </p>
                                        </div>
                                        <div className="bg-green-900/20 p-4 rounded border border-green-800">
                                            <h4 className="font-medium text-green-300 mb-2">🎯 Learning Path</h4>
                                            <p className="text-gray-300 text-sm">
                                                Jalur pembelajaran terstruktur yang disesuaikan dengan level dan tujuan belajar Anda.
                                            </p>
                                        </div>
                                        <div className="bg-purple-900/20 p-4 rounded border border-purple-800">
                                            <h4 className="font-medium text-purple-300 mb-2">📊 Progress Tracking</h4>
                                            <p className="text-gray-300 text-sm">
                                                Monitoring kemajuan belajar dengan analitik mendalam dan rekomendasi personal.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-800">
                                    <h3 className="text-lg font-semibold mb-4">Ketersediaan Layanan</h3>
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <h4 className="font-medium mb-3 text-green-400">✅ Komitmen Uptime</h4>
                                            <ul className="space-y-2 text-gray-300 text-sm">
                                                <li>• Target uptime 99.5% per bulan</li>
                                                <li>• Maintenance terjadwal dengan notifikasi</li>
                                                <li>• Backup sistem untuk kontinuitas layanan</li>
                                                <li>• Tim support 24/7 untuk issue kritis</li>
                                            </ul>
                                        </div>
                                        <div>
                                            <h4 className="font-medium mb-3 text-yellow-400">⚠️ Pembatasan Layanan</h4>
                                            <ul className="space-y-2 text-gray-300 text-sm">
                                                <li>• Maintenance rutin setiap Minggu dini hari</li>
                                                <li>• Pembatasan bandwidth untuk fair usage</li>
                                                <li>• Beberapa fitur mungkin dalam tahap beta</li>
                                                <li>• Akses terbatas saat overload server</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Section 4: Sistem Gamifikasi */}
                        <section id="sistem-gamifikasi" className="mb-10">
                            <div className="flex items-center space-x-3 mb-6">
                                <div className="p-2 bg-white/10 rounded-lg">
                                    <FiAward className="text-xl" />
                                </div>
                                <h2 className="text-2xl font-bold">Sistem Gamifikasi</h2>
                            </div>

                            <div className="space-y-6">
                                <div className="bg-gradient-to-r from-yellow-900/20 to-orange-900/20 p-6 rounded-lg border border-yellow-800">
                                    <h3 className="text-lg font-semibold mb-4 flex items-center">
                                        <FiAward className="mr-2 text-yellow-400" />
                                        Elemen Gamifikasi
                                    </h3>
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <h4 className="font-medium mb-3">🏆 Sistem Poin & Level</h4>
                                            <ul className="space-y-2 text-gray-300 text-sm">
                                                <li>• Experience Points (XP) untuk setiap aktivitas</li>
                                                <li>• Level progression berdasarkan akumulasi XP</li>
                                                <li>• Bonus multiplier untuk streak pembelajaran</li>
                                                <li>• Daily/weekly challenges dengan reward khusus</li>
                                            </ul>
                                        </div>
                                        <div>
                                            <h4 className="font-medium mb-3">🎖️ Badge & Achievement</h4>
                                            <ul className="space-y-2 text-gray-300 text-sm">
                                                <li>• Badge untuk pencapaian spesifik</li>
                                                <li>• Rare dan legendary achievements</li>
                                                <li>• Seasonal events dengan limited badges</li>
                                                <li>• Community recognition system</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-800">
                                    <h3 className="text-lg font-semibold mb-4">Leaderboard & Kompetisi</h3>
                                    <div className="grid md:grid-cols-3 gap-4">
                                        <div className="bg-gray-900/50 p-4 rounded">
                                            <h4 className="font-medium mb-2 text-blue-300">🥇 Global Ranking</h4>
                                            <p className="text-gray-300 text-sm">Peringkat berdasarkan total XP dan achievement di seluruh platform.</p>
                                        </div>
                                        <div className="bg-gray-900/50 p-4 rounded">
                                            <h4 className="font-medium mb-2 text-green-300">👥 Class Competition</h4>
                                            <p className="text-gray-300 text-sm">Kompetisi antar kelas atau grup pembelajaran dengan prize menarik.</p>
                                        </div>
                                        <div className="bg-gray-900/50 p-4 rounded">
                                            <h4 className="font-medium mb-2 text-purple-300">📅 Monthly Events</h4>
                                            <p className="text-gray-300 text-sm">Event bulanan dengan tema khusus dan exclusive rewards.</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-red-900/20 p-6 rounded-lg border border-red-800">
                                    <h3 className="text-lg font-semibold mb-3 flex items-center">
                                        <FiAlertTriangle className="mr-2 text-red-400" />
                                        Aturan Fair Play
                                    </h3>
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <h4 className="font-medium mb-3">❌ Tindakan Terlarang</h4>
                                            <ul className="space-y-2 text-gray-300 text-sm">
                                                <li>• Bot atau script untuk farming poin</li>
                                                <li>• Multiple accounts untuk advantage</li>
                                                <li>• Sharing akun untuk kompetisi</li>
                                                <li>• Exploit bugs untuk gain unfair</li>
                                            </ul>
                                        </div>
                                        <div>
                                            <h4 className="font-medium mb-3">⚖️ Konsekuensi</h4>
                                            <ul className="space-y-2 text-gray-300 text-sm">
                                                <li>• Reset poin dan achievement</li>
                                                <li>• Temporary ban dari kompetisi</li>
                                                <li>• Permanent ban untuk repeat offender</li>
                                                <li>• Removal dari leaderboard</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Section 6: Konten Pengguna */}
                        <section id="konten-pengguna" className="mb-10">
                            <div className="flex items-center space-x-3 mb-6">
                                <div className="p-2 bg-white/10 rounded-lg">
                                    <FiUsers className="text-xl" />
                                </div>
                                <h2 className="text-2xl font-bold">Konten Pengguna</h2>
                            </div>

                            <div className="space-y-6">
                                <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-800">
                                    <h3 className="text-lg font-semibold mb-4">Hak dan Kewajiban</h3>
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <h4 className="font-medium mb-3 text-green-400">✅ Anda Berhak</h4>
                                            <ul className="space-y-2 text-gray-300 text-sm">
                                                <li>• Mempertahankan kepemilikan konten asli</li>
                                                <li>• Mengedit atau menghapus konten Anda</li>
                                                <li>• Mengontrol visibilitas konten</li>
                                                <li>• Mendapat kredit untuk kontribusi</li>
                                            </ul>
                                        </div>
                                        <div>
                                            <h4 className="font-medium mb-3 text-red-400">❌ Anda Tidak Boleh</h4>
                                            <ul className="space-y-2 text-gray-300 text-sm">
                                                <li>• Upload konten yang melanggar hukum</li>
                                                <li>• Berbagi konten yang dilindungi copyright</li>
                                                <li>• Posting spam atau konten misleading</li>
                                                <li>• Menggunakan hate speech atau harassment</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-blue-900/20 p-6 rounded-lg border border-blue-800">
                                    <h3 className="text-lg font-semibold mb-4">Lisensi Penggunaan</h3>
                                    <p className="text-gray-300 mb-4">
                                        Dengan mengunggah konten ke platform, Anda memberikan lisensi non-eksklusif kepada kami untuk:
                                    </p>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <ul className="space-y-2 text-gray-300 text-sm">
                                            <li>• Menampilkan konten di platform</li>
                                            <li>• Membuat backup untuk keamanan data</li>
                                            <li>• Mengoptimalkan format untuk berbagai device</li>
                                        </ul>
                                        <ul className="space-y-2 text-gray-300 text-sm">
                                            <li>• Memoderasi konten sesuai community guidelines</li>
                                            <li>• Menggunakan untuk improvement platform</li>
                                            <li>• Membagikan dalam konteks educational fair use</li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-800">
                                    <h3 className="text-lg font-semibold mb-4">Kebijakan Pengembalian</h3>
                                    <ul className="space-y-2 text-gray-300 text-sm">
                                        <li>• Refund 100% dalam 7 hari pertama</li>
                                        <li>• Prorate refund untuk pembatalan mid-cycle</li>
                                        <li>• No refund untuk abuse atau violation</li>
                                        <li>• Processing time 3-7 hari kerja</li>
                                        <li>• Refund melalui metode pembayaran asli</li>
                                    </ul>
                                </div>
                            </div>
                        </section>
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