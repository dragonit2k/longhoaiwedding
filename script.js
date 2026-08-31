/* =========================================================
   Linh & Minh — Wedding Invitation
   Vanilla JS · modular init functions
   ========================================================= */

/* ---------- Data Configuration (chỉnh sửa ở đây) ---------- */
const weddingConfig = {
  bride: "Long",
  groom: "Hoài",

  // Mốc chính dùng cho ĐẾM NGƯỢC & ngày hiển thị ở Hero/Final (giờ địa phương)
  weddingDate: "2026-10-11T11:00:00",

  // Thông tin hai họ — thiệp dùng chung cho cả đàng trai & đàng gái
  families: {
    groom: {
      side: "Nhà Trai",
      father: "Ông Đặng Văn Khiêm",
      mother: "Bà Nguyễn Thị Hiền",
      address: "Số 75 Đường Ngọc Đỉnh, Xã Hoằng Hóa, Tỉnh Thanh Hóa",
    },
    bride: {
      side: "Nhà Gái",
      father: "Ông Lê Hồng Phú",
      mother: "Bà Bùi Thị Hiên",
      address: "Thôn Thành Du, Xã Ngọc Trạo, Tỉnh Thanh Hóa",
    },
  },

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
      time: "14:00",
      title: "Lễ Vu Quy",
      venue: "Tư gia nhà gái",
      address: "Thôn Thành Du, Xã Ngọc Trạo, Tỉnh Thanh Hóa",
      mapUrl: "https://maps.app.goo.gl/5ycScWKWtn7CqyGG6",
    },
    {
      date: "2026-10-09",
      lunar: "Ngày 29 tháng 8 năm Bính Ngọ",
      time: "17:00",
      title: "Thánh Lễ Hôn Phối",
      venue: "Nhà thờ giáo xứ Du Nghì",
      address: "Thôn Thành Du, Xã Ngọc Trạo, Tỉnh Thanh Hóa",
      mapUrl: "https://maps.app.goo.gl/EpakwsPEQf3Zt3jv8",
    },
    {
      date: "2026-10-10",
      lunar: "Ngày 1 tháng 9 năm Bính Ngọ",
      time: "11:00",
      title: "Tiệc Mừng Tân Hôn",
      venue: "Tư gia nhà gái",
      address: "Thôn Thành Du, Xã Ngọc Trạo, Tỉnh Thanh Hóa",
      mapUrl: "https://maps.app.goo.gl/5ycScWKWtn7CqyGG6",
      highlight: true,
      badge: "Tiệc tại gia · Nhà Gái",
    },
    {
      date: "2026-10-10",
      lunar: "Ngày 1 tháng 9 năm Bính Ngọ",
      time: "19:30",
      title: "Tiệc Mừng Tân Hôn",
      venue: "Tư gia nhà trai",
      address: "Số 75 Đường Ngọc Đỉnh, Xã Hoằng Hóa, Tỉnh Thanh Hóa",
      mapUrl: "https://maps.app.goo.gl/bsy9gxdggjhfZ4o37",
      highlight: true,
      badge: "Tiệc tại gia · Nhà Trai",
    },
    {
      date: "2026-10-11",
      lunar: "Ngày 2 tháng 9 năm Bính Ngọ",
      time: "11:00",
      title: "Lễ Thành Hôn · Đón Dâu",
      venue: "Tư gia nhà trai",
      address: "Số 75 Đường Ngọc Đỉnh, Xã Hoằng Hóa, Tỉnh Thanh Hóa",
      mapUrl: "https://maps.app.goo.gl/bsy9gxdggjhfZ4o37",
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
  banks: [
    {
      label: "Nhà Trai",
      name: "DANG VAN LONG",
      number: "104 868 325 941",
      bank: "Vietinbank",
      bankCode: "vietinbank",
    },
    {
      label: "Nhà Gái",
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
  "assets/gallery-01.png",
  "assets/gallery-02.png",
  "assets/gallery-03.png",
  "assets/gallery-04.png",
  "assets/gallery-05.png",
  "assets/gallery-06.png",
];

/* =========================================================
   Config → DOM (render từ weddingConfig)
   ========================================================= */
function applyConfig() {
  const c = weddingConfig;
  const coupleName = `${c.bride} & ${c.groom}`;

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

  renderFamilies(c.families);
  renderEvents(c.events);
  renderBanks(c.banks);
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
    .map((b) => {
      const acc = String(b.number).replace(/\s+/g, "");
      const qr = b.bankCode
        ? `<div class="bank-card__qr">
             <img src="${escapeAttr(vietQrUrl(b))}" alt="Mã QR chuyển khoản ${escapeAttr(b.label || b.name)}"
                  loading="lazy" decoding="async"
                  onerror="this.closest('.bank-card__qr').classList.add('is-missing')" />
             <span class="bank-card__qr-fallback">Quét mã QR<br />bằng app ngân hàng</span>
           </div>`
        : "";
      return `
      <article class="bank-card reveal">
        <p class="label bank-card__label">${escapeHtml(b.label || "")}</p>
        ${qr}
        <dl class="bank-card__info">
          <div><dt>Chủ tài khoản</dt><dd>${escapeHtml(b.name || "")}</dd></div>
          <div><dt>Số tài khoản</dt><dd class="bank-card__num">${escapeHtml(b.number || "")}</dd></div>
          <div><dt>Ngân hàng</dt><dd>${escapeHtml(b.bank || "")}</dd></div>
        </dl>
        <button class="btn btn--sm bank-card__copy" data-copy-target="${escapeAttr(acc)}">
          <span class="copy-label">Sao Chép STK</span>
        </button>
      </article>`;
    })
    .join("");
}

/* ---------- Render thông tin hai họ ---------- */
function renderFamilies(fam) {
  const wrap = document.getElementById("families");
  if (!wrap || !fam) return;
  const card = (f) => `
    <div class="family reveal">
      <p class="label">${escapeHtml(f.side)}</p>
      <p class="family__parent">${escapeHtml(f.father)}</p>
      <p class="family__parent">${escapeHtml(f.mother)}</p>
      <p class="family__addr">${escapeHtml(f.address)}</p>
    </div>`;
  // Trai bên trái, gái bên phải (theo truyền thống)
  wrap.innerHTML = card(fam.groom) + `<span class="family__sep" aria-hidden="true"></span>` + card(fam.bride);
}

/* ---------- Render lịch trình sự kiện ---------- */
function renderEvents(events) {
  const wrap = document.getElementById("eventsGrid");
  if (!wrap || !Array.isArray(events)) return;

  wrap.innerHTML = events
    .map((ev) => {
      const dd = formatDMY(ev.date);
      const mapBtn = ev.mapUrl
        ? `<a class="event__map" href="${escapeAttr(ev.mapUrl)}" target="_blank" rel="noopener noreferrer">
             Xem bản đồ <span aria-hidden="true">→</span>
           </a>`
        : "";
      const badge = ev.highlight && ev.badge
        ? `<span class="event__badge">${escapeHtml(ev.badge)}</span>`
        : "";
      return `
      <article class="event reveal${ev.highlight ? " event--highlight" : ""}">
        <div class="event__time">
          <span class="event__hour">${escapeHtml(ev.time || "")}</span>
          <span class="event__dow">${dd.dow}</span>
        </div>
        <div class="event__body">
          ${badge}
          <h3 class="event__title">${escapeHtml(ev.title || "")}</h3>
          <p class="event__date">
            <span>${dd.full}</span>
            ${ev.lunar ? `<span class="event__lunar">(Âm lịch: ${escapeHtml(ev.lunar)})</span>` : ""}
          </p>
          <p class="event__venue">${escapeHtml(ev.venue || "")}</p>
          <p class="event__addr">${escapeHtml(ev.address || "")}</p>
          ${mapBtn}
        </div>
      </article>`;
    })
    .join("");
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
   Timeline progress line
   ========================================================= */
function initTimeline() {
  const track = document.getElementById("timelineTrack");
  const progress = document.getElementById("timelineProgress");
  if (!track || !progress || prefersReducedMotion) return;

  const update = () => {
    const rect = track.getBoundingClientRect();
    const vh = window.innerHeight;
    const total = rect.height;
    const scrolled = Math.min(Math.max(vh * 0.6 - rect.top, 0), total);
    progress.style.height = `${(scrolled / total) * 100}%`;
  };

  update();
  window.addEventListener("scroll", throttle(update, 50), { passive: true });
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
  const triggers = document.querySelectorAll("#galleryGrid .gallery__item");
  if (!lightbox || !triggers.length) return;

  let current = 0;
  let lastFocused = null;

  const show = (index) => {
    current = (index + galleryImages.length) % galleryImages.length;
    lbImage.src = galleryImages[current];
    lbImage.alt = `Khoảnh khắc ${current + 1}`;
  };

  const open = (index) => {
    lastFocused = document.activeElement;
    show(index);
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    btnClose.focus();
  };

  const close = () => {
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    if (lastFocused) lastFocused.focus();
  };

  triggers.forEach((btn, i) =>
    btn.addEventListener("click", () => open(i))
  );
  btnClose.addEventListener("click", close);
  btnPrev.addEventListener("click", () => show(current - 1));
  btnNext.addEventListener("click", () => show(current + 1));
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) close();
  });

  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("is-open")) return;
    if (e.key === "Escape") close();
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
   Background music
   ========================================================= */
function initMusic() {
  const btn = document.getElementById("musicBtn");
  const audio = document.getElementById("bgMusic");
  if (!btn || !audio) return;

  btn.addEventListener("click", () => {
    if (audio.paused) {
      audio
        .play()
        .then(() => {
          btn.classList.add("is-playing");
          btn.setAttribute("aria-pressed", "true");
          btn.setAttribute("aria-label", "Tắt nhạc nền");
        })
        .catch(() => {
          showToast("Chưa có file nhạc — thêm assets/music.mp3");
        });
    } else {
      audio.pause();
      btn.classList.remove("is-playing");
      btn.setAttribute("aria-pressed", "false");
      btn.setAttribute("aria-label", "Bật nhạc nền");
    }
  });
}

/* =========================================================
   Navigation (scroll state + mobile menu)
   ========================================================= */
function initNavigation() {
  const nav = document.getElementById("nav");
  const toggle = document.getElementById("navToggle");
  const menu = document.getElementById("mobileMenu");
  if (!nav) return;

  const onScroll = () => {
    nav.classList.toggle("is-scrolled", window.scrollY > 60);
  };
  onScroll();
  window.addEventListener("scroll", throttle(onScroll, 100), { passive: true });

  if (toggle && menu) {
    const closeMenu = () => {
      menu.classList.remove("is-open");
      toggle.classList.remove("is-open");
      menu.setAttribute("aria-hidden", "true");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Mở menu");
      document.body.style.overflow = "";
    };
    const openMenu = () => {
      menu.classList.add("is-open");
      toggle.classList.add("is-open");
      menu.setAttribute("aria-hidden", "false");
      toggle.setAttribute("aria-expanded", "true");
      toggle.setAttribute("aria-label", "Đóng menu");
      document.body.style.overflow = "hidden";
    };

    toggle.addEventListener("click", () => {
      menu.classList.contains("is-open") ? closeMenu() : openMenu();
    });
    menu.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", closeMenu)
    );
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && menu.classList.contains("is-open")) closeMenu();
    });
  }
}

/* =========================================================
   Parallax (nhẹ)
   ========================================================= */
function initParallax() {
  if (prefersReducedMotion) return;
  const layers = document.querySelectorAll("[data-parallax]");
  if (!layers.length) return;

  let ticking = false;
  const update = () => {
    layers.forEach((layer) => {
      const speed = parseFloat(layer.dataset.parallax) || 0.15;
      const rect = layer.parentElement.getBoundingClientRect();
      const offset = (rect.top + rect.height / 2 - window.innerHeight / 2) * -speed;
      layer.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`;
    });
    ticking = false;
  };

  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    },
    { passive: true }
  );
  update();
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

// Định dạng ngày dương: trả về { full: "12/10/2026", dow: "Thứ Hai" }
const DOW_VI = ["Chủ Nhật", "Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy"];
function formatDMY(iso) {
  const d = new Date(iso + "T00:00:00");
  if (isNaN(d)) return { full: iso || "", dow: "" };
  return {
    full: `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()}`,
    dow: DOW_VI[d.getDay()],
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
  initScrollReveal();
  initTimeline();
  initGallery();
  initLightbox();
  initRSVP();
  initCopyAccount();
  initMusic();
  initNavigation();
  initParallax();
  initCursor();
});
