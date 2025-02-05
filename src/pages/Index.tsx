
import { useState, useEffect } from "react";
import { Project } from "@/types/project";
import ProjectCard from "@/components/ProjectCard";
import ProjectForm from "@/components/ProjectForm";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const STORAGE_KEY = "project_showcase_data";
const ADMIN_KEY = "your-secret-key"; // Replace this with a secure authentication method

const Index = () => {
  const { toast } = useToast();
  const [projects, setProjects] = useState<Project[]>([
    {
      id: "1",
      title: "SecureDDropper",
      description: "EFT KD Dropper with Round Count and Map Selection",
      type: "repository",
      url: "https://github.com/TaverNxyz/SecureDDropper/releases/tag/v1.4.0",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475", // Using a placeholder tech image
    }
  ]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | undefined>();
  const [isAdmin, setIsAdmin] = useState(false);

  // Check if user is admin
  useEffect(() => {
    const adminKey = localStorage.getItem('admin_key');
    setIsAdmin(adminKey === ADMIN_KEY);
  }, []);

  // Load projects from localStorage on initial render
  useEffect(() => {
    const savedProjects = localStorage.getItem(STORAGE_KEY);
    if (savedProjects) {
      setProjects(JSON.parse(savedProjects));
    }
  }, []);

  // Save projects to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  }, [projects]);

  const handleAddProject = (projectData: Omit<Project, "id">) => {
    if (!isAdmin) {
      toast({
        title: "Access Denied",
        description: "You don't have permission to add projects",
        variant: "destructive",
      });
      return;
    }
    const newProject: Project = {
      ...projectData,
      id: Date.now().toString(),
    };
    setProjects([...projects, newProject]);
    toast({
      title: "Success",
      description: "Project added successfully",
    });
  };

  const handleEditProject = (project: Project) => {
    if (!isAdmin) {
      toast({
        title: "Access Denied",
        description: "You don't have permission to edit projects",
        variant: "destructive",
      });
      return;
    }
    setEditingProject(project);
    setIsFormOpen(true);
  };

  const handleUpdateProject = (projectData: Omit<Project, "id">) => {
    if (!isAdmin) {
      toast({
        title: "Access Denied",
        description: "You don't have permission to update projects",
        variant: "destructive",
      });
      return;
    }
    if (!editingProject) return;
    const updatedProjects = projects.map((p) =>
      p.id === editingProject.id ? { ...projectData, id: p.id } : p
    );
    setProjects(updatedProjects);
    setEditingProject(undefined);
    toast({
      title: "Success",
      description: "Project updated successfully",
    });
  };

  const handleDeleteProject = (id: string) => {
    if (!isAdmin) {
      toast({
        title: "Access Denied",
        description: "You don't have permission to delete projects",
        variant: "destructive",
      });
      return;
    }
    setProjects(projects.filter((p) => p.id !== id));
    toast({
      title: "Success",
      description: "Project deleted successfully",
    });
  };

  return (
    <>
      <video
        id="video-background"
        autoPlay
        loop
        muted
        playsInline
        className="fixed inset-0 w-full h-full object-cover"
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
              <h1 className="text-4xl font-bold bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">
                My Repos
              </h1>
              <p className="text-gray-400 mt-2">
                Showcase your websites, repositories, and projects
              </p>
            </div>
            {isAdmin && (
              <Button
                onClick={() => {
                  setEditingProject(undefined);
                  setIsFormOpen(true);
                }}
                className="glass hover:bg-white/10 transition-all duration-300 text-lg px-6 py-3"
              >
                <Plus className="w-5 h-5 mr-2" />
                Add Project
              </Button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onEdit={handleEditProject}
                onDelete={handleDeleteProject}
              />
            ))}
          </div>

          <ProjectForm
            project={editingProject}
            isOpen={isFormOpen}
            onClose={() => {
              setIsFormOpen(false);
              setEditingProject(undefined);
            }}
            onSave={editingProject ? handleUpdateProject : handleAddProject}
          />
        </div>
      </div>
    </>
  );
};

export default Index;
