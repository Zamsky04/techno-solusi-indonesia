// src/Pages/TentangKami.jsx

import React from 'react'
import { Head, Link } from '@inertiajs/react'
import MainLayout from '@/Layouts/MainLayout'

// --- Komponen-Komponen Halaman "Tentang Kami" ---

// HERO SECTION
function HeroTentang() {
  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-100 pt-20 pb-16">
      <div className="container mx-auto px-4 py-12 relative z-10 text-center">
        <div className="animate-fade-in-up">
          <span className="font-semibold text-blue-600">Tentang Siap Kerja</span>
          {/* PERUBAHAN: Judul dan deskripsi utama yang lebih kuat */}
          <h1 className="text-5xl lg:text-7xl font-extrabold leading-tight mt-2 bg-gradient-to-r from-blue-800 to-cyan-700 bg-clip-text text-transparent">
            Misi Kami: Menciptakan Tenaga Kerja Kompeten dan #SiapKerja
          </h1>
          <p className="mt-6 text-xl text-gray-700 max-w-3xl mx-auto">
            Di Siap Kerja, kami percaya setiap individu dan organisasi memiliki potensi untuk unggul. Misi kami adalah membuka potensi tersebut melalui sertifikasi yang diakui secara global.
          </p>
        </div>
      </div>
    </section>
  )
}

// MISI & VISI
function MisiVisi() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
        {/* Visi */}
        <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 transform hover:scale-[1.02] transition-transform duration-300">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-full bg-blue-100 grid place-items-center"><i className="fas fa-rocket text-xl text-blue-600"/></div>
            <h2 className="text-3xl font-bold text-gray-800">Visi Kami</h2>
          </div>
          {/* PERUBAHAN: Teks visi disesuaikan */}
          <p className="text-gray-600 leading-relaxed">Menjadi platform pilihan utama di Indonesia untuk peningkatan kompetensi dan sertifikasi profesional, memberdayakan tenaga kerja untuk masa depan.</p>
        </div>
        {/* Misi */}
        <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 transform hover:scale-[1.02] transition-transform duration-300">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-full bg-cyan-100 grid place-items-center"><i className="fas fa-bullseye text-xl text-cyan-600"/></div>
            <h2 className="text-3xl font-bold text-gray-800">Misi Kami</h2>
          </div>
          {/* PERUBAHAN: Teks misi disesuaikan */}
          <p className="text-gray-600 leading-relaxed">Menyediakan akses mudah terhadap sertifikasi berkualitas, menyederhanakan proses yang kompleks, dan membangun ekosistem profesional yang kompeten dan siap bersaing.</p>
        </div>
      </div>
    </section>
  )
}

// "MENGAPA KAMI?" (DIFERENSIATOR)
function MengapaKami() {
  const whyUsData = [
    { icon: 'fa-user-tie', title: 'Tim Ahli & Berpengalaman', desc: 'Didukung oleh para konsultan profesional dengan pengalaman luas di berbagai sektor industri.' },
    { icon: 'fa-cogs', title: 'Proses Efisien & Terstruktur', desc: 'Kami menyederhanakan proses sertifikasi yang kompleks menjadi langkah yang jelas dan mudah diikuti.' },
    { icon: 'fa-handshake', title: 'Pendekatan Kemitraan', desc: 'Kami memposisikan diri sebagai mitra jangka panjang untuk kesuksesan dan pertumbuhan bisnis Anda.' },
    { icon: 'fa-check-circle', title: 'Jaminan Kepatuhan', desc: 'Memastikan perusahaan Anda memenuhi semua persyaratan standar nasional maupun internasional.' },
  ];
  return (
    <section className="py-20 bg-base-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-700 to-cyan-600 bg-clip-text text-transparent leading-snug py-2">Mengapa Memilih Siap Kerja?</h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto text-lg">Keunggulan yang kami tawarkan untuk memastikan keberhasilan sertifikasi Anda.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {whyUsData.map((item, index) => (
            <div key={index} className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 text-center">
              <div className="w-14 h-14 mx-auto rounded-full bg-blue-600 text-white grid place-items-center mb-4"><i className={`fas ${item.icon} text-2xl`}/></div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// TIM KAMI
// function TimKami() {
//     // SARAN: Ganti data ini dengan anggota tim yang sebenarnya
//   const teamData = [
//     { name: 'Azzam L. Najih', title: 'Founder & CEO', photo: '/team/azzam.jpg' },
//     { name: 'Jane Smith', title: 'Lead Consultant', photo: '/team/jane-smith.jpg' },
//     { name: 'Ahmad Santoso', title: 'Operations Manager', photo: '/team/ahmad-santoso.jpg' },
//   ];
//   return (
//     <section className="py-20 bg-white">
//       <div className="container mx-auto px-4">
//         <div className="text-center mb-16">
//           <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-700 to-cyan-600 bg-clip-text text-transparent leading-snug py-2">Tim Profesional Kami</h2>
//           <p className="mt-4 text-gray-600 max-w-2xl mx-auto text-lg">Tenaga ahli yang berdedikasi untuk kesuksesan Anda.</p>
//         </div>
//         <div className="flex flex-wrap justify-center gap-8">
//           {teamData.map((member, index) => (
//             <div key={index} className="text-center">
//               {/* TODO: Ganti path gambar sesuai dengan foto tim Anda */}
//               <img src={member.photo} alt={`Foto ${member.name}`} className="w-40 h-40 rounded-full mx-auto mb-4 object-cover shadow-lg"/>
//               <h3 className="text-xl font-bold text-gray-800">{member.name}</h3>
//               <p className="text-blue-600 font-medium">{member.title}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   )
// }

// MITRA KAMI (KREDIBILITAS)
function MitraKami() {
  return (
    <section className="py-16 bg-base-100">
      <div className="container mx-auto px-4 text-center">
        <h3 className="text-2xl font-bold text-gray-800 mb-8">Didukung dan Diakui Oleh</h3>
        <div className="flex justify-center items-center gap-12 opacity-80">
          {/* TODO: Pastikan path logo sudah benar */}
          <img src="/logo/logo-bnsp.png" alt="Logo BNSP" className="h-16 object-contain filter grayscale hover:filter-none transition-all duration-300" />
          <img src="/logo/logo-kemnaker.png" alt="Logo Kemenaker" className="h-16 object-contain filter grayscale hover:filter-none transition-all duration-300" />
        </div>
      </div>
    </section>
  )
}

// CALL TO ACTION
function CallToAction() {
  return (
    <section className="py-20 bg-gradient-to-r from-blue-700 to-cyan-600">
      <div className="container mx-auto px-4 text-center text-white">
        <h2 className="text-4xl font-bold mb-4">Siap Mengambil Langkah Selanjutnya?</h2>
        <p className="max-w-xl mx-auto mb-8 text-lg text-blue-100">Tingkatkan standar profesional Anda ke level berikutnya. Jelajahi layanan sertifikasi kami atau hubungi tim ahli kami hari ini.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/sertifikasi" className="btn btn-lg rounded-full bg-white text-blue-700 hover:bg-blue-50">
            Lihat Semua Sertifikasi
          </Link>
          {/* PERBAIKAN: Link mengarah ke section kontak di halaman utama */}
          <Link href="/#contact" className="btn btn-lg rounded-full btn-outline border-white text-white hover:bg-white hover:text-blue-700">
            Hubungi Kami
          </Link>
        </div>
      </div>
    </section>
  )
}


// --- Komponen Utama Halaman "Tentang Kami" ---
export default function TentangKami() {
  return (
    <>
      {/* PERUBAHAN: Judul halaman diperbarui */}
      <Head title="Tentang Kami - Siap Kerja" />

      <HeroTentang />
      <MisiVisi />
      <MengapaKami />
      {/* <TimKami /> */}
      <MitraKami />
      <CallToAction />
    </>
  )
}

TentangKami.layout = page => <MainLayout children={page}>{page}</MainLayout>
