
import React, { Component } from 'react';
import Luckdraw from '@/containers/Luckdraw'
import styles from "./App.css";


class App extends Component{
  render(){
    return(
      <div className={styles['main-container']}>
        <Luckdraw />
      </div>
    );
  }
}

export default App;