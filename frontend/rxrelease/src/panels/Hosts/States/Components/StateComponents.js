
export function renderStateAsString(item) {
  var result = null;
  if(item.type == "SIMPLE") {
    var installed = item.simple_state.installed
    var installedDisplayString = "NOT INSTALLED"
    if(installed) {
      installedDisplayString =  "INSTALLED"
    }
    result = [item.id,item.name,installedDisplayString];
  }
  return result
}
