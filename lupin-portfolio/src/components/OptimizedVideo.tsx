"use client";

import { useRef, useEffect, useState } from "react";

interface OptimizedVideoProps {
  /** Cloudinary public ID (e.g. "portfolio/hero-reel") or full URL */
  src: string;
  /** Poster image — Cloudinary public ID or URL */
  poster?: string;
  /** CSS class for the container */
  className?: string;
  /** Aspect ratio (e.g. "16/9", "4/3", "1/1") */
  aspectRatio?: string;
  /** Autoplay when in viewport (default: true) */
  autoPlay?: boolean;
  /** Loop the video (default: true) */
  loop?: boolean;
  /** Muted (default: true — required for autoplay) */
  muted?: boolean;
  /** Video quality: "auto", "auto:low", "auto:eco", "auto:good", "auto:best" */
  quality?: string;
  /** Max width for video delivery */
  maxWidth?: number;
  /** How much of the element must be visible before loading (0-1) */
  threshold?: number;
  /** Root margin for IntersectionObserver */
  rootMargin?: string;
  /** Inline styles */
  style?: React.CSSProperties;
}

/**
 * Build a Cloudinary video URL with transformations.
 * Automatically serves optimal format (WebM/MP4) and quality.
 */
function buildCloudinaryUrl(
  publicId: string,
  options: { quality?: string; maxWidth?: number; format?: string } = {}
): string {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  if (!cloudName) {
    console.warn("NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME is not set");
    return publicId; // fallback to raw path
  }

  // If it's already a full URL, return as-is
  if (publicId.startsWith("http")) return publicId;

  const { quality = "auto", maxWidth, format = "auto" } = options;
  const transforms: string[] = [];

  transforms.push(`q_${quality}`);
  transforms.push(`f_${format}`); // auto = best format for the browser
  if (maxWidth) transforms.push(`w_${maxWidth}`);

  const transformStr = transforms.join(",");
  return `https://res.cloudinary.com/${cloudName}/video/upload/${transformStr}/${publicId}`;
}

/**
 * Build a Cloudinary video thumbnail URL.
 * Generates a poster image from the video itself.
 */
function buildPosterUrl(publicId: string, maxWidth = 800): string {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  if (!cloudName) return "";
  if (publicId.startsWith("http")) return "";

  return `https://res.cloudinary.com/${cloudName}/video/upload/q_auto,f_auto,w_${maxWidth},so_0/${publicId}.jpg`;
}

/**
 * Optimized video component with Cloudinary integration:
 * - Lazy loads videos only when entering the viewport
 * - Auto-pauses when off-screen (saves CPU/bandwidth)
 * - Auto-generates poster from video thumbnail
 * - Serves optimal format (WebM/MP4) based on browser
 * - Adaptive quality based on connection
 */
export default function OptimizedVideo({
  src,
  poster,
  className = "",
  aspectRatio = "16/9",
  autoPlay = true,
  loop = true,
  muted = true,
  quality = "auto",
  maxWidth,
  threshold = 0.25,
  rootMargin = "200px",
  style,
}: OptimizedVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);

  // Build URLs
  const videoUrl = buildCloudinaryUrl(src, { quality, maxWidth });
  const posterUrl = poster || buildPosterUrl(src);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible = entry.isIntersecting;
        setIsVisible(visible);

        const video = videoRef.current;
        if (!video) return;

        if (visible) {
          if (!hasLoaded) {
            video.preload = "auto";
            video.load();
            setHasLoaded(true);
          }
          if (autoPlay) {
            video.play().catch(() => {
              // Autoplay blocked by browser
            });
          }
        } else {
          if (!video.paused) {
            video.pause();
          }
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [autoPlay, hasLoaded, threshold, rootMargin]);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      style={{ aspectRatio, ...style }}
    >
      <video
        ref={videoRef}
        muted={muted}
        loop={loop}
        playsInline
        preload="none"
        poster={posterUrl || undefined}
        className="absolute inset-0 w-full h-full object-cover"
      >
        {(isVisible || hasLoaded) && (
          <source src={videoUrl} type="video/mp4" />
        )}
      </video>

      {/* Subtle loading state */}
      {!hasLoaded && !posterUrl && (
        <div className="absolute inset-0 bg-surface animate-pulse" />
      )}
    </div>
  );
}
