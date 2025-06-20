// constants/home.ts
// Import these at the top of your file
import {
  SiReact,
  SiNextdotjs,
  SiVuedotjs,
  SiTypescript,
  SiTailwindcss,
  SiAngular,
  SiSvelte,
  SiNodedotjs,
  SiPython,
  SiExpress,
  SiFastapi,
  SiDjango,
  SiSpring,
  SiGo,
  SiRust,
  SiFlutter,
  SiSwift,
  SiKotlin,
  SiExpo,
  SiPostgresql,
  SiMongodb,
  SiRedis,
  SiMysql,
  SiSupabase,
  SiDocker,
  SiKubernetes,
  SiVercel,
  SiFirebase,
  SiGithubactions,
  SiGraphql,
  SiGit,
  SiWebpack,
  SiVite
} from 'react-icons/si';

export const NAVIGATION_ITEMS = ["home", "about", "portfolio", "contact"] as const;

export const HERO_DATA = {
  name: "Rizky Febrianto",
  title: "Software Engineer & Designer",
  description: "I craft exceptional digital experiences with clean, efficient code and innovative solution that solve real-world problems.",
  profileImage: {
    alt: "Rizky Febrianto Profile Picture",
    fallback: "RF"
  }
};

export const PROJECTS = [
  {
    title: "E-Commerce Platform",
    description: "Modern React-based shopping platform with advanced filtering and payment integration.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500&h=300&fit=crop",
    tech: ["React", "Node.js", "MongoDB", "Stripe"],
    demo: "#",
    code: "#",
  },
  {
    title: "Task Management App",
    description: "Collaborative project management tool with real-time updates and team features.",
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=500&h=300&fit=crop",
    tech: ["Vue.js", "Express", "Socket.io", "PostgreSQL"],
    demo: "#",
    code: "#",
  },
  {
    title: "AI Chat Interface",
    description: "Intelligent chatbot interface with natural language processing capabilities.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=500&h=300&fit=crop",
    tech: ["React", "Python", "OpenAI API", "FastAPI"],
    demo: "#",
    code: "#",
  },
  {
    title: "Weather Dashboard",
    description: "Beautiful weather application with detailed forecasts and interactive maps.",
    image: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=500&h=300&fit=crop",
    tech: ["JavaScript", "Weather API", "Chart.js", "CSS3"],
    demo: "#",
    code: "#",
  },
];

export const ABOUT_DATA = {
  title: "About Me",
  subtitle: "I'm a passionate developer with 5+ years of experience creating digital experiences that combine beautiful design with powerful functionality.",
  sections: [
    {
      icon: "briefcase",
      title: "Professional Experience",
      description: "Led development teams in creating scalable web applications for fortune 500 companies, managing full project lifecycles from conception to deployment."
    },
    {
      icon: "code",
      title: "Technical Expertise",
      description: "Specialized in modern JavaScript frameworks, cloud architecture, and database design. Always learning and adapting to new technologies."
    },
    {
      icon: "code",
      title: "Technical Expertise",
      description: "Specialized in modern JavaScript frameworks, cloud architecture, and database design. Always learning and adapting to new technologies."
    },
    {
      icon: "code",
      title: "Technical Expertise",
      description: "Specialized in modern JavaScript frameworks, cloud architecture, and database design. Always learning and adapting to new technologies."
    }
  ]
};

export const CONTACT_DATA = {
  title: "Let's Work Together",
  subtitle: "Have a project in mind? I'd love to hear about it. Let's create something amazing together.",
  email: "john@example.com",
  socialLinks: [
    { platform: "github", url: "#", icon: "github" },
    { platform: "linkedin", url: "#", icon: "linkedin" },
    { platform: "email", url: "#", icon: "mail" }
  ]
};

export const FOOTER_DATA = {
  copyright: "© 2025 Rizky Febrianto. All rights reserved. Built with React & Tailwind CSS."
};

export const ANIMATIONS = {
  scrollOffset: 50,
  transitionDuration: 300,
  hoverScale: 1.05,
  skillAnimationDuration: 1000
};

export const TECH_STACK = [
  { name: "React", icon: SiReact },
  { name: "Next.js", icon: SiNextdotjs },
  { name: "Vue.js", icon: SiVuedotjs },
  { name: "TypeScript", icon: SiTypescript },
  { name: "Tailwind CSS", icon: SiTailwindcss },
  { name: "Angular", icon: SiAngular },
  { name: "Svelte", icon: SiSvelte },

  { name: "Node.js", icon: SiNodedotjs },
  { name: "Python", icon: SiPython },
  { name: "Express.js", icon: SiExpress },
  { name: "FastAPI", icon: SiFastapi },
  { name: "Django", icon: SiDjango },
  { name: "Spring Boot", icon: SiSpring },
  { name: "Go", icon: SiGo },
  { name: "Rust", icon: SiRust },

  { name: "React Native", icon: SiReact },
  { name: "Flutter", icon: SiFlutter },
  { name: "Swift", icon: SiSwift },
  { name: "Kotlin", icon: SiKotlin },
  { name: "Expo", icon: SiExpo },

  { name: "PostgreSQL", icon: SiPostgresql },
  { name: "MongoDB", icon: SiMongodb },
  { name: "Redis", icon: SiRedis },
  { name: "MySQL", icon: SiMysql },
  { name: "Supabase", icon: SiSupabase },

  { name: "Docker", icon: SiDocker },
  { name: "Kubernetes", icon: SiKubernetes },
  { name: "Vercel", icon: SiVercel },
  { name: "Firebase", icon: SiFirebase },
  { name: "GitHub Actions", icon: SiGithubactions },

  { name: "GraphQL", icon: SiGraphql },
  { name: "Git", icon: SiGit },
  { name: "Webpack", icon: SiWebpack },
  { name: "Vite", icon: SiVite },
];

export type NavigationItem = typeof NAVIGATION_ITEMS[number];
export type Project = typeof PROJECTS[0];
export type AboutSection = typeof ABOUT_DATA.sections[0];
export type SocialLink = typeof CONTACT_DATA.socialLinks[0];