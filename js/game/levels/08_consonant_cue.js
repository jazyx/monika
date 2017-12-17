"use strict"



;(function levelLoaded(monika){
  // monika = { map: { <name>: <object>, ... }, name: <string> }

  if (!monika.classes) {
    monika.classes = {}
    monika.levels = {}
  }

  class ConsonantCue extends monika.layouts.Consonants {
    // constructor (options) {
    //   super(options)
    // }

    // initialize () {
    //   super.initialize()
    //   log(this.name + " is initialized in ConnsonantCue")
    // }
  }


  monika.classes["ConsonantCue"] = ConsonantCue


})(window.monika)