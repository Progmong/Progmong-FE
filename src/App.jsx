import { RouterProvider } from 'react-router-dom'

import router from './router/routes'
// 기본 적인 라우터 설정은 여기서 한다

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
function App() {
  return (
    <>
      {/* 라우터 등 최상단 내용 */}
      <RouterProvider router={router} />
      <ToastContainer position="top-center" autoClose={2000} />
    </>
  )
}

export default App
