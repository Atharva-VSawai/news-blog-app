import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import userImg from '../assets/images/user.jpg';
import noImg from '../assets/images/no-img.png';
import './Blogs.css';

const Blogs = ({ onBack, onCreateBlog }) => {
  const [showForm, setShowForm] = useState(false);
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [titleValid, setTitleValid] = useState(true);
  const [contentValid, setContentValid] = useState(true);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    setTitleValid(true);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
    setContentValid(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let isValid = true;

    if (!title.trim()) {
      setTitleValid(false);
      isValid = false;
    }

    if (!content.trim()) {
      setContentValid(false);
      isValid = false;
    }

    if (!isValid) return;

    const newBlog = { image: image || noImg, title, content };
    onCreateBlog(newBlog);

    toast.success('Post submitted successfully!', {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: 'light',
      className: 'custom-toast',
    });

    setImage(null);
    setTitle('');
    setContent('');
    setShowForm(false);

    setTimeout(onBack, 2000);
  };

  return (
    <div className="blogs">
      <ToastContainer />
      <div className="blogs-left">
        <img src={userImg} alt="User" />
      </div>
      <div className="blogs-right">
        {!showForm && (
          <button className="post-btn" onClick={() => setShowForm(true)}>
            Create New Post
          </button>
        )}
        {showForm && (
          <div className="blogs-right-form">
            <h1>New Post</h1>
            <form onSubmit={handleSubmit}>
              <div className="img-upload">
                <label htmlFor="file-upload" className="file-upload">
                  <i className="bx bx-upload"></i> Upload Image
                </label>
                <input type="file" id="file-upload" onChange={handleImageChange} />
              </div>
              <input
                type="text"
                placeholder="Add Title (Max 60 Characters)"
                className={`title-input ${!titleValid ? 'invalid' : ''}`}
                value={title}
                onChange={handleTitleChange}
                maxLength={60}
              />
              <textarea
                className={`text-input ${!contentValid ? 'invalid' : ''}`}
                placeholder="Add Text"
                value={content}
                onChange={handleContentChange}
              />
              <button type="submit" className="submit-btn">
                Submit
              </button>
            </form>
          </div>
        )}
        <button className="blogs-close-btn" onClick={onBack}>
          Back <i className="bx bx-chevron-right"></i>
        </button>
      </div>
    </div>
  );
};

export default Blogs;
