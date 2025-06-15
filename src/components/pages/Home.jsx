import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoLogoFacebook, IoLogoTwitter , IoLogoGithub} from "react-icons/io";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:4000/api/posts")
      .then((res) => res.json())
      .then((data) => setBlogs(data))
      .catch((err) => console.error(err));
  }, []);

  const scrollToOptions = (id) => {
    setTimeout(() => {
      const section = document.getElementById(id);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }, 300);
  };

  const handleCardClick = (id) => {
    navigate("/all-blog", { state: { scrollToId: id } });
  };

  return (
    <div style={{backgroundColor:'#FFE5ED'}}>
      <nav
        style={{ height: "280px"}}
        className="navbar navbar-expand-lg p-0 position-relative navbar-background border border-bottom border-dark border-2"
      >
        <div className="container-fluid h-100 d-flex flex-column justify-content-end align-items-center">
          <div
            className="position-absolute top-0 start-0 text-dark p-3 d-flex align-items-center"
            style={{ fontSize: "29px", fontFamily: "cursive", fontWeight: "bold" }}
          >
            <img
              src="/a-logo.png"
              alt="Logo"
              style={{ height: "45px", width: "45px", objectFit: "cover", marginRight: "10px",backgroundColor:'#EAF6FF',borderRadius:'14px' }}
            />
            <span style={{color:'white',fontFamily:'cursive',fontSize:'33px'}}>Mon@r7</span>
          </div>

          <ul style={{ fontWeight: "bolder" }} className="navbar-nav flex-row flex-wrap justify-content-center gap-5 mb-4">
            <li className="nav-item">
              <Link style={{ fontFamily: "cursive", fontSize: "20px",color:'white' }} className="nav-link" to="/about">
                About
              </Link>
            </li>
            <li className="nav-item">
              <a
                style={{ fontFamily: "cursive", fontSize: "20px",color:'white' }}
                className="nav-link"
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToOptions("contact");
                }}
              >
                Contacts
              </a>
            </li>
            <li className="nav-item">
              <Link style={{ fontFamily: "cursive", fontSize: "21px",color:'white' }} className="nav-link" to="/all-blog">
                All Blogs
              </Link>
            </li>
            <li className="nav-item">
              <Link style={{ fontFamily: "cursive", fontSize: "20px",color:'white' }} className="nav-link" to="/Create-blog">
                Create New Blog
              </Link>
            </li>
            <li className="nav-item">
              <Link style={{ fontFamily: "cursive", fontSize: "20px",color:'white' }} className="nav-link" to="/my-blog">
                My Blogs
              </Link>
            </li>
            <li className="nav-item">
              <Link style={{ fontFamily: "cursive", fontSize: "20px",color:'white' }} className="nav-link" to="/">
                Sign out
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      <div className="container mt-4">
        {/* Top 5 Cards */}
        <div className="row">
          {/* Left */}
          <div className="col-12 col-lg-3 d-flex flex-column align-items-center mb-3 mb-lg-0">
            {[0, 3].map((i) =>
              blogs[i] ? (
                <div
                  key={blogs[i]._id}
                  onClick={() => handleCardClick(blogs[i]._id)}
                  className="card mb-4 shadow-sm cursor-pointer border border-dark border-3"
                  style={{ width: "300px", height: "300px", overflow: "auto", cursor: "pointer", }}
                >
                  <div className="card-body border border-dark">
                    <h5 style={{textDecoration:'underline'}} className="card-title text-capitalize custom-font">{blogs[i].title}</h5>
                    <p className="card-text text-capitalize custom-font">{blogs[i].content.slice(0, 100)}...</p>
                  </div>
                </div>
              ) : null
            )}
          </div>

          {/* Center */}
          <div className="col-lg-6 col-12 d-flex justify-content-center mb-3 mb-lg-0">
            {blogs[1] && (
              <div
                onClick={() => handleCardClick(blogs[1]._id)}
                className="card text-center shadow-sm border border-dark border-3"
                style={{ width: "100%", height: "630px", overflow: "auto", cursor: "pointer" }}
              >
                <div className="card-body border border-dark">
                  <h4 style={{textDecoration:'underline'}} className="card-title text-capitalize custom-font">{blogs[1].title}</h4>
                  <p className="card-text text-capitalize custom-font">{blogs[1].content}</p>
                </div>
              </div>
            )}
          </div>

          {/* Right */}
          <div className="col-lg-3 col-12 d-flex flex-column align-items-center">
            {[2, 4].map((i) =>
              blogs[i] ? (
                <div
                  key={blogs[i]._id}
                  onClick={() => handleCardClick(blogs[i]._id)}
                  className="card mb-4 shadow-sm cursor-pointer border border-dark border-3"
                  style={{ width: "300px", height: "300px", overflow: "auto", cursor: "pointer" }}
                >
                  <div className="card-body border border-dark">
                    <h5 style={{textDecoration:'underline'}} className="card-title text-capitalize custom-font">{blogs[i].title}</h5>
                    <p className="card-text text-capitalize custom-font">{blogs[i].content.slice(0, 100)}...</p>
                  </div>
                </div>
              ) : null
            )}
          </div>
        </div>

        {/* Feed of Remaining Posts */}
        <div className="row mt-5">
          {blogs.slice(5).map((blog) => (
            <div className="col-md-6 col-lg-4 mb-4" key={blog._id}>
              <div
                className="card h-100 shadow-sm border border-dark"
                style={{ cursor: "pointer" }}
                onClick={() => handleCardClick(blog._id)}
              >
                <div className="card-body">
                  <h5 style={{textDecoration:'underline'}} className="card-title text-capitalize custom-font">{blog.title}</h5>
                  <p className="card-text text-capitalize custom-font">{blog.content.slice(0, 120)}...</p>
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
          width: '100%',
          height:'160px',
          background: "#4e6688",
          borderRadius: 8,
          padding: "2rem",
          boxShadow: "0 2px 8px #0001",}}>
          <div className="container">
  <h2 className="mb-3" style={{ fontFamily: 'cursive' }}>Details</h2>
  <div className="d-flex gap-4 justify-content-center">
    <a className="text-white text-decoration-none fs-5" href="/about" style={{ fontFamily: 'cursive', fontSize: '17px' }}>
      About
    </a>
    <a className="text-white text-decoration-none fs-5" href="/contact" style={{ fontFamily: 'cursive', fontSize: '17px' }}>
      Contact Us
    </a>
    <div className="d-flex gap-4 fs-4 mt-1 text-white">
      <IoLogoFacebook /> <IoLogoTwitter /> <IoLogoGithub />
    </div>
  </div>
</div>
        </section>
    </div>
  );
}; 

export default Home;
