import { useEffect, useState } from "react";
import {
  ArrowRight,
  Bot,
  Code2,
  Globe,
  ShieldCheck,
  Wrench,
  Zap,
  Menu,
  X,
} from "lucide-react";

import Contact from "./pages/Contact";
import "./index.css";
import AdminDashboard from "./pages/AdminDashboard";

const fallbackServices = [
  {
    slug: "ai-integration",
    title: "AI Integration & Automation",
    description:
        "Integrate AI into business workflows and automate repetitive tasks.",
  },
  {
    slug: "custom-software",
    title: "Custom Software Development",
    description:
        "Build software tailored to your business requirements.",
  },
  {
    slug: "web-development",
    title: "Website & Full-Stack Development",
    description:
        "Develop responsive websites and modern web applications.",
  },
  {
    slug: "api-integration",
    title: "API Development & Integration",
    description:
        "Connect applications with reliable APIs and integrations.",
  },
  {
    slug: "cybersecurity",
    title: "Cybersecurity & Application Security",
    description:
        "Identify application security weaknesses and improve protection.",
  },
  {
    slug: "testing",
    title: "Software Testing & Bug Fixing",
    description:
        "Improve application quality, reliability, and performance.",
  },
];

const icons = [Bot, Code2, Globe, Zap, ShieldCheck, Wrench];

export default function App() {
  const [services, setServices] = useState(fallbackServices);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    fetch("/api/v1/services")
        .then((response) => {
          if (!response.ok) {
            throw new Error("Services API unavailable");
          }

          return response.json();
        })
        .then((data) => {
          if (Array.isArray(data) && data.length > 0) {
            setServices(data);
          }
        })
        .catch((error) => {
          console.warn(
              "Using default services:",
              error.message
          );
        });
  }, []);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
      <>
        {/* Navigation */}
        <header className="navbar">
          <a
              className="brand"
              href="#home"
              onClick={closeMenu}
          >
            <span className="brand-icon">G</span>

            <span>
            GenNum1 <strong>Solutions</strong>
          </span>
          </a>

          <button
              className="menu-toggle"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle navigation"
              aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={23} /> : <Menu size={23} />}
          </button>

          <nav
              className={
                menuOpen ? "nav-links open" : "nav-links"
              }
          >
            <a href="#home" onClick={closeMenu}>
              Home
            </a>

            <a href="#about" onClick={closeMenu}>
              About
            </a>

            <a href="#services" onClick={closeMenu}>
              Services
            </a>

            <a
                className="nav-cta"
                href="#contact"
                onClick={closeMenu}
            >
              Let's Talk <ArrowRight size={16} />
            </a>
          </nav>
        </header>

        <main>
          {/* Hero */}
          <section className="hero" id="home">
            <div className="hero-copy">
              <p className="eyebrow">
                TECHNOLOGY THAT MOVES YOU FORWARD
              </p>

              <h1>
                Build smarter.
                <br />
                <span>Grow faster.</span>
                <br />
                Go further.
              </h1>

              <p className="hero-description">
                We build modern software, AI-powered
                applications, and digital experiences that
                help businesses solve real problems.
              </p>

              <div className="hero-actions">
                <a
                    className="button primary"
                    href="#services"
                >
                  Explore Services <ArrowRight size={17} />
                </a>

                <a
                    className="button secondary"
                    href="#contact"
                >
                  Start a Project
                </a>
              </div>
            </div>

            <div className="hero-art">
              <div className="code-window">
                <div className="window-bar">
                  <i />
                  <i />
                  <i />
                  <span>innovation.js</span>
                </div>

                <pre>
                <code>
                  <span className="purple">const</span>{" "}
                  future = {"{"}
                  {"\n"}
                  {"  "}ideas:{" "}
                  <span className="green">"Bold"</span>,
                  {"\n"}
                  {"  "}technology:{" "}
                  <span className="green">"Smart"</span>,
                  {"\n"}
                  {"  "}growth:{" "}
                  <span className="green">"Scalable"</span>
                  {"\n"}
                  {"}"};
                  {"\n\n"}
                  <span className="purple">await</span>{" "}
                  build(future);
                  {"\n"}
                  <span className="muted">
                    // Turn ideas into impact.
                  </span>
                </code>
              </pre>

                <div className="window-footer">
                  <Zap size={16} />
                  Engineering what's next
                </div>
              </div>

              <div className="floating-tag">
                AI + Automation
              </div>
            </div>
          </section>

          {/* Technology strip */}
          <section className="trust-strip">
            <p>TECHNOLOGY SERVICES FOR MODERN BUSINESSES</p>

            <div>
              <span>Artificial Intelligence</span>
              <span>Software Engineering</span>
              <span>Web Development</span>
              <span>Application Security</span>
            </div>
          </section>

          {/* About */}
          <section className="section about" id="about">
            <div>
              <p className="eyebrow">
                ABOUT GENNUM1 SOLUTIONS
              </p>

              <h2>
                Technology should solve problems, not create
                them.
              </h2>
            </div>

            <p className="about-copy">
              We turn business ideas into practical digital
              solutions, from custom software and websites to
              AI integrations and application security. Our
              goal is to help businesses work smarter and grow
              with technology.
            </p>
          </section>

          {/* Services */}
          <section
              className="section services"
              id="services"
          >
            <div className="section-heading">
              <div>
                <p className="eyebrow">WHAT WE DO</p>

                <h2>
                  Solutions built around your goals.
                </h2>
              </div>

              <p>
                Flexible technology services for ideas and
                growing businesses.
              </p>
            </div>

            <div className="service-grid">
              {services.map((service, index) => {
                const Icon = icons[index % icons.length];

                return (
                    <article
                        className="service-card"
                        key={service.slug ?? service.title}
                    >
                      <div className="service-icon">
                        <Icon size={23} />
                      </div>

                      <span className="service-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                      <h3>{service.title}</h3>

                      <p>{service.description}</p>

                      <a
                          href="#contact"
                          className="service-link"
                      >
                        Discuss your project
                        <ArrowRight size={15} />
                      </a>
                    </article>
                );
              })}
            </div>
          </section>

          {/* Real contact form */}
          <Contact />
        </main>

        {/* Footer */}
        <footer className="footer">
          <a className="brand" href="#home">
            <span className="brand-icon">G</span>

            <span>
            GenNum1 <strong>Solutions</strong>
          </span>
          </a>

          <p>
            Building practical technology for a digital world.
          </p>

          <a href="mailto:anup0kumar1singh@gmail.com">
            anup0kumar1singh@gmail.com
          </a>

          <span>
          © {new Date().getFullYear()} GenNum1 Solutions
        </span>
        </footer>
      </>
  );
}