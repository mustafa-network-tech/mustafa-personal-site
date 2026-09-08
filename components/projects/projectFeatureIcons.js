import {
  Monitor, Settings, BedDouble, CalendarDays, LogIn, LogOut, Users,
  CreditCard, CircleDollarSign, Wallet, Receipt, BarChart3, UserCog,
  ScrollText, ChefHat, UtensilsCrossed, LayoutGrid, ClipboardList,
  Package, Layers, Globe, Smartphone, MapPin, Image, CalendarCheck,
  Boxes, Factory, Car, FolderKanban, ShieldCheck, Database, LineChart,
  Check, Search, Music, BookOpen, Languages, Zap, Share2, Bell, Heart,
  Camera, Activity, Milk, Beef,
} from 'lucide-react'

// Specific concepts precede broad matches such as management or mobile.
// Normalize both Turkish and English labels without modifying displayed text.
const iconRules = [
  [/resepsiyon|reception/, Monitor],
  [/admin/, Settings],
  [/rol baz|rol taban|role.based|user permission/, UserCog],
  [/check-in/, LogIn],
  [/check-out/, LogOut],
  [/rezervasyon|reservation|booking/, CalendarDays],
  [/randevu|appointment/, CalendarCheck],
  [/oda |odalar|room/, BedDouble],
  [/kismi|parcali|partial payment|split payment/, CircleDollarSign],
  [/ciro|finans|revenue|finance/, LineChart],
  [/tahsilat|odeme|collection|payment/, CreditCard],
  [/gider|expense/, Receipt],
  [/kasa|cash desk|cashier/, Wallet],
  [/rapor|report|analiz|analytic/, BarChart3],
  [/islem log|islem gecmis|activity log|activity history|timesheet|puantaj/, ScrollText],
  [/garson|waiter/, UtensilsCrossed],
  [/mutfak|kitchen/, ChefHat],
  [/masa |table /, LayoutGrid],
  [/siparis|order taking|order flow|work order|is emri/, ClipboardList],
  [/adisyon|checks/, Receipt],
  [/stok|depo|inventory|warehouse/, Boxes],
  [/uretim|imalat|production|manufactur/, Factory],
  [/urun|parca yonet|product|part management|sevkiyat|shipment|zimmet|asset assignment/, Package],
  [/kategori|category|categories/, Layers],
  [/arac|vehicle/, Car],
  [/proje yonet|project management|is plan|work planning|gorev|task management/, FolderKanban],
  [/guvenlik|security|erisim|access control|onay|approval/, ShieldCheck],
  [/veritabani|database|veri aktar|data import/, Database],
  [/sut |milk|dairy/, Milk],
  [/besi|beef|hayvan|cattle/, Beef],
  [/hastalik|disease|tedavi|treatment|ilac|medication|kilo|weight/, Activity],
  [/misafir|guest|personel|staff|personnel|ekip|team|kullanici|user|profil|profile/, Users],
  [/konum|location|rota|route|bolge|area pages/, MapPin],
  [/galeri|gallery|galleries|album|gorsel hikaye|visual stor/, Image],
  [/fotograf|photo/, Camera],
  [/muzik|music|playlist/, Music],
  [/siir|poetry|okuma|reading|makale|article|blog|edebi|literary/, BookOpen],
  [/dil dest|dilli|language|localiz/, Languages],
  [/arama|search|filtre|filter|kesif|discovery/, Search],
  [/bildirim|notification/, Bell],
  [/favori|favorite|begeni|like system/, Heart],
  [/sosyal medya|social media|paylasim|sharing/, Share2],
  [/hizli|fast|performans|performance/, Zap],
  [/mobil|mobile|ios|android|play store/, Smartphone],
  [/web|seo|domain/, Globe],
  [/yonetim|management|otomasyon|automation|is akis|workflow/, Settings],
]

export function getProjectFeatureIcon(feature) {
  const normalized = feature.toLocaleLowerCase('tr-TR')
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/ı/g, 'i')
  return iconRules.find(([pattern]) => pattern.test(normalized))?.[1] || Check
}
