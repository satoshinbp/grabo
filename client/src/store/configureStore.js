import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import authReducers from '../reducers/authReducers'

export default () => {
  const store = createStore(
    combineReducers({
      auth: authReducers,
    }),
    applyMiddleware(thunk)
  )

  return store
}
