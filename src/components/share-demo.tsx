"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const STEPS = [
  { id: "invite", label: "Invite" },
  { id: "join", label: "Join" },
  { id: "sync", label: "Sync" },
] as const;

type StepId = (typeof STEPS)[number]["id"];

const STEP_MS = 2000;

export function ShareDemo() {
  const [step, setStep] = useState<StepId>("invite");
  const [paused, setPaused] = useState(false);
  const resumeTimer = useRef<number | null>(null);
  const reduceMotion = useRef(false);

  useEffect(() => {
    reduceMotion.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduceMotion.current) {
      setStep("sync");
      setPaused(true);
    }
  }, []);

  useEffect(() => {
    if (paused || reduceMotion.current) return;
    const id = window.setInterval(() => {
      setStep((current) => {
        const index = STEPS.findIndex((s) => s.id === current);
        return STEPS[(index + 1) % STEPS.length].id;
      });
    }, STEP_MS);
    return () => window.clearInterval(id);
  }, [paused]);

  const selectStep = useCallback((next: StepId) => {
    setStep(next);
    setPaused(true);
    if (resumeTimer.current !== null) window.clearTimeout(resumeTimer.current);
    if (reduceMotion.current) return;
    resumeTimer.current = window.setTimeout(() => setPaused(false), 7000);
  }, []);

  useEffect(() => {
    return () => {
      if (resumeTimer.current !== null) window.clearTimeout(resumeTimer.current);
    };
  }, []);

  return (
    <section className="section feature feature--share" id="share">
      <div className="feature__grid">
        <div className="feature__copy reveal">
          <p className="kicker">Share · with Kary</p>
          <h2>Invite a buddy. Sync the trip.</h2>
          <p className="section__lede">
            Send the Tokyo link. Kary joins — and the plan, the spends, and the
            map stay alive on both phones.
          </p>

          <div
            className="share-steps"
            role="tablist"
            aria-label="Invite demo steps"
          >
            {STEPS.map((item) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={step === item.id}
                className={[
                  "share-steps__btn",
                  step === item.id ? "is-active" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                onClick={() => selectStep(item.id)}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <div
          className={`share-demo share-demo--${step}`}
          aria-live="polite"
        >
          <div className="share-demo__glow" aria-hidden="true" />
          {/* Host */}
          <figure className="share-phone share-phone--host">
            <div className="share-phone__chrome">
              <div className="share-phone__screen share-phone__screen--host">
                <header className="share-ui__top">
                  <span className="share-ui__muted">You · Host</span>
                  <strong>Tokyo 2026</strong>
                </header>

                <div className="share-ui__card">
                  <p className="share-ui__label">Invite buddies</p>
                  <div
                    className={[
                      "share-ui__link",
                      step === "invite" ? "is-pulse" : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                  >
                    <span>triftly.app/s/tokyo</span>
                    <em>{step === "invite" ? "Copy" : "Sent"}</em>
                  </div>
                </div>

                <div className="share-ui__people">
                  <span className="share-ui__avatar share-ui__avatar--you">W</span>
                  <span
                    className={[
                      "share-ui__avatar share-ui__avatar--kary",
                      step === "sync" ? "is-in" : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                  >
                    K
                  </span>
                  <span className="share-ui__people-label">
                    {step === "sync" ? "Wayne · Kary" : "Wayne"}
                  </span>
                </div>

                <div className="share-ui__note">
                  {step === "invite" && "Waiting for a buddy…"}
                  {step === "join" && "Invite opened on Kary’s phone"}
                  {step === "sync" && "Live with Kary · synced"}
                </div>
              </div>
            </div>
            <figcaption className="share-phone__caption">You</figcaption>
          </figure>

          <div className="share-bridge" aria-hidden="true">
            <span className="share-bridge__label">
              {step === "invite" && "link"}
              {step === "join" && "open"}
              {step === "sync" && "live"}
            </span>
            <span
              className={[
                "share-bridge__packet",
                step !== "invite" ? "is-away" : "",
              ]
                .filter(Boolean)
                .join(" ")}
            />
          </div>

          {/* Buddy */}
          <figure className="share-phone share-phone--buddy">
            <div className="share-phone__chrome">
              <div className="share-phone__screen share-phone__screen--buddy">
                {step === "invite" && (
                  <div className="share-ui__waiting">
                    <span className="share-ui__orb" />
                    <p>Waiting for invite</p>
                    <small>Link arrives here</small>
                  </div>
                )}

                {step === "join" && (
                  <div className="share-ui__join">
                    <p className="share-ui__muted">Trip invite</p>
                    <strong>Tokyo 2026</strong>
                    <span className="share-ui__muted">Wayne invited you</span>
                    <button type="button" className="share-ui__join-btn" tabIndex={-1}>
                      Join trip
                    </button>
                  </div>
                )}

                {step === "sync" && (
                  <div className="share-ui__synced">
                    <header className="share-ui__top">
                      <span className="share-ui__muted">Buddy · Kary</span>
                      <strong>Tokyo 2026</strong>
                    </header>
                    <div className="share-ui__spot">
                      <b>Ichiran Ramen</b>
                      <span>Just synced</span>
                    </div>
                    <div className="share-ui__spot share-ui__spot--soft">
                      <b>Hotel Gracery</b>
                      <span>On Day 1</span>
                    </div>
                    <p className="share-ui__check">You’re both in sync</p>
                  </div>
                )}
              </div>
            </div>
            <figcaption className="share-phone__caption">Kary</figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
