
import React, { Component } from 'react';
import Luckdraw from '@/containers/Luckdraw'
import "./App.css";


class App extends Component{
  render(){
    return(
      <div className='main-container'>
        <Luckdraw />
      </div>
    );
  }
}

export default App;