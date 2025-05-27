import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";

import AnimatedCounter from "../components/AnimatedCounter";
import Button from "../components/Button";
import { words } from "../constants";
import HeroExperience from "../components/models/hero_models/HeroExperience";

const Hero = () => {
  const subtitleRef = useRef(null);
  const nameRef = useRef(null);
  const [cursorVisible, setCursorVisible] = useState(true);
  
  // Cursor blinking effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setCursorVisible(prev => !prev);
    }, 500);
    
    return () => clearInterval(cursorInterval);
  }, []);
  
  useGSAP(() => {
    // Create a main timeline for better synchronization and performance
    const mainTimeline = gsap.timeline({
      defaults: {
        ease: "power3.out",
        force3D: true, // Enable hardware acceleration
      }
    });
    
    // Animate the main heading with a more dramatic effect
    mainTimeline.fromTo(
      ".hero-text h1",
      { y: 80, opacity: 0, rotationX: 20 },
      { y: 0, opacity: 1, rotationX: 0, stagger: 0.2, duration: 0.8 },
      0
    );
    
    // Animate name with glitch effect
    mainTimeline.fromTo(
      nameRef.current,
      { x: -100, opacity: 0, skewX: 10 },
      { 
        x: 0, 
        opacity: 1, 
        skewX: 0, 
        duration: 0.8, 
        ease: "elastic.out(1, 0.3)"
      },
      0.3
    );
    
    // Add glitch effect after name animation completes
    const glitchTimeline = gsap.timeline({repeat: -1, repeatDelay: 5});
    glitchTimeline.to(nameRef.current, {x: 3, skewX: 4, duration: 0.08, ease: "none"});
    glitchTimeline.to(nameRef.current, {x: -3, skewX: 0, duration: 0.08, ease: "none"});
    glitchTimeline.to(nameRef.current, {x: 0, skewX: -4, duration: 0.08, ease: "none"});
    glitchTimeline.to(nameRef.current, {x: 0, skewX: 0, duration: 0.08, ease: "none"});
    
    // Animate the skills tag cloud with staggered popping effect
    mainTimeline.fromTo(
      ".skill-tag",
      { scale: 0, opacity: 0, rotation: -5 },
      { 
        scale: 1, 
        opacity: 1, 
        rotation: 0,
        stagger: 0.05, 
        duration: 0.4, 
        ease: "back.out(2.5)" 
      },
      0.5
    );
    
    // Animate subtitle with typewriter effect
    mainTimeline.fromTo(
      subtitleRef.current,
      { width: 0, opacity: 1 },
      { width: "100%", opacity: 1, duration: 1.5, ease: "steps(40)" },
      0.8
    );
    
    // Create a spotlight effect on the hero section
    gsap.to(".hero-spotlight", {
      opacity: 0.7,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
  }, { scope: "hero" });
  
  // Floating animation for the skill tags with more variety - optimized for performance
  useEffect(() => {
    const tags = document.querySelectorAll('.skill-tag');
    
    // Create a single timeline for all floating animations to improve performance
    const floatingTimeline = gsap.timeline();
    
    tags.forEach((tag, index) => {
      // Use consistent values based on index for better performance
      const yOffset = Math.sin(index * 0.5) * 8;
      const xOffset = Math.cos(index * 0.7) * 4;
      const rotationValue = (index % 4 - 2) * 0.8;
      const duration = 1.5 + (index % 3) * 0.5;
      
      // Add to timeline with consistent easing
      floatingTimeline.to(tag, {
        y: yOffset,
        x: xOffset,
        rotation: rotationValue,
        duration: duration,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        force3D: true, // Enable hardware acceleration
      }, index * 0.05); // Slight stagger for natural feel but not too much delay
    });
    
    // Cleanup function
    return () => {
      floatingTimeline.kill();
    };
  }, []);

  return (
    <section id="hero" className="relative overflow-hidden">
      {/* Background with added effects */}
      <div className="absolute top-0 left-0 z-10 w-full h-full">
        <img src="/images/bg.png" alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/50 to-blue-900/50 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        
        {/* Animated spotlight effect */}
        <div className="hero-spotlight absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-gradient-radial from-purple-500/20 to-transparent opacity-0"></div>
        
        {/* Particle effect dots */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 20 }).map((_, i) => (
            <div 
              key={i} 
              className="absolute bg-white rounded-full opacity-30 animate-pulse"
              style={{ 
                width: `${Math.random() * 4 + 1}px`, 
                height: `${Math.random() * 4 + 1}px`,
                top: `${Math.random() * 100}%`, 
                left: `${Math.random() * 100}%`,
                animationDuration: `${Math.random() * 5 + 2}s`,
                animationDelay: `${Math.random() * 5}s`
              }}
            ></div>
          ))}
        </div>
      </div>

      <div className="hero-layout relative z-20 grid grid-cols-1 xl:grid-cols-2 gap-10">
        {/* LEFT: Hero Content */}
        <header className="flex flex-col justify-center md:w-full w-screen md:px-10 px-5">
          <div className="flex flex-col gap-7">
            {/* Main heading with cyberpunk style */}
            <div className="hero-text">
              <h1 className="text-shadow-glow">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">HACKING</span>
                <span className="slide">
                  <span className="wrapper">
                    {words.map((word, index) => (
                      <span
                        key={index}
                        className="flex items-center md:gap-3 gap-1 pb-2"
                      >
                        <img
                          src={word.imgPath}
                          alt="skill icon"
                          className="xl:size-12 md:size-10 size-7 md:p-2 p-1 rounded-full bg-white-50 shadow-glow"
                        />
                        <span className="text-shadow-neon">{word.text}</span>
                      </span>
                    ))}
                  </span>
                </span>
              </h1>
              <h1 className="text-shadow-glow">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">INTO DIGITAL</span>
              </h1>
              <h1 className="text-shadow-glow">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">MASTERPIECES</span>
              </h1>
            </div>

            {/* Animated name with cyberpunk theme */}
            <div className="glitch-container relative my-3">
              <div ref={nameRef} className="text-2xl md:text-4xl font-extrabold tracking-wide">
                <span className="text-white">[</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-blue-500 to-purple-600 animate-gradient px-1">REMI_BELTRAM</span>
                <span className="text-white">]</span>
                <span className={`cursor inline-block h-8 w-[2px] ml-1 bg-purple-500 ${cursorVisible ? 'opacity-100' : 'opacity-0'}`}></span>
              </div>
              <div className="glitch-effect absolute top-0 left-0 right-0 opacity-50 text-2xl md:text-4xl font-extrabold tracking-wide text-red-500 translate-x-[1px] translate-y-[1px]">[REMI_BELTRAM]</div>
            </div>

            {/* Subtitle with typewriter effect */}
            <div className="overflow-hidden whitespace-nowrap">
              <p ref={subtitleRef} className="text-white-50 md:text-xl relative z-10 typewriter-text">
                //:FULL-STACK DEVELOPER // SECURITY SPECIALIST // METALCORE ENTHUSIAST
              </p>
            </div>
            
            {/* Skills tags with enhanced styling */}
            <div className="flex flex-wrap gap-3 mt-2 mb-6">
              {['React', 'Node.js', 'Three.js', 'Python', 'Go', 'Rust', 'Security', 'Web3'].map((skill, index) => (
                <span 
                  key={index} 
                  className={`skill-tag text-xs md:text-sm px-4 py-1.5 rounded-lg 
                    ${index % 4 === 0 ? 'bg-gradient-to-r from-purple-600 to-purple-500' : 
                      index % 4 === 1 ? 'bg-gradient-to-r from-blue-600 to-blue-500' : 
                      index % 4 === 2 ? 'bg-gradient-to-r from-green-600 to-green-500' :
                      'bg-gradient-to-r from-red-600 to-red-500'} 
                    shadow-neon border border-white/20 text-white font-bold tracking-wider transform hover:scale-110 transition-transform`}
                >
                  {skill}
                </span>
              ))}
            </div>

            {/* Enhanced CTA button */}
            <Button
              text="EXPLORE MY WORLD"
              className="md:w-80 md:h-16 w-60 h-12 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-glow border border-white/10 font-bold tracking-widest"
              id="counter"
            />
          </div>
        </header>

        {/* RIGHT: 3D Model or Visual with enhanced effects */}
        <figure className="relative h-[600px] w-full xl:h-full">
          <div className="relative w-full h-full">
            {/* Add glow effect around the 3D model */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-full filter blur-xl opacity-70 animate-pulse-slow"></div>
            <HeroExperience />
          </div>
        </figure>
      </div>

      {/* Custom styling for animated counter */}
      <div className="relative z-30">
        <AnimatedCounter />
      </div>
      
      {/* Add CSS for the new effects */}
      <style jsx>{`
        .text-shadow-glow {
          text-shadow: 0 0 10px rgba(255, 255, 255, 0.5), 0 0 20px rgba(138, 43, 226, 0.3);
        }
        
        .text-shadow-neon {
          text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 15px #0073e6, 0 0 20px #0073e6;
        }
        
        .shadow-glow {
          box-shadow: 0 0 10px rgba(138, 43, 226, 0.5), 0 0 20px rgba(0, 115, 230, 0.3);
        }
        
        .shadow-neon {
          box-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 15px #0073e6, 0 0 20px #0073e6;
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s linear infinite;
        }
        
        .animate-pulse-slow {
          animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        
        .typewriter-text {
          border-right: 2px solid rgba(255, 255, 255, 0.75);
          white-space: nowrap;
          overflow: hidden;
        }
        
        .glitch-effect {
          clip: rect(0, 900px, 0, 0);
          animation: glitch 3s infinite linear alternate-reverse;
        }
        
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes glitch {
          0% { clip: rect(44px, 9999px, 98px, 0); }
          5% { clip: rect(74px, 9999px, 90px, 0); }
          10% { clip: rect(64px, 9999px, 98px, 0); }
          15% { clip: rect(54px, 9999px, 56px, 0); }
          20% { clip: rect(84px, 9999px, 27px, 0); }
          25% { clip: rect(34px, 9999px, 23px, 0); }
          30% { clip: rect(14px, 9999px, 92px, 0); }
          100% { clip: rect(0, 0, 0, 0); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 0.8; }
        }
      `}</style>
    </section>
  );
};

export default Hero;
