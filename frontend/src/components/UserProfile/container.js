import React, { Component } from "react";
import UserProfile from "./presenter";

class Container extends Component {
  render() {
    return (
      <UserProfile
        {...this.props}
        {...this.state}
      />
    );
  }
}

export default Container;
