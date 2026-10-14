// 백엔드 서버가 내려가 있으므로 데모(MSW) 모드를 기본으로 사용
// 실제 API를 쓰려면 VITE_IS_DEMO=false 로 명시
export const IS_DEMO = import.meta.env.VITE_IS_DEMO !== 'false'

// 데모 체험 계정 (MSW는 어떤 값이 와도 로그인 성공 처리)
export const DEMO_ACCOUNT = {
  email: 'mocker@example.com',
  password: 'demo1234',
}
