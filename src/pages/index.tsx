import {
  BrowserRouter, Navigate, Route, Routes,
} from 'react-router-dom'
import App from '../App'
import HomePage from './Home'
import PlayPage from './Play'

const Pages = function () {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/play' element={<PlayPage />} />
        <Route path='/old' element={<App />} />
        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Pages
