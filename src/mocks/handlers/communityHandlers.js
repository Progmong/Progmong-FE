import { http, HttpResponse } from 'msw'
import { mockPosts, mockComments, setMockPosts, mockUser, mockPet } from '../store'

const baseURL = 'https://api-progmong.shop/api/v1'

export const communityHandlers = [
  http.get(`${baseURL}/community/post/all`, () => {
    return HttpResponse.json({
      status: 200,
      data: mockPosts.map(p => ({ ...p, likes: 0, views: p.viewCount, comments: mockComments[p.postId]?.length || 0 }))
    })
  }),

  http.get(`${baseURL}/community/:category/post/all`, ({ params }) => {
    const { category } = params
    const filtered = mockPosts.filter(p => p.postCategory === category)
    return HttpResponse.json({
      status: 200,
      data: filtered.map(p => ({ ...p, likes: 0, views: p.viewCount, comments: mockComments[p.postId]?.length || 0 }))
    })
  }),

  http.post(`${baseURL}/community/post/write`, async ({ request }) => {
    try {
      const { title, content, postCategory } = await request.json()
      const newPostId = Date.now()
      mockPosts.unshift({
        postId: newPostId,
        title,
        content,
        nickname: mockUser.nickname,
        createdAt: new Date().toISOString(),
        viewCount: 0,
        postCategory,
        writer: true
      })
      mockComments[newPostId] = []
      return HttpResponse.json({ status: 200, message: '게시글 작성 성공', data: { postId: newPostId } })
    } catch {
      return HttpResponse.json({ status: 500 })
    }
  }),

  http.get(`${baseURL}/community/post/writer/:postId`, () => {
    return HttpResponse.json({ status: 200, data: { isWriter: true } })
  }),

  http.post(`${baseURL}/community/post/modify`, async ({ request }) => {
    try {
      const { postId, title, content } = await request.json()
      const post = mockPosts.find(p => p.postId === Number(postId))
      if (post) {
        post.title = title
        post.content = content
      }
      return HttpResponse.json({ status: 200, message: '게시글 수정 성공' })
    } catch {
      return HttpResponse.json({ status: 500 })
    }
  }),

  http.get(`${baseURL}/community/post/delete/:postId`, ({ params }) => {
    const { postId } = params
    setMockPosts(mockPosts.filter(p => p.postId !== Number(postId)))
    return HttpResponse.json({ status: 200, message: '게시글 삭제 성공' })
  }),

  http.get(`${baseURL}/community/post/detail/:postId`, ({ params }) => {
    const { postId } = params
    const post = mockPosts.find(p => p.postId === Number(postId))
    if (post) {
      post.viewCount += 1
      return HttpResponse.json({ status: 200, data: post })
    }
    return HttpResponse.json({ status: 404, message: '게시글을 찾을 수 없습니다.' })
  }),

  http.get(`${baseURL}/community/post/activity`, () => {
    const postCount = mockPosts.filter(p => p.writer).length
    let commentCount = 0
    for (const postId in mockComments) {
      commentCount += mockComments[postId].filter(c => c.writer).length
    }

    return HttpResponse.json({
      status: 200,
      data: {
        postCount,
        commentCount
      }
    })
  }),

  http.get(`${baseURL}/community/post/:postId/comments`, ({ params }) => {
    const { postId } = params
    return HttpResponse.json({
      status: 200,
      data: mockComments[postId] || []
    })
  }),

  http.post(`${baseURL}/community/post/:postId/comments`, async ({ request, params }) => {
    const { postId } = params
    const { content } = await request.json()
    if (!mockComments[postId]) mockComments[postId] = []
    
    mockComments[postId].push({
      id: Date.now(),
      content,
      authorName: mockUser.nickname,
      createdAt: new Date().toISOString(),
      writer: true,
      userPet: { 
        petId: mockPet.petId, 
        evolutionStage: mockPet.evolutionStage, 
        level: mockPet.level, 
        nickname: mockPet.nickname 
      }
    })
    
    return HttpResponse.json({ status: 200, message: '댓글 작성 성공' })
  }),

  http.put(`${baseURL}/community/post/:postId/comments/:commentId`, async ({ request, params }) => {
    const { postId, commentId } = params
    const { content } = await request.json()
    if (mockComments[postId]) {
      const c = mockComments[postId].find(c => c.id === Number(commentId))
      if (c) c.content = content
    }
    return HttpResponse.json({ status: 200, message: '댓글 수정 성공' })
  }),

  http.delete(`${baseURL}/community/post/:postId/comments/:commentId`, ({ params }) => {
    const { postId, commentId } = params
    if (mockComments[postId]) {
      mockComments[postId] = mockComments[postId].filter(c => c.id !== Number(commentId))
    }
    return HttpResponse.json({ status: 200, message: '댓글 삭제 성공' })
  })
]
