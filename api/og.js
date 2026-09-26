/* =========================================================
   OG động theo ?guest= cho bot mạng xã hội (Zalo/Messenger/FB)
   ---------------------------------------------------------
   Bot không chạy JS nên phải render sẵn thẻ meta trong HTML.
   Bot KHÔNG được redirect (sẽ mất OG động); chỉ người thật mới được
   <script> chuyển về invite.html để xem thiệp đầy đủ (kèm ?guest=).
   ========================================================= */

export const config = { runtime: "edge" };

// Đổi nếu tên project Vercel khác. Nếu để trống sẽ tự suy ra từ request.
const FALLBACK_BASE = "https://longhoaiwedding.vercel.app";

const COUPLE = "Đặng Long & Lê Hoài";
const DEFAULT_TITLE = `${COUPLE} — Thiệp Cưới`;
const DEFAULT_DESC = "Chúng mình sắp về chung một nhà — 11.10.2026";

// Bỏ ký tự điều khiển + ký tự phá HTML, giới hạn độ dài.
function cleanGuest(raw) {
  if (!raw) return "";
  return raw
    .trim()
    .replace(/[\u0000-\u001f<>&"]/g, "")
    .slice(0, 60);
}

// Escape để chèn an toàn vào thuộc tính/nội dung HTML.
function esc(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// Bot mạng xã hội (không chạy JS): chỉ cần meta, KHÔNG được redirect —
// nếu redirect, bot crawl trang đích và mất OG động theo tên khách.
function isBot(ua) {
  if (!ua) return false;
  return /facebookexternalhit|facebot|zalo|twitterbot|telegrambot|whatsapp|discordbot|slackbot|linkedinbot|skypeuripreview|pinterest|googlebot|bingbot|embedly|redditbot|viber|line-podcast|line\//i.test(
    ua
  );
}

export default function handler(req) {
  const url = new URL(req.url);
  const base = FALLBACK_BASE || `${url.protocol}//${url.host}`;
  const ua = req.headers.get("user-agent") || "";
  const bot = isBot(ua);

  const guest = cleanGuest(url.searchParams.get("guest"));
  const title = guest ? `${COUPLE} - Thiệp mời ${guest}` : DEFAULT_TITLE;
  const desc = guest
    ? `Trân trọng kính mời ${guest} đến chung vui cùng gia đình chúng tôi — 11.10.2026`
    : DEFAULT_DESC;

  const image = `${base}/assets/og-share.jpg`;
  const canonical = guest
    ? `${base}/?guest=${encodeURIComponent(guest)}`
    : `${base}/`;
  // Người thật chuyển tới thiệp đầy đủ; giữ nguyên query để hiển thị tên trong trang.
  const redirect = guest
    ? `/invite?guest=${encodeURIComponent(guest)}`
    : `/invite`;

  // Bot: không chèn refresh/script (đọc meta rồi dừng). Người thật: tự chuyển.
  const redirectTags = bot
    ? ""
    : `<meta http-equiv="refresh" content="0; url=${esc(redirect)}" />
  <script>window.location.replace(${JSON.stringify(redirect)});</script>`;

  const html = `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(desc)}" />

  <meta property="og:site_name" content="${esc(COUPLE)}" />
  <meta property="og:type" content="website" />
  <meta property="og:locale" content="vi_VN" />
  <meta property="og:title" content="${esc(title)}" />
  <meta property="og:description" content="${esc(desc)}" />
  <meta property="og:url" content="${esc(canonical)}" />
  <meta property="og:image" content="${esc(image)}" />
  <meta property="og:image:secure_url" content="${esc(image)}" />
  <meta property="og:image:type" content="image/jpeg" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:image:alt" content="Ảnh cưới ${esc(COUPLE)}" />

  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${esc(title)}" />
  <meta name="twitter:description" content="${esc(desc)}" />
  <meta name="twitter:image" content="${esc(image)}" />

  <link rel="canonical" href="${esc(canonical)}" />
  ${redirectTags}
</head>
<body>
  <p>Đang mở thiệp cưới… Nếu không tự chuyển, hãy
     <a href="${esc(redirect)}">bấm vào đây</a>.</p>
</body>
</html>`;

  return new Response(html, {
    headers: {
      "content-type": "text/html; charset=utf-8",
      // Cache ngắn ở CDN để bot lấy meta mới nhanh nhưng vẫn giảm tải.
      "cache-control": "public, max-age=0, s-maxage=300",
    },
  });
}
