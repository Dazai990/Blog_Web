import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoMdArrowBack } from "react-icons/io";

function MyPosts() {
  const [posts, setPosts] = useState([]);
  const [expandedPostId, setExpandedPostId] = useState(null);
  const navigate = useNavigate();

  // Fetch posts for the logged-in user
  const fetchMyPosts = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('You need to log in first');
      return;
    }

    try {
     const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/posts/my-posts`, {
     method: 'GET',
     headers: {
    'Authorization': `Bearer ${token}`,
    },
    });

      if (!response.ok) {
        throw new Error('Failed to fetch posts Login Again!');
      }

      const data = await response.json();
      setPosts(data); // Set the fetched posts
    } catch (error) {
      console.error(error);
      alert('An error occurred while fetching posts.');
    }
  };

  useEffect(() => {
    fetchMyPosts(); 
  }, []);

  const handleNavigate = ()=>{
    navigate('/home');
  }

  // Handle post deletion
  const handleDelete = async (postId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this post?');
    if (!confirmDelete) return;

    const token = localStorage.getItem('token'); 
    try {
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/posts/${postId}`, {
     method: 'DELETE',
     headers: {
    'Authorization': `Bearer ${token}`,
    },
    });

      if (res.ok) {
        // setPosts(posts.filter((post) => post._id !== postId)); // Remove post from the state
        await fetchMyPosts();
        setExpandedPostId(null); // Collapse post details after delete
      } else {
        const error = await res.json();
        alert(error.error || 'Failed to delete post');
      }
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('Failed to delete post');
    }
  };

  // Toggle expand/collapse post
  const toggleExpand = (postId) => {
    setExpandedPostId((prev) => (prev === postId ? null : postId));
  };

  return (
    <div style={{backgroundColor:'#ccd9e5', minHeight: '100vh', padding: '20px', boxSizing: 'border-box' }}>
        <div className="position-relative">
              <button className="btn btn-warning top-0 start-0 position-absolute m-2" onClick={handleNavigate}>
                <IoMdArrowBack />
              </button>
            </div>
      <h2 className='mb-4 mt-3' style={{fontFamily:'cursive'}}>My Posts</h2>
      {posts.length === 0 ? (
        <p style={{fontFamily:'monospace'}}>No Posts found.</p>
      ) : (
        posts.map((post) => (
          <div
            key={post._id}
            style={{
              border: '1px solid #ccc',
              padding: '10px',
              marginBottom: '10px',
              cursor: 'pointer',
              backgroundColor:'#4e6688',
              color:'white'
            }}
            onClick={() => toggleExpand(post._id)}
          >
            <h3 className='text-capitalize custom-font border-bottom'>Title: &nbsp; {post.title}</h3>
            <p>
              <i style={{fontFamily:'cursive'}} className='text-capitalize'>Author: &nbsp; {post.author?.username}</i>
            </p>

            {expandedPostId === post._id && (
              <>
                <p className='card-text text-capitalize custom-font'>Contents: &nbsp; {post.content}</p>
                <button
                className='btn btn-danger'
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent the toggle when clicking delete
                    handleDelete(post._id);
                  }}
                  style={{ color: 'white',fontFamily:'cursive' }}
                >
                  Delete
                </button>
              </>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default MyPosts;
