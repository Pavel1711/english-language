import React from 'react';
import classNames from 'classnames';
import { navigation } from '../constants/nav.js';

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light mb-5">
      <div className="container-fluid">
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {navigation.map((item) => (
              <li className="nav-item" key={item.title}>
                <a className={classNames('nav-link', {
                  'active': window.location.pathname === item.path
                })} aria-current="page" href={item.path}>{item.title}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default NavBar
