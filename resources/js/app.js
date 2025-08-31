import './bootstrap'

/* ==== helpers ==== */
const $  = (s) => document.querySelector(s)
const $$ = (s) => document.querySelectorAll(s)
const esc = (x) => String(x ?? '')
  .replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;')
  .replaceAll('"','&quot;').replaceAll("'",'&#039;')
const debounce = (fn, ms=150) => { let t; return (...a)=>{ clearTimeout(t); t=setTimeout(()=>fn(...a),ms) }}

/* ==== state ==== */
const state = {
  q: '',
  category: 'all',
  sub: {},            // meta filters: {key: value}
  page: 1,
  perPage: 12,
  total: 0,
  lastPage: 1,
}
const LS_KEY = 'iso.db.filters.v1'
const SCHEMA  = 2; // bump kalau struktur state berubah
const DEFAULT = { q:'', category:'all', sub:{}, page:1, perPage:12, total:0, lastPage:1 };

function persist() {
  try {
    const toSave = { ...state, _schema: SCHEMA };
    localStorage.setItem(LS_KEY, JSON.stringify(toSave));
  } catch {}
}
function hydrate() {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return Object.assign(state, DEFAULT);

    const saved = JSON.parse(raw);

    // jika schema lama / korup -> reset default
    if (!saved || saved._schema !== SCHEMA) {
      Object.assign(state, DEFAULT);
      persist();
      return;
    }

    // isi state dengan fallback aman
    state.q        = typeof saved.q === 'string' ? saved.q : '';
    state.category = saved.category || 'all';
    state.sub      = saved.sub && typeof saved.sub === 'object' ? saved.sub : {};
    state.page     = Number.isInteger(saved.page) ? saved.page : 1;
    state.perPage  = Number.isInteger(saved.perPage) ? saved.perPage : 12;

    const s = $('#searchInput'); if (s) s.value = state.q;
  } catch {
    Object.assign(state, DEFAULT);
  }
}

/* ==== API (with cancellation) ==== */
let listCtrl = null, facetCtrl = null;

function buildParams(includeSubs = true) {
  const p = new URLSearchParams();

  if (state.q) p.set('q', state.q);
  if (state.category && state.category !== 'all') p.set('category', state.category);

  // Hanya kirim parameter meta dalam format meta[key]=value
  if (includeSubs) {
    for (const [k, v] of Object.entries(state.sub)) {
      if (v && v !== 'all') {
        p.set(`meta[${k}]`, v);
      }
    }
  }

  return p;
}


async function fetchFacets() {
  if (facetCtrl) facetCtrl.abort();
  facetCtrl = new AbortController();

  const r = await fetch('/api/services/facets?' + buildParams().toString(), {
    headers: { 'Accept': 'application/json' },
    signal: facetCtrl.signal,
  });

  if (!r.ok) {
    // auto-recovery untuk state rusak
    if (r.status === 422 || r.status >= 500) {
      localStorage.removeItem(LS_KEY);
      location.reload();
      return; // stop
    }
    throw new Error('Gagal memuat facets');
  }
  return r.json();
}

async function fetchList() {
  if (listCtrl) listCtrl.abort();
  listCtrl = new AbortController();

  const p = buildParams();
  p.set('page', String(state.page));
  p.set('per_page', String(state.perPage));

  const r = await fetch('/api/services?' + p.toString(), {
    headers: { 'Accept': 'application/json' },
    signal: listCtrl.signal,
  });

  if (!r.ok) {
    if (r.status === 422 || r.status >= 500) {
      localStorage.removeItem(LS_KEY);
      location.reload();
      return;
    }
    throw new Error('Gagal memuat data');
  }

  const json = await r.json();
  const total = json?.meta?.filtered_total ?? json?.meta?.total ?? json?.total ?? 0;
  state.total = Number.isFinite(total) ? total : 0;

  const per = Math.max(1, state.perPage || 12);
  state.lastPage = Math.max(1, Math.ceil(state.total / per));

  return json.data ?? [];
}



/* ==== UI builders ==== */
function buildPrimaryFilters(categories = []) {
  const catWrap = $('#catWrap');
  if (catWrap) {
    const cats = ['Semua', ...categories];
    // Hanya render select kategori
    catWrap.innerHTML = `
      <select id="catSelect" class="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-blue-500">
        ${cats.map(c => {
          const val = (c === 'Semua') ? 'all' : c;
          return `<option value="${esc(val)}"${state.category === val ? ' selected' : ''}>${esc(c)}</option>`;
        }).join('')}
      </select>
    `;
  }

  const perPageWrap = $('#perPageWrap');
  if (perPageWrap) {
    // Render select "Per Halaman"
    perPageWrap.innerHTML = `
      <label for="perPageSelect" class="text-xs text-slate-500">Per halaman:</label>
      <select id="perPageSelect" class="rounded-md border border-slate-300 px-2 py-1 text-sm">
        ${[6, 12, 18, 24].map(n => `<option value="${n}"${state.perPage === n ? ' selected' : ''}>${n}</option>`).join('')}
      </select>
    `;
  }
}

function buildSubFilters(facets) {
  const wrap = $('#subWrap'); if (!wrap) return;
  const groups = facets?.metadata_facets || {};

  // Kelompokkan filter secara logis (Anda bisa sesuaikan ini)
  const accordionGroups = {
    'Informasi Sertifikasi': ['nama-akreditasi', 'jenis-iso'],
    'Bidang Usaha (BU)': ['bidang', 'bu-besar-pj-teknik', 'bu-besar-pma-teknik', 'bu-kecil-tenaga-teknik', /* ... tambahkan key lain yang relevan */],
    // Tambahkan grup lain sesuai kebutuhan
  };

  const allKnownKeys = new Set(Object.values(accordionGroups).flat());
  const remainingKeys = Object.keys(groups).filter(k => !allKnownKeys.has(k));

  // Fungsi untuk membuat satu select/dropdown
  const makeSelect = (key) => {
    if (!groups[key] || groups[key].length === 0) return ''; // Jangan render jika tidak ada opsi
    const label = key.replace(/[-_]/g, ' ').replace(/\b\w/g, m => m.toUpperCase());
    const current = state.sub[key] ?? 'all';
    const pairs = groups[key] || [];
    const opts = [`<option value="all"${current === 'all' ? ' selected' : ''}>Semua</option>`]
      .concat(pairs.map(([v, c]) => `<option value="${esc(v)}"${current === v ? ' selected' : ''}>${esc(v)} (${c})</option>`))
      .join('');
    return `
      <div class="space-y-1">
        <label class="text-xs font-semibold text-slate-600" for="sel-${esc(key)}">${esc(label)}</label>
        <select id="sel-${esc(key)}" class="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-blue-500" data-sub="${esc(key)}">
          ${opts}
        </select>
      </div>
    `;
  };

  // Fungsi untuk membuat satu grup accordion
  const makeAccordionGroup = (title, keys) => {
    const content = keys.map(makeSelect).filter(Boolean).join('');
    if (!content) return ''; // Jangan render accordion jika isinya kosong

    // Cek apakah ada filter aktif di dalam grup ini
    const isActive = keys.some(k => state.sub[k] && state.sub[k] !== 'all');

    return `
      <details class="group" ${isActive ? 'open' : ''}>
        <summary class="flex cursor-pointer list-none items-center justify-between py-2 text-sm font-semibold text-slate-800 hover:text-blue-600">
          ${esc(title)}
          <svg class="h-4 w-4 transform transition-transform duration-200 group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </summary>
        <div class="space-y-3 pb-2">
          ${content}
        </div>
      </details>
    `;
  };

  let html = '';
  for(const [title, keys] of Object.entries(accordionGroups)) {
      html += makeAccordionGroup(title, keys);
  }
  if (remainingKeys.length > 0) {
      html += makeAccordionGroup('Lainnya', remainingKeys);
  }

  wrap.innerHTML = html || '<p class="text-sm text-slate-400">Filter tambahan tidak tersedia.</p>';
}

function renderResultInfo(countOnPage){
  const { page, perPage, total } = state;

  const first = total ? (page - 1) * perPage + 1 : 0;
  const last  = total ? Math.min(first + (countOnPage || 0) - 1, total) : 0;

  // badge/teks di area filter (atas)
  const top = $('#resultCount');
  if (top) top.textContent = total
    ? `Menampilkan ${countOnPage} dari ${total} hasil`
    : `Tidak ada hasil`;

  // summary di bawah list (bottom)
  const bottom = $('#clientSummary');
  if (bottom) bottom.textContent = total
    ? `Menampilkan ${first}–${last} dari ${total} hasil`
    : `Tidak ada hasil`;
}


function renderGrid(items){
  const grid = document.querySelector('#certificationGrid');
  if (!grid) return;

  if (!items.length) {
    grid.innerHTML = `
      <div class="col-span-full text-center text-slate-500">Tidak ada hasil. Ubah filter.</div>
    `;
    return;
  }

  const html = items.map(c => {
    const slug   = esc(c.slug ?? '');
    const title  = esc(c.title ?? '');
    const jenis  = esc((c.metadata?.['jenis-iso']) ?? 'ISO');
    const desc   = esc(c.short_description ?? (c.description ?? '').slice(0,140));
    const catTag = c.category ? `<div class="badge badge-outline badge-sm">#${esc(c.category)}</div>` : '';
    const akr    = (c.metadata && c.metadata['nama-akreditasi'])
      ? `<div class="badge badge-secondary badge-sm">${esc(c.metadata['nama-akreditasi'])}</div>`
      : '';

    return `
      <div class="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group">
        <div class="card-body">
          <div class="badge badge-primary badge-sm mb-2">${jenis}</div>

          <h3 class="card-title text-lg group-hover:text-primary transition-colors">
            <a href="/sertifikasi/${slug}">${title}</a>
          </h3>

          <p class="text-sm opacity-70 line-clamp-3 mb-4">${desc}</p>

          <div class="flex flex-wrap gap-2 mb-4">
            ${catTag}
            ${akr}
          </div>

          <div class="card-actions justify-end">
            <a href="/sertifikasi/${slug}" class="btn btn-primary btn-sm">
              <i class="fas fa-arrow-right mr-1"></i>
              Detail
            </a>
          </div>
        </div>
      </div>
    `;
  }).join('');

  grid.innerHTML = html;
}


function buildPageList(current, last) {
  const s = new Set([1, last, current - 1, current, current + 1]);
  const arr = [...s].filter(p => p >= 1 && p <= last).sort((a,b)=>a-b);
  const out = [];
  for (let i = 0; i < arr.length; i++) {
    out.push(arr[i]);
    if (i < arr.length - 1 && arr[i+1] - arr[i] > 1) out.push('…');
  }
  return out;
}

function renderPagination(){
  const el = document.querySelector('#pagination'); if(!el) return;

  // normalisasi
  const cur  = Math.max(1, Math.min(state.page || 1, state.lastPage || 1));
  const last = Math.max(1, state.lastPage || 1);

  if (last <= 1) { el.innerHTML = ''; return; }

  const prevDis = cur <= 1 ? 'btn-disabled pointer-events-none' : '';
  const nextDis = cur >= last ? 'btn-disabled pointer-events-none' : '';

  const parts = [];

  // prev
  parts.push(
    `<button type="button" class="join-item btn btn-sm ${prevDis}" aria-label="Halaman sebelumnya" data-page="${cur-1}">«</button>`
  );

  // numbers + ellipsis
  for (const p of buildPageList(cur, last)) {
    if (p === '…') {
      parts.push(`<button type="button" class="join-item btn btn-ghost btn-sm pointer-events-none">…</button>`);
    } else {
      const active = p === cur ? 'btn-active' : '';
      parts.push(
        `<button type="button" class="join-item btn btn-sm ${active}" data-page="${p}">${p}</button>`
      );
    }
  }

  // next
  parts.push(
    `<button type="button" class="join-item btn btn-sm ${nextDis}" aria-label="Halaman berikutnya" data-page="${cur+1}">»</button>`
  );

  el.innerHTML = parts.join('');
}



function normalizePerPageSelect() {
  const sel = document.getElementById('perPageSelect');
  if (!sel) return;

  const total = state.total;
  // Sembunyikan jika tidak perlu
  sel.closest('div')?.classList.toggle('hidden', total <= 1);

  const DEFAULTS = [6, 9, 12, 18, 24];

  // target perPage = min(perPage, total) tapi minimal 1
  let target = Math.max(1, Math.min(state.perPage || 12, total || 1));

  // kalau total > max default dan user pilih lebih besar, biarkan
  // kalau total < min default (6), izinkan opsi "total" biar terasa mengikuti hasil
  const mustInject = total > 0 && !DEFAULTS.includes(target);

  // rebuild options hanya jika perlu
  const build = (extra) => {
    const list = [...DEFAULTS];
    if (extra && !list.includes(extra)) list.unshift(extra); // taruh di depan biar terlihat
    sel.innerHTML = list.map(n => `<option value="${n}">${n}</option>`).join('');
  };

  build(mustInject ? target : null);

  // set value + update state bila berubah
  const prev = state.perPage;
  sel.value = String(target);
  if (prev !== target) state.perPage = target;
}


/* ==== Active filter chips ==== */
function renderActive(){
  const box = $('#activeFilters'); if (!box) return
  const chips = []
  if (state.q) chips.push(`<button class="px-2 py-1 rounded-full bg-slate-100 text-slate-700 text-xs" data-clear="q">Cari: ${esc(state.q)} ✕</button>`)
  if (state.category !== 'all') chips.push(`<button class="px-2 py-1 rounded-full bg-slate-100 text-slate-700 text-xs" data-clear="category">Kategori: ${esc(state.category)} ✕</button>`)
  for (const [k,v] of Object.entries(state.sub)) if (v && v !== 'all')
    chips.push(`<button class="px-2 py-1 rounded-full bg-slate-100 text-slate-700 text-xs" data-clear="sub:${esc(k)}">${esc(k)}: ${esc(v)} ✕</button>`)
  box.innerHTML = chips.length ? chips.join(' ') + ` <button id="clearAllFilters" class="px-2 py-1 rounded-md border text-xs border-slate-300 hover:border-slate-400">Bersihkan Semua</button>`
                              : `<span class="text-slate-400 text-sm">Tidak ada filter.</span>`
}

/* ==== Orkestrasi (parallel + cancel + seq guard) ==== */
let seq = 0;

async function refreshCombined({ withFacets = true } = {}) {
  const cur = ++seq;

  const grid = $('#certificationGrid');
  // **MODIFIKASI DIMULAI DI SINI**
  const pagination = $('#pagination');

  if (grid) grid.classList.add('filtering-loading');
  if (pagination) pagination.classList.add('filtering-loading');

  try {
    const tasks = [fetchList()];
    if (withFacets) tasks.push(fetchFacets());
    const [items, facets] = await Promise.all(tasks);

    if (cur !== seq) return;

    if (withFacets && facets) buildSubFilters(facets);
    renderGrid(items);
    renderPagination();
    // normalizePerPageSelect();
    renderResultInfo(items.length);
    renderActive();
    persist();
  } catch (e) {
    if (e.name === 'AbortError') return;
    console.error(e);
    if (grid) grid.innerHTML = `<div class="col-span-full text-center text-red-600">${esc(e.message||'Gagal memuat')}</div>`;
  } finally {
    if (cur === seq) {
        if (grid) grid.classList.remove('filtering-loading');
        if (pagination) pagination.classList.remove('filtering-loading');
    }
  }
}

/* ==== Events ==== */
const debouncedSearch = debounce((v) => {
  state.q = v.trim();
  state.page = 1;
  refreshCombined({ withFacets: true });
}, 150);

function attachEvents(facets){
  // Inisialisasi kategori+sub dari SSR/first load
  const cats = (window.__CATS__ || facets.categories || []);
  buildPrimaryFilters(cats);
  buildSubFilters(facets);

  const clearBtn = $('#clearAllFilters');
  if (clearBtn) {
    clearBtn.addEventListener('click', (e) => {
      e.preventDefault();

      state.q = '';
      state.category = 'all';
      state.sub = {};
      state.page = 1;

      const searchInput = $('#searchInput');
      if (searchInput) searchInput.value = '';

      const catSelect = $('#catSelect');
      if (catSelect) catSelect.value = 'all';

      localStorage.removeItem(LS_KEY);
      refreshCombined({ withFacets: true });
    });
  }

  $('#searchInput')?.addEventListener('input', (e)=>{
    debouncedSearch(e.target.value);
  });

  $('#catWrap')?.addEventListener('change', (e)=>{
    if (e.target.id === 'catSelect') {
      state.category = e.target.value || 'all';
      state.sub = {};
      state.page = 1;
      refreshCombined({ withFacets: true }); // domain berubah → facets ikut
      return;
    }
    if (e.target.id === 'perPageSelect') {
      const n = parseInt(e.target.value,10);
      if (!isNaN(n)) state.perPage = n;
      state.page = 1;
      refreshCombined({ withFacets: false }); // facets tidak perlu
      return;
    }
  });

  $('#subWrap')?.addEventListener('change', (e) => {
    const sel = e.target.closest('select[data-sub]');
    if (!sel) return;

    const key = sel.getAttribute('data-sub');
    const value = sel.value;

    // Logika yang lebih aman:
    // Hapus key dari state jika nilainya 'all'
    if (value && value !== 'all') {
        state.sub[key] = value;
    } else {
        delete state.sub[key];
    }

    state.page = 1; // Selalu kembali ke halaman 1
    refreshCombined({ withFacets: true }); // Refresh dengan facets baru
});

  $('#subWrap')?.addEventListener('click', (e)=>{
    const btn = e.target.closest('#toggleMoreFilters'); if (!btn) return
    const panel = document.getElementById('moreFilters');
    if (panel) panel.classList.toggle('hidden');
  });

  $('#activeFilters')?.addEventListener('click', (e) => {
    // Temukan tombol yang diklik (baik tombol 'x' atau 'Bersihkan Semua')
    const btn = e.target.closest('button[data-clear], #clearAllFilters');
    if (!btn) return; // Keluar jika yang diklik bukan tombol

    e.preventDefault(); // Mencegah aksi default tombol

    let stateTelahBerubah = false;

    // KASUS 1: Tombol "Bersihkan Semua" diklik
    if (btn.id === 'clearAllFilters') {
        // Lakukan reset total pada semua state filter
        state.q = '';
        state.category = 'all';
        state.sub = {}; // Kosongkan objek sub-filter
        state.page = 1;

        const searchInput = $('#searchInput');
        if (searchInput) searchInput.value = '';

        stateTelahBerubah = true;

    } else {
        // KASUS 2: Tombol 'x' pada filter individual yang diklik
        const key = btn.getAttribute('data-clear');
        if (!key) return;

        if (key === 'q') {
            if (state.q !== '') {
                state.q = '';
                const searchInput = $('#searchInput');
                if (searchInput) searchInput.value = '';
                stateTelahBerubah = true;
            }
        } else if (key === 'category') {
            // Saat kategori dihapus, semua sub-filter terkait juga harus bersih
            if (state.category !== 'all') {
                state.category = 'all';
                state.sub = {}; // Logika Anda di sini sudah benar
                stateTelahBerubah = true;
            }
        } else if (key.startsWith('sub:')) {
            const subKey = key.substring(4); // Ambil nama sub-filter, e.g., 'nama-akreditasi'

            // PERBAIKAN UTAMA: Gunakan 'delete' untuk menghapus properti dari state.
            // Ini memastikan state benar-benar bersih.
            if (state.sub.hasOwnProperty(subKey)) {
                delete state.sub[subKey];
                stateTelahBerubah = true;
            }
        }
    }

    // Lakukan aksi ini HANYA JIKA state benar-benar berubah
    if (stateTelahBerubah) {
        state.page = 1; // Selalu kembali ke halaman 1 saat filter berubah

        // PENTING: Simpan state yang sudah bersih ke localStorage SECARA EKSPLISIT
        persist();

        // Muat ulang data dan UI berdasarkan state yang baru
        refreshCombined({ withFacets: true });
    }
});

  document.addEventListener('click', (e) => {
  const btn = e.target.closest('#pagination .btn[data-page]');
  if (!btn) return;
  const to = Number(btn.dataset.page);
  if (!Number.isFinite(to)) return;
  state.page = Math.max(1, Math.min(to, state.lastPage || 1));
  refreshCombined({ withFacets: false });
  document.querySelector('#certificationGrid')?.scrollIntoView({behavior:'smooth', block:'start'});
});


  // Smooth scroll tombol CTA
  document.addEventListener('click', (e)=>{
    const btn = e.target.closest('[data-scroll]')
    if(!btn) return
    const sel = btn.getAttribute('data-scroll')
    const target = document.querySelector(sel)
    if (target) { e.preventDefault(); target.scrollIntoView({behavior:'smooth', block:'start'}) }
  });

  // Toggle mobile menu
  const mbtn = document.getElementById('mobile-menu-btn')
  const mnav = document.getElementById('mobile-menu')
  if (mbtn && mnav) {
    mbtn.addEventListener('click', ()=> mnav.classList.toggle('hidden'))
    mnav.addEventListener('click', (e)=>{
      if (e.target.closest('a')) mnav.classList.add('hidden')
    })
  }

    $('#perPageWrap')?.addEventListener('change', (e) => {
        if (e.target.id === 'perPageSelect') {
        const n = parseInt(e.target.value, 10);
        if (!isNaN(n)) state.perPage = n;
        state.page = 1;
        refreshCombined({ withFacets: false });
        }
    });
}

/* ==== Boot ==== */
document.addEventListener('DOMContentLoaded', async ()=>{
  try{
    hydrate();
    const initialFacets = await fetchFacets(); // pertama kali perlu facets
    attachEvents(initialFacets);
    refreshCombined({ withFacets: false }); // list pertama; facets sudah ada
  }catch(err){
    console.error(err)
    const grid = $('#certificationGrid');
    if(grid) grid.innerHTML = `<div class="col-span-full text-center text-red-600">${esc(err.message||'Gagal memuat')}</div>`
  }
})

