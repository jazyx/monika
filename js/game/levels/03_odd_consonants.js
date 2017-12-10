"use strict"



;(function levelLoaded(monika){
  // monika = { map: { <name>: <object>, ... }, name: <string> }

  if (!monika.classes) {
    monika.classes = {}
    monika.levels = {}
  }


  class OddConsonants extends monika.layouts.Digits {
    constructor (options) {
      options.cue_range   = options.cue_range   || [1, 3, 5, 7, 9]
      options.repeat      = options.repeat      || 3
      options.decoy_range = options.decoy_range || { start: 0, end: 9 }
      options.sortBy      = options.sortBy      || "even&odd"
      super(options)
    }


    showNames() {
      var list = this.section.querySelectorAll("ul.names li")
      var total = list.length    
      var child

      var cueArray = this.getCueArray(total)

      for (let ii = 0; ii < total; ii += 1) {
        let li     = list[ii]
        let cue    = cueArray[ii]
        let name   = this.names[cue]

        // Colour the consonants ONLY IF THE CUE CAN BE COLOURED
        if ([1, 3, 9].indexOf(this.number) < 0) {
          let mapped = monika.media.consonants.map[cue]
          let regex  = new RegExp ("[" + mapped + "]")
          let match  = name.match(regex)

          if (match) {
            name = name.replaceAt(match.index, "<span>" + match[0] + "</span>")
          }
        } else if (cue === this.number) {
          // Colour the whole word
          name = "<span>" + name + "</span>"
        }

        li.innerHTML = "<p>" + name + "</p>"
        li.className = ""

        if (cue === this.number) {
          li.src = monika.media.getAudioFor("number", cue)

        } else {
          li.classList.add("decoy")
        }
      }
    }
  }


  monika.classes["OddConsonants"] = OddConsonants


})(window.monika)