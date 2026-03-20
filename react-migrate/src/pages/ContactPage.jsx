import { NavLink } from 'react-router-dom'
import './ContactPage.css'

export default function ContactPage() {
  return (
    <>
      <nav>
        <ul className="nav-links">
          <li><NavLink to="/">HOME</NavLink></li>
          <li><NavLink to="/projects">PROJECTS</NavLink></li>
          <li><NavLink to="/about">ABOUT ME</NavLink></li>
          <li><NavLink to="/blog">BLOG</NavLink></li>
          <li><NavLink to="/donate">DONATE</NavLink></li>
          <li><NavLink to="/contact" className="active">CONTACT</NavLink></li>
        </ul>
      </nav>
      <section className="simple-page">
        <h1>CONTACT</h1>
        <p>This page is currently empty in your original source and is ready for contact details.</p>
      </section>
    </>
  )
}
