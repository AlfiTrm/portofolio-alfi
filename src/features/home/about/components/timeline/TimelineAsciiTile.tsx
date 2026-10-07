"use client";

import Image from "next/image";
import { Eye, EyeOff } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { TimelineArtwork } from "../../data/timelineData";
import TimelineArtworkFallback from "./TimelineArtworkFallback";

const ASCII_RAMP = " .,:-~=+*ox#%@";

export default function TimelineAsciiTile({
  visual,
  position,
}: {
  visual: TimelineArtwork;
  position: number;
}) {
  const tileRef = useRef<HTMLElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const photoCanvasRef = useRef<HTMLCanvasElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const redrawRef = useRef<() => void>(() => {});
  const [photoLoaded, setPhotoLoaded] = useState(false);
  const [photoFailed, setPhotoFailed] = useState(false);
  const [photoVisible, setPhotoVisible] = useState(false);
  const hasPhoto = Boolean(visual.src && !photoFailed);

  useEffect(() => {
    const tile = tileRef.current;
    const photoCanvas = photoCanvasRef.current;
    const canvas = canvasRef.current;
    const photo = imageRef.current;
    if (!tile || !canvas) return;

    let cancelled = false;
    let activated = false;
    let source: CanvasImageSource | null = null;
    let objectUrl: string | null = null;
    let resizeObserver: ResizeObserver | null = null;
    let visibilityObserver: IntersectionObserver | null = null;
    const sampler = document.createElement("canvas");
    sampler.width = 1;
    sampler.height = 1;
    canvas.width = 1;
    canvas.height = 1;
    if (photoCanvas) {
      photoCanvas.width = 1;
      photoCanvas.height = 1;
    }
    const samplerContext = sampler.getContext("2d", { willReadFrequently: true });
    const photoContext = photoCanvas?.getContext("2d");
    const context = canvas.getContext("2d");
    if (!samplerContext || !context || (hasPhoto && !photoContext)) return;

    const drawAscii = () => {
      if (cancelled || !activated) return;
      const artwork = hasPhoto ? photo : source;
      const sourceWidth = hasPhoto ? photo?.naturalWidth : 240;
      const sourceHeight = hasPhoto ? photo?.naturalHeight : 240;
      const width = tile.clientWidth;
      const height = tile.clientHeight;
      if (!artwork || !sourceWidth || !sourceHeight || !width || !height) return;

      const columns = Math.max(28, Math.min(128, Math.round(width / 4.1)));
      const rows = Math.max(24, Math.min(128, Math.round(height / 7.2)));
      sampler.width = columns;
      sampler.height = rows;
      samplerContext.fillStyle = "#171717";
      samplerContext.fillRect(0, 0, columns, rows);

      const sourceRatio = sourceWidth / sourceHeight;
      const targetRatio = width / height;
      let cropX = 0;
      let cropY = 0;
      let cropWidth = sourceWidth;
      let cropHeight = sourceHeight;
      if (sourceRatio > targetRatio) {
        cropWidth = sourceHeight * targetRatio;
        cropX = (sourceWidth - cropWidth) / 2;
      } else {
        cropHeight = sourceWidth / targetRatio;
        cropY = (sourceHeight - cropHeight) * (visual.focusY ?? 0.5);
      }

      try {
        samplerContext.drawImage(
          artwork,
          cropX,
          cropY,
          cropWidth,
          cropHeight,
          0,
          0,
          columns,
          rows,
        );
        const pixels = samplerContext.getImageData(0, 0, columns, rows).data;
        const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);
        if (photoCanvas && photoContext && hasPhoto) {
          photoCanvas.width = Math.round(width * pixelRatio);
          photoCanvas.height = Math.round(height * pixelRatio);
          photoCanvas.style.width = `${width}px`;
          photoCanvas.style.height = `${height}px`;
          photoContext.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
          photoContext.imageSmoothingEnabled = true;
          photoContext.imageSmoothingQuality = "high";
          photoContext.clearRect(0, 0, width, height);
          photoContext.drawImage(
            artwork,
            cropX,
            cropY,
            cropWidth,
            cropHeight,
            0,
            0,
            width,
            height,
          );
          photoCanvas.classList.add("is-ready");
        }
        canvas.width = Math.round(width * pixelRatio);
        canvas.height = Math.round(height * pixelRatio);
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
        context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
        context.clearRect(0, 0, width, height);

        const cellWidth = width / columns;
        const cellHeight = height / rows;
        context.font = `${Math.max(5, cellHeight * 0.9)}px ui-monospace, SFMono-Regular, Menlo, monospace`;
        context.textAlign = "center";
        context.textBaseline = "middle";
        for (let row = 0; row < rows; row += 1) {
          for (let column = 0; column < columns; column += 1) {
            const pixelIndex = (row * columns + column) * 4;
            const luminance = Math.round(
              pixels[pixelIndex] * 0.2126 +
                pixels[pixelIndex + 1] * 0.7152 +
                pixels[pixelIndex + 2] * 0.0722,
            );
            if (luminance < 32) continue;

            const rampIndex = Math.min(
              ASCII_RAMP.length - 1,
              Math.floor((luminance / 256) * ASCII_RAMP.length),
            );
            const glyph = ASCII_RAMP[rampIndex];
            if (!glyph || glyph === " ") continue;
            const alpha = Math.min(0.88, 0.28 + (luminance / 255) * 0.56);
            context.fillStyle = `rgba(244, 240, 232, ${alpha})`;
            context.fillText(
              glyph,
              column * cellWidth + cellWidth / 2,
              row * cellHeight + cellHeight / 2,
            );
          }
        }
        canvas.classList.add("is-ready");
      } catch {
        // Leave the original photo or fallback artwork visible if sampling is blocked.
      }
    };

    redrawRef.current = drawAscii;

    const activate = () => {
      if (cancelled || activated) return;
      activated = true;
      resizeObserver = new ResizeObserver(drawAscii);
      resizeObserver.observe(tile);

      if (hasPhoto) {
        if (photoLoaded && photo?.complete && photo.naturalWidth > 0) drawAscii();
        return;
      }

      if (!svgRef.current) return;
      const markup = new XMLSerializer().serializeToString(svgRef.current);
      objectUrl = URL.createObjectURL(new Blob([markup], { type: "image/svg+xml" }));
      const rasterizedArtwork = new window.Image();
      rasterizedArtwork.onload = () => {
        if (cancelled) return;
        source = rasterizedArtwork;
        drawAscii();
      };
      rasterizedArtwork.src = objectUrl;
    };

    if ("IntersectionObserver" in window) {
      visibilityObserver = new IntersectionObserver(
        ([entry]) => {
          if (!entry?.isIntersecting) return;
          visibilityObserver?.disconnect();
          activate();
        },
        { rootMargin: "180px" },
      );
      visibilityObserver.observe(tile);
    } else {
      activate();
    }

    return () => {
      cancelled = true;
      visibilityObserver?.disconnect();
      resizeObserver?.disconnect();
      redrawRef.current = () => {};
      if (objectUrl) URL.revokeObjectURL(objectUrl);
      sampler.width = 0;
      sampler.height = 0;
      if (photoCanvas) {
        photoCanvas.width = 0;
        photoCanvas.height = 0;
      }
    };
  }, [hasPhoto, photoLoaded, visual.art, visual.focusY, visual.id]);

  return (
    <figure
      ref={tileRef}
      className="journey-visual-tile"
      data-position={position}
      data-photo-visible={photoVisible}
      data-has-photo={hasPhoto}
    >
      <div className="journey-visual-renderer">
        <TimelineArtworkFallback visual={visual} svgRef={svgRef} />
        {hasPhoto && (
          <Image
            ref={imageRef}
            src={visual.src!}
            alt=""
            fill
            sizes="(min-width: 1120px) 340px, (min-width: 900px) 30vw, (min-width: 600px) 240px, 55vw"
            className="journey-visual-photo-source"
            onLoad={() => {
              setPhotoLoaded(true);
              redrawRef.current();
            }}
            onError={() => {
              setPhotoFailed(true);
              setPhotoVisible(false);
            }}
          />
        )}
        {hasPhoto && (
          <canvas
            ref={photoCanvasRef}
            className="journey-visual-photo"
            aria-hidden="true"
          />
        )}
        <canvas
          ref={canvasRef}
          className="journey-visual-ascii"
          aria-hidden="true"
        />
      </div>

      <figcaption className="sr-only">
        {hasPhoto
          ? visual.alt
          : visual.src
            ? `${visual.alt} Original photo unavailable; showing abstract artwork.`
            : "Abstract ASCII artwork placeholder for a future personal photo."}
      </figcaption>

      {hasPhoto && (
        <button
          type="button"
          className="journey-visual-toggle"
          aria-label={photoVisible ? "Show ASCII artwork" : "Show original photo"}
          aria-pressed={photoVisible}
          onClick={() => setPhotoVisible((visible) => !visible)}
        >
          {photoVisible ? (
            <EyeOff className="size-4" aria-hidden="true" />
          ) : (
            <Eye className="size-4" aria-hidden="true" />
          )}
        </button>
      )}
    </figure>
  );
}
