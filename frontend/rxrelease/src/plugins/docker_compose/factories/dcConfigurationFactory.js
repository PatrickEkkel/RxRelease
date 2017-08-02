import DcConfiguration from '../models/DcConfiguration';
class DcConfigurationFactory {

constructor() {

}


createDcConfigurationFromJson(json) {

var result = new DcConfiguration(json[0].id,json[0].dockercomposeyaml)

return result;


}

}

export default DcConfigurationFactory;
