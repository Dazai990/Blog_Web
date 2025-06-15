import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";


const PostForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [authorName, setAuthorName] = useState('')
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must log in to create a post.");
      return;
    }

    const res = await fetch("http://localhost:4000/api/posts/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title, content,authorName }),
    });

    const data = await res.json();

    if (res.ok) {
    //   onPostCreated(data);
      setTitle('');
      setContent('');
      setAuthorName('');
      alert('Your Post uploaded sccessfully' )
      navigate("/home");
    } else {
      alert(data.error || "Failed to create post");
    }
  };
  const handleNavigate = ()=>{
    navigate('/home');
  }

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
          style={{backgroundColor:'#ddf6d2',height:'140px'}}
            className="form-control text-capitalize custom-font"
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <div className="d-flex justify-content-center mt-3">
          <button className="btn btn-success ps-4 pt-2 pb-2 pe-4" type="submit">
            POST
          </button>
        </div>
      </form>
    </div>
       </div>
  );
};

export default PostForm;
