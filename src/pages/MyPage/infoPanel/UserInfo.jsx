// UserInfo.jsx
import styled from 'styled-components'
import BaseButton from '@/components/BaseButton'
import { useMyPage } from '@/context/MyPageContext.jsx'
import InfoRow from '@/pages/MyPage/infoPanel/InfoRow.jsx'
import AxiosInstance from '@/constants/axiosInstance.js'
import { useModal } from '@/context/ModalContext.jsx'

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 12px;
`
const InfoWrapper = styled.div`
  width: 90%;
  background-color: #f9fafb;
  border-radius: 12px;
  padding: 10px;
`

const UserInfo = () => {
  const { openModal } = useModal()
  const { myPageData, loading, refreshMyPageData } = useMyPage()
  if (loading || !myPageData) return <div>로딩 중...</div>

  const handleEditNickname = () => {
    // 추후 닉네임 변경 모달 열기
    console.log('닉네임 변경')
    // Alert 모달로 변경되었음을 알림
    openModal('text-edit', {
      title: '닉네임 변경',
      message: '새 닉네임을 입력하세요.',
      onConfirm: async (newNickname) => {
        // 서버에 닉네임 변경 요청
        console.log(`모달 컴펌 액션 새 닉네임: ${newNickname}`)
        // 상태 관리를 이용해 전체 페이지 전부 다시 렌더링
        if (!newNickname) {
          console.error('닉네임은 비워둘 수 없습니다.')
          // 모달에 에러 이벤트 추가하기
          return
        }
        if (newNickname.length > 12) {
          console.error('닉네임은 0자 이상 12자 이하로 입력해주세요.')
          // 모달에 에러 이벤트 추가하기
          return
        }
        try {
          const res = await AxiosInstance.patch('/users/nickname', newNickname, {
            headers: {
              'Content-Type': 'text/plain',
            },
          })
          console.log('닉네임 변경 완료:', res.data)
          refreshMyPageData()
        } catch (error) {
          console.error('닉네임 변경 실패:', error)
          // 에러 핸들링 로직 추가
        }
      },
    })
  }

  const handleChangePassword = () => {
    // 추후 비밀번호 변경 모달 열기
    console.log('비밀번호 변경')
  }

  const handleWithdraw = () => {
    // 추후 탈퇴 확인 모달 열기
    console.log('회원 탈퇴')
  }

  const user = myPageData.user || {
    // 에러 핸들링을 위한 기본값
    nickname: '유저정보-기본닉네임',
    email: '유저정보-기본이메일',
    bjId: '유저정보-기본백준ID',
  }

  return (
    <>
      <InfoWrapper>
        <InfoRow label="닉네임" value={user.nickname} />
        <InfoRow label="이메일" value={user.email} />
        <InfoRow label="백준 ID" value={user.bjId} />
      </InfoWrapper>
      <ButtonGroup>
        <BaseButton onClick={handleEditNickname}>닉네임 수정</BaseButton>
        <BaseButton onClick={handleChangePassword}>비밀번호 변경</BaseButton>
        <BaseButton onClick={handleWithdraw} $variant="secondary">
          회원 탈퇴
        </BaseButton>
      </ButtonGroup>
    </>
  )
}

export default UserInfo
