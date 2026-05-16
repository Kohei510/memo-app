
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase-server";

export async function deleteMemo(formData: FormData) {
  "use server";

  const supabase = await createSupabaseServerClient();
  const id = formData.get("id") as string;
  const category = formData.get("category") as string;

  await supabase.from("memos").delete().eq("id", id);

  // Next.js 14 の正しいリダイレクト方法
  redirect(`/memos?category=${category}`);
}

type MemoPageProps = {
  searchParams: Promise<{ category?: string }>;
};

export default async function MemosPage({ searchParams }: MemoPageProps) {
  const { category } = await searchParams;
  const supabase = await createSupabaseServerClient();
  const { data: memos, error } = await supabase
    .from("memos")
    .select("*")
    .eq("category_id", category)
    .order("created_at");

  if (error) {
    console.error(error);
    return <div>エラーが発生しました</div>;
  }

  return (
    <main style={{ padding: "20px" }}>
      <h1 style={{
        marginBottom: "20px"
      }}>メモ一覧</h1>

      <ul className="space-y-4">
        {memos?.map((m) => (
          <li key={m.id} className="border-b pb-3">
            <h3 className="font-semibold text-lg">
              <a href={`/memos/${m.id}/edit`} className="text-blue-600 underline">
                {m.title}
              </a>
            </h3>
            <p className="text-sm text-gray-600 whitespace-pre-wrap">
              {m.content}
            </p>

            {/* 削除フォーム */}
            <form method="post">
              <input type="hidden" name="id" value={m.id} />
              <input type="hidden" name="category" value={category} />
              <button
                formAction={deleteMemo}
                className="text-red-600 text-sm mt-2"
              >
                削除
              </button>
            </form>
          </li>
        ))}
      </ul>

      <a
        href={`/memos/new?category=${category}`}
        className="inline-block mt-6 px-3 py-2 bg-blue-600 text-white"
      >
        ＋ 新規メモ
      </a>
    </main>
  );
}