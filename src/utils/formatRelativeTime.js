/**
 * ISO 문자열(예: "2025-06-25T08:52:32.978232")을
 * 상대시간 문자열("5분 전", "3시간 전" 등)으로 변환
 */
function formatRelativeTime(isoString) {
  const rtf = new Intl.RelativeTimeFormat('ko', { numeric: 'auto' })
  const inputTime = new Date(isoString)
  const now = new Date()

  // 밀리초 차이
  const diffMs = inputTime - now
  // 절댓값(미래표현 시에도 사용)
  const diff = Math.abs(diffMs)

  // 단위별 밀리초 환산값
  const units = [
    { name: '년', ms: 1000 * 60 * 60 * 24 * 365 },
    { name: '개월', ms: 1000 * 60 * 60 * 24 * 30 },
    { name: '일', ms: 1000 * 60 * 60 * 24 },
    { name: '시간', ms: 1000 * 60 * 60 },
    { name: '분', ms: 1000 * 60 },
    { name: '초', ms: 1000 },
  ]

  // 가장 큰 단위 하나 선택
  for (const { name, ms } of units) {
    if (diff >= ms) {
      const value = Math.round(diffMs / ms)
      // Intl.RelativeTimeFormat에 맞게 단위를 영어 기준으로 매핑
      const unitKey = {
        년: 'year',
        개월: 'month',
        일: 'day',
        시간: 'hour',
        분: 'minute',
        초: 'second',
      }[name]

      return rtf.format(value, unitKey)
    }
  }
  // 1초 이내
  return '방금 전'
}
export default formatRelativeTime
