import { useMemo } from 'react'
import { BASE_URL } from '../../../constants'
import { useHttp } from '../_base/use-http.hook'

export const useFollowApi = () => {
  const httpInstance = useHttp(`${BASE_URL}/follow`)


  const followInstitution = async userId => {
    return await httpInstance.post(`/${userId}`)
  }

  const unfollowInstitution = async userId => {
    return await httpInstance.del(`/${userId}`)
  }

  const isFollowing = async (followerId, followeeId) => {
      return await httpInstance.get(`/isFollowing/${followerId}/${followeeId}`);
    }

  return useMemo(
    () => ({
      followInstitution,
      unfollowInstitution,
      isFollowing
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )
}