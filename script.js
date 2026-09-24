/* =========================================================
   Linh & Minh — Wedding Invitation
   Vanilla JS · modular init functions
   ========================================================= */

/* ---------- Data Configuration (chỉnh sửa ở đây) ---------- */
const weddingConfig = {
  groom: "Đặng Long",
  bride: "Lê Hoài",

  // Mốc chính dùng cho ĐẾM NGƯỢC & ngày hiển thị ở Hero/Final (giờ địa phương)
  weddingDate: "2026-10-11T11:00:00",

  // Các ngày highlight trên lịch tháng cưới (theo tháng của weddingDate)
  calendarHighlightDays: [9, 10, 11],

  // Thông tin hai họ — tách riêng Chú Rể / Cô Dâu (ảnh + tên + cha mẹ mỗi bên)
  //   name  : tên riêng hiển thị lớn cho từng người
  //   photo : ảnh chân dung mỗi bên (đổi sang ảnh thật khi có, vd "assets/groom.jpg")
  families: {
    groom: {
      side: "Nhà Trai",
      role: "Chú Rể",
      name: "Đặng Long",
      photo: "assets/CR.png",
      father: "Ông Đặng Văn Khiêm",
      mother: "Bà Nguyễn Thị Hiền",
      address: "Ngọc Đỉnh, Hoằng Hóa, Thanh Hóa",
      phone: "0347730837",
    },
    bride: {
      side: "Nhà Gái",
      role: "Cô Dâu",
      name: "Lê Hoài",
      photo: "assets/CD.png",
      father: "Ông Lê Hồng Phú",
      mother: "Bà Bùi Thị Hiên",
      address: "Eo Bàn, Ngọc Trạo, Thanh Hóa",
      phone: "0352088635",
    },
  },

  // Timeline trong ngày cưới chính — dải mốc giờ (đón dâu → after party).
  //   time  : giờ hiển thị (vd "15:00")
  //   title : tên hoạt động
  //   icon  : tên icon line-art (car | camera | ring | cheers | party) — đơn sắc theo tông thiệp
  dayTimeline: [
    { time: "08:00", title: "Xuất phát đón dâu", icon: "car" },
    { time: "11:00", title: "Lễ Thành Hôn", icon: "ring" },
    { time: "12:00", title: "Khai Tiệc", icon: "cheers" },
    { time: "14:00", title: "Chụp ảnh kỷ niệm", icon: "camera" },
  ],

  // Lịch trình — thêm/bớt/sắp xếp tuỳ ý. Sẽ được render động.
  //   date       : ngày dương (YYYY-MM-DD)
  //   lunar      : ngày âm lịch (chuỗi tự nhập, vd "Ngày 22 tháng 8 năm Bính Ngọ")
  //   time       : giờ
  //   title      : tên nghi lễ
  //   venue      : tên địa điểm
  //   address    : địa chỉ đầy đủ
  //   mapUrl     : link Google Maps (để trống "" thì ẩn nút bản đồ)
  //   highlight  : true  -> làm nổi bật mốc (khung nền + viền nhấn)
  //   badge      : nhãn nhỏ hiện trên mốc highlight (vd "Tiệc tại gia")
  events: [
    {
      date: "2026-10-09",
      lunar: "Ngày 29 tháng 8 năm Bính Ngọ",
      time: "15:00",
      title: "Lễ Nạp Tài",
      venue: "Tư gia nhà gái",
      address: "Eo Bàn, Ngọc Trạo, Thanh Hóa",
      mapUrl: "https://maps.app.goo.gl/5ycScWKWtn7CqyGG6",
    },
    {
      date: "2026-10-09",
      lunar: "Ngày 29 tháng 8 năm Bính Ngọ",
      time: "17:00",
      title: "Thánh Lễ Hôn Phối",
      venue: "Nhà thờ giáo xứ Du Nghì",
      address: "Eo Bàn, Ngọc Trạo, Thanh Hóa",
      mapUrl: "https://maps.app.goo.gl/EpakwsPEQf3Zt3jv8",
    },
    // {
    //   date: "2026-10-10",
    //   lunar: "Ngày 1 tháng 9 năm Bính Ngọ",
    //   time: "11:00",
    //   title: "Tiệc Mừng Tân Hôn",
    //   venue: "Tư gia nhà gái",
    //   address: "Thôn Eo Bàn, Xã Ngọc Trạo, Tỉnh Thanh Hóa",
    //   mapUrl: "https://maps.app.goo.gl/5ycScWKWtn7CqyGG6",
    //   highlight: true,
    //   badge: "Tiệc tại gia · Nhà Gái",
    //   // reception: true -> chuyển sang khu "Tiệc Mừng Tân Hôn" riêng, ẩn khỏi lịch trình chung
    //   reception: true,
    //   receptionSide: "Nhà Gái",
    // },
    {
      date: "2026-10-11",
      lunar: "Ngày 2 tháng 9 năm Bính Ngọ",
      time: "11:00",
      title: "Tiệc Mừng Tân Hôn",
      venue: "Tư gia nhà trai",
      address: "Ngọc Đỉnh, Hoằng Hóa, Thanh Hóa",
      mapUrl: "https://maps.app.goo.gl/bsy9gxdggjhfZ4o37",
      highlight: true,
      badge: "Tiệc tại gia · Nhà Trai",
      reception: true,
      receptionSide: "Nhà Trai",
    },
    {
      date: "2026-10-11",
      lunar: "Ngày 2 tháng 9 năm Bính Ngọ",
      time: "10:30",
      title: "Lễ Thành Hôn · Đón Dâu",
      venue: "Tư gia nhà trai",
      address: "Ngọc Đỉnh, Hoằng Hóa, Thanh Hóa",
      mapUrl: "https://maps.app.goo.gl/bsy9gxdggjhfZ4o37",
      // feature: true -> thẻ nổi bật kiểu "hero" (banner OUR WEDDING + tên cô dâu chú rể + hình minh hoạ)
      feature: true,
    }
  ],

  // Tài khoản mừng cưới — hiển thị cả nhà trai & nhà gái, mỗi TK có QR (VietQR).
  //   label    : nhãn ("Nhà Trai" / "Nhà Gái" hoặc tên)
  //   name     : tên chủ tài khoản (viết HOA, không dấu — chuẩn ngân hàng)
  //   number   : số tài khoản
  //   bank     : tên ngân hàng hiển thị
  //   bankCode : mã ngân hàng cho VietQR (vd "techcombank", "vietcombank",
  //              "mbbank", "acb", "bidv", "vietinbank", "tpbank", "vpbank")
  //              -> tra tại https://api.vietqr.io/v2/banks (trường "shortName")
  //   role     : vai trò hiển thị trên thẻ ("Chú Rể" / "Cô Dâu")
  //   person   : tên riêng viết dạng script (có dấu) hiển thị to trên thẻ
  //   photo    : ảnh chân dung tròn cạnh mã QR
  banks: [
    {
      label: "Nhà Trai",
      role: "Chú Rể",
      person: "Đặng Long",
      photo: "assets/CR.png",
      name: "DANG VAN LONG",
      number: "104 868 325 941",
      bank: "Vietinbank",
      bankCode: "vietinbank",
    },
    {
      label: "Nhà Gái",
      role: "Cô Dâu",
      person: "Lê Hoài",
      photo: "assets/CD.png",
      name: "LE THI HOAI",
      number: "1903 591 116 5014",
      bank: "Techcombank",
      bankCode: "techcombank",
    },
  ],
};

const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

/* Gallery nguồn ảnh (đổi sang .jpg khi có ảnh thật) */
const galleryImages = [
  "assets/gallery-01.jpg",
  "assets/gallery-02.jpg",
  "assets/gallery-03.jpg",
  "assets/gallery-04.jpg",
  "assets/gallery-05.jpg",
  "assets/gallery-06.jpg",
];

/* =========================================================
   Config → DOM (render từ weddingConfig)
   ========================================================= */
function applyConfig() {
  const c = weddingConfig;
  const coupleName = `${c.groom} & ${c.bride}`;

  document.title = `${coupleName} — Thiệp Cưới`;
  setText("[data-bride]", c.bride);
  setText("[data-groom]", c.groom);
  document.querySelectorAll("[data-couple]").forEach((el) => {
    el.textContent = coupleName;
  });
  document.querySelectorAll("[data-couple-upper]").forEach((el) => {
    el.textContent = `— ${coupleName}`;
  });

  // Ngày hiển thị: DD · MM · YYYY
  const d = new Date(c.weddingDate);
  const dateStr = `${pad(d.getDate())} · ${pad(d.getMonth() + 1)} · ${d.getFullYear()}`;
  document.querySelectorAll("[data-date-display]").forEach((el) => {
    el.textContent = dateStr;
  });

  renderCouple(c.families);
  // Lịch trình chung: bỏ các mốc thuộc "Tiệc Mừng Tân Hôn" (đã có khu riêng)
  renderEvents(c.events.filter((ev) => !ev.reception));
  renderReception(c.events.filter((ev) => ev.reception));
  renderBanks(c.banks);
  applyCallButtons(c.families);
  applyGuestGreeting();
}

/* ---------- Gán số điện thoại cho nút gọi cô dâu / chú rể ---------- */
function applyCallButtons(fam) {
  if (!fam) return;
  const setCall = (sel, phone) => {
    const el = document.querySelector(sel);
    if (!el) return;
    if (phone) el.setAttribute("href", `tel:${phone.replace(/\s+/g, "")}`);
    else el.style.display = "none"; // ẩn nút nếu chưa có số
  };
  setCall("[data-call-bride]", fam.bride && fam.bride.phone);
  setCall("[data-call-groom]", fam.groom && fam.groom.phone);
}

/* ---------- Lời mời khách theo tên trên URL (?guest=) ---------- */
// Lấy tên khách từ URL, làm sạch để tránh chèn ký tự lạ.
function getGuestName() {
  try {
    const raw = new URLSearchParams(window.location.search).get("guest");
    if (!raw) return "";
    // Cắt độ dài, bỏ ký tự điều khiển; escapeHtml lo phần còn lại khi render.
    return raw.trim().replace(/[ -<>&"]/g, "").slice(0, 60);
  } catch (_) {
    return "";
  }
}

function applyGuestGreeting() {
  const nameEl = document.querySelector("[data-guest-name]");
  if (!nameEl) return;
  const guest = getGuestName();
  nameEl.textContent = guest || "Quý Khách";
}

/* ---------- Render tài khoản mừng cưới + QR ---------- */
// URL ảnh VietQR (quét bằng app ngân hàng để chuyển tiền).
function vietQrUrl(b) {
  const acc = String(b.number).replace(/\s+/g, "");
  const info = encodeURIComponent(`Mung cuoi ${b.label || ""}`.trim());
  const name = encodeURIComponent(b.name || "");
  return `https://img.vietqr.io/image/${encodeURIComponent(b.bankCode)}-${acc}-compact2.png?addInfo=${info}&accountName=${name}`;
}

function renderBanks(banks) {
  const wrap = document.getElementById("banks");
  if (!wrap || !Array.isArray(banks)) return;

  wrap.innerHTML = banks
    .map((b, i) => {
      const qrUrl = b.bankCode ? vietQrUrl(b) : "";
      const dlName = `QR-${(b.role || b.label || "mung-cuoi").replace(/\s+/g, "-")}.png`;

      const photo = b.photo
        ? `<figure class="gift-card__photo">
             <img src="${escapeAttr(b.photo)}" alt="Ảnh ${escapeAttr(b.person || b.role || "")}"
                  loading="lazy" decoding="async" />
           </figure>`
        : "";

      const qr = qrUrl
        ? `<div class="gift-card__qr">
             <img src="${escapeAttr(qrUrl)}" alt="Mã QR chuyển khoản ${escapeAttr(b.person || b.label)}"
                  loading="lazy" decoding="async"
                  onerror="this.closest('.gift-card__qr').classList.add('is-missing')" />
             <span class="gift-card__qr-fallback">Quét mã QR<br />bằng app ngân hàng</span>
           </div>`
        : "";

      const download = qrUrl
        ? `<a class="btn btn--filled btn--sm gift-card__download" href="${escapeAttr(qrUrl)}"
              download="${escapeAttr(dlName)}" data-download-qr="${escapeAttr(dlName)}"
              target="_blank" rel="noopener">Tải ảnh QR</a>`
        : "";

      // Xen kẽ: dòng lẻ ảnh bên trái, dòng chẵn ảnh bên phải
      const flip = i % 2 === 1 ? " gift-card--flip" : "";
      return `
      <article class="gift-card reveal${flip}">
        ${photo}
        <div class="gift-card__panel">
          <p class="gift-card__role">${escapeHtml(b.role || b.label || "")}</p>
          <p class="gift-card__name">${escapeHtml(b.person || b.name || "")}</p>
          ${qr}
          ${download}
        </div>
      </article>`;
    })
    .join("");
}

/* ---------- Render Chú Rể / Cô Dâu (tách khối, có ảnh) ---------- */
function renderCouple(fam) {
  const wrap = document.getElementById("couple");
  if (!wrap || !fam) return;

  // Icon ghim vị trí (line-art) đứng trước địa chỉ
  const PIN_SVG = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>`;

  // Cột từng bên: khung ảnh vòm mạ vàng + nhãn vai trò + tên riêng + bố mẹ + địa chỉ
  const house = (f) => `
    <div class="house">
      <div class="house__frame">
        <div class="house__arch">
          <img src="${escapeAttr(f.photo || "")}" alt="Ảnh ${escapeAttr(f.role || f.side || "")}"
               loading="lazy" decoding="async" />
        </div>
        ${f.role ? `<span class="house__role">${escapeHtml(f.role)}</span>` : ""}
      </div>
      ${f.name ? `<p class="house__name">${escapeHtml(f.name)}</p>` : ""}
      ${f.side ? `<p class="house__side">${escapeHtml(f.side)}</p>` : ""}
      <div class="house__parents">
        ${f.father ? `<p class="house__parent">${escapeHtml(f.father)}</p>` : ""}
        ${f.mother ? `<p class="house__parent">${escapeHtml(f.mother)}</p>` : ""}
      </div>
      ${f.address ? `<p class="house__addr">${PIN_SVG}${escapeHtml(f.address)}</p>` : ""}
    </div>`;

  // Huy hiệu trái tim mạ vàng nối hai họ ở giữa
  const link = `
    <div class="houses__link" aria-hidden="true">
      <div class="houses__medallion">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 21s-6.5-4.35-9.2-8.5C1 9.5 2.4 6 5.7 6c1.9 0 3.3 1.1 4.1 2.3l.9 1.3.9-1.3C12.9 7.1 14.3 6 16.3 6c3.3 0 4.7 3.5 2.9 6.5C18.5 16.65 12 21 12 21Z"/></svg>
      </div>
    </div>`;

  // Chú rể bên trái, cô dâu bên phải (theo truyền thống)
  wrap.innerHTML = `
    <div class="houses reveal">
      <div class="houses__intro">
        <p class="houses__kicker">Se duyên kết tóc</p>
        <p class="houses__lead">Hai gia đình trân trọng báo tin vui</p>
      </div>
      <div class="houses__grid">
        ${house(fam.groom)}
        ${link}
        ${house(fam.bride)}
      </div>
    </div>`;
}

/* ---------- Phần đầu thẻ nổi bật: banner + tên + hình minh hoạ ---------- */
// SVG cô dâu chú rể line-art, đơn sắc theo tông thiệp (currentColor = maroon)
const COUPLE_SVG = `
  <svg class="invite-card__figure" viewBox="0 0 120 120" fill="none"
       stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <!-- Chú rể -->
    <circle cx="46" cy="30" r="9" fill="currentColor" stroke="none"/>
    <path d="M39 41h14l4 10-4 3v50h-14V54l-4-3z"/>
    <path d="M46 54v44"/>
    <!-- Cô dâu -->
    <circle cx="76" cy="32" r="9" fill="currentColor" stroke="none"/>
    <path d="M76 41c9 0 12 8 12 8l6 49H58l6-49s3-8 12-8z"/>
    <path d="M60 66h32"/>
    <!-- Tay nắm nhau -->
    <path d="M55 62c4 3 9 3 13 0"/>
  </svg>`;

function buildFeatureHeader() {
  const c = weddingConfig;
  return `
    <div class="invite-card__hero">
      <p class="invite-card__banner">Our Wedding</p>
      <p class="invite-card__hero-lead">Trân trọng thông báo hôn lễ của</p>
      <p class="invite-card__hero-name">${escapeHtml(c.groom || "")}</p>
      <span class="invite-card__hero-heart" aria-hidden="true">♥</span>
      <p class="invite-card__hero-name">${escapeHtml(c.bride || "")}</p>
      ${COUPLE_SVG}
    </div>`;
}

/* ---------- Thẻ mời dùng chung (Thư mời + Tiệc tân hôn) ----------
   Bố cục: [feature] tiêu đề → giờ → hộp ngày 3 ô (thứ · ngày · tháng-năm)
           → âm lịch → khung địa điểm (nhãn + nơi tổ chức + địa chỉ) → nút bản đồ */
function buildInviteCard(ev, { title, highlight, red } = {}) {
  const dd = formatDMY(ev.date);
  const cardTitle = title || ev.title || "";
  const mapBtn = ev.mapUrl
    ? `<a class="btn btn--filled btn--sm invite-card__map" href="${escapeAttr(ev.mapUrl)}"
          target="_blank" rel="noopener noreferrer">Xem bản đồ</a>`
    : "";

  // Thẻ nổi bật (feature): banner "OUR WEDDING" + tên cô dâu/chú rể + hình minh hoạ
  const feature = ev.feature ? buildFeatureHeader() : "";
  const cls = `invite-card reveal${highlight ? " invite-card--highlight" : ""}${ev.feature ? " invite-card--feature" : ""}${red ? " invite-card--red" : ""}`;

  return `
    <article class="${cls}">
      ${feature}
      <h3 class="invite-card__title">${escapeHtml(cardTitle)}</h3>
      ${ev.time ? `<p class="invite-card__time">Vào Lúc ${escapeHtml(ev.time)}</p>` : ""}

      <div class="invite-card__date">
        <span class="invite-card__dow">${escapeHtml(dd.dow)}</span>
        <span class="invite-card__day">${escapeHtml(dd.day)}</span>
        <span class="invite-card__my">${escapeHtml(dd.monthYear)}</span>
      </div>

      ${ev.lunar ? `<p class="invite-card__lunar">(Tức ${escapeHtml(ev.lunar)})</p>` : ""}

      <div class="invite-card__place">
        <p class="invite-card__place-label">Địa điểm tổ chức</p>
        ${ev.venue ? `<p class="invite-card__venue">${escapeHtml(ev.venue)}</p>` : ""}
        ${ev.address ? `<p class="invite-card__addr">${escapeHtml(ev.address)}</p>` : ""}
        ${mapBtn}
      </div>
    </article>`;
}

/* ---------- Render box đỏ "Thư mời cưới": lời mời + tên khách + tiệc mừng tân hôn ---------- */
function renderReception(items) {
  const wrap = document.getElementById("receptionGrid");
  if (!wrap || !Array.isArray(items)) return;

  const c = weddingConfig;
  const guest = getGuestName() || "Quý Khách";
  const ev = items[0]; // mốc "Tiệc Mừng Tân Hôn" (reception: true)

  // Khối thông tin tiệc (giờ · ngày · âm lịch · địa điểm · bản đồ) — gộp trong box đỏ
  let party = "";
  if (ev) {
    const dd = formatDMY(ev.date);
    const title = ev.title || "";
    const mapBtn = ev.mapUrl
      ? `<a class="invite-hero__map" href="${escapeAttr(ev.mapUrl)}" target="_blank" rel="noopener noreferrer">Xem bản đồ</a>`
      : "";
    party = `
      <div class="invite-hero__sep"><span></span><em>Tiệc mừng tân hôn</em><span></span></div>
      <h3 class="invite-hero__event-title">${escapeHtml(title)}</h3>
      ${ev.time ? `<p class="invite-hero__time">Vào Lúc ${escapeHtml(ev.time)}</p>` : ""}
      <div class="invite-hero__date">
        <span class="invite-hero__dow">${escapeHtml(dd.dow)}</span>
        <span class="invite-hero__day">${escapeHtml(dd.day)}</span>
        <span class="invite-hero__my">${escapeHtml(dd.monthYear)}</span>
      </div>
      ${ev.lunar ? `<p class="invite-hero__lunar">(Tức ${escapeHtml(ev.lunar)})</p>` : ""}
      <div class="invite-hero__place">
        <p class="invite-hero__place-label">Địa điểm tổ chức</p>
        ${ev.venue ? `<p class="invite-hero__venue">${escapeHtml(ev.venue)}</p>` : ""}
        ${ev.address ? `<p class="invite-hero__addr">${escapeHtml(ev.address)}</p>` : ""}
        ${mapBtn}
      </div>`;
  }

  wrap.innerHTML = `
    <div class="invite-hero">
      <span class="invite-hero__petal p1" aria-hidden="true"></span>
      <span class="invite-hero__petal p2" aria-hidden="true"></span>
      <span class="invite-hero__petal p3" aria-hidden="true"></span>
      <span class="invite-hero__petal p4" aria-hidden="true"></span>
      <div class="invite-hero__inner">
        <p class="invite-hero__eyebrow">Trân trọng kính mời</p>
        <p class="invite-hero__guest" data-guest-name>${escapeHtml(guest)}</p>
        <div class="invite-hero__divider" aria-hidden="true"><span></span><span class="invite-hero__heart">&#10084;</span><span></span></div>
        <p class="invite-hero__lead">Đến chung vui cùng gia đình chúng tôi</p>
        <p class="invite-hero__note">trong tiệc mừng tân hôn của hai con. Sự hiện diện của quý khách là niềm vinh hạnh cho gia đình chúng tôi.</p>
        <p class="invite-hero__couple">${escapeHtml(c.groom || "")} &amp; ${escapeHtml(c.bride || "")}</p>
        ${party}
      </div>
    </div>`;
}

/* ---------- Render "Diễn biến các lễ": thẻ card nối bằng trục dọc ---------- */
function renderEvents(events) {
  const wrap = document.getElementById("eventsGrid");
  if (!wrap || !Array.isArray(events)) return;

  const head = document.getElementById("ceremonyHead");
  if (!events.length) {
    wrap.innerHTML = "";
    if (head) head.hidden = true;
    return;
  }
  if (head) head.hidden = false;

  const cards = events
    .map((ev, i) => {
      const highlight = ev.feature ? false : ev.highlight; // thẻ feature dùng nền đỏ riêng
      const card = buildInviteCard(ev, { highlight, red: ev.feature });
      return `
        <div class="schedule__item">
          <span class="schedule__node">${i + 1}</span>
          ${card}
        </div>`;
    })
    .join("");

  wrap.innerHTML = `
    <div class="schedule">
      <span class="schedule__rail" aria-hidden="true"></span>
      <span class="schedule__spark" aria-hidden="true"></span>
      ${cards}
    </div>`;

  initScheduleRail();
}

/* ---------- Trục dọc "Diễn biến các lễ" tự vẽ theo scroll ---------- */
function initScheduleRail() {
  const schedule = document.querySelector("#eventsGrid .schedule");
  if (!schedule) return;

  const rail = schedule.querySelector(".schedule__rail");
  const items = Array.prototype.slice.call(schedule.querySelectorAll(".schedule__item"));

  // Reduced motion: hiện đầy đủ, không animate
  if (prefersReducedMotion) {
    schedule.style.setProperty("--progress", "1");
    items.forEach((it) => it.classList.add("is-in", "is-active"));
    return;
  }

  // Reveal từng thẻ khi lọt vào viewport (stagger tự nhiên)
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.25 }
    );
    items.forEach((it) => io.observe(it));
  } else {
    items.forEach((it) => it.classList.add("is-in"));
  }

  const update = () => {
    const rect = schedule.getBoundingClientRect();
    const vh = window.innerHeight || document.documentElement.clientHeight;
    const start = vh * 0.75;
    const total = rect.height + start * 0.4;
    const passed = start - rect.top;
    const p = Math.max(0, Math.min(1, passed / total));
    schedule.style.setProperty("--progress", p.toFixed(4));
    if (rail) schedule.style.setProperty("--rail-h", rail.offsetHeight + "px");
    schedule.style.setProperty("--spark-op", p > 0.02 && p < 0.99 ? "1" : "0");

    if (rail) {
      const drawnY = rail.getBoundingClientRect().top + rail.offsetHeight * p;
      items.forEach((it) => {
        const node = it.querySelector(".schedule__node");
        if (!node) return;
        const ny = node.getBoundingClientRect().top + node.offsetHeight / 2;
        it.classList.toggle("is-active", drawnY >= ny);
      });
    }
  };

  let ticking = false;
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      update();
      ticking = false;
    });
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  update();
}

/* =========================================================
   Preloader
   ========================================================= */
function initPreloader() {
  const preloader = document.getElementById("preloader");
  const hero = document.getElementById("hero");
  if (!preloader) return;

  const finish = () => {
    preloader.classList.add("is-hidden");
    document.body.classList.add("is-ready");
    if (hero) hero.classList.add("is-in");
    window.setTimeout(() => {
      preloader.remove();
    }, 900);
  };

  if (prefersReducedMotion) {
    finish();
    return;
  }

  // Staged fade-in của các phần tử preloader
  const steps = preloader.querySelectorAll("[data-pl]");
  steps.forEach((el, i) => {
    el.style.transition = "opacity .6s ease, transform .6s ease";
    window.setTimeout(() => {
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    }, 200 + i * 260);
  });

  // Loading line chạy
  const lineSpan = preloader.querySelector(".preloader__line span");
  if (lineSpan) {
    window.setTimeout(() => {
      lineSpan.style.transition = "width 1.1s ease";
      lineSpan.style.width = "100%";
    }, 700);
  }

  window.setTimeout(finish, 2300);
}

/* =========================================================
   Countdown
   ========================================================= */
function initCountdown() {
  const target = new Date(weddingConfig.weddingDate).getTime();
  const fields = {
    days: document.querySelector('[data-cd="days"]'),
    hours: document.querySelector('[data-cd="hours"]'),
    minutes: document.querySelector('[data-cd="minutes"]'),
    seconds: document.querySelector('[data-cd="seconds"]'),
  };
  if (!fields.days) return;

  const render = () => {
    const diff = target - Date.now();
    if (diff <= 0) {
      Object.values(fields).forEach((el) => (el.textContent = "00"));
      return false;
    }
    const days = Math.floor(diff / 86400000);
    const hours = Math.floor((diff % 86400000) / 3600000);
    const minutes = Math.floor((diff % 3600000) / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);
    updateNum(fields.days, pad(days));
    updateNum(fields.hours, pad(hours));
    updateNum(fields.minutes, pad(minutes));
    updateNum(fields.seconds, pad(seconds));
    return true;
  };

  render();
  const timer = window.setInterval(() => {
    if (render() === false) window.clearInterval(timer);
  }, 1000);
}

function updateNum(el, value) {
  if (!el || el.textContent === value) return;
  el.textContent = value;
  if (prefersReducedMotion) return;
  el.classList.remove("tick");
  // reflow để restart transition
  void el.offsetWidth;
  el.classList.add("tick");
  window.setTimeout(() => el.classList.remove("tick"), 300);
}

/* =========================================================
   Lịch tháng cưới — highlight các ngày diễn ra hôn lễ
   Tháng/năm lấy theo weddingDate; ngày cưới chính gắn trái tim.
   Các ngày cần highlight khai báo ở calendarHighlightDays.
   ========================================================= */
function initWeddingCalendar() {
  const wrap = document.getElementById("weddingCalendar");
  if (!wrap) return;

  const wd = new Date(weddingConfig.weddingDate);
  if (isNaN(wd)) return;
  const year = wd.getFullYear();
  const month = wd.getMonth(); // 0-indexed
  const weddingDay = wd.getDate();

  const highlight = weddingConfig.calendarHighlightDays || [weddingDay];
  const weekdayLabels = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];

  // Vị trí cột của ngày 1 (lịch bắt đầu từ Thứ Hai)
  const firstDow = (new Date(year, month, 1).getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const head = `<div class="calendar__head">${pad(month + 1)}.${year}</div>`;
  const weekRow = `<div class="calendar__weekdays">${weekdayLabels
    .map((d) => `<span class="calendar__wd">${d}</span>`)
    .join("")}</div>`;

  let cells = "";
  for (let i = 0; i < firstDow; i++) cells += `<span class="calendar__day calendar__day--empty"></span>`;
  for (let day = 1; day <= daysInMonth; day++) {
    const isHi = highlight.includes(day);
    const cls = `calendar__day${isHi ? " calendar__day--hi" : ""}`;
    cells += `<span class="${cls}"><span class="calendar__num">${day}</span></span>`;
  }
  const grid = `<div class="calendar__grid">${cells}</div>`;

  wrap.innerHTML = head + weekRow + grid;
}

/* =========================================================
   Scroll reveal (IntersectionObserver)
   ========================================================= */
function initScrollReveal() {
  const items = document.querySelectorAll(".reveal");
  if (!items.length) return;

  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    items.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  // Nhiều threshold: bắt cả phần tử nhỏ (cần 15% lọt vào) lẫn phần tử rất cao
  // hơn viewport (chỉ cần vừa chạm mép, ratio > 0) — tránh ảnh dọc lớn bị kẹt.
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: [0, 0.15], rootMargin: "0px 0px -8% 0px" }
  );

  items.forEach((el) => observer.observe(el));

  // Lưới an toàn: sau khi tải, mọi phần tử đã nằm trong (hoặc trên) viewport
  // mà chưa reveal thì hiện luôn — phòng trường hợp observer bỏ sót.
  window.setTimeout(() => {
    items.forEach((el) => {
      if (el.classList.contains("is-visible")) return;
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight && r.bottom > 0) {
        el.classList.add("is-visible");
        observer.unobserve(el);
      }
    });
  }, 700);
}

/* =========================================================
   Gallery + Lightbox
   ========================================================= */
function initGallery() {
  // Sync gallery <img> src từ galleryImages (nếu người dùng đổi mảng)
  const items = document.querySelectorAll("#galleryGrid .gallery__item img");
  items.forEach((img, i) => {
    if (galleryImages[i]) img.src = galleryImages[i];
  });
}

function initLightbox() {
  const lightbox = document.getElementById("lightbox");
  const lbImage = document.getElementById("lbImage");
  const btnClose = document.getElementById("lbClose");
  const btnPrev = document.getElementById("lbPrev");
  const btnNext = document.getElementById("lbNext");
  if (!lightbox || !lbImage) return;

  const triggers = document.querySelectorAll("#galleryGrid .gallery__item");

  let current = 0;
  let lastFocused = null;
  let single = false; // true khi xem 1 ảnh lẻ (hero, chân dung) — ẩn nút prev/next

  const setNavVisible = (visible) => {
    [btnPrev, btnNext].forEach((b) => {
      if (b) b.style.display = visible ? "" : "none";
    });
  };

  const show = (index) => {
    current = (index + galleryImages.length) % galleryImages.length;
    lbImage.src = galleryImages[current];
    lbImage.alt = `Khoảnh khắc ${current + 1}`;
  };

  const openState = () => {
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    if (btnClose) btnClose.focus();
  };

  // Mở lightbox theo index trong gallery (có prev/next)
  const open = (index) => {
    lastFocused = document.activeElement;
    single = false;
    setNavVisible(true);
    show(index);
    openState();
  };

  // Mở lightbox với 1 ảnh lẻ bất kỳ (hero / chân dung) — không prev/next
  const openSingle = (src, alt) => {
    if (!src) return;
    lastFocused = document.activeElement;
    single = true;
    setNavVisible(false);
    lbImage.src = src;
    lbImage.alt = alt || "";
    openState();
  };

  const close = () => {
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    setNavVisible(true);
    if (lastFocused) lastFocused.focus();
  };

  triggers.forEach((btn, i) =>
    btn.addEventListener("click", () => open(i))
  );

  // Ảnh hero + chân dung hai họ: click (hoặc Enter/Space) để xem full ảnh (1 ảnh lẻ)
  document.querySelectorAll("[data-zoomable]").forEach((el) => {
    const img = el.tagName === "IMG" ? el : el.querySelector("img");
    if (!img) return;
    el.style.cursor = "zoom-in";
    const trigger = () => openSingle(img.currentSrc || img.src, img.alt);
    el.addEventListener("click", trigger);
    el.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        trigger();
      }
    });
  });

  if (btnClose) btnClose.addEventListener("click", close);
  if (btnPrev) btnPrev.addEventListener("click", () => !single && show(current - 1));
  if (btnNext) btnNext.addEventListener("click", () => !single && show(current + 1));
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) close();
  });

  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("is-open")) return;
    if (e.key === "Escape") close();
    if (single) return;
    if (e.key === "ArrowLeft") show(current - 1);
    if (e.key === "ArrowRight") show(current + 1);
  });

  // Swipe (mobile)
  let startX = 0;
  lightbox.addEventListener(
    "touchstart",
    (e) => (startX = e.touches[0].clientX),
    { passive: true }
  );
  lightbox.addEventListener(
    "touchend",
    (e) => {
      if (single) return;
      const dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) > 50) show(dx > 0 ? current - 1 : current + 1);
    },
    { passive: true }
  );
}

/* =========================================================
   RSVP modal + form
   ========================================================= */
function initRSVP() {
  const modal = document.getElementById("rsvpModal");
  const openBtn = document.getElementById("rsvpOpen");
  const form = document.getElementById("rsvpForm");
  const formWrap = document.getElementById("rsvpFormWrap");
  const success = document.getElementById("rsvpSuccess");
  if (!modal || !openBtn) return;

  let lastFocused = null;

  const open = () => {
    lastFocused = document.activeElement;
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    const firstInput = modal.querySelector("input, textarea, button");
    if (firstInput) firstInput.focus();
  };

  const close = () => {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    if (lastFocused) lastFocused.focus();
  };

  openBtn.addEventListener("click", open);
  modal
    .querySelectorAll("[data-close-modal]")
    .forEach((el) => el.addEventListener("click", close));

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("is-open")) close();
  });

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!validateRSVP(form)) return;
      // Frontend demo: không có backend. Hiển thị lời cảm ơn.
      formWrap.hidden = true;
      success.hidden = false;
    });
  }
}

function validateRSVP(form) {
  clearErrors(form);
  let valid = true;

  const name = form.elements["name"];
  if (!name.value.trim()) {
    setFieldError(form, "name", "Vui lòng nhập tên của bạn.");
    name.setAttribute("aria-invalid", "true");
    if (valid) name.focus();
    valid = false;
  }

  const attend = form.elements["attend"];
  const attendChosen = Array.from(attend).some((r) => r.checked);
  if (!attendChosen) {
    setFieldError(form, "attend", "Vui lòng chọn một lựa chọn.");
    valid = false;
  }

  return valid;
}

function setFieldError(form, name, msg) {
  const el = form.querySelector(`[data-error-for="${name}"]`);
  if (el) el.textContent = msg;
}

function clearErrors(form) {
  form
    .querySelectorAll(".field__error")
    .forEach((el) => (el.textContent = ""));
  form
    .querySelectorAll("[aria-invalid]")
    .forEach((el) => el.removeAttribute("aria-invalid"));
}

/* =========================================================
   Copy bank account (hỗ trợ nhiều nút — event delegation)
   ========================================================= */
function initCopyAccount() {
  document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-copy-target]");
    if (!btn) return;
    copyToClipboard(btn.dataset.copyTarget || "");

    const labelEl = btn.querySelector(".copy-label");
    if (labelEl) {
      const original = labelEl.textContent;
      labelEl.textContent = "Đã sao chép ✓";
      window.setTimeout(() => (labelEl.textContent = original), 2000);
    }
    showToast("Đã sao chép số tài khoản");
  });
}

async function copyToClipboard(value) {
  try {
    await navigator.clipboard.writeText(value);
  } catch (err) {
    // Fallback cho trình duyệt cũ / không có clipboard API
    const tmp = document.createElement("textarea");
    tmp.value = value;
    tmp.style.position = "fixed";
    tmp.style.opacity = "0";
    document.body.appendChild(tmp);
    tmp.select();
    try {
      document.execCommand("copy");
    } catch (_) {
      /* ignore */
    }
    document.body.removeChild(tmp);
  }
}

/* =========================================================
   Tải ảnh QR về máy (ảnh VietQR cross-origin — cần fetch blob)
   ========================================================= */
function initDownloadQr() {
  document.addEventListener("click", async (e) => {
    const link = e.target.closest("[data-download-qr]");
    if (!link) return;
    e.preventDefault();

    const url = link.getAttribute("href");
    const filename = link.getAttribute("data-download-qr") || "QR.png";
    try {
      const res = await fetch(url, { mode: "cors" });
      if (!res.ok) throw new Error("fetch failed");
      const blob = await res.blob();
      const objUrl = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = objUrl;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(objUrl);
      showToast("Đã tải ảnh QR");
    } catch (_) {
      // Fallback: mở ảnh ở tab mới để người dùng lưu thủ công
      window.open(url, "_blank", "noopener");
    }
  });
}

/* =========================================================
   Background music
   ========================================================= */
function initMusic() {
  const btn = document.getElementById("musicBtn");
  const audio = document.getElementById("bgMusic");
  if (!btn || !audio) return;

  const markPlaying = () => {
    btn.classList.add("is-playing");
    btn.setAttribute("aria-pressed", "true");
    btn.setAttribute("aria-label", "Tắt nhạc nền");
  };
  const markPaused = () => {
    btn.classList.remove("is-playing");
    btn.setAttribute("aria-pressed", "false");
    btn.setAttribute("aria-label", "Bật nhạc nền");
  };

  // Nút bật/tắt thủ công
  btn.addEventListener("click", () => {
    if (audio.paused) {
      audio.play().then(markPlaying).catch(() => {
        showToast("Chưa có file nhạc — thêm assets/music.mp3");
      });
    } else {
      audio.pause();
      markPaused();
    }
  });

  // Tự động phát: thử ngay; nếu trình duyệt chặn autoplay có tiếng,
  // phát ngay ở lần tương tác đầu tiên (chạm / click / cuộn / phím).
  const tryAutoplay = () => audio.play().then(markPlaying);

  tryAutoplay().catch(() => {
    const startOnInteract = () => {
      tryAutoplay().finally(removeListeners);
    };
    const removeListeners = () => {
      ["pointerdown", "touchstart", "keydown", "scroll"].forEach((ev) =>
        window.removeEventListener(ev, startOnInteract)
      );
    };
    ["pointerdown", "touchstart", "keydown", "scroll"].forEach((ev) =>
      window.addEventListener(ev, startOnInteract, { once: false, passive: true })
    );
  });
}

/* =========================================================
   Custom cursor (desktop, pointer:fine)
   ========================================================= */
function initCursor() {
  const cursor = document.getElementById("cursor");
  if (!cursor || prefersReducedMotion) return;
  if (!window.matchMedia("(pointer: fine)").matches) return;

  let x = 0, y = 0, cx = 0, cy = 0;

  window.addEventListener("mousemove", (e) => {
    x = e.clientX;
    y = e.clientY;
    cursor.classList.add("is-active");
  });

  const loop = () => {
    cx += (x - cx) * 0.18;
    cy += (y - cy) * 0.18;
    cursor.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%)`;
    window.requestAnimationFrame(loop);
  };
  loop();

  const hoverables = document.querySelectorAll(
    "a, button, .gallery__item, .detail-card"
  );
  hoverables.forEach((el) => {
    el.addEventListener("mouseenter", () => cursor.classList.add("is-hover"));
    el.addEventListener("mouseleave", () => cursor.classList.remove("is-hover"));
  });
}

/* =========================================================
   Utilities
   ========================================================= */
function pad(n) {
  return String(n).padStart(2, "0");
}

function setText(selector, value) {
  const el = document.querySelector(selector);
  if (el) el.textContent = value;
}

// Định dạng ngày dương: trả về mảnh ngày để dựng "hộp 3 ô" (thứ · ngày · tháng-năm)
const DOW_VI = ["Chủ Nhật", "Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy"];
function formatDMY(iso) {
  const d = new Date(iso + "T00:00:00");
  if (isNaN(d)) return { full: iso || "", dow: "", day: "", monthYear: "" };
  const day = pad(d.getDate());
  const month = pad(d.getMonth() + 1);
  const year = d.getFullYear();
  return {
    full: `${day}/${month}/${year}`,
    dow: DOW_VI[d.getDay()],
    day, // "18"
    monthYear: `${month} - ${year}`, // "09 - 2026"
  };
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function escapeAttr(str) {
  return escapeHtml(str).replace(/"/g, "&quot;");
}

function throttle(fn, wait) {
  let last = 0;
  let timer = null;
  return function (...args) {
    const now = Date.now();
    const remaining = wait - (now - last);
    if (remaining <= 0) {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      last = now;
      fn.apply(this, args);
    } else if (!timer) {
      timer = setTimeout(() => {
        last = Date.now();
        timer = null;
        fn.apply(this, args);
      }, remaining);
    }
  };
}

let toastTimer = null;
function showToast(message) {
  const toast = document.getElementById("toast");
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("is-visible");
  clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => {
    toast.classList.remove("is-visible");
  }, 3000);
}

/* =========================================================
   Boot
   ========================================================= */
document.addEventListener("DOMContentLoaded", () => {
  applyConfig();
  initPreloader();
  initCountdown();
  initWeddingCalendar();
  initScrollReveal();
  initGallery();
  initLightbox();
  initRSVP();
  initCopyAccount();
  initDownloadQr();
  initMusic();
  initCursor();
});
