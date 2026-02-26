export interface Education {
  degree: string;
  institute: string;
  year: string;
  grade?: string;
}

export interface Project {
  name: string;
  description: string;
  liveUrl?: string;
  codeUrl?: string;
  tags?: string[];
  image?: string;
}

export interface Socials {
  github?: string;
  linkedin?: string;
  facebook?: string;
  instagram?: string;
}

export interface ProfileData {
  name: string;
  title: string;
  address: string;
  email: string;
  phone: string;
  bio: string;
  education: Education[];
  skills: string[];
  interests: string[];
  socials: Socials;
  arsenal?: {
    category: string;
    items: string[];
    icon: string;
  }[];
  projects?: Project[];
  resume: string;
  profileImage: string;
}
