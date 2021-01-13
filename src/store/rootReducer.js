import { combineReducers } from 'redux'

import appReducer from '../modules/dashboard/redux/reducer'

const rootReducer = combineReducers({
  app: appReducer
})

export default rootReducer
