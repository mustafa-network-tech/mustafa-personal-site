# 29 Ekim 2026 karşılama ekranı

Bağımsız HTML/CSS/JavaScript paketi. Herhangi bir canlı siteye bağlanmamıştır.

## Önizleme

`index.html` dosyasını çift tıklayarak açın. Dosya ve yerel sunucu ortamında önizleme otomatik açılır.

- `?preview=1`: Tarih ve ilk ziyaret kontrolünü atlayarak gösterir.
- `?test=1`: Test modunda gösterir; localStorage kaydı yazmaz.
- “İlk ziyareti sıfırla”: Bu paket için tarayıcıdaki görülme kaydını temizler.
- Sağ alttaki küçük bayrak: Karşılamayı yeniden açar.

## Canlı davranış

- Türkiye saati (`Europe/Istanbul`) esas alınır.
- Yalnızca 29 Ekim 2026 00:00–23:59 arasında aktiftir.
- Her alan adında, her tarayıcı için ilk ziyarette otomatik açılır.
- 10 saniye sonra veya “Geç” düğmesiyle kapanır.
- Kampanya aktifken küçük bayrak düğmesiyle yeniden açılabilir.
- `prefers-reduced-motion` etkinse yazı/zoom geçişleri kaldırılır.

## Dosyalar

- `index.html`: Bağımsız önizleme sayfası ve karşılama işaretlemesi
- `styles.css`: Afişi kırpmadan gösteren masaüstü/mobil tasarım ve hareket azaltma desteği
- `script.js`: Tarih, 10 saniye, localStorage ve yeniden açma davranışı
- `assets/29-ekim-kare.png`: Geniş ekran afişi
- `assets/29-ekim-dikey.png`: Mobil/dikey afiş

Canlı sitelere entegrasyon, kullanıcı onayından sonra her proje için ayrı yapılmalıdır.
