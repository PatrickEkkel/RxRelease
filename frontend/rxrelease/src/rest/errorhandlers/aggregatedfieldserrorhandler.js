// Lets you handle errors of multiple Axios requests in one redux state
class AggregatedFieldsErrorHandler {

constructor() {
this.errors = []
}

addErrorResponse(error) {
this.errors.push(error)
}
// Returns true if there are errors to take care of
handleErrors(dispatch_type,dispatch) {

  var result = false;
  var error_fields = [];
  // first check if there are errors to handle
  if(this.errors.length > 0) {
    result = true;
    for(var i=0;i<this.errors.length;i++) {
     console.log(this.errors[i])
     var error_response = JSON.parse(this.errors[i].request.response)
     error_fields.push(error_response)
   }
    dispatch({
      type: dispatch_type,
      error_fields: error_fields
    })
 }

 return result
}
}

export default AggregatedFieldsErrorHandler;
