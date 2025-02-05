
import { useState, useEffect } from "react";
import { Project, ProjectType } from "@/types/project";
import ProjectCard from "@/components/ProjectCard";
import ProjectForm from "@/components/ProjectForm";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const ADMIN_KEY = "your-secret-key"; // This is the exact key you need to use

const Index = () => {
  const { toast } = useToast();
  const [projects, setProjects] = useState<Project[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | undefined>();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is admin
  useEffect(() => {
    const adminKey = localStorage.getItem('admin_key');
    console.log('Current admin key:', adminKey); // Debug log
    const isAdminUser = adminKey === ADMIN_KEY;
    console.log('Is admin?', isAdminUser); // Debug log
    setIsAdmin(isAdminUser);
  }, []);

  // Load projects from Supabase on initial render
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          throw error;
        }

        // Map the data to ensure type safety
        const typedProjects: Project[] = (data || []).map(item => ({
          id: item.id,
          title: item.title,
          description: item.description,
          type: item.type as ProjectType, // Cast to ProjectType
          url: item.url,
          image: item.image || undefined,
          isIframe: item.is_iframe || false,
          created_at: item.created_at,
          updated_at: item.updated_at,
          user_id: item.user_id
        }));

        setProjects(typedProjects);
      } catch (error) {
        console.error('Error fetching projects:', error);
        toast({
          title: "Error",
          description: "Failed to load projects",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, [toast]);

  const handleAddProject = async (projectData: Omit<Project, "id">) => {
    if (!isAdmin) {
      toast({
        title: "Access Denied",
        description: "You don't have permission to add projects",
        variant: "destructive",
      });
      return;
    }

    try {
      const { data, error } = await supabase
        .from('projects')
        .insert([{
          title: projectData.title,
          description: projectData.description,
          type: projectData.type,
          url: projectData.url,
          image: projectData.image,
          is_iframe: projectData.isIframe,
          user_id: (await supabase.auth.getUser()).data.user?.id
        }])
        .select()
        .single();

      if (error) throw error;

      // Map the response to match our Project type
      const newProject: Project = {
        id: data.id,
        title: data.title,
        description: data.description,
        type: data.type as ProjectType,
        url: data.url,
        image: data.image || undefined,
        isIframe: data.is_iframe || false,
        created_at: data.created_at,
        updated_at: data.updated_at,
        user_id: data.user_id
      };

      setProjects([newProject, ...projects]);
      toast({
        title: "Success",
        description: "Project added successfully",
      });
    } catch (error) {
      console.error('Error adding project:', error);
      toast({
        title: "Error",
        description: "Failed to add project",
        variant: "destructive",
      });
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

    try {
      const { error } = await supabase
        .from('projects')
        .update({
          title: projectData.title,
          description: projectData.description,
          type: projectData.type,
          url: projectData.url,
          image: projectData.image,
          is_iframe: projectData.isIframe,
          updated_at: new Date().toISOString(),
        })
        .eq('id', editingProject.id);

      if (error) throw error;

      const updatedProjects = projects.map((p) =>
        p.id === editingProject.id ? { ...projectData, id: editingProject.id } : p
      );
      setProjects(updatedProjects);
      setEditingProject(undefined);
      toast({
        title: "Success",
        description: "Project updated successfully",
      });
    } catch (error) {
      console.error('Error updating project:', error);
      toast({
        title: "Error",
        description: "Failed to update project",
        variant: "destructive",
      });
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

    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setProjects(projects.filter((p) => p.id !== id));
      toast({
        title: "Success",
        description: "Project deleted successfully",
      });
    } catch (error) {
      console.error('Error deleting project:', error);
      toast({
        title: "Error",
        description: "Failed to delete project",
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

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-white/5 rounded-lg h-64"></div>
                </div>
              ))}
            </div>
          ) : (
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
          )}

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
