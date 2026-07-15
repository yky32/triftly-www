"use client";

import { useEffect } from "react";
import { HeroBackground } from "@/components/hero-background";

export function LandingPage() {
  useEffect(() => {
    const nav = document.querySelector<HTMLElement>("[data-nav]");
    const onScroll = () => {
      if (!nav) return;
      nav.classList.toggle("is-scrolled", window.scrollY > 12);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const reveals = document.querySelectorAll<HTMLElement>(".reveal");
    let io: IntersectionObserver | null = null;
    if ("IntersectionObserver" in window) {
      io = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              io?.unobserve(entry.target);
            }
          }
        },
        { threshold: 0.18, rootMargin: "0px 0px -8% 0px" },
      );
      reveals.forEach((el) => io!.observe(el));
    } else {
      reveals.forEach((el) => el.classList.add("is-visible"));
    }

    return () => {
      window.removeEventListener("scroll", onScroll);
      io?.disconnect();
    };
  }, []);

  return (
    <>

    <div className="noise" aria-hidden="true"></div>

    <header className="nav" data-nav>
      <a className="nav__brand" href="#top" aria-label="Triftly home">
        <img src="/app-icon.png" width="28" height="28" alt="" />
        <span>Triftly</span>
      </a>
      <nav className="nav__links" aria-label="Primary">
        <a href="#worlds">Worlds</a>
        <a href="#plan">Plan</a>
        <a href="#spend">Spend</a>
      </nav>
      <a className="nav__cta" href="#download">Get the app</a>
    </header>

    <main id="top">
      {/* Hero: brand + scenery + CTA */}
      <section className="hero">
        <HeroBackground />

        <div className="hero__copy">
          <p className="hero__eyebrow">Now launching</p>
          <h1 className="hero__brand">Triftly</h1>
          <p className="hero__headline">Your trips. Your world.</p>
          <p className="hero__lede">
            Explore places, plan every day on the map, spend with buddies — then
            share the story.
          </p>
          <div className="hero__actions">
            <a className="btn btn--primary" href="#download">Download for iPhone</a>
            <a className="btn btn--ghost" href="#worlds">See the worlds</a>
          </div>
        </div>
      </section>

      {/* Worlds */}
      <section className="section worlds" id="worlds">
        <div className="section__intro reveal">
          <p className="kicker">Worlds</p>
          <h2>Every destination feels like another world.</h2>
          <p className="section__lede">
            From Hong Kong weekends to Tokyo seasons — open a trip and step into
            a map that already knows where you’re going.
          </p>
        </div>

        <div className="world-rail reveal" aria-hidden="true">
          <article className="world-tile world-tile--hk">
            <span className="world-tile__place">Hong Kong</span>
            <span className="world-tile__tag">Harbour lights</span>
          </article>
          <article className="world-tile world-tile--tko">
            <span className="world-tile__place">Tokyo</span>
            <span className="world-tile__tag">Neon streets</span>
          </article>
          <article className="world-tile world-tile--sel">
            <span className="world-tile__place">Seoul</span>
            <span className="world-tile__tag">Night markets</span>
          </article>
          <article className="world-tile world-tile--bkk">
            <span className="world-tile__place">Bangkok</span>
            <span className="world-tile__tag">Golden hours</span>
          </article>
          <article className="world-tile world-tile--tpe">
            <span className="world-tile__place">Taipei</span>
            <span className="world-tile__tag">Mountain mist</span>
          </article>
          <article className="world-tile world-tile--sg">
            <span className="world-tile__place">Singapore</span>
            <span className="world-tile__tag">Garden city</span>
          </article>
        </div>
      </section>

      {/* Plan */}
      <section className="section feature" id="plan">
        <div className="feature__grid">
          <div className="feature__copy reveal">
            <p className="kicker">Plan</p>
            <h2>Days that move with you.</h2>
            <p className="section__lede">
              Pin spots, reorder the day, link flights, and watch your route
              come alive — liquid-clear on a map built for travelers.
            </p>
          </div>
          <div className="device reveal" aria-hidden="true">
            <div className="device__bezel glass">
              <div className="phone-ui">
                <div className="phone-ui__bar">
                  <span>東京 2026</span>
                  <span className="pill">Plan</span>
                </div>
                <div className="phone-ui__map">
                  <svg viewBox="0 0 320 220" className="mini-map">
                    <defs>
                      <linearGradient id="mapFill" x1="0" y1="0" x2="1" y2="1">
                        <stop stopColor="#ccfbf1" />
                        <stop offset="1" stopColor="#99f6e4" />
                      </linearGradient>
                    </defs>
                    <rect width="320" height="220" rx="18" fill="url(#mapFill)" opacity="0.35" />
                    <path
                      d="M40 170 C 90 120, 140 150, 180 90 S 260 40, 290 70"
                      fill="none"
                      stroke="#0f766e"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeDasharray="6 8"
                      className="dash"
                    />
                    <circle cx="40" cy="170" r="7" fill="#0d9488" />
                    <circle cx="180" cy="90" r="7" fill="#14b8a6" />
                    <circle cx="290" cy="70" r="7" fill="#f59e0b" />
                  </svg>
                </div>
                <div className="phone-ui__list">
                  <div className="spot"><b>Ichiran Ramen</b><span>12:30</span></div>
                  <div className="spot"><b>Shibuya Crossing</b><span>15:00</span></div>
                  <div className="spot"><b>TeamLab</b><span>18:30</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Spend */}
      <section className="section feature feature--reverse" id="spend">
        <div className="feature__grid">
          <div className="feature__copy reveal">
            <p className="kicker">Spend</p>
            <h2>Split fairly. Settle gently.</h2>
            <p className="section__lede">
              See the trip total, who still owes, and settle with a quiet
              Remind — or mark Paid when it’s done. Fair splits, no awkwardness.
            </p>
          </div>
          <div className="device device--photo reveal">
            <div className="device__glow" aria-hidden="true" />
            <figure className="device-frame">
              <div className="device-frame__chrome">
                <img
                  src="/screens/settlement.jpg"
                  width={472}
                  height={1024}
                  alt="Triftly settlement sheet for Tokyo 2026 — trip total, outstanding payments, and pay-back actions"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </figure>
          </div>
        </div>
      </section>

      {/* Share / statement strip */}
      <section className="section statement" id="share">
        <div className="statement__panel glass reveal">
          <p className="kicker">Share</p>
          <h2>Invite a buddy. Sync the trip.</h2>
          <p>
            One link. Live plans, spends, and map — so everyone travels in the
            same world.
          </p>
        </div>
      </section>

      {/* Download */}
      <section className="section download" id="download">
        <div className="download__panel glass reveal">
          <img className="download__icon" src="/app-icon.png" width="72" height="72" alt="Triftly app icon" />
          <h2>Start your next world.</h2>
          <p>Triftly for iPhone — explore, plan, spend, and share.</p>
          <a
            className="btn btn--primary btn--store"
            href="https://apps.apple.com/us/search?term=triftly"
            rel="noopener noreferrer"
          >
            <svg width="18" height="22" viewBox="0 0 18 22" aria-hidden="true">
              <path
                fill="currentColor"
                d="M14.77 11.54c-.03-2.54 2.07-3.76 2.16-3.82-1.18-1.73-3.01-1.96-3.66-1.99-1.56-.16-3.05.92-3.84.92-.79 0-2.01-.9-3.31-.87-1.7.03-3.27.99-4.14 2.52-1.77 3.06-.45 7.59 1.27 10.07.84 1.21 1.84 2.56 3.15 2.51 1.27-.05 1.75-.82 3.28-.82 1.53 0 1.97.82 3.31.79 1.37-.02 2.24-1.23 3.07-2.45.97-1.4 1.36-2.76 1.39-2.83-.03-.01-2.65-1.02-2.68-4.03zM11.9 3.66c.69-.84 1.16-2 1.03-3.16-1 .04-2.21.67-2.93 1.51-.64.74-1.2 1.93-1.05 3.06 1.11.09 2.25-.56 2.95-1.41z"
              />
            </svg>
            Download on the App Store
          </a>
          <p className="download__note">Also available on TestFlight while we roll out.</p>
        </div>
      </section>
    </main>

    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__brand">
          <img src="/app-icon.png" width="24" height="24" alt="" />
          <span>Triftly</span>
        </div>
        <div className="footer__links">
          <a href="/privacy.html">Privacy</a>
          <a href="/support.html">Support</a>
          <a href="mailto:yky32is@gmail.com">Contact</a>
        </div>
        <p className="footer__copy">© 2026 WY Limited</p>
      </div>
    </footer>

    
  
    </>
  );
}
