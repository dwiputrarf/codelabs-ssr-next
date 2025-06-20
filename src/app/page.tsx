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
  Sun,
  Moon,
  Icon,
} from "lucide-react";
import Image from "next/image";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  NAVIGATION_ITEMS,
  HERO_DATA,
  PROJECTS,
  ABOUT_DATA,
  CONTACT_DATA,
  FOOTER_DATA,
  ANIMATIONS,
  type Project,
  TECH_STACK,
} from "@/lib/constants/home";
import Link from "next/link";

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
      setIsScrolled(window.scrollY > ANIMATIONS.scrollOffset);
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
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const handleContactSubmit = () => {
    alert("Message sent! (This is a demo)");
  };

  const getIcon = (iconName: string) => {
    const icons = {
      briefcase: Briefcase,
      code: Code,
      github: Github,
      linkedin: Linkedin,
      mail: Mail,
    };
    const IconComponent = icons[iconName as keyof typeof icons];
    return IconComponent ? <IconComponent size={24} /> : null;
  };

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return (
      <div className="min-h-screen font-poppins bg-white">
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen font-poppins transition-colors duration-300">
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
              <div className="flex flex-row">
                <div className="text-2xl font-bold text-foreground">Port</div>
                <div className="text-2xl font-bold text-primary">folio</div>
              </div>

              {/* Desktop Menu */}
              <div className="hidden md:flex items-center space-x-8">
                {NAVIGATION_ITEMS.map((item) => (
                  <Button
                    key={item}
                    variant="ghost"
                    onClick={() => scrollToSection(item)}
                    className={`capitalize transition-all duration-300 ${
                      activeSection === item
                        ? "text-primary font-medium"
                        : "text-muted-foreground hover:text-primary"
                    }`}
                  >
                    {item}
                  </Button>
                ))}
                <Link href="/login">
                  <Button
                    variant="default"
                    size="sm"
                    className="rounded-lg"
                  >
                    Login
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={toggleTheme}
                  className="rounded-lg"
                >
                  {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
                </Button>
              </div>

              {/* Mobile Menu */}
              <div className="md:hidden flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={toggleTheme}
                  className="rounded-lg"
                >
                  {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
                </Button>
                <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="icon">
                      <Menu size={20} />
                    </Button>
                  </SheetTrigger>
                  <SheetContent>
                    <div className="flex flex-col space-y-4 mt-8">
                      {NAVIGATION_ITEMS.map((item) => (
                        <Button
                          key={item}
                          variant="ghost"
                          onClick={() => scrollToSection(item)}
                          className="justify-start capitalize text-lg"
                        >
                          {item}
                        </Button>
                      ))}
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section
          id="home"
          className="min-h-screen flex items-center justify-center relative"
        >
          <div className="text-center z-10 max-w-4xl mx-auto px-6">
            <div className="mb-8">
              <Avatar className="w-32 h-32 mx-auto mb-6">
                <Image
                  src="/images/avatar.jpg"
                  alt={HERO_DATA.profileImage.alt}
                  fill
                  className="object-cover rounded-full"
                  sizes="128px"
                />
                <AvatarFallback className="text-2xl bg-primary text-primary-foreground">
                  {HERO_DATA.profileImage.fallback}
                </AvatarFallback>
              </Avatar>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-foreground">
              {HERO_DATA.name}
            </h1>

            <p className="text-xl md:text-2xl text-primary mb-8 font-light">
              {HERO_DATA.title}
            </p>

            <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
              {HERO_DATA.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button
                onClick={() => scrollToSection("portfolio")}
                size="lg"
                className="px-8 py-4 font-semibold hover:scale-105 transition-all duration-300 shadow-lg"
              >
                View My Work
              </Button>
              <a href="https://docs.google.com/document/d/1DY4M7QMeQDsnQl8ZMImyvFhG0HTunIMEYQMES8rxu0Y/edit?tab=t.0#heading=h.pw280b4y3aov">
                <Button
                  variant="outline"
                  size="lg"
                  className="px-8 py-4 font-semibold transition-all duration-300 hover:cursor-pointer"
                >
                  <Download size={20} className="mr-2" />
                  Download CV
                </Button>
              </a>
            </div>

            <div className="flex justify-center space-x-4">
              {CONTACT_DATA.socialLinks.map((link, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="icon"
                  asChild
                  className="rounded-full hover:scale-110 transition-all duration-300"
                >
                  <a href={link.url}>{getIcon(link.icon)}</a>
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 px-6 bg-muted/30">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
                {ABOUT_DATA.title}
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                {ABOUT_DATA.subtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              {ABOUT_DATA.sections.map((section, index) => (
                <Card
                  key={index}
                  className="hover:border-primary/50 transition-all duration-300"
                >
                  <CardHeader>
                    <div className="flex items-center space-x-4">
                      <div className="p-2 bg-primary/10 rounded-full">
                        {section.icon === "briefcase" ? (
                          <Briefcase className="text-primary" size={24} />
                        ) : (
                          <Code className="text-primary" size={24} />
                        )}
                      </div>
                      <CardTitle className="text-xl">{section.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      {section.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <div className="pt-20 mb-20 bg-gradient-to-b from-muted/30 to-background">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground text-center">
            Tech Stack
          </h2>

          <div className="relative overflow-hidden w-full py-12 bg-gradient-to-t from-muted/20 to-background">
            <div className="flex w-max space-x-12 animate-marquee">
              {[...TECH_STACK, ...TECH_STACK].map((tech, index) => {
                const Icon = tech.icon;
                return (
                  <div
                    key={index}
                    className="flex-shrink-0 flex flex-col items-center group cursor-pointer"
                  >
                    <div className="text-6xl mb-3 group-hover:scale-125 transition-transform duration-300 filter grayscale group-hover:grayscale-0 text-foreground">
                      {Icon ? <Icon /> : <span>🚫</span>}
                    </div>
                    <Badge
                      variant="secondary"
                      className="transition-all duration-300 border-border text-foreground dark:text-yellow-400 group-hover:border-yellow-400 group-hover:bg-yellow-400/10"
                    >
                      {tech.name}
                    </Badge>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

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
              {PROJECTS.map((project: Project, index) => (
                <Card
                  key={index}
                  className="group overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-xl"
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

                  <CardHeader>
                    <CardTitle className="group-hover:text-primary transition-colors">
                      {project.title}
                    </CardTitle>
                    <CardDescription className="leading-relaxed">
                      {project.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech.map((tech, techIndex) => (
                        <Badge
                          key={techIndex}
                          variant="secondary"
                          className="bg-primary/10 text-primary border-primary/20"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex gap-4">
                      <Button asChild size="sm">
                        <a
                          href={project.demo}
                          className="flex items-center gap-2"
                        >
                          <ExternalLink size={16} />
                          Live Demo
                        </a>
                      </Button>
                      <Button variant="outline" asChild size="sm">
                        <a
                          href={project.code}
                          className="flex items-center gap-2"
                        >
                          <Github size={16} />
                          Code
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 px-6 bg-muted/30">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
                {CONTACT_DATA.title}
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                {CONTACT_DATA.subtitle}
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
                    <p className="text-muted-foreground">
                      {CONTACT_DATA.email}
                    </p>
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
                    {CONTACT_DATA.socialLinks.map((link, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="icon"
                        asChild
                        className="rounded-full hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                      >
                        <a href={link.url}>{getIcon(link.icon)}</a>
                      </Button>
                    ))}
                  </div>
                </div>
              </div>

              <Card className="p-6">
                <div className="space-y-6">
                  <Input
                    type="text"
                    placeholder="Your Name"
                    className="transition-colors"
                  />
                  <Input
                    type="email"
                    placeholder="Your Email"
                    className="transition-colors"
                  />
                  <Textarea
                    placeholder="Your Message"
                    rows={5}
                    className="transition-colors resize-none"
                  />
                  <Button
                    className="w-full font-semibold shadow-lg"
                    onClick={handleContactSubmit}
                  >
                    Send Message
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 px-6 border-t border-border">
          <div className="max-w-7xl mx-auto text-center">
            <p className="text-muted-foreground">{FOOTER_DATA.copyright}</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Home;
