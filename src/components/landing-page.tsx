"use client";

import { useEffect } from "react";
import { HeroBackground } from "@/components/hero-background";
import { ShareDemo } from "@/components/share-demo";

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
        <a href="#share">Share</a>
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

        <div className="world-rail reveal">
          <article className="world-tile world-tile--hk">
            <img
              className="world-tile__img"
              src="/worlds/hong-kong.jpg"
              alt=""
              width={720}
              height={960}
              loading="lazy"
              decoding="async"
            />
            <span className="world-tile__place">Hong Kong</span>
            <span className="world-tile__tag">Harbour lights</span>
          </article>
          <article className="world-tile world-tile--tko">
            <img
              className="world-tile__img"
              src="/worlds/tokyo.jpg"
              alt=""
              width={720}
              height={960}
              loading="lazy"
              decoding="async"
            />
            <span className="world-tile__place">Tokyo</span>
            <span className="world-tile__tag">Neon streets</span>
          </article>
          <article className="world-tile world-tile--sel">
            <img
              className="world-tile__img"
              src="/worlds/seoul.jpg"
              alt=""
              width={720}
              height={960}
              loading="lazy"
              decoding="async"
            />
            <span className="world-tile__place">Seoul</span>
            <span className="world-tile__tag">Hanok lanes</span>
          </article>
          <article className="world-tile world-tile--bkk">
            <img
              className="world-tile__img"
              src="/worlds/bangkok.jpg"
              alt=""
              width={720}
              height={960}
              loading="lazy"
              decoding="async"
            />
            <span className="world-tile__place">Bangkok</span>
            <span className="world-tile__tag">Golden hours</span>
          </article>
          <article className="world-tile world-tile--tpe">
            <img
              className="world-tile__img"
              src="/worlds/taipei.jpg"
              alt=""
              width={720}
              height={960}
              loading="lazy"
              decoding="async"
            />
            <span className="world-tile__place">Taipei</span>
            <span className="world-tile__tag">Night bazaars</span>
          </article>
          <article className="world-tile world-tile--sg">
            <img
              className="world-tile__img"
              src="/worlds/singapore.jpg"
              alt=""
              width={720}
              height={960}
              loading="lazy"
              decoding="async"
            />
            <span className="world-tile__place">Singapore</span>
            <span className="world-tile__tag">Garden city</span>
          </article>
        </div>
      </section>

      {/* Plan — text left, devices right */}
      <section className="section feature feature--plan" id="plan">
        <div className="feature__grid">
          <div className="feature__copy reveal">
            <p className="kicker">Plan</p>
            <h2>Days that move with you.</h2>
            <p className="section__lede">
              Create the trip with flights and buddies, then shape each day —
              open maps, mark visited, add spend, or move a spot when plans change.
            </p>
          </div>

          <div className="device-gallery device-gallery--static reveal">
            <ol className="device-gallery__row">
              <li className="device-gallery__item">
                <figure className="device-frame">
                  <div className="device-frame__chrome">
                    <img
                      src="/screens/plan-create.jpg"
                      width={472}
                      height={1024}
                      alt="Create a new trip — destination, dates, flights, currency, and travel buddies"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                </figure>
                <p className="device-gallery__caption">
                  <span aria-hidden="true">1</span>
                  Create
                </p>
              </li>
              <li className="device-gallery__item">
                <figure className="device-frame">
                  <div className="device-frame__chrome">
                    <img
                      src="/screens/plan-days.jpg"
                      width={472}
                      height={1024}
                      alt="Plan tab for Tokyo 2026 — day itinerary with spot actions like open in maps and add expense"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                </figure>
                <p className="device-gallery__caption">
                  <span aria-hidden="true">2</span>
                  Shape
                </p>
              </li>
            </ol>
          </div>
        </div>
      </section>

      {/* Spend — add → track → settle */}
      <section className="section feature feature--spend" id="spend">
        <div className="feature__intro reveal">
          <p className="kicker">Spend</p>
          <h2>Split fairly. Settle gently.</h2>
          <p className="section__lede">
            Log a spot spend, watch the trip total unfold, then settle with a
            quiet Remind — or mark Paid when it’s done.
          </p>
        </div>

        <div className="device-gallery reveal">
          <div className="device__glow" aria-hidden="true" />
          <ol className="device-gallery__row">
            <li className="device-gallery__item">
              <figure className="device-frame">
                <div className="device-frame__chrome">
                  <img
                    src="/screens/spend-add.jpg"
                    width={472}
                    height={1024}
                    alt="Add a spot spend — choose currency, amount, receipt, and equal split"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </figure>
              <p className="device-gallery__caption">
                <span aria-hidden="true">1</span>
                Log
              </p>
            </li>
            <li className="device-gallery__item device-gallery__item--mid">
              <figure className="device-frame">
                <div className="device-frame__chrome">
                  <img
                    src="/screens/spend-overview.jpg"
                    width={472}
                    height={1024}
                    alt="Spend tab overview — today, trip total, categories, and buddy shares"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </figure>
              <p className="device-gallery__caption">
                <span aria-hidden="true">2</span>
                Track
              </p>
            </li>
            <li className="device-gallery__item">
              <figure className="device-frame">
                <div className="device-frame__chrome">
                  <img
                    src="/screens/settlement.jpg"
                    width={472}
                    height={1024}
                    alt="Settlement sheet — outstanding payments, remind, and mark paid"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </figure>
              <p className="device-gallery__caption">
                <span aria-hidden="true">3</span>
                Settle
              </p>
            </li>
          </ol>
        </div>
      </section>

      <ShareDemo />

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
