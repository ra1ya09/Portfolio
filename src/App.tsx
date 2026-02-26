/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
import { 
  Github, 
  Linkedin, 
  Instagram, 
  Facebook, 
  Mail, 
  Phone, 
  MapPin, 
  Download, 
  GraduationCap, 
  Cpu,
  Code2, 
  Zap,
  Heart,
  Menu,
  X,
  ChevronRight,
  ArrowUp,
  Folder
} from 'lucide-react';
import { ProfileData } from './types';

export default function App() {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [time, setTime] = useState(new Date());

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Typewriter logic
  const [displayText, setDisplayText] = useState("");
  const [charIndex, setCharIndex] = useState(0);
  const fullText = useMemo(() => profile ? `I'm ${profile.name}` : "", [profile]);

  const prefix = "I'm ";
  const isPrefixDone = displayText.startsWith(prefix);
  const prefixPart = isPrefixDone ? prefix : displayText;
  const namePart = isPrefixDone ? displayText.slice(prefix.length) : "";

  useEffect(() => {
    setDisplayText("");
    setCharIndex(0);
  }, [fullText]);

  useEffect(() => {
    if (!profile) return;
    
    if (charIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + fullText[charIndex]);
        setCharIndex((prev) => prev + 1);
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [charIndex, fullText, profile]);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    fetch('/profile.json')
      .then((res) => res.json())
      .then((data) => {
        setProfile(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error loading profile:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-matte-bg">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-matte-purple border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-matte-bg text-white">
        <p>Failed to load profile data.</p>
      </div>
    );
  }

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Education', href: '#education' },
    { name: 'Skills', href: '#skills' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <div className="relative selection:bg-matte-purple/30">
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-matte-purple origin-left z-[100]"
        style={{ scaleX }}
      />
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-matte-bg/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <motion.a 
            href="#"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl font-display font-bold purple-gradient-text"
          >
            {profile.name.split(' ')[0]}.
          </motion.a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link, i) => (
              <motion.a
                key={link.name}
                href={link.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="text-sm font-medium text-matte-text-muted hover:text-matte-purple transition-colors"
              >
                {link.name}
              </motion.a>
            ))}
            <motion.a
              href={profile.resume}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="matte-button matte-button-primary py-2 px-4 text-sm"
            >
              Resume
            </motion.a>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-matte-text"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-matte-card border-b border-white/5 overflow-hidden"
            >
              <div className="flex flex-col p-6 gap-4">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="text-lg font-medium text-matte-text-muted"
                  >
                    {link.name}
                  </a>
                ))}
                <a
                  href={profile.resume}
                  target="_blank"
                  rel="noreferrer"
                  className="matte-button matte-button-primary justify-center"
                >
                  Resume
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main className="pt-20 relative overflow-hidden">
        {/* Background Glows */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-matte-purple/10 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-[20%] right-[-5%] w-[30%] h-[30%] bg-matte-purple-light/5 blur-[100px] rounded-full pointer-events-none"></div>

        {/* Hero Section */}
        <section className="min-h-[90vh] flex items-center px-6">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-matte-purple font-medium mb-4 tracking-wider uppercase text-sm flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-matte-purple opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-matte-purple"></span>
                </span>
                Available for new opportunities
              </h2>
              <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 leading-tight min-h-[1.2em]">
                <span className="text-white">{prefixPart}</span>
                <span className="purple-gradient-text">{namePart}</span>
                <motion.span
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                  className="inline-block w-[4px] h-[0.8em] bg-matte-purple ml-2 align-middle"
                />
              </h1>
              <p className="text-xl text-matte-text-muted mb-8 max-w-lg leading-relaxed">
                {profile.title}.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="#contact" className="matte-button matte-button-primary">
                  Contact Me
                </a>
              </div>

              {/* Tech Stack Marquee */}
              <div className="mt-16 pt-8 border-t border-white/5">
                <p className="text-xs uppercase tracking-widest text-matte-text-muted mb-6">Core Tech Stack</p>
                <div className="flex flex-wrap gap-6 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                  {profile.skills.map((skill, i) => (
                    <span key={i} className="text-sm font-mono whitespace-nowrap">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="w-64 h-64 md:w-96 md:h-96 mx-auto relative z-10">
                <div className="absolute inset-0 bg-matte-purple rounded-3xl rotate-6 opacity-20 blur-2xl"></div>
                <img 
                  src={profile.profileImage} 
                  alt={profile.name}
                  className="w-full h-full object-cover rounded-3xl border-2 border-matte-purple/30 shadow-2xl relative z-10"
                  referrerPolicy="no-referrer"
                />
              </div>
              {/* Floating Elements */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute top-0 right-0 bg-matte-card p-4 rounded-2xl border border-white/10 shadow-xl z-20 hidden md:block"
              >
                <Code2 className="text-matte-purple" />
              </motion.div>
              <motion.div 
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, delay: 1 }}
                className="absolute bottom-10 left-0 bg-matte-card p-4 rounded-2xl border border-white/10 shadow-xl z-20 hidden md:block"
              >
                <Cpu className="text-matte-purple-light" />
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* About & Personal Info */}
        <section id="about" className="py-24 px-6 bg-white/[0.02]">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-3 gap-12">
              <div className="md:col-span-2">
                <h2 className="text-3xl font-display font-bold mb-8 flex items-center gap-3">
                  <span className="w-8 h-1 bg-matte-purple rounded-full"></span>
                  About Me
                </h2>
                <p className="text-lg text-matte-text-muted leading-relaxed mb-8">
                  {profile.bio}
                </p>
                
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="glass-card p-6">
                    <h3 className="text-matte-purple font-medium mb-4 flex items-center gap-2">
                      <MapPin size={18} /> Location
                    </h3>
                    <p className="text-matte-text">{profile.address}</p>
                  </div>
                  <div className="glass-card p-6">
                    <h3 className="text-matte-purple font-medium mb-4 flex items-center gap-2">
                      <Mail size={18} /> Email
                    </h3>
                    <p className="text-matte-text">{profile.email}</p>
                  </div>
                </div>

                {profile.arsenal && profile.arsenal.length > 0 && (
                  <div className="mt-16">
                    <h3 className="text-2xl font-display font-bold mb-8 flex items-center gap-3">
                      <Zap size={24} className="text-matte-purple" />
                      Technical Arsenal
                    </h3>
                    <div className="grid sm:grid-cols-3 gap-6">
                      {profile.arsenal.map((group, i) => {
                        const Icon = group.icon === 'Cpu' ? Cpu : group.icon === 'Code2' ? Code2 : Zap;
                        return (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="glass-card p-6 group hover:border-matte-purple/40 transition-all relative overflow-hidden"
                          >
                            <div className="absolute -right-4 -top-4 w-24 h-24 bg-matte-purple/5 rounded-full blur-2xl group-hover:bg-matte-purple/10 transition-colors"></div>
                            <div className="w-12 h-12 bg-matte-purple/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                              <Icon className="text-matte-purple" size={24} />
                            </div>
                            <h4 className="text-lg font-bold mb-4">{group.category}</h4>
                            <ul className="space-y-2">
                              {group.items.map((item, j) => (
                                <li key={j} className="text-sm text-matte-text-muted flex items-center gap-2">
                                  <span className="w-1.5 h-1.5 bg-matte-purple/40 rounded-full"></span>
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Project Philosophy */}
                <div className="mt-24 text-center">
                  <h3 className="text-sm uppercase tracking-[0.3em] text-matte-purple font-bold mb-12">Project Philosophy</h3>
                  <div className="grid md:grid-cols-3 gap-12">
                    {[
                      { title: "Precision", desc: "Meticulous attention to detail in both hardware circuits and software logic." },
                      { title: "Efficiency", desc: "Optimizing workflows and code for maximum performance and minimal waste." },
                      { title: "Innovation", desc: "Constantly exploring new technologies to solve complex real-world problems." }
                    ].map((item, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.2 }}
                      >
                        <h4 className="text-2xl font-display font-bold mb-4 italic">{item.title}</h4>
                        <p className="text-matte-text-muted leading-relaxed">{item.desc}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="glass-card p-8">
                <h3 className="text-xl font-display font-bold mb-6">Social Connect</h3>
                <div className="flex flex-col gap-4">
                  {profile.socials.github && (
                    <a href={profile.socials.github} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-matte-text-muted hover:text-matte-purple transition-colors">
                      <Github size={20} /> GitHub
                    </a>
                  )}
                  {profile.socials.linkedin && (
                    <a href={profile.socials.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-matte-text-muted hover:text-matte-purple transition-colors">
                      <Linkedin size={20} /> LinkedIn
                    </a>
                  )}
                  {profile.socials.instagram && (
                    <a href={profile.socials.instagram} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-matte-text-muted hover:text-matte-purple transition-colors">
                      <Instagram size={20} /> Instagram
                    </a>
                  )}
                  {profile.socials.facebook && (
                    <a href={profile.socials.facebook} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-matte-text-muted hover:text-matte-purple transition-colors">
                      <Facebook size={20} /> Facebook
                    </a>
                  )}
                </div>
                <hr className="my-8 border-white/5" />
                
                <a 
                  href={profile.resume} 
                  target="_blank" 
                  rel="noreferrer"
                  className="matte-button matte-button-primary w-full justify-center"
                >
                  <Download size={18} /> Download CV
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-display font-bold mb-16 flex items-center gap-4">
              <span className="w-12 h-1 bg-matte-purple rounded-full"></span>
              Featured Projects
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {profile.projects?.map((project, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="glass-card group overflow-hidden flex flex-col"
                >
                  <div className="aspect-video overflow-hidden relative">
                    <img 
                      src={project.image} 
                      alt={project.name} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-matte-bg/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                      {project.codeUrl && (
                        <a 
                          href={project.codeUrl} 
                          target="_blank" 
                          rel="noreferrer"
                          className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform"
                        >
                          <Github size={18} />
                        </a>
                      )}
                    </div>
                  </div>
                  
                  <div className="p-6 flex-grow flex flex-col">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags?.map((tag, j) => (
                        <span key={j} className="text-[10px] uppercase tracking-wider font-bold text-matte-purple-light px-2 py-1 bg-matte-purple/10 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-xl font-bold mb-3 group-hover:text-matte-purple transition-colors">{project.name}</h3>
                    <p className="text-matte-text-muted text-sm leading-relaxed mb-6">
                      {project.description}
                    </p>
                    <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
                      <a 
                        href={project.codeUrl} 
                        target="_blank" 
                        rel="noreferrer"
                        className="text-xs font-bold uppercase tracking-widest text-matte-purple flex items-center gap-2 hover:gap-3 transition-all"
                      >
                        View Details <ChevronRight size={14} />
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Education & Skills */}
        <section id="education" className="py-24 px-6">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl font-display font-bold mb-12 flex items-center gap-3">
                <GraduationCap className="text-matte-purple" />
                Education
              </h2>
              <div className="space-y-8">
                {profile.education.map((edu, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="relative pl-8 border-l border-matte-purple/30"
                  >
                    <div className="absolute -left-[5px] top-0 w-[9px] h-[9px] bg-matte-purple rounded-full"></div>
                    <span className="text-sm text-matte-purple font-medium mb-1 block">{edu.year}</span>
                    <h3 className="text-xl font-bold mb-1">{edu.degree}</h3>
                    <p className="text-matte-text-muted mb-1">{edu.institute}</p>
                    {edu.grade && (
                      <span className="text-xs font-medium px-2 py-1 bg-matte-purple/10 text-matte-purple-light rounded-md">
                        {edu.grade}
                      </span>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>

            <div id="skills">
              <h2 className="text-3xl font-display font-bold mb-12 flex items-center gap-3">
                <Code2 className="text-matte-purple" />
                Skills & Expertise
              </h2>
              <div className="flex flex-wrap gap-3 mb-12">
                {profile.skills.map((skill, i) => (
                  <motion.span 
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="px-4 py-2 bg-matte-purple/10 text-matte-purple-light border border-matte-purple/20 rounded-lg text-sm font-medium"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>

              <h2 className="text-2xl font-display font-bold mb-6 flex items-center gap-3">
                <Heart className="text-matte-purple" />
                Interests
              </h2>
              <div className="flex flex-wrap gap-3">
                {profile.interests.map((interest, i) => (
                  <span key={i} className="px-4 py-2 bg-white/5 text-matte-text-muted rounded-lg text-sm">
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>


        {/* Contact Section */}
        <section id="contact" className="py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="glass-card p-12 md:p-20 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-matte-purple/10 blur-3xl rounded-full -mr-32 -mt-32"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-matte-purple-light/5 blur-3xl rounded-full -ml-32 -mb-32"></div>
              
              <div className="relative z-10 grid md:grid-cols-2 gap-16 items-center">
                <div>
                  <h2 className="text-4xl font-display font-bold mb-6">Let's work together</h2>
                  <p className="text-lg text-matte-text-muted mb-10 leading-relaxed">
                    Have a project in mind or just want to say hi? Feel free to reach out. I'm always open to discussing new opportunities and creative ideas.
                  </p>
                  
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-matte-purple/10 rounded-xl flex items-center justify-center text-matte-purple">
                        <Mail size={24} />
                      </div>
                      <div>
                        <p className="text-xs text-matte-text-muted uppercase tracking-wider font-bold">Email Me</p>
                        <p className="text-lg font-medium">{profile.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-matte-purple/10 rounded-xl flex items-center justify-center text-matte-purple">
                        <Phone size={24} />
                      </div>
                      <div>
                        <p className="text-xs text-matte-text-muted uppercase tracking-wider font-bold">Call Me</p>
                        <p className="text-lg font-medium">{profile.phone}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <input 
                      type="text" 
                      placeholder="Your Name" 
                      className="w-full bg-matte-bg border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-matte-purple transition-colors"
                    />
                    <input 
                      type="email" 
                      placeholder="Your Email" 
                      className="w-full bg-matte-bg border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-matte-purple transition-colors"
                    />
                  </div>
                  <input 
                    type="text" 
                    placeholder="Subject" 
                    className="w-full bg-matte-bg border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-matte-purple transition-colors"
                  />
                  <textarea 
                    placeholder="Your Message" 
                    rows={4}
                    className="w-full bg-matte-bg border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-matte-purple transition-colors resize-none"
                  ></textarea>
                  <button className="matte-button matte-button-primary w-full justify-center">
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <p className="text-matte-text-muted text-sm">
            © {new Date().getFullYear()} {profile.name}. All rights reserved.
          </p>
          <div className="flex flex-col items-center gap-2">
            <div className="text-matte-purple font-mono text-sm tracking-widest">
              {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
            </div>
            <div className="flex items-center gap-6">
              {profile.socials.github && (
                <a href={profile.socials.github} className="text-matte-text-muted hover:text-matte-purple transition-colors">
                  <Github size={20} />
                </a>
              )}
              {profile.socials.linkedin && (
                <a href={profile.socials.linkedin} className="text-matte-text-muted hover:text-matte-purple transition-colors">
                  <Linkedin size={20} />
                </a>
              )}
              {profile.socials.instagram && (
                <a href={profile.socials.instagram} className="text-matte-text-muted hover:text-matte-purple transition-colors">
                  <Instagram size={20} />
                </a>
              )}
            </div>
          </div>
          <p className="text-matte-text-muted text-sm flex items-center gap-1">
            Built with <Heart size={14} className="text-red-500 fill-red-500" /> and React
          </p>
        </div>
      </footer>

      {/* Back to Top */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-8 right-8 w-12 h-12 bg-matte-purple text-white rounded-full flex items-center justify-center shadow-lg z-50 hover:bg-matte-purple-light transition-colors"
          >
            <ArrowUp size={24} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
