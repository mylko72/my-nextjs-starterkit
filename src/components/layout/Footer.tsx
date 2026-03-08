import Link from "next/link";
import { Github } from "lucide-react";

// 프레임워크 아이콘 컴포넌트
const ReactIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="2" />
    <path d="M12 7.5C9.24 7.5 7 9.24 7 11.5c0 2.26 2.24 4 5 4s5-1.74 5-4c0-2.26-2.24-4-5-4z" fill="none" stroke="currentColor" strokeWidth="1.5" />
    <ellipse cx="12" cy="12" rx="7" ry="2" fill="none" stroke="currentColor" strokeWidth="1.5" transform="rotate(60 12 12)" />
    <ellipse cx="12" cy="12" rx="7" ry="2" fill="none" stroke="currentColor" strokeWidth="1.5" transform="rotate(120 12 12)" />
  </svg>
);

const NextjsIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M11.5 3c-4.687 0-8.5 3.813-8.5 8.5s3.813 8.5 8.5 8.5 8.5-3.813 8.5-8.5-3.813-8.5-8.5-8.5zm0 1c4.136 0 7.5 3.364 7.5 7.5s-3.364 7.5-7.5 7.5-7.5-3.364-7.5-7.5 3.364-7.5 7.5-7.5zm3 6l-6 9h2l6-9h-2z" />
  </svg>
);

const TailwindIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 2c4.418 0 8 3.582 8 8s-3.582 8-8 8-8-3.582-8-8 3.582-8 8-8zm-3 4c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3zm6 0c-.552 0-1 .448-1 1s.448 1 1 1 1-.448 1-1-.448-1-1-1zm-3 8c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3z" />
  </svg>
);

const ShadcnIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <circle cx="8" cy="8" r="1.5" />
    <circle cx="16" cy="8" r="1.5" />
    <circle cx="8" cy="16" r="1.5" />
    <circle cx="16" cy="16" r="1.5" />
    <line x1="8" y1="8" x2="16" y2="16" stroke="currentColor" strokeWidth="1" />
    <line x1="16" y1="8" x2="8" y2="16" stroke="currentColor" strokeWidth="1" />
  </svg>
);

const LucideIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
  </svg>
);

// 프레임워크 링크 목록
const frameworkLinks = [
  { label: "React.js", href: "https://react.dev", icon: <ReactIcon /> },
  { label: "Next.js", href: "https://nextjs.org", icon: <NextjsIcon /> },
  { label: "Tailwind CSS", href: "https://tailwindcss.com", icon: <TailwindIcon /> },
  { label: "shadcn/ui", href: "https://ui.shadcn.com", icon: <ShadcnIcon /> },
  { label: "Lucide React", href: "https://lucide.dev", icon: <LucideIcon /> },
];

// Git 저장소 링크
const GIT_REPO_URL = "https://github.com/mylko72/my-nextjs-starterkit";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          {/* Git 저장소 링크 */}
          <Link
            href={GIT_REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="GitHub 저장소로 이동"
          >
            <Github className="h-5 w-5" />
            <span className="text-sm font-medium">GitHub 저장소</span>
          </Link>

          {/* 프레임워크 링크 */}
          <nav className="flex flex-wrap gap-4 md:gap-6">
            {frameworkLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label={`${link.label} 공식 사이트로 이동`}
              >
                {link.icon}
              </Link>
            ))}
          </nav>
        </div>

        {/* 저작권 정보 */}
        <div className="mt-8 pt-6 border-t border-border/50">
          <p className="text-xs text-muted-foreground text-center">
            © {new Date().getFullYear()} Frontend Starter Kit. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
