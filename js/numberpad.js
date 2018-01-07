;(function (monika){

  if (!monika) {
    monika = window.monika = {}
  }

  class NumberPad {
    constructor() {
      let pad = this.pad = document.getElementById("number-pad")
      pad.onmousedown = this.touchStart.bind(this)

      // let resize = this.resize.bind(this)
      // window.addEventListener("resize", resize, false)

      this.tapNumberCallback = function () {}
      this.tapDeleteCallback = function () {}
      this.tapHashCallback   = function () {}
    }

    // { parentNode: <HTML Element>
    // , tapNumberCallback: function () {}
    // , tapDeleteCallback: function () {}
    // , tapHashCallback:   function () {}
    // }
    
    initialize(options) {
      let parentNode = options.parentNode

      if (parentNode !== this.pad.parentNode) {
        parentNode.appendChild(this.pad)
      }

      this.tapNumberCallback = options.tapNumberCallback
                            || function () {}
      this.tapDeleteCallback = options.tapDeleteCallback
                            || function () {}
      this.tapHashCallback = options.tapHashCallback
                            || function () {}

      return this.pad
    }


    // resize(event) {
    //   let rect = this.pad.getBoundingClientRect()
    //   let height = rect.height
    //   let width = height * 0.75

    //   // border-width
    //   // border-width on hover
    //   // font-size
    // }


    touchStart(event) {
      let target = event.target
      let number = target.innerHTML

      switch (number) {
        case "#":
          return this.tapHashCallback()

        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
        case "0":
          return this.tapNumberCallback(number, target)

        default: // whatever the DELETE button is called
          this.tapDeleteCallback()
      }
    }

  }

  monika.numberPad = new NumberPad()

})(window.monika)