import { Navigate, Route, Routes } from 'react-router-dom'
import AboutMePage from './pages/AboutMePage'
import BlogPage from './pages/BlogPage'
import ContactPage from './pages/ContactPage'
import DonatePage from './pages/DonatePage'
import HomePage from './pages/HomePage'
import ProjectSkillsPage from './pages/ProjectSkillsPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/projects" element={<ProjectSkillsPage />} />
      <Route path="/about" element={<AboutMePage />} />
      <Route path="/blog" element={<BlogPage />} />
      <Route path="/donate" element={<DonatePage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
