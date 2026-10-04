"use client";

import Image from "next/image";
import { useCallback, useState } from "react";
import styles from "./project.module.css";

export type ProjectGallerySlide = {
  src: string;
  alt: string;
  caption: string;
  objectPosition?: string;
};

type ProjectGalleryProps = {
  domain: string;
  label: string;
  tone: "smoki" | "hse" | "bitcoins";
  slides: readonly ProjectGallerySlide[];
};

export default function ProjectGallery({ domain, label, tone, slides }: ProjectGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const showSlide = useCallback((index: number) => {
    setActiveIndex((index + slides.length) % slides.length);
  }, [slides.length]);

  const showPrevious = useCallback(() => {
    setActiveIndex((current) => (current - 1 + slides.length) % slides.length);
  }, [slides.length]);

  const showNext = useCallback(() => {
    setActiveIndex((current) => (current + 1) % slides.length);
  }, [slides.length]);

  return (
    <div
      className={`${styles.projectPreview} ${styles.projectGallery} ${styles[`${tone}Gallery`]}`}
      role="region"
      aria-roledescription="carousel"
      aria-label={`${label} project gallery`}
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
          event.preventDefault();
          if (event.key === "ArrowLeft") showPrevious();
          else showNext();
        }
      }}
    >
      <div className={styles.previewBar}>
        <span /><span /><span />
        <small>{domain}</small>
        <b aria-live="polite">{String(activeIndex + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}</b>
      </div>

      <div className={styles.galleryViewport}>
        <div className={styles.galleryTrack} style={{ transform: `translate3d(-${activeIndex * 100}%, 0, 0)` }}>
          {slides.map((slide, index) => (
            <figure className={styles.gallerySlide} key={slide.src} aria-hidden={index !== activeIndex}>
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                sizes="(max-width: 900px) 90vw, 46vw"
                loading={index === 0 ? "eager" : "lazy"}
                style={{ objectPosition: slide.objectPosition ?? "center" }}
              />
              <figcaption>{slide.caption}</figcaption>
            </figure>
          ))}
        </div>
      </div>

      <div className={styles.galleryFooter}>
        <p>{label}</p>
        <div className={styles.galleryDots} aria-label="Choose project image">
          {slides.map((slide, index) => (
            <button
              type="button"
              key={slide.src}
              className={index === activeIndex ? styles.galleryDotActive : undefined}
              aria-label={`Show image ${index + 1}: ${slide.caption}`}
              aria-current={index === activeIndex ? "true" : undefined}
              onClick={() => showSlide(index)}
            />
          ))}
        </div>
        <div className={styles.galleryArrows}>
          <button type="button" onClick={showPrevious} aria-label="Previous project image">&#8592;</button>
          <button type="button" onClick={showNext} aria-label="Next project image">&#8594;</button>
        </div>
      </div>
    </div>
  );
}
