import { useState } from 'react';
import { getImage } from '../../../core';
import './post-card.style.css'
import { getImagePost } from '../../../core/get-image';
import { Button } from '../button/button.component';
import { SCREENS } from '../../../constants';
import { useNavigate } from 'react-router-dom';

export const PostCard = ({ text, date, image, likes, comments, institution, handleLike, handleSubmitComment, handleChangeComment, commentValues, handleShare, id }) => {
  const [showComments, setShowComments] = useState(false)

  const navigate = useNavigate()

  const toggleComments = () => {
    setShowComments(!showComments)
  }

  const navigateToProfile = institutionId => navigate(`${SCREENS.PROFILE}/${institutionId}`)

  return (
    <div className="post-card">
      <div className="post-header">
        <img src={getImage(institution.image)} alt={institution.name} className="profile-picture" />
        <div className="post-info">
          <h3 className="username" onClick={() => navigateToProfile(institution.id)}>
            {institution.name}
          </h3>
          <p className="date">{date}</p>
        </div>
      </div>

      <div className="post-content">
        <p className="post-text">{text}</p>

        {image && (
          <img src={getImagePost(image)} alt="Post image" className="post-image" />
        )}
      </div>

      <div className="post__infos">
        <button className={`post__button`} onClick={handleLike}>
          <span role="img" aria-label="Like Icon">👍</span> Likes: {likes.length}
        </button>
        <button className="post__button" onClick={handleShare}>
          Compartilhar
        </button>
        
        <button className="post__button" onClick={toggleComments}>
          <span role="img" aria-label="Comment Icon">💬</span> Comentários
        </button>
      </div>
      {showComments && (
        <div className="comments-section">
          <form className='comments__form' onSubmit={handleSubmitComment}>
            <textarea
              name='text'
              onChange={handleChangeComment}
              value={commentValues.text}
              className='comments__form-text'
              placeholder={'Comente algo interessante...'}
            />
  
            <div className='comments__form-div'>
              <Button type={'submit'} text={'Comentar'} />
            </div>
          </form>
          {comments.map((comment) => (
            <div key={comment.id} className="comment">
              <div className="comment-header">
                <img src={getImage(comment.user.image)} alt={comment.user.name} className="profile-picture" />
                <div className="comment-info">
                  <h3 className="comment__username">{comment.user.name}</h3>
                </div>
              </div>
              <div className="comment-content">
                <p>{comment.text}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
