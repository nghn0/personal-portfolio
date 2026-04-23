"use client";

import { motion } from "framer-motion";
import { Send, Mail } from "lucide-react";

const GithubIcon = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
);

const LinkedinIcon = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
);
import { useState } from "react";

export default function Contact() {
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus("submitting");

    const form = e.currentTarget;
    const data = new FormData(form);
    const name = data.get("name") || "";
    const email = data.get("email") || "";
    const message = data.get("message") || "";

    try {
      window.location.href = `mailto:nithi9905@gmail.com?subject=Portfolio Inquiry from ${name}&body=${encodeURIComponent(message.toString() + "\n\nReply to: " + email)}`;
      
      setFormStatus("success");
      form.reset();
      setTimeout(() => setFormStatus("idle"), 5000);
    } catch (error) {
      setFormStatus("error");
    }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-[#0a0a0f]">
      <div className="absolute inset-0 z-0 opacity-30">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neon-cyan/5 rounded-full blur-[150px]"></div>
      </div>

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">
            Initialize <span className="text-neon-cyan">Connection</span>
          </h2>
          <div className="h-1 w-20 bg-neon-cyan/50 rounded-full mx-auto shadow-[0_0_10px_rgba(0,240,255,0.5)]"></div>
          <p className="mt-6 text-gray-400 font-body">Ready to build the next generation of intelligent systems?</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 lg:gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="md:col-span-2 space-y-6"
          >
            <div className="glass-card p-6">
              <h3 className="text-xl font-heading font-bold text-white mb-6">Contact Info</h3>
              
              <div className="space-y-4">
                <a href="mailto:nithi9905@gmail.com" className="flex items-center gap-4 text-gray-400 hover:text-neon-cyan transition-colors group">
                  <div className="w-10 h-10 shrink-0 rounded-full glass flex items-center justify-center group-hover:border-neon-cyan/50 transition-colors">
                    <Mail size={18} />
                  </div>
                  <span>nithi9905@gmail.com</span>
                </a>
                
                <a href="https://github.com/nghn0" target="_blank" rel="noreferrer" className="flex items-center gap-4 text-gray-400 hover:text-white transition-colors group">
                  <div className="w-10 h-10 shrink-0 rounded-full glass flex items-center justify-center group-hover:border-white/50 transition-colors">
                    <GithubIcon size={18} />
                  </div>
                  <span>github.com/nghn0</span>
                </a>
                
                <a href="https://linkedin.com/in/nithishgowda" target="_blank" rel="noreferrer" className="flex items-center gap-4 text-gray-400 hover:text-[#0077b5] transition-colors group">
                  <div className="w-10 h-10 shrink-0 rounded-full glass flex items-center justify-center group-hover:border-[#0077b5]/50 transition-colors">
                    <LinkedinIcon size={18} />
                  </div>
                  <span>linkedin.com/in/nithishgowda</span>
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="md:col-span-3"
          >
            <form onSubmit={handleSubmit} className="glass-card p-6 md:p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-gray-400 font-accent uppercase tracking-wider">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neon-cyan/50 focus:ring-1 focus:ring-neon-cyan/50 transition-all placeholder:text-gray-600"
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-gray-400 font-accent uppercase tracking-wider">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neon-cyan/50 focus:ring-1 focus:ring-neon-cyan/50 transition-all placeholder:text-gray-600"
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-gray-400 font-accent uppercase tracking-wider">Message</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neon-cyan/50 focus:ring-1 focus:ring-neon-cyan/50 transition-all placeholder:text-gray-600 resize-none"
                  placeholder="Tell me about your project..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={formStatus === "submitting"}
                className="w-full relative group px-8 py-4 bg-neon-cyan/10 border border-neon-cyan/50 rounded-xl font-bold text-white overflow-hidden transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {formStatus === "submitting" ? "Transmitting..." : 
                   formStatus === "success" ? "Message Sent!" : 
                   formStatus === "error" ? "Error Sending" : 
                   "Send Message"} 
                  {formStatus === "idle" && <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
                </span>
                <div className="absolute inset-0 h-full w-0 bg-neon-cyan/20 transition-all duration-300 ease-out group-hover:w-full"></div>
              </button>

              {formStatus === "success" && (
                <p className="text-green-400 text-sm text-center">Transmission successful. I'll be in touch soon.</p>
              )}
              {formStatus === "error" && (
                <p className="text-red-400 text-sm text-center">Connection failed. Please try again or use direct email.</p>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
