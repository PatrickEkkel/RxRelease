

export function normalizeJson(json) {
  var data = null;
  if (json instanceof Array) {
      if(json.length != 0) {
      data = json[0];
      }
      else {
        data = null;
      }
  }
  else {
    data = json;
  }
  return data;
}
