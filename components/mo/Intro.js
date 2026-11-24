'use client'
// Sinematik açılış jeneriği — kinetik el yazısı tipografisi -> hero. Tek saat: Web Animations API.
//  0,0–~3,3 sn  düz kömür (#141714) zeminde ifadeler ekranın farklı bölgelerinde, ÜST ÜSTE BİNEN ömürlerle ve düzensiz aralıklarla
//               (60–130 ms'de bir yenisi) belirip kaybolur: aynı anda birden fazlası görünür ama aynı anda gelip gitmez.
//               Ekran birbirinden ayrık slotlara bölünür; bir slot doluyken başka ifade aynı slota girmez -> metinler birbirine binmez.
//  sonra        kömür zemin yumuşakça erir ve arkadan yakın/buğulu hero açılır (ortada imza/portre YOK);
//               hero ~14 sn boyunca çok yumuşak geri çekilir (belli belirsiz sallanır; görsel net olduktan sonra ~2 sn daha geriye gider),
//               çerçeve ve köşeler oluşur; header ve hero'daki "Mustafa Öner" imzası (çizgisiyle) belirir
// İfadeler yalnızca bu açılışın içeriğidir (modül/sayfa değildir). Her tam yüklemede (yenileme dahil) oynar; sayfa içi geçişte tekrarlanmaz
// ("play" kararı app/layout.js BOOT betiğinde). Tıklayınca atlanır. Reduced-motion'da hiç oynamaz.
import { useEffect } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'

// İngilizce sayfa (/en) için karşılıklar. Özel adlar (Mavi Kadraj, Yoldaşın Mücadelesi, MK Digital Systems) aynen kalır.
const EN = {
  'Doğa Fotoğrafçılığı': 'Nature Photography',
  'Telekomünikasyon': 'Telecommunications',
  'Emek': 'Labour',
  'Objektif': 'Lens',
  'Yazılım': 'Software',
  'Türküler': 'Folk Songs',
  'Hayata Dair': 'On Life',
  'Dijital Sistemler': 'Digital Systems',
  'Şiir': 'Poetry',
  'Gezi ve Keşif': 'Travel & Discovery',
  'Web Tasarım': 'Web Design',
  'Kendi Halinde Biri': 'A Quiet Soul',
  'Doğa': 'Nature',
  'Fiber Optik Altyapı': 'Fiber Optic Infrastructure',
  'Edebiyat': 'Literature',
  'Özgürlük': 'Freedom',
  'Teknoloji': 'Technology',
}
const wait = (ms) => new Promise((r) => setTimeout(r, ms))
const rand = (a, b) => a + Math.random() * (b - a)

// [metin, masaüstü px (20–85 aralığı), el yazısı fontu (1 ince/imza, 2 fırça, 3 kalem), opaklık, eğim °, giriş, çıkış, şekil]
// giriş: blur (bulanıktan netliğe) | mask (yumuşak soldan açılma) | scale (hafif ölçek)
// çıkış: fade | blur | rise · şekil: a (hızlı gir, yavaş çık) | b (yavaş gir, hızlı çık) | c (dengeli)
const WORDS = [
  ['Doğa Fotoğrafçılığı', 78, 1, 1, -3, 'blur', 'fade', 'a'],
  ['Telekomünikasyon', 40, 3, 0.72, 2, 'mask', 'blur', 'c'],
  ['Emek', 72, 2, 0.95, -4, 'scale', 'rise', 'b'],
  ['Objektif', 28, 3, 0.55, 0, 'blur', 'fade', 'c'],
  ['Yazılım', 56, 2, 0.9, 3, 'mask', 'fade', 'b'],
  ['Mavi Kadraj', 85, 1, 1, -2, 'blur', 'blur', 'a'],
  ['Türküler', 50, 3, 0.8, 4, 'scale', 'fade', 'c'],
  ['Hayata Dair', 26, 1, 0.5, 0, 'mask', 'rise', 'c'],
  ['Dijital Sistemler', 62, 3, 0.85, -2, 'scale', 'fade', 'a'],
  ['Şiir', 66, 1, 1, 3, 'blur', 'rise', 'b'],
  ['Yoldaşın Mücadelesi', 70, 2, 0.95, -3, 'mask', 'blur', 'c'],
  ['Gezi ve Keşif', 58, 3, 0.78, 2, 'blur', 'fade', 'a'],
  ['Web Tasarım', 44, 3, 0.7, 3, 'mask', 'fade', 'c'],
  ['Kendi Halinde Biri', 48, 1, 0.9, -3, 'blur', 'rise', 'b'],
  ['Doğa', 80, 2, 1, 2, 'scale', 'blur', 'a'],
  ['MK Digital Systems', 34, 3, 0.6, 0, 'mask', 'fade', 'c'],
  ['Fiber Optik Altyapı', 52, 3, 0.82, -2, 'blur', 'fade', 'b'],
  ['Edebiyat', 38, 1, 0.65, 4, 'scale', 'rise', 'c'],
  ['Özgürlük', 60, 2, 0.95, -4, 'mask', 'blur', 'a'],
  ['Teknoloji', 46, 3, 0.75, 2, 'blur', 'fade', 'c'],
]
// Yoğunluk için 6 ifade, farklı yazı stili ve efektle ikinci kez gösterilir (asla aynı anda iki yerde olmaz)
const ENTERS = ['blur', 'mask', 'scale']
const EXITS = ['fade', 'blur', 'rise']
const REPEAT_TEXTS = ['Mavi Kadraj', 'Kendi Halinde Biri', 'Şiir', 'Fiber Optik Altyapı', 'Doğa Fotoğrafçılığı', 'Edebiyat']
const REPEATS = REPEAT_TEXTS.map((t) => {
  const [text, sz, f, al, rot, en, ex, sh] = WORDS.find((w) => w[0] === t)
  return [text, Math.round(sz * 0.9), (f % 3) + 1, Math.min(1, al * 0.92), rot ? -rot : 2, ENTERS[(ENTERS.indexOf(en) + 1) % 3], EXITS[(EXITS.indexOf(ex) + 1) % 3], 'abc'[('abc'.indexOf(sh) + 1) % 3]]
})
const ALL = [...WORDS.map((w) => [...w, 0]), ...REPEATS.map((w) => [...w, 1])]

const FONT_K = { 1: 1.25, 2: 1.15, 3: 1.2 } // el yazısı fontlarının küçük x-yüksekliği için optik düzeltme
const SHAPES = { a: [0, 0.2, 0.42, 1], b: [0, 0.5, 0.74, 1], c: [0, 0.3, 0.62, 1] }
const GAP_MIN = 60 // ms: iki ifade arası en kısa gecikme (düzensiz)
const GAP_MAX = 130
const LIFE_MIN = 560 // ms: bir ifadenin ekranda kaldığı süre (aralıktan uzun -> aynı anda birden fazlası görünür)
const LIFE_MAX = 800

// Birbirinden ayrık slotlar (viewport oranları): masaüstü 2 sütun x 4 satır, mobil 6 satır
function getSlots(W) {
  if (W >= 900) {
    const cols = [[0.04, 0.48], [0.52, 0.96]]
    const rows = [[0.05, 0.24], [0.29, 0.48], [0.52, 0.71], [0.76, 0.95]]
    return rows.flatMap(([y0, y1]) => cols.map(([x0, x1]) => [x0, y0, x1, y1]))
  }
  return [[0.05, 0.17], [0.19, 0.31], [0.33, 0.45], [0.49, 0.61], [0.65, 0.77], [0.8, 0.92]].map(([y0, y1]) => [0.04, y0, 0.96, y1])
}

// Düzensiz, üst üste binen zamanlama: her ifade serbest bir slota girer; slot doluyken kullanılmaz.
function scheduleWords(els, W) {
  const slots = getSlots(W)
  const busy = slots.map(() => 0)
  const recent = []
  const ends = {}
  const shuffle = (a) => a.map((v) => [Math.random(), v]).sort((x, y) => x[0] - y[0]).map((p) => p[1])
  const order = [...shuffle(els.filter((e) => e.dataset.extra === '0')), ...shuffle(els.filter((e) => e.dataset.extra === '1'))]
  let t = 0
  let maxEnd = 0
  order.forEach((el) => {
    t += rand(GAP_MIN, GAP_MAX)
    if (el.dataset.extra === '1') t = Math.max(t, (ends[el.textContent] || 0) + 150) // aynı ifade aynı anda iki yerde olmasın
    const life = rand(LIFE_MIN, LIFE_MAX)
    let free = slots.map((_, i) => i).filter((i) => busy[i] <= t)
    if (!free.length) { t = Math.min(...busy); free = slots.map((_, i) => i).filter((i) => busy[i] <= t) }
    const spread = free.filter((i) => !recent.includes(i)) // son kullanılan slotlardan kaçın: ekranda dağınık görünsün
    const pool = spread.length ? spread : free
    const slot = pool[Math.floor(Math.random() * pool.length)]
    busy[slot] = t + life + 40
    recent.push(slot)
    if (recent.length > 3) recent.shift()
    ends[el.textContent] = t + life
    el._slot = slot
    el._delay = t
    el._life = life
    maxEnd = Math.max(maxEnd, t + life)
  })
  return maxEnd
}

function layoutWords(wordEls, W, H) {
  const wide = W >= 900
  const s = wide ? Math.min(1, W / 1440) : W / 900
  const slots = getSlots(W)
  wordEls.forEach((el) => {
    const [x0, y0, x1, y1] = slots[el._slot]
    const lw = (x1 - x0) * W
    const lh = (y1 - y0) * H
    let fs = +el.dataset.size * FONT_K[+el.dataset.font] * s
    el.style.fontSize = fs + 'px'
    el.style.left = '0px'
    el.style.top = '0px'
    let r = el.getBoundingClientRect()
    const fit = Math.min(1, (lw * 0.94) / r.width, (lh * 0.94) / r.height) // ekran dışına/slot dışına taşmasın
    if (fit < 1) { fs *= fit; el.style.fontSize = fs + 'px'; r = el.getBoundingClientRect() }
    el.style.left = Math.round(x0 * W + Math.random() * Math.max(0, lw - r.width)) + 'px'
    el.style.top = Math.round(y0 * H + Math.random() * Math.max(0, lh - r.height)) + 'px'
  })
}

function wordKeyframes(el, low) {
  const enter = el.dataset.enter
  const exit = el.dataset.exit
  const a = +el.dataset.alpha
  const rot = +el.dataset.rot
  const [o0, o1, o2, o3] = SHAPES[el.dataset.shape]
  const T = (sc, dy) => `rotate(${rot}deg) scale(${sc}) translateY(${dy}px)`
  const start = { offset: o0, opacity: 0, clipPath: enter === 'mask' ? 'inset(-12% 100% -12% -4%)' : 'inset(-12% -4% -12% -4%)', transform: T(enter === 'scale' ? 0.9 : enter === 'blur' ? 1.03 : 1, 0) }
  const shown = { offset: o1, opacity: a, clipPath: 'inset(-12% -4% -12% -4%)', transform: T(1, 0) }
  const hold = { offset: o2, opacity: a, clipPath: 'inset(-12% -4% -12% -4%)', transform: T(1, 0) }
  const end = { offset: o3, opacity: 0, clipPath: 'inset(-12% -4% -12% -4%)', transform: T(exit === 'rise' ? 1 : 1.01, exit === 'rise' ? -12 : 0) }
  if (!low) {
    start.filter = enter === 'blur' ? 'blur(9px)' : 'blur(0px)'
    shown.filter = 'blur(0px)'
    hold.filter = 'blur(0px)'
    end.filter = exit === 'blur' ? 'blur(8px)' : 'blur(0px)'
  }
  return [start, shown, hold, end]
}

export default function Intro() {
  const { language } = useLanguage()
  const label = (text) => (language === 'en' ? EN[text] || text : text)
  useEffect(() => {
    const root = document.documentElement
    const go = () => { root.dataset.hero = 'go' } // header animasyonu (CSS)

    if (root.dataset.intro !== 'play') { go(); return }

    const overlay = document.querySelector('.mo-intro')
    const surface = document.querySelector('.mo-surface')
    const wordEls = Array.from(document.querySelectorAll('.mo-intro .mo-word'))
    const frame = document.querySelector('.mo-hero-frame')
    const img = document.querySelector('.mo-hero-img')
    if (!overlay || !surface || !frame || !img || !wordEls.length) { root.dataset.intro = 'done'; go(); return } // hero olmayan sayfa

    const low = root.classList.contains('mo-low')
    const cs = getComputedStyle(root)
    const pad = parseFloat(cs.getPropertyValue('--frame-pad')) || 8
    const rad = parseFloat(cs.getPropertyValue('--frame-r')) || 24
    const anims = []
    const A = (el, keyframes, opts) => { const an = el.animate(keyframes, { fill: 'forwards', easing: 'linear', ...opts }); anims.push(an); return an }
    let finished = false
    const timers = []

    const finish = () => {
      if (finished) return
      finished = true
      timers.forEach(clearTimeout)
      root.dataset.sig = 'in'
      root.dataset.intro = 'done' // katman kalkar, kaydırma açılır; taban stiller animasyon bitişiyle aynıdır
      go()
      anims.forEach((an) => { try { an.cancel() } catch (e) { /* yoksay */ } })
    }
    timers.push(setTimeout(finish, 28000)) // güvenlik ağı
    overlay.addEventListener('pointerdown', finish, { once: true }) // isteyen atlayabilir

    const imgReady = new Promise((resolve) => {
      if (img.complete && img.naturalWidth) { resolve(); return }
      img.addEventListener('load', resolve, { once: true })
      img.addEventListener('error', resolve, { once: true })
      timers.push(setTimeout(resolve, 5000))
    })
    // Bütün el yazısı fontları (Türkçe karakterler dahil) önceden yüklenir
    const families = [...new Set([...wordEls.map((el) => getComputedStyle(el).fontFamily)])]
    const fontsReady = (document.fonts && document.fonts.load)
      ? Promise.race([Promise.all(families.map((f) => document.fonts.load(`40px ${f}`, 'Doğa Fotoğrafçılığı Şiir Türküler Keşif Özgürlük Mücadelesi Telekomünikasyon Öner ığüşçöİ'))), wait(1800)])
      : Promise.resolve()

    ;(async () => {
      await Promise.all([fontsReady, imgReady])
      if (finished) return
      const W = window.innerWidth
      const H = window.innerHeight
      const maxEnd = scheduleWords(wordEls, W)
      layoutWords(wordEls, W, H)
      const t0 = performance.now()

      // Kinetik el yazısı ifadeleri: düzensiz aralıklarla, üst üste binen ömürlerle
      wordEls.forEach((el) => {
        A(el, wordKeyframes(el, low), { delay: el._delay, duration: el._life, easing: 'linear' })
      })

      await wait(Math.max(0, maxEnd + 100 - (performance.now() - t0))) // bütün ifadeler kaybolunca doğrudan hero
      if (finished) return
      try { if (img.decode) await Promise.race([img.decode(), wait(600)]) } catch (e) { /* yoksay */ }

      // Kömür zemin yumuşakça erir; arkadan yakın/buğulu hero görünür
      A(surface, [{ opacity: 1 }, { opacity: 0 }], { delay: 100, duration: 1400, easing: 'cubic-bezier(.4,0,.6,1)' })
      // Zemin eridikten sonra katman kalkar; kaydırma/tıklama açılır, hero hareketi sürer
      timers.push(setTimeout(() => { root.dataset.intro = 'run' }, 1600))

      // Kamera çok yumuşakça ve uzun süre geri çekilir (~14 sn): scale 1,30 -> 1; belli belirsiz sallanma; buğu dağılır.
      // Görsel tam netleşip çerçeveye oturduktan sonra (scale 1,04, blur 0) yaklaşık 2 sn daha geriye gitmeye devam eder.
      const sway = (scale, rot, x, y, blur, offset) => ({
        offset,
        transform: `scale(${scale}) rotate(${rot}deg) translate3d(${x}%,${y}%,0)`,
        ...(low ? {} : { filter: `blur(${blur}px)` }),
      })
      A(img, [
        sway(1.3, 0.5, 0.5, 0.3, 1.5, 0),
        sway(1.19, -0.35, -0.4, 0.15, 1, 0.26),
        sway(1.1, 0.22, 0.2, 0, 0.4, 0.5),
        sway(1.06, -0.1, -0.08, 0, 0, 0.62),
        sway(1.04, 0.05, 0.04, 0, 0, 0.857), // tam net: son 2 sn'lik kuyruğun başlangıcı
        sway(1, 0, 0, 0, 0, 1),
      ], { delay: 100, duration: 14000, easing: 'cubic-bezier(.37,0,.63,1)' })
      // Çerçeve, dış boşluk ve yuvarlak köşeler görselle birlikte, çok yavaş oluşur
      A(frame, [{ clipPath: 'inset(0px round 0px)' }, { clipPath: `inset(${pad}px round ${rad}px)` }],
        { delay: 1500, duration: 9500, easing: 'cubic-bezier(.45,0,.3,1)' })
      // Header ve hero imzası (CSS girişleri): hero geri çekilirken belirir
      timers.push(setTimeout(go, 900))
      timers.push(setTimeout(finish, 14400))
    })()

    return () => { timers.forEach(clearTimeout) }
  }, [])

  return (
    <div className="mo-intro" aria-hidden="true">
      <div className="mo-surface" />
      <div className="mo-words">
        {ALL.map(([text, size, font, alpha, rot, enter, exit, shape, extra], i) => (
          <span
            key={`${text}-${i}`}
            className={`mo-word f${font}`}
            data-extra={extra}
            data-size={size}
            data-font={font}
            data-alpha={alpha}
            data-rot={rot}
            data-enter={enter}
            data-exit={exit}
            data-shape={shape}
          >{label(text)}</span>
        ))}
      </div>
    </div>
  )
}
