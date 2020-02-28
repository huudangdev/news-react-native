import React, { Component } from 'react'

import { Provider } from 'react-redux'

import Router from './src/router'
import store from './src/redux/store'

export default class App extends Component {
  render () {
    return (
      <Provider store={store}>
        <Router />
      </Provider>
    )
  }
}
