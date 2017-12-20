"use strict"



;(function levelLoaded(monika){
  // monika = { map: { <name>: <object>, ... }, name: <string> }

  if (!monika.classes) {
    monika.classes = {}
    monika.levels = {}
  }

  class Words extends monika.layouts.Words {
    // constructor (options) {
    //   super(options)
    // }

    // initialize () {
    //   super.initialize()
    //   log(this.name + " is initialized in Words")
    // }

    provideSupport(support) {
      let htmlElement
        , string
      let instructions = {
        forget:  2
      }

      monika.support.execute(instructions)

      if (this.lastErrorClass === "numbers") {
        this.supportElement = this.supportElements["numbers"]
        string = this.names[this.number]
      } else {
        this.supportElement = this.supportElements["images"]
        string = this.words[this.number]
      }

      let options = {
        htmlElement: this.supportElement.cloneWithStyle()
      , string:      string
      , callback:    this.callbackFromSupport.bind(this)
      }

      monika.customKeyboard.setInputCue(options)
    }
  }


  monika.classes["Words"] = Words


})(window.monika)