function createDebounce() {
  return function (callback, delay) {
    let timer

    return function(...args) {
      clearTimeout(timer)

      timer = setTimeout(() => {
        callback.apply(this, args)
      }, delay)
    }
  }
}

function createThrottle() {
  return function (callback, delay) {
    let isWaiting = false
    let savedThis = null
    let savedArgs = null
  
    return function wrapper(...args) {
      if (isWaiting) {
        savedThis = this
        savedArgs = args
        return
      }
  
      callback.apply(this, args)
      isWaiting = true
  
      setTimeout(() => {
        isWaiting = false
  
        if (savedThis) {
          wrapper.apply(savedThis, savedArgs)
          savedThis = null
          savedArgs = null
        }
      }, delay)
    }
  }
}

export { createDebounce, createThrottle }
