#!/usr/bin/env python3
"""Sinh ảnh OG preview 1200x630 cho share mạng xã hội (Messenger/Zalo/FB).

Bố cục: ảnh cưới (hero) phủ nền + lớp phủ tối gradient + panel chữ thanh lịch.
Chuẩn Open Graph: 1200x630 (1.91:1), JPEG nén để < 300KB.

Chạy:  python3 assets/generate-og-share.py
Ảnh ra: assets/og-share.jpg
"""
from PIL import Image, ImageDraw, ImageFont, ImageFilter, ImageEnhance
from pathlib import Path

ROOT = Path(__file__).resolve().parent
SRC = ROOT / "hero.jpg"
OUT = ROOT / "og-share.jpg"

# Font: ưu tiên font trong repo, fallback DejaVu Serif (đều render tiếng Việt).
FONT_DIRS = [str(ROOT / "fonts"), "/tmp/og-fonts", "/usr/share/fonts/truetype/dejavu"]

def load_font(candidates, size):
    for name in candidates:
        for d in FONT_DIRS:
            p = Path(d) / name
            if p.exists():
                return ImageFont.truetype(str(p), size)
    # fallback tuyệt đối
    return ImageFont.truetype(
        "/usr/share/fonts/truetype/dejavu/DejaVuSerif-Bold.ttf", size
    )

W, H = 1200, 630
COUPLE = "Đặng Long & Lê Hoài"
SUB = "T r â n   t r ọ n g   k í n h   m ờ i"
DATE = "11 . 10 . 2026"

# ---- 1. Nền: crop ảnh cưới về khung ngang, lấy vùng chủ thể (giữa-trên) ----
src = Image.open(SRC).convert("RGB")
sw, sh = src.size
target_ratio = W / H
# crop theo chiều cao, giữ vùng y từ ~22% để lấy mặt/thân trên
crop_h = int(sw / target_ratio)
if crop_h > sh:
    crop_w = int(sh * target_ratio)
    x0 = (sw - crop_w) // 2
    box = (x0, 0, x0 + crop_w, sh)
else:
    y0 = int(sh * 0.18)
    if y0 + crop_h > sh:
        y0 = sh - crop_h
    box = (0, y0, sw, y0 + crop_h)
bg = src.crop(box).resize((W, H), Image.LANCZOS)
# tăng nhẹ độ sâu màu cho cinematic
bg = ImageEnhance.Color(bg).enhance(1.05)
bg = ImageEnhance.Contrast(bg).enhance(1.03)

# ---- 2. Lớp phủ gradient tối từ dưới lên + vignette nhẹ để chữ nổi ----
overlay = Image.new("L", (W, H), 0)
od = overlay.load()
for y in range(H):
    # tối đậm ở đáy, nhạt dần lên trên
    t = y / H
    alpha = int(200 * (t ** 1.6))  # 0 -> ~200
    for x in range(W):
        od[x, y] = alpha
dark = Image.new("RGB", (W, H), (14, 12, 18))
bg = Image.composite(dark, bg, overlay)

# viền tối nhẹ 4 cạnh (vignette)
vig = Image.new("L", (W, H), 0)
vd = ImageDraw.Draw(vig)
margin = 90
vd.rectangle([margin, margin, W - margin, H - margin], fill=255)
vig = vig.filter(ImageFilter.GaussianBlur(120))
bg = Image.composite(bg, Image.eval(bg, lambda p: int(p * 0.72)), vig)

draw = ImageDraw.Draw(bg)

GOLD = (211, 178, 121)
CREAM = (247, 242, 234)

def center_text(y, text, font, fill, letter=0):
    if letter:
        # giãn chữ thủ công
        widths = [draw.textlength(c, font=font) for c in text]
        total = sum(widths) + letter * (len(text) - 1)
        x = (W - total) / 2
        for c, wch in zip(text, widths):
            draw.text((x, y), c, font=font, fill=fill)
            x += wch + letter
    else:
        w = draw.textlength(text, font=font)
        draw.text(((W - w) / 2, y), text, font=font, fill=fill)

# ---- 3. Chữ ----
f_sub = load_font(["PlayfairDisplay.ttf", "DejaVuSerif.ttf"], 30)
f_name = load_font(["GreatVibes.ttf", "PlayfairDisplay.ttf"], 92)
f_date = load_font(["PlayfairDisplay.ttf", "DejaVuSerif-Bold.ttf"], 40)

# đường kẻ mảnh trang trí
def deco_line(y, half=190):
    cx = W // 2
    draw.line([(cx - half, y), (cx - 30, y)], fill=GOLD, width=2)
    draw.line([(cx + 30, y), (cx + half, y)], fill=GOLD, width=2)
    r = 4
    draw.ellipse([cx - r, y - r, cx + r, y + r], fill=GOLD)

center_text(322, SUB, f_sub, CREAM)
center_text(360, COUPLE, f_name, CREAM)  # tên bằng script font
deco_line(492)
center_text(508, DATE, f_date, GOLD, letter=2)

# ---- 4. Xuất JPEG nén < 300KB ----
q = 88
while q >= 60:
    bg.save(OUT, "JPEG", quality=q, optimize=True, progressive=True)
    size_kb = OUT.stat().st_size / 1024
    if size_kb <= 300:
        break
    q -= 4
print(f"OK -> {OUT}  ({size_kb:.0f} KB, quality={q}, {W}x{H})")
