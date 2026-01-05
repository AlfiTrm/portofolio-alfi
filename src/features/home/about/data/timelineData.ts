export const timelineData = [
  {
    period: "2023 — Sekarang",
    entries: [
      {
        title: "Bachelor of Computer Science — Information Systems",
        company: "Universitas Brawijaya",
        category: "Education",
        description: "",
        highlights: [],
      },
    ],
  },
  {
    period: "Mei – Juli 2025",
    entries: [
      {
        title: "Frontend Developer — Event Platform",
        company: "IT Fest 2025",
        category: "Project",
        description: "Mengembangkan komponen frontend responsif & interaktif.",
        highlights: ["10.000+ page views"],
      },
      {
        title: "Frontend Developer — Organization Website",
        company: "Keluarga Besar Mahasiswa Departemen Sistem Informasi",
        category: "Project",
        description: "Mengembangkan halaman informasi organisasi.",
        highlights: ["Custom 404 error page"],
      },
    ],
  },
  {
    period: "Oktober – November 2025",
    entries: [
      {
        title: "Frontend Developer — Organization Website",
        company: "Indonesian Future Leaders (IFL Chapter Malang)",
        category: "Project",
        description: "Lead frontend development untuk website organisasi.",
        highlights: ["Implementasi fitur registrasi relawan dengan user flow berbasis chatbot"],
      },
    ],
  },
  {
    period: "2025 — Sekarang",
    entries: [
      {
        title: "Frontend Web Developer (Intern)",
        company: "PT Inspirasi Mandiri Nusantara",
        category: "Work",
        description: "Develop & maintain frontend features menggunakan React.",
        highlights: [],
      },
      {
        title: "Frontend Developer (Contract)",
        company: "Academic Competition",
        category: "Work",
        description: "Membangun dan memelihara web application menggunakan React & TailwindCSS.",
        highlights: ["700+ monthly active users"],
      },
    ],
  },
];

export type TimelineEntry = {
  title: string;
  company: string;
  category: "Work" | "Project" | "Education";
  description: string;
  highlights: string[];
};

export type TimelinePeriod = {
  period: string;
  entries: TimelineEntry[];
};
