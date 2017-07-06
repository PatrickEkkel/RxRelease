import { createStore, applyMiddleware, combineReducers } from 'redux'
import promiseMiddleware from 'redux-promise-middleware'
import * as reducers from './reducers'


export default function(data) {

  var thunkMiddleware = function ({ dispatch, getState }) {
      // console.log('Enter thunkMiddleware');
      return function(next) {
          // console.log('Function "next" provided:', next);
          return function (action) {
              // console.log('Handling action:', action);
              return typeof action === 'function' ?
                  action(dispatch, getState) :
                  next(action)
          }
      }
  }

  var reducer = combineReducers(reducers)
  var finalCreateStore = applyMiddleware(thunkMiddleware)(createStore)
  var store = finalCreateStore(reducer, data)

  return store
}
