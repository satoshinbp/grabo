import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import userReducers from '../reducers/userReducers'

export default () => {
  const store = createStore(
    combineReducers({
      user: userReducers,
    }),
    applyMiddleware(thunk)
  )

  return store
}
