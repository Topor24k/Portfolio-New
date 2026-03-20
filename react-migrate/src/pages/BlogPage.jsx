import { NavLink } from 'react-router-dom'
import './BlogPage.css'

export default function BlogPage() {
  return (
    <>
      <nav>
        <ul className="nav-links">
          <li><NavLink to="/">HOME</NavLink></li>
          <li><NavLink to="/projects">PROJECTS</NavLink></li>
          <li><NavLink to="/about">ABOUT ME</NavLink></li>
          <li><NavLink to="/blog" className="active">BLOG</NavLink></li>
          <li><NavLink to="/donate">DONATE</NavLink></li>
          <li><NavLink to="/contact">CONTACT</NavLink></li>
        </ul>
      </nav>
      <section className="simple-page">
        <h1>BLOG</h1>
        <p>This page is currently empty in your original source and is ready for blog posts.</p>
      </section>
    </>
  )
}
