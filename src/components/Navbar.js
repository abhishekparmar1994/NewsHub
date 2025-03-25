import React from 'react';
import { Link, useLocation } from 'react-router-dom'; // Import useLocation

const Navbar = (props) => {
  const location = useLocation(); // Get the current location

  const isActive = (path) => {
    return location.pathname === path ? 'nav-link active' : 'nav-link'; // Use location.pathname
  };

  return (
    <div>
      <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/general">NewsHub</Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className={isActive('/general')} aria-current="page" to="/general">General</Link>
              </li>
              <li className="nav-item">
                <Link className={isActive('/business')} aria-current="page" to="/business">Business</Link>
              </li>
              <li className="nav-item">
                <Link className={isActive('/entertainment')} aria-current="page" to="/entertainment">Entertainment</Link>
              </li>
              <li className="nav-item">
                <Link className={isActive('/science')} aria-current="page" to="/science">Science</Link>
              </li>
              <li className="nav-item">
                <Link className={isActive('/health')} aria-current="page" to="/health">Health</Link>
              </li>
              <li className="nav-item">
                <Link className={isActive('/sports')} aria-current="page" to="/sports">Sports</Link>
              </li>
              <li className="nav-item">
                <Link className={isActive('/technology')} aria-current="page" to="/technology">Technology</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;