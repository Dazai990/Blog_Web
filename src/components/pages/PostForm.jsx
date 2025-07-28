import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";

const PostForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [authorName, setAuthorName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must log in to create a post.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/posts/new`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: title.trim(),
          content: content.trim(),
          authorName: authorName.trim(),
        }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error("Server error:", errorText);
        alert("Failed to create post. Check console for details.");
        setIsSubmitting(false);
        return;
      }

      await res.json();
      setTitle('');
      setContent('');
      setAuthorName('');
      alert('Your Post uploaded successfully');
      navigate("/home");
    } catch (error) {
      console.error("Fetch failed:", error);
      alert("Something went wrong. Please try again.");
      setIsSubmitting(false);
    }
  };

  const handleNavigate = () => {
    navigate('/home');
  };

  return (
    <div style={{backgroundColor:'#fffef3', minHeight: '100vh', padding: '20px', boxSizing: 'border-box' }}>
      <div className="container mt-3">
        <div className="position-relative">
          <button className="btn btn-warning top-0 start-0 position-absolute m-2" onClick={handleNavigate}>
            <IoMdArrowBack />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <h3 style={{fontFamily:'cursive'}}>Create New Post</h3>
          <div className="mb-4 mt-5 border border-secondary">
            <input
              style={{backgroundColor:'#ddf6d2'}}
              className="form-control text-capitalize custom-font"
              type="text"
              placeholder="Author Name"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4 border border-secondary">
            <input
              style={{backgroundColor:'#ddf6d2'}}
              className="form-control text-capitalize custom-font"
              type="text"
              placeholder="Preferred Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="mb-5 border border-secondary">
            <textarea
              style={{backgroundColor:'#ddf6d2', height:'140px'}}
              className="form-control text-capitalize custom-font"
              placeholder="Content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </div>
          <div className="d-flex justify-content-center mt-3">
            <button className="btn btn-success ps-4 pt-2 pb-2 pe-4" type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Posting..." : "POST"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostForm;
