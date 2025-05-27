import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useState } from "react";

import TitleHeader from "../components/TitleHeader";
import GlowCard from "../components/GlowCard";

gsap.registerPlugin(ScrollTrigger);

// GitHub repository data for specified repos
const githubRepos = [
  {
    name: "reed",
    description: "A BitTorrent Client in GO",
    technologies: ["Go", "BitTorrent", "Networking"],
    stars: 1,
    forks: 0,
    url: "https://github.com/remiangelo/reed",
    featured: true
  },
  {
    name: "classforge",
    description: "Educational platform for creating and managing online classes",
    technologies: ["JavaScript", "React", "Node.js"],
    stars: 0,
    forks: 0,
    url: "https://github.com/remiangelo/classforge",
    featured: true
  },
  {
    name: "youbuy-marketplace",
    description: "E-commerce marketplace platform with user authentication and product management",
    technologies: ["JavaScript", "React", "Express"],
    stars: 0,
    forks: 0,
    url: "https://github.com/andregironcode/youbuy-marketplace",
    featured: true
  },
  {
    name: "edu-connect-network-hub",
    description: "Educational networking platform connecting students and educators",
    technologies: ["JavaScript", "MongoDB", "Express"],
    stars: 0,
    forks: 0,
    url: "https://github.com/andregironcode/edu-connect-network-hub",
    featured: true
  }
];

const Experience = () => {
  // State for tracking hover effects
  const [_, setActiveRepo] = useState(null);
  
  useGSAP(() => {
    // Animate the section title
    gsap.fromTo(
      ".github-title",
      { y: -30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
    );
    
    // Animate the featured repos
    gsap.fromTo(
      ".featured-repo",
      { y: 50, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        stagger: 0.2, 
        duration: 0.8, 
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".featured-repos",
          start: "top 80%",
        }
      }
    );
    
    // Animate the regular repos
    gsap.fromTo(
      ".repo-card",
      { y: 30, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        stagger: 0.1, 
        duration: 0.6, 
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".repo-grid",
          start: "top 80%",
        }
      }
    );
    
    // Add hover effects to repo cards
    const repoCards = document.querySelectorAll('.repo-card, .featured-repo');
    repoCards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        gsap.to(card, {
          y: -5,
          boxShadow: '0 10px 30px rgba(138, 43, 226, 0.2)',
          duration: 0.3
        });
      });
      
      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          y: 0,
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
          duration: 0.3
        });
      });
    });
  }, []);

  return (
    <section
      id="experience"
      className="flex-center md:mt-40 mt-20 section-padding xl:px-0"
    >
      <div className="w-full h-full md:px-20 px-5">
        <TitleHeader
          title="GitHub Repositories"
          sub="💻 My Open Source Projects"
          className="github-title"
        />
        
        {/* Featured repositories */}
        <div className="featured-repos mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          {githubRepos
            .filter(repo => repo.featured)
            .slice(0, 4)
            .map((repo, index) => (
              <a 
                href={repo.url} 
                target="_blank" 
                rel="noopener noreferrer"
                key={repo.name}
                className={`featured-repo bg-gradient-to-br ${index % 4 === 0 ? 'from-purple-900/20 to-blue-900/20' : 
                  index % 4 === 1 ? 'from-blue-900/20 to-purple-900/20' : 
                  index % 4 === 2 ? 'from-green-900/20 to-blue-900/20' : 
                  'from-red-900/20 to-orange-900/20'} 
                  backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 transition-all duration-300 hover:border-purple-500/30`}
                onMouseEnter={() => setActiveRepo(repo.name)}
                onMouseLeave={() => setActiveRepo(null)}
              >
                <div className="p-4 border-b border-white/10">
                  <div className="flex gap-2 flex-wrap mb-2">
                    {repo.technologies.map((tech, i) => (
                      <span 
                        key={i} 
                        className={`px-2 py-1 rounded-full text-xs font-medium
                          ${i % 4 === 0 ? 'bg-purple-500' : 
                          i % 4 === 1 ? 'bg-blue-500' : 
                          i % 4 === 2 ? 'bg-green-500' : 
                          'bg-red-500'} bg-opacity-80`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
                      {repo.name}
                    </h3>
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="text-white-50 text-sm">{repo.stars}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white-50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M7 7h10v10M7 17l10-10" />
                        </svg>
                        <span className="text-white-50 text-sm">{repo.forks}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-white-50 text-sm">{repo.description}</p>
                </div>
              </a>
            ))}
        </div>
        
        {/* Other repositories */}
        <div className="repo-grid mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {githubRepos
            .filter(repo => !repo.featured)
            .map((repo) => (
              <a 
                href={repo.url} 
                target="_blank" 
                rel="noopener noreferrer"
                key={repo.name}
                className="repo-card bg-gradient-to-br from-gray-900/30 to-gray-800/30 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 transition-all duration-300 hover:border-purple-500/30"
                onMouseEnter={() => setActiveRepo(repo.name)}
                onMouseLeave={() => setActiveRepo(null)}
              >
                <div className="p-6">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
                      {repo.name}
                    </h3>
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="text-white-50 text-sm">{repo.stars}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white-50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M7 7h10v10M7 17l10-10" />
                        </svg>
                        <span className="text-white-50 text-sm">{repo.forks}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-white-50 text-sm mb-4">{repo.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {repo.technologies.map((tech, i) => (
                      <span 
                        key={i} 
                        className={`px-2 py-1 rounded-full text-xs font-medium
                          ${i % 4 === 0 ? 'bg-purple-500' : 
                          i % 4 === 1 ? 'bg-blue-500' : 
                          i % 4 === 2 ? 'bg-green-500' : 
                          'bg-red-500'} bg-opacity-80`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </a>
            ))}
        </div>
        
        {/* GitHub stats */}
        <div className="mt-16 flex justify-center">
          <a 
            href="https://github.com/remiangelo" 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transition-all duration-300 font-bold flex items-center gap-3 shadow-lg shadow-purple-500/20"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            View All GitHub Projects
          </a>
        </div>
      </div>
    </section>
  );
};

export default Experience;
