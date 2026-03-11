export type ProjectItem = {
  id: string;
  slug: string;
  name: string;
  code: string;
  description: string;
  longDescription: string;
  image: string;
  file?: string;
  liveUrl?: string;
  githubUrl?: string;
  techStack: string[];
  category: string;
  featured?: boolean;
};