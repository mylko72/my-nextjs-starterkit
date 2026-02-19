import Link from "next/link";
import { ArrowRight, Code2, Palette, Zap, Shield, Smartphone, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// 주요 기능 목록
const features = [
  {
    icon: Code2,
    title: "최신 기술 스택",
    description: "Next.js 16 + React 19 + TypeScript 기반. 최신 웹 개발 표준을 따릅니다.",
    badge: "Next.js 16",
  },
  {
    icon: Palette,
    title: "다크/라이트 모드",
    description: "CSS 변수 기반의 테마 시스템. localStorage에 사용자 선호도를 저장합니다.",
    badge: "Tailwind v4",
  },
  {
    icon: Package,
    title: "shadcn/ui 컴포넌트",
    description: "30+ 재사용 가능한 UI 컴포넌트. Radix UI 기반으로 접근성이 보장됩니다.",
    badge: "shadcn/ui",
  },
  {
    icon: Smartphone,
    title: "완전 반응형",
    description: "모바일 퍼스트 설계. 모든 디바이스에서 최적의 UX를 제공합니다.",
    badge: "반응형",
  },
  {
    icon: Zap,
    title: "빠른 개발 시작",
    description: "Mock 데이터와 유틸리티 함수로 즉시 개발을 시작할 수 있습니다.",
    badge: "생산성",
  },
  {
    icon: Shield,
    title: "접근성 고려",
    description: "ARIA 속성과 키보드 네비게이션을 지원하는 a11y 친화적 컴포넌트.",
    badge: "a11y",
  },
];

// 기술 스택 목록
const techStack = [
  { name: "Next.js", version: "16.1.6", color: "bg-black text-white dark:bg-white dark:text-black" },
  { name: "React", version: "19.2.3", color: "bg-cyan-500 text-white" },
  { name: "TypeScript", version: "^5.0", color: "bg-blue-600 text-white" },
  { name: "Tailwind CSS", version: "v4", color: "bg-teal-500 text-white" },
  { name: "shadcn/ui", version: "Latest", color: "bg-zinc-800 text-white dark:bg-zinc-200 dark:text-black" },
  { name: "Lucide React", version: "^0.574", color: "bg-orange-500 text-white" },
];

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero 섹션 */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-muted py-20 md:py-32">
        <div className="container mx-auto px-4 text-center">
          {/* 배지 */}
          <div className="mb-6 inline-flex items-center gap-2">
            <Badge variant="outline" className="px-3 py-1 text-sm">
              ✨ 최신 버전으로 업데이트됨
            </Badge>
          </div>

          {/* 제목 */}
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 bg-gradient-to-br from-foreground to-muted-foreground bg-clip-text text-transparent">
            Frontend
            <br />
            Starter Kit
          </h1>

          {/* 설명 */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            Next.js + React + Tailwind CSS + shadcn/ui로 구성된
            <br className="hidden md:block" />
            모던 프론트엔드 개발 스타터킷입니다.
            <br />
            즉시 사용 가능한 컴포넌트와 Mock 데이터를 제공합니다.
          </p>

          {/* CTA 버튼 */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/components">
                컴포넌트 보기
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/api-docs">API 문서 보기</Link>
            </Button>
          </div>
        </div>

        {/* 배경 장식 */}
        <div
          className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none"
          aria-hidden="true"
        >
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary rounded-full blur-3xl" />
        </div>
      </section>

      {/* 기술 스택 섹션 */}
      <section className="py-12 border-y border-border bg-muted/30">
        <div className="container mx-auto px-4">
          <p className="text-center text-sm text-muted-foreground mb-6 uppercase tracking-widest font-medium">
            기술 스택
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {techStack.map((tech) => (
              <div
                key={tech.name}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${tech.color}`}
              >
                <span>{tech.name}</span>
                <span className="opacity-70">{tech.version}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 주요 기능 섹션 */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">주요 기능</h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              개발 생산성을 높이는 다양한 기능들을 제공합니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <Card key={feature.title} className="group hover:shadow-md transition-shadow duration-200">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <div className="p-2 rounded-lg bg-primary/10 w-fit">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <Badge variant="secondary">{feature.badge}</Badge>
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                    <CardDescription className="leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* 시작하기 섹션 */}
      <section className="py-20 bg-muted/30 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-4 text-center">빠른 시작</h2>
            <p className="text-muted-foreground text-center mb-10">
              아래 명령어를 실행하여 개발 서버를 시작하세요.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader>
                  <div className="text-2xl font-bold text-primary mb-2">01</div>
                  <CardTitle className="text-base">의존성 설치</CardTitle>
                </CardHeader>
                <CardContent>
                  <code className="block bg-muted rounded-md p-3 text-sm font-mono text-foreground">
                    npm install
                  </code>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="text-2xl font-bold text-primary mb-2">02</div>
                  <CardTitle className="text-base">개발 서버 실행</CardTitle>
                </CardHeader>
                <CardContent>
                  <code className="block bg-muted rounded-md p-3 text-sm font-mono text-foreground">
                    npm run dev
                  </code>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="text-2xl font-bold text-primary mb-2">03</div>
                  <CardTitle className="text-base">프로덕션 빌드</CardTitle>
                </CardHeader>
                <CardContent>
                  <code className="block bg-muted rounded-md p-3 text-sm font-mono text-foreground">
                    npm run build
                  </code>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA 섹션 */}
      <section className="py-20 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4">지금 시작해보세요</h2>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            다양한 컴포넌트와 API 문서를 확인하고 나만의 프로젝트를 만들어보세요.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/components">
                컴포넌트 탐색하기
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/api-docs">API 문서 보기</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
