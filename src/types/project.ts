
export type ProjectType = 'website' | 'repository' | 'project';

export interface Project {
  id: string;
  title: string;
  description: string;
  type: ProjectType;
  url: string;
  image?: string;
  isIframe?: boolean;
  technologies?: string[];
}
