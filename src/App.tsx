/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
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
  Heart,
  Menu,
  X,
  ChevronRight
} from 'lucide-react';
import { ProfileData } from './types';

export default function App() {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
    { name: 'Education', href: '#education' },
    { name: 'Skills', href: '#skills' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <div className="relative">
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
                  className="matte-button matte-button-primary justify-center"
                >
                  Resume
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main className="pt-20">
        {/* Hero Section */}
        <section className="min-h-[90vh] flex items-center px-6">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-matte-purple font-medium mb-4 tracking-wider uppercase text-sm">Welcome to my world</h2>
              <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 leading-tight">
                I'm <span className="purple-gradient-text">{profile.name}</span>
              </h1>
              <p className="text-xl text-matte-text-muted mb-8 max-w-lg leading-relaxed">
                {profile.title}.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="#contact" className="matte-button matte-button-primary">
                  Contact Me
                </a>
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
                <a href={profile.resume} className="matte-button matte-button-primary w-full justify-center">
                  <Download size={18} /> Download CV
                </a>
              </div>
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
          <p className="text-matte-text-muted text-sm flex items-center gap-1">
            Built with <Heart size={14} className="text-red-500 fill-red-500" /> and React
          </p>
        </div>
      </footer>
    </div>
  );
}
