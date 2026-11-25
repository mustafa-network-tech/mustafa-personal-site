"""
Ana sayfa "Mustafa'nın Kadrajından" ahşap çerçevesinin dokularını üretir.
Çıktı: public/images/frame/{walnut-h,walnut-v}.jpg, corner-{tl,tr,bl,br}.webp, {edge-h,edge-v}.png

Yöntem: motifler önce bir YÜKSEKLİK HARİTASI olarak (akantus yaprakları, oluklar, kabartmalar) üretilir;
ardından gerçek ışık hesabıyla (sol üstten gelen ışık) gölge / vurgu / oyuk karartması çıkarılır.
Çıktı, ahşabın üstüne binen yarı saydam bir ışık-gölge katmanıdır: damarlar motifin içinden geçmeye devam eder,
yani motif yapıştırılmış değil ahşabın içine oyulmuş görünür. Altın varak yalnızca en yüksek sırt noktalarında,
gürültü maskesiyle dağınık izler halinde uygulanır.

Çalıştırma:  python scripts/generate-frame-carving.py   (numpy ve Pillow gerekir)
Birim: 1 birim = çerçeve payı genişliği 44 px olduğunda 1 px. S = çıktı çözünürlük çarpanı.
"""
import math
import os
import numpy as np
from PIL import Image, ImageDraw

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, '..', 'public', 'images', 'frame')
os.makedirs(OUT, exist_ok=True)

S = 3            # çözünürlük çarpanı
T = 75           # üst/alt pay kalınlığı (birim)
F = 44           # yan pay kalınlığı (birim)
CW, CH = 300, 285  # köşe parçası boyutu (birim)

rng = np.random.default_rng(7)


# ---------------------------------------------------------------- yardımcılar
def fblur(a, sigma):
    """FFT ile Gauss bulanıklığı (kenarlar yansıtılır)."""
    if sigma <= 0:
        return a
    pad = int(sigma * 3) + 2
    p = np.pad(a, pad, mode='edge')
    h, w = p.shape
    fy = np.fft.fftfreq(h)[:, None]
    fx = np.fft.rfftfreq(w)[None, :]
    g = np.exp(-2 * (np.pi ** 2) * (sigma ** 2) * (fx ** 2 + fy ** 2))
    r = np.fft.irfft2(np.fft.rfft2(p) * g, s=p.shape)
    return r[pad:-pad, pad:-pad]


def smooth(x, a, b):
    t = np.clip((x - a) / (b - a), 0, 1)
    return t * t * (3 - 2 * t)


def pnoise(w, h, fx, fy, seed):
    """x ve y yönünde periyodik değer gürültüsü."""
    r = np.random.default_rng(seed)
    g = r.random((fy, fx))
    xs = np.arange(w) * fx / w
    ys = np.arange(h) * fy / h
    x0 = np.floor(xs).astype(int)
    y0 = np.floor(ys).astype(int)
    tx = xs - x0
    ty = ys - y0
    sx = (tx * tx * (3 - 2 * tx))[None, :]
    sy = (ty * ty * (3 - 2 * ty))[:, None]
    x1 = (x0 + 1) % fx
    y1 = (y0 + 1) % fy
    x0 %= fx
    y0 %= fy
    a = g[y0[:, None], x0[None, :]]
    b = g[y0[:, None], x1[None, :]]
    c = g[y1[:, None], x0[None, :]]
    d = g[y1[:, None], x1[None, :]]
    return (a * (1 - sx) + b * sx) * (1 - sy) + (c * (1 - sx) + d * sx) * sy


# ---------------------------------------------------------------- ceviz dokusu
def walnut(w=1024, h=256, seed=3):
    """Yatay damarlı koyu ceviz: halka figürü, ince damar çizgileri, gözenekler."""
    warp = pnoise(w, h, 3, 3, seed) * 1.6 + pnoise(w, h, 8, 6, seed + 1) * .5
    yy = (np.arange(h)[:, None] / h) * np.ones((1, w))
    ring = np.sin(2 * np.pi * (yy * 5.5 + warp))
    ring = ring * .5 + .5
    ring = smooth(ring, .2, .9)
    streak = pnoise(w, h, 5, 90, seed + 2) * .6 + pnoise(w, h, 12, 160, seed + 3) * .4
    fine = pnoise(w, h, 24, 260, seed + 4)
    pores = (pnoise(w, h, 96, 220, seed + 5) > .80).astype(float)
    pores = fblur(pores, .8) * .55
    v = .40 + .24 * ring + .22 * (streak - .5) + .10 * (fine - .5)
    v = np.clip(v - pores, 0, 1)
    v = (v - v.min()) / (v.max() - v.min())
    c0 = np.array([80, 48, 24], float)   # açık antik ceviz gölge tonu
    c1 = np.array([190, 136, 74], float)  # sıcak bal meşesi ışık tonu
    img = c0[None, None, :] * (1 - v[..., None]) + c1[None, None, :] * v[..., None]
    img *= np.array([1.0, 1.0, .97])
    return np.clip(img, 0, 255).astype(np.uint8)


# ---------------------------------------------------------------- oyma yükseklik haritası
class Relief:
    def __init__(self, w, h):
        self.w, self.h = w * S, h * S
        self.H = np.zeros((self.h, self.w), float)
        self.order = 0

    def _mask(self, poly):
        im = Image.new('L', (self.w, self.h), 0)
        ImageDraw.Draw(im).polygon([(x * S, y * S) for x, y in poly], fill=255)
        return fblur(np.asarray(im, float) / 255, .9)

    def stamp(self, poly, rise=.55, dome=.35, groove=None, base=.3):
        """Poligonu ground üstüne yükselt: kubbe profili + isteğe bağlı orta oluk."""
        m = self._mask(poly)
        if m.max() < .01:
            return
        ys, xs = np.nonzero(m > .5)
        if len(xs) == 0:
            return
        size = max(xs.max() - xs.min(), ys.max() - ys.min()) + 1
        d = fblur(m, size * dome * .18)
        d = d / max(d.max(), 1e-6)
        self.order += 1
        hl = base + rise * d + .004 * self.order
        if groove is not None:
            g = Image.new('L', (self.w, self.h), 0)
            ImageDraw.Draw(g).line([(x * S, y * S) for x, y in groove], fill=255, width=max(2, int(1.3 * S)))
            g = fblur(np.asarray(g, float) / 255, 1.1 * S * .5)
            hl = hl - .22 * g / max(g.max(), 1e-6)
        k = smooth(m, .35, .75)
        self.H = self.H * (1 - k) + hl * k

    def line(self, pts, depth=.3, width=1.4, soft=.8):
        """Oyuk çizgi (V oluk)."""
        g = Image.new('L', (self.w, self.h), 0)
        ImageDraw.Draw(g).line([(x * S, y * S) for x, y in pts], fill=255, width=max(2, int(width * S)))
        g = fblur(np.asarray(g, float) / 255, soft * S * .6)
        g = g / max(g.max(), 1e-6)
        self.H = self.H - depth * g * (self.H > 0) - depth * .6 * g * (self.H <= 0) * 0


def lobe(rel, base, ang, length, width, curl=0.0, serr=.16, tipseg=3):
    """Akantus lobu: kıvrılan, ucu dişli, damarlı yaprak parçası."""
    n = 28
    pts, centre = [], []
    x, y = base
    a = ang
    for i in range(n + 1):
        t = i / n
        a_i = ang + curl * t * t
        centre.append((base[0] + sum(math.cos(ang + curl * (j / n) ** 2) for j in range(i)) * length / n,
                       base[1] + sum(math.sin(ang + curl * (j / n) ** 2) for j in range(i)) * length / n))
    left, right = [], []
    for i, (cx, cy) in enumerate(centre):
        t = i / n
        ai = ang + curl * t * t
        wprof = width * math.sin(math.pi * min(1, t ** .75)) * (1 - .15 * t)
        if t > .55:  # dişli uç
            wprof *= 1 + serr * math.sin((t - .55) * tipseg * 2 * math.pi * 2.2)
        nx, ny = -math.sin(ai), math.cos(ai)
        left.append((cx + nx * wprof, cy + ny * wprof))
        right.append((cx - nx * wprof, cy - ny * wprof))
    poly = left + right[::-1]
    rel.stamp(poly, rise=.5, dome=.5, groove=centre[2:-3], base=.3)
    return centre[-1]


def acanthus(rel, base, ang, size, flip=1, lobes=5):
    """Orta damarlı, iki yana derin dişli lobları açılan, uçları kıvrılan akantus yaprağı."""
    mid_len = 70 * size
    for i in range(lobes):
        t = .06 + .70 * i / max(1, lobes - 1)
        px = base[0] + math.cos(ang) * mid_len * t
        py = base[1] + math.sin(ang) * mid_len * t
        spread = math.radians(58 - 9 * i)
        L = (38 - 4.2 * i) * size
        W = (8.6 - .9 * i) * size
        for side in (-1, 1):
            lobe(rel, (px, py), ang + side * spread, L, W, curl=side * flip * .95, serr=.34, tipseg=3.4)
    tipx = base[0] + math.cos(ang) * mid_len * .72
    tipy = base[1] + math.sin(ang) * mid_len * .72
    lobe(rel, (tipx, tipy), ang, 34 * size, 8.2 * size, curl=.6 * flip, serr=.34, tipseg=3.4)


def stem(rel, pts, width=2.6):
    """Yaprakları bağlayan kabartma sap."""
    n = len(pts)
    left, right = [], []
    for i, (x, y) in enumerate(pts):
        x2, y2 = pts[min(i + 1, n - 1)]
        x1, y1 = pts[max(i - 1, 0)]
        a = math.atan2(y2 - y1, x2 - x1)
        left.append((x - math.sin(a) * width, y + math.cos(a) * width))
        right.append((x + math.sin(a) * width, y - math.cos(a) * width))
    rel.stamp(left + right[::-1], rise=.3, dome=.6, base=.3)


def volute(rel, c, r0, turns=1.6, sign=1, start=0.0, width=2.4):
    """Sarmal (volüt) kıvrım: uçta akantus çubuğu."""
    pts = []
    steps = 60
    for i in range(steps + 1):
        t = i / steps
        r = r0 * (1 - .82 * t)
        a = start + sign * turns * 2 * math.pi * t
        pts.append((c[0] + r * math.cos(a), c[1] + r * math.sin(a)))
    stem(rel, pts, width)


def boss(rel, c, r=11):
    """Köşe bossu: çok yapraklı kabartma rozet (yumuşak)."""
    n = 10
    for i in range(n):
        a = 2 * math.pi * i / n
        poly = []
        for k in range(14):
            tt = k / 13 * math.pi
            rr = r * (.35 + .65 * math.sin(tt))
            aa = a + (k - 6.5) / 6.5 * math.pi / n * 1.05
            poly.append((c[0] + rr * math.cos(aa), c[1] + rr * math.sin(aa)))
        poly = [c] + poly
        rel.stamp(poly, rise=.3, dome=.4, base=.34)
    # merkez kubbe
    ang = np.linspace(0, 2 * math.pi, 40)
    rel.stamp([(c[0] + 4.6 * math.cos(a), c[1] + 4.6 * math.sin(a)) for a in ang], rise=.55, dome=.5, base=.5)


def grooves_h(rel, length, y1, y2, x0=0):
    rel.line([(x0, y1), (x0 + length, y1)], depth=.34, width=1.5)
    rel.line([(x0, y2), (x0 + length, y2)], depth=.34, width=1.5)


# ---------------------------------------------------------------- ışık-gölge ve altın
def light_to_rgba(Hm, seed=11, gold=True, gold_amount=.8):
    H = Hm
    gy, gx = np.gradient(H)
    K = 5.0 * S
    nx, ny, nz = -gx * K, -gy * K, np.ones_like(H)
    ln = np.sqrt(nx * nx + ny * ny + nz * nz)
    nx, ny, nz = nx / ln, ny / ln, nz / ln
    L = np.array([-.58, -.66, .48])
    L /= np.linalg.norm(L)
    diff = nx * L[0] + ny * L[1] + nz * L[2]
    flat = L[2]
    shade = diff - flat

    ao = np.clip(fblur(H, 4 * S) - H, 0, 1) * 2.4 + np.clip(fblur(H, 1.4 * S) - H, 0, 1) * 2.0
    ground = 1 - smooth(H, .04, .26)
    stip = fblur(rng.random(H.shape), .7) > .52
    dark = np.clip(-shade * 1.55, 0, .7) + ao * .42 + ground * (.08 + .10 * stip)
    dark = np.clip(dark, 0, .66)
    light = np.clip(shade * 1.3, 0, .46) + smooth(H, .35, .9) * .05

    h, w = H.shape
    # altın varak izleri: yalnızca yüksek sırtlar + dağınık gürültü
    ridge = np.clip(H - fblur(H, 2.6 * S), 0, 1)
    ridge = smooth(ridge, .012, .05)
    n1 = np.zeros_like(H)
    for fq, wt in ((26, .5), (70, .3), (160, .2)):
        n1 += wt * np.asarray(Image.fromarray((pnoise(256, 256, 30, 30, int(seed + fq)) * 255).astype(np.uint8)).resize((w, h), Image.BICUBIC), float) / 255
    n_fine = fblur(rng.random(H.shape), .9)
    patch = smooth(n1, .62, .74) * smooth(n_fine, .48, .57) if gold else np.zeros_like(H)
    goldA = np.clip(ridge * patch * smooth(H, .45, .75) * gold_amount, 0, .85)
    gcol = np.array([205, 163, 72], float)
    gl = (.72 + .55 * np.clip(shade * 2.0 + .35, 0, 1))[..., None]

    rgb = np.zeros((h, w, 3), float)
    a = np.zeros((h, w), float)
    # 1) koyu
    dcol = np.array([58, 32, 12], float)  # siyah yerine sıcak koyu kahve gölge
    rgb = rgb * (1 - dark[..., None]) + dcol[None, None, :] * dark[..., None]
    a = dark + a * (1 - dark)
    # 2) açık (sıcak)
    lc = np.array([255, 226, 176], float)
    out_a = light + a * (1 - light)
    rgb = (lc[None, None, :] * light[..., None] + rgb * a[..., None] * (1 - light[..., None])) / np.maximum(out_a[..., None], 1e-6)
    a = out_a
    # 3) altın
    out_a = goldA + a * (1 - goldA)
    rgb = (gcol[None, None, :] * gl * goldA[..., None] + rgb * a[..., None] * (1 - goldA[..., None])) / np.maximum(out_a[..., None], 1e-6)
    a = out_a
    rgba = np.dstack([np.clip(rgb, 0, 255), np.clip(a, 0, 1) * 255]).astype(np.uint8)
    return Image.fromarray(rgba, 'RGBA')


# ---------------------------------------------------------------- köşe parçası
def build_corner():
    rel = Relief(CW, CH)
    cy_top = T / 2          # üst pay merkez çizgisi
    cx_side = F / 2         # yan pay merkez çizgisi

    # ince oluklar (pay boyunca; kenar parçasıyla süreklilik)
    grooves_h(rel, CW, 6, T - 6)
    rel.line([(6, 0), (6, CH)], depth=.34, width=1.5)
    rel.line([(F - 6, T - 6), (F - 6, CH)], depth=.34, width=1.5)

    # üst pay: köşeden sağa akan akantus dizisi; yapraklar birbirine yaklaşır, boyut küçülür
    xs = [(26, 1.0), (96, .86), (156, .7), (208, .56), (252, .42)]
    stem(rel, [(24 + i * 6, cy_top + 3 * math.sin(i * .5)) for i in range(40)], 2.2)
    for i, (x, sc) in enumerate(xs):
        acanthus(rel, (x, cy_top), 0.0, sc, flip=1 if i % 2 == 0 else -1, lobes=5)
    volute(rel, (284, cy_top + 2), 9, turns=1.5, sign=1)
    # yan pay: köşeden aşağı akan dizi
    ys = [(70, .62), (126, .54), (174, .45), (214, .36), (246, .28)]
    stem(rel, [(cx_side + 2 * math.sin(i * .5), 66 + i * 5.0) for i in range(40)], 1.8)
    for i, (y, sc) in enumerate(ys):
        acanthus(rel, (cx_side, y), math.pi / 2, sc, flip=1 if i % 2 == 0 else -1, lobes=4)
    volute(rel, (cx_side + 1, 275), 6, turns=1.5, sign=-1, start=math.pi / 2, width=1.6)

    boss(rel, (cx_side, cy_top), r=12)
    # ince sap (orta çizgi boyunca kabartma kıvrım)
    return rel


def build_edge_h():
    """Yatay kenar parçası: iki ince oluk + küçük dişli (dentil) sırası. 4 dişli, tekrarlanabilir."""
    w, tile = 52, 52
    rel = Relief(tile, T)
    rel.H[:] = 0
    # oluklar
    rel.line([(-4, 6), (tile + 4, 6)], depth=.34, width=1.5)
    rel.line([(-4, T - 6), (tile + 4, T - 6)], depth=.34, width=1.5)
    # dişliler (küçük dikdörtgen kabartmalar) - iç oluğun hemen altında
    for k in range(4):
        x0 = k * 13 + 3
        for (ya, yb) in ((11, 17), (T - 17, T - 11)):
            rel.stamp([(x0, ya), (x0 + 7, ya), (x0 + 7, yb), (x0, yb)], rise=.3, dome=.25, base=.34)
    return rel


def save(img, name):
    img.save(os.path.join(OUT, name), optimize=True)
    print('yazıldı', name, img.size, os.path.getsize(os.path.join(OUT, name)) // 1024, 'KB')


if __name__ == '__main__':
    # ahşap
    wh = walnut(1024, 256)
    Image.fromarray(wh).save(os.path.join(OUT, 'walnut-h.jpg'), quality=84)
    Image.fromarray(np.rot90(wh)).save(os.path.join(OUT, 'walnut-v.jpg'), quality=84)
    print('ceviz dokuları yazıldı')

    # köşe: yükseklik haritası çevrilir, ışık her köşe için yeniden hesaplanır (ışık hep sol üstten)
    c = build_corner()
    for name, fn in (('tl', lambda x: x), ('tr', np.fliplr), ('bl', np.flipud), ('br', lambda x: np.flipud(np.fliplr(x)))):
        img = light_to_rgba(np.ascontiguousarray(fn(c.H)))
        img.save(os.path.join(OUT, f'corner-{name}.webp'), quality=72, alpha_quality=80, method=6)
        print('yazıldı corner-%s.webp' % name, img.size, os.path.getsize(os.path.join(OUT, f'corner-{name}.webp')) // 1024, 'KB')
    if os.path.exists(os.path.join(OUT, 'corner.png')):
        os.remove(os.path.join(OUT, 'corner.png'))

    # kenar
    e = build_edge_h()
    save(light_to_rgba(e.H, gold=False), 'edge-h.png')
    ev = np.rot90(e.H, -1)  # saat yönünde 90 derece: ışık yönü korunarak yeniden hesaplanır
    save(light_to_rgba(np.ascontiguousarray(ev), gold=False), 'edge-v.png')
