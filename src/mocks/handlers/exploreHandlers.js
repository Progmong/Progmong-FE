import { http, HttpResponse } from 'msw'
import { 
  exploreProblemCount, 
  setExploreProblemCount, 
  problemHistory, 
  globalPetStatus, 
  setGlobalPetStatus, 
  mockExploreRecords 
} from '../store'

const baseURL = 'https://api-progmong.shop/api/v1'

export const exploreHandlers = [
  http.post(`${baseURL}/explore`, () => {
    setExploreProblemCount(0);
    problemHistory.length = 0;
    setGlobalPetStatus('전투');
    return HttpResponse.json({ status: 200, success: true, message: "탐험 시작 성공" })
  }),

  http.get(`${baseURL}/explore`, () => {
    const problems = Array.from({ length: 5 }).map((_, i) => {
      let status = "대기";
      if (i < exploreProblemCount) status = problemHistory[i]?.status || "성공";
      else if (i === exploreProblemCount) status = "전투";

      return {
        id: 1000 + i,
        sequence: i + 1,
        title: `가상 문제 ${i + 1}`,
        monsterImageIndex: (i % 5) + 1,
        tier: "Bronze 5",
        mainTagKo: "알고리즘",
        solvedUserCount: 12345,
        level: 1,
        status,
      }
    });

    return HttpResponse.json({ 
      status: 200, 
      success: true,
      message: "현재 진행중인 탐험", 
      data: { 
        exploring: true,
        recommendProblems: problems
      } 
    })
  }),

  http.post(`${baseURL}/explore/success`, () => {
    problemHistory.push({ status: "성공" });
    setExploreProblemCount(exploreProblemCount + 1);
    
    mockExploreRecords.unshift({
      id: Date.now(),
      tier: 'Bronze 5',
      title: `가상 문제 ${exploreProblemCount}`,
      status: '성공',
      mainTagKo: '알고리즘',
      date: new Date().toISOString()
    })

    const isFinished = exploreProblemCount >= 5;
    if (isFinished) setGlobalPetStatus('휴식');

    const problems = Array.from({ length: 5 }).map((_, i) => {
      let status = "대기";
      if (i < exploreProblemCount) status = problemHistory[i]?.status || "성공";
      else if (i === exploreProblemCount) status = "전투";

      return {
        id: 1000 + i,
        sequence: i + 1,
        title: `가상 문제 ${i + 1}`,
        monsterImageIndex: (i % 5) + 1,
        tier: "Bronze 5",
        mainTagKo: "알고리즘",
        solvedUserCount: 12345,
        level: 1,
        status,
      }
    });

    return HttpResponse.json({ 
      status: 200, 
      success: true,
      message: "문제 풀이 성공 처리",
      data: {
        finish: isFinished,
        totalExp: isFinished ? problemHistory.filter(p => p.status === '성공').length * 10 : 0,
        recommendProblems: problems
      }
    })
  }),

  http.post(`${baseURL}/explore/pass`, () => {
    problemHistory.push({ status: "패스" });
    setExploreProblemCount(exploreProblemCount + 1);

    mockExploreRecords.unshift({
      id: Date.now(),
      tier: 'Bronze 5',
      title: `가상 문제 ${exploreProblemCount}`,
      status: '패스',
      mainTagKo: '알고리즘',
      date: new Date().toISOString()
    })

    const isFinished = exploreProblemCount >= 5;
    if (isFinished) setGlobalPetStatus('휴식');

    const problems = Array.from({ length: 5 }).map((_, i) => {
      let status = "대기";
      if (i < exploreProblemCount) status = problemHistory[i]?.status || "성공";
      else if (i === exploreProblemCount) status = "전투";

      return {
        id: 1000 + i,
        sequence: i + 1,
        title: `가상 문제 ${i + 1}`,
        monsterImageIndex: (i % 5) + 1,
        tier: "Bronze 5",
        mainTagKo: "알고리즘",
        solvedUserCount: 12345,
        level: 1,
        status,
      }
    });

    return HttpResponse.json({ 
      status: 200, 
      success: true,
      message: "문제 넘기기 처리",
      data: {
        finish: isFinished,
        totalExp: isFinished ? problemHistory.filter(p => p.status === '성공').length * 10 : 0,
        recommendProblems: problems
      }
    })
  }),

  http.get(`${baseURL}/explore/check`, () => {
    return HttpResponse.json({ status: 200, success: true, message: "문제 확인", data: true })
  }),

  http.get(`${baseURL}/explore/records`, ({ request }) => {
    const url = new URL(request.url)
    const page = parseInt(url.searchParams.get('page') || '0', 10)
    const size = parseInt(url.searchParams.get('size') || '5', 10)
    const start = page * size
    const end = start + size

    return HttpResponse.json({
      status: 200,
      success: true,
      message: '탐험 기록 조회 성공',
      data: {
        pageInfo: {
          content: mockExploreRecords.slice(start, end),
          size: size,
          totalElements: mockExploreRecords.length,
          page: page
        }
      },
    })
  })
]
