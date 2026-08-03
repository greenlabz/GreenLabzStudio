import { ArrowRight, Bolt, Check, Handshake, LoaderCircle, ScanSearch, Smartphone, ThumbsDown, ThumbsUp, TrendingUp, Timer, X } from 'lucide-react'
import type { RefObject } from 'react'
import { SwipeCardStack } from './SwipeCardStack'
import { MobileDesktopSplitBar } from './MobileDesktopSplitBar'
import { PhoneDragSlider } from './PhoneDragSlider'

type CinematicPhoneProps = {
  mockupRef?: RefObject<HTMLDivElement | null>
  showBadges?: boolean
  staticView?: boolean
}

export default function CinematicPhone({ mockupRef, showBadges = true, staticView = false }: CinematicPhoneProps) {
  return (
    <div className={`gl-exact-phone-wrap${staticView ? ' gl-exact-phone-static' : ''}`}>
      <div className="gl-exact-phone-inner">
        <div ref={mockupRef} className="gl-exact-phone-bezel">
          <div className="gl-exact-hardware gl-exact-hardware-left-one" aria-hidden="true" />
          <div className="gl-exact-hardware gl-exact-hardware-left-two" aria-hidden="true" />
          <div className="gl-exact-hardware gl-exact-hardware-right" aria-hidden="true" />
          <div className="gl-exact-screen">
            <div className="gl-exact-screen-glare" aria-hidden="true" />
            <div className="gl-exact-notch" aria-hidden="true"><span /></div>
            <div className="gl-exact-screen-content">
              <div className="gl-exact-phone-top"><span>GreenLabz Studio</span><b>01</b></div>
              <div className="gl-exact-phone-state gl-exact-phone-state-one">
                <div className="gl-exact-phone-widget gl-exact-phone-header"><span>MOBILE FIRST</span><strong>Der erste Eindruck entscheidet</strong></div>
                <div className="gl-exact-phone-widget gl-exact-phone-score gl-exact-phone-stopwatch"><svg viewBox="0 0 180 180" aria-hidden="true"><circle cx="90" cy="90" r="68" /><circle className="gl-exact-progress-ring" cx="90" cy="90" r="68" /></svg><Timer className="gl-exact-stopwatch-icon" size={16} /><strong className="gl-exact-score-value">0.05s</strong><span>Entscheidungszeit</span></div>
                <div className="gl-exact-phone-reactions"><span><ThumbsUp size={13} />Bleibt</span><span><ThumbsDown size={13} />Geht</span></div>
                <SwipeCardStack />
                <div className="gl-exact-phone-widget gl-exact-phone-row"><ScanSearch size={15} /><span>NUTZERVERHALTEN</span><i /></div>
              </div>
              <div className="gl-exact-phone-state gl-exact-phone-state-two">
                <div className="gl-exact-phone-widget gl-exact-phone-header"><span>MOBILE FIRST</span><strong>Das Handy ist die neue Eingangstür</strong></div>
                <div className="gl-exact-phone-widget gl-exact-phone-score gl-exact-phone-traffic"><svg viewBox="0 0 180 180" aria-hidden="true"><circle cx="90" cy="90" r="68" /><circle className="gl-exact-progress-ring" cx="90" cy="90" r="68" /></svg><strong className="gl-exact-traffic-value">0%</strong><span>Suchen über Mobile</span></div>
                <MobileDesktopSplitBar />
                <div className="gl-exact-phone-widget gl-exact-phone-row"><Smartphone size={15} /><span>NUTZERVERHALTEN</span><i /></div>
              </div>
              <div className="gl-exact-phone-state gl-exact-phone-state-three">
                <div className="gl-exact-phone-widget gl-exact-phone-header"><span>MOBILE FIRST</span><strong>Schlecht am Handy heißt: Kunde weg</strong></div>
                <PhoneDragSlider />
                <div className="gl-exact-loss-label">50% springen ab</div>
                <div className="gl-exact-phone-widget gl-exact-phone-row"><Smartphone size={15} /><span>VORHER / NACHHER</span><i /></div>
              </div>
              <div className="gl-exact-phone-state gl-exact-phone-state-four">
                <div className="gl-exact-phone-widget gl-exact-phone-header"><span>MOBILE FIRST</span><strong>Schneller überzeugen, schneller gewinnen</strong></div>
                <div className="gl-exact-competitive-screens">
                  <div className="gl-exact-competitive-screen gl-exact-competitive-yours"><div><span /><span /><span /><strong>Termin bestätigt</strong><Check size={14} /></div></div>
                  <div className="gl-exact-competitive-screen gl-exact-competitive-other"><div><span /><span /><span /><i /><b><LoaderCircle size={13} /></b></div></div>
                </div>
                <div className="gl-exact-competitive-lead"><ArrowRight size={13} /><span>+3 Min schneller</span></div>
                <div className="gl-exact-phone-widget gl-exact-phone-row"><Smartphone size={15} /><span>WETTBEWERBSVORTEIL</span><i /></div>
              </div>
              <div className="gl-exact-phone-home" aria-hidden="true" />
            </div>
          </div>
          <div className="gl-exact-phone-port" aria-hidden="true"><i /><i /><i /><b /></div>
        </div>

        {showBadges && <>
          <div className="gl-exact-badge gl-exact-badge-top"><span><ScanSearch size={17} /></span><div><strong>Google &amp; KI-Suche</strong><small>Sichtbarkeit, die bleibt</small></div></div>
          <div className="gl-exact-badge gl-exact-badge-bottom"><span><Handshake size={17} /></span><div><strong>1:1 umgesetzt</strong><small>Direkt mit mir</small></div></div>
          <div className="gl-exact-badge gl-exact-badge-right"><span><Bolt size={17} /></span><div><strong>Ultraschnell</strong><small>Ladezeit unter 1 Sekunde</small></div></div>
          <div className="gl-exact-badge gl-exact-badge-left"><span><TrendingUp size={17} /></span><div><strong>Mehr Umsatz</strong><small>Eine Website, die für dich arbeitet</small></div></div>
        </>}
      </div>
    </div>
  )
}
