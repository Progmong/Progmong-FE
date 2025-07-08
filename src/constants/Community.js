import axios from '@/constants/axiosInstance'

export const useCommnunityApi = () => {
  const all = async () => {
    return await axios.get('/community/post/all')
  }

  const categoryAll = async (postCategory) => {
    return await axios.get(`/community/${postCategory}/post/all`)
  }

  const write = async (title, content, postCategory) => {
    return await axios.post('/community/post/write', { title, content, postCategory })
  }

  const isWriter = async (postId) => {
    return await axios.get(`/community/post/writer/${postId}`)
  }

  const modify = async (postId, title, content) => {
    return await axios.post('/community/post/modify', { postId, title, content })
  }

  const deletePost = async (podtId) => {
    return await axios.post(`/community/post/delete/${postId}`)
  }

  const postDetail = async (postId) => {
    return await axios.get(`/community/post/detail/${postId}`)
  }

  const communityActivity = async () => {
    return await axios.get(`/community/post/activity`)
  }

  return {
    all,
    categoryAll,
    write,
    isWriter,
    modify,
    deletePost,
    postDetail,
    communityActivity,
  }
}
export default useCommnunityApi
