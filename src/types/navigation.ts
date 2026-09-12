import { BaseEntity } from "./common";

export interface NavItem {
  id: string;
  label: string;
  href: string;
  isExternal?: boolean;
  order: number;
  children?: NavItem[];
}

export interface NavigationConfig extends BaseEntity {
  key: "header" | "footer";
  items: NavItem[];
  ctaButton?: {
    label: string;
    href: string;
    isVisible: boolean;
  };
  whatsappButton?: {
    label: string;
    number: string;
    isVisible: boolean;
  };
}
