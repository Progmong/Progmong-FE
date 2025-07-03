import React from 'react'

import TextEditModal from '../modals/TextEditModal.jsx'
import AlertModal from '@/modals/AlertModal.jsx'

const ModalRenderer = ({ name, props }) => {
  if (!name) return null

  switch (name) {
    case 'tag-edit':
      return <TextEditModal {...props} />
    case 'alert':
      return <AlertModal {...props} />
    case 'nickname-edit':
      return <TextEditModal {...props} title="닉네임 수정" placeholder="새 닉네임을 입력하세요" />
    case 'pet-nickname-edit':
      return <TextEditModal {...props} title="팻 애칭 수정" placeholder="새 애칭을 입력하세요" />
    case 'password-edit':
      return (
        <TextEditModal
          {...props}
          title="비밀번호 변경"
          placeholder="새 비밀번호를 입력하세요"
          type="password"
        />
      )
    case 'withdraw-confirm':
      return (
        <AlertModal
          {...props}
          title="회원 탈퇴"
          message="정말로 회원 탈퇴를 하시겠습니까?"
          confirmText="탈퇴하기"
          buttonText="돌아가기"
        />
      )

    default:
      return null
  }
}

export default ModalRenderer
