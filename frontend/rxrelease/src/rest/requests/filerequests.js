import Axios from 'axios';
import GlobalSettings from '../../config/global'
import LogFactory from '../../logging/LogFactory'



var frLogger = new LogFactory().createLogger("FILES","REQUESTS")
var settings = new GlobalSettings();



export function getFileContent(file) {
  var backend_url = GlobalSettings.getBackendUrl();
  return Axios.get(backend_url + '/rxbackend/files/download?path=' + file.getPath() + '&filename=' + file.getFilename())
}

export function putFileContent(file,contents) {
  var backend_url = GlobalSettings.getBackendUrl();
  frLogger.trace('updated file object')
  frLogger.traceObject(file)
  return Axios.put(backend_url + '/rxbackend/files/update/',{
    filename: file.getFilename(),
    path: file.getPath(),
    content: contents
  })

}

export function postFile(file) {

var backend_url = GlobalSettings.getBackendUrl();

return Axios.post(backend_url + '/rxbackend/files/',{
  filename: file.getFilename(),
  path: file.getPath(),
})

}
