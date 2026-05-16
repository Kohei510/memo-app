import { createSupabaseServerClient } from "@/lib/supabase-server";
import { updateMemo } from "./update/action";

type EditPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditMemoPage({ params }: EditPageProps) {
  const { id } = await params;
  const supabase = await createSupabaseServerClient();
  const { data: memo, error } = await supabase
    .from("memos")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    return <pre>Error: {error.message}</pre>;
  }

  return (
    <form action={updateMemo} className="space-y-4">
      <input type="hidden" name="id" value={id} />
      <input type="hidden" name="category" value={memo.category_id} />


      <div>
        <label>タイトル</label>
        <input
          name="title"
          defaultValue={memo.title}
          className="border p-2 w-full"
        />
      </div>

      <div>
        <label>内容</label>
        <textarea
          name="content"
          defaultValue={memo.content}
          className="border p-2 w-full h-40"
        />
      </div>

      <div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2">
          更新 / 戻る
        </button>
      </div>
    </form>
  );
}
