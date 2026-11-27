import { useState } from 'react'
import { Activity, ArrowDown, ArrowDownRight, ArrowRight, ArrowUpRight, Boxes, BrainCircuit, ChevronDown, Cloud, Code2, Database, GitFork, GraduationCap, BriefcaseBusiness, Mail, Menu, Network, X } from 'lucide-react'
import { experience, person, projects, skills } from './content'

const navigation = [
  ['Work', 'projects'],
  ['Experience', 'experience'],
  ['Skills', 'skills'],
  ['About', 'about'],
]

const projectIcons = [Network, Activity, Cloud, Database, Boxes]
const skillIcons = [BrainCircuit, Activity, Code2, Database, Cloud, Network]

function Brand() {
  return <a href="#home" className="brand"><span aria-hidden="true">VA</span> Venkat Akula</a>
}

function Header() {
  const [open, setOpen] = useState(false)
  return (
    <header className="site-header" onKeyDown={(event) => {
      if (event.key === 'Escape' && open) {
        setOpen(false)
        document.getElementById('menu-toggle').focus()
      }
    }}>
      <div className="shell header-inner">
        <Brand />
        <button type="button" id="menu-toggle" className="menu-toggle" aria-expanded={open} aria-controls="site-nav" aria-label={open ? 'Close navigation' : 'Open navigation'} onClick={() => setOpen(!open)}>
          {open ? <X /> : <Menu />}
        </button>
        <nav id="site-nav" className={open ? 'site-nav open' : 'site-nav'} aria-label="Main navigation">
          {navigation.map(([label, id]) => <a key={id} href={'#' + id} onClick={() => setOpen(false)}>{label}</a>)}
          <a className="nav-contact" href="#contact" onClick={() => setOpen(false)}>Get in touch <ArrowUpRight size={15} /></a>
        </nav>
      </div>
    </header>
  )
}

function AiSymbol() {
  return (
    <div className="hero-art" aria-hidden="true">
      <div className="ai-orbit ai-orbit-outer" />
      <div className="ai-orbit ai-orbit-inner" />
      <div className="ai-chip">
        <span className="ai-chip-face">AI</span>
      </div>
    </div>
  )
}

function Hero() {
  return (
    <section id="home" className="shell hero" aria-labelledby="hero-title">
      <div className="hero-copy">
        <p className="eyebrow"><span className="status-dot" /> Senior AI Engineer</p>
        <h1 id="hero-title">Venkat <span>Akula<span className="hero-period">.</span></span></h1>
        <p className="hero-intro">I build AI systems that teams can evaluate, deploy, and operate.</p>
        <p className="hero-description">Agentic AI, search and retrieval, and machine learning backed by 11+ years in software, data, and cloud engineering.</p>
        <div className="hero-actions">
          <a className="button primary" href="#projects">Explore my work <ArrowDownRight size={18} /></a>
          <a className="button secondary" href="#contact">Get in touch <ArrowUpRight size={18} /></a>
        </div>
      </div>
      <AiSymbol />
      <div className="hero-bottom">
        <a href="#projects"><ArrowDown size={15} /> Selected work</a>
        <span>Retrieval <b>/</b> Evaluation <b>/</b> Deployment</span>
      </div>
    </section>
  )
}

function SectionHeading({ label, title, id, children }) {
  return (
    <div className="section-heading">
      <p className="eyebrow">{label}</p>
      <h2 id={id}>{title}</h2>
      {children && <p className="section-description">{children}</p>}
    </div>
  )
}

function Tags({ stack }) {
  return <ul className="tags" aria-label="Technologies">{stack.map((item) => <li key={item}>{item}</li>)}</ul>
}

function ProjectCard({ project, icon: Icon }) {
  return (
    <article className="project">
      <div className="project-top">
        <span className="icon-box"><Icon size={23} /></span>
        <span className="project-area">{project.area}</span>
      </div>
      <p className="project-client">{project.client}</p>
      <h3>{project.title}</h3>
      <p className="card-description">{project.description}</p>
      <Tags stack={project.stack} />
      <details>
        <summary aria-label={'Project details for ' + project.title}>Project details <ChevronDown size={17} /></summary>
        <p>{project.details}</p>
      </details>
    </article>
  )
}

function Projects() {
  return (
    <section className="shell section" id="projects" aria-labelledby="projects-title">
      <SectionHeading id="projects-title" label="Portfolio" title="Selected work">Enterprise client projects in healthcare, lending, public services, retail, and the laboratory.</SectionHeading>
      <div className="grid gap-4 md:grid-cols-2">
        {projects.map((project, index) => <ProjectCard key={project.title} project={project} icon={projectIcons[index]} />)}
      </div>
    </section>
  )
}

function Experience() {
  return (
    <section className="shell section section-columns" id="experience" aria-labelledby="experience-title">
      <SectionHeading id="experience-title" label="Career" title="Experience" />
      <ol className="timeline">
        {experience.map(({ role, client, location, dates, summary }) => (
          <li key={client}>
            <p className="dates">{dates}</p>
            <h3>{role}</h3>
            <p className="client-location">{client} <span>· {location}</span></p>
            <p className="card-description">{summary}</p>
          </li>
        ))}
      </ol>
    </section>
  )
}

function Skills() {
  return (
    <section className="shell section" id="skills" aria-labelledby="skills-title">
      <SectionHeading id="skills-title" label="Technology" title="Technical skills" />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {skills.map(({ title, stack }, index) => {
          const Icon = skillIcons[index]
          return <article className="skill" key={title}><Icon size={23} aria-hidden="true" /><h3>{title}</h3><Tags stack={stack} /></article>
        })}
      </div>
    </section>
  )
}

function About() {
  return (
    <section className="shell section section-columns" id="about" aria-labelledby="about-title">
      <SectionHeading id="about-title" label="Background" title="About me" />
      <div className="about-copy">
        <p>I’m {person.name}, a Senior AI Engineer. I started in Python application development and data engineering, then moved into enterprise machine learning and retrieval-augmented AI.</p>
        <p>My work spans preparing data, building APIs, evaluating model and retrieval quality, and operating cloud services. I’ve worked with clinical specialists and credit analysts to turn domain requirements into workflows that teams can review and support.</p>
        <div className="education">
          <span className="icon-box"><GraduationCap size={23} /></span>
          <div><h3>Education</h3><p>Bachelor of Technology in Computer Science and Engineering</p><p>Guru Nanak Institute of Technology</p></div>
        </div>
      </div>
    </section>
  )
}

function Contact() {
  return (
    <section className="shell section" id="contact" aria-labelledby="contact-title">
      <div className="contact-panel">
        <SectionHeading id="contact-title" label="Contact" title="Let’s connect">Reach out about AI engineering roles or projects.</SectionHeading>
        <div className="contact-links">
          <a href={'mailto:' + person.email}><Mail size={19} /><span>{person.email}</span><ArrowUpRight size={17} /></a>
          <a href={person.linkedin}><BriefcaseBusiness size={19} /><span>LinkedIn</span><ArrowUpRight size={17} /></a>
          {person.github && <a href={person.github}><GitFork size={19} /><span>GitHub</span><ArrowUpRight size={17} /></a>}
        </div>
      </div>
    </section>
  )
}

export default function App() {
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <Header />
      <main id="main">
        <Hero />
        <Projects />
        <Experience />
        <Skills />
        <About />
        <Contact />
      </main>
      <footer className="shell footer">
        <Brand />
        <a href="#home">Back to top <ArrowRight size={16} /></a>
      </footer>
    </>
  )
}
