// STATEFUL REACT COMPONENT
// See ./store.js for full notes on how state works in React.
// See /components/ItemModal.js for unconventionality of implementation
// (how container and presentational components are being blended below).
//  
// IMPORTS
// The UI is created with a Twitter Bootstrap port, called ReactStrap.
// 
// FUNCTIONALITY
// The navbar collapses on mobile phone displays. This functionality
// comes free with Bootstrap. The toggle is set to closed on page load.

import React, { Component } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Container    
} from 'reactstrap';

class AppNavbar extends Component {
    state = {
        isOpen: false
    }

    // Because React automatically binds 'this' to class methods in the component API
    // (i.e. this is bound to the render method, componentDidMount, etc.)
    // it isn't mentioned explicitly in those methods.
    // However, in custom components, 'this' is null by default,
    // so it must be bound to the component here.
    // However, because functional expressions use lexical scoping,
    // this is automatically bound to the execution context and so we
    // dont need to manually bind this in a constructor method. 
    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render(){
        return (
           <Navbar color="dark" dark expand="md" className="mb-5">
            <Container>
                <NavbarBrand href="/">ShoppingList</NavbarBrand>
                <NavbarToggler onClick={this.toggle} />
                <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <NavLink href="https://www.google.com/maps/search/groceries/@currentlocation">Nearby Shops</NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Container>
           </Navbar>
        )
    }
}

export default AppNavbar;