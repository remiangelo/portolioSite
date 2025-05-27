import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useState, useRef } from "react";

import TitleHeader from "../components/TitleHeader";
import TechIconCardExperience from "../components/models/tech_logos/TechIconCardExperience";
import { techStackIcons } from "../constants";

const TechStack = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const skillsRef = useRef(null);
  
  // Categories of skills
  const categories = [
    { id: 'all', name: 'All Skills' },
    { id: 'frontend', name: 'Frontend' },
    { id: 'backend', name: 'Backend' },
    { id: 'languages', name: 'Languages' },
    { id: 'security', name: 'Security' },
    { id: 'tools', name: 'Tools & DevOps' }
  ];
  
  // Animate the tech cards in the skills section
  useGSAP(() => {
    // Main cards animation
    gsap.fromTo(
      ".tech-card",
      {
        y: 50,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: "#skills",
          start: "top center",
        },
      }
    );
    
    // Category tabs animation
    gsap.fromTo(
      ".category-tab",
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.1, duration: 0.5, ease: "back.out(1.7)" }
    );
    
    // Skills header animation
    gsap.fromTo(
      ".skills-header",
      { x: -50, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
    );
  });
  
  // Filter skills by category
  const filterSkills = (category) => {
    setActiveCategory(category);
    
    // Create a timeline for the transition effect
    const tl = gsap.timeline();
    
    // Animate out current cards
    tl.to(".tech-card", {
      opacity: 0,
      y: 20,
      stagger: 0.05,
      duration: 0.3,
      ease: "power2.in",
      onComplete: () => {
        // After animation completes, scroll back to the skills section
        if (skillsRef.current) {
          skillsRef.current.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
    
    // Animate in the filtered cards
    tl.fromTo(
      ".tech-card",
      { opacity: 0, y: 20 },
      { 
        opacity: 1, 
        y: 0, 
        stagger: 0.05, 
        duration: 0.5, 
        ease: "power2.out",
        delay: 0.1
      }
    );
  };

  // Extended tech skills data with categories
  const techSkills = [
    { name: "React", category: "frontend", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
    { name: "JavaScript", category: "languages", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
    { name: "TypeScript", category: "languages", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
    { name: "Node.js", category: "backend", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
    { name: "Python", category: "languages", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
    { name: "Go", category: "languages", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original-wordmark.svg" },
    { name: "Rust", category: "languages", icon: "https://raw.githubusercontent.com/rust-lang/rust-artwork/master/logo/rust-logo-512x512.png" },
    { name: "Three.js", category: "frontend", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/threejs/threejs-original.svg" },
    { name: "HTML/CSS", category: "frontend", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
    { name: "Next.js", category: "frontend", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
    { name: "Security Testing", category: "security", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" },
    { name: "Docker", category: "tools", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
    { name: "Git", category: "tools", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
    { name: "Tailwind CSS", category: "frontend", icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Tailwind_CSS_Logo.svg/2048px-Tailwind_CSS_Logo.svg.png" },
    { name: "MongoDB", category: "backend", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
  ];
  
  // Filter skills based on active category
  const filteredSkills = activeCategory === 'all' 
    ? techSkills 
    : techSkills.filter(skill => skill.category === activeCategory);
  
  return (
    <div id="skills" ref={skillsRef} className="flex-center section-padding">
      <div className="w-full h-full md:px-10 px-5">
        <TitleHeader
          title="My Extensive Tech Arsenal"
          sub="Full-Stack Development | Security | Creative Coding"
          className="skills-header"
        />
        
        {/* Category tabs */}
        <div className="flex flex-wrap justify-center gap-3 mt-8 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => filterSkills(category.id)}
              className={`category-tab px-4 py-2 rounded-full text-sm md:text-base transition-all duration-300 ${
                activeCategory === category.id
                ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium shadow-lg shadow-purple-500/20'
                : 'bg-black bg-opacity-30 text-white-50 hover:bg-opacity-50'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
        
        {/* Tech skills grid - combining 3D models and images */}
        <div className="tech-grid">
          {/* 3D Model cards for main technologies */}
          {activeCategory === 'all' && techStackIcons.map((techStackIcon) => (
            <div
              key={techStackIcon.name}
              className="card-border tech-card overflow-hidden group xl:rounded-2xl rounded-lg bg-gradient-to-br from-purple-900/20 to-blue-900/20 backdrop-blur-sm"
            >
              <div className="tech-card-animated-bg" />
              <div className="tech-card-content">
                <div className="tech-icon-wrapper">
                  <TechIconCardExperience model={techStackIcon} />
                </div>
                <div className="padding-x w-full">
                  <p className="font-medium">{techStackIcon.name}</p>
                </div>
              </div>
            </div>
          ))}

          {/* Image-based tech cards for additional skills */}
          {filteredSkills.map((skill, index) => (
            <div
              key={`${skill.name}-${index}`}
              className="card-border tech-card overflow-hidden group xl:rounded-2xl rounded-lg bg-gradient-to-br from-purple-900/20 to-blue-900/20 backdrop-blur-sm"
            >
              <div className="tech-card-animated-bg" />
              <div className="tech-card-content">
                <div className="tech-icon-wrapper flex items-center justify-center">
                  <img 
                    src={skill.icon} 
                    alt={skill.name} 
                    className="w-16 h-16 object-contain hover:scale-110 transition-transform duration-300" 
                  />
                </div>
                <div className="padding-x w-full">
                  <p className="font-medium">{skill.name}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Tech stats section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-black bg-opacity-30 backdrop-blur-sm p-6 rounded-xl border border-white/10 flex flex-col items-center text-center">
            <div className="text-4xl font-bold text-purple-400 mb-2">50+</div>
            <div className="text-white-50">Technologies Mastered</div>
          </div>
          <div className="bg-black bg-opacity-30 backdrop-blur-sm p-6 rounded-xl border border-white/10 flex flex-col items-center text-center">
            <div className="text-4xl font-bold text-blue-400 mb-2">5+</div>
            <div className="text-white-50">Years of Coding Experience</div>
          </div>
          <div className="bg-black bg-opacity-30 backdrop-blur-sm p-6 rounded-xl border border-white/10 flex flex-col items-center text-center">
            <div className="text-4xl font-bold text-green-400 mb-2">10+</div>
            <div className="text-white-50">Programming Languages</div>
          </div>
          <div className="bg-black bg-opacity-30 backdrop-blur-sm p-6 rounded-xl border border-white/10 flex flex-col items-center text-center">
            <div className="text-4xl font-bold text-orange-400 mb-2">100%</div>
            <div className="text-white-50">Passion for Innovation</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechStack;
