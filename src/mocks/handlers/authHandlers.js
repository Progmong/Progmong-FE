import { http, HttpResponse } from 'msw'
import { mockUser } from '../store'

const baseURL = 'https://api-progmong.shop/api/v1'
const validJwtToken = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJtb2NrZXJAZXhhbXBsZS5jb20iLCJuaWNrbmFtZSI6Ik1vY2tlciJ9.signature'

export const authHandlers = [
  http.post(`${baseURL}/users/login`, async ({ request }) => {
    const { email } = await request.json()
    return HttpResponse.json({
      status: 200,
      message: '로그인 성공',
      data: {
        accessToken: validJwtToken,
        refreshToken: 'mocked-refresh-token',
        nickname: 'Mocker',
        email: email,
      },
    })
  }),

  http.post(`${baseURL}/users/register`, () => {
    return HttpResponse.json({ status: 201, message: '회원가입 성공' })
  }),

  http.post(`${baseURL}/users/verify-email`, () => {
    return HttpResponse.json({ status: 200, message: '이메일 인증코드 발송 성공' })
  }),

  http.post(`${baseURL}/users/verification-email-code`, () => {
    return HttpResponse.json({ status: 200, message: '이메일 인증 성공' })
  }),

  http.post(`${baseURL}/users/reset-password/request`, () => {
    return HttpResponse.json({ status: 200, message: '비밀번호 재설정 이메일 전송' })
  }),

  http.post(`${baseURL}/users/reset-password/confirm`, () => {
    return HttpResponse.json({ status: 200, message: '비밀번호 재설정 성공' })
  }),

  http.get(`${baseURL}/users/user-info`, () => {
    return HttpResponse.json({
      status: 200,
      data: mockUser,
    })
  }),

  http.post(`${baseURL}/users/logout`, () => {
    return HttpResponse.json({ status: 200, message: '로그아웃 성공' })
  }),

  http.patch(`${baseURL}/users/nickname`, async ({ request }) => {
    const newName = await request.text()
    if (newName) mockUser.nickname = newName
    return HttpResponse.json({ status: 200, message: '닉네임 변경 성공' })
  }),

  http.patch(`${baseURL}/users/password`, () => {
    return HttpResponse.json({ status: 200, message: '비밀번호 변경 성공' })
  }),

  http.delete(`${baseURL}/users`, () => {
    return HttpResponse.json({ status: 200, message: '회원탈퇴 성공' })
  }),

  // Token Reissue (로컬 환경 대응)
  http.post('http://localhost:8100/api/v1/users/reissue', () => {
    return HttpResponse.json({
      status: 200,
      message: '토큰 재발급 성공',
      data: { accessToken: validJwtToken },
    })
  })
]
