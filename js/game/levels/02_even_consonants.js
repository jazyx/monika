"use strict"



;(function levelLoaded(monika){
  // monika = { map: { <name>: <object>, ... }, name: <string> }

  if (!monika.classes) {
    monika.classes = {}
    monika.levels = {}
  }

  class EvenConsonants extends monika.layouts.Digits {
    constructor (options) {
      options.cue_range   = options.cue_range   || [0, 2, 4, 6, 8]
      options.repeat      = options.repeat      || 3
      options.sortBy      = options.sortBy      || "odd&even"
      super(options)
    }
  }


  monika.classes["EvenConsonants"] = EvenConsonants


})(window.monika)