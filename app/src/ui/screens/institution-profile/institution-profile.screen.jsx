import './institution-profile.style.css'
import { useCallback, useEffect, useState } from 'react'
import {  formatInputValues, getImage, validateInputValues } from '../../../core'
import { DONATION_TYPES } from '../../../constants'
import { useFollowApi, useInstitutionApi, usePostApi, useUserApi } from '../../../hooks'
import { useParams } from 'react-router-dom'
import { COMMENT } from '../../../constants/data-structure/data-structure'
import { useGlobalToaster, useGlobalUser } from '../../../contexts'
import InfiniteScroll from 'react-infinite-scroll-component'
import { Button, PostCard } from '../../components'
import { formatDateTimeMessage } from '../../../core/format-date-time-massage'


export const InstitutionScreen = () => {
  const [globalUser, setGlobalUser] = useGlobalUser()
  const [, setToaster] = useGlobalToaster()
  const [institution, setInstitution] = useState([])
  const [posts, setPosts] = useState([])
  const [hasMore, setHasMore] = useState(true)
  const [currentPage, setCurrentPage] = useState(0)
  const [commentValues, setCommentValues] = useState(COMMENT)
  const [followButton, setFollowButton] = useState(false)
  const { userId } = useParams()

  const { details } = useUserApi()
  const { followInstitution, unfollowInstitution, isFollowing } = useFollowApi()
  const { getInstitutionInfo } = useInstitutionApi()
  const { getPostsForProfile, commentPost, sharePost, likePost} = usePostApi()


  const getGlobalUser = useCallback(async () => {
    const user = await details()
    
    setGlobalUser({ ...globalUser, user })
  }, [details])

  useEffect(() => {
    getGlobalUser()
  }, [getGlobalUser])
  
  const getInstitution = useCallback(async () => {
    console.log(userId);
    const response = await getInstitutionInfo({ userId })
    setInstitution(response)
  }, [getInstitutionInfo, userId]) 

  const handleGetPosts = async () => {
    const response = await getPostsForProfile({ userId, page: currentPage, size: 7 })

    if (!response.content.length) {
      setHasMore(false)
    } else {
      setPosts(prevPosts => [...prevPosts, ...response.content])
      setCurrentPage(currentPage + 1)
    }
  }

  const checkFollowingStatus = async () => {
    const isFollowingInstitution = await isFollowing(globalUser.user.id, userId)
    setFollowButton(isFollowingInstitution)
  }

  useEffect(() => {  
    getInstitution()

    if (institution) {
      checkFollowingStatus()
    }
  }, [getInstitution, userId])

  useEffect(() => {
    setPosts([])
    setCurrentPage(0)
    setHasMore(true)
    handleGetPosts()
  }, [])
  

  const handleChangeComment = changeEvent => {
    const inputValues = formatInputValues(changeEvent, commentValues)
    setCommentValues(inputValues)
  }

  const handleSubmitComment = async (postId, submitEvent) => {
    submitEvent.preventDefault()
  
    const errorList = validateInputValues(commentValues)
  
    if (errorList.length) {
      setToaster({ text: errorList, type: 'error' })
    } else {
      try {
        await commentPost({
          text: commentValues.text, postId
        })
        setCommentValues(COMMENT)
        await handleGetPosts()
      } catch (error) {
        setToaster({ text: 'Ocorreu um erro ao comentar o post.', type: 'error' })
      }
    }
  }

  const handleLike = async (postId) => {
    await likePost(postId)
    await handleGetPosts()
  }
  

  const handleShare = async (postId) => {
    const shareCode = await sharePost(postId)
    navigator.clipboard.writeText(shareCode)
    setToaster({ text: 'Copiado para área de transferência.', type: 'success' })
  }


  const formattedDonationNeeds = institution.donationNeeds ? institution.donationNeeds.map((need) => {
    const donationType = DONATION_TYPES.find((type) => type.value === need)
    return donationType ? donationType.label : ''
  }) : []
  

  const handleFollow = async () => {
    try {
      if (await isFollowing(globalUser.user.id, institution.id)) {
        await unfollowInstitution(institution.id)
        setToaster({ text: 'Deixou de seguir.', type: 'success' })
      } else {
        await followInstitution(institution.id)
        setToaster({ text: 'Agora está seguindo.', type: 'success' })
      }
      await getInstitution()
      setFollowButton(!followButton);
    } catch (error) {
      setToaster({ text: 'Ocorreu um erro ao seguir/deixar de seguir.', type: 'error' })
    }
  }


  return (
      <div className='profile__container'>
        <>
          <div className='profile__header'>
            <img src={getImage(institution.image)} alt={institution.name} />
            <div className='profile__infos'>
              <h2>
                {institution.name}
              </h2>
              <span>{institution.email}</span>
            </div>
            <div>
            <button className='profile__btn' onClick={handleFollow}>
              {followButton ? 'Deixar de Seguir' : 'Seguir'}
            </button>
            </div>
          </div>
          <div className='profile__body'>

            <h2 className='profile__body_info'>Informações</h2>

            <span className='profile__body-item'>CIDADE: {institution.city} - {institution.uf}</span>

            <span className='profile__body-item'>CEP: {institution.cep}</span>

            <span className='profile__body-item'>ENDEREÇO: {institution.location}</span>

            <span className='profile__body-item'>INFORMAÇÕES DE CONTATO: {institution.contact}</span>

            <span className='profile__body-item'>DESCRIÇÃO: {institution.description}</span>
            
            <span className='profile__body-item'>HISTÓRIA: {institution.history}</span>
            
            <span className='profile__body-item'>DOAÇÕES ACEITAS: {formattedDonationNeeds.join(', ')}</span>

          </div>

          <h1 className='profile_post_title'>Postagens:</h1>

          <div className='profile__posts'>
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
                  <p>Essa instituição não realizou nenhuma postagem.</p>
                </div>
              )}
          </div>
        </>
      </div>
  )
}
