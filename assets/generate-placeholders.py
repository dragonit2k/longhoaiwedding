#!/usr/bin/env python3
"""Sinh ảnh placeholder SVG tông warm-nude luxury cho thiệp cưới.

Chạy:  python3 assets/generate-placeholders.py

Thay ảnh thật: bỏ ảnh .jpg vào /assets/ cùng tên (vd hero.jpg), rồi trong
index.html / script.js đổi đường dẫn từ .svg -> .jpg. Xem README.md.
"""
import os

DIR = os.path.dirname(os.path.abspath(__file__))

# name, label, color-top, color-bottom, width, height, plain
# plain=True  -> ảnh nền có chữ overlay đè lên (hero/countdown/final): KHÔNG vẽ
#                monogram/label ở giữa, chỉ để gradient + hoa văn góc cho sạch.
PLACEHOLDERS = [
    ("hero",         "HERO",           "#C9B39A", "#9B7B5B", 1600, 2000, True),
    ("bride-groom",  "COUPLE",         "#EFE7DE", "#C9B39A", 1200, 1500, False),
    ("gallery-01",   "MOMENT 01",      "#C9B39A", "#A98B68", 1000, 1300, False),
    ("gallery-02",   "MOMENT 02",      "#D8C6B0", "#9B7B5B", 1000,  750, False),
    ("gallery-03",   "MOMENT 03",      "#B99A78", "#8A6C4E", 1000,  750, False),
    ("gallery-04",   "MOMENT 04",      "#E3D6C6", "#B79A78", 1000,  750, False),
    ("gallery-05",   "MOMENT 05",      "#CBB79C", "#9B7B5B", 1000, 1000, False),
    ("gallery-06",   "MOMENT 06",      "#9B7B5B", "#6E5540", 1600,  900, False),
    ("countdown-bg", "SAVE THE DATE",  "#8A6C4E", "#4A3928", 1600, 1000, True),
    ("final",        "THANK YOU",      "#9B7B5B", "#4A3928", 1600, 2000, True),
    ("wedding-map",  "MAP",            "#EFE7DE", "#C9B39A", 1200,  800, False),
]

SVG_HEAD = """<svg xmlns="http://www.w3.org/2000/svg" width="{w}" height="{h}" viewBox="0 0 {w} {h}" role="img" aria-label="{label}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="{c1}"/>
      <stop offset="1" stop-color="{c2}"/>
    </linearGradient>
    <radialGradient id="v" cx="0.5" cy="0.42" r="0.78">
      <stop offset="0.5" stop-color="#000000" stop-opacity="0"/>
      <stop offset="1" stop-color="#000000" stop-opacity="0.30"/>
    </radialGradient>
  </defs>
  <rect width="{w}" height="{h}" fill="url(#g)"/>
  <rect width="{w}" height="{h}" fill="url(#v)"/>
"""

# Monogram + label ở giữa (chỉ dùng cho ảnh không có overlay chữ)
SVG_CENTER = """  <g fill="none" stroke="#FFFFFF" stroke-opacity="0.5">
    <line x1="{lx1}" y1="{ly1}" x2="{lx2}" y2="{ly1}" stroke-width="1"/>
    <line x1="{lx1}" y1="{ly2}" x2="{lx2}" y2="{ly2}" stroke-width="1"/>
  </g>
  <text x="50%" y="{cy}" text-anchor="middle" dominant-baseline="middle"
        font-family="Cormorant Infant, Georgia, serif" font-size="{fs}" letter-spacing="6"
        fill="#FFFFFF" fill-opacity="0.92" font-style="italic">L &amp; M</text>
  <text x="50%" y="{ly}" text-anchor="middle" dominant-baseline="middle"
        font-family="Montserrat, Arial, sans-serif" font-size="{fs2}" letter-spacing="4"
        fill="#FFFFFF" fill-opacity="0.7">{label}</text>
"""

# Hoa văn góc tối giản (dùng cho ảnh nền có overlay chữ)
SVG_CORNERS = """  <g fill="none" stroke="#FFFFFF" stroke-opacity="0.35" stroke-width="1">
    <path d="M{m} {m} h{c} M{m} {m} v{c}"/>
    <path d="M{rx} {m} h-{c} M{rx} {m} v{c}"/>
    <path d="M{m} {by} h{c} M{m} {by} v-{c}"/>
    <path d="M{rx} {by} h-{c} M{rx} {by} v-{c}"/>
  </g>
"""


def build(name, label, c1, c2, w, h, plain):
    cx, cy = w // 2, h // 2
    fs = max(34, min(w, h) // 22)
    fs2 = max(11, fs // 3)
    span = min(w, h) // 6
    svg = SVG_HEAD.format(w=w, h=h, label=label, c1=c1, c2=c2)
    if plain:
        m = max(40, min(w, h) // 20)
        svg += SVG_CORNERS.format(m=m, rx=w - m, by=h - m, c=min(w, h) // 12)
    else:
        svg += SVG_CENTER.format(
            label=label,
            lx1=cx - span, lx2=cx + span,
            ly1=cy - int(fs * 1.05), ly2=cy + int(fs * 1.15),
            cy=cy - fs // 3, ly=cy + int(fs * 0.75),
            fs=fs, fs2=fs2,
        )
    svg += "</svg>\n"
    path = os.path.join(DIR, name + ".svg")
    with open(path, "w", encoding="utf-8") as f:
        f.write(svg)
    print("  ok ", name + ".svg")


if __name__ == "__main__":
    print("Sinh placeholder trong", DIR)
    for p in PLACEHOLDERS:
        build(*p)
    print("Xong.")
