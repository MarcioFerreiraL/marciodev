"""Gera as capas 1200x630 (usadas no og:image) a partir dos prints em src/assets/projetos.

Uso: python3 scripts/make-covers.py
"""
from pathlib import Path

from PIL import Image, ImageDraw

ASSETS = Path("src/assets/projetos")
BG = "#201D18"  # superfície do tema escuro
W, H = 1200, 630


def load(slug: str, name: str) -> Image.Image:
    return Image.open(ASSETS / slug / f"{name}.webp")


def rounded(im: Image.Image, radius: int) -> Image.Image:
    mask = Image.new("L", im.size, 0)
    ImageDraw.Draw(mask).rounded_rectangle((0, 0, *im.size), radius, fill=255)
    out = im.convert("RGBA")
    out.putalpha(mask)
    return out


def fit_h(im: Image.Image, h: int) -> Image.Image:
    return im.resize((round(im.width * h / im.height), h), Image.LANCZOS)


def phones(shots: list[Image.Image]) -> Image.Image:
    cover = Image.new("RGBA", (W, H), BG)
    shots = [rounded(fit_h(s.crop((0, 0, s.width, min(s.height, round(s.width * 2.05)))), 560), 28) for s in shots]
    total = sum(s.width for s in shots) + 40 * (len(shots) - 1)
    x = (W - total) // 2
    for s in shots:
        cover.alpha_composite(s, (x, 35))
        x += s.width + 40
    return cover


def desktop(shot: Image.Image) -> Image.Image:
    cover = Image.new("RGBA", (W, H), BG)
    shot = shot.resize((1080, round(shot.height * 1080 / shot.width)), Image.LANCZOS).crop((0, 0, 1080, 570))
    cover.alpha_composite(rounded(shot, 18), (60, 30))
    return cover


def save(im: Image.Image, slug: str) -> None:
    im.convert("RGB").save(ASSETS / slug / "cover.webp", "WEBP", quality=86)


save(phones([load("clinics", "inicio"), load("clinics", "comparacao")]), "clinics")
save(desktop(load("barbearia", "desktop")), "barbearia")
save(desktop(load("assistencia-tecnica", "tecnico")), "assistencia-tecnica")
save(phones([load("urbansense", "painel"), load("urbansense", "configuracoes")]), "urbansense")
