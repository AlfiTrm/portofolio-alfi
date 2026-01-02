"use client";

export default function SpotifyWidget() {
  return (
    <div className="absolute bottom-32 md:bottom-40 right-6 md:right-12 z-20">
      <div className="w-[200px] md:w-[280px] rounded-xl overflow-hidden opacity-80 hover:opacity-100 transition-opacity">
        <iframe
          src="https://open.spotify.com/embed/playlist/2hkz78jsbEOasVpPM5eTCM?utm_source=generator&theme=0"
          width="100%"
          height="152"
          frameBorder="0"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          className="rounded-xl"
        />
      </div>
      <p className="text-[10px] font-mono text-white/30 mt-2 text-right uppercase tracking-widest">
        MY PLAYLIST
      </p>
    </div>
  );
}
