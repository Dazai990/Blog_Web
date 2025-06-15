import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IoMdArrowBack } from "react-icons/io";

const About = () => {

    const navigate = useNavigate();

   const handleNavigate = ()=>{
    navigate('/home')
   }
  return (

      <section style={{ padding: '3rem 1rem', backgroundColor: '#f4f9fd', fontFamily: 'Poppins, sans-serif' }}>
        <button className='btn btn-warning top-0 start-0 position-absolute m-2' onClick={handleNavigate}> <IoMdArrowBack />  </button>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <h2 className="text-center mb-4" style={{ fontWeight: 'bold', fontSize: '2.5rem', color: '#2c3e50' }}>
          About Us
        </h2>

        {/* Introduction */}
        <p style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
          <strong>MySite</strong> is your ultimate digital playground for anime lovers and gaming enthusiasts. 
          Whether you're binge-watching your favorite anime series or conquering a new level in your favorite game,
          this is where your voice meets the community.
        </p>

        {/* Our Mission */}
        <div style={{ marginTop: '2rem' }}>
          <h4 style={{ color: '#34495e' }}>🎯 Our Mission</h4>
          <p style={{ fontSize: '1.05rem' }}>
            We aim to provide a creative and safe platform where fans from around the world can write, 
            read, and interact through blog posts focused on anime reviews, gaming strategies, 
            character deep-dives, fan theories, and more.
          </p>
        </div>

        {/* Community Highlight */}
        <div style={{ marginTop: '2rem' }}>
          <h4 style={{ color: '#34495e' }}>🌏 Join the Community</h4>
          <p style={{ fontSize: '1.05rem' }}>
            Whether you're a writer, reader, or just here to explore, our community is open to everyone. 
            Share your unique perspective, comment on others’ blogs, and discover hidden gems in the fandom.
          </p>
        </div>

        {/* Call to Action */}
        <div style={{ marginTop: '2rem', background: '#e3f2fd', padding: '1rem 1.5rem', borderRadius: '8px' }}>
          <h5 style={{ color: '#0d47a1' }}>🚀 Ready to Start?</h5>
          <p>
            Head over to <strong>All Blogs</strong> to read what others are saying or click on <strong>Create Blog</strong> 
            to share your own story.
          </p>
        </div>
      </div>
    </section>
  
  );
};

export default About;
