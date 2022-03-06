import Todo from './components/todo'
import React from 'react';
import './App.css';
import Header from './components/header';
import Body from './components/body'
import Modal from './components/modal'

function App() {
  return (
    <div className="App">
      <Header />
      <Body />
      <Modal />
    </div>
  );
}

export default App;
