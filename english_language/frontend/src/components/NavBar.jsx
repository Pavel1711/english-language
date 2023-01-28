import React from 'react';

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light mb-5">
      <div className="container-fluid">
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className={`nav-link ${window.location.pathname === '/' ? 'active' : ''}`} aria-current="page" href="/">Home</a>
            </li>
            <li className="nav-item">
              <a className={`nav-link ${window.location.pathname === '/create/word/' ? 'active' : ''}`} href="/create/word/">Создать</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default NavBar
