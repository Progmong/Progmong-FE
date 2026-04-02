import { http, HttpResponse } from 'msw'
import { mockUser, mockPet, globalPetStatus, mockUserTags, mockExploreRecords } from '../store'

const baseURL = 'https://api-progmong.shop/api/v1'

export const mypageHandlers = [
  http.get(`${baseURL}/mypage`, () => {
    return HttpResponse.json({
      status: 200,
      message: '마이페이지 조회 성공',
      data: {
        user: mockUser,
        userPet: {
          ...mockPet,
          status: globalPetStatus,
        },
        interestTags: mockUserTags,
        recentExplores: { 
          recommendProblems: mockExploreRecords.slice(0, 5)
        }
      },
    })
  }),

  http.get(`${baseURL}/health-data`, () => {
    return HttpResponse.json({ status: 200, message: '인증 확인 성공' })
  })
]
