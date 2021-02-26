import React, { Component } from "react";
import TokenService from "../services/token-service";

const AppContext = React.createContext({
  authtoken: null,
  setAuthToken: () => {},
});

export default AppContext;

export class AppProvider extends Component {
  state = {
    authtoken: TokenService.getAuthToken(),
  };

  setAuthToken = (authtoken) => {
    this.setState({ authtoken });
  };

  render() {
    const value = {
      authtoken: this.state.authtoken,
      setAuthToken: this.setAuthToken,
    };

    return (
      <AppContext.Provider value={value}>
        {this.props.children}
      </AppContext.Provider>
    );
  }
}
