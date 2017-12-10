"use strict"



;(function levelLoaded(monika){
  // monika = { map: { <name>: <object>, ... }, name: <string> }

  if (!monika.classes) {
    monika.classes = {}
    monika.levels = {}
  }

  class KeyConsonants extends monika.layouts.Digits {

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
        li.src = monika.media.getAudioFor("consonant", consonant)

        if (cue === this.number) {
          if ([1,3,9].indexOf(this.number) < 0) {
            li.innerHTML = consonant 
          } else {
            li.innerHTML = "<span>" + consonant + "</span>"
          }

        } else {
          li.innerHTML = consonant       
          li.classList.add("decoy")
        }
      }
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

        // // Colour the consonants ONLY IF THE CUE CAN BE COLOURED
        // if ([1, 3, 9].indexOf(this.number) < 0) {
        //   let mapped = monika.media.consonants.map[cue]
        //   let regex  = new RegExp ("[" + mapped + "]")
        //   let match  = name.match(regex)

        //   if (match) {
        //     name = name.replaceAt(match.index, "<span>" + match[0] + "</span>")
        //   }
        // }

        li.innerHTML = "<p>" + name + "</p>"
        li.className = ""

        li.src = monika.media.getAudioFor("number", cue)

        if (cue !== this.number) {
          li.classList.add("decoy")
        }
      }
    }
  }


  monika.classes["KeyConsonants"] = KeyConsonants


})(window.monika)