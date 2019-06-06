// NOTE ON UNCONVENTIONAL IMPLEMENTATION
// Usually, when using Redux, container components (that communicate with the store),
// are wrapped around presentational components, which simply render whatever
// props are passed to it, and do not communicate with the store. This is not done here.
// 
// STATEFUL REACT COMPONENT
// This is a stateful React component, which both handles presentation of HTML markup,
// and interactions with the store/dispatcher.
// (how state should map to props and how events should map to dispatches are described).
// See ./store.js for full notes on how state works in this app.
// 
// Below, a number of functions that allow UI interactivity for
// the ItemModal component are defined.
// (toggle, onChange, onSubmit)
// 
// The render method is part of how React works. Within it, the UI is created:
// React-Strap is used within the JSX.
// 
// mapStateToProps connects a part of the Redux state to the props 
// of the React component. It describes how to transform the current Redux
// store state into the props that will be passed back to the component
// when the action has been completed.
// 
// The Redux connect() method subscribes the component to the store.
// (Usually this would be generating a container component, however, in this case,
// this is both a container and presentational component. 


import React, { Component } from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input
} from 'reactstrap';
import { connect } from 'react-redux';
import { addItem } from '../actions/itemActions.js'

class ItemModal extends Component {
    // We set the initial state of the modal to closed.
    state = {
        modal: false,
        name: ''
    }

    // Because React automatically binds 'this' to class methods in the component API
    // (i.e. this is bound to the render method, componentDidMount, etc.)
    // it isn't mentioned explicitly in those methods.
    // However, in custom components, such as this one, 'this' is null by default,
    // so it must be bound to the component (its execution context).
    // However, because functional expressions use lexical scoping,
    // this is automatically bound to the execution context and so we
    // dont need to manually bind this in a constructor method. 
    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    }

    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    onSubmit = e => {
        e.preventDefault();

        const newItem = {
            name: this.state.name 
        }

        //Add item to Store via addItem action
        this.props.addItem(newItem)

        //Toggle the modal
        this.toggle();
    }

    render(){
        return(
            <div>
                <Button
                    color="dark"
                    style={{marginBottom: '2rem'}}
                    onClick={this.toggle}
                >Add Item</Button>

                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                >
                    <ModalHeader toggle={this.toggle}>Add To Shopping List</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for="item">Item</Label>
                                <Input
                                    type="text"
                                    name="name"
                                    id="item"
                                    placeholder="Add shopping item"
                                    onChange={this.onChange}
                                />
                                <Button
                                    color="dark"
                                    style={{marginTop: '2rem'}}
                                    block
                                >Add Item</Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}


const mapStateToProps = state => ({
    item: state.item
})


export default connect(
    mapStateToProps,
    { addItem }
    )(ItemModal)