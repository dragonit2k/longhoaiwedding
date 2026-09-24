# Deploy lên Vercel (để có OG động theo ?guest=)

## Vì sao chuyển sang Vercel?
GitHub Pages là host tĩnh — bot Zalo/Messenger/Facebook không chạy JS,
nên không thể đổi title/ảnh preview theo `?guest=`. Vercel chạy được
serverless function (`api/og.js`) render sẵn thẻ meta cho bot.

## Các bước deploy

1. Push code lên GitHub (repo hiện tại là được).
2. Vào https://vercel.com → **Add New → Project** → chọn repo `longhoaiwedding`.
3. Framework Preset: **Other** (đây là site tĩnh + 1 function). Bấm **Deploy**.
4. Deploy xong sẽ có URL dạng `https://<ten-project>.vercel.app`.

## Sau khi có URL Vercel

Nếu tên project KHÁC `longhoaiwedding`, sửa domain ở 2 chỗ:
- `api/og.js` → biến `FALLBACK_BASE`
- `invite.html` → các thẻ `og:url`, `og:image`, `twitter:image` (5 dòng)

Rồi commit + push lại (Vercel tự deploy).

## Cách gửi link

- Không có tên khách: `https://<ten-project>.vercel.app/`
- Có tên khách:       `https://<ten-project>.vercel.app/?guest=Anh%20Tuấn`
  (khoảng trắng viết `%20`, hoặc cứ dán tên có dấu cách — trình duyệt tự mã hoá)

Preview khi share sẽ hiện: **Đặng Long & Lê Hoài - Thiệp mời Anh Tuấn** + ảnh cưới.

## Kiểm tra preview (quan trọng)

Zalo/Facebook **cache** preview rất lâu. Sau khi deploy, dùng công cụ debug
để ép lấy lại meta mới:
- Facebook/Messenger: https://developers.facebook.com/tools/debug/ → dán link → **Scrape Again**
- Zalo: thường tự cập nhật sau vài phút; nếu chưa, thêm `&v=2` vào cuối link để né cache.

## Lưu ý
- Thiệp nằm ở `invite.html` (không phải `index.html`). `vercel.json` route `/`
  qua function OG (`api/og.js`): **bot** (Zalo/Messenger) đọc meta có tên khách
  và ẩn; **người thật** được tự chuyển sang `/invite?guest=` để xem thiệp đầy đủ.
- Mở/kiểm tra local: dùng `invite.html` (vd `http://localhost:PORT/invite.html`).
- GitHub Pages cũ vẫn chạy song song, nhưng nên gửi link Vercel để có OG động.
