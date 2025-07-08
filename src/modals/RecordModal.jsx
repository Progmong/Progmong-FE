import React from 'react'
import styled from 'styled-components'
import checkIcon from '@/assets/check-icon.png'
import passIcon from '@/assets/pass-icon.png'
import BaseModal from '../components/BaseModal'
import BaseButton from '../components/BaseButton'
import { useModal } from '../context/ModalContext'
import AxiosInstance from '@/constants/axiosInstance.js'

const MypageResultContainer = styled.div`
  background: rgba(255, 255, 255, 0.75);
  padding: 10px;
  border-radius: 20px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  min-width: 480px;
  min-height: 270px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  //gap: 4px;
  align-content: center;
`
const ExploreModalHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 50px;
  margin-top: 10px;
`

const ModalTitle = styled.div`
  margin: 0 60px 0 150px;
  display: flex;
  justify-content: center;

  font-size: 1.7rem;
  text-align: center;
  font-weight: bold;
  flex-grow: 0;
`

const ResultRow = styled.div`
  display: flex;
  align-items: center;
  background-color: #ffffff;
  padding: 5px 10px;
  border-radius: 16px;
  box-shadow:
    0 2px 0 #d1d8ff,
    0 3px 0 rgba(0, 0, 0, 0.25);
  margin-bottom: 6px;
  gap: 5px;
`

const IconWrapper = styled.div`
  flex: 0.4;
  display: flex;
  justify-content: center;
  align-items: center;
`

const IconCircle = styled.div`
  background-color: white;
  padding: 2px;
  border-radius: 50%;
  box-shadow: 0 0 0 2px black;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Icon = styled.img`
  width: 10px;
  height: 10px;
`

const GrayBox = styled.div`
  flex: ${({ $flex }) => $flex};
  background-color: #e3e3e3;
  padding: 5px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: bold;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const BottomWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 10px;
`
const ExploreCount = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 15px;
  font-size: 16px;
  font-weight: bold;
`

const RecordModal = ({ title = '탐험 기록' }) => {
  const { closeModal } = useModal()

  const [page, setPage] = useState(0)
  const [records, setRecords] = useState([])
  const [totalPages, setTotalPages] = useState(1)
  const [hasNext, setHasNext] = useState(false)
  const [hasPrev, setHasPrev] = useState(false)

  const fetchRecords = async () => {
    try {
      console.log('탐험 기록 조회 시작')
      const res = await AxiosInstance.get(`/explore/records?page=${page}&size=5`)
      console.log('탐험 기록 조회 성공:', res.data)
      console.log(res)
      const pageInfo = res.data?.data?.pageInfo
      const content = pageInfo?.content ?? []
      const size = pageInfo?.size ?? 5
      const totalElements = pageInfo?.totalElements ?? content.length
      const currentPage = pageInfo?.page ?? 0

      const calculatedTotalPages = Math.ceil(totalElements / size)
      const isLastPage = currentPage + 1 >= calculatedTotalPages

      setRecords(content)
      setTotalPages(calculatedTotalPages)
      setHasNext(!isLastPage) // ← 서버값 대신 직접 계산
      setHasPrev(currentPage > 0)
    } catch (e) {
      console.error('탐험 기록 조회 실패:', e)
      setRecords([])
    }
  }

  useEffect(() => {
    console.log('탐험 기록 모달 상태 변화 :', page)
    fetchRecords()
  }, [page])

  const handleClickBefore = () => {
    if (hasPrev) setPage((prev) => prev - 1)
    console.log('이전 페이지 클릭:', page - 1)
  }

  const handleClickAfter = () => {
    if (hasNext) setPage((prev) => prev + 1)
    console.log('다음 페이지 클릭:', page + 1)
  }
  const exploreText = `${page + 1} / ${totalPages}`
  return (
    <BaseModal onClose={closeModal}>
      <ExploreModalHeader>
        <ModalTitle>{title}</ModalTitle>
        <BaseButton onClick={closeModal} $size="sm" style={{ width: '80px', height: '40px' }}>
          닫기
        </BaseButton>
      </ExploreModalHeader>
      <MypageResultContainer>
        {records.length > 0 ? (
          records.map((p) => (
            <ResultRow key={p.id}>
              <IconWrapper>
                <IconCircle>
                  <Icon
                    src={p.status === '성공' ? checkIcon : passIcon}
                    alt={p.status === '성공' ? 'solved' : 'pass'}
                  />
                </IconCircle>
              </IconWrapper>
              <GrayBox $flex="1">{p.tier}</GrayBox>
              <GrayBox $flex="1">{p.id}</GrayBox>
              <GrayBox $flex="2">{p.title}</GrayBox>
              <GrayBox $flex="1">{p.status}</GrayBox>
              <GrayBox $flex="1">{p.mainTagKo}</GrayBox>
            </ResultRow>
          ))
        ) : (
          <div style={{ marginTop: '1rem' }}>기록이 없습니다.</div>
        )}
      </MypageResultContainer>
      <BottomWrapper>
        <BaseButton onClick={handleClickBefore} $variant="secondary" disabled={!hasPrev}>
          이전
        </BaseButton>
        <ExploreCount>{exploreText}</ExploreCount>
        <BaseButton onClick={handleClickAfter} $variant="secondary" disabled={!hasNext}>
          다음
        </BaseButton>
      </BottomWrapper>
    </BaseModal>
  )
}

export default RecordModal
