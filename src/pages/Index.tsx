
import { useState, useEffect } from "react";
import { Project } from "@/types/project";
import ProjectForm from "@/components/ProjectForm";
import { useToast } from "@/hooks/use-toast";
import TerminalLoader from "@/components/TerminalLoader";
import Header from "@/components/Header";
import VideoBackground from "@/components/VideoBackground";
import AuthDialog from "@/components/AuthDialog";
import ProjectsGrid from "@/components/ProjectsGrid";
import { shouldShowTerminal, markTerminalAsShown } from "@/utils/sessionManager";

const Index = () => {
  const { toast } = useToast();
  const [showContent, setShowContent] = useState(false);
  const [shouldAnimate, setShouldAnimate] = useState(false);
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
    {
      id: "4",
      title: "EZTask",
      description: "Community Driven Kill-Boosting Discord Made For Ch34ters To Complete Kill-Requirement Tasks on One Another Without The Risk Of A Ban",
      type: "website",
      url: "https://eztask.plentifulpower.xyz",
      technologies: ["Web", "React"],
      image: "/lovable-uploads/8636df90-3a30-4a91-9cad-f53e90b55a58.png",
    }
  ]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false);
  const [password, setPassword] = useState("");
  const ADMIN_PASSWORD = "taver";

  useEffect(() => {
    const needsTerminal = shouldShowTerminal();
    if (!needsTerminal) {
      setShowContent(true);
      setTimeout(() => setShouldAnimate(true), 100);
    }
  }, []);

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

  const handleTerminalComplete = () => {
    markTerminalAsShown();
    setShowContent(true);
    setTimeout(() => setShouldAnimate(true), 100);
  };

  if (!showContent) {
    return <TerminalLoader onComplete={handleTerminalComplete} />;
  }

  return (
    <>
      <VideoBackground />
      <div 
        className={`min-h-screen p-8 relative z-10 transition-all duration-1000 transform ${
          shouldAnimate ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <Header />
          <ProjectsGrid
            projects={projects}
            onEdit={() => setIsAuthDialogOpen(true)}
            onDelete={() => setIsAuthDialogOpen(true)}
          />

          <AuthDialog
            isOpen={isAuthDialogOpen}
            onOpenChange={setIsAuthDialogOpen}
            password={password}
            onPasswordChange={setPassword}
            onSubmit={handleAuth}
          />

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
