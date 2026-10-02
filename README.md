
# Instagram Takip Etmeyenler / Instagram Unfollower Panel

Instagram'da takip ettiğin hesaplarla takipçilerini karşılaştıran, seni geri takip etmeyen hesapları modern bir panel üzerinden gösteren hafif bir tarayıcı aracıdır.

A lightweight browser-console tool for comparing the accounts you follow with your followers and reviewing non-followers in a clean interface.

> **Uyarı / Disclaimer:** Bu proje Instagram veya Meta ile bağlantılı değildir; resmi bir ürün değildir. Instagram'ın web uç noktaları zaman içinde değişebilir.

## Özellikler

- Takip ettiklerin ve takipçilerini karşılaştırır
- Seni geri takip etmeyen hesapları listeler
- Kullanıcı adı veya isim ile arama
- Doğrulanmış / gizli / profilsiz hesap filtreleri
- Kullanıcıları listeden gizleme
- Kullanıcı adlarını toplu kopyalama
- Profil açma
- Seçili hesaplar için kontrollü takip bırakma
- Tarama sırasında duraklat / devam et
- Takip bırakma sırasında duraklat / devam et
- Yarım kalan taramayı kaydetme ve devam ettirme
- Türkçe / İngilizce arayüz
- Sürüklenebilir ve küçültülebilir panel
- Mobil uyumlu tasarım
- Harici sunucu veya backend gerektirmez

## 📸 Ekran Görüntüsü

<p align="center">
  <img
    width="477"
    height="334"
    alt="Instagram Unfollower Checker Panel"
    src="https://github.com/user-attachments/assets/d3e1113b-4875-47d2-ab0d-01b41b4286f6"
  />
</p>

## Kurulum ve Kullanım

1. `https://www.instagram.com/` adresini aç ve hesabına giriş yap.
2. Tarayıcı geliştirici araçlarını aç:
   - **Chrome / Edge:** `F12` veya `Ctrl + Shift + J`
   - **macOS:** `Cmd + Option + J`
3. **Console / Konsol** sekmesine geç.
4. Bu repodaki `instagram-unfollower.js` dosyasını aç.
5. Kodu çalıştırmadan önce incele.
6. Dosyanın tamamını kopyala.
7. Instagram açıkken Console'a yapıştır ve `Enter` tuşuna bas.
8. Açılan panelden **Taramayı başlat** butonuna bas.

### Konsola yapıştırırken önemli not

Chrome veya Edge, DevTools Console'a ilk kez kod yapıştırırken güvenlik nedeniyle aşağıdakine benzer bir uyarı gösterebilir:

> "Warning: Don't paste code into the DevTools Console..."

Bazı sürümlerde yapıştırmaya izin vermek için Console'un senden belirli bir ifade yazmanı istemesi mümkündür. Tarayıcı ekranda hangi ifadeyi istiyorsa **yalnızca kodu kendin incelediysen ve güvendiysen** onu yazıp devam et.

Bu proje senden Instagram şifreni istemez. Kod, açık olan Instagram sekmesindeki mevcut oturumunu kullanır.

### Kod çalışmıyorsa kontrol et

- Console'u `instagram.com` açıkken kullandığından emin ol
- Instagram hesabında oturum açık olsun
- Console'da başka eski sürüm çalışıyorsa sayfayı yenile
- Yarım kalmış taramayı sıfırlamak için:

```js
localStorage.removeItem("iu_scan_v1");
```

Sonra sayfayı yenileyip kodu yeniden çalıştır.

## Kullanım

### Tarama

**Taramayı başlat** butonuna bastığında araç sırasıyla:

1. Takip ettiğin hesapları yükler
2. Takipçilerini yükler
3. İki listeyi karşılaştırır
4. Seni geri takip etmeyenleri sonuç ekranında gösterir

Tarama sırasında sekmeyi mümkün olduğunca ön planda tut. Chrome arka plandaki sekmeleri yavaşlatabilir.

### Sonuç ekranı

Tarama tamamlandıktan sonra:

- Kullanıcı ara
- Filtre uygula
- Kullanıcı seç
- Kullanıcı adlarını kopyala
- Kullanıcıyı listeden gizle
- Profili aç
- Seçili hesaplar için takip bırakma işlemi başlat

### Takip bırakma

Takip bırakma işlemleri kasıtlı olarak aralıklı çalışır.

Varsayılan gecikmeler temkinlidir ancak hiçbir ayar Instagram'ın rate-limit veya geçici engel uygulamayacağını garanti etmez.

Instagram istekleri reddetmeye başlarsa işlemi durdur ve bir süre bekle.

## Tasarım

`v1.0` arayüzü artık tam ekran yan panel yerine kompakt bir **floating popup** olarak açılır:

- Mor / lila glassmorphism tema
- Ortalanmış, sürüklenebilir popup
- Instagram esintili gradient uygulama ikonu
- Büyük yükleme durum kartı
- Animasyonlu takipçi yükleme göstergesi
- Progress bar + sayaç + bekleme rozeti
- Yan yana `Duraklat` ve `İptal` aksiyonları
- Sonuç ekranında arama, filtre ve kullanıcı kartları
- Mobil ekranlarda tek sütuna dönen responsive yapı
- Küçültüldüğünde sağ altta durum pill'i

## Gizlilik

Bu proje ayrı bir sunucu kullanmaz.

Kod yalnızca tarayıcında, `instagram.com` sayfası üzerinde çalışır ve mevcut oturum çerezlerinle Instagram istekleri gönderir.

Panel:

- Şifre istemez
- Ayrı bir giriş ekranı açmaz
- Harici backend gerektirmez

Yine de herhangi bir browser-console scriptini çalıştırmadan önce kodu incelemen önerilir.

## Olası Hatalar

### `Tarama başarısız`

Olası nedenler:

- Instagram endpoint yapısını değiştirmiş olabilir
- Oturum süresi dolmuş olabilir
- Kaydedilmiş pagination cursor geçersiz olabilir
- Instagram liste isteklerini geçici olarak sınırlamış olabilir
- Ağ bağlantısı kesilmiş olabilir
- Rate-limit uygulanmış olabilir

İlk olarak şunu çalıştır:

```js
localStorage.removeItem("iu_scan_v1");
```

Ardından Instagram sayfasını yenile, scripti tekrar yapıştır ve yeni tarama başlat.

### Oturum hatası

Instagram hesabından çıkış yapıldıysa tekrar giriş yap, sayfayı yenile ve scripti yeniden çalıştır.

### Geçici engel / rate limit

Aynı işlemi arka arkaya hızlı şekilde deneme. Bir süre bekleyip daha sonra yeniden dene.

## English

This tool compares your Instagram following list with your followers and shows accounts that do not follow you back.

### Quick Start

1. Sign in to Instagram.
2. Open Developer Tools.
3. Go to the Console tab.
4. Review and copy `instagram-unfollower.js`.
5. Paste it into the Console while `instagram.com` is open.
6. Press `Enter`.
7. Click **Scan now** in the panel.

If your browser shows a DevTools paste-protection warning, follow the browser's on-screen instruction only after you have reviewed and trust the code.

## Project Structure

```text
.
├── instagram-unfollower.js
└── README.md
```

## Development

The project is dependency-free.

Main constants:

```js
const APP_ID = "iu-app";
const VERSION = "1.0";
const PANEL_WIDTH = 420;
```

Local storage keys:

```text
iu_state_v3
iu_scan_v1
```

## Contributing

Issue veya pull request açarken:

- Tarayıcı ve sürümünü yaz
- Hatanın Following / Followers / Unfollow aşamalarından hangisinde olduğunu belirt
- Console hata metnini ekle
- Ekran görüntüsünden kullanıcı adı, hesap ID'si, cookie, token gibi özel bilgileri kaldır

## License

Repo'yu public yapmadan önce tercih ettiğin lisansı ekleyebilirsin. Küçük açık kaynak projelerde MIT lisansı sık kullanılan seçeneklerden biridir.
