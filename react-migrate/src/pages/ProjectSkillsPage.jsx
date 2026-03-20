import { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { FaExternalLinkAlt, FaGithub } from 'react-icons/fa'
import {
  SiAxios,
  SiCss,
  SiExpress,
  SiFlask,
  SiGithub,
  SiHtml5,
  SiJavascript,
  SiLaravel,
  SiMongodb,
  SiMysql,
  SiNodedotjs,
  SiPhp,
  SiPostgresql,
  SiPython,
  SiReact,
  SiReactquery,
  SiReactrouter,
  SiTailwindcss,
  SiVite,
} from 'react-icons/si'
import { RiCodeBoxLine, RiDatabase2Line, RiTerminalBoxLine } from 'react-icons/ri'
import './ProjectSkillsPage.css'

const projects = [
  {
    title: 'ProCook - Recipe Manager (Laravel)',
    description:
      'A full-featured recipe management web app where users publish, edit, and manage recipes with categorized ingredients, allergen data, and a personal dashboard built with solid OOP and CRUD architecture.',
    link: 'https://github.com/Topor24k/ProCook--Laravel',
    featured: true,
    icon: SiLaravel,
    iconClass: 'icon-laravel',
    tags: ['Laravel 10', 'PHP 8.1+', 'MySQL', 'Blade', 'CSS3', 'JavaScript', 'CRUD', 'Auth'],
    stack: [
      { name: 'JavaScript', pct: '44.9%', color: '#f7df1e' },
      { name: 'PHP', pct: '35.0%', color: '#777bb4' },
      { name: 'CSS', pct: '18.4%', color: '#264de4' },
    ],
    commits: '63 commits',
  },
  {
    title: 'ProCook - Recipe Manager (Python)',
    description:
      'A full-stack rebuild using Flask + React with session auth, nested comments, image upload, bookmarks, ratings, and PostgreSQL with Flask-SQLAlchemy.',
    link: 'https://github.com/Topor24k/ProCook--Python',
    featured: false,
    icon: SiPython,
    iconClass: 'icon-python',
    tags: ['Python', 'Flask', 'PostgreSQL', 'React 18', 'Tailwind CSS', 'Vite', 'Axios'],
    stack: [
      { name: 'JavaScript', pct: '58.2%', color: '#f7df1e' },
      { name: 'CSS', pct: '23.3%', color: '#264de4' },
      { name: 'Python', pct: '18.4%', color: '#3776ab' },
    ],
    commits: '69 commits',
  },
  {
    title: 'LiynMar Online Tutorial Services',
    description:
      'A role-based tutorial management system with analytics dashboards, booking operations, teacher session tracking, and multi-field search for operational workflows.',
    link: 'https://github.com/Topor24k/LiynMar-Online-Tutorial-Services',
    featured: true,
    icon: SiReact,
    iconClass: 'icon-react',
    tags: ['React 18', 'React Router', 'React Query', 'Vite', 'CSS3', 'Node.js', 'Express', 'MongoDB', 'JWT', 'RBAC'],
    stack: [
      { name: 'JavaScript', pct: '67.9%', color: '#f7df1e' },
      { name: 'CSS', pct: '32.0%', color: '#264de4' },
    ],
    commits: '78 commits · Starred',
  },
  {
    title: 'Jeane-Pierre Hair & Beauty Salon',
    description:
      'A modern React website built with reusable components and responsive UI principles to deliver a polished client-facing digital presence.',
    link: 'https://github.com/Topor24k/Jeane-Pierre-Hair---Beauty-Salon',
    featured: false,
    icon: RiCodeBoxLine,
    iconClass: 'icon-ui',
    tags: ['React', 'CSS3', 'JavaScript', 'Responsive'],
    stack: [
      { name: 'JavaScript', pct: '65.3%', color: '#f7df1e' },
      { name: 'CSS', pct: '34.6%', color: '#264de4' },
    ],
    commits: '93 commits · Starred',
  },
  {
    title: 'U-BEST - Bakery Equipment E-commerce',
    description:
      'A production-ready e-commerce platform with auth, cart, wishlist, order tracking, ratings, admin operations, and installment payment workflow support.',
    link: 'https://github.com/Topor24k/U-Best',
    featured: false,
    icon: RiTerminalBoxLine,
    iconClass: 'icon-ecommerce',
    tags: ['HTML5', 'CSS3', 'JavaScript ES6+', 'Font Awesome', 'E-commerce', 'Admin Panel'],
    stack: [
      { name: 'JavaScript', pct: '50.0%', color: '#f7df1e' },
      { name: 'CSS', pct: '26.1%', color: '#264de4' },
      { name: 'HTML', pct: '23.9%', color: '#e34c26' },
    ],
    commits: '15 commits · Starred',
  },
]

const skillGroups = [
  {
    title: 'Frontend Development',
    skills: [
      { icon: SiHtml5, label: 'HTML5' },
      { icon: SiCss, label: 'CSS3' },
      { icon: SiJavascript, label: 'JavaScript ES6+' },
      { icon: SiReact, label: 'React 18' },
      { icon: SiReactrouter, label: 'React Router' },
      { icon: SiReactquery, label: 'React Query' },
      { icon: SiTailwindcss, label: 'Tailwind CSS' },
      { icon: SiVite, label: 'Vite' },
      { icon: SiAxios, label: 'Axios' },
    ],
  },
  {
    title: 'Backend Development',
    skills: [
      { icon: SiPhp, label: 'PHP 8.1+' },
      { icon: SiLaravel, label: 'Laravel 10' },
      { icon: SiPython, label: 'Python 3.10+' },
      { icon: SiFlask, label: 'Flask' },
      { icon: SiNodedotjs, label: 'Node.js' },
      { icon: SiExpress, label: 'Express.js' },
      { icon: RiCodeBoxLine, label: 'JWT Auth' },
      { icon: RiTerminalBoxLine, label: 'Laravel Policies' },
    ],
  },
  {
    title: 'Databases',
    skills: [
      { icon: SiMysql, label: 'MySQL / MariaDB' },
      { icon: SiPostgresql, label: 'PostgreSQL' },
      { icon: SiMongodb, label: 'MongoDB' },
      { icon: RiDatabase2Line, label: 'Mongoose ODM' },
      { icon: RiCodeBoxLine, label: 'Flask-SQLAlchemy' },
      { icon: RiTerminalBoxLine, label: 'Eloquent ORM' },
    ],
  },
  {
    title: 'Tools and Workflow',
    skills: [
      { icon: SiGithub, label: 'Git / GitHub' },
      { icon: RiTerminalBoxLine, label: 'Composer' },
      { icon: RiCodeBoxLine, label: 'npm / yarn' },
      { icon: RiCodeBoxLine, label: 'Blade Templates' },
      { icon: RiTerminalBoxLine, label: 'CRUD and OOP' },
      { icon: RiDatabase2Line, label: 'RBAC' },
      { icon: RiCodeBoxLine, label: 'Responsive Design' },
      { icon: RiTerminalBoxLine, label: 'REST APIs' },
    ],
  },
]

export default function ProjectSkillsPage() {
  const navClass = ({ isActive }) => (isActive ? 'active' : '')

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.1 })

    document.querySelectorAll('.fade-up').forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const barObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll('.skill-bar-fill').forEach((bar) => {
            bar.style.transform = `scaleX(${bar.dataset.w})`
            bar.classList.add('animated')
          })
          barObserver.unobserve(entry.target)
        }
      })
    }, { threshold: 0.3 })

    const skillBarsEl = document.getElementById('skillBars')
    if (skillBarsEl) barObserver.observe(skillBarsEl)

    return () => barObserver.disconnect()
  }, [])

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

      <section className="page-section" id="projects">
        <div className="blur-el left"></div>
        <div className="blur-el right"></div>

        <div className="section-inner">
          <div className="section-header fade-up">
            <p className="section-label">— what i&apos;ve built</p>
            <h2 className="section-title" style={{ transitionDelay: '.1s' }}>PROJECTS</h2>
            <p className="section-intro">Selected projects that reflect my work in full-stack web development, user experience, and production-ready systems.</p>
          </div>

          <div className="impact-strip fade-up" style={{ transitionDelay: '.12s' }}>
            <div className="impact-item"><strong>5+</strong><span>Production Projects</span></div>
            <div className="impact-item"><strong>300+</strong><span>Total Commits</span></div>
            <div className="impact-item"><strong>Full Stack</strong><span>Web Delivery</span></div>
          </div>

          <div className="projects-grid">
            {projects.map((project, index) => {
              const Icon = project.icon
              return (
                <article
                  key={project.title}
                  className={`project-card ${project.featured ? 'featured' : ''} fade-up`}
                  style={{ transitionDelay: `${0.15 + index * 0.05}s` }}
                >
                  <div className="card-header">
                    <div className={`card-icon ${project.iconClass}`}>
                      <Icon />
                    </div>
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="card-github-link">
                      <FaGithub aria-hidden="true" />
                      <span>Repository</span>
                      <FaExternalLinkAlt aria-hidden="true" className="ext-icon" />
                    </a>
                  </div>

                  <h3 className="card-title">{project.title}</h3>
                  <p className="card-desc">{project.description}</p>

                  <div className="card-tags">
                    {project.tags.map((tag) => (
                      <span key={`${project.title}-${tag}`} className="tag">{tag}</span>
                    ))}
                  </div>

                  <div className="card-footer">
                    <div className="lang-dots">
                      {project.stack.map((item) => (
                        <span key={`${project.title}-${item.name}`} className="lang-dot">
                          <span className="dot" style={{ background: item.color }}></span>
                          {item.name} {item.pct}
                        </span>
                      ))}
                    </div>
                    <span>{project.commits}</span>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <section className="page-section" id="skills">
        <div className="blur-el left"></div>
        <div className="blur-el right"></div>

        <div className="section-inner">
          <div className="section-header fade-up">
            <h2 className="section-title" style={{ transitionDelay: '.1s' }}>SKILLS</h2>
            <p className="section-intro">Core technologies and engineering strengths developed through practical implementation across multiple systems.</p>
          </div>

          <div className="skills-wrapper">
            {skillGroups.map((group, index) => (
              <section key={group.title} className="skill-category fade-up" style={{ transitionDelay: `${0.15 + index * 0.05}s` }}>
                <p className="skill-cat-title">{group.title}</p>
                <div className="skills-row">
                  {group.skills.map((skill) => {
                    const SkillIcon = skill.icon
                    return (
                      <div key={`${group.title}-${skill.label}`} className="skill-pill">
                        <SkillIcon className="skill-icon" aria-hidden="true" />
                        <span>{skill.label}</span>
                      </div>
                    )
                  })}
                </div>
              </section>
            ))}

            <div className="skill-category fade-up" style={{ transitionDelay: '.35s' }}>
              <p className="skill-cat-title">Proficiency Overview</p>
              <div className="skill-bar-group" id="skillBars">
                <div className="skill-bar-item"><span className="skill-bar-label">JavaScript / React</span><div className="skill-bar-track"><div className="skill-bar-fill" data-w="0.88"></div></div><span className="skill-bar-pct">88%</span></div>
                <div className="skill-bar-item"><span className="skill-bar-label">CSS3 / Tailwind</span><div className="skill-bar-track"><div className="skill-bar-fill" data-w="0.85"></div></div><span className="skill-bar-pct">85%</span></div>
                <div className="skill-bar-item"><span className="skill-bar-label">PHP / Laravel</span><div className="skill-bar-track"><div className="skill-bar-fill" data-w="0.80"></div></div><span className="skill-bar-pct">80%</span></div>
                <div className="skill-bar-item"><span className="skill-bar-label">Python / Flask</span><div className="skill-bar-track"><div className="skill-bar-fill" data-w="0.75"></div></div><span className="skill-bar-pct">75%</span></div>
                <div className="skill-bar-item"><span className="skill-bar-label">MySQL / PostgreSQL</span><div className="skill-bar-track"><div className="skill-bar-fill" data-w="0.78"></div></div><span className="skill-bar-pct">78%</span></div>
                <div className="skill-bar-item"><span className="skill-bar-label">MongoDB</span><div className="skill-bar-track"><div className="skill-bar-fill" data-w="0.70"></div></div><span className="skill-bar-pct">70%</span></div>
                <div className="skill-bar-item"><span className="skill-bar-label">Node.js / Express</span><div className="skill-bar-track"><div className="skill-bar-fill" data-w="0.72"></div></div><span className="skill-bar-pct">72%</span></div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <footer className="page-footer">© 2025 Kayeen M. Campana · University of Mindanao · BS Computer Science</footer>
    </>
  )
}
