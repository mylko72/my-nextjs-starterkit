import Link from "next/link";
import { Github, ExternalLink } from "lucide-react";

// 프레임워크 링크 목록
const frameworkLinks = [
  { label: "React.js", href: "https://react.dev" },
  { label: "Next.js", href: "https://nextjs.org" },
  { label: "Tailwind CSS", href: "https://tailwindcss.com" },
  { label: "shadcn/ui", href: "https://ui.shadcn.com" },
  { label: "Lucide React", href: "https://lucide.dev" },
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
                className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
                aria-label={`${link.label} 공식 사이트로 이동`}
              >
                <span>{link.label}</span>
                <ExternalLink className="h-3 w-3" />
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
