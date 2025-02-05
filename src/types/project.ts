
export type ProjectType = 'website' | 'repository' | 'project';

export interface Project {
  id: string;
  title: string;
  description: string;
  type: ProjectType;
  url: string;
  image?: string;
  isIframe?: boolean;
  created_at?: string;
  updated_at?: string;
  user_id?: string;
}
