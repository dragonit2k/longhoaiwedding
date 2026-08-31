# 💍 Linh & Minh — Wedding Invitation

Thiệp cưới online dạng **one-page website**, phong cách *Modern Luxury Wedding* —
editorial · cinematic · romantic. Thuần **HTML + CSS + Vanilla JS**, không framework,
không phụ thuộc CDN (chỉ dùng Google Fonts).

```
thiep-cuoi-online/
├── index.html          # Cấu trúc trang
├── style.css           # Toàn bộ giao diện + animation
├── script.js           # Logic (countdown, gallery, RSVP, music...)
├── README.md
└── assets/
    ├── generate-placeholders.py   # Script sinh ảnh placeholder
    ├── hero.svg / bride-groom.svg / gallery-01..06.svg
    ├── countdown-bg.svg / final.svg / wedding-map.svg
    └── (music.mp3)     # Bạn tự thêm file nhạc
```

---

## 1. Cách chạy

Cần mở qua HTTP server (không mở trực tiếp `file://` để tránh lỗi tải tài nguyên):

```bash
# Python (khuyến nghị)
python3 -m http.server 8000

# hoặc Node
npx serve .
```

Mở trình duyệt: `http://localhost:8000`

Deploy tĩnh: đẩy toàn bộ thư mục lên **GitHub Pages / Netlify / Vercel** là chạy được ngay.

---

## 2. Cách thay ảnh

Tất cả ảnh nằm trong `/assets/`. Placeholder hiện tại là file `.svg`.

**Cách 1 — Giữ tên `.svg`:** đơn giản nhất, không cần sửa code. Ghi đè file `.svg`
bằng ảnh của bạn (nhưng vẫn phải là định dạng SVG).

**Cách 2 — Dùng ảnh `.jpg`/`.webp` thật (khuyến nghị):**
1. Bỏ ảnh vào `/assets/`, ví dụ `hero.jpg`, `gallery-01.jpg`...
2. Trong `index.html`, đổi `src="assets/hero.svg"` → `src="assets/hero.jpg"`.
3. Trong `script.js`, sửa mảng `galleryImages` (đầu file) từ `.svg` → `.jpg`.

Ảnh cần thay: `hero`, `bride-groom`, `gallery-01`→`gallery-06`, `countdown-bg`, `final`.

> Muốn sinh lại placeholder: `python3 assets/generate-placeholders.py`

---

## 3. Cách thay tên cô dâu / chú rể

Mở `script.js`, sửa trong `weddingConfig` ở đầu file:

```javascript
const weddingConfig = {
  bride: "Linh",   // ← tên cô dâu
  groom: "Minh",   // ← tên chú rể
  ...
};
```

Tên tự động cập nhật ở Hero, Quote, Final, Footer, tiêu đề trang và monogram.

---

## 4. Cách thay ngày cưới

Trong `weddingConfig`:

```javascript
weddingDate: "2026-10-12T09:00:00",   // định dạng YYYY-MM-DDTHH:mm:ss
```

Đây là mốc cho **countdown** và ngày hiển thị ở Hero/Final (định dạng `DD · MM · YYYY`).
Nên đặt bằng mốc quan trọng nhất (vd Thánh Lễ Hôn Phối).

---

## 5. Cách thay lịch trình & địa điểm (dương + âm lịch)

Toàn bộ lịch trình nằm ở mảng `weddingConfig.events` trong `script.js`. Mỗi mốc là
một object — **thêm / bớt / sắp xếp tuỳ ý**, trang tự render lại:

```javascript
events: [
  {
    date: "2026-10-12",                          // ngày DƯƠNG (YYYY-MM-DD)
    lunar: "Ngày 22 tháng 8 năm Bính Ngọ",       // ngày ÂM (tự nhập)
    time: "09:00",                               // giờ
    title: "Thánh Lễ Hôn Phối",                  // tên nghi lễ
    venue: "Nhà thờ Đức Bà Sài Gòn",             // tên địa điểm
    address: "01 Công xã Paris, Quận 1, TP.HCM", // địa chỉ đầy đủ
    mapUrl: "https://www.google.com/maps/...",   // link bản đồ ("" = ẩn nút)
  },
  {
    date: "2026-10-11",
    time: "11:00",
    title: "Tiệc Mừng Lễ Vu Quy",
    venue: "Tư gia nhà gái",
    address: "...",
    mapUrl: "...",
    highlight: true,                  // ← LÀM NỔI BẬT mốc này (khung nền + viền)
    badge: "Tiệc tại gia · Nhà Gái",  // ← nhãn nhỏ hiện phía trên
  },
  // ...thêm mốc khác
],
```

> Thứ trong tuần (Thứ Hai, Chủ Nhật...) được tính **tự động** từ ngày dương — bạn
> chỉ cần nhập ngày âm theo ý muốn.

**Làm nổi bật một mốc** (vd 2 buổi tiệc tại tư gia khác lịch nhau): thêm
`highlight: true` và `badge: "..."` vào mốc đó. Mốc sẽ có khung nền sáng, viền trái
màu nhấn và một nhãn nhỏ để khách dễ phân biệt được mời dự tiệc ở đâu. Bỏ 2 trường
này (hoặc để `highlight: false`) thì mốc hiển thị bình thường.

**Ngày âm lịch:** hiện phải tự nhập (chuỗi tuỳ ý) vì mỗi nhà có cách ghi khác nhau.
Tra ngày âm tương ứng trên lịch vạn niên rồi điền vào `lunar`.

### Thông tin hai họ (thiệp dùng chung đàng trai + đàng gái)

Sửa trong `weddingConfig.families`:

```javascript
families: {
  groom: {                              // Nhà Trai (hiển thị bên trái)
    side: "Nhà Trai",
    father: "Ông Trần Văn A",
    mother: "Bà Nguyễn Thị B",
    address: "Số 45, Đường Lê Lợi, Quận 1, TP. Hồ Chí Minh",
  },
  bride: {                              // Nhà Gái (hiển thị bên phải)
    side: "Nhà Gái",
    father: "Ông Nguyễn Văn C",
    mother: "Bà Lê Thị D",
    address: "Số 12, Đường Hai Bà Trưng, Quận 3, TP. Hồ Chí Minh",
  },
},
```

---

## 6. Cách thay nhạc

1. Đặt file nhạc tên `music.mp3` vào `/assets/`.
2. Xong. Nhấn nút ♫ góc phải để phát/tạm dừng.

> Nhạc **không tự phát** khi mở trang (do trình duyệt chặn autoplay) — chỉ phát sau
> khi người dùng bấm nút. Khi chưa có file, nút sẽ hiện thông báo nhắc thêm nhạc.

Đổi tên file khác: sửa `src="assets/music.mp3"` trong thẻ `<audio>` ở `index.html`.

---

## 7. Cách thay Google Maps

Mỗi mốc trong `events` có `mapUrl` riêng. Cách lấy link:

1. Mở Google Maps → tìm địa điểm.
2. Nhấn **Share / Chia sẻ** → copy link.
3. Dán vào `mapUrl` của mốc tương ứng.

```javascript
mapUrl: "https://www.google.com/maps/search/?api=1&query=Ten+Dia+Diem",
```

Nút **Xem bản đồ** dưới mỗi mốc mở link này trong tab mới.
Để trống `mapUrl: ""` thì nút bản đồ tự ẩn.

---

## 8. Cách chỉnh màu

Mở `style.css`, sửa các biến trong `:root` (đầu file):

```css
:root {
  --bg: #f7f3ee;            /* nền chính */
  --bg-secondary: #efe7de;  /* nền phụ */
  --text: #27231f;          /* chữ chính */
  --text-soft: #766e66;     /* chữ phụ */
  --accent: #9b7b5b;        /* màu nhấn (nâu vàng) */
  --accent-light: #c9b39a;  /* nhấn nhạt */
  --white: #ffffff;
}
```

Đổi ở đây là toàn bộ trang cập nhật theo.

---

## 9. Cách chỉnh font

Fonts nạp từ Google Fonts trong `<head>` của `index.html`
(**Cormorant Garamond** cho tiêu đề/tên, **Montserrat** cho nội dung).

Đổi font:
1. Thay thẻ `<link>` Google Fonts trong `index.html`.
2. Cập nhật biến trong `style.css`:

```css
:root {
  --font-serif: "Cormorant Garamond", Georgia, serif;  /* tiêu đề */
  --font-sans: "Montserrat", system-ui, Arial, sans-serif;  /* nội dung */
}
```

Gợi ý thay thế: `Playfair Display` + `Inter`.

---

## 10. Tài khoản mừng cưới + QR code (nhà trai & nhà gái)

Hai tài khoản (kèm mã QR VietQR để quét chuyển tiền) nằm ở mảng
`weddingConfig.banks` trong `script.js`:

```javascript
banks: [
  {
    label: "Nhà Trai",           // nhãn hiển thị
    name: "TRAN VAN MINH",       // tên chủ TK (VIẾT HOA, KHÔNG DẤU)
    number: "1903 6688 8888",    // số tài khoản
    bank: "Techcombank",         // tên ngân hàng (hiển thị)
    bankCode: "techcombank",     // mã VietQR để sinh QR (xem bên dưới)
  },
  {
    label: "Nhà Gái",
    name: "NGUYEN THI LINH",
    number: "0071 0004 5678",
    bank: "Vietcombank",
    bankCode: "vietcombank",
  },
],
```

**`bankCode`** là mã ngân hàng cho VietQR. Một số mã thông dụng:
`vietcombank`, `techcombank`, `mbbank`, `acb`, `bidv`, `vietinbank`, `tpbank`,
`vpbank`, `sacombank`, `agribank`, `vib`, `shb`, `hdbank`, `ocb`, `msb`.
> Tra đầy đủ tại <https://api.vietqr.io/v2/banks> (dùng giá trị trường `shortName`).

- QR được sinh tự động từ `bankCode` + `number` + `name` → **quét bằng app ngân
  hàng là chuyển tiền được ngay** (điền sẵn số tiền = 0, nội dung "Mung cuoi ...").
- Cần **internet** để hiển thị ảnh QR (lấy từ `img.vietqr.io`). Nếu offline, thẻ tự
  hiện dòng chữ "Quét mã QR bằng app ngân hàng" thay ảnh vỡ.
- Muốn **thêm/bớt tài khoản**: thêm/bớt object trong mảng — trang tự render lại.
- Nút **Sao Chép STK** dưới mỗi thẻ copy số tài khoản (đã bỏ khoảng trắng).

---

## 11. Chỉnh nội dung khác

| Nội dung | Vị trí |
|----------|--------|
| Timeline (Chuyện Tình) | `index.html` → `<section class="timeline">` |
| Lời chào / câu quote | `index.html` → `<section class="quote">` |
| Tài khoản mừng cưới + QR | `weddingConfig.banks` trong `script.js` (xem mục 10) |
| Text các section | trực tiếp trong `index.html` |

---

## Tính năng

- ✅ Preloader animation (monogram fade-in)
- ✅ Hero cinematic (zoom chậm + staged text reveal)
- ✅ Countdown thời gian thực
- ✅ Timeline có progress line theo scroll
- ✅ Gallery masonry + Lightbox (phím ← → ESC, swipe mobile)
- ✅ RSVP modal có validation + màn hình cảm ơn
- ✅ Tài khoản mừng cưới nhà trai & nhà gái, mỗi TK có QR VietQR + copy STK
- ✅ Nút nhạc nền nổi
- ✅ Navigation desktop + hamburger menu mobile
- ✅ Scroll reveal (IntersectionObserver), parallax nhẹ, custom cursor (desktop)
- ✅ Tôn trọng `prefers-reduced-motion`
- ✅ Responsive 320px → 1440px, không horizontal scroll
- ✅ Accessible: alt, aria-label, keyboard nav, focus state, ESC đóng modal/lightbox

---

*Made with love. Less is more.*
