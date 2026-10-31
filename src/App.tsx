import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import { Layout } from './components/Layout'
import { Home } from './pages/Home'
import { ProjectsIndex } from './pages/ProjectsIndex'
import { ProjectCaseStudy } from './pages/ProjectCaseStudy'
import { OperationsAudit } from './pages/OperationsAudit'
import { VelaraPracticeAudit } from './pages/VelaraPracticeAudit'
import { NotFound } from './pages/NotFound'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="projects" element={<ProjectsIndex />} />
          <Route path="projects/:slug" element={<ProjectCaseStudy />} />
          <Route path="audit" element={<OperationsAudit />} />
          <Route path="audit/velara-skin-co" element={<VelaraPracticeAudit />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
      <Analytics />
    </BrowserRouter>
  )
}
