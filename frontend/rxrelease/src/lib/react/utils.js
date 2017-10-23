
class Utils {
  constructor() {

  }


  static bindAttr(attrobject,attribute,value) {

    // if it contains a dot, it means we are dealing with a nested property
    if(attribute.contains(".")) {
      // unwind the property into an arraylist
       var properties =  attribute.split(".")

       var currentObject = null;
       for(var i=0;i<properties.length;i++) {
         var currentProp = properties[i]

         // get the next object in line
         if(currentObject == null) {
           currentObject = attrobject['get' + currentProp]();
         }
         else {
           currentObject = currentObject['get' + currentProp]();
         }
         // determine if we are at the end of the array
         // if current position plus one will end the loop, than call the set on that object
         if(!((i + 1) < properties.length)) {

           var methodName = currentProp.charAt(0).toUpperCase() + currentProp.slice(1);
           attrobject["set" + methodName](value)
         }


       }
    }
    else {


    var methodName = attribute.charAt(0).toUpperCase() + attribute.slice(1);
    attrobject["set" + methodName ](value)
    }

  }
}


export default Utils;
