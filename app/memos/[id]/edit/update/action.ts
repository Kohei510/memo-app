"use server";

import { createSupabaseServerClient } from "@/lib/supabase-server";
import { redirect } from "next/navigation";

export async function updateMemo(formData: FormData) {
  const supabase = await createSupabaseServerClient();

  const id = formData.get("id") as string;
  const category = formData.get("category") as string;
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;

  await supabase
    .from("memos")
    .update({ title, content })
    .eq("id", id);

  redirect(`/memos?category=${category}`);
}
