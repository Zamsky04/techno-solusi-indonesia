<!DOCTYPE html>
<html lang="id">
  <head>
    <meta charset="utf-8" /> {{-- was utf-g --}}
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>{{ $title ?? 'Siap Kerja — Sertifikasi Profesional & Kesiapan Kerja' }}</title>

    {{-- Canonical (ubah ke domain final) --}}
    <link rel="canonical" href="{{ url()->current() }}"/>

    {{-- Icons --}}
    <link rel="icon" href="/brand/favicon.ico?v=4">
    <link rel="icon" type="image/png" sizes="32x32" href="/brand/favicon-32x32.png?v=4">
    <link rel="icon" type="image/png" sizes="16x16" href="/brand/favicon-16x16.png?v=4">
    <link rel="apple-touch-icon" sizes="180x180" href="/brand/apple-touch-icon.png?v=4">
    <link rel="manifest" href="/brand/site.webmanifest?v=4">
    <meta name="theme-color" content="#2563eb">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css">

    {{-- Preconnect & font --}}
    <link rel="preconnect" href="https://fonts.googleapis.com" crossorigin>
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">

    {{-- Base meta (fallback, akan dioverride per page oleh <Head> Inertia) --}}
    <meta name="description" content="Siap Kerja membantu Anda meraih sertifikasi profesional (ISO, SMK3, SKK, SBU, SLO, SLF, PBG) dengan pendampingan ahli & proses efisien.">
    <meta name="keywords" content="SiapKerja, Sertifikasi ISO, ISO 9001, SMK3, SKK BNSP, SBU, SLO DJK, SLF, PBG, Konsultan Sertifikasi">

    {{-- Open Graph --}}
    <meta property="og:site_name" content="Siap Kerja">
    <meta property="og:type" content="website">
    <meta property="og:title" content="{{ $title ?? 'Siap Kerja — Sertifikasi Profesional & Kesiapan Kerja' }}">
    <meta property="og:description" content="Pendampingan sertifikasi ISO & lainnya: cepat, transparan, profesional.">
    <meta property="og:url" content="{{ url()->current() }}">
    <meta property="og:image" content="{{ asset('brand/og-cover.png') }}"> {{-- 1200x630 --}}
    <meta property="og:locale" content="id_ID">

    {{-- Twitter Card --}}
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="{{ $title ?? 'Siap Kerja — Sertifikasi Profesional & Kesiapan Kerja' }}">
    <meta name="twitter:description" content="Pendampingan sertifikasi ISO & lainnya: cepat, transparan, profesional.">
    <meta name="twitter:image" content="{{ asset('brand/og-cover.png') }}">

    @viteReactRefresh
    @vite(['resources/css/app.css', 'resources/js/app.jsx'])
    @inertiaHead

    {{-- Organization --}}
    @php
    $orgLd = [
    '@context' => 'https://schema.org',
    '@type'    => 'Organization',
    'name'     => 'Siap Kerja',
    'url'      => url('/'),
    'logo'     => asset('brand/siap-kerja-logo.png'),
    'sameAs'   => [
        'https://www.facebook.com/yourpage',
        'https://www.instagram.com/yourpage',
        'https://www.linkedin.com/company/yourpage',
    ],
    'contactPoint' => [[
        '@type' => 'ContactPoint',
        'contactType' => 'customer support',
        'email' => 'info@technosolusi.co.id',
        'areaServed' => 'ID',
    ]],
    ];

    $siteLd = [
    '@context' => 'https://schema.org',
    '@type'    => 'WebSite',
    'name'     => 'Siap Kerja',
    'url'      => url('/'),
    'potentialAction' => [
        '@type' => 'SearchAction',
        'target' => url('/search') . '?q={q}',
        'query-input' => 'required name=q',
    ],
    ];
    @endphp

    <script type="application/ld+json">{!! json_encode($orgLd, JSON_UNESCAPED_SLASHES|JSON_UNESCAPED_UNICODE) !!}</script>
    <script type="application/ld+json">{!! json_encode($siteLd, JSON_UNESCAPED_SLASHES|JSON_UNESCAPED_UNICODE) !!}</script>

  </head>
  <body class="font-sans bg-gray-50 text-slate-800 antialiased">
    @inertia
  </body>
</html>
