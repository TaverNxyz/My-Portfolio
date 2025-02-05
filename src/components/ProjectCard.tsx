
import { Project } from "@/types/project";
import { Link2, Github, Folder, ExternalLink } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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
      <div className="relative w-full aspect-video mb-4 overflow-hidden rounded-md group">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <ExternalLink className="w-6 h-6 text-white" />
        </div>
      </div>
    );
  };

  return (
    <Card className="project-card glass animate-fade-in group hover:bg-white/10 transition-colors duration-300">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-semibold group-hover:text-primary transition-colors">
          {project.title}
        </CardTitle>
        <div className="flex items-center space-x-2">
          <span className="flex items-center space-x-1 text-sm text-gray-500">
            {getIcon()}
          </span>
        </div>
      </CardHeader>
      <CardContent>
        {renderMedia()}
        <CardDescription className="text-sm text-gray-400 mb-4">
          {project.description}
        </CardDescription>
        {project.technologies && (
          <div className="flex flex-wrap gap-2 mb-4">
            {project.technologies.map((tech) => (
              <Badge
                key={tech}
                variant="secondary"
                className="bg-white/5 hover:bg-white/10 transition-colors"
              >
                {tech}
              </Badge>
            ))}
          </div>
        )}
        <div className="flex justify-between items-center">
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1"
          >
            Visit {project.type}
            <ExternalLink className="w-3 h-3" />
          </a>
          <div className="flex space-x-2">
            <button
              onClick={() => onEdit(project)}
              className="text-sm text-gray-400 hover:text-gray-200 transition-colors"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(project.id)}
              className="text-sm text-red-400 hover:text-red-300 transition-colors"
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
