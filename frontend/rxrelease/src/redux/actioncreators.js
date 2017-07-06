import Promise from 'bluebird'


export function SendMessage (message) {
    return function (dispatch) {
        setTimeout(function () {
            console.log(new Date(), 'Dispatch action now:')
            dispatch({
                type: 'GET_TIME_REQUEST',
                message
            })
        }, 2000)
    }
}


export function getTime(delay) {
  return {
    types: ['GET_TIME_REQUEST', 'GET_TIME_SUCCESS', 'GET_TIME_FAILURE'],
    promise: () => {
      return new Promise((resolve, reject) => {

        // Just simulating an async request to a server via a setTimeout
        setTimeout(() => {
              console.log("volgens mij werkt dit gewoo niet")
          const d = new Date()
          const ms = ('000' + d.getMilliseconds()).slice(-3)
          resolve({
            time: `${d.toString().match(/\d{2}:\d{2}:\d{2}/)[0]}.${ms}`
          })
        }, 1)
      })
    }
  }
}
