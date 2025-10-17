import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../api/api";
import { Article } from "../types/article";
import Layout from "../components/Layout";
import Loader from "../components/Loader";
import ReactMarkdown from "react-markdown";

const ArticleDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const res = await api.get<{ article: Article }>(`/articles/${slug}`);
        setArticle(res.data.article);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (slug) fetchArticle();
  }, [slug]);

  if (loading) return <Layout><Loader /></Layout>;
  if (!article) return <Layout><p>Article not found</p></Layout>;

  const readingTime = article.readingTime || Math.ceil(article.content.split(" ").length / 200);

  return (
    <Layout>
      <img src={article.imageUrl} alt={article.title} className="w-full h-64 object-cover rounded mb-4"/>
      <h1 className="text-3xl font-bold mb-2">{article.title}</h1>
      <p className="text-gray-500 mb-4">
        By {article.author.name} • {new Date(article.publishedAt).toLocaleDateString()} • {readingTime} min read
      </p>
      <div className="prose max-w-full">
        <ReactMarkdown>{article.content}</ReactMarkdown>
      </div>
    </Layout>
  );
};

export default ArticleDetail;
