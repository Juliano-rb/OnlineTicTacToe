import {
  BrowserRouter, Navigate, Route, Routes,
} from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'
import App from '../App'
import HomePage from './Home'
import PlayPage from './Play'

const Pages = function () {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/play' element={<PlayPage />} />
          <Route path='/old' element={<App />} />
          <Route path='*' element={<Navigate to='/' replace />} />
        </Routes>
      </QueryClientProvider>
    </BrowserRouter>
  )
}

export default Pages
