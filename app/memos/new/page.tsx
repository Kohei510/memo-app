import { supabase } from "@/lib/supabase";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase-server";

export async function createMemo(formData: FormData) {
  "use server";

  const supabase = await createSupabaseServerClient();
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const category_id = formData.get("category_id") as string;

  await supabase.from("memos").insert({
    title,
    content,
    category_id,
  });

  redirect(`/memos?category=${category_id}`);
}

type NewMemoPageProps = {
  searchParams: Promise<{ category?: string }>;
};

export default async function NewMemoPage({ searchParams }: NewMemoPageProps) {
  const { category } = await searchParams;

  return (
    <form
      
      className="space-y-4"
    >
      <input type="hidden" name="category_id" value={category} />

      <div>
        <label>タイトル</label>
        <input
          name="title"
          className="border p-2 w-full"
          required
        />
      </div>

      <div>
        <label>内容</label>
        <textarea
          name="content"
          className="border p-2 w-full h-40"
          required
        />
      </div>

      <div style={{
        display: "flex",
        justifyContent: "space-between"
      }}>
        <button
          type="submit"
          formAction={createMemo}
          className="bg-blue-600 text-white px-4 py-2"
        >
          保存
        </button>
        <button
          className="bg-black text-white px-4 py-2"
        >
          <a href={`/memos?category=${category}`}>
            戻る
          </a>
        </button>
      </div>
    </form>
  );
}
