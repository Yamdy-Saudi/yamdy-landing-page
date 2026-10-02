"""Deterministic social artwork and icons from the supplied logo and licensed font.
Run with Python, Pillow, fonttools and brotli after npm install.
"""
from pathlib import Path
from io import BytesIO
from PIL import Image, ImageDraw, ImageFont
from fontTools.ttLib import TTFont

ROOT = Path(__file__).resolve().parent.parent
font = TTFont(ROOT / 'node_modules/@fontsource/montserrat/files/montserrat-latin-600-normal.woff2')
font.flavor = None
buffer = BytesIO()
font.save(buffer)
def typeface(size):
    return ImageFont.truetype(BytesIO(buffer.getvalue()), size)

green, cream, dark = '#258948', '#f9e6c9', '#176136'
art = Image.new('RGB', (1200, 630), cream)
draw = ImageDraw.Draw(art)
draw.rounded_rectangle((790, -70, 1370, 700), radius=230, fill=green)
for i in range(3):
    x, y = 825 + i * 93, 200 - (i % 2) * 48
    draw.arc((x, y, x + 145, y + 160), 180, 360, fill=cream, width=29)
    draw.rectangle((x, y+80, x+28, y+200), fill=cream)
    draw.rectangle((x+117, y+80, x+145, y+200), fill=cream)
draw.rectangle((809, 396, 1183, 424), fill=cream)
draw.ellipse((1060, 132, 1086, 158), outline=cream, width=7)
logo = Image.open(ROOT / 'public/brand/yamdy-logo.png').convert('RGB')
# Preserve the logo's shape and original color; white pixels receive the artwork's paper color.
logo = logo.resize((216, 96), Image.Resampling.LANCZOS)
mask = logo.convert('L').point(lambda value: 255 if value < 245 else 0)
art.paste(logo, (58, 38), mask)
for line, y in [('The growth brain', 191), ('for restaurants', 265), ('on delivery apps.', 339)]:
    draw.text((62, y), line, font=typeface(55), fill=dark)
draw.line([(64, 252), (320, 248), (593, 253)], fill=green, width=3)
draw.text((65, 534), 'Starting with HungerStation.  /  yamdy.net', font=typeface(19), fill=dark)
art.save(ROOT / 'public/og-yamdy.png', optimize=True)
icon = Image.new('RGB', (256, 256), cream)
icon.paste(logo, (20, 80), mask)
icon.save(ROOT / 'public/favicon.ico', sizes=[(16,16),(32,32),(48,48),(64,64)])
icon.resize((180,180), Image.Resampling.LANCZOS).save(ROOT / 'public/apple-touch-icon.png')
print('Generated social preview, favicon and Apple touch icon.')
