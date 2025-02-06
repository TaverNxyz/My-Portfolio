import { useState } from "react";
import { Project } from "@/types/project";
import ProjectCard from "@/components/ProjectCard";
import ProjectForm from "@/components/ProjectForm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Github, MessageSquare } from "lucide-react";

const Index = () => {
  const { toast } = useToast();
  const [projects] = useState<Project[]>([
    {
      id: "1",
      title: "SecureDDropper",
      description: "EFT KD Dropper with Round Count and Map Selection",
      type: "repository",
      url: "https://github.com/TaverNxyz/SecureDDropper/releases/tag/v1.4.0",
      technologies: ["Python", "Batch"],
      image: "/lovable-uploads/7d60b015-386d-4c05-aa20-591ca8555c2d.png",
    },
    {
      id: "2",
      title: "PMC Planner",
      description: "Kappa Quest Tracker",
      type: "website",
      url: "https://kappa.plentifulpower.xyz/",
      technologies: ["HTML"],
      image: "/lovable-uploads/89f2a58e-8241-4acc-80e3-4f2ef404c3c9.png",
    },
  ]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false);
  const [password, setPassword] = useState("");
  const ADMIN_PASSWORD = "taver";

  const handleAuth = () => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthDialogOpen(false);
      setIsFormOpen(true);
      setPassword("");
    } else {
      toast({
        title: "Error",
        description: "Incorrect password",
        variant: "destructive",
      });
    }
  };

  const newProject: Project = {
    id: "3",
    title: "Ragelive.xyz LIVE STREAM RAGE",
    description: "😃",
    type: "website",
    url: "https://ragelive.xyz/",
    technologies: ["Web"],
    image: "/lovable-uploads/2cb7e248-a2f4-4fdc-965e-ab8f8b3faed1.png"
  };

  return (
    <>
      <div className="fixed inset-0 w-full h-full -z-10 pointer-events-none">
        <iframe
          src="https://www.youtube.com/embed/15TzQSNZJc0?autoplay=1&mute=1&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&loop=1&playlist=15TzQSNZJc0"
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
      </div>
      <div className="min-h-screen p-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center mb-16">
            <div className="relative mb-4">
              <img
                src="/lovable-uploads/a6176fc6-8240-40dd-aa8e-cf2242a79022.png"
                alt="Power Tools"
                className="w-96 animate-fade-in"
              />
              <div 
                className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent" 
                style={{
                  backgroundSize: '200% 100%',
                  animation: 'shimmer 2s infinite linear'
                }}
              />
            </div>
            
            <div className="flex gap-6 animate-fade-in">
              <a 
                href="https://github.com/TaverNxyz" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-white/80 hover:text-white transition-colors duration-300 story-link"
              >
                <Github className="w-5 h-5" />
                <span className="text-lg">TaverNxyz</span>
              </a>
              
              <a 
                href="https://discord.com/users/escobxrr_" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-white/80 hover:text-white transition-colors duration-300 story-link"
              >
                <MessageSquare className="w-5 h-5" />
                <span className="text-lg">escobxrr_ / .cynicalbc</span>
              </a>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
            <div className="w-full md:w-1/3">
              <ProjectCard
                key={projects[0].id}
                project={projects[0]}
                onEdit={() => setIsAuthDialogOpen(true)}
                onDelete={() => setIsAuthDialogOpen(true)}
              />
            </div>

            <div className="w-full md:w-1/3 glass overflow-hidden aspect-video">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/15TzQSNZJc0?autoplay=1&mute=0&controls=1&showinfo=0&rel=0&modestbranding=1&playsinline=1&enablejsapi=1"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>

            <div className="w-full md:w-1/3">
              <ProjectCard
                key={projects[1].id}
                project={projects[1]}
                onEdit={() => setIsAuthDialogOpen(true)}
                onDelete={() => setIsAuthDialogOpen(true)}
              />
            </div>
          </div>

          <div className="flex justify-center mb-8">
            <div className="w-full md:w-1/3">
              <ProjectCard
                key={newProject.id}
                project={newProject}
                onEdit={() => setIsAuthDialogOpen(true)}
                onDelete={() => setIsAuthDialogOpen(true)}
              />
            </div>
          </div>

          <Dialog open={isAuthDialogOpen} onOpenChange={setIsAuthDialogOpen}>
            <DialogContent className="glass sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Authentication Required</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <Input
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAuth()}
                />
                <Button onClick={handleAuth} className="w-full">
                  Submit
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          <ProjectForm
            isOpen={isFormOpen}
            onClose={() => setIsFormOpen(false)}
            onSave={() => {
              toast({
                title: "Success",
                description: "Project updated successfully",
              });
              setIsFormOpen(false);
            }}
          />
        </div>
      </div>
    </>
  );
};

export default Index;
