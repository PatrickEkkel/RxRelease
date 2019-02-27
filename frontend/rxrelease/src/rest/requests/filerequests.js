import Axios from 'axios';
import GlobalSettings from '../../config/global'
import LogFactory from '../../logging/LogFactory'



var frLogger = new LogFactory().createLogger("FILES","REQUESTS")
var settings = new GlobalSettings();


export function postFile(file) {

var backend_url = GlobalSettings.getBackendUrl();

return Axios.post(backend_url + '/rxbackend/files/',{
  filename: file.getFilename(),
  path: file.getPath(),
})

}
