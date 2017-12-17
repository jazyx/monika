;(function loadKeyboard(monika){

  // monika is assumed to exist and to contain a mobileKeyboard
  // instance with and `addEventListener` method. An instance of
  // CustomKeyboard will listen for `resize` and `keyboardchange`
  // events, and alter the classes on the <footer> element
  // accordingly.

  class CustomKeyboard {
    constructor () {
      // << HARD-CODED 
      this.doneDelay = 1000
      this.inputDelay = 500
      // HARD-CODED >>

      // Touchscreen?
      this.isTouchScreen = 'ontouchstart' in document.documentElement

      // HTML elements
      this.footer = document.querySelector("footer")
      this.frame = document.getElementById("frame")
      this.keyboard = this.footer.querySelector("div.keyboard")
      this.keys = [].slice.apply(
        this.keyboard.querySelectorAll("li:not(:empty)")
      )
      this.model = document.querySelector("footer input[name=model]")
      this.input = document.querySelector("footer input[name=input]")

      // Keyboard input
      this.keyMap = this._getKeyMap()

      let type = this.type.bind(this)
      this.keyboard.onmousedown = this.keyboard.ontouchstart = type
      this.input.onkeydown = this.keydown.bind(this)

      // Expected input
      this.expected = ""
      this.highlightNext = true
      this.options = {}

      // Listeners
      // let keyboardchange = this.keyboardchange.bind(this)
      // monika.mobileKeyboard.addEventListener("keyboardchange", keyboardchange)
      let transitionend = this.transitionend.bind(this)
      this.footer.addEventListener("transitionend", transitionend)
      this.ignoreTransitions = true
    }

    _getKeyMap() {
      let map = {}
      this.keys.forEach((keyElement) => {
        map[keyElement.id] = keyElement
      })

      return map
    }

    // LISTENERS //

    // keyboardchange(state, dimensions) {
    //   this.log("keyboardchange: " + state + " " + JSON.stringify(dimensions))
    // }
    

    transitionend(event) {
      // console.log(event)

      if (this.ignoreTransitions) {
        return
      }

      if (event.propertyName === "bottom") {
        this.callback("open")

        this.ignoreTransitions = true
      }
    }


    callback(message) {
      if (this.options.callback) {
        this.options.callback(message)
      }
    }


    // GUIDED TYPING //

    enableKeys(keyString) {
      this.keys.forEach((key) => {
        var disabled

        let id = key.id
        if (id === "space") {
          id = " "
        }

        if (keyString) {
          disabled = keyString.indexOf(id) < 0
        }

        if (disabled) {
          key.classList.add("disabled")
        } else {
          key.classList.remove("disabled")
        }
      })
    }


    highlightKey(char) {
      this.keys.forEach((key) => {
        let id = key.id
        if (id === "space") {
          id = " "
        }

        if (id === char) {
          key.classList.add("highlight")
        } else {
          key.classList.remove("highlight")
        }
      })
    }


    expectString(string, options) {
      if (!options) {
        options = {}
      }

      options = Object.assign(
        {
          highlightNext: true
        , enableKeys: true
        , showModel: true
        }
      , options
      )

      this.input.value = ""
      this.expected = string
      this.highlightNext = !!options.highlightNext

      if (options.enableKeys) {
        this.enableKeys(string)
      } else {
        this.enableKeys()
      }

      if (this.highlightNext) {
        this.highlightKey(string[0])
      } else {
        this.highlightKey()
      }

      if (options.showModel) {
        this.model.value = string
      }
    }


    updateExpectations(key) {
      if (!this.expected) {
        return false
      } else if (key !== this.expected[0]) {
        return false
      }

      this.expected = this.expected.substring(1)

      if (!this.expected) {
        this.done()

      } else if (this.highlightNext) {
        this.highlightKey(this.expected[0])
      }

      return true
    }


    /**
     * Sets the input cue.
     *
     * @param      {object}  options  { htmlElement: <item to show>
     *                                , string:      <string to type>
     *                                , options: {
     *                                    highlightNext: true
     *                                  , enableKeys: true
     *                                  , showModel: true
     *                                  }
     *                                , audio:       <url>
     *                                , callback:    <function>
     *                                }
     */
    setInputCue(options) {
      this.options = options

      let child
      while (child = this.frame.firstChild) {
        child.remove()
      }
      
      this.frame.appendChild(options.htmlElement)
      this.expectString(options.string, options.options)

      this.ignoreTransitions = false
      this.footer.classList.add("active")

      if (!this.isTouchScreen) {
        // Automatically enable keyboard input
        this.input.focus()
      }
    }


    type(event) {
      let keyElement = event.target
      let key = keyElement.id

      if (!key) {
        return
      } else if (key === "space") {
        key = " "
      }

      let result = this.treatKey(keyElement, key)
      if (result) {
        this.input.value += key
      }
    }


    keydown(event) {
      let key = event.key.toLowerCase()
      let keyElement = this.keyMap[key]

      if (key === " ") {
        keyElement = this.keyMap["space"]
      }

      if (!keyElement) {
        // Input was not in Russian. Don't let it in.
        return false
      }

      return this.treatKey(keyElement, key)
    }


    treatKey(keyElement, key) {
      let className = "correct"
      let result = this.updateExpectations(key)

      if (!result) {
        // Right alphabet, wrong character
        className = "incorrect"
      }

      keyElement.classList.add(className)
      setTimeout(() => {
        keyElement.classList.remove(className)
      }, this.inputDelay)

      // Unexpected letter will not appear
      return result
    }


    done (ignoreCallback) {
      this.callback("done")

      this.footer.classList.add("correct")
      // Remove highlight and enable all keys
      this.highlightKey()
      this.enableKeys()

      setTimeout(() => {
        this.footer.classList.remove("correct")
      }, this.doneDelay / 2)

      setTimeout(() => {
        this.callback("closing")

        // Disable all keys(?) and hide
        this.enableKeys("\n")
        this.close()
      }, this.doneDelay)
    }


    close () {
      this.footer.classList.remove("active")
      let child
      while (child = this.frame.firstChild) {
        child.remove()
      }
      this.options = {}
    }
  }

  monika.customKeyboard = new CustomKeyboard()

})(window.monika)