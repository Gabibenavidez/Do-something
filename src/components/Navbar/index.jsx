import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './styles/navbar.scss';
import { UserContext } from '../../context/userContext';
import { NavbarLogo } from '../Logo';

const Navbar = () => {

  const { isLogged, setIsLogged } = useContext(UserContext);

  const handleSignOut = () => {
      localStorage.setItem('isLogged', false)
      setIsLogged(false)
      localStorage.removeItem('activitiestodo')
      localStorage.removeItem('randomActivity')
  }

  return (
    <nav className="navbar">
      <div className="navbar__logo">
        <NavbarLogo />
      </div>
      <div className="navbar__links">
        {isLogged &&
        <>
        <Link to="/home">Home</Link>
        <Link to="/activities">Activities</Link>
        </>}
        {!isLogged && 
        <>
        <Link to="/login">Login</Link>
        <Link to="/signup">Sign Up</Link>
        </>}
        {isLogged &&
        <Link to="/" onClick={handleSignOut}>Sign Out</Link>}
      </div>
    </nav>
  );
};

export default Navbar;
