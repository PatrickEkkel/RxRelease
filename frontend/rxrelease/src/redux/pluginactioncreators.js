import Axios from 'axios';
import  * as jsonUtils from '../lib/json/utils'
import  * as moduleRequests from '../rest/requests/modulerequests'
import ModuleFactory from '../factories/modulefactory'
import Module from '../models/module'
import FactoryBuilder from '../factories/builder/factoryBuilder'

export function loadEnabledPlugins() {

  return function(dispatch) {
    moduleRequests.getEnabledModules().then(function(response) {
      var factory = new ModuleFactory()
      var factoryBuilder = new FactoryBuilder()
      var objectFactory = factoryBuilder.createObjectFactoryFromJson(response.data,Module)

      var plugins = objectFactory.createObjectListFromJson(response.data)
      dispatch(pluginsLoaded(plugins))
    });
  }
}

export function pluginsLoaded(plugins) {
  return {
    type: 'PLUGINS_LOADED',
    plugins: plugins
  }

}
