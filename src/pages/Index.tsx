
import { useState } from "react";
import { Project } from "@/types/project";
import ProjectCard from "@/components/ProjectCard";
import ProjectForm from "@/components/ProjectForm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

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
  const ADMIN_PASSWORD = "taver"; // Simple password for demonstration

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

  return (
    <>
      <video
        id="video-background"
        autoPlay
        loop
        muted
        playsInline
        className="fixed inset-0 w-full h-full object-cover -z-10"
      >
        <source
          src="https://cdn.pixabay.com/video/2020/08/27/48420-453832153_large.mp4"
          type="video/mp4"
        />
      </video>
      <div className="min-h-screen p-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold">My Projects</h1>
              <p className="text-gray-400 mt-2">
                Showcase your websites, repositories, and projects
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onEdit={() => setIsAuthDialogOpen(true)}
                onDelete={() => setIsAuthDialogOpen(true)}
              />
            ))}
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
