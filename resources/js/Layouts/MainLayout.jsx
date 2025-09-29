// src/Layouts/MainLayout.jsx
import React, { useEffect, useState } from 'react'
import { Link, Head } from '@inertiajs/react'

export default function MainLayout({ children }) {
  const [scrolled, setScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const CERTIFICATION_CATEGORIES_FOR_FOOTER = [
    { title: 'Akreditasi', filterValue: 'akreditasi' },
    { title: 'Pembinaan SMK3 Kemnaker', filterValue: 'pembinaan smk3 kemnaker' },
    { title: 'Riksa Uji Alat K3 Disnaker', filterValue: 'riksa uji alat k3 disnaker' },
    { title: 'SBU Badan Usaha', filterValue: 'sbu bu' },
    { title: 'Audit SMK3 Kemnaker', filterValue: 'sertifikat audit smk3 kemnaker' },
    { title: 'Sertifikat Kompetensi K3 BNSP', filterValue: 'sertifikat kompetensi k3 bnsp' },
  ]

  return (
    <>
      <Head title="Siap Kerja">
        <link key="fvi" rel="icon" href="/brand/favicon.ico?v=4" />
        <link key="fv32" rel="icon" type="image/png" sizes="32x32" href="/brand/favicon-32x32.png?v=4" />
        <link key="fv16" rel="icon" type="image/png" sizes="16x16" href="/brand/favicon-16x16.png?v=4" />
        <link key="apple" rel="apple-touch-icon" sizes="180x180" href="/brand/apple-touch-icon.png?v=4" />
        <link key="mani" rel="manifest" href="/brand/site.webmanifest?v=4" />
        {/* meta theme color terang */}
        <meta key="theme" name="theme-color" content="#ffffff" />
      </Head>

      {/* === LOCK LIGHT THEME UNTUK SELURUH LAYOUT INI === */}
      <div data-theme="light" className="force-light bg-white text-slate-800">
        {/* NAVBAR */}
        <nav
        className={
            `fixed top-0 inset-x-0 z-50 transition-all
            h-14 md:h-16 lg:h-20
            flex items-center
            backdrop-blur-xl bg-white/85
            ${scrolled
                ? 'shadow-[0_10px_30px_rgba(2,6,23,.08)] border-b border-slate-200/70'
                : 'border-b border-transparent'}`
        }
        >
            <div className="container mx-auto px-3 md:px-4 w-full">
                <div className="flex items-center gap-2 md:gap-3">
                {/* kiri */}
                <button
                    className="btn btn-ghost lg:hidden text-slate-700 hover:bg-slate-100"
                    aria-label="Buka menu"
                    onClick={() => setIsMobileMenuOpen(true)}
                >
                    <i className="fas fa-bars text-lg md:text-xl" />
                </button>

                <Link href="/" className="flex items-center gap-2 md:gap-3">
                    {/* logo responsive */}
                    <img
                    src="/brand/siap-kerja-logo.png"
                    alt="Logo Siap Kerja"
                    className="h-7 w-7 md:h-8 md:w-8 lg:h-9 lg:w-9 rounded-lg"
                    />
                    <span className="hidden sm:inline text-base md:text-lg font-semibold text-slate-900">
                    Siap Kerja
                    </span>
                </Link>

                {/* tengah */}
                <div className="hidden lg:flex flex-1 justify-center">
                    <nav className="flex items-center gap-1">
                    <Link href="/" className="px-3 py-2.5 rounded-lg text-slate-700 hover:text-blue-700 hover:bg-blue-50">Beranda</Link>
                    <Link href="/tentang-kami" className="px-3 py-2.5 rounded-lg text-slate-700 hover:text-blue-700 hover:bg-blue-50">Tentang Kami</Link>
                    <Link href="/sertifikasi" className="px-3 py-2.5 rounded-lg text-slate-700 hover:text-blue-700 hover:bg-blue-50">Sertifikasi</Link>
                    <Link href="/#contact" className="px-3 py-2.5 rounded-lg text-slate-700 hover:text-blue-700 hover:bg-blue-50">Kontak</Link>
                    </nav>
                </div>

                {/* kanan */}
                <div className="ml-auto">
                    <a
                    href="mailto:halo@siapkerja.co.id"
                    className="btn btn-sm md:btn-md rounded-full text-white bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 shadow-md transition-all"
                    >
                    <i className="fas fa-paper-plane mr-2" /> Hubungi Kami
                    </a>
                </div>
                </div>
            </div>
        </nav>

        {/* MOBILE MENU OVERLAY */}
        <div className={`fixed inset-0 z-[99] lg:hidden transition-all duration-300 ${isMobileMenuOpen ? 'visible' : 'invisible'}`}>
          {/* Overlay */}
          <div
            className={`absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0'}`}
            onClick={() => setIsMobileMenuOpen(false)}
          />
          {/* Panel putih (LIGHT) */}
          <div
            className={`relative flex flex-col h-full w-4/5 max-w-xs bg-white text-slate-800 shadow-2xl border-r border-slate-200 transition-transform duration-300 ease-in-out ${
              isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
          >
            <div className="p-5 flex justify-between items-center border-b border-slate-200">
              <Link href="/" className="flex items-center gap-3" onClick={() => setIsMobileMenuOpen(false)}>
                <img src="/brand/siap-kerja-logo.png" alt="Logo Siap Kerja" className="h-7 w-7 rounded-lg" />
                <span className="font-semibold text-lg text-slate-900">Siap Kerja</span>
              </Link>

              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="grid place-items-center h-9 w-9 rounded-full text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition-colors"
                aria-label="Tutup menu"
              >
                <i className="fas fa-times text-xl" />
              </button>
            </div>

            <ul className="flex flex-col p-4 space-y-2">
              <li>
                <Link
                  href="/"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-4 px-4 py-3 rounded-lg text-slate-700 hover:bg-blue-50 hover:text-blue-700 font-medium transition"
                >
                  <i className="fas fa-home w-5 text-center" /> <span>Beranda</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/tentang-kami"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-4 px-4 py-3 rounded-lg text-slate-700 hover:bg-blue-50 hover:text-blue-700 font-medium transition"
                >
                  <i className="fas fa-building w-5 text-center" /> <span>Tentang Kami</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/sertifikasi"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-4 px-4 py-3 rounded-lg text-slate-700 hover:bg-blue-50 hover:text-blue-700 font-medium transition"
                >
                  <i className="fas fa-award w-5 text-center" /> <span>Sertifikasi</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/#contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-4 px-4 py-3 rounded-lg text-slate-700 hover:bg-blue-50 hover:text-blue-700 font-medium transition"
                >
                  <i className="fas fa-envelope w-5 text-center" /> <span>Kontak</span>
                </Link>
              </li>
            </ul>

            <div className="mt-auto p-5 text-center text-xs text-slate-500 border-t border-slate-200">
              <p>© {new Date().getFullYear()} Siap Kerja</p>
            </div>
          </div>
        </div>

        {/* PAGE CONTENT */}
        <main className="pt-14 md:pt-16 lg:pt-20">{children}</main>

        {/* FOOTER (boleh tetap gradient gelap; tidak tergantung dark mode) */}
        <footer className="relative mt-16 bg-gradient-to-br from-blue-800 to-cyan-700 text-white">
          <div className="container mx-auto px-4 py-14">
            <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
              <div>
                <Link href="/" className="flex items-center gap-3">
                  <img src="/brand/siap-kerja-logo.png" alt="Logo Siap Kerja" className="h-7 w-7 rounded-lg" />
                  <span className="text-lg font-semibold text-white">Siap Kerja</span>
                </Link>
                <p className="mt-4 text-blue-100 text-sm leading-relaxed">
                  Membantu profesional dan perusahaan menjadi #SiapKerja melalui sertifikasi terpercaya.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-white mb-3">Tautan Cepat</h4>
                <ul className="space-y-2 text-blue-100 text-sm">
                  <li><Link href="/" className="hover:text-white transition">Beranda</Link></li>
                  <li><Link href="/#about" className="hover:text-white transition">Tentang Kami</Link></li>
                  <li><Link href="/sertifikasi" className="hover:text-white transition">Sertifikasi</Link></li>
                  <li><Link href="/#contact" className="hover:text-white transition">Kontak</Link></li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-white mb-3">Kategori Sertifikasi</h4>
                <ul className="space-y-2 text-blue-100 text-sm">
                  {CERTIFICATION_CATEGORIES_FOR_FOOTER.map((category, index) => (
                    <li key={index}>
                      <Link
                        href={`/sertifikasi?category=${encodeURIComponent(category.filterValue)}`}
                        className="hover:text-white transition"
                      >
                        {category.title}
                      </Link>
                    </li>
                  ))}
                  <li><Link href="/sertifikasi" className="hover:text-white transition font-semibold">Lihat Semua...</Link></li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-white mb-3">Kontak</h4>
                <ul className="space-y-3 text-blue-100 text-sm">
                  <li className="flex items-start gap-3"><i className="fas fa-envelope text-cyan-300 mt-1" /> info@technosolusi.co.id</li>
                  <li className="flex items-start gap-3"><i className="fas fa-phone text-cyan-300 mt-1" /> 0877-7666-7129</li>
                  <li className="flex items-start gap-3"><i className="fas fa-map-marker-alt text-cyan-300 mt-1" /> Kawasan Pergudangan 88 No.D1, Pasarkemis, Tangerang</li>
                </ul>
              </div>
            </div>

            <div className="mt-12 border-t border-white/20 pt-6 text-center">
              <p className="text-sm text-blue-200">© {new Date().getFullYear()} Siap Kerja. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}
