import { setupWorker } from 'msw/browser'
import { handlers } from './handlers'
import { persistStore } from './store'

export const worker = setupWorker(...handlers)

// 모의 응답으로 데이터가 바뀌었을 수 있으므로 응답마다 저장
worker.events.on('response:mocked', persistStore)

const START_OPTIONS = {
  onUnhandledRequest: 'bypass', // 처리되지 않은 요청은 경고 없이 통과
  quiet: import.meta.env.PROD, // 배포 환경에서는 요청마다 찍히는 MSW 로그 끄기
}

// worker.start()는 브라우저의 서비스 워커가
// 백그라운드에 등록되고, API 요청을 가로챌 준비가 완전히 끝났을 때
// Promise 형식으로 발송
export const startMocking = () => worker.start(START_OPTIONS)

// MSW는 beforeunload 때 워커에 CLIENT_CLOSED 를 보내 이 탭을 활성 목록에서 지운다.
// Safari 처럼 뒤로가기 때 페이지를 bfcache 에서 되살리면 start()가 다시 실행되지 않아
// 요청이 실제 서버로 새어 나가므로, 멈췄다 다시 켜서 이 탭을 다시 활성화한다.
let restarting = null
export const restartMocking = () => {
  if (!restarting) {
    restarting = (async () => {
      worker.stop()
      await worker.start(START_OPTIONS)
    })().finally(() => {
      restarting = null
    })
  }
  return restarting
}
