"""Site ikonları ve sosyal paylaşım görsellerini üretir.
Kaynak: public/mustafa.jpg (portre). Çıktılar public/ altında sabit URL'lerle servis edilir.
Çalıştırma: python scripts/generate-site-icons.py
"""
import os
from PIL import Image, ImageFilter

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PUB = os.path.join(ROOT, 'public')

# ---------- Favicon ailesi (yüz odaklı kare kırpma; görsel çarpıtılmaz) ----------
src = Image.open(os.path.join(PUB, 'mustafa.jpg')).convert('RGB')
W, H = src.size
k = H / 900.0                         # 675x900 önizleme koordinatlarından gerçek piksele
box = (int(105 * k), int(205 * k), int(105 * k) + int(430 * k), int(205 * k) + int(430 * k))
sq = src.crop(box)

def icon(size):
    im = sq.resize((size, size), Image.LANCZOS)
    if size <= 96:
        im = im.filter(ImageFilter.UnsharpMask(radius=0.8, percent=70, threshold=2))
    return im

for s, name in [(48, 'icon-48.png'), (96, 'icon-96.png'), (192, 'icon-192.png'), (512, 'icon-512.png')]:
    icon(s).save(os.path.join(PUB, name), optimize=True)
icon(180).save(os.path.join(PUB, 'apple-touch-icon.png'), optimize=True)
icon(256).save(os.path.join(PUB, 'favicon.ico'), format='ICO', sizes=[(16, 16), (32, 32), (48, 48)])

# ---------- Open Graph görselleri (1200x630) ----------
def cover(path, name, fx=0.5, fy=0.5):
    im = Image.open(os.path.join(PUB, path)).convert('RGB')
    tw, th = 1200, 630
    sc = max(tw / im.width, th / im.height)
    im = im.resize((int(im.width * sc) + 1, int(im.height * sc) + 1), Image.LANCZOS)
    x = int((im.width - tw) * fx); y = int((im.height - th) * fy)
    im.crop((x, y, x + tw, y + th)).save(os.path.join(PUB, 'images', 'og', name), quality=84, optimize=True, progressive=True)

OG = [
    ('images/hero.JPG', 'og-home.jpg', 0.8, 0.4),
    ('photos/nature/nature9.jpg', 'og-about.jpg', 0.5, 0.5),
    ('images/professional/hero-fiber.jpg', 'og-experience.jpg', 0.5, 0.55),
    ('photos/nature/nature6.jpg', 'og-photo.jpg', 0.5, 0.55),
    ('images/hero-slide-2.jpeg', 'og-projects.jpg', 0.5, 0.5),
    ('images/yoldasin-mucadelesi-hero.jpg', 'og-book.jpg', 0.35, 0.55),
    ('images/contact-hero.jpg', 'og-contact.jpg', 0.5, 0.55),
]
for p, n, fx, fy in OG:
    cover(p, n, fx, fy)
print('ok')
