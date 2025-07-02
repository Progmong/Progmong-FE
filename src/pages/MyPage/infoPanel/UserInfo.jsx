// UserInfo.jsx
import styled from 'styled-components'
import BaseButton from '@/components/BaseButton'
import { useModal } from '@/context/ModalContext.jsx'
import { useMyPage } from '@/context/MyPageContext.jsx'
import AxiosInstance from '@/constants/axiosInstance.js'

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

const UserInfo = () => {
  const { openModal } = useModal()
  const { mypageData, refetchMypageData } = useMyPage()
  const user = mypageData?.user

  if (!user) return <div>유저 정보를 불러오는 중입니다...</div>

  const handleEditNickname = () => {
    openModal('text-edit', {
      title: '닉네임 수정',
      message: '새로운 닉네임을 입력해주세요.',
      value: user.nickname,
      onSubmit: async (newNickname) => {
        try {
          await AxiosInstance.patch('/user/nickname', { nickname: newNickname })
          openModal('alert', {
            title: '성공',
            message: '닉네임이 변경되었습니다.',
            confirmText: '확인',
          })
          await refetchMypageData()
        } catch (err) {
          console.error(err)
          openModal('alert', {
            title: '실패',
            message: '닉네임 변경에 실패했습니다.',
            confirmText: '닫기',
          })
        }
      },
    })
  }

  const handleChangePassword = () => {
    openModal('text-edit', {
      title: '비밀번호 변경',
      message: '새로운 비밀번호를 입력해주세요.',
      onSubmit: async (newPassword) => {
        try {
          await AxiosInstance.patch('/user/password', { password: newPassword })
          openModal('alert', {
            title: '성공',
            message: '비밀번호가 변경되었습니다.',
            confirmText: '확인',
          })
        } catch (err) {
          console.error(err)
          openModal('alert', {
            title: '실패',
            message: '비밀번호 변경에 실패했습니다.',
            confirmText: '닫기',
          })
        }
      },
    })
  }

  const handleDeleteUser = async () => {
    try {
      await AxiosInstance.delete('/user')
      openModal('alert', {
        title: '회원 탈퇴 완료',
        message: '회원 탈퇴가 완료되었습니다. 이용해 주셔서 감사합니다.',
        confirmText: '확인',
      })
      localStorage.clear()
      window.location.href = '/'
    } catch (err) {
      console.error(err)
      openModal('alert', {
        title: '실패',
        message: '회원 탈퇴에 실패했습니다.',
        confirmText: '닫기',
      })
    }
  }

  return (
    <>
      <LabelRow>
        <div style={{ letterSpacing: '5px' }}>닉네임</div>
        <div>{user.nickname}</div>
      </LabelRow>
      <LabelRow>
        <div style={{ letterSpacing: '5px' }}>이메일</div>
        <div>{user.email}</div>
      </LabelRow>
      <LabelRow>
        <div style={{ letterSpacing: '5px' }}>백준 ID</div>
        <div>{user.bojId}</div>
      </LabelRow>

      <ButtonGroup>
        <BaseButton onClick={handleEditNickname}>닉네임 수정</BaseButton>
        <BaseButton onClick={handleChangePassword}>비밀번호 변경</BaseButton>
        <BaseButton onClick={handleDeleteUser} $variant="secondary">
          회원 탈퇴
        </BaseButton>
      </ButtonGroup>
    </>
  )
}

export default UserInfo
