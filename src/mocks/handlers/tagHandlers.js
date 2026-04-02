import { http, HttpResponse } from 'msw'
import { mockUserTags, setMockUserTags } from '../store'

const baseURL = 'https://api-progmong.shop/api/v1'

export const tagHandlers = [
  http.get(`${baseURL}/tag`, () => {
    return HttpResponse.json({
      status: 200,
      data: mockUserTags.map(id => ({ id, name: `태그 ${id}`, category: 'algorithms' })),
    })
  }),

  http.put(`${baseURL}/tag`, async ({ request }) => {
    const body = await request.json()
    if (body.tagIds) {
      setMockUserTags(body.tagIds)
    }
    return HttpResponse.json({ status: 200, message: '태그 업데이트 성공' })
  })
]
