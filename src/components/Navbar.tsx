import { Link, useNavigate, useLocation, createSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import debounce from "lodash/debounce";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const isAdmin = !!localStorage.getItem("token");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const newSearch = params.get("q") || "";
    const newCategory = params.get("category") || "";

    if (newSearch !== search) setSearch(newSearch);
    if (newCategory !== category) setCategory(newCategory);
  }, [location.search, search, category]);

  // 🕒 Debounced search/category navigation
  const debouncedNavigate = debounce((query: string, cat: string) => {
    if (location.pathname !== "/") return;
    const params: Record<string, string> = {};
    if (query.trim()) params.q = query.trim();
    if (cat) params.category = cat;
    // params.page = "1"; // reset to first page when new search or category

    navigate({
      pathname: "/",
      search: createSearchParams(params).toString(),
    });
  }, 500);

  // 🧠 Trigger debounce when search or category changes
  useEffect(() => {
    debouncedNavigate(search, category);
    return () => {
      debouncedNavigate.cancel();
    };
  }, [search, category, debouncedNavigate]);

  const handleCategoryChange = (cat: string) => {
    setCategory(cat);
    const params: Record<string, string> = {};
    if (search.trim()) params.q = search.trim();
    if (cat) params.category = cat;
    // params.page = "1";

    navigate({
      pathname: "/",
      search: createSearchParams(params).toString(),
    });
    setOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  // const handleSearch = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if (search.trim()) {
  //     navigate(`/?q=${encodeURIComponent(search.trim())}`);
  //   } else {
  //     navigate(`/`);
  //   }
  //   setOpen(false);
  // };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto flex justify-between items-center p-4">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          NewsHub
        </Link>

        {location.pathname === "/" && (
          <div className="hidden md:flex items-center border rounded-lg overflow-hidden w-96">
            <input
              type="text"
              placeholder="Search articles..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-grow px-3 py-2 outline-none"
            />
          </div>
        )}
        {/* Desktop menu */}
        <ul className="hidden md:flex gap-6 items-center">
          <li>
            <Link to="/" className="hover:text-blue-500">Home</Link>
          </li>
          <li>
            <Link to="/?category=Politics" className="hover:text-blue-500" onClick={() => handleCategoryChange("Politics")}>Politics</Link>
          </li>
          <li>
            <Link to="/?category=Technology" className="hover:text-blue-500" onClick={() => handleCategoryChange("Technology")}>Technology</Link>
          </li>
          <li>
            <Link to="/?category=Sports" className="hover:text-blue-500" onClick={() => handleCategoryChange("Sports")}>Sports</Link>
          </li>
          <li>
            <Link to="/?category=Business" className="hover:text-blue-500" onClick={() => handleCategoryChange("Business")}>Business</Link>
          </li>
          <li>
            <Link to="/?category=Entertainment" className="hover:text-blue-500">Entertainment</Link>
          </li>
          {isAdmin ? (
            <>
              <li><Link to="/admin" className="hover:text-blue-500">Admin</Link></li>
              <li><button onClick={handleLogout} className="text-red-500">Logout</button></li>
            </>
          ) : null}
        </ul>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden p-2 border rounded"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <ul className="md:hidden flex flex-col gap-2 bg-white p-4 border-t">
          <li>
            <Link to="/" onClick={() => setOpen(false)}>Home</Link>
          </li>
          <li>
            <Link to="/?category=Politics" onClick={() => { setOpen(false); handleCategoryChange("Politics"); }}>Politics</Link>
          </li>
          <li>
            <Link to="/?category=Technology" onClick={() => { setOpen(false); handleCategoryChange("Technology"); }}>Technology</Link>
          </li>
          <li>
            <Link to="/?category=Sports" onClick={() => { setOpen(false); handleCategoryChange("Sports"); }}>Sports</Link>
          </li>
          <li>
            <Link to="/?category=Business" onClick={() => { setOpen(false); handleCategoryChange("Business"); }}>Business</Link>
          </li>
          <li>
            <Link to="/?category=Entertainment" onClick={() => { setOpen(false); handleCategoryChange("Entertainment"); }}>Entertainment</Link>
          </li>
          {isAdmin && (
            <>
              <li><Link to="/admin" onClick={() => setOpen(false)}>Admin</Link></li>
              <li><button onClick={handleLogout} className="text-red-500">Logout</button></li>
            </>
          )}
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
