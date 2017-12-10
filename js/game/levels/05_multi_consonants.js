"use strict"



;(function levelLoaded(monika){
  // monika = { map: { <name>: <object>, ... }, name: <string> }

  if (!monika.classes) {
    monika.classes = {}
    monika.levels = {}
  }

  class MultiConsonants extends monika.layouts.Digits {
    constructor (options) {
      super(options)
    }

    initialize () {
      super.initialize()
      log(this.name + " is initialized in Consonants")
    }
  }


  monika.classes["MultiConsonants"] = MultiConsonants


})(window.monika)