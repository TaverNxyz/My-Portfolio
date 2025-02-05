
import { useState } from "react";
import { Project, ProjectType } from "@/types/project";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const useProjects = () => {
  const { toast } = useToast();
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      const typedProjects: Project[] = (data || []).map(item => ({
        id: item.id,
        title: item.title,
        description: item.description,
        type: item.type as ProjectType,
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

  const addProject = async (projectData: Omit<Project, "id">) => {
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
      return true;
    } catch (error) {
      console.error('Error adding project:', error);
      toast({
        title: "Error",
        description: "Failed to add project",
        variant: "destructive",
      });
      return false;
    }
  };

  const updateProject = async (projectId: string, projectData: Omit<Project, "id">) => {
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
        .eq('id', projectId);

      if (error) throw error;

      const updatedProjects = projects.map((p) =>
        p.id === projectId ? { ...projectData, id: projectId } : p
      );
      setProjects(updatedProjects);
      toast({
        title: "Success",
        description: "Project updated successfully",
      });
      return true;
    } catch (error) {
      console.error('Error updating project:', error);
      toast({
        title: "Error",
        description: "Failed to update project",
        variant: "destructive",
      });
      return false;
    }
  };

  const deleteProject = async (id: string) => {
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
      return true;
    } catch (error) {
      console.error('Error deleting project:', error);
      toast({
        title: "Error",
        description: "Failed to delete project",
        variant: "destructive",
      });
      return false;
    }
  };

  return {
    projects,
    isLoading,
    fetchProjects,
    addProject,
    updateProject,
    deleteProject
  };
};
