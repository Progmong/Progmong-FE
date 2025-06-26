import styled from 'styled-components'
import BaseButton from '@/components/BaseButton.jsx'

const LabelRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 4px 0;
`

const UserInfo = ({ user }) => {
  return (
    <>
      <h3 style={{ textAlign: 'center' }}>{user.nickname}</h3>
      <LabelRow>
        <span>이메일</span>
        <span>{user.email}</span>
      </LabelRow>
      <LabelRow>
        <span>solved.ac</span>
        <span>{user.baekjoonId}</span>
      </LabelRow>
      <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
        <BaseButton>닉네임 수정</BaseButton>
        <BaseButton>비밀번호 수정</BaseButton>
      </div>
      <div style={{ textAlign: 'center', marginTop: '12px' }}>
        <BaseButton>회원 탈퇴</BaseButton>
      </div>
    </>
  )
}

export default UserInfo
