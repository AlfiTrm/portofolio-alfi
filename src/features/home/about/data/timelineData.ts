export type TimelineArtwork = {
  id: string;
  alt: string;
  art: "orbit" | "blocks" | "wave" | "gathering" | "horizon";
  src?: string;
  focusY?: number;
};

export type TimelineMoment = {
  id: string;
  title: string;
  note: string;
  visuals: TimelineArtwork[];
};

const temporaryVisual = (
  id: string,
  art: TimelineArtwork["art"],
): TimelineArtwork => ({
  id,
  art,
  alt: "Abstract ASCII placeholder for a future personal photo.",
});

const timelinePhoto = (
  id: string,
  art: TimelineArtwork["art"],
  alt: string,
  src: string,
  focusY: number,
): TimelineArtwork => ({ id, art, alt, src, focusY });

export const timelineMilestones: TimelineMoment[] = [
  {
    id: "trying-things",
    title: "When it all started.",
    note: "I started Information Systems at Universitas Brawijaya in 2023 and tried a few things along the way: a data bootcamp, project management, and UI/UX. I hadn't found my place yet.",
    visuals: [
      timelinePhoto(
        "early-01",
        "gathering",
        "Students gathered around a table in a meeting room.",
        "/img/timeline/start/start1.jpeg",
        0.68,
      ),
      timelinePhoto(
        "early-02",
        "horizon",
        "A student in a university blazer standing outdoors on campus.",
        "/img/timeline/start/start2.jpeg",
        0.5,
      ),
      timelinePhoto(
        "early-03",
        "gathering",
        "A group of students posing together in a university hall.",
        "/img/timeline/start/start3.jpeg",
        0.72,
      ),
    ],
  },
  {
    id: "frontend-clicked",
    title: "Semester four pulled me into frontend.",
    note: "A college project got me building for the web in my fourth semester. I was vibe coding at first, then started wondering how the parts behind the UI worked.",
    visuals: [
      timelinePhoto(
        "frontend-01",
        "gathering",
        "Students posing together at a Filkom BCC event frame.",
        "/img/timeline/semfour/sem1.jpeg",
        0.5,
      ),
      timelinePhoto(
        "frontend-02",
        "gathering",
        "Students attending a presentation in a university classroom.",
        "/img/timeline/semfour/sem2.jpeg",
        0.74,
      ),
      timelinePhoto(
        "frontend-03",
        "horizon",
        "A student in a varsity jacket sitting in a university classroom.",
        "/img/timeline/semfour/sem3.jpeg",
        0.45,
      ),
    ],
  },
  {
    id: "kbmdsi-web-work",
    title: "At KBMDSI, I got to help with the web.",
    note: "I helped with bits of the competition registration site and the organization’s site. It got me thinking about folder structure and keeping things modular, so the code stayed manageable instead of turning into spaghetti.",
    visuals: [
      timelinePhoto(
        "kbmdsi-01",
        "gathering",
        "Students taking a selfie at a KBMDSI event.",
        "/img/timeline/kbm/kbm1.jpeg",
        0.5,
      ),
      timelinePhoto(
        "kbmdsi-02",
        "gathering",
        "KBMDSI members posing outdoors in organization jackets.",
        "/img/timeline/kbm/kbm2.jpeg",
        0.7,
      ),
      timelinePhoto(
        "kbmdsi-03",
        "blocks",
        "A collage documenting the ASCEND 2.0 frontend workshop.",
        "/img/timeline/kbm/kbm3.jpeg",
        0.52,
      ),
    ],
  },
  {
    id: "ideas-and-ai",
    title: "AI makes it faster. The idea still matters.",
    note: "I've worked on a few competition projects since. AI makes building easier, but deciding what to build still takes the most thought.",
    visuals: [
      timelinePhoto(
        "ideas-01",
        "gathering",
        "Students presenting their project at Technoscape 2026 Hackathon 9.0.",
        "/img/timeline/compe/kompe1.jpeg",
        0.62,
      ),
      timelinePhoto(
        "ideas-02",
        "orbit",
        "A student holding a first-place trophy and web development prize check.",
        "/img/timeline/compe/kompe2.jpeg",
        0.55,
      ),
      timelinePhoto(
        "ideas-03",
        "gathering",
        "A team holding a second-place plaque at Technoscape 2026 Hackathon 9.0.",
        "/img/timeline/compe/kompe3.jpeg",
        0.7,
      ),
    ],
  },
  {
    id: "more-to-learn",
    title: "Now I want to look beyond the frontend.",
    note: "Frontend feels right for me. Next, I want to learn how the backend connects to it and get closer to full-stack work.",
    visuals: [
      temporaryVisual("next-01", "horizon"),
      temporaryVisual("next-02", "wave"),
      temporaryVisual("next-03", "orbit"),
    ],
  },
];
