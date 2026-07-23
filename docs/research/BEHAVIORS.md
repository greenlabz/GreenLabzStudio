# Wibify-Inspired Behavior Notes

## Observed Reference Behaviors

- Dark cinematic visual language with neon yellow-green accent.
- Floating top navigation remains above content.
- Hero uses very large display type and a right-side image/object composition.
- CTAs have strong rectangular/button presence.
- Proof metrics sit near the first viewport.
- Section headers use bracketed numbers and small utility labels.
- Selected work appears as a large list, not card grid.
- Services are large discipline panels with tags and arrows.
- FAQ uses numbered questions.

## Implementation Behaviors

- GSAP timeline reveals hero words and hero controls.
- GSAP ScrollTrigger reveals sections when entering viewport.
- Lenis smooth scroll improves scroll feeling.
- CSS hover states on project rows and buttons.
- Native `details` elements power FAQ for accessibility.
- `prefers-reduced-motion` disables motion-heavy effects.

## Responsive Model

- 1440px desktop: two-column hero, floating centered nav, work list in multi-column rows.
- 768px tablet: compressed nav and stacked content where needed.
- 390px mobile: single-column hero, full-width buttons, stacked service/process cards, sticky bottom CTA.
