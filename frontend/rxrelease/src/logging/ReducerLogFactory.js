import LogFactory from './LogFactory';

class ReducerLogFactory extends LogFactory {

 writeReducerAction(reducerName,state,action) {
  var logger =   this.createLogger('REDUCER',reducerName);
  logger.debug('_' + reducerName.toLowerCase() +  ' reducer called with state: ' + state.type + ' and action: ' + action.type);
  logger.traceObject(state)
  logger.traceObject(action)
 }
}

export default ReducerLogFactory;
