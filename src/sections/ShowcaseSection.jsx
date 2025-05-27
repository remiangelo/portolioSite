import { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const AppShowcase = () => {
  const sectionRef = useRef(null);
  const mainProjectRef = useRef(null);
  const projectRefs = useRef([]);
  const [activeProject, setActiveProject] = useState(null);
  
  // Reset project refs array when projects change
  useEffect(() => {
    projectRefs.current = projectRefs.current.slice(0, 3);
  }, []);

  // Function to handle project hover
  const handleProjectHover = (projectId) => {
    setActiveProject(projectId);
  };

  useGSAP(() => {
    // Animation for the main section
    gsap.fromTo(
      sectionRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1.5 }
    );

    // Animate the main featured project
    gsap.fromTo(
      mainProjectRef.current,
      { y: 50, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: mainProjectRef.current,
          start: "top bottom-=100",
        },
      }
    );

    // Animations for secondary projects
    projectRefs.current.forEach((project, index) => {
      if (project) {
        gsap.fromTo(
          project,
          {
            y: 50,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            delay: 0.2 * (index + 1),
            scrollTrigger: {
              trigger: project,
              start: "top bottom-=100",
            },
          }
        );
      }
    });
    
    // Add a glow effect on hover
    const projects = document.querySelectorAll('.project');
    projects.forEach(project => {
      project.addEventListener('mouseenter', () => {
        gsap.to(project, {
          boxShadow: '0 0 25px rgba(139, 92, 246, 0.5)',
          scale: 1.03,
          duration: 0.3
        });
      });
      project.addEventListener('mouseleave', () => {
        gsap.to(project, {
          boxShadow: '0 0 0 rgba(139, 92, 246, 0)',
          scale: 1,
          duration: 0.3
        });
      });
    });
  }, []);

  return (
    <div id="work" ref={sectionRef} className="app-showcase">
      <div className="w-full">
        <div className="flex flex-col items-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500">
            My Featured Projects
          </h2>
          <p className="text-white-50 md:text-xl text-center max-w-3xl">
            From secure web applications to specialized security tools, my work combines 
            technical expertise with cutting-edge solutions.
          </p>
        </div>
        
        <div className="showcaselayout">
          {/* Main featured project - Security Intelligence Platform */}
          <div ref={mainProjectRef} className="first-project-wrapper bg-gradient-to-br from-purple-900/20 to-blue-900/20 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-purple-500/30 transition-all duration-300">
            <div className="image-wrapper">
              <img 
                src="/images/project1.png" 
                alt="Security Intelligence Platform Dashboard" 
                className="transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              <div className="absolute bottom-4 left-4 flex gap-2">
                <span className="px-2 py-1 rounded-full bg-purple-500 bg-opacity-80 text-xs font-medium">React</span>
                <span className="px-2 py-1 rounded-full bg-blue-500 bg-opacity-80 text-xs font-medium">Node.js</span>
                <span className="px-2 py-1 rounded-full bg-green-500 bg-opacity-80 text-xs font-medium">Security</span>
                <span className="px-2 py-1 rounded-full bg-red-500 bg-opacity-80 text-xs font-medium">AI</span>
              </div>
            </div>
            <div className="text-content">
              <h2 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
                Cyber Intelligence Platform
              </h2>
              <p className="text-white-50 md:text-lg">
                An enterprise-grade security platform built for Pittura Group that integrates AI-powered threat detection, 
                vulnerability scanning, and real-time monitoring. Features an intuitive dashboard for security teams 
                to visualize and respond to threats.
              </p>
              <div className="mt-4 flex gap-4">
                <a href="https://github.com/remi-beltram/cyber-intelligence" className="px-6 py-2 rounded-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 transition-all duration-300 font-medium flex items-center gap-2 shadow-glow">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                  </svg>
                  View Code
                </a>
                <a href="https://pitturagroup.com/projects/cyber-intelligence" className="px-6 py-2 rounded-full bg-transparent border border-white/20 hover:bg-white/5 hover:border-purple-500/30 transition-all duration-300 font-medium flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polygon points="10 8 16 12 10 16 10 8"></polygon>
                  </svg>
                  Case Study
                </a>
              </div>
            </div>
          </div>

          <div className="project-list-wrapper overflow-hidden">
            {/* Project 2 - Digital Elegance Web Platform */}
            <div 
              className="project bg-gradient-to-br from-blue-900/20 to-purple-900/20 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden transition-all duration-300 hover:border-blue-500/30" 
              ref={el => projectRefs.current[0] = el}
              onMouseEnter={() => handleProjectHover('webapp')}
              onMouseLeave={() => setActiveProject(null)}
            >
              <div className="image-wrapper">
                <img
                  src="/images/project2.png"
                  alt="Digital Elegance Web Platform"
                  className="transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              </div>
              <div className="p-6">
                <h2 className="text-xl md:text-2xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400">Digital Elegance Platform</h2>
                <p className={`text-white-50 text-sm transition-opacity duration-300 ${activeProject === 'webapp' ? 'opacity-100' : 'opacity-0 h-0'}`}>
                  A modern web platform built for Pittura Group featuring human-centered design principles, 
                  advanced animations with Three.js, and a responsive, accessible interface.
                </p>
                <div className="flex gap-2 mt-2">
                  <span className="px-2 py-1 rounded-full bg-blue-500 bg-opacity-80 text-xs font-medium">React</span>
                  <span className="px-2 py-1 rounded-full bg-purple-500 bg-opacity-80 text-xs font-medium">Three.js</span>
                  <span className="px-2 py-1 rounded-full bg-green-500 bg-opacity-80 text-xs font-medium">TailwindCSS</span>
                </div>
              </div>
            </div>

            {/* Project 3 - Rust-based Security Scanner */}
            <div 
              className="project bg-gradient-to-br from-red-900/20 to-orange-900/20 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden transition-all duration-300 hover:border-red-500/30" 
              ref={el => projectRefs.current[1] = el}
              onMouseEnter={() => handleProjectHover('scanner')}
              onMouseLeave={() => setActiveProject(null)}
            >
              <div className="image-wrapper">
                <img 
                  src="/images/project3.png" 
                  alt="Rust-based Security Scanner"
                  className="transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              </div>
              <div className="p-6">
                <h2 className="text-xl md:text-2xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-orange-400">RustScan Pro</h2>
                <p className={`text-white-50 text-sm transition-opacity duration-300 ${activeProject === 'scanner' ? 'opacity-100' : 'opacity-0 h-0'}`}>
                  A high-performance network security scanner built with Rust, offering lightning-fast port scanning, 
                  vulnerability detection, and integration with security workflows.
                </p>
                <div className="flex gap-2 mt-2">
                  <span className="px-2 py-1 rounded-full bg-red-500 bg-opacity-80 text-xs font-medium">Rust</span>
                  <span className="px-2 py-1 rounded-full bg-orange-500 bg-opacity-80 text-xs font-medium">Security</span>
                  <span className="px-2 py-1 rounded-full bg-yellow-500 bg-opacity-80 text-xs font-medium">CLI</span>
                </div>
              </div>
            </div>
            
            {/* Project 4 - Go-based Web API */}
            <div 
              className="project bg-gradient-to-br from-blue-900/20 to-green-900/20 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden transition-all duration-300 hover:border-green-500/30" 
              ref={el => projectRefs.current[2] = el}
              onMouseEnter={() => handleProjectHover('goapi')}
              onMouseLeave={() => setActiveProject(null)}
            >
              <div className="image-wrapper">
                <img 
                  src="/images/project4.png" 
                  alt="Go-based Microservices API"
                  className="transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              </div>
              <div className="p-6">
                <h2 className="text-xl md:text-2xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-400">GoMicro API</h2>
                <p className={`text-white-50 text-sm transition-opacity duration-300 ${activeProject === 'goapi' ? 'opacity-100' : 'opacity-0 h-0'}`}>
                  A high-performance microservices API built with Go, featuring containerization, 
                  GraphQL integration, and authentication services for enterprise applications.
                </p>
                <div className="flex gap-2 mt-2">
                  <span className="px-2 py-1 rounded-full bg-blue-500 bg-opacity-80 text-xs font-medium">Go</span>
                  <span className="px-2 py-1 rounded-full bg-green-500 bg-opacity-80 text-xs font-medium">GraphQL</span>
                  <span className="px-2 py-1 rounded-full bg-purple-500 bg-opacity-80 text-xs font-medium">Docker</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Project metrics section */}
        <div className="mt-16 grid md:grid-cols-4 grid-cols-2 gap-6 max-w-5xl mx-auto">
          <div className="metric-card bg-gradient-to-br from-purple-900/20 to-blue-900/20 backdrop-blur-sm rounded-xl p-6 text-center border border-white/10">
            <h3 className="text-4xl font-bold text-purple-400 mb-2">20+</h3>
            <p className="text-white-50">Projects Completed</p>
          </div>
          <div className="metric-card bg-gradient-to-br from-blue-900/20 to-cyan-900/20 backdrop-blur-sm rounded-xl p-6 text-center border border-white/10">
            <h3 className="text-4xl font-bold text-blue-400 mb-2">98%</h3>
            <p className="text-white-50">Client Satisfaction</p>
          </div>
          <div className="metric-card bg-gradient-to-br from-green-900/20 to-blue-900/20 backdrop-blur-sm rounded-xl p-6 text-center border border-white/10">
            <h3 className="text-4xl font-bold text-green-400 mb-2">5+</h3>
            <p className="text-white-50">Years Experience</p>
          </div>
          <div className="metric-card bg-gradient-to-br from-red-900/20 to-orange-900/20 backdrop-blur-sm rounded-xl p-6 text-center border border-white/10">
            <h3 className="text-4xl font-bold text-red-400 mb-2">8</h3>
            <p className="text-white-50">Tech Stack Mastery</p>
          </div>
        </div>
      </div>
      
      {/* Add CSS for the new effects */}
      <style jsx>{`
        .shadow-glow {
          box-shadow: 0 0 10px rgba(138, 43, 226, 0.5), 0 0 20px rgba(0, 115, 230, 0.3);
        }
        
        .project-list-wrapper {
          display: grid;
          grid-template-columns: repeat(1, 1fr);
          gap: 1.5rem;
        }
        
        @media (min-width: 768px) {
          .project-list-wrapper {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        
        @media (min-width: 1024px) {
          .project-list-wrapper {
            grid-template-columns: repeat(3, 1fr);
          }
        }
      `}</style>
    </div>
  );
};

export default AppShowcase;
