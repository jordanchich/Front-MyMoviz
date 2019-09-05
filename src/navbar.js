import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import logo from './logo.png';
import './App.css';
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Button,
  PopoverHeader,
  PopoverBody,
  Popover

} from 'reactstrap';

class MenuLogo extends Component {
  constructor(props) {
    super(props);

    this.toggle = this
      .toggle
      .bind(this);
    this.state = {
      popoverOpen: false
    };
  }

  toggle() {
    this.setState({
      popoverOpen: !this.state.popoverOpen
    });
  }
  render() {
    return (
      <div>

        <Navbar className="dark" dark expand="md">
          <NavbarBrand href="/"><img src={logo} alt="logo"/></NavbarBrand>
          <Nav className="ml-auto" navbar>
            <NavItem >
              <NavLink href="/components/">
                Last releases
              </NavLink>
            </NavItem>
            <NavItem >
              <NavLink href="https://github.com/reactstrap/reactstrap">
                My Movies
              </NavLink>
            </NavItem>
            <div>
              <Button id="Popover1" type="button" color="warning">
                11 Films
              </Button>
              <Popover
                placement="bottom"
                isOpen={this.state.popoverOpen}
                target="Popover1"
                toggle={this.toggle}>
                <PopoverHeader>Popover Title</PopoverHeader>
                <PopoverBody>Sed posuere consectetur est at lobortis. Aenean eu leo quam.
                  Pellentesque ornare sem lacinia quam venenatis vestibulum.</PopoverBody>
              </Popover>
            </div>
          </Nav>
        </Navbar>

      </div>
    );
  }
}



export default MenuLogo;
