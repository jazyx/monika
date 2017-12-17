;(function loadError(monika){

  if (!monika) {
    monika = window.monika = {}
  }

  class Support {
    constructor() {
      // << HARD-CODED
      let successRate = 0.5
      this.trackLastNAttempts = 12
      // HARD-CODED >>

      this.successArray = []
      this.expected = this.trackLastNAttempts * successRate   
      this.listeners = {
        success: []
      , failure: []
      }

      // Ignoring errors
      this.paused = false
      this.skipCount = 0

      // Give the player the benefit of the doubt for at least the
      // first n * successRate attempts
      this.absolve()
    }


    absolve() {
      this.successArray.length = 0

      for ( let ii = 0; ii < this.trackLastNAttempts; ii += 1 ) {
        this.successArray[ii] = 1
      }
    }


    pause () {
      this.paused = true
    }


    resume () {
      this.paused = false
    }


    skip (errorCount) {
      // TODO?
    }


    forgive (errorCount) {
      let ii = this.successArray.length
      while (ii-- && errorCount) {
        if (!this.successArray[ii]) {
          this.successArray[ii] = 1
          errorCount -= 1
        }
      }
    }


    forget (errorCount) {
      let total = this.successArray.length
      for ( let ii = 0 ; ii < total && errorCount ; ii += 1 ) {
        if (!this.successArray[ii]) {
          this.successArray[ii] = 1
          errorCount -= 1
        }
      }
    }


    treatResult (result) {
      if (this.paused) {
        return
      }

      // TODO? Treat skip
      this.successArray.shift()
      this.successArray.push( result ? 1 : 0 )
      let listeners

      let successes = this.successArray.reduce(accumulator, 0)

      if (successes < this.expected) {
        listeners = this.listeners.failure
      } else {
        listeners = this.listeners.success
      }

console.log(this.successArray)

      this.callback(listeners)

      function accumulator(sum, value) {
        return sum + value
      }
    }


    callback(listeners) {
      listeners.forEach(listener => {
        listener(this)
      })
    }


    execute(instructions) {
      // instructions = {
      //   pause:   false // don't count errors until `resume` is called
      // , resume:  false // start counting errors again
      // , skip:    0     // ignore the next n errors
      // , absolve: false // reset successArray to all 1s
      // , forgive: 0     // replace the n most recent 0s with 1s
      // , forget:  0     // replace the n oldest 0s with 1s
      // }
      
      if (instructions.pause) {
        if (!instructions.resume) {
          this.pause()
        }
      } else if (instructions.resume) {
        this.resume()
      }

      if (instructions.skip) {
        this.skip(instructions.skip)
      }

      if (instructions.absolve) {
        this.absolve()
      } else if (instructions.forgive) {
        this.forgive(instructions.forgive)
      } else if (instructions.forget) {
        this.forget(instructions.forget)
      }
    }


    addEventListener(eventName, listener) {
      let listeners = this.listeners[eventName] || []
      if (listeners.indexOf(listener) < 0) {
        listeners.push(listener)
      }
    }


    removeEventListener(eventName, listener) {
      let listeners = this.listeners[eventName] || []
      if (listener === "all") {
        return listeners.length = 0
      }

      let index = listeners.indexOf(listener)

      if (index < 0) {
      } else {       
        listeners.slice(index, 1)
      }
    }
  }

  monika.support = new Support()

})(window.monika)