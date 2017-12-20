"use strict"



;(function layoutLoaded(monika){
  // monika = { map: { <name>: <object>, ... }, name: <string> }


  if (!monika.layouts) {
    monika.layouts = {}
  }


  class Consonants extends monika.Game {

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

      super("consonants", options) // class for <article> element

      // If numbers are also shown, then we may need three additional
      // consonants that match decoy numbers.

      // this.words = {}
      this.consonants = {}
      let end = options.decoy_range.end + 1
      let regex = /[бвгджзклмнпрстфхцчшщ]/
      
      for (let ii = options.decoy_range.start ; ii < end; ii += 1) {
        let word = monika.media.getWordFor(ii)     
        let consonant = word.match(regex) // ["н", index: 1, input: "иней"]
        if (consonant) {
          this.consonants[ii] = consonant[0]
          // this.words[ii] = word
        }
      }
    }


    showConsonants () {
      var list = this.section.querySelectorAll("ul.consonants li")
      var total = list.length    
      var child

      var cueArray = this.getCueArray(total) 

      for (let ii = 0; ii < total; ii += 1) {
        let li = list[ii]
        let cue = cueArray[ii]
        let consonant = this.consonants[cue]

        li.className = ""
        li.number = cue
        li.src = monika.media.getAudioFor("consonant", consonant)
        li.innerHTML = consonant       

        if (cue !== this.number) {
          li.classList.add("decoy")
        } else {
          this.supportElements["consonants"] = li
        }
      }
    }


    setCue() {
      let consonant = this.consonants[this.number]
      let audioCue = monika.media.getAudioFor("consonant", consonant)
      monika.audio.play(audioCue)
    }


    provideSupport(support) {
      let htmlElement
        , string
      let instructions = {
        forget:  2
      }

      monika.support.execute(instructions)

      if (this.lastErrorClass === "numbers") {
        this.supportElement = this.supportElements["numbers"]
        string = this.names[this.number]
      } else {
        this.supportElement = this.supportElements["images"]
        string = this.words[this.number]
      }

      let options = {
        htmlElement: this.supportElement.cloneWithStyle()
      , string:      string
      , callback:    this.callbackFromSupport.bind(this)
      }

      monika.customKeyboard.setInputCue(options)
    }
  }


  monika.layouts["Consonants"] = Consonants


})(window.monika)