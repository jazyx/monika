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
      options.repeat      = options.repeat      || 2
      options.consecutive = options.consecutive || false
      options.decoy_range = options.decoy_range || { start: 0, end: 9 }
      options.sortBy      = options.sortBy      || ""

      super("digits", options) // class for <article> element
    }

    getConsonant (cue) {
      return monika.media.consonants.map[cue][0]
    }

    showConsonants () {
      var list = this.section.querySelectorAll("ul.consonants li")
      var total = list.length    
      var child

      var cueArray = this.getCueArray(total) 

      var total = list.length    
      for (let ii = 0; ii < total; ii += 1) {
        let li = list[ii]
        let cue = cueArray[ii]
        let consonant = this.getConsonant(cue)

        li.className = ""

        if (cue === this.number) {
          li.innerHTML = "<span>" + consonant + "</span>"
          li.src = monika.media.getAudioFor("consonant", consonant)

        } else {
          li.innerHTML = consonant       
          li.classList.add("decoy")
        }
      }
    }
  }


  monika.layouts["Digits"] = Digits


})(window.monika)