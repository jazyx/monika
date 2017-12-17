"use strict"



;(function layoutLoaded(monika){
  // monika = { map: { <name>: <object>, ... }, name: <string> }


  if (!monika.layouts) {
    monika.layouts = {}
  }


  class NAME_GOES_HERE extends monika.Game {

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
      options.repeat      = options.repeat      || 2
      options.consecutive = options.consecutive || false
      options.decoy_range = options.decoy_range || { start: 0, end: 9 }
      options.sortBy      = options.sortBy      || ""

      super("digits", options) // class for <article> element
    }
  }


  monika.layouts["NAME_GOES_HERE"] = NAME_GOES_HERE


})(window.monika)