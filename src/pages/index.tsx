import {
  BrowserRouter, Navigate, Route, Routes,
} from 'react-router-dom'
import HomePage from './Home'
import PlayPage from './Play'

const Pages = function () {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/play' element={<PlayPage />} />
        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Pages
