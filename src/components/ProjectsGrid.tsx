
import { Project } from "@/types/project";
import ProjectCard from "@/components/ProjectCard";

interface ProjectsGridProps {
  projects: Project[];
  newProject: Project;
  onEdit: () => void;
  onDelete: () => void;
}

const ProjectsGrid = ({ projects, newProject, onEdit, onDelete }: ProjectsGridProps) => {
  return (
    <>
      <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
        <div className="w-full md:w-1/3">
          <ProjectCard
            key={projects[0].id}
            project={projects[0]}
            onEdit={onEdit}
            onDelete={onDelete}
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
            onEdit={onEdit}
            onDelete={onDelete}
          />
        </div>
      </div>

      <div className="flex justify-center mb-8">
        <div className="w-full md:w-1/3">
          <ProjectCard
            key={newProject.id}
            project={newProject}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        </div>
      </div>
    </>
  );
};

export default ProjectsGrid;
