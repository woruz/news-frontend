import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api, setAuthToken } from "../../api/api";

const categories = ["Politics", "Technology", "Sports", "Business", "Entertainment"];

const EditArticle = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [category, setCategory] = useState(categories[0]);
  const [author, setAuthor] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [tags, setTags] = useState("");
  const [publishDate, setPublishDate] = useState("");
  const [error, setError] = useState("");

  useEffect(() => { 
    const fetchArticle = async () => {
      try {
        const res = await api.get(`/articles/id/${id}`);
        console.log({res})
        const a = res.data;
        setTitle(a.title);
        setContent(a.content);
        setExcerpt(a.excerpt || a.content.slice(0, 200));
        setCategory(a.category);
        setAuthor(a.author.name);
        setImageUrl(a.imageUrl);
        setTags((a.tags || []).join(", "));
        setPublishDate(a.publishedAt.split("T")[0]);
      } catch (err) {
        console.error(err);
        setError("Failed to load article");
      }
    };
    if (id) fetchArticle();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const token = localStorage.getItem("token");
      setAuthToken(token || null);

      await api.put(`/articles/${id}`, {
        title,
        slug: title.toLowerCase().replace(/\s+/g, "-"),
        content,
        excerpt: excerpt || content.slice(0, 200),
        category,
        author: { name: author },
        imageUrl,
        tags: tags.split(",").map(t => t.trim()),
        publishedAt: publishDate,
      });

      navigate("/admin");
    } catch (err: unknown) {
      console.error(err);
      setError("Failed to update article");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Article</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form className="space-y-4" onSubmit={handleSubmit}>
        <input type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} className="w-full border p-2 rounded" required />
        <textarea placeholder="Content" value={content} onChange={e => setContent(e.target.value)} className="w-full border p-2 rounded h-40" required />
        <input type="text" placeholder="Excerpt (optional)" value={excerpt} onChange={e => setExcerpt(e.target.value)} className="w-full border p-2 rounded" />
        <select value={category} onChange={e => setCategory(e.target.value)} className="w-full border p-2 rounded">
          {categories.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <input type="text" placeholder="Author Name" value={author} onChange={e => setAuthor(e.target.value)} className="w-full border p-2 rounded" required />
        <input type="text" placeholder="Image URL" value={imageUrl} onChange={e => setImageUrl(e.target.value)} className="w-full border p-2 rounded" />
        <input type="text" placeholder="Tags (comma separated)" value={tags} onChange={e => setTags(e.target.value)} className="w-full border p-2 rounded" />
        <input type="date" placeholder="Publish Date" value={publishDate} onChange={e => setPublishDate(e.target.value)} className="w-full border p-2 rounded" required />
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Update Article</button>
      </form>
    </div>
  );
};

export default EditArticle;
