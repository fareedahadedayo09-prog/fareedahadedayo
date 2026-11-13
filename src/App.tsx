import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { Home } from './pages/Home'
import { ProjectsIndex } from './pages/ProjectsIndex'
import { ProjectCaseStudy } from './pages/ProjectCaseStudy'
import { GlowLabCaseStudy } from './pages/GlowLabCaseStudy'
import { ToolsEcosystem } from './pages/ToolsEcosystem'
import { Simulators } from './pages/Simulators'
import { NotFound } from './pages/NotFound'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="projects" element={<ProjectsIndex />} />
          <Route path="projects/glowlab-lifecycle" element={<GlowLabCaseStudy />} />
          <Route path="projects/:slug" element={<ProjectCaseStudy />} />
          <Route path="tools" element={<ToolsEcosystem />} />
          <Route path="simulators" element={<Simulators />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
