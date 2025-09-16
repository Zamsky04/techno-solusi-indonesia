// resources/js/Pages/Home.jsx
import React from 'react'
import MainLayout from '@/Layouts/MainLayout'
import { Head, Link } from '@inertiajs/react'

/* =========================
   Data Halaman Utama
   ========================= */

// Data untuk 11 kategori sertifikasi
const CERTIFICATION_CATEGORIES = [
    { icon: 'fa-award', title: 'Akreditasi', desc: 'Sertifikasi yang diakui secara nasional & internasional.', filterValue: 'akreditasi', btn: 'btn-category-blue', },
    { icon: 'fa-hard-hat', title: 'Pembinaan SMK3 Kemnaker', desc: 'Pelatihan ahli K3 & pendampingan pemenuhan standar Kemnaker.', filterValue: 'pembinaan smk3 kemnaker', btn: 'btn-category-cyan', },
    { icon: 'fa-tools', title: 'Riksa Uji Alat K3 Disnaker', desc: 'Pengujian rutin peralatan untuk keselamatan & kelayakan teknis.', filterValue: 'riksa uji alat k3 disnaker', btn: 'btn-category-blue', },
    { icon: 'fa-building', title: 'SBU Badan Usaha', desc: 'Sertifikat Kualifikasi & Klasifikasi Badan Usaha Konstruksi.', filterValue: 'sbu bu', btn: 'btn-category-cyan', },
    { icon: 'fa-bolt', title: 'SBU DJK', desc: 'Sertifikasi Badan Usaha Ketenagalistrikan (Ditjen Ketenagalistrikan).', filterValue: 'sbu djk', btn: 'btn-category-blue', },
    { icon: 'fa-user-tie', title: 'SBU Perorangan', desc: 'Sertifikasi kompetensi tenaga ahli perorangan jasa konstruksi.', filterValue: 'sbu perorangan', btn: 'btn-category-cyan', },
    { icon: 'fa-clipboard-check', title: 'Audit SMK3 Kemnaker', desc: 'Audit eksternal Sistem Manajemen K3 sesuai standar Kemnaker.', filterValue: 'sertifikat audit smk3 kemnaker', btn: 'btn-category-blue', },
    { icon: 'fa-id-badge', title: 'Sertifikat Kompetensi K3 BNSP', desc: 'Pengakuan kompetensi di bidang K3 dari Badan Nasional Sertifikasi Profesi.', filterValue: 'sertifikat kompetensi k3 bnsp', btn: 'btn-category-cyan', },
    { icon: 'fa-file-signature', title: 'SIO Kemnaker', desc: 'Surat Izin Operator alat berat & angkut sesuai standar Kemnaker.', filterValue: 'sio kemnaker', btn: 'btn-category-blue', },
    { icon: 'fa-graduation-cap', title: 'SKK BNSP', desc: 'Sertifikat Kompetensi Kerja yang diterbitkan oleh BNSP.', filterValue: 'skk bnsp', btn: 'btn-category-cyan', },
    { icon: 'fa-lightbulb', title: 'SLO DJK ESDM', desc: 'Sertifikat Laik Operasi instalasi tenaga listrik (Ditjen Ketenagalistrikan).', filterValue: 'slo djk esdm', btn: 'btn-category-blue', },
    { icon: 'fa-building', title: 'Persetujuan Bangunan Gedung (PBG)', desc: 'Izin resmi pembangunan/renovasi bangunan gedung.', filterValue: 'pbg', btn: 'btn-category-cyan', directSlug: 'persetujuan-bangunan-gedung-pbg', },
    { icon: 'fa-file-contract', title: 'Sertifikat Laik Fungsi (SLF)', desc: 'Sertifikat kelayakan fungsi bangunan gedung.', filterValue: 'slf', btn: 'btn-category-blue', directSlug: 'sertifikat-laik-fungsi-slf', },
];

const MISSIONS = [
    'Memberikan pendampingan ahli untuk proses sertifikasi yang efisien dan tepat waktu.',
    'Menyederhanakan prosedur sertifikasi yang kompleks menjadi langkah-langkah mudah dipahami.',
    'Membantu klien mencapai dan mempertahankan kepatuhan terhadap standar industri & internasional.',
    'Meningkatkan daya saing dan kredibilitas bisnis klien di pasar global.',
];

const VALUES = [
    { icon: 'fa-user-tie', title: 'Profesionalisme', desc: 'Tim ahli kami memberikan layanan terbaik dengan integritas tinggi & pengalaman luas.' },
    { icon: 'fa-eye',      title: 'Transparansi',    desc: 'Kami menjamin proses yang jelas, komunikasi terbuka, dan tanpa biaya tersembunyi.' },
];


/* =========================
   Halaman Utama
   ========================= */
export default function Home() {
    return (
    <>
        <Head title="Siap Kerja — Sertifikasi Profesional & Kesiapan Kerja" />
        <HeroSection />
        <CategoriesSection categories={CERTIFICATION_CATEGORIES} />
        <AboutSection missions={MISSIONS} />
        <CertificateSection />
        <ValuesSection values={VALUES} />
        <ContactCTA />
        </>
    );
}

Home.layout = page => <MainLayout children={page} />;

/* =========================
   Komponen-komponen Halaman
   ========================= */

// NEW: Hero Section yang didesain ulang
function HeroSection() {
    return (
        <section id="home" className="relative isolate overflow-hidden pt-20 pb-20 bg-gradient-to-br from-blue-50 via-white to-blue-100 min-h-[70vh] flex items-center">
            {/* Bubbles dan Gradients Latar Belakang */}
            <div aria-hidden className="pointer-events-none absolute inset-0">
            <div className="absolute top-10 left-10 w-24 h-24 rounded-full bg-blue-200 opacity-40 animate-pulse-slow" />
            <div className="absolute bottom-20 right-20 w-16 h-16 rounded-full bg-cyan-100 opacity-50 animate-pulse-slow delay-300" />
            <div className="absolute top-1/2 left-1/4 w-32 h-32 rounded-full bg-blue-100 opacity-30 animate-pulse-slow delay-600" />
            </div>

            <div className="relative z-10 container mx-auto px-4 text-center">
            <div className="max-w-4xl mx-auto">
                {/* Logo Mitra (BNSP & Kemenaker) */}
                <div className="flex justify-center items-center gap-6 mb-6 opacity-80 animate-fade-in-up delay-200">
                    <img src="/logo/logo-bnsp.png" alt="Logo BNSP" className="h-12 md:h-16 object-contain" /> {/* Ganti dengan path logo BNSP Anda */}
                    <img src="/logo/logo-kemnaker.png" alt="Logo Kemenaker" className="h-12 md:h-16 object-contain" /> {/* Ganti dengan path logo Kemenaker Anda */}
                </div>

                {/* Judul Utama dengan gradasi premium */}
                <h1 className="text-5xl lg:text-7xl font-extrabold leading-tight mb-5 bg-gradient-to-r from-blue-800 to-cyan-700 bg-clip-text text-transparent animate-fade-in-up">
                    Tingkatkan Kompetensi, Raih Status #SiapKerja
                </h1>
                <p className="mt-5 text-lg lg:text-2xl/9 text-gray-700 max-w-3xl mx-auto animate-fade-in-up delay-300">
                    Kami membantu para profesional dan perusahaan mencapai standar keahlian tertinggi melalui sertifikasi terpercaya.
                </p>

                <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up delay-400">
                <Link href="#sertifikasi" className="btn btn-lg rounded-full text-white bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 shadow-[0_10px_30px_rgba(40,120,200,.18)] hover:shadow-[0_16px_40px_rgba(40,120,200,.24)] transition-all">
                    Jelajahi Sertifikasi
                </Link>
                <a href="mailto:info@technosolusi.co.id" className="btn btn-outline rounded-full btn-lg border-blue-600 text-blue-700 hover:bg-blue-600 hover:text-white transition-all">
                    Hubungi Kami
                </a>
                </div>
            </div>
            </div>
        </section>
    );
}

function SectionTitle({ title, subtitle }) {
    return (
        <div className="text-center mb-16">
        <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-700 to-cyan-600 bg-clip-text text-transparent leading-snug py-2">{title}</h2>
        {subtitle && <p className="mt-4 text-gray-600 max-w-2xl mx-auto text-lg">{subtitle}</p>} {/* Subtitle lebih besar */}
        </div>
    );
}

function CategoryCard({ icon, title, desc, btn, filterValue, directSlug }) {
    const linkUrl = directSlug
        ? `/sertifikasi/${directSlug}`
        : `/sertifikasi?category=${encodeURIComponent(filterValue)}`;

    let iconBgClass = 'bg-blue-600';
    let btnClass = 'bg-blue-600 hover:bg-blue-700';

    if (btn === 'btn-category-cyan') {
        iconBgClass = 'bg-cyan-500';
        btnClass = 'bg-cyan-500 hover:bg-cyan-600';
    }

    return (
        <div className="group card bg-white rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border border-gray-100 h-full flex flex-col transform hover:scale-[1.02]">
            <div className="card-body text-center flex flex-col p-6"> {/* Padding disesuaikan */}
                <div className={`w-16 h-16 ${iconBgClass} rounded-2xl grid place-items-center mx-auto mb-5 shadow-xl group-hover:scale-110 transition-transform duration-300 ease-out`}>
                    <i className={`fas ${icon} text-white text-2xl`} />
                </div>
                <h3 className="card-title justify-center text-xl font-bold text-gray-800 mb-2">{title}</h3>
                <p className="text-gray-600 text-sm flex-grow leading-relaxed">{desc}</p>
                <div className="card-actions justify-center mt-6">
                    <Link href={linkUrl} className={`btn btn-sm rounded-full text-white ${btnClass} btn-enhanced transition-all duration-300 hover:shadow-md`}>
                        Lihat Detail
                    </Link>
                </div>
            </div>
        </div>
    );
}

function CategoriesSection({ categories }) {
    return (
        <section id="sertifikasi" className="py-20 bg-base-100">
        <div className="container mx-auto px-4">
            <SectionTitle title="Kategori Sertifikasi Unggulan" subtitle="Temukan beragam sertifikasi yang kami sediakan untuk meningkatkan standar bisnis Anda." />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {categories.map((cat, i) => <CategoryCard key={i} {...cat} />)}
            </div>
        </div>
        </section>
    );
}

function StatItem({ value, label }) {
    return (
        <div className="rounded-xl border border-blue-100 bg-blue-50 p-5 text-center shadow-sm hover:shadow-md hover:-translate-y-0.5 transition duration-300">
        <div className="text-3xl font-bold text-blue-700 mb-1">{value}</div>
        <div className="text-sm text-slate-600">{label}</div>
        </div>
    );
}

function AboutSection({ missions }) {
    return (
        <section id="about" className="py-20 bg-white">
        <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-up">
            <span className="badge badge-lg border-blue-400 text-blue-700 bg-blue-50 mb-4 px-4 py-2 text-sm font-semibold rounded-full">Tentang Kami</span>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">Mewujudkan Standar Global untuk Keunggulan Lokal</h2>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">Mendorong Profesionalisme, Mewujudkan Kesiapan Kerja</h2>
            <p className="mt-6 text-slate-700 text-lg leading-relaxed">
                <b>Siap Kerja</b> adalah platform terdepan untuk pengembangan kompetensi dan sertifikasi profesional. Sejak tahun 2020, kami berkomitmen penuh untuk meningkatkan kredibilitas dan kapabilitas Anda di dunia kerja.
            </p>


            <div className="mt-8 grid sm:grid-cols-3 gap-6">
                <StatItem value="11+" label="Kategori Sertifikasi" />
                <StatItem value="1000+"  label="Klien Puas" />
                <StatItem value="4+ Tahun" label="Pengalaman" />
            </div>
            </div>

            <div className="bg-gradient-to-br from-blue-100 to-cyan-100 rounded-3xl p-8 border border-blue-200 animate-fade-in-up delay-200 shadow-xl">
            <h3 className="text-3xl font-bold text-slate-900 mb-6">Visi & Misi Kami</h3>

            <h4 className="text-xl font-semibold text-slate-800 mb-2">Visi</h4>
            <p className="text-slate-700 mb-6 leading-relaxed">
                Menjadi konsultan sertifikasi terdepan di Indonesia yang dikenal karena integritas, keahlian, dan kemampuannya dalam memberikan nilai tambah nyata bagi setiap klien.
            </p>

            <h4 className="text-xl font-semibold text-slate-800 mb-3">Misi</h4>
            <ul className="space-y-3 text-slate-700">
                {missions.map((m, i) => (
                <li key={i} className="flex gap-3 items-start">
                    <i className="fas fa-check-circle text-blue-600 mt-1 text-lg shrink-0" />
                    <span>{m}</span>
                </li>
                ))}
            </ul>
            </div>
        </div>
        </section>
    );
}

function CertificateSection() {
    // ===========================
    // DATA SERTIFIKAT
    // ===========================
    const certificates = [
        {
        title: "ISO 9001:2015",
        desc: "Standar internasional untuk sistem manajemen mutu.",
        img: "/certificate/certificate-iso-9001.jpg",
        },
    ];

    // ===========================
    // STATE LIGHTBOX
    // ===========================
    const [open, setOpen] = React.useState(false);
    const [activeIndex, setActiveIndex] = React.useState(0);

    const openLightbox = (idx) => { setActiveIndex(idx); setOpen(true); };
    const closeLightbox = () => setOpen(false);

    const prev = () => setActiveIndex((i) => Math.max(0, i - 1));
    const next = () => setActiveIndex((i) => Math.min(certificates.length - 1, i + 1));

    React.useEffect(() => {
        const onKey = (e) => {
        if (!open) return;
        if (e.key === "Escape") setOpen(false);
        if (e.key === "ArrowLeft") prev();
        if (e.key === "ArrowRight") next();
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [open, certificates.length]);

    const active = certificates[activeIndex];

    return (
        <section id="certificate" className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
            {/* Judul */}
            <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-700 to-cyan-600 bg-clip-text text-transparent mb-6">
            Sertifikasi Resmi Kami
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-10 text-lg">
            Bukti komitmen kami terhadap kualitas, keamanan, dan kepatuhan standar internasional.
            </p>

            {/* Badge logo (KAN, IAF, dll) */}
            <div className="flex flex-wrap items-center justify-center gap-6 mb-12">
            {/* Simpan file di /public/logo/ dan ganti sesuai asetmu */}
            <img src="/logo/logo-kan.png" alt="KAN" className="h-10 object-contain opacity-80 grayscale hover:grayscale-0 transition" />
            <img src="/logo/logo-iaf.png" alt="IAF" className="h-10 object-contain opacity-80 grayscale hover:grayscale-0 transition" />
            </div>

            {/* Grid Sertifikat */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {certificates.map((cert, i) => (
                <article
                key={i}
                className="bg-white border border-blue-100 shadow-lg rounded-2xl overflow-hidden transform hover:scale-[1.02] transition-all duration-300"
                >
                {/* Klik gambar untuk perbesar */}
                <button
                    type="button"
                    onClick={() => openLightbox(i)}
                    className="block w-full bg-slate-50 p-6"
                    title="Klik untuk memperbesar"
                >
                    <img
                    src={cert.img}
                    alt={cert.title}
                    className="w-full h-72 object-contain"
                    loading="eager"
                    />
                </button>

                <div className="p-6 text-center">
                    <h3 className="text-xl font-bold text-slate-900 mb-2">{cert.title}</h3>
                    <p className="text-gray-600 text-sm">{cert.desc}</p>

                    {/* Link aksesibilitas (buka tab baru) */}
                    <div className="mt-4">
                    <a
                        href={cert.img}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-blue-700 hover:underline"
                        title="Buka ukuran penuh di tab baru"
                    >
                        <i className="fas fa-external-link-alt" />
                        Lihat ukuran penuh
                    </a>
                    </div>
                </div>
                </article>
            ))}
            </div>
        </div>

        {/* LIGHTBOX / MODAL */}
        {open && active && (
            <div
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={closeLightbox}
            aria-modal="true"
            role="dialog"
            >
            <div
                className="relative max-w-6xl w-full"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close */}
                <button
                type="button"
                onClick={closeLightbox}
                className="absolute -top-3 -right-3 bg-white text-slate-800 rounded-full w-10 h-10 shadow hover:shadow-md"
                title="Tutup"
                >
                ✕
                </button>

                {/* Nav (jika >1 sertifikat) */}
                {certificates.length > 1 && (
                <>
                    <button
                    type="button"
                    onClick={prev}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-slate-800 w-10 h-10 rounded-full shadow grid place-items-center"
                    aria-label="Sebelumnya"
                    >
                    ‹
                    </button>
                    <button
                    type="button"
                    onClick={next}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-slate-800 w-10 h-10 rounded-full shadow grid place-items-center"
                    aria-label="Berikutnya"
                    >
                    ›
                    </button>
                </>
                )}

                <div className="bg-white rounded-xl overflow-hidden">
                <div className="px-4 pt-4 text-center">
                    <div className="text-lg font-semibold text-slate-900">{active.title}</div>
                    <div className="text-slate-600 text-sm mt-1">{active.desc}</div>
                </div>

                <img
                    src={active.img}
                    alt={active.title}
                    className="w-full max-h-[80vh] object-contain bg-slate-50"
                />

                {/* Toolbar kecil */}
                <div className="p-3 text-center">
                    <a
                    href={active.img}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-blue-700 hover:underline"
                    >
                    <i className="fas fa-external-link-alt" />
                    Buka di tab baru
                    </a>
                </div>
                </div>
            </div>
            </div>
        )}
        </section>
    );
}




function ValueCard({ icon, title, desc }) {
    return (
        <div className="group bg-white border border-gray-100 rounded-3xl p-7 text-center shadow-lg hover:shadow-xl hover:-translate-y-1 transition h-full transform hover:scale-[1.01]">
            <div className="w-14 h-14 mx-auto rounded-full bg-blue-600 grid place-items-center text-white group-hover:scale-110 transition-transform duration-300 mb-4">
                <i className={`fas ${icon} text-xl`} />
            </div>
            <div className="mt-3 font-bold text-xl text-gray-800 mb-2">{title}</div>
            <div className="text-sm text-gray-600 leading-relaxed">{desc}</div>
        </div>
    );
}

function ValuesSection({ values }) {
    return (
        <section className="py-20 bg-base-100">
        <div className="container mx-auto px-4">
            <SectionTitle title="Nilai-Nilai Inti Kami" subtitle="Prinsip yang memandu setiap langkah kami dalam melayani Anda." />
            <div className="max-w-3xl mx-auto grid sm:grid-cols-2 gap-8">
            {values.map((v, i) => <ValueCard key={i} {...v} />)}
            </div>
        </div>
        </section>
    );
}

function ContactCTA() {
    return (
        <section id="contact" className="py-20 bg-white">
            <div className="container mx-auto px-4">
            <div className="rounded-3xl border border-blue-200 bg-gradient-to-br from-blue-50 to-cyan-50 p-8 md:p-12 shadow-xl">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                    <h3 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight mb-3">Siap Tingkatkan Standar Bisnis Anda?</h3>
                    <p className="text-slate-700 text-lg">Konsultasikan kebutuhan sertifikasi Anda dengan tim ahli kami sekarang.</p>
                </div>
                <div className="text-center md:text-right mt-6 md:mt-0">
                    <a href="mailto:info@technosolusi.co.id" className="btn btn-lg rounded-full text-white bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 shadow-[0_10px_30px_rgba(40,120,200,.18)] hover:shadow-[0_16px_40px_rgba(40,120,200,.24)] transition-all transform hover:scale-105">
                    Hubungi Kami Sekarang
                    </a>
                </div>
                </div>
            </div>
            </div>
        </section>
    );
}
