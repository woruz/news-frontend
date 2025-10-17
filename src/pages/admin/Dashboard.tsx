import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { api, setAuthToken } from "../../api/api";
import { Article } from "../../types/article";
import { Link } from "react-router-dom";
import Pagination from "../../components/Pagination";

const PAGE_SIZE = 6;
const Dashboard = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchArticles = async (page: number) => {
      try {
        const res = await api.get("/articles",{
        params: { page, limit: PAGE_SIZE},
      });
        setArticles(res.data.articles);
        setTotalPages(res.data.totalPages);
      } catch (err) {
        console.error(err);
      }
    };

  useEffect(() => {
    fetchArticles(currentPage);
  }, [currentPage]);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this article?")) return;

    try {
      const token = localStorage.getItem("token");
      setAuthToken(token || null);

      await api.delete(`/articles/${id}`);
      // refetch articles for current page
      fetchArticles(currentPage);
    } catch (err) {
      console.error(err);
      alert("Failed to delete article");
    }
  };

  const handlePageChange = (page: number) => setCurrentPage(page);

  return (
    <Layout>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <Link to="/admin/create" className="bg-blue-500 text-white px-4 py-2 rounded">Create Article</Link>
      </div>
      <table className="min-w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2">Title</th>
            <th className="border px-4 py-2">Category</th>
            <th className="border px-4 py-2">Author</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {articles.map(a => (
            <tr key={a._id}>
              <td className="border px-4 py-2">{a.title}</td>
              <td className="border px-4 py-2">{a.category}</td>
              <td className="border px-4 py-2">{a.author.name}</td>
              <td className="border px-4 py-2">
                <Link to={`/admin/edit/${a._id}`} className="text-blue-500 mr-2">Edit</Link>
                <button onClick={() => handleDelete(a._id)} className="text-red-500">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
    </Layout>
  );
};

export default Dashboard;
