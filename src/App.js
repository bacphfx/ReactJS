import React, { Component } from "react";
import "./App.css";
import Main from "./components/MainComponent";

import StaffList from "./components/StaffListComponent";

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <Main />;
  }
}

export default App;
