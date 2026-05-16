export const dynamic = "force-dynamic";
import { supabase } from "@/lib/supabase";

export default async function Home() {
  const { data: categories, error } = await supabase
    .from("categories")
    .select("*")
    .order("created_at");
    if(error) {
      console.error(error);
      return <div>エラーが発生しました</div>;
    }

    return (
    <main
      style={{
        paddingTop: "80px",
        maxWidth: "600px",
        margin: "0 auto",
        width: "100%",
      }}
    >
      <h1
        style={{
          fontSize: "28px",
          fontWeight: "600",
          textAlign: "center",
          marginBottom: "30px",
        }}
      >
        カテゴリー
      </h1>

      <ul
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          padding: 0,
          listStyle: "none",
        }}
      >
        {categories?.map((c) => (
          <li key={c.id}>
            <a
              href={`/memos?category=${c.id}`}
              style={{
                display: "block",
                padding: "14px 18px",
                borderRadius: "8px",
                border: "1px solid #ddd",
                textDecoration: "none",
                color: "#111",
                fontSize: "18px",
                transition: "background 0.2s ease",
              }}
              className="category-link"
            >
              {c.name}
            </a>
          </li>
        ))}
      </ul>
    </main>
  );
}