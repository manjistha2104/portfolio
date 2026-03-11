import { ProjectItem } from "@/types/project";

export const projects: ProjectItem[] = [
  {
    id: "1",
    slug: "ams-dashboard",
    name: "AMS Dashboard",
    code: "AMS-001",
    description:
      "Modern admin dashboard with analytics, invoice management and responsive UI.",
    longDescription:
      "This project is a clean and modern admin system built for performance and usability. It includes dashboard widgets, analytics sections, invoice modules, reusable UI components and scalable layout patterns for enterprise workflows.",
    image: "/projects/project-1.jpg",
    file: "/projects/ams-spec.pdf",
    liveUrl: "#",
    githubUrl: "#",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Chart.js"],
    category: "Dashboard",
    featured: true,
  },
  {
    id: "2",
    slug: "investor-service-portal",
    name: "Investor Service Portal",
    code: "ISP-002",
    description:
      "A service portal where investors can track requests, complaints and service workflows.",
    longDescription:
      "Investor Service Portal focuses on request tracking, ticket conversation, service requests and profile management. The interface is optimized for clarity, form usability and fast support response handling.",
    image: "/projects/project-2.jpg",
    file: "/projects/investor-flow.pdf",
    liveUrl: "#",
    githubUrl: "#",
    techStack: ["Next.js", "Laravel API", "PostgreSQL", "Tailwind CSS"],
    category: "Portal",
    featured: true,
  },
  {
    id: "3",
    slug: "farrari-consulting-site",
    name: "Farrari Consulting",
    code: "FCS-003",
    description:
      "Corporate website with blog, reports, sliders and full admin control.",
    longDescription:
      "A content-driven business website with blog management, report downloads, category/tag filtering and homepage sliders. The design emphasizes premium visuals and structured content sections.",
    image: "/projects/project-3.jpg",
    file: "/projects/farrari-profile.pdf",
    liveUrl: "#",
    githubUrl: "#",
    techStack: ["Next.js", "MongoDB", "Tailwind CSS", "JWT Auth"],
    category: "Corporate",
    featured: false,
  },
];