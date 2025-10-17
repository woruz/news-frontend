import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { api } from "../api/api";
import { Article } from "../types/article";
import ArticleCard from "../components/ArticleCard";
import Layout from "../components/Layout";
import Loader from "../components/Loader";
import Pagination from "../components/Pagination";

const PAGE_SIZE = 6;
const Home = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchParams] = useSearchParams();

  const category = searchParams.get("category") || undefined;
  const q = searchParams.get("q") || undefined;
  console.log({ searchParams });

  useEffect(() => {
    const fetchArticles = async (page: number) => {
    setLoading(true);
    try {
      const res = await api.get("/articles", {
        params: { page, limit: PAGE_SIZE, category, q },
      });
      setArticles(res.data.articles);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

    fetchArticles(currentPage);
  }, [currentPage, category, q]);

  const handlePageChange = (page: number) => setCurrentPage(page);

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-4">Latest News</h1>
      {loading ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <ArticleCard key={article._id} article={article} />
          ))}
        </div>
      )}
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
    </Layout>
  );
};

export default Home;
