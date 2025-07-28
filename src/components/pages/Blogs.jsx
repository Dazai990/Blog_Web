import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";
import { FaArrowUp } from "react-icons/fa";

const blogURL = import.meta.env.VITE_API_BASE_URL + "/api/posts";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState('');
  const [expandedId, setExpandedId] = useState(null);
  const [highlightId, setHighlightId] = useState(null);
  const [showScroll, setShowScroll] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const getAllBlogs = async (baseUrl) => {
    try {
      const response = await fetch(baseUrl + '/', {
        method: 'GET',
        headers: {
          'Accept': 'application/json'
        }
      });

      const contentType = response.headers.get("content-type");
      if (!response.ok) {
        if (response.status === 404) {
          setError("No blogs found.");
        } else {
          throw new Error(`Server Error: ${response.status} ${response.statusText}`);
        }
      } else if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Unexpected response format. Server might be down or returning HTML.");
      } else {
        const data = await response.json();
        setBlogs(data);
      }
    } catch (err) {
      console.error(err);
      setError("Failed to fetch blogs. Please check your internet or server status.");
    }
  };

  useEffect(() => {
    getAllBlogs(blogURL);
  }, []);

  useEffect(() => {
    if (location.state?.scrollToId && blogs.length > 0) {
      const postEl = document.getElementById(location.state.scrollToId);
      if (postEl) {
        postEl.scrollIntoView({ behavior: "smooth", block: "start" });
        setExpandedId(location.state.scrollToId);
        setHighlightId(location.state.scrollToId);
        setTimeout(() => setHighlightId(null), 2000);
      }
    }
  }, [blogs, location.state]);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleNavigate = () => {
    navigate('/home');
  };

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowScroll(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div style={{ backgroundColor: '#dcefea', minHeight: '100vh', padding: '20px', boxSizing: 'border-box' }}>
      <div className="container mt-3 ">
        <div className="position-relative">
          <button className="btn btn-warning top-0 start-0 position-absolute m-2" onClick={handleNavigate}>
            <IoMdArrowBack />
          </button>
        </div>

        <h2 style={{ fontFamily: 'cursive', fontSize: '36px' }} className="mb-4 text-primary">All Blogs</h2>

        {error && <div className="alert alert-danger">{error}</div>}

        {blogs.length === 0 && !error ? (
          <p>Loading blogs...</p>
        ) : (
          blogs.map(blog => (
            <div
              id={blog._id}
              className={`card mb-3 shadow-sm ${highlightId === blog._id ? 'highlighted-post' : ''}`}
              key={blog._id}
              onClick={() => toggleExpand(blog._id)}
              style={{ cursor: "pointer", backgroundColor: '#90d1ca' }}
            >
              <div style={{ backgroundColor: '#129990' }} className="card-header">
                <h5 className="mb-0 text-capitalize custom-font">{blog.title}</h5>
              </div>
              <div className={`custom-collapse ${expandedId === blog._id ? 'show' : ''}`}>
                <div className="card-body">
                  <p className="card-text text-capitalize custom-font">{blog.content}</p>
                  <p className="card-text text-capitalize custom-font">
                    <strong>Author:</strong> {blog.author?.username}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}

        <button
          className={`btn btn-primary scroll-to-top ${showScroll ? 'show' : ''}`}
          onClick={handleScrollTop}
        >
          <FaArrowUp />
        </button>
      </div>
    </div>
  );
};

export default Blogs;
