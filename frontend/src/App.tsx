import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";

export default class Homepage extends Component {
  render() {
    return (
        <BrowserRouter>
            <div>
                <p>Hello World</p>
            </div>
        </BrowserRouter>
    );
  }
}
