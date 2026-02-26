"use client";

import { useState } from "react";
import { Copy, Check, AlertCircle, Info, Terminal, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import { copyToClipboard } from "@/utils/format";

// 테이블 예시 데이터
const tableData = [
  { id: 1, name: "홍길동", email: "hong@example.com", role: "Admin", status: "활성" },
  { id: 2, name: "김철수", email: "kim@example.com", role: "User", status: "활성" },
  { id: 3, name: "이영희", email: "lee@example.com", role: "User", status: "비활성" },
  { id: 4, name: "박민준", email: "park@example.com", role: "Guest", status: "활성" },
];

// 코드 블록 컴포넌트
function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const success = await copyToClipboard(code);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="relative group">
      <pre className="bg-muted rounded-lg p-4 text-sm font-mono overflow-x-auto text-foreground border border-border">
        <code>{code}</code>
      </pre>
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-2 right-2 h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={handleCopy}
        aria-label="코드 복사"
      >
        {copied ? <Check className="h-3 w-3 text-green-500" /> : <Copy className="h-3 w-3" />}
      </Button>
    </div>
  );
}

// 섹션 구분 컴포넌트
function ComponentSection({
  title,
  description,
  children,
  code,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
  code: string;
}) {
  return (
    <section className="mb-14">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">{title}</h2>
        <p className="text-muted-foreground">{description}</p>
      </div>
      <Card>
        <CardContent className="pt-6">
          <div className="mb-6 p-6 rounded-lg border border-dashed border-border bg-background">
            {children}
          </div>
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2 font-medium">사용 예제</p>
            <CodeBlock code={code} />
          </div>
        </CardContent>
      </Card>
    </section>
  );
}

export default function ComponentsPage() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [checkboxChecked, setCheckboxChecked] = useState(false);
  const [radioValue, setRadioValue] = useState("option1");
  const [selectValue, setSelectValue] = useState("");
  // 선택된 데이터를 관리할 상태 (초기값 null)
  const [selectedItem, setSelectedItem] = useState<{name: string, email: string, role: string, status: string} | null>(null);

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      {/* 페이지 헤더 */}
      <div className="mb-12">
        <Badge variant="secondary" className="mb-4">shadcn/ui</Badge>
        <h1 className="text-4xl font-bold mb-4">UI 컴포넌트</h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          shadcn/ui 기반의 재사용 가능한 UI 컴포넌트 목록입니다.
          각 컴포넌트의 사용 예시와 코드를 확인하세요.
        </p>
      </div>

      <Separator className="mb-12" />

      {/* Button */}
      <ComponentSection
        title="Button"
        description="다양한 variant와 크기를 지원하는 버튼 컴포넌트입니다."
        code={`import { Button } from "@/components/ui/button";

// Variant 예시
<Button variant="default">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="destructive">Destructive</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>

// 크기 예시
<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>`}
      >
        <div className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground mb-3 font-medium">Variant</p>
            <div className="flex flex-wrap gap-3">
              <Button variant="default">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="link">Link</Button>
            </div>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-3 font-medium">Size</p>
            <div className="flex flex-wrap items-center gap-3">
              <Button size="sm">Small</Button>
              <Button size="default">Default</Button>
              <Button size="lg">Large</Button>
            </div>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-3 font-medium">상태</p>
            <div className="flex flex-wrap gap-3">
              <Button disabled>비활성화</Button>
              <Button>
                <Terminal className="mr-2 h-4 w-4" />
                아이콘 포함
              </Button>
            </div>
          </div>
        </div>
      </ComponentSection>

      {/* Badge */}
      <ComponentSection
        title="Badge"
        description="상태나 카테고리를 표시하는 작은 배지 컴포넌트입니다."
        code={`import { Badge } from "@/components/ui/badge";

<Badge variant="default">Default</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="destructive">Destructive</Badge>
<Badge variant="outline">Outline</Badge>`}
      >
        <div className="flex flex-wrap gap-3">
          <Badge variant="default">Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="destructive">Destructive</Badge>
          <Badge variant="outline">Outline</Badge>
        </div>
      </ComponentSection>

      {/* Card */}
      <ComponentSection
        title="Card"
        description="콘텐츠를 담는 컨테이너 컴포넌트. Header, Content, Footer 영역으로 구성됩니다."
        code={`import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

<Card>
  <CardHeader>
    <CardTitle>카드 제목</CardTitle>
    <CardDescription>카드 설명</CardDescription>
  </CardHeader>
  <CardContent>
    <p>카드 본문 내용</p>
  </CardContent>
  <CardFooter>
    <Button>확인</Button>
  </CardFooter>
</Card>`}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>기본 카드</CardTitle>
              <CardDescription>카드 설명 텍스트가 여기에 표시됩니다.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">카드 본문 내용을 여기에 작성하세요.</p>
            </CardContent>
            <CardFooter className="flex gap-2">
              <Button size="sm">확인</Button>
              <Button size="sm" variant="outline">취소</Button>
            </CardFooter>
          </Card>
          <Card className="border-primary">
            <CardHeader>
              <Badge className="w-fit mb-1" variant="secondary">추천</Badge>
              <CardTitle>강조된 카드</CardTitle>
              <CardDescription>테두리를 활용해 강조할 수 있습니다.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">중요한 정보를 강조할 때 사용합니다.</p>
            </CardContent>
          </Card>
        </div>
      </ComponentSection>

      {/* Alert */}
      <ComponentSection
        title="Alert"
        description="중요한 정보나 경고를 표시하는 Alert 컴포넌트입니다."
        code={`import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Info } from "lucide-react";

<Alert>
  <Info className="h-4 w-4" />
  <AlertTitle>정보</AlertTitle>
  <AlertDescription>일반적인 안내 메시지입니다.</AlertDescription>
</Alert>

<Alert variant="destructive">
  <AlertCircle className="h-4 w-4" />
  <AlertTitle>오류</AlertTitle>
  <AlertDescription>오류 메시지입니다.</AlertDescription>
</Alert>`}
      >
        <div className="space-y-4">
          <Alert>
            <Info className="h-4 w-4" />
            <AlertTitle>정보</AlertTitle>
            <AlertDescription>이것은 일반적인 안내 메시지입니다. 사용자에게 중요한 정보를 전달합니다.</AlertDescription>
          </Alert>
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>오류 발생</AlertTitle>
            <AlertDescription>요청을 처리하는 중 오류가 발생했습니다. 다시 시도해주세요.</AlertDescription>
          </Alert>
        </div>
      </ComponentSection>

      {/* Toast */}
      <ComponentSection
        title="Toast (Sonner)"
        description="일시적인 알림을 화면 구석에 표시하는 Toast 컴포넌트입니다."
        code={`import { toast } from "sonner";

// 다양한 Toast 유형
toast("기본 메시지입니다.");
toast.success("성공적으로 처리되었습니다!");
toast.error("오류가 발생했습니다.");
toast.warning("주의가 필요합니다.");
toast.info("참고할 정보입니다.");`}
      >
        <div className="flex flex-wrap gap-3">
          <Button variant="outline" onClick={() => toast("기본 메시지입니다.")}>
            기본 Toast
          </Button>
          <Button variant="outline" onClick={() => toast.success("성공적으로 처리되었습니다!")}>
            <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />
            성공
          </Button>
          <Button variant="outline" onClick={() => toast.error("오류가 발생했습니다.")}>
            <AlertCircle className="mr-2 h-4 w-4 text-red-500" />
            오류
          </Button>
          <Button variant="outline" onClick={() => toast.warning("주의가 필요합니다.")}>
            경고
          </Button>
          <Button variant="outline" onClick={() => toast.info("참고할 정보입니다.")}>
            <Info className="mr-2 h-4 w-4" />
            정보
          </Button>
        </div>
      </ComponentSection>

      {/* Modal/Dialog */}
      <ComponentSection
        title="Modal / Dialog"
        description="오버레이 형태로 콘텐츠를 표시하는 모달 컴포넌트입니다."
        code={`import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

<Dialog>
  <DialogTrigger asChild>
    <Button>모달 열기</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>모달 제목</DialogTitle>
      <DialogDescription>모달 설명</DialogDescription>
    </DialogHeader>
    <p>모달 본문 내용</p>
    <DialogFooter>
      <Button>확인</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`}
      >
        <div className="flex gap-3">
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button>모달 열기</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>모달 제목</DialogTitle>
                <DialogDescription>
                  이것은 Dialog 컴포넌트입니다. 접근성을 고려해 포커스 트랩과 ESC 키 닫기를 지원합니다.
                </DialogDescription>
              </DialogHeader>
              <div className="py-4">
                <p className="text-sm text-muted-foreground">
                  모달 안에 다양한 콘텐츠를 넣을 수 있습니다.
                  Form, 이미지, 텍스트 등 원하는 내용을 자유롭게 배치하세요.
                </p>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setDialogOpen(false)}>취소</Button>
                <Button onClick={() => { setDialogOpen(false); toast.success("확인되었습니다."); }}>
                  확인
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </ComponentSection>

      {/* Form 요소 */}
      <ComponentSection
        title="Form 요소"
        description="Input, Select, Checkbox, Radio 등 다양한 폼 요소를 제공합니다."
        code={`import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Input
<Label htmlFor="email">이메일</Label>
<Input id="email" type="email" placeholder="example@email.com" />

// Select
<Select>
  <SelectTrigger>
    <SelectValue placeholder="선택하세요" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="opt1">옵션 1</SelectItem>
    <SelectItem value="opt2">옵션 2</SelectItem>
  </SelectContent>
</Select>

// Checkbox
<Checkbox id="terms" />
<Label htmlFor="terms">약관에 동의합니다</Label>

// Radio
<RadioGroup value="opt1">
  <RadioGroupItem value="opt1" id="opt1" />
  <Label htmlFor="opt1">옵션 1</Label>
</RadioGroup>`}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Input & Select */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="demo-name">이름</Label>
              <Input id="demo-name" placeholder="이름을 입력하세요" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="demo-email">이메일</Label>
              <Input id="demo-email" type="email" placeholder="example@email.com" />
            </div>
            <div className="space-y-2">
              <Label>직업</Label>
              <Select value={selectValue} onValueChange={setSelectValue}>
                <SelectTrigger>
                  <SelectValue placeholder="직업을 선택하세요" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="developer">개발자</SelectItem>
                  <SelectItem value="designer">디자이너</SelectItem>
                  <SelectItem value="pm">프로덕트 매니저</SelectItem>
                  <SelectItem value="other">기타</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="demo-disabled">비활성화된 Input</Label>
              <Input id="demo-disabled" placeholder="비활성화 상태" disabled />
            </div>
          </div>

          {/* Checkbox & Radio */}
          <div className="space-y-6">
            <div>
              <p className="text-sm font-medium mb-3">Checkbox</p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Checkbox
                    id="terms"
                    checked={checkboxChecked}
                    onCheckedChange={(v) => setCheckboxChecked(v === true)}
                  />
                  <Label htmlFor="terms">이용약관에 동의합니다</Label>
                </div>
                <div className="flex items-center gap-3">
                  <Checkbox id="newsletter" defaultChecked />
                  <Label htmlFor="newsletter">뉴스레터 수신 동의</Label>
                </div>
                <div className="flex items-center gap-3">
                  <Checkbox id="disabled" disabled />
                  <Label htmlFor="disabled" className="text-muted-foreground">비활성화된 항목</Label>
                </div>
              </div>
            </div>

            <div>
              <p className="text-sm font-medium mb-3">Radio Group</p>
              <RadioGroup value={radioValue} onValueChange={setRadioValue} className="space-y-2">
                <div className="flex items-center gap-3">
                  <RadioGroupItem value="option1" id="option1" />
                  <Label htmlFor="option1">옵션 1</Label>
                </div>
                <div className="flex items-center gap-3">
                  <RadioGroupItem value="option2" id="option2" />
                  <Label htmlFor="option2">옵션 2</Label>
                </div>
                <div className="flex items-center gap-3">
                  <RadioGroupItem value="option3" id="option3" />
                  <Label htmlFor="option3">옵션 3</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        </div>
      </ComponentSection>

      {/* Table */}
      <ComponentSection
        title="Table"
        description="데이터를 표 형태로 표시하는 Table 컴포넌트입니다."
        code={`import {
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
</Table>`}
      >
        <div className="rounded-md border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>이름</TableHead>
                <TableHead>이메일</TableHead>
                <TableHead>역할</TableHead>
                <TableHead>상태</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <Dialog>
                {tableData.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell className="font-mono text-muted-foreground">{row.id}</TableCell>
                    <TableCell className="font-medium">
                      <DialogTrigger asChild key={row.id}>
                        <Button onClick={() => setSelectedItem(row)} variant="link" className="px-0">
                          {row.name}
                        </Button>
                      </DialogTrigger>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{row.email}</TableCell>
                    <TableCell>
                      <Badge variant={row.role === "Admin" ? "default" : "secondary"}>
                        {row.role}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className={`text-sm font-medium ${row.status === "활성" ? "text-green-600 dark:text-green-400" : "text-muted-foreground"}`}>
                        {row.status}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}

                <DialogContent>
                  <DialogHeader>
                    {/* 2. 상태값에 따라 동적으로 내용 변경 */}
                    <DialogTitle>{selectedItem?.name}</DialogTitle>
                  </DialogHeader>
                  <div className="py-0">
                    <p><span className="text-muted-foreground mr-2">이메일:</span> {selectedItem?.email}</p>
                  </div>
                  <div className="py-0">
                    <p><span className="text-muted-foreground mr-2">역할:</span> {selectedItem?.role}</p>
                  </div>
                  <div className="py-0">
                    <p><span className="text-muted-foreground mr-2">상태:</span> {selectedItem?.status}</p>
                  </div>
                  <hr className="my-4" />
                  <form className="space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="userName">이름</label>
                      <Input id="userName" name="userName" placeholder="이름을 입력하세요" className="mt-4" />
                    </div>
                    
                    <div className="flex justify-end gap-2">
                      <Button type="submit">저장하기</Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </TableBody>
          </Table>
        </div>
      </ComponentSection>

      {/* Loading Spinner */}
      <ComponentSection
        title="Loading Spinner"
        description="로딩 상태를 표시하는 Spinner 컴포넌트입니다."
        code={`import { Spinner } from "@/components/ui/spinner";

// 다양한 크기
<Spinner size="sm" />
<Spinner size="md" />
<Spinner size="lg" />
<Spinner size="xl" />

// 커스텀 레이블 (접근성)
<Spinner label="데이터 불러오는 중..." />`}
      >
        <div className="flex flex-wrap items-center gap-8">
          <div className="flex flex-col items-center gap-2">
            <Spinner size="sm" />
            <span className="text-xs text-muted-foreground">sm</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Spinner size="md" />
            <span className="text-xs text-muted-foreground">md</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Spinner size="lg" />
            <span className="text-xs text-muted-foreground">lg</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Spinner size="xl" />
            <span className="text-xs text-muted-foreground">xl</span>
          </div>
          <div className="flex items-center gap-3 bg-muted rounded-lg px-4 py-3">
            <Spinner size="sm" />
            <span className="text-sm text-muted-foreground">데이터 불러오는 중...</span>
          </div>
        </div>
      </ComponentSection>
    </div>
  );
}
