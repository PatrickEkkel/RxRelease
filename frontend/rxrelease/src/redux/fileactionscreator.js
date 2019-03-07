import  * as fileRequests from '../rest/requests/filerequests'

export function getFileContents(file) {

  return function(dispatch) {
    fileRequests.getFileContent(file)
    .then(function(response) {
      var contents = response.data['data']
      dispatch(fileContentsLoaded(contents,file))
    })
  }
}
export function putFileContent(file, content) {

return function(dispatch) {
  fileRequests.putFileContent(file,content)
  .then(function(response) {
    var contents = response.data['data']
    dispatch(fileContentsLoaded(contents,file))
  })
}
}

export function fileContentsLoaded(contents,file) {
  return {
    type: 'FILE_CONTENTS_LOADED',
    contents: contents,
    selected_file: file
  }
}
