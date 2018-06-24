import React, { Component } from 'react';
import './Navbar.css';

  class Navbar extends Component {
    render() {
      return (
        <div onClick={this.props.onClick}className='NavbarContainer'>
          <div className="NavbarItemContainer">
            <p className="NavbarTitle"> Recipe List </p>
          </div>
          <div className="NavbarItemContainer">
            <p className="NavbarItem"> Home </p>
          </div>
        </div>
      )
    }
  }

export default Navbar;