import React from 'react'
import styled from 'styled-components'

import BaseModal from '../components/BaseModal'
import BaseButton from '../components/BaseButton'
import { useModal } from '../context/ModalContext'
import { toast } from 'react-toastify'
import useInterestTagApi from '@/constants/InterestTag.js'

const BottomWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 10px;
`
const TagContainer = styled.div`
  width: 360px;
  height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-top: 1rem;
`
const Row = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  justify-content: center;
`

const TagButton = styled.button`
  width: 100px;
  height: 45px;
  background-color: ${({ selected }) => (selected ? '#1C445C' : '#ffffff')};
  color: ${({ selected }) => (selected ? '#ffffff' : '#000000')};
  font-family: 'Binggrae';
  font-weight: 700;
  border: none;
  border-radius: 21px;
  box-shadow: 0 3px 0 rgba(74, 74, 74, 0.4);
  cursor: pointer;
`

const TAGS = {
  1: '수학',
  2: '구현',
  3: '그리디',
  4: '문자열',
  5: '자료구조',
  6: '그래프',
  7: 'DP',
  8: '기하학',
}


const TagModal = ({ title = '알림' }) => {
  const { closeModal } = useModal()

  const { getUserTags, updateUserTags } = useInterestTagApi()

  const [selectedTags, setSelectedTags] = useState(new Set())

  useEffect(() => {
    getUserTags()
      .then((res) => {
        const tagIds = res.data.data.map((tag) => tag.id)
        setSelectedTags(new Set(tagIds))
      })
      .catch((err) => {
        toast.error('관심 태그를 불러오지 못했습니다.')
        console.error('❌ 관심 태그 조회 실패:', err)
      })
  }, [])

  const toggleTag = (id) => {
    setSelectedTags((prev) => {
      const newSet = new Set(prev)
      newSet.has(id) ? newSet.delete(id) : newSet.add(id)
      return newSet
    })
  }

  const handleUpdateTag = async () => {
    try {
      await updateUserTags(Array.from(selectedTags))
      toast.success('관심 태그가 성공적으로 변경되었습니다.')
      closeModal()
    } catch (err) {
      toast.error('관심 태그 변경 중 오류가 발생했습니다.')
      console.error(err)
    }
  }

  return (
    <BaseModal title={title} onClose={closeModal}>
      <TagContainer>
        <TagContainer>
          <Row>
            {[1, 2, 3].map((id) => (
              <TagButton key={id} selected={selectedTags.has(id)} onClick={() => toggleTag(id)}>
                {TAGS[id]}
              </TagButton>
            ))}
          </Row>
          <Row>
            {[4, 5, 6].map((id) => (
              <TagButton key={id} selected={selectedTags.has(id)} onClick={() => toggleTag(id)}>
                {TAGS[id]}
              </TagButton>
            ))}
          </Row>
          <Row>
            {[7, 8].map((id) => (
              <TagButton key={id} selected={selectedTags.has(id)} onClick={() => toggleTag(id)}>
                {TAGS[id]}
              </TagButton>
            ))}
          </Row>
        </TagContainer>
      </TagContainer>
      <BottomWrapper>
        <BaseButton onClick={handleUpdateTag} $variant="secondary">
          적용
        </BaseButton>
      </BottomWrapper>
    </BaseModal>
  )
}

export default TagModal
