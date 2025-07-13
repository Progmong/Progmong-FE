import axios from '@/constants/axiosInstance'

export const useCommentApi = () => {
  const commentAll = async (postId) => {
    return await axios.get(`/community/post/${postId}/comments`)
  }

  const commentWrite = async (postId, content) => {
    return await axios.post(`/community/post/${postId}/comments`, { content })
  }

  const commentModify = async (postId, commentId, content) => {
    return await axios.put(`/community/post/${postId}/comments/${commentId}`, { content })
  }

  const commentDelete = async (postId, commentId) => {
    return await axios.delete(`/community/post/${postId}/comments/${commentId}`)
  }

  return {
    commentAll,
    commentWrite,
    commentModify,
    commentDelete,
  }
}
export default useCommentApi
