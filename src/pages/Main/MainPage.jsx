import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import useExploreApi from '../../constants/explore'

const MainPage = () => {
  const { startExplore } = useExploreApi()
  const navigate = useNavigate()

  const handleExploreStart = async () => {
    try {
      const res = await startExplore(6, 10)

      if (res.data.status === 200) {
        navigate('/explore')
      } else {
        alert('문제 추천에 실패했습니다.')
      }
    } catch (err) {
      console.error('탐험 시작 실패', err)
      alert('서버 오류로 탐험을 시작할 수 없습니다.')
    }
  }

  return <button onClick={handleExploreStart}>탐험 시작</button>
}

export default MainPage
