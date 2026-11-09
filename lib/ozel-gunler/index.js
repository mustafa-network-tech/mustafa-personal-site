// Her yıl tekrarlanan özel gün ekranları. Saatler Türkiye saatidir (UTC+3, yaz/kış saati yok).
// Yıl kodda sabit değildir; takvim yılı o anki tarihten alınır.
//
// Yeni özel gün eklemek için: görselleri public/images/ozel-gunler/<id>/ altına koyun
// (masaustu.png, mobil.png) ve OZEL_GUNLER listesine bir kayıt ekleyin.
// İki özel günün aralığı çakışmamalıdır (aynı anda yalnızca biri gösterilir).

export const OZEL_GUNLER = [
  {
    id: '29-ekim',
    ad: '29 Ekim Cumhuriyet Bayramı',
    // 29 Ekim 00:00 → 23:59:59: siteye ilk girişte 10 sn (Geç ile kapatılabilir), sonra bayrak düğmesiyle yeniden açılır.
    aralik: { baslangicAy: 10, baslangicGun: 29, baslangicSaat: 0, baslangicDakika: 0, bitisAy: 10, bitisGun: 29 },
    ilkGirisSn: 10,
    yenidenAc: true,
    zemin: '#160000',
    gorsel: {
      masaustu: '/images/ozel-gunler/29-ekim/masaustu.png',
      mobil: '/images/ozel-gunler/29-ekim/mobil.png',
      alt: 'Türkiye Büyük Millet Meclisi kürsüsünde Mustafa Kemal Atatürk; Türk bayraklarıyla 29 Ekim Cumhuriyet Bayramı kutlama afişi.',
    },
  },
  {
    id: '10-kasim',
    ad: '10 Kasım Atatürk’ü Anma Günü',
    // 9 Kasım 22:00 → 10 Kasım 23:59:59 arası: siteye ilk girişte 10 sn (Geç ile kapatılabilir).
    aralik: { baslangicAy: 11, baslangicGun: 9, baslangicSaat: 22, baslangicDakika: 0, bitisAy: 11, bitisGun: 10 },
    ilkGirisSn: 10,
    // 10 Kasım 09:05'te 1 dk: hangi sayfada olursa olsun herkese gösterilir, kapatılamaz.
    zorunlu: { ay: 11, gun: 10, saat: 9, dakika: 5, sureSn: 60 },
    gorsel: {
      masaustu: '/images/ozel-gunler/10-kasim/masaustu.png',
      mobil: '/images/ozel-gunler/10-kasim/mobil.png',
      alt: 'Mustafa Kemal Atatürk portresi ve sonsuzluk işareti; 10 Kasım anma görseli.',
    },
  },
]

const TR_OFFSET_MS = 3 * 60 * 60 * 1000

function turkiyeYili(now) {
  return new Date(now + TR_OFFSET_MS).getUTCFullYear()
}

// Türkiye saatiyle verilen anın UTC ms değeri (gün taşması Date.UTC tarafından çözülür).
function turkiyeAni(yil, ay, gun, saat = 0, dakika = 0) {
  return Date.UTC(yil, ay - 1, gun, saat, dakika) - TR_OFFSET_MS
}

/** Şu an hangi özel günün aralığındayız? (yoksa undefined) */
export function aktifOzelGun(now = Date.now()) {
  const yil = turkiyeYili(now)
  return OZEL_GUNLER.find((g) => {
    const a = g.aralik
    const bas = turkiyeAni(yil, a.baslangicAy, a.baslangicGun, a.baslangicSaat, a.baslangicDakika)
    const bit = turkiyeAni(yil, a.bitisAy, a.bitisGun + 1) // bitiş gününün sonu (hariç)
    return now >= bas && now < bit
  })
}

/** Zorunlu (kapatılamaz) gösterim sürüyorsa bitiş anını (ms), yoksa null döndürür. */
export function zorunluBitis(gun, now = Date.now()) {
  const z = gun?.zorunlu
  if (!z) return null
  const bas = turkiyeAni(turkiyeYili(now), z.ay, z.gun, z.saat, z.dakika)
  const bit = bas + z.sureSn * 1000
  return now >= bas && now < bit ? bit : null
}

/** "Bu yıl gördü" kaydının anahtarı; her yıl yeniden gösterilir. */
export function gordumAnahtari(gun, now = Date.now()) {
  return `ozel-gun:${gun.id}:${turkiyeYili(now)}`
}
