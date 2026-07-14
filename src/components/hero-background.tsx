"use client";

import { useEffect, useRef, useState } from "react";

const HERO_VIDEOS = [
  "/video/hero-world.mp4",
  "/video/hero-world-b.mp4",
] as const;

const CROSSFADE_MS = 1400;
const CROSSFADE_LEAD_S = 1.35;

export function HeroBackground() {
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([null, null]);
  const activeRef = useRef(0);
  const fadingRef = useRef(false);
  const [active, setActive] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const videos = videoRefs.current;
    let cancelled = false;

    const playSafe = async (video: HTMLVideoElement | null) => {
      if (!video) return;
      try {
        await video.play();
      } catch {
        // Autoplay can fail; poster/shade still present.
      }
    };

    const startCrossfade = async (from: number) => {
      if (fadingRef.current || cancelled) return;
      const to = 1 - from;
      const next = videos[to];
      if (!next) return;

      fadingRef.current = true;
      next.currentTime = 0;
      await playSafe(next);
      activeRef.current = to;
      setActive(to);

      window.setTimeout(() => {
        const prev = videos[from];
        if (prev) {
          prev.pause();
          prev.currentTime = 0;
        }
        fadingRef.current = false;
      }, CROSSFADE_MS);
    };

    const onTimeUpdate = (index: number) => () => {
      if (cancelled || fadingRef.current || activeRef.current !== index) return;
      const video = videos[index];
      if (!video || !Number.isFinite(video.duration) || video.duration <= 0) return;
      if (video.currentTime >= video.duration - CROSSFADE_LEAD_S) {
        void startCrossfade(index);
      }
    };

    const onEnded = (index: number) => () => {
      if (cancelled || fadingRef.current || activeRef.current !== index) return;
      void startCrossfade(index);
    };

    const cleanups: Array<() => void> = [];

    videos.forEach((video, index) => {
      if (!video) return;
      video.muted = true;
      video.playsInline = true;
      video.loop = false;
      const handleTime = onTimeUpdate(index);
      const handleEnded = onEnded(index);
      video.addEventListener("timeupdate", handleTime);
      video.addEventListener("ended", handleEnded);
      cleanups.push(() => {
        video.removeEventListener("timeupdate", handleTime);
        video.removeEventListener("ended", handleEnded);
      });
    });

    void (async () => {
      await playSafe(videos[0]);
      if (!cancelled) setReady(true);
      // Warm the next clip so the first crossfade is ready.
      const next = videos[1];
      if (next) {
        next.preload = "auto";
        next.load();
      }
    })();

    return () => {
      cancelled = true;
      cleanups.forEach((fn) => fn());
      videos.forEach((video) => video?.pause());
    };
  }, []);

  return (
    <div className="hero__atmosphere" aria-hidden="true">
      {HERO_VIDEOS.map((src, index) => (
        <video
          key={src}
          ref={(el) => {
            videoRefs.current[index] = el;
          }}
          className={[
            "hero__video",
            active === index ? "hero__video--active" : "",
            ready ? "hero__video--ready" : "",
          ]
            .filter(Boolean)
            .join(" ")}
          muted
          playsInline
          preload="auto"
          poster={index === 0 ? "/video/hero-world-poster.jpg" : undefined}
          tabIndex={-1}
        >
          <source src={src} type="video/mp4" />
        </video>
      ))}
      <div className="hero__video-shade" />
      <div className="hero__horizon" />
    </div>
  );
}
