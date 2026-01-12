import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { Link, useNavigate } from "react-router-dom";
import { IoLogoFacebook, IoLogoTwitter, IoLogoGithub } from "react-icons/io";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  // Fetch all blogs on component mount
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/posts`)
      .then((res) => res.json())
      .then((data) => setBlogs(data))
      .catch((err) => console.error("Failed to fetch blogs:", err));
  }, []);

  // Smooth scroll helper for contact section
  const scrollToOptions = (id) => {
    setTimeout(() => {
      const section = document.getElementById(id);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }, 300);
  };

  // Navigate to /all-blog with scroll state to open specific blog
  const handleCardClick = (id) => {
    navigate("/all-blog", { state: { scrollToId: id } });
  };

  return (
    <div className="font-oswald" style={{ backgroundColor: "#FFE5ED" }}>
      
      <Navbar scrollToOptions={scrollToOptions} />

      <div className="container mt-4">
        {/* Top 5 Cards */}
        <div className="row">
          {/* Left column */}
          <div className="col-12 col-lg-3 d-flex flex-column align-items-center mb-3 mb-lg-0">
            {[0, 3].map((i) =>
              blogs[i] ? (
                <div
                  key={blogs[i]._id}
                  onClick={() => handleCardClick(blogs[i]._id)}
                  className="card mb-4 shadow-sm cursor-pointer border border-dark border-3"
                  style={{ width: "300px", height: "300px", overflow: "auto" }}
                >
                  <div className="card-body border border-dark">
                    <h5
                      style={{ textDecoration: "underline" }}
                      className="card-title text-capitalize custom-font"
                    >
                      {blogs[i].title}
                    </h5>
                    <p className="card-text text-capitalize custom-font">
                      {blogs[i].content.slice(0, 100)}...
                    </p>
                  </div>
                </div>
              ) : null
            )}
          </div>

          {/* Center column */}
          <div className="col-lg-6 col-12 d-flex justify-content-center mb-3 mb-lg-0">
            {blogs[1] && (
              <div
                onClick={() => handleCardClick(blogs[1]._id)}
                className="card text-center shadow-sm border border-dark border-3"
                style={{
                  width: "100%",
                  height: "630px",
                  overflow: "auto",
                  cursor: "pointer",
                }}
              >
                <div className="card-body border border-dark">
                  <h4
                    style={{ textDecoration: "underline" }}
                    className="card-title text-capitalize custom-font"
                  >
                    {blogs[1].title}
                  </h4>
                  <p className="card-text text-capitalize custom-font">
                    {blogs[1].content}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Right column */}
          <div className="col-lg-3 col-12 d-flex flex-column align-items-center">
            {[2, 4].map((i) =>
              blogs[i] ? (
                <div
                  key={blogs[i]._id}
                  onClick={() => handleCardClick(blogs[i]._id)}
                  className="card mb-4 shadow-sm cursor-pointer border border-dark border-3"
                  style={{ width: "300px", height: "300px", overflow: "auto" }}
                >
                  <div className="card-body border border-dark">
                    <h5
                      style={{ textDecoration: "underline" }}
                      className="card-title text-capitalize custom-font"
                    >
                      {blogs[i].title}
                    </h5>
                    <p className="card-text text-capitalize custom-font">
                      {blogs[i].content.slice(0, 100)}...
                    </p>
                  </div>
                </div>
              ) : null
            )}
          </div>
        </div>

        {/* Remaining posts feed */}
        <div className="row mt-5">
          {blogs.slice(5).map((blog) => (
            <div className="col-md-6 col-lg-4 mb-4" key={blog._id}>
              <div
                className="card h-100 shadow-sm border border-dark"
                style={{ cursor: "pointer" }}
                onClick={() => handleCardClick(blog._id)}
              >
                <div className="card-body">
                  <h5
                    style={{ textDecoration: "underline" }}
                    className="card-title text-capitalize custom-font"
                  >
                    {blog.title}
                  </h5>
                  <p className="card-text text-capitalize custom-font">
                    {blog.content.slice(0, 120)}...
                  </p>
                  <p className="text-muted text-capitalize">
                    <strong>Author:</strong> {blog.author?.username}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <section
        className="mt-4"
        id="contact"
        style={{
          width: "100%",
          height: "160px",
          background: "#4e6688",
          borderRadius: 8,
          padding: "2rem",
          boxShadow: "0 2px 8px #0001",
        }}
      >
        <div className="container">
          <h2 className="mb-3 font-oswald">
            Details
          </h2>
          <div className="d-flex gap-4 justify-content-center">
            <a
              className="text-white text-decoration-none fs-5"
              href="/about"
              style={{  fontSize: "17px" }}
            >
              About
            </a>
            <a
              className="text-white text-decoration-none fs-5"
              href="/contact"
              style={{  fontSize: "17px" }}
            >
              Contact Us
            </a>
            <div className="d-flex gap-4 fs-4 mt-1 text-white">
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="text-white"
                style={{ display: "flex", alignItems: "center" }}
              >
                <IoLogoFacebook />
              </a>
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="text-white"
                style={{ display: "flex", alignItems: "center" }}
              >
                <IoLogoTwitter />
              </a>
              <a
                href="https://github.com/Dazai990"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white"
                style={{ display: "flex", alignItems: "center" }}
              >
                <IoLogoGithub />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
