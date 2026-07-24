"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowDownRight, ArrowUpRight, Github, Linkedin, Mail, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Reveal } from "@/components/reveal";
import { HeroSignal } from "@/components/hero-signal";

const navigation = [
  { label: "Projects", id: "projects" },
  { label: "About", id: "about" },
  { label: "Skills", id: "skills" },
  { label: "Experience", id: "experience" },
  { label: "Achievements", id: "achievements" },
  { label: "Contact", id: "contact" },
];

const skillGroups = [
  { title: "Frontend", items: ["HTML", "CSS", "JavaScript", "Bootstrap", "EJS"] },
  { title: "Backend", items: ["Node.js", "Express.js", "Passport.js"] },
  { title: "Languages", items: ["C", "C++", "Java", "Python", "JavaScript"] },
  { title: "Database", items: ["MongoDB"] },
  { title: "Tools", items: ["Git", "GitHub", "VS Code", "Cloudinary", "Mapbox"] },
  { title: "Core Concepts", items: ["Data Structures & Algorithms", "Object-Oriented Programming", "Web Fundamentals", "Computer Networks", "DBMS"] },
];

const achievements = [
  { year: "2026", title: "Finalist - Hack Vriksh National Hackathon", text: "Recognized for exceptional dedication, innovative spirit, and outstanding technical contribution in the Hack Vriksh - Code. Create. Cultivate national hackathon." },
  { year: "2026", title: "Deloitte Data Analytics Job Simulation", text: "Completed practical, job-simulated tasks in data analysis and forensic technology through the Forage platform." },
  { year: "2025", title: "Smart India Hackathon (SIH) Participant", text: "Competed in India's national-level hackathon, collaborating in a team to develop a solution for a real-world problem statement." },
  { year: "2025", title: "IEEE Hackathon Finalist", text: "Reached the finals of an IEEE-organized hackathon, recognized for technical execution and innovative problem-solving." },
];

function SectionLabel({ number, children }: { number: string; children: React.ReactNode }) {
  return <p className="section-label"><span>{number}</span>{children}</p>;
}

function Nav({ activeSection, isCompact, progress }: { activeSection: string; isCompact: boolean; progress: number }) {
  const [open, setOpen] = useState(false);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 px-4 pt-3 transition-all duration-300 sm:px-7 sm:pt-4 ${isCompact ? "sm:pt-3" : "sm:pt-4"}`}>
      <div className="pointer-events-none fixed inset-x-0 top-0 z-40 h-[2px] bg-white/[0.05]">
        <div className="h-full rounded-full bg-gradient-to-r from-violet-400 via-fuchsia-400 to-violet-500 transition-[width] duration-200" style={{ width: `${progress}%` }} />
      </div>
      <nav aria-label="Primary navigation" className={`mx-auto flex max-w-[1380px] items-center justify-between rounded-full border border-white/[0.08] bg-[#0f0f12]/80 px-4 py-2.5 backdrop-blur-2xl shadow-[0_0_0_1px_rgba(255,255,255,0.02),0_20px_60px_rgba(0,0,0,0.35)] transition-all duration-300 ${isCompact ? "px-4 py-2" : "px-5 py-3"}`}>
        <a href="#top" className="font-display text-sm font-semibold tracking-[-0.04em] text-white">MS<span className="ml-1 text-violet-400">.</span></a>
        <div className="hidden items-center gap-6 lg:flex">
          {navigation.map((item) => (
            <a key={item.id} href={`#${item.id}`} className={`nav-link ${activeSection === item.id ? "active" : ""}`}>
              {item.label}
            </a>
          ))}
        </div>
        <a href="mailto:mayanksuri2112@gmail.com" className="hidden rounded-full bg-white px-4 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-zinc-950 transition-transform hover:scale-[1.03] sm:inline-flex">Let&apos;s talk <ArrowUpRight className="ml-1 h-3.5 w-3.5" /></a>
        <button aria-label="Toggle navigation" aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(!open)} className="grid h-10 w-10 place-items-center rounded-full border border-white/[0.08] bg-white/[0.04] text-white transition-colors hover:bg-white/[0.08] lg:hidden">{open ? <X size={19} /> : <Menu size={19} />}</button>
      </nav>
      {open && <>
        <button aria-label="Close navigation" onClick={() => setOpen(false)} className="fixed inset-0 -z-10 cursor-default bg-black/35 backdrop-blur-[1px] lg:hidden" />
        <div id="mobile-navigation" className="relative mx-auto mt-2 max-w-[1380px] rounded-[1.25rem] border border-white/[0.08] bg-[#101014]/95 p-3 shadow-2xl shadow-black/30 lg:hidden">
          {navigation.map((item) => (
            <a onClick={() => setOpen(false)} className={`block rounded-xl px-4 py-3 text-sm text-zinc-300 transition-colors hover:bg-white/[0.06] hover:text-white ${activeSection === item.id ? "bg-white/[0.06] text-white" : ""}`} key={item.id} href={`#${item.id}`}>{item.label}</a>
          ))}
        </div>
      </>}
    </header>
  );
}

export default function Home() {
  const [activeSection, setActiveSection] = useState("top");
  const [isCompact, setIsCompact] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const nextProgress = maxScroll > 0 ? (scrollTop / maxScroll) * 100 : 0;
      setProgress(nextProgress);
      setIsCompact(scrollTop > 18);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries.find((entry) => entry.isIntersecting);
        if (visibleEntry?.target.id) {
          setActiveSection(visibleEntry.target.id);
        }
      },
      { rootMargin: "-35% 0px -45% 0px", threshold: 0.2 }
    );

    const sections = [document.getElementById("top"), ...navigation.map((item) => document.getElementById(item.id))];
    sections.filter(Boolean).forEach((section) => observer.observe(section as Element));

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  return (
    <main id="top" className="overflow-hidden">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Nav activeSection={activeSection} isCompact={isCompact} progress={progress} />
      <section id="main-content" className="hero-shell min-h-[100svh] px-5 pb-16 pt-28 sm:px-8 sm:pt-32 lg:px-12">
        <div className="hero-grid" />
        <div className="ambient ambient-one" />
        <div className="ambient ambient-two" />
        <HeroSignal />
        <div className="relative mx-auto flex min-h-[calc(100svh-7rem)] max-w-[1380px] flex-col justify-between gap-12 py-8 lg:py-14">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="flex flex-wrap items-center justify-between gap-3 text-[0.7rem] uppercase tracking-[0.24em] text-zinc-500">
            <p>Mayank Suri / Delhi, India</p>
            <p className="rounded-full border border-white/[0.12] bg-white/[0.04] px-3 py-1 text-zinc-400">Available for collaborations</p>
          </motion.div>

          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.7fr] lg:items-end">
            <div>
              <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.08 }} className="eyebrow">Full Stack Developer</motion.p>
              <motion.h1 initial={{ opacity: 0, y: 34 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.95, delay: 0.12, ease: [0.22, 1, 0.36, 1] }} className="hero-title mt-4">Mayank<br /><span className="hero-gradient">Suri</span></motion.h1>
              <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.26 }} className="mt-6 max-w-2xl text-base leading-relaxed text-zinc-400 sm:text-lg">
                Building scalable web applications and AI-powered products.
              </motion.p>
              <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.32 }} className="mt-10 flex flex-wrap items-center gap-3">
                <a className="button-primary" href="#projects">View projects <ArrowDownRight size={17} /></a>
                <a className="button-secondary" href="/resume.pdf" target="_blank" rel="noreferrer">Resume <ArrowUpRight size={16} /></a>
                <a aria-label="GitHub" className="icon-button" href="https://github.com/mayanksuri21" target="_blank" rel="noreferrer"><Github size={18} /></a>
                <a aria-label="LinkedIn" className="icon-button" href="https://www.linkedin.com/in/mayank-suri-228815324/" target="_blank" rel="noreferrer"><Linkedin size={18} /></a>
              </motion.div>
            </div>

            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, delay: 0.28 }} className="hero-card p-6 sm:p-8">
              <p className="text-[0.68rem] uppercase tracking-[0.24em] text-violet-300">Current focus</p>
              <h2 className="mt-4 text-2xl font-semibold tracking-[-0.04em] text-white sm:text-[1.7rem]">B.Tech Information Technology • USICT • GGSIPU</h2>
              <p className="mt-4 text-sm leading-7 text-zinc-400">
                I build polished digital experiences with a strong emphasis on product thinking, thoughtful interfaces, and dependable systems.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="projects" className="section-wrap pt-20 sm:pt-28">
        <Reveal><SectionLabel number="01">Featured Project</SectionLabel></Reveal>
        <Reveal delay={0.07}>
          <div className="mt-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <h2 className="display-title max-w-3xl">Built for the journey, <span className="text-zinc-500">designed for discovery.</span></h2>
            <p className="max-w-sm text-sm leading-relaxed text-zinc-500">A full-stack travel and accommodation platform with AI-powered itinerary planning.</p>
          </div>
        </Reveal>
        <Reveal delay={0.1} className="mt-12">
          <article className="project-card">
            <div className="project-media">
              <Image src="/projects/wanderlust/home.png" alt="WanderLust-AI home page" fill priority className="project-image" sizes="(max-width: 900px) 100vw, 66vw" />
            </div>
            <div className="project-info">
              <div>
                <p className="eyebrow">01 / Full stack travel platform</p>
                <h3 className="mt-4 font-display text-4xl font-semibold tracking-[-0.06em] text-white sm:text-5xl">WanderLust-AI</h3>
                <p className="mt-5 max-w-xl text-base leading-relaxed text-zinc-400">An AI-powered travel and accommodation platform for discovering destinations, managing property listings, and generating personalized travel itineraries.</p>
              </div>
              <div className="mt-8 rounded-[1.4rem] border border-white/[0.08] bg-white/[0.03] p-5">
                <p className="text-[0.68rem] uppercase tracking-[0.24em] text-zinc-500">What it does</p>
                <ul className="mt-4 space-y-3 text-sm leading-7 text-zinc-400">
                  <li>• Discover destinations and browse travel-ready listings.</li>
                  <li>• Manage property listings with a polished experience.</li>
                  <li>• Generate personalized itineraries through AI-assisted flows.</li>
                </ul>
              </div>
              <div className="mt-8 flex flex-wrap gap-2">{["Node.js", "Express.js", "MongoDB", "EJS", "JavaScript", "Mapbox", "AI APIs"].map((tag) => <span key={tag} className="tag">{tag}</span>)}</div>
              <div className="mt-10 flex flex-wrap gap-3">
                <a className="button-primary" href="https://wanderlust-fhqc.onrender.com/listings" target="_blank" rel="noreferrer">Live demo <ArrowUpRight size={17} /></a>
                <a className="button-secondary" href="https://github.com/mayanksuri21/WanderLust-" target="_blank" rel="noreferrer">GitHub <Github size={16} /></a>
              </div>
            </div>
          </article>
        </Reveal>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <Reveal><div className="project-detail-image"><Image src="/projects/wanderlust/AI Planner.png" alt="WanderLust-AI trip planner" fill className="object-cover object-top" sizes="(max-width: 768px) 100vw, 50vw" /></div></Reveal>
          <Reveal delay={0.08}><div className="project-detail-image"><Image src="/projects/wanderlust/Listing Details.png" alt="WanderLust-AI listing details" fill className="object-cover object-top" sizes="(max-width: 768px) 100vw, 50vw" /></div></Reveal>
        </div>
      </section>

      <section id="about" className="section-wrap">
        <Reveal><SectionLabel number="02">About</SectionLabel></Reveal>
        <div className="mt-8 grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
          <Reveal><h2 className="display-title">Curious by nature.<br /><span className="text-zinc-500">Intentional by practice.</span></h2></Reveal>
          <Reveal delay={0.08}>
            <div className="space-y-5 text-[1.02rem] leading-[1.8] text-zinc-400">
              <p>I&apos;m a B.Tech Information Technology student at University School of Information, Communication &amp; Technology (USICT), GGSIPU, Delhi. Currently pursuing my degree from 2024 to 2028.</p>
              <p>I&apos;m passionate about web development and actively participate in hackathons. As a Technical Team Member at IEEE GGSIPU Student Branch, I contribute to technical initiatives and collaborate with fellow student engineers on various projects.</p>
              <p>My coursework includes Data Structures &amp; Algorithms, Object-Oriented Programming, Computer Networks, and DBMS. I enjoy building full-stack applications and exploring new technologies.</p>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="skills" className="section-wrap">
        <Reveal><SectionLabel number="03">Skills &amp; Expertise</SectionLabel></Reveal>
        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {skillGroups.map((group, i) => (
            <Reveal key={group.title} delay={i * 0.04}>
              <div className="skill-card">
                <h3>{group.title}</h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {group.items.map((item) => <span className="tag" key={item}>{item}</span>)}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="experience" className="section-wrap">
        <Reveal><SectionLabel number="04">Experience</SectionLabel></Reveal>
        <Reveal delay={0.06}>
          <div className="mt-10 rounded-[1.8rem] border border-white/[0.08] bg-white/[0.03] p-7 sm:p-10">
            <div className="grid gap-8 md:grid-cols-[140px_1fr] md:items-start">
              <p className="font-mono text-xs uppercase tracking-[0.24em] text-violet-300">Oct 2025<br />Present</p>
              <div>
                <p className="eyebrow">IEEE - GGSIPU Student Branch</p>
                <h2 className="mt-3 font-display text-3xl font-semibold tracking-[-0.05em] text-white">Technical Team Member</h2>
                <ul className="mt-6 max-w-2xl space-y-3 text-sm leading-relaxed text-zinc-400">
                  <li>Contribute to technical initiatives and events organized by the IEEE GGSIPU student chapter.</li>
                  <li>Collaborate with a team of student engineers on project execution and delivery.</li>
                  <li>Support technical planning and execution for IEEE-affiliated workshops and outreach activities.</li>
                </ul>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <section id="achievements" className="section-wrap">
        <Reveal><SectionLabel number="05">Achievements &amp; Certification</SectionLabel></Reveal>
        <div className="mt-9 grid gap-4 lg:grid-cols-2">
          {achievements.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.05}>
              <article className="achievement-card">
                <span className="font-mono text-xs uppercase tracking-[0.24em] text-violet-300">{item.year}</span>
                <div className="mt-4">
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="contact" className="section-wrap pb-16 pt-24 sm:pb-20">
        <Reveal><SectionLabel number="06">Contact</SectionLabel></Reveal>
        <Reveal delay={0.08}>
          <div className="contact-card mt-7 p-7 sm:p-11">
            <h2 className="display-title max-w-3xl">Let&apos;s build something <span className="text-violet-300">meaningful.</span></h2>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-zinc-400">I&apos;m open to discussing projects, collaborations, and opportunities. Feel free to reach out.</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a className="button-primary" href="mailto:mayanksuri2112@gmail.com">Send email <Mail size={17} /></a>
              <a className="button-secondary" href="https://github.com/mayanksuri21" target="_blank" rel="noreferrer">GitHub <Github size={16} /></a>
              <a className="button-secondary" href="https://www.linkedin.com/in/mayank-suri-228815324/" target="_blank" rel="noreferrer">LinkedIn <Linkedin size={16} /></a>
              <a className="button-secondary" href="/resume.pdf" target="_blank" rel="noreferrer">Resume <ArrowUpRight size={16} /></a>
            </div>
            <a className="mt-10 inline-block text-sm text-zinc-300 underline decoration-zinc-600 underline-offset-4 transition-colors hover:text-white" href="mailto:mayanksuri2112@gmail.com">mayanksuri2112@gmail.com</a>
          </div>
        </Reveal>
      </section>

      <footer className="border-t border-white/[0.08] px-5 py-8 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-[1380px] flex-col gap-3 text-sm text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-display font-semibold text-zinc-300">Mayank Suri<span className="text-violet-400">.</span></p>
          <p>© 2026 Mayank Suri. Built with Next.js &amp; TypeScript.</p>
        </div>
      </footer>
    </main>
  );
}
