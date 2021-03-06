// GENERAL NOTES
// (see ./components/itemModal.js for a more thorough discussion of structure).
// react-redux connect connects the React component with the Redux store.
// react-redux mapStateToProps connects a part of the Redux state 
// to the props of the React component. 
// allowing the connected React component to access the part of the Redux store it needs.
// react-transition-group adds fade function, it's configured in App.css
// Proptypes helps with type checking.
// 
// FUNCTIONALITY
// The component calls for a list



import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getItems, deleteItem } from '../actions/itemActions.js';
import PropTypes from 'prop-types';


class ShoppingList extends Component {
    componentDidMount(){
        this.props.getItems();
    }
    
    onDeleteClick = id => {
        this.props.deleteItem(id);
    }

    render() {
        const { items } = this.props.item;
        return(
            <Container>
                <ListGroup>
                    <TransitionGroup className="shopping-list">
                        {items.map(({ _id, name }) => (
                            <CSSTransition key={_id} timeout={500} classNames="fade">
                                <ListGroupItem>
                                <Button
                                color="danger"
                                size="small"
                                style={{marginRight: '0.5rem'}}
                                onClick={this.onDeleteClick.bind(this, _id)}
                                >&times;</Button>
                                {name}</ListGroupItem>
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                </ListGroup>
            </Container>  
        );
    }
}

ShoppingList.propTypes = {
    getItems: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired
}

const mapStateToProps = (props) => ({
    item: props.item
});

export default connect(mapStateToProps, 
    { getItems, deleteItem }
    )(ShoppingList);