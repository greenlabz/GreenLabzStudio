import math
from pathlib import Path
from shutil import copyfile

from reportlab.lib.colors import HexColor
from reportlab.lib.pagesizes import A4
from reportlab.lib.utils import ImageReader
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "output" / "pdf" / "greenlabz-website-analyse.pdf"
PUBLIC = ROOT / "public" / "downloads" / "greenlabz-website-analyse.pdf"
COVER_IMAGE = ROOT / "public" / "downloads" / "assets" / "website-analyse-cover-v1.png"
BOOKING_URL = "https://cal.com/green-labz-uufryt/discoverycall"
WIDTH, HEIGHT = A4
BG = HexColor("#020504")
PANEL = HexColor("#040806")
PANEL_LIGHT = HexColor("#08130F")
GREEN = HexColor("#00CC6A")
GREEN_DARK = HexColor("#073829")
WHITE = HexColor("#F4F7F5")
MUTED = HexColor("#A9B4AE")
LINE = HexColor("#1B5D44")


pdfmetrics.registerFont(TTFont("GreenLabz", r"C:\Windows\Fonts\segoeui.ttf"))
pdfmetrics.registerFont(TTFont("GreenLabz-Bold", r"C:\Windows\Fonts\segoeuib.ttf"))
pdfmetrics.registerFont(TTFont("GreenLabz-Italic", r"C:\Windows\Fonts\segoeuii.ttf"))
pdfmetrics.registerFont(TTFont("GreenLabz-Mono", r"C:\Windows\Fonts\consolab.ttf"))


def wrapped_lines(text, font, size, max_width):
    words = text.split()
    lines = []
    current = ""
    for word in words:
        candidate = f"{current} {word}".strip()
        if pdfmetrics.stringWidth(candidate, font, size) <= max_width:
            current = candidate
        else:
            if current:
                lines.append(current)
            current = word
    if current:
        lines.append(current)
    return lines


def draw_text(c, text, x, y, max_width, font="GreenLabz", size=12, color=WHITE, leading=None):
    leading = leading or size * 1.45
    c.setFont(font, size)
    c.setFillColor(color)
    for line in wrapped_lines(text, font, size, max_width):
        c.drawString(x, y, line)
        y -= leading
    return y


def draw_gloss_card(c, x, y, width, height, radius=22, glow=0.14):
    c.saveState()
    c.setFillColor(HexColor("#00170C"))
    c.roundRect(x - 3, y - 3, width + 6, height + 6, radius + 3, fill=1, stroke=0)
    c.setFillColor(PANEL)
    c.roundRect(x, y, width, height, radius, fill=1, stroke=0)
    clip = c.beginPath()
    clip.roundRect(x, y, width, height, radius)
    c.clipPath(clip, stroke=0, fill=0)
    c.radialGradient(
        x + width * 0.78,
        y + height,
        width * 0.58,
        [HexColor("#0A3B27"), HexColor("#061D14"), PANEL],
        positions=[0, 0.42, 1],
        extend=False,
    )
    c.radialGradient(
        x + width * 0.12,
        y + height,
        width * 0.4,
        [HexColor("#18201D"), HexColor("#0B100E"), PANEL],
        positions=[0, 0.38, 1],
        extend=False,
    )
    c.setFillColor(HexColor("#13251D"))
    for dot_x in range(int(x + width * 0.58), int(x + width - 18), 18):
        for dot_y in range(int(y + height - 110), int(y + height - 20), 18):
            c.circle(dot_x, dot_y, 0.7, fill=1, stroke=0)
    c.restoreState()
    c.saveState()
    c.setStrokeColor(HexColor("#1B6A49"))
    c.setLineWidth(0.75)
    c.roundRect(x, y, width, height, radius, fill=0, stroke=1)
    c.setStrokeColor(HexColor("#26362F"))
    c.line(x + radius, y + height - 1, x + width - radius, y + height - 1)
    c.restoreState()


def draw_site_cta(c, x, y, width, height, label, url):
    radius = height / 2
    c.saveState()
    c.setFillColor(HexColor("#002514"))
    c.roundRect(x - 3, y - 3, width + 6, height + 6, radius + 3, fill=1, stroke=0)
    c.setFillColor(HexColor("#050807"))
    c.roundRect(x, y, width, height, radius, fill=1, stroke=0)
    clip = c.beginPath()
    clip.roundRect(x, y, width, height, radius)
    c.clipPath(clip, stroke=0, fill=0)
    c.radialGradient(
        x + width / 2,
        y + height,
        width * 0.48,
        [HexColor("#0B3524"), HexColor("#07150F"), HexColor("#050807")],
        positions=[0, 0.38, 1],
        extend=False,
    )
    c.setFillColor(HexColor("#1A2922"))
    for dot_x in range(int(x + 18), int(x + width - 18), 18):
        for dot_y in range(int(y + 12), int(y + height - 8), 16):
            c.circle(dot_x, dot_y, 0.55, fill=1, stroke=0)
    c.restoreState()
    c.saveState()
    c.setStrokeColor(HexColor("#247A55"))
    c.setLineWidth(0.8)
    c.roundRect(x, y, width, height, radius, fill=0, stroke=1)
    c.setStrokeColor(HexColor("#293A33"))
    c.line(x + radius, y + height - 1, x + width - radius, y + height - 1)
    c.setStrokeColor(GREEN)
    c.line(x + width * 0.34, y + 1, x + width * 0.66, y + 1)
    c.setFillColor(GREEN)
    c.circle(x + 23, y + height / 2, 3.3, fill=1, stroke=0)
    c.setFillColor(WHITE)
    c.setFont("GreenLabz-Mono", 9.6)
    c.drawCentredString(x + width / 2 - 4, y + height / 2 - 3.5, label)
    arrow_x = x + width - 27
    arrow_y = y + height / 2
    c.setStrokeColor(WHITE)
    c.setLineWidth(1.2)
    c.line(arrow_x - 8, arrow_y, arrow_x + 1, arrow_y)
    c.line(arrow_x + 1, arrow_y, arrow_x - 3, arrow_y + 4)
    c.line(arrow_x + 1, arrow_y, arrow_x - 3, arrow_y - 4)
    c.restoreState()
    c.linkURL(url, (x, y, x + width, y + height), relative=0)


def draw_background(c):
    c.setFillColor(BG)
    c.rect(0, 0, WIDTH, HEIGHT, fill=1, stroke=0)
    draw_gloss_card(c, 20, 20, WIDTH - 40, HEIGHT - 40, 22, 0.11)


def draw_footer(c, page):
    c.setStrokeColor(LINE)
    c.setLineWidth(0.7)
    c.line(52, 49, WIDTH - 52, 49)
    c.setFillColor(MUTED)
    c.setFont("GreenLabz", 7.8)
    c.drawString(52, 29, "GREENLABZ STUDIO  /  WEBSITE-ANALYSE")
    c.drawRightString(WIDTH - 52, 29, f"{page:02d}")


def draw_label(c, text):
    c.setFillColor(GREEN)
    c.setFont("GreenLabz-Bold", 8.5)
    c.drawString(52, HEIGHT - 76, f"[ {text.upper()} ]")


def draw_arrow(c, x1, y, x2):
    c.setStrokeColor(GREEN)
    c.setLineWidth(1.3)
    c.line(x1, y, x2, y)
    c.line(x2, y, x2 - 5, y + 4)
    c.line(x2, y, x2 - 5, y - 4)


def draw_browser(c, x, y, width, height):
    c.setFillColor(HexColor("#050A08"))
    c.setStrokeColor(HexColor("#1B6A49"))
    c.setLineWidth(0.8)
    c.roundRect(x, y, width, height, 6, fill=1, stroke=1)
    c.setStrokeColor(HexColor("#26362F"))
    c.line(x, y + height - 12, x + width, y + height - 12)
    for offset in (8, 14, 20):
        c.setFillColor(GREEN if offset == 8 else MUTED)
        c.circle(x + offset, y + height - 6, 1.4, fill=1, stroke=0)
    c.setStrokeColor(WHITE)
    c.setLineWidth(2.2)
    c.line(x + 11, y + height - 25, x + width * 0.68, y + height - 25)
    c.setStrokeColor(MUTED)
    c.setLineWidth(1.2)
    c.line(x + 11, y + height - 34, x + width * 0.8, y + height - 34)
    c.setFillColor(GREEN)
    c.roundRect(x + 11, y + 7, width * 0.42, 8, 4, fill=1, stroke=0)


def draw_check_badge(c, x, y, radius=17):
    c.setFillColor(HexColor("#06150F"))
    c.setStrokeColor(GREEN)
    c.setLineWidth(1.6)
    c.circle(x, y, radius, fill=1, stroke=1)
    c.setStrokeColor(GREEN)
    c.setLineWidth(2)
    c.line(x - 7, y, x - 2, y - 5)
    c.line(x - 2, y - 5, x + 8, y + 7)


def draw_message(c, x, y, width, height):
    c.setFillColor(HexColor("#06150F"))
    c.setStrokeColor(HexColor("#1B6A49"))
    c.setLineWidth(0.8)
    c.roundRect(x, y, width, height, 10, fill=1, stroke=1)
    tail = c.beginPath()
    tail.moveTo(x + 16, y)
    tail.lineTo(x + 11, y - 7)
    tail.lineTo(x + 27, y)
    tail.close()
    c.drawPath(tail, fill=1, stroke=1)
    c.setStrokeColor(WHITE)
    c.setLineWidth(1.8)
    c.line(x + 14, y + height - 15, x + width - 17, y + height - 15)
    c.setStrokeColor(MUTED)
    c.setLineWidth(1.1)
    c.line(x + 14, y + height - 25, x + width - 30, y + height - 25)


def draw_star(c, cx, cy, radius):
    path = c.beginPath()
    for index in range(10):
        angle = math.radians(90 + index * 36)
        point_radius = radius if index % 2 == 0 else radius * 0.42
        x = cx + math.cos(angle) * point_radius
        y = cy + math.sin(angle) * point_radius
        if index == 0:
            path.moveTo(x, y)
        else:
            path.lineTo(x, y)
    path.close()
    c.drawPath(path, fill=1, stroke=0)


def draw_overview_graphic(c):
    draw_browser(c, 92, 307, 88, 54)
    draw_arrow(c, 190, 334, 225)
    c.setStrokeColor(GREEN)
    c.setLineWidth(2)
    c.circle(259, 337, 14, fill=0, stroke=1)
    c.line(269, 327, 281, 315)
    draw_arrow(c, 291, 334, 329)
    draw_message(c, 342, 308, 92, 49)
    c.setFillColor(MUTED)
    c.setFont("GreenLabz-Mono", 7.2)
    c.drawCentredString(136, 294, "WEBSITE")
    c.drawCentredString(260, 294, "SUCHE")
    c.drawCentredString(388, 294, "ANFRAGE")


def draw_word_node(c, x, y, number, words, radius=30):
    c.setFillColor(HexColor("#03100B"))
    c.setStrokeColor(GREEN)
    c.setLineWidth(1.15)
    c.circle(x, y, radius, fill=1, stroke=1)
    c.setFillColor(GREEN)
    c.setFont("GreenLabz-Mono", 5.8)
    c.drawCentredString(x, y + radius - 11, number)
    lines = words.split("\n")
    start_y = y + (len(lines) - 1) * 4.5
    c.setFillColor(WHITE)
    c.setFont("GreenLabz-Mono", 7.2 if len(max(lines, key=len)) < 10 else 6.2)
    for index, line in enumerate(lines):
        c.drawCentredString(x, start_y - index * 10, line)
    c.setFillColor(GREEN)
    c.circle(x, y - radius + 8, 1.7, fill=1, stroke=0)


def draw_flow_caption(c, x, y, text):
    c.setFillColor(MUTED)
    c.setFont("GreenLabz-Mono", 6.2)
    c.drawCentredString(x, y, text)


def draw_clarity_graphic(c):
    draw_word_node(c, 125, 265, "01", "3 SEK.")
    draw_arrow(c, 160, 265, 259)
    draw_word_node(c, 297, 265, "02", "KLAR")
    draw_arrow(c, 332, 265, 431)
    draw_word_node(c, 469, 265, "03", "VERSTANDEN")
    draw_flow_caption(c, 125, 225, "ERSTER BLICK")
    draw_flow_caption(c, 297, 225, "ANGEBOT")
    draw_flow_caption(c, 469, 225, "NÄCHSTER SCHRITT")


def draw_visibility_graphic(c):
    draw_word_node(c, 125, 265, "01", "LEISTUNG\n+ ORT")
    draw_arrow(c, 160, 265, 259)
    draw_word_node(c, 297, 265, "02", "GEFUNDEN")
    draw_arrow(c, 332, 265, 431)
    draw_word_node(c, 469, 265, "03", "BESUCH")
    draw_flow_caption(c, 125, 225, "SUCHSIGNAL")
    draw_flow_caption(c, 297, 225, "SICHTBARKEIT")
    draw_flow_caption(c, 469, 225, "RICHTIGE SEITE")


def draw_trust_graphic(c):
    draw_word_node(c, 125, 265, "01", "ECHTE\nBELEGE")
    draw_arrow(c, 160, 265, 259)
    draw_word_node(c, 297, 265, "02", "VERTRAUEN")
    draw_arrow(c, 332, 265, 431)
    draw_word_node(c, 469, 265, "03", "ANFRAGE")
    draw_flow_caption(c, 125, 225, "ZEIGEN")
    draw_flow_caption(c, 297, 225, "ENTSTEHT")
    draw_flow_caption(c, 469, 225, "WIRD LEICHTER")


def draw_next_step_graphic(c):
    draw_word_node(c, 105, 533, "01", "KLAR", 27)
    draw_arrow(c, 137, 533, 171)
    draw_word_node(c, 203, 533, "02", "SICHTBAR", 27)
    draw_arrow(c, 235, 533, 269)
    draw_word_node(c, 301, 533, "03", "VERTRAUEN", 27)
    draw_arrow(c, 333, 533, 377)
    draw_word_node(c, 423, 533, "04", "25 MIN\nPLAN", 38)


def draw_checklist(c, items, start_y):
    y = start_y
    for item in items:
        c.setStrokeColor(GREEN)
        c.setLineWidth(1.8)
        c.circle(65, y + 3, 7, fill=0, stroke=1)
        y = draw_text(c, item, 88, y, WIDTH - 140, "GreenLabz-Bold", 11.2, WHITE, 15.5) - 23
    return y


def draw_tip(c, title, text):
    draw_gloss_card(c, 52, 84, WIDTH - 104, 132, 16, 0.11)
    c.setFillColor(GREEN)
    c.setFont("GreenLabz-Bold", 15)
    c.drawString(78, 176, title)
    draw_text(c, text, 78, 145, WIDTH - 156, "GreenLabz", 10.2, MUTED, 14.5)


def checklist_page(c, page, number, title, question, items, graphic, tip_title, tip_text):
    draw_background(c)
    draw_label(c, f"{number} / Website-Analyse")
    c.setFillColor(WHITE)
    c.setFont("GreenLabz-Bold", 26)
    c.drawString(52, HEIGHT - 139, number)
    c.drawString(104, HEIGHT - 139, title)
    c.setFillColor(GREEN)
    c.setFont("GreenLabz-Italic", 18)
    c.drawString(52, HEIGHT - 190, question)
    draw_checklist(c, items, HEIGHT - 270)
    graphic(c)
    draw_tip(c, tip_title, tip_text)
    draw_footer(c, page)
    c.showPage()


def cover_page(c):
    draw_background(c)
    image = ImageReader(str(COVER_IMAGE))
    image_width, image_height = image.getSize()
    x, y, width, height = 34, 34, WIDTH - 68, HEIGHT - 68
    scale = max(width / image_width, height / image_height)
    draw_width = image_width * scale
    draw_height = image_height * scale
    c.saveState()
    clip = c.beginPath()
    clip.roundRect(x, y, width, height, 22)
    c.clipPath(clip, stroke=0)
    c.drawImage(
        image,
        x + (width - draw_width) / 2,
        y + (height - draw_height) / 2,
        draw_width,
        draw_height,
        mask="auto",
    )
    c.setFillColor(BG)
    c.setFillAlpha(0.28)
    c.rect(x, 520, width, HEIGHT - 554, fill=1, stroke=0)
    fade_steps = 30
    fade_bottom = 425
    fade_height = 95
    for step in range(fade_steps):
        step_height = fade_height / fade_steps
        c.setFillAlpha(0.28 * (step + 1) / fade_steps)
        c.rect(
            x,
            fade_bottom + step * step_height,
            width,
            step_height + 0.5,
            fill=1,
            stroke=0,
        )
    c.restoreState()
    draw_label(c, "GreenLabz Studio / Quick Check")
    c.setFillColor(WHITE)
    c.setFont("GreenLabz-Bold", 38)
    c.drawString(52, HEIGHT - 190, "Website-Analyse")
    c.setFillColor(GREEN)
    c.setFont("GreenLabz-Italic", 19)
    c.drawString(52, HEIGHT - 232, "für inhabergeführte Betriebe")
    draw_text(
        c,
        "Prüfe in wenigen Minuten, ob deine Website Vertrauen schafft, gefunden wird und den nächsten Schritt klar macht.",
        52,
        HEIGHT - 282,
        365,
        "GreenLabz-Bold",
        11,
        WHITE,
        16,
    )
    c.setFillColor(GREEN)
    c.setFont("GreenLabz-Mono", 8)
    c.drawString(52, HEIGHT - 348, "15 PUNKTE  /  3 BEREICHE  /  1 KLARER NÄCHSTER SCHRITT")
    draw_footer(c, 1)
    c.showPage()


def cta_page(c):
    draw_background(c)
    draw_label(c, "Nächster Schritt")
    c.setFillColor(WHITE)
    c.setFont("GreenLabz-Bold", 30)
    c.drawString(52, HEIGHT - 158, "Du weißt jetzt,")
    c.setFillColor(GREEN)
    c.drawString(52, HEIGHT - 198, "wo es hakt.")
    draw_text(
        c,
        "Markiere die drei Punkte, die du zuerst verbessern willst. Damit hast du eine klare Prioritätenliste statt einer endlosen Baustelle.",
        52,
        HEIGHT - 254,
        WIDTH - 104,
        "GreenLabz",
        11.5,
        MUTED,
        17,
    )
    draw_next_step_graphic(c)
    outcomes = [
        "Welche drei Änderungen zuerst Wirkung bringen",
        "Was du selbst lösen kannst und wo Unterstützung Sinn ergibt",
        "Ob Relaunch, SEO oder laufende Begleitung der richtige Schritt ist",
    ]
    y = HEIGHT - 382
    for outcome in outcomes:
        c.setFillColor(GREEN)
        c.circle(61, y + 3, 4, fill=1, stroke=0)
        draw_text(c, outcome, 78, y, WIDTH - 130, "GreenLabz-Bold", 10.5, WHITE, 15)
        y -= 42
    draw_gloss_card(c, 52, 126, WIDTH - 104, 206, 18, 0.13)
    c.setFillColor(GREEN)
    c.setFont("GreenLabz-Bold", 9)
    c.drawString(80, 296, "25 MINUTEN. KLARE PRIORITÄTEN.")
    draw_text(
        c,
        "25 Minuten deiner Zeit gegen Klarheit, welche drei Änderungen zuerst Wirkung bringen. Kein Verkaufstheater. Keine Verpflichtung.",
        80,
        263,
        WIDTH - 160,
        "GreenLabz-Bold",
        13.5,
        WHITE,
        19,
    )
    button_x = 80
    button_y = 163
    button_w = WIDTH - 160
    button_h = 52
    draw_site_cta(c, button_x, button_y, button_w, button_h, "KOSTENLOSES ERSTGESPRÄCH BUCHEN", BOOKING_URL)
    c.setFillColor(MUTED)
    c.setFont("GreenLabz", 7.5)
    c.drawCentredString(WIDTH / 2, 143, BOOKING_URL)
    draw_footer(c, 5)
    c.showPage()


def build_pdf():
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    PUBLIC.parent.mkdir(parents=True, exist_ok=True)
    c = canvas.Canvas(str(OUTPUT), pagesize=A4)
    c.setTitle("GreenLabz Studio Website-Analyse")
    c.setAuthor("GreenLabz Studio")
    c.setSubject("Website-Analyse für inhabergeführte Betriebe")
    cover_page(c)
    checklist_page(
        c,
        2,
        "01",
        "Klarheit",
        "Versteht man dein Angebot?",
        [
            "In drei Sekunden ist klar, was du anbietest.",
            "Die richtigen Kunden erkennen sich direkt wieder.",
            "Dein wichtigster Nutzen steht vor deiner Firmenstory.",
            "Jede Seite führt zu einem nächsten sinnvollen Schritt.",
            "Leistungen sind konkret statt mit Fachbegriffen beschrieben.",
            "Kontakt und Standort sind ohne Suche erreichbar.",
        ],
        draw_clarity_graphic,
        "Wenn du hier stockst",
        "Dann braucht deine Startseite wahrscheinlich weniger Text und mehr Führung: Angebot, Vertrauen, Beweis und Handlung in dieser Reihenfolge.",
    )
    checklist_page(
        c,
        3,
        "02",
        "Sichtbarkeit",
        "Wird deine Seite gefunden?",
        [
            "Dein Google-Unternehmensprofil ist vollständig und aktuell.",
            "Leistungen und Orte stehen in eigenen, verständlichen Inhalten.",
            "Häufige Fragen deiner Kunden werden konkret beantwortet.",
            "Seitentitel und Beschreibungen nennen Leistung und Region.",
            "Google kann alle wichtigen Seiten technisch erfassen.",
            "Inhalte beantworten Fragen, die auch KI-Suchen verstehen.",
        ],
        draw_visibility_graphic,
        "Wenn du kaum gefunden wirst",
        "Prüfe zuerst Technik, Leistungsseiten und dein Google-Unternehmensprofil. Sichtbarkeit entsteht durch klare Signale, nicht durch möglichst viele Suchbegriffe.",
    )
    checklist_page(
        c,
        4,
        "03",
        "Vertrauen & Anfragen",
        "Entsteht aus Interesse eine Anfrage?",
        [
            "Echte Bilder zeigen Betrieb, Team oder Arbeitsweise.",
            "Bewertungen, Projekte oder Ergebnisse belegen deine Aussagen.",
            "Preise oder ein klarer Rahmen nehmen Unsicherheit.",
            "Die Website funktioniert ohne Zoomen auf kleinen Bildschirmen.",
            "Seiten laden schnell und springen beim Aufbau nicht.",
            "Der wichtigste Button sagt konkret, was als Nächstes passiert.",
        ],
        draw_trust_graphic,
        "Deine Priorität",
        "Zähle deine offenen Kreise. Beginne dort, wo Klarheit, Vertrauen und Handlung gleichzeitig fehlen. Das bringt meist mehr als einzelne Designkorrekturen.",
    )
    cta_page(c)
    c.save()
    copyfile(OUTPUT, PUBLIC)
    print(OUTPUT)
    print(PUBLIC)


if __name__ == "__main__":
    build_pdf()
