import { useEffect, useState } from 'react'
import { Activity, ArrowDownRight, ArrowRight, ArrowUpRight, Boxes, BrainCircuit, ChevronDown, Cloud, Code2, Database, Download, GitFork, GraduationCap, BriefcaseBusiness, Mail, Menu, Network, Phone, X } from 'lucide-react'
import { caseStudies, experience, insights, person, projects, skills } from './content'
import Opportunity from './Opportunity'
import Architecture from './Architecture'
import ThemeToggle from './ThemeToggle'

const navigation = [
  ['Home', 'home'],
  ['Quick View', 'recruiter'],
  ['About', 'about'],
  ['Expertise', 'skills'],
  ['Experience', 'experience'],
  ['Projects', 'projects'],
  ['Insights', 'insights'],
  ['Contact', 'contact'],
  ['Submit Opportunity', 'opportunity'],
]

const projectIcons = [Network, Activity, Cloud, Database, Boxes]
const skillIcons = [BrainCircuit, Activity, Code2, Database, Cloud, Network]

function Brand() {
  return <a href="#home" className="brand"><span aria-hidden="true">VA</span> Venkat Akula</a>
}

function Header() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('home')

  useEffect(() => {
    const sections = navigation.map(([, id]) => document.getElementById(id))
    function updateActive() {
      const current = sections.findLast(section => section.getBoundingClientRect().top <= 150)
      setActive(current?.id ?? 'home')
    }
    window.addEventListener('scroll', updateActive, { passive: true })
    window.addEventListener('resize', updateActive)
    updateActive()
    return () => {
      window.removeEventListener('scroll', updateActive)
      window.removeEventListener('resize', updateActive)
    }
  }, [])

  return (
    <header className="site-header" onKeyDown={(event) => {
      if (event.key === 'Escape' && open) {
        setOpen(false)
        document.getElementById('menu-toggle').focus()
      }
    }}>
      <div className="shell header-inner">
        <Brand />
        <ThemeToggle />
        <button type="button" id="menu-toggle" className="menu-toggle" aria-expanded={open} aria-controls="site-nav" aria-label={open ? 'Close navigation' : 'Open navigation'} onClick={() => setOpen(!open)}>
          {open ? <X /> : <Menu />}
        </button>
        <nav id="site-nav" className={open ? 'site-nav open' : 'site-nav'} aria-label="Main navigation">
          {navigation.map(([label, id]) => (
            <a key={id} href={'#' + id} className={id === 'opportunity' ? 'nav-contact' : undefined}
              aria-current={active === id ? 'location' : undefined} onClick={() => {
                if (open) {
                  const destination = document.getElementById(id)
                  destination.tabIndex = -1
                  destination.focus({ preventScroll: true })
                  setOpen(false)
                }
              }}>
              {label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}

function AiSymbol() {
  return (
    <div className="hero-art" aria-hidden="true">
      <div className="ai-signal" />
      <div className="ai-orbit ai-orbit-outer" />
      <div className="ai-orbit ai-orbit-inner" />
      <div className="ai-chip">
        <span className="ai-chip-face">AI</span>
      </div>
    </div>
  )
}

function ResumeLink({ className }) {
  return (
    <a className={className} href={import.meta.env.BASE_URL + 'Venkat-Akula-Resume.pdf'} download="Venkat-Akula-Resume.pdf">
      <Download size={18} aria-hidden="true" /><span>Download résumé (PDF)</span>
    </a>
  )
}

function Hero() {
  return (
    <section id="home" className="shell hero" aria-labelledby="hero-title">
      <div className="hero-copy">
        <p className="eyebrow"><span className="status-dot" /> Senior AI &amp; Machine Learning Engineer</p>
        <h1 id="hero-title">Venkat <span>Akula<span className="hero-period">.</span></span></h1>
        <p className="hero-intro">I build enterprise AI systems that teams can evaluate, deploy, and operate.</p>
        <p className="hero-description">Generative AI, agentic workflows, and retrieval-augmented generation on cloud-native architecture.</p>
        <p className="availability"><span className="status-dot" aria-hidden="true" /> Open to opportunities</p>
        <div className="hero-actions">
          <a className="button primary" href="#projects">View projects <ArrowDownRight size={18} /></a>
          <a className="button secondary" href="#opportunity">Submit an opportunity <ArrowUpRight size={18} /></a>
          <ResumeLink className="button secondary" />
        </div>
      </div>
      <AiSymbol />
      <dl className="career-highlights" aria-label="Career highlights">
        <div><dt>Enterprise engineering</dt><dd>11+ years</dd></div>
        <div><dt>Cloud platforms</dt><dd>Azure, AWS, GCP</dd></div>
        <div><dt>Selected industries</dt><dd>Healthcare, banking, government, retail</dd></div>
      </dl>
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

function ProjectCard({ project, icon: Icon, study }) {
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
        {study && <div className="case-study">
          <h4>Engineering challenge</h4><p>{study.challenge}</p>
          <h4>What I worked on</h4><p>{project.details}</p>
          <h4>Conceptual architecture</h4>
          <Architecture project={project.title} stages={study.architecture} />
          <h4>Security and validation</h4><p>{study.safeguards}</p>
          <h4>Outcome</h4><p>{study.outcome}</p>
          <h4>Engineering takeaway</h4><p>{study.lesson}</p>
        </div>}
        {!study && <p>{project.details}</p>}
      </details>
    </article>
  )
}

function Projects() {
  return (
    <section className="shell section" id="projects" aria-labelledby="projects-title">
      <SectionHeading id="projects-title" label="Portfolio" title="Selected work">Enterprise client projects in healthcare, lending, public services, retail, and the laboratory.</SectionHeading>
      <div className="grid gap-4 md:grid-cols-2">
        {projects.map((project, index) => <ProjectCard key={project.title} project={project} icon={projectIcons[index]} study={caseStudies[index]} />)}
      </div>
    </section>
  )
}

function Experience() {
  return (
    <section className="shell section section-columns" id="experience" aria-labelledby="experience-title">
      <SectionHeading id="experience-title" label="Career" title="Experience" />
      <ol className="timeline">
        {experience.map(({ role, client, location, dates, summary }, index) => (
          <li key={client}>
            <p className="dates">{dates}</p>
            <h3>{role}</h3>
            <p className="client-location">{client} <span>· {location}</span></p>
            <details>
              <summary aria-label={'Role details for ' + client}>Role details <ChevronDown size={17} /></summary>
              <p>{summary}</p>
              <Tags stack={projects[index].stack} />
            </details>
          </li>
        ))}
      </ol>
    </section>
  )
}

function Skills() {
  return (
    <section className="shell section" id="skills" aria-labelledby="skills-title">
      <SectionHeading id="skills-title" label="Technology" title="Technical expertise" />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {skills.map(({ title, stack }, index) => {
          const Icon = skillIcons[index % skillIcons.length]
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
        <p>I’m {person.name}, a Senior AI and Machine Learning Engineer with 11+ years in enterprise software. My work spans healthcare, banking, government, retail, and laboratory operations.</p>
        <p>My work spans preparing data, building APIs, evaluating model and retrieval quality, and operating cloud services. I’ve worked with clinical specialists and credit analysts to turn domain requirements into workflows that teams can review and support.</p>
        <div className="education">
          <span className="icon-box"><GraduationCap size={23} /></span>
          <div><h3>Education</h3><p>Bachelor of Technology in Computer Science and Engineering</p><p>Guru Nanak Institute of Technology</p></div>
        </div>
      </div>
    </section>
  )
}

function Insights() {
  return (
    <section className="shell section" id="insights" aria-labelledby="insights-title">
      <SectionHeading id="insights-title" label="Engineering practice" title="Insights" />
      <div className="grid gap-4 md:grid-cols-2">
        {insights.map(({ title, body }) => (
          <article className="skill insight" key={title}><h3>{title}</h3><p className="card-description">{body}</p></article>
        ))}
      </div>
    </section>
  )
}

function RecruiterQuickView() {
  return (
    <section className="shell section recruiter-quick-view" id="recruiter" aria-labelledby="recruiter-title">
      <SectionHeading id="recruiter-title" label="Recruiter quick view" title="AI engineering at a glance" />
      <div>
        <dl className="recruiter-facts">
          <div><dt>Experience</dt><dd>11+ years in software, data, and AI engineering</dd></div>
          <div><dt>Focus</dt><dd>Agentic AI, RAG, LLM evaluation, and production ML</dd></div>
          <div><dt>Cloud experience</dt><dd>Azure for donor search, GCP for loan risk modeling, and AWS for public services</dd></div>
        </dl>
        <div className="hero-actions">
          <a href="#opportunity" className="button primary">Submit a role <ArrowUpRight size={17} /></a>
          <a href="#experience" className="button secondary">View experience</a>
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
          <ResumeLink />
          <a href={'mailto:' + person.email}><Mail size={19} /><span>{person.email}</span><ArrowUpRight size={17} /></a>
          <a href={'tel:' + person.phone.replaceAll(' ', '')}><Phone size={19} /><span>{person.phone}</span><ArrowUpRight size={17} /></a>
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
        <RecruiterQuickView />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Insights />
        <Contact />
        <Opportunity />
      </main>
      <footer className="shell footer">
        <Brand />
        <a className="footer-opportunity" href="#opportunity">Submit an opportunity</a>
        <a href="#home">Back to top <ArrowRight size={16} /></a>
      </footer>
    </>
  )
}
