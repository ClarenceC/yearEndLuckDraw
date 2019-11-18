// let hello : string = 'Hello  TypeScript'

// document.querySelectorAll('.app')[0].innerHTML = hello

import React from 'react'
import ReactDom from 'react-dom'
import App from "./App"
import "./assets/styles/reset.css"

ReactDom.render(<App />, document.querySelectorAll('.app')[0])