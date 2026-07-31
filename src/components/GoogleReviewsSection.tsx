const GoogleBadgeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
  </svg>
)

const sampleReviews = [
  {
    name: 'Volkan Tenes',
    subtitle: 'Local Guide · Happen Döner',
    date: 'Vor 3 Monaten',
    initials: 'VT',
    text: 'Ein riesiges Dankeschön an das Team von greenlabz! Wir von Happen Döner & Street Food haben nach einer Agentur gesucht, die unsere digitale Sichtbarkeit auf das nächste Level hebt, und unsere Erwartungen wurden mehr als übertroffen. Die Zusammenarbeit war von Tag eins an überragend – super unkompliziert, professionell und voller kreativer Ideen. Die fertige Website ist extrem nutzerfreundlich und perfekt zugeschnitten. Man hat schon in der allerersten Woche gemerkt, dass die Resonanz massiv steigt! Wer einen echten Experten sucht, ist hier goldrichtig. Absolute Empfehlung!',
    avatarBg: '#00cc6a',
  },
  {
    name: 'Daniel Klink',
    subtitle: 'Team NEWEO',
    date: 'Vor 3 Monaten',
    initials: 'DK',
    text: 'Als Team von NEWEO können wir Greenlabz uneingeschränkt weiterempfehlen! Wir waren auf der Suche nach einem starken Partner für unseren digitalen Auftritt und unsere Erwartungen wurden übertroffen. Das neue Website Design ist absolut hervorragend. Wir haben nun nicht nur eine deutlich bessere Optik, sondern auch die technischen Mechaniken greifen reibungslos ineinander. Alles lädt extrem schnell! Durch die strategische SEO-Optimierung verzeichnen wir spürbar mehr Kundenanfragen. 1A Betreuung auch nach dem Launch!',
    avatarBg: '#635bff',
  },
  {
    name: 'Hi Ba',
    subtitle: 'Google Rezension',
    date: 'Vor 2 Monaten',
    initials: 'HB',
    text: 'Ich bin mehr als zufrieden mit der Zusammenarbeit mit GreenLabz Studio! Von Anfang an lief alles absolut professionell und strukturiert. Meine Wünsche wurden nicht nur umgesetzt, sondern sogar übertroffen.',
    avatarBg: '#ea4335',
  },
  {
    name: 'Michael R.',
    subtitle: 'Unternehmer',
    date: 'Vor 1 Monat',
    initials: 'MR',
    text: 'Top Betreuung und extrem starke Performance. Unsere Kundenanfragen haben sich seit dem Relaunch spürbar gesteigert!',
    avatarBg: '#4285f4',
  },
  {
    name: 'Elena K.',
    subtitle: 'Praxisinhaberin',
    date: 'Vor 3 Wochen',
    initials: 'EK',
    text: 'Sehr angenehme Kommunikation, pünktliche Fertigstellung und ein Design, das sich von der Konkurrenz abhebt. 5 von 5 Sternen!',
    avatarBg: '#fbbc05',
  },
]

export function GoogleReviewsSection() {
  return (
    <section className="section google-reviews-section" data-reveal>
      <div className="google-reviews-head">
        <div>
          <p className="section-code"><span /> [09] GOOGLE REVIEWS</p>
          <h2>
            Was Kunden <br />
            <span className="section-title-serif">wirklich sagen.</span>
          </h2>
        </div>
        <div className="google-reviews-stats">
          <div className="reviews-stars-row" aria-label="5 von 5 Sterne">
            {'★★★★★'}
          </div>
          <span><strong>5.0</strong> von 5 · Google Bewertungen</span>
        </div>
      </div>

      <div className="reviews-marquee-container" aria-label="Kundenbewertungen Karussell">
        <div className="reviews-marquee-track">
          {[...sampleReviews, ...sampleReviews, ...sampleReviews].map((review, index) => (
            <article className="review-card" key={`rev-${index}`}>
              <div className="review-card-head">
                <div className="review-author">
                  <div className="review-avatar" style={{ background: review.avatarBg }}>
                    {review.initials}
                  </div>
                  <div className="review-author-info">
                    <strong>{review.name}</strong>
                    <small>{review.subtitle} · {review.date}</small>
                  </div>
                </div>
                <div className="google-badge">
                  <GoogleBadgeIcon />
                  <span>Google</span>
                </div>
              </div>
              <div className="review-stars" aria-hidden="true">
                {'★★★★★'}
              </div>
              <p className="review-text">{review.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
