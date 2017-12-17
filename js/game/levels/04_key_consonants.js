"use strict"



;(function levelLoaded(monika){
  // monika = { map: { <name>: <object>, ... }, name: <string> }

  if (!monika.classes) {
    monika.classes = {}
    monika.levels = {}
  }

  class KeyConsonants extends monika.layouts.Digits {
    // initialize() {
    //   this.ul = this.section.querySelector("ul.consonants")
    //   this.ul.classList.add("helpers")
    //   super.initialize()
    // }


    showConsonants () {
      var list = this.section.querySelectorAll("ul.consonants li")
      var total = list.length    
      var child

      var cueArray = this.getCueArray(total) 

      var total = list.length    
      for (let ii = 0; ii < total; ii += 1) {
        let li = list[ii]      // <li>
        let cue = cueArray[ii] // integer
        let consonants = monika.media.consonants.map[cue]
        let count = consonants.length

        let innerHTML = ([1,3,9].indexOf(cue) < 0)
                      ? '<span class="first">' + consonants[0] + "</span>"
                      : '<span class="key">' + consonants[0] + "</span>"

        li.src = monika.media.getAudioFor("consonant", consonants[0])

        if (count > 1) {
          let spans = ['<span class="helper"> ', '<span class="helper"> ']

          let random = Math.floor(Math.random() * 2)
          if (count === 2) {
            // Use the same helper consonant twice, but make one of
            // them invisible
            consonants += consonants[1]
            spans[random] = '<span class="filler"> '

          } else if (random) {
            // Swap the order of two helpers half the time
            consonants = " " + consonants[2] + consonants[1]
          }

          let span = spans[0] + consonants[1] + " </span>"
          innerHTML = span + innerHTML
          span = spans[1] + consonants[2] + " </span>"
          innerHTML += span
        }

        li.className = ""
        li.number = cue

        if (cue !== this.number) {
          li.classList.add("decoy")
        } else {
          this.supportElements["consonants"] = li
        }
        
        li.innerHTML = "<div>" + innerHTML + "</div>"
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
        li.number = cue
        li.word = name
        li.src = monika.media.getAudioFor("number", cue)

        if (cue !== this.number) {
          li.classList.add("decoy")
        } else {
          this.supportElements["names"] = li
        }
      }
    }
  }


  monika.classes["KeyConsonants"] = KeyConsonants


})(window.monika)