// UserInfo.jsx
import styled from 'styled-components'
import BaseButton from '@/components/BaseButton'

const LabelRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 4px 0;
`

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 12px;
`

const UserInfo = ({ user }) => {
  const handleEditNickname = () => {
    // 추후 닉네임 변경 모달 열기
    console.log('닉네임 변경')
  }

  const handleChangePassword = () => {
    // 추후 비밀번호 변경 모달 열기
    console.log('비밀번호 변경')
  }

  const handleWithdraw = () => {
    // 추후 탈퇴 확인 모달 열기
    console.log('회원 탈퇴')
  }

  return (
    <>
      <LabelRow>
        <div>닉네임</div>
        <div>{user.nickname}</div>
      </LabelRow>
      <LabelRow>
        <div>이메일</div>
        <div>{user.email}</div>
      </LabelRow>
      <LabelRow>
        <div>백준 ID</div>
        <div>{user.baekjoonId}</div>
      </LabelRow>
      <ButtonGroup>
        <BaseButton onClick={handleEditNickname}>닉네임 수정</BaseButton>
        <BaseButton onClick={handleChangePassword}>비밀번호 변경</BaseButton>
        <BaseButton onClick={handleWithdraw} variant="secondary">
          회원 탈퇴
        </BaseButton>
      </ButtonGroup>
    </>
  )
}

export default UserInfo
