"""Monta capas 1200x630 e imagens de galeria (WebP) a partir dos prints em .superpowers/shots.

Uso: ~/.venvs/rembg/bin/python scripts/make-covers.py
"""
from pathlib import Path

from PIL import Image, ImageDraw

SHOTS = Path(".superpowers/shots")
ASSETS = Path("src/assets/projetos")
BG = "#201D18"  # superfície do tema escuro
W, H = 1200, 630


def rounded(im: Image.Image, radius: int) -> Image.Image:
    mask = Image.new("L", im.size, 0)
    ImageDraw.Draw(mask).rounded_rectangle((0, 0, *im.size), radius, fill=255)
    out = im.convert("RGBA")
    out.putalpha(mask)
    return out


def fit_h(im: Image.Image, h: int) -> Image.Image:
    return im.resize((round(im.width * h / im.height), h), Image.LANCZOS)


def phones(names: list[str]) -> Image.Image:
    cover = Image.new("RGBA", (W, H), BG)
    shots = [rounded(fit_h(Image.open(SHOTS / f"{n}.png"), 560), 28) for n in names]
    total = sum(s.width for s in shots) + 40 * (len(shots) - 1)
    x = (W - total) // 2
    for s in shots:
        cover.alpha_composite(s, (x, 35))
        x += s.width + 40
    return cover


def desktop(name: str) -> Image.Image:
    cover = Image.new("RGBA", (W, H), BG)
    shot = Image.open(SHOTS / f"{name}.png")
    shot = rounded(shot.resize((1080, round(shot.height * 1080 / shot.width)), Image.LANCZOS).crop((0, 0, 1080, 570)), 18)
    cover.alpha_composite(shot, (60, 30))
    return cover


def save(im: Image.Image, slug: str, name: str) -> None:
    (ASSETS / slug).mkdir(parents=True, exist_ok=True)
    im.convert("RGB").save(ASSETS / slug / f"{name}.webp", "WEBP", quality=86)


save(phones(["clinics-inicio", "clinics-comparacao"]), "clinics", "cover")
save(desktop("barbearia-desktop"), "barbearia", "cover")
for n in ["clinics-landing", "clinics-app", "clinics-inicio", "clinics-comparacao"]:
    save(Image.open(SHOTS / f"{n}.png"), "clinics", n.removeprefix("clinics-"))
for n in ["barbearia-desktop", "barbearia-mobile"]:
    save(Image.open(SHOTS / f"{n}.png"), "barbearia", n.removeprefix("barbearia-"))
