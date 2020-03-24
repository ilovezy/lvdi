import React from 'react'
import { HashRouter, Route } from 'react-router-dom'
import HomeView from './view/HomeView'
import PreviewView from './view/PreviewView'

function App() {
  return <HashRouter>
    <Route path="/" exact component={PreviewView} />
    <Route path="/preview" component={HomeView} />
  </HashRouter>
}

export default App
