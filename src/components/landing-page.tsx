"use client";

import { useEffect } from "react";
import { HeroBackground } from "@/components/hero-background";
import { ShareDemo } from "@/components/share-demo";

export function LandingPage() {
  useEffect(() => {
    const nav = document.querySelector<HTMLElement>("[data-nav]");
    // Direction-aware chrome: scroll down → icon-only; scroll up → full bar.
    let lastY = window.scrollY;
    let minimal = false;
    const TOP_ALWAYS_EXPAND = 48;
    const DIRECTION_DELTA = 6;

    const brandLabel = nav?.querySelector<HTMLElement>(".nav__brand span");
    const navMenu = nav?.querySelector<HTMLElement>(".nav__links");
    const cta = nav?.querySelector<HTMLElement>(".nav__cta");

    const onScroll = () => {
      if (!nav) return;
      const y = window.scrollY;
      nav.classList.toggle("is-scrolled", y > 12);

      if (y <= TOP_ALWAYS_EXPAND) {
        minimal = false;
      } else if (y > lastY + DIRECTION_DELTA) {
        minimal = true;
      } else if (y < lastY - DIRECTION_DELTA) {
        minimal = false;
      }

      nav.classList.toggle("is-minimal", minimal);
      nav.setAttribute("data-nav-state", minimal ? "minimal" : "standard");
      // Keep collapsed chrome out of the accessibility tree while hidden.
      brandLabel?.setAttribute("aria-hidden", minimal ? "true" : "false");
      navMenu?.setAttribute("aria-hidden", minimal ? "true" : "false");
      cta?.setAttribute("aria-hidden", minimal ? "true" : "false");
      if (cta instanceof HTMLElement) {
        if (minimal) cta.setAttribute("tabindex", "-1");
        else cta.removeAttribute("tabindex");
      }
      lastY = y;
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

    const sectionIds = ["worlds", "plan", "spend", "share"] as const;
    const links = Array.from(
      document.querySelectorAll<HTMLAnchorElement>("[data-nav-link]"),
    );
    let sectionIo: IntersectionObserver | null = null;
    if ("IntersectionObserver" in window && links.length) {
      const setActive = (id: string) => {
        for (const link of links) {
          link.classList.toggle(
            "is-active",
            link.getAttribute("href") === `#${id}`,
          );
        }
      };
      sectionIo = new IntersectionObserver(
        (entries) => {
          const visible = entries
            .filter((e) => e.isIntersecting)
            .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
          if (visible?.target.id) setActive(visible.target.id);
        },
        { threshold: [0.25, 0.45, 0.6], rootMargin: "-18% 0px -42% 0px" },
      );
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) sectionIo.observe(el);
      }
    }

    return () => {
      window.removeEventListener("scroll", onScroll);
      io?.disconnect();
      sectionIo?.disconnect();
    };
  }, []);

  return (
    <>

    <div className="noise" aria-hidden="true"></div>

    <header className="nav" data-nav>
      <a className="nav__brand" href="#top" aria-label="Triftly home">
        <img src="/app-icon.png" width="26" height="26" alt="" />
        <span>Triftly</span>
      </a>
      <nav className="nav__links" aria-label="Primary">
        <a href="#worlds" data-nav-link>Worlds</a>
        <a href="#plan" data-nav-link>Plan</a>
        <a href="#spend" data-nav-link>Spend</a>
        <a href="#share" data-nav-link>Share</a>
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
          <p className="hero__lede">One trip. One shared world.</p>
        </div>

        <a className="hero__scroll" href="#worlds" aria-label="Scroll to explore worlds">
          <span className="hero__scroll-icon" aria-hidden="true" />
        </a>
      </section>

      {/* Act I — Desire */}
      <section className="section worlds" id="worlds">
        <div className="section__intro reveal">
          <p className="kicker">Worlds</p>
          <h2>Where will you go?</h2>
          <p className="section__lede">
            Every destination opens a world of its own. Step into Tokyo — and
            let the days begin.
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
          <article className="world-tile world-tile--tko world-tile--featured">
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

      <p className="story-bridge reveal">Then the days start moving.</p>

      {/* Act II — Plan */}
      <section className="section feature feature--plan" id="plan">
        <div className="feature__grid">
          <div className="feature__copy reveal">
            <p className="kicker">Plan · Tokyo 2026</p>
            <h2>Days that move with you.</h2>
            <p className="section__lede">
              Flights in. Buddies in. Pin Ichiran for Day 1 — then reshape the
              route when the city has other plans.
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
                  Open the trip
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
                  Shape the day
                </p>
              </li>
            </ol>
          </div>
        </div>
      </section>

      <p className="story-bridge reveal">When the bill arrives…</p>

      {/* Act III — Spend */}
      <section className="section feature feature--spend" id="spend">
        <div className="feature__intro reveal">
          <p className="kicker">Spend · Ichiran with friends</p>
          <h2>Split fairly. Settle gently.</h2>
          <p className="section__lede">
            Ramen for four. Equal shares. A quiet Remind when someone’s still
            owing — no awkward chats in the group.
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
                Log the meal
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
                See the trip total
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
                Settle soft
              </p>
            </li>
          </ol>
        </div>
      </section>

      <p className="story-bridge reveal">Invite them into the same world.</p>

      <ShareDemo />

      {/* Own it */}
      <section className="section download" id="download">
        <div className="download__panel glass reveal">
          <img className="download__icon" src="/app-icon.png" width="72" height="72" alt="Triftly app icon" />
          <h2>Take the trip with you.</h2>
          <p>Your next world starts on iPhone.</p>
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
          <p className="download__note">Also on TestFlight while we roll out.</p>
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
