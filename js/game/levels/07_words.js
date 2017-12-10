"use strict"



;(function levelLoaded(monika){
  // monika = { map: { <name>: <object>, ... }, name: <string> }

  if (!monika.classes) {
    monika.classes = {}
    monika.levels = {}
  }

  class Words extends monika.layouts.Words {
    constructor (options) {
      super(options)
    }

    initialize () {
      super.initialize()
      log(this.name + " is initialized in Words")
    }
  }


  monika.classes["Words"] = Words


})(window.monika)