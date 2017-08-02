import Configuration from '../models/configuration'


class ConfigurationFactory {


createConfigurationFromArray(array) {

 // 0 is Id, 1 is name
 var newConfiguration = new Configuration(array[0],array[1]);
 return newConfiguration;

}


}

export default ConfigurationFactory
