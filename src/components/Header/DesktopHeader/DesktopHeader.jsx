import React, { useState, useEffect } from "react";
import "./styles.css";

function DesktopHeader() {
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);

  useEffect(() => {
    let prevScrollPos = window.pageYOffset;

    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      setIsHeaderVisible(prevScrollPos > currentScrollPos);
      prevScrollPos = currentScrollPos;
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={`header ${isHeaderVisible ? "visible" : "hidden"}`}>
      <div className="navbar__logo">
        <a href="/">Logo</a>
      </div>
      <div className="navbar__items">
        <a href="/" target="_blank">01.<span> Sobre</span></a>
        <a href="/" target="_blank">02.<span> Experiências</span></a>
        <a href="/" target="_blank">03.<span> Contato</span></a>
        <a href="/" target="_blank">04.<span> Trabalhos</span></a>
      </div>
    </div>
  );
}

export default DesktopHeader;