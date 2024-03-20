import './post.style.css'
import { useCallback, useEffect, useState } from 'react'
import { usePostApi } from '../../../hooks'
import { useParams } from 'react-router-dom'
import { getImage } from '../../../core'
import { getImagePost } from '../../../core/get-image'


export const PostScreen = () => {
  const [post, setPost] = useState([])
  const { postId } = useParams()

  const { getSharedPost } = usePostApi()

  const getPost = useCallback(async () => {
    console.log('aqui');
    const response = await getSharedPost(postId)
    console.log(response);
    setPost(response)
  }, [getSharedPost, postId]) 

  useEffect(() => {
    getPost() 
  }, [getPost])


  console.log(post);
  return (
    <div className='posts_container'>
        {post && post.institution && (
          <div className="posts-header">
            <img src={getImage(post.institution.image)} alt={post?.institution.name} className="profile-pictures" />
            <div className="poss-info">
              <h3 className="usernames">
                {post.institution.name}
              </h3>
              <p className="date">{post?.date}</p>
            </div>
          </div>
        )}
    
        {post && (
          <div className="posts-content">
            <p className="posts-text">{post?.text}</p>
    
            {post.image && (
              <img src={getImagePost(post.image)} alt="Post image" className="posts-image" />
            )}
          </div>
        )}
      </div>
  )
}
