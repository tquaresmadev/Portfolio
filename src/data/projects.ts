export interface Project {
  slug: string;
  title: string;
  description: string;
  thumbnail?: string;
  tags: string[];
  liveUrl?: string;
  sourceUrl?: string;
  category?: string;
  icon: string;
  accentColor: string;
}

export const projects: Project[] = [
  {
    slug: "my-portfolio",
    title: "My Portfolio",
    thumbnail: "/projects/my-portfolio.png",
    description:
      "Personal developer portfolio built with Next.js, React, and Tailwind CSS.",
    tags: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    sourceUrl: "https://github.com/j1mp-dev/my-portfolio",
    category: "Web App",
    icon: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5",
    accentColor: "#6366f1",
  },
  {
    slug: "task-manager",
    title: "Task Manager",
    thumbnail: "/projects/task-manager.jpg",
    description:
      "Full-stack task management app with drag-and-drop boards, real-time updates, and team collaboration.",
    tags: ["Spring Boot", "Java", "PostgreSQL", "React"],
    category: "Full Stack",
    icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4",
    accentColor: "#10b981",
  },
  {
    slug: "weather-dashboard",
    title: "Weather Dashboard",
    thumbnail: "/projects/weather-dashboard.jpg",
    description:
      "Real-time weather dashboard with interactive maps, forecasts, and location-based alerts.",
    tags: ["JavaScript", "REST API", "Chart.js", "CSS"],
    liveUrl: "#",
    category: "Frontend",
    icon: "M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z",
    accentColor: "#f59e0b",
  },
  {
    slug: "ecommerce-api",
    title: "E-Commerce API",
    thumbnail: "/projects/ecommerce-api.jpg",
    description:
      "RESTful API for an e-commerce platform with authentication, payments, and inventory management.",
    tags: ["Spring Boot", "Java", "MySQL", "Docker"],
    sourceUrl: "#",
    category: "Backend",
    icon: "M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z",
    accentColor: "#ef4444",
  },
  {
    slug: "chat-app",
    title: "Real-Time Chat",
    thumbnail: "/projects/chat-app.jpg",
    description:
      "WebSocket-based chat application with rooms, typing indicators, and message history.",
    tags: ["Node.js", "WebSocket", "React", "MongoDB"],
    category: "Full Stack",
    icon: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z",
    accentColor: "#8b5cf6",
  },
];
