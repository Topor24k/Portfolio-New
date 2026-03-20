import { NavLink } from 'react-router-dom'
import './AboutMePage.css'

export default function AboutMePage() {
  return (
    <>
      <nav>
        <ul className="nav-links">
          <li><NavLink to="/">HOME</NavLink></li>
          <li><NavLink to="/projects">PROJECTS</NavLink></li>
          <li><NavLink to="/about" className="active">ABOUT ME</NavLink></li>
          <li><NavLink to="/blog">BLOG</NavLink></li>
          <li><NavLink to="/donate">DONATE</NavLink></li>
          <li><NavLink to="/contact">CONTACT</NavLink></li>
        </ul>
      </nav>
      <section className="simple-page">
        <h1>ABOUT ME</h1>
        <p>This page is currently empty in your original source and is ready for your content.</p>
      </section>
    </>
  )
}
