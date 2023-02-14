import React, { useState, useEffect } from 'react';
import DesktopHeader from "./Header/DesktopHeader/DesktopHeader.jsx";
import MobileHeader from './Header/MobileHeader/MobileHeader';

const Header = () => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  return (
<div>
      {width >= 770 ? <DesktopHeader /> : <MobileHeader />}
    </div>
  );
};

export default Header;
