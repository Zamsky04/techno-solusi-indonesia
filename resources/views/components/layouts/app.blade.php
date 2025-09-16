<!DOCTYPE html>
<html lang="id">
  <head>
    <meta charset="utf-g" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>{{ $title ?? 'Siap Kerja' }}</title>
    <link rel="icon" href="/brand/favicon.ico?v=4">
    <link rel="icon" type="image/png" sizes="32x32" href="/brand/favicon-32x32.png?v=4">
    <link rel="icon" type="image/png" sizes="16x16" href="/brand/favicon-16x16.png?v=4">
    <link rel="apple-touch-icon" sizes="180x180" href="/brand/apple-touch-icon.png?v=4">
    <link rel="manifest" href="/brand/site.webmanifest?v=4">
    <meta name="theme-color" content="#2563eb">

    {{-- Fonts & Icons --}}
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css">

    @viteReactRefresh
    @vite(['resources/css/app.css', 'resources/js/app.jsx'])
    @inertiaHead
  </head>
  <body class="font-sans bg-gray-50 text-slate-800 antialiased">
    @inertia
  </body>
</html>
