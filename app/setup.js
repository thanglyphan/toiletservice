import React, { Component } from 'react'
import { Provider } from 'react-redux'

import store from '../app/store'
import Navigation from '../app/components/navigation/Navigation'
import firebase from 'firebase'

function setup() {
  class Root extends Component {
    componentWillMount() {
      firebase.initializeApp({
        apiKey: 'AIzaSyBhEE653TZ1LSUzQCAKF7a1fVQcK4yvH08',
        authDomain: 'toiletserviceudp-5db1f.firebaseapp.com',
        databaseURL: 'https://toiletserviceudp-5db1f.firebaseio.com',
        projectId: 'toiletserviceudp-5db1f',
        storageBucket: '',
        messagingSenderId: '124590936401'
      })
    }
    render() {
      return (
        <Provider store={store}>
          <Navigation />
        </Provider>
      )
    }
  }

  return Root
}

module.exports = setup
