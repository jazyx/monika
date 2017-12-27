"use strict"



;(function layoutLoaded(monika){
  // monika = { map: { <name>: <object>, ... }, name: <string> }


  if (!monika.layouts) {
    monika.layouts = {}
  }


  class Digits extends monika.Game {

    /**
     * @param {object}  options  { className: <string>
     *                           , name:  <string>
     *                           , range: {start: <integer>
     *                                       end: <integer>}
     *                                    OR
     *                                    [ <integer>, ... ]
     *                           , sortBy: <string>
     *                           }
     */
    constructor (options) {
      options.cue_range   = options.cue_range   || { start: 0, end: 9 }
      options.consecutive = options.consecutive || false
      options.decoy_range = options.decoy_range || { start: 0, end: 9 }
      options.sortBy      = options.sortBy      || ""

      if (isNaN(options.repeat)) {
        options.repeat = 2
      }

      super("digits", options) // class for <article> element
    }
  }


  monika.layouts["Digits"] = Digits


})(window.monika)