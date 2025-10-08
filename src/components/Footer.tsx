'use client'

import React from 'react';
import { Github, Linkedin, Mail, Phone } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white/5 backdrop-blur-sm border-t border-white/10 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Personal Info */}
          <div className="space-y-4">
            <h3 className="text-white text-xl font-bold">Vipat Choknantawong</h3>
            <p className="text-white/70 text-sm leading-relaxed">
              Full Stack Developer & Freelancer
            </p>
            <p className="text-white/70 text-sm leading-relaxed">
              Passionate about creating innovative solutions and bringing ideas to life through technology.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-white text-lg font-semibold">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#about" className="text-white/70 hover:text-white transition-colors duration-200 text-sm">
                  About
                </a>
              </li>
              <li>
                <a href="#educate" className="text-white/70 hover:text-white transition-colors duration-200 text-sm">
                  Education
                </a>
              </li>
              <li>
                <a href="#stack" className="text-white/70 hover:text-white transition-colors duration-200 text-sm">
                  Tech Stack
                </a>
              </li>
              <li>
                <a href="#project" className="text-white/70 hover:text-white transition-colors duration-200 text-sm">
                  Projects
                </a>
              </li>
              <li>
                <a href="#certificates" className="text-white/70 hover:text-white transition-colors duration-200 text-sm">
                  Certificates
                </a>
              </li>
              <li>
                <a href="#activity" className="text-white/70 hover:text-white transition-colors duration-200 text-sm">
                  Activities
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-white text-lg font-semibold">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail size={16} className="text-white/70" />
                <a 
                  href="mailto:vipat.choknantawong@gmail.com" 
                  className="text-white/70 hover:text-white transition-colors duration-200 text-sm"
                >
                  vipat.choknantawong@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={16} className="text-white/70" />
                <span className="text-white/70 text-sm">+66 064 930 4461</span>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h4 className="text-white text-lg font-semibold">Follow Me</h4>
            <div className="flex gap-4">
              <a
                href="https://github.com/takopiii"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all duration-200 hover:scale-110"
                aria-label="GitHub"
              >
                <Github size={20} className="text-white" />
              </a>
              <a
                href="https://linkedin.com/in/vipat-choknantawong"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all duration-200 hover:scale-110"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} className="text-white" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-8 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-white/60 text-sm">
              © 2024 Vipat Choknantawong. All rights reserved.
            </p>
            <p className="text-white/60 text-sm">
              Made with ❤️ using Next.js & Tailwind CSS
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
