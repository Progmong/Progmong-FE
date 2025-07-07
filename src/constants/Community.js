import axios from './AxiosInstance'

export const useCommnunityApi = () => {
  const all = async () => {
    return await axios.get('/community/post/all')
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

  const getDetail = async (postId) => {
    return await axios.get(`/community/post/detail/${postId}`)
  }

  return {
    all,
    write,
    isWriter,
    modify,
    deletePost,
    getDetail,
  }
}
export default useCommnunityApi
