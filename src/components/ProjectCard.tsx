import { Project } from "@/types/project";
import { Link2, Github, Folder, ExternalLink, Pencil, Trash2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ProjectCardProps {
  project: Project;
  onEdit: (project: Project) => void;
  onDelete: (id: string) => void;
}

const ProjectCard = ({ project, onEdit, onDelete }: ProjectCardProps) => {
  const ADMIN_KEY = "your-secret-key"; // Make sure this matches exactly
  const isAdmin = localStorage.getItem('admin_key') === ADMIN_KEY;
  console.log('ProjectCard admin check:', { 
    storedKey: localStorage.getItem('admin_key'),
    isAdmin 
  }); // Debug log

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

  const detectTechnologies = (url: string): string[] => {
    const techs: string[] = [];
    const lowerUrl = url.toLowerCase();

    // GitHub repository detection
    if (lowerUrl.includes('github.com')) {
      techs.push('GitHub');
    }

    // Common web technologies
    if (lowerUrl.includes('vercel.app')) {
      techs.push('Vercel');
    }
    if (lowerUrl.includes('netlify.app')) {
      techs.push('Netlify');
    }

    // Add more technology detection logic here
    return techs;
  };

  const renderMedia = () => {
    if (!project.image) return null;

    if (project.isIframe) {
      return (
        <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-4">
          <iframe
            src={project.image}
            className="w-full h-full"
            allowFullScreen
            loading="lazy"
          />
        </div>
      );
    }

    return (
      <div className="relative w-full aspect-video mb-4 overflow-hidden rounded-lg group">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
    );
  };

  const technologies = detectTechnologies(project.url);

  return (
    <Card className="project-card glass animate-fade-in overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-semibold flex items-center gap-2">
          {getIcon()}
          {project.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {renderMedia()}
        <CardDescription className="text-sm text-gray-400 mb-4">
          {project.description}
        </CardDescription>
        
        {technologies.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {technologies.map((tech) => (
              <Badge
                key={tech}
                variant="secondary"
                className="bg-white/5 text-gray-300"
              >
                {tech}
              </Badge>
            ))}
          </div>
        )}

        <div className="flex justify-between items-center mt-4">
          <Button
            variant="outline"
            className="glass hover:bg-white/10 transition-all duration-300"
            asChild
          >
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              {project.type === "repository" ? (
                <>
                  <Github className="w-4 h-4" />
                  View Repository
                </>
              ) : (
                <>
                  <ExternalLink className="w-4 h-4" />
                  Visit {project.type}
                </>
              )}
            </a>
          </Button>
          {isAdmin && (
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onEdit(project)}
                className="hover:bg-white/10"
              >
                <Pencil className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onDelete(project.id)}
                className="hover:bg-red-500/20 text-red-400 hover:text-red-300"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;
