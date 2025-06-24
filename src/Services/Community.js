import axios from './AxiosInstance'

export const useCommnunityApi = () => {
  const all = async () => {
    return await axios.get('/community/post/all')
  }

  return all
}
export default useCommnunityApi
