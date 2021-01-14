import React from "react";
import { Link } from "react-router-dom";
import { Dropdown } from "react-bootstrap";

export default function NavBar() {
    return (
        <div className="navBar">
          <ul>
            <li>
              <Link to="/">Search</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                Dropdown Button
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <li>
              <Link to="/userProfile">User Profile</Link>
            </li>
          </ul>
        </div>
    );
}