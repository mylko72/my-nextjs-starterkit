# Frontend Starter Kit

React + Next.js + Tailwind CSS + shadcn/ui 기반의 프론트엔드 개발 스타터킷입니다.
다크/라이트 모드, 반응형 레이아웃, 재사용 가능한 UI 컴포넌트를 즉시 사용할 수 있습니다.

## 기술 스택

| 기술 | 버전 | 설명 |
|------|------|------|
| Next.js | 16.1.6 | React 기반 풀스택 프레임워크 |
| React | 19.2.3 | UI 라이브러리 |
| TypeScript | ^5.0 | 정적 타입 언어 |
| Tailwind CSS | v4 | 유틸리티 우선 CSS 프레임워크 |
| shadcn/ui | Latest | 재사용 가능한 UI 컴포넌트 라이브러리 |
| Lucide React | ^0.574 | 아이콘 라이브러리 |
| Sonner | Latest | Toast 알림 라이브러리 |

## 시작하기

### 필요 조건

- Node.js 18.17 이상
- npm, yarn, pnpm 또는 bun

### 설치 및 실행

```bash
# 1. 의존성 설치
npm install

# 2. 개발 서버 실행
npm run dev

# 3. 브라우저에서 확인
# http://localhost:3000
```

### 빌드

```bash
# 프로덕션 빌드
npm run build

# 빌드된 앱 실행
npm run start
```

## 프로젝트 구조

```
src/
├── app/                    # Next.js App Router 페이지
│   ├── page.tsx            # 메인 페이지 (/)
│   ├── components/
│   │   └── page.tsx        # 컴포넌트 페이지 (/components)
│   ├── api-docs/
│   │   └── page.tsx        # API 문서 페이지 (/api-docs)
│   ├── globals.css         # 전역 스타일 (Tailwind v4 + shadcn/ui 테마)
│   └── layout.tsx          # 루트 레이아웃 (ThemeProvider, NavBar 포함)
│
├── components/
│   ├── layout/
│   │   └── NavBar.tsx      # 네비게이션 바 (다크모드 토글 포함)
│   └── ui/                 # shadcn/ui 컴포넌트
│       ├── alert.tsx
│       ├── badge.tsx
│       ├── button.tsx
│       ├── card.tsx
│       ├── checkbox.tsx
│       ├── dialog.tsx
│       ├── input.tsx
│       ├── label.tsx
│       ├── radio-group.tsx
│       ├── select.tsx
│       ├── separator.tsx
│       ├── sonner.tsx       # Toast 컴포넌트
│       ├── spinner.tsx      # 커스텀 로딩 스피너
│       └── table.tsx
│
├── contexts/
│   └── ThemeContext.tsx     # 다크/라이트 모드 Context
│
├── data/
│   ├── components.ts        # UI 컴포넌트 목록 Mock 데이터
│   └── apiDocs.ts           # API 문서용 Mock 데이터
│
├── lib/
│   └── utils.ts             # cn() 유틸리티 함수
│
└── utils/
    └── format.ts            # 포맷 유틸리티 함수들
```

## 주요 기능

### 다크/라이트 모드

ThemeContext를 통해 다크/라이트 모드를 관리합니다.
선택한 테마는 `localStorage`에 저장되어 새로고침 후에도 유지됩니다.

```tsx
// ThemeContext 사용 예시
import { useTheme } from "@/contexts/ThemeContext";

function MyComponent() {
  const { theme, toggleTheme, setTheme } = useTheme();

  return (
    <button onClick={toggleTheme}>
      현재 테마: {theme}
    </button>
  );
}
```

## 컴포넌트 사용 예시

### Button

```tsx
import { Button } from "@/components/ui/button";

// Variant
<Button variant="default">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="destructive">Destructive</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>

// 크기
<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>
```

### Card

```tsx
import {
  Card, CardHeader, CardTitle,
  CardDescription, CardContent, CardFooter,
} from "@/components/ui/card";

<Card>
  <CardHeader>
    <CardTitle>카드 제목</CardTitle>
    <CardDescription>카드 설명</CardDescription>
  </CardHeader>
  <CardContent>본문 내용</CardContent>
  <CardFooter>
    <Button>확인</Button>
  </CardFooter>
</Card>
```

### Modal / Dialog

```tsx
import {
  Dialog, DialogContent, DialogDescription,
  DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";

<Dialog>
  <DialogTrigger asChild>
    <Button>열기</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>모달 제목</DialogTitle>
      <DialogDescription>모달 설명</DialogDescription>
    </DialogHeader>
    <p>모달 본문</p>
  </DialogContent>
</Dialog>
```

### Form 요소

```tsx
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select, SelectContent, SelectItem,
  SelectTrigger, SelectValue,
} from "@/components/ui/select";

// Input
<Label htmlFor="name">이름</Label>
<Input id="name" placeholder="이름 입력" />

// Select
<Select>
  <SelectTrigger>
    <SelectValue placeholder="선택" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="a">옵션 A</SelectItem>
  </SelectContent>
</Select>

// Checkbox
<div className="flex items-center gap-2">
  <Checkbox id="agree" />
  <Label htmlFor="agree">동의합니다</Label>
</div>

// Radio
<RadioGroup defaultValue="a">
  <div className="flex items-center gap-2">
    <RadioGroupItem value="a" id="a" />
    <Label htmlFor="a">옵션 A</Label>
  </div>
</RadioGroup>
```

### Table

```tsx
import {
  Table, TableBody, TableCell,
  TableHead, TableHeader, TableRow,
} from "@/components/ui/table";

<Table>
  <TableHeader>
    <TableRow>
      <TableHead>이름</TableHead>
      <TableHead>이메일</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>홍길동</TableCell>
      <TableCell>hong@example.com</TableCell>
    </TableRow>
  </TableBody>
</Table>
```

### Alert

```tsx
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

<Alert>
  <AlertCircle className="h-4 w-4" />
  <AlertTitle>안내</AlertTitle>
  <AlertDescription>중요한 안내 메시지입니다.</AlertDescription>
</Alert>

<Alert variant="destructive">
  <AlertCircle className="h-4 w-4" />
  <AlertTitle>오류</AlertTitle>
  <AlertDescription>오류가 발생했습니다.</AlertDescription>
</Alert>
```

### Toast (Sonner)

```tsx
import { toast } from "sonner";

toast("기본 메시지");
toast.success("성공!");
toast.error("오류 발생");
toast.warning("경고");
toast.info("정보");
```

### Loading Spinner

```tsx
import { Spinner } from "@/components/ui/spinner";

<Spinner size="sm" />
<Spinner size="md" />
<Spinner size="lg" />
<Spinner size="xl" label="데이터 로딩 중..." />
```

### shadcn/ui 컴포넌트 추가

```bash
# 새 컴포넌트 추가
npx shadcn@latest add [컴포넌트명]

# 예시
npx shadcn@latest add tooltip
npx shadcn@latest add accordion
npx shadcn@latest add tabs
```

## 라이선스

MIT
