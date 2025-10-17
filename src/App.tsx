import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import ArticleDetail from "./pages/ArticleDetail";
import Dashboard from "./pages/admin/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./pages/admin/Login";
import CreateArticle from "./pages/admin/CreateArticle";
import EditArticle from "./pages/admin/EditArticle";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/article/:slug" element={<ArticleDetail />} />
      <Route path="/admin/login" element={<Login />} />
      <Route
        path="/admin"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin/create"
        element={
          <PrivateRoute>
            <CreateArticle />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin/edit/:id"
        element={
          <PrivateRoute>
            <EditArticle />
          </PrivateRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
