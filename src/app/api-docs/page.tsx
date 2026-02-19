"use client";

import { useState } from "react";
import { Copy, Check, ChevronDown, ChevronRight, Database, FileJson } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { apiEndpoints, tableExampleData, apiTags, type ApiEndpoint } from "@/data/apiDocs";
import { getMethodColor, copyToClipboard } from "@/utils/format";

// 코드 블록 컴포넌트
function CodeBlock({ code, language = "json" }: { code: string; language?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const success = await copyToClipboard(code);
    if (success) {
      setCopied(true);
      toast.success("클립보드에 복사되었습니다.");
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="relative group">
      <div className="flex items-center justify-between bg-zinc-800 dark:bg-zinc-900 rounded-t-lg px-4 py-2">
        <span className="text-xs text-zinc-400 font-mono">{language}</span>
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-700"
          onClick={handleCopy}
          aria-label="코드 복사"
        >
          {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
        </Button>
      </div>
      <pre className="bg-zinc-900 rounded-b-lg p-4 text-sm font-mono overflow-x-auto text-zinc-100">
        <code>{code}</code>
      </pre>
    </div>
  );
}

// 개별 API 엔드포인트 카드
function EndpointCard({ endpoint }: { endpoint: ApiEndpoint }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <Card className="overflow-hidden">
      {/* 헤더 - 클릭으로 토글 */}
      <button
        className="w-full text-left"
        onClick={() => setExpanded(!expanded)}
        aria-expanded={expanded}
      >
        <CardHeader className="hover:bg-muted/50 transition-colors">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0">
              <span className={`flex-shrink-0 px-3 py-1 rounded-md text-xs font-bold font-mono ${getMethodColor(endpoint.method)}`}>
                {endpoint.method}
              </span>
              <code className="text-sm font-mono text-foreground truncate">{endpoint.path}</code>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              {endpoint.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs hidden sm:flex">
                  {tag}
                </Badge>
              ))}
              {expanded ? (
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              ) : (
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              )}
            </div>
          </div>
          <p className="text-sm text-muted-foreground text-left mt-1">{endpoint.description}</p>
        </CardHeader>
      </button>

      {/* 상세 내용 */}
      {expanded && (
        <CardContent className="border-t border-border pt-6 space-y-6">
          {/* Path Parameters */}
          {endpoint.pathParams && endpoint.pathParams.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-500" />
                경로 파라미터 (Path Parameters)
              </h4>
              <div className="rounded-lg border border-border overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-muted">
                      <th className="px-4 py-2 text-left font-medium">파라미터</th>
                      <th className="px-4 py-2 text-left font-medium">타입</th>
                      <th className="px-4 py-2 text-left font-medium">필수</th>
                      <th className="px-4 py-2 text-left font-medium">설명</th>
                    </tr>
                  </thead>
                  <tbody>
                    {endpoint.pathParams.map((param, idx) => (
                      <tr key={param.name} className={idx % 2 === 0 ? "" : "bg-muted/30"}>
                        <td className="px-4 py-2">
                          <code className="text-xs font-mono text-primary">{param.name}</code>
                        </td>
                        <td className="px-4 py-2">
                          <code className="text-xs font-mono text-muted-foreground">{param.type}</code>
                        </td>
                        <td className="px-4 py-2">
                          <Badge variant={param.required ? "default" : "outline"} className="text-xs">
                            {param.required ? "필수" : "선택"}
                          </Badge>
                        </td>
                        <td className="px-4 py-2 text-muted-foreground">{param.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Query Parameters */}
          {endpoint.queryParams && endpoint.queryParams.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-purple-500" />
                쿼리 파라미터 (Query Parameters)
              </h4>
              <div className="rounded-lg border border-border overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-muted">
                      <th className="px-4 py-2 text-left font-medium">파라미터</th>
                      <th className="px-4 py-2 text-left font-medium">타입</th>
                      <th className="px-4 py-2 text-left font-medium">필수</th>
                      <th className="px-4 py-2 text-left font-medium">설명</th>
                    </tr>
                  </thead>
                  <tbody>
                    {endpoint.queryParams.map((param, idx) => (
                      <tr key={param.name} className={idx % 2 === 0 ? "" : "bg-muted/30"}>
                        <td className="px-4 py-2">
                          <code className="text-xs font-mono text-primary">{param.name}</code>
                        </td>
                        <td className="px-4 py-2">
                          <code className="text-xs font-mono text-muted-foreground">{param.type}</code>
                        </td>
                        <td className="px-4 py-2">
                          <Badge variant={param.required ? "default" : "outline"} className="text-xs">
                            {param.required ? "필수" : "선택"}
                          </Badge>
                        </td>
                        <td className="px-4 py-2 text-muted-foreground">{param.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Request Body */}
          {endpoint.requestBody && (
            <div>
              <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-orange-500" />
                요청 본문 (Request Body)
              </h4>
              <div className="rounded-lg border border-border overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-muted">
                      <th className="px-4 py-2 text-left font-medium">필드</th>
                      <th className="px-4 py-2 text-left font-medium">타입</th>
                      <th className="px-4 py-2 text-left font-medium">필수</th>
                      <th className="px-4 py-2 text-left font-medium">설명</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(endpoint.requestBody.properties ?? {}).map(([key, prop], idx) => (
                      <tr key={key} className={idx % 2 === 0 ? "" : "bg-muted/30"}>
                        <td className="px-4 py-2">
                          <code className="text-xs font-mono text-primary">{key}</code>
                        </td>
                        <td className="px-4 py-2">
                          <code className="text-xs font-mono text-muted-foreground">{prop.type}</code>
                        </td>
                        <td className="px-4 py-2">
                          <Badge variant={prop.required ? "default" : "outline"} className="text-xs">
                            {prop.required ? "필수" : "선택"}
                          </Badge>
                        </td>
                        <td className="px-4 py-2 text-muted-foreground">{prop.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Examples */}
          <div>
            <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500" />
              예시 코드
            </h4>
            <div className="space-y-3">
              {endpoint.example.request && (
                <div>
                  <p className="text-xs text-muted-foreground mb-2">Request Body</p>
                  <CodeBlock code={endpoint.example.request} />
                </div>
              )}
              <div>
                <p className="text-xs text-muted-foreground mb-2">Response</p>
                <CodeBlock code={endpoint.example.response} />
              </div>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
}

export default function ApiDocsPage() {
  const [activeTag, setActiveTag] = useState<string>("all");

  const filteredEndpoints = activeTag === "all"
    ? apiEndpoints
    : apiEndpoints.filter((e) => e.tags.includes(activeTag));

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      {/* 페이지 헤더 */}
      <div className="mb-12">
        <Badge variant="secondary" className="mb-4">Mock API</Badge>
        <h1 className="text-4xl font-bold mb-4">API 문서</h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          정적 Mock 데이터 기반의 API 엔드포인트 구조를 설명합니다.
          실제 백엔드 연동 시 아래 스펙을 참고하세요.
        </p>
      </div>

      <Separator className="mb-12" />

      {/* Mock 데이터 개요 */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">데이터 구조 개요</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30">
                  <Database className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <CardTitle className="text-base">User 모델</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CodeBlock
                language="typescript"
                code={`interface User {
  id: number;
  name: string;
  email: string;
  role: "admin" | "user" | "guest";
  status: "active" | "inactive";
  createdAt: string; // ISO 8601
  updatedAt?: string;
}`}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900/30">
                  <FileJson className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                <CardTitle className="text-base">Product 모델</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CodeBlock
                language="typescript"
                code={`interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  stock: number;
  description?: string;
  createdAt: string;
}`}
              />
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Mock 데이터 샘플 */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">샘플 데이터</h2>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">사용자 목록 (tableExampleData)</CardTitle>
          </CardHeader>
          <CardContent>
            <CodeBlock code={JSON.stringify(tableExampleData, null, 2)} />
          </CardContent>
        </Card>
      </section>

      {/* API 엔드포인트 목록 */}
      <section>
        <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
          <h2 className="text-2xl font-bold">엔드포인트</h2>
          {/* 태그 필터 */}
          <div className="flex gap-2 flex-wrap">
            <Button
              variant={activeTag === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveTag("all")}
            >
              전체
            </Button>
            {apiTags.map((tag) => (
              <Button
                key={tag}
                variant={activeTag === tag ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveTag(tag)}
              >
                {tag}
              </Button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          {filteredEndpoints.map((endpoint) => (
            <EndpointCard key={endpoint.id} endpoint={endpoint} />
          ))}
        </div>
      </section>

      {/* 사용 가이드 */}
      <section className="mt-12 pt-12 border-t border-border">
        <h2 className="text-2xl font-bold mb-6">Mock 데이터 사용 방법</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">데이터 Import</CardTitle>
            </CardHeader>
            <CardContent>
              <CodeBlock
                language="typescript"
                code={`// 데이터 임포트
import { tableExampleData } from "@/data/apiDocs";
import { components } from "@/data/components";

// 컴포넌트에서 사용
export default function UserList() {
  return (
    <ul>
      {tableExampleData.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}`}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">fetch 시뮬레이션</CardTitle>
            </CardHeader>
            <CardContent>
              <CodeBlock
                language="typescript"
                code={`// 비동기 처리 시뮬레이션
import { tableExampleData } from "@/data/apiDocs";

async function fetchUsers() {
  // 실제 API 호출을 시뮬레이션
  await new Promise((r) => setTimeout(r, 500));
  return tableExampleData;
}

// React에서 사용
const [users, setUsers] = useState([]);
useEffect(() => {
  fetchUsers().then(setUsers);
}, []);`}
              />
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
