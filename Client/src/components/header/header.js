import React from "react";
import { Link, NavLink } from "react-router-dom";
import TokenService from "../../services/token-service";
import IdleService from "../../services/idle-service";
import AppContext from "../../contexts/AppContext";
import Harold from "../images/Harold.jpg";

import "./header.css";

export default class Header extends React.Component {
  static contextType = AppContext;
  state = {
    loading: true,
    text: null,
    author: null,
  };

  handleLogoutClick = () => {
    TokenService.clearAuthToken();
    this.context.setAuthToken(null);
    TokenService.clearCallbackBeforeExpiry();
    IdleService.unRegisterIdleResets();
  };

  renderLogoutLink() {
    return (
      <div className="Header__logged-in">
        <NavLink exact to="/" className="hover" activeClassName="active">
          Home
        </NavLink>
        <> | </>
        <NavLink exact to="/about" className="hover" activeClassName="active">
          About
        </NavLink>
        <> | </>
        <NavLink to="/gallery" className="hover" activeClassName="active">
          Gallery
        </NavLink>
        <> | </>
        <Link onClick={this.handleLogoutClick} to="/" className="hover">
          Logout
        </Link>
      </div>
    );
  }

  renderLoginLink() {
    return (
      <div className="Header__not-logged-in">
        <NavLink exact to="/" className="hover" activeClassName="active">
          Home
        </NavLink>
        <> | </>
        <NavLink exact to="/about" className="hover" activeClassName="active">
          About
        </NavLink>
        <> | </>
        <NavLink to="/register" className="hover" activeClassName="active">
          Register
        </NavLink>
        <> | </>
        <NavLink to="/login" className="hover" activeClassName="active">
          Login
        </NavLink>
      </div>
    );
  }

  render() {
    console.log(this.context);
    return (
      <>
        <nav className="Header">
          <div className="Harold">
            <h1>Harold</h1>
            <div>
              <img id="Harold" src={Harold} alt="Harold" />
            </div>
          </div>

          {/* <div className="quote">
            {this.state.loading ? (
              <div>
                <img id="loading" src={loading} alt="loading" />
              </div>
            ) : (
              <div>
                <h3 className="text">{this.state.text}</h3>
                <h6 className="author">{this.state.author}</h6>
              </div>
            )}
          </div> */}

          {this.context.authtoken
            ? this.renderLogoutLink()
            : this.renderLoginLink()}
        </nav>
      </>
    );
  }
}
