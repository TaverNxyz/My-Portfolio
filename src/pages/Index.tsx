
import { useState } from "react";
import { Project } from "@/types/project";
import ProjectForm from "@/components/ProjectForm";
import { useToast } from "@/hooks/use-toast";
import TerminalLoader from "@/components/TerminalLoader";
import Header from "@/components/Header";
import VideoBackground from "@/components/VideoBackground";
import AuthDialog from "@/components/AuthDialog";
import ProjectsGrid from "@/components/ProjectsGrid";

const Index = () => {
  const { toast } = useToast();
  const [showContent, setShowContent] = useState(false);
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
  },
  {
    id: "4",
    title: "TaskTacklers",
    description: "Community Elimination Kill Boosting",
    type: "website",
    url: "https://eftb00st.plentifulpower.xyz/",
    technologies: ["HTML"],
    image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fblog.wtfast.com%2Fblog%2Fthe-best-escape-from-tarkov-graphic-settings&psig=AOvVaw3hO1DDU7h8wGUnlV8JFd7y&ust=1739800593484000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCNin_7isyIsDFQAAAAAdAAAAABAE",
  },


  if (!showContent) {
    return <TerminalLoader onComplete={() => setShowContent(true)} />;
  }

  return (
    <>
      <VideoBackground />
      <div className="min-h-screen p-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <Header />
          <ProjectsGrid
            projects={projects}
            newProject={newProject}
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
