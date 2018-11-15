import { createStore, applyMiddleware, combineReducers } from 'redux'
import promiseMiddleware from 'redux-promise-middleware'
import * as reducers from './reducers'
import * as pluginReducers from '../plugins/plugin_reducers'


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
  const allReducers = Object.assign({}, reducers, pluginReducers);
  var reducer = combineReducers(allReducers)
  //var plugin_reducer = combineReducers(plugin_reducers)
  //reduceReducers(reducer,plugin_reducer)
  var finalCreateStore = applyMiddleware(thunkMiddleware)(createStore)
  var store = finalCreateStore(reducer, data)

  return store
}
