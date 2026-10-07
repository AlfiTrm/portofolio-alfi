import type { TimelineArtwork } from "../../data/timelineData";
import TimelineAsciiTile from "./TimelineAsciiTile";

interface TimelineVisualClusterProps {
  visuals: TimelineArtwork[];
  index: number;
}

export default function TimelineVisualCluster({
  visuals,
  index,
}: TimelineVisualClusterProps) {
  return (
    <div
      className="journey-visual-cluster"
      data-layout={index % 3}
      role="group"
      aria-label="Story images"
    >
      {visuals.map((visual, visualIndex) => (
        <TimelineAsciiTile
          key={visual.id}
          visual={visual}
          position={visualIndex}
        />
      ))}
    </div>
  );
}
