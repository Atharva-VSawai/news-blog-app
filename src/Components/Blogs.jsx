import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import userImg from '../assets/images/user.jpg';
import noImg from '../assets/images/no-img.png';
import './Blogs.css';

const Blogs = ({ onBack, onCreateBlog, editPost, isEditing}) => {
  const [showForm, setShowForm] = useState(false);
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [titleValid, setTitleValid] = useState(true);
  const [contentValid, setContentValid] = useState(true);

  useEffect(() => {
    if (isEditing && editPost) {
      setImage(editPost.image);    
      setTitle(editPost.title);
      setContent(editPost.content);
      setShowForm(true);
    }
    else {
      setShowForm(false);
      setImage(null);
      setTitle('');
      setContent('');
    }
  }, [isEditing, editPost])

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      const maxSize = 1 * 1024 * 1024;

      if (file.size > maxSize) {
        toast.error('Image size should not exceed 1MB', {
          className: 'custom-toast',
        });
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target.result);
      };
      reader.readAsDataURL(file);
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
    onCreateBlog(newBlog, isEditing);

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
            <h1>{isEditing ? "Edit Post" : 'New Post'}</h1>
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
                {isEditing ? "Update Post" : "Submit Post" }
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
