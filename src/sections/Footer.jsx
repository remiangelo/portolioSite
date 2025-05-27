import { socialImgs } from "../constants";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Footer = () => {
  useGSAP(() => {
    gsap.fromTo(
      ".social-icon",
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, stagger: 0.1, duration: 0.5, ease: "back.out(1.7)" }
    );
  });

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="flex flex-col justify-center">
          <p className="text-white-50">Connect with me</p>
        </div>
        <div className="socials">
          {socialImgs.map((socialImg, index) => (
            <a 
              key={index} 
              href={socialImg.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="icon hover:scale-110 transition-transform duration-300 social-icon text-white text-2xl"
              aria-label={`Connect on ${socialImg.name}`}
            >
              <i className={`${socialImg.icon}`}></i>
            </a>
          ))}
        </div>
        <div className="flex flex-col justify-center">
          <p className="text-center md:text-end text-white-50">
            © {new Date().getFullYear()} Remi Beltram. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
