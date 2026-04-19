import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExternalLink, Github, X, Play } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import MatrixRain from "./MatrixRain";
import { useHref } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "Sorting Visualizer",
    description: "A full-featured sorting visualizer that helps in understanding different algorithms.",
    longDescription:
      "🚀 A React-based Algorithm Visualizer that demonstrates how sorting algorithms work through step-by-step animations. Features real-time comparison counting, color-coded states (active, pivot, sorted), and adjustable speed/size controls for an interactive learning experience. ",
    tech: ["React","JavaScript", "HTML", "CSS"],
    videoUrl: "/portfolio/demo.mp4",
    github: "https://github.com/Anshsing/sorting-visualizer",
    live: "https://algorithm-visualizer-liard-phi.vercel.app/",
  },
  {
    title: "Localist",
    description: "Real-time hyperlocal clothing discovery app",
    longDescription:
      "Built a hyperlocal platform to discover clothing from nearby shops with smart filters Managed a group of 5 developers and a survey team in collecting local data and consumerinterest. Developed user and shopkeeper interfaces for browsing, uploading, and managing inventory.",
    tech: ["React","React Native","Tailwind", "Node.js", "Express", "MongoDB"],
    Image: "/portfolio/_MConverter.eu_localist.mp4",
    github: "https://github.com/Anshsing/localist",
    
  },
 
];

const ProjectsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [selectedProject, setSelectedProject] = useState<(typeof projects)[0] | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const cards = sectionRef.current?.querySelectorAll(".project-card");
    if (cards) {
      gsap.fromTo(
        cards,
        { y: 60, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.7,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        }
      );
    }
  }, []);

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <>
      <section id="projects" ref={sectionRef} className="py-24 md:py-32 relative overflow-hidden">
        <MatrixRain charCount={20} />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-foreground/[0.015] blur-3xl animate-breathe" />

        <div className="section-container relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <div className="w-16 h-1 bg-foreground rounded-full mb-12" />

          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((project, i) => (
              <div
                key={i}
                className="project-card group relative overflow-hidden rounded-xl border border-border/50 bg-card card-shadow hover:border-foreground/20 transition-all duration-500 hover:-translate-y-1 cursor-pointer"
                onClick={() => {
                  setSelectedProject(project);
                  setIsPlaying(false);
                }}
              >
                {/* Project image placeholder with shimmer */}
                <div className="h-48 bg-muted flex items-center justify-center border-b border-border/50 relative overflow-hidden">
                  <div
                    className="absolute inset-0 animate-shimmer opacity-30"
                    style={{
                      backgroundImage:
                        "linear-gradient(90deg, transparent 0%, hsl(var(--foreground) / 0.04) 50%, transparent 100%)",
                      backgroundSize: "200% 100%",
                    }}
                  />
                  <div className="relative z-10 flex flex-col items-center gap-2">
                    <Play className="w-8 h-8 text-muted-foreground opacity-50 group-hover:opacity-100 transition-opacity duration-300" />
                    <span className="text-xs text-muted-foreground">Click to view project</span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-semibold group-hover:opacity-70 transition-opacity duration-300">
                      {project.title}
                    </h3>
                    <div className="flex gap-2">
                      
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="px-3 py-1 text-xs font-medium rounded-full bg-muted text-muted-foreground border border-border/50"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Detail Dialog */}
      <Dialog open={!!selectedProject} onOpenChange={(open) => !open && setSelectedProject(null)}>
        <DialogContent className="max-w-3xl p-0 overflow-hidden bg-card border-border">
          {selectedProject && (
            <>
              {/* Video Section */}
              <div className="relative w-full aspect-video bg-primary/5 overflow-hidden">
                <video
                  ref={videoRef}
                  src={selectedProject.videoUrl}
                  className="w-full h-full object-cover"
                  controls={isPlaying}
                  playsInline
                  onEnded={() => setIsPlaying(false)}
                />
                {!isPlaying && (
                  <button
                    onClick={handlePlay}
                    className="absolute inset-0 flex items-center justify-center bg-primary/10 hover:bg-primary/20 transition-colors duration-300 group/play"
                  >
                    <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg group-hover/play:scale-110 transition-transform duration-300">
                      <Play className="w-6 h-6 ml-1" />
                    </div>
                  </button>
                )}
              </div>

              {/* Info Section */}
              <div className="p-6 md:p-8">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold mb-2">{selectedProject.title}</DialogTitle>
                  <DialogDescription className="text-base text-muted-foreground leading-relaxed">
                    {selectedProject.longDescription}
                  </DialogDescription>
                </DialogHeader>

                <div className="mt-6">
                  <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                    Tech Stack
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tech.map((t) => (
                      <span
                        key={t}
                        className="px-4 py-1.5 text-sm font-medium rounded-full bg-muted text-foreground border border-border/50"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3 mt-8">
                  <a
                    href={selectedProject.github}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-border bg-card text-foreground font-medium hover:bg-muted transition-colors duration-300 text-sm"
                  >
                    <Github className="w-4 h-4" />
                    View Code
                  </a>
                  <a
                    href={selectedProject.live}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity duration-300 text-sm"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Live Demo
                  </a>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProjectsSection;
