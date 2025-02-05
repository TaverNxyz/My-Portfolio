
import { useState } from "react";
import { Project } from "@/types/project";
import ProjectCard from "@/components/ProjectCard";
import ProjectForm from "@/components/ProjectForm";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const { toast } = useToast();
  const [projects, setProjects] = useState<Project[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | undefined>();

  const handleAddProject = (projectData: Omit<Project, "id">) => {
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
    setEditingProject(project);
    setIsFormOpen(true);
  };

  const handleUpdateProject = (projectData: Omit<Project, "id">) => {
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
      <div className="min-h-screen p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold">My Projects</h1>
              <p className="text-gray-400 mt-2">
                Showcase your websites, repositories, and projects
              </p>
            </div>
            <Button
              onClick={() => {
                setEditingProject(undefined);
                setIsFormOpen(true);
              }}
              className="glass"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Project
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
