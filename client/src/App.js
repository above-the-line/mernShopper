// HOW DOES REACT WORK
// React is based on the Facebook Flux Architecture.
// It's not MVC, it's a strange blend of V and C.
// The view is comprised of components which contain business logic within them
// (see ./components/ and how components are mounted onto the main app below).
// When the end-user interacts with the view in a way that will change app state,
// that particular component emits an action (calls a function with a call-back),
// and a React Service,
// (originally the Dispatcher, but since we are using Redux, just the Store)
// dispatches the updated state to the registered callback (the component),
// which re-renders itelf/view.
// This can happen without reloading the web page because React uses a 
// virtual DOM (a rendition of the initial state PLUS all subsequent state changes).
// Data flows one way in React, and so the Store service passes data to its
// children (the components that have subscribed to it) through Props,
// once the action has completed (traditionally actions are synchronous).
// There are two types of components: stateful components (like ./components/ItemModal.js),
// which has it's own state of being opened/closed.
// and stateless (pure functions) (like ./components/ShoppingList.js),
// which just displays a DB query and doesn't have its own state.
//  
// WHAT IS REDUX
// Importing react-redux library below, efficiently binds Redux and React. 
// Redux uses ONE global object, the Redux Store, to manage state for the whole app.
// The store combines the rootReducer, any middleware (Thunk in our case),
// and allows for actions to be dispatched. (see /.store.js)
// Redux's <Provider /> component wraps the entire
// application and passes the store down to all children (components).
// Redux state is passed to components as props.
// 
// WHAT IS THUNK
// Usually, React actions return simple objects which the store uses
// to produce the new state.
// One way data flow demands React actions be pure functions.
// To allow end-users to interact with remote services (APIs, DBs, etc.)
// asynchronous actions (i.e. async functions) are required.
// Thunk midleware listens to actions and if the dispatch call
// returns a function, promise or even another action (which is a function), 
// then, Thunk will execute the function and notify the store of
// the result when ready.
// This way, the action creator becomes a thunk.
// 
// BOOTSTRAP AND REACTSTRAP
// Vanilla Twitter Bootstrap and the the React port React-Strap are used
// to style the UI.


import React, { Component } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import AppNavbar from './components/AppNavbar.js'
import ItemModal from './components/ItemModal.js'
import ShoppingList from './components/ShoppingList.js'

import { Container } from 'reactstrap';
import { Provider } from 'react-redux';
import store from './store.js'

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
            <AppNavbar />
            <Container>
              <ItemModal />
              <ShoppingList />
            </Container>
        </div>
      </Provider>
    );
  }
}

export default App;
