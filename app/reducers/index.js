import { combineReducers } from 'redux'
import location from './location'
import toilet from './toilet'
import maincontrol from './maincontrol'

const rootReducer = combineReducers({
  location,
  toilet,
  maincontrol
})

export default rootReducer
