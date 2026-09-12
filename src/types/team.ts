import { BaseEntity } from "./common";

export interface TeamSocialLinks {
  linkedin?: string;
  twitter?: string;
  github?: string;
  email?: string;
}

export interface TeamMember extends BaseEntity {
  name: string;
  role: string;
  bio: string;
  avatar: string;
  socials?: TeamSocialLinks;
  order: number;
  isPublished: boolean;
}
