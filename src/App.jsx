import { RouterProvider } from 'react-router-dom'
import router from './router/routes'
// 기본 적인 라우터 설정은 여기서 한다
function App() {
  return <RouterProvider router={router} />
}

export default App
