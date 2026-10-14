import { setupWorker } from 'msw/browser'
import { handlers } from './handlers'
import { persistStore } from './store'

export const worker = setupWorker(...handlers)

// 모의 응답으로 데이터가 바뀌었을 수 있으므로 응답마다 저장
worker.events.on('response:mocked', persistStore)
