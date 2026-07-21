export interface CardNavLink {
  label: string;
  href: string;
  ariaLabel: string;
}

export interface CardNavItem {
  label: string;
  bgColor: string;
  textColor: string;
  links: CardNavLink[];
}

export interface CardNavProps {
  logo: string;
  logoAlt?: string;
  items?: CardNavItem[];
  className?: string;
  ease?: string;
  baseColor?: string;
  menuColor?: string;
  buttonBgColor?: string;
  buttonTextColor?: string;
}

export interface HamburgerButtonProps {
  isOpen: boolean;
  onClick: () => void;
  color?: string;
  isMobile: boolean;
}

export interface NavCardProps {
  item: CardNavItem;
  isMobile: boolean;
  isTablet: boolean;
  setRef: (el: HTMLDivElement | null) => void;
}

export interface CTAButtonProps {
  onClick?: () => void;
  text?: string;
  isTablet: boolean;
  isMobile: boolean;
  bgColor?: string;
  textColor?: string;
}

export interface UseSlideNavigationOptions {
  activeSlide: number;
  nextSlide: () => void;
  prevSlide: () => void;
  throttleMs?: number;
}
