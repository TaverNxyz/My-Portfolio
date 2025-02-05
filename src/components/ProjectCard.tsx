
import { Project } from "@/types/project";
import { Link2, Github, Folder } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface ProjectCardProps {
  project: Project;
  onEdit: (project: Project) => void;
  onDelete: (id: string) => void;
}

const ProjectCard = ({ project, onEdit, onDelete }: ProjectCardProps) => {
  const getIcon = () => {
    switch (project.type) {
      case "website":
        return <Link2 className="w-4 h-4" />;
      case "repository":
        return <Github className="w-4 h-4" />;
      default:
        return <Folder className="w-4 h-4" />;
    }
  };

  const renderMedia = () => {
    if (!project.image) return null;

    if (project.isIframe) {
      return (
        <iframe
          src={project.image}
          className="w-full aspect-video rounded-md mb-4"
          allowFullScreen
          loading="lazy"
        />
      );
    }

    return (
      <div className="relative w-full aspect-video mb-4 overflow-hidden rounded-md">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
    );
  };

  return (
    <Card className="project-card glass animate-fade-in">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-semibold">{project.title}</CardTitle>
        <div className="flex items-center space-x-2">
          <span className="flex items-center space-x-1 text-sm text-gray-500">
            {getIcon()}
          </span>
        </div>
      </CardHeader>
      <CardContent>
        {renderMedia()}
        <CardDescription className="text-sm text-gray-600 mb-4">
          {project.description}
        </CardDescription>
        <div className="flex justify-between items-center">
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
          >
            Visit {project.type}
          </a>
          <div className="flex space-x-2">
            <button
              onClick={() => onEdit(project)}
              className="text-sm text-gray-600 hover:text-gray-800 transition-colors"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(project.id)}
              className="text-sm text-red-600 hover:text-red-800 transition-colors"
            >
              Delete
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;
