import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import { IoLogoFacebook, IoLogoTwitter, IoLogoGithub } from "react-icons/io";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch all blogs
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/posts`)
      .then((res) => res.json())
      .then((data) => {
        setBlogs(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch blogs:", err);
        setLoading(false);
      });
  }, []);

  // Smooth scroll helper
  const scrollToOptions = (id) => {
    setTimeout(() => {
      const section = document.getElementById(id);
      if (section) section.scrollIntoView({ behavior: "smooth" });
    }, 300);
  };

  // Navigate to blog
  const handleCardClick = (id) => {
    navigate("/all-blog", { state: { scrollToId: id } });
  };

  return (
    <div
      className="font-oswald d-flex flex-column min-vh-100"
      style={{ backgroundColor: "#FFE5ED" }}
    >
      {/* NAVBAR */}
      <Navbar scrollToOptions={scrollToOptions} />

      {/* MAIN CONTENT (fills remaining space) */}
      <main className="container mt-4 flex-grow-1">
        {loading ? (
          // Loader placeholder (prevents layout collapse)
          <div className="d-flex justify-content-center align-items-center h-100">
            <div className="spinner-border text-dark" role="status" />
          </div>
        ) : (
          <>
            {/* TOP 5 CARDS */}
            <div className="row">
              {/* Left */}
              <div className="col-12 col-lg-3 d-flex flex-column align-items-center mb-3 mb-lg-0">
                {[0, 3].map(
                  (i) =>
                    blogs[i] && (
                      <div
                        key={blogs[i]._id}
                        onClick={() => handleCardClick(blogs[i]._id)}
                        className="card mb-4 shadow-sm border-dark border-3"
                        style={{ width: "300px", height: "300px", cursor: "pointer" }}
                      >
                        <div className="card-body border border-dark">
                          <h5 className="card-title text-decoration-underline text-capitalize">
                            {blogs[i].title}
                          </h5>
                          <p className="card-text">
                            {blogs[i].content.slice(0, 100)}...
                          </p>
                        </div>
                      </div>
                    )
                )}
              </div>

              {/* Center */}
              <div className="col-lg-6 col-12 d-flex justify-content-center mb-3 mb-lg-0">
                {blogs[1] && (
                  <div
                    onClick={() => handleCardClick(blogs[1]._id)}
                    className="card shadow-sm border-dark border-3 w-100"
                    style={{ height: "630px", cursor: "pointer" }}
                  >
                    <div className="card-body border border-dark">
                      <h4 className="card-title text-decoration-underline text-capitalize">
                        {blogs[1].title}
                      </h4>
                      <p className="card-text">{blogs[1].content}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Right */}
              <div className="col-lg-3 col-12 d-flex flex-column align-items-center">
                {[2, 4].map(
                  (i) =>
                    blogs[i] && (
                      <div
                        key={blogs[i]._id}
                        onClick={() => handleCardClick(blogs[i]._id)}
                        className="card mb-4 shadow-sm border-dark border-3"
                        style={{ width: "300px", height: "300px", cursor: "pointer" }}
                      >
                        <div className="card-body border border-dark">
                          <h5 className="card-title text-decoration-underline text-capitalize">
                            {blogs[i].title}
                          </h5>
                          <p className="card-text">
                            {blogs[i].content.slice(0, 100)}...
                          </p>
                        </div>
                      </div>
                    )
                )}
              </div>
            </div>

            {/* REMAINING POSTS */}
            <div className="row mt-5">
              {blogs.slice(5).map((blog) => (
                <div className="col-md-6 col-lg-4 mb-4" key={blog._id}>
                  <div
                    className="card h-100 shadow-sm border border-dark"
                    onClick={() => handleCardClick(blog._id)}
                    style={{ cursor: "pointer" }}
                  >
                    <div className="card-body">
                      <h5 className="card-title text-decoration-underline text-capitalize">
                        {blog.title}
                      </h5>
                      <p className="card-text">
                        {blog.content.slice(0, 120)}...
                      </p>
                      <p className="text-muted">
                        <strong>Author:</strong> {blog.author?.username}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </main>

      {/* FOOTER / CONTACT */}
      <section
        id="contact"
        style={{
          background: "#4e6688",
          padding: "2rem",
          color: "#fff",
        }}
      >
        <div className="container text-center">
          <h2 className="mb-3">Details</h2>
          <div className="d-flex justify-content-center gap-4 mb-3">
            <a href="/about" className="text-white text-decoration-none">About</a>
            <a href="/contact" className="text-white text-decoration-none">Contact</a>
          </div>
          <div className="d-flex justify-content-center gap-4 fs-4">
            <IoLogoFacebook />
            <IoLogoTwitter />
            <a
              href="https://github.com/Dazai990"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white"
            >
              <IoLogoGithub />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
