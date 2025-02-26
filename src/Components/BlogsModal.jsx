import React from 'react'
import demoImg from '../assets/images/demo.jpg'
import './BlogsModal.css'

const BlogsModal = ({show, blog, onClose}) => {
    if (!show) return null;
  return (
    <div className='modal-overlay'>
        <div className="modal-content">
            <span className="close-button" onClick={onClose}>
                <i className="fa-solid fa-xmark"></i>
            </span>
            <img src={demoImg} alt="Modal Image"  className='blogs-modal-image'/>
            <h2 className='blogs-modal-title'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</h2>
            <p className="blog-post-content">Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum doloribus enim dolor eos non perspiciatis commodi saepe eaque excepturi sunt dolorum ullam dicta iste nihil quae quas maiores suscipit, aperiam sapiente, quo consectetur atque fugit. Ipsa incidunt laboriosam ut omnis excepturi dolores dolor adipisci temporibus sequi eveniet, possimus, esse perferendis, fugit eaque alias. Consequuntur provident ipsa est alias modi officiis impedit iusto suscipit perspiciatis necessitatibus quisquam consequatur sequi, labore quos aut in itaque quasi mollitia fugiat voluptas quibusdam, debitis repellat! Suscipit quos inventore amet saepe repudiandae, nihil eius molestias rem magni quaerat itaque blanditiis necessitatibus. Sit, facilis illum, laboriosam consequuntur velit dolores asperiores est minima ratione, nihil quam et. Et qui eum explicabo esse quod culpa, eaque, cum laudantium nemo, aliquid quae dignissimos! Ipsam iure aut minima? At vero mollitia temporibus, nemo esse sunt cumque corrupti ut, recusandae optio, pariatur veniam aut! Aliquam libero sequi quidem! Voluptatibus at exercitationem delectus voluptate esse vitae itaque neque sapiente officia magnam cumque, eius quia a nisi id cupiditate dicta alias? Recusandae atque rerum quidem odio quo, reprehenderit beatae dicta ex ratione expedita, totam veniam sit saepe qui dolores reiciendis nostrum cum laborum in exercitationem. Labore itaque aut id error ducimus optio excepturi magni!</p>
        </div>
    </div>
  )
}

export default BlogsModal