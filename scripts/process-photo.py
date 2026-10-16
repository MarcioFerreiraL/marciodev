"""Recorta a foto em cabeça e ombros e remove o fundo localmente (rembg).

Uso: ~/.venvs/rembg/bin/python scripts/process-photo.py <entrada> <saida.png>
O fundo vira transparente; a cor do tema é aplicada por CSS no site.
"""
import sys

from PIL import Image
from rembg import new_session, remove

# Caixa (esquerda, topo, direita, base) em proporção da imagem original, ajustada à foto de 2000x2000.
CROP = (0.17, 0.03, 0.80, 0.66)
SIZE = 800


def main(src: str, dst: str) -> None:
    im = Image.open(src).convert("RGB")
    w, h = im.size
    box = (int(CROP[0] * w), int(CROP[1] * h), int(CROP[2] * w), int(CROP[3] * h))
    cut = remove(im.crop(box), session=new_session("u2net_human_seg"), alpha_matting=True)
    cut.resize((SIZE, SIZE), Image.LANCZOS).save(dst, optimize=True)


if __name__ == "__main__":
    main(sys.argv[1], sys.argv[2])
