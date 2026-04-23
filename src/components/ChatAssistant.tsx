"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Cpu, User } from "lucide-react";
import { cn } from "@/lib/utils";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const quickPrompts = [
  "Show my projects",
  "Explain your AI work",
  "How can I contact you?"
];

export default function ChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Greetings. I am Nithish's AI Assistant. How can I help you learn more about his background, projects, or skills?" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: text };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    setError(null);

    try {
      const apiMessages = [...messages, userMessage].map(m => ({
        role: m.role,
        content: m.content
      }));

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: apiMessages }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch response");
      }

      setMessages(prev => [...prev, { role: "assistant", content: data.content }]);
    } catch (err: any) {
      console.error(err);
      setError(err.message);
      setMessages(prev => [...prev, { role: "assistant", content: "Error: " + err.message }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        id="ai-chat-btn"
        onClick={() => setIsOpen(true)}
        className={cn(
          "fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full flex items-center justify-center glass border-neon-cyan/50 text-white shadow-[0_0_20px_rgba(0,240,255,0.3)] transition-all duration-300 hover:scale-110 group",
          isOpen ? "scale-0 opacity-0 pointer-events-none" : "scale-100 opacity-100"
        )}
      >
        <MessageSquare size={24} className="group-hover:text-neon-cyan transition-colors" />
        <span className="absolute w-full h-full rounded-full border border-neon-cyan/50 animate-ping opacity-20"></span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            transition={{ type: "spring", damping: 20, stiffness: 200 }}
            style={{ transformOrigin: "bottom right" }}
            className="fixed bottom-6 right-6 z-50 w-[350px] sm:w-[400px] h-[500px] glass-card flex flex-col overflow-hidden border-neon-cyan/30 shadow-[0_10px_40px_rgba(0,0,0,0.5),0_0_20px_rgba(0,240,255,0.1)]"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/10 bg-white/5">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-neon-cyan/20 flex items-center justify-center">
                  <Cpu size={18} className="text-neon-cyan" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-white text-sm">AI Assistant</h3>
                  <p className="text-xs text-neon-cyan flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-neon-cyan animate-pulse"></span> Online
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-md hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
              {messages.map((msg, i) => (
                <div key={i} className={cn("flex gap-3", msg.role === "user" ? "justify-end" : "justify-start")}>
                  {msg.role === "assistant" && (
                    <div className="w-6 h-6 rounded-full bg-neon-cyan/20 flex items-center justify-center flex-shrink-0 mt-1">
                      <Cpu size={12} className="text-neon-cyan" />
                    </div>
                  )}
                  <div className={cn(
                    "px-4 py-2 rounded-2xl max-w-[80%] text-sm whitespace-pre-wrap",
                    msg.role === "user" ? "bg-white/10 text-white rounded-br-none" : "bg-neon-cyan/10 border border-neon-cyan/20 text-gray-200 rounded-bl-none"
                  )}>
                    {msg.content}
                  </div>
                  {msg.role === "user" && (
                    <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 mt-1">
                      <User size={12} className="text-gray-300" />
                    </div>
                  )}
                </div>
              ))}
              
              {isLoading && (
                <div className="flex gap-3 justify-start">
                  <div className="w-6 h-6 rounded-full bg-neon-cyan/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <Cpu size={12} className="text-neon-cyan" />
                  </div>
                  <div className="px-4 py-3 rounded-2xl bg-neon-cyan/10 border border-neon-cyan/20 text-gray-200 rounded-bl-none flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-neon-cyan rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></span>
                    <span className="w-1.5 h-1.5 bg-neon-cyan rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></span>
                    <span className="w-1.5 h-1.5 bg-neon-cyan rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Prompts */}
            {messages.length === 1 && !isLoading && (
              <div className="px-4 pb-2 flex flex-wrap gap-2">
                {quickPrompts.map((prompt) => (
                  <button
                    key={prompt}
                    onClick={() => sendMessage(prompt)}
                    className="text-xs px-3 py-1.5 rounded-full border border-white/10 text-gray-300 hover:text-white hover:bg-white/5 hover:border-white/20 transition-all"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            )}

            {/* Input Area */}
            <div className="p-4 border-t border-white/10 bg-black/20">
              <form 
                onSubmit={(e) => { e.preventDefault(); sendMessage(input); }}
                className="relative flex items-center"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask me anything..."
                  className="w-full bg-black/50 border border-white/10 rounded-full pl-4 pr-12 py-2.5 text-sm text-white focus:outline-none focus:border-neon-cyan/50 focus:ring-1 focus:ring-neon-cyan/50 transition-all placeholder:text-gray-500"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="absolute right-2 p-1.5 rounded-full text-neon-cyan hover:bg-neon-cyan/10 disabled:opacity-50 disabled:hover:bg-transparent transition-colors"
                >
                  <Send size={16} />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
