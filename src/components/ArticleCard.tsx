import { Article } from "../types/article";
import { Link } from "react-router-dom";

interface Props {
  article: Article;
}

const ArticleCard = ({ article }: Props) => {
  return (
    <div className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition">
      <img src={article.imageUrl} alt={article.title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <p className="text-sm text-gray-500">{article.category}</p>
        <Link to={`/article/${article.slug}`}>
          <h2 className="text-xl font-bold mt-1 hover:underline">{article.title}</h2>
        </Link>
        <p className="text-gray-700 mt-2">{article.excerpt}</p>
        <p className="text-sm text-gray-400 mt-2">
          By {article.author.name} • {new Date(article.publishedAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

export default ArticleCard;
