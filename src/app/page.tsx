/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState, useEffect } from "react";
import {
  Menu,
  X,
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Download,
  User,
  Briefcase,
  Code,
  MessageCircle,
} from "lucide-react";
import Image from "next/image";
import { useTheme } from "next-themes";

const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveSection(sectionId);
      setIsMenuOpen(false);
    }
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const projects = [
    {
      title: "E-Commerce Platform",
      description:
        "Modern React-based shopping platform with advanced filtering and payment integration.",
      image:
        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500&h=300&fit=crop",
      tech: ["React", "Node.js", "MongoDB", "Stripe"],
      demo: "#",
      code: "#",
    },
    {
      title: "Task Management App",
      description:
        "Collaborative project management tool with real-time updates and team features.",
      image:
        "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=500&h=300&fit=crop",
      tech: ["Vue.js", "Express", "Socket.io", "PostgreSQL"],
      demo: "#",
      code: "#",
    },
    {
      title: "AI Chat Interface",
      description:
        "Intelligent chatbot interface with natural language processing capabilities.",
      image:
        "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=500&h=300&fit=crop",
      tech: ["React", "Python", "OpenAI API", "FastAPI"],
      demo: "#",
      code: "#",
    },
    {
      title: "Weather Dashboard",
      description:
        "Beautiful weather application with detailed forecasts and interactive maps.",
      image:
        "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=500&h=300&fit=crop",
      tech: ["JavaScript", "Weather API", "Chart.js", "CSS3"],
      demo: "#",
      code: "#",
    },
  ];

  const skills = [
    { name: "JavaScript", level: 95 },
    { name: "React", level: 90 },
    { name: "Node.js", level: 85 },
    { name: "Python", level: 80 },
    { name: "TypeScript", level: 88 },
    { name: "MongoDB", level: 82 },
    { name: "PostgreSQL", level: 78 },
    { name: "AWS", level: 75 },
  ];

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return (
      <div className="min-h-screen font-['Poppins'] bg-white">
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen font-['Poppins'] transition-colors duration-300">
      <div className="min-h-screen bg-background text-foreground">
        {/* Navigation */}
        <nav
          className={`fixed top-0 w-full z-50 transition-all duration-300 ${
            isScrolled
              ? "bg-background/80 backdrop-blur-md border-b border-border"
              : "bg-transparent"
          }`}
        >
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex justify-between items-center">
              <div className="text-2xl font-bold text-primary">Portfolio</div>

              {/* Desktop Menu */}
              <div className="hidden md:flex items-center space-x-8">
                {["home", "about", "portfolio", "contact"].map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item)}
                    className={`capitalize transition-all duration-300 hover:text-primary ${
                      activeSection === item
                        ? "text-primary font-medium"
                        : "text-muted-foreground"
                    }`}
                  >
                    {item}
                  </button>
                ))}
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-lg bg-secondary hover:bg-accent transition-colors"
                >
                  {theme === 'dark' ? "☀️" : "🌙"}
                </button>
              </div>

              {/* Mobile Menu Button */}
              <div className="md:hidden flex items-center space-x-2">
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-lg bg-secondary hover:bg-accent transition-colors"
                >
                  {theme === 'dark' ? "☀️" : "🌙"}
                </button>
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="p-2 rounded-lg hover:bg-secondary transition-colors"
                >
                  {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
              <div className="md:hidden mt-4 py-4 border-t border-border bg-card rounded-lg">
                {["home", "about", "portfolio", "contact"].map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item)}
                    className="block w-full text-left py-3 px-4 capitalize hover:text-primary hover:bg-secondary transition-colors rounded-lg"
                  >
                    {item}
                  </button>
                ))}
              </div>
            )}
          </div>
        </nav>

        {/* Hero Section */}
        <section
          id="home"
          className="min-h-screen flex items-center justify-center relative"
        >
          <div className="text-center z-10 max-w-4xl mx-auto px-6">
            <div className="mb-8">
              <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-primary p-1">
                <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
                  <User size={48} className="text-primary" />
                </div>
              </div>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-foreground">
              John Doe
            </h1>

            <p className="text-xl md:text-2xl text-primary mb-8 font-light">
              Full Stack Developer & UI/UX Designer
            </p>

            <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
              Crafting beautiful, functional web experiences with modern
              technologies. Passionate about clean code, innovative design, and
              solving complex problems.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <button
                onClick={() => scrollToSection("portfolio")}
                className="px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transform hover:scale-105 transition-all duration-300 shadow-lg"
              >
                View My Work
              </button>
              <button className="px-8 py-4 border border-primary text-primary rounded-lg font-semibold hover:bg-primary/10 transition-all duration-300 flex items-center gap-2">
                <Download size={20} />
                Download CV
              </button>
            </div>

            <div className="flex justify-center space-x-6">
              <a
                href="#"
                className="p-3 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110"
              >
                <Github size={24} />
              </a>
              <a
                href="#"
                className="p-3 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110"
              >
                <Linkedin size={24} />
              </a>
              <a
                href="#"
                className="p-3 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110"
              >
                <Mail size={24} />
              </a>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 px-6 bg-muted/30">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
                About Me
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                I&apos;m a passionate developer with 5+ years of experience
                creating digital experiences that combine beautiful design with
                powerful functionality.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="p-6 bg-card rounded-xl border border-border hover:border-primary/50 transition-all duration-300 shadow-sm">
                  <Briefcase className="text-primary mb-4" size={32} />
                  <h3 className="text-xl font-semibold mb-3 text-card-foreground">
                    Professional Experience
                  </h3>
                  <p className="text-muted-foreground">
                    Led development teams in creating scalable web applications
                    for fortune 500 companies, managing full project lifecycles
                    from conception to deployment.
                  </p>
                </div>

                <div className="p-6 bg-card rounded-xl border border-border hover:border-primary/50 transition-all duration-300 shadow-sm">
                  <Code className="text-primary mb-4" size={32} />
                  <h3 className="text-xl font-semibold mb-3 text-card-foreground">
                    Technical Expertise
                  </h3>
                  <p className="text-muted-foreground">
                    Specialized in modern JavaScript frameworks, cloud
                    architecture, and database design. Always learning and
                    adapting to new technologies.
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-2xl font-semibold mb-6 text-foreground">
                  Skills & Technologies
                </h3>
                {skills.map((skill, index) => (
                  <div key={skill.name} className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium text-foreground">
                        {skill.name}
                      </span>
                      <span className="text-primary">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Portfolio Section */}
        <section id="portfolio" className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
                My Portfolio
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                A collection of projects that showcase my skills in web
                development, design, and problem-solving.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
              {projects.map((project, index) => (
                <div
                  key={index}
                  className="group bg-card rounded-xl overflow-hidden border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-xl"
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-3 text-card-foreground group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-3 py-1 bg-primary/10 rounded-full text-sm text-primary border border-primary/20"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex gap-4">
                      <a
                        href={project.demo}
                        className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all duration-300 text-sm font-medium"
                      >
                        <ExternalLink size={16} />
                        Live Demo
                      </a>
                      <a
                        href={project.code}
                        className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-secondary transition-all duration-300 text-sm font-medium"
                      >
                        <Github size={16} />
                        Code
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 px-6 bg-muted/30">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
                Let&apos;s Work Together
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Have a project in mind? I&apos;d love to hear about it.
                Let&apos;s create something amazing together.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-8">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-primary/10 rounded-full">
                    <Mail className="text-primary" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-foreground">
                      Email
                    </h3>
                    <p className="text-muted-foreground">john@example.com</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-primary/10 rounded-full">
                    <MessageCircle className="text-primary" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-foreground">
                      Let&apos;s Chat
                    </h3>
                    <p className="text-muted-foreground">
                      Available for freelance work
                    </p>
                  </div>
                </div>

                <div className="pt-6">
                  <h3 className="font-semibold text-lg mb-4 text-foreground">
                    Follow Me
                  </h3>
                  <div className="flex space-x-4">
                    <a
                      href="#"
                      className="p-3 bg-secondary rounded-full hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                    >
                      <Github size={20} />
                    </a>
                    <a
                      href="#"
                      className="p-3 bg-secondary rounded-full hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                    >
                      <Linkedin size={20} />
                    </a>
                    <a
                      href="#"
                      className="p-3 bg-secondary rounded-full hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                    >
                      <Mail size={20} />
                    </a>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors placeholder:text-muted-foreground"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors placeholder:text-muted-foreground"
                  />
                </div>
                <div>
                  <textarea
                    placeholder="Your Message"
                    rows={5}
                    className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors placeholder:text-muted-foreground resize-none"
                  ></textarea>
                </div>
                <button
                  className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-all duration-300 shadow-lg"
                  onClick={() => alert("Message sent! (This is a demo)")}
                >
                  Send Message
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 px-6 border-t border-border">
          <div className="max-w-7xl mx-auto text-center">
            <p className="text-muted-foreground">
              © 2025 John Doe. All rights reserved. Built with React & Tailwind
              CSS.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Home;