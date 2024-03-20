import './home.style.css'

import { useEffect, useCallback, useState } from 'react'
import { useGlobalToaster, useGlobalUser } from '../../../contexts'
import { usePostApi, useUserApi } from '../../../hooks'
import { Button, PostCard } from '../../components'
import InfiniteScroll from 'react-infinite-scroll-component'
import { formatDateTimeMessage } from '../../../core/format-date-time-massage'
import { COMMENT, POST } from '../../../constants/data-structure/data-structure'
import uploadIcon from '../../../assets/images/upload.svg'
import { formatInputValues, uploadImage, validateInputValues } from '../../../core'
import { getImagePost } from '../../../core/get-image'

export const DONATION_TYPES = [
  { value: 'ALL', label: 'Todos' },
  { value: 'MONEY', label: 'Dinheiro' },
  { value: 'FOOD', label: 'Alimentos' },
  { value: 'CLOTHES', label: 'Roupas' },
  { value: 'PERSONAL_CARE', label: 'Produtos de higiene pessoal' },
  { value: 'SCHOOL_SUPPLIES', label: 'Material escolar' },
  { value: 'TOYS_GAMES', label: 'Brinquedos e jogos' },
  { value: 'MEDICAL_EQUIPMENT', label: 'Equipamentos médicos' },
  { value: 'VOLUNTEER_TIME', label: 'Tempo voluntário' },
  { value: 'BLOOD', label: 'Sangue' },
  { value: 'TECHNOLOGY', label: 'Tecnologia' },
  { value: 'MEDICATION', label: 'Medicamentos' },
  { value: 'FURNITURE', label: 'Móveis' },
  { value: 'OTHERS', label: 'Outros' },
  { value: 'FOLLOW', label: 'Seguindo'}
]

export const HomeScreen = () => {
  const [, setToaster] = useGlobalToaster()
  const [values, setValues] = useState(POST)
  const [commentValues, setCommentValues] = useState(COMMENT)
  const [posts, setPosts] = useState([])
  const [globalUser, setGlobalUser] = useGlobalUser()
  const [hasMore, setHasMore] = useState(true)
  const [currentPage, setCurrentPage] = useState(0)
  const [image, setImage] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState(DONATION_TYPES.find(item => item.label === 'Todos').value)


  const { details } = useUserApi()
  const { getInstitutionPost, makePost, getAllPosts, likePost, commentPost, sharePost, getPostsByCategory, getFollowedPosts } = usePostApi()

  const getGlobalUser = useCallback(async () => {
    const user = await details()
    
    setGlobalUser({ ...globalUser, user })
  }, [details])

  useEffect(() => {
    setPosts([])
    setCurrentPage(0)
    setHasMore(true)
    if (globalUser.user?.institution) {
      handleGetUserPosts()
    } else {
      handleGetPosts()
    }
  }, [selectedCategory])

  useEffect(() => {
    getGlobalUser()
  }, [getGlobalUser])

  const handleGetUserPostsAfterMakeAPost = async () => {
    const existingPostIds = posts.map(post => post.id);
    const response = await getInstitutionPost({ page: 0, size: 7 })

    if (!response.content.length) {
      setHasMore(false)
    } else {
      const filteredPosts = response.content.filter(post => !existingPostIds.includes(post.id))
      setPosts(prevPosts => [...filteredPosts, ...prevPosts]);
      setCurrentPage(1);
    }
  }

  const handleGetUserPosts = async () => {
    const response = await getInstitutionPost({ page: currentPage, size: 7 })

    if (!response.content.length) {
      setHasMore(false)
    } else {
      setPosts(prevPosts => [...prevPosts, ...response.content])
      setCurrentPage(currentPage + 1)
    }
  }

  const handleGetPosts = async () => {
    console.log(selectedCategory);
    if (selectedCategory === 'ALL') {
      const response = await getAllPosts({ page: currentPage, size: 7 })
      if (!response.content.length) {
        setHasMore(false)
      } else {
        setPosts(prevPosts => [...prevPosts, ...response.content])
        setCurrentPage(currentPage + 1)
      }
    } else if (selectedCategory === 'FOLLOW'){
            const response = await getFollowedPosts({ page: currentPage, size: 7 })
      if (!response.content.length) {
        setHasMore(false)
      } else {
        setPosts(prevPosts => [...prevPosts, ...response.content])
        setCurrentPage(currentPage + 1)
      }
    }else {
      const response = await getPostsByCategory({ category: selectedCategory, page: currentPage, size: 7 })
      if (!response.content.length) {
        setHasMore(false)
      } else {
        setPosts(prevPosts => [...prevPosts, ...response.content])
        setCurrentPage(currentPage + 1)
    }
  }
}

  const handleGetPostsAfterAction = async () => {
    try {
      let updatedPosts = [];
      if (selectedCategory === 'ALL') {

        const response = await getAllPosts({ page: 0, size: 1000 })
        updatedPosts = response.content
    
        if (!updatedPosts.length) {
          setHasMore(false)
        } else {
          setPosts(mergePosts(posts, updatedPosts))
        }
      } else if (selectedCategory === 'FOLLOW'){
        const response = await getFollowedPosts({ page: 0, size: 1000 })
        updatedPosts = response.content
    
        if (!updatedPosts.length) {
          setHasMore(false)
        } else {
          setPosts(mergePosts(posts, updatedPosts))
        }
        
      }else{
        const response = await getPostsByCategory({ category: selectedCategory, page: 0, size: 1000 })
        updatedPosts = response.content
    
        if (!updatedPosts.length) {
          setHasMore(false)
        } else {
          setPosts(mergePosts(posts, updatedPosts))
        }
        
      }

    } catch (error) {
      setToaster({ text: 'Erro ao obter posts.', type: 'error' })
    }
  }

  const mergePosts = (existingPosts, newPosts) => {
    const postMap = new Map(existingPosts.map(post => [post.id, post]))
  
    newPosts.forEach(newPost => {
      if (postMap.has(newPost.id)) {

        const existingPost = postMap.get(newPost.id)
        Object.assign(existingPost, newPost)
      }

    });
  
    const mergedPosts = Array.from(postMap.values())
  
    return mergedPosts
  };
  
  

  const handleLike = async (postId) => {
    await likePost(postId)
    if (globalUser.user?.institution) {
      await handleGetUserPosts()
    } else {
      await handleGetPostsAfterAction()
    }
  }

  const handleChangeComment = changeEvent => {
    const inputValues = formatInputValues(changeEvent, commentValues)
    setCommentValues(inputValues)
  }

  const handleSubmitComment = async (postId, submitEvent) => {
    submitEvent.preventDefault()
    console.log('TUUUUUUUUU');
  
    const errorList = validateInputValues(commentValues)
  
    if (errorList.length) {
      setToaster({ text: errorList, type: 'error' })
    } else {
      try {
        await commentPost({
          text: commentValues.text, postId
        })
        setCommentValues(COMMENT)
        await handleGetPostsAfterAction()
      } catch (error) {
        setToaster({ text: 'Ocorreu um erro ao comentar o post.', type: 'error' })
      }
    }
  }
 

  const handleSubmit = async submitEvent => {
    submitEvent.preventDefault()

    const errorList = validateInputValues(values)

    if (errorList.length) {
      setToaster({ text: errorList, type: 'error' })
    } else {
      try {
        await makePost({
          text: values.text,
          image,
        })
        setValues(POST)
        setImage(null)
        await handleGetUserPostsAfterMakeAPost()
      } catch (error) {
        setToaster({ text: 'Ocorreu um erro ao fazer o post.', type: 'error' })
      }
    }
  }

  const handleChange = changeEvent => {
    if (changeEvent.target.name === 'image') {
      uploadImage(changeEvent, setImage)
    } else {
      const inputValues = formatInputValues(changeEvent, values)
      setValues(inputValues)
    }
  }

  const handleShare = async (postId) => {
    const shareCode = await sharePost(postId)
    navigator.clipboard.writeText(shareCode)
    setToaster({ text: 'Copiado para área de transferência.', type: 'succes' })
  }

  const handleSelectCategory = (categoryValue) => {
    setSelectedCategory(categoryValue)
    setCurrentPage(0)
  }

  return (
    <>
      <div className="home__container">
        {!globalUser.user?.institution && (
          <>
          <div className='home__content-user'>

            <div className='home_content-options'>
              <ul className='home__posts'>
                {DONATION_TYPES.map((option) => (
                <li className='home__posts-list-item' key={option.value} onClick={() => handleSelectCategory(option.value)}>
                    <button className='home__posts_btn'>
                      <p className={`home__posts_option ${selectedCategory === option.value ? "home__posts_option-selected" : ""}`}>{option.label}</p>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div>
              {posts.length ? (
                <InfiniteScroll dataLength={posts.length} next={handleGetPosts} hasMore={hasMore}>
                  <div className='home__content-posts'>
                    {posts.map(post => (
                      <PostCard
                        key={post.id}
                        text={post.text}
                        date={formatDateTimeMessage(post.dateCreated)}
                        image={post.image}
                        likes={post.likes}
                        comments={post.comments}
                        institution={post.institution}
                        handleLike={() => handleLike(post.id)}
                        handleSubmitComment={(e) => handleSubmitComment(post.id, e)} 
                        handleChangeComment={handleChangeComment}
                        commentValues={commentValues}
                        handleShare={() => handleShare(post.id)}
                      />
                    ))}
                  </div>
                </InfiniteScroll>
              ) : (
                <div className='home__content-no-posts'>
                  <p>Nenhuma postagem foi feita ainda para essa categoria.</p>
                </div>
              )}
            </div>
          </>
        )}

        {globalUser.user?.institution && (
          <>
            <div className='home__content'>
              <form className='post__form' onSubmit={handleSubmit}>
                <textarea
                  name='text'
                  onChange={handleChange}
                  value={values.text}
                  className='post__form-text'
                  placeholder={'Compartilhe o que você quiser sobre sua instituição...'}
                />
      
                <div className='post__form-image-loaded-container'>
                  {image && (
                    <img className='post__form-image-loaded' src={getImagePost(image)} alt='Sua imagem' />
                  )}
                </div>
      
                <div className='post__form-div'>
                  <label className='post__form-image'>
                    <img className='post__form-image-icon' src={uploadIcon} alt='Carregar imagem' />
                    <input type='file' name='image' className='input__file' onChange={handleChange} />
                  </label>
      
                  <Button type={'submit'} text={'Postar'} />
                </div>
              </form>

              <div className='home__content-your-posts'>
                <h1>Suas postagens</h1>
              </div>  
              
      
              {posts.length ? (
                <InfiniteScroll dataLength={posts.length} next={handleGetUserPosts} hasMore={hasMore}>
                  <div className='home__content-posts'>
                    {posts.map(post => (
                      <PostCard
                        key={post.id}
                        text={post.text}
                        date={formatDateTimeMessage(post.dateCreated)}
                        image={post.image}
                        likes={post.likes}
                        comments={post.comments}
                        institution={post.institution}
                        handleLike={() => handleLike(post.id)}
                        handleSubmitComment={(e) => handleSubmitComment(post.id, e)} 
                        handleChangeComment={handleChangeComment}
                        commentValues={commentValues}
                        handleShare={() => handleShare(post.id)}
                      />
                    ))}
                  </div>
                </InfiniteScroll>
              ) : (
                <div className='home__content-no-posts'>
                  <p>Você ainda não realizou nenhuma postagem.</p>
                </div>
              )}
            </div>
          </>
        )}

      </div>
    </>
  );
  
}
