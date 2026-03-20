import { NavLink } from 'react-router-dom'
import './HomePage.css'
import profileBw from '../Images/Profile-bw.png'

export default function HomePage() {
  const navClass = ({ isActive }) => (isActive ? 'active' : '')

  return (
    <>
      <nav>
        <ul className="nav-links">
          <li><NavLink to="/" className={navClass}>HOME</NavLink></li>
          <li><NavLink to="/donate" className={navClass}>DONATE</NavLink></li>
        </ul>
      </nav>

      <section className="hero">
        <div className="ellipse-1"></div>
        <div className="ellipse-2"></div>

        <div className="hero-inner">
          <div className="profile-column">
            <figure className="profile-wrap">
              <img src={profileBw} alt="Kayeen Campana profile photo" className="profile-img" />
            </figure>

            <p className="footer-quote">
              Success is not about doing everything perfectly, but about consistently doing what&apos;s best.
            </p>
          </div>

          <div className="hero-content">
            <p className="subtitle">My name is <span className="name-highlight">Kayeen M. Campana</span>, a third-year Computer Science student</p>

            <h1 className="title-wd">WEB DEVELOPER</h1>
            <h2 className="title-wds">&amp; WEB DESIGNER</h2>

            <div className="socials">
              <a href="https://www.facebook.com/kayeen.campana" className="social-icon" title="Facebook" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" stroke="#555" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
              <a href="https://www.instagram.com/topor24k_/" className="social-icon" title="Instagram" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" stroke="#555" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="12" cy="12" r="4" stroke="#555" strokeWidth="1.8"/>
                  <circle cx="17.5" cy="6.5" r="1" fill="#555"/>
                </svg>
              </a>
              <a href="https://mail.google.com/mail/u/0/#inbox" className="social-icon" title="Gmail" target="_blank" rel="noopener noreferrer" aria-label="Gmail">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="2" y="4" width="20" height="16" rx="2" stroke="#555" strokeWidth="1.8"/>
                  <path d="M2 7l10 7 10-7" stroke="#555" strokeWidth="1.8" strokeLinecap="round"/>
                </svg>
              </a>
            </div>

            <NavLink to="/donate" className="cta-btn">
              <span>GIVE SUPPORT</span>
            </NavLink>

          </div>
        </div>
      </section>
    </>
  )
}
