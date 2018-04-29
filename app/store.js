import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import reducers from '../app/reducers/index' //Import the reducer

export default createStore(reducers, applyMiddleware(thunk))

