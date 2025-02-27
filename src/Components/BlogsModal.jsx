import React from 'react';
import './BlogsModal.css';

const BlogsModal = ({ show, blog, onClose }) => {
    console.log("BlogsModal show:", show, "Blog Data:", blog); // ✅ Debugging

    if (!show || !blog) return null;  // ✅ Prevents rendering when blog is missing

    return (
        <div className='modal-overlay'>
            <div className="modal-content">
                <span className="close-button" onClick={onClose}>
                    <i className="fa-solid fa-xmark"></i>
                </span>
                <img src={blog.image} alt={blog.title} className='blogs-modal-image' />
                <h2 className='blogs-modal-title'>{blog.title}</h2>
                <p className="blog-post-content">{blog.content}</p>
            </div>
        </div>
    );
};

export default BlogsModal;
