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

  const modify = async (podtId, title, content) => {
    return await axios.post('/community/post/modify', { podtId, title, content })
  }

  const deletePost = async (podtId) => {
    return await axios.post(`/community/post/delete/${postId}`)
  }

  return {
    all,
    write,
    isWriter,
    modify,
    deletePost,
  }
}
export default useCommnunityApi
