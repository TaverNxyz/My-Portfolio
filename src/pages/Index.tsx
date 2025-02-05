
import { useState, useEffect } from "react";
import { Project } from "@/types/project";
import ProjectGrid from "@/components/ProjectGrid";
import ProjectForm from "@/components/ProjectForm";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useAdmin } from "@/hooks/useAdmin";
import { useProjects } from "@/hooks/useProjects";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const { toast } = useToast();
  const isAdmin = useAdmin();
  const { projects, isLoading, fetchProjects, addProject, updateProject, deleteProject } = useProjects();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | undefined>();

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleAddProject = async (projectData: Omit<Project, "id">) => {
    if (!isAdmin) {
      toast({
        title: "Access Denied",
        description: "You don't have permission to add projects",
        variant: "destructive",
      });
      return;
    }

    const success = await addProject(projectData);
    if (success) {
      setIsFormOpen(false);
    }
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

  const handleUpdateProject = async (projectData: Omit<Project, "id">) => {
    if (!isAdmin || !editingProject) {
      toast({
        title: "Access Denied",
        description: "You don't have permission to update projects",
        variant: "destructive",
      });
      return;
    }

    const success = await updateProject(editingProject.id, projectData);
    if (success) {
      setEditingProject(undefined);
      setIsFormOpen(false);
    }
  };

  const handleDeleteProject = async (id: string) => {
    if (!isAdmin) {
      toast({
        title: "Access Denied",
        description: "You don't have permission to delete projects",
        variant: "destructive",
      });
      return;
    }

    await deleteProject(id);
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
      <div className="min-h-screen p-8">
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

          <ProjectGrid
            projects={projects}
            isLoading={isLoading}
            onEdit={handleEditProject}
            onDelete={handleDeleteProject}
          />

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
