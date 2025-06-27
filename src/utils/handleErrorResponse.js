import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const useHandleErrorResponse = () => {
  const navigate = useNavigate()

  return (message) => {
    switch (message) {
      case '이미 추천 문제가 있습니다':
        toast.warning('이미 진행 중인 탐험이 있어요!')
        navigate('/explore') // 탐험 페이지로 이동
        break

      case '추천할 문제가 없습니다.':
        toast.error('조건에 맞는 문제가 없어요.')
        break

      default:
        toast.error(message || '알 수 없는 오류가 발생했어요.')
        break
    }
  }
}

export default useHandleErrorResponse
