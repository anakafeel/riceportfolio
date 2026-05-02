export const PORTFOLIO_DATA = {
  user: {
    name: "Saim Hashmi",
    handle: "saim",
    host: "niriarch",
    role: "Junior Software Engineer",
    bio: "I treat the browser like a Wayland compositor. I build web-native interpretations of linux ricing culture — tiling layouts, agentic workflows, and high-fidelity terminals.",
    location: "Fedora 42 · Niri · Wayland",
    email: "hello@saim.rice",
    github: "anakafeel",
    avatar: "https://github.com/user-attachments/assets/ea779b22-1d29-4a31-8b6e-05a779d8f1f8",
    uptimeStart: typeof window !== "undefined" ? Date.now() - 1000 * 60 * 60 * 47 - 1000 * 60 * 12 : 0,
  },
  projects: [
    { 
      slug: "eco-intelligence", 
      title: "Eco Intelligence Dashboard", 
      tags: ["Next.js", "ML", "Python", "GSAP"], 
      blurb: "AI-powered system to optimize energy efficiency in IT infrastructure, winning 3rd prize at TechnataHacks 2024.",
      image: "https://images.prismic.io/new-portfolio-website/ZwqteoF3NbkBXXPV_Designer2.png?auto=format,compress"
    },
    { 
      slug: "up2date", 
      title: "Up2Date - News App", 
      tags: ["React", "Node.js", "NewsAPI", "Framer Motion"], 
      blurb: "Real-time news application with infinite scrolling and dynamic category filtering.",
      image: "https://images.unsplash.com/photo-1495020689067-958852a7765e?crop=entropy&cs=srgb&fm=jpg&ixid=M3wzMzc0NjN8MHwxfHNlYXJjaHwxfHxOZXdzfGVufDB8fHx8MTcyNzcxNjc3NHww&ixlib=rb-4.0.3&q=85"
    },
    { 
      slug: "htt24-revamp", 
      title: "Carleton Central Revamped", 
      tags: ["React", "Node.js", "MERN", "Tailwind"], 
      blurb: "Complete redesign of Carleton University's student portal focused on accessibility and navigation.",
      image: "https://images.prismic.io/new-portfolio-website/Z0-e9ZbqstJ98Ad6_httpic1.png?auto=format,compress"
    },
    { 
      slug: "cloud-diary", 
      title: "Cloud Diary App", 
      tags: ["MongoDB", "Express", "React", "JWT"], 
      blurb: "Secure full-stack diary application with encrypted storage and seamless CRUD operations.",
      image: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?crop=entropy&cs=srgb&fm=jpg&ixid=M3wzMzc0NjN8MHwxfHNlYXJjaHwzfHxsaWJyYXJ5fGVufDB8fHx8MTcyNzU5MDg5Nnww&ixlib=rb-4.0.3&q=85"
    },
    { 
      slug: "text-ops", 
      title: "Text Operations", 
      tags: ["React", "Framer Motion", "State"], 
      blurb: "My first React project: a utility for real-time text transformations and theme management.",
      image: "https://images.unsplash.com/photo-1543285198-3af15c4592ce?crop=entropy&cs=srgb&fm=jpg&ixid=M3wzMzc0NjN8MHwxfHNlYXJjaHwxfHx0ZXh0fGVufDB8fHx8MTcyNzgwOTY2Mnww&ixlib=rb-4.0.3&q=85"
    },
  ],
  about: [
    { h: "now", p: "Junior Software Engineer focusing on React, Next.js, and AI-driven infrastructure management." },
    { h: "focus", p: "Interfaces that feel like native systems — predictable, spatial, keyboard-first." },
    { h: "origin", p: "Computer Systems Engineering student at Carleton University. Started on Arch, moved to Fedora." },
    { h: "reading", p: "Bret Victor essays, Niri's design notes, and papers on high-performance web graphics." },
  ],
  blog: [
    {
      slug: "ai-powered-router-management",
      date: "2024.10.10",
      title: "AI-Powered Router Management",
      excerpt: "Deep dive into the random forest models and energy-saving logic behind Eco Intelligence.",
    },
    {
      slug: "hackthetunnels-24-journey",
      date: "2024.10.28",
      title: "HacktheTunnels'24 Journey",
      excerpt: "Reimagining Carleton Central in 24 hours: UX challenges and technical breakthroughs.",
    },
    {
      slug: "intermediate-typescript",
      date: "2024.09.10",
      title: "Intermediate TypeScript",
      excerpt: "My journey from dynamic JavaScript types to strict type safety and architectural structure.",
    },
    {
      slug: "nextjs-fundamentals",
      date: "2024.06.13",
      title: "Next.js Fundamentals",
      excerpt: "Mastering the shift between client and server components and leveraging SSR for speed.",
    },
  ],
  rice: [
    { id: "niri-1", label: "niri overview", url: "https://github.com/user-attachments/assets/7ae6874f-1a7b-4ed9-8fdb-d033329a457b" },
    { id: "niri-2", label: "alacritty + tmux", url: "https://github.com/user-attachments/assets/2d1d26eb-b6f1-4446-b74f-060b62f552ce" },
    { id: "niri-3", label: "neovim matugen", url: "https://github.com/user-attachments/assets/1d50fbc0-98d2-4084-ae09-5d3d22bd50a6" },
    { id: "niri-4", label: "waybar dynamic", url: "https://github.com/user-attachments/assets/d9689099-f2c7-4a1c-a710-e58edb2521a2" },
    { id: "niri-5", label: "spicetify theme", url: "https://github.com/user-attachments/assets/4d13e165-4460-4408-8036-2aa1e1adee07" },
    { id: "niri-6", label: "sidebar rules", url: "https://github.com/user-attachments/assets/cf5b2e58-85e3-4f24-85d8-da0ba7f9d048" },
  ],
  uses: [
    { h: "machine", items: [["cpu", "AMD Ryzen 7840HS"], ["ram", "32 GB DDR5"], ["os", "Fedora 42"], ["kbd", "HHKB Pro Hybrid"]] },
    { h: "system", items: [["wm", "Niri (scrollable)"], ["shell", "fish"], ["terminal", "alacritty"], ["editor", "AstroNvim"]] },
    { h: "web", items: [["framework", "Next.js 15"], ["motion", "GSAP + Framer"], ["3d", "Three.js"], ["host", "Vercel"]] },
  ],
  contactChannels: [
    { label: "email", handle: "hello@saim.rice" },
    { label: "github", handle: "/anakafeel" },
    { label: "linkedin", handle: "/in/saim-hashmi" },
    { label: "instagram", handle: "@anakafeel" },
  ],
};
