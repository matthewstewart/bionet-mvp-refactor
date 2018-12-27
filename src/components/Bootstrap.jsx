import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './Bootstrap.scss';

/****************************************************************/
/* Grid                                                         */
/****************************************************************/
export const ContainerFluid = class ContainerFluid extends Component {
  render() {
    return (
      <div className="container-fluid">
        {this.props.children}
      </div>
    );
  }
}

export const Container = class Container extends Component {
  render() {
    let classes = "container";
    return (
      <div className={classes}>
        {this.props.children}
      </div>
    );
  }
}

export const Row = class Row extends Component {
  render() {
    let classes = "row";
    if (this.props.alignItems) {
      classes += ` align-items-${this.props.alignItems}`;
    }
    if (this.props.className) { classes += ` ${this.props.className}` }
    return (
      <div className={classes}>
        {this.props.children}
      </div>
    );
  }
}

export const Column = class Column extends Component {
  render() {
    let classes = "";
    if (this.props.col) { 
      classes += `col-${this.props.col}`
    } else {
      classes += 'col-12'
    }
    if (this.props.colSm) { classes += ` col-sm-${this.props.colSm}`}
    if (this.props.colMd) { classes += ` col-md-${this.props.colMd}`}
    if (this.props.colLg) { classes += ` col-lg-${this.props.colLg}`}
    if (this.props.colXl) { classes += ` col-xl-${this.props.colXl}`}
    if (this.props.alignSelf) { classes += ` align-self-${this.props.alignSelf}`}
    if (this.props.className) { classes += ` ${this.props.className}` }
    return (
      <div className={classes}>
        {this.props.children}
      </div>
    );
  }
}


/****************************************************************/
/* Navbar                                                       */
/****************************************************************/
export const Navbar = class Navbar extends Component {
  render() {
    let classes = "navbar navbar-expand-lg";
    if (this.props.dark) { classes += ' navbar-dark bg-dark' } else { classes += ' navbar-light bg-light' };
    if (this.props.className) { classes += ` ${this.props.className}` }
    return (
      <nav className={classes}>
        {this.props.children}
      </nav>
    );
  }
}

export const NavbarBrand = class NavbarBrand extends Component {
  render() {
    let classes = "navbar-brand";
    if (this.props.className) { classes += ` ${this.props.className}` }
    return (
      <NavLink className={classes} to={this.props.to || '/'}>
        {(this.props.imgSrc) ? (
          <>
            <img 
              src={this.props.imgSrc} 
              width={this.props.width || "30"} 
              height="30" 
              alt={this.props.imgAlt}
              className="mr-3"
            />
            {this.props.children}
          </>
        ) : (
          <>
            {this.props.children}
          </>
        )}
      </NavLink>
    );
  }
}

export const NavbarNav = class NavbarNav extends Component {
  render() {
    let classes = "collapse navbar-collapse";
    let navClasses = "navbar-nav";
    if (this.props.left) { navClasses += ' mr-auto'; }
    if (this.props.right) { navClasses += ' ml-auto'; }
    if (this.props.className) { classes += ` ${this.props.className}` }
    return (
      <>
        <div className={classes} id={this.props.id}>
          <ul className={navClasses}>
            {this.props.children}
          </ul>
        </div>
      </>
    );
  }      
}

export const NavbarLink = class NavbarLink extends Component {
  render() {
    let liClasses = "nav-item";
    let linkClasses = "nav-link";
    if (this.props.active) { liClasses += ' active' }
    if (this.props.disabled) { linkClasses += ' disabled' }
    if (this.props.className) { liClasses += ` ${this.props.className}` }
    return (
      <li className={liClasses}>
        <NavLink to={this.props.to} className={linkClasses}>
          {this.props.children}
        </NavLink>
      </li>
    );
  }      
}

export const NavbarDropdown = class NavbarDropdown extends Component {
  render() {
    let classes = "nav-item dropdown";
    let iconClasses = "";
    if (this.props.className) { classes += ` ${this.props.className}` }
    let hasIcon = this.props.icon && this.props.icon.length > 0;
    if (hasIcon) { iconClasses += `text-lg mdi mdi-${this.props.icon} mr-1` }
    return (
      <li className={classes}>
        <a 
          className="nav-link dropdown-toggle text-capitalize" 
          href="/"
          id={this.props.id}
          role="button"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          {(hasIcon) ? (
            <i className={iconClasses} />
          ) : null }
          {this.props.label}
        </a>
        <div 
          className="dropdown-menu"
          aria-labelledby={this.props.id}
        >
          {this.props.children}
        </div>
      </li>
    );
  }      
}

export const NavbarDropdownLink = class NavbarDropdownLink extends Component {
  render() {
    let classes = "dropdown-item";
    if (this.props.className) { classes += ` ${this.props.className}` }
    return (
      <NavLink to={this.props.to} className={classes}>
        {this.props.children}
      </NavLink>
    );
  }      
}

export const NavbarToggle = class NavbarToggle extends Component {
  render() {
    let target = this.props.target;
    let classes = "navbar-toggler";
    if (this.props.className) { classes += ` ${this.props.className}` }
    return (
      <button 
        className={classes}
        type="button" 
        data-toggle="collapse"
        data-target={`#${target}`} 
        aria-controls={target} 
        aria-expanded="false" 
        aria-label="Toggle Navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
    );
  }      
}


/****************************************************************/
/* Card                                                         */
/****************************************************************/
export const Card = class Card extends Component {
  render() {
    let classes = "card rounded-0";
    if (this.props.dark) { classes += ` border border-secondary` }
    if (this.props.className) { classes += ` ${this.props.className}` }
    return (
      <div
        className={classes}
      >
        {this.props.children}
      </div>
    );
  }
}
export const CardHeader = class CardHeader extends Component {
  render() {
    let classes = "card-header rounded-0";
    if (this.props.dark) { classes += ` bg-dark text-light` }
    if (this.props.className) { classes += ` ${this.props.className}` }
    return (
      <div
        className={classes}
      >
        {this.props.children}
      </div>
    );
  }
}

export const CardTitle = class CardTitle extends Component {
  render() {
    let classes = "card-title mb-0 text-capitalize";
    if (this.props.className) { classes += ` ${this.props.className}` }
    if (this.props.noHeading) {
      return (
        <div
          className={classes}
        >
          {this.props.children}
        </div>
      );
    } else {
      return (
        <h4
          className={classes}
        >
          {this.props.children}
        </h4>
      );
    }
  }
}

export const CardBody = class CardBody extends Component {
  render() {
    let classes = "card-body";
    if (this.props.className) { classes += ` ${this.props.className}` }
    return (
      <div
        className={classes}
      >
        {this.props.children}
      </div>
    );
  }
}

export const CardText = class CardText extends Component {
  render() {
    let classes = "card-text";
    if (this.props.className) { classes += ` ${this.props.className}` }
    return (
      <p
        className={classes}
      >
        {this.props.children}
      </p>
    );
  }
}

export const CardList = class CardList extends Component {
  render() {
    let classes = "list-group list-group-flush";
    if (this.props.className) { classes += ` ${this.props.className}` }
    return (
      <ul
        className={classes}
      >
        {this.props.children}
      </ul>
    );
  }
}

export const CardListLink = class CardListLink extends Component {
  render() {
    let classes = "list-group-item list-group-item-action rounded-0";
    if (this.props.dark) { classes += ' text-light' }
    if (this.props.type) { classes += ` bg-${this.props.type}` }
    if (this.props.className) { classes += ` ${this.props.className}` }
    return (
      <NavLink
        className={classes}
        to={this.props.to}
      >
        {this.props.children}
      </NavLink>
    );
  }
}


/****************************************************************/
/* Breakpoint Reference                                         */
/****************************************************************/

/* Small devices (landscape phones, 576px and up) */
// @media (min-width: 576px) {}

/* Medium devices (tablets, 768px and up) */
// @media (min-width: 768px) {}

/* Large devices (desktops, 992px and up) */
// @media (min-width: 992px) {}

/* Extra large devices (large desktops, 1200px and up) */
// @media (min-width: 1200px) {}