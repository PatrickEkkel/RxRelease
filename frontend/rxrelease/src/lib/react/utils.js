
class Utils {
  constructor() {

  }


  static bindAttr(attrobject,attribute,value) {
    var methodName = attribute.charAt(0).toUpperCase() + attribute.slice(1);
    attrobject["set" + methodName ](value)
  }
}


export default Utils;
