export let exploreProblemCount = 0;
export const problemHistory = [];
export let globalPetStatus = '휴식';

export let mockUser = {
  id: 1,
  nickname: 'Mocker',
  email: 'mocker@example.com',
  bojId: 'mocker_boj',
  tier: 'Gold',
  profileImageUrl: null
};

export let mockPet = {
  petId: 1,
  level: 12,
  currentExp: 150,
  maxExp: 300,
  nickname: '프로그몽',
  message: '안녕하세요🥚🐣 프로그몽 데모입니다!',
  proud: true,
  evolutionStage: 3
};

export const REALISTIC_PROBLEMS = [
  { id: 1000, title: 'A+B', tier: 'Bronze V', tag: '수학' },
  { id: 2839, title: '설탕 배달', tier: 'Silver IV', tag: '그리디' },
  { id: 1152, title: '단어 공부', tier: 'Bronze I', tag: '문자열' },
  { id: 1260, title: 'DFS와 BFS', tier: 'Silver II', tag: '그래프 이론' },
  { id: 10828, title: '스택', tier: 'Silver IV', tag: '자료구조' },
  { id: 1920, title: '수 찾기', tier: 'Silver IV', tag: '이분 탐색' },
  { id: 2579, title: '계단 오르기', tier: 'Silver III', tag: 'DP' },
  { id: 1463, title: '1로 만들기', tier: 'Silver III', tag: 'DP' },
  { id: 1012, title: '유기농 배추', tier: 'Silver II', tag: '그래프 이론' },
  { id: 1753, title: '최단경로', tier: 'Gold IV', tag: '다익스트라' }
];

export let mockExploreRecords = Array.from({ length: 30 }, (_, i) => {
  const p = REALISTIC_PROBLEMS[i % REALISTIC_PROBLEMS.length];
  return {
    id: p.id + i * 10,
    tier: p.tier,
    title: p.title + (i > 9 ? ` (응용)` : ''),
    status: Math.random() > 0.3 ? '성공' : '패스',
    mainTagKo: p.tag,
    date: new Date(Date.now() - (i * 1000 * 60 * 60 * 24)).toISOString().split('T')[0]
  };
});

export let mockUserTags = [1, 2];

export let mockPosts = [
  { postId: 105, title: '다익스트라 알고리즘 시간 복잡도 질문입니다', content: '<p>우선순위 큐를 사용할 때와 안 할 때 시간 복잡도의 차이가 체감이 되나요?</p><p>실제 백준 문제 풀어볼 때 차이가 큰지 궁금합니다.</p>', nickname: '알고마스터', createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(), viewCount: 45, postCategory: '알고리즘', writer: false },
  { postId: 104, title: 'DP 문제를 풀 때 점화식을 어떻게 세워야 할지 모르겠어요.', content: '<p>처음부터 끝까지 규칙을 찾는 게 너무 힘듭니다ㅠㅠ 좋은 연습 방법이 있을까요?</p>', nickname: '코린이', createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), viewCount: 112, postCategory: '알고리즘', writer: false },
  { postId: 103, title: '어제 본 코테 후기 남깁니다 ㅠㅠ', content: '<p>문자열 파싱 문제에서 시간초과가 났네요.. 다들 어떻게 푸셨나요?</p>', nickname: 'Mocker', createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), viewCount: 89, postCategory: '자유글', writer: true },
  { postId: 102, title: '개발자 커뮤니티 새로 생겨서 너무 좋네요!', content: '<p>프로그몽 키우는 재미도 있고 문제도 풀고 일석이조네요 ㅎㅎㅎ</p>', nickname: '뉴비', createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), viewCount: 230, postCategory: '자유글', writer: false },
  { postId: 101, title: '안녕하세요 게시판 첫 글입니다', content: '<p>모두들 반갑습니다. 알고리즘 화이팅!</p>', nickname: '운영자', createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(), viewCount: 500, postCategory: '자유글', writer: false }
];

export const mockComments = {
  105: [
    { id: 1, content: '배열을 쓰면 O(V^2)이고 우선순위 큐는 O(E log V)입니다. 간선 수가 상대적으로 작을 땐 우선순위 큐가 압도적으로 빠르죠!', authorName: 'Mocker', createdAt: new Date(Date.now() - 1000 * 60 * 20).toISOString(), writer: true, userPet: { petId: 1, evolutionStage: 1, level: 3, nickname: '내 펫' } },
    { id: 2, content: '간선이 엄청 빽빽한 밀집 그래프면 배열이 빠를 수도 있어요~', authorName: '고인물', createdAt: new Date(Date.now() - 1000 * 60 * 10).toISOString(), writer: false, userPet: { petId: 3, evolutionStage: 2, level: 10, nickname: '드래곤용' } },
    { id: 7, content: '맞아요, V가 작고 간선이 매우 많을 때는 오히려 O(V^2)가 유리합니다.', authorName: '알고왕자', createdAt: new Date(Date.now() - 1000 * 60 * 8).toISOString(), writer: false, userPet: { petId: 2, evolutionStage: 3, level: 20, nickname: '프프론트마스터' } },
    { id: 8, content: '백준 1753 문제는 보통 V=20,000, E=300,000이라 무조건 다익스트라+PQ 쓰시는 게 안전합니다.', authorName: '코테의신', createdAt: new Date(Date.now() - 1000 * 60 * 5).toISOString(), writer: false, userPet: { petId: 4, evolutionStage: 1, level: 7, nickname: '코린코린' } }
  ],
  104: [
    { id: 3, content: '작은 조각으로 나누어 직접 손으로 적어보는 걸 추천합니다!', authorName: '알고마스터', createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(), writer: false, userPet: { petId: 2, evolutionStage: 3, level: 25, nickname: '신궁' } },
    { id: 9, content: '표를 그려보세요! 1일차, 2일차 결과를 적어가다 보면 규칙이 보입니다.', authorName: '행복한개발자', createdAt: new Date(Date.now() - 1000 * 60 * 25).toISOString(), writer: false, userPet: { petId: 1, evolutionStage: 2, level: 12, nickname: '행복이' } },
    { id: 10, content: '저도 처음엔 엄청 고생했는데 쉬운문제 N=1, N=2, N=3... 차례로 대입해보니 감이 오더라구요.', authorName: 'Mocker', createdAt: new Date(Date.now() - 1000 * 60 * 15).toISOString(), writer: true, userPet: { petId: 1, evolutionStage: 1, level: 3, nickname: '내 펫' } },
    { id: 11, content: '포기하지 마세요! DP는 계단식으로 실력이 늡니다ㅎㅎ', authorName: '지나가던행인', createdAt: new Date(Date.now() - 1000 * 60 * 10).toISOString(), writer: false, userPet: { petId: 3, evolutionStage: 1, level: 4, nickname: '어리버리' } }
  ],
  103: [
    { id: 4, content: '저도 정규식 잘못 써서 시간초과 났습니다 슬프네요...', authorName: '지나가던사람', createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(), writer: false, userPet: { petId: 1, evolutionStage: 1, level: 5, nickname: '초보자' } },
    { id: 12, content: 'O(N)만에 지나가면서 파싱해야 통과되는 문제였어요 ㅠㅠ 멘붕이네요', authorName: '프론트지망생', createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), writer: false, userPet: { petId: 2, evolutionStage: 2, level: 15, nickname: '리액트깎는노인' } },
    { id: 13, content: '스트링빌더 썼더니 통과되긴 하던데 자바스크립트는 좀 빡세네요', authorName: 'JAVA장인', createdAt: new Date(Date.now() - 1000 * 60 * 50).toISOString(), writer: false, userPet: { petId: 5, evolutionStage: 3, level: 21, nickname: '객체지향' } },
    { id: 14, content: '다음 번엔 꼭 붙으실 겁니다 화이팅!!', authorName: '초보개발자', createdAt: new Date(Date.now() - 1000 * 60 * 10).toISOString(), writer: false, userPet: { petId: 1, evolutionStage: 1, level: 2, nickname: '안녕' } }
  ],
  102: [
    { id: 5, content: '인정합니다ㅋㅋ 커뮤니티 흥해라!', authorName: 'Mocker', createdAt: new Date(Date.now() - 1000 * 60 * 60 * 20).toISOString(), writer: true, userPet: { petId: 1, evolutionStage: 1, level: 3, nickname: '내 펫' } },
    { id: 15, content: '저도 어제 가입했는데 UI가 너무 이쁘네요~', authorName: '디자이너', createdAt: new Date(Date.now() - 1000 * 60 * 60 * 18).toISOString(), writer: false, userPet: { petId: 4, evolutionStage: 2, level: 14, nickname: '꾸미기장인' } },
    { id: 16, content: '다같이 성장하는 공간이 되었으면 좋겠습니다 ㅎㅎ', authorName: '알고마스터', createdAt: new Date(Date.now() - 1000 * 60 * 60 * 15).toISOString(), writer: false, userPet: { petId: 2, evolutionStage: 3, level: 25, nickname: '신궁' } },
    { id: 17, content: '건강하게 즐코합시다!', authorName: '즐겜러', createdAt: new Date(Date.now() - 1000 * 60 * 60 * 10).toISOString(), writer: false, userPet: { petId: 1, evolutionStage: 2, level: 11, nickname: '해피해피' } }
  ],
  101: [
    { id: 6, content: '화이팅!!!!!', authorName: '뉴비', createdAt: new Date(Date.now() - 1000 * 60 * 60 * 47).toISOString(), writer: false, userPet: { petId: 1, evolutionStage: 1, level: 1, nickname: '응애용' } },
    { id: 18, content: '와 게시판 오픈 축하드립니다🎉', authorName: 'Mocker', createdAt: new Date(Date.now() - 1000 * 60 * 60 * 46).toISOString(), writer: true, userPet: { petId: 1, evolutionStage: 1, level: 3, nickname: '내 펫' } },
    { id: 19, content: '안녕하세요~ 반갑습니다!', authorName: '프로그몽팬', createdAt: new Date(Date.now() - 1000 * 60 * 60 * 45).toISOString(), writer: false, userPet: { petId: 2, evolutionStage: 1, level: 6, nickname: '팬1호' } },
    { id: 20, content: '매일매일 출석중입니다 ㅎㅎ', authorName: '출석왕', createdAt: new Date(Date.now() - 1000 * 60 * 60 * 30).toISOString(), writer: false, userPet: { petId: 3, evolutionStage: 2, level: 16, nickname: '부지런해' } },
    { id: 21, content: '모두 취뽀 하세요!', authorName: '백수탈출', createdAt: new Date(Date.now() - 1000 * 60 * 60 * 20).toISOString(), writer: false, userPet: { petId: 4, evolutionStage: 3, level: 30, nickname: '마스터그몽' } }
  ]
};

// 재할당(Re-assignment)을 위한 Helper Functions
// 모듈 스코프의 let 값을 덮어쓰기 위한 Setter
export const setExploreProblemCount = (val) => { exploreProblemCount = val; };
export const setGlobalPetStatus = (val) => { globalPetStatus = val; };
export const setMockUserTags = (val) => { mockUserTags = val; };
export const setMockPosts = (val) => { mockPosts = val; };
