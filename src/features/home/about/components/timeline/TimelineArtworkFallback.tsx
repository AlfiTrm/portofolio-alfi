import type { TimelineArtwork } from "../../data/timelineData";
import type { RefObject } from "react";

function ArtworkShape({
  art,
  lightId,
}: {
  art: TimelineArtwork["art"];
  lightId: string;
}) {
  switch (art) {
    case "blocks":
      return (
        <g fill={`url(#${lightId})`}>
          <path d="M24 240V116l47-31v155H24Zm55 0V68l43-28v200H79Zm53 0V133l44-40v147h-44Z" />
          <path d="M39 144h14v8H39zm0 24h14v8H39zm53-70h13v9H92zm0 24h13v9H92zm0 24h13v9H92zm58 10h13v9h-13z" fill="#111" opacity=".72" />
        </g>
      );
    case "wave":
      return (
        <g fill="none" stroke={`url(#${lightId})`} strokeWidth="23" opacity=".9">
          <path d="M-20 174C28 155 44 72 96 75s54 101 108 85 45-72 78-80" />
          <path d="M-10 212c49-20 70-39 106-34s59 30 96 19 47-43 86-45" strokeWidth="8" opacity=".7" />
        </g>
      );
    case "gathering":
      return (
        <g fill={`url(#${lightId})`}>
          <circle cx="58" cy="92" r="20" />
          <circle cx="119" cy="68" r="25" />
          <circle cx="181" cy="98" r="18" />
          <path d="M19 213c0-38 16-59 39-59s40 21 40 59v27H19v-27Zm57 27c0-46 16-75 43-75s43 29 43 75h-86Zm65 0c0-39 16-60 40-60s40 21 40 60h-80Z" />
        </g>
      );
    case "horizon":
      return (
        <g fill={`url(#${lightId})`}>
          <circle cx="161" cy="80" r="42" opacity=".92" />
          <path d="M0 169c32-29 54-34 82-19s40 21 67 0 52-28 91-11v101H0V169Z" opacity=".68" />
          <path d="M0 203c41-25 69-21 105-6s67 16 135-14v57H0v-37Z" opacity=".52" />
        </g>
      );
    case "orbit":
      return (
        <g fill="none" stroke={`url(#${lightId})`} opacity=".94">
          <ellipse cx="120" cy="120" rx="88" ry="39" strokeWidth="17" transform="rotate(-31 120 120)" />
          <ellipse cx="120" cy="120" rx="58" ry="91" strokeWidth="7" transform="rotate(38 120 120)" opacity=".72" />
          <circle cx="165" cy="74" r="13" fill="#f4f0e8" stroke="none" />
        </g>
      );
  }
}

export default function TimelineArtworkFallback({
  visual,
  svgRef,
}: {
  visual: TimelineArtwork;
  svgRef: RefObject<SVGSVGElement | null>;
}) {
  const gradientId = `shade-${visual.id}`;
  const lightId = `light-${visual.id}`;

  return (
    <svg
      ref={svgRef}
      className="journey-visual-art"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 240 240"
      width="240"
      height="240"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#111" />
          <stop offset=".48" stopColor="#4b4b49" />
          <stop offset="1" stopColor="#171717" />
        </linearGradient>
        <linearGradient id={lightId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f2eee5" />
          <stop offset="1" stopColor="#8f8e89" />
        </linearGradient>
      </defs>
      <rect width="240" height="240" fill={`url(#${gradientId})`} />
      <ArtworkShape art={visual.art} lightId={lightId} />
    </svg>
  );
}
