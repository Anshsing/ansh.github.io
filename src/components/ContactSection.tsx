import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Github, Linkedin, Twitter, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import FloatingParticles from "./FloatingParticles";

gsap.registerPlugin(ScrollTrigger);

const ContactSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);

  useEffect(() => {
    const els = sectionRef.current?.querySelectorAll(".gsap-reveal");
    if (els) {
      gsap.fromTo(
        els,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        }
      );
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast({ title: "Please fill in all fields", variant: "destructive" });
      return;
    }
    setSending(true);
    setTimeout(() => {
      setSending(false);
      toast({ title: "Message sent!", description: "I'll get back to you soon." });
      setForm({ name: "", email: "", message: "" });
    }, 1000);
  };

  return (
    <section id="contact" ref={sectionRef} className="py-24 md:py-32 relative overflow-hidden">
      <FloatingParticles count={8} />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full bg-foreground/[0.02] blur-3xl animate-breathe" />

      <div className="section-container relative z-10">
        <div className="text-center mb-16">
          <h2 className="gsap-reveal text-3xl md:text-5xl font-bold mb-4">
            Let's <span className="gradient-text">Connect</span>
          </h2>
          <div className="gsap-reveal w-16 h-1 bg-foreground rounded-full mb-8 mx-auto" />
          <p className="gsap-reveal text-muted-foreground max-w-lg mx-auto text-balance">
            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
          </p>
        </div>

        <div className="gsap-reveal max-w-lg mx-auto">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid sm:grid-cols-2 gap-4">
              <Input
                placeholder="Your Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                maxLength={100}
                className="bg-card border-border"
              />
              <Input
                type="email"
                placeholder="Your Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                maxLength={255}
                className="bg-card border-border"
              />
            </div>
            <Textarea
              placeholder="Your Message"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              maxLength={1000}
              rows={5}
              className="bg-card border-border resize-none"
            />
            <Button type="submit" disabled={sending} className="w-full gap-2 group">
              <Send className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              {sending ? "Sending..." : "Send Message"}
            </Button>
          </form>
        </div>

        <div className="gsap-reveal flex items-center justify-center gap-4 mt-12">
          {[
            { icon: Github, href: "https://github.com/Anshsing/", label: "GitHub" },
            { icon: Linkedin, href: "https://www.linkedin.com/in/anshsingh132", label: "LinkedIn" },
          ].map(({ icon: Icon, href, label }, i) => (
            <a
              key={label}
              href={href}
              className="p-3 rounded-lg bg-card border border-border/50 hover:border-foreground/20 hover:bg-accent transition-all duration-300 card-shadow animate-float"
              style={{ animationDelay: `${i * 0.3}s` }}
              aria-label={label}
            >
              <Icon className="w-5 h-5 text-muted-foreground" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
