import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { Home } from '../pages/Home'
import { History } from '../pages/History'

import { DefaultLayout } from '../components/templates/DefaultLayout'

export function Navigation() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route index element={<Home />} />
          <Route path="/history" element={<History />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
