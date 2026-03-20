import { useEffect, useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'
import './DonatePage.css'
import profileBw from '../Images/Profile-bw.png'
import y2Hotel from '../Images/y2 hotel.jpg'
import bgcImage from '../Images/BGC.avif'
import techImage from '../Images/Tech.jpg'
import ekImage from '../Images/ek.jpg'
import qrCode from '../Images/QR CODE.jpg'

export default function DonatePage() {
  const navClass = ({ isActive }) => (isActive ? 'active' : '')

  const [purpose, setPurpose] = useState('donated')
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [amount, setAmount] = useState('')
  const [message, setMessage] = useState('')
  const [acknowledge, setAcknowledge] = useState(true)
  const [showSuccess, setShowSuccess] = useState(false)
  const timerRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.12 })

    document.querySelectorAll('.fade-up').forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  useEffect(() => () => {
    if (timerRef.current) clearTimeout(timerRef.current)
  }, [])

  const sendMessage = () => {
    if (!fullName.trim()) {
      window.alert('Please enter your name.')
      return
    }

    if (!message.trim()) {
      window.alert('Please write a message.')
      return
    }

    setShowSuccess(true)
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => setShowSuccess(false), 5000)

    setFullName('')
    setEmail('')
    setAmount('')
    setMessage('')
    setAcknowledge(true)
  }

  const isDonated = purpose === 'donated'

  return (
    <>
      <nav>
        <ul className="nav-links">
          <li><NavLink to="/" className={navClass}>HOME</NavLink></li>
          <li><NavLink to="/projects" className={navClass}>PROJECTS</NavLink></li>
          <li><NavLink to="/about" className={navClass}>ABOUT ME</NavLink></li>
          <li><NavLink to="/blog" className={navClass}>BLOG</NavLink></li>
          <li><NavLink to="/donate" className={navClass}>DONATE</NavLink></li>
          <li><NavLink to="/contact" className={navClass}>CONTACT</NavLink></li>
        </ul>
      </nav>

      <section className="page-section" id="profile">
        <div className="blur-el left"></div>
        <div className="blur-el right"></div>

        <div className="profile-cluster fade-up">
          <div className="profile-circle">
            <img src={profileBw} alt="Kayeen Campana profile photo"/>
          </div>

          <p className="profile-name">KAYEEN M. CAMPANA</p>
          <p className="profile-degree">BS Computer Science - University of Mindanao</p>
        </div>

        <p className="profile-message fade-up" style={{ transitionDelay: '0.15s' }}>
          I&apos;m raising funds for an educational tour that will help me gain real-world knowledge and experience.
          <br />
          Any amount of support would mean a lot. Thank you!
        </p>
      </section>

      <section className="page-section" id="about">
        <div className="blur-el right"></div>

        <h2 className="section-title fade-up">ABOUT THE TOUR</h2>

        <div className="about-inner fade-up" style={{ transitionDelay: '0.1s' }}>
          <p className="about-text">
            The University of Mindanao Computer College Education Department, through its <strong>CSE13L (CS Professional Elective 3)</strong> course, is proud to announce an exciting and enriching <strong>4-day, 3-night Educational Tour to Manila</strong>.
            <br /><br />
            This immersive experience is designed to broaden the horizons of our computer science students by exposing them to real-world industry environments, cutting-edge technologies, and professional institutions beyond the classroom.
            <br /><br />
            The tour is available at an all-inclusive package of <strong>₱24,800 per student</strong>, covering round-trip transportation, hotel accommodation, daily meals, entrance fees to all tour destinations, and other essential tour-related expenses — ensuring a hassle-free and fully supported learning journey for every participant.
            <br /><br />
            This educational tour serves as a valuable opportunity for students to gain firsthand exposure to the tech industry landscape, network with professionals, and apply their academic knowledge in a broader, real-world context — making it a truly worthwhile investment in their future careers.
          </p>

          <div className="tour-cards">
            <div className="card card-1"><img src={y2Hotel} alt="Y2 Hotel in Manila"/></div>
            <div className="card card-2"><img src={bgcImage} alt="BGC city view"/></div>
            <div className="card card-3"><img src={techImage} alt="Technology company visit"/></div>
            <div className="card card-4"><img src={ekImage} alt="Enchanted Kingdom educational tour stop"/></div>
          </div>
        </div>
      </section>

      <section className="page-section" id="donate">
        <div className="blur-el left"></div>
        <div className="blur-el right"></div>

        <h2 className="section-title fade-up">DONATE HERE</h2>

        <div className="donate-body">
          <p className="donate-subtitle fade-up" style={{ transitionDelay: '0.1s' }}>Scan the QR code or send directly via GCash</p>

          <div className="gcash-card fade-up" style={{ transitionDelay: '0.2s' }}>
            <div className="gcash-logo-row">
              <span className="gcash-label">GCash</span>
            </div>

            <img src={qrCode} className="qr-image" alt="GCash QR Code"/>
            <p className="qr-hint">Open your GCash app → Scan QR</p>

            <div className="gcash-number">GCash No. &nbsp;<span>0991 – 152 – 0194</span></div>
            <div className="gcash-number">Account Name: &nbsp;<span>Kayeen Campaña</span></div>
          </div>

          <p className="donate-note fade-up" style={{ transitionDelay: '0.3s' }}>
            Every contribution, big or small, goes directly toward making this educational experience possible.
            Thank you for your generosity!
          </p>
        </div>
      </section>

      <section className="page-section" id="message">
        <div className="blur-el left"></div>
        <div className="blur-el right"></div>

        <h2 className="section-title fade-up">MESSAGE ME</h2>

        <div className="message-body">
          <p className="message-desc fade-up" style={{ transitionDelay: '0.1s' }}>
            Did you donate and want to be acknowledged? Have a question or other inquiries?
            Send me a message below and I&apos;ll get back to you as soon as I can.
          </p>

          <div className="message-form fade-up" style={{ transitionDelay: '0.2s' }}>
            <div className="form-group">
              <label>What is this message about?</label>
              <div className="purpose-row">
                <button type="button" className={`purpose-btn ${purpose === 'donated' ? 'selected' : ''}`} onClick={() => setPurpose('donated')}>
                  I donated &amp;<br/>want to be known
                </button>
                <button type="button" className={`purpose-btn ${purpose === 'inquiry' ? 'selected' : ''}`} onClick={() => setPurpose('inquiry')}>
                  I have an<br/>inquiry
                </button>
                <button type="button" className={`purpose-btn ${purpose === 'other' ? 'selected' : ''}`} onClick={() => setPurpose('other')}>
                  Other<br/>concern
                </button>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Full Name</label>
                <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="e.g. Juan Dela Cruz"/>
              </div>
              <div className="form-group">
                <label>Email (optional)</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@email.com"/>
              </div>
            </div>

            {isDonated && (
              <>
                <div className="form-group" id="amountRow">
                  <label>Amount Donated</label>
                  <input type="text" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="e.g. ₱100"/>
                </div>

                <div className="acknowledge-row" id="ackRow">
                  <input type="checkbox" id="acknowledgeCheck" checked={acknowledge} onChange={(e) => setAcknowledge(e.target.checked)}/>
                  <label htmlFor="acknowledgeCheck">
                    I&apos;d like my name to be publicly acknowledged as a donor (e.g. in a thank-you post or list).
                  </label>
                </div>
              </>
            )}

            <div className="form-group">
              <label>Message</label>
              <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Write your message here…"></textarea>
            </div>

            <div className="success-msg" style={{ display: showSuccess ? 'flex' : 'none' }}>
              Message sent! I&apos;ll get back to you soon. Thank you! 🙏
            </div>

            <button className="submit-btn" type="button" onClick={sendMessage}>SEND MESSAGE</button>
          </div>
        </div>
      </section>

      <footer className="page-footer">© 2025 Kayeen M. Campana · University of Mindanao · BS Computer Science</footer>
    </>
  )
}
