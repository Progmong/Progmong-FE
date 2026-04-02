import { http, HttpResponse } from 'msw'

const baseURL = 'https://api-progmong.shop/api/v1'

export const solvedacHandlers = [
  http.get(`${baseURL}/solvedac/:bojId`, () => {
    return HttpResponse.json({ status: 200, data: { exist: true } })
  }),

  http.get(`${baseURL}/solvedac/generate/:bojId`, () => {
    return HttpResponse.json({ status: 200, data: { code: "PROGMONG123" }, message: "인증 코드 발급" })
  }),

  http.get(`${baseURL}/solvedac/verify/:bojId`, () => {
    return HttpResponse.json({ status: 200, message: "백준 아이디 인증 성공" })
  })
]
