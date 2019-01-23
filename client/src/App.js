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
