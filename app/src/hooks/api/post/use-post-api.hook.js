import { useMemo } from 'react'
import { BASE_URL } from '../../../constants'
import { useHttp } from '../_base/use-http.hook'

export const usePostApi = () => {
  const httpInstance = useHttp(`${BASE_URL}/post`)

  const makePost = async ({
    text,
    image,
  }) => {
    const response = await httpInstance.post(
      '',
      {text, image},
      {}
    )

    return response?.data
  }

  const getInstitutionPost = async ({ page, size }) => {
    return await httpInstance.get(`?page=${page}&size=${size}`)
  }

  const getAllPosts = async ({ page, size }) => {
    return await httpInstance.get(`/all?page=${page}&size=${size}`)
  }

  const getFollowedPosts = async ({ page, size }) => {
    return await httpInstance.get(`/followed?page=${page}&size=${size}`)
  }

  const getPostsForProfile = async ({ userId, page, size }) => {
    return await httpInstance.get(`/user/${userId}?page=${page}&size=${size}`)
  }

  const likePost = async postId => {
    return await httpInstance.post(`/like/${postId}`)
  }

  const commentPost = async ({ postId, text }) => {
    const response = await httpInstance.post(`/comment/${postId}`, { text });
  
    return response?.data;
  }

  const sharePost = async postId => {
    return await httpInstance.get(`/share/${postId}`)
  }

  const getPostsByCategory = async ({ category, page, size }) => {
    return await httpInstance.get(`/category/${category}?page=${page}&size=${size}`)
  }

  const getSharedPost = async postId => {
    return await httpInstance.get(`/shared/${postId}`)
  }

  

  return useMemo(
    () => ({
      getInstitutionPost,
      makePost,
      getAllPosts,
      likePost,
      commentPost,
      sharePost,
      getPostsByCategory,
      getPostsForProfile,
      getSharedPost,
      getFollowedPosts
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )
}